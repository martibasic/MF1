const test=require('node:test'),assert=require('node:assert/strict');
const M=require('../assets/mf1-field-models.js'),F=require('../assets/mf1-science.js');
const near=(a,b,t=1e-8)=>assert.ok(Math.abs(a-b)<t*Math.max(1,Math.abs(b)),`${a} != ${b}`);
test('Couette–Poiseuille satisfies both walls, Navier–Stokes, flux and work-dissipation balance',()=>{
 for(const U of [0,1,2])for(const G of [-8000,0,8000])for(const mu of [.05,.1,.5]){
  const h=.01,m=M.shear({U,G,mu,h});near(m.velocity(0),0);near(m.velocity(h),U);near(m.wallPower+m.pressurePower,m.dissipation);
  let integral=0;for(let i=0;i<1000;i++)integral+=m.velocity((i+.5)*h/1000)*h/1000;near(integral,m.flux,1e-7);
  const y=.006,dy=1e-5;near(mu*(m.gradient(y+dy)-m.gradient(y-dy))/(2*dy),-G);
 }
 assert.ok(M.shear({U:1,G:-8000,h:.01,mu:.1}).velocity(.002)<0);
});
test('Layer pressure is continuous and its derivative is the local specific weight',()=>{
 const m=M.layers({h:3,split:.4,rho1:800,rho2:1000});near(m.pressure(1.2-1e-8),m.pressure(1.2+1e-8),1e-7);
 for(const z of [.2,2])near((m.pressure(z+1e-5)-m.pressure(z-1e-5))/2e-5,m.density(z)*9.81);
});
test('Inclined gate force and moment match independent quadrature, including surface hinge',()=>{
 for(const depth of [0,.5,2])for(const angle of [15,60,90]){
  const m=M.gate({L:2,b:1,depth,angle,rho:1000});let force=0,moment=0;
  for(let i=0;i<5000;i++){const s=(i+.5)*2/5000,df=m.pressure(s)*2/5000;force+=df;moment+=s*df;}
  near(force,m.force);near(moment,m.moment,1e-7);near(m.center,m.moment/m.force);assert.ok(m.center>=1&&m.center<=4/3+1e-12);
 }
});
test('Cylinder equilibrium and restoring force agree with integral of actual wet pressure',()=>{
 for(const body of [100,600,950])for(const offset of [-.8,0,.8]){
  const m=M.cylinder({R:.8,b:1,rho:1000,body,offset}),arc=F.arcPressure({R:.8,zC:m.z});near(-arc.fz,m.buoyancy);near(arc.fx,0);
  if(!offset)near(m.net,0);else assert.ok(m.net*offset>0);
 }
});
test('Duct conserves flux and energy; particle travel follows local velocity and elapsed time',()=>{
 for(const Q of [0,.005,.04])for(const ratio of [.35,.55,1]){
  const m=M.duct({Q,ratio,H:8});for(const x of [0,.4,2,3.8,4]){near(m.area(x)*m.velocity(x),Q);near(m.pressure(x)/(1000*9.81)+m.velocity(x)**2/(2*9.81),8);}
  for(const f of [.1,.3,.7]){const dt=1e-6,x=m.position(f,0),dx=(m.position(f,dt)-x)/dt;near(dx,m.velocity(x),.003);}
  near(m.position(.2,m.volume/(Q||1)),m.position(.2,0),Q?1e-7:1e-8);
 }
});
test('Pipe energy is monotone and local jump has the prescribed magnitude',()=>{
 for(const Q of [0,.00001,.008,.02]){
  const m=M.pipe({Q,D:.1,L:30,zeta:3,H:12});near(m.head(0)-m.head(30),m.total);near(m.power,1000*9.81*Q*m.total);
  near(m.head(18-1e-8)-m.head(18+1e-8),m.local,1e-7);assert.ok(m.total>=0);
 }
});
test('Jet momentum and Pelton three-part power budget close over every parameter corner',()=>{
 for(const angle of [0,90,180]){const m=M.jet({Q:.02,V:12,angle,k:1});near(Math.hypot(m.fx,m.fy),2*m.mass*12*Math.sin(angle*Math.PI/360));near(m.loss,0);}
 for(const ratio of [0,.2,.5,.8,1])for(const beta of [100,165,180])for(const k of [.6,.9,1]){
  const m=M.pelton({ratio,beta,k});near(m.vx,m.U+m.wx);near(m.vy,m.wy);near(m.input,m.power+m.exit+m.loss);assert.ok(m.power>=0&&m.loss>=0&&m.efficiency<=1+1e-10);
  assert.ok(M.pelton({ratio:.5,beta,k}).power>=m.power-1e-8);
 }
});
