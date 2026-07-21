
const trips = [
 {city:"Valencia", country:"Spagna", type:"Weekend", nights:3, price:389, rating:"8,8", stay:"Hotel 4★ · Colazione", img:"https://images.unsplash.com/photo-1569553426721-3358d1f8c6b7?auto=format&fit=crop&w=1200&q=80"},
 {city:"Cracovia", country:"Polonia", type:"Low Cost", nights:3, price:329, rating:"9,0", stay:"Boutique hotel · Centro", img:"https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1200&q=80"},
 {city:"Malta", country:"Malta", type:"Mare", nights:5, price:579, rating:"8,6", stay:"Resort · Mezza pensione", img:"https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80"},
 {city:"Praga", country:"Repubblica Ceca", type:"Cultura", nights:4, price:449, rating:"9,1", stay:"Hotel 4★ · Colazione", img:"https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200&q=80"},
 {city:"Sardegna", country:"Italia", type:"Villaggi Famiglia", nights:7, price:899, rating:"8,7", stay:"Villaggio · Mezza pensione", img:"https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=1200&q=80"},
 {city:"Atene", country:"Grecia", type:"Weekend", nights:4, price:499, rating:"8,5", stay:"Hotel 4★ · Colazione", img:"https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=80"},
 {city:"Budapest", country:"Ungheria", type:"Low Cost", nights:3, price:359, rating:"8,9", stay:"Hotel centrale · Colazione", img:"https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=80"},
 {city:"Tenerife", country:"Spagna", type:"Mare", nights:7, price:849, rating:"8,8", stay:"Resort · Mezza pensione", img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"},
 {city:"Lisbona", country:"Portogallo", type:"Weekend", nights:4, price:529, rating:"9,0", stay:"Hotel 4★ · Colazione", img:"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80"}
];

let shown = 3;
let activeType = "Tutti";

function money(v){ return new Intl.NumberFormat("it-IT",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(v); }

function filteredTrips(){
  const budget = Number(document.querySelector("#budget")?.value || 700);
  const destination = (document.querySelector("#destination")?.value || "").trim().toLowerCase();
  return trips.filter(t => t.price <= budget)
    .filter(t => activeType==="Tutti" || t.type===activeType)
    .filter(t => !destination || `${t.city} ${t.country}`.toLowerCase().includes(destination));
}

function renderTrips(){
  const grid = document.querySelector("#resultsGrid");
  if(!grid) return;
  const data = filteredTrips();
  document.querySelector("#resultCount").textContent = `${data.length} proposte entro il budget`;
  if(data.length===0){
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1">
      <h3>Nessuna proposta con questi filtri</h3>
      <p>Prova ad aumentare il budget o lasciare libera la destinazione. Voytana mostra solo opzioni che non superano il budget selezionato.</p>
      <button class="btn btn-primary" onclick="resetSearch()">Ripristina ricerca</button>
    </div>`;
    return;
  }
  grid.innerHTML = data.slice(0,shown).map((t,i)=>`
    <article class="card">
      <div class="card-img" style="background-image:url('${t.img}')">
        <span class="price-pill">${money(t.price)}</span>
      </div>
      <div class="card-body">
        <div class="meta"><span>${t.type}</span><span>•</span><span>${t.nights} notti</span><span>•</span><span>Valutazione ${t.rating}</span></div>
        <h3>${t.city}, ${t.country}</h3>
        <p style="color:var(--muted)">${t.stay}. Proposta selezionata per semplicità, valore e coerenza con il budget.</p>
        <div class="card-actions">
          <button class="btn btn-secondary" onclick="openDetails(${trips.indexOf(t)})">Dettagli</button>
          <button class="btn btn-primary" onclick="openBooking(${trips.indexOf(t)})">Prenota</button>
        </div>
      </div>
    </article>`).join("");
}

function resetSearch(){
  const budget=document.querySelector("#budget"); if(budget){budget.value=700; updateBudget();}
  const destination=document.querySelector("#destination"); if(destination) destination.value="";
  activeType="Tutti"; shown=3;
  document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("active",c.dataset.type==="Tutti"));
  renderTrips();
}

function updateBudget(){
  const v=document.querySelector("#budget").value;
  document.querySelector("#budgetValue").textContent=money(v);
  renderTrips();
}

function openDetails(index){
  const t=trips[index];
  document.querySelector("#modalTitle").textContent=`${t.city}, ${t.country}`;
  document.querySelector("#modalContent").innerHTML=`
    <p>${t.type} · ${t.nights} notti · ${t.stay}</p>
    <p><strong>Prezzo indicativo della proposta:</strong> ${money(t.price)}</p>
    <p>Il prezzo visualizzato è una stima editoriale usata per la selezione budget-first. Prima dell'acquisto, disponibilità e prezzo finale vengono verificati sul sito del partner scelto.</p>`;
  document.querySelector("#modal").classList.add("open");
}

function openBooking(index){
  const t=trips[index];
  document.querySelector("#modalTitle").textContent="Continua verso il partner";
  document.querySelector("#modalContent").innerHTML=`
    <p>Hai selezionato <strong>${t.city}</strong> a partire da <strong>${money(t.price)}</strong>.</p>
    <p>Voytana sta completando l'integrazione con i propri partner di viaggio. Prima di qualsiasi acquisto, prezzo, disponibilità e condizioni saranno sempre mostrati e confermati sul sito del fornitore.</p>
    <a class="btn btn-primary" href="mailto:thiagolama@libero.it?subject=Interesse viaggio ${encodeURIComponent(t.city)}">Richiedi informazioni</a>`;
  document.querySelector("#modal").classList.add("open");
}

function closeModal(){ document.querySelector("#modal")?.classList.remove("open"); }

document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll(".chip").forEach(chip=>{
    chip.addEventListener("click",()=>{
      document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));
      chip.classList.add("active");
      activeType=chip.dataset.type;
      shown=3; renderTrips();
    });
  });
  document.querySelector("#budget")?.addEventListener("input",updateBudget);
  document.querySelector("#destination")?.addEventListener("input",renderTrips);
  document.querySelector("#searchForm")?.addEventListener("submit",e=>{e.preventDefault();shown=3;renderTrips();document.querySelector("#results")?.scrollIntoView({behavior:"smooth"});});
  document.querySelector("#moreTrips")?.addEventListener("click",()=>{shown+=3;renderTrips();});
  document.querySelector("#modal")?.addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
  updateBudget(); renderTrips();
});
