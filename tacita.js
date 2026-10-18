/* First Sip · el logo original cobra vida (marioneta con las piezas del propio dibujo) */
(function(){
'use strict';
var host=document.querySelector('.logowrap'); if(!host||host.getAttribute('data-tz')) return; host.setAttribute('data-tz','1');
var img=host.querySelector('img'); if(!img) return;
var REDUCE=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var DEBUG=/tzpose=([a-z]+)/.exec(location.search); DEBUG=DEBUG&&DEBUG[1];
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
  '<path d="M-58,-26 L-4,-26 L-10,20 Q-11,28 -19,28 L-43,28 Q-51,28 -52,20 Z" fill="'+WHITE+'" stroke="'+INK+'" stroke-width="9" stroke-linejoin="round"/><ellipse cx="-31" cy="-26" rx="27" ry="7" fill="'+WHITE+'" stroke="'+INK+'" stroke-width="8"/><ellipse id="tz-espc" cx="-31" cy="-25" rx="20" ry="4" fill="'+INK+'"/></g>';
var lid=function(s){ return '<g clip-path="url(#tzc-e'+s+')"><path id="tz-lid'+s+'f" fill="'+BG+'"/><path id="tz-lid'+s+'e" fill="none" stroke="'+INK+'" stroke-width="20" stroke-linecap="round"/></g><path id="tz-lash'+s+'" fill="none" stroke="'+INK+'" stroke-width="9" stroke-linecap="round" opacity="0"/>'; };
svg.innerHTML=d+
 '<g id="tz-root">'+pc('shadow')+pc('sparkL')+pc('sparkR')+pc('lines')+
 '<path id="tz-legB" fill="'+INK+'"/>'+pc('shoeB')+'<path id="tz-legF" fill="'+INK+'"/>'+
 '<g id="tz-body"><path id="tz-crotch" fill="'+INK+'" d="'+poly([[444,555.5],[511.4,411.8],[509,592]])+'"/><use href="#tzA" mask="url(#tzm)"/>'+lid('L')+lid('R')+
   '<g id="tz-mouthg" opacity="0"><path d="'+poly(MOUTH.patch)+'" fill="'+BG+'"/><path id="tz-mouth" fill="'+INK+'" stroke="'+INK+'" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/><ellipse id="tz-tongue" rx="10" ry="7" fill="'+WHITE+'" opacity="0"/></g>'+
   '<g id="tz-bubg" opacity="0"><circle id="tz-bub" fill="'+WHITE+'" fill-opacity=".55" stroke="'+INK+'" stroke-width="7"/><circle id="tz-bubh" r="5" fill="'+WHITE+'"/></g>'+
   '<path id="tz-drop" d="M0,-26 C-12,-8 -14,4 -8,12 C-2,18 10,18 14,10 C18,0 10,-12 0,-26Z" fill="none" stroke="'+INK+'" stroke-width="7" opacity="0"/>'+
 '</g>'+
 pc('shoeF')+'<path id="tz-armL" fill="'+INK+'"/>'+pc('fistL')+
 '<path id="tz-armR" fill="'+INK+'"/><path id="tz-armRh" fill="none" stroke="'+WHITE+'" stroke-width="9" stroke-linecap="round"/>'+esp+pc('fistR')+
 '</g><g id="tz-fx">'+fx+'</g>';
svg.style.cssText='position:absolute;left:0;top:0;opacity:0;pointer-events:none';
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
  T(E.root,'translate(0 '+r1(p.dropY)+') translate(900 1500) scale('+p.landX.toFixed(3)+' '+p.landY.toFixed(3)+') translate(-900 -1500)');
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
    T(E.esp,'translate('+r1(ex)+' '+r1(ey)+') rotate('+r1(lerp(-5,-38,at))+') scale(2.1)'); A(E.esp,'opacity',p.esp.toFixed(2)); A(E.espc,'rx',r1(4+16*p.espLvl)); }
  else A(E.esp,'opacity',0);
  // Zzz y destellos de energía
  for(var i=0;i<3;i++){ var kz=(now/6+i/3)%1; T(E['z'+i],'translate('+r1(1060+70*kz+12*Math.sin(kz*6))+' '+r1(130-150*kz)+') scale('+(.8+1*kz).toFixed(2)+')'); A(E['z'+i],'opacity',(p.z*bump(kz,0,.15,.6,1)).toFixed(2)); }
  var SP=[[300,120,0],[1400,140,.25],[180,900,.5],[1560,820,.75]];
  for(i=0;i<4;i++){ var ks=(now/.9+SP[i][2])%1, sc=.5+.9*Math.sin(Math.PI*ks); T(E['s'+i],'translate('+SP[i][0]+' '+SP[i][1]+') scale('+sc.toFixed(2)+')'); A(E['s'+i],'opacity',(p.spark*Math.sin(Math.PI*ks)).toFixed(2)); }
}

