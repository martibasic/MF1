const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const close=(a,b,tol=1e-9)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
function fixture(fn){const a=load(5);try{const root=a.w.document.getElementById('v5-z48-container');fn(a,root,value=>a.change(root.querySelector('#v5-z48-s-slider'),value));a.scan('asymmetric triangle');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function quadrature(s){
  // Integrate horizontal strips bounded by the two straight edges, independently of the widget formulas.
  let area=0,ax=0,az=0,sxz=0,szz=0,F=0,Mx=0,Mz=0;
  const dz=3/30000;
  for(let i=0;i<30000;i++){
    const z=(i+.5)*dz,left=s+(-1.5-s)*z/3,right=s+(1.5-s)*z/3,dA=(right-left)*dz,x=(left+right)/2,dF=9.81*z*dA;
    area+=dA;ax+=x*dA;az+=z*dA;sxz+=x*z*dA;szz+=z*z*dA;F+=dF;Mx-=z*dF;Mz+=x*dF;
  }
  const xT=ax/area,zT=az/area;
  return{area,xT,zT,Sxz:sxz,IxzT:sxz-area*xT*zT,IxxT:szz-area*zT*zT,F,signedMx:Mx,signedMz:Mz,xF:Mz/F,zF:-Mx/F};
}

test('Asymmetric gate: strip integration separates the raw and centroidal products and both signed torques',()=>fixture((a,r,set)=>{
  for(const offset of [-1.5,-.8,-.05,0,.05,.8,1.5]){
    set(offset);const m=r.mf1Physics,q=quadrature(offset);
    for(const key of ['area','xT','zT','Sxz','IxzT','IxxT','F','xF','zF'])close(m[key],q[key],1e-8);
    close(m.signedMomentX,q.signedMx,1e-8);close(m.signedMomentZ,q.signedMz,1e-8);
    close(m.Ixz,m.IxzT);close(m.IxzT,m.Sxz-m.area*m.xT*m.zT);close(m.dx,m.IxzT/(m.area*m.zT));
    close(m.momentX,-m.signedMomentX);close(m.pressureFirstMomentZ,m.momentX);
    close(m.F,88.29);close(m.zF,2.25);close(m.signedMomentX,-198.6525);close(m.pressureBottom,29430);
  }
}));

test('Every slider position activates exactly one physical sign branch; small eccentricity retains millimetres',()=>fixture((a,r,set)=>{
  for(let i=-30;i<=30;i++){
    set(i*.05);const m=r.mf1Physics,active=r.querySelectorAll('#v5-z48-explainer li[data-active=true]');
    assert.equal(active.length,1);assert.equal(+active[0].dataset.branch,i<0?0:i>0?2:1);
    assert.equal(Math.sign(m.dx),-Math.sign(m.s)||0);close(m.F,88.29);close(m.zF-m.zT,.25);
  }
  set(.05);assert.match(r.querySelector('#v5-z48-dx').textContent,/−?[-]?4,1667 mm/);close(r.mf1Physics.dx,-1/240);
  set(0);assert.equal(r.querySelector('#v5-z48-dx').textContent,'0 m');assert.doesNotMatch(r.querySelector('#v5-z48-integrals').textContent,/-0\b/);
}));

test('Native vector gate preserves isotropic geometry, pressure bands, the median and exact T/CP positions',()=>fixture((a,r,set)=>{
  const svg=r.querySelector('#v5-z48-canvas');assert.equal(svg.localName,'svg');assert.equal(svg.dataset.mf1Vector,'true');assert.equal(r.querySelectorAll('canvas,image,foreignObject').length,0);assert.equal(r.querySelectorAll('input[type=range]').length,1);
  const xy=e=>e.getAttribute('points').split(/[ ,]+/).map(Number);
  for(const width of [900,340]){
    Object.defineProperty(r,'clientWidth',{configurable:true,value:width});a.w.dispatchEvent(new a.w.Event('resize'));
    for(const offset of [-1.5,-.05,0,.05,1.5]){
      set(offset);const m=r.mf1Physics,p=xy(svg.querySelector('[data-z48-triangle]'));
      close(p[0],m.originX+offset*m.scale);close(p[1],m.originY);close((p[4]-p[2])/m.b,(p[3]-p[1])/m.h);
      for(const [selector,x,z] of [['[data-z48-centroid]',m.xT,m.zT],['[data-z48-pressure-center]',m.xF,m.zF]]){
        const c=svg.querySelector(selector);close(+c.getAttribute('cx'),m.originX+x*m.scale);close(+c.getAttribute('cy'),m.originY+z*m.scale);
        close(x,offset*(1-z/m.h));
      }
      const median=svg.querySelector('[data-z48-median]');close(+median.getAttribute('x1'),p[0]);close(+median.getAttribute('y1'),p[1]);close(+median.getAttribute('x2'),m.originX);close(+median.getAttribute('y2'),m.originY+3*m.scale);
      const xa=svg.querySelector('[data-z48-centroid-x]'),za=svg.querySelector('[data-z48-centroid-z]');close(+xa.getAttribute('y1'),m.centroidY);close(+xa.getAttribute('y2'),m.centroidY);close(+za.getAttribute('x1'),m.centroidX);close(+za.getAttribute('x2'),m.centroidX);
      assert.equal(svg.querySelector('[data-z48-pressure-center]').dataset.forceDirection,'+y');
      let bandArea=0;
      for(const band of svg.querySelectorAll('[data-z48-pressure-band]')){
        const pts=xy(band),z0=+band.dataset.z0,z1=+band.dataset.z1;close(+band.dataset.p0,m.rho*m.g*z0);close(+band.dataset.p1,m.rho*m.g*z1);
        const w0=(pts[2]-pts[0])/m.scale,w1=(pts[4]-pts[6])/m.scale;close(w0,z0);close(w1,z1);bandArea+=(w0+w1)*(z1-z0)/2;
      }
      close(bandArea,m.area);if(width===340){assert.equal(svg.width,360);assert.ok([...svg.querySelectorAll('text')].every(t=>+t.getAttribute('font-size')>=15));}
    }
  }
}));
