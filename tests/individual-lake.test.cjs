const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const close=(actual,expected,tol=1e-9)=>assert.ok(Math.abs(actual-expected)<=tol*Math.max(1,Math.abs(expected)),`${actual} != ${expected}`);
function integrate(f,a,b){let sum=0;const n=12000,dz=(b-a)/n;for(let i=0;i<n;i++)sum+=f(a+(i+.5)*dz)*dz;return sum;}
function fixture(fn){const a=load(3);try{const r=a.w.document.getElementById('widget-z28-advanced');fn(a,r,(id,v)=>a.change(r.querySelector('#z28-'+id),v));a.scan('lake');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
const coords=path=>path.getAttribute('d').match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi).map(Number);

test('Lake integrates both density models from the free surface and makes its three branches exclusive',()=>fixture((a,r,set)=>{
 const initial=r.mf1ProfessorState;
 close(initial.p1,8161.92);close(initial.pressure,29112.33728603937,1e-9);close(initial.rho,1125.6878883049296,1e-9);
 close(initial.bottomPressure,53958.4410681068,1e-9);close(initial.flatBottomPressure,48971.52);close(initial.extra,4986.9210681068,1e-9);
 for(const h of [1,4,6])for(const rho0 of [1000,1040,1100]){
  set('h',h);set('rho0',rho0);
  for(const flat of [false,true]){
   if(r.mf1ProfessorState.flat!==flat)r.querySelector('#z28-toggle').click();
   for(const z of [0,h/2,h]){
    set('probe',z);const s=r.mf1ProfessorState;
    // Integrate tiny layers measured from the free surface, independently of the analytic primitive.
    const pUpper=rho0*9.81*.8,pLower=integrate(depth=>rho0*9.81/(flat?1:Math.cos(Math.PI*depth/(4*h))),0,z);
    close(s.pressure,pUpper+pLower,2e-9);close(s.gradient,s.rho*9.81);assert.ok(s.pressure<=s.bottomPressure+1e-8);
    close(s.extra,s.variableBottomPressure-s.flatBottomPressure);assert.ok(s.extra>0);
    const branches=r.querySelectorAll('#z28-explainer li[data-active=true]');assert.equal(branches.length,1);assert.equal(branches[0].dataset.branch,z===0?'0':flat?'1':'2');
    const selected=flat?'flat':'variable',other=flat?'variable':'flat';
    for(const track of ['density','pressure']){
     const solid=r.querySelector(`[data-z28-track="${track}"][data-model="${selected}"]`),dashed=r.querySelector(`[data-z28-track="${track}"][data-model="${other}"]`);
     assert.equal(solid.dataset.active,'true');assert.equal(solid.getAttribute('stroke-dasharray'),'none');assert.equal(dashed.dataset.active,'false');assert.notEqual(dashed.getAttribute('stroke-dasharray'),'none');
    }
    if(z>0){assert.ok(s.naiveExcess>0);close(s.naivePressure-s.variablePressure,s.naiveExcess);}else{close(s.naiveExcess,0);close(s.pressure,s.p1);}
   }
  }
 }
}));

test('Lake SVG includes the continuous upper layer and aligns all probes on desktop and mobile',()=>fixture((a,r,set)=>{
 const svg=r.querySelector('#z28-canvas');assert.equal(svg.localName,'svg');assert.equal(svg.dataset.mf1Vector,'true');assert.equal(r.querySelectorAll('canvas,image,foreignObject').length,0);assert.equal(r.querySelectorAll('svg').length,1);
 for(const compact of [false,true]){
  Object.defineProperty(r,'clientWidth',{configurable:true,value:compact?340:920});a.w.dispatchEvent(new a.w.Event('resize'));
  for(const h of [1,6]){
   set('h',h);set('probe',h/2);const s=r.mf1ProfessorState;
   const points=[...r.querySelectorAll('[data-z28-probe]')];assert.equal(points.length,3);for(const p of points)close(+p.getAttribute('cy'),s.interfaceY+s.z*s.scale);
   close(s.interfaceY-s.surfaceY,.8*s.scale);close(s.bottomY-s.interfaceY,h*s.scale);
   for(const model of ['flat','variable']){
    const p=coords(r.querySelector(`[data-z28-track=pressure][data-model=${model}]`));
    close(p[0],s.pressureX);close(p[1],s.surfaceY);close(p[2],s.pressureX+s.p1/1000/s.pressureAxisMax*s.pressureWidth);close(p[3],s.interfaceY);
   }
   // Clicking any of the three markers must preserve the same physical depth.
   svg.getBoundingClientRect=()=>({left:0,top:0,width:svg.width,height:svg.height});
   for(const point of points){svg.dispatchEvent(new a.w.MouseEvent('pointerdown',{clientX:+point.getAttribute('cx'),clientY:+point.getAttribute('cy'),bubbles:true}));svg.dispatchEvent(new a.w.MouseEvent('pointerup',{bubbles:true}));close(r.mf1ProfessorState.z,h/2);}
   svg.dispatchEvent(new a.w.KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));close(r.mf1ProfessorState.z,h/2+.05);
   svg.dispatchEvent(new a.w.KeyboardEvent('keydown',{key:'ArrowUp',bubbles:true}));close(r.mf1ProfessorState.z,h/2);
   svg.dispatchEvent(new a.w.KeyboardEvent('keydown',{key:'Home',bubbles:true}));close(r.mf1ProfessorState.pressure,r.mf1ProfessorState.p1);
   svg.dispatchEvent(new a.w.KeyboardEvent('keydown',{key:'End',bubbles:true}));close(r.mf1ProfessorState.z,h);
   assert.equal(svg.getAttribute('aria-orientation'),'vertical');assert.equal(svg.getAttribute('aria-valuenow'),String(h));
  }
  if(compact){assert.equal(svg.width,360);assert.ok([...svg.querySelectorAll('text')].every(t=>+t.getAttribute('font-size')>=15));}
 }
}));
