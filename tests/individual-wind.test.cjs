const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {load}=require('./widget-harness.cjs');
const near=(a,b,tol=1e-9)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
function fixture(fn){const a=load(11);try{const r=a.w.document.getElementById('v11-z103-lab'),set=(id,v)=>a.change(r.querySelector('#v11-z103-'+id),v);fn(a,r,set);a.scan('individual wind');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function branch(r){const rows=r.querySelectorAll('#v11-z103-why li[data-active=true]');assert.equal(rows.length,1);return +rows[0].dataset.branch;}

test('Wind: exact original 400 W calibration and independent far-field kinetic-energy and pressure-force balances',()=>fixture((a,r,set)=>{
 let s=r.mf1WindState;near(s.cp,.2768125951678511);near(s.induction,.08214420875944053);near(s.vd,2.872888626582951);near(s.v2,2.615777253165902);near(s.F,139.232685979792);near(s.p,400);near(s.pBefore,.92604656355,1e-10);near(s.pAfter,-.846719053542,1e-10);
 for(const induction of [0,.05,.15,1/3])for(const vi of [1.5,3.13,8])for(const D of [5,20]){
  const cp=induction===1/3?16/27:4*induction*(1-induction)**2;set('cp',cp);set('v',vi);set('D',D);s=r.mf1WindState;near(s.induction,induction);assert.equal(s.valid,true);
  const inletMass=s.rho*s.Aup*s.vi,outletMass=s.rho*s.Awake*s.v2,kineticIn=.5*s.rho*s.Aup*s.vi**3,kineticOut=.5*s.rho*s.Awake*s.v2**3;
  near(inletMass,outletMass);near(inletMass,s.mdot);near(s.p,kineticIn-kineticOut);near(s.F,inletMass*s.vi-outletMass*s.v2);near(s.p,(s.pBefore-s.pAfter)*s.A*s.vd);near(s.pBefore+.5*s.rho*s.vd*s.vd,.5*s.rho*s.vi*s.vi);near(s.pAfter+.5*s.rho*s.vd*s.vd,.5*s.rho*s.v2*s.v2);branch(r);
 }
}));

test('Wind: the shared inverse has exact zero and Betz endpoints, with no tolerance accepting impossible Cp',()=>fixture((a,r,set)=>{
 assert.equal(r.querySelector('#v11-z103-cp').step,'any');const zero=a.w.MF1.actuatorDisk(1.2,78.5,3.13,0),limit=a.w.MF1.actuatorDisk(1.2,78.5,3.13,16/27);assert.equal(zero.a,0);assert.equal(zero.force,0);assert.equal(zero.power,0);assert.equal(limit.a,1/3);assert.equal(a.w.MF1.actuatorDisk(1.2,78.5,3.13,16/27+Number.EPSILON),null);
 set('cp',0);let s=r.mf1WindState;assert.equal(s.F,0);assert.equal(s.p,0);near(s.Aup,s.A);near(s.Awake,s.A);assert.equal(branch(r),0);assert.equal(r.querySelectorAll('[data-wind-force]').length,0);
 r.querySelector('#v11-z103-betz').click();s=r.mf1WindState;assert.equal(s.cp,16/27);assert.equal(s.induction,1/3);near(s.vd,2*s.vi/3);near(s.v2,s.vi/3);near(s.Aup,2*s.A/3);near(s.Awake,2*s.A);assert.equal(branch(r),2);assert.equal(r.querySelector('#v11-z103-betz').getAttribute('aria-pressed'),'true');
 r.querySelector('#v11-z103-cp').value='0.592592592592593';set('v',8);assert.equal(r.mf1WindState.cp,16/27,'an exact preset survives range serialization on unrelated inputs');assert.equal(branch(r),2);
 set('cp',16/27-1e-10);assert.equal(branch(r),1);set('cp',16/27+1e-10);s=r.mf1WindState;assert.equal(branch(r),3);assert.equal(s.valid,false);assert.equal(s.F,null);assert.equal(s.vd,null);assert.equal(s.v2,null);assert.equal(s.p,null);assert.equal(r.querySelectorAll('[data-wind-force],[data-wind-velocity],[data-wind-tube]').length,0);assert.ok(r.querySelector('[data-wind-curve=power]').getAttribute('stroke-dasharray'));assert.match(r.querySelector('#v11-z103-F').textContent,/nema/);
 set('cp',.3);assert.equal(r.mf1WindState.valid,true);assert.equal(branch(r),1);
}));

test('Wind: doubling speed and diameter changes force and power without hidden vector normalization',()=>fixture((a,r,set)=>{
 const first=r.mf1WindState;r.querySelector('#v11-z103-double').click();let s=r.mf1WindState;near(s.p,3200);near(s.F,4*first.F);near(s.p,8*first.p);assert.equal(s.powerAxisMax,first.powerAxisMax);assert.equal(s.forceScale,first.forceScale);assert.equal(s.velocityScale,first.velocityScale);assert.equal(s.radialScale,first.radialScale);assert.equal(r.querySelector('#v11-z103-double').getAttribute('aria-pressed'),'true');
 set('D',20);const big=r.mf1WindState;near(big.F,4*s.F);near(big.p,4*s.p);near(big.rDisk,2*s.rDisk);near(big.rWake,2*s.rWake);near(big.powerAxisMax,4*s.powerAxisMax);
 set('v',8);r.querySelector('#v11-z103-betz').click();s=r.mf1WindState;near(s.F,10723.30292425316);near(s.CT,8/9);assert.equal(s.forceScale,first.forceScale);assert.equal(s.velocityScale,first.velocityScale);assert.equal(s.radialScale,first.radialScale);
 r.querySelector('#v11-z103-base').click();near(r.mf1WindState.p,400);assert.equal(r.querySelector('#v11-z103-base').getAttribute('aria-pressed'),'true');
}));

test('Wind: native meridional radii, action-reaction vectors and power markers have quantitative fixed geometry',()=>fixture((a,r,set)=>{
 assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelectorAll('canvas,image,foreignObject').length,0);assert.equal(r.querySelectorAll('.v11x-results .v11x-value').length,3);assert.equal(r.querySelectorAll('input[type=range]').length,3);
 for(const width of [900,340]){Object.defineProperty(r,'clientWidth',{configurable:true,value:width});a.w.dispatchEvent(new a.w.Event('resize'));
  for(const cp of [0,.2,16/27])for(const D of [5,20]){
   set('cp',cp);set('D',D);set('v',8);const s=r.mf1WindState,svg=r.querySelector('svg');near(s.rDisk,s.dia*s.radialScale/2);near(s.rUp/s.rDisk,Math.sqrt(s.vd/s.vi));near(s.rWake/s.rDisk,Math.sqrt(s.vd/s.v2));
   for(const [name,area]of [['up',s.Aup],['disk',s.A],['wake',s.Awake]]){const section=svg.querySelector('[data-wind-section='+name+']');near((+section.getAttribute('y2')-+section.getAttribute('y1'))/2,Math.sqrt(area/Math.PI)*s.radialScale);}
   for(const [name,v]of [['up',s.vi],['disk',s.vd],['wake',s.v2]]){const line=svg.querySelector('[data-wind-velocity='+name+'] line');near(+line.getAttribute('x2')-+line.getAttribute('x1'),v*s.velocityScale);near(+line.getAttribute('y1'),s.centerY);assert.ok(+line.getAttribute('x2')<s.svgWidth-15);}
   if(s.F>0){const air=svg.querySelector('[data-wind-force=air] line'),support=svg.querySelector('[data-wind-force=support] line');near(+air.getAttribute('x1'),+support.getAttribute('x1'));near(+air.getAttribute('y1'),+support.getAttribute('y1'));near(+air.getAttribute('x2')-+air.getAttribute('x1'),s.F*s.forceScale);near(+support.getAttribute('x2')-+support.getAttribute('x1'),-s.F*s.forceScale);assert.ok(+support.getAttribute('x2')>0&&+air.getAttribute('x2')<s.svgWidth);}
   for(const [name,P]of [['reference',s.pwind],['power',s.p]]){const marker=svg.querySelector('[data-wind-marker='+name+']');near(+marker.getAttribute('cx'),s.plotLeft+s.vi/8*(s.plotRight-s.plotLeft));near(+marker.getAttribute('cy'),s.plotBottom-P/s.powerAxisMax*(s.plotBottom-s.plotTop));}
   if(width===340){assert.equal(s.svgWidth,360);assert.ok([...svg.querySelectorAll('text')].every(t=>+t.getAttribute('font-size')>=20));}assert.ok(svg.querySelector('tspan[baseline-shift=sub]'));
  }
 }
 const source=fs.readFileSync('vjezba_11.qmd','utf8'),start=source.indexOf('aria-labelledby="z103-svg-title"'),staticFigure=source.slice(start,source.indexOf('</svg>',start));assert.match(staticFigure,/ry="80"/);assert.match(staticFigure,/M80 78\.356/);assert.match(source,/R₁\/R = 0,95805 i R₂\/R = 1,04799/);
}));
