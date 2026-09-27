const test = require('node:test');
const assert = require('node:assert/strict');
const {load} = require('./widget-harness.cjs');
const near=(a,b,tol=1e-9)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} ≈ ${b}`);
const coords=path=>path.getAttribute('d').match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi).map(Number);
function run(fn){
  const a=load(3),root=a.w.document.getElementById('v3-buoyancy-explorer'),svg=root.querySelector('svg');
  try{fn(a,root,svg);a.scan('individual buoyancy');assert.deepEqual(a.errors,[]);}
  finally{a.dom.window.close();}
}
const density=(a,root,value)=>a.change(root.querySelector('#v3-buoy-rho'),value);
const key=(a,svg,value)=>svg.dispatchEvent(new a.w.KeyboardEvent('keydown',{key:value,bubbles:true,cancelable:true}));
const point=(a,svg,type,x,y)=>svg.dispatchEvent(new a.w.MouseEvent(type,{clientX:x,clientY:y,bubbles:true,cancelable:true,button:0}));
function viewport(svg,width){svg.getBoundingClientRect=()=>({left:0,top:0,width,height:+svg.getAttribute('viewBox').split(' ')[3]});}

test('Buoyancy is the independently integrated traction on both horizontal faces, with the correct density branch',()=>run((a,root,svg)=>{
  for(const rho of [500,790,800,810,1000,1300]){
    density(a,root,rho);
    for(const command of rho<=800?['Home','ArrowDown','End']:['Home']){
      key(a,svg,command);
      const m=root.mf1BuoyancyState, body=svg.querySelector('#v3-buoy-body');
      const physicalTop=(+body.getAttribute('y')-m.scene.surfaceY)/1000;
      const physicalBottom=physicalTop+(+body.getAttribute('height'))/1000;
      // Midpoint quadrature of gauge pressure over a square A = 0.02 m² face.
      let up=0,down=0;const side=Math.sqrt(.02),N=40;
      for(let i=0;i<N;i++)for(let j=0;j<N;j++){
        const area=side*side/(N*N);
        up+=rho*9.81*Math.max(0,physicalBottom)*area;
        down+=rho*9.81*Math.max(0,physicalTop)*area;
      }
      near(m.bottomForce,up);near(m.topForce,-down);near(m.force,up-down);
      near(m.pTop,rho*9.81*Math.max(0,physicalTop));near(m.pBottom,rho*9.81*physicalBottom);
      near(m.force,rho*9.81*.003*Math.min(1,800/rho));near(m.weight,23.544);
      const active=root.querySelector('#v3-buoy-explainer [data-active=true]');
      assert.equal(+active.dataset.branch,rho>800?0:rho===800?1:2);
      near(m.residual,rho>=800?0:(rho-800)*9.81*.003);
      if(rho===800){assert.ok(m.force>0);assert.match(active.textContent,/≠ 0/);}
    }
  }
}));

test('Actual SVG force shafts pass through their correct volume centroids on one common vertical axis',()=>run((a,root,svg)=>{
  for(const rho of [500,800,820,1000,1300]){
    density(a,root,rho);
    for(const command of rho<=800?['Home','End']:['Home']){
      key(a,svg,command);
      const body=svg.querySelector('#v3-buoy-body'), x=+body.getAttribute('x'),y=+body.getAttribute('y'),w=+body.getAttribute('width'),h=+body.getAttribute('height');
      const G=coords(svg.querySelector('#v3-buoy-weight-vector path')),B=coords(svg.querySelector('#v3-buoy-force-vector path'));
      const expectedMassY=y+h/2,expectedBuoyancyY=(Math.max(root.mf1BuoyancyState.scene.surfaceY,y)+y+h)/2;
      for(const arrow of [G,B]){near(arrow[0],x+w/2);near(arrow[2],x+w/2);}
      near(G[1],expectedMassY);near(B[1],expectedBuoyancyY);
      near(+svg.querySelector('#v3-buoy-T').getAttribute('cy'),G[1]);near(+svg.querySelector('#v3-buoy-B').getAttribute('cy'),B[1]);
      assert.ok(G[3]>G[1]);assert.ok(B[3]<B[1]);
      near((B[1]-B[3])/(G[3]-G[1]),root.mf1BuoyancyState.force/root.mf1BuoyancyState.weight);
      if(rho<=800)near(G[1],B[1]);else assert.ok(B[1]>G[1]);
      // Square cross-section geometry is in the same spatial scale as H.
      near(w/h,Math.sqrt(.02)/.15);
    }
  }
}));

test('Deeper immersion raises both pressures and their drawn arrows by the same factor while buoyancy stays constant',()=>run((a,root,svg)=>{
  for(const rho of [500,800]){
    density(a,root,rho);key(a,svg,'Home');key(a,svg,'ArrowDown');
    const shallow={...root.mf1BuoyancyState},arrow1=coords(svg.querySelector('[data-pressure=bottom] path'));
    key(a,svg,'End');const deep=root.mf1BuoyancyState,arrow2=coords(svg.querySelector('[data-pressure=bottom] path'));
    near(deep.topDepth,.12);near(shallow.topDepth,.01);
    near(deep.pTop-shallow.pTop,rho*9.81*.11);near(deep.pBottom-shallow.pBottom,rho*9.81*.11);
    near(deep.pressureDifference,shallow.pressureDifference);near(deep.force,shallow.force);
    near((arrow2[1]-arrow2[3])/(arrow1[1]-arrow1[3]),deep.pBottom/shallow.pBottom);
    const top=coords(svg.querySelector('[data-pressure=top] path'));
    near((top[3]-top[1])/(arrow2[1]-arrow2[3]),deep.pTop/deep.pBottom);
    for(const face of ['top','bottom']){
      const arrows=[...svg.querySelectorAll(`[data-pressure=${face}]`)];assert.equal(arrows.length,2);
      for(const el of arrows)assert.notEqual(coords(el.querySelector('path'))[0],deep.scene.cx);
    }
    const left=[...svg.querySelectorAll('[data-pressure=side-left] path:first-child')],right=[...svg.querySelectorAll('[data-pressure=side-right] path:first-child')];
    left.forEach((path,i)=>{const l=coords(path),r=coords(right[i]);near(l[2]-l[0],r[0]-r[2]);near(l[1],r[1]);});
  }
  let pBottom;
  for(const rho of [810,1000,1300]){density(a,root,rho);const m=root.mf1BuoyancyState;near(m.pTop,0);near(m.pBottom,800*9.81*.15);if(pBottom!==undefined)near(m.pBottom,pBottom);pBottom=m.pBottom;}
}));

test('Only fully submerged bodies accept bounded depth dragging and keyboard movement, including after resize',()=>run((a,root,svg)=>{
  for(const width of [300,900]){
    viewport(svg,width);density(a,root,800);key(a,svg,'Home');
    assert.equal(svg.getAttribute('role'),'slider');assert.equal(svg.getAttribute('tabindex'),'0');
    key(a,svg,'ArrowUp');near(root.mf1BuoyancyState.topDepth,0);
    key(a,svg,'ArrowDown');near(root.mf1BuoyancyState.topDepth,.01);
    let s=root.mf1BuoyancyState.scene;
    // A drag starting outside the body must not teleport it.
    point(a,svg,'pointerdown',1,s.massY);point(a,svg,'pointermove',1,s.massY+50);near(root.mf1BuoyancyState.topDepth,.01);
    point(a,svg,'pointerdown',s.cx,s.massY);point(a,svg,'pointermove',s.cx,s.massY+50);near(root.mf1BuoyancyState.topDepth,.06);
    point(a,svg,'pointermove',s.cx,s.massY+500);near(root.mf1BuoyancyState.topDepth,.12);
    point(a,svg,'pointerup',s.cx,s.massY+500);point(a,svg,'pointermove',s.cx,0);near(root.mf1BuoyancyState.topDepth,.12);
    key(a,svg,'ArrowDown');near(root.mf1BuoyancyState.topDepth,.12);assert.equal(svg.getAttribute('aria-valuenow'),'120');
    key(a,svg,'Home');near(root.mf1BuoyancyState.topDepth,0);key(a,svg,'End');near(root.mf1BuoyancyState.topDepth,.12);
    density(a,root,1000);const floatingTop=root.mf1BuoyancyState.topDepth;
    key(a,svg,'End');s=root.mf1BuoyancyState.scene;point(a,svg,'pointerdown',s.cx,s.massY);point(a,svg,'pointermove',s.cx,s.massY+50);
    near(root.mf1BuoyancyState.topDepth,floatingTop);assert.equal(svg.getAttribute('role'),'img');assert.equal(svg.hasAttribute('aria-valuenow'),false);
  }
}));

test('Mobile and desktop retain one native vector scene, readable text, finite geometry and an uncluttered single input',()=>run((a,root,svg)=>{
  for(const width of [300,900])for(const rho of [500,800,1000,1300]){
    viewport(svg,width);density(a,root,rho);if(rho<=800)key(a,svg,'End');
    const view=svg.getAttribute('viewBox').split(' ').map(Number);assert.equal(view[2],width);
    for(const text of svg.querySelectorAll('text')){
      let parent=text;while(parent&&!parent.hasAttribute('font-size'))parent=parent.parentElement;
      assert.ok(parent&&+parent.getAttribute('font-size')>=16);
      const x=+text.getAttribute('x'),y=+text.getAttribute('y');assert.ok(x>=0&&x<=view[2]);assert.ok(y>=18&&y<=view[3]-10);
    }
    for(const path of svg.querySelectorAll('.mf1-vector path')){const c=coords(path);for(let i=0;i<c.length;i+=2){assert.ok(c[i]>=0&&c[i]<=view[2]);assert.ok(c[i+1]>=0&&c[i+1]<=view[3]);}}
    assert.equal(root.querySelectorAll('svg').length,1);assert.equal(root.querySelectorAll('input[type=range]').length,1);
    assert.equal(root.querySelectorAll('canvas,image,foreignObject,img').length,0);
    assert.equal(root.querySelectorAll('#v3-buoy-explainer li').length,3);
  }
}));
