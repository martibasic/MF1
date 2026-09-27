const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {load}=require('./widget-harness.cjs'),selection=require('./editorial-selection.json');

test('Every exercise has one introductory widget, followed by only its selected applications',()=>{
 for(let n=1;n<=13;n++){
  const a=load(n);try{
   a.frames(2);const doc=a.w.document,owners=[...doc.querySelectorAll('[data-widget-role]')];
   assert.deepEqual(owners.map(e=>e.id||e.dataset.widgetId),selection[n-1],'V'+n+' editorial selection');
   assert.equal(owners[0].dataset.widgetRole,'intro');
   assert.equal(owners.filter(e=>e.dataset.widgetRole==='intro').length,1);
   assert.ok(owners.slice(1).every(e=>e.dataset.widgetRole==='application'));
   const roots=[...doc.querySelectorAll('.mf1-compact')].filter(e=>!e.parentElement.closest('.mf1-compact'));
   assert.equal(roots.length,owners.length,'V'+n+' no unlabelled extra experiment');
   for(const owner of owners){
    const root=owner.matches('.mf1-compact')?owner:owner.querySelector('.mf1-compact');
    assert.ok(root?.querySelector('canvas,svg'),'V'+n+' visual explanation');
    assert.ok(root.querySelector('input,select,button'),'V'+n+' interaction');
    assert.equal(root.querySelectorAll('.mf1-view-tools').length,1,'V'+n+' one toolbar per experiment');
   }
   const source=fs.readFileSync(`vjezba_${String(n).padStart(2,'0')}.qmd`,'utf8');
   assert.ok(/fizikalni uvod/i.test(source.slice(0,source.indexOf('data-widget-role="intro"'))),'V'+n+' physical introduction precedes main');
   assert.equal(doc.querySelectorAll('.mf1-field-lab').length,0);
   const ids=[...doc.querySelectorAll('[id]')].map(e=>e.id);assert.equal(new Set(ids).size,ids.length,'V'+n+' unique IDs');
   a.scan('initial');assert.deepEqual(a.errors,[]);
  }finally{a.dom.window.close();}
 }
});

test('Moody opens with its reviewed diagram and complete decision tree visible',()=>{
 const a=load(13);try{
  const root=a.w.document.querySelector('#v13-moody-widget'),slider=root.querySelector('#v13-re-slider');
  assert.equal(root.querySelector('#v13-profile-panel'),null);
  assert.equal(root.querySelector('.m13-bottom').closest('details'),null);
  for(const [re,branch]of [[1000,'lam'],[3000,'trans'],[1e6,'turb']]){
   a.change(slider,Math.log10(re));a.frames(1);
   assert.ok(a.visible(root.querySelector('#v13-moody-canvas')));
   assert.ok(a.visible(root.querySelector('.m13-tree')));
   assert.ok(root.querySelector('#m13-b-'+branch).classList.contains('m13-on'));
  }
  for(const [re,kd,branch]of [[1e4,1e-6,'smooth'],[1e5,.001,'cb'],[1e8,.01,'rough']]){
   a.change(slider,Math.log10(re));a.change(root.querySelector('#v13-kd-slider'),Math.log10(kd));
   assert.ok(root.querySelector('#m13-b-'+branch).classList.contains('m13-on'));
  }
  assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});

test('Pelton presents one view at a time and keeps velocity/power analysis synchronized',()=>{
 const a=load(12);try{
  const root=a.w.document.querySelector('#v12-pelton'),modes=root.querySelectorAll('button[data-p-view]'),rotor=root.querySelector('#v12-pelton-rotor'),analysis=root.querySelector('#v12-pelton-analysis');
  assert.ok(a.visible(rotor));assert.ok(!a.visible(analysis));
  modes[1].click();assert.ok(!a.visible(rotor));assert.ok(a.visible(analysis));
  for(const u of [0,.5,.9]){a.change(root.querySelector('[data-k=u]'),u);a.frames(1);assert.ok(a.visible(analysis));assert.ok(!a.visible(rotor));a.scan('Pelton '+u);}
  modes[0].click();assert.ok(a.visible(rotor));assert.ok(!a.visible(analysis));assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});

test('Optional comparison A remains immutable while the existing viscosity experiment changes',()=>{
 const a=load(2);try{
  const root=a.w.document.querySelector('#widget-visc-basics'),menu=root.querySelector('.mf1-comparison-menu');
  assert.equal(menu.open,false,'comparison tools are initially quiet');
  [...menu.querySelectorAll('button')].find(b=>b.textContent==='Zapamti A').click();
  const tray=root.querySelector('.mf1-compare-tray'),image=tray.querySelector('img'),src=image.src;
  const input=root.querySelector('input[type=range]'),value=Number(input.value),next=value===Number(input.max)?input.min:input.max;
  a.change(input,next);a.frames(2);assert.equal(image.src,src);assert.equal(tray.querySelectorAll('tbody tr').length,1);
  assert.equal(tray.querySelectorAll('svg,[id]').length,0);
  tray.querySelector('button').click();assert.equal(root.querySelector('.mf1-compare-tray'),null);assert.equal(input.value,String(next));assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});

test('Momentum keeps one selected scene visible and preserves the same force across its views',()=>{
 const a=load(11);try{
  const root=a.w.document.querySelector('#v11-momentum-lab'),buttons=root.querySelectorAll('.v11m-view-switch button');
  assert.equal(buttons.length,3);
  const force=root.querySelector('#v11m-Rmag').textContent;
  for(const button of buttons){button.click();a.frames(2);
   const scenes=[...root.querySelectorAll('svg')].filter(e=>!e.parentElement.closest('svg')&&!e.closest('mjx-container')&&a.visible(e));
   assert.equal(scenes.length,1);assert.equal(root.querySelector('#v11m-Rmag').textContent,force);
  }assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});
