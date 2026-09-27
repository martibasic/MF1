const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const close=(actual,expected,t=1e-8)=>assert.ok(Math.abs(actual-expected)<=t*Math.max(1,Math.abs(expected)),actual+' != '+expected);
function run(fn){const a=load(6);try{const id=s=>a.w.document.getElementById(s),root=id('widget-49');fn(a,root,id);a.scan('cylinder-gate');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function set(a,id,H,R,rho,G){for(const [key,value]of [['h',H],['r',R],['rho',rho],['gc',G]])a.change(id('z49-'+key),value);}
function integral(H,R,rho){let FH=0,FV=0,M=0;const d=Math.PI/2/40000;for(let i=0;i<40000;i++){const t=(i+.5)*d,x=-R*Math.cos(t),z=R-R*Math.sin(t),p=rho*9.81*(H-z),fx=p*Math.cos(t)*R*d/1000,fz=p*Math.sin(t)*R*d/1000;FH+=fx;FV+=fz;M+=(x+R)*fz-(z-R)*fx;}return{FH,FV,M};}

test('Z49 retains its four controls and three physical branches in one native vector scene',()=>run((a,r,id)=>{
 assert.equal(id('z49-canvas').localName,'svg');assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelector('canvas,image,foreignObject'),null);
 assert.equal(r.querySelectorAll('input').length,4);assert.equal(r.querySelectorAll('.z49-reading').length,3);
 for(const key of ['h','r','rho','gc'])assert.ok(id('z49-'+key).labels.length);
 assert.equal(id('z49-h').step,'any');assert.equal(+id('z49-h').min,1.3);assert.equal(+id('z49-h').max,7);
 for(const [G,branch]of [[80,0],[15,2]]){a.change(id('z49-gc'),G);assert.equal(r.querySelectorAll('.mf1-decision li').length,3);assert.equal(r.querySelectorAll('.mf1-decision li[data-active=true]').length,1);assert.equal(+r.querySelector('.mf1-decision li[data-active=true]').dataset.branch,branch);}
}));

test('Independent pressure integration recovers both forces and torque about the real hinge',()=>run((a,r,id)=>{
 for(const [H,R,rho,G]of [[5,.8,1000,37.9],[1.3,1.2,1100,15],[7,.3,900,80],[7,1.2,1100,15],[1.3,.3,900,15]]){
  set(a,id,H,R,rho,G);const m=r.mf1Physics,q=integral(H,R,rho);
  close(m.FH,q.FH,2e-9);close(m.FV,q.FV,2e-9);close(m.waterMoment,q.M,2e-9);close(m.netMoment,q.M-G*R,2e-9);
  close(m.FR,Math.hypot(q.FH,q.FV),2e-9);close(m.b,1);
 }
}));

test('Contact is unilateral: closed total moment vanishes while the opening branch claims no static hinge reaction',()=>run((a,r,id)=>{
 for(const [H,R,rho,G]of [[5,.8,1000,37.9],[1.3,1.2,1100,80],[7,.3,900,80],[7,1.2,1100,15]]){
  set(a,id,H,R,rho,G);const m=r.mf1Physics;assert.ok(m.N>=0);
  if(m.regime==='closed'){close(m.netMoment+m.N*R,0);close(m.FV+m.N-G,0);close(m.hingeHorizontal,-m.FH);close(m.hingeVertical,0);assert.ok(r.querySelector('[data-cylinder-force=hinge]'));assert.equal(r.querySelector('[data-moment-arc]').dataset.sense,'cw');}
  else {assert.equal(m.N,0);assert.ok(m.netMoment>0);assert.equal(m.hingeHorizontal,null);assert.equal(m.hingeVertical,null);assert.equal(r.querySelector('[data-cylinder-force=hinge]'),null);assert.equal(r.querySelector('[data-moment-arc]').dataset.sense,'ccw');}
 }
}));

test('The rounded textbook default still exposes the actual 7.356 N contact instead of claiming a threshold',()=>run((a,r,id)=>{
 const m=r.mf1Physics;close(m.FV,37.892643829074544);close(m.N*1000,7.356170925454819);close(m.netMoment,-.005884936740363856);close(m.criticalLevel,5.000937330647995);
 assert.equal(m.regime,'closed');assert.match(id('z49-contact').textContent,/7,356 N/);assert.match(id('z49-moment').textContent,/[-−]0,00588/);
 assert.equal(r.querySelectorAll('svg text').length,[...r.querySelectorAll('svg text')].filter(x=>!x.textContent.includes('_')).length);
}));

test('The exact threshold preset sets the true root; inaccessible levels are disabled rather than clamped',()=>run((a,r,id)=>{
 const button=id('z49-critical-preset');assert.equal(button.disabled,false);const critical=r.mf1Physics.criticalLevel;button.click();
 close(+id('z49-h').value,critical,1e-13);assert.equal(r.mf1Physics.N,0);assert.equal(r.mf1Physics.netMoment,0);assert.equal(r.mf1Physics.regime,'threshold');assert.equal(+r.querySelector('.mf1-decision li[data-active=true]').dataset.branch,1);
 set(a,id,7,.3,900,80);assert.equal(button.disabled,true);close(r.mf1Physics.criticalLevel,30.26787660565);const before=+id('z49-h').value;button.click();assert.equal(+id('z49-h').value,before);
}));

test('The actual resultant point lies on the wet arc and its line through C carries the same force direction',()=>run((a,r,id)=>{
 for(const [H,R]of [[1.3,1.2],[5,.8],[7,.3]]){
  set(a,id,H,R,1000,37.9);const m=r.mf1Physics,q=m.geometry,p=m.resultantPoint;close(p.x*p.x+(p.z-R)**2,R*R);assert.ok(p.x<0&&p.z>=0&&p.z<=R);
  close((-p.x)*m.FV-(R-p.z)*m.FH,0);close(q.qX,q.cx+p.x*q.scale);close(q.qY,q.by-p.z*q.scale);close(q.radius,R*q.scale);
  const line=r.querySelector('[data-resultant-line]');close(+line.getAttribute('x1'),q.qX);close(+line.getAttribute('y1'),q.qY);close(+line.getAttribute('x2'),q.cx);close(+line.getAttribute('y2'),q.cy);
  const wall=r.querySelector('[data-fixed-wall]');close(+wall.getAttribute('x1'),q.wall);close(+wall.getAttribute('y2'),q.cy);
 }
}));

test('Every force uses its true point and the same slider-independent kN scale',()=>run((a,r,id)=>{
 const scales=[];
 for(const [H,R,rho,G]of [[5,.8,1000,37.9],[1.3,1.2,1100,80],[7,.3,900,15],[7,1.2,1100,15]]){
  set(a,id,H,R,rho,G);const m=r.mf1Physics,q=m.geometry;scales.push(q.forceScale);
  for(const [key,x,y,fx,fz]of [['horizontal',q.cx,q.cy,m.FH,0],['vertical',q.cx,q.cy,0,m.FV],['resultant',q.cx,q.cy,m.FH,m.FV],['weight',q.cx,q.cy,0,-G],['contact',q.cx,q.by,0,m.N]]){
   const d=r.querySelector('[data-cylinder-force='+key+']').dataset;close(+d.x,x);close(+d.y,y);close(+d.dx,fx*q.forceScale);close(+d.dy,-fz*q.forceScale);
  }
  close(+r.querySelector('[data-cylinder-force=ruler]').dataset.dx,50*q.forceScale);
 }
 assert.equal(new Set(scales).size,1);
}));

test('Mobile native coordinates retain readable text and a genuine circle; broken height never changes pressure',()=>run((a,r,id)=>{
 const svg=id('z49-canvas');
 for(const width of [300,390,900]){
  svg.getBoundingClientRect=()=>({width,height:400,left:0,top:0});a.w.dispatchEvent(new a.w.Event('resize'));
  for(const [H,R]of [[1.3,1.2],[5,.8],[7,.3]]){
   set(a,id,H,R,1000,37.9);const m=r.mf1Physics,q=m.geometry,circle=r.querySelector('[data-cylinder-outline]');
   assert.equal(svg.getAttribute('viewBox').split(' ').map(Number)[2],width);close(+circle.getAttribute('r'),q.radius);close(q.cy+q.radius,q.by);close(q.cx-q.radius,q.wall);
   for(const text of svg.querySelectorAll('text'))assert.ok(parseFloat(a.w.getComputedStyle(text).fontSize)>=16);
   assert.equal(Boolean(r.querySelector('[data-height-break]')),q.broken);close(m.FH,9.81*(H-R/2)*R);close(m.s,H-R);
   if(q.broken)assert.match(id('z49-caption').textContent,/tlak se računa s punim H/);else close((q.by-q.sy)/q.scale,H);
  }
 }
}));
