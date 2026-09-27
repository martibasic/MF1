const test=require('node:test'),assert=require('node:assert/strict'),{load}=require('./widget-harness.cjs');
const near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),a+' != '+b);
function run(fn){const a=load(12);try{const r=a.w.document.getElementById('v12-rocket'),input=k=>r.querySelector('[data-k="'+k+'"]'),set=p=>{for(const[k,v]of Object.entries(p))a.change(input(k),v);};fn(a,r,input,set);a.scan('rocket');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
test('Rocket keeps four controls, three main results and one native vector scene without a mass-volume tank',()=>run((a,r,input)=>{
 assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelector('canvas,image,foreignObject'),null);assert.equal(r.querySelectorAll('input').length,4);assert.equal(r.querySelectorAll('.r-results strong').length,3);assert.equal(r.querySelector('[data-panel=mass]'),null);
 for(const k of ['m','dm','ve','t'])assert.ok(input(k).labels.length);assert.equal(input('dm').min,'0');assert.equal(input('dm').step,'any');assert.ok(r.querySelector('tspan'));assert.doesNotMatch(r.querySelector('svg').textContent,/_/);
}));
test('Default thrust, exact velocity change and constant-mass error match an independent calculation',()=>run((a,r)=>{
 const s=r.mf1RocketState;near(s.F,150000);near(s.md,50);near(s.mf,4900);near(s.dv,60.60812195255834);near(s.a0,30);near(s.af,30.61224489795918);near(s.approx,60);near(s.approxError,.010033670949816886);assert.equal(s.withinAccuracy,false);
 near(s.F*s.duration,s.dm*s.ve);assert.ok(Math.abs(s.m*s.dv-s.impulse)>1000);
}));
test('Three physical branches include no burn and the numerically solved exact one-percent threshold',()=>run((a,r,input,set)=>{
 const branch=()=>{const n=r.querySelectorAll('.mf1-decision li[data-active=true]');assert.equal(n.length,1);assert.equal(r.querySelectorAll('.mf1-decision li').length,3);return +n[0].dataset.branch;};
 assert.equal(branch(),2);set({dm:0});let s=r.mf1RocketState;assert.equal(branch(),0);for(const k of ['F','md','a0','af','dv','approx'])assert.equal(s[k],0);assert.equal(s.mf,s.m);assert.equal(r.querySelector('[data-direction=thrust]'),null);assert.equal(r.querySelector('[data-direction=exhaust]'),null);
 r.querySelector('[data-p=accuracy]').click();s=r.mf1RocketState;near(s.muCritical,.01993311006861284);near(1-s.muCritical/(-Math.log1p(-s.muCritical)),.01);near(s.dm,s.m*s.muCritical);assert.equal(branch(),1);
 const critical=s.dm;set({dm:critical*(1-1e-8)});assert.equal(branch(),1);set({dm:critical*(1+1e-8)});assert.equal(branch(),2);
}));
test('Duration changes force and acceleration but preserves impulse, mass ratio and delta-v',()=>run((a,r,input,set)=>{
 const states=[];for(const t of [.5,1,2,5]){set({t});const s=r.mf1RocketState;states.push(s);near(s.F,s.dm*s.ve/t);near(s.af/s.a0,s.m/s.mf);}
 for(const s of states){near(s.dv,states[0].dv);near(s.impulse,states[0].impulse);near(s.F*s.duration,states[0].F*states[0].duration);near(s.af*s.duration,states[0].af*states[0].duration);}
}));
test('Mass and exhaust-speed scaling retain the causal distinction between thrust and acceleration',()=>run((a,r,input,set)=>{
 set({m:2000,dm:100,ve:1500,t:2});const p=r.mf1RocketState;set({m:4000});const q=r.mf1RocketState;near(q.F,p.F);near(q.a0,p.a0/2);assert.ok(q.dv<p.dv);set({ve:3000});const v=r.mf1RocketState;near(v.F,2*q.F);near(v.dv,2*q.dv);
}));
test('Integrating acceleration reproduces delta-v and the plotted samples use actual time and mass',()=>run((a,r,input,set)=>{
 for(const p of [{m:5000,dm:100,ve:3000,t:2},{m:2000,dm:900,ve:4500,t:.5},{m:9000,dm:20,ve:1000,t:5}]){
  set(p);const s=r.mf1RocketState,N=6000,dt=s.duration/N;let integral=0;
  for(let i=0;i<=N;i++){const value=s.F/(s.m-s.md*i*dt);integral+=(i===0||i===N?1:i%2?4:2)*value;}integral*=dt/3;near(integral,s.dv,1e-10);
  for(const point of s.geometry.samples)near(point.a,s.F/(s.m-s.md*point.t));
  const end=r.querySelector('[data-final-acceleration]');near(+end.getAttribute('cx'),s.geometry.plotX+s.geometry.plotWidth);near(+end.getAttribute('cy'),s.geometry.plotY+s.geometry.plotHeight*(1-s.af/s.geometry.yMax));
 }
}));
test('Total satellite plus exhaust momentum closes in the initially stationary inertial frame',()=>run((a,r,input,set)=>{
 for(const p of [{m:5000,dm:100,ve:3000,t:2},{m:2000,dm:900,ve:4500,t:.5},{m:9000,dm:0,ve:1000,t:5}]){
  set(p);const s=r.mf1RocketState,N=6000,dt=s.duration/N;let pe=0;
  for(let i=0;i<=N;i++){const t=i*dt,v=-s.ve*Math.log1p(-s.md*t/s.m),flux=s.md*(v-s.ve);pe+=(i===0||i===N?1:i%2?4:2)*flux;}pe*=dt/3;near(pe,-s.mf*s.dv,1e-10);
 }
}));
test('The exploration mass limit is explicit and reducing initial mass reports clamping instead of hiding it',()=>run((a,r,input,set)=>{
 set({m:9000,dm:4050});near(r.mf1RocketState.mu,.45);set({m:2000});const s=r.mf1RocketState;near(s.dm,900);near(+input('dm').max,900);assert.match(r.querySelector('#v12-r-status').textContent,/smanjena/);assert.match(r.querySelector('#v12-r-range').textContent,/0,45/);assert.ok(s.mf>0);
}));
test('log1p preserves tiny burns and vector lengths honestly express direction only',()=>run((a,r,input,set)=>{
 set({m:9000,dm:1e-9,ve:4500,t:5});let s=r.mf1RocketState;assert.ok(s.dv>0);near(s.dv/(s.ve*s.dm/s.m),1,1e-10);assert.ok(Number.isFinite(s.approxError));
 set({dm:10});const p=r.querySelector('[data-direction=thrust]').innerHTML;set({dm:4050,t:.5});assert.equal(r.querySelector('[data-direction=thrust]').innerHTML,p);assert.match(r.querySelector('.v12x-caption').textContent,/bez mjerila/);assert.match(r.textContent,/vakuum taj doprinos ne uklanja/);
}));
test('Mobile native coordinates remain finite throughout zero, threshold and maximum-mass states',()=>run((a,r,input,set)=>{
 r.querySelector('svg').parentElement.getBoundingClientRect=()=>({width:300});for(const dm of [0,100,2250]){set({dm});const s=r.mf1RocketState;assert.equal(s.geometry.width,300);assert.equal(s.geometry.wide,false);assert.equal(s.geometry.height,628);assert.equal(r.querySelectorAll('svg').length,1);a.scan('mobile');}
}));
