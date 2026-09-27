const test=require('node:test');
const assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const near=(a,b,tol=1e-8)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} ≈ ${b}`);
const numbers=p=>p.getAttribute('d').match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi).map(Number);
const profiles={rect:{L:3.5,B:5,w:s=>5},tri:{L:3.5,B:5,w:s=>5*s/3.5},circle:{L:3,B:3,w:s=>2*Math.sqrt(2.25-(s-1.5)**2)},semi:{L:1.5,B:3,w:s=>2*Math.sqrt(2.25-s*s)}};
function run(fn){const a=load(5),r=a.w.document.getElementById('v5-lab-v5'),s=r.querySelector('svg');try{fn(a,r,s);a.scan('individual plane');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function set(a,r,shape,angle,depth){a.w.v5_setShape(shape);a.change(r.querySelector('#v5-v5-a-slider'),angle);a.change(r.querySelector('#v5-v5-z-slider'),depth);return r.mf1Physics;}
const point=(s,id)=>['cx','cy'].map(name=>+s.querySelector('#'+id).getAttribute(name));

test('Four actual area profiles independently recover A, sT, IG, pressure force and moment through horizontal and near-horizontal limits',()=>run((a,r,s)=>{
 for(const [shape,p]of Object.entries(profiles))for(const angle of [0,1,45,90])for(const depth of [.1,4]){
  const m=set(a,r,shape,angle,depth),N=20000,ds=p.L/N;let area=0,first=0,second=0,F=0,M=0;
  for(let i=0;i<N;i++){const v=(i+.5)*ds,dA=p.w(v)*ds,df=9.81*(depth+v*Math.sin(angle*Math.PI/180))*dA;area+=dA;first+=v*dA;second+=v*v*dA;F+=df;M+=v*df;}
  const centroid=first/area,IG=second-first*first/area;
  near(m.area,area,2e-6);near(m.sT,centroid,2e-6);near(m.IG,IG,2e-6);near(m.F,F,2e-6);near(m.moment,M,2e-6);near(m.sF,M/F,2e-6);near(m.zF,depth+(M/F)*Math.sin(angle*Math.PI/180),2e-6);
  if(angle===0){near(m.sT,m.sF);near(m.deltaZ,0);assert.equal(m.yT,null);assert.equal(m.yF,null);assert.equal(m.FH,0);near(m.FV,m.F);}
  else assert.ok(m.deltaS>0&&m.deltaZ>0);
  const active=[...r.querySelectorAll('#v5-v5-explainer [data-active=true]')];assert.equal(active.length,1);assert.equal(+active[0].dataset.branch,angle===0?0:1);
 }
}));

test('Rendered T and CP are actual geometric positions in both views; the IG axis crosses T and horizontal labels merge',()=>run((a,r,s)=>{
 for(const shape of Object.keys(profiles))for(const angle of [0,1,45,90]){
  const m=set(a,r,shape,angle,4),g=m.geometry,T=point(s,'v5-side-T'),CP=point(s,'v5-side-CP'),NT=point(s,'v5-normal-T'),NP=point(s,'v5-normal-CP');
  const edge=s.querySelector('#v5-plate-edge'),x1=+edge.getAttribute('x1'),y1=+edge.getAttribute('y1'),x2=+edge.getAttribute('x2'),y2=+edge.getAttribute('y2');
  for(const [p,along]of [[T,m.sT],[CP,m.sF]]){near((p[0]-x1)*(x2-x1)+(p[1]-y1)*(y2-y1),along*m.L*g.scale*g.scale);near((p[0]-x1)*(y2-y1)-(p[1]-y1)*(x2-x1),0);}
  near((CP[1]-g.surfaceY)/g.scale,m.zF);near((T[1]-g.surfaceY)/g.scale,m.zT);near(NT[1],g.planTop+m.sT*g.planScale);near(NP[1],g.planTop+m.sF*g.planScale);
  const axis=s.querySelector('#v5-IG-axis');near(+axis.getAttribute('y1'),NT[1]);near(+axis.getAttribute('y2'),NT[1]);
  if(angle===0){near(T[0],CP[0]);near(T[1],CP[1]);near(NT[1],NP[1]);assert.equal([...s.querySelectorAll('text')].filter(t=>t.textContent==='T = Cₚ').length,2);}
  else{assert.ok(NP[1]>NT[1]);assert.equal([...s.querySelectorAll('text')].filter(t=>t.textContent==='T = Cₚ').length,0);}
 }
}));

test('Pressure arrows and the envelope use one constant kPa scale and exactly the inward plate normal',()=>run((a,r,s)=>{
 let scale;
 for(const shape of Object.keys(profiles))for(const angle of [0,45,90])for(const depth of [.1,4]){
  const m=set(a,r,shape,angle,depth),edge=s.querySelector('#v5-plate-edge'),tx=+edge.getAttribute('x2')-+edge.getAttribute('x1'),ty=+edge.getAttribute('y2')-+edge.getAttribute('y1');
  const reference=numbers(s.querySelector('#v5-pressure-scale path')),expectedScale=Math.hypot(reference[2]-reference[0],reference[3]-reference[1])/20;
  if(scale!==undefined)near(scale,expectedScale);scale=expectedScale;
  for(const group of s.querySelectorAll('[data-local-pressure]')){
   const p=numbers(group.querySelector('path')),dx=p[2]-p[0],dy=p[3]-p[1],along=+group.dataset.s,pressure=9.81*(depth+along*Math.sin(angle*Math.PI/180));
   near(+group.dataset.localPressure,pressure);near(Math.hypot(dx,dy),pressure*scale);near(dx*tx+dy*ty,0);assert.ok(dx>=-1e-12&&dy<=1e-12);
   near(p[2],m.geometry.xA+along*m.geometry.scale*Math.cos(m.alpha));near(p[3],m.geometry.yA+along*m.geometry.scale*Math.sin(m.alpha));
  }
  const polygon=s.querySelector('#v5-pressure-envelope').getAttribute('points').split(/[ ,]/).map(Number);near(polygon[0],m.geometry.xA);near(polygon[1],m.geometry.yA);near(polygon[2],m.geometry.xB);near(polygon[3],m.geometry.yB);
 }
}));

test('Force arrows use a published fixed kN scale without a length cap and their head-to-tail components sum to the resultant',()=>run((a,r,s)=>{
 let fixedScale;
 for(const shape of Object.keys(profiles))for(const angle of [0,1,45,90])for(const depth of [.1,4]){
  const m=set(a,r,shape,angle,depth),F=numbers(s.querySelector('#v5-force-resultant path')),reference=numbers(s.querySelector('#v5-force-scale path')),scale=Math.hypot(reference[2]-reference[0],reference[3]-reference[1])/500;
  if(fixedScale!==undefined)near(fixedScale,scale);fixedScale=scale;
  near(Math.hypot(F[2]-F[0],F[3]-F[1]),m.F*scale);near(F[0],m.geometry.fx);near(F[1],m.geometry.fy);near(F[2]-F[0],m.FH*scale);near(F[1]-F[3],m.FV*scale);
  const H=s.querySelector('#v5-force-horizontal'),V=s.querySelector('#v5-force-vertical');near(+H.dataset.x,+F[0]);near(+H.dataset.y,+F[1]);near(+H.dataset.x+ +H.dataset.dx,+V.dataset.x);near(+H.dataset.y+ +H.dataset.dy,+V.dataset.y);near(+V.dataset.x+ +V.dataset.dx,F[2]);near(+V.dataset.y+ +V.dataset.dy,F[3]);
 }
 const max=set(a,r,'rect',90,4);near(max.F,987.13125);near(max.moment,1902.73125);assert.ok(max.F*fixedScale>80);
}));

test('A 0.042554 mm physical shift stays nonzero in the student reading, while circle and semicircle remain true circular geometry',()=>run((a,r,s)=>{
 const m=set(a,r,'circle',1,4);near(m.deltaZ*1000,.04255397408166607,1e-8);assert.match(r.querySelector('#v5-v5-out-dz').textContent,/0,04255 mm/);assert.ok(m.deltaZ>0);
 for(const width of [300,900])for(const shape of Object.keys(profiles)){
  s.getBoundingClientRect=()=>({left:0,top:0,width,height:800});const m=set(a,r,shape,45,1),g=m.geometry,p=s.querySelector('#v5-plane-shape');
  assert.equal(+s.getAttribute('viewBox').split(' ')[2],width);
  if(shape==='rect'){near(+p.getAttribute('width')/+p.getAttribute('height'),5/3.5);}
  if(shape==='circle'){assert.equal(p.tagName,'circle');near(2*+p.getAttribute('r'),3*g.planScale);}
  if(shape==='semi'){const v=numbers(p);near(v[2],v[3]);near(v[2],1.5*g.planScale);assert.equal(v[6],1);}
  assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelectorAll('canvas,image,foreignObject,img').length,0);assert.equal(r.querySelectorAll('input[type=range]').length,2);assert.equal(r.querySelectorAll('[data-shape]').length,4);
  for(const t of s.querySelectorAll('text')){const owner=t.closest('[font-size]');assert.ok(owner&&+owner.getAttribute('font-size')>=16);}
 }
}));
