const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const close=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} ≠ ${b}`);
const active=root=>[...root.querySelectorAll('.mf1-decision-branches>li[data-active=true]')];

test('Pelton conserves energy including residual jet and bucket dissipation, with the correct power branches',()=>{
 const a=load(12);try{
  const root=a.w.document.getElementById('v12-pelton'),set=(k,v)=>a.change(root.querySelector(`[data-k="${k}"]`),v);
  for(const k of [.6,.85,1])for(const ratio of [0,.25,.5,.75,.95]){
   set('k',k);set('u',ratio);const s=root.mf1PeltonState;
   close(s.Pin,s.P+s.Pexit+s.Ploss);close(s.P,s.F*s.u);
   assert.ok(s.Pexit>=0&&s.Ploss>=0);assert.equal(active(root).length,1);
   assert.equal(+active(root)[0].dataset.branch,ratio===0?0:ratio<.5?1:ratio===.5?2:3);
   set('u',ratio);assert.equal(active(root).length,1,'repeated inputs retain the explanation');
  }
  assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});

test('Rocket separates burn duration from mass ratio: equal impulse and Δv, different force',()=>{
 const a=load(12);try{
  const root=a.w.document.getElementById('v12-rocket'),set=(k,v)=>a.change(root.querySelector(`[data-k="${k}"]`),v);
  set('t',1);const s1={...root.mf1RocketState};set('t',4);const s2=root.mf1RocketState;
  close(s1.dv,s2.dv);close(s1.F,4*s2.F);close(s1.F*s1.duration,s2.F*s2.duration);
  close(s2.af/s2.a0,s2.m/s2.mf);assert.equal(+active(root)[0].dataset.branch,2);
  set('dm',2000);const s=root.mf1RocketState;close(s.dv,s.ve*Math.log(s.m/s.mf));assert.equal(+active(root)[0].dataset.branch,2);
  assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});

test('Sprinkler distinguishes locked, driving, free-running, and externally driven states',()=>{
 const a=load(12);try{
  const root=a.w.document.getElementById('v12-sprinkler'),set=(k,v)=>a.change(root.querySelector(`[data-k="${k}"]`),v);
  set('q',4);set('r',.6);
  for(const [rpm,branch,sign]of [[0,0,1],[100,1,1],[600,3,-1]]){
   set('n',rpm);const s=root.mf1SprinklerState;assert.equal(Math.sign(s.M),sign);close(s.P,s.M*s.omega);assert.equal(+active(root)[0].dataset.branch,branch);
  }
  const free=root.mf1SprinklerState.n0;set('n',free);const s=root.mf1SprinklerState;
  close(s.V,0,1e-8);close(s.M,0,1e-8);assert.equal(+active(root)[0].dataset.branch,2);
  assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});

test('Pipe budget changes correlation at Reynolds thresholds and preserves the reservoir energy balance',()=>{
 const a=load(13);try{
  const root=a.w.document.getElementById('z123-budget-widget'),q=root.querySelector('#z123-vdot-slider'),k=root.querySelector('#z123-k-slider');
  for(const [Q,branch]of [[.05,0],[.15,1],[6,2]]){
   a.change(q,Q);const s=root.mf1BudgetState;close(s.z1-4,s.lin+s.local);assert.equal(+active(root)[0].dataset.branch,branch);
   close(s.local,(1.3+s.alpha)*s.V*s.V/(2*9.81));if(Q===6)close(s.zeta,2.36);
  }
  a.change(q,.05);a.change(k,.01);const s={...root.mf1BudgetState};a.change(k,1);close(root.mf1BudgetState.lin,s.lin);
  assert.equal(root.querySelectorAll('.v13p-z123-locator,.v13p-primary').length,0,'no duplicate injected result panels');
  assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});

test('Parallel pipes choose each branch law, retain equal head, and recover the laminar fourth-power relation',()=>{
 const a=load(13);try{
  const root=a.w.document.getElementById('z124-parallel-widget'),q=root.querySelector('#z124-vtot-slider');
  a.change(q,.01);let s=root.mf1NetworkState;assert.equal(+active(root)[0].dataset.branch,0);close(s.Q1/s.Q2,(s.D1/s.D2)**4);
  for(const Q of [.2,1,30]){a.change(q,Q);s=root.mf1NetworkState;close(s.Q1+s.Q2,s.Q);close(s.b1.h,s.b2.h);assert.equal(active(root).length,1);}
  assert.equal(+active(root)[0].dataset.branch,1);
  a.change(root.querySelector('#z124-d1-slider'),80);s=root.mf1NetworkState;close(s.Q1,s.Q2);assert.match(root.querySelector('.mf1-decision-summary').textContent,/D₁ = D₂/);
  assert.equal(root.querySelectorAll('.v13p-z124-locator,.v13p-primary').length,0);
  assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});
