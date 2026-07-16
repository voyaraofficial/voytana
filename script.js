const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const formatEuro = (n) => Number(n).toLocaleString("it-IT");

const trips = [
  {city:"Vienna",country:"Austria",img:"https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=1000&q=86",type:["city","package","weekend"],prefs:["city","direct","breakfast"],from:["NAP","ROM","MIL","BLQ","VCE"],stars:4,rating:4.8,baseNight:118,flight:125,description:"Elegante, culturale e perfetta per un weekend ben organizzato."},
  {city:"Budapest",country:"Ungheria",img:"https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1000&q=86",type:["city","package","weekend","low"],prefs:["city","direct","breakfast"],from:["NAP","ROM","MIL","BLQ"],stars:4,rating:4.7,baseNight:92,flight:105,description:"Terme, panorami sul Danubio e ottimo rapporto qualità-prezzo."},
  {city:"Barcellona",country:"Spagna",img:"https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1000&q=86",type:["city","sea","package","weekend"],prefs:["city","sea","direct","breakfast"],from:["NAP","ROM","MIL","BLQ","VCE","TRN"],stars:4,rating:4.8,baseNight:145,flight:135,description:"Mare, architettura e vita urbana in un'unica destinazione."},
  {city:"Praga",country:"Repubblica Ceca",img:"https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1000&q=86",type:["city","package","weekend","low"],prefs:["city","direct","breakfast"],from:["NAP","ROM","MIL","BLQ"],stars:4,rating:4.8,baseNight:98,flight:115,description:"Atmosfera fiabesca, centro storico compatto e prezzi accessibili."},
  {city:"Marrakech",country:"Marocco",img:"https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=1000&q=86",type:["city","package"],prefs:["city","breakfast"],from:["ROM","MIL","NAP"],stars:4,rating:4.7,baseNight:105,flight:180,description:"Colori, profumi e riad di charme per un viaggio diverso dal solito."},
  {city:"Lisbona",country:"Portogallo",img:"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1000&q=86",type:["city","sea","package","weekend"],prefs:["city","sea","breakfast"],from:["NAP","ROM","MIL"],stars:4,rating:4.8,baseNight:132,flight:165,description:"Quartieri autentici, oceano vicino e cucina memorabile."},
  {city:"Tenerife",country:"Spagna",img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=86",type:["sea","package","family"],prefs:["sea","family","direct"],from:["NAP","ROM","MIL"],stars:4,rating:4.7,baseNight:128,flight:220,description:"Clima mite, spiagge e strutture adatte anche alle famiglie."},
  {city:"Creta",country:"Grecia",img:"https://images.unsplash.com/photo-1504512485720-7d83a16ee930?auto=format&fit=crop&w=1000&q=86",type:["sea","package","family"],prefs:["sea","family","breakfast"],from:["NAP","ROM","MIL","BLQ"],stars:4,rating:4.8,baseNight:136,flight:205,description:"Mare limpido, borghi e villaggi con formule flessibili."},
  {city:"Sardegna",country:"Italia",img:"https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1000&q=86",type:["sea","package","family"],prefs:["sea","family"],from:["NAP","ROM","MIL","BLQ","TRN"],stars:4,rating:4.8,baseNight:148,flight:105,description:"Spiagge spettacolari e villaggi pensati per adulti e bambini."},
  {city:"Dolomiti",country:"Italia",img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=86",type:["mountain","hotel","family"],prefs:["mountain","family","breakfast"],from:["NAP","ROM","MIL","BLQ","VCE"],stars:4,rating:4.9,baseNight:155,flight:95,description:"Natura, aria pulita e hotel accoglienti per ogni stagione."},
  {city:"Dubai",country:"Emirati Arabi Uniti",img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=86",type:["city","sea","package"],prefs:["city","sea","direct","breakfast"],from:["NAP","ROM","MIL"],stars:5,rating:4.8,baseNight:190,flight:310,description:"Architettura, spiagge e servizi di livello internazionale."},
  {city:"Porto",country:"Portogallo",img:"https://images.unsplash.com/photo-1555881400-69f7c3d954d4?auto=format&fit=crop&w=1000&q=86",type:["city","package","weekend"],prefs:["city","breakfast"],from:["NAP","ROM","MIL"],stars:4,rating:4.8,baseNight:116,flight:155,description:"Panorami sul Douro, atmosfera autentica e ottima cucina."}
];

let currentCategory = "package";
let currentMode = "smart";
let surprise = false;
let resultOffset = 0;
let evaluatedTrips = [];

const range = $("#budgetRange");
const budgetValue = $("#budgetValue");

function toast(message){
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.voytanaToast);
  window.voytanaToast = setTimeout(() => el.classList.remove("show"), 2600);
}

function setBudget(value){
  range.value = value;
  budgetValue.textContent = formatEuro(value);
  $$(".budget-presets button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.budget === String(value));
  });
}

range.addEventListener("input", e => setBudget(e.target.value));
$$(".budget-presets button").forEach(btn => btn.addEventListener("click", () => setBudget(btn.dataset.budget)));

$$(".category").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".category").forEach(item => item.classList.remove("active"));
    btn.classList.add("active");
    currentCategory = btn.dataset.category;
    surprise = currentCategory === "surprise";
    $("#destination").value = "";
    $("#mealPlanField").classList.toggle("hidden", currentCategory !== "family");
    if(currentCategory === "weekend") $("#duration").value = "2";
    toast(btn.textContent.trim() + " selezionato");
  });
});

