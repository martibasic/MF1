/* Small controls shared by the existing widgets. No second physics model. */
(() => {
  'use strict';
  let serial=0;
  const format=x=>Number(x).toLocaleString('hr-HR',{maximumFractionDigits:8});
  function dialogShell(title) {
    const dialog=document.createElement('dialog');dialog.className='mf1-dialog';
    const head=document.createElement('header'),heading=document.createElement('h2'),close=document.createElement('button');
    heading.id='mf1-dialog-title-'+(++serial);heading.textContent=title;
    dialog.setAttribute('aria-labelledby',heading.id);close.type='button';close.textContent='Zatvori ×';close.setAttribute('aria-label','Zatvori prikaz');
    close.onclick=()=>dialog.close();head.append(heading,close);dialog.append(head);document.body.append(dialog);
    return dialog;
  }
  function enlarge(root,trigger) {
    if(root.closest('dialog'))return;
    const marker=document.createComment('widget position'),title=root.querySelector('h3,h4,h5')?.textContent||'Fizikalni prikaz';
    // Preserve the owning ID and delegated listeners of shell-based widgets.
    const owner=!root.id&&root.parentElement.id?root.parentElement:root;
    owner.before(marker);const dialog=dialogShell(title);dialog.classList.add('mf1-dialog-scene');dialog.append(owner);root.classList.add('mf1-enlarged');
    trigger.hidden=true;const overflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';
    const resize=()=>window.dispatchEvent(new Event('resize'));
    dialog.addEventListener('close',()=>{
      marker.replaceWith(owner);root.classList.remove('mf1-enlarged');trigger.hidden=false;dialog.remove();
      document.documentElement.style.overflow=overflow;resize();trigger.focus({preventScroll:true});
    },{once:true});
    dialog.showModal();resize();
  }
  function labelText(label) {
    if(!label)return '';
    const copy=label.cloneNode(true);copy.querySelectorAll('.mf1-range-limits,input,select').forEach(n=>n.remove());
    return copy.textContent.trim();
  }
  function edit(input,trigger) {
    const label=input.getAttribute('aria-label')||labelText(input.labels?.[0]||input.parentElement.querySelector('label'))||'Vrijednost parametra';
    const dialog=dialogShell('Precizno zadavanje');dialog.classList.add('mf1-dialog-input');
    const form=document.createElement('form'),field=document.createElement('label'),value=document.createElement('input'),hint=document.createElement('p'),error=document.createElement('p'),submit=document.createElement('button');
    field.textContent=label.trim();value.type='text';value.inputMode='decimal';value.value=Number(input.value).toLocaleString('hr-HR',{useGrouping:false,maximumFractionDigits:10});value.id='mf1-exact-'+(++serial);field.htmlFor=value.id;
    const min=Number(input.min||0),max=Number(input.max||100),step=input.step==='any'?0:Number(input.step||1);
    hint.id=value.id+'-hint';hint.textContent=`Raspon ${format(min)} – ${format(max)}${step?'; korak '+format(step):''}.`;
    value.setAttribute('aria-describedby',hint.id);error.className='mf1-input-error';error.setAttribute('role','alert');
    submit.type='submit';submit.textContent='Primijeni';form.append(field,value,hint,error,submit);dialog.append(form);
    form.onsubmit=event=>{
      event.preventDefault();const raw=value.value.trim().replace(/\s/g,'').replace(',','.');
      const n=raw===''?NaN:Number(raw);
      if(!Number.isFinite(n)||n<min||n>max){error.textContent='Unesi broj unutar navedenog raspona.';value.setAttribute('aria-invalid','true');return;}
      if(step&&Math.abs((n-min)/step-Math.round((n-min)/step))>1e-6){error.textContent='Vrijednost mora slijediti korak '+format(step)+'.';value.setAttribute('aria-invalid','true');return;}
      input.value=String(n);input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));dialog.close();
    };
    dialog.addEventListener('close',()=>{dialog.remove();if(trigger.isConnected)trigger.focus({preventScroll:true});},{once:true});
    dialog.showModal();value.focus();value.select();
  }
  function range(input) {
    if(input.closest('#v13-moody-widget'))return;
    let limits=input.mf1Limits;
    if(!limits){
      limits=document.createElement('span');limits.className='mf1-range-limits';
      // A wrapping label cannot contain a second native labelable control.
      const wrapped=!!input.closest('label'),min=document.createElement('span'),max=document.createElement('span'),editButton=document.createElement(wrapped?'span':'button');
      if(wrapped){editButton.setAttribute('role','button');editButton.tabIndex=0;editButton.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();edit(input,editButton);}};}
      else editButton.type='button';
      editButton.textContent='Upiši vrijednost';editButton.className='mf1-exact-button';
      editButton.onclick=e=>{e.preventDefault();e.stopPropagation();edit(input,editButton);};limits.append(min,editButton,max);input.after(limits);input.mf1Limits=limits;
      input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();edit(input,input);}});
    }
    limits.firstElementChild.textContent=format(input.min||0);limits.lastElementChild.textContent=format(input.max||100);
    const label=input.labels?.[0]||input.parentElement.querySelector('label');
    if(label&&!input.labels?.length){if(!input.id)input.id='mf1-range-'+(++serial);label.htmlFor=input.id;}
    // Dynamic limits and live text remain owned by the original widget.
    input.setAttribute('aria-valuetext',label?labelText(label):format(input.value));
  }
  function comparison(root,bar) {
    // A is an immutable visual measurement. The original widget remains state B.
    const save=document.createElement('button'),show=document.createElement('button'),status=document.createElement('span');
    save.type=show.type='button';save.textContent='Zapamti A';show.textContent='Prikaži A';show.hidden=true;
    show.setAttribute('aria-expanded','false');status.className='mf1-compare-status';status.setAttribute('role','status');
    const menu=document.createElement('details'),summary=document.createElement('summary'),actions=document.createElement('div');
    menu.className='mf1-comparison-menu';summary.textContent='Usporedba A/B';actions.append(status,save,show);menu.append(summary,actions);bar.append(menu);
    let tray=null,baseline=[];
    const visible=el=>{for(let p=el;p&&p!==root;p=p.parentElement){if(p.hidden||getComputedStyle(p).display==='none')return false;}return true;};
    function readings(){return [...root.querySelectorAll('input[type=range],input[type=number],select')].filter(e=>!e.closest('.mf1-compare-tray')).map((input,index)=>({key:input.id||input.dataset.key||input.dataset.k||String(index),label:labelText(input.labels?.[0]||input.parentElement.querySelector('label'))||input.getAttribute('aria-label')||'Parametar '+(index+1),value:input.value,display:input.tagName==='SELECT'?input.selectedOptions[0]?.textContent:format(input.value)}));}
    function update(){if(!tray)return;const current=readings(),body=tray.querySelector('tbody');body.replaceChildren();
      let differences=0;baseline.forEach(a=>{const b=current.find(b=>b.key===a.key);if(!b||b.value===a.value)return;differences++;const row=document.createElement('tr');[a.label,a.display,b.display].forEach(t=>{const td=document.createElement('td');td.textContent=t;row.append(td);});body.append(row);});
      tray.querySelector('table').hidden=!differences;tray.querySelector('.mf1-compare-note').textContent=differences?'Izvorni widget iznad prikazuje stanje B. Tablica navodi promijenjene ulaze.':'Sačuvana slika prikazuje stanje A, uključujući tadašnje mjerilo. Animacija ili promjena načina rada može dati drukčiji prikaz uz iste ulaze.';
    }
    function toggle(open){if(!tray)return;tray.hidden=!open;show.setAttribute('aria-expanded',String(open));show.textContent=open?'Sakrij A':'Prikaži A';if(open)update();}
    save.onclick=()=>{
      const graphics=[...root.querySelectorAll('canvas,svg')].filter(e=>!e.parentElement.closest('svg')&&!e.closest('mjx-container,.mf1-compare-tray')&&visible(e));
      const images=[];graphics.forEach(graphic=>{
        let src;
        if(graphic.tagName.toLowerCase()==='canvas'){try{src=graphic.toDataURL('image/png');}catch{return;}}
        else{
          const copy=graphic.cloneNode(true),original=[graphic,...graphic.querySelectorAll('*')],cloned=[copy,...copy.querySelectorAll('*')];
          cloned.forEach((node,index)=>{const css=getComputedStyle(original[index]);for(const property of ['font-family','font-size','font-weight','fill','stroke','stroke-width','stroke-dasharray','opacity','fill-opacity','text-anchor','paint-order','stroke-linejoin']){const value=css.getPropertyValue(property);if(value)node.style.setProperty(property,value);}});
          copy.setAttribute('xmlns','http://www.w3.org/2000/svg');src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(copy));
        }
        const img=document.createElement('img');img.src=src;img.alt='Stanje A: '+(graphic.getAttribute('aria-label')||'Fizikalni prikaz');images.push(img);
      });
      baseline=readings();if(tray)tray.remove();tray=document.createElement('section');tray.className='mf1-compare-tray';tray.id='mf1-compare-'+(++serial);tray.hidden=true;
      tray.innerHTML='<header><h5>Sačuvano stanje A</h5><button type="button">Ukloni A</button></header><p class="mf1-compare-note"></p><div class="mf1-compare-images"></div><table><caption>Promjene ulaznih parametara</caption><thead><tr><th>Parametar u stanju A</th><th>A</th><th>B sada</th></tr></thead><tbody></tbody></table>';
      tray.querySelector('.mf1-compare-images').append(...images);
      tray.querySelector('button').onclick=()=>{tray.remove();tray=null;baseline=[];show.hidden=true;show.setAttribute('aria-expanded','false');status.textContent='Stanje A uklonjeno.';save.focus();};
      root.append(tray);show.hidden=false;show.setAttribute('aria-controls',tray.id);status.textContent='Stanje A sačuvano.';save.textContent='Ponovno zapamti A';toggle(true);
    };
    show.onclick=()=>toggle(tray?.hidden);root.addEventListener('input',update);root.addEventListener('change',update);
  }
  function decorate(root) {
    root.querySelectorAll('input[type=range]').forEach(range);
    if(!root.mf1Enlarge){
      const bar=document.createElement('div'),button=document.createElement('button');bar.className='mf1-view-tools';
      button.type='button';button.textContent='Uvećaj prikaz ⤢';button.setAttribute('aria-haspopup','dialog');
      button.onclick=()=>enlarge(root,button);bar.append(button);root.prepend(bar);root.mf1Enlarge=button;
      if(!root.matches('#v13-moody-widget'))comparison(root,bar);
    }
  }
  document.addEventListener('DOMContentLoaded',()=>{
    const roots=[...document.querySelectorAll('.mf1-compact')].filter(r=>!r.parentElement.closest('.mf1-compact'));
    roots.forEach(root=>{
      decorate(root);let frame=0;
      const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>decorate(root));};
      root.addEventListener('input',update);root.addEventListener('change',update);root.addEventListener('click',update);
    });
  },{once:true});
})();
