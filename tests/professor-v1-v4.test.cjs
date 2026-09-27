const test=require('node:test');
const assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const close=(actual,expected,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<=tolerance*Math.max(1,Math.abs(expected)),`${actual} != ${expected}`);
const exercise=(n,fn)=>{const a=load(n);try{fn(a,a.w.document);a.scan('professor');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}};
const integral=(fn,lo,hi,N=20000)=>{let sum=0,dx=(hi-lo)/N;for(let i=0;i<N;i++)sum+=fn(lo+(i+.5)*dx)*dx;return sum;};
const state=(doc,id)=>doc.getElementById(id).mf1ProfessorState;
const set=(a,id,value)=>a.change(a.w.document.getElementById(id),value);

test('Every retained V1–V4 example has an exposed physical model and visible causal alternatives',()=>{
 for(const [n,count]of [[1,3],[2,3],[3,3],[4,4]])exercise(n,(a,d)=>{
  const roots=[...d.querySelectorAll('[data-widget-role]')];assert.equal(roots.length,count);assert.equal(roots.filter(r=>r.dataset.widgetRole==='intro').length,1);
  const verify=()=>{for(const r of roots){assert.ok(r.mf1ProfessorState,r.id);const tree=r.querySelector('.mf1-decision');assert.ok(tree,r.id);assert.ok(!tree.closest('details'),r.id+' hides its causal tree');assert.ok(a.visible(tree),r.id);assert.ok(tree.querySelectorAll('li[data-branch]').length>=2);assert.ok(tree.querySelector('li[data-active=true]'));}};
  verify();
  for(const input of d.querySelectorAll('input[type=range],select')){
   const before=input.value;for(const value of input.tagName==='SELECT'?[...input.options].map(o=>o.value):[input.min,input.max])if(value!==''){a.change(input,value);a.scan(input.id);verify();}a.change(input,before);
  }
  for(const button of d.querySelectorAll('#v1-load-lab [data-mode],#widget-visc-basics [data-v2nn],#v3-intro-widget .v3-tab')){button.click();verify();a.scan(button.textContent);}
  a.frames(3);
 });
});

test('V1 load laboratory conserves hydraulic work, mass under compression and signed Couette stress',()=>exercise(1,(a,d)=>{
 const root=d.getElementById('v1-load-lab');
 for(const ratio of [1,3.5,8]){set(a,'v1x-ratio',ratio);for(const force of [0,170]){set(a,'v1x-force',force);const m=root.mf1ProfessorState;close(m.F1*m.s1,m.F2*m.s2);close(m.A1*m.s1,m.A2*m.s2);close(m.F2/m.A2,m.F1/m.A1);}}
 root.querySelector('[data-mode=compression]').click();set(a,'v1x-dp',20);set(a,'v1x-K',50);let m=root.mf1ProfessorState;
 // Integrate dV/dp=-V/K independently with midpoint stepping, not the source's exponential.
 let volume=m.V1,dp=m.dp/20000;for(let i=0;i<20000;i++){const mid=volume-volume/m.K*dp/2;volume-=mid/m.K*dp;}close(m.V2,volume,1e-10);close(m.densityRatio*m.V2,m.V1,1e-12);
 root.querySelector('[data-mode=viscosity]').click();for(const U of [-2.4,0,2.4]){set(a,'v1x-U',U);m=root.mf1ProfessorState;close(m.u/m.y,m.U/m.delta);close(m.tau*m.delta,m.mu*m.U);assert.equal(Math.sign(m.tau),Math.sign(U));}
}));

test('Ocean probe agrees with numerical integration of two hydrostatic differential equations',()=>exercise(1,(a,d)=>{
 // Independent RK4 integration of p'=rho*g and rho'=rho^2*g/K.
 for(const depth of [0,5000,10000]){
  set(a,'z5-depth',depth);const m=state(d,'z5-advanced-widget');let rho=1025,p=1e5;const dh=depth/20000,g=9.81,K=2.34e9,f=r=>r*r*g/K;
  for(let i=0;i<20000;i++){const k1=f(rho),r2=rho+dh*k1/2,k2=f(r2),r3=rho+dh*k2/2,k3=f(r3),r4=rho+dh*k3,k4=f(r4);p+=dh*g*(rho+2*r2+2*r3+r4)/6;rho+=dh*(k1+2*k2+2*k3+k4)/6;}
  close(m.pressure,p);close(m.density,rho);close(m.gradient,rho*g);assert.ok(m.pressure>=m.reference-1e-5);
 }
}));

