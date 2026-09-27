/* Real Edge audit of the edited exercise widgets. Uses an isolated headless profile. */
const fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const binary=process.env.MF1_BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const output=path.resolve('output/audit/browser');fs.mkdirSync(output,{recursive:true});
const reportName=process.argv.length>2?'report-'+process.argv.slice(2).join('-')+'.json':'report.json';
const profile=fs.mkdtempSync(path.join(output,'profile-'));
const child=spawn(binary,['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-extensions','--disable-background-networking','--allow-file-access-from-files','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{windowsHide:true,stdio:'ignore'});
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let serial=0,ws;const runtimeErrors=[];
async function connect(url){
 ws=new WebSocket(url);await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});const pending=new Map();
 ws.onclose=()=>{for(const p of pending.values())p.reject(Error('Browser connection closed'));pending.clear();};
 ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.method==='Runtime.exceptionThrown'){const d=m.params.exceptionDetails;runtimeErrors.push(d.exception?.description||d.text);}
  if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result);}};
 return (method,params={})=>new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
}
(async()=>{
 let cdp;
 try{
  let port;for(let i=0;i<100;i++){const file=path.join(profile,'DevToolsActivePort');if(fs.existsSync(file)){port=Number(fs.readFileSync(file,'utf8').split('\n')[0]);break;}await sleep(100);}assert.ok(port,'Headless browser did not start');
  const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();cdp=await connect(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
  const evaluate=async expression=>{const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
  async function capture(clip){
   // A beyond-viewport crop can otherwise composite the sticky site header over
   // the middle of a tall widget. Hide only site navigation while taking a shot.
   await evaluate(`(()=>{const s=document.createElement('style');s.id='mf1-audit-capture';s.textContent='#quarto-header,.quarto-secondary-nav{visibility:hidden!important}';document.head.append(s);})()`);
   try{return await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip});}
   finally{await evaluate(`document.getElementById('mf1-audit-capture')?.remove()`);}
  }
  await cdp('Page.enable');await cdp('Runtime.enable');
  const bootstrap=`window.__mf1Audit={roles:()=>Array.from(document.querySelectorAll('[data-widget-role]')),compact:role=>role.matches('.mf1-compact')?role:role.querySelector('.mf1-compact'),visible:el=>{if(!el?.getClientRects().length)return false;for(let p=el;p;p=p.parentElement)if(p.hidden||getComputedStyle(p).display==='none')return false;return true;},frames:()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))};`;
  async function navigate(n,width){
   await cdp('Emulation.setDeviceMetricsOverride',{width,height:width===390?844:1100,deviceScaleFactor:1,mobile:width===390});
   await cdp('Page.navigate',{url:pathToFileURL(path.resolve('_site/vjezba_'+String(n).padStart(2,'0')+'.html')).href});
   let ready=false;for(let i=0;i<100;i++){
    ready=await evaluate(`document.readyState==='complete'&&(()=>{const roles=Array.from(document.querySelectorAll('[data-widget-role]'));return roles.length>=2&&roles.every(r=>(r.matches('.mf1-compact')?r:r.querySelector('.mf1-compact'))?.querySelector('.mf1-view-tools button'));})()`);
    if(ready)break;await sleep(100);
   }
   assert.ok(ready,'V'+n+' edited widgets not mounted; render the current sources first');
   await evaluate(bootstrap+'__mf1Audit.frames()');
  }
  async function layout(){return evaluate(`(()=>{const A=__mf1Audit;return {pageOverflow:document.documentElement.scrollWidth>innerWidth+2,roots:A.roles().map(role=>{const r=A.compact(role),b=r.getBoundingClientRect();return {id:role.id||role.dataset.widgetId||r.id,role:role.dataset.widgetRole,width:b.width,height:b.height,overflow:r.scrollWidth>r.clientWidth+2,nativeVector:!r.querySelector("canvas,svg image,svg foreignObject")};})};})()`);}
  async function captureIntro(n,width){
   const targets=await evaluate(`(()=>{const A=__mf1Audit,r=A.compact(document.querySelector('[data-widget-role="intro"]'));r.scrollIntoView({block:'start'});window.scrollBy(0,-80);const box=e=>{const b=e.getBoundingClientRect();return {x:b.x+scrollX,y:b.y+scrollY,width:b.width,height:Math.min(b.height,2600),scale:1};};const scene=Array.from(r.querySelectorAll('canvas,svg')).find(e=>!e.parentElement.closest('svg')&&!e.closest('mjx-container')&&A.visible(e));return {widget:box(r),scene:scene?box(scene):null};})()`);
   assert.ok(targets.scene,'V'+n+' visible intro scene');
   assert.ok(await evaluate(`(()=>{const A=__mf1Audit,r=A.compact(document.querySelector('[data-widget-role="intro"]')),title=r.querySelector('h3,h4'),scene=Array.from(r.querySelectorAll('canvas,svg')).find(e=>!e.parentElement.closest('svg')&&!e.closest('mjx-container')&&A.visible(e));return !title||title.getBoundingClientRect().top<scene.getBoundingClientRect().top;})()`),'V'+n+' title should precede the scene');
   for(const [kind,clip]of Object.entries(targets)){assert.ok(clip.width>0&&clip.height>0);const shot=await capture(clip);fs.writeFileSync(path.join(output,`v${n}-${width}-${kind}.png`),Buffer.from(shot.data,'base64'));}
  }
  async function captureApplications(n,width){
   const count=await evaluate('__mf1Audit.roles().length');
   for(let index=0;index<count;index++){
    const target=await evaluate('(()=>{const A=__mf1Audit,role=A.roles()['+index+'],r=A.compact(role);r.scrollIntoView({block:"start"});window.scrollBy(0,-80);const box=e=>{const b=e.getBoundingClientRect();return {x:b.x+scrollX,y:b.y+scrollY,width:b.width,height:Math.min(b.height,2800),scale:1};};return {id:role.id||role.dataset.widgetId,widget:box(r),scenes:Array.from(r.querySelectorAll("canvas,svg")).filter(e=>!e.parentElement.closest("svg")&&!e.closest("mjx-container")&&A.visible(e)).map(box)};})()');
    for(const [kind,clip]of [['widget',target.widget],...target.scenes.map((box,i)=>['scene-'+i,box])]){
     const shot=await capture(clip);
     fs.writeFileSync(path.join(output,'v'+n+'-'+target.id+'-'+width+'-'+kind+'.png'),Buffer.from(shot.data,'base64'));
    }
   }
  }
  async function modeAudit(){return evaluate(`(async()=>{const A=__mf1Audit,results=[];for(const role of A.roles()){const r=A.compact(role),id=role.id||role.dataset.widgetId||r.id;
    const buttons=Array.from(r.querySelectorAll('button[data-mode],button[data-ocean-model],button[data-editorial-mode],button[data-p-view],button[data-v2nn],.v3-tab,button[data-shape],button[data-k],button[data-cp-side],button[data-cp-step],button[data-e-mode],button[data-s-mode],button[aria-controls],button[role="tab"]')).filter(b=>!b.closest('.mf1-view-tools,.mf1-motion,.mf1-compare-tray'));
    for(const b of buttons){if(!b.isConnected)continue;const pane=b.closest('[data-editorial-pane]');if(pane?.hidden)r.querySelector('[data-editorial-mode="'+pane.dataset.editorialPane+'"]')?.click();b.click();await A.frames();const invalid=Array.from(r.querySelectorAll('svg *')).flatMap(e=>Array.from(e.attributes).filter(a=>/\\b(?:NaN|Infinity|undefined)\\b/.test(a.value)).map(a=>a.name+'='+a.value));results.push({id,mode:b.textContent.trim(),visible:A.visible(b),overflow:r.scrollWidth>r.clientWidth+2,invalid});}
   }return results;})()`);}
  async function savedImages(){return evaluate(`(async()=>{const A=__mf1Audit,out=[];for(const role of A.roles()){const r=A.compact(role),id=role.id||role.dataset.widgetId||r.id;const save=Array.from(r.querySelectorAll('.mf1-view-tools button')).find(b=>b.textContent==='Zapamti A');if(!save){out.push({id,skipped:r.matches('#v13-moody-widget')});continue;}const menu=save.closest('details');if(menu)menu.open=true;save.click();const images=Array.from(r.querySelectorAll('.mf1-compare-tray img'));await Promise.all(images.map(i=>i.decode()));out.push({id,count:images.length,decoded:images.every(i=>i.complete&&i.naturalWidth>0)});r.querySelector('.mf1-compare-tray button').click();if(menu)menu.open=false;}return out;})()`);}
  async function nativeDialogs(n){
   const count=await evaluate('__mf1Audit.roles().length'),out=[];
   for(let i=0;i<count;i++){
    const id=await evaluate(`(()=>{const A=__mf1Audit,role=A.roles()[${i}],r=A.compact(role),trigger=r.mf1Enlarge;const owner=!r.id&&r.parentElement.id?r.parentElement:r;window.__mf1DialogCheck={r,owner,parent:owner.parentElement,next:owner.nextSibling,trigger};trigger.scrollIntoView({block:'center'});trigger.focus();trigger.click();return role.id||role.dataset.widgetId||r.id;})()`);
    assert.ok(await evaluate('!!__mf1DialogCheck.r.closest("dialog:modal")'),'V'+n+' '+id+' native enlarge');
    await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await evaluate('__mf1Audit.frames()');
    const restored=await evaluate('(()=>{const c=__mf1DialogCheck;return !document.querySelector("dialog:modal")&&c.owner.parentElement===c.parent&&c.owner.nextSibling===c.next&&document.activeElement===c.trigger;})()');
    assert.ok(restored,'V'+n+' '+id+' Escape, focus and original position');out.push(id);
   }return out;
  }
  const report=[];
  for(let n=1;n<=13;n++){
   if(process.argv.length>2&&!process.argv.slice(2).map(Number).includes(n))continue;
   runtimeErrors.length=0;await navigate(n,1440);const desktop=await layout();
   assert.deepEqual(desktop.roots.map(r=>r.id),require('./editorial-selection.json')[n-1],'V'+n+' reviewed experiment selection');assert.equal(desktop.roots.filter(r=>r.role==='intro').length,1,'V'+n+' exactly one intro');
   assert.ok(!desktop.pageOverflow&&desktop.roots.every(r=>!r.overflow&&r.nativeVector),'V'+n+' desktop overflow: '+JSON.stringify(desktop));
   await captureIntro(n,1440);await captureApplications(n,1440);const saved=await savedImages();assert.ok(saved.every(s=>s.skipped||(s.count>0&&s.decoded)),'V'+n+' snapshot A images decode');
   const desktopModes=await modeAudit();assert.ok(desktopModes.every(m=>!m.overflow&&!m.invalid.length),'V'+n+' desktop mode overflow or invalid geometry: '+JSON.stringify(desktopModes.filter(m=>m.overflow||m.invalid.length)));
   await navigate(n,390);const mobile=await layout();assert.ok(!mobile.pageOverflow&&mobile.roots.every(r=>!r.overflow&&r.nativeVector),'V'+n+' mobile overflow: '+JSON.stringify(mobile));
   await captureIntro(n,390);await captureApplications(n,390);const dialogs=await nativeDialogs(n);
   if(n===2){
    await evaluate(`(()=>{const input=document.getElementById('v-slider');input.mf1Limits.querySelector('.mf1-exact-button').click();const dialog=document.querySelector('dialog:modal');dialog.querySelector('input').value='1,2';dialog.querySelector('form').requestSubmit();})()`);
    assert.equal(await evaluate('document.getElementById("v-slider").value'),'1.2');assert.equal(await evaluate('Number(document.getElementById("tau-out").textContent.replace(",","."))'),12);
   }
   const mobileModes=await modeAudit();assert.ok(mobileModes.every(m=>!m.overflow&&!m.invalid.length),'V'+n+' mobile mode overflow or invalid geometry: '+JSON.stringify(mobileModes.filter(m=>m.overflow||m.invalid.length)));
   assert.deepEqual(runtimeErrors,[],'V'+n+' browser runtime errors');report.push({exercise:n,desktop,mobile,saved,dialogs,desktopModes,mobileModes,runtimeErrors:[...runtimeErrors]});
   fs.writeFileSync(path.join(output,reportName),JSON.stringify(report,null,2));console.log('V'+n+': '+desktop.roots.length+' edited widgets; desktop/mobile, modes, A snapshots and native dialogs passed');
  }
 }finally{if(cdp)try{await Promise.race([cdp('Browser.close'),sleep(500)]);}catch{}if(ws)ws.close();child.kill();}
})().catch(error=>{console.error(error);process.exitCode=1;});