$$(".mode-switch button").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".mode-switch button").forEach(item => item.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode;
    if(currentMode === "low"){
      setBudget(700);
      $("#duration").value = "2";
    }
  });
});

$("#surpriseButton").addEventListener("click", () => {
  surprise = true;
  currentCategory = "surprise";
  $("#destination").value = "";
  $$(".category").forEach(item => item.classList.toggle("active", item.dataset.category === "surprise"));
  toast("Sorprendimi attivato: selezioneremo destinazioni diverse.");
});

$("#advancedToggle").addEventListener("click", () => {
  const box = $("#advancedOptions");
  box.classList.toggle("show");
  $("#advancedToggle").textContent = box.classList.contains("show") ? "Nascondi preferenze ▴" : "Aggiungi preferenze ▾";
});

$$(".preference").forEach(btn => btn.addEventListener("click", () => btn.classList.toggle("active")));

function getParams(){
  return {
    budget: Number(range.value),
    departure: $("#departure").value,
    nights: Number($("#duration").value),
    travelers: Number($("#travelers").value),
    destination: $("#destination").value.trim().toLowerCase(),
    prefs: $$(".preference.active").map(btn => btn.dataset.pref),
    mealPlan: $("#mealPlan").value
  };
}

function calculateTrip(trip, params){
  if(params.destination && !(`${trip.city} ${trip.country}`.toLowerCase().includes(params.destination))) return null;
  if(!trip.from.includes(params.departure)) return null;

  const effectiveCategory = currentCategory === "surprise" ? "package" : currentCategory;
  if(!["package","weekend","family","hotel","flight","cruise","car"].includes(effectiveCategory)) return null;
  if(["package","weekend","family","hotel"].includes(effectiveCategory) && !trip.type.includes(effectiveCategory) && !trip.type.includes("package")) return null;

  const hotel = effectiveCategory === "flight" ? 0 : Math.round(trip.baseNight * params.nights * Math.max(1, params.travelers * .62));
  const flight = effectiveCategory === "hotel" ? 0 : Math.round(trip.flight * params.travelers);
  const mealSupplement = currentCategory === "family"
    ? Math.round((params.mealPlan === "allinclusive" ? 38 : params.mealPlan === "half" ? 22 : 0) * params.travelers * params.nights)
    : 0;
  const fees = Math.round((hotel + flight + mealSupplement) * .075);
  const total = hotel + flight + mealSupplement + fees;
  if(total > params.budget) return null;

  const matchingPrefs = params.prefs.filter(pref => trip.prefs.includes(pref)).length;
  if(params.prefs.length && matchingPrefs === 0) return null;

  const valueScore = Math.max(0, (params.budget - total) / params.budget);
  let score = Math.round(64 + trip.rating * 4.7 + matchingPrefs * 4 + valueScore * 12);
  if(currentMode === "low") score += total < params.budget * .72 ? 5 : 0;
  score = Math.min(99, score);

  return {
    ...trip, hotel, flight, mealSupplement, fees, total,
    residual: params.budget - total, score
  };
}

function search(reset = true){
  if(reset) resultOffset = 0;
  const params = getParams();
  evaluatedTrips = trips.map(trip => calculateTrip(trip, params)).filter(Boolean);

  evaluatedTrips.sort((a,b) => {
    if(currentMode === "low") return a.total - b.total;
    return b.score - a.score || b.rating - a.rating;
  });

  if(surprise){
    const countries = new Set();
    evaluatedTrips = evaluatedTrips.filter(item => {
      if(countries.has(item.country)) return false;
      countries.add(item.country);
      return true;
    }).concat(evaluatedTrips.filter(item => countries.has(item.country)));
  }

  renderResults(params);
}

