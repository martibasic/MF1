const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {load}=require('./widget-harness.cjs'),near=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),a+' != '+b);
function run(fn){const a=load(8);try{const id=s=>a.w.document.getElementById(s),r=id('v8-z74');fn(a,r,id);a.scan('distributed suction');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function set(a,id,p){for(const [k,v]of Object.entries(p))a.change(id('z74-'+k),v);}
const criticalParameters={v1:10,np:1600,dp:.012,l:8,d1:.9,df:2.4};

test('Distributed suction keeps seven controls, three primary results and one vector scene',()=>run((a,r,id)=>{
 assert.equal(id('v8-z74-scene').localName,'svg');assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelector('canvas,image,foreignObject'),null);assert.equal(r.querySelectorAll('input').length,7);assert.equal(r.querySelectorAll('.v8-results strong').length,3);
 assert.equal(id('z74-vp').step,'any');for(const k of ['v1','vp','np','dp','l','d1','df'])assert.ok(id('z74-'+k).labels.length);assert.match(id('z74-np').labels[0].textContent,/Plošna gustoća/);assert.match(id('z74-np-o').textContent,/m⁻²/);
}));

test('The original parameters reproduce independent hole-area, wall-area and volume-flow balances',()=>run((a,r,id)=>{
 const m=r.mf1Physics;near(m.a1,.6361725123519332);near(m.phi,.03078760800518);near(m.N,9047.7868423386);near(m.q1,29.2639355681889);near(m.extractionPerLength,.870499108176);near(m.qs,3.481996432704);near(m.q2,25.7819391354849);near(m.v2,40.5266474657);near(m.vf,5.69905979987);near(m.criticalLength,33.6174216531);near(m.criticalSpeed,84.0435541327);assert.equal(id('z74-critical-preset').disabled,true);
 for(const p of [{v1:10,np:1600,dp:.012,l:8,d1:1.4,vp:20},{v1:70,np:25,dp:.002,l:1,d1:.5,vp:.25},{v1:46,np:800,dp:.007,l:4,d1:.9,vp:10}]){
  set(a,id,p);const m=r.mf1Physics,oneHole=Math.PI*(m.dp/2)**2,wall=Math.PI*m.d1*m.L,holes=m.np*wall,Qs=holes*oneHole*m.vp,Q1=Math.PI*(m.d1/2)**2*m.v1;
  near(m.N,holes);near(m.qs,Qs);near(m.q1,Q1);near(m.q2,Q1-Qs);near(m.phi,oneHole*m.np);near(m.surfaceSpeed,m.phi*m.vp);near(m.share,Qs/Q1);near(m.extractionPerLength,Qs/m.L);
 }
}));

test('Local Q integrates uniform wall extraction and its gradient is independent of downstream area',()=>run((a,r,id)=>{
 for(const p of [{vp:0},{vp:10},{...criticalParameters,vp:20}]){
  set(a,id,p);const m=r.mf1Physics,n=10000,dx=m.L/n;let removed=0;for(let i=0;i<n;i++)removed+=m.phi*m.vp*Math.PI*m.d1*dx;
  near(removed,m.qs);near(m.localQ[0],m.q1);near(m.localQ[1],m.q1-removed/2);near(m.localQ[2],m.q1-removed);
  const x=.37*m.L,h=1e-4,forward=m.q1-m.extractionPerLength*(x+h),back=m.q1-m.extractionPerLength*(x-h);near((forward-back)/(2*h),-m.extractionPerLength,1e-8);
  if(m.valid){near(m.q1-m.qs-m.a1*m.v2,0);near(m.af*m.vf,m.q2);}else assert.ok(m.criticalLength<m.L);
 }
}));

test('The four causal branches are exclusive, including the exact critical preset and both sides of it',()=>run((a,r,id)=>{
 const branch=()=>{const nodes=r.querySelectorAll('.mf1-decision li[data-active=true]');assert.equal(nodes.length,1);assert.equal(r.querySelectorAll('.mf1-decision li').length,4);return +nodes[0].dataset.branch;};
 set(a,id,{vp:0});assert.equal(branch(),0);set(a,id,{vp:10});assert.equal(branch(),1);set(a,id,criticalParameters);assert.equal(id('z74-critical-preset').disabled,false);
 id('z74-critical-preset').click();let m=r.mf1Physics;assert.equal(branch(),2);assert.equal(m.q2,0);assert.equal(m.v2,0);assert.equal(m.vf,0);near(m.criticalLength,m.L);near(+id('z74-vp').value,m.criticalSpeed);
 const critical=m.criticalSpeed;set(a,id,{vp:critical*(1-1e-8)});assert.equal(branch(),1);set(a,id,{vp:critical*(1+1e-8)});assert.equal(branch(),3);assert.equal(r.mf1Physics.valid,false);assert.equal(r.mf1Physics.v2,null);assert.equal(r.mf1Physics.vf,null);assert.ok(r.mf1Physics.formalV2<0);assert.match(id('z74-locator').textContent,/dotok s desne strane/);
}));

test('np=0 removes holes, whereas vp=0 leaves perforations but both give constant Q and v2=v1',()=>run((a,r,id)=>{
 set(a,id,{...criticalParameters,vp:20,np:0});let m=r.mf1Physics;assert.equal(m.N,0);assert.equal(m.phi,0);assert.equal(r.querySelectorAll('[data-hole]').length,0);assert.equal(r.querySelectorAll('[data-suction-vector=distributed]').length,0);assert.equal(m.v2,m.v1);assert.equal(m.criticalLength,null);assert.equal(m.criticalSpeed,null);assert.equal(id('z74-critical-preset').disabled,true);
 set(a,id,{np:800,vp:0});m=r.mf1Physics;assert.ok(r.querySelectorAll('[data-hole]').length>0);assert.equal(r.querySelectorAll('[data-suction-vector=distributed]').length,0);assert.equal(m.qs,0);assert.equal(m.v2,m.v1);near(m.localQ[0],m.localQ[2]);assert.equal(m.criticalLength,null);
}));

test('Changing Df preserves Q(x), suction and v2; vf changes only through its actual outlet area',()=>run((a,r,id)=>{
 const states=[];for(const df of [1.2,2.4,3.2]){set(a,id,{df});const m=r.mf1Physics;states.push(m);near(2*m.geometry.halfF/m.geometry.diameterScale,df);near(m.vf*m.af,m.q2);}
 for(const m of states){near(m.q1,states[0].q1);near(m.qs,states[0].qs);near(m.q2,states[0].q2);near(m.v2,states[0].v2);near(m.extractionPerLength,states[0].extractionPerLength);near(m.vf/states[0].vf,(states[0].df/m.df)**2);}
 set(a,id,{d1:1.4,df:1.2});assert.ok(r.mf1Physics.geometry.halfF<r.mf1Physics.geometry.half);
}));

test('Profile coordinates, zero crossing and invalid region align with the physical pipe section',()=>run((a,r,id)=>{
 for(const p of [{vp:10},{...criticalParameters,vp:20}]){
  set(a,id,p);const m=r.mf1Physics,q=m.geometry,first=r.querySelector('[data-profile-inlet]'),last=r.querySelector('[data-profile-outlet]');
  near((q.xEnd-q.x0)/q.xScale,m.L);near(+first.getAttribute('cx'),q.x0);near(+last.getAttribute('cx'),q.xEnd);near((q.zeroY-+first.getAttribute('cy'))/q.profileScale,m.q1);near((q.zeroY-+last.getAttribute('cy'))/q.profileScale,m.q2);near(2*q.half/q.diameterScale,m.d1);near(2*q.halfF/q.diameterScale,m.df);
  if(!m.valid){near(m.q1-m.extractionPerLength*m.criticalLength,0);near((q.criticalX-q.x0)/q.xScale,m.criticalLength);for(const key of ['data-invalid-pipe','data-invalid-profile']){const rect=r.querySelector('['+key+']');near(+rect.getAttribute('x'),q.criticalX);near(+rect.getAttribute('width'),q.xEnd-q.criticalX);}assert.ok(r.querySelector('[data-formal-profile]'));}
 }
}));

test('Axial Q arrows and distributed q-prime arrows each keep their own published fixed scale',()=>run((a,r,id)=>{
 const scales=[];for(const p of [{vp:0},{vp:10},{...criticalParameters,vp:20},{v1:70,d1:1.4,l:1,vp:20}]){
  set(a,id,p);const m=r.mf1Physics,q=m.geometry;scales.push([q.qScale,q.suctionScale].join('|'));
  for(const [key,Q]of [['inlet',m.q1],['outlet',m.q2]]){const v=r.querySelector('[data-suction-vector='+key+']').dataset;near(+v.dx,Q*q.qScale);near(+v.dy,0);}
  const inlet=r.querySelector('[data-suction-vector=inlet]').dataset;near(+inlet.x + +inlet.dx,q.x0);
  for(const v of r.querySelectorAll('[data-suction-vector=distributed]'))near(+v.dataset.dy,+v.dataset.side*m.extractionPerLength*q.suctionScale);
  near(+r.querySelector('[data-suction-vector=flow-ruler]').dataset.dx,100*q.qScale);near(+r.querySelector('[data-suction-vector=suction-ruler]').dataset.dy,-5*q.suctionScale);
 }assert.equal(new Set(scales).size,1);
}));

test('The updater is local, subscripts survive input, and native mobile geometry retains finite legible vectors',()=>run((a,r,id)=>{
 const source=fs.readFileSync('vjezba_08.qmd','utf8');assert.ok(!source.includes('function z74()'));assert.ok(!source.includes('function sourcePreset('));assert.ok(!source.includes("text.textContent = text.textContent.replace"));
 const svg=id('v8-z74-scene');for(const width of [300,390,900]){svg.getBoundingClientRect=()=>({width,height:400,left:0,top:0});a.w.dispatchEvent(new a.w.Event('resize'));set(a,id,{l:8,df:3.2});assert.equal(svg.getAttribute('viewBox').split(' ').map(Number)[2],width);assert.ok(svg.querySelectorAll('tspan').length>0);for(const label of svg.querySelectorAll('text'))assert.ok(parseFloat(a.w.getComputedStyle(label).fontSize)>=16);}
 id('z74-original').click();near(r.mf1Physics.v1,46);near(r.mf1Physics.q2,25.7819391354849);assert.equal(id('z74-critical-preset').disabled,true);
}));
test('The quantitative profile keeps its positive range for vp changes and expands only to expose formal negative flow',()=>run((a,r,id)=>{
 const axes=[];for(const vp of [0,10,20]){set(a,id,{vp});const q=r.mf1Physics.geometry;axes.push([q.plotMin,q.plotMax,q.profileScale].join('|'));assert.equal(q.plotMin,0);assert.ok(q.plotMax>=r.mf1Physics.q1);for(const e of r.querySelectorAll('[data-profile-tick]'))near((q.zeroY-Number(e.getAttribute('y'))+5)/q.profileScale,Number(e.dataset.profileTick));}assert.equal(new Set(axes).size,1);
 const q=r.mf1Physics.geometry;assert.ok((r.mf1Physics.q1-r.mf1Physics.q2)*q.profileScale>10);
 set(a,id,{...criticalParameters,vp:20});const m=r.mf1Physics;assert.ok(m.geometry.plotMin<=m.q2);assert.ok(m.geometry.plotMin<0);assert.ok(m.geometry.plotMax>=m.q1);
}));