const CACHE='learner16-v1';
const APP_SHELL=[
  './','./index.html','./manifest.webmanifest',
  './css/themes.css','./css/main.css','./css/responsive.css',
  './js/app.js','./js/router.js','./js/storage.js','./js/learning.js','./js/library.js',
  './js/labs.js','./js/analytics.js','./js/ai.js','./js/quiz.js','./js/projects.js','./js/knowledge-map.js',
  './data/courses.json','./data/books.json','./data/labs.json','./data/challenges.json','./data/projects.json','./data/skills.json',
  './assets/icon-192.svg','./assets/icon-512.svg'
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;
  event.respondWith(caches.match(event.request).then(cached=>{
    const network=fetch(event.request).then(response=>{
      if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}
      return response;
    }).catch(()=>cached||new Response('Offline',{status:503,statusText:'Offline'}));
    return cached||network;
  }));
});
