/* Shared physical/drawing primitives. No global drawing or Moody overrides. */
(function (scope) {
  'use strict';
  const g = 9.81;
  const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));

  // h(x)=max(0,H-s*x). A finite rim limits H after irreversible spilling.
  function openTank(L, h0, acceleration, rim = Infinity) {
    const s = Math.abs(acceleration) / g;
    const initial = L * Math.min(h0, rim);
    let high = s * L <= 2 * Math.min(h0, rim)
      ? Math.min(h0, rim) + s * L / 2 : Math.sqrt(2 * initial * s);
    high = Math.min(high, rim);
    const wet = s > 0 ? Math.min(L, high / s) : L;
    const low = Math.max(0, high - s * L);
    const area = (high + Math.max(0, high - s * wet)) * wet / 2;
    return { high, low, wet, area, spilled: Math.max(0, L * h0 - area), slope: s,
      height: x => Math.max(0, high - s * (acceleration >= 0 ? x : L - x)) };
  }
  function safeFill(L, rim, acceleration) {
    const drop = Math.abs(acceleration) * L / g;
    return drop <= rim ? rim - drop / 2 : rim * rim / (2 * drop);
  }
  // Low-induction branch of the ideal actuator disk: Cp=4a(1-a)^2.
  // Cp is mechanical extraction, not generator efficiency.
  function actuatorDisk(rho, area, upstream, cp) {
    if(cp<0 || cp>16/27 || upstream<0 || area<=0) return null;
    let a;
    if(cp===0)a=0;
    else if(cp===16/27)a=1/3;
    else {
      let lo=0,hi=1/3;
      for(let i=0;i<60;i++){const mid=(lo+hi)/2;if(4*mid*(1-mid)**2<cp)lo=mid;else hi=mid;}
      a=(lo+hi)/2;
    }
    const disk=upstream*(1-a),wake=upstream*(1-2*a);
    const mass=rho*area*disk,force=mass*(upstream-wake),power=force*disk;
    return {a,disk,wake,mass,force,power};
  }
  function rotatingTank(R, h0, omega, rim = Infinity) {
    const k=omega*omega/(2*g), r2=R*R;
    let c=h0-k*r2/2;
    if(c<0)c=Math.sqrt(2*k*r2*h0)-k*r2;
    c=Math.min(c,rim-k*r2);
    const edge=Math.max(0,c+k*r2),dry=k>0?Math.sqrt(Math.max(0,-c/k)):0;
    const mean=c>=0?c+k*r2/2:edge*edge/(2*k*r2);
    return { c, center:Math.max(0,c),edge,dry,volume:Math.PI*r2*mean,
      spilled:Math.max(0,Math.PI*r2*(h0-mean)),height:r=>Math.max(0,c+k*r*r) };
  }
  function arrow(ctx, x, y, dx, dy, color, label = '', width = 2.5) {
    // Also accept (color, width, label), used by the canvas teaching scenes.
    if(typeof label==='number'){const stroke=label;label=typeof width==='string'?width:'';width=stroke;}
    const len = Math.hypot(dx, dy);
    if (!Number.isFinite(len) || len < 0.15) return;
    const a = Math.atan2(dy, dx), head = Math.min(11, len * .4);
    ctx.save(); ctx.strokeStyle = ctx.fillStyle = color; ctx.lineWidth = width;
    ctx.lineCap='round';ctx.lineJoin='round';
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + dx, y + dy);
    ctx.strokeStyle='#ffffff';ctx.lineWidth=width+2.5;ctx.stroke();
    ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + dx, y + dy);
    ctx.lineTo(x + dx - head * Math.cos(a - .48), y + dy - head * Math.sin(a - .48));
    ctx.lineTo(x + dx - head * Math.cos(a + .48), y + dy - head * Math.sin(a + .48));
    ctx.closePath(); ctx.fill();
    if (label) {
      const diagonal=Math.abs(dx)>.2*len&&Math.abs(dy)>.2*len,left=dx < -Math.abs(dy)*.5;
      const tx=diagonal?x+.68*dx-15*dy/len:x+dx+(left?-9:9),ty=diagonal?y+.68*dy+15*dx/len:y+dy-9;
      ctx.font='600 14px system-ui';ctx.textAlign=diagonal?'center':left?'right':'left';
      ctx.strokeStyle='#ffffff';ctx.lineWidth=4;
      if(scope.MF1?.mathText){scope.MF1.mathText(ctx,label,tx,ty,true);scope.MF1.mathText(ctx,label,tx,ty);}
      else{ctx.strokeText(label,tx,ty);ctx.fillText(label,tx,ty);}
    }
    ctx.restore();
  }
  function svgArrow(x,y,dx,dy,color,label='',width=3) {
    const len=Math.hypot(dx,dy); if(!Number.isFinite(len)||len<.15)return '';
    const ux=dx/len,uy=dy/len,h=Math.min(11,len*.4),ex=x+dx,ey=y+dy,left=dx < -Math.abs(dy)*.5;
    const diagonal=Math.abs(ux)>.2&&Math.abs(uy)>.2;
    const tx=diagonal?x+.68*dx-15*uy:ex+(left?-9:9),ty=diagonal?y+.68*dy+15*ux:ey-9;
    return `<g class="mf1-vector" fill="${color}" stroke="${color}" stroke-linejoin="round"><path d="M${x} ${y}L${ex} ${ey}" stroke="#fff" stroke-width="${width+2.5}" fill="none"/><path d="M${x} ${y}L${ex} ${ey}" stroke-width="${width}" fill="none"/><path d="M${ex} ${ey}L${ex-h*ux+h*.45*uy} ${ey-h*uy-h*.45*ux}L${ex-h*ux-h*.45*uy} ${ey-h*uy+h*.45*ux}Z" stroke="none"/>${label?`<text x="${tx}" y="${ty}" text-anchor="${diagonal?'middle':left?'end':'start'}" stroke="#fff" stroke-width="3" paint-order="stroke" font-size="16" font-weight="650">${label}</text>`:''}</g>`;
  }
  // Split a composite scene at an explicit panel boundary. Each drawing gets
  // its own undistorted full-width viewport while retaining live model updates.
  function separateScene(svg,selector,mainBox,detailBox,label) {
    const start=svg.querySelector(selector);if(!start)return;
    let detail=svg.mf1Detail;
    if(!detail){
      detail=document.createElementNS('http://www.w3.org/2000/svg','svg');
      detail.setAttribute('role','img');detail.classList.add('mf1-companion','mf1-graphic','mf1-visual-branch');
      svg.after(detail);svg.mf1Detail=detail;
    }
    const main=mainBox.split(/\s+/).map(Number),box=detailBox.split(/\s+/).map(Number);
    // Equal logical widths keep type and vector weights consistent between panels.
    if(box[2]<main[2]){box[0]-=(main[2]-box[2])/2;box[2]=main[2];}
    svg.setAttribute('viewBox',mainBox);detail.setAttribute('viewBox',box.join(' '));
    detail.setAttribute('aria-label',label);detail.replaceChildren();
    for(let node=start;node;){const next=node.nextSibling;detail.append(node);node=next;}
  }
  // An explicit start: elapsed physical time, independent of display refresh rate.
  function motion(root, draw, { reset = () => {}, speed = 1 } = {}) {
    const bar=document.createElement('div'); bar.className='mf1-motion';
    bar.innerHTML='<button type="button" aria-pressed="false">Pokreni</button><button type="button">Početak</button><label>Brzina prikaza <select aria-label="Brzina animacije"><option value="0.5">0,5×</option><option value="1" selected>1×</option><option value="2">2×</option></select></label><span>Animacija miruje do pokretanja.</span>';
    root.append(bar); const [play,restart]=bar.querySelectorAll('button'), rate=bar.querySelector('select');
    let running=false,last=null,frame=0,time=0;
    function stop(){running=false;last=null;cancelAnimationFrame(frame);play.textContent='Pokreni';play.setAttribute('aria-pressed','false')}
    function tick(now){
      if(!running)return;
      // Substeps retain elapsed time on slow displays. Tab suspension is paused
      // by visibilitychange, rather than silently slowing physical time.
      let remaining=last===null?0:Math.max(0,(now-last)/1000)*Number(rate.value)*speed;
      last=now;
      if(remaining===0)draw(0,time);
      while(remaining>1e-12&&running){const dt=Math.min(.05,remaining);time+=dt;draw(dt,time);remaining-=dt;}
      if(running)frame=requestAnimationFrame(tick);
    }
    play.onclick=()=>{if(running){stop();return}running=true;play.textContent='Pauza';play.setAttribute('aria-pressed','true');frame=requestAnimationFrame(tick)};
    restart.onclick=()=>{stop();time=0;reset();draw(0,0)};
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    reduced.addEventListener?.('change',()=>{if(reduced.matches)stop()});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
    return {stop,reset:()=>restart.click()};
  }
  // Lower-left circular quadrant. Changing the wetted side reverses both
  // components while retaining the geometry and the lines of action.
  function quarterScene(canvas,{h,R,FH,FV,inside=false,step=3,G=null}) {
    const ctx=canvas.getContext('2d'),W=700,H=430;
    // A circular arc and its normals need the same scale in both directions.
    ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,canvas.width,canvas.height);
    const scale=Math.min(canvas.width/W,canvas.height/H);
    ctx.setTransform(scale,0,0,scale,(canvas.width-W*scale)/2,(canvas.height-H*scale)/2);
    const s=Math.min(135,290/Math.max(h+R,G===null?0:2*R)),r=R*s,cx=445;
    const sy=45+(G===null?0:Math.max(0,R-h)*s),cy=sy+h*s,by=cy+r,lx=cx-r;
    const line=(x,y,xx,yy,color='#64748b',dash=[])=>{ctx.strokeStyle=color;ctx.lineWidth=1.5;ctx.setLineDash(dash);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(xx,yy);ctx.stroke();ctx.setLineDash([])};
    const text=(t,x,y,c='#334155')=>{ctx.font='13px system-ui';ctx.fillStyle=c;if(scope.MF1?.mathText)scope.MF1.mathText(ctx,t,x,y);else ctx.fillText(t,x,y)};
    const fluid=ctx.createLinearGradient(0,sy,0,by);fluid.addColorStop(0,'#e5f5fc');fluid.addColorStop(1,'#91cee8');
    ctx.fillStyle=fluid;ctx.beginPath();
    if(inside){ctx.moveTo(lx,sy);ctx.lineTo(cx,sy);ctx.lineTo(cx,by);ctx.arc(cx,cy,r,Math.PI/2,Math.PI);ctx.closePath();}
    else{ctx.moveTo(45,sy);ctx.lineTo(lx,sy);ctx.lineTo(lx,cy);ctx.arc(cx,cy,r,Math.PI,Math.PI/2,true);ctx.lineTo(45,by);ctx.closePath();}ctx.fill();
    line(45,sy,inside?cx:lx,sy,'#0284c7');text('slobodna površina',45,sy-12);
    if(G!==null){ctx.fillStyle='#f1f5f9';ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#64748b';ctx.stroke();line(lx,sy,lx,cy);line(45,by,cx+r+15,by);}
    if(step>=2){ctx.fillStyle=inside?'#38bdf833':'#a78bfa22';ctx.beginPath();ctx.moveTo(lx,sy);ctx.lineTo(cx,sy);ctx.lineTo(cx,by);ctx.arc(cx,cy,r,Math.PI/2,Math.PI);ctx.closePath();ctx.fill();ctx.setLineDash([4,4]);ctx.strokeStyle='#64748b';ctx.lineWidth=1;ctx.stroke();ctx.setLineDash([]);text(inside?'V*: stvarni fluid':'V*: pomoćni volumen',55,390);}
    ctx.strokeStyle='#1e293b';ctx.lineWidth=5;ctx.beginPath();ctx.arc(cx,cy,r,Math.PI,Math.PI/2,true);ctx.stroke();
    text('C',cx+8,cy-10);text('A',lx-18,cy-8);text('B',cx+8,by+17);line(cx,cy,lx,cy,'#64748b',[4,4]);text('R',lx+r/2,cy-8);
    // A dimensionless pressure profile avoids inventing a density or span.
    const plotX=G===null?565:610,plotW=G===null?75:48,plotTop=75,plotH=205;
    line(plotX,plotTop,plotX,plotTop+plotH);line(plotX,plotTop+plotH,plotX+plotW,plotTop+plotH);
    text('p / p_B',plotX-8,plotTop-16);text('0',plotX-4,plotTop+plotH+18);text('1',plotX+plotW-3,plotTop+plotH+18);
    line(plotX,plotTop,plotX+plotW,plotTop+plotH,'#087eab');
    const ya=plotTop+plotH*h/(h+R),xa=plotX+plotW*h/(h+R);
    line(plotX,ya,xa,ya,'#8a9eab',[3,3]);text('A',plotX-19,ya+4);text('B',plotX-19,plotTop+plotH+4);
    text('p_B = ρg(h + R)',530,plotTop+plotH+46);
    const sign=inside?-1:1;
    if(step===1||step===3)for(let i=0;i<=6;i++){const t=Math.PI-i*Math.PI/12,px=cx+r*Math.cos(t),py=cy+r*Math.sin(t),len=42*(h+R*Math.sin(t))/(h+R);arrow(ctx,px,py,-sign*len*Math.cos(t),-sign*len*Math.sin(t),'#c26b35',1.8);}
    if(step>=2){const zH=h+R/2+R*R/(12*(h+R/2)),xbar=(h*R*R/2+R**3/3)/(h*R+Math.PI*R*R/4),px=cx-xbar*s,py=sy+zH*s;
      line(55,py,cx+90,py,'#64748b',[4,4]);line(px,Math.max(22,sy),px,by+20,'#64748b',[4,4]);
      const vs=85/Math.max(FH,FV,G||0),dx=sign*FH*vs,dy=-sign*FV*vs;
      arrow(ctx,px,py,dx,0,'#0284c7',2.5,'F_H');arrow(ctx,px,py,0,dy,'#059669',2.5,'F_V');
      if(step===3){line(px,py,cx,cy,'#dc2626',[3,4]);arrow(ctx,px,py,dx,dy,'#dc2626',3,'F_R');}
      if(G!==null)arrow(ctx,cx,cy,0,G*vs,'#7c3aed',3,'G_c');
      text('Sile: ista prilagođena skala; pravac F_R kroz C',55,414);
    }
    ctx.setTransform(1,0,0,1,0,0);
  }
  const api={g,clamp,openTank,safeFill,actuatorDisk,rotatingTank,arrow,svgArrow,separateScene,motion,quarterScene};
  if(typeof document!=='undefined')document.addEventListener('DOMContentLoaded',()=>{
    const roots=document.querySelectorAll('.mf1-lab,.mf1v4-widget,.v8-lab,.v8x-shell,.v9-lab,.v9x-shell,.v10-lab,.v10x-shell,.v11x-shell,.v12x-shell,#z120-laminar-widget,#z122-diffuser-widget,#z123-budget-widget,#z124-parallel-widget');
    roots.forEach(root=>{
      if(root.closest('#v13-moody-widget'))return;
      root.classList.add('mf1-reviewed');
      root.querySelectorAll('input[type=range],select').forEach(el=>{
        if(el.hasAttribute('aria-label')||el.labels?.length)return;
        const label=el.previousElementSibling;
        if(label?.tagName==='LABEL')el.setAttribute('aria-label',label.textContent.trim());
      });
    });
  },{once:true});
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  scope.MF1=api;
})(typeof window==='undefined'?globalThis:window);
