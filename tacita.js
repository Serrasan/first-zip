/* First Sip · el logo original cobra vida (marioneta con las piezas del propio dibujo) */
(function(){
'use strict';
var host=document.querySelector('.logowrap'); if(!host||host.getAttribute('data-tz')) return; host.setAttribute('data-tz','1');
var img=host.querySelector('img'); if(!img) return;
var REDUCE=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var DEBUG=/tzpose=([a-z0-9.]+)/.exec(location.search); DEBUG=DEBUG&&DEBUG[1];
if(REDUCE&&!DEBUG) return;
var NS='http://www.w3.org/2000/svg', INK='#2e426f', WHITE='#fff';
var BG=(function(){ var n=host; while(n&&n!==document.documentElement){ var c=getComputedStyle(n).backgroundColor; if(c&&c!=='transparent'&&!/rgba\(.*,\s*0\)$/.test(c)) return c; n=n.parentElement; } return '#ebead8'; })();

/* ---------- utilidades ---------- */
function clamp(x,a,b){a=a===undefined?0:a;b=b===undefined?1:b;return x<a?a:x>b?b:x;}
function lerp(a,b,u){return a+(b-a)*u;}
function ss(a,b,x){var u=clamp((x-a)/(b-a));return u*u*(3-2*u);}
function bump(t,a,b,c,d){return ss(a,b,t)*(1-ss(c,d,t));}
function easeOut(u){u=clamp(u);return 1-Math.pow(1-u,3);}
function r1(x){return Math.round(x*10)/10;}
function G(p){return [p[0]*2,p[1]*2];}                      // coordenadas medidas (mitad) -> SVG
function poly(pts){return 'M'+pts.map(function(q){return q[0]*2+','+q[1]*2;}).join(' L')+'Z';}
function rotp(p,deg){var a=deg*Math.PI/180,c=Math.cos(a),s=Math.sin(a);return [p[0]*c-p[1]*s,p[0]*s+p[1]*c];}
// transformación rígida: rotar 'deg' alrededor de 'piv' y luego trasladar (dx,dy)
function rig(piv,deg,dx,dy,sx,sy){ sx=sx||1; sy=sy||1; return {piv:piv,deg:deg,dx:dx,dy:dy,sx:sx,sy:sy}; }
function apply(T,p){ var q=[(p[0]-T.piv[0])*T.sx,(p[1]-T.piv[1])*T.sy]; q=rotp(q,T.deg); return [q[0]+T.piv[0]+T.dx,q[1]+T.piv[1]+T.dy]; }
function tstr(T){ return 'translate('+r1(T.dx)+' '+r1(T.dy)+') rotate('+r1(T.deg)+' '+T.piv[0]+' '+T.piv[1]+') translate('+T.piv[0]+' '+T.piv[1]+') scale('+T.sx.toFixed(3)+' '+T.sy.toFixed(3)+') translate('+(-T.piv[0])+' '+(-T.piv[1])+')'; }
function compose(A,p){ return apply(A,p); }
function taper(p0,c1,c2,p3,w0,w1){
  var N=18,L=[],R=[];
  for(var i=0;i<=N;i++){
    var t=i/N,u=1-t;
    var x=u*u*u*p0[0]+3*u*u*t*c1[0]+3*u*t*t*c2[0]+t*t*t*p3[0], y=u*u*u*p0[1]+3*u*u*t*c1[1]+3*u*t*t*c2[1]+t*t*t*p3[1];
    var dx=3*u*u*(c1[0]-p0[0])+6*u*t*(c2[0]-c1[0])+3*t*t*(p3[0]-c2[0]), dy=3*u*u*(c1[1]-p0[1])+6*u*t*(c2[1]-c1[1])+3*t*t*(p3[1]-c2[1]);
    var l=Math.hypot(dx,dy)||1, w=lerp(w0,w1,t)/2;
    L.push(r1(x-dy/l*w)+','+r1(y+dx/l*w)); R.push(r1(x+dy/l*w)+','+r1(y-dx/l*w));
  }
  return 'M'+L.join(' L')+' A'+r1(w1/2)+','+r1(w1/2)+' 0 0 0 '+R[N]+' L'+R.slice(0,N).reverse().join(' L')+' A'+r1(w0/2)+','+r1(w0/2)+' 0 0 0 '+L[0]+'Z';
}

/* ---------- piezas medidas sobre el logo original ---------- */
var PIECES={
 fistR:[[598,300],[636,258],[738,255],[764,318],[764,446],[700,450],[646,442],[612,432],[596,404],[588,340]],
 fistL:[[140,492],[196,468],[304,486],[330,560],[306,630],[150,632],[128,560]],
 shoeF:[[498,598],[556,518],[640,496],[770,512],[752,700],[706,758],[560,762],[496,700]],
 shoeB:[[198,628],[364,626],[370,764],[196,764]],
 sparkR:[[730,180],[790,180],[790,250],[730,250]],
 sparkL:[[28,618],[118,618],[118,708],[28,708]],
 lines:[[352,690],[398,690],[398,742],[352,742]],
 shadow:[[80,738],[800,738],[800,775],[80,775]]
};
var HOLES={
 armR:[[540,178],[600,150],[712,150],[742,258],[636,262],[596,300],[570,250],[548,236]],
 armL:[[24,560],[60,470],[176,382],[222,400],[222,448],[140,492],[128,562],[150,604],[70,612]],
 legs:[[405,470],[452,428],[528,428],[528,520],[612,588],[604,612],[556,614],[470,562],[432,562],[362,614],[298,616],[310,590],[350,574],[398,540],[408,500]]
};
// interior de los ojos (para el párpado) y su banda de párpado original
var EYE={
 L:{inner:[[296.2,264.6],[303.3,249.8],[326.3,236.8],[349.2,240.9],[368.9,255.9],[383.4,274.0],[387.1,299.2],[382.1,324.9],[365.6,337.6],[344.6,343.0],[321.8,339.4],[303.7,326.6],[293.8,304.7]], a:[280,318], b:[382,258], down:66, cl:[[300,328],[342,358],[386,314]]},
 R:{inner:[[425.0,232.5],[431.9,203.2],[448.2,186.5],[470.3,181.0],[490.4,186.7],[506.3,207.4],[517.0,232.6],[518.5,259.8],[508.8,279.2],[490.4,289.2],[468.5,289.0],[447.6,279.7],[432.3,261.5]], a:[414,240], b:[530,226], down:60, cl:[[430,270],[472,298],[516,266]]}
};
var MOUTH={patch:[[370,358],[378,390],[400,388],[472,360],[492,342],[486,322],[440,338],[400,352]], c:[434,356], ang:-20};
// articulaciones (reposo = dibujo original)
var J={
 hip:[460,480],
 shR:[551.2,200.7], armR:{c1:[632.4,181.6],c2:[685.6,171.6],p3:[688.1,244.9],w0:42.3,w1:41.9}, fistR:[690,282],
 shL:[197.4,414.3], armL:{c1:[124.5,478.3],c2:[29.4,572.3],p3:[120.6,572.5],w0:43.2,w1:40.3}, fistL:[160,570],
 hipB:[426.8,501.3], legB:{c1:[473.8,534.6],c2:[424.3,562.8],p3:[347.5,592.7],w0:46.8,w1:33.5}, shoeB:[310,630],
 hipF:[494.9,467.3], legF:{c1:[500.6,541.5],c2:[463.9,559.1],p3:[563.4,601.8],w0:43.5,w1:19.7}, shoeF:[575,600],
 nose:[436,312]
};

/* ---------- montar el SVG a partir del propio logo ---------- */
fetch(img.currentSrc||img.src).then(function(r){return r.text();}).then(function(txt){
  var m=/<svg[^>]*>([\s\S]*)<\/svg>\s*$/.exec(txt); if(!m) return;
  build(m[1]);
}).catch(function(){});


// ojos abiertos de golpe (subidón): tapan los originales y dibujan ojos redondos en su estilo
function wideEyes(){
  var s='';
  [[338,292,58,64,-20,350,302,27],[472,232,52,64,4,484,242,29]].forEach(function(e){
    s+='<ellipse cx="'+e[0]*2+'" cy="'+e[1]*2+'" rx="'+(e[2]+10)*2+'" ry="'+(e[3]+10)*2+'" transform="rotate('+e[4]+' '+e[0]*2+' '+e[1]*2+')" fill="'+BG+'"/>';
    s+='<g class="tzwe" data-c="'+e[0]*2+','+e[1]*2+'"><ellipse cx="'+e[0]*2+'" cy="'+e[1]*2+'" rx="'+e[2]*2+'" ry="'+e[3]*2+'" transform="rotate('+e[4]+' '+e[0]*2+' '+e[1]*2+')" fill="'+WHITE+'" stroke="'+INK+'" stroke-width="18"/>';
    s+='<circle cx="'+e[5]*2+'" cy="'+e[6]*2+'" r="'+e[7]*2+'" fill="'+INK+'"/><circle cx="'+(e[5]*2+18)+'" cy="'+(e[6]*2-18)+'" r="12" fill="'+WHITE+'"/><circle cx="'+(e[5]*2-14)+'" cy="'+(e[6]*2+16)+'" r="5" fill="'+WHITE+'"/></g>';
  });
  return s;
}
// bocanada de vaho al decir "¡ahh!"
function puffs(){ var s=''; for(var i=0;i<4;i++) s+='<circle id="tz-pf'+i+'" r="0" fill="#fff" stroke="'+INK+'" stroke-width="8"/>'; return s; }
// rayos de energía
function bolts(){ var s='', B='M0,-80 L26,-14 L6,-12 L30,70 L-20,-2 L2,-4 L-18,-80Z';
  for(var i=0;i<4;i++) s+='<path id="tz-bo'+i+'" d="'+B+'" fill="'+WHITE+'" stroke="'+INK+'" stroke-width="10" stroke-linejoin="round" opacity="0"/>'; return s; }
// gotas de sudor que salen volando al correr
function flyDrops(){ var s='', D='M0,-26 C-12,-8 -14,4 -8,12 C-2,18 10,18 14,10 C18,0 10,-12 0,-26Z';
  for(var i=0;i<4;i++) s+='<path id="tz-fd'+i+'" d="'+D+'" fill="#fff" stroke="'+INK+'" stroke-width="7" opacity="0"/>'; return s; }
function build(ART){
var svg=document.createElementNS(NS,'svg');
svg.setAttribute('viewBox','0 0 1740 1620'); svg.setAttribute('class','tacita'); svg.setAttribute('role','img');
svg.setAttribute('aria-label',img.getAttribute('alt')||'First Sip');
var d='<defs><g id="tzA">'+ART+'</g>';
for(var k in PIECES) d+='<clipPath id="tzc-'+k+'"><path d="'+poly(PIECES[k])+'"/></clipPath>';
d+='<mask id="tzm" maskUnits="userSpaceOnUse" x="-200" y="-200" width="2140" height="2020"><rect x="-200" y="-200" width="2140" height="2020" fill="#fff"/>';
for(k in PIECES) d+='<path d="'+poly(PIECES[k])+'" fill="#000"/>';
for(k in HOLES) d+='<path d="'+poly(HOLES[k])+'" fill="#000"/>';
d+='</mask>';
d+='<clipPath id="tzc-eL"><path d="'+poly(EYE.L.inner)+'"/></clipPath><clipPath id="tzc-eR"><path d="'+poly(EYE.R.inner)+'"/></clipPath></defs>';
var BACK={fistR:'<ellipse cx="1362" cy="746" rx="132" ry="118"/><rect x="1296" y="530" width="168" height="90" rx="30"/>',
          fistL:'<ellipse cx="452" cy="1106" rx="138" ry="120"/>'};
function pc(k,id){ var bk=BACK[k]?'<g fill="'+BG+'">'+BACK[k]+'</g>':''; return '<g id="tz-'+(id||k)+'">'+bk+'<use href="#tzA" clip-path="url(#tzc-'+k+')"/></g>'; }
var star='M0,-24 Q4,-4 24,0 Q4,4 0,24 Q-4,4 -24,0 Q-4,-4 0,-24Z', fx='';
for(var i=0;i<3;i++) fx+='<g id="tz-z'+i+'" opacity="0"><path d="M-14,-16 H14 L-14,16 H14" fill="none" stroke="'+INK+'" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></g>';
for(i=0;i<4;i++) fx+='<path id="tz-s'+i+'" d="'+star+'" fill="'+INK+'" opacity="0"/>';
var esp='<g id="tz-esp" opacity="0"><path d="M-6,-14 C14,-16 16,12 -6,10" fill="none" stroke="'+INK+'" stroke-width="12" stroke-linecap="round"/><path d="M-6,-14 C14,-16 16,12 -6,10" fill="none" stroke="'+WHITE+'" stroke-width="4" stroke-linecap="round"/>'+
  '<path d="M-58,-26 L-4,-26 L-10,20 Q-11,28 -19,28 L-43,28 Q-51,28 -52,20 Z" fill="'+WHITE+'" stroke="'+INK+'" stroke-width="9" stroke-linejoin="round"/><ellipse cx="-31" cy="-26" rx="27" ry="7" fill="'+WHITE+'" stroke="'+INK+'" stroke-width="8"/><ellipse id="tz-espc" cx="-31" cy="-25" rx="20" ry="4" fill="'+INK+'"/><path id="tz-st0" fill="none" stroke="'+INK+'" stroke-width="5" stroke-linecap="round"/><path id="tz-st1" fill="none" stroke="'+INK+'" stroke-width="5" stroke-linecap="round"/><path id="tz-st2" fill="none" stroke="'+INK+'" stroke-width="5" stroke-linecap="round"/></g>';
var lid=function(s){ return '<g clip-path="url(#tzc-e'+s+')"><path id="tz-lid'+s+'f" fill="'+BG+'"/><path id="tz-lid'+s+'e" fill="none" stroke="'+INK+'" stroke-width="20" stroke-linecap="round"/></g><path id="tz-lash'+s+'" fill="none" stroke="'+INK+'" stroke-width="9" stroke-linecap="round" opacity="0"/>'; };
svg.innerHTML=d+
 '<g id="tz-root">'+pc('shadow')+pc('sparkL')+pc('sparkR')+pc('lines')+
 '<path id="tz-legB" fill="'+INK+'"/>'+pc('shoeB')+'<path id="tz-legF" fill="'+INK+'"/>'+
 '<g id="tz-body"><path id="tz-crotch" fill="'+INK+'" d="'+poly([[444,555.5],[511.4,411.8],[509,592]])+'"/><use href="#tzA" mask="url(#tzm)"/>'+lid('L')+lid('R')+
   '<g id="tz-mouthg" opacity="0"><path d="'+poly(MOUTH.patch)+'" fill="'+BG+'"/><path id="tz-mouth" fill="'+INK+'" stroke="'+INK+'" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/><ellipse id="tz-tongue" rx="10" ry="7" fill="'+WHITE+'" opacity="0"/></g>'+
   '<g id="tz-wide" opacity="0">'+wideEyes()+'</g><g id="tz-puffs">'+puffs()+'</g>'+
   '<g id="tz-bubg" opacity="0"><circle id="tz-bub" fill="'+WHITE+'" fill-opacity=".55" stroke="'+INK+'" stroke-width="7"/><circle id="tz-bubh" r="5" fill="'+WHITE+'"/></g>'+
   '<path id="tz-drop" d="M0,-26 C-12,-8 -14,4 -8,12 C-2,18 10,18 14,10 C18,0 10,-12 0,-26Z" fill="none" stroke="'+INK+'" stroke-width="7" opacity="0"/>'+
 '</g>'+
 pc('shoeF')+'<path id="tz-armL" fill="'+INK+'"/>'+pc('fistL')+
 '<path id="tz-armR" fill="'+INK+'"/><path id="tz-armRh" fill="none" stroke="'+WHITE+'" stroke-width="9" stroke-linecap="round"/>'+esp+pc('fistR')+
 '</g><g id="tz-fx">'+fx+bolts()+flyDrops()+'</g>';
svg.style.cssText='position:absolute;left:0;top:0;width:100%;height:auto;opacity:0;pointer-events:none';
host.appendChild(svg);
var E={}; svg.querySelectorAll('[id^="tz-"]').forEach(function(n){E[n.id.slice(3)]=n;});
function A(el,k,v){el.setAttribute(k,v);} function T(el,s){el.setAttribute('transform',s);}

/* ---------- pose ---------- */
var REST={by:0,bx:0,rot:0,sx:1,sy:1, lidL:0,lidR:0,happy:0, mouth:0,mw:16,mo:.3,mc:-.6, bub:0, drop:0,
  fR:{deg:0,dx:0,dy:0}, fL:{deg:0,dx:0,dy:0}, sF:{deg:0,dx:0,dy:0}, sB:{deg:0,dx:0,dy:0},
  dropY:0,landX:1,landY:1, spark:0, z:0, twinkle:0, lines:1, esp:0, espLvl:1};
function P(){ return JSON.parse(JSON.stringify(REST)); }
function mix(a,b,w){ if(typeof a==='number') return lerp(a,b,w); var o={}; for(var k in a) o[k]=mix(a[k],b[k],w); return o; }

/* ---------- dibujar ---------- */
function draw(p,now){
  var pop=(p.pop===undefined?1:p.pop);
  T(E.root,'translate(880 860) scale('+Math.max(.001,pop).toFixed(3)+') rotate('+r1(p.spin||0)+') translate(-880 -860) translate(0 '+r1(p.dropY)+') translate(900 1500) scale('+p.landX.toFixed(3)+' '+p.landY.toFixed(3)+') translate(-900 -1500)');
  var sh=1-Math.min(.6,-p.dropY/500); T(E.shadow,'translate(880 1504) scale('+sh.toFixed(3)+' 1) translate(-880 -1504)');
  // cuerpo
  var hip=G(J.hip), B=rig(hip,p.rot,p.bx,p.by,p.sx,p.sy); T(E.body,tstr(B));
  // destellos que titilan
  var tw=p.twinkle, s1=1+.35*Math.sin(now*3.1)*tw, s2=1+.35*Math.sin(now*2.3+1.7)*tw;
  T(E.sparkR,'translate(1520 426) scale('+s1.toFixed(3)+') rotate('+r1(25*Math.sin(now*1.3)*tw)+') translate(-1520 -426)');
  T(E.sparkL,'translate(146 1324) scale('+s2.toFixed(3)+') rotate('+r1(-25*Math.sin(now*1.1)*tw)+') translate(-146 -1324)');
  A(E.lines,'opacity',p.lines.toFixed(2));
  // manos y pies (piezas rígidas del original)
  var FR=rig(G(J.fistR),p.fR.deg,p.fR.dx,p.fR.dy), FL=rig(G(J.fistL),p.fL.deg,p.fL.dx,p.fL.dy),
      SF=rig(G(J.shoeF),p.sF.deg,p.sF.dx,p.sF.dy), SB=rig(G(J.shoeB),p.sB.deg,p.sB.dx,p.sB.dy);
  T(E.fistR,tstr(FR)); T(E.fistL,tstr(FL)); T(E.shoeF,tstr(SF)); T(E.shoeB,tstr(SB));
  // mangueras: el arranque se mueve con el cuerpo y el final con la mano/pie
  function limb(el,sh,L,piv,TT){ var a=apply(B,G(sh)), c1=apply(B,G(L.c1)), c2=apply(TT,G(L.c2)), e=apply(TT,G(L.p3)); A(el,'d',taper(a,c1,c2,e,L.w0*2,L.w1*2)); return [a,c1,c2,e]; }
  var ar=limb(E.armR,J.shR,J.armR,J.fistR,FR); limb(E.armL,J.shL,J.armL,J.fistL,FL);
  limb(E.legB,J.hipB,J.legB,J.shoeB,SB); limb(E.legF,J.hipF,J.legF,J.shoeF,SF);
  // brillo del brazo derecho (a lo largo del primer tramo)
  var h0=apply(B,G([566,192])), h1=apply(B,G([598,176])), h2=apply(FR,G([626,177]));
  A(E.armRh,'d','M'+r1(h0[0])+','+r1(h0[1])+' Q'+r1(h1[0])+','+r1(h1[1])+' '+r1(h2[0])+','+r1(h2[1]));
  A(E.armRh,'opacity',clamp(1-(Math.abs(p.fR.dx)+Math.abs(p.fR.dy))/60).toFixed(2));
  // párpados: bajan desde la banda original
  ['L','R'].forEach(function(s){
    var e=EYE[s], v=s==='L'?p.lidL:p.lidR, dy=e.down*clamp(v)*2, a=G(e.a), b=G(e.b);
    var cur=p.happy*(-30)+(1-p.happy)*10;   // curvatura del borde: hacia arriba = ojos felices
    A(E['lid'+s+'f'],'d','M'+(a[0]-40)+','+(a[1]-400)+' L'+(b[0]+40)+','+(b[1]-400)+' L'+(b[0]+40)+','+r1(b[1]+dy)+' Q'+r1((a[0]+b[0])/2)+','+r1((a[1]+b[1])/2+dy+cur)+' '+(a[0]-40)+','+r1(a[1]+dy)+'Z');
    A(E['lid'+s+'e'],'d','M'+(a[0]-40)+','+r1(a[1]+dy)+' Q'+r1((a[0]+b[0])/2)+','+r1((a[1]+b[1])/2+dy+cur)+' '+(b[0]+40)+','+r1(b[1]+dy));
    A(E['lid'+s+'e'],'opacity',v>.04?1:0); A(E['lid'+s+'f'],'opacity',v>.04?1:0);
    // ojo cerrado: arco grueso con pestañas (como en los dibujos animados)
    if(v>.85&&p.happy<.5){ var c=e.cl.map(G), q='M'+c[0][0]+','+c[0][1]+' Q'+c[1][0]+','+c[1][1]+' '+c[2][0]+','+c[2][1];
      [.25,.5,.75].forEach(function(t){ var u=1-t, x=u*u*c[0][0]+2*u*t*c[1][0]+t*t*c[2][0], y=u*u*c[0][1]+2*u*t*c[1][1]+t*t*c[2][1];
        var tx=2*u*(c[1][0]-c[0][0])+2*t*(c[2][0]-c[1][0]), ty=2*u*(c[1][1]-c[0][1])+2*t*(c[2][1]-c[1][1]), l=Math.hypot(tx,ty);
        q+=' M'+r1(x+(-ty/l)*6)+','+r1(y+(tx/l)*6)+' l'+r1((-ty/l)*20+(tx/l)*(t-.5)*24)+','+r1((tx/l)*20+(ty/l)*(t-.5)*24); });
      A(E['lash'+s],'d',q); A(E['lash'+s],'opacity',clamp((v-.85)*8).toFixed(2)); A(E['lash'+s],'stroke-width',16); A(E['lid'+s+'e'],'opacity',0); }
    else A(E['lash'+s],'opacity',0);
  });
  // boca (solo cuando cambia de gesto)
  A(E.mouthg,'opacity',p.mouth>.5?1:0);
  if(p.mouth>.5){
    var c=G(MOUTH.c), mw=p.mw*2, mo=p.mo, mc=p.mc, c0=0, cyc=c0-12*mc, up=c0+14*mc-18*mo, lo=c0+14*mc+48*mo;
    A(E.mouth,'d','M'+r1(-mw)+','+r1(cyc)+' Q0,'+r1(up)+' '+r1(mw)+','+r1(cyc)+' Q0,'+r1(lo)+' '+r1(-mw)+','+r1(cyc)+'Z');
    T(E.mouth,'translate('+c[0]+' '+c[1]+') rotate('+MOUTH.ang+')'); A(E.mouth,'fill-opacity',clamp(mo*8).toFixed(2));
    T(E.tongue,'translate('+c[0]+' '+c[1]+') rotate('+MOUTH.ang+') translate(0 '+r1(c0+14*mc+30*mo)+')'); A(E.tongue,'opacity',clamp((mo-.45)*3).toFixed(2)); A(E.tongue,'rx',r1(mw*.42));
  }
  // pompa de la nariz al dormir
  if(p.bub>.04){ var n=G(J.nose); A(E.bubg,'opacity',1); A(E.bub,'cx',r1(n[0]-10-14*p.bub)); A(E.bub,'cy',r1(n[1]+10+8*p.bub)); A(E.bub,'r',r1(8+26*p.bub)); A(E.bubh,'cx',r1(n[0]-16-10*p.bub)); A(E.bubh,'cy',r1(n[1]+2)); }
  else A(E.bubg,'opacity',0);
  // gota de sudor que cae
  if(p.drop>0&&p.drop<1){ var k=p.drop; T(E.drop,'translate('+r1(960+20*k)+' '+r1(250+240*k*k)+')'); A(E.drop,'opacity',(Math.sin(Math.PI*k)).toFixed(2)); } else A(E.drop,'opacity',0);
  // tacita de espresso en la mano derecha
  if(p.esp>.02){ var g=apply(FR,G([626,350])), mp=G([462,350]), at=clamp(p.espAt||0); var ex=lerp(g[0],mp[0],at), ey=lerp(g[1],mp[1],at);
    T(E.esp,'translate('+r1(ex)+' '+r1(ey)+') rotate('+r1(lerp(-5,-38,at)+(p.espTilt||0))+') scale('+(2.6*(p.espScale===undefined?1:p.espScale)).toFixed(2)+')'); A(E.esp,'opacity',p.esp.toFixed(2)); A(E.espc,'rx',r1(4+16*p.espLvl));
    for(var si=0;si<3;si++){ var ph=(now*.5+si/3)%1, sx=-40+9*si+3*Math.sin(now*2.2+si*2), sy=-34-30*ph;
      A(E['st'+si],'d','M'+r1(sx)+','+r1(sy)+' q-5,-5 0,-10 q5,-5 0,-10'); A(E['st'+si],'opacity',(p.steam*Math.sin(Math.PI*ph)*.8).toFixed(2)); } }
  else A(E.esp,'opacity',0);

  // ojos abiertos de golpe
  var wd=p.wide||0; A(E.wide,'opacity',wd>.5?1:0);
  if(wd>.5){ var bulge=1+.12*Math.sin(Math.min(1,(wd-.5)*2)*Math.PI)+.05*(p.wob||0);
    svg.querySelectorAll('.tzwe').forEach(function(g){ var c=g.getAttribute('data-c').split(','); T(g,'translate('+c[0]+' '+c[1]+') scale('+bulge.toFixed(3)+') translate('+(-c[0])+' '+(-c[1])+')'); }); }
  // vaho del "¡ahh!"
  var pk=p.puff||0;
  for(var pi=0;pi<4;pi++){ var c4=E['pf'+pi], kk=clamp(pk*1.25-pi*.08);
    if(kk>0&&kk<1){ A(c4,'cx',r1(860-170*kk-30*pi)); A(c4,'cy',r1(700-90*kk+(pi%2?20:-20))); A(c4,'r',r1((14+10*pi)*Math.sin(Math.PI*kk))); A(c4,'opacity',1); } else A(c4,'opacity',0); }
  // rayos de energía alrededor
  var BO=[[1600,520,20],[120,470,-25],[1560,1180,35],[160,1220,-35]];
  for(var bi=0;bi<4;bi++){ var on=(p.bolts||0)*(Math.sin(now*31+bi*2.1)>-.2?1:0);
    T(E['bo'+bi],'translate('+BO[bi][0]+' '+BO[bi][1]+') rotate('+BO[bi][2]+') scale('+(2.3+.3*Math.sin(now*23+bi)).toFixed(2)+')'); A(E['bo'+bi],'opacity',on.toFixed(2)); }
  // gotas que salen disparadas
  for(var fi=0;fi<4;fi++){ var kf=((now*1.6)+fi/4)%1, side=fi%2?1:-1;
    T(E['fd'+fi],'translate('+r1(880+side*(380+260*kf))+' '+r1(360-260*kf+420*kf*kf)+') rotate('+r1(side*kf*90)+')'); A(E['fd'+fi],'opacity',((p.fly||0)*Math.sin(Math.PI*kf)).toFixed(2)); }
  // Zzz y destellos de energía
  for(var i=0;i<3;i++){ var kz=(now/6+i/3)%1; T(E['z'+i],'translate('+r1(1060+70*kz+12*Math.sin(kz*6))+' '+r1(130-150*kz)+') scale('+(.8+1*kz).toFixed(2)+')'); A(E['z'+i],'opacity',(p.z*bump(kz,0,.15,.6,1)).toFixed(2)); }
  var SP=[[300,120,0],[1400,140,.25],[180,900,.5],[1560,820,.75]];
  for(i=0;i<4;i++){ var ks=(now/.9+SP[i][2])%1, sc=.5+.9*Math.sin(Math.PI*ks); T(E['s'+i],'translate('+SP[i][0]+' '+SP[i][1]+') scale('+sc.toFixed(2)+')'); A(E['s'+i],'opacity',(p.spark*Math.sin(Math.PI*ks)).toFixed(2)); }
}

/* ---------- comportamientos ---------- */
var now0=performance.now()/1000;
function walkPose(p,phase,w,amp){ amp=amp||1;
  var u=(1-Math.cos(phase))/2, s=Math.sin(phase);
  p.sF={deg:28*u*w*amp,dx:-34*u*w*amp,dy:52*u*w*amp};
  p.sB={deg:-16*u*w*amp,dx:26*u*w*amp,dy:-56*u*w*amp};
  p.by+=(-10*Math.abs(s)*amp)*w; p.rot+=(-3*u*amp)*w; p.sy+=.012*Math.cos(2*phase)*w;
  return u;
}
var HOLD={deg:-12,dx:-120,dy:62}, SIP={deg:-20,dx:-382,dy:-36};
function pulse(t,c,w){ var k=(t-c)/w; return k<0||k>1?0:Math.sin(Math.PI*k); }

/* El corto completo: aparece, bebe, le sube la cafeína y desaparece (9.8 s) */
var SHOW=9.8;
function show(u){
  var p=P(), b=Math.sin(2*Math.PI*u/3.6);
  p.esp=1; p.steam=1; p.espLvl=1; p.twinkle=.3; p.fR={deg:HOLD.deg,dx:HOLD.dx,dy:HOLD.dy};
  p.sy=1+.01*b; p.by=-2*b;

  // ---- 1) sale de la nube: crece con rebote girando, salta y aterriza
  var a=clamp((u-.42)/.34), back=a<1?1+2.4*Math.pow(a-1,3)+1.4*Math.pow(a-1,2):1;
  p.pop=u<.42?0:(u<.76?back:1); p.spin=u<.76?-28*(1-a):0;
  if(u>=.42&&u<.95){ p.dropY=-150*Math.sin(Math.PI*clamp((u-.42)/.53)); p.landY=1+.06*Math.sin(Math.PI*clamp((u-.42)/.53)); p.landX=1-.04*Math.sin(Math.PI*clamp((u-.42)/.53)); }
  var k=Math.max(0,u-.95), land=u>=.95?Math.exp(-k*8)*Math.cos(k*22):0;
  if(u>=.95){ p.landY=1-.16*land; p.landX=1+.12*land; p.espTilt=8*Math.exp(-k*6)*Math.sin(k*18); }
  if(u<1.1){ p.lidL=p.lidR=.15; }

  // ---- 2) bebe
  var look=bump(u,1.25,1.5,1.85,2.05);                       // mira la taza y la huele
  p.rot+=3*look; p.lidL=Math.max(p.lidL,.35*look); p.lidR=p.lidL; p.brow=.3*look;
  var dip=bump(u,1.85,1.98,2.02,2.15);                        // anticipación: baja un poco antes de subir
  var up=ss(2.0,2.45,u)*(1-ss(4.2,4.65,u));                    // sube a la boca
  var drink=ss(2.4,4.15,u)*(1-ss(4.2,4.4,u));
  var g=pulse(u,2.62,.38)+pulse(u,3.18,.38)+pulse(u,3.74,.38);  // tres tragos
  p.fR={deg:lerp(HOLD.deg,SIP.deg,up)-10*g-6*drink, dx:lerp(HOLD.dx,SIP.dx,up), dy:lerp(HOLD.dy,SIP.dy,up)+22*dip-10*g};
  p.espTilt=(p.espTilt||0)-lerp(0,16,up)-30*drink;
  p.rot+=-6*drink-2*up; p.by-=8*drink; p.sy+=.022*g; p.sx-=.01*g;
  p.espLvl=1-ss(2.5,4.0,u)*.92; p.steam=1-up;
  if(u>2.3&&u<4.3){ p.lidL=p.lidR=.95; p.happy=1; p.brow=.5; }
  // "¡ahh!" con vaho
  var ah=bump(u,4.55,4.75,5.05,5.3);
  if(ah>0){ p.mouth=1; p.mw=lerp(16,14,ah); p.mo=.4*ah; p.mc=lerp(-.6,.8,ah); p.lidL=p.lidR=Math.max(p.lidL,.5*ah); p.sy-=.02*ah; p.by+=4*ah; }
  p.puff=clamp((u-4.6)/.7);

  // ---- 3) le pega la cafeína
  var kick=ss(5.25,5.35,u)*(1-ss(8.9,9.0,u));
  if(u>=5.25){
    p.wide=kick; p.wob=Math.sin(u*40);
    p.esp=u<5.45?1:0; p.espScale=1+3*clamp((u-5.25)/.2); if(u>=5.25&&u<5.45) p.espLvl=0;
    var st=bump(u,5.25,5.4,5.55,5.8); p.sy+=.12*st; p.sx-=.06*st; p.by-=26*st; p.brow=1.5*kick;
    var jit=bump(u,5.35,5.45,5.85,5.95); p.bx+=12*Math.sin(u*95)*jit; p.rot+=3*Math.sin(u*83)*jit;
    p.spark=kick; p.twinkle=1; p.bolts=bump(u,5.35,5.45,8.6,8.85);
    // carrera a toda velocidad en el sitio
    var run=bump(u,5.85,6.05,7.95,8.15), ph=2*Math.PI*(u-5.85)*2.4;
    var uu=walkPose(p,ph,run,1.25);
    var sw=Math.sin(ph);
    p.fR={deg:lerp(-10,-30,run)+10*sw*run, dx:lerp(HOLD.dx,-40,kick)-40*sw*run, dy:lerp(HOLD.dy,-60,kick)+36*sw*run};
    p.fL={deg:-10*run*sw, dx:30*kick+40*sw*run, dy:-90*kick-36*sw*run};
    p.fly=run; p.mouth=1; p.mw=20; p.mo=.72; p.mc=1;
    // pose de victoria
    var win=bump(u,8.1,8.3,8.85,9.0);
    p.fR={deg:lerp(p.fR.deg,-28,win), dx:lerp(p.fR.dx,-30,win), dy:lerp(p.fR.dy,-170,win)};
    p.fL={deg:lerp(p.fL.deg,-12,win), dx:lerp(p.fL.dx,40,win), dy:lerp(p.fL.dy,-190,win)};
    p.sy+=.05*win; p.by-=14*win;
  }
  // ---- 4) vuelve a la nube: se aplasta y desaparece girando
  var go=clamp((u-9.0)/.25), sq=bump(u,8.85,8.98,9.0,9.05);
  p.landY*=1-.12*sq; p.landX*=1+.1*sq;
  if(u>=9.0){ p.pop=1-go*go; p.spin=40*go; }
  return p;
}

/* ---------- nube blanca (se reutiliza para entrar y salir) ---------- */
var fxs=document.createElementNS(NS,'svg'); fxs.setAttribute('viewBox','0 0 1740 1620'); fxs.setAttribute('aria-hidden','true');
fxs.style.cssText='position:absolute;left:0;top:0;width:100%;height:auto;overflow:visible;pointer-events:none;z-index:3;display:none';
(function(){ var star='M0,-48 Q8,-8 48,0 Q8,8 0,48 Q-8,8 -48,0 Q-8,-8 0,-48Z', h='';
  for(var i=0;i<12;i++) h+='<circle id="fc'+i+'" r="0" fill="#fff" stroke="'+INK+'" stroke-width="22"/>';
  for(i=0;i<5;i++) h+='<circle id="fi'+i+'" r="0" fill="#fff"/>';
  h+='<circle id="fcc" r="0" fill="#fff"/>';
  for(i=0;i<10;i++) h+='<path id="fl'+i+'" fill="none" stroke="'+INK+'" stroke-width="22" stroke-linecap="round" opacity="0"/>';
  for(i=0;i<6;i++) h+='<path id="fp'+i+'" d="'+star+'" fill="'+INK+'" opacity="0"/>';
  for(i=0;i<8;i++) h+='<circle id="fw'+i+'" r="0" fill="#fff" stroke="'+INK+'" stroke-width="12"/>';
  fxs.innerHTML=h; host.appendChild(fxs); })();
function Q(id){return fxs.querySelector('#'+id);}
function cloud(t){ // t desde el ¡puf! (0 .. 1.3)
  var CX=880, CY=770, grow=easeOut(clamp(t/.11)), hold=ss(.5,1.1,t), fade=ss(.55,1.2,t);
  for(var i=0;i<12;i++){ var a=i/12*Math.PI*2+.25, rr=(200+70*Math.sin(i*2.3))*grow*(1-fade), d=lerp(140,520,grow)+380*hold;
    A(Q('fc'+i),'cx',r1(CX+Math.cos(a)*d)); A(Q('fc'+i),'cy',r1(CY+Math.sin(a)*d*.9)); A(Q('fc'+i),'r',r1(Math.max(0,rr))); }
  for(i=0;i<5;i++){ var a2=i/5*Math.PI*2+1, d2=lerp(40,200,grow)+120*hold;
    A(Q('fi'+i),'cx',r1(CX+Math.cos(a2)*d2)); A(Q('fi'+i),'cy',r1(CY+Math.sin(a2)*d2*.9)); A(Q('fi'+i),'r',r1(Math.max(0,260*grow*(1-fade)))); }
  A(Q('fcc'),'cx',CX); A(Q('fcc'),'cy',CY); A(Q('fcc'),'r',r1(Math.max(0,620*grow*(1-ss(.45,.95,t)))));
  for(i=0;i<10;i++){ var a3=i/10*Math.PI*2+.15, kl=clamp(t/.3), r0=lerp(560,700,kl), rr1=lerp(640,900,kl);
    A(Q('fl'+i),'d','M'+r1(CX+Math.cos(a3)*r0)+','+r1(CY+Math.sin(a3)*r0*.9)+' L'+r1(CX+Math.cos(a3)*rr1)+','+r1(CY+Math.sin(a3)*rr1*.9));
    A(Q('fl'+i),'opacity',(bump(t,0,.03,.2,.34)).toFixed(2)); }
  for(i=0;i<6;i++){ var a4=i/6*Math.PI*2+.5, k4=clamp((t-.03*i)/.6), s4=Math.sin(Math.PI*k4), d4=lerp(420,900,k4);
    T(Q('fp'+i),'translate('+r1(CX+Math.cos(a4)*d4)+' '+r1(CY+Math.sin(a4)*d4*.85)+') rotate('+r1(k4*200)+') scale('+(s4*1.1).toFixed(2)+')'); A(Q('fp'+i),'opacity',s4.toFixed(2)); }
  for(i=0;i<8;i++){ var a5=i/8*Math.PI*2, k5=clamp((t-.65)/.65), d5=lerp(380,820,k5), r5=Math.max(0,60*Math.sin(Math.PI*k5));
    A(Q('fw'+i),'cx',r1(CX+Math.cos(a5)*d5)); A(Q('fw'+i),'cy',r1(CY+Math.sin(a5)*d5*.85-120*k5)); A(Q('fw'+i),'r',r1(r5)); }
}

/* ---------- logo quieto <-> corto ---------- */
img.style.transformOrigin='50% 52%'; img.style.willChange='transform,opacity';
var mode='static', T0=0, raf=0, nextShow=0, visible=true;
function imgTf(s,r,sx,sy){ img.style.transform='rotate('+r.toFixed(2)+'deg) scale('+(s*sx).toFixed(3)+','+(s*sy).toFixed(3)+')'; }
function frame(ms){
  var now=ms/1000;
  if(mode==='show'){
    var u=now-T0;
    // logo: anticipación (se aplasta) y desaparece girando dentro de la nube
    if(u<.5){ var sq=bump(u,0,.14,.18,.24), g=clamp((u-.2)/.2); imgTf(1-g*g,-30*g,1+.1*sq,1-.14*sq); img.style.opacity=u<.4?'1':'0'; }
    // nube de entrada y de salida
    var c1=u-.2, c2=u-9.0;
    if(c1>=0&&c1<1.3){ fxs.style.display=''; cloud(c1); } else if(c2>=0&&c2<1.3){ fxs.style.display=''; cloud(c2); } else fxs.style.display='none';
    // la tacita viva
    if(u>=.4&&u<9.3){ svg.style.opacity='1'; draw(show(u),now); } else svg.style.opacity='0';
    // el logo vuelve a salir de la nube con rebote
    if(u>=9.25){ var a=clamp((u-9.25)/.4), back=1+2.2*Math.pow(a-1,3)+1.2*Math.pow(a-1,2); img.style.opacity='1'; imgTf(a<1?back:1,24*(1-a),1,1); }
    if(u>=SHOW+.5){ mode='static'; fxs.style.display='none'; svg.style.opacity='0'; img.style.transform=''; img.style.opacity='1'; nextShow=now+16+Math.random()*8; }
  } else if(now>nextShow&&visible&&!document.hidden){ play(now); }
  raf=requestAnimationFrame(frame);
}
function play(now){ mode='show'; T0=now; draw(show(0),now); }
nextShow=performance.now()/1000+1.8;
draw(P(),performance.now()/1000);
raf=requestAnimationFrame(frame);

if(DEBUG){ var dt=parseFloat(DEBUG.replace(/[^0-9.]/g,''))||0; if(/^s/.test(DEBUG)){ cancelAnimationFrame(raf); img.style.opacity='0'; svg.style.opacity='1'; draw(show(dt),now0+dt); } }

/* ---------- interacción: tocar el logo lanza el corto ---------- */
host.style.cursor='pointer'; host.setAttribute('tabindex','0'); host.setAttribute('role','button');
host.title='Toca la tacita: ¡café!'; host.setAttribute('aria-label','Tacita: tócala para que se tome un café');
function poke(){ var now=performance.now()/1000; if(mode==='static') play(now); }
host.addEventListener('click',function(e){e.stopPropagation();poke();});
host.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();poke();}});
document.addEventListener('visibilitychange',function(){ if(document.hidden&&mode==='show'){ mode='static'; fxs.style.display='none'; svg.style.opacity='0'; img.style.transform=''; img.style.opacity='1'; } });
if('IntersectionObserver' in window){ new IntersectionObserver(function(es){ es.forEach(function(x){ visible=x.isIntersecting; }); }).observe(host); }
}
})();
