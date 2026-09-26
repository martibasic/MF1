const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const {floatingBlock,balloon,polygonProperties}=require('../assets/mf1-extra-labs.js');
const close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} != ${b}`);

test('Curved-pressure scene preserves circles and normals on wide and tall canvases',()=>{
 const {quarterScene}=require('../assets/mf1-widgets.js'),{createCanvas}=require('@napi-rs/canvas');
 for(const [width,height] of [[700,430],[920,620],[1400,860],[350,430]]){
  const native=createCanvas(width,height),target=native.getContext('2d'),transforms=[];
  const ctx=new Proxy(target,{get(t,p){const v=t[p];if(p==='setTransform')return(...a)=>{transforms.push(a);return v.apply(t,a)};return typeof v==='function'?v.bind(t):v},set(t,p,v){t[p]=v;return true}});
  quarterScene({width,height,getContext:()=>ctx},{h:1.2,R:1,FH:16.68,FV:19.48,step:3});
  const transform=transforms.find(t=>t[0]!==1||t[3]!==1||t[4]||t[5])||transforms[0];
  close(transform[0],transform[3]);assert.ok(transform[4]>=0&&transform[5]>=0);
 }
});

test('Inclined block keeps terminal velocity and force balance across its original control range',()=>{
 const a=load(1),q=id=>a.w.document.getElementById(id);
 try{for(const angle of [5,20,45])for(const mu of [1,7,50])for(const delta of [1,6,50]){
  a.change(q('z7-alpha'),angle);a.change(q('z7-mu'),mu);a.change(q('z7-delta'),delta);
  const force=1100*Math.sin(angle*Math.PI/180),velocity=force*delta*1e-6/(mu*1e-3*.25**2);
  close(+q('z7-res-fg').textContent,force,.001);close(+q('z7-res-v').textContent,velocity,.005);
 }assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}
});

test('Continuity modes use two primary controls and preserve finite physics under presets',()=>{
 const a=load(8),root=a.w.document.getElementById('v8-explorer');
 try{for(const mode of root.querySelectorAll('[data-mode]')){mode.click();a.frames(1);assert.equal(root.querySelectorAll('#v8x-controls input').length,2);for(const button of root.querySelectorAll('#v8x-presets button')){button.click();a.frames(1);a.scan('continuity preset');} }assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}
});
test('Floating block preserves displaced volume, force and reflection symmetry across the control domain',()=>{
 for(const B of [1,3,5,7])for(const rhoB of [850,917,980])for(const rhoF of [1000,1042,1100])for(const theta of [-10,-5,0,5,10]){
  const s=floatingBlock(B,4,rhoB,rhoF,theta),mirror=floatingBlock(B,4,rhoB,rhoF,-theta);
  close(s.buoyancy.area,B*4*rhoB/rhoF);close(s.force,s.weight);close(s.moment,-mirror.moment);
  close(s.buoyancy.x,-mirror.buoyancy.x);close(s.centerY,mirror.centerY);
  assert.ok(s.wet.every(p=>p[1]<=1e-12));
  if(theta===0){close(s.buoyancy.x,0);close(s.buoyancy.y,-s.draft/2);close(s.centerY,2-s.draft);}
 }
 // Independent small-angle moment check, not only the displayed GM expression.
 for(const B of [1,3,5,7]){const s=floatingBlock(B,4,917,1042,.001);close(-s.moment/(s.weight*s.angle),s.GM,1e-7);}
 assert.ok(floatingBlock(1,4,917,1042,5).moment>0);
 assert.ok(floatingBlock(5,4,917,1042,5).moment<0);
 assert.equal(floatingBlock(1,4,1042,1042,0),null);
 assert.deepEqual(polygonProperties([[0,0],[1,0],[2,0]]),{area:0,x:0,y:0});
});

test('Elastic balloon preserves the specified pD² law and cubic buoyancy scaling',()=>{
 for(const D1 of [.15,.3,.45])for(const p2 of [.1,.4,1.6]){
  const s=balloon(p2,{D1});close(p2*s.D**2,.1*D1**2);close(s.force,1000*9.81*Math.PI*s.D**3/6);
 }
 close(balloon(.4).D,.15);close(balloon(.4).ratio,1/8);close(balloon(1.6).ratio,1/64);
 assert.equal(balloon(0),null);
});

test('Ocean graph pointer and keyboard selection updates the same depth, pressure and density as the slider',()=>{
 const a=load(1);a.frames(2);
 try{
  const chart=a.w.document.getElementById('z5-chart'),depth=a.w.document.getElementById('z5-depth');
  chart.dispatchEvent(new a.w.KeyboardEvent('keydown',{key:'End',bubbles:true}));assert.equal(depth.value,'10000');
  chart.dispatchEvent(new a.w.MouseEvent('pointerdown',{clientX:174,bubbles:true}));assert.equal(depth.value,'5000');
  const expected=1025/(1-1025*9.81*5000/2.34e9);close(+a.w.document.getElementById('z5-res-rho').textContent,expected,.0001);
  assert.equal(chart.getAttribute('aria-valuenow'),'5000');assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});
