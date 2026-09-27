const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} != ${b}`);
const points=path=>path.getAttribute('d').match(/-?\d*\.?\d+(?:e[+-]?\d+)?/g).map(Number);

test('Every live drawing has a full-width path through its widget, including mode changes',()=>{
 for(let n=1;n<=13;n++){
  const a=load(n);
  try{
   function check(){
    for(const root of a.w.document.querySelectorAll('.mf1-compact')){
     for(const graphic of root.querySelectorAll('canvas,svg')){
      if(!a.visible(graphic)||graphic.closest('mjx-container,details:not([open])')||graphic.parentElement.closest('svg'))continue;
      assert.ok(graphic.classList.contains('mf1-graphic'),`V${n}: undecorated ${graphic.id}`);
      for(let branch=graphic;branch!==root;branch=branch.parentElement){
       const css=a.w.getComputedStyle(branch),parent=branch.parentElement;
       assert.equal(css.width,'100%',`V${n}: narrow ${branch.id||branch.className}`);
       if(parent===root)continue;
       const layout=a.w.getComputedStyle(parent);
       assert.ok((layout.display==='flex'&&layout.flexDirection==='column')||
        (layout.display==='grid'&&css.gridColumn==='1/-1')||layout.display==='block',
        `V${n}: graphic shares a row in ${parent.className}`);
      }
     }
    }
   }
   a.frames(2);check();
   for(const mode of a.w.document.querySelectorAll('[data-mode]')){mode.click();a.frames(2);check();}
   // Secondary constructions may be disclosed deliberately; they must be
   // readable at full width when a student opens the derivation.
   for(const details of a.w.document.querySelectorAll('.mf1-compact details'))details.open=true;
   a.frames(2);check();
   assert.deepEqual(a.errors,[]);
  }finally{a.dom.window.close();}
 }
});

test('Replaced legacy canvases are removed or remain hidden under the drawing styles',()=>{
 const a=load(2);
 try{for(const id of ['canvas-z12-dual','canvas-yl','canvas-z14-v2','canvas-z15-vfinal']){
  const canvas=a.w.document.getElementById(id);
  assert.ok(!canvas||!a.visible(canvas),id);
 }}
 finally{a.dom.window.close();}
});

test('V5 canvas fitting preserves physical angles even in a mismatched viewport',()=>{
 const a=load(5);
 try{for(const [width,height] of [[900,300],[320,640],[900,800]]){
  let transform;
  a.w.MF1V5.prepareCanvas({style:{setProperty(){}},getBoundingClientRect:()=>({width,height})},
   {setTransform:(...args)=>transform=args},450,400);
  close(transform[0],transform[3]);assert.ok(transform[4]>=0&&transform[5]>=0);
 }}finally{a.dom.window.close();}
});

test('V6 merged pressure scene reverses both force directions without changing magnitudes',()=>{
 const a=load(6),root=a.w.document.getElementById('widget-curved-pressure');
 try{
  let drawn;
  const draw=a.w.MF1.quarterScene;
  a.w.MF1.quarterScene=(canvas,model)=>{drawn={...model};return draw(canvas,model);};
  root.querySelector('[data-cp-step="3"]').click();
  for(const h of [0,1.2,3])for(const R of [.4,1,1.8]){
   a.change(root.querySelector('#cp-h'),h);a.change(root.querySelector('#cp-r'),R);
   const expectedH=9.81*(h+R/2)*R,expectedV=9.81*(h*R+Math.PI*R*R/4);
   const magnitudes=[];
   for(const side of ['outside','inside']){
    root.querySelector(`[data-cp-side="${side}"]`).click();
    close(drawn.FH,expectedH);close(drawn.FV,expectedV);
    assert.equal(drawn.inside,side==='inside');assert.equal(drawn.step,3);
    const horizontal=root.querySelector('#cp-fh').textContent,vertical=root.querySelector('#cp-fv').textContent;
    assert.ok(horizontal.endsWith(side==='inside'?'←':'→'),horizontal);
    assert.ok(vertical.endsWith(side==='inside'?'↓':'↑'),vertical);
    magnitudes.push([horizontal.slice(0,-1),vertical.slice(0,-1),root.querySelector('#cp-fr').textContent]);
   }
   assert.deepEqual(magnitudes[0],magnitudes[1]);
  }
  assert.deepEqual(a.errors,[]);
 }finally{a.dom.window.close();}
});

test('Pelton velocity triangles still close after separating their visual panels',()=>{
 const a=load(12),root=a.w.document.getElementById('v12-pelton');
 try{for(const u of [.1,.5,.95])for(const beta of [95,160,175])for(const k of [.6,1]){
  for(const [name,value] of [['u',u],['b',beta],['k',k]])a.change(root.querySelector(`[data-k="${name}"]`),value);
  const vectors=[...root.querySelectorAll('.mf1-companion .mf1-vector')].map(g=>points(g.querySelector('path')));
  assert.equal(vectors.length,6);
  for(const offset of [0,3]){
   const [U,W,V]=vectors.slice(offset,offset+3);
   close(U[2],W[0]);close(U[3],W[1]);
   close((U[2]-U[0])+(W[2]-W[0]),V[2]-V[0]);
   close((U[3]-U[1])+(W[3]-W[1]),V[3]-V[1]);
   // The inlet resultant is drawn on a separate parallel line for legibility.
   if(offset===3){close(U[0],V[0]);close(U[1],V[1]);close(W[2],V[2]);close(W[3],V[3]);}
  }
  assert.equal(root.querySelectorAll('.mf1-companion').length,1);
 }}finally{a.dom.window.close();}
});

test('V12 force and velocity endpoints stay inside their viewports at control extremes',()=>{
 const a=load(12);
 try{
  function check(){for(const g of a.w.document.querySelectorAll('.mf1-vector')){
   const box=g.closest('svg').getAttribute('viewBox').split(/\s+/).map(Number);
   const p=points(g.querySelector('path'));
   p.forEach((value,i)=>assert.ok(value>=box[i%2]-1e-6&&value<=box[i%2]+box[i%2+2]+1e-6,
    `${g.closest('.mf1-compact').id}: clipped vector`));
  }}
  check();for(const input of a.w.document.querySelectorAll('input[type=range]')){
   const initial=input.value;for(const side of ['min','max']){a.change(input,input[side]);check();}a.change(input,initial);
  }
 }finally{a.dom.window.close();}
});

test('Elbow vectors retain momentum and velocity closure at angle and pressure extremes',()=>{
 const a=load(11),root=a.w.document.getElementById('v11-momentum-lab');
 try{for(const alpha of [0,90,180])for(const pressure of [0,250]){
  a.change(root.querySelector('#v11m-alpha'),alpha);a.change(root.querySelector('#v11m-p1'),pressure);
  const p=id=>points(root.querySelector('#'+id)),v1=p('v11m-loc-v1'),v2=p('v11m-loc-v2'),dv=p('v11m-loc-dv');
  close(v1[0],v2[0]);close(v1[1],v2[1]);close(dv[0],v1[2]);close(dv[1],v1[3]);close(dv[2],v2[2]);close(dv[3],v2[3]);
  const P=p('v11m-force-p'),R=p('v11m-force-r'),M=p('v11m-force-m');
  close(P[2],R[0]);close(P[3],R[1]);close(R[2],M[2]);close(R[3],M[3]);
 }}finally{a.dom.window.close();}
});
