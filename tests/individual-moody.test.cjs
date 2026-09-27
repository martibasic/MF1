const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),{load}=require('./widget-harness.cjs');
const near=(a,b,t=1e-10)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),a+' != '+b);
function run(fn){const a=load(13);try{const r=a.w.document.getElementById('v13-moody-widget'),re=r.querySelector('#v13-re-slider'),kd=r.querySelector('#v13-kd-slider'),set=(Re,rough)=>{a.change(re,Math.log10(Re));a.change(kd,Math.log10(rough));};fn(a,r,set);a.scan('Moody');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
const H=(re,kd)=>1/(-1.8*Math.log10((Math.max(kd,1e-12)/3.7)**1.11+6.9/re))**2;
test('Reviewed Moody is a single native SVG with its full original decision tree, controls and ten curves',()=>run((a,r)=>{
 const svg=r.querySelector('#v13-moody-canvas');assert.equal(svg.localName,'svg');assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelector('canvas,image,foreignObject'),null);assert.equal(r.querySelectorAll('input[type=range]').length,2);assert.equal(r.querySelector('#v13-re-slider').step,'any');
 assert.equal(r.querySelectorAll('.m13-branch').length,3);assert.equal(r.querySelectorAll('.m13-sub').length,3);assert.equal(r.querySelector('.m13-tree').closest('details'),null);assert.equal(r.querySelector('#v13-profile-panel'),null);
 assert.deepEqual(Array.from(r.mf1MoodyState.curves),[0,5e-5,1e-4,5e-4,1e-3,3e-3,5e-3,1e-2,2e-2,5e-2]);
 for(const color of ['#0369a1','#1d4ed8','#4338ca','#6d28d9','#a21caf','#be185d','#b91c1c','#c2410c','#b45309','#4d7c0f'])assert.ok(svg.querySelector('path[stroke="'+color+'"]'),'curve '+color);
 const xml=new a.w.XMLSerializer().serializeToString(svg);assert.doesNotMatch(xml,/<(?:image|foreignObject|canvas)\b|data:image|NaN|Infinity/);assert.ok(svg.querySelector('radialGradient'));
}));
test('Haaland default, laminar law and illustrative transition preserve the original numerical model',()=>run((a,r,set)=>{
 let s=r.mf1MoodyState;near(s.lam,.0219662140140766);near(s.kplus,5.240015984479);
 for(const Re of [1000,2000,2320,3000,3999,4000,1e5,1e8])for(const kd of [1e-6,.001,.05]){
  set(Re,kd);s=r.mf1MoodyState;const expected=Re<2320?64/Re:Re<4000?(64/2320)*(1-(Re-2320)/1680)+H(4000,kd)*(Re-2320)/1680:H(Re,kd);near(s.lam,expected);
  near(s.kplus,kd*Re*Math.sqrt(s.lam/8));assert.equal(s.regime,Re<2320?'lam':Re<4000?'trans':'turb');
 }
}));
test('Exact Reynolds boundaries select the original regimes and display matching visible inequalities',()=>run((a,r,set)=>{
 for(const [Re,branch]of [[2320*(1-1e-8),'lam'],[2320,'trans'],[2320*(1+1e-8),'trans'],[4000*(1-1e-8),'trans'],[4000,'turb'],[4000*(1+1e-8),'turb']]){
  set(Re,.001);const active=r.querySelectorAll('.m13-branch.m13-on');assert.equal(active.length,1);assert.equal(active[0].id,'m13-b-'+branch);
 }
 assert.match(r.querySelector('#m13-b-trans .m13-bcond').textContent,/2 320 ≤ Re < 4 000/);assert.match(r.querySelector('#m13-b-turb .m13-bcond').textContent,/Re ≥ 4 000/);
}));
test('Roughness subbranches use k-plus thresholds, including the existing inclusive middle regime',()=>run((a,r,set)=>{
 const kd5=.000957438687257778,kd70=.010073466292582853;
 for(const[kd,branch]of [[kd5*(1-1e-8),'smooth'],[kd5*(1+1e-8),'cb'],[kd70*(1-1e-8),'cb'],[kd70*(1+1e-8),'rough']]){
  set(1e5,kd);const s=r.mf1MoodyState,active=r.querySelectorAll('.m13-sub.m13-on');assert.equal(active.length,1);assert.equal(active[0].id,'m13-b-'+branch);assert.equal(s.sub,branch);
 }
 assert.match(r.querySelector('#m13-b-smooth .m13-scond').textContent,/k⁺ < 5/);assert.match(r.querySelector('#m13-b-cb .m13-scond').textContent,/5 ≤ k⁺ ≤ 70/);assert.match(r.querySelector('#m13-b-rough .m13-scond').textContent,/k⁺ > 70/);
}));
test('Transition values explicitly indicate interpolation rather than a precise physical prediction',()=>run((a,r,set)=>{
 set(3000,.001);assert.equal(r.querySelector('#v13-lambda-sign').textContent,'λ ≈');assert.match(r.querySelector('#v13-explainer-box').textContent,/ilustrativna linearna interpolacija/);assert.match(r.querySelector('svg').textContent,/λ ≈/);
 set(4000,.001);assert.equal(r.querySelector('#v13-lambda-sign').textContent,'λ =');
}));
test('Every permitted operating point and the smooth endpoint fit the extended lambda axis',()=>run((a,r,set)=>{
 for(const Re of [1e3,2320,4000,1e5,1e8])for(const kd of [1e-6,.001,10**-1.3]){
  set(Re,kd);const s=r.mf1MoodyState,p=s.geometry;assert.ok(p.x>=p.left-1e-8&&p.x<=p.right+1e-8);assert.ok(p.y>=p.top&&p.y<=p.bottom);near(p.x,p.left+(Math.log10(s.re)-3)/5*(p.right-p.left));near(p.y,p.top+Math.log(p.lambdaMax/s.lam)/Math.log(p.lambdaMax/p.lambdaMin)*(p.bottom-p.top));
 }
 set(1e8,1e-6);near(r.mf1MoodyState.lam,.006445137792277497);assert.ok(H(1e8,1e-12)>.0055);
}));
test('Haaland attribution, Darcy convention and rough-pipe asymptote are explicit without changing the tree equations',()=>run((a,r,set)=>{
 set(1e5,.001);assert.match(r.querySelector('#v13-explainer-box').textContent,/Haaland/);assert.doesNotMatch(r.querySelector('#v13-explainer-box').textContent,/Swamee/);assert.match(r.querySelector('#v13-explainer-box').textContent,/Darcyjev, ne Fanningov/);assert.match(r.querySelector('#v13-explainer-box').textContent,/k⁺ =/);
 set(1e8,.01);assert.match(r.querySelector('#v13-explainer-box').textContent,/Asimptota/);assert.match(r.querySelector('#v13-explainer-box').textContent,/konačnom Re/);assert.match(r.querySelector('#m13-b-rough .m13-sf').textContent,/1\/√λ = −2·log\(k\/D \/ 3.71\)/);
}));
