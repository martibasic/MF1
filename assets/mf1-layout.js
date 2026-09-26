/* Shared presentation layer. Physical models and drawing coordinates stay in their widgets. */
(() => {
 'use strict';
 const roots='.mf1-lab,.v1x-shell,.v8-lab,.v8x-shell,.v9-widget,.v9x-shell,.v10-lab,.v10x-shell,.v11x-shell,.v12x-shell,#z120-laminar-widget,#z122-diffuser-widget,#z123-budget-widget,#z124-parallel-widget,#reynolds-widget,#v13-moody-widget';
 const secondary={
  'z2-advanced-widget':['z2-rho'],
  'z6-advanced-widget':['z6-mu','z6-l'],
  'z7-advanced-widget':['z7-delta'],
  'widget-visc-basics':['h-slider'],
  'widget-z10-vfinal':['z10-v7-slider-a','z10-v7-slider-b'],
  'widget-z19-advanced':['z19-slider-ru'],
  'widget-z24-advanced':['z24-v3-slider-h1','z24-v3-slider-rhov','z24-v3-slider-rhou','z24-v3-slider-rhom'],
  'widget-z25-advanced':['z25-v3-slider-rho','z25-v3-slider-h1','z25-v3-slider-h2','z25-v3-slider-patm'],
  'widget-z30-advanced':['z30-h1','z30-rhref'],
  'widget-z31-advanced':['z31-v3-slider-hs','z31-v3-slider-ll','z31-v3-slider-ls'],
  'widget-z32-advanced':['z32-l','z32-rho'],
  'widget-z33-advanced':['z33-rho','z33-d','z33-pmin'],
  'widget-z23-advanced':['z23-slider-h4'],
  'widget-z27-advanced':['z27-slider-hg'],
  'widget-z28-advanced':['z28-rho0'],
  'v5-principle-explorer':['v5-p-b-slider','v5-p-rho-slider'],
  'widget-49':['z49-rho','z49-gc'],
  'widget-50-51':['z50-b'],
  'widget-55':['z55-h','z55-rm'],
  'widget-52':['z52-rho'],
  'v7-t1-container':['z1b','z1rho'],
  'v7-widget-a-container':['az','ar','ab'],
  'v8-z70':['z70-d1','z70-rho'],
  'v8-z71':['z71-dc','z71-rb'],
  'v8-z72':['z72-v2'],
  'v8-z73':['z73-sg','z73-d3'],
  'v8-z74':['z74-v1','z74-dp','z74-l','z74-d1','z74-df'],
  'v8-z75':['z75-d1','z75-d2'],
  'v9-egl-source':['e-d1','e-h'],
  'v9-z77':['z77-r'],
  'v9-z79':['z79-a1','z79-rho'],
  'v9-siphon':['s-l1','s-l2','s-d'],
  'v10-loss-explorer':['v10x-l','v10x-lambda','v10x-zeta'],
  'v10-z86-lab':['v10-z86-top'],
  'v10-z87-lab':['v10-z87-h2'],
  'v10-z91-lab':['v10-z91-h3','v10-z91-rhou'],
  'v10-z93-lab':['v10-z93-h'],
  'v10-z94-lab':['v10-z94-d1','v10-z94-h'],
  'v11-momentum-lab':['v11m-ratio','v11m-p1'],
  'v11-z97-lab':['v11-z97-diameter','v11-z97-h0','v11-z97-cd'],
  'v11-z99-lab':['v11-z99-re','v11-z99-ze'],
  'z124-parallel-widget':['z124-d1-slider']
 };
 const dataSecondary={
  'v12-pelton':['q','b'], 'v12-rocket':['m','ve'],
  'v12-cantilever':['l'], 'v12-sprinkler':['r'], 'v12-wind':['e']
 };
 function group(root,inputs){
  const groups=new Map();
  for(const input of inputs){
   if(!input||input.closest('details'))continue;
   let field=input.parentElement;
   if(field.querySelectorAll('input,select').length>1&&input.previousElementSibling?.tagName==='LABEL'){
    const label=input.previousElementSibling,box=document.createElement('div');box.className='mf1-field';
    field.insertBefore(box,label);box.append(label,input);field=box;
   }
   // Each movable field contains exactly one control and its original label.
   if(field.querySelectorAll('input,select').length!==1)continue;
   if(!field.querySelector('label')&&field.tagName!=='LABEL')continue;
   const parent=field.parentElement;
   if(!groups.has(parent))groups.set(parent,[]);
   groups.get(parent).push(field);
  }
  for(const [parent,fields] of groups){
   const detail=document.createElement('details');detail.className='mf1-parameters';
   const summary=document.createElement('summary');summary.textContent='Geometrija i svojstva';detail.append(summary);
   const body=document.createElement('div');body.className='mf1-parameter-fields';detail.append(body);
   parent.append(detail);for(const field of fields)body.append(field);
  }
 }
 function decorate(){
  document.querySelectorAll(roots).forEach(root=>{
   root.classList.add('mf1-compact');
   // These are existing semantic groups, including the older inline layouts.
   root.querySelectorAll('div,section,aside,header,label').forEach(el=>{
    if(el.closest('svg'))return;
    const names=[...el.classList];
    if(names.some(n=>/^(?:v\d+x?|z\d+|mf1v4)-(?:controls|controlbar|cbar)$/.test(n))||names.some(n=>['controls','v7x','cp-controls'].includes(n)))el.classList.add('mf1-control-row');
    if(names.some(n=>/^(?:v\d+x?|z\d+|mf1v4)-(?:metrics|results|minis|values|cards)$/.test(n))||names.some(n=>['metrics','v7o','cp-result'].includes(n)))el.classList.add('mf1-result-row');
    if(names.some(n=>/^(?:v\d+x?|z\d+|mf1v4)-(?:head|header)$/.test(n))||names.some(n=>['widget-top','cp-head','v7h'].includes(n)))el.classList.add('mf1-compact-head');
    if(names.some(n=>/^(?:v\d+x?|z\d+|mf1v4)-(?:explain|explainer|note|cause|equation|formula)$/.test(n))||names.some(n=>['explain-box','v7e','v7n','cp-note','widget-equation'].includes(n)))el.classList.add('mf1-brief');
    if(el.style.display==='grid'&&[...el.children].filter(c=>c.querySelector('input[type=range]')).length>=2)el.classList.add('mf1-control-row');
    if(el.querySelector(':scope > input[type=range]')&&el.querySelector('label')&&el.querySelectorAll('input,select').length===1)el.classList.add('mf1-field');
   });
  });
  for(const [id,ids] of Object.entries(secondary)){const root=document.getElementById(id);if(root)group(root,ids.map(i=>root.querySelector('#'+i)));}
  for(const [id,keys] of Object.entries(dataSecondary)){const root=document.getElementById(id);if(root)group(root,keys.map(k=>root.querySelector(`[data-k="${k}"], [data-v12r-k="${k}"]`)));}
  // Vector constructions are part of the explanation, always visible at full width.
  const table=document.querySelector('#z6-advanced-widget table');
  if(table){const el=table.parentElement,details=document.createElement('details');details.className='mf1-parameters';details.innerHTML='<summary>Vrijednosti u karakterističnim točkama</summary>';el.before(details);details.append(el);}
  document.querySelectorAll(roots).forEach(root=>{
   arrangeGraphics(root);
   root.querySelectorAll('input[type=range]').forEach(paintRange);
   root.addEventListener('input',event=>{if(event.target.matches('input[type=range]'))root.querySelectorAll('input[type=range]').forEach(paintRange);});
   // Presets and mode switches may replace controls or entire SVGs.
   root.addEventListener('click',()=>requestAnimationFrame(()=>{
    arrangeGraphics(root);root.querySelectorAll('input[type=range]').forEach(paintRange);
   }));
  });
 }
 function paintRange(input){
  const field=input.parentElement;
  if(field.querySelectorAll('input,select').length===1&&(field.tagName==='LABEL'||field.querySelector('label')))field.classList.add('mf1-field');
  const min=Number(input.min||0),max=Number(input.max||100);
  const progress=max>min?Math.max(0,Math.min(100,100*(Number(input.value)-min)/(max-min))):0;
  input.style.setProperty('--mf1-progress',progress+'%');
 }
 function arrangeGraphics(root){
  const graphics=[...root.querySelectorAll('canvas,svg')].filter(el=>
   !el.closest('mjx-container')&&!el.parentElement.closest('svg'));
  for(const graphic of graphics){
   graphic.classList.add('mf1-graphic');
   if(!graphic.hasAttribute('aria-label')){
    const heading=root.querySelector('h3,h4,h5');
    if(heading)graphic.setAttribute('aria-label',heading.textContent.trim());
   }
   if(!graphic.hasAttribute('role'))graphic.setAttribute('role','img');
   // Walk the actual scene ancestry, including older inline flex/grid layouts.
   // Only branches containing a drawing span the full width; controls keep their grids.
   for(let branch=graphic;branch!==root;branch=branch.parentElement){
    branch.classList.add('mf1-visual-branch');
    const parent=branch.parentElement;
    if(parent!==root){
     parent.classList.add('mf1-visual-stack');
     const siblings=[...parent.children].filter(el=>!['STYLE','SCRIPT'].includes(el.tagName));
     if(siblings.some(el=>!el.contains(graphic)&&el.querySelector('input,select'))){
      branch.classList.add('mf1-scene-first');
     }
    }
   }
  }
 }
 document.addEventListener('DOMContentLoaded',decorate,{once:true});
})();
