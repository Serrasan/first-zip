/* First Sip · tacita animada en tiempo real (SVG + JS, sin dependencias) */
(function(){
'use strict';
var host=document.querySelector('.logowrap'); if(!host||host.getAttribute('data-tz')) return; host.setAttribute('data-tz','1');
var img=host.querySelector('img');
var NS='http://www.w3.org/2000/svg', INK='#2e426f', W='#fff', G=368, BX=205, BY=272;
var svg=document.createElementNS(NS,'svg');
svg.setAttribute('viewBox','0 0 420 400'); svg.setAttribute('class','tacita');
svg.setAttribute('role','img'); svg.setAttribute('aria-label','First Sip: tacita con cinturón de BJJ y su café');
svg.innerHTML="<defs>\n<g id=\"tzhandle\"><path d=\"M-74,-128 C-128,-138 -132,-62 -72,-58\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"30\" stroke-linecap=\"round\"/>\n<path d=\"M-74,-128 C-128,-138 -132,-62 -72,-58\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"15\" stroke-linecap=\"round\"/></g>\n<g id=\"tzcup\">\n<path d=\"M-82,-160 L82,-160 L71,-16 Q69,0 53,0 L-53,0 Q-69,0 -71,-16 Z\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"6.5\" stroke-linejoin=\"round\"/>\n<path d=\"M-60,-150 L-52,-22\" stroke=\"#2e426f\" stroke-width=\"2.5\" opacity=\".25\" fill=\"none\"/>\n<ellipse cx=\"0\" cy=\"-160\" rx=\"82\" ry=\"21\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"6.5\"/>\n</g>\n<g id=\"tzface\"><g transform=\"translate(-24 4)\">\n<path d=\"M5,-60 q6,-14 18,-6\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"4\" stroke-linecap=\"round\" opacity=\"0\"/>\n<path d=\"M30,-86 c-10,-6 -2,-16 6,-12 c8,4 4,14 -2,16\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"4.5\" stroke-linecap=\"round\"/>\n<path d=\"M-2,-80 q12,8 24,0 M48,-82 q10,7 20,-1\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"3.5\" stroke-linecap=\"round\"/>\n<path d=\"M-32,-112 c-6,10 -8,16 -4,20 c4,4 10,2 10,-4 c0,-5 -3,-9 -6,-16Z M-44,-86 c-4,7 -5,11 -2,14 c3,3 7,1 7,-3 c0,-4 -2,-7 -5,-11Z\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"3.5\"/>\n<path d=\"M118,-150 c-5,8 -6,13 -3,16 c3,3 8,1 8,-3 c0,-4 -2,-7 -5,-13Z M130,-132 c-4,6 -5,10 -2,12 c2,2 6,1 6,-2 c0,-3 -2,-6 -4,-10Z\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"3.5\"/>\n</g></g>\n<clipPath id=\"tzeyeL\"><ellipse cx=\"10\" cy=\"-108\" rx=\"19\" ry=\"22\"/></clipPath>\n<clipPath id=\"tzeyeR\"><ellipse cx=\"58\" cy=\"-106\" rx=\"15\" ry=\"19\"/></clipPath>\n<pattern id=\"tzdots\" width=\"6\" height=\"6\" patternUnits=\"userSpaceOnUse\"><rect width=\"6\" height=\"6\" fill=\"#ffffff\"/><circle cx=\"3\" cy=\"3\" r=\"1.4\" fill=\"#2e426f\"/></pattern>\n<g id=\"tzmugb\"><path d=\"M20,-14 C40,-16 42,14 20,12\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"13\" stroke-linecap=\"round\"/><path d=\"M20,-14 C40,-16 42,14 20,12\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"5\" stroke-linecap=\"round\"/><path d=\"M-21,-22 L21,-22 L17,16 Q16,22 10,22 L-10,22 Q-16,22 -17,16 Z\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"5\" stroke-linejoin=\"round\"/><ellipse cx=\"0\" cy=\"-22\" rx=\"21\" ry=\"5.5\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"5\"/><path d=\"M-9,-6 l4,8 M-1,-8 l0,10\" stroke=\"#2e426f\" stroke-width=\"2.5\" stroke-linecap=\"round\" opacity=\".5\"/></g><path id=\"tzstm\" d=\"M0,18 q-6,-6 0,-11 q6,-5 0,-11\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><g id=\"tzgripP\"><path d=\"M-2,-16 C14,-18 22,-6 20,6 C18,18 4,20 -4,14 Z\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"5\" stroke-linejoin=\"round\"/><rect x=\"16\" y=\"-12\" width=\"12\" height=\"22\" rx=\"5\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"4.5\"/></g><g id=\"tzgripF\"><circle cx=\"-3\" cy=\"-9\" r=\"6.5\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"4\"/><circle cx=\"-4\" cy=\"0\" r=\"6.5\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"4\"/><circle cx=\"-2\" cy=\"9\" r=\"6\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"4\"/><path d=\"M2,-15 C-6,-20 -14,-14 -10,-8\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"4\" stroke-linecap=\"round\"/></g><g id=\"tzcupH\"><path d=\"M-22,-2 C-24,12 -10,20 6,18 C20,16 26,6 22,-2 Z\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"5\" stroke-linejoin=\"round\"/><path d=\"M-6,4 v7 M3,4 v8 M12,3 v7\" stroke=\"#2e426f\" stroke-width=\"3\" stroke-linecap=\"round\"/><rect x=\"-34\" y=\"-4\" width=\"14\" height=\"20\" rx=\"5\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"4.5\"/></g><g id=\"tzcupT\"><path d=\"M-20,-2 C-26,-12 -22,-26 -14,-26 C-8,-26 -8,-16 -10,-6\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"4.5\" stroke-linejoin=\"round\"/></g><g id=\"tzfist\"><rect x=\"-11\" y=\"10\" width=\"22\" height=\"12\" rx=\"5\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"4.5\"/><path d=\"M-15,12 C-20,-4 -12,-18 2,-18 C16,-18 20,-4 15,12 Z\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"6.5\" stroke-linejoin=\"round\"/><path d=\"M-6,-8 v8 M2,-9 v9 M10,-7 v7\" stroke=\"#2e426f\" stroke-width=\"3\" stroke-linecap=\"round\"/></g></defs><ellipse cx=\"205\" cy=\"372\" rx=\"118\" ry=\"9\" fill=\"#2e426f\"/><path id=\"tz-legL\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"19\" stroke-linecap=\"round\"/><path id=\"tz-legR\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"19\" stroke-linecap=\"round\"/><g transform=\"translate(173 352) rotate(0) scale(1.4)\"><rect x=\"-9\" y=\"-12\" width=\"18\" height=\"16\" rx=\"7\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"5\"/><path d=\"M-18,4 C-22,-14 4,-20 20,-12 C34,-6 42,4 38,14 C34,22 -14,24 -18,14 Z\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"6.5\" stroke-linejoin=\"round\"/><path d=\"M-17,12 C-10,20 30,20 38,13 L37,16 C30,24 -12,24 -18,15Z\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"4\"/><path d=\"M14,-6 q8,4 10,12\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g><g transform=\"translate(250 352) rotate(0) scale(1.4)\"><rect x=\"-9\" y=\"-12\" width=\"18\" height=\"16\" rx=\"7\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"5\"/><path d=\"M-18,4 C-22,-14 4,-20 20,-12 C34,-6 42,4 38,14 C34,22 -14,24 -18,14 Z\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"6.5\" stroke-linejoin=\"round\"/><path d=\"M-17,12 C-10,20 30,20 38,13 L37,16 C30,24 -12,24 -18,15Z\" fill=\"url(#tzdots)\" stroke=\"#2e426f\" stroke-width=\"4\"/><path d=\"M14,-6 q8,4 10,12\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"3.5\" stroke-linecap=\"round\"/></g><g id=\"tz-body\"><use href=\"#tzhandle\"/><use href=\"#tzcup\"/><g id=\"tz-coffee\"><ellipse cx=\"0\" cy=\"-158\" rx=\"68\" ry=\"14\" fill=\"#2e426f\"/><path d=\"M-46,-162 q14,-6 30,-3\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"5\" stroke-linecap=\"round\" opacity=\".9\"/></g><use href=\"#tzface\"/><g transform=\"translate(-24 4)\"><g id=\"tz-eyes\"><g clip-path=\"url(#tzeyeL)\"><ellipse cx=\"10\" cy=\"-108\" rx=\"19\" ry=\"22\" fill=\"#ffffff\"/><ellipse id=\"tz-pL\" rx=\"9.5\" ry=\"12.1\" fill=\"#2e426f\"/><circle id=\"tz-gL\" r=\"2.6\" fill=\"#ffffff\"/><path id=\"tz-lidL\" fill=\"#ffffff\"/><path id=\"tz-edgeL\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"5\" stroke-linecap=\"round\"/></g><ellipse cx=\"10\" cy=\"-108\" rx=\"19\" ry=\"22\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"6.5\"/><g clip-path=\"url(#tzeyeR)\"><ellipse cx=\"58\" cy=\"-106\" rx=\"15\" ry=\"19\" fill=\"#ffffff\"/><ellipse id=\"tz-pR\" rx=\"7.5\" ry=\"10.5\" fill=\"#2e426f\"/><circle id=\"tz-gR\" r=\"2.6\" fill=\"#ffffff\"/><path id=\"tz-lidR\" fill=\"#ffffff\"/><path id=\"tz-edgeR\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"5\" stroke-linecap=\"round\"/></g><ellipse cx=\"58\" cy=\"-106\" rx=\"15\" ry=\"19\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"6.5\"/></g><g id=\"tz-lash\" opacity=\"0\"><path d=\"M-9,-106 Q10,-92 29,-106\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"6\" stroke-linecap=\"round\"/><path d=\"M-4,-97 l-4,6 M10,-95 l0,7 M24,-97 l4,6\" stroke=\"#2e426f\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M43,-104 Q58,-90 73,-104\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"6\" stroke-linecap=\"round\"/><path d=\"M48,-95 l-4,6 M58,-93 l0,7 M68,-95 l4,6\" stroke=\"#2e426f\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g id=\"tz-happy\" opacity=\"0\"><path d=\"M-9,-100 Q10,-120 29,-100\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"6\" stroke-linecap=\"round\"/><path d=\"M43,-98 Q58,-118 73,-98\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"6\" stroke-linecap=\"round\"/></g><g id=\"tz-squeeze\" opacity=\"0\"><path d=\"M-9,-112 L21.4,-106 L-9,-100\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"5.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M43,-110 L67.0,-104 L43,-98\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"5.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g><path id=\"tz-browL\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"6\" stroke-linecap=\"round\"/><path id=\"tz-browR\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"6\" stroke-linecap=\"round\"/><path id=\"tz-mouth\" fill=\"#2e426f\" stroke=\"#2e426f\" stroke-width=\"5\" stroke-linejoin=\"round\" stroke-linecap=\"round\"/><ellipse id=\"tz-tongue\" ry=\"4\" fill=\"#ffffff\" opacity=\"0\"/><g id=\"tz-bubg\" opacity=\"0\"><circle id=\"tz-bub\" fill=\"#ffffff\" fill-opacity=\".65\" stroke=\"#2e426f\" stroke-width=\"3.5\"/><circle id=\"tz-bubh\" fill=\"#ffffff\"/></g></g><g transform=\"translate(0 12)\"><path d=\"M-72,-46 Q0,-38 72,-50 L71,-30 Q0,-20 -71,-28 Z\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"6.5\" stroke-linejoin=\"round\"/><g id=\"tz-tail1\"><path d=\"M24,-34 C18,-14 14,0 10,14 L24,16 C28,2 32,-14 36,-32 Z\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"5\" stroke-linejoin=\"round\"/></g><g id=\"tz-tail2\"><path d=\"M34,-34 C40,-16 46,-2 52,10 L64,4 C56,-8 50,-20 44,-34 Z\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"5\" stroke-linejoin=\"round\"/></g><path d=\"M18,-50 Q30,-58 46,-50 Q50,-38 44,-28 Q30,-22 18,-30 Q14,-40 18,-50Z\" fill=\"#ffffff\" stroke=\"#2e426f\" stroke-width=\"5\" stroke-linejoin=\"round\"/><path d=\"M24,-46 q8,6 16,0 M24,-34 q8,-5 16,0\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><path id=\"tz-armB\" fill=\"#2e426f\"/><g id=\"tz-fist\" opacity=\"0\"><use href=\"#tzfist\"/></g><g id=\"tz-cupH\"><use href=\"#tzcupH\"/></g><g id=\"tz-mug\"><path id=\"tz-st0\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><path id=\"tz-st1\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><path id=\"tz-st2\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><use href=\"#tzmugb\"/><ellipse id=\"tz-level\" cx=\"0\" cy=\"-21\" ry=\"3.5\" fill=\"#2e426f\"/></g><g id=\"tz-cupT\"><use href=\"#tzcupT\"/></g><path id=\"tz-armF\" fill=\"#2e426f\"/><g id=\"tz-grip\"><use href=\"#tzgripP\"/><path d=\"M0,-11 C10,-12 12,10 0,9\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"9.5\" stroke-linecap=\"round\"/><path d=\"M0,-11 C10,-12 12,10 0,9\" fill=\"none\" stroke=\"#ffffff\" stroke-width=\"3.5\" stroke-linecap=\"round\"/><use href=\"#tzgripF\"/></g></g><g id=\"tz-z0\" opacity=\"0\"><path d=\"M-7,-8 H7 L-7,8 H7\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g><g id=\"tz-z1\" opacity=\"0\"><path d=\"M-7,-8 H7 L-7,8 H7\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g><g id=\"tz-z2\" opacity=\"0\"><path d=\"M-7,-8 H7 L-7,8 H7\" fill=\"none\" stroke=\"#2e426f\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g><g id=\"tz-s0\" opacity=\"0\"><path d=\"M0,-12 Q2,-2 12,0 Q2,2 0,12 Q-2,2 -12,0 Q-2,-2 0,-12Z\" fill=\"#2e426f\"/></g><g id=\"tz-s1\" opacity=\"0\"><path d=\"M0,-12 Q2,-2 12,0 Q2,2 0,12 Q-2,2 -12,0 Q-2,-2 0,-12Z\" fill=\"#2e426f\"/></g><g id=\"tz-s2\" opacity=\"0\"><path d=\"M0,-12 Q2,-2 12,0 Q2,2 0,12 Q-2,2 -12,0 Q-2,-2 0,-12Z\" fill=\"#2e426f\"/></g><g id=\"tz-s3\" opacity=\"0\"><path d=\"M0,-12 Q2,-2 12,0 Q2,2 0,12 Q-2,2 -12,0 Q-2,-2 0,-12Z\" fill=\"#2e426f\"/></g>";
var REDUCE0=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
if(REDUCE0&&img) return;            // con movimiento reducido se queda el logo estático original
var swapped=!img;
if(!img) host.appendChild(svg);
else { svg.style.cssText='position:absolute;left:0;top:0;opacity:0;transform:scale(.92);transition:opacity .45s ease,transform .55s cubic-bezier(.3,1.5,.5,1)'; host.appendChild(svg); }
function swapToLive(){
  if(swapped) return; swapped=true;
  img.style.transition='opacity .35s ease,transform .45s ease'; img.style.opacity='0'; img.style.transform='scale(1.06)';
  requestAnimationFrame(function(){ svg.style.opacity='1'; svg.style.transform='scale(1)'; });
  setTimeout(function(){ img.remove(); svg.style.cssText=''; },600);
}
var E={}; svg.querySelectorAll('[id^="tz-"]').forEach(function(n){E[n.id.slice(3)]=n;});
var REDUCE=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- utilidades ---------- */
function clamp(x,a,b){a=a===undefined?0:a;b=b===undefined?1:b;return x<a?a:x>b?b:x;}
function lerp(a,b,u){return a+(b-a)*u;}
function ss(a,b,x){var u=clamp((x-a)/(b-a));return u*u*(3-2*u);}
function bump(t,a,b,c,d){return ss(a,b,t)*(1-ss(c,d,t));}
function easeOut(u){u=clamp(u);return 1-Math.pow(1-u,3);}
function n1(x){return Math.round(x*10)/10;}
function rot(p,deg){var a=deg*Math.PI/180,c=Math.cos(a),s=Math.sin(a);return [p[0]*c-p[1]*s,p[0]*s+p[1]*c];}
function add(a,b){return [a[0]+b[0],a[1]+b[1]];}
function mpt(M,r,pt){return add(M,rot([pt[0]*1.5,pt[1]*1.5],r));}
function T(el,s){el.setAttribute('transform',s);} function A(el,k,v){el.setAttribute(k,v);}

/* brazo de goma con trazo que se afina (de hombro a muñeca) */
function taper(p0,c1,c2,p3,w0,w1){
  var N=16,L=[],R=[];
  for(var i=0;i<=N;i++){
    var t=i/N,u=1-t;
    var x=u*u*u*p0[0]+3*u*u*t*c1[0]+3*u*t*t*c2[0]+t*t*t*p3[0];
    var y=u*u*u*p0[1]+3*u*u*t*c1[1]+3*u*t*t*c2[1]+t*t*t*p3[1];
    var dx=3*u*u*(c1[0]-p0[0])+6*u*t*(c2[0]-c1[0])+3*t*t*(p3[0]-c2[0]);
    var dy=3*u*u*(c1[1]-p0[1])+6*u*t*(c2[1]-c1[1])+3*t*t*(p3[1]-c2[1]);
    var l=Math.hypot(dx,dy)||1, w=lerp(w0,w1,t)/2, nx=-dy/l*w, ny=dx/l*w;
    L.push(n1(x+nx)+','+n1(y+ny)); R.push(n1(x-nx)+','+n1(y-ny));
  }
  return 'M'+L.join(' L')+' A'+n1(w1/2)+','+n1(w1/2)+' 0 0 0 '+R[N]+' L'+R.slice(0,N).reverse().join(' L')+' A'+n1(w0/2)+','+n1(w0/2)+' 0 0 0 '+L[0]+'Z';
}

/* ---------- pose neutra (despierta) ---------- */
var REST={bx:0,by:0,rot:-4,sx:1,sy:1,lid:.48,lx:2,ly:3,happy:0,squeeze:0,brow:0,mw:16,mo:0,mc:-.8,bub:0,
  mx:14,my:-12,mr:0,level:1,steam:1,fist:0,fx:-112,fy:-170,tail:0,cdx:0,crot:0,z:0,spark:0};
function P(){var o={};for(var k in REST)o[k]=REST[k];return o;}

/* ---------- estado aleatorio de la vigilia ---------- */
var rnd=Math.random, now0=performance.now()/1000;
var ev={blink:-9,nextBlink:now0+1.5,sip:-99,nextSip:now0+5+rnd()*3,yawn:-99,nextYawn:now0+16+rnd()*8,sips:0};
var look=[2,3], lookT=[2,3], lastPtr=-99, nextWander=0;

function idle(u,now){
  var p=P(), b=Math.sin(2*Math.PI*u/4);
  p.by=-1.2*b; p.sy=1+.012*b; p.sx=1-.006*b; p.rot=-4+.9*Math.sin(u*.8); p.lid=.48+.04*b; p.tail=3*b;
  p.crot=1.2*Math.sin(u*.8+.6);
  // sorbo
  var st=now-ev.sip, s=bump(st,0,.75,1.95,2.7), gulp=s*Math.max(0,Math.sin(2*Math.PI*(st-.8)/.55))*(st<1.9?1:0);
  if(s>0){ p.mx=lerp(14,42,s); p.my=lerp(-12,-30,s)+2*b-5*gulp; p.mr=lerp(0,-48,s); p.steam=1-s;
    p.happy=(st>.55&&st<2.05)?1:0; p.brow=.45*s; p.rot+=-2.5*s; p.sy+=.012*gulp;
    if(s>.3){p.mw=lerp(16,9,s);p.mc=lerp(-.8,.4,s);} p.crot+=-3*s; }
  // bostezo
  var yt=now-ev.yawn, y=bump(yt,0,.55,1.35,2.0);
  if(y>0){ p.sy+=.065*y; p.sx-=.025*y; p.by-=6*y; p.rot-=3*y; p.squeeze=y>.45?1:0;
    p.mw=lerp(p.mw,12,y); p.mo=y; p.mc=lerp(p.mc,0,y); p.brow+=.7*y; p.my+=7*y; p.mr+=6*y; p.tail+=4*y; }
  p.level=Math.max(.35,1-.12*ev.sips);
  return p;
}
function fall(u){ // bosteza, se le cierran los ojos y se le cae la cabeza
  var p=P(), y=bump(u,0,.5,1.15,1.7), d=ss(1.1,2.6,u);
  p.sy=1+.065*y; p.sx=1-.025*y; p.by=-6*y+4*d; p.rot=-4-3*y+10*d; p.squeeze=y>.45?1:0;
  p.mw=lerp(lerp(16,12,y),7,d); p.mo=Math.max(y,.5*d); p.mc=lerp(lerp(-.8,0,y),0,d);
  p.lid=lerp(.48,1,d); p.brow=.7*y-.3*d;
  p.mx=lerp(14,18,d); p.my=lerp(-12+7*y,-2,d); p.mr=lerp(6*y,12,d); p.steam=lerp(1,.6,d);
  p.bub=.5*ss(1.9,2.6,u); p.z=ss(1.6,2.6,u); p.cdx=2*d; p.crot=2*d; p.tail=4*d+4*y;
  p.level=Math.max(.35,1-.12*ev.sips);
  return p;
}
function sleep(u){
  var p=P(), b=Math.sin(2*Math.PI*u/3.2);
  p.by=4-2*b; p.rot=6+1.5*b; p.sx=1+.02*b; p.sy=1+.022*b; p.lid=1; p.brow=-.3;
  p.mw=7; p.mo=.5+.5*b; p.mc=0; p.bub=.5+.5*b; p.mx=18+2*b; p.my=-2+3*b; p.mr=12+4*b; p.steam=.6;
  p.cdx=2; p.crot=2+2*b; p.tail=4; p.z=1; p.level=Math.max(.35,1-.12*ev.sips);
  return p;
}
function wake(u){ // respingo, se bebe el café, celebra y vuelve a la pose neutra
  var p=P();
  var st=bump(u,.2,.32,.55,.8), lk=ss(.6,.9,u)*(1-ss(1.0,1.2,u)), dr=bump(u,1.0,1.35,2.4,2.75);
  var gulp=dr*Math.max(0,Math.sin(2*Math.PI*(u-1.35)/.5)), ch=bump(u,2.75,2.95,3.75,4.05);
  var hop=ch*Math.max(0,Math.sin(2*Math.PI*(u-2.85)/.45)), settle=ss(3.9,4.8,u), sl=1-ss(.2,.3,u);
  p.rot=lerp(6,-4,1-sl)-4*st-3*dr+2*Math.sin(2*Math.PI*(u-2.9)/.9)*ch;
  p.by=-10*st-24*hop+4*sl; p.sx=1-.03*st+.012*gulp-.02*hop; p.sy=1+.06*st-.02*gulp+.04*hop;
  if(u<.25){p.lid=1;p.mw=7;p.mo=.5;p.mc=0;p.bub=Math.max(0,.9-3.4*u);}
  else if(u<1.0){p.lid=0;p.mw=7;p.mo=.6;p.mc=0;}
  else if(u<3.9){p.lid=.05; if(u<1.35||u>=2.4){p.mw=lerp(10,20,ss(2.6,2.95,u));p.mo=.7*ss(2.6,2.95,u);p.mc=lerp(.2,1,ss(2.6,2.95,u));} else {p.mw=9;p.mo=0;p.mc=.4;p.happy=1;}}
  else {p.lid=lerp(.05,.48,settle);p.mw=lerp(20,16,settle);p.mo=lerp(.7,0,settle);p.mc=lerp(1,-.8,settle);}
  p.ly=3+6*lk; p.brow=1.3*st+.9*ch+.5*lk-.3*sl;
  var q=ss(.3,.9,u), mx=lerp(18,14,q), my=lerp(-2,-12,q), mr=lerp(12,0,q);
  mx=lerp(mx,42,dr); my=lerp(my,-30,dr)-5*gulp; mr=lerp(mr,-55,dr);
  p.mx=lerp(mx,70,ch); p.my=lerp(my,-120,ch); p.mr=lerp(mr,-10,ch);
  p.level=1-.7*ss(1.35,2.4,u)+.7*ss(4.2,4.8,u); p.steam=(u>=1.0&&u<2.75)?0:1;
  p.fist=ch; p.fy=-170+10*Math.sin(2*Math.PI*(u-2.9)/.45); p.spark=ch; p.z=1-ss(.2,.45,u);
  p.cdx=2*hop; p.crot=4*hop-3*dr; p.tail=8*hop;
  return p;
}
var DUR={fall:2.6,wake:4.8};

/* ---------- dibujar una pose ---------- */
var eyesL={cx:10,cy:-108,rx:19,ry:22}, eyesR={cx:58,cy:-106,rx:15,ry:19};
function eyeSet(e,k,p){
  var yl=e.cy-e.ry+2*e.ry*p.lid;
  A(E['p'+k],'cx',n1(e.cx+p.lx+3)); A(E['p'+k],'cy',n1(e.cy+p.ly+5));
  A(E['g'+k],'cx',n1(e.cx+p.lx+7)); A(E['g'+k],'cy',n1(e.cy+p.ly+1));
  A(E['lid'+k],'d','M'+(e.cx-e.rx-2)+','+(e.cy-e.ry-2)+' H'+(e.cx+e.rx+2)+' V'+n1(yl-4)+' Q'+e.cx+','+n1(yl+6)+' '+(e.cx-e.rx-2)+','+n1(yl+2)+'Z');
  A(E['edge'+k],'d','M'+(e.cx-e.rx-2)+','+n1(yl+2)+' Q'+e.cx+','+n1(yl+6)+' '+(e.cx+e.rx+2)+','+n1(yl-4));
}
function draw(p,now){
  T(E.body,'translate('+n1(BX+p.bx)+' '+n1(BY+p.by)+') rotate('+n1(p.rot)+') scale('+p.sx.toFixed(3)+' '+p.sy.toFixed(3)+')');
  T(E.coffee,'translate('+n1(p.cdx)+' 0) rotate('+n1(p.crot)+' 0 -158)');
  var closed=p.lid>=.9, face=(p.happy>.5||p.squeeze>.5);
  A(E.eyes,'opacity',(face||closed)?0:1); A(E.happy,'opacity',p.happy>.5?1:0); A(E.squeeze,'opacity',(p.squeeze>.5&&p.happy<=.5)?1:0);
  eyeSet(eyesL,'L',p); eyeSet(eyesR,'R',p); A(E.lash,'opacity',(closed&&!face)?1:0);
  var br=p.brow;
  A(E.browL,'d','M-12,'+n1(-138-9*br)+' Q8,'+n1(-146-11*br)+' 26,'+n1(-134-14*br));
  A(E.browR,'d','M44,'+n1(-133-14*br)+' Q58,'+n1(-142-11*br)+' 72,'+n1(-136-8*br));
  var cx=38, c0=-57, cyc=c0-6*p.mc, up=c0+7*p.mc-9*p.mo, lo=c0+7*p.mc+24*p.mo;
  A(E.mouth,'d','M'+n1(cx-p.mw)+','+n1(cyc)+' Q'+cx+','+n1(up)+' '+n1(cx+p.mw)+','+n1(cyc)+' Q'+cx+','+n1(lo)+' '+n1(cx-p.mw)+','+n1(cyc)+'Z');
  A(E.mouth,'fill-opacity',n1(clamp(p.mo*8)));
  A(E.tongue,'cx',cx); A(E.tongue,'cy',n1(c0+7*p.mc+15*p.mo)); A(E.tongue,'rx',n1(p.mw*.42)); A(E.tongue,'opacity',n1(clamp((p.mo-.45)*3)));
  if(p.bub>.04){A(E.bubg,'opacity',1);A(E.bub,'cx',n1(22+6*p.bub));A(E.bub,'cy',n1(-76+4*p.bub));A(E.bub,'r',n1(4+12*p.bub));A(E.bubh,'cx',n1(19+4*p.bub));A(E.bubh,'cy',-80);A(E.bubh,'r',n1(1.5+2*p.bub));}
  else A(E.bubg,'opacity',0);
  T(E.tail1,'rotate('+n1(p.tail)+' 30 -36)'); T(E.tail2,'rotate('+n1(p.tail*1.4)+' 36 -36)');
  // taza
  var M=[p.mx,p.my];
  T(E.mug,'translate('+n1(M[0])+' '+n1(M[1])+') rotate('+n1(p.mr)+') scale(1.5)');
  A(E.level,'rx',n1(16*p.level+2)); A(E.level,'opacity',p.level>.05?1:0);
  for(var i=0;i<3;i++){
    var ph=(now*.55+i/3)%1, sx=[-9,1,10][i]+3*Math.sin(now*2+i*2), sy=-34-22*ph;
    A(E['st'+i],'d','M'+n1(sx)+','+n1(sy)+' q-6,-6 0,-11 q6,-5 0,-11');
    A(E['st'+i],'opacity',n1(p.steam*Math.sin(Math.PI*ph)*.6));
  }
  // brazo trasero: sostiene la taza (o puño arriba)
  var shL=[-74,-86], shR=[76,-82], k=p.fist;
  var r6=p.mr*.6, supp=mpt(M,p.mr,[-8,25]);
  var eS=add(supp,rot([-36,8],r6)), c2S=add(eS,rot([-14,-16],r6)), c1S=[shL[0]+6,shL[1]+44];
  var F=[p.fx,p.fy], eF=[F[0],F[1]+16], c2F=[F[0]-14,F[1]+44], c1F=[shL[0]-34,shL[1]-12];
  var e=[lerp(eS[0],eF[0],k),lerp(eS[1],eF[1],k)], c1=[lerp(c1S[0],c1F[0],k),lerp(c1S[1],c1F[1],k)], c2=[lerp(c2S[0],c2F[0],k),lerp(c2S[1],c2F[1],k)];
  A(E.armB,'d',taper(shL,c1,c2,e,18,12.5));
  var hT='translate('+n1(supp[0])+' '+n1(supp[1])+') rotate('+n1(r6)+') scale(1.35)';
  T(E.cupH,hT); T(E.cupT,hT); A(E.cupH,'opacity',k<.5?1:0); A(E.cupT,'opacity',k<.5?1:0);
  T(E.fist,'translate('+n1(F[0])+' '+n1(F[1])+') rotate(-10) scale('+(1.4*(.7+.3*k)).toFixed(3)+')'); A(E.fist,'opacity',k>=.5?1:0);
  // brazo delantero: agarra el asa
  var g=mpt(M,p.mr,[31,0]), eG=add(g,rot([30,2],p.mr)), c2G=add(eG,rot([18,10],p.mr)), c1G=[shR[0]+26,shR[1]+20];
  A(E.armF,'d',taper(shR,c1G,c2G,eG,18,12.5));
  T(E.grip,'translate('+n1(g[0])+' '+n1(g[1])+') rotate('+n1(p.mr)+') scale(1.35)');
  // piernas siguen a las caderas
  var tr=function(pt){var q=rot([pt[0]*p.sx,pt[1]*p.sy],p.rot);return [BX+p.bx+q[0],BY+p.by+q[1]];};
  var hl=tr([-26,-6]), hr=tr([30,-6]);
  A(E.legL,'d','M'+n1(hl[0])+','+n1(hl[1])+' Q'+n1((hl[0]+173)/2-6)+','+n1((hl[1]+G-22)/2)+' 173,'+(G-22));
  A(E.legR,'d','M'+n1(hr[0])+','+n1(hr[1])+' Q'+n1((hr[0]+250)/2-6)+','+n1((hr[1]+G-22)/2)+' 250,'+(G-22));
  // Zzz y destellos
  for(i=0;i<3;i++){
    var kz=(now/6.4*3/3+i/3)%1, zx=BX+66+30*kz+6*Math.sin(kz*6), zy=BY-196-70*kz;
    T(E['z'+i],'translate('+n1(zx)+' '+n1(zy)+') scale('+(.7+.9*kz).toFixed(2)+')'); A(E['z'+i],'opacity',n1(p.z*bump(kz,0,.15,.6,1)));
  }
  var SP=[[-120,-200,0],[110,-215,.25],[-140,-110,.5],[135,-120,.75]];
  for(i=0;i<4;i++){
    var ks=(now/.9+SP[i][2])%1, sc=.5+.8*Math.sin(Math.PI*ks);
    T(E['s'+i],'translate('+(BX+SP[i][0])+' '+(BY+SP[i][1])+') scale('+sc.toFixed(2)+')'); A(E['s'+i],'opacity',n1(p.spark*Math.sin(Math.PI*ks)));
  }
}

/* ---------- máquina de estados ---------- */
var state='idle', t0=now0, from=null, fromT=0, cur=P(), lastAct=now0, raf=0, running=false;
function go(s,now,blend){ if(blend){from={};for(var k in cur)from[k]=cur[k];fromT=now;} else from=null; state=s; t0=now;
  if(s==='wake') ev.sips=0; }
function target(now){
  var u=now-t0;
  if(state==='idle') return idle(u,now);
  if(state==='fall'){ if(u>=DUR.fall){go('sleep',now,false);return sleep(0);} return fall(u); }
  if(state==='sleep') return sleep(u);
  if(state==='wake'){ if(u>=DUR.wake){go('idle',now,false);return idle(0,now);} return wake(u); }
}
function schedule(now){
  if(state!=='idle') return;
  if(now>ev.nextBlink){ ev.blink=now; ev.nextBlink=now+(rnd()<.2?.28:2+rnd()*4); }
  var busy=(now-ev.sip<2.8)||(now-ev.yawn<2.1);
  if(!busy&&now>ev.nextSip){ ev.sip=now; ev.sips++; ev.nextSip=now+9+rnd()*9; }
  else if(!busy&&now>ev.nextYawn){ ev.yawn=now; ev.nextYawn=now+20+rnd()*15; }
  if(now-lastAct>40) go('fall',now,true);
}
function frame(ms){
  var now=ms/1000; schedule(now);
  var t=target(now);
  // mirada: sigue al cursor si se mueve cerca; si no, mira alrededor de vez en cuando
  if(state==='idle'||state==='wake'){
    if(now-lastPtr>3&&now>nextWander){ lookT=[lerp(-3,6,rnd()),lerp(0,6,rnd())]; nextWander=now+1.5+rnd()*3; }
    look[0]+=(lookT[0]-look[0])*.35; look[1]+=(lookT[1]-look[1])*.35;
    if(state==='idle'){ t.lx=look[0]; t.ly=look[1]; }
    var bt=now-ev.blink; if(state==='idle'&&bt>=0&&bt<.16) t.lid=Math.max(t.lid,1-Math.abs(bt/.08-1));
  }
  if(from){ var w=easeOut((now-fromT)/.4); for(var k in t) if(typeof t[k]==='number') t[k]=lerp(from[k],t[k],w); if(w>=1) from=null; }
  cur=t; draw(t,now);
  if(running) raf=requestAnimationFrame(frame);
}
function start(){ if(running||REDUCE) return; running=true; raf=requestAnimationFrame(frame); }
function stop(){ running=false; cancelAnimationFrame(raf); }

/* ---------- interacción ---------- */
host.style.cursor='pointer'; host.setAttribute('tabindex','0'); host.setAttribute('role','button');
host.title='Toca la tacita: siesta o café'; host.setAttribute('aria-label','Tacita: tócala para que se duerma o se despierte');
function poke(e){
  if(!swapped) return;
  var now=performance.now()/1000; lastAct=now;
  if(REDUCE){ var sl=state!=='sleep'; state=sl?'sleep':'idle'; draw(sl?sleep(0):idle(0,now),now); return; }
  if(state==='idle') go('fall',now,true);
  else if(state==='sleep'||state==='fall') go('wake',now,true);
}
host.addEventListener('click',function(e){e.stopPropagation();poke(e);});
host.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();poke(e);}});
['pointerdown','keydown','scroll','wheel','touchstart'].forEach(function(n){
  addEventListener(n,function(e){ if(host.contains(e.target)) return; var now=performance.now()/1000; lastAct=now;
    if(state==='sleep'||state==='fall') go('wake',now,true); },{passive:true});
});
addEventListener('pointermove',function(e){
  var r=svg.getBoundingClientRect(); if(!r.width) return;
  var cx=r.left+r.width*.48, cy=r.top+r.height*.36, dx=(e.clientX-cx)/Math.max(220,r.width*2), dy=(e.clientY-cy)/Math.max(220,r.height*2);
  lookT=[2+clamp(dx,-1,1)*6, 3+clamp(dy,-1,1)*5]; lastPtr=performance.now()/1000;
},{passive:true});
document.addEventListener('visibilitychange',function(){
  var now=performance.now()/1000;
  if(document.hidden){ stop(); if(state!=='sleep'){state='sleep';t0=now;from=null;} }
  else start();
});
if('IntersectionObserver' in window){ new IntersectionObserver(function(es){ es.forEach(function(x){ x.isIntersecting&&!document.hidden?start():stop(); }); }).observe(svg); }
draw(idle(0,now0),now0);
if(swapped) start();
else { var go1=function(){ swapToLive(); var n=performance.now()/1000; t0=n; ev.nextBlink=n+1.2; ev.nextSip=n+5+rnd()*3; ev.nextYawn=n+16+rnd()*8; lastAct=n; start(); };
  var tm=setTimeout(go1,2400); host.addEventListener('click',function first(e){ e.stopImmediatePropagation(); clearTimeout(tm); host.removeEventListener('click',first,true); if(!swapped) go1(); },true); }
})();
