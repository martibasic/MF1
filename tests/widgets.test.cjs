const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs'),MF1=require('../assets/mf1-widgets.js');
const close=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<=t*Math.max(1,Math.abs(b)),`${a} != ${b}`);

test('Translating tank conserves volume, resolves dry floor and caps the rim',()=>{
 for(const L of [.2,1,7])for(const h of [.01,.5,2])for(const a of [-80,-9.81,0,9.81,80])for(const rim of [.4,3,Infinity]){
  const s=MF1.openTank(L,h,a,rim);let area=0;const N=4000;
  for(let i=0;i<N;i++)area+=s.height(L*(i+.5)/N)*L/N;
  close(area,s.area,2e-6);close(s.area+s.spilled,L*h);assert.ok(s.low>=0&&s.high<=rim);
  close(s.height(a>=0?0:L),s.high);close(s.height(a>=0?L:0),s.low);
 }
 for(const a of [0,2,50]){const safe=MF1.safeFill(2,1,a);close(MF1.openTank(2,safe,a,1).spilled,0);assert.ok(MF1.openTank(2,safe+.1,a,1).spilled>0);}
});
test('Rotating tank integrates its actual paraboloid or dry annulus',()=>{
 for(const R of [.1,1,3])for(const h of [.01,.5,2])for(const omega of [0,.5,7,20])for(const rim of [.8,3,Infinity]){
  const s=MF1.rotatingTank(R,h,omega,rim);let vol=0;const N=6000;
  const dr=(R-s.dry)/N;
  for(let i=0;i<N;i++){const r=s.dry+dr*(i+.5);vol+=s.height(r)*2*Math.PI*r*dr;}
  close(vol,s.volume,4e-6);close(s.volume+s.spilled,Math.PI*R*R*h);assert.ok(s.center>=0&&s.edge<=rim+1e-12);close(s.height(R),s.edge);
 }
});
test('Actuator disk satisfies mass, momentum and energy simultaneously',()=>{
 for(const cp of [0,.05,.3,.55,16/27])for(const v of [0,3,15]){
  const s=MF1.actuatorDisk(1.225,125,v,cp);close(s.disk,(v+s.wake)/2);close(s.force,s.mass*(v-s.wake));close(s.power,s.force*s.disk);close(s.power,.5*1.225*125*v**3*cp);assert.ok(s.wake>=0);
 }
 assert.equal(MF1.actuatorDisk(1,1,3,.7),null);
});
test('Animation physical time is invariant at 10, 30 and 120 fps; pause/reset work',()=>{
 for(const fps of [10,30,120]){
  const a=load(1),root=a.w.document.createElement('div');a.w.document.body.append(root);let elapsed=0;
  a.w.MF1.motion(root,dt=>elapsed+=dt,{reset:()=>elapsed=0});
  root.querySelector('button').click();a.frames(1,1000/fps);a.frames(fps*3,1000/fps);close(elapsed,3);
  root.querySelector('button').click();a.frames(fps,1000/fps);close(elapsed,3);
  root.querySelectorAll('button')[1].click();close(elapsed,0);assert.equal(root.querySelector('button').getAttribute('aria-pressed'),'false');a.dom.window.close();
 }
});

const numeric=el=>Number(el.textContent.match(/[-−]?[\d.,\s]+/)?.[0].trim().replace(/\s/g,'').replaceAll('.','').replace(',','.').replace('−','-'));
test('Rocket obeys the variable-mass equation, including a 45% propellant fraction',()=>{
 const a=load(12),root=a.w.document.querySelector('#v12-rocket'),input=k=>root.querySelector(`[data-k="${k}"]`),out=k=>numeric(root.querySelector(`[data-v="${k}"]`));
 close(out('dv'),3000*Math.log(5000/4900),.001);
 a.change(input('dm'),2250);close(out('dv'),3000*Math.log(5000/2750),.0001);
 const dv=out('dv');a.change(input('t'),input('t').max);close(out('dv'),dv);a.dom.window.close();
});
test('Pelton scene preserves tangential momentum, power and the stationary-bucket limit',()=>{
 const a=load(12),root=a.w.document.querySelector('#v12-pelton'),input=k=>root.querySelector(`[data-k="${k}"]`),out=k=>numeric(root.querySelector(`[data-v="${k}"]`));
 try{for(const ratio of [0,.25,.5,.75,.95]){
  a.change(input('u'),ratio);
  const v=+input('v').value,U=v*ratio,mdot=1000*+input('q').value,k=+input('k').value,beta=+input('b').value*Math.PI/180;
  const v2=U+k*(v-U)*Math.cos(beta),force=mdot*(v-v2);
  assert.ok(Math.abs(out('f')*1000-force)<=50.01); // displayed to 0.1 kN
  assert.ok(Math.abs(out('p')*1e6-force*U)<=5000.01); // displayed to 0.01 MW
  if(ratio===0){close(out('p'),0);assert.ok(out('f')>0);}
 }
 a.change(input('u'),.5);const peak=out('p');
 for(const ratio of [.4,.6]){a.change(input('u'),ratio);assert.ok(out('p')<peak);}
 assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}
});

