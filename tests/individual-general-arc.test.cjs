const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {load}=require('./widget-harness.cjs'),sandbox={};vm.createContext(sandbox);vm.runInContext(fs.readFileSync('assets/mf1-science.js','utf8'),sandbox);const S=sandbox.MF1;
const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),a+' != '+b);
function run(fn){const a=load(7);try{const id=s=>a.w.document.getElementById(s),root=id('v7-widget-a-container');fn(a,root,id);a.scan('general-arc');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function set(a,id,a1,span,zC,R=1,b=1){for(const [key,value]of [['a1',a1],['as',span],['az',zC],['ar',R],['ab',b]])a.change(id(key),value);}
function fine(s,n=100000){let fx=0,fz=0,moment=0,wet=0;const dt=s.span/n;for(let i=0;i<n;i++){const t=s.start+(i+.5)*dt,z=s.zC+s.R*Math.sin(t),p=1000*9.81*Math.max(0,z),dx=-p*s.b*s.R*Math.cos(t)*dt,dz=-p*s.b*s.R*Math.sin(t)*dt;fx+=dx;fz+=dz;moment+=s.R*Math.cos(t)*dz-s.R*Math.sin(t)*dx;if(z>0)wet+=dt;}return{fx,fz,moment,wet};}

test('arcPressure returns the exact union of wet intervals without changing the pressure integrals',()=>{
 for(const [start,span,zC,R]of [[0,90,-.49,1],[330,90,0,1],[330,360,0,1],[90,360,-1,1],[270,180,.3,1],[0,360,2,1.5]]){
  const s={start:start*Math.PI/180,span:span*Math.PI/180,zC,R,b:1.2},m=S.arcPressure(s),n=fine(s);let length=0,previous=s.start;
  for(const interval of m.wetIntervals){assert.ok(interval.start>=previous-1e-13);assert.ok(interval.end<=s.start+s.span+1e-13);assert.ok(interval.end>interval.start);assert.ok(zC+R*Math.sin((interval.start+interval.end)/2)>0);length+=interval.end-interval.start;previous=interval.end;}
  near(length,m.wetAngle);near(m.fx,n.fx,2e-8);near(m.fz,n.fz,2e-8);near(n.moment,0,1e-8);
  for(let i=0;i<317;i++){const t=s.start+(i+.347)*s.span/317,inside=m.wetIntervals.some(p=>t>p.start&&t<p.end);assert.equal(inside,zC+R*Math.sin(t)>0);}
 }
});

test('The native arc keeps five controls, four shape presets and exact dry/full contacts',()=>run((a,r,id)=>{
 assert.equal(id('ac').localName,'svg');assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelector('canvas,image,foreignObject'),null);assert.equal(r.querySelectorAll('input').length,5);assert.equal(r.querySelectorAll('[data-p]').length,4);
 for(const key of ['a1','as','az','ar','ab'])assert.ok(id(key).labels.length);assert.equal(id('az').step,'any');
 for(const [a1,span]of [[0,90],[330,90],[90,180],[270,180],[330,360]]){
  set(a,id,a1,span,3,1.2);id('arc-dry-contact').click();let m=r.mf1Physics;near(+id('az').value,m.dryLevel,1e-13);assert.equal(m.regime,'dry');assert.equal(m.FR,0);
  id('arc-full-contact').click();m=r.mf1Physics;near(+id('az').value,m.fullLevel,1e-13);assert.equal(m.regime,'full');near(m.wetAngle,span*Math.PI/180,1e-12);
 }
}));

test('A 0.659 degree wet patch retains its sub-newton force and its own exact arc and pressure arrow',()=>run((a,r,id)=>{
 set(a,id,0,30,-.49);const m=r.mf1Physics;near(m.wetAngle*180/Math.PI,.6594184248149);near(m.fxAnalytical*1000,-.4905,1e-10);const n=fine({start:0,span:Math.PI/6,zC:-.49,R:1,b:1},300000);near(m.fzAnalytical*1000,n.fz,1e-8);near(m.FR*1000,Math.hypot(n.fx,n.fz),1e-8);
 assert.equal(m.regime,'partial');assert.equal(m.wetIntervals.length,1);assert.match(id('afx').textContent,/0,4905 N/);assert.match(id('afz').textContent,/0,2807 N/);assert.match(id('afr').textContent,/0,5651 N/);
 const p=r.querySelector('[data-wet-interval]');near(+p.dataset.start,m.wetIntervals[0].start);near(+p.dataset.end,m.wetIntervals[0].end);assert.ok(r.querySelectorAll('[data-arc-vector=pressure]').length>=1);
}));

test('Every wet interval gets pressure normals on its actual arc and the resultant passes through C',()=>run((a,r,id)=>{
 for(const [a1,span,zC,R,b]of [[330,360,0,1,1],[0,30,-.49,1,1],[90,180,3,1.5,3],[270,180,.1,.5,.5]]){
  set(a,id,a1,span,zC,R,b);const m=r.mf1Physics,q=m.geometry,paths=[...r.querySelectorAll('[data-wet-interval]')],vectors=[...r.querySelectorAll('[data-arc-vector=pressure]')];assert.equal(paths.length,m.wetIntervals.length);
  for(const interval of m.wetIntervals)assert.ok(vectors.some(v=>+v.dataset.theta>interval.start&&+v.dataset.theta<interval.end));
  for(const v of vectors){const d=v.dataset,t=+d.theta,p=9.81*(zC+R*Math.sin(t));near(+d.pressure,p);near(+d.x,q.cx+q.radius*Math.cos(t));near(+d.y,q.cy+q.radius*Math.sin(t));near(+d.dx,-p*q.pressureScale*Math.cos(t));near(+d.dy,-p*q.pressureScale*Math.sin(t));near((+d.x-q.cx)*+d.dy-(+d.y-q.cy)*+d.dx,0);}
  const F=r.querySelector('[data-arc-vector=scene-resultant]').dataset;near(+F.x,q.cx);near(+F.y,q.cy);near(+F.dx,m.fxAnalytical*q.forceScale);near(+F.dy,m.fzAnalytical*q.forceScale);
 }
}));

test('Water intersections are physical points at z=0, including wrapped angles and tangency',()=>run((a,r,id)=>{
 for(const [a1,span,zC]of [[330,90,0],[330,360,0],[0,90,-1],[90,180,1],[90,360,-1]]){
  set(a,id,a1,span,zC);const m=r.mf1Physics,q=m.geometry;
  for(const e of r.querySelectorAll('[data-water-intersection]')){const theta=+e.dataset.theta;near(zC+Math.sin(theta),0,1e-12);near(+e.getAttribute('cy'),q.sy,1e-12);near((+e.getAttribute('cx')-q.cx)**2+(+e.getAttribute('cy')-q.cy)**2,q.radius*q.radius);assert.ok(theta>=m.theta1-1e-12&&theta<=m.theta2+1e-12);}
 }
}));

test('The force polygon shares the scene scale, closes head-to-tail and preserves all signs',()=>run((a,r,id)=>{
 const scales=[];
 for(const [a1,span,zC,R,b]of [[0,180,5,1.5,3],[90,180,3,1,1],[270,180,3,1,1],[180,180,5,1.5,3],[330,360,0,1,1],[0,30,-.49,1,1]]){
  set(a,id,a1,span,zC,R,b);const m=r.mf1Physics,q=m.geometry,v=k=>r.querySelector('[data-arc-vector='+k+']').dataset,x=v('sum-x'),z=v('sum-z'),F=v('sum-resultant');scales.push(q.forceScale);
  near(+x.x,q.polygonX);near(+x.y,q.polygonY);near(+z.x,+x.x + +x.dx);near(+z.y,+x.y + +x.dy);near(+z.x + +z.dx,+F.x + +F.dx);near(+z.y + +z.dy,+F.y + +F.dy);near(+F.dx,m.fxAnalytical*q.forceScale);near(+F.dy,m.fzAnalytical*q.forceScale);near(+v('force-ruler').dx,100*q.forceScale);
 }
 assert.equal(new Set(scales).size,1);set(a,id,0,180,5,1.5,3);near(r.mf1Physics.FR,545.4642057692);
}));

test('Full-cylinder buoyancy equals displaced volume; an open arc does not claim a displaced body',()=>run((a,r,id)=>{
 for(const depth of [-1.5,-.7,0,.7,1.5,5]){
  set(a,id,330,360,depth,1.5,3);const m=r.mf1Physics,R=1.5,h=Math.max(0,Math.min(2*R,depth+R)),area=h===0?0:h===2*R?Math.PI*R*R:R*R*Math.acos((R-h)/R)-(R-h)*Math.sqrt(2*R*h-h*h);
  near(m.fxAnalytical,0);near(m.fzAnalytical,-9.81*area*3);near(m.displacedVolume,area*3);near(m.buoyancy,-m.fzAnalytical);
 }
 set(a,id,0,180,3);assert.equal(r.mf1Physics.displacedVolume,null);assert.equal(r.mf1Physics.buoyancy,null);assert.match(id('anote').textContent,/bez pretpostavke Arhimedova/);
}));

test('Preset state follows manual angles, while analytic primary results and numerical details stay separate',()=>run((a,r,id)=>{
 r.querySelector('[data-p=l]').click();assert.equal(r.querySelector('[data-p=l]').getAttribute('aria-pressed'),'true');a.change(id('a1'),95);assert.equal(r.querySelectorAll('[data-p][aria-pressed=true]').length,0);a.change(id('a1'),90);assert.equal(r.querySelector('[data-p=l]').getAttribute('aria-pressed'),'true');
 assert.ok(id('ae').closest('details'));assert.equal(r.querySelectorAll('.v7o strong').length,3);
 set(a,id,0,30,-.49);assert.match(id('afx').textContent,/0,4905 N/);assert.match(id('afr').textContent,/0,5651 N/);
}));

test('Geometry never shrinks with depth and both arrow scales stay fixed at native mobile and desktop widths',()=>run((a,r,id)=>{
 const svg=id('ac');
 for(const width of [300,390,900]){
  svg.getBoundingClientRect=()=>({width,height:400,left:0,top:0});a.w.dispatchEvent(new a.w.Event('resize'));const scales=[];
  for(const [zC,R]of [[-1.5,.5],[0,1.5],[3,1],[5,.5]]){
   set(a,id,0,90,zC,R);const m=r.mf1Physics,q=m.geometry;assert.equal(svg.getAttribute('viewBox').split(' ').map(Number)[2],width);near(q.radius/R,q.scale);scales.push([q.scale,q.forceScale,q.pressureScale].join('|'));for(const text of svg.querySelectorAll('text'))assert.ok(parseFloat(a.w.getComputedStyle(text).fontSize)>=16);assert.equal(svg.querySelector('image,foreignObject'),null);
   if(!q.broken)near(q.cy-q.sy,zC*q.scale);else assert.ok(r.querySelector('[data-depth-break]'));
  }assert.equal(new Set(scales).size,1);
 }
}));