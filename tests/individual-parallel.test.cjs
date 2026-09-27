const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const near=(a,b,t=1e-9)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} ≈ ${b}`);
const relative=(a,b,t=1e-9)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=t*Math.abs(b),`${a} ≈ ${b}`);
function run(fn){const a=load(13),r=a.w.document.getElementById('z124-parallel-widget');try{const set=values=>{for(const[k,v]of Object.entries(values))a.change(r.querySelector('#z124-'+({Q:'vtot',D1:'d1',D2:'d2'}[k])+'-slider'),v);return r.mf1NetworkState;};fn(a,r,set);a.scan('parallel pipes');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}

test('Parallel branches recover the independent Hagen–Poiseuille solution, including tiny nonzero flows and large Darcy factors',()=>run((a,r,set)=>{
 for(const D1 of[30,40,60,100])for(const D2 of[40,80,120]){
  const s=set({Q:.01,D1,D2}),d1=D1/1000,d2=D2/1000,conductance=Math.PI*998*9.81/(128*.001*36),head=s.Q/(conductance*(d1**4+d2**4));
  relative(s.Q1,conductance*d1**4*head);relative(s.Q2,conductance*d2**4*head);relative(s.b1.h,head);relative(s.b2.h,head);relative(s.Q1/s.Q2,(d1/d2)**4);
  for(const b of[s.b1,s.b2]){assert.ok(b.Re<2320);relative(b.lam,64/b.Re);assert.equal(b.uncertain,false);}
  const doubled=set({Q:.02});relative(doubled.Q1,2*s.Q1);relative(doubled.Q2,2*s.Q2);relative(doubled.b1.h,2*s.b1.h);
 }
 const s=set({Q:.01,D1:30,D2:120});assert.ok(s.Q1>0&&s.Q1<1e-7);assert.ok(s.b1.lam>1);assert.match(r.textContent,/mL/);
}));

test('Every branch satisfies continuity, Darcy head loss, and an independent Colebrook residual over the control domain',()=>run((a,r,set)=>{
 const seen=new Set();for(const Q of[.01,.05,.15,.2,1,30,60])for(const D1 of[30,60,100])for(const D2 of[40,80,120]){
  const s=set({Q,D1,D2});relative(s.Q1+s.Q2,Q/1000);relative(s.b1.h,s.b2.h,1e-8);assert.ok(s.Q1>0&&s.Q2>0);
  for(const[b,q,d]of[[s.b1,s.Q1,D1/1000],[s.b2,s.Q2,D2/1000]]){
   relative(b.V,q/(Math.PI*d*d/4));relative(b.Re,998*b.V*d/.001);relative(b.h,b.lam*36/d*b.V*b.V/(2*9.81));
   if(b.Re<2320){seen.add('laminar');relative(b.lam,64/b.Re);assert.equal(b.uncertain,false);}
   else if(b.Re>=4000){seen.add('turbulent');near(1/Math.sqrt(b.lam)+2*Math.log10(.000045/d/3.7+2.51/(b.Re*Math.sqrt(b.lam))),0,1e-12);assert.equal(b.uncertain,false);}
   else{seen.add('transition');assert.equal(b.uncertain,true);}
  }
  const active=[...r.querySelectorAll('.mf1-decision li[data-active=true]')];assert.equal(active.length,1);const expected=s.b1.Re<2320&&s.b2.Re<2320?0:s.b1.Re>=4000&&s.b2.Re>=4000?1:2;assert.equal(+active[0].dataset.branch,expected);
 }
 assert.deepEqual([...seen].sort(),['laminar','transition','turbulent']);
}));

test('Exchanging equal-length pipes exchanges the flows, and identical diameters split every regime equally',()=>run((a,r,set)=>{
 for(const Q of[.01,.2,1,30,60])for(const[d1,d2]of[[40,80],[60,100],[80,80]]){
  const first=set({Q,D1:d1,D2:d2}),swapped=set({D1:d2,D2:d1});relative(first.Q1,swapped.Q2);relative(first.Q2,swapped.Q1);relative(first.b1.h,swapped.b1.h);
  if(d1===d2){relative(first.Q1,first.Q/2);assert.match(r.querySelector('.mf1-decision-summary').textContent,/D₁ = D₂/);}
 }
}));

test('Changing one diameter redistributes the imposed flow and decreases common resistance; increasing total flow raises both branch flows',()=>run((a,r,set)=>{
 for(const Q of[.01,.2,1,30,60]){
  let previous=set({Q,D1:30,D2:80});for(const D1 of[40,60,80,100]){const s=set({D1});assert.ok(s.Q1>previous.Q1);assert.ok(s.Q2<previous.Q2);assert.ok(s.b1.h<previous.b1.h);previous=s;}
 }
 for(const[D1,D2]of[[30,40],[40,80],[100,120]]){let previous=set({Q:.01,D1,D2});for(const Q of[.05,.15,.2,1,30,60]){const s=set({Q});assert.ok(s.Q1>previous.Q1&&s.Q2>previous.Q2&&s.b1.h>previous.b1.h);previous=s;}}
}));

test('The original operating point uses solved Colebrook factors and reports vector-only output with all three primary controls',()=>run((a,r,set)=>{
 const s=set({Q:30,D1:40,D2:80});near(s.Q1,.004149758284238674);near(s.Q2,.025850241715761325);near(s.b1.V,3.3022727178656366);near(s.b2.V,5.142742186479665);near(s.b1.lam,.022087099421252265);near(s.b2.lam,.018213988114952496);near(s.b1.h,11.048620729484014);
 assert.equal(r.querySelectorAll('canvas,image,foreignObject').length,0);assert.ok(r.querySelector('svg'));for(const id of['vtot','d1','d2'])assert.equal(r.querySelector('#z124-'+id+'-slider').closest('details'),null);
}));
