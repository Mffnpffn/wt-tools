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

// Emoji flags — perfect on every device, no downloads needed
const SVG_FLAGS={USSR:"🇷🇺",USA:"🇺🇸",Germany:"🇩🇪",Britain:"🇬🇧",Japan:"🇯🇵",France:"🇫🇷",Italy:"🇮🇹",Sweden:"🇸🇪",Israel:"🇮🇱",China:"🇨🇳"};
const NATIONS=[
{id:"USSR",flag:SVG_FLAGS.USSR,label:"USSR",header:"СОВЕТСКИЕ ИНСТРУМЕНТЫ",sub:"SOVIET ORDNANCE TOOLS",tagline:"Soviet Engineering"},
{id:"USA",flag:SVG_FLAGS.USA,label:"USA",header:"WT TOOLS",sub:"AMERICAN ORDNANCE SUITE",tagline:"American Firepower"},
{id:"Germany",flag:SVG_FLAGS.Germany,label:"Germany",header:"KRIEGSWERKZEUGE",sub:"DEUTSCHE PRÄZISIONSWERKZEUGE",tagline:"German Precision"},
{id:"Britain",flag:SVG_FLAGS.Britain,label:"Britain",header:"WT TOOLS",sub:"BRITISH ENGINEERING TOOLKIT",tagline:"British Reliability"},
{id:"Japan",flag:SVG_FLAGS.Japan,label:"Japan",header:"戦争ツール",sub:"日本の精密ツール",tagline:"Japanese Craftsmanship"},
{id:"France",flag:SVG_FLAGS.France,label:"France",header:"WT TOOLS",sub:"OUTILS DE GUERRE FRANÇAIS",tagline:"French Ingenuity"},
{id:"Italy",flag:SVG_FLAGS.Italy,label:"Italy",header:"WT TOOLS",sub:"STRUMENTI DI GUERRA ITALIANI",tagline:"Italian Artistry"},
{id:"Sweden",flag:SVG_FLAGS.Sweden,label:"Sweden",header:"WT TOOLS",sub:"SVENSKA KRIGSVERKTYG",tagline:"Swedish Innovation"},
{id:"Israel",flag:SVG_FLAGS.Israel,label:"Israel",header:"WT TOOLS",sub:"כלי מלחמה ישראליים",tagline:"Israeli Technology"},
{id:"China",flag:SVG_FLAGS.China,label:"China",header:"战争雷霆工具",sub:"中国战争工具套件",tagline:"Chinese Industry"}
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
const initFlag=SVG_FLAGS[localStorage.getItem("wt_nation_theme")||"USSR"]||SVG_FLAGS.USSR;
nav.innerHTML=`<div class="wt-nav-inner">
<a class="wt-nav-brand" href="home.html"><span id="wtBrandFlag">${initFlag}</span> <span>WT TOOLS</span></a>
<div class="wt-nav-scroll">${links}</div>
<div class="wt-nav-theme">
<button class="wt-theme-btn" onclick="document.querySelector('.wt-theme-dd').classList.toggle('open')" title="Nation Theme"><span id="wtThemeFlag">${initFlag}</span></button>
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

// ===== FLAG BACKGROUND (emoji) =====
const flagBg=document.createElement("div");
flagBg.className="wt-flag-bg";
flagBg.id="wtFlagBg";
flagBg.textContent=SVG_FLAGS[localStorage.getItem("wt_nation_theme")||"USSR"]||"🇷🇺";
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

// Update flag background emoji
const fb=document.getElementById("wtFlagBg");
if(fb)fb.textContent=nation.flag;

// Update navbar brand flag + text
const brandFlag=document.getElementById("wtBrandFlag");
if(brandFlag)brandFlag.textContent=nation.flag;
const brandText=document.querySelector(".wt-nav-brand span:last-child");
if(brandText)brandText.textContent=nation.header;

// Update theme picker flag
const themeFlag=document.getElementById("wtThemeFlag");
if(themeFlag)themeFlag.textContent=nation.flag;

// Update ALL header text on every page
const h1=document.querySelector("header h1");
const headerP=document.querySelector("header p");
const headerStars=document.querySelector("header .stars, header .star");
if(h1){
// Store original text on first call
if(!h1.dataset.orig)h1.dataset.orig=h1.textContent;
if(currentPage==="home.html"){
h1.textContent=nation.header;
}else{
// On tool pages, show nation-localised tool name
const origText=h1.dataset.orig;
h1.textContent=origText; // keep tool name but colours change via CSS
}
}
if(headerP){
if(!headerP.dataset.orig)headerP.dataset.orig=headerP.textContent;
if(currentPage==="home.html"){
headerP.textContent=nation.tagline.toUpperCase();
}else{
headerP.textContent=nation.sub||nation.tagline.toUpperCase();
}
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

// ===== SETTINGS BUTTON IN NAVBAR =====
const settingsBtn=document.createElement("button");
settingsBtn.className="wt-settings-btn";
settingsBtn.textContent="⚙";
settingsBtn.title="Settings";
settingsBtn.onclick=()=>wtOpenSettings();
document.querySelector(".wt-nav-inner")?.appendChild(settingsBtn);

// ===== SETTINGS OVERLAY =====
const settingsOverlay=document.createElement("div");
settingsOverlay.className="wt-settings-overlay";
settingsOverlay.id="wtSettingsOverlay";
settingsOverlay.onclick=e=>{if(e.target===settingsOverlay)wtCloseSettings()};
document.body.appendChild(settingsOverlay);

function wtGetSettings(){
try{return JSON.parse(localStorage.getItem("wt_settings")||"{}")}catch(e){return{}}
}
function wtSaveSettings(s){localStorage.setItem("wt_settings",JSON.stringify(s))}

const TOOL_LIST=[
{href:"index.html",label:"Bomb Damage Calculator"},
{href:"br-calc.html",label:"BR Calculator"},
{href:"ammo-picker.html",label:"Ammo Picker"},
{href:"kos-tracker.html",label:"KOS Tracker"},
{href:"repair-cost.html",label:"Repair Cost Calculator"},
{href:"vehicle-comparer.html",label:"Vehicle Comparer"},
{href:"spawn-points.html",label:"Spawn Point Calculator"},
{href:"pen-calculator.html",label:"Penetration Calculator"},
{href:"crew-skills.html",label:"Crew Skill Calculator"},
{href:"premium-rp.html",label:"Premium RP Calculator"},
{href:"mission-tracker.html",label:"Mission Tracker"},
{href:"tier-list.html",label:"Nation Tier List"},
{href:"lineup-builder.html",label:"Lineup Builder"},
{href:"wishlist.html",label:"Wishlist & Mod Tracker"},
{href:"grind-planner.html",label:"Grind Planner"},
{href:"stat-tracker.html",label:"Stat Tracker"},
{href:"bomb-drop.html",label:"Bomb Drop Calculator"},
{href:"talisman.html",label:"Talisman Calculator"},
{href:"air-spawn.html",label:"Air Spawn Calculator"}
];

window.wtOpenSettings=function(){
const s=wtGetSettings();
const mode=s.mode||"advanced";
const cb=s.colorblind||false;
const hidden=s.hiddenTools||[];
settingsOverlay.innerHTML=`<div class="wt-settings-box">
<div class="wt-settings-title"><span>⚙ Settings</span><span class="wt-settings-close" onclick="wtCloseSettings()">✕</span></div>
<div class="wt-settings-section">DISPLAY MODE</div>
<div class="wt-toggle-row"><span class="wt-toggle-label">Beginner Mode <span style="font-size:.6rem;color:var(--text3)">(hides advanced stats)</span></span>
<div class="wt-toggle-sw${mode==="beginner"?" on":""}" onclick="wtToggleMode(this)"></div></div>
<div class="wt-settings-section">ACCESSIBILITY</div>
<div class="wt-toggle-row"><span class="wt-toggle-label">Colorblind Friendly <span style="font-size:.6rem;color:var(--text3)">(blue/orange instead of green/red)</span></span>
<div class="wt-toggle-sw${cb?" on":""}" onclick="wtToggleCB(this)"></div></div>
<div class="wt-settings-section">TOOL VISIBILITY (HOME PAGE)</div>
${TOOL_LIST.map(t=>{
const vis=!hidden.includes(t.href);
return`<div class="wt-toggle-row"><span class="wt-toggle-label">${t.label}</span>
<div class="wt-toggle-sw${vis?" on":""}" data-tool="${t.href}" onclick="wtToggleTool(this)"></div></div>`;
}).join("")}
<div class="wt-settings-btn-row">
<div class="btn" onclick="wtResetSettings()">Reset to Default</div>
<div class="btn" onclick="wtCloseSettings()">Close</div>
</div>
</div>`;
settingsOverlay.classList.add("open");
};
window.wtCloseSettings=function(){settingsOverlay.classList.remove("open")};

window.wtToggleMode=function(el){
el.classList.toggle("on");
const s=wtGetSettings();
s.mode=el.classList.contains("on")?"beginner":"advanced";
wtSaveSettings(s);
wtApplySettings();
};
window.wtToggleCB=function(el){
el.classList.toggle("on");
const s=wtGetSettings();
s.colorblind=el.classList.contains("on");
wtSaveSettings(s);
wtApplySettings();
};
window.wtToggleTool=function(el){
el.classList.toggle("on");
const s=wtGetSettings();
if(!s.hiddenTools)s.hiddenTools=[];
const tool=el.dataset.tool;
if(el.classList.contains("on"))s.hiddenTools=s.hiddenTools.filter(t=>t!==tool);
else if(!s.hiddenTools.includes(tool))s.hiddenTools.push(tool);
wtSaveSettings(s);
wtApplyToolVisibility();
};
window.wtResetSettings=function(){
localStorage.removeItem("wt_settings");
wtApplySettings();
wtCloseSettings();
wtShowCopied("Settings reset to default");
};

function wtApplySettings(){
const s=wtGetSettings();
document.documentElement.setAttribute("data-mode",s.mode||"advanced");
document.documentElement.setAttribute("data-cb",s.colorblind?"1":"0");
wtApplyToolVisibility();
}
function wtApplyToolVisibility(){
const s=wtGetSettings();
const hidden=s.hiddenTools||[];
document.querySelectorAll(".tool-card").forEach(card=>{
const href=card.getAttribute("href");
if(href)card.classList.toggle("wt-hidden",hidden.includes(href));
});
}
wtApplySettings();

// ===== GAMEMODE SELECTOR (home only) =====
if(currentPage==="home.html"){
const gmOrders={
"all":null,
"ground":["br-calc.html","repair-cost.html","ammo-picker.html","pen-calculator.html","spawn-points.html","lineup-builder.html","vehicle-comparer.html","crew-skills.html","grind-planner.html","wishlist.html","premium-rp.html","stat-tracker.html","talisman.html","mission-tracker.html","tier-list.html","index.html","bomb-drop.html","air-spawn.html","kos-tracker.html"],
"air":["br-calc.html","air-spawn.html","bomb-drop.html","index.html","ammo-picker.html","vehicle-comparer.html","crew-skills.html","grind-planner.html","premium-rp.html","talisman.html","repair-cost.html","wishlist.html","stat-tracker.html","mission-tracker.html","tier-list.html","lineup-builder.html","spawn-points.html","pen-calculator.html","kos-tracker.html"],
"heli":["br-calc.html","air-spawn.html","vehicle-comparer.html","spawn-points.html","crew-skills.html","lineup-builder.html","grind-planner.html","premium-rp.html","talisman.html","repair-cost.html","wishlist.html","stat-tracker.html","mission-tracker.html","tier-list.html","ammo-picker.html","pen-calculator.html","index.html","bomb-drop.html","kos-tracker.html"],
"custom":["kos-tracker.html","lineup-builder.html","br-calc.html","spawn-points.html","ammo-picker.html","pen-calculator.html","vehicle-comparer.html","crew-skills.html","repair-cost.html","tier-list.html","stat-tracker.html","mission-tracker.html","grind-planner.html","premium-rp.html","talisman.html","wishlist.html","index.html","bomb-drop.html","air-spawn.html"],
"sim":["br-calc.html","air-spawn.html","bomb-drop.html","repair-cost.html","crew-skills.html","spawn-points.html","ammo-picker.html","pen-calculator.html","vehicle-comparer.html","lineup-builder.html","grind-planner.html","premium-rp.html","talisman.html","wishlist.html","stat-tracker.html","mission-tracker.html","tier-list.html","index.html","kos-tracker.html"]
};
// Insert gamemode bar after header
setTimeout(()=>{
const container=document.querySelector(".container");
if(!container)return;
const gmBar=document.createElement("div");
gmBar.className="wt-gamemode";
gmBar.innerHTML=[
{id:"all",icon:"⭐",label:"All Tools"},
{id:"ground",icon:"🛡️",label:"Ground RB"},
{id:"air",icon:"✈️",label:"Air RB"},
{id:"heli",icon:"🚁",label:"Heli EC"},
{id:"custom",icon:"⚔️",label:"Custom"},
{id:"sim",icon:"🎯",label:"Simulator"}
].map(m=>`<div class="wt-gm-btn${m.id==="all"?" active":""}" data-gm="${m.id}" onclick="wtSetGamemode('${m.id}',this)"><span class="gm-icon">${m.icon}</span>${m.label}</div>`).join("");
container.prepend(gmBar);
},100);

window.wtSetGamemode=function(mode,el){
document.querySelectorAll(".wt-gm-btn").forEach(b=>b.classList.remove("active"));
if(el)el.classList.add("active");
const container=document.querySelector(".container");
if(!container)return;
const cards=[...container.querySelectorAll(".tool-card")];
const divider=container.querySelector(".divider");
if(mode==="all"){
// Reset to original DOM order — just remove and re-add all cards before divider
cards.forEach(c=>container.insertBefore(c,divider));
return;
}
const order=gmOrders[mode];
if(!order)return;
// Sort cards by the order array
const sorted=[...cards].sort((a,b)=>{
const aH=a.getAttribute("href");const bH=b.getAttribute("href");
const aI=order.indexOf(aH);const bI=order.indexOf(bH);
return(aI===-1?99:aI)-(bI===-1?99:bI);
});
sorted.forEach(c=>container.insertBefore(c,divider));
};
}

// ===== WISHLIST INTEGRATION =====
function wtGetWishlistNames(){
try{return JSON.parse(localStorage.getItem("wt_wishlist_vehicles")||"[]")}catch(e){return[]}
}
window.wtIsWishlisted=function(name){return wtGetWishlistNames().includes(name)};

// Mark wishlisted items in dropdowns via MutationObserver (extends existing observer)
function wtMarkWishlisted(){
const wl=wtGetWishlistNames();
if(!wl.length)return;
document.querySelectorAll(".dd-item,.dd-item").forEach(item=>{
const nameEl=item.querySelector(".dd-name");
if(!nameEl)return;
const name=nameEl.textContent.trim();
if(wl.includes(name)){
if(!item.classList.contains("wt-wishlisted")){
item.classList.add("wt-wishlisted");
if(!item.querySelector(".wt-wishlist-badge")){
const badge=document.createElement("span");
badge.className="wt-wishlist-badge";
badge.textContent="📋";
badge.title="On your wishlist";
nameEl.appendChild(badge);
}
}
}
});
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

// ===== COUNT-UP ANIMATION =====
const wtCountObserver=new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(!e.isIntersecting)return;
const el=e.target;
if(el.dataset.wtCounted)return;
const text=el.textContent.trim();
const num=parseFloat(text.replace(/[^0-9.\-]/g,""));
if(isNaN(num)||num===0||num>9999999)return;
el.dataset.wtCounted="1";
const suffix=text.replace(/[0-9,.\-\s]/g,"").trim();
const prefix=text.match(/^[^0-9\-]*/)?.[0]||"";
const isInt=!text.includes(".")|| text.indexOf(".")===-1;
const duration=400;const start=performance.now();
const from=0;
function tick(now){
const t=Math.min((now-start)/duration,1);
const ease=1-Math.pow(1-t,3);
const cur=from+(num-from)*ease;
el.textContent=prefix+(isInt?Math.round(cur).toLocaleString():cur.toFixed(text.split(".")[1]?.match(/\d+/)?.[0]?.length||1))+suffix;
if(t<1)requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
wtCountObserver.unobserve(el);
});
},{threshold:0.3});

function wtSetupCountUp(){
document.querySelectorAll(".sg .val,.dc .val,.rcard .val,.stat-val,.rg .val,.sp-pool-val,.match-card .num,.time-card .days,.rating-score,.goal-val").forEach(el=>{
if(el.dataset.wtCountReady)return;
el.dataset.wtCountReady="1";
wtCountObserver.observe(el);
});
}

// ===== BEGINNER MODE — MARK ADVANCED ELEMENTS =====
function wtMarkAdvanced(){
// Mark complex stats as advanced-only
document.querySelectorAll(".ammo-stat,.mod-bar,.pen-bar,.wl-pbar,.skill-cost,.snap-stat,.cp-stat,.be-text,.norm-info,.cc-row").forEach(el=>{
if(!el.classList.contains("wt-advanced"))el.classList.add("wt-advanced");
});
}

// ===== PERIODIC ENHANCEMENT =====
function wtEnhanceAll(){
wtEnhanceSearchBoxes();
wtSetupCopyable();
wtSetupTooltips();
wtMarkWishlisted();
wtMarkAdvanced();
wtApplyToolVisibility();
wtSetupCountUp();
}
wtEnhanceAll();
setInterval(wtEnhanceAll,2000);

})();
