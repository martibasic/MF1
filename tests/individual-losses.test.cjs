const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const near=(a,b,tol=1e-9)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
function fixture(fn){const a=load(10);try{const r=a.w.document.getElementById('v10-loss-explorer'),set=(id,v)=>a.change(r.querySelector('#v10x-'+id),v);fn(a,r,set);a.scan('individual losses');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function active(r){const rows=r.querySelectorAll('#v10x-explain li[data-active=true]');assert.equal(rows.length,1);return +rows[0].dataset.branch;}
const pathNumbers=el=>el.getAttribute('d').match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi).map(Number);

test('Losses: independent wall-force balance, local pressure work and calibrated values',()=>fixture((a,r,set)=>{
 let s=r.mf1LossState;near(s.v,1.5278874536821951);near(s.hf,1.041098400728681);near(s.hloc,.4164393602914724);near(s.hL,1.4575377610201534);near(s.dp,14269.84854473647);near(s.power,171.23818253683765);
 for(const Q of [2,12,30])for(const D of [50,100,160])for(const L of [5,35,90]){
  set('q',Q);set('d',D);set('l',L);s=r.mf1LossState;
  const wallStress=s.lambda*s.rho*s.v*s.v/8,wallForce=wallStress*Math.PI*s.d*s.l,pressureFriction=wallForce/s.a,pressureLocal=s.zeta*s.rho*s.v*s.v/2;
  near(s.dp,pressureFriction+pressureLocal);near(s.power,(pressureFriction+pressureLocal)*s.q);near(s.hf,pressureFriction/(s.rho*s.g));near(s.J,s.lambda*s.v*s.v/(2*s.g*s.d));active(r);
 }
 for(const [id,value]of Object.entries({q:30,d:50,l:90,lambda:.07,zeta:8}))set(id,value);s=r.mf1LossState;near(s.hL,1594.367836543278);near(s.power,468284.0093858974);assert.equal(r.querySelectorAll('.v10x-results .v10x-primary').length,3);assert.equal(r.querySelectorAll('input[type=range]').length,5);
}));

test('Changing Q moves the physical line and marker on unchanged axes; diameter and length obey separate exponents',()=>fixture((a,r,set)=>{
 set('q',12);let s=r.mf1LossState;const first={...s},marker=r.querySelector('[data-loss-marker]'),x=+marker.getAttribute('cx'),y=+marker.getAttribute('cy');set('q',24);let t=r.mf1LossState;
 near(t.hL,4*s.hL);near(t.power,8*s.power);assert.equal(t.axisDepth,s.axisDepth);assert.equal(t.plotMax,s.plotMax);assert.equal(t.vmax,s.vmax);near(+r.querySelector('[data-loss-marker]').getAttribute('cx')-t.plotX0,2*(x-s.plotX0));near(t.plotY1-+r.querySelector('[data-loss-marker]').getAttribute('cy'),4*(s.plotY1-y));assert.equal(active(r),1);
 set('q',12);set('d',80);s=r.mf1LossState;set('d',160);t=r.mf1LossState;near(t.hf,s.hf/32);near(t.hloc,s.hloc/16);near(t.kf/t.kl,s.kf/s.kl/2);
 set('l',20);s=r.mf1LossState;set('l',40);t=r.mf1LossState;near(t.hf,2*s.hf);near(t.hloc,s.hloc);near(t.J,s.J);assert.ok(first.hL>0);
}));

test('Exact critical-length preset and four exclusive coefficient branches survive small nonzero losses',()=>fixture((a,r,set)=>{
 const b=r.querySelector('#v10x-equal');assert.equal(b.disabled,false);b.click();let s=r.mf1LossState;near(s.l,14);near(s.hf,s.hloc);assert.equal(active(r),2);assert.equal(b.getAttribute('aria-pressed'),'true');assert.equal(r.querySelector('#v10x-l').step,'any');
 for(const Q of [2,30]){set('q',Q);assert.equal(active(r),2);}
 set('l',14-1e-6);assert.equal(active(r),3);set('l',14+1e-6);assert.equal(active(r),1);set('lambda',0);assert.equal(b.disabled,true);assert.equal(active(r),3);set('zeta',0);assert.equal(active(r),0);near(r.mf1LossState.hL,0);
 set('lambda',.001);set('zeta',8);assert.equal(b.disabled,true);assert.ok(r.mf1LossState.criticalLength>90);set('lambda',.07);set('zeta',.1);assert.equal(b.disabled,true);assert.ok(r.mf1LossState.criticalLength<5);
 for(const[id,value]of Object.entries({q:2,d:160,l:5,lambda:.001,zeta:0}))set(id,value);s=r.mf1LossState;assert.equal(active(r),1);near(s.hL,.00001576017185755448);assert.match(r.querySelector('#v10x-hl').textContent,/0,01576\d* mm/);assert.match(r.querySelector('#v10x-primary-sub').textContent,/0,154\d* Pa/);assert.match(r.querySelector('#v10x-power').textContent,/0,308\d* mW/);assert.ok(s.power>0);
 for(const b of r.querySelectorAll('[data-v10-preset]')){b.click();active(r);assert.equal(r.querySelectorAll('[data-v10-preset][aria-pressed=true]').length,1);}
}));

test('Native energy jump and pipe share the same coordinate; diameter and velocities retain real calibrated scales',()=>fixture((a,r,set)=>{
 assert.equal(r.querySelectorAll('canvas,image,foreignObject').length,0);assert.equal(r.querySelectorAll('svg').length,2);
 for(const width of [900,340]){Object.defineProperty(r,'clientWidth',{configurable:true,value:width});a.w.dispatchEvent(new a.w.Event('resize'));let fixed;
  for(const Q of [2,30])for(const D of [50,160]){
   set('q',Q);set('d',D);const s=r.mf1LossState,pipe=r.querySelector('[data-loss-pipe]'),velocity=r.querySelector('[data-loss-velocity] line'),jump=r.querySelector('#v10x-local-drop'),egl=pathNumbers(r.querySelector('#v10x-egl')),hgl=pathNumbers(r.querySelector('#v10x-hgl'));
   near(+pipe.getAttribute('height'),s.d*s.diameterScale);near(+pipe.getAttribute('y')+ +pipe.getAttribute('height')/2,s.center);near(+velocity.getAttribute('x2')-+velocity.getAttribute('x1'),s.v*s.velocityScale);assert.ok(+velocity.getAttribute('x2')<s.machineX-12);if(fixed!==undefined)assert.equal(s.velocityScale,fixed);fixed=s.velocityScale;
   near(+jump.getAttribute('x1'),s.plotLeft+s.machineXi*(s.plotRight-s.plotLeft));near(+jump.getAttribute('x1'),s.machineX);near(+jump.getAttribute('y2')-+jump.getAttribute('y1'),s.hloc*s.headScale);near(egl[4],egl[2]);near(egl[5]-egl[3],s.hloc*s.headScale);near(egl[7]-egl[1],s.hL*s.headScale);for(let i=1;i<hgl.length;i+=2)near(hgl[i]-egl[i],s.vh*s.headScale);
   const lossSlope=(s.profile[1].H-s.profile[0].H)/(s.machineXi*s.l);near(lossSlope,-s.J);near(s.profile[3].H,-s.hL);if(width===340){assert.equal(s.svgWidth,360);assert.ok([...r.querySelectorAll('svg text')].every(t=>+t.getAttribute('font-size')>=20));}
  }
 }
}));
