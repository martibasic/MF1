const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const near=(a,b,tol=1e-9)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
function fixture(fn){const a=load(8);try{const r=a.w.document.getElementById('v8-explorer');fn(a,r,(id,v)=>a.change(r.querySelector('#v8x-'+id),v));a.scan('continuity');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function integratedCapacity(m,x){
  // Independent Simpson integration over each geometric segment, including the imposed density field.
  const edges=[0,...[3.5,6.5].filter(v=>v<x),x];let sum=0;
  for(let k=1;k<edges.length;k++){
    const lo=edges[k-1],hi=edges[k],n=200,dx=(hi-lo)/n;
    const f=s=>{const t=Math.max(0,Math.min(1,(s-3.5)/3)),D=m.d1+(m.d2-m.d1)*t,rho=m.kind==='density'?m.rho1+(m.rho2-m.rho1)*t:1;return rho*Math.PI*D*D/4;};
    let v=f(lo)+f(hi);for(let i=1;i<n;i++)v+=(i%2?4:2)*f(lo+i*dx);sum+=v*dx/3;
  }
  return sum;
}

test('Continuity: zero flow has no quotient or velocity arrows; every preset preserves the proper signed flux',()=>fixture((a,r,set)=>{
  set('q',0);let m=r.mf1Physics;assert.equal(m.velocityRatio,null);assert.match(r.querySelector('#v8x-primary').textContent,/nije definiran/);assert.doesNotMatch(r.querySelector('#v8x-primary strong').textContent,/v₂\/v₁ = 4/);assert.equal(r.querySelectorAll('[data-v8-velocity]').length,0);
  const before=[...m.tracerX];r.querySelector('.mf1-motion button').click();a.frames(20,500);assert.deepEqual(Array.from(r.mf1Physics.tracerX),before);assert.equal(r.querySelector('.mf1-motion button').getAttribute('aria-pressed'),'false');
  for(const mode of ['same','density']){
    r.querySelector('[data-mode='+mode+']').click();assert.equal(r.querySelectorAll('#v8x-controls input').length,2);
    for(const b of r.querySelectorAll('#v8x-presets button')){b.click();m=r.mf1Physics;near(m.normalFluxIn+m.normalFluxOut,0);near(m.massIn,m.massOut);near(m.velocityRatio,m.v2/m.v1);if(mode==='same')near(m.a1*m.v1,m.a2*m.v2);else near(m.rho1*m.a1*m.v1,m.rho2*m.a2*m.v2);assert.equal(r.querySelectorAll('#v8x-explain li[data-active=true]').length,1);}
  }
}));

test('Transported volume and mass give identical tracer positions at 2, 10 and 120 fps, retaining multiple wraps',()=>{
  for(const mode of ['same','density']){
    let reference;
    for(const fps of [2,10,120])fixture((a,r)=>{
      r.querySelector('[data-mode='+mode+']').click();const start=r.mf1Physics,total=integratedCapacity(start,10),rate=mode==='same'?start.q:start.md,T=40;
      near(start.transportCapacity,total,1e-12);assert.ok(rate*T/total>2,'test must cross at least two full transport cycles');
      r.querySelector('.mf1-motion button').click();a.frames(1,1000/fps);a.frames(T*fps,1000/fps);const m=r.mf1Physics;near(m.pipeTime,T,1e-10);near(m.transported,rate*T,1e-10);
      m.tracerX.forEach((x,i)=>{const expected=((i+.5)/m.tracerX.length+rate*T/total)%1;near(integratedCapacity(m,x)/total,expected,2e-9);assert.ok(x>=0&&x<10);});
      if(reference)m.tracerX.forEach((x,i)=>near(x,reference[i],2e-9));else reference=Array.from(m.tracerX);
    });
  }
});

test('Finite tank closes its time integral at both boundaries and a preset stops real MF1 motion',()=>fixture((a,r,set)=>{
  r.querySelector('[data-mode=tank]').click();const play=r.querySelector('.mf1-motion button');
  for(const [qin,qout,target]of [[20,0,2],[0,20,0]]){
    r.querySelectorAll('.mf1-motion button')[1].click();set('qin',qin);set('qout',qout);const start=r.mf1Physics,expected=(target-start.h0)/start.dh;
    play.click();a.frames(1,100000);a.frames(1,100000);const m=r.mf1Physics;near(m.time,expected);assert.equal(m.h,target);assert.equal(m.valid,false);assert.equal(play.getAttribute('aria-pressed'),'false');near(m.volume-m.volume0,(m.qin-m.qout)*m.time);near(m.deltaMass,1000*(m.volume-m.volume0));assert.equal(r.querySelectorAll('[data-v8-flow]').length,0);assert.equal(+r.querySelector('#v8x-explain li[data-active=true]').dataset.branch,3);
  }
  r.querySelector('#v8x-presets [data-p=fill]').click();play.click();a.frames(1,500);a.frames(1,500);assert.equal(play.getAttribute('aria-pressed'),'true');r.querySelector('#v8x-presets [data-p=drain]').click();assert.equal(play.getAttribute('aria-pressed'),'false');const h=r.mf1Physics.h;a.frames(20,500);assert.equal(r.mf1Physics.h,h);assert.equal(r.mf1Physics.time,0);
}));

test('Responsive native construction has quantitative section areas, fixed velocity scales and connected tank ports',()=>fixture((a,r,set)=>{
  const svg=r.querySelector('#v8x-scene');assert.equal(svg.localName,'svg');assert.equal(r.querySelectorAll('canvas,image,foreignObject').length,0);
  for(const width of [900,340]){
    Object.defineProperty(r,'clientWidth',{configurable:true,value:width});a.w.dispatchEvent(new a.w.Event('resize'));
    for(const mode of ['same','density']){
      r.querySelector('[data-mode='+mode+']').click();let fixed;
      for(const D of [60,120,200]){
        set('d2',D);if(mode==='same')set('q',20);const m=r.mf1Physics;
        if(fixed!==undefined)assert.equal(m.velocityScale,fixed);fixed=m.velocityScale;
        const a1=svg.querySelector('[data-v8-section="1"]'),a2=svg.querySelector('[data-v8-section="2"]');near(+a2.getAttribute('r')/+a1.getAttribute('r'),m.d2/m.d1);near((+a2.getAttribute('r')/+a1.getAttribute('r'))**2,m.a2/m.a1);
        for(const i of [1,2]){const cut=svg.querySelector('[data-v8-cut="'+i+'"]'),v=svg.querySelector('[data-v8-velocity="'+i+'"] line'),normal=svg.querySelector('[data-v8-normal="'+i+'"]');near(+cut.getAttribute('x1'),m['cut'+i]);near(+cut.getAttribute('y2')-+cut.getAttribute('y1'),m['d'+i]*m.diameterScale);near(+v.getAttribute('x2')-+v.getAttribute('x1'),m['v'+i]*m.velocityScale);assert.equal(+normal.dataset.normalX,i===1?-1:1);}
      }
    }
    r.querySelector('[data-mode=tank]').click();const m=r.mf1Physics,water=svg.querySelector('[data-v8-water]');near(+water.getAttribute('height'),m.h*m.heightScale);near(+water.getAttribute('y'),m.tankBottom-m.h*m.heightScale);
    const inlet=svg.querySelector('[data-v8-port=in]').getAttribute('d'),outlet=svg.querySelector('[data-v8-port=out]').getAttribute('d');assert.match(inlet,new RegExp('M '+m.inX+' 89 V '+(m.tankTop+22)));assert.match(outlet,new RegExp('M '+m.outX+' '+m.tankBottom+' V 424'));
    assert.ok(m.cvTop>89&&m.cvTop<m.tankTop+22);assert.ok(m.cvBottom>m.tankBottom&&m.cvBottom<424);
    if(width===340){assert.equal(m.svgWidth,360);assert.ok([...svg.querySelectorAll('text')].every(t=>+t.getAttribute('font-size')>=16));}
  }
}));
