const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {load}=require('./widget-harness.cjs'),S=require('../assets/mf1-science.js');
const near=(a,b,t=1e-9)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} ≈ ${b}`),nums=e=>e.getAttribute('d').match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi).map(Number);
function run(fn){const a=load(13),r=a.w.document.getElementById('z123-budget-widget'),q=id=>r.querySelector('#z123-'+id);try{fn(a,r,q);a.scan('individual pipe budget');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function set(a,r,q,Q,k=.26){a.change(q('vdot-slider'),Q);a.change(q('k-slider'),k);return r.mf1BudgetState;}
function colebrook(Re,kD){let lo=.005,hi=.2;for(let i=0;i<90;i++){const f=(lo+hi)/2,res=1/Math.sqrt(f)+2*Math.log10(kD/3.7+2.51/(Re*Math.sqrt(f)));if(res>0)lo=f;else hi=f;}return(lo+hi)/2;}

test('Independent Hagen–Poiseuille loss and kinetic flux integral give the laminar head budget, with no roughness dependence',()=>run((a,r,q)=>{
 for(const Q of[.05,.1])for(const k of[.01,.26,1]){
  const s=set(a,r,q,Q,k),Qsi=Q/1000,R=.025,N=400,dr=R/N;let integral=0;
  for(let i=0;i<=N;i++){const rr=i*dr,u=2*s.V*(1-(rr/R)**2),weight=i===0||i===N?1:i%2?4:2;integral+=weight*u**3*2*Math.PI*rr;}
  const alpha=integral*dr/3/(Math.PI*R*R*s.V**3),hlin=128*.0013*89*Qsi/(Math.PI*1000*9.81*.05**4),hloc=(1.3+alpha)*s.V*s.V/(2*9.81);
  near(alpha,2,1e-8);near(s.alpha,alpha,1e-8);near(s.lin,hlin);near(s.local,hloc);near(s.z1,4+hlin+hloc);near(s.zeta,3.3);assert.equal(s.regime,'laminarno');assert.equal(s.uncertain,false);
 }
 let s=set(a,r,q,.05);near(s.lin,.003844274895354);near(s.local,.000109067451505);assert.match(q('lin-result').textContent,/mm/);assert.match(q('local-result').textContent,/mm/);assert.match(q('hw-total').textContent,/4,003953/);const t=set(a,r,q,.1);near(t.lin,2*s.lin);near(t.local,4*s.local);
}));

test('Independent Colebrook solution preserves the original turbulent data and roughness affects only distributed loss at fixed flow',()=>run((a,r,q)=>{
 for(const Q of[6,15])for(const k of[.01,.26,1]){
  const s=set(a,r,q,Q,k),V=(Q/1000)/(Math.PI*.05**2/4),Re=1000*V*.05/.0013,f=colebrook(Re,k/1000/.05),vh=V*V/(2*9.81),head=(f*89/.05+2.36)*vh;
  near(s.Re,Re);near(s.lam,f);near(s.zeta,2.36);near(s.alpha,1.06);near(s.total,head);near(s.z1,4+head);near(s.energyResidual,0);assert.equal(s.uncertain,false);
 }
 r.querySelector('[data-z123-preset="source"]').click();let s=r.mf1BudgetState;near(s.Re,117529.8041294);near(s.lam,.031514582757386);near(s.lin,26.697788087247);near(s.local,1.123196446043);near(s.z1,31.82098453329);
 const baseline={...s};a.change(q('k-slider'),1);s=r.mf1BudgetState;assert.ok(s.lin>baseline.lin);near(s.local,baseline.local);near(s.V,baseline.V);near(s.alpha,baseline.alpha);
}));

test('Exact Reynolds presets agree with the original Moody convention and transition is explicitly an uncertain continuous estimate',()=>run((a,r,q)=>{
 for(const [preset,Re,branch,uncertain]of[['laminar-boundary',2320,1,true],['turbulent-boundary',4000,2,false]]){
  r.querySelector('[data-z123-preset="'+preset+'"]').click();let s=r.mf1BudgetState;assert.equal(s.Re,Re);assert.equal(s.uncertain,uncertain);assert.equal(+r.querySelector('.mf1-decision li[data-active=true]').dataset.branch,branch);near(s.alpha,Re===2320?2:1.06);near(s.local,(1.3+s.alpha)*s.vh);
  const central=s.total,Q=s.Q;for(const eps of[-1e-8,1e-8]){a.change(q('vdot-slider'),1000*Q*(1+eps));near(r.mf1BudgetState.total,central,1e-8);}
 }
 const s=set(a,r,q,.15);assert.equal(s.uncertain,true);assert.ok(s.alpha<2&&s.alpha>1.06);assert.match(q('hw-total').textContent,/≈/);assert.match(q('regime-values').textContent,/procjena/);assert.equal(S.pipeFriction(2320,.0052).regime,'prijelazno');assert.equal(S.pipeFriction(2320,.0052).uncertain,true);near(S.pipeFriction(2320,.0052).factor,64/2320);assert.equal(q('vdot-slider').step,'any');
}));

test('Drawn EGL and HGL obey the energy equation at every section and separate all five local drops from four lengths',()=>run((a,r,q)=>{
 for(const width of[300,900])for(const Q of[.05,.15,6,15]){
  q('scene').getBoundingClientRect=()=>({width,height:770});const s=set(a,r,q,Q),g=s.geometry,path=nums(q('hgl')),toHead=y=>s.z2+(g.bottom-y)*g.maxHead/(g.bottom-g.top),toS=x=>(x-g.left)*89/(g.right-g.left);let cumulative=0,linearLength=0;
  assert.equal(s.segments.length,9);assert.equal(q('scene').querySelectorAll('[data-loss-kind="local"]').length,5);assert.equal(q('scene').querySelectorAll('[data-loss-kind="line"]').length,4);
  for(const [i,seg]of s.segments.entries()){
   const p=nums(q('loss-'+i)),loss=seg.kind==='line'?s.lam*(seg.s1-seg.s0)/.05*s.vh:seg.zeta*s.vh;near(toS(p[0]),seg.s0);near(toS(p[2]),seg.s1);near(toHead(p[1]),s.z1-cumulative);near(toHead(p[1])-toHead(p[3]),loss);cumulative+=loss;if(seg.kind==='line'){linearLength+=seg.s1-seg.s0;assert.ok(p[2]>p[0]);}else near(p[0],p[2]);
  }
  near(linearLength,89);near(cumulative,s.z1-4);near(toHead(nums(q('loss-8'))[3]),4);assert.equal(path.length,s.points.length*2);
  for(let i=0;i<s.points.length;i++){const point=s.points[i];near(toS(path[2*i]),point.s);near(toHead(path[2*i+1]),point.E-(point.pipe?s.alpha*s.vh:0));}
  near(s.points.at(-2).H,4);near(s.points.at(-1).H,4);near(s.segments.at(-1).loss,s.alpha*s.vh);assert.equal(g.unit,Q<1?'mm':'m');
 }
}));

test('The technical path has exactly two bends; the rising nine metres are a sloping distributed loss on the developed-length graph',()=>run((a,r,q)=>{
 let s=set(a,r,q,6),d=q('pipe-fluid').getAttribute('d');assert.equal((d.match(/\bQ\b/g)||[]).length,2);assert.equal(s.geometry.pipe.inletY-s.geometry.pipe.outletY,90);assert.ok(q('valve'));const p=nums(q('loss-3'));assert.ok(p[2]>p[0]);assert.ok(p[3]>p[1]);near(s.segments[3].s1-s.segments[3].s0,9);near(s.segments[3].loss,s.lam*9/.05*s.vh);
 const small=set(a,r,q,.05),vSmall=nums(q('velocity').querySelector('path'));s=set(a,r,q,6);const vBig=nums(q('velocity').querySelector('path')),legend=nums(q('velocity-scale').querySelector('path'));near(vBig[2]-vBig[0],6*s.V);near(vSmall[2]-vSmall[0],6*small.V);near((vBig[2]-vBig[0])/(vSmall[2]-vSmall[0]),120);near(legend[2]-legend[0],18);assert.match(q('scene').textContent,/nije u mjerilu/);assert.match(rootText(r),/razvijenu duljinu/);
}));
function rootText(r){return r.textContent;}

test('One model owner and three main readings replace the old duplicate scene and percentage panel',()=>run((a,r,q)=>{
 assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelectorAll('canvas,image,foreignObject').length,0);assert.equal(r.querySelectorAll('.z123-native-results strong').length,3);assert.equal(r.querySelectorAll('input[type="range"]').length,2);assert.equal(r.querySelectorAll('.z123-track,.v13p-z123-locator,.v13p-primary').length,0);
 let state=r.mf1BudgetState,writes=0;Object.defineProperty(r,'mf1BudgetState',{get(){return state;},set(s){state=s;writes++;},configurable:true});a.change(q('vdot-slider'),.1);assert.equal(writes,1);assert.equal(r.querySelectorAll('.mf1-decision li[data-active=true]').length,1);
 const source=fs.readFileSync('vjezba_13.qmd','utf8');assert.doesNotMatch(source,/function z123\(\)/);assert.doesNotMatch(source,/Re = 116865/);assert.match(source,/Re = 117530/);
}));
