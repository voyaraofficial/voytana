const data=[
{city:"Palma di Maiorca",country:"Spagna",days:5,price:684,categories:["weekend","lowcost","surprise"],transport:["volo"],badge:"Miglior equilibrio",img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",desc:"Mare, soggiorno confortevole e prezzo vicino al budget scelto.",includes:["Volo A/R","4 notti","Bagaglio piccolo"]},
{city:"Budapest",country:"Ungheria",days:4,price:642,categories:["weekend","lowcost","surprise"],transport:["volo","treno"],badge:"Più conveniente",img:"https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1000&q=80",desc:"City break centrale con margine residuo per esperienze.",includes:["Trasporto","3 notti","Hotel centrale"]},
{city:"Tenerife",country:"Spagna",days:6,price:698,categories:["villaggi","surprise"],transport:["volo"],badge:"Più completa",img:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",desc:"Sole, natura e soggiorno selezionato per restare nel budget.",includes:["Volo A/R","5 notti","Colazione"]},
{city:"Praga",country:"Repubblica Ceca",days:4,price:611,categories:["weekend","lowcost"],transport:["volo","treno"],badge:"Scelta smart",img:"https://images.unsplash.com/photo-1519671282429-b44660ead0a7?auto=format&fit=crop&w=1000&q=80",desc:"Ottimo rapporto qualità-prezzo e centro storico a portata di mano.",includes:["Trasporto","3 notti","Hotel centrale"]},
{city:"Corfù",country:"Grecia",days:6,price:699,categories:["villaggi","surprise"],transport:["volo","nave"],badge:"Quasi al budget",img:"https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1000&q=80",desc:"Atmosfera mediterranea e proposta vicinissima alla cifra scelta.",includes:["Trasporto","5 notti","Mezza pensione"]},
{city:"Dolomiti",country:"Italia",days:4,price:655,categories:["weekend","surprise"],transport:["auto","treno","bus"],badge:"Più autentica",img:"https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1000&q=80",desc:"Natura e relax con budget residuo per attività locali.",includes:["3 notti","Colazione","Parcheggio"]},
{city:"Mini crociera Mediterraneo",country:"Italia",days:4,price:590,categories:["crociere","surprise"],transport:["nave"],badge:"Crociera smart",img:"https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1000&q=80",desc:"Una mini crociera semplice, con cabina interna e pensione completa.",includes:["Cabina","Pensione completa","Tasse portuali"]},
{city:"Costa Adriatica",country:"Italia",days:7,price:920,categories:["villaggi"],transport:["auto","treno"],badge:"Famiglia",img:"https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1000&q=80",desc:"Villaggio per famiglie con servizi essenziali e trattamento selezionabile.",includes:["6 notti","Mezza pensione","Animazione"]},
{city:"Valencia",country:"Spagna",days:4,price:625,categories:["weekend","lowcost"],transport:["volo"],badge:"Weekend perfetto",img:"https://images.unsplash.com/photo-1562826013-bc6a0b7c7aa6?auto=format&fit=crop&w=1000&q=80",desc:"Mare e città insieme con un costo complessivo equilibrato.",includes:["Volo A/R","3 notti","Hotel"]},
{city:"Napoli–Palermo",country:"Italia",days:3,price:420,categories:["weekend","lowcost"],transport:["nave"],badge:"Partenza facile",img:"https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1000&q=80",desc:"Un weekend via mare, semplice da organizzare e molto sotto budget.",includes:["Nave A/R","2 notti","Cabina"]},
{city:"Roma",country:"Italia",days:3,price:360,categories:["weekend","lowcost"],transport:["treno","auto","bus"],badge:"Più vicina",img:"https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=80",desc:"Arte, storia e soggiorno centrale con spesa contenuta.",includes:["Trasporto","2 notti","Hotel"]},
{city:"Crociera Isole Greche",country:"Grecia",days:8,price:1480,categories:["crociere"],transport:["nave"],badge:"Esperienza completa",img:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=80",desc:"Itinerario nel Mediterraneo con pensione completa e più scali.",includes:["Cabina","Pensione completa","Intrattenimento"]}
];
let state={budget:700,category:"weekend",transport:"volo",visible:3,sort:"closest",favorites:new Set(),guests:{rooms:1,adults:2,children:0}};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const euro=v=>new Intl.NumberFormat("it-IT",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(v);
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2000)}
function compatible(){
 let list=data.filter(x=>x.price<=state.budget && x.categories.includes(state.category) && x.transport.includes(state.transport));
 const dest=$("#destinationInput").value.trim().toLowerCase();
 if(dest) list=list.filter(x=>(x.city+" "+x.country).toLowerCase().includes(dest));
 if(state.category==="surprise") list=data.filter(x=>x.price<=state.budget && x.transport.includes(state.transport));
 return list.sort((a,b)=>state.sort==="closest"?(state.budget-b.price)-(state.budget-a.price):a.price-b.price);
}
function render(){
 const list=compatible(), shown=list.slice(0,state.visible);
 $("#emptyState").classList.toggle("show",list.length===0);
 $("#cards").innerHTML=shown.map(t=>{
   const pct=Math.round(t.price/state.budget*100), diff=state.budget-t.price;
   return `<article class="trip-card">
   <div class="trip-image" style="background-image:url('${t.img}')">
    <span class="trip-badge">${t.badge}</span>
    <button class="favorite" data-fav="${t.city}">${state.favorites.has(t.city)?"♥":"♡"}</button>
   </div>
   <div class="trip-body">
    <div class="meta"><span>${t.country} · ${t.days} giorni</span><span>★ 9,1</span></div>
    <h3>${t.city}</h3><p>${t.desc}</p>
    <div class="budget-bar"><div class="budget-fill" style="width:${pct}%"></div></div>
    <div class="budget-row"><span>Budget usato ${pct}%</span><span>${euro(diff)} residui</span></div>
    <div class="price-row"><div><small>Totale demo</small><br><strong>${euro(t.price)}</strong></div><small>${state.transport}</small></div>
    <div class="card-actions"><button class="details-btn" data-details="${t.city}">Dettagli</button><button class="book-btn" data-book="${t.city}">Prenota</button></div>
   </div></article>`;
 }).join("");
 $("#moreBtn").style.display=list.length>state.visible?"inline-block":"none";
 $$("[data-fav]").forEach(b=>b.onclick=()=>{state.favorites.has(b.dataset.fav)?state.favorites.delete(b.dataset.fav):state.favorites.add(b.dataset.fav);render();toast("Preferiti aggiornati")});
 $$("[data-details]").forEach(b=>b.onclick=()=>openDetails(b.dataset.details));
 $$("[data-book]").forEach(b=>b.onclick=()=>{
  const city=b.dataset.book;
  const links={
    "Palma di Maiorca":"https://klook.tpm.li/TiXgKF8x",
    "Budapest":"https://klook.tpm.li/TiXgKF8x",
    "Tenerife":"https://klook.tpm.li/TiXgKF8x"
  };
  window.open(links[city]||"https://klook.tpm.li/TiXgKF8x","_blank");
});
}
function setCategory(cat){
 state.category=cat;state.visible=3;
 $$("[data-category]").forEach(b=>b.classList.toggle("active",b.dataset.category===cat));
 render();toast("Categoria selezionata");
}
function setTransport(tr){
 state.transport=tr;state.visible=3;
 $$(".transport").forEach(b=>b.classList.toggle("active",b.dataset.transport===tr));
 render();
}
function openModal(id){$("#"+id).classList.add("open")}
function closeModal(id){$("#"+id).classList.remove("open")}
function openDetails(city){
 const t=data.find(x=>x.city===city);
 $("#detailsTitle").textContent=t.city;
 $("#detailsContent").innerHTML=`<p>${t.desc}</p><p><strong>Include:</strong></p><ul>${t.includes.map(i=>`<li>${i}</li>`).join("")}</ul><p><strong>Prezzo demo:</strong> ${euro(t.price)}</p><button class="modal-confirm" onclick="document.querySelector('#detailsModal').classList.remove('open');document.querySelector('#bookingModal').classList.add('open')">Prenota</button>`;
 openModal("detailsModal");
}
$("#budgetRange").oninput=e=>{state.budget=+e.target.value;$("#budgetValue").textContent=new Intl.NumberFormat("it-IT").format(state.budget);state.visible=3;render()};
$$("[data-category]").forEach(b=>b.onclick=()=>setCategory(b.dataset.category));
$$(".transport").forEach(b=>b.onclick=()=>setTransport(b.dataset.transport));
$("#searchBtn").onclick=()=>{
 const dep=$("#departureDate").value, ret=$("#returnDate").value;
 if(dep&&ret&&ret<dep){toast("La data di ritorno deve essere successiva alla partenza");return}
 state.visible=3;render();
 const dest=$("#destinationInput").value||"località qualsiasi";
 $("#resultsSummary").textContent=`Budget massimo ${euro(state.budget)}, ${dest}, viaggio in ${state.transport}.`;
 $("#results").scrollIntoView({behavior:"smooth"});
};
$("#moreBtn").onclick=()=>{state.visible+=3;render()};
$("#sortBtn").onclick=()=>{state.sort=state.sort==="closest"?"lowest":"closest";$("#sortBtn").textContent=state.sort==="closest"?"Ordina: più vicino al budget":"Ordina: prezzo più basso";render()};
$("#resetBtn").onclick=()=>{state={...state,budget:700,category:"weekend",transport:"volo",visible:3,sort:"closest"};$("#budgetRange").value=700;$("#budgetValue").textContent="700";$("#destinationInput").value="";$$(".transport").forEach(b=>b.classList.toggle("active",b.dataset.transport==="volo"));$$("[data-category]").forEach(b=>b.classList.toggle("active",b.dataset.category==="weekend"));render();toast("Ricerca reimpostata")};
$("#guestBtn").onclick=()=>openModal("guestModal");
$$("[data-close]").forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
$$("[data-key]").forEach(b=>b.onclick=()=>{const k=b.dataset.key,d=+b.dataset.delta,min=k==="children"?0:1;state.guests[k]=Math.max(min,state.guests[k]+d);$("#roomsCount").textContent=state.guests.rooms;$("#adultsCount").textContent=state.guests.adults;$("#childrenCount").textContent=state.guests.children;renderAges()});
function renderAges(){$("#childrenAges").innerHTML=Array.from({length:state.guests.children},(_,i)=>`<div class="child-age"><span>Età bambino ${i+1}</span><select>${Array.from({length:18},(_,n)=>`<option>${n} anni</option>`).join("")}</select></div>`).join("")}
$("#applyGuests").onclick=()=>{$("#guestSummary").textContent=`${state.guests.rooms} camera${state.guests.rooms>1?"e":""} · ${state.guests.adults} adulti${state.guests.children?` · ${state.guests.children} bambini`:""}`;closeModal("guestModal")};
$("#menuBtn").onclick=()=>$("#mobileNav").classList.toggle("open");
$("#favoritesBtn").onclick=()=>toast(`${state.favorites.size} preferiti salvati`);
$("#languageBtn").onclick=()=>toast("Selettore lingua pronto per l’integrazione multilingua");
$("#globalBookBtn").onclick=()=>openModal("bookingModal");
window.onclick=e=>{if(e.target.classList.contains("modal"))e.target.classList.remove("open")};
render();
