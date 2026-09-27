const test=require('node:test'),assert=require('node:assert/strict');
const{load}=require('./widget-harness.cjs');
const close=(a,b,t=1e-10)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} != ${b}`);
const displayed=el=>Number(el.textContent.replace(/[\s.]/g,'').replace(',','.'));
function experiment(run){const a=load(2,{reduced:false});try{const root=a.w.document.getElementById('widget-visc-basics');run(a,root,id=>a.w.document.getElementById(id));}finally{a.dom.window.close();}}

test('Viscosity has one native SVG, seven deterministic layers and associated controls',()=>experiment((a,r,id)=>{
 assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelectorAll('canvas').length,0);
 assert.equal(id('visc-canvas').localName,'svg');assert.equal(id('v2nn-plot').localName,'g');
 const tracers=[...r.querySelectorAll('[data-visc-tracer]')];assert.equal(tracers.length,7);
 assert.equal(new Set(tracers.map(e=>e.getAttribute('cx'))).size,1);
 assert.equal(new Set(tracers.map(e=>e.getAttribute('cy'))).size,7);
 for(const name of ['v-slider','h-slider','mu-slider'])assert.ok(id(name).labels.length);
 assert.equal(r.querySelector('image,foreignObject'),null);a.scan('single native scene');assert.deepEqual(a.errors,[]);
}));

test('All 24 parameter corners satisfy the independently calibrated power law and wall traction balance',()=>experiment((a,r,id)=>{
 for(const [mode,n]of [['thin',.58],['newton',1],['thick',1.45]]){
  r.querySelector(`[data-v2nn=${mode}]`).click();
  for(const U of [.1,5])for(const delta of [.002,.03])for(const mu of [.01,1]){
   a.change(id('v-slider'),U);a.change(id('h-slider'),delta*1000);a.change(id('mu-slider'),mu);
   const m=r.mf1ProfessorState,g=U/delta,stress=100*mu*Math.pow(g/100,n);
   close(m.gradient,g);close(m.tau,stress);close(m.tangent/m.apparent,n);
   close(m.topTraction+m.bottomTraction,0);close(m.force,stress*.06);close(m.power,stress*.06*U);
   assert.ok(displayed(id('tau-out'))>0);assert.ok(displayed(id('visc-force-out'))>0);assert.ok(displayed(id('visc-power-out'))>0);
   assert.ok(Math.abs(displayed(id('tau-out'))-stress)/stress<.0005);
   a.scan(mode+' corner');
  }
 }
 assert.deepEqual(a.errors,[]);
}));

test('The work supplied by the moving wall equals the integrated volume dissipation',()=>experiment((a,r,id)=>{
 for(const mode of ['thin','newton','thick']){
  r.querySelector(`[data-v2nn=${mode}]`).click();a.change(id('v-slider'),2.3);a.change(id('h-slider'),7);a.change(id('mu-slider'),.37);
  const m=r.mf1ProfessorState,N=1000,dy=m.delta/N;let dissipation=0;
  for(let i=0;i<N;i++){
   const lower=m.U*(i*dy)/m.delta,upper=m.U*((i+1)*dy)/m.delta,gradient=(upper-lower)/dy;
   const stress=100*m.mu*Math.pow(gradient/100,m.exponent);dissipation+=stress*gradient*m.area*dy;
  }
  close(m.power,dissipation);close(m.dissipation,dissipation);
  assert.match(id('visc-global-out').textContent,/∫V τγ̇ dV/);assert.doesNotMatch(id('visc-global-out').textContent,/moment|N·m/);
 }
}));

test('The common calibration crosses at 100 per second and comparative stress ordering reverses there',()=>experiment((a,r,id)=>{
 a.change(id('mu-slider'),.4);a.change(id('h-slider'),10);
 for(const U of [.5,1,2]){
  a.change(id('v-slider'),U);const values={};
  for(const mode of ['thin','newton','thick']){r.querySelector(`[data-v2nn=${mode}]`).click();values[mode]=r.mf1ProfessorState.tau;}
  if(U===1){close(values.thin,40);close(values.newton,40);close(values.thick,40);}
  else if(U<1)assert.ok(values.thin>values.newton&&values.newton>values.thick);
  else assert.ok(values.thick>values.newton&&values.newton>values.thin);
 }
}));

test('Low stresses remain measurable and every material uses identical comparative axes',()=>experiment((a,r,id)=>{
 a.change(id('v-slider'),.1);a.change(id('h-slider'),30);a.change(id('mu-slider'),.01);
 const axes=[];
 for(const mode of ['thin','newton','thick']){
  r.querySelector(`[data-v2nn=${mode}]`).click();const p=id('v2nn-plot'),m=r.mf1ProfessorState;
  axes.push([p.dataset.xMax,p.dataset.yMax].join('|'));assert.ok(m.xMax<10);assert.ok(m.yMax<1);
  assert.equal(p.querySelectorAll('[data-visc-curve]').length,3);assert.equal(p.querySelectorAll('[data-visc-curve][data-active=true]').length,1);
  assert.equal(p.querySelectorAll('[data-visc-tangent]').length,mode==='newton'?0:1);
  assert.equal(p.querySelectorAll('[data-visc-secant]').length,mode==='newton'?0:1);
 }
 assert.equal(new Set(axes).size,1);close(r.mf1ProfessorState.tau,.007213967487229321);
 assert.ok(displayed(id('tau-out'))>.007);assert.match(id('visc-explainer').textContent,/100 s⁻¹/);
}));

test('Mobile geometry reflows the existing groups and leaves all seven layers apart',()=>experiment((a,r,id)=>{
 const svg=id('visc-canvas');svg.getBoundingClientRect=()=>({width:320,height:400});a.w.dispatchEvent(new a.w.Event('resize'));
 const box=svg.getAttribute('viewBox').split(' ').map(Number);assert.equal(box[2],320);assert.ok(box[3]>box[2]);assert.equal(svg.dataset.layout,'vertical');
 const cy=[...svg.querySelectorAll('[data-visc-tracer]')].map(e=>+e.getAttribute('cy')).sort((a,b)=>a-b);
 for(let i=1;i<cy.length;i++)assert.ok(cy[i]-cy[i-1]>=24);
 for(const el of svg.querySelectorAll('text'))assert.ok(parseFloat(a.w.getComputedStyle(el).fontSize)>=16);
 const x=+id('v2nn-plot').querySelector('[data-visc-working-point]').getAttribute('cx');assert.ok(x>62&&x<304);
 svg.getBoundingClientRect=()=>({width:960,height:400});a.w.dispatchEvent(new a.w.Event('resize'));assert.equal(svg.dataset.layout,'horizontal');
 a.scan('responsive scene');assert.deepEqual(a.errors,[]);
}));

test('Tracer motion retains SVG nodes and integrates physical displacement at different frame rates',()=>{
 for(const fps of [10,60])experiment((a,r,id)=>{
  a.change(id('v-slider'),1.2);a.frames(2);const bar=r.querySelector('.mf1-motion'),plot=id('v2nn-plot'),originalPlot=plot.innerHTML;
  const tracers=[...r.querySelectorAll('[data-visc-tracer]')];bar.querySelector('button').click();a.frames(1,1000/fps);a.frames(fps*2,1000/fps);
  const m=r.mf1ProfessorState;close(m.elapsed,2);assert.equal(plot.innerHTML,originalPlot);
  tracers.forEach((circle,i)=>{assert.equal(circle,r.querySelector(`[data-visc-tracer="${i}"]`));close(m.tracerTravel[i],1.2*(i/6)*2);close(+circle.getAttribute('cx'),m.tracerStart+(m.tracerTravel[i]%5)/5*m.tracerWidth);});
  r.mf1ViscosityMotion.reset();close(r.mf1ProfessorState.elapsed,0);assert.equal(new Set(tracers.map(e=>e.getAttribute('cx'))).size,1);
 });
});