/* ---------- comportamientos ---------- */
var rnd=Math.random;
function walkPose(p,phase,w){ // paso en el sitio alrededor de la pose del dibujo
  var u=(1-Math.cos(phase))/2, s=Math.sin(phase);
  p.sF={deg:28*u*w,dx:-34*u*w,dy:52*u*w};               // el pie delantero baja y se apoya
  p.sB={deg:-16*u*w,dx:26*u*w,dy:-56*u*w};              // el trasero se levanta
  p.fR={deg:14*u*w,dx:-46*u*w,dy:40*u*w};               // brazos al revés que las piernas
  p.fL={deg:-12*u*w,dx:44*u*w,dy:-46*u*w};
  p.by+=(-10*Math.abs(s)-4)*w+4*w; p.rot+=(-3*u)*w; p.sy+=.012*Math.cos(2*phase)*w;
}
function idle(u,now,ev){
  var p=P(), b=Math.sin(2*Math.PI*u/4.2);
  p.sy=1+.01*b; p.sx=1-.005*b; p.by=-2*b; p.rot=.6*Math.sin(u*.7);
  p.fR.dy=2*b; p.fL.dy=-2*b; p.twinkle=.25;
  // paseíto cansado
  var wt=now-ev.walk, ww=bump(wt,0,.6,ev.walkLen-.6,ev.walkLen);
  if(ww>0) walkPose(p,2*Math.PI*wt/1.05,ww);
  p.lines=ww>0?1:1;
  // se seca el sudor con el puño
  var st=now-ev.wipe, sw=bump(st,0,.55,1.6,2.2);
  if(sw>0){ var rub=Math.sin(2*Math.PI*(st-.55)/.42)*bump(st,.5,.6,1.5,1.6);
    p.fR={deg:-38*sw+6*rub,dx:-170*sw+18*rub,dy:-160*sw+8*rub}; p.rot+=-2*sw; p.lidL=.25*sw; p.lidR=.25*sw; p.drop=st>1.5&&st<2.5?(st-1.5):0; }
  // bostezo
  var yt=now-ev.yawn, y=bump(yt,0,.5,1.3,1.9);
  if(y>0){ p.mouth=1; p.mw=lerp(16,13,y); p.mo=y; p.mc=lerp(-.6,0,y); p.lidL=Math.max(p.lidL,.75*y); p.lidR=Math.max(p.lidR,.75*y); p.sy+=.05*y; p.sx-=.02*y; p.by-=10*y; p.rot-=2*y;
    p.fR.dy-=30*y; p.fR.deg-=8*y; p.fL.dy-=10*y; }
  // parpadeo
  var bt=now-ev.blink; if(bt>=0&&bt<.17){ var bl=1-Math.abs(bt/.085-1); p.lidL=Math.max(p.lidL,bl); p.lidR=Math.max(p.lidR,bl); }
  return p;
}
function fall(u){ // bosteza y se queda frita
  var p=P(), y=bump(u,0,.5,1.1,1.6), d=ss(1.0,2.4,u);
  p.mouth=1; p.mw=lerp(lerp(16,13,y),8,d); p.mo=Math.max(y,.45*d); p.mc=0;
  p.lidL=Math.max(.75*y,d); p.lidR=p.lidL; p.sy=1+.05*y-.02*d; p.sx=1-.02*y+.01*d; p.by=-10*y+8*d; p.rot=-2*y+5*d;
  p.fR={deg:10*d,dx:-10*d,dy:70*d-30*y}; p.fL={deg:6*d,dx:6*d,dy:24*d}; p.z=ss(1.6,2.4,u); p.bub=.5*ss(1.8,2.4,u); p.twinkle=.25*(1-d);
  return p;
}
function sleep(u){
  var p=P(), b=Math.sin(2*Math.PI*u/3.4);
  p.lidL=1; p.lidR=1; p.mouth=1; p.mw=8; p.mo=.4+.4*b; p.mc=0; p.bub=.5+.5*b; p.z=1;
  p.sy=.98+.02*b; p.sx=1.01-.01*b; p.by=8-3*b; p.rot=5+1.2*b;
  p.fR={deg:10,dx:-10,dy:70+4*b}; p.fL={deg:6,dx:6,dy:24+3*b};
  return p;
}
function wake(u){ // respingo, se toma un espresso y se pone a tope
  var p=P();
  var st=bump(u,.15,.27,.5,.75), sl=1-ss(.15,.3,u);
  var bring=bump(u,.9,1.3,2.5,2.9), sip=bump(u,1.25,1.4,2.35,2.5), gulp=sip*Math.max(0,Math.sin(2*Math.PI*(u-1.4)/.45));
  var hype=bump(u,2.85,3.05,3.9,4.3), hop=hype*Math.max(0,Math.sin(2*Math.PI*(u-2.95)/.42));
  p.lidL=p.lidR=lerp(0,1,sl)+.9*sip; if(sip>.3) p.happy=1;
  p.mouth=(u<.9||hype>.05)?1:0;
  if(u<.15){p.mw=8;p.mo=.45;p.mc=0;} else if(u<.9){p.mw=8;p.mo=.6;p.mc=0;} else {p.mw=lerp(9,20,hype);p.mo=.7*hype;p.mc=lerp(.2,1,hype);}
  p.bub=Math.max(0,.9-4*u);
  p.dropY=-36*st-34*hop; if(u>.27&&u<.75){ var k=u-.5; } 
  var land=Math.exp(-Math.max(0,u-.5)*9)*Math.cos(Math.max(0,u-.5)*22)*(u>.5?1:0);
  p.landY=1-.1*land-.06*st; p.landX=1+.08*land+.04*st;
  p.rot=lerp(5,0,1-sl)+3*Math.sin(2*Math.PI*(u-.6)/.3)*bump(u,.55,.65,.85,.95)-2*sip+2*Math.sin(2*Math.PI*u/.84)*hype;
  p.by=lerp(8,0,1-sl);
  // la mano trae un espresso a la boca
  p.esp=ss(.85,1.0,u)*(1-ss(2.75,2.95,u)); p.espLvl=1-ss(1.4,2.35,u); p.espAt=0;
  p.fR={deg:lerp(lerp(10,0,1-sl),-20,bring)+(-8*gulp), dx:lerp(lerp(-10,0,1-sl),-382,bring), dy:lerp(lerp(70,0,1-sl),-36,bring)-8*gulp};
  p.fR={deg:lerp(p.fR.deg,-20,hype), dx:lerp(p.fR.dx,20,hype), dy:lerp(p.fR.dy,-120,hype)+20*Math.sin(2*Math.PI*(u-3)/.42)*hype};
  p.fL={deg:lerp(6,0,1-sl), dx:lerp(6,0,1-sl)+30*hype, dy:lerp(24,0,1-sl)-150*hype+16*Math.sin(2*Math.PI*(u-3.1)/.42)*hype};
  p.spark=hype; p.twinkle=.25+.75*hype; p.z=1-ss(.15,.35,u);
  return p;
}
function intro(u){ // el dibujo cobra vida: brillo, se hincha, parpadea y empieza a andar
  var p=P(); p.twinkle=ss(0,.6,u);
  var inh=bump(u,.6,.9,1.0,1.3); p.sy=1+.05*inh; p.sx=1-.02*inh; p.by=-6*inh;
  var bt=u-1.25; if(bt>=0&&bt<.2){ var bl=1-Math.abs(bt/.1-1); p.lidL=p.lidR=bl; }
  var bt2=u-1.6; if(bt2>=0&&bt2<.2){ var bl2=1-Math.abs(bt2/.1-1); p.lidL=p.lidR=bl2; }
  var ww=bump(u,1.9,2.4,5.1,5.6); if(ww>0) walkPose(p,2*Math.PI*(u-1.9)/1.05,ww);
  p.twinkle=Math.max(.25,p.twinkle*(1-ss(2,3,u)));
  return p;
}
var DUR={fall:2.4,wake:4.6,intro:5.6};

