(function(scope){
 'use strict';
 const g=9.81;
 function polygonProperties(points){
  if(points.length<3)return {area:0,x:0,y:0};let twice=0,mx=0,my=0;
  for(let i=0;i<points.length;i++){const p=points[i],q=points[(i+1)%points.length],c=p[0]*q[1]-q[0]*p[1];twice+=c;mx+=(p[0]+q[0])*c;my+=(p[1]+q[1])*c;}
  return Math.abs(twice)<1e-14?{area:0,x:0,y:0}:{area:Math.abs(twice)/2,x:mx/(3*twice),y:my/(3*twice)};
 }
 function submergedPolygon(points){
  const result=[];for(let i=0;i<points.length;i++){
   const a=points[i],b=points[(i+1)%points.length],wetA=a[1]<=0,wetB=b[1]<=0;
   if(wetA)result.push(a);if(wetA!==wetB){const t=-a[1]/(b[1]-a[1]);result.push([a[0]+t*(b[0]-a[0]),0]);}
  }return result;
 }
 function floatingBlock(width,height,rhoBody,rhoFluid,angleDegrees){
  if(!(width>0&&height>0&&rhoBody>0&&rhoBody<rhoFluid))return null;
  const angle=angleDegrees*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle),fraction=rhoBody/rhoFluid,target=width*height*fraction;
  const local=[[-width/2,-height/2],[width/2,-height/2],[width/2,height/2],[-width/2,height/2]].map(([x,y])=>[x*c-y*s,x*s+y*c]);
  const shifted=y=>local.map(p=>[p[0],p[1]+y]);
  let lo=-(width+height),hi=width+height;
  for(let i=0;i<64;i++){const mid=(lo+hi)/2,area=polygonProperties(submergedPolygon(shifted(mid))).area;if(area>target)lo=mid;else hi=mid;}
  const centerY=(lo+hi)/2,body=shifted(centerY),wet=submergedPolygon(body),buoyancy=polygonProperties(wet),weight=rhoBody*g*width*height,draft=fraction*height;
  const GM=draft/2+width*width/(12*draft)-height/2;
  return {body,wet,buoyancy,centerY,fraction,draft,GM,weight,force:rhoFluid*g*buoyancy.area,moment:weight*buoyancy.x,angle};
 }
 function balloon(p2,{p1=.1,D1=.3,rho=1000}={}){if(!(p2>0&&p1>0&&D1>0&&rho>0))return null;const D=D1*Math.sqrt(p1/p2),volume=Math.PI*D**3/6,force=rho*g*volume,initial=rho*g*Math.PI*D1**3/6;return {D,volume,force,initial,ratio:force/initial};}
 const models={floatingBlock,balloon,polygonProperties,submergedPolygon};
 if(typeof module!=='undefined'&&module.exports)module.exports=models;
})(typeof window==='undefined'?globalThis:window);
