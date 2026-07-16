const $=id=>document.getElementById(id);

const state={
  adults:2,
  children:0,
  rooms:1,
  childAges:[],
  mode:"soggiorno",
  offset:0,
  slide:0
};

const datasets={
  soggiorno:[
    {name:"Maison Soleil",place:"Gallipoli, Italia",price:540,rating:"9,1",tag:"Miglior rapporto qualità-prezzo",image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=82",features:["Hotel 4★","Colazione","Centro"]},
    {name:"Casa Marina",place:"Sorrento, Italia",price:620,rating:"9,3",tag:"Più amata",image:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=82",features:["Vista mare","3 notti","Wi-Fi"]},
    {name:"Palazzo Verde",place:"Roma, Italia",price:590,rating:"8,9",tag:"Scelta conveniente",image:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=82",features:["Hotel 4★","Posizione centrale","Colazione"]},
    {name:"Azure Rooms",place:"Malta",price:510,rating:"9,0",tag:"Mare vicino",image:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=82",features:["4 notti","Piscina","Colazione"]},
    {name:"City Nest",place:"Praga, Cechia",price:460,rating:"8,8",tag:"Weekend ideale",image:"https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=82",features:["3 notti","Centro città","Hotel 4★"]},
    {name:"Riad Lumière",place:"Marrakech, Marocco",price:640,rating:"9,2",tag:"Esperienza unica",image:"https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=82",features:["4 notti","Riad","Colazione"]}
  ],
  volo:[
    {name:"Napoli → Parigi",place:"Volo A/R",price:210,rating:"8,8",tag:"Miglior orario",image:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=82",features:["Diretto","Bagaglio piccolo","A/R"]},
    {name:"Napoli → Londra",place:"Volo A/R",price:190,rating:"8,6",tag:"Più conveniente",image:"https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=900&q=82",features:["Diretto","A/R","Orari comodi"]},
    {name:"Napoli → Barcellona",place:"Volo A/R",price:230,rating:"9,0",tag:"Scelta Voytana",image:"https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=900&q=82",features:["Diretto","A/R","Weekend"]},
    {name:"Napoli → Vienna",place:"Volo A/R",price:205,rating:"8,7",tag:"Ottimo prezzo",image:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=82",features:["Diretto","A/R","Bagaglio piccolo"]},
    {name:"Napoli → Budapest",place:"Volo A/R",price:175,rating:"8,5",tag:"Low cost",image:"https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=900&q=82",features:["Diretto","A/R","Mattina"]},
    {name:"Napoli → Valencia",place:"Volo A/R",price:220,rating:"8,9",tag:"Sole e città",image:"https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=900&q=82",features:["Diretto","A/R","Orari comodi"]}
  ],
  pacchetto:[
    {name:"Lisbona",place:"Portogallo",price:520,rating:"9,1",tag:"Miglior rapporto qualità-prezzo",image:"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","3 notti","Colazione"]},
    {name:"Budapest",place:"Ungheria",price:430,rating:"8,9",tag:"Più conveniente",image:"https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","3 notti","Centro città"]},
    {name:"Santorini",place:"Grecia",price:690,rating:"9,3",tag:"Più desiderata",image:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","4 notti","Vista mare"]},
    {name:"Praga",place:"Cechia",price:470,rating:"9,0",tag:"Weekend ideale",image:"https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","3 notti","Hotel 4★"]},
    {name:"Valencia",place:"Spagna",price:560,rating:"8,8",tag:"Sole e città",image:"https://images.unsplash.com/photo-1597841221817-40e2e5116b4f?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","4 notti","Spiaggia vicina"]},
    {name:"Cracovia",place:"Polonia",price:390,rating:"8,7",tag:"Low cost",image:"https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","3 notti","Centro"]}
  ],
  weekend:[
    {name:"Parigi in 2 notti",place:"Francia",price:460,rating:"9,0",tag:"Weekend romantico",image:"https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","2 notti","Centro"]},
    {name:"Atene in 3 notti",place:"Grecia",price:510,rating:"8,9",tag:"Più completo",image:"https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","3 notti","Colazione"]},
    {name:"Roma in 1 notte",place:"Italia",price:280,rating:"8,8",tag:"Fuga veloce",image:"https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=82",features:["Treno","1 notte","Centro"]},
    {name:"Vienna in 2 notti",place:"Austria",price:490,rating:"9,1",tag:"Elegante",image:"https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","2 notti","Hotel 4★"]},
    {name:"Malta in 3 notti",place:"Malta",price:540,rating:"8,9",tag:"Mare vicino",image:"https://images.unsplash.com/photo-1570015313224-274b942f9c46?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","3 notti","Colazione"]},
    {name:"Praga in 2 notti",place:"Cechia",price:420,rating:"8,8",tag:"Best seller",image:"https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","2 notti","Centro"]}
  ],
  lowcost:[
    {name:"Cracovia",place:"Polonia",price:320,rating:"8,7",tag:"Low cost verificato",image:"https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","3 notti","Centro"]},
    {name:"Budapest",place:"Ungheria",price:350,rating:"8,9",tag:"Miglior prezzo",image:"https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","3 notti","Hotel"]},
    {name:"Tirana",place:"Albania",price:300,rating:"8,6",tag:"Super conveniente",image:"https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","3 notti","Colazione"]},
    {name:"Bari",place:"Italia",price:260,rating:"8,8",tag:"Vicino e facile",image:"https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=900&q=82",features:["Treno","2 notti","Centro"]},
    {name:"Sofia",place:"Bulgaria",price:330,rating:"8,5",tag:"Budget smart",image:"https://images.unsplash.com/photo-1565008576549-57569a49371d?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","3 notti","Hotel"]},
    {name:"Palermo",place:"Italia",price:340,rating:"8,9",tag:"Mare low cost",image:"https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","3 notti","Centro"]}
  ],
  famiglia:[
    {name:"Serena Family Resort",place:"Calabria, Italia",price:1650,rating:"9,2",tag:"Migliore per famiglie",image:"https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=82",features:["All Inclusive","Mini club","Spiaggia"]},
    {name:"Blue Marine Village",place:"Puglia, Italia",price:1780,rating:"9,1",tag:"Più completo",image:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=82",features:["All Inclusive","Animazione","Piscine"]},
    {name:"Costa Verde Family Club",place:"Sicilia, Italia",price:1590,rating:"8,9",tag:"Miglior prezzo",image:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=82",features:["Mezza pensione","Mini club","Mare"]},
    {name:"Adriatic Family Village",place:"Emilia-Romagna, Italia",price:1490,rating:"8,8",tag:"Ideale con bambini",image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=82",features:["Mezza pensione","Animazione","Piscina"]},
    {name:"Ionian Family Resort",place:"Basilicata, Italia",price:1710,rating:"9,0",tag:"Relax per tutti",image:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=82",features:["All Inclusive","Spiaggia","Mini club"]},
    {name:"Sardinia Family Escape",place:"Sardegna, Italia",price:1890,rating:"9,3",tag:"Più desiderato",image:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=82",features:["All Inclusive","Mare","Animazione"]}
  ],
  sorprendimi:[
    {name:"Destinazione sorpresa: Porto",place:"Portogallo",price:480,rating:"9,0",tag:"Scelta Voytana",image:"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","3 notti","Colazione"]},
    {name:"Destinazione sorpresa: Malta",place:"Malta",price:520,rating:"8,9",tag:"Mare e relax",image:"https://images.unsplash.com/photo-1570015313224-274b942f9c46?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","4 notti","Piscina"]},
    {name:"Destinazione sorpresa: Vienna",place:"Austria",price:570,rating:"9,1",tag:"Elegante e culturale",image:"https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","3 notti","Hotel 4★"]},
    {name:"Destinazione sorpresa: Valencia",place:"Spagna",price:530,rating:"8,8",tag:"Sole e città",image:"https://images.unsplash.com/photo-1597841221817-40e2e5116b4f?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","4 notti","Spiaggia"]},
    {name:"Destinazione sorpresa: Praga",place:"Cechia",price:440,rating:"9,0",tag:"Weekend ideale",image:"https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","3 notti","Centro"]},
    {name:"Destinazione sorpresa: Marrakech",place:"Marocco",price:620,rating:"9,2",tag:"Esperienza unica",image:"https://images.unsplash.com/photo-1597212618440-806262de4f6b?auto=format&fit=crop&w=900&q=82",features:["Volo A/R","4 notti","Riad"]}
  ],
  business:[
    {name:"Milano Business Stay",place:"Milano, Italia",price:420,rating:"9,0",tag:"Vicino al centro",image:"https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=82",features:["Wi-Fi","Check-in rapido","Fattura"]},
    {name:"Roma Executive Hotel",place:"Roma, Italia",price:460,rating:"8,9",tag:"Scelta professionale",image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=82",features:["Business room","Colazione","Centro"]},
    {name:"Torino Smart Stay",place:"Torino, Italia",price:390,rating:"8,7",tag:"Miglior prezzo",image:"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=82",features:["Wi-Fi","Late check-in","Fattura"]},
    {name:"Bologna Work Hotel",place:"Bologna, Italia",price:410,rating:"8,8",tag:"Comodo e veloce",image:"https://images.unsplash.com/photo-1497366811364-ccf3f4c1fcb0?auto=format&fit=crop&w=900&q=82",features:["Stazione vicina","Wi-Fi","Colazione"]},
    {name:"Napoli Executive",place:"Napoli, Italia",price:400,rating:"8,9",tag:"Posizione strategica",image:"https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=82",features:["Centro","Wi-Fi","Fattura"]},
    {name:"Firenze Business Hub",place:"Firenze, Italia",price:450,rating:"9,1",tag:"Più apprezzato",image:"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=82",features:["Meeting area","Wi-Fi","Centro"]}
  ]
};

