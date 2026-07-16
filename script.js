const destinations = [
  {name:"Lisbona", country:"Portogallo", price:520, rating:"9,1", label:"Miglior rapporto qualità/prezzo", image:"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=80", features:["Volo A/R","3 notti","Colazione"]},
  {name:"Budapest", country:"Ungheria", price:430, rating:"8,9", label:"Più conveniente", image:"https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=900&q=80", features:["Volo A/R","3 notti","Centro città"]},
  {name:"Santorini", country:"Grecia", price:690, rating:"9,3", label:"Più desiderata", image:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80", features:["Volo A/R","4 notti","Vista mare"]},
  {name:"Praga", country:"Repubblica Ceca", price:470, rating:"9,0", label:"Weekend ideale", image:"https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=900&q=80", features:["Volo A/R","3 notti","Hotel 4★"]},
  {name:"Valencia", country:"Spagna", price:560, rating:"8,8", label:"Sole e città", image:"https://images.unsplash.com/photo-1597841221817-40e2e5116b4f?auto=format&fit=crop&w=900&q=80", features:["Volo A/R","4 notti","Spiaggia vicina"]},
  {name:"Cracovia", country:"Polonia", price:390, rating:"8,7", label:"Low cost", image:"https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=900&q=80", features:["Volo A/R","3 notti","Posizione centrale"]},
  {name:"Marrakech", country:"Marocco", price:640, rating:"9,2", label:"Esperienza unica", image:"https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=900&q=80", features:["Volo A/R","4 notti","Riad"]},
  {name:"Vienna", country:"Austria", price:610, rating:"9,0", label:"Elegante e culturale", image:"https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=900&q=80", features:["Volo A/R","3 notti","Hotel 4★"]},
  {name:"Malta", country:"Malta", price:580, rating:"8,9", label:"Mare vicino", image:"https://images.unsplash.com/photo-1570015313224-274b942f9c46?auto=format&fit=crop&w=900&q=80", features:["Volo A/R","4 notti","Colazione"]}
];

let offset = 0;
let mode = "package";

const $ = (id) => document.getElementById(id);
const budget = $("budget");
const budgetRange = $("budgetRange");
const resultsGrid = $("resultsGrid");

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

const today = new Date();
const start = new Date(today);
start.setDate(today.getDate() + 21);
const end = new Date(start);
end.setDate(start.getDate() + 3);
$("startDate").value = formatDate(start);
$("endDate").value = formatDate(end);
$("startDate").min = formatDate(today);
$("endDate").min = formatDate(today);

function createCard(item) {
  const adjusted = Math.max(190, Math.round(item.price * (Number(budget.value) / 600) * 0.88));
  return `<article class="trip-card">
    <div class="trip-image" style="background-image:url('${item.image}')">
      <span class="tag">${item.label}</span>
      <button class="favorite" type="button" aria-label="Salva ${item.name}">♡</button>
    </div>
    <div class="trip-body">
      <h3>${item.name}</h3>
      <div class="trip-meta">${item.country} · partenza da ${$("departure").value || "Napoli"}</div>
      <div class="rating-row"><span>Recensioni eccellenti</span><span class="rating">${item.rating}</span></div>
      <div class="features">${item.features.map(f=>`<span>${f}</span>`).join("")}</div>
      <div class="price-row">
        <div><small>Totale indicativo</small><span class="price">€${adjusted}</span></div>
        <button class="card-btn" type="button">Scopri</button>
      </div>
    </div>
  </article>`;
}

function renderResults() {
  const items = [0,1,2].map(i => destinations[(offset+i) % destinations.length]);
  resultsGrid.innerHTML = items.map(createCard).join("");
  $("resultsSubtitle").textContent = `Esempi dimostrativi basati su un budget di €${budget.value} per ${$("travelers").value} viaggiatori.`;
  document.querySelectorAll(".favorite").forEach(btn => btn.addEventListener("click", () => {
    btn.textContent = btn.textContent === "♡" ? "♥" : "♡";
  }));
}

function validateForm() {
  const error = $("formError");
  error.textContent = "";
  const startDate = new Date($("startDate").value);
  const endDate = new Date($("endDate").value);
  if (Number(budget.value) < 100) return error.textContent = "Inserisci un budget minimo di €100.", false;
  if (!$("departure").value.trim()) return error.textContent = "Inserisci una città o un aeroporto di partenza.", false;
  if (!$("startDate").value || !$("endDate").value) return error.textContent = "Seleziona le date del viaggio.", false;
  if (endDate <= startDate) return error.textContent = "La data di ritorno deve essere successiva alla partenza.", false;
  return true;
}

$("tripForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validateForm()) return;
  const box = $("assistantBox");
  const text = $("assistantText");
  box.hidden = false;
  const steps = [
    "Sto verificando budget, date e durata del viaggio...",
    "Sto confrontando le combinazioni con il miglior rapporto qualità-prezzo...",
    "Sto organizzando tre proposte facili da confrontare..."
  ];
  for (const step of steps) {
    text.textContent = step;
    await new Promise(r => setTimeout(r, 650));
  }
  offset = 0;
  renderResults();
  box.hidden = true;
  $("results").scrollIntoView({behavior:"smooth"});
});

