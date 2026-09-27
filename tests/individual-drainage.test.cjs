const test=require('node:test'),assert=require('node:assert/strict'),{load}=require('./widget-harness.cjs');
const near=(a,b,t=1e-10)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),a+' != '+b);
function run(fn,options={}){const a=load(11,options);try{const r=a.w.document.getElementById('v11-z97-lab'),id=k=>r.querySelector('#v11-z97-'+k),set=p=>{for(const[k,v]of Object.entries(p))a.change(id(k),v);};fn(a,r,id,set);a.scan('drainage');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
test('Drainage keeps one vector scene, five controls, three readings and exact time endpoint',()=>run((a,r,id)=>{
 assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelector('canvas,image,foreignObject'),null);assert.equal(r.querySelectorAll('input[type=range]').length,5);assert.equal(r.querySelectorAll('.z97-results output').length,3);assert.equal(id('time').step,'any');
 for(const k of ['diameter','nozzle','h0','cd','time','rate'])assert.ok(id(k).labels.length);assert.deepEqual([...id('rate').options].map(o=>+o.value),[1,5,20]);assert.ok(r.querySelector('tspan'));assert.doesNotMatch(id('scene').textContent,/_/);
}));
test('Independent default calibration, halfway volume and exact empty state agree',()=>run((a,r,id,set)=>{
 const s=r.mf1DrainState;near(s.T,127.71017136282016);near(s.Q0,.0015374620420133948);near(s.initialVolume,.09817477042468103);near(s.T,2*s.initialVolume/s.Q0);
 set({time:s.T/2});const h=r.mf1DrainState;near(h.h,.125);near(h.q,.0007687310210066974);near(h.dischargedVolume/s.initialVolume,.75);near(h.v,h.q/h.a);
 set({time:s.T});const end=r.mf1DrainState;assert.equal(end.h,0);assert.equal(end.q,0);assert.equal(end.v,0);assert.equal(end.remainingVolume,0);assert.equal(id('jet').getAttribute('d'),'');
}));
test('Changing D,d,Cd,h0 obeys the analytical scaling and resets time without changing the time scrub behavior',()=>run((a,r,id,set)=>{
 const p=r.mf1DrainState;set({time:p.T/2,diameter:1});const D=r.mf1DrainState;near(D.T,4*p.T);near(D.Q0,p.Q0);assert.equal(D.t,0);
 set({diameter:.5,nozzle:50});let s=r.mf1DrainState;near(s.T,p.T/4);near(s.Q0,4*p.Q0);
 set({nozzle:25,cd:.6});s=r.mf1DrainState;near(s.T,p.T/.6);near(s.Q0,.6*p.Q0);
 set({cd:1,h0:2});s=r.mf1DrainState;near(s.T,2*p.T);near(s.Q0,2*p.Q0);
 set({time:s.T*.37});near(r.mf1DrainState.t,s.T*.37);assert.match(id('status').textContent,/zaustavljen/);
}));
test('Numerical flux integration closes volume at every cut across independent parameter corners',()=>run((a,r,id,set)=>{
 for(const p of [{diameter:.3,nozzle:80,h0:.2,cd:1},{diameter:1.2,nozzle:10,h0:2,cd:.6},{diameter:.5,nozzle:25,h0:.5,cd:1}]){
  set(p);const initial=r.mf1DrainState,n=100,dt=initial.T/n;let volume=0,last=initial.q;
  for(let i=1;i<=n;i++){set({time:dt*i});const m=r.mf1DrainState;volume+=(last+m.q)/2*dt;near(volume,m.dischargedVolume,1e-9);near(m.remainingVolume+volume,initial.initialVolume,1e-9);last=m.q;}near(volume,initial.initialVolume);
 }
}));
test('The bottom opening is real, isotropic geometry stays fixed, and the two normalized curves share time',()=>run((a,r,id,set)=>{
 const states=[];for(const D of [.3,1.2])for(const d of [10,80])for(const h0 of [.2,2]){
  set({diameter:D,nozzle:d,h0});const m=r.mf1DrainState,p=m.geometry;states.push(p);near(p.right-p.left,100*D);near(p.opening,100*d/1000);near(+id('water').getAttribute('height'),100*h0);
  assert.match(r.querySelector('[data-tank-wall]').getAttribute('d'),new RegExp('H'+(p.center-p.opening/2)+'M'+(p.center+p.opening/2)+' '+p.bottom));
  set({time:m.T/2});const h=r.mf1DrainState;near(+r.querySelector('[data-head-point]').getAttribute('cx'),p.plotX+p.plotWidth*.5);near(+r.querySelector('[data-flow-point]').getAttribute('cy'),p.plotY+p.plotHeight*.5);near(+r.querySelector('[data-head-point]').getAttribute('cy'),p.plotY+p.plotHeight*.75);near(+id('water').getAttribute('height'),100*h0/4);
 }
 assert.ok(states.every(p=>p.scale===100&&p.velocityScale===8));
}));
test('Mobile plot uses local coordinates and time changes retain the same vector nodes',()=>run((a,r,id,set)=>{
 id('scene').parentElement.getBoundingClientRect=()=>({width:300});set({h0:2});const p=r.mf1DrainState.geometry;assert.equal(p.width,300);assert.equal(p.wide,false);assert.equal(p.height,690);assert.equal(p.scale,100);
 const water=id('water'),head=r.querySelector('[data-head-point]'),curve=id('curve');set({time:r.mf1DrainState.T*.2});assert.equal(id('water'),water);assert.equal(r.querySelector('[data-head-point]'),head);assert.equal(id('curve'),curve);
}));
test('Animation uses elapsed time independently of frame rate and stops at exact T for all speeds',()=>{
 for(const fps of [2,10,120])for(const rate of [1,5,20])run((a,r,id,set)=>{
  set({diameter:.3,nozzle:80,h0:.2,cd:1,rate});const p=r.mf1DrainState;near(p.T,2.8396056225721056);near(p.areaRatio,.07111111111111111);id('play').click();assert.equal(id('play').getAttribute('aria-pressed'),'true');
  const dt=1000/fps,n=Math.max(1,Math.floor(p.T/(rate*2)*fps));a.frames(n,dt);const expected=Math.min(p.T,n*dt/1000*rate);near(r.mf1DrainState.t,expected,1e-9);
  a.frames(Math.ceil(p.T/rate*fps)+2,dt);const end=r.mf1DrainState;assert.equal(end.t,end.T);assert.equal(end.h,0);assert.equal(end.q,0);assert.equal(end.v,0);assert.equal(end.playing,false);assert.equal(id('play').getAttribute('aria-pressed'),'false');
 },{reduced:false});
});
test('Pause/resume keeps elapsed time, model changes stop and reset, and reset restores the source case',()=>run((a,r,id,set)=>{
 id('play').click();a.frames(5,100);near(r.mf1DrainState.t,.5);id('play').click();a.frames(5,100);near(r.mf1DrainState.t,.5);id('play').click();a.frames(5,100);near(r.mf1DrainState.t,1);
 set({nozzle:50});assert.equal(r.mf1DrainState.t,0);assert.equal(r.mf1DrainState.playing,false);a.frames(5,100);assert.equal(r.mf1DrainState.t,0);
 set({rate:20,time:.5});id('reset').click();const s=r.mf1DrainState;near(s.D,.5);near(s.d,.025);near(s.h0,.5);near(s.cd,1);assert.equal(s.t,0);assert.equal(s.rate,1);
},{reduced:false}));
test('Reduced-motion play preserves all three causal branches instead of replacing them with prose',()=>run((a,r,id)=>{
 const branches=()=>r.querySelectorAll('.mf1-decision li');assert.equal(branches().length,3);id('play').click();assert.equal(branches().length,3);assert.equal(r.querySelectorAll('.mf1-decision li[data-active=true]').length,1);assert.equal(r.mf1DrainState.playing,false);assert.match(id('status').textContent,/Smanjeno gibanje/);
}));

test('Slider precision near T snaps only floating-point residue, preserving genuinely earlier flow',()=>run((a,r,id,set)=>{
 set({diameter:1.2,nozzle:10,h0:2,cd:.6});const T=r.mf1DrainState.T;
 set({time:T*(1-16*Number.EPSILON)});assert.equal(r.mf1DrainState.t,T);assert.equal(r.mf1DrainState.h,0);assert.equal(r.mf1DrainState.q,0);
 set({time:T*(1-1e-10)});assert.ok(r.mf1DrainState.t<T);assert.ok(r.mf1DrainState.h>0);assert.ok(r.mf1DrainState.q>0);
}));
