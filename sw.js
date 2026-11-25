// V27 logo: network-first navigation; no fallback to a different page or older version.
const CACHE='vm-batch-270-'+self.registration.scope;
self.addEventListener('install',e=>e.waitUntil(self.skipWaiting()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys()){if(/^vm-batch-\d+-/.test(k)&&k.endsWith(self.registration.scope)&&k!==CACHE)await caches.delete(k)}await self.clients.claim()})()));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!r.url.startsWith(self.registration.scope))return;
if(r.mode==='navigate'){e.respondWith((async()=>{try{return await fetch(r,{cache:'no-store'})}catch(err){return new Response('Không có mạng. Mở lại VM Batch V27 khi có mạng.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}})}})());return;}
});
