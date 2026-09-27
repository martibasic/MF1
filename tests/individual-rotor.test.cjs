const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const close=(actual,expected,tolerance=1e-9)=>assert.ok(Math.abs(actual-expected)<=tolerance*Math.max(Math.abs(expected),1e-10),`${actual} != ${expected}`);
function integrate(f,lo,hi,steps=2000){const h=(hi-lo)/steps;let value=0;for(let i=0;i<steps;i++)value+=f(lo+(i+.5)*h)*h;return value;}
function fixture(run){const a=load(2);try{const root=a.w.document.getElementById('widget-z10-vfinal');run(a,root,(id,value)=>a.change(root.querySelector('#z10-v7-slider-'+id),value));a.scan('rotor');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}

test('Rotor torque integrates surface traction independently in radius, including clipped finite strips',()=>fixture((a,root,set)=>{
 for(const [height,span,angle]of [[80,150,30],[20,50,5],[150,250,60]]){
  set('a',height);set('b',span);set('alpha',angle);
  for(const y of [height,height+span/2,height+span-.5,height+span]){
   set('y',y);const s=root.mf1ProfessorState;
   // Surface area in the independent radius coordinate: dA/dr = 2πr/sin α.
   const r1=s.a*Math.tan(s.alpha),r2=(s.a+s.b)*Math.tan(s.alpha);
   const density=r=>r*(s.mu*s.omega*r/s.delta)*(2*Math.PI*r/Math.sin(s.alpha));
   close(s.totalMoment,integrate(density,r1,r2),2e-7);
   close(s.cumulative,integrate(density,r1,s.r),2e-7);
   close(s.stripMoment,integrate(density,s.lo*Math.tan(s.alpha),s.hi*Math.tan(s.alpha)),2e-7);
   close(s.dMdy,density(s.r)*Math.tan(s.alpha));close(s.localTau,s.mu*s.localV/s.delta);
   close(s.fluidMoment,-s.driveMoment);close(s.power,s.driveMoment*s.omega);
   assert.equal(root.querySelectorAll('#z10-v7-explainer li[data-active=true]').length,1);
   const expected=y===height?'0':y===height+span?'2':'1';
   assert.equal(root.querySelector('#z10-v7-explainer li[data-active=true]').dataset.branch,expected);
   close(s.stripWidth,(expected==='1'?1:.5)/1000);
  }
 }
 set('a',80);set('b',150);set('alpha',30);set('y',150);const s=root.mf1ProfessorState;
 close(s.totalMoment,16.042193819705876);close(s.cumulative,2.706947492201472);close(s.dMdy,78.53981633974482);
 set('y',229);const full=root.mf1ProfessorState.stripMoment;set('y',230);assert.ok(root.mf1ProfessorState.stripMoment<full,'The clipped half strip is smaller even though q increases');
 set('a',20);set('alpha',5);close(root.mf1ProfessorState.thinFilmRatio,.6858031381656805,1e-10);
 assert.match(root.querySelector('#z10-v7-validity').textContent,/δ\/rmin ≪ 1/);
 assert.match(root.querySelector('#z10-v7-strip').textContent,/ΔM = ∫ q dy/);
}));

test('Rotor uses one native vector scene with physical gap, shared ordinate, true band thickness and uncapped radii',()=>fixture((a,root,set)=>{
 const svg=root.querySelector('#canvas-z10-v7-side');
 assert.equal(svg.localName,'svg');assert.equal(svg.dataset.mf1Vector,'true');
 assert.equal(root.querySelectorAll('svg').length,1);assert.equal(root.querySelectorAll('canvas,image,foreignObject').length,0);
 assert.equal(root.querySelectorAll('input[type=range]').length,4);
 for(const compact of [false,true]){
  Object.defineProperty(root,'clientWidth',{configurable:true,value:compact?340:920});a.w.dispatchEvent(new a.w.Event('resize'));
  for(const angle of [5,30,60]){
   set('a',150);set('b',250);set('alpha',angle);
   let lastR=0,scale;
   for(const y of [150,250,400]){
    set('y',y);const s=root.mf1ProfessorState,top=svg.querySelector('[data-z10-radius=top]'),side=svg.querySelector('[data-z10-probe=side]'),curve=svg.querySelector('[data-z10-probe=curve]');
    const radius=Number(top.getAttribute('r'));
    assert.ok(radius>lastR);lastR=radius;if(scale!==undefined)close(s.topScale,scale);scale=s.topScale;
    close(radius,s.r*s.topScale);close(Number(side.getAttribute('cx'))-s.virtualX,s.r*s.axialScale);
    close(Number(side.getAttribute('cy')),Number(curve.getAttribute('cy')));close(Number(side.getAttribute('cy')),s.virtualY-s.y*s.axialScale);
    close(Number(svg.querySelector('[data-z10-casing-radius]').getAttribute('r'))-radius,s.delta/Math.cos(s.alpha)*s.topScale);
    const gap=svg.querySelector('[data-z10-normal-gap]'),dx=+gap.getAttribute('x2')-+gap.getAttribute('x1'),dy=+gap.getAttribute('y2')-+gap.getAttribute('y1');
    close(Math.hypot(dx,dy),s.delta*s.axialScale);assert.ok(Math.abs(dx*Math.sin(s.alpha)-dy*Math.cos(s.alpha))<1e-10,'The drawn gap is normal to the cone generatrix');
    const band=svg.querySelector('[data-z10-strip]').getAttribute('d').match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi).map(Number);
    close(band[1]-band[5],s.stripWidth*s.axialScale);close(s.lo,Math.max(s.a,s.y-.0005));close(s.hi,Math.min(s.a+s.b,s.y+.0005));
    const ref=svg.querySelector('[data-z10-reference-radius]');close(+ref.getAttribute('r'),(s.a+s.b)*Math.tan(s.alpha)*s.topScale);
   }
  }
  // Arc direction is checked from the actual vector path, not only from its label/state.
  const s=root.mf1ProfessorState;
  for(const [name,sign]of [['omega-ccw',-1],['fluid-drag-cw',1]]){
   const p=svg.querySelector(`[data-z10-direction="${name}"]`).getAttribute('d').match(/-?\d+(?:\.\d+)?/g).map(Number);
   const cross=(p[0]-s.topCenterX)*(p[3]-s.topCenterY)-(p[1]-s.topCenterY)*(p[2]-s.topCenterX);
   assert.equal(Math.sign(cross),sign);
  }
  if(compact)assert.ok([...svg.querySelectorAll('text')].every(t=>Number(t.getAttribute('font-size'))>=18));
 }
}));
