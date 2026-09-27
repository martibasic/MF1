const test = require('node:test');
const assert = require('node:assert/strict');
const {load} = require('./widget-harness.cjs');
const sharp = require('sharp');
const near = (a,b,tol=1e-8) => assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)), `${a} ≈ ${b}`);
const numbers = path => path.getAttribute('d').match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi).map(Number);
function run(fn) {
  const a=load(2),root=a.w.document.getElementById('widget-z12-vdual-fixed');
  try { fn(a,root,selector=>root.querySelector(selector)); a.scan('individual capillary'); assert.deepEqual(a.errors,[]); }
  finally { a.dom.window.close(); }
}

test('Capillary contact angle follows the actual circular arc tangent, including both limiting semicircles',()=>run((a,root,q)=>{
  for(const theta of [0,1,30,45,89,90,91,130,150,179,180]) {
    a.change(q('#z12-theta'),theta);
    const path=q('#z12-meniscus'),p=numbers(path),f=numbers(q('#z12-force-right path'));
    const length=Math.hypot(f[2]-f[0],f[3]-f[1]);
    const tangent=[(f[2]-f[0])/length,(f[3]-f[1])/length];
    const angle=Math.atan2(tangent[0],-tangent[1])*180/Math.PI;
    near(angle,theta);
    if(theta===90){
      assert.doesNotMatch(path.getAttribute('d'),/A/);
      near(tangent[0],1); near(tangent[1],0);
      assert.equal(root.mf1ProfessorState.jump,0);
      continue;
    }
    assert.match(path.getAttribute('d'),/A/);
    const [x0,y0,rx,ry,,large,sweep,x1,y1]=p;
    assert.equal(rx,ry,'equal SVG radii preserve an actual circle');
    assert.equal(large,0); assert.equal(sweep,theta<90?0:1);
    near(y0,y1); near(f[0],x1); near(f[1],y1);
    const half=(x1-x0)/2,sgn=theta<90?1:-1;
    const circleY=y0-sgn*Math.sqrt(Math.max(0,rx*rx-half*half));
    const geometricTangent=[sgn*(y1-circleY)/rx,-sgn*half/rx];
    near(tangent[0],geometricTangent[0]); near(tangent[1],geometricTangent[1]);
    near(sgn*half/rx,Math.cos(theta*Math.PI/180));
    if(theta===0||theta===180){near(rx,half);near(tangent[0],0);}
    const left=numbers(q('#z12-force-left path'));
    near(left[2]-left[0],-(f[2]-f[0])); near(left[3]-left[1],f[3]-f[1]);
  }
}));

test('Capillary height probe uses the same signed hydrostatic level that the visible depth axis measures',()=>run((a,root,q)=>{
  for(const fluid of ['water','mercury'])for(const radius of [.1,.3,1.5])for(const theta of [0,45,90,130,180]) {
    a.change(q('#z12-fluid'),fluid);a.change(q('#r-slider-z12-dual'),radius);a.change(q('#z12-theta'),theta);
    const m=root.mf1ProfessorState,labels=[...q('#z12-column-panel').querySelectorAll('text')];
    const zero=+labels.find(t=>t.textContent==='0').getAttribute('y');
    const top=+labels.find(t=>t.textContent==='+150').getAttribute('y');
    const scale=(zero-top)/150;
    const bracket=numbers(q('#z12-height-bracket')),probe=+q('#z12-pressure-probe').getAttribute('cy');
    const surface=bracket[1],hMetres=(surface-probe)/scale/1000;
    near(hMetres,m.h,1e-12); near(numbers(q('#z12-level'))[1],probe);
    near(m.rho*9.81*hMetres,m.jump);
    near(m.pressureForce,-m.jump*Math.PI*m.r*m.r,1e-12);
    near(m.force+m.pressureForce,0,1e-12);
    assert.equal(Math.sign(m.force),theta===90?0:theta<90?1:-1);
    assert.equal(Math.sign(m.pressureForce),theta===90?0:theta<90?-1:1);
  }
}));

