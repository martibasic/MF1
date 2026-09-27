/* SI models for the field laboratories. Each exposes local fields and global balances. */
(function(scope){
 'use strict';
 const g=9.81, clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 const base=typeof module==='undefined'?scope.MF1:Object.assign({},require('./mf1-widgets.js'),require('./mf1-science.js'));
 function shear({U=1,h=.01,mu=.1,G=0}){
  // G=-dp/dx. Exact steady, fully developed plane Couette–Poiseuille solution.
  const velocity=y=>U*y/h+G*y*(h-y)/(2*mu),gradient=y=>U/h+G*(h-2*y)/(2*mu);
  const mean=U/2+G*h*h/(12*mu),dissipation=mu*U*U/h+G*G*h**3/(12*mu);
  return {velocity,gradient,stress:y=>mu*gradient(y),mean,flux:mean*h,
   wallPower:mu*gradient(h)*U,pressurePower:G*mean*h,dissipation};
 }
 function layers({h=3,split=.4,rho1=800,rho2=1000}){
  const interfaceDepth=h*split;
  return {interfaceDepth,pressure:z=>g*(rho1*Math.min(z,interfaceDepth)+rho2*Math.max(0,z-interfaceDepth)),density:z=>z<interfaceDepth?rho1:rho2};
 }
 function gate({L=2,b=1,depth=.5,angle=60,rho=1000}){
  const sin=Math.sin(angle*Math.PI/180),area=b*L,centroid=depth+L*sin/2;
  const force=rho*g*area*centroid,moment=rho*g*b*(depth*L*L/2+sin*L**3/3);
  return {area,centroid,force,moment,center:moment/force,pressure:s=>rho*g*(depth+s*sin)};
 }
 function cylinder({R=1,b=1,rho=1000,body=600,offset=0}){
  const area=z=>{const q=clamp(z/R,-1,1);return R*R*(Math.acos(-q)+q*Math.sqrt(Math.max(0,1-q*q)));};
  let lo=-R,hi=R;for(let i=0;i<65;i++){const mid=(lo+hi)/2;if(rho*area(mid)<body*Math.PI*R*R)lo=mid;else hi=mid;}
  const equilibrium=(lo+hi)/2,z=equilibrium+offset*R,volume=area(z)*b,weight=body*g*Math.PI*R*R*b,buoyancy=rho*g*volume;
  return {equilibrium,z,volume,weight,buoyancy,net:buoyancy-weight,area,pressure:t=>rho*g*Math.max(0,z+R*Math.sin(t))};
 }
 function duct({Q=.02,D=.2,ratio=.55,L=4,H=8,loss=0}){
  // Smooth axisymmetric quasi-1D duct. Tracers integrate dx/dt=Q/A(x).
  const diameter=x=>D*(1-(1-ratio)*Math.sin(Math.PI*clamp(x/L,0,1))**2);
  const area=x=>Math.PI*diameter(x)**2/4,velocity=x=>Q/area(x),head=x=>H-loss*x/L;
  const pressure=x=>1000*g*(head(x)-velocity(x)**2/(2*g));
  const N=600,volume=[0];for(let i=1;i<=N;i++)volume.push(volume[i-1]+(area((i-1)*L/N)+area(i*L/N))*L/N/2);
  const position=(fraction,time=0)=>{const total=volume[N],target=((fraction*total+Q*time)%total+total)%total;let a=0,b=N;while(b-a>1){const m=(a+b)>>1;if(volume[m]<target)a=m;else b=m;}return (a+(target-volume[a])/(volume[b]-volume[a]))*L/N;};
  return {diameter,area,velocity,head,pressure,position,volume:volume[N],mass:1000*Q};
 }
 function pipe({Q=.01,D=.1,L=30,roughness=.000045,zeta=3,H=12}){
  const branch=base.pipeBranch(Q,D,{L,k:roughness,rho:1000,mu:.001});
  const kinetic=branch.V**2/(2*g),local=zeta*kinetic,total=branch.h+local;
  return {...branch,kinetic,local,total,power:1000*g*Q*total,
   minimumAbsolutePressure:101325+1000*g*(H-total-kinetic),
   head:x=>H-branch.h*x/L-(x>=.6*L?local:0),pressure:x=>1000*g*(H-branch.h*x/L-(x>=.6*L?local:0)-kinetic)};
 }
 function jet({Q=.02,V=12,angle=90,k=1}){
  const a=angle*Math.PI/180,mass=1000*Q,vx=k*V*Math.cos(a),vy=k*V*Math.sin(a);
  return {mass,vx,vy,fx:mass*(V-vx),fy:-mass*vy,loss:.5*mass*V*V*(1-k*k)};
 }
 function pelton({Q=.04,V=25,ratio=.45,beta=165,k=.9}){
  const U=ratio*V,W1=V-U,a=beta*Math.PI/180,wx=k*W1*Math.cos(a),wy=k*W1*Math.sin(a),vx=U+wx,vy=wy;
  const force=1000*Q*(V-vx),power=force*U,input=.5*1000*Q*V*V,exit=.5*1000*Q*(vx*vx+vy*vy),loss=.5*1000*Q*W1*W1*(1-k*k);
  return {U,W1,wx,wy,vx,vy,force,power,input,exit,loss,efficiency:input?power/input:0};
 }
 const api={shear,layers,gate,cylinder,duct,pipe,jet,pelton};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
 scope.MF1FieldModels=api;
})(typeof window==='undefined'?globalThis:window);
