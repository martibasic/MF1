const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');

test('V1 load scene distinguishes gauge pressure and physical wall tractions, with positive dissipation in either direction',()=>{
 const a=load(1);try{
  const root=a.w.document.getElementById('v1-load-lab');
  assert.match(root.querySelector('#v1x-equation').textContent,/p\* = p − patm/);
  assert.equal(root.querySelectorAll('canvas,image,foreignObject').length,0);
  root.querySelector('[data-mode=viscosity]').click();
  for(const U of [-2.4,0,2.4]){
   a.change(root.querySelector('#v1x-U'),U);const s=root.mf1ProfessorState;
   assert.equal(s.upperTraction,-s.tau);assert.equal(s.lowerTraction,s.tau);assert.ok(s.dissipation>=0);
   for(const face of ['upper','lower']){
    const g=root.querySelector(`[data-traction="${face}"]`),value=Number(g.dataset.value);
    assert.equal(value,s[face+'Traction']||0);
    const vector=g.querySelector('.mf1-vector path');
    if(U===0){assert.equal(vector,null);continue;}
    const coords=vector.getAttribute('d').match(/-?\d+(?:\.\d+)?/g).map(Number);
    assert.equal(Math.sign(coords[2]-coords[0]),Math.sign(value));
   }
  }
  assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});

test('Ocean uses a single vector depth probe for both selectable hydrostatic models',()=>{
 const a=load(1);try{
  const root=a.w.document.getElementById('z5-advanced-widget'),chart=root.querySelector('#z5-chart'),depth=root.querySelector('#z5-depth');
  assert.equal(root.querySelectorAll('canvas,image,foreignObject').length,0);
  assert.equal(chart.getAttribute('aria-orientation'),'vertical');
  a.change(depth,7000);
  const finite={...root.mf1ProfessorState};
  root.querySelector('[data-ocean-model=incompressible]').click();const fixed=root.mf1ProfessorState;
  assert.equal(fixed.density,1025);assert.equal(fixed.gradient,1025*9.81);
  assert.ok(Math.abs(finite.pressure-fixed.pressure-1080329.2079708426)<1e-5);
  assert.match(root.querySelector('li[data-active=true]').textContent,/zanemaruješ stlačivost/);
  root.querySelector('[data-ocean-model=compressible]').click();
  const circles=[...chart.querySelectorAll('[data-ocean-probe] circle')];assert.equal(circles.length,2);assert.equal(circles[0].getAttribute('cy'),circles[1].getAttribute('cy'));
  chart.dispatchEvent(new a.w.KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));assert.equal(depth.value,'7100');
  chart.dispatchEvent(new a.w.KeyboardEvent('keydown',{key:'ArrowUp',bubbles:true}));assert.equal(depth.value,'7000');
  a.change(depth,0);assert.equal(root.querySelector('li[data-active=true]').dataset.branch,'0');
  assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});

test('Pipe profile is vector, validates its laminar domain and preserves signed traction and exact probe mapping',()=>{
 const a=load(1),close=(actual,expected,tolerance=1e-9)=>assert.ok(Math.abs(actual-expected)<=tolerance*Math.max(1,Math.abs(expected)),`${actual} != ${expected}`);
 try{
  const root=a.w.document.getElementById('z6-advanced-widget'),surface=root.querySelector('#z6-main-canvas');
  const get=()=>root.mf1ProfessorState,set=(id,value)=>a.change(root.querySelector('#'+id),value);
  assert.equal(root.querySelectorAll('canvas,image,foreignObject').length,0);assert.equal(surface.localName,'svg');assert.equal(surface.dataset.mf1Vector,'true');
  close(get().mu,.04);close(get().Re,1953.125);assert.equal(root.querySelector('#z6-regime-reading').dataset.domain,'laminar');
  assert.equal(root.querySelector('#z6-mu').closest('details'),null);assert.ok(root.querySelector('#z6-l').closest('details'));
  // Numerical cross-section integration determines the mean velocity independently.
  for(const mu of [1,10,40,50]){
   set('z6-mu',mu);const m=get();let flow=0;const dr=m.R/10000;
   for(let i=0;i<10000;i++){const r=(i+.5)*dr;flow+=2*Math.PI*r*m.beta*(m.R*m.R-r*r)/(4*m.mu)*dr;}
   close(m.Re,m.rho*(flow/(Math.PI*m.R*m.R))*m.D/m.mu,1e-8);
   assert.equal(root.querySelector('#z6-regime-reading').dataset.domain,m.Re<2320?'laminar':'formal');
   close(m.pressureForce+m.wallOnFluidForce,0);close(m.fluidOnWallForce,-m.wallOnFluidForce);
  }
  for(const name of ['wall-on-fluid-top','wall-on-fluid-bottom','fluid-on-wall']){
   const path=surface.querySelector(`[data-z6-traction="${name}"]`),xy=path.getAttribute('d').match(/-?\d+(?:\.\d+)?/g).map(Number);
   assert.equal(Math.sign(xy[2]-xy[0]),name==='fluid-on-wall'?1:-1);
  }
  for(const key of ['Home','End']){surface.dispatchEvent(new a.w.KeyboardEvent('keydown',{key,bubbles:true}));const m=get();close(m.u,0);close(m.r,m.R);close(m.signedShear,-m.beta*m.y/2);close(m.tau,Math.abs(m.signedShear));assert.equal(Math.sign(m.signedShear),key==='Home'?-1:1);}
  set('z6-mu',50);set('z6-beta',10);set('z6-d',40);assert.ok(get().axisMax<=2.5*get().vmax);assert.ok(get().axisMax<.1);
  // A hit on either actual SVG probe must preserve the same physical point.
  surface.dispatchEvent(new a.w.KeyboardEvent('keydown',{key:'Home',bubbles:true}));surface.dispatchEvent(new a.w.KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));
  for(const compact of [false,true]){
   Object.defineProperty(root,'clientWidth',{configurable:true,value:compact?340:900});a.w.dispatchEvent(new a.w.Event('resize'));
   surface.getBoundingClientRect=()=>({left:0,top:0,width:surface.width,height:surface.height});
   const before={...get()},channel=surface.querySelector('[data-z6-probe=channel]'),profile=surface.querySelector('[data-z6-probe=profile]');
   close(+channel.getAttribute('cy')-before.topWall,+profile.getAttribute('cy')-before.chartTop);
   if(!compact)close(before.probePixel,before.probeChartY);
   for(const name of ['channel','profile']){
    const point=surface.querySelector(`[data-z6-probe=${name}]`);
    surface.dispatchEvent(new a.w.MouseEvent('pointerdown',{clientX:+point.getAttribute('cx'),clientY:+point.getAttribute('cy'),bubbles:true}));
    surface.dispatchEvent(new a.w.MouseEvent('pointerup',{bubbles:true}));close(get().y,before.y);close(get().u,before.u);
   }
  }
  a.scan('vector pipe');assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});
