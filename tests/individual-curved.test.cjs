const test=require('node:test');
const assert=require('node:assert/strict');
const sharp=require('sharp');
const {load}=require('./widget-harness.cjs');
const near=(a,b,tol=1e-8)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} ≈ ${b}`);
const nums=p=>p.getAttribute('d').match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi).map(Number);
function run(fn){const a=load(6),r=a.w.document.getElementById('widget-curved-pressure'),s=r.querySelector('svg');try{fn(a,r,s);a.scan('individual curved');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function set(a,r,h,R,side='outside',step=3){a.change(r.querySelector('#cp-h'),h);a.change(r.querySelector('#cp-r'),R);r.querySelector(`[data-cp-side=${side}]`).click();r.querySelector(`[data-cp-step="${step}"]`).click();return r.mf1Physics;}

test('Independent normal-traction quadrature recovers signed forces, their lines and both actual/pseudo volume centroids',()=>run((a,r,s)=>{
 for(const h of [0,1.2,3])for(const R of [.4,1,1.8]){
  const N=30000,dt=Math.PI/(2*N),dx=R/N;let FH=0,FV=0,Hmoment=0,Vmoment=0,V=0,mx=0,mz=0;
  for(let i=0;i<N;i++){
   const t=(i+.5)*dt,z=h+R*Math.sin(t),x=-R*Math.cos(t),df=9.81*z*R*dt,fx=df*Math.cos(t),fy=df*Math.sin(t);FH+=fx;FV+=fy;Hmoment+=z*fx;Vmoment-=x*fy;
   const u=(i+.5)*dx,depth=h+Math.sqrt(R*R-u*u);V+=depth*dx;mx+=u*depth*dx;mz+=depth*depth/2*dx;
  }
  for(const side of ['outside','inside']){
   const m=set(a,r,h,R,side),sign=side==='outside'?1:-1;
   near(m.FH,sign*FH,2e-8);near(m.FV,sign*FV,2e-8);near(m.zH,Hmoment/FH,2e-8);near(m.xV,Vmoment/FV,2e-8);near(m.V,V,2e-7);near(m.volumeCentroid.x,-mx/V,2e-7);near(m.zV,mz/V,2e-7);near(m.momentAboutC,0);near(m.FR,Math.hypot(FH,FV),2e-8);
   assert.equal(+r.querySelector('#cp-note [data-active=true]').dataset.branch,side==='outside'?0:1);
   assert.match(r.querySelector('#cp-fh').textContent,/kN [←→]$/);assert.doesNotMatch(r.querySelector('#cp-fh').textContent,/kN\/m/);assert.equal(m.b,1);
  }
 }
}));

test('The native arc is circular, both component lines meet at virtual P, and the resultant acts at true arc point Q through C',()=>run((a,r,s)=>{
 for(const width of [300,900])for(const h of [0,1.2,3])for(const R of [.4,1.8])for(const side of ['outside','inside']){
  s.getBoundingClientRect=()=>({left:0,top:0,width,height:500});const m=set(a,r,h,R,side),g=m.geometry;
  const arc=nums(s.querySelector('#cp-arc'));near(arc[2],arc[3]);near(arc[2],R*g.scale);near(arc[0],g.cx-R*g.scale);near(arc[1],g.cy);near(arc[7],g.cx);near(arc[8],g.cy+R*g.scale);
  const H=s.querySelector('#cp-horizontal-line'),V=s.querySelector('#cp-vertical-line');near(+H.getAttribute('y1'),g.sy+m.zH*g.scale);near(+H.getAttribute('y2'),+H.getAttribute('y1'));near(+V.getAttribute('x1'),g.cx-m.xV*g.scale);near(+V.getAttribute('x2'),+V.getAttribute('x1'));
  const P=s.querySelector('#cp-equivalent-point'),Q=s.querySelector('#cp-resultant-point'),qx=+Q.getAttribute('cx'),qy=+Q.getAttribute('cy');near(+P.getAttribute('cx'),+V.getAttribute('x1'));near(+P.getAttribute('cy'),+H.getAttribute('y1'));near(Math.hypot(qx-g.cx,qy-g.cy),R*g.scale);
  const F=nums(s.querySelector('#cp-force-resultant path')),fx=F[2]-F[0],fy=F[3]-F[1];near(F[0],qx);near(F[1],qy);near((g.cx-qx)*fy-(g.cy-qy)*fx,0);assert.equal(Math.sign((g.cx-qx)*fx+(g.cy-qy)*fy),side==='outside'?1:-1);
  const through=s.querySelector('#cp-resultant-line');near(+through.getAttribute('x1'),qx);near(+through.getAttribute('y1'),qy);near(+through.getAttribute('x2'),g.cx);near(+through.getAttribute('y2'),g.cy);
  const T=s.querySelector('#cp-volume-centroid');near(+T.getAttribute('cx'),g.cx+m.volumeCentroid.x*g.scale);near(+T.getAttribute('cy'),g.sy+m.zV*g.scale);
  assert.match(r.querySelector('#cp-caption').textContent,/P je virtualno/);assert.equal(s.querySelector('#cp-control-volume').dataset.volumeKind,side==='inside'?'real':'auxiliary');
 }
}));

test('Pressure arrows follow the actual normals on both wetted sides with fixed kPa scale and no false head at pA=0',()=>run((a,r,s)=>{
 let fixed;
 for(const h of [0,1.2,3])for(const R of [.4,1.8])for(const side of ['outside','inside']){
  const m=set(a,r,h,R,side,1),g=m.geometry,reference=nums(s.querySelector('#cp-pressure-scale path')),scale=Math.hypot(reference[2]-reference[0],reference[3]-reference[1])/50;
  if(fixed!==undefined)near(scale,fixed);fixed=scale;const arrows=[...s.querySelectorAll('[data-pressure]')];assert.equal(arrows.length,7);
  arrows.forEach((el,i)=>{
   const t=i*Math.PI/12,p=9.81*(h+R*Math.sin(t));near(+el.dataset.pressure,p);
   if(p===0){assert.equal(el.querySelector('path'),null);return;}
   const v=nums(el.querySelector('path')),dx=v[2]-v[0],dy=v[3]-v[1];near(Math.hypot(v[0]-g.cx,v[1]-g.cy),R*g.scale);near(dx*(g.cy-v[1])-dy*(g.cx-v[0]),0);near(Math.hypot(dx,dy),p*scale);assert.equal(Math.sign(dx*(g.cx-v[0])+dy*(g.cy-v[1])),side==='outside'?1:-1);
  });
  assert.equal(s.querySelector('#cp-control-volume'),null);assert.equal(s.querySelector('#cp-force-resultant'),null);
 }
}));

test('Published force scale is fixed across all parameters and sides; reversing water changes both component signs and atan2 quadrant',()=>run((a,r,s)=>{
 let fixed;
 for(const h of [0,1.2,3])for(const R of [.4,1.8])for(const side of ['outside','inside']){
  const m=set(a,r,h,R,side,3),ref=nums(s.querySelector('#cp-force-scale path')),scale=Math.hypot(ref[2]-ref[0],ref[3]-ref[1])/100;if(fixed!==undefined)near(scale,fixed);fixed=scale;
  const H=nums(s.querySelector('#cp-force-horizontal path')),V=nums(s.querySelector('#cp-force-vertical path')),F=nums(s.querySelector('#cp-force-resultant path'));
  near(H[2]-H[0],m.FH*scale);near(H[3]-H[1],0);near(V[2]-V[0],0);near(V[3]-V[1],-m.FV*scale);near(F[2]-F[0],m.FH*scale);near(F[3]-F[1],-m.FV*scale);near(Math.hypot(F[2]-F[0],F[3]-F[1]),m.FR*scale);near(m.phiR,Math.atan2(m.FV,m.FH)*180/Math.PI);
  if(side==='outside')assert.ok(m.phiR>0&&m.phiR<90);else assert.ok(m.phiR<-90&&m.phiR>-180);
 }
}));

test('All three stages remain one native SVG with readable labels and preserve model quantities',()=>run((a,r,s)=>{
 for(const width of [300,900])for(const side of ['outside','inside']){
  s.getBoundingClientRect=()=>({left:0,top:0,width,height:500});let previous;
  for(const step of [1,2,3]){
   const m=set(a,r,1.2,1,side,step);if(previous){near(m.FH,previous.FH);near(m.FV,previous.FV);near(m.V,previous.V);}previous=m;
   near(m.zH,1.7490196078431373);near(m.xV,.4700988175567786);near(m.zV,1.0052447654394376);
   assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelectorAll('canvas,image,foreignObject,img').length,0);assert.equal(r.querySelectorAll('input[type=range]').length,2);assert.equal(r.querySelectorAll('.cp-result>div').length,3);assert.equal(r.querySelectorAll('[data-cp-step][aria-pressed=true]').length,1);
   assert.equal(s.querySelector('#cp-control-volume')!==null,step>=2);assert.equal(s.querySelector('#cp-force-resultant')!==null,step===3);
   for(const t of s.querySelectorAll('text')){const owner=t.closest('[font-size]');assert.ok(owner&&+owner.getAttribute('font-size')>=16);}
  }
 }
}));

test('Rasterized real-fluid paths occupy the correct side of the circle and never fill the outside auxiliary volume',async()=>{
 const a=load(6),r=a.w.document.getElementById('widget-curved-pressure'),s=r.querySelector('svg');
 try{for(const [h,R]of [[0,.4],[1.2,1],[3,1.8]])for(const side of ['outside','inside']){
  s.getBoundingClientRect=()=>({left:0,top:0,width:300,height:500});const m=set(a,r,h,R,side,2),g=m.geometry,fluid=s.querySelector('#cp-real-fluid');
  const xml=`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="${Math.ceil(g.height)}"><path d="${fluid.getAttribute('d')}" fill="#17324b"/></svg>`,{data,info}=await sharp(Buffer.from(xml)).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const wet=(x,y)=>data[(Math.round(y)*info.width+Math.round(x))*4+3]>200;
  const above=[g.cx-.5*g.r,g.cy+.3*g.r],below=[g.cx-.5*g.r,g.cy+.95*g.r],left=[g.lx-20,g.cy+.5*g.r];
  assert.equal(wet(...above),side==='inside','above arc belongs only to inside water');assert.equal(wet(...below),side==='outside','below arc belongs only to outside water');assert.equal(wet(...left),side==='outside','left chamber exists only in outside case');assert.equal(wet(g.cx-.5*g.r,g.sy-8),false);
  assert.ok(s.querySelector('#cp-container-walls').getAttribute('d').includes('V'));
 }}finally{a.dom.window.close();}
});
