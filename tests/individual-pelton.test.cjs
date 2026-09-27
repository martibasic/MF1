const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {load}=require('./widget-harness.cjs');
const near=(a,b,t=1e-9)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} ≈ ${b}`);
const nums=p=>p.getAttribute('d').match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi).map(Number);
function run(fn){const a=load(12),r=a.w.document.getElementById('v12-pelton'),q=k=>r.querySelector('[data-k="'+k+'"]');try{fn(a,r,q);a.scan('individual Pelton');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function set(a,r,q,values){for(const[k,v]of Object.entries(values))a.change(q(k),v);return r.mf1PeltonState;}
function vector(r,id){return nums(r.querySelector('#v12p-'+id+' path'));}

test('Independent momentum and energy sums of two half-jets conserve torque, power and axial cancellation',()=>run((a,r,q)=>{
 for(const v of [10,50,80])for(const ratio of [0,.25,.5,Math.PI/5,.9,1])for(const beta of [95,160,175])for(const k of [.6,1]){
  const s=set(a,r,q,{v,u:ratio,b:beta,k}),W=v*(1-ratio),betaRad=beta*Math.PI/180,half=1000*s.q/2,outlets=[{vt:s.u+k*W*Math.cos(betaRad),va:k*W*Math.sin(betaRad)},{vt:s.u+k*W*Math.cos(betaRad),va:-k*W*Math.sin(betaRad)}];
  const Ft=outlets.reduce((sum,x)=>sum+half*(v-x.vt),0),Fa=outlets.reduce((sum,x)=>sum-half*x.va,0),torque=outlets.reduce((sum,x)=>sum+half*2*(v-x.vt),0),kinetic=outlets.reduce((sum,x)=>sum+.5*half*(x.vt*x.vt+x.va*x.va),0),dissipation=2*.5*half*(W*W-(k*W)**2);
  near(s.F,Ft);near(s.axialForce,Fa);near(s.M,torque);near(s.P,torque*s.omega);near(s.Pexit,kinetic);near(s.Ploss,dissipation);near(s.Pin,s.P+kinetic+dissipation);near(s.eta,s.P/(.5*1000*s.q*v*v));near(s.halves[0].forceAxial+s.halves[1].forceAxial,0);near(s.energyResidual,0,1e-7);
 }
}));

test('Original 150 rpm preset and exact optimum retain full precision; U equals V is a regular zero-force endpoint',()=>run((a,r,q)=>{
 r.querySelector('[data-p="z"]').click();let s=r.mf1PeltonState;assert.equal(s.ratio,Math.PI/5);near(s.n,150);near(s.u,10*Math.PI);near(s.F,360473.90162462);near(s.P,11324621.61154756);near(s.M,720947.80324924);near(s.Pin,12.5e6);near(s.Pexit,1175378.3884524);near(s.diameter,.504626504404);
 r.querySelector('[data-p="optimum"]').click();s=r.mf1PeltonState;assert.equal(s.ratio,.5);near(s.P,12123078.8799);near(s.eta,.96984631039);near(s.vtheta,1.50768448035);assert.ok(s.vtheta>0);assert.equal(s.dPdU,0);
 r.querySelector('[data-p="limit"]').click();s=r.mf1PeltonState;for(const k of ['w','wx','wy','va','F','P','M','Ploss'])assert.equal(Math.abs(s[k]),0);near(s.Pexit,s.Pin);assert.equal(s.eta,0);assert.equal(q('u').max,'1');assert.equal(q('u').step,'any');
 for(const id of ['in-w','out-w'])assert.equal(r.querySelector('#v12p-'+id).querySelectorAll('path').length,1,'zero vector has no arrowhead');
}));

test('All five causal branches are exclusive even arbitrarily close to the exact optimum and endpoints',()=>run((a,r,q)=>{
 for(const [ratio,index]of [[0,0],[1e-10,1],[.5-1e-10,1],[.5,2],[.5+1e-10,3],[1-1e-10,3],[1,4]]){
  const s=set(a,r,q,{u:ratio}),active=[...r.querySelectorAll('.mf1-decision li[data-active=true]')];assert.equal(active.length,1);assert.equal(+active[0].dataset.branch,index);if(ratio>0&&ratio<1){const e=.01,fun=u=>1000*s.q*u*(s.v-u)*(1-s.k*Math.cos(s.beta)),numeric=(fun(s.u+e)-fun(s.u-e))/(2*e);near(numeric,s.dPdU,1e-4);}
 }
}));

test('One published velocity scale closes all six vectors at every limit, while rotor geometry preserves the real jet-to-radius ratio',()=>run((a,r,q)=>{
 const rotor=r.querySelector('#v12-pelton-rotor');for(const width of [300,900])for(const v of[10,80])for(const ratio of[0,.5,1])for(const beta of[95,175]){
  rotor.getBoundingClientRect=()=>({width,height:600});const s=set(a,r,q,{v,u:ratio,b:beta,k:.6}),g=s.rotorGeometry,I=['in-u','in-w','in-v'].map(id=>vector(r,id)),O=['out-u','out-w','out-v'].map(id=>vector(r,id));
  for(const [U,W,V]of[I,O]){near(U[2],W[0]);near(U[3],W[1]);near(U[2]-U[0]+W[2]-W[0],V[2]-V[0]);near(U[3]-U[1]+W[3]-W[1],V[3]-V[1]);}
  near(I[0][2]-I[0][0],1.5*s.u);near(I[1][2]-I[1][0],1.5*s.w);near(O[1][2]-O[1][0],1.5*s.wx);near(O[1][3]-O[1][1],1.5*s.wy);near(O[2][2]-O[2][0],1.5*s.vtheta);near(s.velocityScale,1.5);
  near(+r.querySelector('#v12p-jet').getAttribute('height')/+r.querySelector('#v12p-pitch').getAttribute('r'),s.diameter/2);near(g.cy-g.jetY,g.R);near(g.R,g.scale*2);const dim=nums(r.querySelector('#v12p-dimension'));near(dim[3]-dim[1],g.scale*Math.sqrt(4*s.q/(Math.PI*s.v)));
  for(const group of r.querySelectorAll('.mf1-vector')){const p=nums(group.querySelector('path')),vb=group.closest('svg').getAttribute('viewBox').split(' ').map(Number);for(let i=0;i<p.length;i+=2){assert.ok(p[i]>=0&&p[i]<=vb[2]);assert.ok(p[i+1]>=0&&p[i+1]<=vb[3]);}}
 }
}));

test('Flow, speed and loss invariants preserve meaningful visual changes and the power curve is the exact parabola',()=>run((a,r,q)=>{
 let a1=set(a,r,q,{v:20,q:4,u:.3,b:160,k:.8}),a2=set(a,r,q,{q:8});near(a2.F,2*a1.F);near(a2.P,2*a1.P);near(a2.diameter,Math.sqrt(2)*a1.diameter);near(a2.vtheta,a1.vtheta);near(a2.u,a1.u);near(a2.eta,a1.eta);
 const a3=set(a,r,q,{v:40});near(a3.F,2*a2.F);near(a3.P,4*a2.P);near(a3.diameter,a2.diameter/Math.sqrt(2));near(a3.w,2*a2.w);
 for(const ratio of[0,.1,.3,.5,.8,1]){const s=set(a,r,q,{u:ratio}),p=nums(r.querySelector('#v12p-power-curve')),c=r.querySelector('#v12p-power-point'),g=s.analysisGeometry.chart;const x=(1-ratio)**2*p[0]+2*ratio*(1-ratio)*p[2]+ratio*ratio*p[4],y=(1-ratio)**2*p[1]+2*ratio*(1-ratio)*p[3]+ratio*ratio*p[5];near(+c.getAttribute('cx'),x);near(+c.getAttribute('cy'),y);near((g.base-y)/g.height,s.P/s.Pmax);}
}));

test('A single input owner, one motion controller and two exclusive native views replace the former detached renderer',()=>run((a,r,q)=>{
 assert.equal(r.querySelectorAll('.mf1-motion').length,1);assert.equal(r.querySelectorAll('.v12p-results [data-v]').length,3);assert.equal(r.querySelectorAll('input[data-k]').length,5);assert.equal(r.querySelectorAll('canvas,image,foreignObject').length,0);
 let state=r.mf1PeltonState,writes=0;Object.defineProperty(r,'mf1PeltonState',{get(){return state;},set(s){state=s;writes++;},configurable:true});a.change(q('u'),.25);assert.equal(writes,1,'one model update per input');
 for(const b of r.querySelectorAll('[data-p-view]')){b.click();assert.equal(r.querySelectorAll('.v12x-stage>svg:not([hidden])').length,1);assert.equal(b.getAttribute('aria-pressed'),'true');near(r.mf1PeltonState.ratio,.25);}
 const source=fs.readFileSync('vjezba_12.qmd','utf8');assert.doesNotMatch(source,/const drawPelton\s*=/);assert.doesNotMatch(source,/bind\('#v12-pelton'/);assert.doesNotMatch(source,/const pelton = document.getElementById\("v12-pelton"\)/);
}));
