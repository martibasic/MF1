const test=require('node:test');
const assert=require('node:assert/strict');
const {load}=require('./widget-harness.cjs');
const near=(a,b,tol=1e-9)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} ≈ ${b}`);
const nums=p=>p.getAttribute('d').match(/-?\d*\.?\d+(?:e[+-]?\d+)?/gi).map(Number);
const linePoints=e=>['x1','y1','x2','y2'].map(k=>+e.getAttribute(k));
function run(fn){const a=load(4),r=a.w.document.getElementById('z35-advanced-widget'),svg=r.querySelector('svg');try{fn(a,r,svg);a.scan('rotation field');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
const change=(a,r,id,v)=>a.change(r.querySelector('#'+id),v);
const key=(a,s,k)=>s.dispatchEvent(new a.w.KeyboardEvent('keydown',{key:k,bubbles:true,cancelable:true}));
function viewport(s,width){s.getBoundingClientRect=()=>({left:0,top:0,width,height:568});}
function pointer(a,s,type,x,y){s.dispatchEvent(new a.w.MouseEvent(type,{clientX:x,clientY:y,button:0,bubbles:true,cancelable:true}));}
function probe(a,r,s,rad,dep){const m=r.mf1ProfessorState.geometry;pointer(a,s,'pointerdown',m.left+rad*m.scale,m.top+dep*m.scale);pointer(a,s,'pointerup',m.left+rad*m.scale,m.top+dep*m.scale);}

test('Both connected SVG routes integrate independently to the local probe pressure at limits and interior points',()=>run((a,r,s)=>{
  viewport(s,900);
  for(const acceleration of [-9,5,20])for(const n of [0,90,300]){
    change(a,r,'z35-a-slider',acceleration);change(a,r,'z35-n-slider',n);
    for(const [rad,dep]of [[0,0],[0,2],[.5,0],[.5,2],[.25,1],[.12,.7]]){
      probe(a,r,s,rad,dep);const m=r.mf1ProfessorState,geo=m.geometry;
      near(m.r,rad);near(m.h,dep);near(m.z,dep);
      const paths=['z35-route-depth-first','z35-route-radius-first'].map(id=>[...r.querySelectorAll('#'+id+' line')].map(linePoints));
      for(const path of paths){
        near(path[0][0],geo.left);near(path[0][1],geo.top);near(path[0][2],path[1][0]);near(path[0][3],path[1][1]);near(path[1][2],+s.querySelector('#z35-probe').getAttribute('cx'));near(path[1][3],+s.querySelector('#z35-probe').getAttribute('cy'));
        let integral=0;const N=400;
        for(const [x1,y1,x2,y2]of path){const r0=(x1-geo.left)/geo.scale,r1=(x2-geo.left)/geo.scale,h0=(y1-geo.top)/geo.scale,h1=(y2-geo.top)/geo.scale;
          for(let i=0;i<N;i++){const rr=r0+(r1-r0)*(i+.5)/N;integral+=740*((n*Math.PI/30)**2*rr*(r1-r0)+(9.81+acceleration)*(h1-h0))/N;}
        }
        near(m.pressure,integral);
      }
      near(m.pVertical,740*(9.81+acceleration)*dep);near(m.pRadial,370*(n*Math.PI/30)**2*rad*rad);near(m.pressure,m.pVertical+m.pRadial);
    }
  }
}));

test('Every drawn quadratic isobar has constant analytic pressure and a tangent perpendicular to the local gradient',()=>run((a,r,s)=>{
  for(const acceleration of [-9,5,20])for(const n of [0,90,300]){
    change(a,r,'z35-a-slider',acceleration);change(a,r,'z35-n-slider',n);const m=r.mf1ProfessorState,g=m.geometry;
    const field=s.querySelector('[data-fluid-domain]');near(+field.getAttribute('width')/+field.getAttribute('height'),.25);
    const curves=[...s.querySelectorAll('[data-isobar]')];assert.equal(curves.length,4);
    for(const p of curves){const [x0,y0,xc,yc,x1,y1]=nums(p),expected=+p.dataset.isobar;
      for(const t of [0,.1,.25,.5,.75,.9,1]){
        const u=1-t,x=u*u*x0+2*u*t*xc+t*t*x1,y=u*u*y0+2*u*t*yc+t*t*y1;
        const rr=(x-g.left)/g.scale,hh=(y-g.top)/g.scale,dx=(2*u*(xc-x0)+2*t*(x1-xc))/g.scale,dh=(2*u*(yc-y0)+2*t*(y1-yc))/g.scale;
        assert.ok(rr>=-1e-10&&rr<=.5+1e-10);assert.ok(hh>=-1e-10&&hh<=2+1e-10);
        near(740*((9.81+acceleration)*hh+(n*Math.PI/30)**2*rr*rr/2),expected);
        near((n*Math.PI/30)**2*rr*dx+(9.81+acceleration)*dh,0,1e-8);
      }
    }
    const walls=s.querySelector('[data-cylinder-walls]').getAttribute('d');assert.match(walls,/H.*V.*H/);assert.doesNotMatch(walls,/Z/i);
    assert.ok(s.querySelector('[data-rotation-axis]').getAttribute('stroke-dasharray'));
  }
}));

test('The exact equality preset reaches one exclusive physical branch and compares full H/R, not arbitrary local contributions',()=>run((a,r,s)=>{
  assert.equal(r.querySelector('#z35-n-slider').step,'any');
  const active=()=>[...r.querySelectorAll('#z35-decisions [data-active=true]')].map(el=>+el.dataset.branch);
  for(const acceleration of [-9,0,5,20]){
    change(a,r,'z35-a-slider',acceleration);key(a,s,'Home');change(a,r,'z35-n-slider',0);assert.deepEqual(active(),[0]);
    r.querySelector('#z35-balance').click();let m=r.mf1ProfessorState;
    const ncrit=30/Math.PI*Math.sqrt(2*(9.81+acceleration)*2/(.5*.5));near(m.n,ncrit);near(m.dpv,m.dpr);near(m.chi,1);assert.deepEqual(active(),[2]);
    near(m.pVertical,2*m.pRadial);assert.notEqual(m.pVertical,m.pRadial,'full-geometry equality does not imply equality at the center probe');
    for(const [factor,branch]of [[1-1e-5,1],[1+1e-5,3]]){change(a,r,'z35-n-slider',ncrit*factor);assert.deepEqual(active(),[branch]);}
    for(const factor of [1-1e-12,1+1e-12]){change(a,r,'z35-n-slider',ncrit*factor);assert.deepEqual(active(),[2],'roundoff tolerance cannot activate two branches');}
  }
}));

test('Probe gradients agree with independent finite differences and original task numeric values remain intact',()=>run((a,r,s)=>{
  const m=r.mf1ProfessorState;
  near(m.dpv,21918.8);near(m.dpr,8216.44566390617);near(m.pressure,13013.511415976543);
  for(const acceleration of [-9,5,20])for(const n of [0,90,300]){
    change(a,r,'z35-a-slider',acceleration);change(a,r,'z35-n-slider',n);const q=r.mf1ProfessorState;
    const pressure=(rr,hh)=>740*((9.81+acceleration)*hh+(n*Math.PI/30)**2*rr*rr/2),e=1e-5;
    near(q.gradientR,(pressure(q.r+e,q.h)-pressure(q.r-e,q.h))/(2*e),1e-7);
    near(q.gradientDepth,(pressure(q.r,q.h+e)-pressure(q.r,q.h-e))/(2*e),1e-7);
  }
}));

test('Responsive native SVG keeps geometry isotropic, the full probe keyboard/drag range and three local readings',()=>run((a,r,s)=>{
  for(const width of [300,900]){
    viewport(s,width);change(a,r,'z35-a-slider',5);change(a,r,'z35-n-slider',90);key(a,s,'Home');
    const g=r.mf1ProfessorState.geometry;near(g.width,width);near((g.right-g.left)/.5,(g.bottom-g.top)/2);
    pointer(a,s,'pointerdown',g.left-40,g.top);near(r.mf1ProfessorState.r,.25);
    pointer(a,s,'pointerdown',g.left,g.top);near(r.mf1ProfessorState.r,0);near(r.mf1ProfessorState.h,0);
    pointer(a,s,'pointermove',g.right+100,g.bottom+100);near(r.mf1ProfessorState.r,.5);near(r.mf1ProfessorState.h,2);
    pointer(a,s,'pointerup',g.right,g.bottom);pointer(a,s,'pointermove',g.left,g.top);near(r.mf1ProfessorState.r,.5);
    key(a,s,'ArrowRight');key(a,s,'ArrowDown');near(r.mf1ProfessorState.r,.5);near(r.mf1ProfessorState.h,2);
    key(a,s,'Home');key(a,s,'ArrowLeft');key(a,s,'ArrowUp');near(r.mf1ProfessorState.r,.225);near(r.mf1ProfessorState.h,.9);
    key(a,s,'ArrowRight');key(a,s,'ArrowDown');near(r.mf1ProfessorState.r,.25);near(r.mf1ProfessorState.h,1);
    assert.equal(r.querySelectorAll('svg').length,1);assert.equal(r.querySelectorAll('canvas,image,foreignObject,img').length,0);assert.equal(r.querySelectorAll('.z35-reading-row>div').length,3);
    for(const t of s.querySelectorAll('text')){const owner=t.closest('[font-size]');assert.ok(owner&&+owner.getAttribute('font-size')>=16);}
    assert.match(r.querySelector('.z35-intro').textContent,/p\(P\) − p\(O\)/);assert.match(r.querySelector('.z35-intro').textContent,/ne slobodna površina/);
  }
}));
