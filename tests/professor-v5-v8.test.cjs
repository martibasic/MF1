const test = require('node:test');
const assert = require('node:assert/strict');
const {load} = require('./widget-harness.cjs');

function near(actual, expected, tolerance = 1e-8) {
  assert.ok(Number.isFinite(actual), 'finite physical result');
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)), `${actual} ≈ ${expected}`);
}
function run(n, fn) {
  const a = load(n);
  try { fn(a, a.w.document); a.scan('professor verification'); assert.deepEqual(a.errors, []); }
  finally { a.dom.window.close(); }
}
function set(a, d, id, value) { a.change(d.getElementById(id), value); }
function active(root) {
  const branches = root.querySelectorAll('.mf1-decision li[data-active="true"]');
  assert.equal(branches.length, 1, 'one physically selected branch');
  return +branches[0].dataset.branch;
}
function quarter(h, R, rho = 1000, n = 20000) {
  let fx = 0, fv = 0, mz = 0, mx = 0;
  const dt = Math.PI / (2 * n);
  for (let i = 0; i < n; i++) {
    const t = Math.PI / 2 + (i + .5) * dt, z = h + R * Math.sin(t);
    const df = rho * 9.81 * z * R * dt / 1000;
    const dx = -df * Math.cos(t), up = df * Math.sin(t);
    fx += dx; fv += up; mz += z * dx; mx += -R * Math.cos(t) * up;
  }
  return {fx, fv, zH: mz / fx, xV: mx / fv};
}

test('V5 plane: pressure integration recovers force, center and hinge moment for all four shapes', () => run(5, (a,d) => {
  const root=d.getElementById('v5-lab-v5');
  const profiles={rect:{h:3.5,width:()=>5},tri:{h:3.5,width:y=>5*y/3.5},circle:{h:3,width:y=>2*Math.sqrt(2.25-(y-1.5)**2)},semi:{h:1.5,width:y=>2*Math.sqrt(2.25-y*y)}};
  for(const shape of Object.keys(profiles)) for(const angle of [0,45,90]) {
    a.w.v5_setShape(shape);set(a,d,'v5-v5-a-slider',angle);
    const m=root.mf1Physics,p=profiles[shape],dy=p.h/12000;let force=0,moment=0;
    for(let i=0;i<12000;i++){const y=(i+.5)*dy,df=9.81*(m.depth+y*Math.sin(angle*Math.PI/180))*p.width(y)*dy;force+=df;moment+=df*y;}
    near(m.F,force,2e-6);near(m.moment,moment,2e-6);near(m.zF,m.depth+(moment/force)*Math.sin(angle*Math.PI/180),2e-6);
    near(Math.hypot(m.FH,m.FV),m.F);assert.equal(active(root),angle===0?0:1);
  }
}));

test('Z41: triangular and trapezoidal pressures close both support-force and hinge-moment balances', () => run(5, (a,d) => {
  const root=d.getElementById('v5-z41-container');set(a,d,'v5-z41-h1-slider',3);
  for(const [level,branch] of [[1,0],[3,1],[5,2]]) {
    set(a,d,'v5-z41-h2-slider',level);const m=root.mf1Physics;let force=0,moment=0;const dy=3/12000;
    for(let i=0;i<12000;i++){const belowHinge=(i+.5)*dy,depth=Math.max(0,level-3+belowHinge),df=9.81*depth*6*dy;force+=df;moment+=df*belowHinge;}
    near(m.force,force,1e-7);near(m.Rb*3,moment,1e-7);near(m.Rb+m.hingeForce,force,1e-7);assert.equal(active(root),branch);
  }
}));

test('Z48: the asymmetric triangle pressure moment gives the signed lateral center shift', () => run(5, (a,d) => {
  const root=d.getElementById('v5-z48-container');
  for(const [offset,branch] of [[-1.2,0],[0,1],[1.2,2]]) {
    set(a,d,'v5-z48-s-slider',offset);const m=root.mf1Physics;let F=0,Mx=0,Mz=0;const dz=3/20000;
    for(let i=0;i<20000;i++){const z=(i+.5)*dz,width=z,x=offset*(1-z/3),df=9.81*z*width*dz;F+=df;Mx+=z*df;Mz+=x*df;}
    near(m.F,F,1e-8);near(m.zF,Mx/F,1e-8);near(m.xF,Mz/F,1e-8);near(m.dx,m.Ixz/(m.area*m.zT));assert.equal(active(root),branch);
  }
}));

