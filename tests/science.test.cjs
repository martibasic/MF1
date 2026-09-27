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

test('Rheology shares the Couette strain rate and common axes across material laws',()=>{
 const a=load(2),root=a.w.document.getElementById('widget-visc-basics'),plots=[];
 try{for(const button of root.querySelectorAll('[data-v2nn]')){
  button.click();a.scan('rheology');const svg=root.querySelector('#v2nn-plot'),m=root.mf1ProfessorState;
  plots.push(JSON.stringify({axes:[svg.dataset.xMax,svg.dataset.yMax],curves:[...svg.querySelectorAll('[data-visc-curve]')].map(c=>[c.dataset.viscCurve,c.getAttribute('d')]).sort((a,b)=>Number(a[0])-Number(b[0]))}));
  assert.match(svg.textContent,/Pa/);assert.match(svg.textContent,/s⁻¹/);close(m.gradient,m.v/m.delta);close(m.tangent/m.apparent,m.exponent);
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
 try{const slider=a.w.document.getElementById('z6-beta');slider.mf1Limits.querySelector('.mf1-exact-button').click();
  const dialog=a.w.document.querySelector('dialog'),field=dialog.querySelector('input'),form=dialog.querySelector('form');
  const submit=v=>{field.value=v;form.dispatchEvent(new a.w.Event('submit',{cancelable:true}));};
  const original=slider.value;submit('900');assert.equal(slider.value,original);assert.equal(field.getAttribute('aria-invalid'),'true');submit('20,5');assert.equal(slider.value,original);
  submit('250');assert.equal(slider.value,'250');assert.ok(!dialog.isConnected);close(Number(a.w.document.getElementById('z6-res-tau-wall').textContent.replace(/\./g,'').replace(',','.')),250*.1/4,.001);assert.deepEqual(a.errors,[]);
  const ratio=a.w.document.getElementById('v1x-ratio');ratio.mf1Limits.querySelector('.mf1-exact-button').click();
  const decimal=a.w.document.querySelector('dialog');decimal.querySelector('input').value='3,5';decimal.querySelector('form').dispatchEvent(new a.w.Event('submit',{cancelable:true}));
  assert.equal(ratio.value,'3.5');assert.match(a.w.document.getElementById('v1x-primary').textContent,/420/);
  const depth=a.w.document.getElementById('z5-depth');a.change(depth,10000);depth.mf1Limits.querySelector('.mf1-exact-button').click();
  const large=a.w.document.querySelector('dialog');assert.equal(large.querySelector('input').value,'10000');large.querySelector('form').dispatchEvent(new a.w.Event('submit',{cancelable:true}));assert.equal(depth.value,'10000');
 }finally{a.dom.window.close();}
});

test('The retained continuity explorer conserves accumulated volume at 2, 10 and 120 frames per second',()=>{
 const states=[];
 for(const fps of [2,10,120]){const a=load(8);try{
  const root=a.w.document.getElementById('v8-explorer');root.querySelector('[data-mode="tank"]').click();
  root.querySelector('.mf1-motion button').click();a.frames(1,1000/fps);a.frames(2*fps,1000/fps);
  const read=label=>{const card=[...root.querySelectorAll('.v8x-mini')].find(x=>x.querySelector('small').textContent===label);return parseFloat(card.querySelector('strong').textContent.replace('−','-').replace(',','.'));};
  close(read('t'),2);close(read('h'),.9+(.012-.006)*2/.3);states.push(read('h'));assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}}
 states.forEach(h=>close(h,states[0]));
});

test('The standalone buoyancy model preserves floating, neutral and sinking branches',()=>{
 const a=load(3),root=a.w.document.getElementById('v3-buoyancy-explorer');
 try{
  assert.equal(root.closest('#v3-intro-widget'),null);assert.ok(a.visible(root));
  let lastDraft=Infinity,lastTop=Infinity;
  for(const rho of [820,1000,1300]){
   a.change(root.querySelector('input'),rho);const s=root.mf1BuoyancyState;
   close(s.force,rho*9.81*s.displacedVolume);close(s.displacedVolume/s.volume,800/rho);
   close((s.bottom-s.surface)/(s.bottom-s.top),800/rho);close(s.center,(s.surface+s.bottom)/2);close(s.surface,150);
   assert.ok(s.draft<lastDraft);assert.ok(s.top<lastTop);lastDraft=s.draft;lastTop=s.top;
  }
  for(const rho of [500,800]){a.change(root.querySelector('input'),rho);const m=root.mf1BuoyancyState;close(m.fraction,1);close(m.force/m.weight,rho/800);assert.ok(m.top>m.surface);}
  a.w.switchV3Tab('manometar');assert.ok(a.visible(root));a.scan('buoyancy');assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});

test('Viscosity and capillarity are independent examples with genuinely coupled physical quantities',()=>{
 const a=load(2),shear=a.w.document.getElementById('widget-visc-basics'),cap=a.w.document.getElementById('widget-z12-vdual-fixed');
 try{
  a.change(shear.querySelector('#mu-slider'),.4);const tau=shear.mf1ProfessorState.tau;
  assert.equal(cap.closest('#widget-visc-basics'),null);assert.ok(a.visible(cap));assert.ok(a.visible(shear.querySelector('#v2nn-plot')));
  a.change(cap.querySelector('#r-slider-z12-dual'),.3);const rise=cap.mf1ProfessorState.h,jump=cap.mf1ProfessorState.jump;
  a.change(cap.querySelector('#r-slider-z12-dual'),.6);close(cap.mf1ProfessorState.h,rise/2);close(cap.mf1ProfessorState.jump,jump/2);
  for(const theta of [0,90,130]){a.change(cap.querySelector('#z12-theta'),theta);const m=cap.mf1ProfessorState;close(m.jump,m.rho*9.81*m.h);close(m.force,m.column);assert.equal(Math.sign(m.h),theta<90?1:theta===90?0:-1);}
  close(shear.mf1ProfessorState.tau,tau);a.scan('V2');assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});

test('Translation and rotation keep separate scenes and independent pressure contributions',()=>{
 const a=load(4),translation=a.w.document.getElementById('v4-intro-principle-widget'),rotation=a.w.document.getElementById('z35-advanced-widget');
 try{
  a.change(translation.querySelector('#v4-ax-slider'),-4);assert.ok(a.visible(rotation));assert.equal(rotation.closest('#v4-intro-principle-widget'),null);
  a.change(rotation.querySelector('#z35-a-slider'),0);const vertical=rotation.mf1ProfessorState.dpv;
  for(const n of [0,100,200]){a.change(rotation.querySelector('#z35-n-slider'),n);const m=rotation.mf1ProfessorState;close(m.dpr,740*(n*Math.PI/30)**2*.5**2/2);close(m.dpv,vertical);close(m.pressure,m.pVertical+m.pRadial);}
  a.change(rotation.querySelector('#z35-a-slider'),10);close(rotation.mf1ProfessorState.dpv,740*19.81*2);assert.equal(translation.querySelector('#v4-ax-slider').value,'-4');a.scan('V4');assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});
