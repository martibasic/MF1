const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const close=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} != ${b}`);
function experiment(run){const a=load(4);try{const id=s=>a.w.document.getElementById(s),r=id('z36-centrifugal-widget');run(a,r,id);a.scan('rotating U tube');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
const integrate=(f,a,b,N=2000)=>{let s=0,dx=(b-a)/N;for(let i=0;i<N;i++)s+=f(a+(i+.5)*dx)*dx;return s;};
function set(a,id,n,h){a.change(id('z36-h-slider'),h);a.change(id('z36-n-slider'),n);}

test('The rotating U tube preserves its two controls in one accessible vector scene',()=>experiment((a,r,id)=>{
 assert.equal(r.querySelectorAll('svg').length,1);assert.equal(id('z36-side-canvas').localName,'svg');assert.equal(r.querySelector('canvas,image,foreignObject'),null);
 for(const key of ['n','h'])assert.ok(id('z36-'+key+'-slider').labels.length);
 assert.equal(r.querySelectorAll('.z36-reading').length,3);assert.equal(r.querySelectorAll('.mf1-decision li').length,3);
 assert.equal(id('z36-n-slider').step,'any');assert.equal(id('z36-n-slider').max,'120');
 assert.match(r.querySelector('.z36-caption').textContent,/Jednodimenzijski model/);
 close(r.mf1ProfessorState.rho,898.111061771306);close(r.mf1ProfessorState.pressure,869.9669504877449);
}));

test('Independent signed pressure integrals agree through the positive-density phase interface',()=>experiment((a,r,id)=>{
 for(const h of [.04,.1,.16])for(const n of [0,30,50]){
  set(a,id,n,h);const m=r.mf1ProfessorState,w=2*Math.PI*n/60;
  const water=integrate(()=>1000*9.81,0,h)+integrate(x=>1000*w*w*x,.15,0);
  const leftSpecific=integrate(()=>9.81,0,h)+integrate(x=>w*w*x,-.05,0);
  assert.ok(m.valid);close(m.rho,water/leftSpecific);close(m.pressure,water);
  const unknown=integrate(()=>m.rho*9.81,0,h)+integrate(x=>m.rho*w*w*x,-.05,0);close(unknown,water);
  assert.ok(m.rho>0&&m.rho<=1000+1e-9);
 }
}));

test('The denominator remains positive, while the centrifugal integral scales with the square of radius',()=>experiment((a,r,id)=>{
 for(const h of [.04,.1,.16])for(const n of [0,30,120]){
  set(a,id,n,h);const m=r.mf1ProfessorState;assert.ok(m.leftTerm>=.1950079119782);
  close(m.centrifugal2,9*m.centrifugal1);close(m.gravity,9.81*h);
  const a1=m.w*m.w*.05,a2=m.w*m.w*.15;close(a2,3*a1);
 }
}));

test('The exact boundary preset reaches the zero numerator and rejects zero density',()=>experiment((a,r,id)=>{
 for(const h of [.04,.1,.16]){
  a.change(id('z36-h-slider'),h);id('z36-critical-preset').click();const m=r.mf1ProfessorState;
  close(m.n,Math.sqrt(2*9.81*h)/.15*30/Math.PI);assert.equal(m.rightTerm,0);assert.equal(m.valid,false);assert.equal(m.rho,null);assert.equal(m.pressure,null);
  assert.equal(Number(r.querySelector('.mf1-decision li[data-active=true]').dataset.branch),2);assert.match(r.querySelector('.mf1-decision').textContent,/Formalna ρf = 0/);
  a.change(id('z36-n-slider'),m.n*(1-1e-6));assert.ok(r.mf1ProfessorState.valid);assert.ok(r.mf1ProfessorState.rho>0);
  a.change(id('z36-n-slider'),m.n*(1+1e-6));assert.equal(r.mf1ProfessorState.valid,false);assert.ok(r.mf1ProfessorState.waterRequirement<0);
 }
}));

test('Above the boundary the incompatible pressure demands are shown without a negative physical density',()=>experiment((a,r,id)=>{
 set(a,id,120,.04);const m=r.mf1ProfessorState;assert.ok(m.rightTerm<0&&m.leftTerm>0);assert.equal(m.valid,false);assert.equal(m.rho,null);assert.equal(m.pressure,null);
 close(m.waterRequirement,1000*(9.81*.04-(4*Math.PI)**2*.15**2/2));
 assert.match(id('z36-res-rho').textContent,/nema pozitivnog/);assert.match(id('z36-res-pressure').textContent,/nespojivi/);
 assert.match(r.querySelector('.mf1-decision').textContent,/Negativan pretlak sam po sebi nije nemoguć/);
 for(const p of r.querySelectorAll('[data-fluid-path]'))assert.ok(p.hasAttribute('stroke-dasharray'));
}));

test('The one-dimensional centerlines preserve both physical radii and the common height in an isotropic section',()=>experiment((a,r,id)=>{
 for(const h of [.04,.1,.16]){
  set(a,id,30,h);const m=r.mf1ProfessorState,q=m.geometry,I=r.querySelector('[data-interface-point]');
  close((q.axis-q.left)/q.scale,.05);close((q.right-q.axis)/q.scale,.15);close((q.base-q.free)/q.scale,h);
  close(+I.getAttribute('cx'),q.axis);close(+I.getAttribute('cy'),q.base);assert.equal(I.dataset.r,'0');assert.equal(I.dataset.z,'0');
  assert.equal(r.querySelectorAll('[data-fluid-path]').length,2);assert.equal(r.querySelector('polygon'),null);
  for(const path of r.querySelectorAll('[data-fluid-path]'))assert.equal(path.getAttribute('fill'),'none');
 }
}));

test('Both potential paths share a fixed SI axis and their endpoints expose positive, zero and negative sums',()=>experiment((a,r,id)=>{
 const scales=[];
 for(const n of [0,30,120]){
  set(a,id,n,.1);const m=r.mf1ProfessorState,axis=r.querySelector('[data-potential-paths]');scales.push(axis.dataset.scale);
  assert.equal(Number(axis.dataset.min),-1.8);assert.equal(Number(axis.dataset.max),1.8);
  for(const i of [1,2]){const dot=r.querySelector('[data-potential-result="'+i+'"]'),value=i===1?m.leftTerm:m.rightTerm;close((+dot.getAttribute('cx')-+axis.dataset.zero)/+axis.dataset.scale,value);}
 }
 id('z36-critical-preset').click();const axis=r.querySelector('[data-potential-paths]'),zero=r.querySelector('[data-potential-result="2"]');close(+zero.getAttribute('cx'),+axis.dataset.zero);
 assert.equal(new Set(scales).size,1);
}));

test('Mobile scenes preserve readable text, native geometry and a stable height across regime changes',()=>experiment((a,r,id)=>{
 const svg=id('z36-side-canvas');
 for(const width of [240,320,960]){
  svg.getBoundingClientRect=()=>({width,height:400,left:0,top:0});a.w.dispatchEvent(new a.w.Event('resize'));const heights=[];
  for(const n of [0,30,120]){set(a,id,n,.1);const box=svg.getAttribute('viewBox').split(' ').map(Number);assert.equal(box[2],width);heights.push(box[3]);assert.equal(svg.dataset.layout,width<740?'vertical':'horizontal');
   for(const text of svg.querySelectorAll('text'))assert.ok(parseFloat(a.w.getComputedStyle(text).fontSize)>=16);assert.equal(svg.querySelector('image,foreignObject'),null);assert.ok(!/NaN|Infinity/.test(svg.innerHTML));
  }
  assert.equal(new Set(heights).size,1);
 }
}));
