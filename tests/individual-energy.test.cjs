const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const near=(a,b,tol=1e-9)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
function fixture(fn){const a=load(9);try{const r=a.w.document.getElementById('v9-egl-source'),set=(id,v)=>a.change(r.querySelector('#e-'+id),v);fn(a,r,set);a.scan('individual energy');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function branch(r,mode){assert.equal(r.querySelectorAll('#e-note li[data-active=true]').length,1);assert.equal(+r.querySelector('#e-note li[data-active=true]').dataset.branch,['ideal','pump','loss'].indexOf(mode));}
// Independent Bernoulli calculation uses pressure per volume, without HGL as an intermediate.
function pressure(s,xi,before=false){const f=Math.max(0,Math.min(1,(xi-.35)/.3)),d=s.d1*(1-f)+s.d2*f,z=s.z2*f,v=s.v1*(s.d1/d)**2,work=xi>.5||xi===.5&&!before?s.hp-s.hL:0;return s.patm+s.rho*(s.g*(s.h1+work-z)-v*v/2);}
const numbers=el=>el.getAttribute('d').match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi).map(Number);

test('Energy: calibrated endpoint work balance and causality of the two diameters',()=>fixture((a,r,set)=>{
 let s=r.mf1EnergyState;near(s.Q,.026507188014663882);near(s.v2,25/6);near(s.p2,64764.65555555555);near(s.hv2,.884868048476611);
 r.querySelector('[data-e-mode=pump]').click();set('z',2);s=r.mf1EnergyState;near(s.p2,56932.35155555556);near(s.p2,s.p1+s.rho*((s.v1*s.v1-s.v2*s.v2)/2+s.g*(s.hp-s.hL-s.z2)));
 const q=s.Q;set('d2',.2);near(r.mf1EnergyState.Q,q);set('d1',.1);const low=r.mf1EnergyState.Q;set('d1',.2);near(r.mf1EnergyState.Q,4*low);
 assert.equal(r.querySelectorAll('.v9-metric').length,3);assert.equal(r.querySelectorAll('input[type=range]').length,6);assert.match(r.querySelector('[data-e-preset=venturi]').textContent,/Suženje/);
 for(const mode of ['ideal','pump','loss']){r.querySelector('[data-e-mode='+mode+']').click();for(const preset of r.querySelectorAll('[data-e-preset]')){preset.click();s=r.mf1EnergyState;near(s.h2,s.h1+s.hp-s.hL);near(s.Q,s.v2*Math.PI*s.d2*s.d2/4);near(s.deltaHgl,s.hgl2-s.hgl1);branch(r,mode);assert.equal(r.querySelectorAll('[data-e-preset][aria-pressed=true]').length,1);assert.equal(r.querySelectorAll('[data-e-mode][aria-pressed=true]').length,1);}}
}));

test('Local profile has the true curved HGL and an exactly aligned machine jump; minimum includes both faces',()=>fixture((a,r,set)=>{
 for(const mode of ['ideal','pump','loss'])for(const [d1,d2,z]of [[.08,.24,3],[.25,.06,3],[.15,.09,-3],[.15,.15,0]]){
  r.querySelector('[data-e-mode='+mode+']').click();set('d1',d1);set('d2',d2);set('v1',4);set('h',3);set('x',4);set('z',z);const s=r.mf1EnergyState;
  for(const p of s.profile){near(p.pabs,pressure(s,p.xi,p.side==='before'));near(p.H,p.z+p.pg/(s.rho*s.g)+p.v*p.v/(2*s.g));near(p.v*Math.PI*p.D*p.D/4,s.Q);}
  near(s.machineAfter.pabs-s.machineBefore.pabs,s.rho*s.g*(s.hp-s.hL));near(s.machineAfter.D,s.machineBefore.D);near(s.machineAfter.v,s.machineBefore.v);
  let sampled=Infinity;for(let i=0;i<=10000;i++)sampled=Math.min(sampled,pressure(s,i/10000));sampled=Math.min(sampled,pressure(s,.5,true));near(s.minPabs,sampled);branch(r,mode);
 }
 r.querySelector('[data-e-mode=pump]').click();set('d1',.08);set('d2',.24);set('z',3);const s=r.mf1EnergyState;assert.equal(s.minPressure.xi,.5);assert.equal(s.minPressure.side,'before');assert.ok(s.minPabs<Math.min(s.p1,s.p2)+s.patm);assert.match(r.querySelector('#e-domain').textContent,/prije stroja/);
 const points=r.querySelector('#e-egl').getAttribute('points').split(' ').map(p=>p.split(',').map(Number));near(points[50][0],points[51][0]);assert.notEqual(points[50][1],points[51][1]);
}));

test('Pressure domain distinguishes permissible negative gauge pressure, vapor threshold, and formal impossible water state',()=>fixture((a,r,set)=>{
 set('d1',.15);set('d2',.07);set('v1',4);set('z',0);r.querySelector('[data-e-mode=ideal]').click();let s=r.mf1EnergyState;
 const threshold=(s.pv-s.patm)/(s.rho*s.g)+s.v2*s.v2/(2*s.g);assert.ok(threshold>3&&threshold<11);
 set('h',threshold+.001);s=r.mf1EnergyState;assert.ok(s.p2<0);assert.equal(s.valid,true);assert.match(r.querySelector('#e-domain').textContent,/podtlak/);near(s.minPabs,s.pv+s.rho*s.g*.001);
 set('h',threshold-.001);s=r.mf1EnergyState;assert.equal(s.valid,false);assert.equal(r.querySelector('#e-domain').dataset.valid,'false');assert.match(r.querySelector('#e-domain').textContent,/Formalni rezultat/);
 for(const [id,value]of Object.entries({d1:.25,d2:.06,v1:4,h:3,z:3,x:4}))set(id,value);r.querySelector('[data-e-mode=loss]').click();s=r.mf1EnergyState;near(s.v2,69.44444444444444);near(s.p2,-2445604.421234568);assert.ok(s.minPabs<0);assert.equal(s.valid,false);assert.ok(Number.isFinite(s.p2));branch(r,'loss');
}));

test('Native geometry uses declared diameter, elevation, and fixed velocity scales on desktop and mobile',()=>fixture((a,r,set)=>{
 const svg=r.querySelector('#e-scene');assert.equal(svg.localName,'svg');assert.equal(r.querySelectorAll('canvas,image,foreignObject').length,0);
 for(const width of [900,340]){
  Object.defineProperty(r,'clientWidth',{configurable:true,value:width});a.w.dispatchEvent(new a.w.Event('resize'));let fixed;
  for(const [d1,d2,z]of [[.08,.24,-3],[.25,.06,3],[.15,.15,0]]){
   set('d1',d1);set('d2',d2);set('v1',4);set('z',z);r.querySelector('[data-e-mode=pump]').click();const s=r.mf1EnergyState,n=numbers(svg.querySelector('[data-e-pipe]'));
   near(n[15]-n[1],s.d1*s.diameterScale);near(n[9]-n[7],s.d2*s.diameterScale);near((n[7]+n[9])/2,s.center-s.z2*s.zScale);near((n[1]+n[15])/2,s.center);
   for(const i of [1,2]){const v=svg.querySelector('[data-e-velocity="'+i+'"] line');near(+v.getAttribute('x2')-+v.getAttribute('x1'),s['v'+i]*s.velocityScale);}
   if(fixed!==undefined)assert.equal(s.velocityScale,fixed);fixed=s.velocityScale;
   const key=svg.querySelector('[data-e-diameter-key]');near(+key.getAttribute('x2')-+key.getAttribute('x1'),.1*s.diameterScale);const zkey=svg.querySelector('[data-e-elevation-key]');near(+zkey.getAttribute('y1')-+zkey.getAttribute('y2'),s.zScale);
   const machine=svg.querySelector('[data-e-device=pump]');near(+machine.getAttribute('cx'),(s.plotLeft+s.plotRight)/2);near(+machine.getAttribute('cy'),s.center-s.zScale*s.z2/2);
   for(const line of svg.querySelectorAll('[data-e-machine-alignment]'))near(+line.getAttribute('x1'),+machine.getAttribute('cx'));
   assert.ok(svg.querySelectorAll('#e-height-axis text').length>=3);if(width===340){assert.equal(s.svgWidth,360);assert.ok([...svg.querySelectorAll('text')].every(t=>+t.getAttribute('font-size')>=20));}
  }
 }
}));
