const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const near=(a,b,t=1e-8)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} ≈ ${b}`);
const nums=p=>p.getAttribute('d').match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi).map(Number);
function run(fn){const a=load(11),r=a.w.document.getElementById('v11-momentum-lab');try{fn(a,r,id=>r.querySelector('#v11m-'+id));a.scan('individual momentum');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function set(a,q,alpha=30,mdot=14,ratio=7/113,p1=0){for(const[id,v]of Object.entries({alpha,mdot,ratio,p1}))a.change(q(id),v);return q('scene').closest('#v11-momentum-lab').mf1MomentumState;}
function flux(A,V){const R=Math.sqrt(A/Math.PI),N=400,dr=R/N;let f=0,m=0;for(let i=0;i<=N;i++){const r=i*dr,u=V*(1+.3*(1-2*(r/R)**2)),k=i===0||i===N?1:i%2?4:2;f+=k*1000*u*u*2*Math.PI*r;m+=k*1000*u*2*Math.PI*r;}return{momentum:f*dr/3,mass:m*dr/3};}

test('Independent surface integrals of a profile with beta 1.03 give the drawn control-volume force balance',()=>run((a,r,q)=>{
 for(const angle of [0,30,90,130,180])for(const ratio of [.06,7/113,1]){
  const s=set(a,q,angle,14,ratio,202.1755162502937),f1=flux(s.A1,s.v1),f2=flux(s.A2,s.v2),c=angle===90?0:Math.cos(angle*Math.PI/180),sn=angle===0||angle===180?0:Math.sin(angle*Math.PI/180);
  near(f1.mass,14);near(f2.mass,14);near(s.pA+s.rx,f2.momentum*c-f1.momentum);near(s.rz,f2.momentum*sn);
  near(s.fluidForce.x,-s.rx);near(s.fluidForce.z,-s.rz);near(s.supportForce.x,s.rx);near(s.supportForce.z,s.rz);near(s.residual,0);
  const g=s.geometry,p1=nums(q('sec1')),p2=nums(q('sec2')),n1=nums(q('n1')),n2=nums(q('n2'));
  near(p1[0],g.ix);near((p1[1]+p1[3])/2,g.by);near((p2[0]+p2[2])/2,g.end.x);near((p2[1]+p2[3])/2,g.end.y);near(Math.hypot(p2[2]-p2[0],p2[3]-p2[1])/Math.hypot(p1[2]-p1[0],p1[3]-p1[1]),Math.sqrt(ratio));
  near((p2[2]-p2[0])*c+(p2[3]-p2[1])*(-sn),0);near(n1[2]-n1[0],-24);near(n2[2]-n2[0],24*c);near(n2[3]-n2[1],-24*sn);
  assert.equal(q('cv-boundary').getAttribute('d'),q('pipe-fluid').getAttribute('d'));if(angle)assert.match(q('pipe-fluid').getAttribute('d'),/ A /);
 }
}));

test('Both exact vector polygons keep fixed scales through every integer bend angle and mobile/desktop widths',()=>run((a,r,q)=>{
 for(const width of [300,900]){
  q('scene').getBoundingClientRect=()=>({width,height:600});
  let prev=-1;
  for(let angle=0;angle<=180;angle++){
   const s=set(a,q,angle,20,.06,250),v1=nums(q('loc-v1')),v2=nums(q('loc-v2')),dv=nums(q('loc-dv')),P=nums(q('force-p')),R=nums(q('force-r')),M=nums(q('force-m'));
   near(s.velocityScale,4);near(s.sceneVelocityScale,2);near(s.forceScale,.06);near(v1[2]-v1[0],s.v1*4);near(v2[2]-v2[0],s.v2x*4);near(v2[3]-v2[1],-s.v2z*4);near(dv[0],v1[2]);near(dv[1],v1[3]);near(dv[2],v2[2]);near(dv[3],v2[3]);near(P[2]-P[0],s.pA*.06);near(R[0],P[2]);near(R[1],P[3]);near(R[2],M[2]);near(R[3],M[3]);near(M[2]-M[0],s.dpx*.06);near(M[3]-M[1],-s.dpz*.06);
   assert.ok(s.R>=prev-1e-8);prev=s.R;const expectedZ=1.03*20*(20/(1000*.0113*.06))*Math.sin(angle*Math.PI/180);near(s.rz,expectedZ);
   for(const el of[q('loc-v1'),q('loc-v2'),q('loc-dv'),q('force-p'),q('force-r'),q('force-m')]){const p=nums(el),vb=el.closest('svg').getAttribute('viewBox').split(' ').map(Number);for(let i=0;i<p.length;i+=2){assert.ok(p[i]>=0&&p[i]<=vb[2]);assert.ok(p[i+1]>=0&&p[i+1]<=vb[3]);}}
  }
 }
}));

test('Original presets preserve exact Bernoulli data, and 180 degrees has exactly zero vertical reaction',()=>run((a,r,q)=>{
 r.querySelector('[data-v11m-preset="z100"]').click();let s=r.mf1MomentumState;near(s.A2,.0007,1e-14);near(s.p1,1000*((20**2-(14/11.3)**2)/2+9.81*.3),1e-13);near(s.p1,202175.5162502937);near(s.v1,1.2389380530973);near(s.v2,20);near(s.dpx,231.8962397258);near(s.dpz,144.2);near(s.pA,2284.5833336283);near(s.R,2057.74584084);near(s.pCritical,20521.7911261742);
 r.querySelector('[data-v11m-preset="z101"]').click();s=r.mf1MomentumState;near(s.rx,-2590.848820354);assert.equal(s.rz,0);assert.equal(s.v2z,0);near(nums(q('R'))[3]-nums(q('R'))[1],0);
 r.querySelector('[data-v11m-preset="straight"]').click();s=r.mf1MomentumState;assert.equal(s.R,0);assert.equal(s.rx,0);assert.equal(s.rz,0);assert.equal(q('R').parentElement.querySelectorAll('path').length,1);assert.equal(q('force-r').parentElement.querySelectorAll('path').length,1);
}));

test('The exact pressure threshold activates only the equality branch and is unavailable when a negative pressure is required',()=>run((a,r,q)=>{
 for(const angle of [0,30,60,89,90,130,180]){
  let s=set(a,q,angle,14,7/113,0);assert.equal(q('critical').disabled,s.pCritical<0);
  if(s.pCritical>=0){q('critical').click();s=r.mf1MomentumState;assert.equal(s.rx,0);near(s.p1,s.pCritical);assert.equal(r.querySelector('.mf1-decision li[data-active="true"]').dataset.branch,'1');assert.match(q('cause').textContent,/Prag vodoravne reakcije/);a.change(q('p1'),s.p1/1000+.001);assert.ok(r.mf1MomentumState.rx<0);}
  assert.equal(r.querySelectorAll('.mf1-decision li[data-active="true"]').length,1);
 }
 assert.equal(q('p1').step,'any');assert.equal(q('ratio').step,'any');
}));

test('Doubling mass flow quadruples momentum flux while pressure changes only the x reaction by minus A1 dp',()=>run((a,r,q)=>{
 const a1=set(a,q,30,5,.15,80),a2=set(a,q,30,10,.15,80);near(a2.v1,2*a1.v1);near(a2.v2,2*a1.v2);near(a2.dpx,4*a1.dpx);near(a2.dpz,4*a1.dpz);near(a2.rx+a2.pA,4*(a1.rx+a1.pA));near(a2.rz,4*a1.rz);near(a2.pA,a1.pA);assert.notEqual(a2.rx,4*a1.rx);
 const b=set(a,q,30,10,.15,160);near(b.v1,a2.v1);near(b.v2,a2.v2);near(b.dpx,a2.dpx);near(b.dpz,a2.dpz);near(b.rx-a2.rx,-.0113*80000);near(b.rz,a2.rz);assert.match(q('cause').textContent,/Promjena tlaka/);assert.doesNotMatch(q('cause').textContent,/\b(mdot|ratio|p1)\b/);
}));

test('Three views share one model, three readings and optional sketch layers, all native vectors',()=>run((a,r,q)=>{
 assert.equal(r.querySelectorAll('.v11m-results output').length,3);assert.equal(r.querySelectorAll('input[type="range"]').length,4);assert.equal(r.querySelectorAll('canvas,image,foreignObject').length,0);assert.equal(r.querySelectorAll('#v11m-sketch-details [data-v11m-layer]').length,5);assert.equal(q('layer-momentum').getAttribute('display'),'none');
 const initial=r.mf1MomentumState;
 for(const button of r.querySelectorAll('[data-v11m-view]')){button.click();assert.equal(r.querySelectorAll('[data-v11m-panel]:not([hidden])').length,1);near(r.mf1MomentumState.R,initial.R);assert.equal(button.getAttribute('aria-pressed'),'true');}
 for(const b of r.querySelectorAll('[data-v11m-layer]')){const key=b.dataset.v11mLayer;b.click();assert.equal(q('layer-'+key).getAttribute('display')==='none',b.getAttribute('aria-pressed')==='false');}
}));