const modeTitles={
  soggiorno:"Tre soggiorni facili da confrontare",
  volo:"Tre voli selezionati per te",
  pacchetto:"Tre pacchetti volo + hotel",
  weekend:"Tre weekend selezionati per te",
  lowcost:"Tre proposte low cost",
  famiglia:"Tre villaggi famiglia selezionati",
  sorprendimi:"Tre sorprese pensate per te",
  business:"Tre soluzioni business"
};

function isoDate(date){return date.toISOString().split("T")[0]}
const today=new Date();
const start=new Date(today); start.setDate(today.getDate()+21);
const end=new Date(today); end.setDate(today.getDate()+24);
$("startDate").value=isoDate(start);
$("endDate").value=isoDate(end);
$("startDate").min=isoDate(today);
$("endDate").min=isoDate(today);

function updateGuests(){
  $("adultsCount").textContent=state.adults;
  $("childrenCount").textContent=state.children;
  $("roomsCount").textContent=state.rooms;
  $("guestsSummary").textContent=`${state.adults} ${state.adults===1?"adulto":"adulti"} · ${state.children} ${state.children===1?"bambino":"bambini"} · ${state.rooms} ${state.rooms===1?"camera":"camere"}`;
  renderChildAges();
}

function renderChildAges(){
  while(state.childAges.length<state.children) state.childAges.push(6);
  state.childAges=state.childAges.slice(0,state.children);
  $("childrenAges").innerHTML=state.childAges.map((age,index)=>`
    <label>
      <span>Età bambino ${index+1}</span>
      <select data-child-age="${index}">
        ${Array.from({length:18},(_,i)=>`<option value="${i}" ${i===age?"selected":""}>${i} ${i===1?"anno":"anni"}</option>`).join("")}
      </select>
    </label>`).join("");
  document.querySelectorAll("[data-child-age]").forEach(select=>{
    select.addEventListener("change",()=>{state.childAges[Number(select.dataset.childAge)]=Number(select.value)});
  });
}

