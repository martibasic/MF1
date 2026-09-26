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
 if(!scope.document)return;
 Object.assign(scope.MF1,models);
 const f=(x,d=2)=>Number(x).toLocaleString('hr-HR',{minimumFractionDigits:d,maximumFractionDigits:d});
 function controls(root,items){
  const box=document.createElement('div');box.className='mf1-new-controls';
  for(const [id,name,min,max,step,value,unit] of items){const label=document.createElement('label');label.innerHTML=`<span>${name}</span><output for="${id}"></output><input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${name} [${unit}]">`;label.dataset.unit=unit;box.append(label);}root.append(box);
  return ()=>{const state={};box.querySelectorAll('input').forEach(n=>{state[n.id]=+n.value;n.previousElementSibling.textContent=f(+n.value,String(n.step).split('.')[1]?.length||0)+' '+n.parentElement.dataset.unit;});return state;};
 }
 function balloonLab(root){
  root.classList.add('mf1-new-lab');
  root.innerHTML='<h4>Z53 · tlak smanjuje promjer, volumen određuje uzgon</h4><p>Zadani elastični zakon <b>pD² = konst.</b> · apsolutni tlakovi · zanemariva težina balona</p><svg viewBox="0 0 880 360" role="img" aria-label="Dva balona u istoj skali duljine, s uzgonom i silom užeta" id="z53-scene"></svg>';
  const forceScene=document.createElementNS('http://www.w3.org/2000/svg','svg');
  forceScene.id='z53-force-detail';forceScene.setAttribute('viewBox','0 0 880 235');
  forceScene.setAttribute('role','img');forceScene.setAttribute('aria-label','Uvećana ravnoteža konačnog uzgona i napetosti užeta, s vlastitim mjerilom');root.append(forceScene);
  const state=controls(root,[['z53-p2','Konačni tlak p₂',.1,1.6,.05,1.6,'MPa'],['z53-d1','Početni promjer D₁',.15,.45,.01,.3,'m']]);
  const cards=document.createElement('div');cards.className='mf1-new-readings';cards.innerHTML='<div><small>Konačni promjer D₂</small><strong id="z53-d2"></strong></div><div><small>Sila u užetu F₂</small><strong id="z53-f2"></strong></div><div><small>Omjer F₂/F₁</small><strong id="z53-ratio"></strong></div>';root.append(cards);
  const info=document.createElement('p');info.className='mf1-new-context';info.id='z53-context';root.append(info);
  function draw(){const s=state(),m=balloon(s['z53-p2'],{D1:s['z53-d1']}),D1=s['z53-d1'],scale=400;
   const left=230,right=655,y=160,r1=D1*scale/2,r2=m.D*scale/2,fs=75/m.initial;
   root.querySelector('#z53-d2').textContent=f(m.D,3)+' m';root.querySelector('#z53-f2').textContent=f(m.force,2)+' N';root.querySelector('#z53-ratio').textContent=f(m.ratio,4);
   root.querySelector('#z53-scene').innerHTML=`<rect x="25" y="50" width="830" height="280" rx="12" fill="#e1f3fb"/><text x="95" y="38">Stanje 1: p₁ = 0,10 MPa</text><text x="530" y="38">Stanje 2: p₂ = ${f(s['z53-p2'],2)} MPa</text><path d="M440 75V330" stroke="#b6d3e5" stroke-dasharray="6 6"/><circle cx="${left}" cy="${y}" r="${r1}" fill="#effaff" stroke="#376a86" stroke-width="3"/><circle cx="${right}" cy="${y}" r="${r2}" fill="#effaff" stroke="#376a86" stroke-width="3"/><path d="M${left} ${y+r1}V315M${right} ${y+r2}V315" stroke="#64748b" stroke-width="2"/>`+
    MF1.svgArrow(left,y,0,-m.initial*fs,'#147a55')+MF1.svgArrow(left,y+r1,0,m.initial*fs,'#b93645')+MF1.svgArrow(right,y,0,-m.force*fs,'#147a55')+MF1.svgArrow(right,y+r2,0,m.force*fs,'#b93645')+
    `<text x="330" y="135" fill="#147a55">Fᵤ,₁</text><text x="755" y="135" fill="#147a55">Fᵤ,₂</text><text x="330" y="245" fill="#b93645">F₁</text><text x="755" y="245" fill="#b93645">F₂</text><text x="80" y="350">Ista skala promjera; zasebna zajednička skala svih sila.</text>`;
   forceScene.innerHTML=`<rect x="20" y="12" width="840" height="210" rx="12" fill="#f0f7fb"/><text x="42" y="42" font-size="17" fill="#18354b">Stanje 2 · uvećani dijagram sila</text><circle cx="400" cy="125" r="5" fill="#18354b"/>`+
    MF1.svgArrow(400,125,0,-65,'#147a55',`Fᵤ,₂ = ${f(m.force,2)} N`)+MF1.svgArrow(400,125,0,65,'#b93645',`F₂ = ${f(m.force,2)} N`)+
    `<text x="42" y="210" font-size="14" fill="#52697a">Vlastito mjerilo: ${f(m.force,2)} N ↔ 65 jedinica crteža. Fᵤ,₂ − F₂ = 0.</text>`;
   info.innerHTML=`<b>D₂ = D₁√(p₁/p₂)</b> · <b>F₂/F₁ = (D₂/D₁)³</b><br>Promjer je ${f(100*m.D/D1,1)} % početnog, a sila ${f(100*m.ratio,2)} %: uzgon je razmjeran volumenu.`;
  }
  root.querySelectorAll('input').forEach(i=>i.addEventListener('input',draw));draw();
 }
 function iceLab(root){
  root.classList.add('mf1-new-lab');
  root.innerHTML='<h4>Z54 · uronjeni udio ne određuje stabilnost</h4><p>H = 4 m · ρ<sub>led</sub> = 917 kg/m³ · ρ<sub>voda</sub> = 1042 kg/m³ · uronjeno <b id="z54-fraction"></b> volumena</p><div class="mf1-new-visual"><svg viewBox="0 0 560 365" role="img" aria-label="Nagnuti plutajući blok s težištem G, centrom uzgona B i okomitim silama" id="z54-scene"></svg><aside><div class="mf1-new-status" id="z54-status"></div><div class="mf1-new-pair"><span>GM</span><strong id="z54-gm"></strong></div><div class="mf1-new-pair"><span>M<sub>G</sub></span><strong id="z54-moment"></strong></div><svg id="z54-arm" viewBox="0 0 300 150" role="img" aria-label="Uvećani krak sila s vlastitim označenim mjerilom"></svg><p id="z54-arm-note"></p><p id="z54-force-note"></p><p id="z54-turn-note"></p></aside></div><p class="mf1-new-caption">Ista skala sila: 100 kN/m ↔ 1 m na skici. Krak sila prikazan je zasebno ispod glavne skice, u uvećanom mjerilu.</p>';
  const state=controls(root,[['z54-width','Širina bloka B',1,7,.1,5,'m'],['z54-angle','Zadani nagib θ',-10,10,1,5,'°']]);
  const info=document.createElement('p');info.id='z54-context';info.className='mf1-new-context';root.append(info);
  function draw(){const s=state(),m=floatingBlock(s['z54-width'],4,917,1042,s['z54-angle']),scale=43,X=x=>285+scale*x,Y=y=>120-scale*y;
   const path=pts=>pts.map((p,i)=>(i?'L':'M')+X(p[0])+' '+Y(p[1])).join('')+'Z';
   root.querySelector('#z54-fraction').textContent=f(100*m.fraction,1)+' %';root.querySelector('#z54-gm').textContent=f(m.GM,3)+' m';root.querySelector('#z54-moment').textContent=f(m.moment/1000,2)+' kN m/m';
   const bx=X(m.buoyancy.x),by=Y(m.buoyancy.y),gy=Y(m.centerY),length=m.weight/100000*scale;
   root.querySelector('#z54-scene').innerHTML=`<rect x="25" y="120" width="510" height="230" fill="#def3fc"/><path d="${path(m.body)}" fill="#f7fcff" stroke="#3e647d" stroke-width="3"/><path d="${path(m.wet)}" fill="#8fcfe7" fill-opacity=".75"/><path d="M25 120H535" stroke="#1885b0" stroke-width="2"/><text x="35" y="104">vodna ploha</text><path d="M${bx} ${Math.min(by-length,gy)}V${Math.max(by,gy+length)}M285 ${Math.min(by-length,gy)}V${Math.max(by,gy+length)}" stroke="#829aab" stroke-dasharray="4 4"/>`+
    MF1.svgArrow(bx,by,0,-length,'#147a55','FU')+MF1.svgArrow(285,gy,0,length,'#b93645','G')+
    `<circle cx="${bx}" cy="${by}" r="4" fill="#147a55"/><text x="${bx-22}" y="${by+8}">B</text><circle cx="285" cy="${gy}" r="4" fill="#b93645"/><text x="296" y="${gy-8}">G</text>`;
   const status=root.querySelector('#z54-status');status.textContent=m.GM>0?'Stabilno pri malom nagibu':'Nestabilno pri malom nagibu';status.dataset.stable=String(m.GM>0);
   root.querySelector('#z54-force-note').textContent=`Fᵤ = G = ${f(m.weight/1000,1)} kN/m`;
   root.querySelector('#z54-arm-note').textContent=`Krak xB − xG = ${f(m.buoyancy.x,3)} m`;
   root.querySelector('#z54-turn-note').textContent=Math.abs(m.moment)<1e-8?'Nema momenta pri θ = 0.':m.moment*m.angle<0?'Moment vraća blok prema θ = 0.':'Moment povećava zadani nagib.';
   const armX=150+600*m.buoyancy.x;
   root.querySelector('#z54-arm').innerHTML=`<path d="M30 112H270M30 106V118M150 106V118M270 106V118" stroke="#829aab"/><text x="30" y="140" text-anchor="middle">−0,20 m</text><text x="150" y="140" text-anchor="middle">0</text><text x="270" y="140" text-anchor="middle">+0,20 m</text><path d="M150 28V98" stroke="#b93645" stroke-width="2"/><path d="M${armX} 28V98" stroke="#147a55" stroke-width="2"/><text x="150" y="19" text-anchor="middle">G</text><text x="${armX}" y="90" text-anchor="middle">B</text>`+MF1.svgArrow(150,51,armX-150,0,'#965015','');
   info.innerHTML='<b>M<sub>G</sub> = G(x<sub>B</sub> − x<sub>G</sub>)</b> · <b>GM = d/2 + B²/(12d) − H/2</b>, d = Hρ<sub>led</sub>/ρ<sub>voda</sub>.<br>Statički zadani kut uz vertikalnu ravnotežu; B je težište stvarno uronjenog dijela. Pozitivan moment okreće suprotno kazaljci.';
   root.mf1BlockState=m;
  }
  root.querySelectorAll('input').forEach(i=>i.addEventListener('input',draw));draw();
 }
 document.addEventListener('DOMContentLoaded',()=>{const b=document.getElementById('widget-53'),i=document.getElementById('widget-54');if(b)balloonLab(b);if(i)iceLab(i);},{once:true});
})(typeof window==='undefined'?globalThis:window);