/* ---------- máquina de estados ---------- */
var now0=performance.now()/1000;
var ev={blink:-9,nextBlink:now0+3,walk:-99,walkLen:4.2,nextWalk:now0+14,wipe:-99,nextWipe:now0+24,yawn:-99,nextYawn:now0+34};
var state='intro', t0=now0, from=null, fromT=0, cur=P(), lastAct=now0, raf=0, running=false, ready=false;
function go(s,now,blend){ if(blend){from=JSON.parse(JSON.stringify(cur));fromT=now;} else from=null; state=s; t0=now; }
function target(now){
  var u=now-t0;
  if(state==='idle') return idle(u,now,ev);
  if(state==='intro'){ if(u>=DUR.intro){go('idle',now,false);return idle(0,now,ev);} return intro(u); }
  if(state==='fall'){ if(u>=DUR.fall){go('sleep',now,false);return sleep(0);} return fall(u); }
  if(state==='sleep') return sleep(u);
  if(state==='wake'){ if(u>=DUR.wake){go('idle',now,false);return idle(0,now,ev);} return wake(u); }
}
function schedule(now){
  if(state!=='idle') return;
  if(now>ev.nextBlink){ ev.blink=now; ev.nextBlink=now+(rnd()<.2?.3:2.5+rnd()*4); }
  var busy=(now-ev.walk<ev.walkLen)||(now-ev.wipe<2.3)||(now-ev.yawn<2);
  if(!busy){
    if(now>ev.nextWalk){ ev.walk=now; ev.walkLen=3.2+rnd()*2.1; ev.nextWalk=now+14+rnd()*12; }
    else if(now>ev.nextWipe){ ev.wipe=now; ev.nextWipe=now+18+rnd()*14; }
    else if(now>ev.nextYawn){ ev.yawn=now; ev.nextYawn=now+26+rnd()*18; }
  }
  if(now-lastAct>45) go('fall',now,true);
}
function frame(ms){
  var now=ms/1000; schedule(now);
  var t=target(now);
  if(from){ var w=easeOut((now-fromT)/.45); t=mix(from,t,w); if(w>=1) from=null; }
  cur=t; draw(t,now);
  if(running) raf=requestAnimationFrame(frame);
}
function start(){ if(running) return; running=true; raf=requestAnimationFrame(frame); }
function stop(){ running=false; cancelAnimationFrame(raf); }

