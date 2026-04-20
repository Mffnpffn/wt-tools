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
})();