test('V6 quarter: independent pressure quadrature verifies both lines of action and reversal of the wetted side', () => run(6, (a,d) => {
  const root=d.getElementById('widget-curved-pressure');
  for(const h of [0,1.2,3]) for(const R of [.4,1,1.8]) for(const side of ['outside','inside']) {
    set(a,d,'cp-h',h);set(a,d,'cp-r',R);root.querySelector(`[data-cp-side="${side}"]`).click();
    const m=root.mf1Physics,n=quarter(h,R),sign=side==='inside'?-1:1;
    near(m.FH,sign*n.fx,2e-8);near(m.FV,sign*n.fv,2e-8);near(m.zH,n.zH,2e-8);near(m.xV,n.xV,2e-8);near(m.momentAboutC,0);assert.equal(active(root),side==='inside'?1:0);
  }
}));

test('Z49: opening threshold agrees with a root of the integrated pressure torque', () => run(6, (a,d) => {
  const root=d.getElementById('widget-49');
  for(const weight of [15,37.9,80]) {
    set(a,d,'z49-gc',weight);const m=root.mf1Physics,n=quarter(m.H-m.R,m.R,m.rho);
    near(m.netMoment,(n.fv-weight)*m.R,2e-8);
    let lo=m.R,hi=20;for(let i=0;i<35;i++){const mid=(lo+hi)/2;if(quarter(mid-m.R,m.R,m.rho,1000).fv>weight)hi=mid;else lo=mid;}
    near(m.criticalLevel,(lo+hi)/2,2e-7);assert.equal(active(root),m.netMoment<0?0:2);
  }
  set(a,d,'z49-gc',root.mf1Physics.FV);assert.equal(active(root),1);
}));

test('Z55: both manometer columns and all three force regimes obey the same pressure balance', () => run(6, (a,d) => {
  const root=d.getElementById('widget-55');
  for(const [h,branch] of [[.05,2],[.2,0]]) {set(a,d,'z55-h',h);const m=root.mf1Physics;near(m.p,1000*m.relativeDensity*9.81*m.h1);near(m.F+m.G,m.p*Math.PI*m.D*m.D/4);near(m.residual,0);assert.equal(active(root),branch);}
  const before=root.mf1Physics;set(a,d,'z55-rm',3);near(root.mf1Physics.F,before.F);assert.ok(root.mf1Physics.h1<before.h1);
  set(a,d,'z55-h',root.mf1Physics.neutralDepth);assert.equal(active(root),1);
}));

test('V7 closed cylinder: absolute pressure changes with depth, its difference and integral buoyancy do not', () => run(7, (a,d) => {
  const root=d.getElementById('widget-submerged-sym');let previous;
  for(const depth of [1.2,2.5,5]) {set(a,d,'symz',depth);const m=root.mf1Physics;near(m.force,9.81*Math.PI);near(m.deltaP,19.62);near(m.fx,0);if(previous)assert.ok(m.pTop>previous.pTop);previous=m;}
  for(const step of [1,2,3]){root.querySelector(`[data-k="${step}"]`).click();assert.equal(active(root),step===2?0:1);}
}));

test('V7 general arc: dry, intersected and fully wet regimes agree with quadrature and partial-cylinder buoyancy', () => run(7, (a,d) => {
  const root=d.getElementById('v7-widget-a-container');set(a,d,'ar',1);set(a,d,'ab',1);set(a,d,'as',360);
  for(const [depth,branch,force] of [[-1.5,0,0],[0,1,9.81*Math.PI/2],[3,2,9.81*Math.PI]]){set(a,d,'az',depth);const m=root.mf1Physics;near(-m.fzAnalytical,force);near(m.buoyancy,force);assert.equal(active(root),branch);}
  set(a,d,'a1',330);set(a,d,'as',90);set(a,d,'az',.2);const m=root.mf1Physics;let fx=0,fz=0;const dt=Math.PI/2/20000;
  for(let i=0;i<20000;i++){const t=330*Math.PI/180+(i+.5)*dt,df=-9.81*Math.max(0,.2+Math.sin(t))*dt;fx+=df*Math.cos(t);fz+=df*Math.sin(t);}
  near(m.fxAnalytical,fx,1e-8);near(m.fzAnalytical,fz,1e-8);
}));