/* ---------- arranque: el logo quieto se convierte en la marioneta sin que se note ---------- */
draw(P(),now0);
if(DEBUG){ svg.style.cssText=''; img.remove(); var fn={rest:P,sleep:function(){return sleep(0);},wake:function(){return wake(1.8);},yawn:function(){return fall(.8);},wipe:function(){var e=Object.assign({},ev);e.wipe=now0-1.0;return idle(0,now0,e);},walk:function(){var p=P();walkPose(p,Math.PI,1);return p;},hype:function(){return wake(3.4);}}[DEBUG]; if(fn) draw(fn(),now0); return; }
function begin(){
  if(ready) return; ready=true;
  // fundido instantáneo: ambas imágenes son idénticas en reposo
  svg.style.opacity='1'; img.style.opacity='0';
  setTimeout(function(){ img.remove(); svg.style.cssText=''; },60);
  var n=performance.now()/1000; go('intro',n,false); lastAct=n; ev.nextBlink=n+7; start();
}
var tm=setTimeout(begin,1600);

/* ---------- interacción ---------- */
host.style.cursor='pointer'; host.setAttribute('tabindex','0'); host.setAttribute('role','button');
host.title='Toca la tacita: siesta o café'; host.setAttribute('aria-label','Tacita: tócala para que se duerma o se despierte');
function poke(){
  if(!ready){ clearTimeout(tm); begin(); return; }
  var now=performance.now()/1000; lastAct=now;
  if(state==='idle'||state==='intro') go('fall',now,true);
  else if(state==='sleep'||state==='fall') go('wake',now,true);
}
host.addEventListener('click',function(e){e.stopPropagation();poke();});
host.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();poke();}});
['pointerdown','keydown','scroll','wheel','touchstart'].forEach(function(n){
  addEventListener(n,function(e){ if(host.contains(e.target)) return; var now=performance.now()/1000; lastAct=now;
    if(ready&&(state==='sleep'||state==='fall')) go('wake',now,true); },{passive:true});
});
document.addEventListener('visibilitychange',function(){
  if(!ready) return; var now=performance.now()/1000;
  if(document.hidden){ stop(); if(state!=='sleep'){state='sleep';t0=now;from=null;} } else start();
});
if('IntersectionObserver' in window){ new IntersectionObserver(function(es){ es.forEach(function(x){ if(!ready) return; x.isIntersecting&&!document.hidden?start():stop(); }); }).observe(svg); }
}
})();