test('Pipe probe, integrated discharge and wall traction satisfy the same momentum balance',()=>exercise(1,(a,d)=>{
 for(const D of [40,150])for(const beta of [10,500]){
  set(a,'z6-d',D);set(a,'z6-beta',beta);const m=state(d,'z6-advanced-widget');
  const flow=integral(r=>2*Math.PI*r*m.beta*(m.R*m.R-r*r)/(4*m.mu),0,m.R);
  close(m.flow,flow,1e-8);close(m.pressureForce,m.shearForce);close(m.wallStress*2*Math.PI*m.R*m.L,m.beta*m.L*Math.PI*m.R*m.R);
 }
 const canvas=d.getElementById('z6-main-canvas');for(const key of ['Home','End']){canvas.dispatchEvent(new a.w.KeyboardEvent('keydown',{key,bubbles:true}));const m=state(d,'z6-advanced-widget');close(m.u,0);close(m.tau,m.wallStress);}
}));

test('The three rheologies share one reference viscosity and respond to the same velocity gradient',()=>exercise(2,(a,d)=>{
 const root=d.getElementById('widget-visc-basics');set(a,'mu-slider',.4);set(a,'h-slider',10);set(a,'v-slider',1);
 for(const button of root.querySelectorAll('[data-v2nn]')){
  button.click();let m=root.mf1ProfessorState;close(m.gradient,100);close(m.tau,40);close(m.apparent,.4);
  const stress=m.tau,n=m.exponent;set(a,'v-slider',2);m=root.mf1ProfessorState;close(m.tau/stress,2**n);close(m.tangent/m.apparent,n);close(m.gradient*m.delta,m.v);set(a,'v-slider',1);
 }
}));

test('One capillary geometry balances circumference tension, hydrostatic pressure and signed meniscus height',()=>exercise(2,(a,d)=>{
 for(const fluid of ['water','mercury']){set(a,'z12-fluid',fluid);for(const theta of [0,90,130,180])for(const radius of [.1,1.5]){
  set(a,'r-slider-z12-dual',radius);set(a,'z12-theta',theta);const m=state(d,'widget-z12-vdual-fixed');
  const verticalTension=integral(()=>m.sigma*m.cos*m.r,0,2*Math.PI);
  close(m.force,verticalTension,1e-12);close(m.force,m.rho*9.81*(Math.PI*m.r*m.r*m.h),1e-12);close(m.jump*Math.PI*m.r*m.r,m.force,1e-12);
  assert.equal(Math.sign(m.h),theta===90?0:theta<90?1:-1);if(theta===90){assert.equal(m.jump,0);assert.equal(m.force,0);}
 }}
}));

test('Rotor torque and selected strip agree with independent surface-traction quadrature',()=>exercise(2,(a,d)=>{
 for(const alpha of [5,30,60]){set(a,'z10-v7-slider-alpha',alpha);for(const y of [80,150,230]){
  set(a,'z10-v7-slider-y',y);const m=state(d,'widget-z10-vfinal');
  const contribution=height=>{const radius=height*Math.tan(m.alpha),traction=m.mu*m.omega*radius/m.delta,dArea=2*Math.PI*radius/Math.cos(m.alpha);return radius*traction*dArea;};
  close(m.totalMoment,integral(contribution,m.a,m.a+m.b),1e-8);close(m.dMdy,contribution(m.y));close(m.localTau,m.mu*m.localV/m.delta);
  const lo=Math.max(m.a,m.y-.0005),hi=Math.min(m.a+m.b,m.y+.0005);close(m.stripMoment,integral(contribution,lo,hi,200),1e-8);
 }}
}));

test('The V3 introduction preserves pressure-gradient, signed manometer path and accelerating-volume balances',()=>exercise(3,(a,d)=>{
 for(const depth of [0,3]){set(a,'v3-intro-depth',depth);const m=state(d,'v3-intro-widget');close(m.pressure,integral(()=>m.rho*9.81,0,depth));}
 a.w.switchV3Tab('manometar');for(const rho of [500,1000,2000]){set(a,'v3-intro-rho',rho);const m=state(d,'v3-intro-widget');close(m.rho1*m.h1,m.rho2*m.h2);close(m.pressure-m.rho2*9.81*m.h2,0);}
 a.w.switchV3Tab('ubrzanje');for(const acceleration of [-4,0,4]){set(a,'v3-intro-acc',acceleration);const m=state(d,'v3-intro-widget');close((m.right-m.left)/m.L,-acceleration/9.81);close(m.pR-m.pL,-1000*acceleration*m.L);close(m.area,(m.left+m.right)*m.L/2);}
}));

test('Buoyancy equals the integral of vertical pressure traction, including fully submerged top pressure',()=>exercise(3,(a,d)=>{
 for(const rho of [500,800,1000,1300]){
  set(a,'v3-buoy-rho',rho);const m=state(d,'v3-buoyancy-explorer'),topDepth=Math.max(0,(m.top-m.surface)/1000),bottomDepth=(m.bottom-m.surface)/1000;
  close(m.force,(rho*9.81*bottomDepth-rho*9.81*topDepth)*.02);close(m.force-m.weight,rho>=800?0:(rho-800)*9.81*.003);
  close(m.center,(Math.max(m.top,m.surface)+m.bottom)/2);assert.ok(m.fraction<=1);assert.ok(d.querySelector('#v3-buoy-explainer li[data-active=true]'));
 }
}));

