const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-9*Math.max(1,Math.abs(b)),`${a} != ${b}`);
test('V1 load: each responsive layout has readable native text, invariant force and velocity scales and quantitative geometry',()=>{
 const a=load(1);try{const r=a.w.document.getElementById('v1-load-lab');for(const width of [340,900]){Object.defineProperty(r,'clientWidth',{configurable:true,value:width});a.w.dispatchEvent(new a.w.Event('resize'));
  r.querySelector('[data-mode=pressure]').click();let scale;for(const ratio of [1,4,8])for(const force of [0,240]){a.change(r.querySelector('#v1x-ratio'),ratio);a.change(r.querySelector('#v1x-force'),force);const m=r.mf1ProfessorState,g=m.geometry;near(g.w2/g.w1,Math.sqrt(ratio));near(m.F1*m.s1,m.F2*m.s2);if(scale!==undefined)assert.equal(g.forceScale,scale);scale=g.forceScale;for(const n of [1,2]){const vector=r.querySelector('[data-load-vector=F'+n+']');near(+vector.dataset.dy,(n===1?m.F1:-m.F2)*g.forceScale);}}
  r.querySelector('[data-mode=compression]').click();for(const dp of [0,20])for(const K of [50,2000]){a.change(r.querySelector('#v1x-dp'),dp);a.change(r.querySelector('#v1x-K'),K);const m=r.mf1ProfessorState,g=m.geometry;near((g.base-g.top)/g.h0,m.V2/m.V1);near(m.densityRatio*m.V2,m.V1);assert.equal(g.pressureScale,4);}
  r.querySelector('[data-mode=viscosity]').click();let vScale;for(const U of [-2.4,0,2.4]){a.change(r.querySelector('#v1x-U'),U);const m=r.mf1ProfessorState,g=m.geometry;if(vScale!==undefined)assert.equal(g.velocityScale,vScale);vScale=g.velocityScale;near(g.probeX,g.x0+m.U/2*g.velocityScale);near(g.probeY,(g.top+g.bottom)/2);near(+r.querySelector('[data-load-vector=plate-U]').dataset.dx,m.U*g.velocityScale);}
  assert.equal(r.querySelectorAll('svg').length,1);for(const t of r.querySelectorAll('svg text'))assert.ok(+t.getAttribute('font-size')>=20);
 }a.scan('responsive load');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}
});
