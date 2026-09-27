const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const near=(a,b,tol=1e-8)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} ≈ ${b}`);
const nums=p=>p.getAttribute('d').match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi).map(Number);
const arrow=(s,id)=>{const v=nums(s.querySelector('#'+id+' path'));return {x:v[0],y:v[1],dx:v[2]-v[0],dy:v[3]-v[1]};};
function run(fn){const a=load(9),r=a.w.document.getElementById('v9-z76'),s=r.querySelector('#z76-scene');try{fn(a,r,s);a.scan('individual jet');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function set(a,r,H,ratio){a.change(r.querySelector('#z76-h'),H);a.change(r.querySelector('#z76-r'),ratio);return r.mf1JetState;}
function bezier(p,u){return [(1-u)**2*p[0]+2*u*(1-u)*p[2]+u*u*p[4],(1-u)**2*p[1]+2*u*(1-u)*p[3]+u*u*p[5]];}

test('Exact native quadratic geometry obeys independent constant-acceleration ballistics and conserved energy at every time',()=>run((a,r,s)=>{
 for(const width of [300,900])for(const H of [2,5,10])for(const ratio of [.05,.25,.5,.75,.95]){
  s.getBoundingClientRect=()=>({left:0,top:0,width,height:600});const m=set(a,r,H,ratio),g=m.geometry,p=nums(s.querySelector('#z76-main-path'));
  assert.match(s.querySelector('#z76-main-path').getAttribute('d'),/^M [\d.e+ -]+ Q /);near(p[1],p[3]);near(p[2],(p[0]+p[4])/2);near(p[4],g.x0+m.x*g.scale);near(p[5],g.base);
  for(const u of [0,.1,.25,.5,.75,1]){
   const [px,py]=bezier(p,u),tau=u*m.t,x=(px-g.x0)/g.scale,z=(g.base-py)/g.scale;
   const vx=2*((1-u)*(p[2]-p[0])+u*(p[4]-p[2]))/(g.scale*m.t),vz=-2*((1-u)*(p[3]-p[1])+u*(p[5]-p[3]))/(g.scale*m.t);
   near(x,m.v*tau);near(z,m.h-9.81*tau*tau/2);near(vx,m.v);near(vz,-9.81*tau);near((vx*vx+vz*vz)/2+9.81*z,9.81*H);
   if(u===1){near(z,0);near(Math.hypot(vx,vz),Math.sqrt(2*9.81*H));}
  }
  near(m.impact,Math.sqrt(19.62*H));
 }
}));

test('Metre scales are isotropic and stay fixed as H changes; dimensions and the drawn range grow physically',()=>run((a,r,s)=>{
 for(const width of [300,900]){
  s.getBoundingClientRect=()=>({left:0,top:0,width,height:600});const one=set(a,r,2,.25),g1=one.geometry,dim1=s.querySelector('#z76-range-dimension'),range1=+dim1.getAttribute('x2')- +dim1.getAttribute('x1');
  const five=set(a,r,10,.25),g5=five.geometry,dim5=s.querySelector('#z76-range-dimension'),range5=+dim5.getAttribute('x2')- +dim5.getAttribute('x1');
  near(g5.scale,g1.scale);near(g5.base,g1.base);near(g5.x0,g1.x0);near(g5.base-g5.surface,5*(g1.base-g1.surface));near(range5,5*range1);near(five.v,one.v*Math.sqrt(5));near(five.t,one.t*Math.sqrt(5));near(five.x,5*one.x);
  const hd=s.querySelector('#z76-height-dimension'),head=s.querySelector('#z76-head-dimension');near((+hd.getAttribute('y2')- +hd.getAttribute('y1'))/five.h,g5.scale);near((+head.getAttribute('y2')- +head.getAttribute('y1'))/five.head,g5.scale);near(range5/five.x,g5.scale);near(+s.querySelector('#z76-water').getAttribute('height'),10*g5.scale);
 }
}));

test('Complementary apertures exchange flight factors, have equal range and reveal a unique maximum at h/H=1/2',()=>run((a,r,s)=>{
 for(const H of [2,5,10]){
  let previous;
  for(let i=1;i<=19;i++){
   const ratio=i*.05,m=set(a,r,H,ratio);if(previous){assert.ok(m.v<previous.v);assert.ok(m.t>previous.t);assert.ok(ratio<=.5?m.x>previous.x:m.x<previous.x);}
   previous=m;near(m.symmetric.v*m.symmetric.t,m.x);near(m.symmetric.v,m.t*9.81);near(m.symmetric.t,m.v/9.81);assert.ok(m.curvature<0);
   const branch=+r.querySelector('#z76-note [data-active=true]').dataset.branch;assert.equal(branch,i<10?0:i===10?1:2);if(i===10)near(m.x,H);
  }
 }
 const lo=set(a,r,5,.25),hi=set(a,r,5,.75);near(lo.v,8.5775870733);near(lo.t,.50481877735);near(lo.x,4.3301270189);near(hi.v,4.9522722058);near(hi.t,.87437177098);near(hi.x,lo.x);
 for(const ratio of [.15,.35,.5,.65,.85]){
  const m=set(a,r,5,ratio),eps=.0001,minus=set(a,r,5,ratio-eps),plus=set(a,r,5,ratio+eps),dh=5*eps;near(m.slope,(plus.x-minus.x)/(2*dh),2e-6);near(m.curvature,(plus.x-2*m.x+minus.x)/(dh*dh),2e-6);
 }
}));

test('The only real aperture remains above the bottom and below the free surface, including the 0.1m critical height',()=>run((a,r,s)=>{
 for(const width of [300,900])for(const H of [2,10])for(const ratio of [.05,.95]){
  s.getBoundingClientRect=()=>({left:0,top:0,width,height:600});const m=set(a,r,H,ratio),g=m.geometry,p=nums(s.querySelector('#z76-tank-walls'));
  assert.ok(g.hole-g.gap/2>g.surface);assert.ok(g.hole+g.gap/2<g.base);near(p[4],g.hole+g.gap/2);near(p[6],g.hole-g.gap/2);near(p[7],g.surface-12);
  assert.match(s.querySelector('#z76-tank-walls').getAttribute('d'),/^M [\d.e+ -]+ V /,'tank starts with a vertical open side, no roof');
  assert.equal(s.querySelector('#z76-water').getAttribute('stroke'),null);const surface=s.querySelector('#z76-surface');near(+surface.getAttribute('y1'),g.surface);near(+surface.getAttribute('y2'),g.surface);
 }
 const m=set(a,r,2,.05);near(m.h,.1);near(m.v,6.1055712263);near(m.t,.14278431229);near(m.x,.8717797887);
}));

test('Three hypothetical comparisons are independent toggles and never overpaint a coincident main trajectory',()=>run((a,r,s)=>{
 const refs=[['q25',.25],['q50',.5],['q75',.75]];
 for(const ratio of [.05,.25,.5,.75,.95]){
  set(a,r,5,ratio);for(const [id,reference]of refs)assert.equal(s.querySelector('#z76-ref-'+id)!==null,ratio!==reference);
  assert.equal(s.querySelectorAll('#z76-main-path').length,1);assert.equal(s.querySelectorAll('polyline').length,0);
 }
 for(const [id]of refs){const input=r.querySelector('#z76-'+id);input.checked=false;input.dispatchEvent(new a.w.Event('input',{bubbles:true}));assert.equal(s.querySelector('#z76-ref-'+id),null);}
 assert.deepEqual(Array.from(r.mf1JetState.references),[]);assert.equal(s.querySelectorAll('#z76-paths>path').length,1);
 assert.match(r.querySelector('.z76-caption').textContent,/druga moguća mjesta jednog otvora/);
}));

test('Velocity calibration, three exact time probes and one coherent update remain accessible in a single SVG',()=>run((a,r,s)=>{
 for(const H of [2,5,10])for(const ratio of [.05,.5,.95]){
  const m=set(a,r,H,ratio),g=m.geometry,V=arrow(s,'z76-arrow'),ref=arrow(s,'z76-velocity-scale');near(ref.dx/5,4);near(V.dx,m.v*4);near(V.dy,0);near(V.x,g.x0);near(V.y,g.hole);
  for(const circle of s.querySelectorAll('[data-time-fraction]')){const tau=+circle.dataset.time;near(tau,m.t*Number(circle.dataset.timeFraction));near(+circle.getAttribute('cx'),g.x0+m.v*tau*g.scale);near(+circle.getAttribute('cy'),g.base-(m.h-9.81*tau*tau/2)*g.scale);}
 }
 const original=a.w.MF1.decision;let calls=0;a.w.MF1.decision=(el,...args)=>{if(el.id==='z76-note')calls++;return original(el,...args);};r.querySelector('#z76-r').dispatchEvent(new a.w.Event('input',{bubbles:true}));assert.equal(calls,1);
 assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelectorAll('.v9-results>div').length,3);assert.equal(r.querySelectorAll('input[type=range]').length,2);assert.equal(r.querySelectorAll('input[type=checkbox]').length,3);assert.equal(r.querySelectorAll('canvas,image,img,foreignObject,.v9-plot,.v9-primary').length,0);
 for(const t of s.querySelectorAll('text'))assert.ok(+t.closest('[font-size]').getAttribute('font-size')>=17);
}));
