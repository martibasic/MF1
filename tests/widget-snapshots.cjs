const fs=require('fs'),sharp=require('sharp'),{load}=require('./widget-harness.cjs'),{createCanvas}=require('@napi-rs/canvas');
(async()=>{
for(const n of process.argv.slice(2).map(Number)){
 const mode=process.env.MF1_EXTREME||'',a=load(n,{rendered:process.env.MF1_RENDERED==='1'}),dir=`output/audit/images/v${n}${mode?'-'+mode:''}`;a.frames(2);fs.mkdirSync(dir,{recursive:true});const items=[];let i=0;
 if(mode)for(const input of a.w.document.querySelectorAll('input[type=range]'))if(input[mode]!=='')a.change(input,input[mode]);
 for(const el of a.w.document.querySelectorAll('canvas,svg')){
  if(!a.visible(el))continue;let name=el.id||`svg-${++i}`,buf;
  try{if(el.tagName.toLowerCase()==='canvas')buf=a.canvases.get(el)?.native.toBuffer('image/png');else {el.setAttribute('xmlns','http://www.w3.org/2000/svg');for(const node of el.querySelectorAll('*')){const css=a.w.getComputedStyle(node);if(node.tagName==='text')node.setAttribute('font-family','Segoe UI, sans-serif');for(const prop of ['font-size','font-weight','fill','stroke','stroke-width','stroke-dasharray','opacity','fill-opacity','text-anchor'])if(css.getPropertyValue(prop)&&!node.hasAttribute(prop)&&(node.hasAttribute('class')||prop.startsWith('font-')))node.setAttribute(prop,css.getPropertyValue(prop));}buf=await sharp(Buffer.from(el.outerHTML)).flatten({background:'#ffffff'}).png().toBuffer()}
   if(!buf)continue;fs.writeFileSync(`${dir}/${name}.png`,buf);const thumb=await sharp(buf).resize(580,340,{fit:'contain',background:'#ffffff'}).png().toBuffer();items.push({input:thumb,left:10+(items.length%2)*610,top:40+Math.floor(items.length/2)*380});
   const c=createCanvas(580,28),ct=c.getContext('2d');ct.fillStyle='#ffffff';ct.fillRect(0,0,580,28);ct.font='16px Segoe UI';ct.fillStyle='#17324b';ct.fillText(name,8,21);items.push();items[items.length-1].label={input:c.toBuffer('image/png'),left:10+((items.length-1)%2)*610,top:12+Math.floor((items.length-1)/2)*380};
  }catch(err){console.log(n,name,err.message)}
 }
 const layers=items.flatMap(({label,...x})=>[x,label]);if(layers.length)await sharp({create:{width:1220,height:Math.ceil(items.length/2)*380,channels:3,background:'#d7e3ea'}}).composite(layers).png().toFile(`output/audit/v${n}${mode?'-'+mode:''}-contact.png`);
 console.log(n,items.length,'figures',a.errors.slice(0,2));a.dom.window.close();
}
})();
