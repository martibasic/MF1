const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const near=(a,b,tol=1e-9)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} ≈ ${b}`);
const nums=p=>p.getAttribute('d').match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi).map(Number);
const vector=(s,id)=>{const p=nums(s.querySelector('#'+id+' path'));return {x:p[0],y:p[1],dx:p[2]-p[0],dy:p[3]-p[1]};};
function run(fn){const a=load(10),r=a.w.document.getElementById('v10-z90-lab'),s=r.querySelector('#v10-z90-scene');try{fn(a,r,s);a.scan('individual pitot');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function set(a,r,mm){a.change(r.querySelector('#v10-z90-h'),mm);return r.mf1PitotState;}
function segments(el){const commands=el.getAttribute('d').match(/[MHV][^MHV]*/g);let x,y;const out=[];for(const c of commands){const n=c.slice(1).trim().split(/\s+/).map(Number);if(c[0]==='M'){[x,y]=n;continue;}const X=c[0]==='H'?n[0]:x,Y=c[0]==='V'?n[0]:y;out.push([x,y,X,Y]);x=X;y=Y;}return out;}
function intersects(a,b){if(a[0]===a[2]&&b[1]===b[3])return a[0]>=Math.min(b[0],b[2])&&a[0]<=Math.max(b[0],b[2])&&b[1]>=Math.min(a[1],a[3])&&b[1]<=Math.max(a[1],a[3]);if(a[1]===a[3]&&b[0]===b[2])return intersects(b,a);if(a[0]===a[2]&&b[0]===b[2])return a[0]===b[0]&&Math.max(Math.min(a[1],a[3]),Math.min(b[1],b[3]))<=Math.min(Math.max(a[1],a[3]),Math.max(b[1],b[3]));return a[1]===b[1]&&Math.max(Math.min(a[0],a[2]),Math.min(b[0],b[2]))<=Math.min(Math.max(a[0],a[2]),Math.max(b[0],b[2]));}

test('Independent hydrostatic paths through the drawn water and mercury columns reach the same bottom pressure',()=>run((a,r,s)=>{
 for(const width of [300,900])for(const mm of [0,.5,25,63.5,100,120]){
  s.getBoundingClientRect=()=>({left:0,top:0,width,height:690});const m=set(a,r,mm),g=m.geometry,L=s.querySelector('#v10-z90-level-left'),R=s.querySelector('#v10-z90-level-right');
  const zL=(g.axisY-Number(L.getAttribute('y1')))/1000,zR=(g.axisY-Number(R.getAttribute('y1')))/1000,zBottom=(g.axisY-g.bendY-g.bendR)/1000,z0=0,zs=(g.axisY-g.pipeBottom)/1000;
  const ps=37000,p0=ps+m.rawPressureDifference,fromLeft=p0+1000*9.81*(z0-zL)+13600*9.81*(zL-zBottom),fromRight=ps+1000*9.81*(zs-zR)+13600*9.81*(zR-zBottom);
  near(fromLeft,fromRight);near(zR-zL,mm/1000);near(m.rawPressureDifference,13600*9.81*(zR-zL)-1000*9.81*((z0-zL)-(zs-zR)));
  const dynamic=(p0+1000*9.81*z0)-(ps+1000*9.81*zs);near(dynamic,m.dp);near(dynamic,.5*1000*m.v*m.v);near(m.loopResidual,0);near(m.staticReducedOffset,-981);near(m.head,12.6*mm/1000);
 }
}));

test('Equal bores preserve mercury volume and fixed mean level, with the high-pressure left interface lower by the actual mm reading',()=>run((a,r,s)=>{
 let referenceLength;
 for(const mm of [0,.5,25,63.5,120]){
  const m=set(a,r,mm),g=m.geometry,L=s.querySelector('#v10-z90-level-left'),R=s.querySelector('#v10-z90-level-right'),yL=+L.getAttribute('y1'),yR=+R.getAttribute('y1'),measure=s.querySelector('#v10-z90-dh');
  near((yL+yR)/2,450);near(yL-yR,mm);near(+measure.getAttribute('y1'),yR);near(+measure.getAttribute('y2'),yL);assert.ok(yL>=yR);
  const occupiedLength=(g.bendY-yL)+(g.bendY-yR)+Math.PI*g.bendR;if(referenceLength===undefined)referenceLength=occupiedLength;near(occupiedLength,referenceLength);
  const path=nums(s.querySelector('#v10-z90-hg'));near(path[0],g.leftX);near(path[1],yL);near(path.at(-1),yR);
  near(g.pipeBottom-g.pipeTop,200);near((g.pipeBottom-g.axisY)/1000,.1);near(g.mmScale,1);
 }
}));

test('Actual pressure paths stay isolated until mercury; the Pitot faces upstream while the flush wall tap is perpendicular to flow',()=>run((a,r,s)=>{
 for(const width of [300,900])for(const mm of [0,120]){
  s.getBoundingClientRect=()=>({left:0,top:0,width,height:690});const m=set(a,r,mm),g=m.geometry,left=segments(s.querySelector('#v10-z90-water-left')),right=segments(s.querySelector('#v10-z90-water-right'));
  for(const a of left)for(const b of right)assert.equal(intersects(a,b),false,'two water paths must not short-circuit');
  near(left[0][0],g.tipX);near(left[0][1],(g.pipeTop+g.pipeBottom)/2);assert.ok(left[0][2]>left[0][0]);near(left[0][3]-left[0][1],0);
  near(right[0][0],g.rightX);near(right[0][1],g.pipeBottom);near(right[0][2]-right[0][0],0);assert.ok(right[0][3]>right[0][1]);
  near(left.at(-1)[3],g.lowerY);near(right.at(-1)[3],g.upperY);assert.equal(s.querySelector('#v10-z90-water-left').getAttribute('stroke'),s.querySelector('#v10-z90-water-right').getAttribute('stroke'));
  const walls=s.querySelector('#v10-z90-pipe-walls').getAttribute('d');assert.ok(walls.includes('H '+(g.rightX-7)));assert.ok(walls.includes('M '+(g.rightX+7)+' '+g.pipeBottom));
 }
}));

test('A fourfold reading gives fourfold dynamic pressure and doubles undisturbed speed and uniform-profile flow',()=>run((a,r,s)=>{
 const small=set(a,r,25),v1=vector(s,'v10-z90-flow'),large=set(a,r,100),v2=vector(s,'v10-z90-flow');near(large.dp,4*small.dp);near(large.v,2*small.v);near(large.q,2*small.q);near(v2.dx,2*v1.dx);near(v1.dy,0);near(v2.dy,0);
 const scale=vector(s,'v10-z90-velocity-scale');near(scale.dx/5,8);near(v2.dx/large.v,8);near(large.q,Math.PI*.2**2/4*large.v);near(large.naiveVelocity/large.v,Math.sqrt(13600/12600));near(large.relativeError,small.relativeError);
 set(a,r,63.5);r.querySelector('#v10-z90-reset').click();const original=r.mf1PitotState;near(original.dp,7848.981);near(original.rawPressureDifference,6867.981);near(original.v,3.9620653704854494);near(original.q,.1244719546095961);near(original.head,.8001);
}));

test('Zero differential height has no flow arrow or dynamic pressure but correctly retains the raw hydrostatic tap difference',()=>run((a,r,s)=>{
 const m=set(a,r,0);near(m.dp,0);near(m.v,0);near(m.q,0);near(m.rawPressureDifference,-981);near(m.waterLeft-m.waterRight,.1);assert.equal(s.querySelectorAll('#v10-z90-flow path').length,0);
 assert.equal(+r.querySelector('#v10-z90-note [data-active=true]').dataset.branch,0);assert.match(r.querySelector('#v10-z90-note').textContent,/−981 Pa/);
 for(const mm of [.5,25,120]){set(a,r,mm);assert.equal(+r.querySelector('#v10-z90-note [data-active=true]').dataset.branch,1);assert.equal(r.querySelectorAll('#v10-z90-note [data-active=true]').length,1);}
}));

test('One native vector scene, one control and three outcomes retain the original preset and explicitly distinguish local speed from flow inference',()=>run((a,r,s)=>{
 assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelectorAll('input[type=range]').length,1);assert.equal(r.querySelectorAll('.v10-lab__result').length,3);assert.equal(r.querySelectorAll('canvas,image,img,foreignObject').length,0);
 for(const t of s.querySelectorAll('text'))assert.ok(+t.closest('[font-size]').getAttribute('font-size')>=17);
 assert.match(r.textContent,/Brzina ispred sonde/);assert.match(r.textContent,/jednolik profil/);assert.match(r.querySelector('#v10-z90-eq').textContent,/pₛ−981 Pa/);
 const original=a.w.MF1.decision;let calls=0;a.w.MF1.decision=(el,...args)=>{if(el.id==='v10-z90-note')calls++;return original(el,...args);};r.querySelector('#v10-z90-h').dispatchEvent(new a.w.Event('input',{bubbles:true}));assert.equal(calls,1);
}));