test('Solar-lake pressure integrates the varying density and its probe has the local hydrostatic slope',()=>exercise(3,(a,d)=>{
 for(const h of [1,6]){set(a,'z28-h',h);for(const z of [0,h/2,h]){
  set(a,'z28-probe',z);const m=state(d,'widget-z28-advanced');
  const p=m.rho0*9.81*.8+integral(depth=>m.rho0*9.81/Math.cos(Math.PI*depth/(4*h)),0,z);
  close(m.pressure,p);close(m.gradient,m.rho*9.81);assert.ok(m.pressure<=m.bottomPressure+1e-8);
 }}d.getElementById('z28-toggle').click();const m=state(d,'widget-z28-advanced');assert.ok(m.flat);close(m.pressure,m.rho0*9.81*(m.z+.8));
}));

test('Translating pressure potential is constant along its free surface and gives the plotted probe pressure',()=>exercise(4,(a,d)=>{
 for(const ax of [-10,0,10])for(const az of [-5,0,10]){set(a,'v4-ax-slider',ax);set(a,'v4-az-slider',az);const m=state(d,'v4-intro-principle-widget');
  close(m.gradientX+m.gradientZ*m.slope,0,1e-9);close(m.pressure,-m.gradientZ*m.depth);close(Math.sign(m.slope),ax===0?0:-Math.sign(ax));
 }
}));

test('Rotating pressure probe integrates the same potential along either order of radial and depth paths',()=>exercise(4,(a,d)=>{
 for(const n of [0,90,300])for(const acceleration of [-9,20]){set(a,'z35-n-slider',n);set(a,'z35-a-slider',acceleration);const m=state(d,'z35-advanced-widget');
  const radial=integral(r=>m.rho*m.w*m.w*r,0,m.r),vertical=integral(()=>m.rho*(9.81+m.a),0,m.z);
  close(m.pressure,radial+vertical);close(m.pRadial,radial);close(m.pVertical,vertical);
 }
 const canvas=d.getElementById('z35-heatmap-canvas');canvas.dispatchEvent(new a.w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));assert.ok(state(d,'z35-advanced-widget').r>.25);
}));

test('Rotating U-tube accepts only positive density and reproduces the pressure at one common interface',()=>exercise(4,(a,d)=>{
 for(const h of [.04,.1,.16]){set(a,'z36-h-slider',h);for(const n of [0,30,120]){set(a,'z36-n-slider',n);const m=state(d,'z36-centrifugal-widget');
  const waterPath=integral(()=>1000*9.81,0,h)+integral(r=>1000*m.w*m.w*r,m.r2,0);
  if(m.valid){const unknownPath=integral(()=>m.rho*9.81,0,h)+integral(r=>m.rho*m.w*m.w*r,m.r1,0);assert.ok(m.rho>0);close(unknownPath,waterPath);close(m.pressure,waterPath);}
  else{assert.equal(m.rho,null);assert.ok(waterPath<=0);assert.equal(m.pressure,null);}
  close(m.critical*m.critical*m.r2*m.r2/2,9.81*h);
 }}
}));

test('Rotating open tank conserves initial plus spilled volume and switches at physically derived boundaries',()=>exercise(4,(a,d)=>{
 for(const h0 of [.12,.29,.45]){set(a,'p2-h0-slider',h0);for(const w of [0,10,20,40]){set(a,'p2-w-slider',w);const m=state(d,'p2-ring-tank-widget');
  const volume=integral(r=>2*Math.PI*r*Math.max(0,m.c+w*w*r*r/(2*9.81)),0,m.R,50000);
  close(m.volume,volume,1e-9);close(m.volume+m.spilled,m.volume0,1e-10);assert.ok(m.edge<=m.H+1e-10);assert.ok(m.center>=0);
  if(m.dry>0)close(m.c+w*w*m.dry*m.dry/(2*9.81),0);if(m.spilled>0)close(m.edge,m.H);
 }
 const before=state(d,'p2-ring-tank-widget');set(a,'p2-w-slider',before.wDry);close(state(d,'p2-ring-tank-widget').c,0,1e-8);
 set(a,'p2-w-slider',before.wSpill-.001);close(state(d,'p2-ring-tank-widget').spilled,0,1e-12);set(a,'p2-w-slider',before.wSpill+.001);assert.ok(state(d,'p2-ring-tank-widget').spilled>0);
 }
}));
