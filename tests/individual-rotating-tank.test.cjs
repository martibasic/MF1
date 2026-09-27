const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const close=(x,y,tol=1e-9)=>assert.ok(Math.abs(x-y)<=tol*Math.max(1,Math.abs(y)),`${x} != ${y}`);
const integrate=(f,a,b,n=50000)=>{let s=0;const dx=(b-a)/n;for(let i=0;i<n;i++)s+=f(a+(i+.5)*dx)*dx;return s;};
function fixture(fn){const a=load(4);try{const r=a.w.document.getElementById('p2-ring-tank-widget');fn(a,r,(id,value)=>a.change(r.querySelector('#p2-'+id),value));a.scan('rotating tank');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
const numbers=el=>el.getAttribute('d').match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi).map(Number);

test('Open rotating tank independently conserves annular volume and chooses one calculation branch',()=>fixture((a,r,set)=>{
 for(const h0 of [.12,.29,.45]){
  set('h0-slider',h0);
  for(const w of [0,10,20,40]){
   set('w-slider',w);const s=r.mf1ProfessorState;
   const volume=integrate(radius=>2*Math.PI*radius*Math.max(0,s.c+w*w*radius*radius/(2*s.g)),0,s.R);
   close(s.volume,volume,1e-10);close(s.volume+s.spilled,Math.PI*s.R*s.R*h0);assert.ok(s.edge<=s.H+1e-10);assert.ok(s.center>=0);
   const active=r.querySelectorAll('#p2-decisions li[data-active=true]');assert.equal(active.length,1);assert.equal(+active[0].dataset.branch,s.branch);
   if(s.spilling){close(s.edge,s.H);assert.equal(s.branch,0);}else{close(s.volume,s.volume0);assert.equal(s.branch,s.cWet>=-1e-10?1:2);}
  }
  const s=r.mf1ProfessorState;close(s.volume*1000,6.479699781643263);close(s.c,-2.6819775739041796);close(s.dry,.18134980011017385);
 }
}));

test('Exact threshold buttons preserve the physical order of drying and spill, including their shared boundary',()=>fixture((a,r,set)=>{
 assert.equal(r.querySelector('#p2-w-slider').step,'any');
 const reference=[{h:.12,dry:10.849884792015073,spill:26.22055491403643},{h:.29,dry:16.866831356244717,spill:16.866831356244713},{h:.45,dry:16.866831356244717,spill:11.292918134831224}];
 for(const v of reference){
  set('h0-slider',v.h);let s=r.mf1ProfessorState;close(s.wDry,v.dry,1e-12);close(s.wSpill,v.spill,1e-12);
  assert.equal(r.querySelector('#p2-preset-spill').hidden,v.h===.29);
  r.querySelector('#p2-preset-dry').click();s=r.mf1ProfessorState;close(s.w,v.dry,1e-13);close(s.c,0,1e-12);assert.equal(s.physicalRegime,'granica prvog sušenja');
  assert.equal(r.querySelector('#p2-res-rdry').textContent,'0 m');assert.equal(r.querySelector('#p2-res-hc').textContent,'0 m');
  set('w-slider',v.dry-.001);assert.ok(r.mf1ProfessorState.center>0);set('w-slider',v.dry+.001);assert.ok(r.mf1ProfessorState.dry>0);
  r.querySelector('#p2-preset-spill').click();s=r.mf1ProfessorState;close(s.w,v.spill,1e-13);close(s.edge,s.H);close(s.spilled,0,1e-12);
  set('w-slider',v.spill-.001);close(r.mf1ProfessorState.spilled,0,1e-12);set('w-slider',v.spill+.001);assert.ok(r.mf1ProfessorState.spilled>0);
 }
}));

test('Vector tank has isotropic geometry, no free interface across the dry floor, and a fixed litre scale',()=>fixture((a,r,set)=>{
 const svg=r.querySelector('#p2-ring-canvas');assert.equal(svg.localName,'svg');assert.equal(svg.dataset.mf1Vector,'true');assert.equal(r.querySelectorAll('canvas,image,foreignObject').length,0);assert.equal(r.querySelectorAll('input[type=range]').length,2);
 for(const compact of [false,true]){
  Object.defineProperty(r,'clientWidth',{configurable:true,value:compact?340:920});a.w.dispatchEvent(new a.w.Event('resize'));
  let remainingWidth;
  for(const h0 of [.12,.29,.45])for(const w of [0,10,40]){
   set('h0-slider',h0);set('w-slider',w);const s=r.mf1ProfessorState,body=numbers(svg.querySelector('[data-p2-container]'));
   close((s.rightX-s.leftX)/(2*s.R),(s.baseY-s.rimY)/s.H);close(body[1],s.rimY);close(body[7],s.rimY);
   const curves=[...svg.querySelectorAll('[data-p2-free]')];assert.equal(curves.length,s.drawDry>0?2:1);
   for(const p of curves){const xy=numbers(p);for(let i=0;i<xy.length;i+=2){const x=(xy[i]-s.centerX)/s.scale,z=(s.baseY-xy[i+1])/s.scale;assert.ok(Math.abs(x)>=s.drawDry-1e-9);close(z,Math.max(0,s.drawC+s.k*x*x));}}
   assert.equal(svg.querySelectorAll('[data-p2-dry-floor]').length,s.drawDry>0?1:0);
   const bar=svg.querySelector('[data-p2-volume=remaining]');close(+bar.getAttribute('width'),s.volume*1000/s.volumeAxisMax*s.volumeBarWidth);assert.equal(s.volumeAxisMax,60);
   if(w===40){if(remainingWidth!==undefined)close(+bar.getAttribute('width'),remainingWidth);remainingWidth=+bar.getAttribute('width');}
  }
  if(compact){assert.equal(svg.width,360);assert.ok([...svg.querySelectorAll('text')].every(e=>+e.getAttribute('font-size')>=15));}
 }
}));
