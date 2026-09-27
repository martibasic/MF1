/* Interactive field atlas: quantitative, vector based, deliberately opt-in motion. */
(() => {
 'use strict';
 const M=window.MF1FieldModels,F=window.MF1,g=9.81;
 const ink='#e8f6ff',muted='#9fb9cd',cyan='#54dfd3',blue='#5bbcff',amber='#ffce73',rose='#fb879d';
 const fmt=(x,d=2)=>Number(Math.abs(x)<1e-10?0:x).toLocaleString('hr-HR',{maximumFractionDigits:d});
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const line=(x,y,X,Y,color=muted,width=1,dash='')=>`<path d="M${x} ${y}L${X} ${Y}" fill="none" stroke="${color}" stroke-width="${width}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
 const text=(s,x,y,color=ink,size=16,anchor='start')=>`<text x="${x}" y="${y}" fill="${color}" font-size="${size}" text-anchor="${anchor}" font-family="Segoe UI,system-ui,sans-serif">${esc(s)}</text>`;
 const path=(pts,color=cyan,width=3,dash='')=>`<path d="${pts.map((p,i)=>(i?'L':'M')+p.join(' ')).join('')}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linejoin="round" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
 const dot=(x,y,color=cyan,r=4)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
 function arrow(x,y,dx,dy,color=cyan,width=3){const l=Math.hypot(dx,dy);if(l<.05)return '';const ux=dx/l,uy=dy/l,h=Math.min(10,l*.4);return line(x,y,x+dx,y+dy,color,width)+`<path d="M${x+dx} ${y+dy}l${-h*ux+uy*h*.45} ${-h*uy-ux*h*.45}l${-uy*h*.9} ${ux*h*.9}Z" fill="${color}"/>`;}
 const samples=(fn,N=120)=>Array.from({length:N+1},(_,i)=>fn(i/N));
 function color(t){t=Math.max(0,Math.min(1,t));const stops=[[32,69,112],[40,139,188],[76,221,211],[251,206,115]],q=t*3,i=Math.min(2,Math.floor(q)),u=q-i;return `rgb(${stops[i].map((v,j)=>Math.round(v+(stops[i+1][j]-v)*u)).join(',')})`;}
 function band(id,x,y,w,h,lo,hi,label){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="url(#${id}-scale)"/>`+text(fmt(lo),x,y+30,muted,14)+text(fmt(hi),x+w,y+30,muted,14,'end')+text(label,x+w/2,y+30,ink,14,'middle');}
 function stat(label,value,y,color=cyan){return text(label,686,y,muted,14)+text(value,686,y+29,color,25);}
 let compactPlot=false;
 function chart({fn,extra,x=[0,1],y=[0,1],title,xlabel,ylabel,point,breaks=[]}){
  const l=compactPlot?64:100,r=compactPlot?470:888,t=compactPlot?45:416,b=compactPlot?180:512,px=v=>l+(v-x[0])/(x[1]-x[0])*(r-l),py=v=>b-(v-y[0])/(y[1]-y[0])*(b-t);
  let out=(compactPlot?'':text(title,l,t-30,ink,17))+text(ylabel,l,t-10,muted,compactPlot?16:13);
  F.ticks(...y,3).forEach(v=>{out+=line(l,py(v),r,py(v),'#254359')+text(fmt(v),l-13,py(v)+5,muted,13,'end');});
  F.ticks(...x,compactPlot?4:5).forEach(v=>{out+=line(px(v),t,px(v),b,'#254359')+text(fmt(v),px(v),b+20,muted,compactPlot?16:13,'middle');});
  out+=line(l,t,l,b,muted)+line(l,b,r,b,muted)+text(xlabel,r,b+42,muted,14,'end');
  const curve=f=>{const points=samples(s=>{const a=x[0]+s*(x[1]-x[0]);return[a,f(a)];}).filter(([a])=>!breaks.some(b=>Math.abs(a-b)<1e-8));breaks.forEach(b=>points.push([b,f(b-1e-9)],[b,f(b)]));return points.sort((a,b)=>a[0]-b[0]).map(([a,v])=>[px(a),py(v)]);};
  if(extra)out+=path(curve(extra),amber,2,'6 5');
  out+=path(curve(fn),cyan,3);
  if(point){out+=line(px(point[0]),b,px(point[0]),py(point[1]),muted,1,'4 4')+dot(px(point[0]),py(point[1]),rose,6);}
  return {drawing:out,title};
 }
 const defs=id=>`<defs><linearGradient id="${id}-bg" x2="1" y2="1"><stop stop-color="#102e46"/><stop offset="1" stop-color="#071c2e"/></linearGradient><linearGradient id="${id}-water" x2="0" y2="1"><stop stop-color="#45c9db" stop-opacity=".18"/><stop offset="1" stop-color="#329ad8" stop-opacity=".65"/></linearGradient><linearGradient id="${id}-scale"><stop stop-color="${color(0)}"/><stop offset=".33" stop-color="${color(.33)}"/><stop offset=".66" stop-color="${color(.66)}"/><stop offset="1" stop-color="${color(1)}"/></linearGradient><pattern id="${id}-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#bce4ff" stroke-opacity=".055"/></pattern></defs>`;
 const c=(key,label,min,max,step,value,unit='')=>({key,label,min,max,step,value,unit});
 const configs=[
  {n:1,anchor:'v1-load-lab',title:'Koliko se ocean stisne?',sub:'Izmjeri tlak i gustoću na istoj dubini; usporedi stlačivi i nestlačivi model.',controls:[c('H','Dubina stupca',500,12000,100,6000,'m'),c('K','Modul stlačivosti',1,4,.1,2.3,'GPa'),c('rho','Površinska gustoća',950,1100,10,1020,'kg/m³')],probe:'Dubina sonde',formula:'dp/dz = ρg · ρ = ρ₀/(1 − ρ₀gz/K)',assumption:'Statički stupac, konstantan modul K i g. Površinski apsolutni tlak 0,1 MPa. Crtkano: nestlačiva referenca.',challenge:'Prije promjene dubine predvidi raste li tlak brže ili sporije od pravca.'},
  {n:2,anchor:'widget-visc-basics',title:'Dva pogona. Jedno polje brzine.',sub:'Pomična stijenka i gradijent tlaka mogu surađivati ili pokrenuti povratni tok.',controls:[c('U','Brzina gornje stijenke',0,2,.05,1,'m/s'),c('G','Pogonski gradijent −dp/dx',-8000,8000,100,0,'Pa/m'),c('mu','Viskoznost',.05,.5,.01,.1,'Pa·s')],probe:'Visina sonde y/h',motion:true,formula:'u(y) = Uy/h + (−dp/dx)y(h − y)/(2μ) · τ = μ du/dy',assumption:'Točno stacionarno rješenje između beskonačnih ravnih ploča; h = 10 mm, ρ = 1000 kg/m³. Duljina vidljivog odsječka 0,12 m; osi imaju različita mjerila. Stabilnost laminarnog rješenja nije modelirana.',challenge:'Može li se fluid pri dnu gibati ulijevo dok se gornja ploča giba udesno?'},
  {n:3,anchor:'v3-intro-widget',title:'Tlak prelazi granicu. Gustoća ne.',sub:'Pomiči sondu kroz dva mirujuća sloja i otkrij zašto se mijenja nagib, ali ne i tlak.',controls:[c('h','Dubina',1,5,.1,3,'m'),c('split','Udio gornjeg sloja',.1,.9,.05,.4),c('rho1','Gustoća gornjeg sloja',600,1000,20,800,'kg/m³')],probe:'Dubina sonde',formula:'p(z) = g ∫₀ᶻ ρ(ζ) dζ · p⁻ = p⁺ na granici slojeva',assumption:'Nemješivi slojevi, donji fluid 1000 kg/m³. Prikazuje se pretlak; površinska napetost ravne granice ne daje skok tlaka.',challenge:'Povećaj gustoću gornjeg sloja. Što se mijenja u donjem dijelu grafa?'},
  {n:4,anchor:'v4-intro-principle-widget',title:'Slobodna ploha u rotaciji',sub:'Paraboloid, polje tlaka i suhi prstenasti režim iz iste očuvane količine vode.',controls:[c('omega','Kutna brzina',0,8,.1,3,'rad/s'),c('R','Polumjer spremnika',.4,1.4,.05,1,'m'),c('h0','Početna dubina',.1,1,.05,.5,'m')],probe:'Radijalni položaj sonde',motion:true,formula:'zₛ(r) = c + ω²r²/(2g) · p = ρg(zₛ − z) · V = const.',assumption:'Ustaljena kruta rotacija, ρ = 1000 kg/m³, dovoljno visok spremnik bez prelijevanja. Pri suhom središtu volumen se integrira po mokrom prstenu. Animacija prikazuje tlocrt.',challenge:'Pronađi brzinu pri kojoj se središte dna prvi put osuši.'},
  {n:5,anchor:'v5-principle-explorer',title:'Od lokalnog tlaka do momenta',sub:'Na kosoj ploči prati elementarne sile, hvatište rezultante i moment oko gornjeg ruba.',controls:[c('L','Duljina ploče',.5,3,.1,2,'m'),c('depth','Dubina gornjeg ruba',0,2,.1,.5,'m'),c('angle','Nagib prema horizontali',15,90,5,60,'°')],probe:'Položaj duž ploče',formula:'F = ρgb ∫₀ᴸ h(s) ds · M₀ = ρgb ∫₀ᴸ s h(s) ds · sD = M₀/F',assumption:'Pravokutna ploča širine b = 1 m, voda 1000 kg/m³; druga strana je na atmosferskom tlaku. Strelice lokalnog tlaka imaju zajedničko mjerilo unutar scene; rezultanta ima zasebno mjerilo.',challenge:'Zašto se hvatište približava težištu kada cijelu ploču spuštaš dublje?'},
  {n:6,anchor:'widget-curved-pressure',title:'Sila prati normalu površine',sub:'Rastavi tlak na kružnom luku u vodoravni i okomiti doprinos.',controls:[c('R','Polumjer',.4,1.8,.1,1,'m'),c('depth','Dubina središta',0,2,.1,.6,'m'),c('span','Otvoreni kut luka',30,180,5,90,'°')],probe:'Položaj duž luka',formula:'dF = −p n bR dθ · Fx = ∫ dFx · Fz = ∫ dFz',assumption:'Luk počinje na desnoj strani kružnice i raste prema dolje; x desno, z dolje. Voda djeluje s vanjske strane, b = 1 m. Komponente i rezultanta imaju isto zasebno mjerilo; lokalni tlak ima svoje.',challenge:'Pri luku od 180° provjeri poništavaju li se vodoravne komponente.'},
  {n:7,anchor:'v7-t1-container',title:'Uzgon traži ravnotežu',sub:'Pomakni cilindar od ravnotežnog urona; usporedi težinu s integralom tlaka po mokroj plohi.',controls:[c('body','Gustoća cilindra',100,950,25,600,'kg/m³'),c('R','Polumjer cilindra',.4,1.2,.1,.8,'m'),c('offset','Pomak prema dolje / R',-.8,.8,.05,0)],probe:'Kut tlačne sonde',formula:'B = ρgVuronjeno · W = ρtijela gV · ravnoteža: B − W = 0',assumption:'Dugačak vodoravni cilindar duljine b = 1 m u vodi, hidrostatika i vertikalni pomaci. Pomak je ručno zadano statičko stanje; valovi, dodana masa i dinamika povratka nisu modelirani.',challenge:'Postavi pomak na nulu, zatim povećaj gustoću. Koliki udio volumena mora biti uronjen?'},
  {n:8,anchor:'v8-explorer',title:'Ista masa kroz svaku ravninu',sub:'Tragovi se ubrzavaju u suženju prema lokalnom Q/A, a svaka mjerna ravnina daje isti protok.',controls:[c('Q','Protok',0,40,1,20,'L/s'),c('ratio','Omjer promjera grla',.35,1,.05,.55),c('D','Ulazni promjer',.15,.3,.01,.2,'m')],probe:'Položaj presjeka x/L',motion:true,formula:'Q = A(x)u(x) = const. · dx/dt = Q/A(x)',assumption:'Stacionarni kvazi jednodimenzijski nestlačivi tok, L = 4 m. Čestice su tragovi, ne molekule; položaj se računa iz integrala površine presjeka. Poprečno mjerilo je uvećano.',challenge:'Prepolovi promjer grla i predvidi koliko se poveća brzina.'},
  {n:9,anchor:'v9-egl-source',title:'Brzina raste na račun tlaka',sub:'Venturijeva cijev povezuje boju polja, mjernu sondu i energetsku bilancu.',controls:[c('Q','Protok',0,35,1,18,'L/s'),c('ratio','Omjer promjera grla',.4,1,.05,.6),c('H','Ukupna energetska visina',4,15,.5,8,'m')],probe:'Položaj presjeka x/L',motion:true,formula:'p/(ρg) + u²/(2g) = H · EGL = H · HGL = p/(ρg)',assumption:'Vodoravno, bez gubitaka, ρ = 1000 kg/m³, D₁ = 0,20 m, L = 4 m, α = 1. Jednodimenzijska idealizacija; stvarni difuzor ima gubitke. Negativan pretlak nije negativan apsolutni tlak.',challenge:'Zašto se tlak nakon grla oporavlja iako se protok ne mijenja?'},
  {n:10,anchor:'v10-loss-explorer',title:'Gdje završava mehanička energija?',sub:'Odvoji kontinuirano trenje od lokalnog gubitka i prati pad EGL i HGL.',controls:[c('Q','Protok',0,20,.5,8,'L/s'),c('D','Promjer',.06,.18,.005,.1,'m'),c('zeta','Lokalni koeficijent ζ',0,8,.25,3),c('p0','Ulazni pretlak',0,600,10,200,'kPa')],probe:'Položaj duž cijevi',motion:true,formula:'hL = (λL/D + ζ)u²/(2g) · Pgubitka = ρgQhL',assumption:'L = 30 m, k = 0,045 mm, voda pri približno 20 °C s μ = 0,001 Pa·s. Izlazni tlak proizlazi iz zadanog Q; p_atm = 101,325 kPa. Ispod približno 2,34 kPa apsolutno jednofazni proračun više ne opisuje održivi tok. Lokalni koeficijent ne razrješava minimum tlaka unutar ventila, pa kavitacija ondje može početi i ranije. λ koristi laminarni/Colebrookov zakon i označenu prijelaznu procjenu. Lokalni gubitak je na x/L = 0,6.',challenge:'Smanji promjer uz isti Q. Kada zadani ulazni tlak prestaje biti dovoljan za jednofazni tok?'},
  {n:11,anchor:'v11-momentum-lab',title:'Skretanje mlaza stvara silu',sub:'Geometrija vektora brzine određuje silu mlaza na nepomičnu lopaticu.',controls:[c('V','Ulazna brzina',2,20,.5,12,'m/s'),c('Q','Protok',5,40,1,20,'L/s'),c('angle','Kut skretanja',0,180,5,90,'°'),c('k','Omjer izlazne brzine',.5,1,.05,1)],probe:'Presjek duž skretanja',formula:'Fmlaz→lopatica = ṁ(v₁ − v₂) · Pgubitka = ṁ(v₁² − v₂²)/2',assumption:'Slobodan mlaz na atmosferskom tlaku; nepomična lopatica, zanemarene težina i sile na slobodnoj plohi. Pri k < 1 gubitak energije je zadan. Oblik putanje je shematski; sile proizlaze iz ulaznog i izlaznog presjeka.',challenge:'Usporedi skretanje za 90° i 180°. Je li iznos sile dvostruk?'},
  {n:12,anchor:'v12-pelton',title:'Brzinski trokut zatvara bilancu snage',sub:'Mijenjaj brzinu oboda i razdvoji korisnu snagu, izlaznu kinetičku energiju i gubitke.',controls:[c('ratio','Omjer U/V₁',0,1,.025,.45),c('beta','Kut relativnog izlaza',100,180,5,165,'°'),c('k','Koeficijent relativne brzine',.6,1,.025,.9)],probe:'Omjer U/V₁ na krivulji',formula:'v₂ = U + w₂ · P = ρQ U(V₁ − v₂x) · Pulaz = P + Pizlaz + Pgubitak',assumption:'Idealizirano kolo s nizom lopatica koje zahvaća cijeli mlaz: Q = 0,04 m³/s, V₁ = 25 m/s. Obodni smjer je x. Relativni izlaz w₂ = k(V₁ − U).',challenge:'Pronađi maksimum snage. Što promjena k radi s položajem maksimuma?'},
  {n:13,anchor:'reynolds-widget',title:'Dvije grane. Jedan pad energije.',sub:'Protok se dijeli dok obje grane ne zadovolje isti gubitak i očuvanje mase.',controls:[c('Q','Ukupni protok',0,30,.5,12,'L/s'),c('D1','Promjer prve grane',.04,.16,.005,.08,'m'),c('D2','Promjer druge grane',.04,.16,.005,.1,'m')],probe:'Udio Q₁ pri traženju rješenja',motion:true,formula:'Q₁ + Q₂ = Q · hL,₁(Q₁) = hL,₂(Q₂)',assumption:'Paralelne grane iste duljine 36 m i hrapavosti 0,045 mm; μ = 0,001 Pa·s, ρ = 998 kg/m³. Geometrija mreže je shematska. Prijelazni režim koristi nastavnu interpolaciju, ne jedinstven zakon turbulentnog prijelaza.',challenge:'Povećaj samo D₂. Je li podjela protoka proporcionalna površini presjeka?'}
 ];
 function scene(n,p,t,probe,id){
  let s='',metrics=[],note='',state={},hint='',plot='';
  const gauge=probe/100;
  if(n===1||n===3){
   const H=n===1?p.H:p.h,depth=gauge*H,m=n===1?{pressure:z=>F.ocean(z,p.rho,p.K*1e9).pressure,density:z=>F.ocean(z,p.rho,p.K*1e9).density}:M.layers({...p,rho2:1000});
   const unit=n===1?1e6:1e3,max=m.pressure(H)/unit,py=z=>78+z/H*230;
   for(let i=0;i<60;i++){const z=H*(i+.5)/60;s+=`<rect x="130" y="${78+i*230/60}" width="380" height="${230/60+.2}" fill="${color(m.pressure(z)/m.pressure(H))}" opacity=".85"/>`;}
   s+=`<path d="M128 74V310H512V74" fill="none" stroke="#b7dbeb" stroke-width="4"/>`+line(130,78,510,78,cyan,3)+text('slobodna ploha',320,62,cyan,15,'middle');
   if(n===3){const yy=py(m.interfaceDepth);s+=line(130,yy,510,yy,amber,2,'7 5')+text('granica slojeva',530,yy+5,amber,14);}
   for(let i=0;i<=4;i++){const z=i*H/4;s+=line(117,py(z),129,py(z),muted)+text(fmt(z),106,py(z)+5,muted,14,'end');}
   for(let i=1;i<=6;i++){const z=i/7*H,v=m.pressure(z)/m.pressure(H);s+=arrow(512,py(z),v*72,0,amber,2);}
   s+=line(134,py(depth),506,py(depth),ink,1,'4 5')+dot(330,py(depth),rose,7)+text('z [m]',95,48,muted,14);
   metrics=[['Tlak na sondi',fmt(m.pressure(depth)/unit)+(n===1?' MPa':' kPa')],['Lokalna gustoća',fmt(m.density(depth),1)+' kg/m³'],['Položaj sonde',fmt(depth)+' m']];
   plot=chart({title:n===1?'Tlak: stlačivi model a nestlačiva referenca':'Tlak je kontinuiran, nagib ovisi o gustoći',fn:z=>m.pressure(z)/unit,extra:n===1?z=>(1e5+p.rho*g*z)/unit:undefined,x:[0,H],y:[0,max*1.08],xlabel:'Dubina z [m]',ylabel:n===1?'p aps [MPa]':'p [kPa]',point:[depth,m.pressure(depth)/unit]});
   hint=n===1?'apsolutni tlak [MPa]':'pretlak [kPa]';s+=band(id,180,322,280,8,n===1?.1:0,max,hint);state={pressure:m.pressure(depth),density:m.density(depth),depth};
  }else if(n===2){
   const h=.01,m=M.shear({...p,h}),u=samples(a=>m.velocity(a*h)),umin=Math.min(0,...u),umax=Math.max(.1,...u),abs=Math.max(Math.abs(umin),umax),py=a=>308-a*220;
   s+=`<rect x="90" y="88" width="490" height="220" fill="url(#${id}-water)"/>`;
   for(let j=1;j<12;j++){const a=j/12,v=m.velocity(a*h),yy=py(a);s+=line(92,yy,578,yy,'#598fab',1,'3 7')+arrow(320,yy,100*v/abs,0,v<0?rose:cyan,2);for(let k=0;k<7;k++){const pos=((k/7*.12+v*t)%.12+.12)%.12;s+=dot(95+pos/.12*480,yy,v<0?rose:cyan,3);}}
   s+=line(88,88,582,88,amber,7)+line(88,308,582,308,ink,7)+arrow(200,60,100*p.U/2,0,amber)+text('U = '+fmt(p.U)+' m/s',340,65,amber,15)+text('u = 0 · nepomična stijenka',330,332,muted,14,'middle');
   const yy=py(gauge);s+=line(90,yy,580,yy,ink,1,'5 5')+dot(320,yy,rose,6);
   metrics=[['Brzina sonde',fmt(m.velocity(gauge*h))+' m/s'],['Smično naprezanje',fmt(m.stress(gauge*h))+' Pa'],['Srednja brzina',fmt(m.mean)+' m/s']];
   plot=chart({title:'Profil brzine · crtkano: samo pomična ploča',fn:a=>m.velocity(a*h),extra:a=>p.U*a,x:[0,1],y:[umin-.1,umax+.1],xlabel:'Visina y/h [−]',ylabel:'u [m/s]',point:[gauge,m.velocity(gauge*h)]});
   note='Snaga po površini: stijenka '+fmt(m.wallPower)+' + tlak '+fmt(m.pressurePower)+' = disipacija '+fmt(m.dissipation)+' W/m².';state={...m,probeVelocity:m.velocity(gauge*h)};
  }else if(n===4){
   const m=F.rotatingTank(p.R,p.h0,p.omega),height=Math.max(1,m.edge*1.15),scale=Math.min(210/p.R,230/height),cx=340,bottom=310,px=r=>cx+r*scale,py=z=>bottom-z*scale;
   const surface=samples(a=>[px(-p.R+2*p.R*a),py(m.height(Math.abs(-p.R+2*p.R*a)))]);
   s+=`<path d="M${px(-p.R)} ${bottom}L${surface.map(a=>a.join(' ')).join('L')}L${px(p.R)} ${bottom}Z" fill="url(#${id}-water)"/>`;
   for(let j=0;j<22;j++)for(let i=0;i<42;i++){const r=-p.R+(i+.5)*2*p.R/42,z=(j+.5)*height/22;if(z<m.height(Math.abs(r)))s+=`<rect x="${px(r-p.R/42)}" y="${py(z+height/44)}" width="${2*p.R*scale/42+.2}" height="${height*scale/22+.2}" fill="${color((m.height(Math.abs(r))-z)/Math.max(m.edge,.01))}" opacity=".6"/>`;}
   s+=path(surface,cyan,3)+`<path d="M${px(-p.R)} ${py(height)}V${bottom}H${px(p.R)}V${py(height)}" fill="none" stroke="#b7dbeb" stroke-width="4"/>`+line(cx,70,cx,bottom,muted,1,'5 5');
   const r=gauge*p.R;s+=dot(px(r),bottom-3,rose,6)+line(px(r),py(m.height(r)),px(r),bottom,rose,2,'4 4');
   // Inset top view rotates at exactly omega, with no apparent spin in the meridional section.
   s+=`<circle cx="105" cy="106" r="37" fill="#102c40" stroke="#6a94b0"/>`+line(105,106,105+31*Math.cos(p.omega*t),106-31*Math.sin(p.omega*t),amber,2)+dot(105+31*Math.cos(p.omega*t),106-31*Math.sin(p.omega*t),amber,4)+text('tlocrt',105,161,muted,14,'middle');
   s+=band(id,180,322,280,8,0,g*m.edge,'pretlak [kPa]');
   metrics=[['Tlak na dnu, r/R = '+fmt(gauge),fmt(1000*g*m.height(r)/1000)+' kPa'],['Očuvani volumen',fmt(m.volume,3)+' m³'],['Polumjer suhog dna',fmt(m.dry)+' m']];
   plot=chart({title:'Ploha zₛ(r) · crtkano: početna razina',fn:r=>m.height(r),extra:()=>p.h0,x:[0,p.R],y:[0,Math.max(m.edge,p.h0)*1.15],xlabel:'Radijus r [m]',ylabel:'z [m]',point:[r,m.height(r)]});state={...m,probeRadius:r};
  }else if(n===5){
   const m=M.gate(p),a=p.angle*Math.PI/180,scale=Math.min(170/p.L,170/(p.depth+p.L*Math.sin(a))),x=240,y=88+p.depth*scale,ex=x+p.L*Math.cos(a)*scale,ey=y+p.L*Math.sin(a)*scale;
   s+=`<rect x="85" y="88" width="530" height="230" fill="url(#${id}-water)"/>`+line(85,88,615,88,cyan,2)+text('p = 0',100,73,cyan,14)+line(x,y,ex,ey,ink,8);
   for(let i=1;i<=12;i++){const ss=i/12*p.L,l=76*m.pressure(ss)/m.pressure(p.L);s+=arrow(x+ss*Math.cos(a)*scale-l*Math.sin(a),y+ss*Math.sin(a)*scale+l*Math.cos(a),l*Math.sin(a),-l*Math.cos(a),amber,2);}
   const sx=x+gauge*p.L*Math.cos(a)*scale,sy=y+gauge*p.L*Math.sin(a)*scale;s+=dot(sx,sy,rose,6)+dot(x,y,ink,6)+text('O',x-18,y-12,ink,16);
   const dx=x+m.center*Math.cos(a)*scale,dy=y+m.center*Math.sin(a)*scale;s+=arrow(dx,dy,90*Math.sin(a),-90*Math.cos(a),cyan,4)+text('F',dx+90*Math.sin(a)+12,dy-90*Math.cos(a),cyan,18)+dot(dx,dy,cyan,5);
   metrics=[['Rezultantna sila',fmt(m.force/1000)+' kN'],['Moment oko O',fmt(m.moment/1000)+' kN·m'],['Hvatište sD / L',fmt(m.center/p.L,3)]];
   plot=chart({title:'Raspodjela tlaka duž ploče',fn:ss=>m.pressure(ss)/1000,x:[0,p.L],y:[0,m.pressure(p.L)/1000*1.1],xlabel:'Duljina s [m]',ylabel:'p [kPa]',point:[gauge*p.L,m.pressure(gauge*p.L)/1000]});state={...m,probePressure:m.pressure(gauge*p.L)};note='Sonda: s = '+fmt(gauge*p.L)+' m, p = '+fmt(state.probePressure/1000)+' kPa.';
  }else if(n===6||n===7){
   const R=p.R,cx=330;
   const m=n===6?F.arcPressure({zC:p.depth,R,span:p.span*Math.PI/180}):M.cylinder(p),z=n===6?p.depth:m.z;
   const scale=n===6?Math.min(120/R,195/(p.depth+R)):Math.min(82/R,103/(Math.abs(z)+R)),drawWater=n===6?78:180,safeCy=drawWater+z*scale,span=n===6?p.span*Math.PI/180:2*Math.PI;
   s+=`<rect x="76" y="${Math.max(55,drawWater)}" width="554" height="${330-Math.max(55,drawWater)}" fill="url(#${id}-water)"/>`;
   if(n===7){s+=`<circle cx="${cx}" cy="${safeCy}" r="${R*scale}" fill="#d2ab65" fill-opacity=".7" stroke="#ffd890" stroke-width="3"/>`;}
   s+=line(76,drawWater,630,drawWater,cyan,2)+text('p = 0',88,drawWater-10,cyan,14);
   const pp=t=>n===6?m.pressure(t):m.pressure(t),max=1000*g*Math.max(.01,z+R);
   for(let i=0;i<=22;i++){const a=i/22*span,l=36*pp(a)/max,xx=cx+R*scale*Math.cos(a),yy=safeCy+R*scale*Math.sin(a);s+=arrow(xx+l*Math.cos(a),yy+l*Math.sin(a),-l*Math.cos(a),-l*Math.sin(a),amber,2);}
   if(n===6)s+=path(samples(q=>[cx+R*scale*Math.cos(q*span),safeCy+R*scale*Math.sin(q*span)]),ink,6);
   const a=gauge*span;s+=dot(cx+R*scale*Math.cos(a),safeCy+R*scale*Math.sin(a),rose,7);
   if(n===7){const factor=85/Math.max(m.weight,m.buoyancy);s+=arrow(535,230,0,-m.buoyancy*factor,cyan,4)+arrow(579,150,0,m.weight*factor,rose,4)+text('B',535,123,cyan,17,'middle')+text('W',579,123,rose,17,'middle');metrics=[['Uzgon B',fmt(m.buoyancy/1000)+' kN'],['Težina W',fmt(m.weight/1000)+' kN'],['B − W (gore +)',fmt(m.net/1000)+' kN']];note=Math.abs(m.net)<1e-6?'Ravnoteža: integral tlaka jednak je težini.':m.net>0?'Rezultanta je prema gore: cilindar je potisnut preduboko.':'Rezultanta je prema dolje: cilindar je podignut iznad ravnoteže.';
   }else{const k=80/Math.max(m.force,.001);s+=arrow(560,180,m.fx*k,0,blue,3)+arrow(560,180,0,m.fz*k,rose,3)+arrow(560,180,m.fx*k,m.fz*k,cyan,4)+text('Fx, Fz, F',540,292,muted,14,'middle');metrics=[['Vodoravna sila Fx',fmt(m.fx/1000)+' kN'],['Okomita sila Fz (dolje +)',fmt(m.fz/1000)+' kN'],['Rezultanta',fmt(m.force/1000)+' kN']];}
   plot=chart({title:'Lokalni tlak po kutu · suha ploha: p = 0',fn:deg=>pp(deg*Math.PI/180)/1000,x:[0,span*180/Math.PI],y:[0,max/1000*1.1],xlabel:'Kut θ [°]',ylabel:'p [kPa]',point:[gauge*span*180/Math.PI,pp(a)/1000]});state={...m,probePressure:pp(a)};note+=' Sonda: θ = '+fmt(gauge*span*180/Math.PI)+'°, p = '+fmt(pp(a)/1000)+' kPa.';
  }else if(n===8||n===9){
   const m=M.duct({Q:p.Q/1000,D:n===8?p.D:.2,ratio:p.ratio,H:p.H||8}),D=n===8?p.D:.2,L=4,xx=x=>100+x/L*510,rr=x=>90*m.diameter(x)/D,yy=(x,eta)=>192+eta*rr(x);
   const vmax=m.velocity(2),pmin=m.pressure(2)/1000,pmax=m.pressure(0)/1000;
   for(let i=0;i<100;i++){const x=(i+.5)/100*L,v=n===8?(vmax?m.velocity(x)/vmax:0):(pmax>pmin?(m.pressure(x)/1000-pmin)/(pmax-pmin):0);s+=`<rect x="${xx(x-L/200)}" y="${yy(x,-1)}" width="5.3" height="${2*rr(x)}" fill="${color(v)}" fill-opacity=".7"/>`;}
   [-1,1].forEach(eta=>s+=path(samples(a=>[xx(a*L),yy(a*L,eta)]),ink,3));
   [-.7,-.35,0,.35,.7].forEach((eta,j)=>{s+=path(samples(a=>[xx(a*L),yy(a*L,eta)]),'#96dcf0',1,'4 6');for(let i=0;i<8;i++){const x=m.position((i+.13*j)/8,t);s+=dot(xx(x),yy(x,eta),cyan,3.2);}});
   const x=gauge*L;s+=line(xx(x),yy(x,-1)-15,xx(x),yy(x,1)+15,rose,2,'5 5')+dot(xx(x),192,rose,6)+text('1',100,73,ink,17)+text('grlo',355,73,ink,17,'middle')+text('2',610,73,ink,17,'end');
   s+=band(id,180,316,280,8,n===8?0:pmin,n===8?vmax:pmax,n===8?'brzina u [m/s]':'pretlak p [kPa]');
   metrics=n===8?[['Brzina na sondi',fmt(m.velocity(x))+' m/s'],['Površina presjeka',fmt(m.area(x)*1e4,1)+' cm²'],['A · u u svakom presjeku',fmt(m.area(x)*m.velocity(x)*1000)+' L/s']]:[['Pretlak na sondi',fmt(m.pressure(x)/1000)+' kPa'],['Brzinska visina',fmt(m.velocity(x)**2/(2*g))+' m'],['Ukupna visina',fmt(p.H)+' m']];
   plot=chart({title:n===8?'Brzina prati obrnuto površinu presjeka':'Cijan: HGL · crtkano: EGL',fn:a=>n===8?m.velocity(a):m.pressure(a)/(1000*g),extra:n===9?()=>p.H:undefined,x:[0,L],y:n===8?[0,Math.max(.1,vmax*1.1)]:[Math.min(0,m.pressure(2)/(1000*g)*1.1),p.H*1.12],xlabel:'x [m]',ylabel:n===8?'u [m/s]':'visina [m]',point:[x,n===8?m.velocity(x):m.pressure(x)/(1000*g)]});state={...m,probeX:x,probeVelocity:m.velocity(x)};
  }else if(n===10){
   const Q=p.Q/1000,kinetic=(Q/(Math.PI*p.D*p.D/4))**2/(2*g),pressureHead=p.p0/g,m=M.pipe({...p,Q,H:pressureHead+kinetic}),L=30,x=gauge*L,xx=x=>100+x/L*510,invalid=m.minimumAbsolutePressure<2340;
   for(let i=0;i<100;i++){const pos=(i+.5)/100*L;s+=`<rect x="${xx(pos-L/200)}" y="174" width="5.3" height="50" fill="${color(m.total?1-(pressureHead+kinetic-m.head(pos))/m.total:0)}"/>`;}
   s+=line(96,172,614,172,ink,4)+line(96,226,614,226,ink,4)+`<path d="M392 171l28 28 -28 28 28 -28Z" fill="none" stroke="${amber}" stroke-width="3"/>`+text('ζ',406,149,amber,20,'middle');
   if(!invalid)for(let i=0;i<14;i++){const pos=((i/14*L+m.V*t)%L+L)%L;s+=dot(xx(pos),199,ink,3.5);}
   s+=line(xx(x),156,xx(x),240,rose,2,'5 5')+dot(xx(x),199,rose,6)+text('Re = '+fmt(m.Re,0)+' · λ = '+fmt(m.lam,4),100,113,muted,16)+text(invalid?'Granica modela: tlak ispod zasićenja':m.uncertain?'Prijelazni režim: nastavna procjena':'Darcy–Weisbach',100,285,invalid?rose:m.uncertain?amber:cyan,16);
   s+=band(id,180,315,280,8,pressureHead-m.total,pressureHead,'p/(ρg) [m]');
   metrics=[['Trenje',fmt(m.h)+' m'],['Lokalni gubitak',fmt(m.local)+' m'],['Disipirana snaga',fmt(m.power/1000)+' kW']];
   const range=Math.max(.1,m.total+kinetic);plot=chart({title:'Cijan: HGL · crtkano: EGL · skok na ventilu',fn:a=>m.pressure(a)/(1000*g),extra:a=>m.head(a),breaks:[18],x:[0,L],y:[pressureHead-m.total-range*.08,pressureHead+kinetic+range*.08],xlabel:'x [m]',ylabel:'visina [m]',point:[x,m.pressure(x)/(1000*g)]});state={...m,invalid,probePressure:m.pressure(x)};
   note=invalid?'Proračun traži izlazni apsolutni tlak '+fmt(m.minimumAbsolutePressure/1000)+' kPa, ispod tlaka zasićenja vode. Tragovi su zaustavljeni: ovaj zadani jednofazni tok nije održiv. Povećaj ulazni tlak ili smanji protok.':'Izlazni apsolutni tlak: '+fmt(m.minimumAbsolutePressure/1000)+' kPa. Sonda p = '+fmt(m.pressure(x)/1000)+' kPa pretlaka.';
  }else if(n===11||n===12){
   const m=n===11?M.jet({...p,Q:p.Q/1000}):M.pelton(p),k=n===11?150/p.V:190/25,ox=300,oy=n===11?212:245;
   s+=line(90,oy,605,oy,'#42647d',1,'4 6')+line(ox,80,ox,324,'#42647d',1,'4 6')+text('x',607,oy+22,muted,14)+text('y',ox+12,81,muted,14);
   if(n===11){s+=arrow(ox,oy,p.V*k,0,blue,4)+arrow(ox,oy,m.vx*k,-m.vy*k,cyan,4)+arrow(ox+p.V*k,oy,(m.vx-p.V)*k,-m.vy*k,rose,3)+text('v₁',485,oy+6,blue,18)+text('v₂',ox+m.vx*k,oy-m.vy*k-16,cyan,18,'middle')+text('Δv',520,114,rose,17);metrics=[['Sila na lopaticu Fx',fmt(m.fx)+' N'],['Sila na lopaticu Fy',fmt(m.fy)+' N'],['Iznos sile',fmt(Math.hypot(m.fx,m.fy))+' N']];plot=chart({title:'Sila pri promjeni kuta · crtkano: bez gubitaka',fn:a=>{const v=M.jet({...p,Q:p.Q/1000,angle:a});return Math.hypot(v.fx,v.fy);},extra:a=>2*m.mass*p.V*Math.sin(a*Math.PI/360),x:[0,180],y:[0,2*m.mass*p.V*1.1],xlabel:'Kut skretanja [°]',ylabel:'|F| [N]',point:[p.angle,Math.hypot(m.fx,m.fy)]});note='Nepomična lopatica ne preuzima mehaničku snagu. Gubitak u mlazu: '+fmt(m.loss)+' W.';
   }else{s+=arrow(ox,oy,m.U*k,0,amber,4)+arrow(ox+m.U*k,oy,m.wx*k,-m.wy*k,cyan,4)+arrow(ox,oy,m.vx*k,-m.vy*k,rose,3)+text('U',ox+m.U*k/2,oy+25,amber,17,'middle')+text('w₂',ox+m.U*k+m.wx*k/2,oy-m.wy*k/2-18,cyan,17,'middle')+text('v₂',ox+m.vx*k-14,oy-m.vy*k+25,rose,17,'end');metrics=[['Korisna snaga',fmt(m.power/1000)+' kW'],['Izlazna kinetička snaga',fmt(m.exit/1000)+' kW'],['Gubitak u lopatici',fmt(m.loss/1000)+' kW']];
    const totalWidth=490;let xx=95;[[m.power,cyan],[m.exit,rose],[m.loss,amber]].forEach(([v,col])=>{s+=`<rect x="${xx}" y="299" width="${totalWidth*v/m.input}" height="14" fill="${col}"/>`;xx+=totalWidth*v/m.input;});s+=text('Ulazna snaga '+fmt(m.input/1000)+' kW · zbroj sva tri dijela',95,337,muted,14);
    plot=chart({title:'Korisna snaga prema obodnoj brzini',fn:r=>M.pelton({...p,ratio:r}).power/1000,x:[0,1],y:[0,m.input/1000*1.1],xlabel:'U/V₁ [−]',ylabel:'P [kW]',point:[p.ratio,m.power/1000]});note='Bilanca snage: '+fmt(m.input/1000)+' = '+fmt(m.power/1000)+' + '+fmt(m.exit/1000)+' + '+fmt(m.loss/1000)+' kW.';
   }state=m;
  }else if(n===13){
   const Q=p.Q/1000,m=F.parallelPipes(Q,p.D1,p.D2),xx=x=>150+410*x;
   s+=line(75,200,150,200,ink,5)+line(560,200,635,200,ink,5)+line(150,125,150,275,ink,4)+line(560,125,560,275,ink,4);
   [[m.Q1,m.b1,125,cyan],[m.Q2,m.b2,275,amber]].forEach(([q,b,y,col],j)=>{s+=line(150,y,560,y,'#55728a',b.D*160)+line(150,y,560,y,col,b.D*160-3)+text('Q'+(j+1)+' = '+fmt(q*1000)+' L/s',340,y-28,col,17,'middle');for(let i=0;i<9;i++){const pos=((i/9*36+b.V*t)%36+36)%36;s+=dot(xx(pos/36),y,ink,3);}s+=text('Re = '+fmt(b.Re,0),340,y+36,muted,14,'middle');});
   metrics=[['Zajednički gubitak',fmt(m.b1.h)+' m'],['Udio prve grane',Q?fmt(m.Q1/Q*100)+' %':'— (Q = 0)'],['Bilanca protoka',fmt((m.Q1+m.Q2)*1000)+' L/s']];
   const qmax=Math.max(.001,Q),ymax=Math.max(.01,F.pipeBranch(qmax,p.D1).h,F.pipeBranch(qmax,p.D2).h);
   plot=chart({title:Q?'Presjek krivulja određuje podjelu protoka':'Bez protoka nema gubitka energije',fn:q=>Q?F.pipeBranch(q/1000,p.D1).h:0,extra:q=>Q?F.pipeBranch(Math.max(0,Q-q/1000),p.D2).h:0,x:[0,qmax*1000],y:[0,ymax*1.08],xlabel:'Q₁ [L/s] · Q₂ = Q − Q₁',ylabel:'hL [m]',point:[m.Q1*1000,m.b1.h]});
   note=(m.b1.uncertain||m.b2.uncertain?'Jedna grana je u prijelaznom režimu. ':'')+'Rezidual pada energije: '+fmt(Math.abs(m.b1.h-m.b2.h),10)+' m.';state=m;
  }
  metrics.forEach(([label,value],i)=>s+=stat(label,value,108+i*80,i===2?amber:cyan));
  return {svg:defs(id)+`<rect width="960" height="580" rx="16" fill="url(#${id}-bg)"/><rect width="960" height="580" rx="16" fill="url(#${id}-grid)"/>`+text('POLJE / '+String(n).padStart(2,'0'),34,33,muted,12)+text('MJERENJE + BILANCA',926,33,muted,12,'end')+line(654,70,654,325,'#355065')+s+(compactPlot?'':plot.drawing),plot,metrics,note,state};
 }
 function mount(config){
  const anchor=document.getElementById(config.anchor);if(!anchor)return;
  const id='mf1-field-'+config.n,root=document.createElement('section');root.id=id;root.className='mf1-lab mf1-field-lab';root.setAttribute('aria-labelledby',id+'-title');
  root.innerHTML=`<header class="mf1-atlas-head"><div class="mf1-atlas-kicker">VJEŽBA ${config.n} / LABORATORIJ POLJA</div><h3 id="${id}-title">${config.title}</h3><p>${config.sub}</p></header><div class="mf1-atlas-stage"><svg id="${id}-scene" viewBox="0 0 960 580" role="img" aria-label="${esc(config.title)}"></svg></div><div class="mf1-atlas-toolbar">${config.motion?'<button type="button" data-action="play" aria-pressed="false">▶ Pokreni tragove</button><button type="button" data-action="rewind">↺ Vrijeme 0</button><label>Brzina vremena <select aria-label="Brzina vremena"><option value="0.1">0,1×</option><option value="0.25" selected>0,25×</option><option value="1">1×</option></select></label><output class="mf1-atlas-time">t = 0 s</output>':''}<button type="button" data-action="reset">Početni pokus</button></div><div class="mf1-atlas-controls">${config.controls.map(c=>`<label class="mf1-atlas-control" for="${id}-${c.key}"><span>${esc(c.label)}</span><output data-reading="${c.key}"></output><input type="range" id="${id}-${c.key}" data-parameter="${c.key}" min="${c.min}" max="${c.max}" step="${c.step}" value="${c.value}"></label>`).join('')}${[11,12,13].includes(config.n)?'':`<label class="mf1-atlas-control mf1-atlas-probe" for="${id}-probe"><span>${config.probe}</span><output data-reading="probe"></output><input type="range" id="${id}-probe" data-parameter="probe" min="0" max="100" step="1" value="50"></label>`}</div><div class="mf1-atlas-equation">${config.formula}</div><p class="mf1-atlas-balance" role="status"></p><div class="mf1-atlas-challenge"><strong>Predvidi → promijeni → provjeri</strong><span>${config.challenge}</span></div><details class="mf1-atlas-assumptions"><summary>Pretpostavke i čitanje prikaza</summary><p>${config.assumption}</p><p>Ružičasta oznaka je mjerna točka. Boje uvijek čitaj uz mjerilo; promjenom parametara mjerilo se prilagođava. „Zapamti A” čuva sliku s njezinim tadašnjim mjerilom. Tragovi miruju do pokretanja.</p></details>`;
  anchor.before(root);
  const mobile=document.createElement('div');mobile.className='mf1-atlas-mobile';mobile.hidden=true;
  mobile.innerHTML='<div class="mf1-atlas-mobile-readings"></div><p class="mf1-atlas-mobile-title"></p><svg id="'+id+'-mobile-plot" viewBox="0 0 500 240" role="img"></svg>';
  root.querySelector('.mf1-atlas-stage').after(mobile);
  const svg=root.querySelector('svg'),inputs=[...root.querySelectorAll('[data-parameter]')],play=root.querySelector('[data-action=play]');
  let time=0,running=false,last=null,lastPaint=-Infinity,frame=0,inView=true;
  function render(){
   compactPlot=(root.clientWidth||window.innerWidth)<600;
   const values=Object.fromEntries(inputs.map(i=>[i.dataset.parameter,+i.value])),probe=values.probe??50;
   config.controls.forEach(c=>root.querySelector(`[data-reading="${c.key}"]`).textContent=fmt(values[c.key],3)+' '+c.unit);
   const po=root.querySelector('[data-reading=probe]');if(po)po.textContent=fmt(probe,0)+' %';
   const out=scene(config.n,values,time,probe,id);svg.innerHTML=`<title>${esc(config.title)}</title><desc>${esc(out.metrics.map(a=>a.join(': ')).join('. '))}</desc>`+out.svg;
   svg.setAttribute('viewBox',compactPlot?'60 42 590 315':'0 0 960 580');mobile.hidden=!compactPlot;
   if(compactPlot){mobile.querySelector('.mf1-atlas-mobile-readings').innerHTML=out.metrics.map(([label,value])=>`<div><small>${esc(label)}</small><strong>${esc(value)}</strong></div>`).join('');mobile.querySelector('p').textContent=out.plot.title;mobile.querySelector('svg').setAttribute('aria-label',out.plot.title);mobile.querySelector('svg').innerHTML=`<title>${esc(out.plot.title)}</title><rect width="500" height="240" fill="#0c263a"/>`+out.plot.drawing;}
   root.querySelector('.mf1-atlas-balance').textContent=out.note||out.metrics.map(([l,v])=>l+': '+v).join(' · ');
   root.querySelector('.mf1-atlas-balance').classList.toggle('mf1-atlas-warning',!!out.state.invalid);
   if(play){play.disabled=!!out.state.invalid;if(out.state.invalid)stop();}
   if(config.motion)root.querySelector('.mf1-atlas-time').textContent='t = '+fmt(time,2)+' s';
   root.mf1FieldState={n:config.n,parameters:values,time,running,model:out.state};
  }
  function stop(){running=false;last=null;cancelAnimationFrame(frame);if(play){play.textContent='▶ Pokreni tragove';play.setAttribute('aria-pressed','false');}if(root.mf1FieldState)root.mf1FieldState.running=false;}
  function tick(now){if(!running)return;if(document.hidden||!inView){stop();return;}if(last!==null)time+=(now-last)/1000*Number(root.querySelector('select').value);last=now;if(now-lastPaint>=32){render();lastPaint=now;}root.mf1FieldState.time=time;frame=requestAnimationFrame(tick);}
  root.addEventListener('input',event=>{if(!event.target.matches('[data-parameter]'))return;time=0;last=null;lastPaint=-Infinity;render();});
  root.addEventListener('click',event=>{const action=event.target.closest('[data-action]')?.dataset.action;if(!action)return;
   if(action==='play'){if(running)stop();else{running=true;last=null;play.textContent='Ⅱ Pauziraj';play.setAttribute('aria-pressed','true');frame=requestAnimationFrame(tick);}render();}
   if(action==='rewind'){stop();time=0;render();}
   if(action==='reset'){stop();time=0;inputs.forEach(i=>{i.value=i.dataset.parameter==='probe'?50:config.controls.find(c=>c.key===i.dataset.parameter).value;});render();inputs.forEach(i=>i.dispatchEvent(new Event('input',{bubbles:true})));}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  window.addEventListener('resize',()=>render());
  if(window.IntersectionObserver)new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(!inView)stop();},{threshold:0}).observe(root);
  // A single accessible range remains the source of truth for pointer/touch probing.
  svg.addEventListener('pointerdown',event=>{const input=root.querySelector('[data-parameter=probe]');if(!input)return;const box=svg.getBoundingClientRect(),vb=svg.getAttribute('viewBox').split(' ').map(Number),x=vb[0]+(event.clientX-box.left)/box.width*vb[2],y=vb[1]+(event.clientY-box.top)/box.height*vb[3];let q;
   if(config.n===1||config.n===3)q=(y-78)/230;else if(config.n===2)q=(308-y)/220;else if(config.n===8||config.n===9||config.n===10)q=(x-100)/510;else return;
   input.value=String(Math.round(Math.max(0,Math.min(1,q))*100));input.dispatchEvent(new Event('input',{bubbles:true}));
  });render();
 }
 document.addEventListener('DOMContentLoaded',()=>configs.forEach(mount),{once:true});
})();