function selectMode(mode){
  state.mode=mode;
  state.offset=0;
  document.querySelectorAll(".choice-card").forEach(card=>{
    const radio=card.querySelector("input");
    card.classList.toggle("active",radio.value===mode);
  });
  $("familyOptions").hidden=mode!=="famiglia";
  $("weekendOptions").hidden=mode!=="weekend";
  $("resultsTitle").textContent=modeTitles[mode];
  if(mode==="sorprendimi") $("destination").value="";
  renderResults();
}

function resultCard(item){
  const budget=Number($("budget").value)||800;
  const baseMode=state.mode==="famiglia"?1800:600;
  const scale=Math.max(.72,Math.min(1.3,budget/baseMode));
  const total=Math.max(150,Math.round(item.price*scale));
  return `<article class="result-card">
    <div class="result-image" style="background-image:url('${item.image}')">
      <span class="result-tag">${item.tag}</span>
      <button class="heart-button" type="button" aria-label="Salva ${item.name}">♡</button>
    </div>
    <div class="result-body">
      <h3>${item.name}</h3>
      <div class="result-meta">${item.place}</div>
      <div class="rating-row"><span>Recensioni eccellenti</span><span class="rating">${item.rating}</span></div>
      <div class="features">${item.features.map(f=>`<span>${f}</span>`).join("")}</div>
      <div class="result-price-row">
        <div><small>Totale indicativo</small><span class="price">€${total}</span></div>
        <button class="book-button" type="button">Prenota</button>
      </div>
    </div>
  </article>`;
}

