const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const near=(a,b,tol=1e-9)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} ≈ ${b}`);
const nums=p=>p.getAttribute('d').match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi).map(Number);
const arrow=(s,id)=>{const v=nums(s.querySelector('#'+id+' path'));return {x:v[0],y:v[1],dx:v[2]-v[0],dy:v[3]-v[1]};};
function run(fn){const a=load(8),r=a.w.document.getElementById('v8-z71'),s=r.querySelector('#v8-z71-scene');try{fn(a,r,s);a.scan('individual mixture');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function set(a,r,qa,qb,dc=.3,rb=800){for(const [id,v]of [['qa',qa],['qb',qb],['dc',dc],['rb',rb]])a.change(r.querySelector('#z71-'+id),v);return r.mf1Physics;}

test('Independent component balances and specific-volume mixing agree throughout the allowed parameter range',()=>run((a,r,s)=>{
 for(const qa of [.05,.15,.3])for(const qb of [.01,.05,.12])for(const dc of [.15,.5])for(const rb of [600,950]){
  const m=set(a,r,qa,qb,dc,rb),flux=m.rc*Math.PI*dc*dc/4*m.vc;
  near((1-m.wb)*flux,1000*qa);near(m.wb*flux,rb*qb);near(1/m.rc,(1-m.wb)/1000+m.wb/rb);
  near(m.betaB,qb/(qa+qb));near(m.rc,(1-m.betaB)*1000+m.betaB*rb);near(m.massResidual,0);near(m.volumeResidual,0);
  assert.ok(m.rc>rb&&m.rc<1000);assert.ok(m.wb<m.betaB);near(m.mc,flux);
 }
}));

test('Calibration separates oil volume majority from oil mass minority and preserves original task values',()=>run((a,r,s)=>{
 let m=set(a,r,.1,.12,.3,600);near(m.betaB,6/11);near(m.wb,18/43);near(m.rc,8600/11);near(m.qc,.22);assert.ok(m.betaB>.5&&m.wb<.5);
 assert.match(r.querySelector('#z71-locator').textContent,/Ulje je većina po volumenu, ali voda ostaje većina po masi/);
 r.querySelector('#z71-original').click();m=r.mf1Physics;near(m.qa,.15);near(m.qb,.03);near(m.dc,.3);near(m.rb,800);near(m.rc,966.6666666666667);near(m.mc,174);near(m.vc,2.546479089470325);near(m.betaB,1/6);near(m.wb,4/29);
 assert.match(r.querySelector('#z71-volume-share').textContent,/16,67/);assert.match(r.querySelector('#z71-mass-share').textContent,/13,79/);
}));

test('Doubling both flows doubles all flow arrows and velocity while composition and density remain invariant',()=>run((a,r,s)=>{
 const one=set(a,r,.1,.05,.2,800),v1=['a','b','c'].map(k=>arrow(s,'z71-flow-'+k)),two=set(a,r,.2,.1,.2,800),v2=['a','b','c'].map(k=>arrow(s,'z71-flow-'+k));
 near(two.qc,2*one.qc);near(two.mc,2*one.mc);near(two.vc,2*one.vc);near(two.rc,one.rc);near(two.wb,one.wb);near(two.betaB,one.betaB);assert.deepEqual(two.mixRGB,one.mixRGB);
 for(let i=0;i<3;i++){near(v2[i].dy,2*v1[i].dy);near(v2[i].dx,0);near(v2[i].x,v1[i].x);near(v2[i].y,v1[i].y);}
}));

test('Doubling the actual outlet diameter quarters velocity without altering flow, mass or mixture composition',()=>run((a,r,s)=>{
 const one=set(a,r,.1,.05,.2,800),w1=+s.querySelector('#z71-outlet').getAttribute('width'),f1=arrow(s,'z71-flow-c'),two=set(a,r,.1,.05,.4,800),w2=+s.querySelector('#z71-outlet').getAttribute('width'),f2=arrow(s,'z71-flow-c');
 near(w2,2*w1);near(two.vc,one.vc/4);near(two.ac,4*one.ac);for(const key of ['qc','mc','rc','betaB','wb'])near(two[key],one[key]);near(f2.dy,f1.dy);
 const d=s.querySelector('#z71-diameter');near(+d.getAttribute('x2')- +d.getAttribute('x1'),w2);assert.ok(+d.getAttribute('y1')>two.geometry.pipeBottom,'dimension must not look like a plug across the pipe');
 const previous=two;const next=set(a,r,.1,.05,.4,600);near(next.vc,previous.vc);near(next.qc,previous.qc);assert.ok(next.rc<previous.rc&&next.mc<previous.mc&&next.wb<previous.wb);
}));

test('Flux arrows cross their actual control-surface ports at one fixed published scale and oil colors use the actual two fluid endpoints',()=>run((a,r,s)=>{
 for(const width of [300,700])for(const [qa,qb,dc,rb]of [[.05,.01,.15,600],[.15,.03,.3,800],[.3,.12,.5,950]]){
  s.getBoundingClientRect=()=>({left:0,top:0,width,height:640});const m=set(a,r,qa,qb,dc,rb),g=m.geometry,ref=arrow(s,'z71-flow-scale'),k=ref.dx/.1;near(k,250);
  for(const [id,Q,x,y]of [['a',qa,g.aX,g.cvTop],['b',qb,g.bX,g.cvTop],['c',qa+qb,g.cx,g.cvBottom]]){
   const v=arrow(s,'z71-flow-'+id);near(v.x,x);near(v.y,y);near(v.dx,0);near(v.dy,k*Q);assert.ok(v.dy>0);
  }
  const cv=s.querySelector('#z71-control-volume');near(+cv.getAttribute('y'),g.cvTop);near(+cv.getAttribute('height'),g.cvBottom-g.cvTop);near(+s.querySelector('#z71-outlet').getAttribute('width'),dc*120);
  const rgb=id=>s.querySelector('#'+id).getAttribute('fill').match(/\d+/g).map(Number),aRGB=rgb('z71-inlet-a'),bRGB=rgb('z71-inlet-b'),mix=rgb('z71-mixture');
  assert.deepEqual(aRGB,[2,132,199]);assert.deepEqual(bRGB,[217,119,6]);mix.forEach((v,i)=>assert.ok(Math.abs(v-((1-m.wb)*aRGB[i]+m.wb*bRGB[i]))<=.5));assert.deepEqual(rgb('z71-outlet'),mix);
  near(+s.querySelector('#z71-mixture').getAttribute('height'),g.bottom-g.top);assert.equal(s.querySelectorAll('#z71-mixture').length,1);
 }
}));

test('One update owns each input event; three mutually exclusive physical branches and one original preset remain',()=>run((a,r,s)=>{
 for(const [qa,qb,branch]of [[.15,.03,0],[.05,.05,1],[.05,.12,2]]){
  set(a,r,qa,qb);const active=r.querySelectorAll('#z71-locator [data-active=true]');assert.equal(active.length,1);assert.equal(+active[0].dataset.branch,branch);
 }
 const original=a.w.MF1.decision;let calls=0;a.w.MF1.decision=(el,...args)=>{if(el.id==='z71-locator')calls++;return original(el,...args);};
 const e=r.querySelector('#z71-qa');e.value=.1;e.dispatchEvent(new a.w.Event('input',{bubbles:true}));assert.equal(calls,1);
 assert.equal(r.querySelectorAll('.v8-source-preset button').length,1);assert.equal(r.querySelectorAll('input[type=range]').length,4);assert.equal(r.querySelectorAll('.v8-results > div').length,3);assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelectorAll('canvas,image,img,foreignObject').length,0);
 for(const t of s.querySelectorAll('text'))assert.ok(+t.closest('[font-size]').getAttribute('font-size')>=17);
 assert.match(r.querySelector('.z71-caption').textContent,/širine ulaza A\/B i komora su shematske/);assert.match(r.querySelector('#z71-note').textContent,/aditivni volumeni/);
}));
