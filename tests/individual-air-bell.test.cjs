const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const close=(a,b,tol=1e-10)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
function fixture(fn){const a=load(6);try{const r=a.w.document.getElementById('widget-55');fn(a,r,(id,v)=>a.change(r.querySelector('#z55-'+id),v));a.scan('air bell');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function diskIntegral(D,p){let force=0;const dr=D/2/20000;for(let i=0;i<20000;i++){const r=(i+.5)*dr;force+=p*2*Math.PI*r*dr;}return force;}

test('Air bell: independent roof-pressure integral and a manometer pressure loop close every parameter extreme',()=>fixture((a,r,set)=>{
  for(const G of [20,79,150])for(const D of [.15,.3,.5])for(const h of [.05,.2,.5])for(const rm of [1.2,2.1,3]){
    set('g',G);set('d',D);set('h',h);set('rm',rm);const m=r.mf1Physics;
    close(m.pressureForce,diskIntegral(D,m.p));close(m.pressureForce,G+m.F);close(m.p,1000*9.81*h);
    // Pressures at the same low level in the two equal-area legs must agree.
    const leftBottom=m.p+1000*rm*9.81*(m.tubeBottomZ-m.leftZ),rightBottom=1000*rm*9.81*(m.tubeBottomZ-m.rightZ);
    close(leftBottom,rightBottom);close((m.leftZ+m.rightZ)/2,.3);close(m.leftZ-m.rightZ,m.h1);close(m.h1,h/rm);
    assert.ok(m.roofZ<0&&m.rimZ>h);assert.ok(m.connectionZ<m.leftZ&&m.openZ<m.rightZ);
    const branches=r.querySelectorAll('#z55-note li[data-active=true]');assert.equal(branches.length,1);assert.equal(+branches[0].dataset.branch,m.F>0?0:m.F<0?2:1);
  }
  set('g',20);set('d',.5);set('h',.5);close(r.mf1Physics.pressureForce,963.094497866121);close(r.mf1Physics.F,943.094497866121);
}));

test('Exact neutral preset preserves small nonzero forces and explicitly disables inaccessible thresholds',()=>fixture((a,r,set)=>{
  const h=r.querySelector('#z55-h'),button=r.querySelector('#z55-neutral');assert.equal(h.step,'any');close(r.mf1Physics.neutralDepth,.11392674598944);
  button.click();let s=r.mf1Physics;assert.equal(s.F,0);assert.equal(s.branch,1);assert.equal(r.querySelector('#z55-f').textContent,'0 N');close(s.h,s.neutralDepth,1e-14);
  for(const sign of [-1,1]){set('h',s.neutralDepth+sign*1e-9);const m=r.mf1Physics;assert.equal(Math.sign(m.F),sign);assert.equal(m.branch,sign>0?0:2);assert.doesNotMatch(r.querySelector('#z55-f').textContent,/^0 N/);close(m.F,sign*1e-9*1000*9.81*m.A,1e-11);}
  for(const [G,D]of [[150,.15],[20,.5]]){set('g',G);set('d',D);assert.equal(button.disabled,true);assert.equal(r.mf1Physics.neutralAvailable,false);const old=r.mf1Physics.h;button.click();assert.equal(r.mf1Physics.h,old);assert.match(r.querySelector('#z55-neutral-read').textContent,/izvan raspona/);}
  set('g',79);set('d',.3);set('h',.2);const before=r.mf1Physics;set('rm',3);close(r.mf1Physics.F,before.F);close(r.mf1Physics.p,before.p);assert.ok(r.mf1Physics.h1<before.h1);
}));

test('Native bell drawing keeps fixed roof/rim, a common metre scale and collinear calibrated force vectors',()=>fixture((a,r,set)=>{
  const svg=r.querySelector('#z55-canvas');assert.equal(svg.localName,'svg');assert.equal(svg.dataset.mf1Vector,'true');assert.equal(r.querySelectorAll('canvas,image,foreignObject').length,0);assert.equal(r.querySelectorAll('input[type=range]').length,4);
  for(const width of [950,340]){
    Object.defineProperty(r,'clientWidth',{configurable:true,value:width});a.w.dispatchEvent(new a.w.Event('resize'));
    const roof=r.mf1Physics.roofY,rim=r.mf1Physics.rimY;
    for(const D of [.15,.5])for(const h of [.05,.2,.5])for(const rm of [1.2,3]){
      set('d',D);set('h',h);set('rm',rm);const m=r.mf1Physics;
      close(m.roofY,roof);close(m.rimY,rim);close((m.bellRight-m.bellLeft)/D,m.scale);close((m.interfaceY-m.freeY)/h,m.scale);close((m.leftY-m.rightY)/m.h1,m.scale);
      const h1=svg.querySelector('[data-z55-h1-dimension]'),h2=svg.querySelector('[data-z55-h2-dimension]');close(+h1.getAttribute('y2')-+h1.getAttribute('y1'),m.h1*m.scale);close(+h2.getAttribute('y2')-+h2.getAttribute('y1'),h*m.scale);
      const left=svg.querySelector('[data-z55-left-level]'),right=svg.querySelector('[data-z55-right-level]');close(+left.getAttribute('y1'),m.leftY);close(+right.getAttribute('y1'),m.rightY);
      for(const [name,value,direction]of [['pressure',m.pressureForce,-1],['weight',m.G,1],['holding',m.F,1]]){
        const vector=svg.querySelector('[data-z55-force='+name+']'),line=vector.querySelector('line');close(+line.getAttribute('x1'),m.bellX);close(+line.getAttribute('x2'),m.bellX);close(+line.getAttribute('y2')-+line.getAttribute('y1'),value*direction*m.forceScale);
      }
      const key=svg.querySelector('[data-z55-force-key] line');close(+key.getAttribute('y2')-+key.getAttribute('y1'),100*m.forceScale);
      if(width===340){assert.equal(svg.width,360);assert.ok([...svg.querySelectorAll('text')].every(t=>+t.getAttribute('font-size')>=16));}
    }
  }
}));
