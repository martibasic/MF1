const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const near=(a,b,tol=1e-8)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} ≈ ${b}`);
const nums=p=>p.getAttribute('d').match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi).map(Number);
const vector=(s,id)=>{const p=nums(s.querySelector('#'+id+' path'));return {x:p[0],y:p[1],dx:p[2]-p[0],dy:p[3]-p[1]};};
function run(fn){const a=load(7),r=a.w.document.getElementById('widget-submerged-sym'),s=r.querySelector('#symc');try{fn(a,r,s);a.scan('individual symmetric cylinder');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function set(a,r,z,step=1){a.change(r.querySelector('#symz'),z);r.querySelector(`[data-k="${step}"]`).click();return r.mf1Physics;}

test('Independent normal-traction quadrature resolves both half forces and gives the same closed-cylinder buoyancy at every depth',()=>run((a,r,s)=>{
 for(const z of [1.2,2.5,5]){
  const N=50000,dt=2*Math.PI/N;let fx=0,fz=0,upper=0,lower=0,moment=0,uniformX=0,uniformZ=0;
  for(let i=0;i<N;i++){
   const t=(i+.5)*dt,nx=Math.cos(t),nz=Math.sin(t),p=9.81*(z+nz),dfx=-p*nx*dt,dfz=-p*nz*dt;
   fx+=dfx;fz+=dfz;moment+=nx*dfz-nz*dfx;if(nz<0)upper+=dfz;else lower-=dfz;
   uniformX-=9.81*3.8*nx*dt;uniformZ-=9.81*3.8*nz*dt;
  }
  const m=set(a,r,z,3);near(m.forceDown,upper,1e-8);near(m.forceUp,lower,1e-8);near(m.fx,fx);near(m.force,-fz);near(m.force,m.forceUp-m.forceDown);near(m.force,9.81*Math.PI);near(moment,0);near(uniformX,0);near(uniformZ,0);
  near(m.pTop,9.81*(z-1));near(m.pBottom,9.81*(z+1));near(m.deltaP,19.62);
  assert.ok(m.forceDown>0&&m.forceUp>m.forceDown);
 }
}));

test('The displayed circle, depth ruler and pressure arrow scale remain fixed when depth changes on narrow or wide screens',()=>run((a,r,s)=>{
 for(const width of [300,700]){
  s.getBoundingClientRect=()=>({left:0,top:0,width,height:650});let previous;
  for(const z of [1.2,2.5,5]){
   const m=set(a,r,z),g=m.geometry,c=s.querySelector('#sym-cylinder'),surface=s.querySelector('#sym-surface');
   near(+c.getAttribute('r'),70);near(+c.getAttribute('cx'),g.cx);near(+c.getAttribute('cy'),+surface.getAttribute('y1')+70*z);near(+surface.getAttribute('y1'),72);near(g.height,650);near(g.scale,70);
   const ref=vector(s,'sym-pressure-scale');near(ref.dx/50,.6);near(ref.dy,0);
   for(const group of s.querySelectorAll('[data-theta]')){
    const theta=+group.dataset.theta,p=+group.dataset.pressure,v=nums(group.querySelector('path')),dx=v[2]-v[0],dy=v[3]-v[1];
    near(p,9.81*(z+Math.sin(theta)));near(v[0],g.cx+70*Math.cos(theta));near(v[1],g.cy+70*Math.sin(theta));near(dx,-.6*p*Math.cos(theta));near(dy,-.6*p*Math.sin(theta));
   }
   if(previous){near(m.force,previous.force);assert.ok(m.pTop>previous.pTop&&m.pBottom>previous.pBottom);assert.ok(m.forceDown>previous.forceDown&&m.forceUp>previous.forceUp);}
   previous=m;
  }
 }
}));

test('The actual highlighted lower mirror pair has equal depth and pressure, opposite horizontal traction and additive upward traction',()=>run((a,r,s)=>{
 for(const z of [1.2,2.5,5]){
  const m=set(a,r,z,2),g=m.geometry,groups=['left','right'].map(side=>s.querySelector('#sym-pair-'+side)),vs=groups.map(el=>nums(el.querySelector('path')));
  near(+groups[0].dataset.pressure,+groups[1].dataset.pressure);near(vs[0][1],vs[1][1]);near((vs[0][1]-g.sy)/g.scale,m.pairDepth);
  near(vs[0][2]-vs[0][0],-(vs[1][2]-vs[1][0]));near(vs[0][3]-vs[0][1],vs[1][3]-vs[1][1]);assert.ok(vs[0][3]<vs[0][1]);near((vs[0][3]-vs[0][1])/.6,-m.pairComponent);
  near(+groups[0].dataset.nx,-Number(groups[1].dataset.nx));near(+groups[0].dataset.nz,+groups[1].dataset.nz);
  assert.match(r.querySelector('#symcap').textContent,/jednake plošne elemente dA/);assert.match(r.querySelector('#symcap').textContent,/zbrajaju/);assert.equal(+r.querySelector('#symn [data-active=true]').dataset.branch,0);
 }
}));

test('Integrated half forces and net buoyancy share a published kN scale and the symmetry axis without a false couple',()=>run((a,r,s)=>{
 for(const z of [1.2,2.5,5]){
  const m=set(a,r,z,3),g=m.geometry,D=vector(s,'sym-force-down'),U=vector(s,'sym-force-up'),B=vector(s,'sym-force-buoyancy'),ref=vector(s,'sym-force-scale'),k=ref.dx/100;
  near(k,.6);for(const v of [D,U,B]){near(v.x,g.cx);near(v.dx,0);}
  near(D.y,g.cy-g.r);near(U.y,g.cy+g.r);near(B.y,g.cy);near(D.dy,m.forceDown*k);near(U.dy,-m.forceUp*k);near(B.dy,-m.force*k);near(D.dy+U.dy,B.dy);
  assert.match(s.textContent,new RegExp(m.forceDown.toLocaleString('hr-HR',{minimumFractionDigits:2,maximumFractionDigits:2})));assert.match(s.textContent,new RegExp(m.forceUp.toLocaleString('hr-HR',{minimumFractionDigits:2,maximumFractionDigits:2})));
  const upper=nums(s.querySelector('#sym-upper-half')),lower=nums(s.querySelector('#sym-lower-half'));near(upper[0],g.cx-g.r);near(upper[7],g.cx+g.r);near(lower[0],g.cx+g.r);near(lower[7],g.cx-g.r);
 }
}));

test('Three original stages keep one control and native vector surface, expose both meaningful comparisons and readable mobile labels',()=>run((a,r,s)=>{
 for(const width of [300,700])for(const step of [1,2,3]){
  s.getBoundingClientRect=()=>({left:0,top:0,width,height:650});const m=set(a,r,2.5,step);
  assert.equal(r.querySelectorAll('input[type=range]').length,1);assert.equal(r.querySelectorAll('[data-k]').length,3);assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelectorAll('canvas,image,img,foreignObject').length,0);
  assert.equal(r.querySelectorAll('#symn [data-active=true]').length,1);assert.equal(+r.querySelector('#symn [data-active=true]').dataset.branch,step===2?0:1);assert.equal(s.querySelector('#sym-force-buoyancy')!==null,step===3);
  for(const t of s.querySelectorAll('text'))assert.ok(+t.closest('[font-size]').getAttribute('font-size')>=17);
  assert.match(r.querySelector('#symn').textContent,/∮ n dA = 0/);near(m.force,30.81902393171587);
 }
}));
