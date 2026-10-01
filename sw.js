const VERSION='7a1e71fb850c31d2';
const BASE=new URL('./',self.location.href);
const PREFIX='quinua-ruta-'+encodeURIComponent(BASE.pathname)+'-';
const CACHE=PREFIX+VERSION;
const FILES=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./favicon.svg','./icon-192.png','./icon-512.png'].map(p=>new URL(p,BASE).href);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname))return;
 if(request.mode==='navigate'){
  event.respondWith(fetch(request).then(response=>{
   if(response.ok&&response.headers.get('content-type')?.includes('text/html')&&!response.redirected){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(BASE.href,copy)));}
   return response;
  }).catch(()=>caches.open(CACHE).then(cache=>cache.match(BASE.href))));
 }else event.respondWith(caches.open(CACHE).then(cache=>cache.match(request)).then(cached=>cached||fetch(request)));
});
