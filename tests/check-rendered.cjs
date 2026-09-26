const assert=require('node:assert/strict'),fs=require('fs'),{load}=require('./widget-harness.cjs');
const report=[];
for(let n=1;n<=13;n++){
 const a=load(n,{rendered:true});a.frames(3);a.scan('rendered');
 const controls=[...a.w.document.querySelectorAll('input[type=range],input[type=number],select')];
 for(const el of controls){const initial=el.value;for(const value of el.tagName==='SELECT'?[...el.options].map(o=>o.value):[el.min,el.max])if(value!==''){a.change(el,value);a.frames(1);a.scan(el.id);}a.change(el,initial);}
 const figures=[...a.w.document.querySelectorAll('svg,canvas')].filter(a.visible);
 const ids=[...a.w.document.querySelectorAll('[id]')].map(el=>el.id),duplicates=[...new Set(ids.filter((x,i)=>ids.indexOf(x)!==i))];
 report.push({exercise:n,controls:controls.length,figures:figures.length,errors:[...new Set(a.errors)],duplicateIds:duplicates});
 assert.deepEqual(report.at(-1).errors,[],`V${n}`);assert.deepEqual(duplicates,[],`V${n}: duplicate IDs`);
 console.log(`V${n}: ${controls.length} controls, ${figures.length} figures, no JS/non-finite errors or duplicate IDs`);a.dom.window.close();
}
fs.mkdirSync('output/audit',{recursive:true});fs.writeFileSync('output/audit/rendered-results.json',JSON.stringify(report,null,2));
