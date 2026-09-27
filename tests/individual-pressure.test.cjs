const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const close=(a,b,t=1e-10)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} != ${b}`);
function experiment(run){const a=load(3);try{const id=s=>a.w.document.getElementById(s),root=id('v3-intro-widget');run(a,root,id);a.scan('pressure scene');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
const sum=a=>a.reduce((s,x)=>s+x,0);

test('All three pressure modes retain one native SVG and accessible existing controls',()=>experiment((a,r,id)=>{
 const svg=id('v3-intro-canvas');assert.equal(svg.localName,'svg');
 for(const mode of ['dubina','manometar','ubrzanje','dubina']){
  a.w.switchV3Tab(mode);assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelectorAll('canvas').length,0);assert.equal(svg,id('v3-intro-canvas'));
  assert.equal(r.querySelector('image,foreignObject'),null);assert.equal(r.querySelectorAll('.mf1-decision li[data-active=true]').length,1);
 }
 for(const s of ['depth','density','rho','acc'])assert.ok(id('v3-intro-'+s).labels.length);
 assert.equal(id('v3-impact-strip'),null);assert.equal(r.querySelector('.v3-note'),null);
}));

test('Probe pressure is the integrated hydrostatic gradient, including the free-surface boundary',()=>experiment((a,r,id)=>{
 for(const rho of [700,1000,1400])for(const depth of [0,.1,1.5,3]){
  a.change(id('v3-intro-density'),rho);a.change(id('v3-intro-depth'),depth);const m=r.mf1ProfessorState;
  let pressure=0;for(let i=0;i<1000;i++)pressure+=rho*9.81*depth/1000;
  close(m.pressure,pressure);close(m.gradient,rho*9.81);close(m.bottomPressure,rho*9.81*3);
  const probes=[...id('v3-intro-canvas').querySelectorAll('[data-depth-probe]')];close(+probes[0].getAttribute('cy'),+probes[1].getAttribute('cy'));
  assert.equal(+r.querySelector('.mf1-decision li[data-active=true]').dataset.branch,depth===0?0:1);
 }
 assert.equal(r.querySelectorAll('.mf1-decision li').length,2);
}));

test('Wall loads are outward, include the floor, and use one pressure-to-length scale',()=>experiment((a,r,id)=>{
 const scale=[];
 for(const rho of [700,1400]){
  a.change(id('v3-intro-density'),rho);
  const loads=[...r.querySelectorAll('[data-wall-load]')];assert.equal(loads.filter(x=>x.dataset.wallLoad==='bottom').length,3);
  for(const load of loads){const line=load.querySelector('line'),dx=+line.getAttribute('x2')-+line.getAttribute('x1'),dy=+line.getAttribute('y2')-+line.getAttribute('y1');
   close(dx*(-Number(load.dataset.normalZ))-dy*Number(load.dataset.normalX),0);
   assert.ok(dx*Number(load.dataset.normalX)-dy*Number(load.dataset.normalZ)>0);scale.push(Math.hypot(dx,dy)/Number(load.dataset.pressure));
  }
 }
 scale.forEach(x=>close(x,scale[0]));
}));

test('Keyboard and pointer probe share the depth parameter and its numerical pressure',()=>experiment((a,r,id)=>{
 const svg=id('v3-intro-canvas');svg.getBoundingClientRect=()=>({width:900,height:365,left:0,top:0});a.w.dispatchEvent(new a.w.Event('resize'));
 for(const [key,value]of [['Home',0],['ArrowDown',.1],['End',3],['ArrowUp',2.9]]){
  svg.dispatchEvent(new a.w.KeyboardEvent('keydown',{key,bubbles:true}));close(r.mf1ProfessorState.depth,value);close(Number(svg.getAttribute('aria-valuenow')),value);
 }
 svg.dispatchEvent(new a.w.MouseEvent('pointerdown',{clientX:200,clientY:150,bubbles:true}));close(r.mf1ProfessorState.depth,1);
 a.w.switchV3Tab('manometar');assert.equal(svg.getAttribute('role'),'img');assert.equal(svg.hasAttribute('aria-valuenow'),false);
}));

test('A signed path through both legs closes hydrostatically for every density regime',()=>experiment((a,r,id)=>{
 a.w.switchV3Tab('manometar');
 for(const rho2 of [500,750,1000,1300,2000]){
  a.change(id('v3-intro-rho'),rho2);const m=r.mf1ProfessorState;
  // Integrate dp=-rho*g*dz independently down and up four physical vertical segments.
  const segments=[[1000,1.2,0],[Math.max(1000,rho2),0,-.35],[Math.max(1000,rho2),-.35,0],[rho2,0,1200/rho2]];
  let p=0;const increments=[];
  for(const [rho,zA,zB]of segments){let dp=0;for(let i=0;i<1000;i++)dp-=rho*9.81*(zB-zA)/1000;increments.push(dp);p+=dp;}
  close(p,0,1e-8);close(sum(m.pressurePath),0,1e-8);m.pressurePath.forEach((x,i)=>close(x,increments[i]));
  close(m.pressure,11772);close(m.h2,1200/rho2);close(m.pBottom,11772+Math.max(1000,rho2)*9.81*.35);
 }
}));

test('Manometer interface is horizontal in one leg and the denser phase traverses the entire bottom',()=>experiment((a,r,id)=>{
 a.w.switchV3Tab('manometar');
 for(const rho2 of [500,1000,2000]){
  a.change(id('v3-intro-rho'),rho2);const m=r.mf1ProfessorState,g=m.geometry,edge=r.querySelector('[data-interface]'),dense=r.querySelector('[data-dense=true]');
  const side=rho2>=1000?'left':'right';assert.equal(edge.dataset.interface,side);assert.equal(m.interfaceSide,side);assert.equal(Number(dense.dataset.fluid),rho2>=1000?2:1);
  close(+edge.getAttribute('y1'),+edge.getAttribute('y2'));close((+edge.getAttribute('x1')+ +edge.getAttribute('x2'))/2,g[side]);
  assert.ok(g.z0<g.bottom);assert.match(dense.getAttribute('d'),new RegExp('V '+g.bottom+' H '+g.right));
  close((g.z0-g.y1)/g.scale,1.2);close((g.z0-g.y2)/g.scale,1200/rho2);close((g.bottom-g.z0)/g.scale,.35);
 }
}));

test('Accelerated free surface conserves area and its drawn tangent is perpendicular to effective gravity',()=>experiment((a,r,id)=>{
 a.w.switchV3Tab('ubrzanje');
 for(const ax of [-4,-2.5,0,2.5,4]){
  a.change(id('v3-intro-acc'),ax);const m=r.mf1ProfessorState,s=r.querySelector('[data-free-surface]'),geo=m.geometry;
  close(m.L,2.2);close(m.h0,.6);close(m.H,1.2);
  let area=0;for(let i=0;i<2000;i++){const x=(i+.5)*2.2/2000;area+=(.6+ax*(1.1-x)/9.81)*2.2/2000;}close(m.area,area);
  close(m.left,.6+ax*1.1/9.81);close(m.right,.6-ax*1.1/9.81);assert.ok(Math.min(m.left,m.right)>0);assert.ok(Math.max(m.left,m.right)<1.2);
  close(m.pR-m.pL,-1000*ax*2.2);close(m.theta,-Math.atan2(ax,9.81));
  close(sum(m.geff.map((x,i)=>x*m.tangent[i])),0);
  const dx=+s.getAttribute('x2')-+s.getAttribute('x1'),dz=+s.getAttribute('y1')-+s.getAttribute('y2');
  close(dx/geo.scale,2.2);close(dz/geo.scale,m.right-m.left);close(Math.atan2(dz,dx),m.theta);close(dx*m.geff[0]+dz*m.geff[1],0,1e-8);
  assert.equal(r.querySelector('[data-open-tank]').getAttribute('d').match(/H/g).length,1);
  assert.equal(r.querySelector('[data-open-tank]').getAttribute('d').includes('Z'),false);
 }
}));

test('Mobile modes reflow physical geometry without shrinking text or embedding pixels',()=>experiment((a,r,id)=>{
 const svg=id('v3-intro-canvas');
 for(const width of [240,320,960]){
  svg.getBoundingClientRect=()=>({width,height:400,left:0,top:0});a.w.dispatchEvent(new a.w.Event('resize'));
  for(const mode of ['dubina','manometar','ubrzanje']){
   a.w.switchV3Tab(mode);const view=svg.getAttribute('viewBox').split(' ').map(Number);assert.equal(view[2],width);assert.equal(svg.dataset.layout,width<740?'vertical':'horizontal');
   for(const text of svg.querySelectorAll('text'))assert.ok(parseFloat(a.w.getComputedStyle(text).fontSize)>=16);
   assert.equal(svg.querySelector('image,foreignObject'),null);assert.ok(!/NaN|Infinity/.test(svg.innerHTML));
   if(mode==='dubina')assert.equal(r.mf1ProfessorState.geometry.graphY,width<740?360:0);
  }
 }
}));
