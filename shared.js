/* WT Tools Shared — Navbar, Theme Switcher, Scroll-to-top, PWA */
(function(){
const TOOLS=[
{href:"home.html",label:"Home",icon:"🏠"},
{href:"index.html",label:"Bomb Calc",icon:"💣"},
{href:"br-calc.html",label:"BR Calc",icon:"⚔️"},
{href:"ammo-picker.html",label:"Ammo",icon:"🔫"},
{href:"kos-tracker.html",label:"KOS",icon:"🎯"},
{href:"repair-cost.html",label:"Repair",icon:"🔧"},
{href:"vehicle-comparer.html",label:"Compare",icon:"⚖️"},
{href:"spawn-points.html",label:"Spawn SP",icon:"🎮"},
{href:"pen-calculator.html",label:"Pen Calc",icon:"🎯"},
{href:"crew-skills.html",label:"Crew",icon:"👨‍✈️"},
{href:"premium-rp.html",label:"RP Calc",icon:"💎"},
{href:"mission-tracker.html",label:"Missions",icon:"📊"},
{href:"tier-list.html",label:"Tier List",icon:"🏆"},
{href:"lineup-builder.html",label:"Lineup",icon:"🎖️"},
{href:"wishlist.html",label:"Wishlist",icon:"📋"},
{href:"grind-planner.html",label:"Grind",icon:"📈"},
{href:"stat-tracker.html",label:"Stats",icon:"📊"},
{href:"bomb-drop.html",label:"Bomb Drop",icon:"🎯"},
{href:"talisman.html",label:"Talisman",icon:"💎"},
{href:"air-spawn.html",label:"Air Spawn",icon:"✈️"}
];

const NATIONS=[
{id:"USSR",flag:"🇷🇺",label:"USSR",header:"СОВЕТСКИЕ ИНСТРУМЕНТЫ",tagline:"Soviet Engineering"},
{id:"USA",flag:"🇺🇸",label:"USA",header:"WT TOOLS",tagline:"American Firepower"},
{id:"Germany",flag:"🇩🇪",label:"Germany",header:"KRIEGSWERKZEUGE",tagline:"German Precision"},
{id:"Britain",flag:"🇬🇧",label:"Britain",header:"WT TOOLS",tagline:"British Reliability"},
{id:"Japan",flag:"🇯🇵",label:"Japan",header:"戦争ツール",tagline:"Japanese Craftsmanship"},
{id:"France",flag:"🇫🇷",label:"France",header:"WT TOOLS",tagline:"French Ingenuity"},
{id:"Italy",flag:"🇮🇹",label:"Italy",header:"WT TOOLS",tagline:"Italian Artistry"},
{id:"Sweden",flag:"🇸🇪",label:"Sweden",header:"WT TOOLS",tagline:"Swedish Innovation"},
{id:"Israel",flag:"🇮🇱",label:"Israel",header:"WT TOOLS",tagline:"Israeli Technology"},
{id:"China",flag:"🇨🇳",label:"China",header:"战争雷霆工具",tagline:"Chinese Industry"}
];

const currentPage=location.pathname.split("/").pop()||"home.html";

// ===== BUILD NAVBAR =====
const nav=document.createElement("nav");
nav.className="wt-navbar";
const links=TOOLS.map(t=>{
const active=currentPage===t.href?" active":"";
return`<a class="wt-nav-link${active}" href="${t.href}">${t.label}</a>`;
}).join("");
const themeOpts=NATIONS.map(n=>
`<div class="wt-theme-opt" data-nation="${n.id}" onclick="wtSetNation('${n.id}')"><span class="tf">${n.flag}</span>${n.label}</div>`
).join("");
nav.innerHTML=`<div class="wt-nav-inner">
<a class="wt-nav-brand" href="home.html">☭ <span>WT TOOLS</span></a>
<div class="wt-nav-scroll">${links}</div>
<div class="wt-nav-theme">
<button class="wt-theme-btn" onclick="document.querySelector('.wt-theme-dd').classList.toggle('open')" title="Nation Theme">🏳️</button>
<div class="wt-theme-dd" id="wtThemeDD">${themeOpts}</div>
</div>
</div>`;
document.body.prepend(nav);

// Close theme dropdown on outside click
document.addEventListener("click",e=>{
if(!e.target.closest(".wt-nav-theme")){
const dd=document.getElementById("wtThemeDD");
if(dd)dd.classList.remove("open");
}
});

// ===== FLAG BACKGROUND =====
const flagBg=document.createElement("div");
flagBg.className="wt-flag-bg";
flagBg.id="wtFlagBg";
document.body.prepend(flagBg);

// ===== SCROLL TO TOP =====
const stt=document.createElement("button");
stt.className="wt-scroll-top";
stt.innerHTML="↑";
stt.onclick=()=>window.scrollTo({top:0,behavior:"smooth"});
document.body.appendChild(stt);
window.addEventListener("scroll",()=>{
stt.classList.toggle("show",window.scrollY>300);
});

// ===== THEME ENGINE =====
window.wtSetNation=function(nationId){
const nation=NATIONS.find(n=>n.id===nationId);
if(!nation)return;
document.documentElement.setAttribute("data-nation",nationId);
localStorage.setItem("wt_nation_theme",nationId);

// Update flag background
const fb=document.getElementById("wtFlagBg");
if(fb)fb.textContent=nation.flag;

// Update navbar brand
const brand=document.querySelector(".wt-nav-brand");
if(brand){
const isHome=currentPage==="home.html";
brand.innerHTML=nation.flag+' <span>'+nation.header+'</span>';
}

// Update theme button
const btn=document.querySelector(".wt-theme-btn");
if(btn)btn.textContent=nation.flag;

// Update header if exists
const h1=document.querySelector("header h1");
const headerP=document.querySelector("header p");
if(h1&&currentPage==="home.html"){
h1.textContent=nation.header;
}
if(headerP&&currentPage==="home.html"){
const originalSub=headerP.getAttribute("data-original");
if(!originalSub)headerP.setAttribute("data-original",headerP.textContent);
// Only change tagline on home
headerP.textContent=nation.tagline.toUpperCase();
}

// Highlight active theme option
document.querySelectorAll(".wt-theme-opt").forEach(o=>{
o.classList.toggle("active",o.dataset.nation===nationId);
});

// Close dropdown
const dd=document.getElementById("wtThemeDD");
if(dd)dd.classList.remove("open");
};

// Load saved theme
const savedNation=localStorage.getItem("wt_nation_theme")||"USSR";
wtSetNation(savedNation);

// ===== PWA REGISTRATION =====
if("serviceWorker" in navigator){
navigator.serviceWorker.register("sw.js").catch(()=>{});
}

// ===== FUZZY SEARCH =====
function wtLevenshtein(a,b){
const m=a.length,n=b.length;
if(!m)return n;if(!n)return m;
const d=[];
for(let i=0;i<=m;i++){d[i]=[i]}
for(let j=0;j<=n;j++){d[0][j]=j}
for(let i=1;i<=m;i++){
for(let j=1;j<=n;j++){
d[i][j]=a[i-1]===b[j-1]?d[i-1][j-1]:Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+1);
}}
return d[m][n];
}
window.wtFuzzyMatch=function(query,name){
const q=query.toLowerCase(),n=name.toLowerCase();
if(n.includes(q))return{match:true,score:0};
if(q.length<3)return{match:false,score:99};
const dist=wtLevenshtein(q,n.slice(0,q.length+2));
return{match:dist<=2,score:dist};
};
window.wtFuzzySuggest=function(query,items,nameKey){
if(!query||query.length<3||!items.length)return null;
const q=query.toLowerCase();
// Check if there are exact results first
if(items.some(i=>(nameKey?i[nameKey]:i).toLowerCase().includes(q)))return null;
// Find best fuzzy match
let best=null,bestScore=99;
items.forEach(i=>{
const name=nameKey?i[nameKey]:i;
const r=wtFuzzyMatch(q,name);
if(r.match&&r.score<bestScore){bestScore=r.score;best=name}
});
return best;
};

// ===== RECENT VEHICLES =====
window.wtGetRecent=function(){try{return JSON.parse(localStorage.getItem("wt_recent_vehicles")||"[]")}catch(e){return[]}};
window.wtAddRecent=function(name){
if(!name)return;
let r=wtGetRecent().filter(n=>n!==name);
r.unshift(name);
if(r.length>8)r=r.slice(0,8);
localStorage.setItem("wt_recent_vehicles",JSON.stringify(r));
wtRenderRecentChips();
};

// ===== FAVOURITE VEHICLES =====
window.wtGetFavs=function(){try{return JSON.parse(localStorage.getItem("wt_fav_vehicles")||"[]")}catch(e){return[]}};
window.wtToggleFav=function(name){
let f=wtGetFavs();
if(f.includes(name))f=f.filter(n=>n!==name);else{f.push(name);if(f.length>20)f=f.slice(-20)}
localStorage.setItem("wt_fav_vehicles",JSON.stringify(f));
// Update all visible stars
document.querySelectorAll('.wt-fav-star').forEach(s=>{
s.classList.toggle('active',f.includes(s.dataset.name));
});
return f.includes(name);
};
window.wtIsFav=function(name){return wtGetFavs().includes(name)};

// ===== RENDER RECENT CHIPS =====
window.wtRenderRecentChips=function(){
document.querySelectorAll(".wt-recent-bar").forEach(bar=>{
const recent=wtGetRecent();
if(!recent.length){bar.innerHTML="";return}
bar.innerHTML='<span class="wt-recent-label">Recent:</span>'+recent.map(n=>
`<span class="wt-recent-chip" data-name="${n.replace(/"/g,'&quot;')}">${n}</span>`
).join("");
bar.querySelectorAll(".wt-recent-chip").forEach(chip=>{
chip.addEventListener("click",()=>{
const inp=bar.closest(".search-box,.pick")?.querySelector("input[type='text']");
if(inp){inp.value=chip.dataset.name;inp.dispatchEvent(new Event("input"));
// Try to trigger selection after dropdown renders
setTimeout(()=>{const item=bar.closest(".search-box,.pick")?.querySelector(".dd-item,.dd-item");if(item)item.click()},100)}
});
});
});
};

// ===== AUTO-ENHANCE SEARCH BOXES =====
function wtEnhanceSearchBoxes(){
document.querySelectorAll(".search-box,.pick").forEach(box=>{
if(box.dataset.wtEnhanced)return;
box.dataset.wtEnhanced="1";
// Add recent chips container
if(!box.querySelector(".wt-recent-bar")){
const bar=document.createElement("div");
bar.className="wt-recent-bar";
box.appendChild(bar);
}
});
wtRenderRecentChips();
}

// ===== ENHANCE DROPDOWN ITEMS WITH FAV STARS =====
const ddObserver=new MutationObserver(mutations=>{
mutations.forEach(m=>{
m.addedNodes.forEach(node=>{
if(node.nodeType!==1)return;
const items=node.classList?.contains("dd-item")?[node]:node.querySelectorAll?.(".dd-item")||[];
items.forEach(item=>{
if(item.querySelector(".wt-fav-star"))return;
// Get vehicle name from the item
const nameEl=item.querySelector(".dd-name")||item.querySelector(".dd-name,.vi-name");
if(!nameEl)return;
const name=nameEl.textContent.trim();
const star=document.createElement("span");
star.className="wt-fav-star"+(wtIsFav(name)?" active":"");
star.textContent="★";
star.dataset.name=name;
star.title="Favourite";
star.addEventListener("click",e=>{
e.stopPropagation();e.preventDefault();
const isNow=wtToggleFav(name);
star.classList.toggle("active",isNow);
wtShowCopied(isNow?"★ Added to favourites":"Removed from favourites");
});
item.style.position="relative";
item.appendChild(star);
});
// Also check for fuzzy suggest
const dd=node.closest?.(".dd,.dropdown")||node;
if(dd.classList?.contains("dd")||dd.classList?.contains("dropdown")){
const box=dd.closest(".search-box,.pick");
if(box){
const inp=box.querySelector("input[type='text']");
const q=inp?.value?.trim();
if(q&&q.length>=3&&!dd.querySelector(".dd-item:not(.wt-fuzzy-suggest)")){
// No results — try fuzzy suggest
const allNames=[];
document.querySelectorAll("[data-nation],.dd-item").forEach(el=>{
const n=el.querySelector?.(".dd-name");if(n)allNames.push(n.textContent.trim());
});
}
}
}
});
});
});
ddObserver.observe(document.body,{childList:true,subtree:true});

// ===== COPY TO CLIPBOARD =====
window.wtShowCopied=function(msg){
const old=document.querySelector(".wt-copied");if(old)old.remove();
const el=document.createElement("div");el.className="wt-copied";el.textContent=msg||"Copied!";
document.body.appendChild(el);setTimeout(()=>el.remove(),1200);
};
function wtSetupCopyable(){
// Make stat values copyable
document.querySelectorAll(".stat-val,.sg .val,.rg .val,.rcard .val,.dc .val,.cc-row .v,.cs b,.lv-sp-val,.lv-br,.match-rp,.nc-kd,.vi-kd,.goal-val,.wl-cost b,.mod-rp,.al-br,.result-main,.result-text,.ammo-stat .val,.tv-br,.tv-rp,.compare-table td,.cr-val").forEach(el=>{
if(el.dataset.wtCopy)return;
el.dataset.wtCopy="1";
el.classList.add("wt-copy-wrap");
el.title="Click to copy";
el.addEventListener("click",e=>{
if(e.target.closest("input,select,button,.wt-fav-star,.mod-cb,.lv-del,.match-del,.vi-del,.snap-del,.wl-del,.tv-input"))return;
const text=el.textContent.trim();
navigator.clipboard.writeText(text).then(()=>wtShowCopied("Copied: "+text)).catch(()=>{});
});
});
}

// ===== TOOLTIPS =====
function wtSetupTooltips(){
const tips={
"PEN @ 0°":"Flat penetration — how much armour this shell goes through when hitting at a perfect 90° angle",
"PEN @ 60°":"Angled penetration — penetration when the shell hits armour sloped at 60 degrees",
"VELOCITY":"Shell muzzle velocity in metres per second — faster shells are easier to aim at range",
"FILLER":"Explosive filler mass — more filler means bigger post-penetration damage inside the tank",
"DAMAGE TYPE":"Whether the shell does kinetic (solid) or chemical (explosive) damage",
"TNT EQUIVALENT":"How much TNT the explosive content is equivalent to in kilograms",
"LETHAL RADIUS":"Distance from detonation where targets are destroyed outright",
"DAMAGE RADIUS":"Distance from detonation where targets take significant damage",
"BATTLE RATING":"Vehicle's matchmaking rating — determines what enemies you face (±1.0 BR spread)",
"K/D RATIO":"Kill to death ratio — above 1.0 means you get more kills than deaths on average",
"WIN RATE":"Percentage of matches won — 50%+ means you win more than you lose",
"REPAIR":"Silver Lions needed to repair if destroyed — paid automatically after each death",
"CREW TRAINING":"One-time SL cost to assign this vehicle to a crew slot",
"EXPERT CREW":"SL cost for +3 to all crew skills on this vehicle's crew slot",
"ACE CREW":"Golden Eagles cost for maximum crew skills — or grind with lots of RP",
"SPAWN":"Spawn points needed to deploy this vehicle in battle",
"1ST SPAWN":"Spawn point cost for your first deployment of this vehicle",
"RESPAWN":"Spawn point cost for subsequent deployments after the first",
"MAX SPAWNS":"Maximum times you can spawn this vehicle with starting spawn points",
"MATCHES":"Estimated number of matches needed based on your average RP per match",
"TOTAL RP":"Total Research Points needed to unlock this vehicle",
"TOTAL SL":"Total Silver Lions needed to purchase after researching",
"NORMALISATION":"Degrees the shell turns toward the armour normal on impact — reduces effective angle",
"EFFECTIVE ARMOUR":"Actual armour thickness the shell must penetrate after accounting for angle",
"OVERMATCH":"Ratio of shell calibre to armour thickness — high overmatch reduces ricochet chance",
"LINEUP BR":"Highest BR vehicle in your lineup — this determines your matchmaking",
"BR SPREAD":"Difference between highest and lowest BR in your lineup",
"FREE REPAIR":"Hours to repair for free without spending SL — just wait it out",
"DROP DISTANCE":"How far before the target you need to release the bomb",
"TIME OF FLIGHT":"Seconds the bomb takes to fall from release to impact",
"IMPACT SPEED":"Speed of the bomb when it hits the ground",
"SPAWN ALT":"Altitude in metres where you start the match with an air spawn",
"TALISMAN COST":"Golden Eagles price to add a talisman — doubles RP earned on this vehicle"
};
document.querySelectorAll(".stat-label,.sg .lbl,.rg .lbl,.rcard .lbl,.dc .lbl,.ammo-stat .label,.lv-stat .lb,.brc-label,.cc-row .k,.cb-row .k,.compare-table td:first-child,.cp-stat .k,.rs .lb").forEach(el=>{
if(el.dataset.tip)return;
const text=el.textContent.trim().toUpperCase();
const tip=tips[text];
if(tip)el.setAttribute("data-tip",tip);
});
}

// ===== SHAREABLE URLs =====
window.wtGetURLParam=function(key){
return new URLSearchParams(location.search).get(key);
};
window.wtSetURLParam=function(key,value){
const url=new URL(location.href);
url.searchParams.set(key,value);
history.replaceState(null,"",url.toString());
wtUpdateShareBtn();
};
function wtUpdateShareBtn(){
const btn=document.getElementById("wtShareBtn");
if(!btn)return;
const hasParams=location.search.length>1;
btn.classList.toggle("show",hasParams);
}
// Share button
const shareBtn=document.createElement("button");
shareBtn.className="wt-share-btn";
shareBtn.id="wtShareBtn";
shareBtn.innerHTML="🔗";
shareBtn.title="Copy shareable link";
shareBtn.onclick=()=>{
navigator.clipboard.writeText(location.href).then(()=>wtShowCopied("Link copied to clipboard!")).catch(()=>{});
};
document.body.appendChild(shareBtn);

// Auto-load vehicle from URL on pages with search inputs
function wtAutoLoadFromURL(){
const vehicle=wtGetURLParam("vehicle");
if(!vehicle)return;
setTimeout(()=>{
const inputs=document.querySelectorAll("#searchInput,#vehSearch,[id*='search'],[id*='Search']");
inputs.forEach(inp=>{
if(!inp||inp.value)return;
inp.value=vehicle;
inp.dispatchEvent(new Event("input"));
inp.dispatchEvent(new Event("change"));
// Try clicking first dropdown result after a delay
setTimeout(()=>{
const item=inp.closest(".search-box,.pick")?.querySelector(".dd-item,.dd-item");
if(item)item.click();
},200);
});
},300);
}
wtAutoLoadFromURL();

// ===== HOOK INTO VEHICLE SELECTION =====
// Override or wrap existing selection to track recents + update URL
const origAddEventListener=EventTarget.prototype.addEventListener;
document.addEventListener("click",e=>{
const item=e.target.closest(".dd-item");
if(!item)return;
const nameEl=item.querySelector(".dd-name");
if(nameEl){
const name=nameEl.textContent.trim();
wtAddRecent(name);
wtSetURLParam("vehicle",name);
}
},true);

// ===== PERIODIC ENHANCEMENT =====
// Re-run enhancements periodically to catch dynamically created elements
function wtEnhanceAll(){
wtEnhanceSearchBoxes();
wtSetupCopyable();
wtSetupTooltips();
}
wtEnhanceAll();
setInterval(wtEnhanceAll,2000);

})();