$("moreResultsBtn").addEventListener("click", () => {
  offset = (offset + 3) % destinations.length;
  renderResults();
});

document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
  tab.classList.add("active");
  mode = tab.dataset.mode;
  if (mode === "surprise") $("travelType").value = "any";
}));

$("advancedBtn").addEventListener("click", () => {
  $("advancedPanel").classList.toggle("open");
  $("advancedBtn").textContent = $("advancedPanel").classList.contains("open") ? "Nascondi preferenze −" : "Preferenze avanzate +";
});

$("menuBtn").addEventListener("click", () => $("mobileMenu").classList.toggle("open"));

budgetRange.addEventListener("input", () => {
  budget.value = budgetRange.value;
  updateBudgetLive();
  renderResults();
});
budget.addEventListener("input", () => {
  budgetRange.value = Math.min(2000, Math.max(150, Number(budget.value) || 150));
  updateBudgetLive();
});

function updateBudgetLive() {
  const value = Number(budgetRange.value);
  $("liveBudget").textContent = `€${value.toLocaleString("it-IT")}`;
  let message = "Ottimo per una fuga breve e conveniente.";
  if (value >= 500) message = "Ottimo per un weekend europeo per 2 persone.";
  if (value >= 900) message = "Buon budget per 4–6 notti in Europa.";
  if (value >= 1400) message = "Puoi valutare soggiorni più lunghi o destinazioni premium.";
  $("budgetMessage").textContent = message;
}

document.querySelectorAll("[data-quick]").forEach(btn => btn.addEventListener("click", () => {
  const q = btn.dataset.quick;
  if (q === "lowcost") budget.value = 350;
  if (q === "weekend") budget.value = 500;
  if (q === "family") { budget.value = 1000; $("travelers").value = "4"; $("travelType").value = "family"; }
  if (q === "business") $("travelType").value = "business";
  if (q === "surprise") mode = "surprise";
  budgetRange.value = Math.min(2000, Math.max(150, Number(budget.value)));
  updateBudgetLive();
  renderResults();
  $("search").scrollIntoView({behavior:"smooth"});
}));

$("lowCostBtn").addEventListener("click", () => {
  budget.value = 350; budgetRange.value = 350; updateBudgetLive(); renderResults();
  $("search").scrollIntoView({behavior:"smooth"});
});

$("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = $("email").value.trim();
  $("newsletterMessage").textContent = email ? "Grazie! La demo ha registrato la tua richiesta localmente." : "Inserisci un indirizzo email valido.";
  if (email) e.target.reset();
});

renderResults();
updateBudgetLive();
