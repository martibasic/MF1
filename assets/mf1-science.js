/* Quantitative plotting and independently testable teaching models (SI units). */
(function (scope) {
  'use strict';
  const g = 9.81;
  const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const number = x => Number(Math.abs(x) < 1e-12 ? 0 : x).toLocaleString('hr-HR', {maximumSignificantDigits:4});
  function ticks(lo, hi, count = 5) {
    if (!(Number.isFinite(lo) && Number.isFinite(hi) && hi > lo)) return [];
    const raw = (hi - lo) / count, power = 10 ** Math.floor(Math.log10(raw));
    const step = [1, 2, 2.5, 5, 10].find(v => v * power >= raw) * power;
    const out = [];
    for (let i = Math.ceil(lo / step - 1e-10); i * step <= hi + step * 1e-9; i++) out.push(Number((i * step).toPrecision(12)));
    return out;
  }
  // Pressure is absolute; rho0 is the density at the surface pressure p0.
  function ocean(depth, rho0 = 1025, K = 2.34e9, p0 = 1e5) {
    if (!(depth >= 0 && rho0 > 0 && K > 0 && rho0 * g * depth < K)) return null;
    const q = rho0 * g * depth / K;
    return {pressure:p0 - K * Math.log1p(-q), density:rho0 / (1 - q)};
  }
  function powerLaw(rate, K, n) {
    if (!(K > 0 && n > 0 && Number.isFinite(rate))) return null;
    const stress = K * Math.sign(rate) * Math.abs(rate) ** n;
    return {stress, apparent:rate === 0 ? (n === 1 ? K : n > 1 ? 0 : Infinity) : stress / rate};
  }
  // x right, z down. Gauge pressure acts inward on the circular surface.
  // Split at every waterline intersection: dry parts carry no gauge pressure.
  function arcPressure({zC, R, b = 1, rho = 1000, start = 0, span = 2 * Math.PI, N = 720}) {
    if (!(R > 0 && b > 0 && rho > 0 && span > 0 && Number.isFinite(zC))) return null;
    const end = start + span, cuts = [start, end];
    if (Math.abs(zC) < R) {
      const a = Math.asin(-zC / R);
      for (let k = Math.floor(start / (2*Math.PI)) - 1; k <= Math.ceil(end / (2*Math.PI)) + 1; k++)
        for (const t of [a + k*2*Math.PI, Math.PI-a+k*2*Math.PI]) if (t > start && t < end) cuts.push(t);
    }
    cuts.sort((a,b) => a-b);
    const Ix = t => zC*Math.sin(t) + R*Math.sin(t)**2/2;
    const Iz = t => -zC*Math.cos(t) + R*(t/2-Math.sin(2*t)/4);
    const factor = -rho*g*b*R;
    let fx = 0, fz = 0, nx = 0, nz = 0, elements = 0, wetAngle = 0;
    const wetIntervals = [];
    for (let i = 1; i < cuts.length; i++) {
      const a = cuts[i-1], c = cuts[i];
      if (zC + R*Math.sin((a+c)/2) <= 0) continue;
      wetIntervals.push({start:a, end:c});
      wetAngle += c-a; fx += factor*(Ix(c)-Ix(a)); fz += factor*(Iz(c)-Iz(a));
      const n = Math.max(2, Math.ceil(N*(c-a)/span)), dt = (c-a)/n;
      elements += n;
      for (let j = 0; j < n; j++) {
        const t = a+(j+.5)*dt, df = factor*(zC+R*Math.sin(t))*dt;
        nx += df*Math.cos(t); nz += df*Math.sin(t);
      }
    }
    return {fx, fz, numericalX:nx, numericalZ:nz, force:Math.hypot(fx,fz), wetAngle, wetIntervals, elements,
      error:Math.hypot(nx-fx,nz-fz), pressure:t => rho*g*Math.max(0,zC+R*Math.sin(t))};
  }
  function colebrook(Re, roughness = 0) {
    if (!(Re > 0 && roughness >= 0 && roughness < 1)) return null;
    let lo = 1, hi = 100;
    for (let i = 0; i < 64; i++) {
      const x = (lo+hi)/2, residual = x+2*Math.log10(roughness/3.7+2.51*x/Re);
      if (residual > 0) hi = x; else lo = x;
    }
    return 1 / ((lo+hi)/2)**2;
  }
  // The transition is a stated teaching interpolation, not a unique physical law.
  // Interpolating Re²*f preserves a monotone head-loss law for network solving.
  function pipeFriction(Re, roughness = 0) {
    if (!(Re >= 0 && Number.isFinite(Re) && roughness >= 0 && roughness < 1)) return null;
    if (Re === 0) return {factor:0, regime:'mirovanje', uncertain:false};
    if (Re < 2320) return {factor:64/Re, regime:'laminarno', uncertain:false};
    if (Re >= 4000) return {factor:colebrook(Re,roughness), regime:'turbulentno', uncertain:false};
    const t = (Re-2320)/1680, a = 64*2320, b = colebrook(4000,roughness)*4000**2;
    return {factor:((1-t)*a+t*b)/Re**2, regime:'prijelazno', uncertain:true};
  }
  function pipeBranch(Q, D, {L = 36, k = .000045, rho = 998, mu = .001} = {}) {
    const V = Q/(Math.PI*D*D/4), Re = rho*Math.abs(V)*D/mu, f = pipeFriction(Re,k/D);
    return {D, V, Re, lam:f.factor, h:Math.sign(Q)*f.factor*L/D*V*V/(2*g), uncertain:f.uncertain};
  }
  function parallelPipes(Q, D1, D2, options) {
    let lo = 0, hi = Math.abs(Q);
    for (let i = 0; i < 70; i++) {
      const q = (lo+hi)/2;
      if (pipeBranch(q,D1,options).h > pipeBranch(Math.abs(Q)-q,D2,options).h) hi=q; else lo=q;
    }
    const Q1 = Math.sign(Q)*(lo+hi)/2, Q2 = Q-Q1;
    return {Q1,Q2,b1:pipeBranch(Q1,D1,options),b2:pipeBranch(Q2,D2,options)};
  }
  function fitCanvas(canvas, ctx, W, H) {
    ctx.setTransform(1,0,0,1,0,0); ctx.clearRect(0,0,canvas.width,canvas.height);
    const scale = Math.min(canvas.width/W,canvas.height/H);
    ctx.setTransform(scale,0,0,scale,Math.max(0,(canvas.width-W*scale)/2),Math.max(0,(canvas.height-H*scale)/2));
    return scale;
  }
  function canvasAxes(ctx,{left,top,width,height,x,y,xlabel='',ylabel='',down=false}) {
    const px=v=>left+(v-x[0])/(x[1]-x[0])*width;
    const py=v=>top+(down?(v-y[0])/(y[1]-y[0]):1-(v-y[0])/(y[1]-y[0]))*height;
    ctx.save();ctx.font='12px "Segoe UI",system-ui';ctx.lineWidth=1;
    for(const v of ticks(...x,4)){
      ctx.strokeStyle='#d5e3ec';ctx.beginPath();ctx.moveTo(px(v),top);ctx.lineTo(px(v),top+height);ctx.stroke();
      ctx.fillStyle='#40596b';ctx.textAlign='center';ctx.fillText(number(v),px(v),top+height+19);
    }
    for(const v of ticks(...y,4)){
      ctx.strokeStyle='#d5e3ec';ctx.beginPath();ctx.moveTo(left,py(v));ctx.lineTo(left+width,py(v));ctx.stroke();
      ctx.fillStyle='#40596b';ctx.textAlign='right';ctx.fillText(number(v),left-8,py(v)+4);
    }
    ctx.strokeStyle='#7b93a3';ctx.beginPath();ctx.moveTo(left,top);ctx.lineTo(left,top+height);ctx.lineTo(left+width,top+height);ctx.stroke();
    ctx.fillStyle='#40596b';ctx.textAlign='right';ctx.fillText(xlabel,left+width,top+height+39);ctx.textAlign='left';ctx.fillText(ylabel,left,top-14);ctx.restore();
    return {px,py};
  }
  function hydrostaticStrips(h,b,rho,N) {
    const dz=h/N;let force=0,moment=0;
    for(let i=0;i<N;i++){const z=(i+.5)*dz,df=rho*g*z*b*dz;force+=df;moment+=z*df;}
    return {force,moment,center:moment/force,exactForce:rho*g*b*h*h/2,exactCenter:2*h/3};
  }
  function pipeProfile(r,Re) {
    const radius=Math.min(1,Math.abs(r)),mix=Math.max(0,Math.min(1,(Re-2320)/1680));
    return (1-mix)*2*(1-radius*radius)+mix*60/49*(1-radius)**(1/7);
  }
  // Small mathematical labels, including proper subscripts on canvas.
  function mathText(ctx, label, x, y, stroke=false) {
    const paint=stroke?'strokeText':'fillText';
    if (!String(label).includes('_')) { ctx[paint](label,x,y); return; }
    const parts=String(label).split(/(_[A-Za-z0-9]+)/g), base=ctx.font, size=+(base.match(/([\d.]+)px/)?.[1]||14);
    const widths=parts.map(p=>{ctx.font=p.startsWith('_')?base.replace(/[\d.]+px/,size*.72+'px'):base;return ctx.measureText(p.replace(/^_/, '')).width;});
    const align=ctx.textAlign,total=widths.reduce((a,b)=>a+b,0);
    if(align==='center')x-=total/2;else if(align==='right'||align==='end')x-=total;
    ctx.textAlign='left';
    parts.forEach((p,i)=>{const sub=p.startsWith('_');ctx.font=sub?base.replace(/[\d.]+px/,size*.72+'px'):base;ctx[paint](p.replace(/^_/,''),x,y+(sub?size*.25:0));x+=widths[i];});
    ctx.font=base;ctx.textAlign=align;
  }
  let plotId = 0;
  function plot(options) {
    const {x=[0,1],y=[0,1],width=880,height=380,title='',xlabel='',ylabel='',curves=[],points=[],note=''}=options;
    const l=85,r=width-30,t=70,b=height-78,px=v=>l+(v-x[0])/(x[1]-x[0])*(r-l),py=v=>b-(v-y[0])/(y[1]-y[0])*(b-t);
    const id='mf1-plot-'+(++plotId),text=(s,xx,yy,attrs='')=>`<text x="${xx}" y="${yy}" ${attrs}>${escape(s)}</text>`;
    let body=`<title>${escape(title)}</title><desc>${escape(xlabel+'; '+ylabel+'. '+note)}</desc><rect width="${width}" height="${height}" rx="12" fill="#fbfdff"/>`;
    body+=text(title,l,29,'font-size="19" font-weight="700" fill="#163247"')+text(ylabel,l,54,'font-size="14" fill="#536b7c"');
    for(const v of ticks(...x))body+=`<path d="M${px(v)} ${t}V${b}" stroke="#dce7ed"/>`+text(number(v),px(v),b+24,'text-anchor="middle" font-size="14"');
    for(const v of ticks(...y))body+=`<path d="M${l} ${py(v)}H${r}" stroke="#dce7ed"/>`+text(number(v),l-12,py(v)+5,'text-anchor="end" font-size="14"');
    body+=`<path d="M${l} ${t}V${b}H${r}" fill="none" stroke="#7b93a3" stroke-width="1.5"/><defs><clipPath id="${id}"><rect x="${l}" y="${t}" width="${r-l}" height="${b-t}"/></clipPath></defs><g clip-path="url(#${id})">`;
    curves.forEach((c,index)=>{
      const pairs=c.data||Array.from({length:241},(_,i)=>{const xx=x[0]+i/240*(x[1]-x[0]);return [xx,c.fn(xx)];});
      let d='',start=true;
      for(const [xx,yy]of pairs){if(!Number.isFinite(xx)||!Number.isFinite(yy)){start=true;continue;}d+=(start?'M':'L')+px(xx).toFixed(3)+' '+py(yy).toFixed(3);start=false;}
      body+=`<path data-curve="${index}" d="${d}" fill="none" stroke="${c.color||'#087eab'}" stroke-width="3" ${c.dash?'stroke-dasharray="'+c.dash+'"':''} stroke-linejoin="round"/>`;
    });
    for(const p of points){if(!Number.isFinite(p.x)||!Number.isFinite(p.y))continue;
      body+=`<path d="M${px(p.x)} ${b}V${py(p.y)}H${l}" fill="none" stroke="${p.color||'#bc5734'}" stroke-dasharray="5 5" opacity=".55"/><circle cx="${px(p.x)}" cy="${py(p.y)}" r="6" fill="${p.color||'#bc5734'}" stroke="#fff" stroke-width="2"><title>${escape(p.label||number(p.x)+'; '+number(p.y))}</title></circle>`;
    }
    body+='</g>'+text(xlabel,r,b+49,'text-anchor="end" font-size="14" fill="#536b7c"');
    if(note)body+=text(note,l,height-10,'font-size="13" fill="#536b7c"');
    return `<svg class="mf1-quantitative" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(title+'. '+note)}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  }
  function renderPlot(svg, options) {
    const holder=document.createElement('div');holder.innerHTML=plot(options);const el=holder.firstElementChild;
    svg.setAttribute('viewBox',el.getAttribute('viewBox'));svg.setAttribute('aria-label',el.getAttribute('aria-label'));
    svg.classList.add('mf1-quantitative');svg.innerHTML=el.innerHTML;
  }
  function decision(container,{title='Uvjet → model → posljedica',branches=[],summary=''}={}) {
    if(!container)return;
    const signature=JSON.stringify([title,branches,summary]);
    if(container.dataset.decisionState===signature&&container.querySelector('.mf1-decision-branches'))return;
    container.dataset.decisionState=signature;container.classList.add('mf1-decision');
    const doc=container.ownerDocument,fragment=doc.createDocumentFragment();
    const heading=doc.createElement('strong');heading.className='mf1-decision-title';heading.textContent=title;fragment.append(heading);
    const list=doc.createElement('ol');list.className='mf1-decision-branches';
    branches.forEach((branch,index)=>{
      const item=doc.createElement('li');item.dataset.active=String(!!branch.active);item.dataset.branch=String(index);
      const condition=doc.createElement('strong');condition.className='mf1-decision-condition';condition.textContent=(branch.active?'● Vrijedi: ':'Ako: ')+(branch.when||'');item.append(condition);
      if(branch.equation){const equation=doc.createElement('span');equation.className='mf1-decision-equation';equation.textContent=branch.equation;item.append(equation);}
      if(branch.active&&branch.then){const result=doc.createElement('span');result.className='mf1-decision-result';result.textContent='Zato: '+branch.then;item.append(result);}
      list.append(item);
    });
    fragment.append(list);
    if(summary){const note=doc.createElement('p');note.className='mf1-decision-summary';note.textContent=summary;fragment.append(note);}
    container.replaceChildren(fragment);
  }
  const api={decision,ticks,ocean,powerLaw,arcPressure,colebrook,pipeFriction,pipeBranch,parallelPipes,pipeProfile,fitCanvas,canvasAxes,hydrostaticStrips,mathText,plot,renderPlot,number};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  Object.assign(scope.MF1||(scope.MF1={}),api);
})(typeof window==='undefined'?globalThis:window);
