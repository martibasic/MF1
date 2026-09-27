/* Opt-in SVG surface for the existing Canvas2D drawing functions.
 * Numerical models remain owned by their widgets. Native canvas is used only
 * for font measurement; this renderer never paints or exports a bitmap.
 */
(() => {
  'use strict';
  const NS='http://www.w3.org/2000/svg',TAU=2*Math.PI,EPS=1e-10;
  const surfaces=new WeakMap();let serial=0,measurement;
  const identity=()=>[1,0,0,1,0,0];
  const finite=(...a)=>{if(a.some(x=>typeof x!=='number'||!Number.isFinite(x)))throw new TypeError('Vector geometry must contain finite numbers');};
  const number=x=>{finite(x);return Math.abs(x)<1e-10?'0':String(Number(x.toFixed(9)));};
  const matrix=m=>'matrix('+m.map(number).join(' ')+')';
  const point=(m,x,y)=>[m[0]*x+m[2]*y+m[4],m[1]*x+m[3]*y+m[5]];
  const vector=(m,x,y)=>[m[0]*x+m[2]*y,m[1]*x+m[3]*y];
  const multiply=(a,b)=>[a[0]*b[0]+a[2]*b[1],a[1]*b[0]+a[3]*b[1],a[0]*b[2]+a[2]*b[3],a[1]*b[2]+a[3]*b[3],a[0]*b[4]+a[2]*b[5]+a[4],a[1]*b[4]+a[3]*b[5]+a[5]];
  function inverse(m){const d=m[0]*m[3]-m[1]*m[2];if(Math.abs(d)<1e-15)return null;return[m[3]/d,-m[1]/d,-m[2]/d,m[0]/d,(m[2]*m[5]-m[3]*m[4])/d,(m[1]*m[4]-m[0]*m[5])/d];}
  function node(name,attrs={}){const e=document.createElementNS(NS,name);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,String(v));return e;}
  function colour(value){if(typeof value!=='string'||/url\s*\(|[<>]/i.test(value))throw new TypeError('Only solid SVG colours are supported');return value;}
  function defaults(){return{matrix:identity(),clips:[],fillStyle:'#000000',strokeStyle:'#000000',font:'10px sans-serif',textAlign:'start',textBaseline:'alphabetic',direction:'inherit',lineWidth:1,lineCap:'butt',lineJoin:'miter',miterLimit:10,lineDash:[],lineDashOffset:0,globalAlpha:1,shadowBlur:0,shadowColor:'rgba(0,0,0,0)',shadowOffsetX:0,shadowOffsetY:0,imageSmoothingEnabled:true};}
  const copyState=s=>({...s,matrix:s.matrix.slice(),clips:s.clips.slice(),lineDash:s.lineDash.slice()});

  // Paths retain geometry in surface coordinates, so later transforms never
  // move a previously constructed path or clip. Painting may use another CTM.
  function pathData(path,target=identity()){
    const out=[];
    for(const s of path){
      if(s.t==='Z'){out.push('Z');continue;}
      if(s.t==='M'||s.t==='L'){out.push(s.t+point(target,s.x,s.y).map(number).join(' '));continue;}
      const c=point(target,s.cx,s.cy),u=vector(target,s.ux,s.uy),v=vector(target,s.vx,s.vy);
      const xx=u[0]*u[0]+v[0]*v[0],yy=u[1]*u[1]+v[1]*v[1],xy=u[0]*u[1]+v[0]*v[1];
      const disc=Math.hypot(xx-yy,2*xy),rx=Math.sqrt(Math.max(0,(xx+yy+disc)/2)),ry=Math.sqrt(Math.max(0,(xx+yy-disc)/2));
      const rotation=.5*Math.atan2(2*xy,xx-yy)*180/Math.PI,det=u[0]*v[1]-u[1]*v[0];
      const count=Math.max(1,Math.ceil(Math.abs(s.delta)/(Math.PI+EPS)));
      for(let i=1;i<=count;i++){
        const angle=s.start+s.delta*i/count,end=[c[0]+u[0]*Math.cos(angle)+v[0]*Math.sin(angle),c[1]+u[1]*Math.cos(angle)+v[1]*Math.sin(angle)];
        if(rx<EPS||ry<EPS){out.push('L'+end.map(number).join(' '));continue;}
        out.push('A'+[rx,ry,rotation,Math.abs(s.delta/count)>Math.PI?1:0,s.delta*det>=0?1:0,...end].map(number).join(' '));
      }
    }
    return out.join(' ');
  }

  class Gradient {
    constructor(type,args){this.type=type;this.args=args.slice();this.stops=[];}
    addColorStop(offset,value){finite(offset);if(offset<0||offset>1)throw new RangeError('Gradient offset must lie between 0 and 1');this.stops.push({offset,colour:colour(value)});}
  }

  function vectorSurface(original){
    if(surfaces.has(original))return surfaces.get(original);
    if(!original||original.localName!=='canvas')throw new TypeError('vectorSurface expects a canvas element');
    const svg=node('svg'),nativeAttribute=svg.setAttribute.bind(svg),uid='mf1-vector-'+(++serial);
    for(const attribute of original.attributes)nativeAttribute(attribute.name,attribute.value);
    svg.setAttributeNS('http://www.w3.org/2000/xmlns/','xmlns',NS);nativeAttribute('data-mf1-vector','true');
    let width=original.width,height=original.height,state=defaults(),stack=[],path=[],current=null,start=null;
    const defs=node('defs'),scene=node('g',{'data-vector-scene':''});svg.append(defs,scene);
    let cache=new Map(),defSerial=0;
    const nextId=()=>uid+'-'+(++defSerial);
    function reset(){state=defaults();stack=[];path=[];current=null;start=null;defs.replaceChildren();scene.replaceChildren();cache=new Map();}
    function size(key,value){finite(value);if(value<0)throw new RangeError('Surface size cannot be negative');value=Math.floor(value);if(key==='width')width=value;else height=value;nativeAttribute(key,number(value));nativeAttribute('viewBox',`0 0 ${width} ${height}`);reset();}
    Object.defineProperties(svg,{width:{get:()=>width,set:v=>size('width',Number(v)),configurable:true},height:{get:()=>height,set:v=>size('height',Number(v)),configurable:true}});
    svg.setAttribute=function(name,value){if(name==='width'||name==='height')size(name,Number(value));else nativeAttribute(name,value);};
    nativeAttribute('width',String(width));nativeAttribute('height',String(height));nativeAttribute('viewBox',`0 0 ${width} ${height}`);

    function definition(key,build){if(cache.has(key))return cache.get(key);const id=nextId();const e=build(id);defs.append(e);cache.set(key,id);return id;}
    function clipId(clip){const d=pathData(clip.path);return definition('clip:'+clip.rule+':'+d,id=>{const e=node('clipPath',{id,clipPathUnits:'userSpaceOnUse'});e.append(node('path',{d,'clip-rule':clip.rule}));return e;});}
    function append(e){let target=scene;for(const clip of state.clips){const g=node('g',{'clip-path':`url(#${clipId(clip)})`});target.append(g);target=g;}target.append(e);return e;}
    function paint(value,transform=identity()){
      if(!(value instanceof Gradient))return value;
      const key='gradient:'+JSON.stringify([value.type,value.args,value.stops,transform]);
      const id=definition(key,id=>{
        const a=value.args,attrs=value.type==='linear'?{x1:a[0],y1:a[1],x2:a[2],y2:a[3]}:{fx:a[0],fy:a[1],fr:a[2],cx:a[3],cy:a[4],r:a[5]};
        const e=node(value.type==='linear'?'linearGradient':'radialGradient',{id,gradientUnits:'userSpaceOnUse',...attrs,gradientTransform:matrix(transform)});
        for(const stop of value.stops.slice().sort((a,b)=>a.offset-b.offset))e.append(node('stop',{offset:stop.offset,'stop-color':stop.colour}));return e;
      });return`url(#${id})`;
    }
    function shadow(){
      if(!state.shadowBlur&&!state.shadowOffsetX&&!state.shadowOffsetY)return null;
      const args=[state.shadowBlur,state.shadowColor,state.shadowOffsetX,state.shadowOffsetY];
      return definition('shadow:'+JSON.stringify(args),id=>{
        const filter=node('filter',{id,x:'-100%',y:'-100%',width:'300%',height:'300%','color-interpolation-filters':'sRGB'});
        filter.append(node('feGaussianBlur',{in:'SourceAlpha',stdDeviation:state.shadowBlur/2,result:'blur'}),node('feOffset',{in:'blur',dx:state.shadowOffsetX,dy:state.shadowOffsetY,result:'offset'}),node('feFlood',{'flood-color':state.shadowColor,result:'colour'}),node('feComposite',{in:'colour',in2:'offset',operator:'in',result:'shadow'}));
        const merge=node('feMerge');merge.append(node('feMergeNode',{in:'shadow'}),node('feMergeNode',{in:'SourceGraphic'}));filter.append(merge);return filter;
      });
    }
    function styles(e,stroke,gradientTransform=identity()){
      e.setAttribute('fill',stroke?'none':paint(state.fillStyle,gradientTransform));
      e.setAttribute('stroke',stroke?paint(state.strokeStyle,gradientTransform):'none');
      if(stroke){for(const[k,v]of Object.entries({'stroke-width':state.lineWidth,'stroke-linecap':state.lineCap,'stroke-linejoin':state.lineJoin,'stroke-miterlimit':state.miterLimit,'stroke-dashoffset':state.lineDashOffset}))e.setAttribute(k,String(v));if(state.lineDash.length)e.setAttribute('stroke-dasharray',state.lineDash.join(' '));}
      if(state.globalAlpha!==1)e.setAttribute('opacity',String(state.globalAlpha));const filter=shadow();if(filter)e.setAttribute('filter',`url(#${filter})`);return e;
    }
    function renderPath(p,stroke,rule='nonzero'){
      if(!p.length)return;const inv=inverse(state.matrix);if(!inv)return;
      const e=node('path',{d:pathData(p,inv),transform:matrix(state.matrix),'fill-rule':rule});styles(e,stroke);append(e);
    }
    function move(x,y){finite(x,y);const p=point(state.matrix,x,y);path.push({t:'M',x:p[0],y:p[1]});current=p;start=p;}
    function line(x,y){finite(x,y);if(!current){move(x,y);return;}const p=point(state.matrix,x,y);path.push({t:'L',x:p[0],y:p[1]});current=p;}
    function ellipseArc(x,y,rx,ry,rotation,a,b,ccw=false){
      finite(x,y,rx,ry,rotation,a,b);if(rx<0||ry<0)throw new RangeError('Arc radius cannot be negative');
      const c=point(state.matrix,x,y),co=Math.cos(rotation),si=Math.sin(rotation),u=vector(state.matrix,rx*co,rx*si),v=vector(state.matrix,-ry*si,ry*co);
      const first=[c[0]+u[0]*Math.cos(a)+v[0]*Math.sin(a),c[1]+u[1]*Math.cos(a)+v[1]*Math.sin(a)];
      if(!current){path.push({t:'M',x:first[0],y:first[1]});start=first;}else if(Math.hypot(current[0]-first[0],current[1]-first[1])>EPS)path.push({t:'L',x:first[0],y:first[1]});current=first;
      let delta=b-a;
      if(!ccw){if(delta>=TAU)delta=TAU;else delta=((delta%TAU)+TAU)%TAU;}
      else{if(-delta>=TAU)delta=-TAU;else delta=-(((-delta%TAU)+TAU)%TAU);}
      if(Math.abs(delta)<EPS||!rx||!ry)return;
      path.push({t:'A',cx:c[0],cy:c[1],ux:u[0],uy:u[1],vx:v[0],vy:v[1],start:a,delta});const end=a+delta;current=[c[0]+u[0]*Math.cos(end)+v[0]*Math.sin(end),c[1]+u[1]*Math.cos(end)+v[1]*Math.sin(end)];
    }
    function close(){if(current&&start){path.push({t:'Z'});current=start.slice();}}
    function rectangle(x,y,w,h){finite(x,y,w,h);move(x,y);line(x+w,y);line(x+w,y+h);line(x,y+h);close();move(x,y);}
    function temporary(draw,stroke){const oldPath=path,oldCurrent=current,oldStart=start;path=[];current=start=null;try{draw();renderPath(path,stroke);}finally{path=oldPath;current=oldCurrent;start=oldStart;}}
    function fontMetrics(text){
      if(!measurement){const canvas=document.createElement('canvas');measurement=canvas.getContext('2d');if(!measurement)throw new Error('Native font measurement is unavailable');}
      measurement.font=state.font;return measurement.measureText(String(text));
    }
    function text(text,x,y,maxWidth,stroke){
      finite(x,y);if(maxWidth!==undefined){finite(maxWidth);if(maxWidth<=0)return;}
      text=String(text);let transform=state.matrix.slice();
      if(maxWidth!==undefined){const natural=fontMetrics(text).width;if(natural>maxWidth){const scale=maxWidth/natural;transform=multiply(transform,[scale,0,0,1,x*(1-scale),0]);}}
      const align=state.textAlign,anchor=align==='center'?'middle':align==='right'||align==='end'?'end':'start';
      const baseline={top:'text-before-edge',hanging:'hanging',middle:'central',alphabetic:'alphabetic',ideographic:'ideographic',bottom:'text-after-edge'}[state.textBaseline]||'alphabetic';
      const e=node('text',{x:number(x),y:number(y),transform:matrix(transform),'text-anchor':anchor,'dominant-baseline':baseline,'xml:space':'preserve'});e.style.font=state.font;e.textContent=text;styles(e,stroke);append(e);
    }

    const ctx={
      canvas:svg,
      beginPath(){path=[];current=start=null;},closePath:close,moveTo:move,lineTo:line,rect:rectangle,
      arc(x,y,r,a,b,ccw=false){ellipseArc(x,y,r,r,0,a,b,Boolean(ccw));},
      arcTo(x1,y1,x2,y2,r){
        finite(x1,y1,x2,y2,r);if(r<0)throw new RangeError('Arc radius cannot be negative');if(!current){move(x1,y1);return;}
        const inv=inverse(state.matrix);if(!inv){line(x1,y1);return;}const p=point(inv,...current),a=[p[0]-x1,p[1]-y1],b=[x2-x1,y2-y1],la=Math.hypot(...a),lb=Math.hypot(...b);
        if(la<EPS||lb<EPS||r===0){line(x1,y1);return;}const u=a.map(v=>v/la),v=b.map(v=>v/lb),dot=Math.max(-1,Math.min(1,u[0]*v[0]+u[1]*v[1])),cross=u[0]*v[1]-u[1]*v[0];
        if(Math.abs(cross)<EPS){line(x1,y1);return;}const half=Math.acos(dot)/2,d=r/Math.tan(half),bis=[u[0]+v[0],u[1]+v[1]],length=Math.hypot(...bis),cx=x1+bis[0]/length*r/Math.sin(half),cy=y1+bis[1]/length*r/Math.sin(half);
        const t1=[x1+u[0]*d,y1+u[1]*d],t2=[x1+v[0]*d,y1+v[1]*d];line(...t1);ellipseArc(cx,cy,r,r,0,Math.atan2(t1[1]-cy,t1[0]-cx),Math.atan2(t2[1]-cy,t2[0]-cx),cross>0);
      },
      roundRect(x,y,w,h,radii=0){
        finite(x,y,w,h);let rs=Array.isArray(radii)?radii.slice():[radii];if(!rs.length||rs.length>4)throw new RangeError('roundRect needs one to four radii');
        rs=rs.map(r=>{const a=typeof r==='number'?[r,r]:[r.x,r.y];finite(...a);if(a.some(v=>v<0))throw new RangeError('Corner radius cannot be negative');return a;});
        if(rs.length===1)rs=[rs[0],rs[0],rs[0],rs[0]];else if(rs.length===2)rs=[rs[0],rs[1],rs[0],rs[1]];else if(rs.length===3)rs=[rs[0],rs[1],rs[2],rs[1]];
        const origin=[x,y],previous=state.matrix;
        // Reflect the construction coordinates, rather than merely swapping
        // corner radii: a single negative dimension also reverses winding.
        state.matrix=multiply(previous,[w<0?-1:1,0,0,h<0?-1:1,x,y]);x=0;y=0;w=Math.abs(w);h=Math.abs(h);
        const factor=Math.min(1,w/(rs[0][0]+rs[1][0]||1),w/(rs[3][0]+rs[2][0]||1),h/(rs[0][1]+rs[3][1]||1),h/(rs[1][1]+rs[2][1]||1));rs=rs.map(r=>r.map(v=>v*factor));const[tl,tr,br,bl]=rs;
        try{move(x+tl[0],y);line(x+w-tr[0],y);ellipseArc(x+w-tr[0],y+tr[1],...tr,0,-Math.PI/2,0);line(x+w,y+h-br[1]);ellipseArc(x+w-br[0],y+h-br[1],...br,0,0,Math.PI/2);line(x+bl[0],y+h);ellipseArc(x+bl[0],y+h-bl[1],...bl,0,Math.PI/2,Math.PI);line(x,y+tl[1]);ellipseArc(x+tl[0],y+tl[1],...tl,0,Math.PI,3*Math.PI/2);close();}finally{state.matrix=previous;}move(...origin);
      },
      fill(rule='nonzero'){if(!['nonzero','evenodd'].includes(rule))throw new TypeError('Unsupported fill rule');renderPath(path,false,rule);},
      stroke(){renderPath(path,true);},
      fillRect(x,y,w,h){temporary(()=>rectangle(x,y,w,h),false);},
      strokeRect(x,y,w,h){temporary(()=>rectangle(x,y,w,h),true);},
      clearRect(x,y,w,h){
        finite(x,y,w,h);if(w===0||h===0)return;const points=[[x,y],[x+w,y],[x+w,y+h],[x,y+h]].map(p=>point(state.matrix,...p));
        const axisAligned=Math.abs(points[0][1]-points[1][1])<EPS&&Math.abs(points[1][0]-points[2][0])<EPS;
        if(!state.clips.length&&axisAligned&&Math.min(...points.map(p=>p[0]))<=0&&Math.max(...points.map(p=>p[0]))>=width&&Math.min(...points.map(p=>p[1]))<=0&&Math.max(...points.map(p=>p[1]))>=height){scene.replaceChildren();defs.replaceChildren();cache=new Map();return;}
        if(!scene.childNodes.length)return;
        const id=nextId(),mask=node('mask',{id,maskUnits:'userSpaceOnUse',x:0,y:0,width,height,'mask-type':'luminance'});mask.append(node('rect',{x:0,y:0,width,height,fill:'#fff'}));
        let cut=mask;for(const clip of state.clips){const g=node('g',{'clip-path':`url(#${clipId(clip)})`});cut.append(g);cut=g;}
        cut.append(node('path',{d:'M'+points.map(p=>p.map(number).join(' ')).join(' L')+' Z',fill:'#000'}));defs.append(mask);const group=node('g',{mask:`url(#${id})`});group.append(...scene.childNodes);scene.append(group);
      },
      clip(rule='nonzero'){if(!['nonzero','evenodd'].includes(rule))throw new TypeError('Unsupported clip rule');state.clips.push({path:path.slice(),rule});},
      save(){stack.push(copyState(state));},restore(){if(stack.length)state=stack.pop();},
      setTransform(a,b,c,d,e,f){if(typeof a==='object'){({a=1,b=0,c=0,d=1,e=0,f=0}=a);}finite(a,b,c,d,e,f);state.matrix=[a,b,c,d,e,f];},
      translate(x,y){finite(x,y);state.matrix=multiply(state.matrix,[1,0,0,1,x,y]);},
      rotate(angle){finite(angle);const c=Math.cos(angle),s=Math.sin(angle);state.matrix=multiply(state.matrix,[c,s,-s,c,0,0]);},
      setLineDash(value){if(!Array.isArray(value))throw new TypeError('Line dash must be an array');finite(...value);if(value.some(v=>v<0))throw new RangeError('Line dash cannot be negative');state.lineDash=value.length%2?value.concat(value):value.slice();},
      getLineDash(){return state.lineDash.slice();},
      createLinearGradient(...args){if(args.length!==4)throw new TypeError('Linear gradient needs four coordinates');finite(...args);return new Gradient('linear',args);},
      createRadialGradient(...args){if(args.length!==6)throw new TypeError('Radial gradient needs six coordinates');finite(...args);if(args[2]<0||args[5]<0)throw new RangeError('Gradient radius cannot be negative');return new Gradient('radial',args);},
      fillText(value,x,y,maxWidth){text(value,x,y,maxWidth,false);},strokeText(value,x,y,maxWidth){text(value,x,y,maxWidth,true);},measureText:fontMetrics
    };
    const initial=defaults();
    for(const key of Object.keys(initial).filter(k=>!['matrix','clips','lineDash'].includes(k))){
      Object.defineProperty(ctx,key,{enumerable:true,get:()=>state[key],set:value=>{
        if(key==='fillStyle'||key==='strokeStyle'){if(!(value instanceof Gradient))colour(value);}
        else if(typeof initial[key]==='number'){finite(value);if(['lineWidth','miterLimit'].includes(key)&&value<=0)return;if(['shadowBlur','globalAlpha'].includes(key)&&value<0)return;if(key==='globalAlpha'&&value>1)return;}
        else if(key==='font'){if(typeof value!=='string')throw new TypeError('Font must be a CSS font string');}
        else if(key==='shadowColor')colour(value);
        else if(key==='textAlign'&&!['left','right','center','start','end'].includes(value))return;
        else if(key==='textBaseline'&&!['top','hanging','middle','alphabetic','ideographic','bottom'].includes(value))return;
        else if(key==='lineCap'&&!['butt','round','square'].includes(value))return;
        else if(key==='lineJoin'&&!['round','bevel','miter'].includes(value))return;
        state[key]=value;
      }});
    }
    // Canvas ignores non-finite coordinates. Keep the old path intact and
    // prevent invalid values from reaching the SVG instead of inventing zeros.
    for(const[method,count]of Object.entries({moveTo:2,lineTo:2,rect:4,arc:5,arcTo:5,roundRect:4,fillRect:4,strokeRect:4,clearRect:4,translate:2,rotate:1})){
      const draw=ctx[method];ctx[method]=function(...args){if(args.slice(0,count).some(v=>typeof v!=='number'||!Number.isFinite(v)))return;return draw(...args);};
    }
    for(const method of ['drawImage','getImageData','putImageData','createImageData','createPattern','isPointInPath','isPointInStroke'])ctx[method]=()=>{throw new Error(method+' is not supported by the vector surface; raster fallback is forbidden');};
    svg.getContext=kind=>kind==='2d'?ctx:null;
    surfaces.set(original,svg);surfaces.set(svg,svg);original.replaceWith(svg);return svg;
  }
  window.MF1=window.MF1||{};window.MF1.vectorSurface=vectorSurface;
})();
