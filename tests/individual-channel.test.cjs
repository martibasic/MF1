const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {load}=require('./widget-harness.cjs');
const near=(a,b,tol=1e-9)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
function fixture(fn){const a=load(10);try{const r=a.w.document.getElementById('v10-z93-lab'),set=(id,v)=>a.change(r.querySelector('#v10-z93-'+id),v);fn(a,r,set);a.scan('individual channel');assert.deepEqual(a.errors,[]);}finally{a.dom.window.close();}}
function branch(r){const b=r.querySelectorAll('#v10-z93-explain li[data-active=true]');assert.equal(b.length,1);return +b[0].dataset.branch;}

test('Channel: calibrated inverse flow and local depth solve conserve energy and mass in every drawn section',()=>fixture((a,r,set)=>{
 let s=r.mf1ChannelState;near(s.q,2.3334655097749724);near(s.Fr1,.44975378704573615);near(s.Fr2,.7127070344976608);near(s.yc,.8218223000300359);near(s.E1,1.541594928261285);near(s.E2,1.291594928261285);
 for(const h of [.6,1.4,3])for(const d of [.02,.12,.5])for(const delta of [.02,.25,.65]){
  set('h',h);set('d',d);set('delta',delta);s=r.mf1ChannelState;branch(r);if(!s.valid)continue;
  // The two endpoint Bernoulli equations are checked in energy per mass, separately from the drawing solver.
  near(s.v2*s.v2-s.v1*s.v1,2*s.g*d);near(h*s.v1,s.y2*s.v2);assert.ok(s.Fr1<1);near(s.Fr2*s.Fr2,s.q*s.q/(s.g*s.y2**3));
  for(const p of s.profile){near(p.y*p.v,s.q);near(s.g*(p.zb+p.y)+p.v*p.v/2,s.g*h+s.v1*s.v1/2,2e-10);assert.ok(p.y>=s.yc-1e-10);near(p.surface,p.zb+p.y);}
  near(s.profile[0].y,h);near(s.profile.at(-1).zb,delta);if(s.continuous)near(s.profile.at(-1).y,s.y2,2e-7);else assert.ok(s.subcriticalY2>s.y2);
 }
}));

test('Formal supercritical endpoint is separated from its smooth subcritical alternative, not called choking',()=>fixture((a,r,set)=>{
 set('d',.5);const s=r.mf1ChannelState;near(s.y2,.65);near(s.q,2.2986261007908344);near(s.Fr2,1.4004377050784975);near(s.subcriticalY2,1.03694574276413);near(s.criticalRise,.3169657388,2e-10);assert.equal(s.continuous,false);assert.equal(s.valid,true);assert.ok(s.criticalRise>s.delta);assert.equal(branch(r),3);
 assert.equal(r.querySelectorAll('[data-channel-velocity]').length,0);assert.equal(r.querySelector('#v10-z93-water'),null);assert.equal(r.querySelector('#v10-z93-surface').dataset.channelAlternative,'true');assert.ok(r.querySelector('#v10-z93-surface').getAttribute('stroke-dasharray'));assert.match(r.querySelector('#v10-z93-explain').textContent,/nije automatski zagušenje/);
 const line=r.querySelector('#v10-z93-prescribed');near(+line.getAttribute('y1'),s.base-(s.h-s.d)*s.zScale);near(+line.dataset.prescribedY,s.y2);
}));

test('Critical preset reaches the double root exactly, handles unavailable settings, and treats decimal closure consistently',()=>fixture((a,r,set)=>{
 const b=r.querySelector('#v10-z93-critical');b.click();let s=r.mf1ChannelState;near(s.d,.2657490488180131);near(s.Fr2,1);near(s.y2,s.yc);near(s.E2,1.5*s.yc);near(s.criticalRise,s.delta);assert.equal(branch(r),2);assert.equal(s.continuous,true);assert.equal(r.querySelector('#v10-z93-d').step,'any');
 const critical=s.d;set('d',critical-1e-6);assert.equal(branch(r),1);set('d',critical+1e-6);assert.equal(branch(r),3);
 set('h',3);set('delta',.65);assert.equal(b.disabled,true);near(r.mf1ChannelState.criticalDepth,.5768590151,1e-10);set('delta',.02);assert.equal(b.disabled,false);b.click();s=r.mf1ChannelState;near(s.d,.182286237398,1e-10);near(s.Fr2,1);assert.equal(branch(r),2);
 set('h',.6);set('d',.35);set('delta',.25);s=r.mf1ChannelState;assert.equal(s.valid,false);assert.equal(s.y2,0);assert.equal(branch(r),0);assert.equal(r.querySelectorAll('[data-channel-velocity]').length,0);
 set('delta',.25-1e-10);s=r.mf1ChannelState;assert.equal(s.valid,true);assert.ok(s.y2>0&&s.q>0);assert.ok(Number.isFinite(s.v2)&&Number.isFinite(s.Fr2));near(s.v2,Math.sqrt(2*s.g*s.d));for(const p of s.profile)near(s.g*(p.zb+p.y)+p.v*p.v/2,s.g*s.h+s.v1*s.v1/2);assert.equal(branch(r),3);
 set('delta',.25+1e-10);assert.equal(r.mf1ChannelState.valid,false);assert.equal(branch(r),0);
}));

test('Native profile has fixed vertical and velocity scales, true raised section 2, and arrows inside the water',()=>fixture((a,r,set)=>{
 const svg=r.querySelector('svg');assert.equal(r.querySelectorAll('canvas,image,foreignObject').length,0);assert.equal(r.querySelectorAll('.v10x-results .v10x-primary').length,3);assert.equal(r.querySelectorAll('input[type=range]').length,3);
 for(const width of [900,340]){Object.defineProperty(r,'clientWidth',{configurable:true,value:width});a.w.dispatchEvent(new a.w.Event('resize'));let fixed;
  for(const h of [.6,1.4,3]){set('h',h);set('d',.02);set('delta',.02);const s=r.mf1ChannelState;assert.equal(s.continuous,true);if(fixed!==undefined)assert.equal(s.zScale,fixed);fixed=s.zScale;
   for(const p of s.profile){assert.ok(p.zb>=0&&p.zb<=s.delta+1e-12);if(p.x<=2.5)near(p.zb,0);if(p.x>=7.5)near(p.zb,s.delta);}
   for(const i of [1,2]){const line=svg.querySelector('#v10-z93-arrow'+i+' line'),y=+line.getAttribute('y1'),bed=i===1?0:s.delta,depth=i===1?s.h:s.y2;near(+line.getAttribute('x2')-+line.getAttribute('x1'),s['v'+i]*s.velocityScale);assert.ok(y<s.base-bed*s.zScale&&y>s.base-(bed+depth)*s.zScale);assert.ok(+line.getAttribute('x2')<s.plotRight);}
   near(+svg.querySelector('#v10-z93-dim-delta').getAttribute('y1')-+svg.querySelector('#v10-z93-dim-delta').getAttribute('y2'),s.delta*s.zScale);if(width===340){assert.equal(s.svgWidth,360);assert.ok([...svg.querySelectorAll('text')].every(t=>+t.getAttribute('font-size')>=20));}
  }
 }
 const source=fs.readFileSync('vjezba_10.qmd','utf8'),start=source.indexOf('aria-labelledby="z93-svg-title"'),staticFigure=source.slice(start,source.indexOf('</svg>',start));assert.match(staticFigure,/M70 215H390C450 215 500 160 550 160H830/);assert.match(staticFigure,/Presjek 2 na podignutom dijelu/);
}));
