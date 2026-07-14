const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const budgetRange=$("#budgetRange"), budgetValue=$("#budgetValue");
const fmt=n=>Number(n).toLocaleString("it-IT");

function setBudget(v){
  budgetRange.value=v;
  budgetValue.textContent=fmt(v);
  $$("#budgetChips button").forEach(b=>b.classList.toggle("active",b.dataset.value===String(v)));
}
budgetRange.addEventListener("input",e=>setBudget(e.target.value));
$$("#budgetChips button").forEach(b=>b.addEventListener("click",()=>setBudget(b.dataset.value)));

const obs=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}
}),{threshold:.12});
$$(".reveal").forEach(el=>obs.observe(el));

window.addEventListener("scroll",()=>{
  const h=document.documentElement.scrollHeight-innerHeight;
  $(".progress").style.width=`${Math.min(100,scrollY/h*100)}%`;
});

function toast(message){
  const el=$("#toast");
  el.textContent=message;
  el.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>el.classList.remove("show"),2600);
}

$("#generateTrips").addEventListener("click",()=>{
  const btn=$("#generateTrips");
  btn.classList.add("loading");
  btn.disabled=true;
  setTimeout(()=>{
    btn.classList.remove("loading");
    btn.disabled=false;
    $("#proposte").scrollIntoView({behavior:"smooth"});
    toast("Tre proposte create per il tuo budget.");
  },1100);
});

$("#heroSurprise").addEventListener("click",()=>{
  setBudget(1500);
  $("#vibeSelect").value="Sorprendimi";
  $("#live").scrollIntoView({behavior:"smooth"});
  toast("Modalità Sorprendimi attivata.");
});

$("#moreTrips").addEventListener("click",()=>toast("Nuove proposte disponibili nella versione completa."));
$$(".trip-media button").forEach(btn=>btn.addEventListener("click",()=>{
  btn.classList.toggle("saved");
  btn.textContent=btn.classList.contains("saved")?"♥":"♡";
}));

$("#waitlistForm").addEventListener("submit",e=>{
  e.preventDefault();
  const email=$("#emailInput").value.trim();
  if(!email)return;
  localStorage.setItem("voytana_waitlist_email",email);
  $("#successMessage").classList.add("show");
  e.target.reset();
});

$("#languageSelect").addEventListener("change",e=>{
  localStorage.setItem("voytana_language",e.target.value);
  toast("Lingua selezionata: "+e.target.value.toUpperCase());
});
const savedLang=localStorage.getItem("voytana_language");
if(savedLang)$("#languageSelect").value=savedLang;
