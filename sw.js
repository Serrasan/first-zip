/* First Sip · service worker: funciona sin conexión y se actualiza solo */
const VERSION='firstsip-v6';
const CORE=["./", "index.html", "tacita.js", "tacita-idle.svg", "tacita-sleep.svg", "tacita-wake.svg", "logo.svg", "logo.jpg", "horario.jpg", "competiciones.ics", "manifest.webmanifest", "icons/icon-maskable-512.png", "icons/icon-192.png", "icons/apple-touch-icon.png", "icons/favicon-32.png", "icons/icon-512.png", "img/022dc6c09cfed6fe32fe77f964c2aa2b.jpg", "img/025c1656e6ef470762929f176d2d891e.jpg", "img/07a83f558597c420d1e30fcd9ab24233.jpg", "img/097d2db7a14cbe04c07fbfa8732f1ce8.jpg", "img/09f3eda7fee8bd15a03f227bc61ac1c6.jpg", "img/0ad0959adf6d4dfa80c92ce148205885.jpg", "img/0fa7e7c65177baa5c55a29c2ddaaafc6.jpg", "img/0fbed57bc21f7adb7c6cfb3129b3a6d7.jpg", "img/13ca1b9015231898635cfd30f38badae.jpg", "img/29c92ad335d4c559fa4863661653d418.jpg", "img/2e4ec7df9cac0044ca116efecd920cb6.jpg", "img/36fccdf3987ce8b9f10a7df379c74fe2.jpg", "img/4ce92ded813a5513c50db8f23a967e4d.jpg", "img/51a46ecdae799888468a7220c3f59284.jpg", "img/57ff22c36687249819e8582c85ae6032.jpg", "img/5eed0356219f1b7969a23b10bbd5b9bd.jpg", "img/60a0bb11c630fb68f341e25a882ae0a4.jpg", "img/665d22fc66c3e6c4b67c14c3d745fe80.jpg", "img/6ace36c15c0f044fd2bd929d92e0722e.jpg", "img/78a2f955007d8fe9bc947d2eacdd95ec.jpg", "img/7c627ca7b4dee4f77863f80b4c97978a.jpg", "img/8413e5a58e35cfd852451f180ce2c7ae.jpg", "img/8af3a9703a23ce18c67e4495da08926b.jpg", "img/8b146a66aa6c9b0939f17a4d886d06af.jpg", "img/979d79b78aa4580ff2d71e144772fb9d.jpg", "img/99222c7458a7ea41f6523ea67fb63885.jpg", "img/99fee75c7e854ac18bce33c824912c73.jpg", "img/a520184558ae48d7383b30b3a6b9f498.jpg", "img/b32f05b5788f63e8dd00c7a3ff22a53d.jpg", "img/bd43a92245c4127349e8540e4684c9c1.jpg", "img/ce9d2e89b4532b613472c0f83b544867.jpg", "img/d5d224d847f63b371f7912ce39a04526.jpg", "img/dbd5f191fe10382f1f562a8e64de96bc.jpg", "img/dc428169ac64d13262ed27c27d30a6ea.jpg", "img/e1d667026b26c50f200e32c9a08ee362.jpg", "img/e5e22e719f2196380656dedac152796d.jpg", "img/ede8d5c9242cb9c4be59e8627633957e.jpg", "img/ee9c46eff376c159d4d7cf04d67799fa.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET') return;
  const url=new URL(req.url);
  // la página: primero la red (para ver cambios), si no hay conexión la guardada
  if(req.mode==='navigate'){
    e.respondWith(fetch(req).then(r=>{const c=r.clone();caches.open(VERSION).then(x=>x.put('./',c));return r;}).catch(()=>caches.match('./').then(r=>r||caches.match('index.html'))));
    return;
  }
  // fuentes de Google y archivos propios: la copia guardada al instante y se actualiza por detrás
  if(url.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)){
    e.respondWith(caches.open(VERSION).then(c=>c.match(req,{ignoreSearch:url.origin===location.origin&&/\.svg$/.test(url.pathname)}).then(hit=>{
      const net=fetch(req).then(r=>{if(r&&(r.ok||r.type==='opaque'))c.put(req,r.clone());return r;}).catch(()=>hit);
      return hit||net;
    })));
  }
});