function renderResults(params){
  const grid = $("#resultsGrid");
  const empty = $("#emptyState");
  const summary = $("#resultSummary");
  grid.innerHTML = "";

  const visible = evaluatedTrips.slice(resultOffset, resultOffset + 3);
  if(!visible.length){
    empty.classList.add("show");
    summary.classList.remove("show");
    return;
  }

  empty.classList.remove("show");
  summary.classList.add("show");
  summary.innerHTML = `<strong>${params.travelers} viaggiatori · ${params.nights} ${params.nights === 1 ? "notte" : "notti"} · partenza ${params.departure} · budget €${formatEuro(params.budget)}</strong><span>${evaluatedTrips.length} proposte compatibili trovate</span>`;

  visible.forEach((trip,index) => {
    const familyTreatment = currentCategory === "family" && params.mealPlan !== "all"
      ? `<span>🍽 ${params.mealPlan === "allinclusive" ? "All inclusive" : "Mezza pensione"}</span>` : "";

    grid.insertAdjacentHTML("beforeend", `
      <article class="trip-card ${index === 0 ? "best" : ""}">
        ${index === 0 ? '<div class="best-badge">SCELTA VOYTANA</div>' : ""}
        <div class="trip-image" style="background-image:url('${trip.img}')">
          <span class="match-badge">${trip.score}% compatibile</span>
        </div>
        <div class="trip-body">
          <span class="trip-country">${trip.country}</span>
          <div class="title-row"><h3>${trip.city}</h3><span class="rating">${trip.rating} ★</span></div>
          <p class="trip-description">${trip.description}</p>
          <div class="why">Selezionata perché rispetta il budget e offre un buon equilibrio tra prezzo, qualità, recensioni e durata.</div>
          <div class="trip-tags">
            ${trip.flight ? "<span>✈ Volo incluso</span>" : ""}
            ${trip.hotel ? `<span>🏨 ${params.nights} ${params.nights === 1 ? "notte" : "notti"}</span>` : ""}
            <span>⭐ ${trip.stars} stelle</span>
            <span>👥 ${params.travelers} persone</span>
            ${familyTreatment}
          </div>
          <div class="cost-breakdown">
            <div><small>Volo</small><strong>€${formatEuro(trip.flight)}</strong></div>
            <div><small>Alloggio</small><strong>€${formatEuro(trip.hotel)}</strong></div>
            <div><small>Costi stimati</small><strong>€${formatEuro(trip.fees + trip.mealSupplement)}</strong></div>
          </div>
          <div class="price-row">
            <div><small>Totale stimato</small><div class="total-price">€${formatEuro(trip.total)}</div><div class="residual">Restano €${formatEuro(trip.residual)}</div></div>
            <button class="book-button" type="button" onclick="window.showAffiliateMessage()">Vedi e prenota</button>
          </div>
        </div>
      </article>
    `);
  });

  $("#proposte").scrollIntoView({behavior:"smooth"});
}

window.showAffiliateMessage = () => toast("Il pulsante sarà collegato al partner affiliato approvato.");

$("#searchButton").addEventListener("click", () => {
  const btn = $("#searchButton");
  btn.disabled = true;
  btn.querySelector("span").textContent = "Sto selezionando le proposte…";
  setTimeout(() => {
    search(true);
    btn.disabled = false;
    btn.querySelector("span").textContent = "Trova le mie 3 migliori proposte";
  }, 650);
});

$("#moreButton").addEventListener("click", () => {
  if(!evaluatedTrips.length) return search(true);
  resultOffset += 3;
  if(resultOffset >= evaluatedTrips.length){
    resultOffset = 0;
    toast("Hai visto tutte le proposte compatibili: ripartiamo dalle migliori.");
  }
  renderResults(getParams());
});

$("#waitlistForm").addEventListener("submit", e => {
  e.preventDefault();
  $("#formSuccess").classList.add("show");
  e.currentTarget.reset();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
$$(".reveal").forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  const total = document.documentElement.scrollHeight - innerHeight;
  $("#scrollProgress").style.width = `${Math.min(100, (scrollY / Math.max(1,total)) * 100)}%`;
});

const defaultDate = new Date();
defaultDate.setDate(defaultDate.getDate() + 30);
$("#dateFrom").value = defaultDate.toISOString().slice(0,10);

search(true);