test('Sprinkler torque uses absolute exit velocity; a locked rotor has torque but no shaft power',()=>{
 const a=load(12),root=a.w.document.querySelector('#v12-sprinkler'),input=k=>root.querySelector(`[data-k="${k}"]`),out=k=>numeric(root.querySelector(`[data-v="${k}"]`));
 try{for(const rpm of [0,300,+input('n').max]){
  a.change(input('n'),rpm);
  const Q=+input('q').value/1000,r=+input('r').value,omega=rpm*Math.PI/30,W=Q/(Math.PI*.01**2),Vtheta=r*omega-W;
  const torque=-1000*Q*r*Vtheta;
  assert.ok(Math.abs(out('vv')-Vtheta)<=.00501);
  assert.ok(Math.abs(out('m')-torque)<=.05001);
  assert.ok(Math.abs(out('p')*1000-torque*omega)<=50.01);
  if(rpm===0){assert.ok(out('m')>0);close(out('p'),0);}
 }
 assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}
});

test('Draining scene conserves the initial volume and has quarter depth at half the emptying time',()=>{
 const a=load(11),get=k=>a.w.document.querySelector('#v11-z97-'+k),out=k=>numeric(get(k));
 try{
  const D=+get('diameter').value,d=+get('nozzle').value/1000,h0=+get('h0').value,cd=+get('cd').value;
  const A=Math.PI*D**2/4,T=(D/d)**2*Math.sqrt(2*h0/9.81)/cd;
  close(out('T'),T,.0001);a.change(get('time'),T/2);close(out('h'),h0/4,.0005);
  let volume=0;const steps=20;
  for(let i=0;i<=steps;i++){a.change(get('time'),T*i/steps);volume+=((i===0||i===steps)? .5 : 1)*out('q')/1000*T/steps;}
  close(volume,A*h0,.0001);close(out('h'),0);close(out('q'),0);
  a.change(get('time'),0);a.change(get('nozzle'),d*2000);close(out('T'),T/4,.0001);
  assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});


for(let n=1;n<=13;n++)test(`V${n}: live handlers, presets, minima/maxima and combined extremes`,()=>{
 const a=load(n);a.frames(2);a.scan('initial');
 const controls=()=>[...a.w.document.querySelectorAll('input[type=range],input[type=number],select')];
 for(const el of controls()){
  const initial=el.value,values=el.tagName==='SELECT'?[...el.options].map(o=>o.value):[el.min,el.max];
  for(const value of values)if(value!==''){a.change(el,value);a.frames(1);a.scan(`${el.id}=${value}`);}
  a.change(el,initial);
 }
 // Parameter corners exercise coupled geometry, zero flows and invalid states.
 for(const side of ['min','max'])for(const el of controls())if(el.tagName==='INPUT'&&el[side]!=='')a.change(el,el[side]);
 a.frames(2);a.scan('all extrema');
 for(const button of a.w.document.querySelectorAll('button')){
  if(!button.isConnected||!a.visible(button)||button.classList.contains('quarto-color-scheme-toggle'))continue;
  if(button.closest('.mf1-view-tools,.mf1-range-limits'))continue; // Dialog workflows have dedicated tests.
  try{button.click();a.frames(2);a.scan('button '+button.textContent.trim().slice(0,30));}catch(e){a.errors.push(e.stack);}
 }
 assert.deepEqual([...new Set(a.errors)],[]);a.dom.window.close();
});

test('Moody widget stays byte-equivalent to its reviewed protected fixture',()=>{
 const fs=require('fs'),crypto=require('crypto'),s=fs.readFileSync('vjezba_13.qmd','utf8');
 const start=s.indexOf('<!-- WIDGET: Moodyjev Dijagram -->'),end=s.indexOf('<!-- END REVIEWED MOODY -->');
 assert.ok(start>=0&&end>start,'Reviewed Moody block must retain explicit boundaries');
 const block=s.slice(start,end).replace(/\r\n/g,'\n');
 const fixture=JSON.parse(fs.readFileSync('tests/moody-protection.json','utf8'));
 assert.equal(crypto.createHash('sha256').update(block).digest('hex'),fixture.sha256);
 assert.ok(!fs.readFileSync('assets/mf1-widgets.css','utf8').includes('#v13-moody-widget'));
});
