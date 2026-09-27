const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const close=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} != ${b}`);
function experiment(run){const a=load(4);try{const id=s=>a.w.document.getElementById(s),r=id('v4-intro-principle-widget');run(a,r,id);a.scan('relative equilibrium');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function set(a,id,ax,az){a.change(id('v4-ax-slider'),ax);a.change(id('v4-az-slider'),az);}
const vector=element=>{const line=element.querySelector('line');return {x1:+line.getAttribute('x1'),y1:+line.getAttribute('y1'),x2:+line.getAttribute('x2'),y2:+line.getAttribute('y2'),dx:+line.getAttribute('x2')-+line.getAttribute('x1'),dy:+line.getAttribute('y2')-+line.getAttribute('y1')};};
const point=(m,x,y)=>({x:m.geometry.bounds.xmin+(x-m.geometry.left)/m.geometry.scale,z:m.geometry.bounds.zmax-(y-m.geometry.top)/m.geometry.scale});

test('Relative equilibrium has one vector scene, original parameter bounds and only three primary readings',()=>experiment((a,r,id)=>{
 assert.equal(id('v4-principle-canvas').localName,'svg');assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelectorAll('canvas').length,0);
 assert.equal(r.querySelector('image,foreignObject'),null);assert.equal(r.querySelectorAll('.v4r-reading').length,3);
 for(const [axis,min,max]of [['ax',-10,10],['az',-5,10]]){const input=id('v4-'+axis+'-slider');assert.ok(input.labels.length);assert.equal(Number(input.min),min);assert.equal(Number(input.max),max);}
 assert.equal(r.querySelectorAll('.mf1-decision li').length,3);assert.equal(r.querySelector('[data-local-window]').getAttribute('stroke-dasharray'),'5 5');
}));

test('Two independent integration paths give the same pressure, independent of lateral acceleration at fixed vertical depth',()=>experiment((a,r,id)=>{
 for(const az of [-5,0,10]){const pressures=[];
  for(const ax of [-10,0,10]){
   set(a,id,ax,az);const m=r.mf1ProfessorState,gv=9.81+az;let vertical=0,viaSide=0;const steps=1000;
   for(let i=0;i<steps;i++){vertical+=1000*gv*.5/steps;viaSide-=1000*ax*.3/steps;viaSide+=1000*gv*.5/steps;viaSide+=1000*ax*.3/steps;}
   close(m.pressure,vertical);close(m.pressure,viaSide);pressures.push(m.pressure);close(m.probe.x,0);close(m.probe.z,-.5);
   close(m.gradientX,-1000*ax);close(m.gradientZ,-1000*gv);close(m.effective[1],-gv);
  }pressures.forEach(p=>close(p,pressures[0]));
 }
}));

test('The displayed angle is signed consistently with an upward vertical coordinate',()=>experiment((a,r,id)=>{
 for(const [ax,az]of [[10,-5],[-10,-5],[0,0],[10,10]]){
  set(a,id,ax,az);const m=r.mf1ProfessorState;close(m.theta,-Math.atan2(ax,9.81+az));close(m.slope,Math.tan(m.theta));
  const display=Number(id('v4-angle-val').textContent.replace('−','-').replace(',','.'));close(Math.sign(display),Math.sign(-ax));assert.ok(Math.abs(display-m.theta*180/Math.PI)<.01);
  assert.equal(r.querySelectorAll('.mf1-decision li[data-active=true]').length,1);
 }
}));

test('The physical probe projection lies on the surface, is normal to it, and reproduces pressure from normal distance',()=>experiment((a,r,id)=>{
 for(const ax of [-10,-3,0,3,10])for(const az of [-5,0,10]){
  set(a,id,ax,az);const m=r.mf1ProfessorState,F=m.foot,P=m.probe,gv=9.81+az;
  close(ax*F.x+gv*F.z,0);const dx=P.x-F.x,dz=P.z-F.z;
  close(dx+dz*m.slope,0);close(Math.hypot(dx,dz),m.normalDistance);close(m.pressure,1000*Math.hypot(ax,gv)*m.normalDistance);
  assert.ok(dx*m.effective[0]+dz*m.effective[1]>0);
  const normal=vector(r.querySelector('[data-pressure-normal]')),start=point(m,normal.x1,normal.y1),end=point(m,normal.x2,normal.y2);
  close(start.x,F.x);close(start.z,F.z);close(end.x,0);close(end.z,-.5);
 }
}));

test('Surface and pressure contours are isotropic physical coordinates, not pixel-derived dimensions',()=>experiment((a,r,id)=>{
 for(const ax of [-10,0,10])for(const az of [-5,10]){
  set(a,id,ax,az);const m=r.mf1ProfessorState;
  for(const line of r.querySelectorAll('[data-relative-surface],[data-isobar]')){
   const A=point(m,+line.getAttribute('x1'),+line.getAttribute('y1')),B=point(m,+line.getAttribute('x2'),+line.getAttribute('y2')),expected=+(line.dataset.isobar||0);
   const pressure=p=>m.gradientX*p.x+m.gradientZ*p.z;
   close(pressure(A),expected,1e-8);close(pressure(B),expected,1e-8);
   close(m.effective[0]*(B.x-A.x)+m.effective[1]*(B.z-A.z),0);
  }
  const probe=r.querySelector('[data-relative-probe]'),P=point(m,+probe.getAttribute('cx'),+probe.getAttribute('cy'));close(P.x,0);close(P.z,-.5);
 }
}));

test('Every fluid polygon vertex lies in the positive-pressure half-plane within the same local window',()=>experiment((a,r,id)=>{
 for(const ax of [-10,0,10])for(const az of [-5,10]){
  set(a,id,ax,az);const m=r.mf1ProfessorState;
  const vertices=r.querySelector('[data-local-water]').getAttribute('points').split(' ').map(p=>p.split(',').map(Number));assert.ok(vertices.length>=3);
  for(const [x,y]of vertices){const p=point(m,x,y);assert.ok(p.x>=-.75-1e-10&&p.x<=.75+1e-10&&p.z>=-.8-1e-10&&p.z<=.7+1e-10);assert.ok(m.gradientX*p.x+m.gradientZ*p.z>=-1e-8);}
 }
}));

test('Vector composition retains signs and one acceleration scale including collinear cases',()=>experiment((a,r,id)=>{
 for(const ax of [-10,0,10])for(const az of [-5,0,10]){
  set(a,id,ax,az);const m=r.mf1ProfessorState,s=m.geometry.vectorScale,G=vector(r.querySelector('[data-vector=g]')),E=vector(r.querySelector('[data-vector=effective]')),inertia=r.querySelector('[data-vector=inertia]'),I=inertia?vector(inertia):{dx:0,dy:0};
  close(G.dx,0);close(G.dy,9.81*s);close(I.dx,-ax*s);close(I.dy,az*s);close(E.dx,G.dx+I.dx);close(E.dy,G.dy+I.dy);
  if(ax!==0){close(G.x2,I.x1);close(G.y2,I.y1);close(G.x1,E.x1);close(G.y1,E.y1);close(I.x2,E.x2);close(I.y2,E.y2);}
 }
}));

test('Mobile layout uses real local geometry and legible vector text',()=>experiment((a,r,id)=>{
 const svg=id('v4-principle-canvas');
 for(const width of [240,320,960]){
  svg.getBoundingClientRect=()=>({width,height:400,left:0,top:0});a.w.dispatchEvent(new a.w.Event('resize'));
  for(const [ax,az]of [[-10,-5],[0,10],[10,10]]){
   set(a,id,ax,az);assert.equal(Number(svg.getAttribute('viewBox').split(' ')[2]),width);assert.equal(svg.dataset.layout,width<740?'vertical':'horizontal');
   for(const text of svg.querySelectorAll('text'))assert.ok(parseFloat(a.w.getComputedStyle(text).fontSize)>=16);
   assert.equal(svg.querySelector('image,foreignObject'),null);assert.ok(!/NaN|Infinity/.test(svg.innerHTML));
  }
 }
}));
