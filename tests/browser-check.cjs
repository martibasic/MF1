/* Real Chromium/Edge checks, isolated profile; no dependency and no user's browser session. */
const fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process'),assert=require('node:assert/strict');
const binary=process.env.MF1_BROWSER_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const output=path.resolve('output/audit/browser');fs.mkdirSync(output,{recursive:true});
const profile=fs.mkdtempSync(path.join(output,'profile-'));
const child=spawn(binary,['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-extensions','--disable-background-networking','--allow-file-access-from-files','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{windowsHide:true,stdio:'ignore'});
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let serial=0,ws;
async function connect(url){ws=new WebSocket(url);await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});const pending=new Map();ws.onclose=()=>{for(const p of pending.values())p.reject(Error('Browser connection closed'));pending.clear();};ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(m.error.message)):p.resolve(m.result);}};return (method,params={})=>new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});}
(async()=>{
 let cdp;
 try{
  let port;for(let i=0;i<100;i++){const file=path.join(profile,'DevToolsActivePort');if(fs.existsSync(file)){port=Number(fs.readFileSync(file,'utf8').split('\n')[0]);break;}await sleep(100);}assert.ok(port,'Headless browser did not start');
  const pages=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();cdp=await connect(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
  const evaluate=async expression=>{const result=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(result.exceptionDetails.text);return result.result.value;};
  await cdp('Page.enable');await cdp('Runtime.enable');
  const report=[];
  for(let n=1;n<=13;n++){
   await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1100,deviceScaleFactor:1,mobile:false});
   await cdp('Page.navigate',{url:'file:///'+path.resolve('_site/vjezba_'+String(n).padStart(2,'0')+'.html').replaceAll('\\','/')});
   let ready=false;for(let i=0;i<100;i++){ready=await evaluate('!!document.querySelector(".mf1-field-lab")?.mf1FieldState');if(ready)break;await sleep(100);}assert.ok(ready,'V'+n+' field not mounted');
   await evaluate('document.querySelector(".mf1-field-lab").scrollIntoView({block:"start"})');await sleep(150);
   const scene=await evaluate('(()=>{const r=document.querySelector(".mf1-field-lab svg").getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height,scale:1};})()');
   const shot=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:scene});fs.writeFileSync(path.join(output,'v'+n+'-scene.png'),Buffer.from(shot.data,'base64'));
   const desktop=await evaluate('(()=>{const r=document.querySelector(".mf1-field-lab");return {width:r.clientWidth,overflow:r.scrollWidth>r.clientWidth+2,svg:r.querySelector("svg").getBoundingClientRect().width};})()');assert.ok(!desktop.overflow,'V'+n+' desktop overflow');
   await evaluate('Array.from(document.querySelectorAll(".mf1-field-lab .mf1-view-tools button")).find(b=>b.textContent==="Zapamti A").click()');
   const saved=await evaluate('(async()=>{const images=Array.from(document.querySelectorAll(".mf1-field-lab .mf1-compare-tray img"));await Promise.all(images.map(i=>i.decode()));return images.length;})()');assert.ok(saved>0,'V'+n+' saved SVG decodes');
   await evaluate('document.querySelector(".mf1-field-lab .mf1-compare-tray button").click()');
   await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await sleep(150);
   const mobile=await evaluate('(()=>{const r=document.querySelector(".mf1-field-lab");return {width:r.clientWidth,overflow:r.scrollWidth>r.clientWidth+2,pageOverflow:document.documentElement.scrollWidth>innerWidth+2,readings:!r.querySelector(".mf1-atlas-mobile").hidden};})()');assert.ok(!mobile.overflow&&!mobile.pageOverflow,'V'+n+' mobile overflow');assert.ok(mobile.readings,'V'+n+' mobile readings');
   if([2,8,12].includes(n)){
    await evaluate('document.querySelector(".mf1-field-lab").scrollIntoView({block:"start"})');
    const screenshot=await cdp('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(output,'v'+n+'-mobile.png'),Buffer.from(screenshot.data,'base64'));
   }
   // Exercise actual native dialog focus, Escape and original owner restoration.
   await evaluate('document.querySelector(".mf1-field-lab .mf1-view-tools button").click()');
   assert.ok(await evaluate('!!document.querySelector("dialog:modal .mf1-field-lab")'),'V'+n+' dialog');
   await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await sleep(50);
   assert.ok(await evaluate('!document.querySelector("dialog") && document.activeElement===document.querySelector(".mf1-field-lab .mf1-view-tools button")'),'V'+n+' Escape/focus restoration');
   if(n===2){
    await evaluate('document.querySelector(".mf1-field-lab .mf1-exact-button").click()');
    await evaluate('document.querySelector("dialog input").value="1,25"; document.querySelector("dialog form").requestSubmit()');
    assert.equal(await evaluate('document.querySelector(".mf1-field-lab").mf1FieldState.parameters.U'),1.25);
   }
   report.push({exercise:n,desktop,mobile,dialog:true});console.log('V'+n+': real desktop/mobile layout and native dialog passed');
  }
  fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));
 }finally{if(cdp)try{await Promise.race([cdp('Browser.close'),sleep(500)]);}catch{}if(ws)ws.close();child.kill();}
})().catch(error=>{console.error(error);process.exitCode=1;});
