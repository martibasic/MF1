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
test('Gate uses pressure minus momentum; equal levels approach the stated critical branch',()=>{
 const a=load(12),root=a.w.document.querySelector('#v12-gate'),h1=root.querySelector('[data-k="h1"]'),h2=root.querySelector('[data-k="h2"]'),out=k=>numeric(root.querySelector(`[data-v="${k}"]`));
 for(const depth of [0,.5,2.9,3]){a.change(h2,depth);close(out('f'),out('ph')-out('im'),.002);assert.ok(out('f')>=0);}
 a.change(h1,.8);assert.ok(+h2.value<=+h1.value);a.dom.window.close();
});
test('Flyboard reaches 10 m continuously, then follows free fall and stops at the surface',()=>{
 const a=load(12,{reduced:false}),root=a.w.document.querySelector('#v12-fly');root.querySelector('.mf1-motion button').click();a.frames(1,10);
 a.frames(400,10);let s=root.mf1FlyState;assert.ok(!s.active&&s.y>10);close(s.ac,-9.81);close(s.vy,s.vc-9.81*(s.time-s.cut));
 a.frames(300,10);s=root.mf1FlyState;assert.ok(s.landed);close(s.y,0);close(s.vy,0);assert.equal(root.querySelector('.mf1-motion button').getAttribute('aria-pressed'),'false');a.dom.window.close();
});
test('Z99 pressure and energy depend on the same explicit coordinates',()=>{
 const a=load(11),get=k=>a.w.document.querySelector('#v11-z99-'+k),out=k=>numeric(get(k));
 const omega=+get('omega').value,p0=+get('p0').value*1000,re=+get('re').value,ze=+get('ze').value;
 close(out('pa'),(p0+998*9.81*.8+998*omega*omega/2)/1000,.0002);
 close(out('w'),Math.sqrt(2*p0/998+omega*omega*re*re-2*9.81*ze),.0002);
 a.change(get('omega'),0);a.change(get('ze'),8);assert.ok(get('q').textContent.includes('nema'));a.dom.window.close();
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
 const block=s.slice(s.indexOf('<!-- WIDGET: Moodyjev Dijagram -->'),s.indexOf('<script type="text/plain">')).replace(/\r\n/g,'\n');
 const fixture=JSON.parse(fs.readFileSync('tests/moody-protection.json','utf8'));
 assert.equal(crypto.createHash('sha256').update(block).digest('hex'),fixture.sha256);
 assert.ok(!fs.readFileSync('assets/mf1-widgets.css','utf8').includes('#v13-moody-widget'));
});
