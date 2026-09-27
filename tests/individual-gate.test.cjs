const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} != ${b}`);
function experiment(run){const a=load(5);try{const id=s=>a.w.document.getElementById(s),r=id('v5-z41-container');run(a,r,id);a.scan('gate');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function set(a,id,h1,h2){a.change(id('v5-z41-h1-slider'),h1);a.change(id('v5-z41-h2-slider'),h2);}
const integrate=(f,a,b,N=20000)=>{let s=0,dx=(b-a)/N;for(let i=0;i<N;i++)s+=f(a+(i+.5)*dx)*dx;return s;};
const values=e=>{const l=e.querySelector('line');return{x:+l.getAttribute('x1'),y:+l.getAttribute('y1'),dx:+l.getAttribute('x2')-+l.getAttribute('x1'),dy:+l.getAttribute('y2')-+l.getAttribute('y1')};};

test('The gate keeps one SVG, two original controls and three meaningful wetting regimes',()=>experiment((a,r,id)=>{
 assert.equal(id('v5-z41-canvas').localName,'svg');assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelector('canvas,image,foreignObject'),null);
 for(const [key,max]of [['h1',5],['h2',6]]){const input=id('v5-z41-'+key+'-slider');assert.ok(input.labels.length);assert.equal(Number(input.min),1);assert.equal(Number(input.max),max);}
 assert.equal(r.querySelectorAll('.z41-reading').length,3);
 for(const [h1,h2,branch]of [[5,1,0],[3,3,1],[1,6,2]]){set(a,id,h1,h2);assert.equal(r.querySelectorAll('.mf1-decision li').length,3);assert.equal(r.querySelectorAll('.mf1-decision li[data-active=true]').length,1);assert.equal(Number(r.querySelector('.mf1-decision li[data-active=true]').dataset.branch),branch);}
}));

test('Independent pressure-force and pressure-moment integrals reproduce reactions across all branches',()=>experiment((a,r,id)=>{
 for(const [h1,h2]of [[1,1],[5,1],[2,1],[3,3],[3,5],[5,6],[1,6],[4.1,2.3]]){
  set(a,id,h1,h2);const m=r.mf1Physics,wet=Math.min(h1,h2),load=y=>1000*9.81*(h2-y)*6/1000;
  const F=integrate(load,0,wet),M=integrate(y=>load(y)*(h1-y),0,wet);
  close(m.force,F);close(m.moment,M);close(m.Rb,M/h1);close(m.hingeForce,F-M/h1);close(m.zF,h2-h1+M/F);
 }
 set(a,id,3,5);const m=r.mf1Physics;close(m.force,618.03);close(m.Rb,353.16);close(m.hingeForce,264.87);close(m.moment,1059.48);
}));

test('Partial immersion keeps force fixed while hinge height changes the reaction through the moment arm',()=>experiment((a,r,id)=>{
 set(a,id,2,1);const first=r.mf1Physics;set(a,id,5,1);const last=r.mf1Physics;
 close(first.force,29.43);close(last.force,29.43);close(first.Rb,24.525);close(last.Rb,27.468);assert.ok(last.Rb>first.Rb);
 close(last.arm-first.arm,3);close(first.area,6);close(last.area,6);close(last.zF,2/3);
}));

test('All three force arrows originate at the actual supports and pressure center on one fixed kN scale',()=>experiment((a,r,id)=>{
 const scales=[];
 for(const [h1,h2]of [[1,1],[5,1],[3,5],[5,6]]){
  set(a,id,h1,h2);const m=r.mf1Physics,q=m.geometry;
  for(const [key,force,y,sign]of [['resultant',m.force,q.fy,1],['hinge',m.hingeForce,q.hingeY,-1],['stop',m.Rb,q.bottom,-1]]){
   const v=values(r.querySelector('[data-gate-force='+key+']'));close(v.x,q.gateX);close(v.y,y);close(v.dy,0);close(v.dx,sign*force*q.forceScale);scales.push(Math.abs(v.dx)/force);
  }
  const ruler=values(r.querySelector('[data-force-ruler]'));close(ruler.dx,100*q.forceScale);
 }
 scales.forEach(x=>close(x,scales[0]));
}));

test('Only the wetted gate receives pressure; the fixed wall above A and the right-hand stop are explicit',()=>experiment((a,r,id)=>{
 for(const [h1,h2]of [[5,1],[3,3],[1,6]]){
  set(a,id,h1,h2);const m=r.mf1Physics,q=m.geometry,wall=r.querySelector('[data-fixed-wall]'),stop=r.querySelector('[data-stop]');
  close(+wall.getAttribute('y2'),q.hingeY);assert.ok(+wall.getAttribute('y1')<q.hingeY);assert.ok(+stop.getAttribute('x')>q.gateX);
  const points=r.querySelector('[data-gate-pressure]').getAttribute('points').split(' ').map(s=>s.split(',').map(Number));
  close(Math.min(...points.map(p=>p[1])),q.wetY);close(Math.max(...points.map(p=>p[1])),q.bottom);assert.ok(q.wetY>=q.hingeY);
  close(m.pTop,9.81*Math.max(0,h2-h1));close(m.pBottom,9.81*h2);
  for(const strip of r.querySelectorAll('[data-pressure-strip]'))close((+strip.getAttribute('x2')-+strip.getAttribute('x1'))/q.pressureScale,Number(strip.dataset.pressure));
 }
}));

test('The true wetted centroid and pressure center remain distinct even when less than a pixel apart',()=>experiment((a,r,id)=>{
 for(const [h1,h2]of [[5,1],[3,5],[1,6]]){
  set(a,id,h1,h2);const m=r.mf1Physics,q=m.geometry,T=r.querySelector('[data-wet-centroid]'),P=r.querySelector('[data-pressure-center]');
  close((q.bottom-+T.getAttribute('cy'))/q.scale,Math.min(h1,h2)/2);close((+P.getAttribute('cy')-q.waterY)/q.scale,m.zF);
  assert.ok(+P.getAttribute('cy')>+T.getAttribute('cy'));close((+P.getAttribute('cy')-+T.getAttribute('cy'))/q.scale,m.subH*m.subH/(12*m.zT));
 }
 const q=r.mf1Physics.geometry;assert.ok(q.fy-q.ty<1);close(r.mf1Physics.zF-r.mf1Physics.zT,1/66);
}));

test('Depth from the free surface and moment arm from A use their separate physical origins',()=>experiment((a,r,id)=>{
 for(const [h1,h2]of [[5,1],[3,3],[3,5]]){
  set(a,id,h1,h2);const m=r.mf1Physics,q=m.geometry,z=r.querySelector('[data-depth-dimension=zF] line'),d=r.querySelector('[data-depth-dimension=arm] line');
  close(+z.getAttribute('y1'),q.waterY);close(+d.getAttribute('y1'),q.hingeY);close(+z.getAttribute('y2'),q.fy);close(+d.getAttribute('y2'),q.fy);
  close((+z.getAttribute('y2')-+z.getAttribute('y1'))/q.scale,m.zF);close((+d.getAttribute('y2')-+d.getAttribute('y1'))/q.scale,m.arm);
 }
}));

test('Mobile redraw retains stable geometry and scale across slider changes with legible native text',()=>experiment((a,r,id)=>{
 const svg=id('v5-z41-canvas');
 for(const width of [240,320,960]){
  svg.getBoundingClientRect=()=>({width,height:400,left:0,top:0});a.w.dispatchEvent(new a.w.Event('resize'));const sizes=[];
  for(const [h1,h2]of [[5,1],[1,6],[5,6],[3,3]]){set(a,id,h1,h2);const q=r.mf1Physics.geometry,box=svg.getAttribute('viewBox').split(' ').map(Number);assert.equal(box[2],width);sizes.push([box[3],q.scale,q.forceScale,q.pressureScale].join('|'));for(const text of svg.querySelectorAll('text'))assert.ok(parseFloat(a.w.getComputedStyle(text).fontSize)>=16);assert.equal(svg.querySelector('image,foreignObject'),null);}
  assert.equal(new Set(sizes).size,1);
 }
}));
