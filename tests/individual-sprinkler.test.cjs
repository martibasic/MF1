const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {load}=require('./widget-harness.cjs');
const near=(a,b,tol=1e-10)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
function fixture(fn){const a=load(12);try{const r=a.w.document.getElementById('v12-sprinkler'),set=(key,value)=>a.change(r.querySelector('[data-k='+key+']'),value);fn(a,r,set);a.scan('individual sprinkler');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function branch(r){const rows=r.querySelectorAll('[data-c] li[data-active=true]');assert.equal(rows.length,1);return +rows[0].dataset.branch;}

test('Sprinkler: four actual nozzles close angular-momentum flux and shaft work independently',()=>fixture((a,r,set)=>{
 let s=r.mf1SprinklerState;near(s.W,63.66197723675813);near(s.U,18.84955592153876);near(s.V,-44.81242131521937);near(s.M,537.7490557826324);near(s.P,16893.884831216);
 for(const Q of [4,20,32])for(const radius of [.2,.6,1.1])for(const rpm of [0,300,6000]){
  set('q',Q);set('r',radius);set('n',rpm);s=r.mf1SprinklerState;let flux=0;for(let j=0;j<4;j++){const theta=j*Math.PI/2,x=radius*Math.cos(theta),y=radius*Math.sin(theta),vx=-s.V*Math.sin(theta),vy=s.V*Math.cos(theta);flux+=(1000*Q/4000)*(x*vy-y*vx);}
  near(s.M,-flux);near(s.P,2*Math.PI*rpm/60*s.M);near(4*s.Am*s.W,Q/1000);near(s.md,1000*Q/1000);near(s.reactionMoment,-s.M);branch(r);
 }
}));

test('Sprinkler: exact locked/free/maximum presets preserve mathematical boundaries and nearby signs',()=>fixture((a,r,set)=>{
 assert.equal(r.querySelector('[data-k=n]').step,'any');for(const Q of [4,32])for(const radius of [.2,1.1]){
  set('q',Q);set('r',radius);r.querySelector('[data-stop]').click();assert.equal(branch(r),0);assert.equal(r.mf1SprinklerState.P,0);assert.ok(r.mf1SprinklerState.M>0);
  r.querySelector('[data-free]').click();const free={...r.mf1SprinklerState};assert.equal(branch(r),2);assert.equal(free.V,0);assert.equal(free.M,0);assert.equal(free.P,0);assert.ok(free.n0<6000);assert.equal(r.querySelector('[data-free]').getAttribute('aria-pressed'),'true');
  set('n',free.n0-1e-8);assert.equal(branch(r),1);assert.ok(r.mf1SprinklerState.M>0);set('n',free.n0+1e-8);assert.equal(branch(r),3);assert.ok(r.mf1SprinklerState.M<0);
  r.querySelector('[data-optimal]').click();let s=r.mf1SprinklerState;near(s.U,s.W/2);near(s.P,s.md*s.W*s.W/4);near(s.P,s.Pmax);near(s.dPdomega,0);assert.equal(branch(r),1);assert.equal(r.querySelector('[data-optimal]').getAttribute('aria-pressed'),'true');
  const peak=s.P,n=s.n;set('n',n*.9);assert.ok(r.mf1SprinklerState.P<peak);assert.ok(r.mf1SprinklerState.dPdomega>0);set('n',n*1.1);assert.ok(r.mf1SprinklerState.P<peak);assert.ok(r.mf1SprinklerState.dPdomega<0);
 }
}));

test('Sprinkler: changing radius does not change optimized power; fixed-speed moment is genuinely quadratic',()=>fixture((a,r,set)=>{
 set('q',20);set('r',.2);r.querySelector('[data-optimal]').click();const first={...r.mf1SprinklerState};set('r',1);r.querySelector('[data-optimal]').click();let s=r.mf1SprinklerState;near(s.P,first.P);near(s.n,first.n/5);
 set('n',1000);const omega=1000*Math.PI/30,W=s.W,peakR=W/(2*omega);set('r',peakR);s=r.mf1SprinklerState;const center=s.M;set('r',peakR*.9);assert.ok(r.mf1SprinklerState.M<center);set('r',peakR*1.1);assert.ok(r.mf1SprinklerState.M<center);
 r.querySelector('[data-p]').click();near(r.mf1SprinklerState.n0,1013.2118364233778);near(r.mf1SprinklerState.Pmax,20264.23672846756);
}));

test('Sprinkler: native bent outlets are exactly tangential on r and velocity addition uses fixed scales',()=>fixture((a,r,set)=>{
 assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelectorAll('canvas,image,foreignObject').length,0);assert.equal(r.querySelectorAll('input[type=range]').length,3);assert.equal(r.querySelectorAll('.v12x-card').length,3);assert.equal(r.querySelectorAll('.mf1-motion').length,1);
 for(const width of [900,340]){Object.defineProperty(r,'clientWidth',{configurable:true,value:width});a.w.dispatchEvent(new a.w.Event('resize'));for(const radius of [.2,1.1])for(const rpm of [0,300,6000]){
  set('r',radius);set('n',rpm);let s=r.mf1SprinklerState;near(+r.querySelector('[data-sprinkler-radius]').getAttribute('r'),radius*100);assert.equal(s.velocityScale,.18);
  const exits=r.querySelectorAll('[data-sprinkler-exit]');assert.equal(exits.length,4);for(const e of exits){const x=+e.dataset.x-s.cx,y=+e.dataset.y-s.cy,tx=+e.dataset.tx,ty=+e.dataset.ty;near(Math.hypot(x,y),s.R);near(x*tx+y*ty,0);near(x*ty-y*tx,s.R);near(Math.hypot(+e.getAttribute('x2')-+e.getAttribute('x1'),+e.getAttribute('y2')-+e.getAttribute('y1')),s.d*s.radialScale);const nz=s.nozzles[+e.dataset.sprinklerExit];near((nz.x-nz.p2.x)/(.3*s.R),nz.outlet.x);near((nz.y-nz.p2.y)/(.3*s.R),nz.outlet.y);}
  const v=name=>r.querySelector('[data-sprinkler-vector='+name+'] line'),u=v('sum-U'),w=v('sum-W'),result=v('sum-V');near(+w.getAttribute('x1'),s.balanceX+s.U*.18);near(+w.getAttribute('x2'),s.balanceX+s.V*.18,1e-9);near(+w.getAttribute('y1'),s.balanceY);if(u){near(+u.getAttribute('x2')-+u.getAttribute('x1'),s.U*.18);near(+u.getAttribute('x2'),+w.getAttribute('x1'));}if(result)near(+result.getAttribute('x2')-+result.getAttribute('x1'),s.V*.18);
 }}
 assert.doesNotMatch(fs.readFileSync('vjezba_12.qmd','utf8'),/const drawSprinkler|sprinklerAngle|sprinkler: "p"/);
}));

test('Sprinkler: prescribed constant-speed orientation is frame independent and every parameter change resets motion',()=>{
 const final=[];for(const fps of [2,10,120])fixture((a,r,set)=>{r.querySelector('.mf1-motion button').click();a.frames(1,1000/fps);a.frames(2*fps,1000/fps);const s=r.mf1SprinklerState;near(s.time,.1);near(s.angle,Math.PI);final.push(s.angle);set('q',21);assert.equal(r.mf1SprinklerState.time,0);assert.equal(r.mf1SprinklerState.angle,0);assert.equal(r.querySelector('.mf1-motion button').getAttribute('aria-pressed'),'false');a.frames(10);assert.equal(r.mf1SprinklerState.angle,0);r.querySelector('[data-stop]').click();r.querySelector('.mf1-motion button').click();a.frames(1);assert.equal(r.mf1SprinklerState.angle,0);assert.equal(r.querySelector('.mf1-motion button').getAttribute('aria-pressed'),'false');});near(final[0],final[2]);
});
