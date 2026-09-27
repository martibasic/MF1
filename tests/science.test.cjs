const test=require('node:test'),assert=require('node:assert/strict');
const S=require('../assets/mf1-science.js'),{load}=require('./widget-harness.cjs');
const close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} != ${b}`);

test('Compressible ocean satisfies hydrostatic balance and the bulk-modulus differential law',()=>{
 for(const h of [0,100,5000,10000]){
  const a=S.ocean(h),b=S.ocean(h+.01);
  close((b.pressure-a.pressure)/.01,a.density*9.81,1e-6);
  close((b.density-a.density)/.01,a.density**2*9.81/2.34e9,1e-6);
 }
 close(S.ocean(0).pressure,1e5);close(S.ocean(0).density,1025);assert.equal(S.ocean(1e9),null);
});

test('Partially wet arcs agree with independent fine quadrature and exact circular-segment buoyancy',()=>{
 for(const R of [.5,1.5])for(const zC of [-2,-.7,0,.7,2])for(const start of [0,1.5,5.7])for(const span of [.6,Math.PI,2*Math.PI]){
  const m=S.arcPressure({R,zC,start,span,b:1.3});let fx=0,fz=0;const n=30000,dt=span/n;
  for(let i=0;i<n;i++){const t=start+(i+.5)*dt,df=-1000*9.81*Math.max(0,zC+R*Math.sin(t))*R*1.3*dt;fx+=df*Math.cos(t);fz+=df*Math.sin(t);}
  close(m.fx,fx,5e-5);close(m.fz,fz,5e-5);assert.ok(m.wetAngle>=0&&m.wetAngle<=span+1e-10);
 }
 for(const zC of [-1.1,-.7,0,.7,1.1]){
  const m=S.arcPressure({zC,R:1}),area=zC<=-1?0:zC>=1?Math.PI:Math.acos(-zC)+zC*Math.sqrt(1-zC*zC);
  close(m.fx,0,1e-9);close(m.fz,-1000*9.81*area);
 }
});

test('Displayed arc exposes dry, partially wet and fully submerged states',()=>{
 const a=load(7),root=a.w.document.getElementById('v7-widget-a-container');
 try{
  a.change(root.querySelector('#as'),360);
  for(const z of [-1.5,0,3]){
   a.change(root.querySelector('#az'),z);const m=root.mf1ArcState;
   close(m.zC,z);close(m.FR,z<0?0:z===0?1000*9.81*Math.PI/2000:1000*9.81*Math.PI/1000,3e-6);
  }
  assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});

test('Strip integration resolves force exactly and center-of-pressure error converges quadratically',()=>{
 for(const h of [.2,3,20])for(const N of [4,12,60]){
  const s=S.hydrostaticStrips(h,2,998,N),fine=S.hydrostaticStrips(h,2,998,2*N);
  close(s.force,998*9.81*h*h);close(s.center,2*h/3-h/(6*N*N));
  close(s.exactCenter-s.center,4*(fine.exactCenter-fine.center));
 }
});

test('Colebrook residual is small; head loss is continuous and monotone through transition',()=>{
 for(const kd of [0,1e-5,.001,.05]){
  for(const Re of [4000,1e5,1e8]){const f=S.colebrook(Re,kd);close(1/Math.sqrt(f)+2*Math.log10(kd/3.7+2.51/(Re*Math.sqrt(f))),0,1e-10);}
  let last=0;
  for(let Re=10;Re<=6000;Re+=10){const f=S.pipeFriction(Re,kd);assert.ok(Re*Re*f.factor>last);last=Re*Re*f.factor;}
  for(const edge of [2320,4000])close(S.pipeFriction(edge-1e-5,kd).factor,S.pipeFriction(edge+1e-5,kd).factor,1e-8);
 }
});

test('Pipe profiles satisfy no slip and preserve mean volumetric velocity in a circular section',()=>{
 for(const Re of [0,1000,2320,3000,4000,1e5]){
  close(S.pipeProfile(1,Re),0);close(S.pipeProfile(-1,Re),0);let mean=0;
  // Transform r=1-t^7 removes the integrable 1/7 wall singularity.
  const n=20000;for(let i=0;i<n;i++){const t=(i+.5)/n,r=1-t**7;mean+=2*r*S.pipeProfile(r,Re)*7*t**6/n;}
  close(mean,1,1e-7);close(S.pipeProfile(.4,Re),S.pipeProfile(-.4,Re));
 }
});

test('Parallel networks conserve flow and equal head, including flows crossing the transition gap',()=>{
 for(const Q of [0,.0001,.0003,.0008,.001,.01,.06])for(const D1 of [.03,.06,.1])for(const D2 of [.03,.08,.1]){
  const s=S.parallelPipes(Q,D1,D2);close(s.Q1+s.Q2,Q,1e-12);close(s.b1.h,s.b2.h,1e-10);
  if(D1===D2)close(s.Q1,Q/2,1e-12);
 }
 const a=load(13);
 try{for(const q of [5,30,60]){a.change(a.w.document.getElementById('z124-vtot-slider'),q);const s=a.w.document.getElementById('z124-parallel-widget').mf1NetworkState;close(s.b1.h,s.b2.h,1e-10);close(s.Q1+s.Q2,s.Q);}}
 finally{a.dom.window.close();}
});

test('Quantitative plots use common rheology scales, physical units, and finite geometry',()=>{
 const a=load(2),root=a.w.document.getElementById('v2-nn-explorer');
 try{const plots=[];for(const button of root.querySelectorAll('[data-v2nn]')){
  button.click();a.scan('rheology');const svg=root.querySelector('svg');plots.push([...svg.querySelectorAll('text')].map(t=>t.textContent).join('|'));assert.match(svg.textContent,/Pa/);assert.match(svg.textContent,/s⁻¹/);
 }assert.equal(new Set(plots).size,1);assert.deepEqual(a.errors,[]);}
 finally{a.dom.window.close();}
});

test('V4 and V7 fitting keeps circular geometry isotropic on mismatched canvases',()=>{
 const transforms=[],ctx={setTransform:(...x)=>transforms.push(x),clearRect(){}};
 S.fitCanvas({width:900,height:450},ctx,700,430);const m=transforms.at(-1);close(m[0],m[3]);assert.ok(m[4]>=0&&m[5]>=0);
 const a=load(4);
 try{for(const [width,height]of [[320,640],[900,250]]){a.w.MF1V4.prepareCanvas({width:0,height:0,getBoundingClientRect:()=>({width,height})},ctx,800,500);const t=transforms.at(-1);close(t[0],t[3]);assert.ok(t[4]>=0&&t[5]>=0);}}
 finally{a.dom.window.close();}
});

// jsdom has no browser top layer. This mock only tests lifecycle and bindings;
// focus trapping, native Escape and responsive geometry require a real browser.
function dialogs(w){w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};}
test('Expanded widgets preserve their owning element, live physics, and original document position',()=>{
 for(const n of [1,8,10,12]){
  const a=load(n);dialogs(a.w);
  try{
   const root=a.w.document.querySelector('.mf1-compact'),owner=!root.id&&root.parentElement.id?root.parentElement:root,parent=owner.parentElement,next=owner.nextSibling;
   const button=root.querySelector('.mf1-view-tools button'),input=root.querySelector('input[type=range]');button.click();
   assert.ok(owner.closest('dialog'));a.change(input,input.max);a.frames(2);assert.equal(input.value,input.max);
   a.w.document.querySelector('dialog').close();assert.equal(owner.parentElement,parent);assert.equal(owner.nextSibling,next);assert.equal(root.querySelector('input[type=range]'),input);assert.deepEqual(a.errors,[]);
  }finally{a.dom.window.close();}
 }
});
test('Exact input accepts decimal commas, rejects bounds and step errors, and updates original model',()=>{
 const a=load(1);dialogs(a.w);
 try{const slider=a.w.document.getElementById('z7-alpha');slider.mf1Limits.querySelector('.mf1-exact-button').click();
  const dialog=a.w.document.querySelector('dialog'),field=dialog.querySelector('input'),form=dialog.querySelector('form');
  const submit=v=>{field.value=v;form.dispatchEvent(new a.w.Event('submit',{cancelable:true}));};
  const original=slider.value;submit('900');assert.equal(slider.value,original);assert.equal(field.getAttribute('aria-invalid'),'true');submit('20,5');assert.equal(slider.value,original);
  submit('25');assert.equal(slider.value,'25');assert.ok(!dialog.isConnected);close(+a.w.document.getElementById('z7-res-fg').textContent,1100*Math.sin(25*Math.PI/180),.001);assert.deepEqual(a.errors,[]);
  const ratio=a.w.document.getElementById('v1x-ratio');ratio.mf1Limits.querySelector('.mf1-exact-button').click();
  const decimal=a.w.document.querySelector('dialog');decimal.querySelector('input').value='3,5';decimal.querySelector('form').dispatchEvent(new a.w.Event('submit',{cancelable:true}));
  assert.equal(ratio.value,'3.5');assert.match(a.w.document.getElementById('v1x-primary').textContent,/420/);
  const depth=a.w.document.getElementById('z5-depth');a.change(depth,10000);depth.mf1Limits.querySelector('.mf1-exact-button').click();
  const large=a.w.document.querySelector('dialog');assert.equal(large.querySelector('input').value,'10000');large.querySelector('form').dispatchEvent(new a.w.Event('submit',{cancelable:true}));assert.equal(depth.value,'10000');
 }finally{a.dom.window.close();}
});

test('Tank accumulation uses elapsed seconds at 2, 10 and 120 frames per second',()=>{
 const states=[];
 for(const fps of [2,10,120]){const a=load(8);try{
  a.w.document.getElementById('z72-start').click();a.frames(2*fps,1000/fps);
  const state=a.w.document.getElementById('v8-z72').mf1TankState;close(state.time,2);states.push(state.h);assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}}
 states.forEach(h=>close(h,states[0]));
});