test('V8 continuity: geometric, density and finite-tank branches preserve the relevant balance', () => run(8, (a,d) => {
  const root=d.getElementById('v8-explorer');
  set(a,d,'v8x-q',0);assert.equal(active(root),0);near(root.mf1Physics.v1,0);
  set(a,d,'v8x-q',10);for(const [D,branch] of [[80,1],[160,2],[200,3]]){set(a,d,'v8x-d2',D);const m=root.mf1Physics;near(m.a1*m.v1,m.a2*m.v2);near(m.residual,0);assert.equal(active(root),branch);}
  root.querySelector('[data-mode="density"]').click();for(const [rho,branch] of [[1200,0],[600,1],[500,2]]){set(a,d,'v8x-rho2',rho);const m=root.mf1Physics;near(m.rho1*m.q1,m.rho2*m.q2);near(m.residual,0);assert.equal(active(root),branch);}
  root.querySelector('[data-mode="tank"]').click();for(const [qin,qout,branch] of [[12,6,0],[10,10,1],[6,12,2]]){set(a,d,'v8x-qin',qin);set(a,d,'v8x-qout',qout);const m=root.mf1Physics;near(m.as*m.dh,m.qin-m.qout);near(m.residual,0);assert.equal(active(root),branch);}
  set(a,d,'v8x-qin',20);set(a,d,'v8x-qout',0);root.querySelector('.mf1-motion button').click();a.frames(1,20000);a.frames(1,20000);const end=root.mf1Physics;near(end.h,2);near(end.time,16.5);assert.equal(end.valid,false);assert.equal(active(root),3);
}));

test('Z71: density is volume-weighted while conserved mass and exit speed respond differently to density', () => run(8, (a,d) => {
  const root=d.getElementById('v8-z71');
  for(const [qa,qb,branch] of [[.15,.03,0],[.05,.05,1],[.05,.12,2]]){set(a,d,'z71-qa',qa);set(a,d,'z71-qb',qb);const m=root.mf1Physics;near(m.rc,(m.ra*qa+m.rb*qb)/(qa+qb));near(m.massResidual,0);near(m.volumeResidual,0);assert.equal(active(root),branch);}
  const before=root.mf1Physics;set(a,d,'z71-rb',600);const after=root.mf1Physics;near(after.vc,before.vc);assert.ok(after.rc<before.rc);assert.ok(after.mc<before.mc);
}));

test('Z74: uniform extraction obeys local continuity and identifies where forward flow ceases', () => run(8, (a,d) => {
  const root=d.getElementById('v8-z74');set(a,d,'z74-vp',0);assert.equal(active(root),0);near(root.mf1Physics.v2,root.mf1Physics.v1);
  set(a,d,'z74-vp',10);let m=root.mf1Physics;assert.equal(active(root),1);near(m.localQ[1],(m.q1+m.q2)/2);near(m.extractionPerLength,m.np*Math.PI*m.d1*Math.PI*m.dp*m.dp/4*m.vp);near(m.residual,0);
  set(a,d,'z74-v1',10);set(a,d,'z74-np',1600);set(a,d,'z74-dp',.012);set(a,d,'z74-l',8);set(a,d,'z74-vp',20);m=root.mf1Physics;assert.equal(active(root),3);assert.equal(m.valid,false);assert.equal(m.v2,null);assert.ok(m.criticalLength<m.L);near(m.q1-m.extractionPerLength*m.criticalLength,0);assert.ok(root.querySelector('svg').textContent.includes('Q(x) = 0'));
  set(a,d,'z74-np',0);assert.equal(root.querySelectorAll('svg [data-hole]').length,0);assert.equal(active(root),0);
}));

test('Every retained V5–V8 root keeps its decision branches after repeated identical input', () => {
  for(const n of [5,6,7,8])run(n,(a,d)=>{for(const root of d.querySelectorAll('[data-widget-role]')){const input=root.querySelector('input[type="range"]');a.change(input,input.value);a.change(input,input.value);assert.equal(root.querySelectorAll('.mf1-decision').length,1);active(root);}});
});
