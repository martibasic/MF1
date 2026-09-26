const fs = require('node:fs');
const { JSDOM, VirtualConsole } = require('jsdom');
const { createCanvas, GlobalFonts } = require('@napi-rs/canvas');
for(const family of ['Inter','Segoe UI','system-ui'])for(const font of ['segoeui.ttf','segoeuib.ttf']){
  const path='C:/Windows/Fonts/'+font;if(fs.existsSync(path))GlobalFonts.registerFromPath(path,family);
}

function load(n,{rendered=false,reduced=true,labs=true}={}) {
  const file = rendered?`_site/vjezba_${String(n).padStart(2,'0')}.html`:`vjezba_${String(n).padStart(2,'0')}.qmd`;
  const source = fs.readFileSync(file,'utf8');
  const html = source;
  const errors=[], warnings=[], queue=new Map(), canvases=new Map(); let raf=0,now=0;
  const vc = new VirtualConsole(); vc.on('jsdomError', e=>{if(e.type!=='css-parsing')errors.push(e.cause?.stack||e.message)});
  const dom = new JSDOM(html, {runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
  const w=dom.window;
  for(const path of ['custom.css','assets/mf1-widgets.css','assets/mf1-extra-labs.css','assets/mf1-layout.css']){if(!fs.existsSync(path))continue;const style=w.document.createElement('style');style.textContent=fs.readFileSync(path,'utf8');w.document.head.append(style);}
  const add=w.document.addEventListener.bind(w.document);
  w.document.addEventListener=(type,fn,options)=>add(type,fn,type==='DOMContentLoaded'?{once:true}:options);
  w.matchMedia=()=>({matches:reduced,addEventListener(){},removeEventListener(){},addListener(){}});
  w.performance.now=()=>now;
  w.ResizeObserver=class {observe(){} disconnect(){}};
  w.IntersectionObserver=class {observe(){} disconnect(){}};
  w.requestAnimationFrame=fn=>{queue.set(++raf,fn);return raf};
  w.cancelAnimationFrame=id=>queue.delete(id);
  w.HTMLElement.prototype.scrollIntoView=function(){};
  w.SVGElement.prototype.getBBox=function(){return {x:0,y:0,width:100,height:30}};
  w.HTMLElement.prototype.getBoundingClientRect=function(){const width=+(this.getAttribute('width')||900),height=+(this.getAttribute('height')||400);return {x:0,y:0,left:0,top:0,right:width,bottom:height,width,height}};
  Object.defineProperty(w.HTMLElement.prototype,'innerText',{get(){return this.textContent},set(t){this.textContent=t}});
  w.HTMLCanvasElement.prototype.getContext=function(){
    if(canvases.has(this))return canvases.get(this).ctx;
    const native=createCanvas(this.width,this.height), target=native.getContext('2d'),id=this.id;
    const element=this;
    const sync=()=>{if(native.width!==element.width)native.width=element.width;if(native.height!==element.height)native.height=element.height;};
    const ctx=new Proxy(target,{get(t,p){sync();if(p==='canvas')return element;const v=t[p];if(typeof v!=='function')return v;return (...a)=>{sync();if(a.some(v=>typeof v==='number'&&!Number.isFinite(v)))errors.push(`${id}.${p}: non-finite`);try{return v.apply(t,a)}catch(e){errors.push(`${id}.${p}: ${e.message}`)}}},set(t,p,v){sync();t[p]=v;return true}});
    canvases.set(this,{native,ctx});return ctx;
  };
  w.eval(fs.readFileSync('assets/mf1-widgets.js','utf8'));
  let i=0;
  for(const script of w.document.querySelectorAll('script')){
    i++;if(script.src||(script.type&&!['text/javascript','application/javascript'].includes(script.type))||script.id==='quarto-html-after-body')continue;
    try{w.eval(script.textContent+`\n//# sourceURL=${file}-script-${i}`)}catch(e){errors.push(`${file} script ${i}: ${e.stack}`)}
  }
  w.HTMLCanvasElement.prototype.toDataURL=function(){this.getContext('2d');return canvases.get(this).native.toDataURL('image/png');};
  if(labs)for(const file of ['assets/mf1-extra-labs.js','assets/mf1-layout.js'])if(fs.existsSync(file))w.eval(fs.readFileSync(file,'utf8'));
  w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
  for(const el of w.document.querySelectorAll('[onclick],[oninput],[onchange]'))for(const key of ['onclick','oninput','onchange']){
    if(el.hasAttribute(key)&&!el[key])el[key]=w.Function('event',el.getAttribute(key));
  }
  function frames(count=1,dt=16.6667){for(let k=1;k<=count;k++){now+=dt;const pending=[...queue.values()];queue.clear();for(const fn of pending)try{fn(now)}catch(e){errors.push(`frame: ${e.stack}`)}}}
  function scan(label){for(const el of w.document.querySelectorAll('svg *'))for(const a of el.attributes)if(/\b(?:NaN|Infinity|undefined)\b/.test(a.value))errors.push(`${label} #${el.closest('svg').id}: ${a.name}=${a.value}`);}
  function change(el,value){el.value=value;el.dispatchEvent(new w.Event('input',{bubbles:true}));el.dispatchEvent(new w.Event('change',{bubbles:true}));}
  function visible(el){for(let p=el;p&&p.nodeType===1;p=p.parentElement){if(p.hidden||w.getComputedStyle(p).display==='none')return false}return true}
  return {w,dom,errors,warnings,canvases,queue,frames,scan,change,visible};
}
module.exports={load};
if(require.main===module){
 const summary=[];
 for(let n=1;n<=13;n++){
   const a=load(n);a.scan('initial');a.frames(2);
   const controls=[...a.w.document.querySelectorAll('input[type=range],input[type=number],select')];
   const initial=controls.map(e=>e.value);
   controls.forEach((e,i)=>{for(const val of e.tagName==='SELECT'?[...e.options].map(o=>o.value):[e.min,e.max])if(val!==''){a.change(e,val);a.scan(`${e.id||e.dataset.k}=${val}`)}a.change(e,initial[i])});
   a.frames(2);
   const figures=[...a.w.document.querySelectorAll('canvas,svg')].filter(e=>a.visible(e)).map(e=>({tag:e.tagName,id:e.id,widget:e.closest('[id]')?.id}));
   const errors=[...new Set(a.errors)];summary.push({n,controls:controls.length,figures,errors});console.log(n,controls.length,'controls',figures.length,'figures',errors.length,'errors');if(errors.length)console.log(errors.slice(0,8).join('\n'));
   a.dom.window.close();
 }
 fs.writeFileSync('output/audit/baseline.json',JSON.stringify(summary,null,2));
}