test('Capillary numerical branches expose pressure-force balance and continuous Bond validity',()=>run((a,root,q)=>{
  for(const fluid of ['water','mercury'])for(const radius of [.1,.3,1.5]) {
    a.change(q('#z12-fluid'),fluid);a.change(q('#r-slider-z12-dual'),radius);
    for(const [theta,branch] of [[0,0],[90,1],[130,2]]) {
      a.change(q('#z12-theta'),theta);
      const active=root.querySelectorAll('.mf1-decision li[data-active=true]');
      assert.equal(active.length,1); assert.equal(+active[0].dataset.branch,branch);
      const m=root.mf1ProfessorState;
      near(m.bond,m.rho*9.81*m.r*m.r/m.sigma,1e-12);
      assert.match(q('#z12-model-note').textContent,/Bo ≪ 1/);
      assert.ok(q('#z12-model-note').textContent.includes(a.w.MF1.number(m.bond)));
      assert.match(q('#z12-balance').textContent,/Fσ,z \+ Fp,z/);
      assert.doesNotMatch(q('#z12-balance').textContent,/težina/i);
      assert.ok(q('#z12-readings').textContent.includes(a.w.MF1.number(Math.abs(m.h*1000))));
    }
  }
  assert.ok(q('#hv-res-z12').textContent.length>0);assert.ok(q('#hhg-res-z12').textContent.length>0);
}));

test('Capillary mobile layout uses one SVG, readable local labels, and an isotropic contact detail without changing physics',()=>run((a,root,q)=>{
  const svg=q('#z12-vector');a.change(q('#z12-theta'),130);const original={...root.mf1ProfessorState};
  for(const width of [332,900,332]) {
    svg.getBoundingClientRect=()=>({width,height:400});a.w.dispatchEvent(new a.w.Event('resize'));a.frames(2);
    const narrow=width<620;
    const box=svg.getAttribute('viewBox').split(/\s+/).map(Number);
    assert.deepEqual(box,narrow?[0,0,360,800]:[0,0,760,400]);
    assert.equal(q('#z12-contact-panel').getAttribute('transform'),narrow?'translate(0 400)':'translate(400 0)');
    assert.equal(root.querySelectorAll('svg').length,1);
    assert.equal(root.querySelectorAll('canvas,image,foreignObject').length,0);
    for(const label of svg.querySelectorAll('text'))assert.ok(+label.getAttribute('font-size')*Math.min(1,width/box[2])>=16,'local SVG text remains legible at the 390px mobile layout');
    for(const field of ['h','jump','force','pressureForce','bond'])near(root.mf1ProfessorState[field],original[field],1e-12);
    for(const id of ['#r-slider-z12-dual','#z12-theta']) {
      const label=q(id).closest('label');
      assert.ok(label.firstElementChild.matches('span')&&label.firstElementChild.querySelector('output'));
    }
  }
}));

test('A depressed capillary visibly contains gas above its own liquid level, even below the external reservoir surface',async()=>{
  const a=load(2),root=a.w.document.getElementById('widget-z12-vdual-fixed');
  try {
    a.change(root.querySelector('#z12-theta'),130);
    const svg=root.querySelector('svg'),xml=new a.w.XMLSerializer().serializeToString(svg);
    const {data,info}=await sharp(Buffer.from(xml)).flatten({background:'#fff'}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
    const sample=(x,y)=>Array.from(data.subarray((y*info.width+x)*4,(y*info.width+x)*4+4));
    assert.deepEqual(sample(185,205),[255,255,255,255],'gas occupies the tube above the depressed internal level');
    const reservoir=sample(230,205);assert.ok(reservoir[0]<240&&reservoir[2]>reservoir[0],'external liquid remains visible at that same height');
    const below=sample(185,250);assert.ok(below[0]<200&&below[2]>below[0],'liquid occupies the tube below its own level');
    assert.deepEqual(a.errors,[]);
  } finally {a.dom.window.close();}
});
