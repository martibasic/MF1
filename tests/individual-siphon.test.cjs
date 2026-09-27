const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs'),near=(a,b,t=1e-10)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),a+' != '+b);
function run(fn){const a=load(9);try{const r=a.w.document.getElementById('v9-siphon'),id=k=>r.querySelector('#s-'+k),set=p=>{for(const[k,v]of Object.entries(p))a.change(id(k),v);},mode=m=>r.querySelector('[data-s-mode="'+m+'"]').click();fn(a,r,id,set,mode);a.scan('siphon');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
test('Siphon has one vector scene, five original controls and three readings',()=>run((a,r,id)=>{
 assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelector('canvas,image,foreignObject'),null);assert.equal(r.querySelectorAll('input').length,5);assert.equal(r.querySelectorAll('.v9-results strong').length,3);assert.equal(id('plot'),null);assert.equal(id('loc'),null);
 assert.equal(id('crest').step,'any');for(const k of ['crest','drop','l1','l2','d'])assert.ok(id(k).labels.length);
 assert.equal(id('l1').disabled,true);assert.equal(id('l1-control').hidden,true);assert.equal(id('critical').disabled,true);
 assert.ok(id('scene').querySelector('tspan'));assert.doesNotMatch(id('scene').textContent,/_/);
}));
test('All three prepared fluids reproduce independent mass, head and crest-pressure balances',()=>run((a,r,id,set,mode)=>{
 for(const [m,expected]of [['ideal',[7.6720271115,.034803842513,52373.1]],['fixed',[4.6456431202,.009121698936,64395.68664]],['k',[3.1320919527,.014208609207,76653.2424]]]){
  mode(m);const s=r.mf1SiphonState;near(s.v,expected[0],1e-10);near(s.Q,expected[1],1e-10);near(s.pabs,expected[2]);near(s.Q,Math.PI*(s.d/2)**2*s.v);near(s.drop,s.v*s.v/(2*9.81)+s.hl);near(s.pabs+s.rho*9.81*(s.crest+s.v*s.v/(2*9.81)+s.hl1),101325);
  assert.equal(s.pv,m==='ideal'?2339:null);assert.equal(id('l1').disabled,m==='ideal');assert.equal(id('l1-control').hidden,m==='ideal');
 }
}));
test('Crest and diameter affect only their independent pressure and volume-flow terms',()=>run((a,r,id,set,mode)=>{
 for(const m of ['ideal','fixed','k']){mode(m);set({crest:1,d:.04});const p=r.mf1SiphonState;set({crest:5,d:.08});const q=r.mf1SiphonState;near(p.v,q.v);near(q.Q,4*p.Q);near(p.pabs-q.pabs,4*p.rho*9.81);near(q.geometry.diameter,2*p.geometry.diameter);}
}));
test('Fixed-loss causality: upstream loss cancels in crest pressure; redistribution keeps flow',()=>run((a,r,id,set,mode)=>{
 mode('fixed');set({drop:7,l1:1,l2:2});const p=r.mf1SiphonState;set({l1:2});const q=r.mf1SiphonState;assert.ok(q.v<p.v);near(q.pabs,p.pabs);
 set({l2:1});const t=r.mf1SiphonState;near(t.Q,p.Q);near(p.pabs-t.pabs,p.rho*9.81);
}));
test('K-loss redistribution preserves total head loss and flow while lowering crest pressure',()=>run((a,r,id,set,mode)=>{
 mode('k');set({l1:1,l2:4});const p=r.mf1SiphonState;set({l1:2,l2:3});const q=r.mf1SiphonState;near(p.Q,q.Q);near(p.hl,q.hl);near(p.pabs-q.pabs,p.rho*9.81*p.vh);
}));
test('Five visible branches are exclusive and the water threshold is exactly attainable',()=>run((a,r,id,set,mode)=>{
 const branch=()=>{const n=r.querySelectorAll('.mf1-decision li[data-active=true]');assert.equal(n.length,1);assert.equal(r.querySelectorAll('.mf1-decision li').length,5);return +n[0].dataset.branch;};
 assert.equal(branch(),2);set({drop:8});near(r.mf1SiphonState.criticalCrest,2.110537078233939);assert.equal(id('critical').disabled,false);id('critical').click();assert.equal(branch(),1);assert.equal(r.mf1SiphonState.pabs,2339);assert.equal(r.querySelector('[data-velocity-arrow]'),null);
 const h=r.mf1SiphonState.crest;set({crest:h-1e-7});assert.equal(branch(),2);set({crest:h+1e-7});assert.equal(branch(),1);
 mode('fixed');assert.equal(branch(),3);assert.equal(id('critical').disabled,true);set({drop:8,crest:6,l1:0,l2:0});assert.equal(branch(),4);assert.ok(r.mf1SiphonState.pabs<0);
 set({drop:1,l1:.5,l2:.5});assert.equal(branch(),0);assert.equal(r.mf1SiphonState.vh,0);assert.equal(r.mf1SiphonState.valid,false);assert.equal(r.querySelector('[data-velocity-arrow]'),null);assert.match(id('main').textContent,/nema/);
 set({l1:5,l2:5});assert.equal(branch(),0);
}));
test('Native heights keep one metre scale; the inlet is submerged and pipe width follows actual diameter',()=>run((a,r,id,set)=>{
 const states=[];for(const p of [{crest:.5,drop:.5,d:.04},{crest:6,drop:8,d:.1}]){set(p);const s=r.mf1SiphonState,z=s.geometry;states.push(z);near(z.surfaceY-z.crestY,18*s.crest);near(z.outletY-z.surfaceY,18*s.drop);near(z.inletY-z.surfaceY,18*.75);assert.ok(z.inletX>z.tankLeft&&z.inletX<z.tankRight);assert.ok(z.inletY<z.tankBottom);near(z.diameter/8/18,s.d);near(+r.querySelector('[data-section="2"]').getAttribute('cy'),z.crestY);near(+r.querySelector('[data-section="3"]').getAttribute('cy'),z.outletY);}
 assert.equal(states[0].surfaceY,states[1].surfaceY);assert.equal(states[0].heightScale,states[1].heightScale);
}));
test('Positive flow arrows use a published fixed velocity scale and disappear for formal invalid states',()=>run((a,r,id,set,mode)=>{
 for(const drop of [.5,3,8]){set({drop,crest:.5});const s=r.mf1SiphonState,n=r.querySelector('[data-velocity-arrow]');assert.ok(n);near(+n.dataset.scale,s.geometry.velocityScale);near(+n.dataset.speed,s.v);assert.equal(s.geometry.velocityScale,3);}
 set({crest:6});assert.equal(r.mf1SiphonState.cav,true);assert.equal(r.querySelector('[data-velocity-arrow]'),null);assert.match(id('v-label').textContent,/Formalna/);
 mode('k');assert.equal(r.mf1SiphonState.pv,null);assert.match(id('note').textContent,/nije dokaz/);
}));
test('Mobile geometry is native and all model extremes remain finite without duplicating state owners',()=>run((a,r,id,set,mode)=>{
 id('scene').parentElement.getBoundingClientRect=()=>({width:300});const geometry=[];
 for(const m of ['ideal','fixed','k'])for(const crest of [.5,6])for(const drop of [.5,8])for(const loss of [0,5]){
  mode(m);set({crest,drop,l1:loss,l2:loss});const s=r.mf1SiphonState;geometry.push(s.geometry);assert.equal(s.geometry.width,300);assert.equal(s.geometry.velocityScale,2.5);assert.equal(id('scene').getAttribute('viewBox'),'0 0 300 414');a.scan('corner');assert.equal(r.querySelectorAll('.mf1-decision').length,1);
 }assert.ok(geometry.every(p=>p.heightScale===18));
}));
