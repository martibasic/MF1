const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const close=(a,b,t=1e-9)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} != ${b}`);
const pathNumbers=el=>el.getAttribute('d').match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi).map(Number);
function oneBranch(root){const rows=root.querySelectorAll('.mf1-decision li[data-branch]');assert.ok(rows.length>=2);assert.equal(root.querySelectorAll('.mf1-decision li[data-active="true"]').length,1);}
function page(n,fn){const a=load(n);try{a.frames(2);fn(a);a.scan('professor checks');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}

test('V9 energy: continuity and signed machine/loss work close the same head balance',()=>page(9,a=>{
 const r=a.w.document.getElementById('v9-egl-source'),q=id=>r.querySelector('#'+id);
 for(const mode of['ideal','pump','loss']){
  r.querySelector(`[data-e-mode="${mode}"]`).click();a.change(q('e-d2'),.08);a.change(q('e-v1'),2.2);
  const s=r.mf1EnergyState;
  close(s.Q,Math.PI*s.d2**2/4*s.v2);close(s.hgl1+s.v1**2/19.62,s.h1);close(s.hgl2+s.v2**2/19.62,s.h2);
  close(s.h1+s.hp-s.hL,s.h2);close((s.p2-s.p1)/(s.rho*9.81),(s.v1**2-s.v2**2)/19.62+s.hp-s.hL);
  oneBranch(r);assert.ok(q('e-height-axis').querySelectorAll('text').length>=3);
 }
 a.change(q('e-z'),0);const horizontal=r.mf1EnergyState;a.change(q('e-z'),2);const uphill=r.mf1EnergyState;
 close(uphill.h2,horizontal.h2);close(uphill.p2-horizontal.p2,-uphill.rho*9.81*2);close(uphill.p2/(uphill.rho*9.81)+uphill.z2,uphill.hgl2);oneBranch(r);
}));

test('V9 jet: complementary apertures exchange flight factors and conserve ballistic energy',()=>page(9,a=>{
 const r=a.w.document.getElementById('v9-z76'),h=r.querySelector('#z76-r');
 const states=[];
 for(const ratio of[.25,.5,.75]){
  a.change(h,ratio);const s=r.mf1JetState;states.push(s);
  close(s.x,s.v*s.t);close(.5*s.v*s.v+9.81*s.h,9.81*s.H);
  for(const tau of[0,s.t/3,s.t])close(.5*(s.v*s.v+(9.81*tau)**2)+9.81*(s.h-.5*9.81*tau*tau),9.81*s.H);
  const curve=pathNumbers(r.querySelector('#z76-main-path')),g=s.geometry;
  close(curve[0],g.x0);close(curve[1],g.hole);close(curve[2],g.x0+s.x*g.scale/2);close(curve[3],g.hole);close(curve[4],g.x0+s.x*g.scale);close(curve[5],g.base);oneBranch(r);
 }
 close(states[0].x,states[2].x);assert.ok(states[0].v>states[2].v&&states[0].t<states[2].t);close(states[1].x,states[1].H);
}));

test('V9 siphon: crest controls pressure independently of flow; impossible fixed loss is distinguished',()=>page(9,a=>{
 const r=a.w.document.getElementById('v9-siphon'),q=id=>r.querySelector('#s-'+id);
 a.change(q('crest'),1);const first=r.mf1SiphonState;a.change(q('crest'),5);const last=r.mf1SiphonState;
 close(first.v,last.v);close(first.pabs-last.pabs,first.rho*9.81*4);oneBranch(r);
 a.change(q('drop'),8);a.change(q('crest'),6);assert.ok(r.mf1SiphonState.cav);oneBranch(r);
 r.querySelector('[data-s-mode="k"]').click();let s=r.mf1SiphonState;close(s.drop,s.v*s.v/19.62+s.hl);close(s.pabs+s.rho*9.81*(s.crest+s.v*s.v/19.62+s.hl1),s.patm);assert.equal(s.pv,null);oneBranch(r);
 r.querySelector('[data-s-mode="fixed"]').click();a.change(q('drop'),.5);a.change(q('l1'),5);a.change(q('l2'),5);assert.equal(r.mf1SiphonState.valid,false);assert.ok(r.querySelector('#s-main').textContent.includes('nema'));oneBranch(r);
}));

test('V10 losses: doubled flow gives four times lost head and eight times dissipated power',()=>page(10,a=>{
 const r=a.w.document.getElementById('v10-loss-explorer'),q=id=>r.querySelector('#v10x-'+id);
 a.change(q('q'),10);const s=r.mf1LossState;a.change(q('q'),20);let t=r.mf1LossState;
 close(t.hL,4*s.hL);close(t.power,8*s.power);close(t.power,t.rho*t.g*t.q*t.hL);oneBranch(r);
 a.change(q('l'),2*s.l);const u=r.mf1LossState;close(u.hf,2*t.hf);close(u.hloc,t.hloc);
 a.change(q('lambda'),0);a.change(q('zeta'),0);close(r.mf1LossState.hL,0);oneBranch(r);
}));

test('V10 Pitot: hydrostatic density correction and quadratic dynamic pressure agree',()=>page(10,a=>{
 const r=a.w.document.getElementById('v10-z90-lab'),h=r.querySelector('#v10-z90-h');
 a.change(h,100);const s=r.mf1PitotState;a.change(h,25);const t=r.mf1PitotState;
 close(s.v,2*t.v);close(s.dp,.5*s.rho*s.v*s.v);close(s.dp+s.rho*9.81*s.h,s.rhoHg*9.81*s.h);
 close(s.naiveVelocity/s.v,Math.sqrt(13600/12600));oneBranch(r);
 a.change(h,0);close(r.mf1PitotState.q,0);oneBranch(r);
}));

test('V10 open channel: endpoint energy, critical minimum and branch compatibility stay distinct',()=>page(10,a=>{
 const r=a.w.document.getElementById('v10-z93-lab'),q=id=>r.querySelector('#v10-z93-'+id);
 for(const d of[.02,.12,.5]){
  a.change(q('h'),1.4);a.change(q('delta'),.25);a.change(q('d'),d);const s=r.mf1ChannelState;
  close(s.v1*s.h,s.v2*s.a2);close(s.E1,s.E2+s.delta);close(s.q*s.q/9.81,s.yc**3);
  const E=y=>y+s.q*s.q/(2*9.81*y*y);assert.ok(E(s.yc*.99)>E(s.yc));assert.ok(E(s.yc*1.01)>E(s.yc));
  assert.equal(s.continuous,s.Fr2<=1+1e-8);oneBranch(r);
 }
 // Solve Fr2=1 independently using the critical specific-energy condition.
 const H=1.4,delta=.25;let lo=.02,hi=.5;
 for(let k=0;k<70;k++){const d=(lo+hi)/2,y=H-d-delta,q2=2*9.81*d/(1/y**2-1/H**2);if(q2/(9.81*y**3)>1)hi=d;else lo=d;}
 a.change(q('d'),(lo+hi)/2);close(r.mf1ChannelState.Fr2,1);oneBranch(r);assert.ok(r.querySelector('[data-active="true"]').textContent.includes('Fr₂ = 1'));
 a.change(q('h'),.6);a.change(q('d'),.5);a.change(q('delta'),.65);assert.equal(r.mf1ChannelState.valid,false);oneBranch(r);
}));

test('V11 momentum: pressure and momentum branches close and vector diagrams use one scale per quantity',()=>page(11,a=>{
 const r=a.w.document.getElementById('v11-momentum-lab'),q=id=>r.querySelector('#v11m-'+id);
 a.change(q('alpha'),30);a.change(q('p1'),0);let s=r.mf1MomentumState;assert.ok(s.rx>0);oneBranch(r);
 const threshold=s.dpx/s.A1/1000;a.change(q('p1'),threshold);s=r.mf1MomentumState;close(s.rx,0);oneBranch(r);
 a.change(q('p1'),250);s=r.mf1MomentumState;assert.ok(s.rx<0);close(s.pA+s.rx,s.beta*s.mdot*(s.v2x-s.v1));close(s.rz,s.beta*s.mdot*s.v2z);oneBranch(r);
 const v1=pathNumbers(q('loc-v1')),v2=pathNumbers(q('loc-v2')),dv=pathNumbers(q('loc-dv'));
 close(v1[2]-v1[0],s.v1*s.velocityScale);close(v2[2]-v2[0],s.v2x*s.velocityScale);close(v2[3]-v2[1],-s.v2z*s.velocityScale);close(dv[0],v1[2]);close(dv[2],v2[2]);
 const P=pathNumbers(q('force-p')),R=pathNumbers(q('force-r')),M=pathNumbers(q('force-m'));close(R[0],P[2]);close(R[2],M[2]);close(R[3],M[3]);close(s.residual,0);
 for(const b of r.querySelectorAll('[data-v11m-view]')){b.click();assert.equal(r.querySelectorAll('[data-v11m-panel]:not([hidden])').length,1);}
}));

test('V11 drainage: flux integral equals lost volume through start, partial and empty branches',()=>page(11,a=>{
 const r=a.w.document.getElementById('v11-z97-lab'),time=r.querySelector('#v11-z97-time');
 const initial=r.mf1DrainState;close(initial.initialVolume,initial.A*initial.h0);oneBranch(r);
 let volume=0,last=initial.q;const N=50;
 for(let i=1;i<=N;i++){a.change(time,initial.T*i/N);const s=r.mf1DrainState;volume+=(last+s.q)/2*initial.T/N;last=s.q;close(s.remainingVolume+s.dischargedVolume,s.initialVolume);oneBranch(r);}
 close(volume,initial.initialVolume);close(r.mf1DrainState.remainingVolume,0);a.change(time,initial.T/2);close(r.mf1DrainState.h,initial.h0/4);
}));

test('V11 wind disk: mass, thrust and useful power close without substituting upstream mass flux',()=>page(11,a=>{
 const r=a.w.document.getElementById('v11-z103-lab'),v=r.querySelector('#v11-z103-v');
 a.change(v,3);const s=r.mf1WindState;a.change(v,6);const t=r.mf1WindState;
 for(const x of[s,t]){close(x.vd,(x.vi+x.v2)/2);close(x.F,x.mdot*(x.vi-x.v2));close(x.p,x.F*x.vd);close(x.eta,x.CT*(1-x.induction));close(x.CT,4*x.induction*(1-x.induction));assert.ok(x.mdot<x.rho*x.A*x.vi);}
 close(t.F,4*s.F);close(t.p,8*s.p);oneBranch(r);
 const cp=r.querySelector('#v11-z103-cp');a.change(cp,0);close(r.mf1WindState.F,0);close(r.mf1WindState.p,0);oneBranch(r);
 a.change(cp,16/27);close(r.mf1WindState.induction,1/3,1e-6);oneBranch(r);
 a.change(cp,.7);assert.equal(r.mf1WindState.valid,false);assert.ok(r.querySelector('#v11-z103-F').textContent.includes('nema'));oneBranch(r);
 a.change(cp,.3);assert.equal(r.mf1WindState.valid,true);oneBranch(r);
}));
