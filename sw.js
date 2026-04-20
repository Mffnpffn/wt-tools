const CACHE='wt-tools-v2';
const ASSETS=[
'home.html','index.html','br-calc.html','ammo-picker.html','kos-tracker.html',
'repair-cost.html','vehicle-comparer.html','spawn-points.html','pen-calculator.html',
'crew-skills.html','premium-rp.html','mission-tracker.html','tier-list.html',
'lineup-builder.html','wishlist.html','grind-planner.html','stat-tracker.html',
'bomb-drop.html','talisman.html','air-spawn.html',
'shared.css','shared.js','manifest.json','icon.svg'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))
});