function renderResults(){
  const data=datasets[state.mode];
  const items=[0,1,2].map(i=>data[(state.offset+i)%data.length]);
  $("resultsGrid").innerHTML=items.map(resultCard).join("");
  $("resultsSubtitle").textContent=`Esempi per ${state.adults} ${state.adults===1?"adulto":"adulti"}, ${state.children} ${state.children===1?"bambino":"bambini"} e ${state.rooms} ${state.rooms===1?"camera":"camere"}.`;
  document.querySelectorAll(".heart-button").forEach(button=>{
    button.addEventListener("click",()=>{button.textContent=button.textContent==="♡"?"♥":"♡"});
  });
  document.querySelectorAll(".book-button").forEach(button=>{
    button.addEventListener("click",()=>alert("Il pulsante Prenota è pronto per il link affiliato reale del partner."));
  });
}

function validate(){
  const error=$("formError");
  error.textContent="";
  if(Number($("budget").value)<100){error.textContent="Inserisci un budget minimo di €100.";return false}
  if(!$("departure").value.trim()){error.textContent="Inserisci la città o l'aeroporto di partenza.";return false}
  if(!$("startDate").value||!$("endDate").value){error.textContent="Seleziona le date del viaggio.";return false}
  if(new Date($("endDate").value)<=new Date($("startDate").value)){error.textContent="La data di ritorno deve essere successiva alla partenza.";return false}
  if(state.children>0 && state.childAges.length!==state.children){error.textContent="Indica l'età di tutti i bambini.";return false}
  return true;
}

$("travelForm").addEventListener("submit",async event=>{
  event.preventDefault();
  if(!validate()) return;
  const box=$("loadingBox");
  const text=$("loadingText");
  box.hidden=false;
  const messages=[
    "Controllo budget, date e ospiti...",
    "Confronto qualità, prezzo e durata...",
    "Seleziono le tre proposte più coerenti..."
  ];
  for(const message of messages){
    text.textContent=message;
    await new Promise(resolve=>setTimeout(resolve,600));
  }
  state.offset=0;
  renderResults();
  box.hidden=true;
  $("results").scrollIntoView({behavior:"smooth"});
});

document.querySelectorAll('input[name="travelMode"]').forEach(radio=>{
  radio.addEventListener("change",()=>selectMode(radio.value));
});

$("guestsButton").addEventListener("click",()=>$("guestsPopover").classList.toggle("open"));
$("closeGuests").addEventListener("click",()=>$("guestsPopover").classList.remove("open"));
document.querySelectorAll("[data-step]").forEach(button=>{
  button.addEventListener("click",()=>{
    const key=button.dataset.step;
    const direction=Number(button.dataset.direction);
    if(key==="adults") state.adults=Math.max(1,Math.min(12,state.adults+direction));
    if(key==="children") state.children=Math.max(0,Math.min(8,state.children+direction));
    if(key==="rooms") state.rooms=Math.max(1,Math.min(8,state.rooms+direction));
    updateGuests();
    renderResults();
  });
});

document.addEventListener("click",event=>{
  if(!$("guestsPopover").contains(event.target)&&!$("guestsButton").contains(event.target)){
    $("guestsPopover").classList.remove("open");
  }
});

$("moreButton").addEventListener("click",()=>{
  state.offset=(state.offset+3)%datasets[state.mode].length;
  renderResults();
});

$("menuButton").addEventListener("click",()=>$("mobileMenu").classList.toggle("open"));

const slides=[...document.querySelectorAll(".hero-slide")];
const dots=[...document.querySelectorAll(".slider-dot")];

function showSlide(index){
  state.slide=index;
  slides.forEach((slide,i)=>slide.classList.toggle("active",i===index));
  dots.forEach((dot,i)=>dot.classList.toggle("active",i===index));
}

dots.forEach((dot,index)=>dot.addEventListener("click",()=>showSlide(index)));
setInterval(()=>showSlide((state.slide+1)%slides.length),5500);

updateGuests();
selectMode("soggiorno");
