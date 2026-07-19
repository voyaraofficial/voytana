const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const state = { adults: 2, children: 0, category: 'Soggiorni', shown: new Set(), lastForm: null };
const destinations = [
  {name:'Creta',country:'Grecia',tag:'Mare e relax',img:'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85',features:['Volo + soggiorno','7 notti','Colazione inclusa']},
  {name:'Lisbona',country:'Portogallo',tag:'City break',img:'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=85',features:['Volo + hotel','4 notti','Centro città']},
  {name:'Maiorca',country:'Spagna',tag:'Sole e spiagge',img:'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1200&q=85',features:['Volo + resort','6 notti','Mezza pensione']},
  {name:'Praga',country:'Repubblica Ceca',tag:'Cultura e atmosfera',img:'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200&q=85',features:['Volo + hotel','3 notti','Zona centrale']},
  {name:'Corfù',country:'Grecia',tag:'Isola autentica',img:'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1200&q=85',features:['Volo + soggiorno','7 notti','Vista mare']},
  {name:'Budapest',country:'Ungheria',tag:'Weekend elegante',img:'https://images.unsplash.com/photo-1549877452-9c387954fbc2?auto=format&fit=crop&w=1200&q=85',features:['Volo + hotel','3 notti','Spa disponibile']},
  {name:'Tenerife',country:'Spagna',tag:'Clima perfetto',img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',features:['Volo + resort','7 notti','Mezza pensione']},
  {name:'Parigi',country:'Francia',tag:'Iconica e romantica',img:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85',features:['Volo + hotel','3 notti','Ottima posizione']},
  {name:'Dubrovnik',country:'Croazia',tag:'Mare e storia',img:'https://images.unsplash.com/photo-1555990538-c48aa7a69e18?auto=format&fit=crop&w=1200&q=85',features:['Volo + soggiorno','5 notti','Vicino al centro']}
];

function showToast(message){ const t=$('#toast'); t.textContent=message; t.classList.add('show'); clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>t.classList.remove('show'),2600); }
function togglePopover(id, trigger){
  const pop=$('#'+id); const isOpen=!pop.hidden;
  $$('.popover').forEach(p=>p.hidden=true); $$('.date-trigger,.guest-trigger').forEach(b=>b.setAttribute('aria-expanded','false'));
  if(!isOpen){ pop.hidden=false; trigger.setAttribute('aria-expanded','true'); positionPopover(pop,trigger); }
}
function positionPopover(pop, trigger){ if(innerWidth<=720) return; const r=trigger.getBoundingClientRect(); pop.style.top=`${r.bottom+10}px`; pop.style.left=`${Math.min(r.left,innerWidth-pop.offsetWidth-16)}px`; }

$('#dateTrigger').addEventListener('click',e=>togglePopover('datePopover',e.currentTarget));
$('#guestTrigger').addEventListener('click',e=>togglePopover('guestPopover',e.currentTarget));
$$('.close-popover').forEach(b=>b.addEventListener('click',()=>{$('#'+b.dataset.close).hidden=true;}));

document.addEventListener('click',e=>{ if(!e.target.closest('.popover')&&!e.target.closest('.date-trigger')&&!e.target.closest('.guest-trigger')) $$('.popover').forEach(p=>p.hidden=true); });

const today=new Date(); const iso=d=>d.toISOString().split('T')[0];
$('#startDate').min=iso(today); $('#endDate').min=iso(today);
$('#startDate').addEventListener('change',()=>{ $('#endDate').min=$('#startDate').value; if($('#endDate').value && $('#endDate').value<$('#startDate').value) $('#endDate').value=''; });
$('#confirmDates').addEventListener('click',()=>{ const a=$('#startDate').value,b=$('#endDate').value; if(!a||!b){showToast('Seleziona partenza e ritorno');return;} const fmt=x=>new Intl.DateTimeFormat('it-IT',{day:'2-digit',month:'short'}).format(new Date(x+'T12:00:00')); $('#dateSummary').textContent=`${fmt(a)} – ${fmt(b)}`; $('#datePopover').hidden=true; });

function renderChildAges(){ const box=$('#childrenAges'); box.innerHTML=''; for(let i=1;i<=state.children;i++){ const label=document.createElement('label'); label.innerHTML=`Età bambino ${i}<select aria-label="Età bambino ${i}">${Array.from({length:18},(_,n)=>`<option>${n} ${n===1?'anno':'anni'}</option>`).join('')}</select>`; box.appendChild(label); } }
$$('[data-counter]').forEach(btn=>btn.addEventListener('click',()=>{ const key=btn.dataset.counter; const min=key==='adults'?1:0,max=key==='adults'?12:8; state[key]=Math.max(min,Math.min(max,state[key]+(btn.dataset.action==='plus'?1:-1))); $('#adultsCount').textContent=state.adults; $('#childrenCount').textContent=state.children; renderChildAges(); }));
$('#confirmGuests').addEventListener('click',()=>{ $('#guestSummary').textContent=`${state.adults} ${state.adults===1?'adulto':'adulti'} · ${state.children} ${state.children===1?'bambino':'bambini'}`; $('#guestPopover').hidden=true; });

$$('.nav-item').forEach(btn=>btn.addEventListener('click',()=>{ $$('.nav-item').forEach(x=>x.classList.remove('active')); btn.classList.add('active'); state.category=btn.dataset.category; $('.main-nav').classList.remove('open'); $('.menu-toggle').setAttribute('aria-expanded','false'); showToast(`${state.category} selezionato`); }));
$('.menu-toggle').addEventListener('click',e=>{ const open=$('.main-nav').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded',String(open)); });

$('#languageButton').addEventListener('click',()=>showToast('Altre lingue saranno disponibili presto'));
$('#loginButton').addEventListener('click',()=>showToast('Area personale in arrivo'));

function priceFor(base,budget){ const factor=.78+Math.random()*.18; return Math.max(189,Math.round(Math.min(budget*factor,base+(Math.random()*140-50))/10)*10); }
function pickThree(){ let available=destinations.filter(d=>!state.shown.has(d.name)); if(available.length<3){ state.shown.clear(); available=[...destinations]; } return available.sort(()=>Math.random()-.5).slice(0,3); }
function createCard(d,budget,index){ const price=priceFor(430+index*80,budget); state.shown.add(d.name); return `<article class="trip-card"><div class="trip-image" style="background-image:url('${d.img}')"><span class="trip-badge">${d.tag}</span><div class="trip-location"><h3>${d.name}</h3><p>${d.country}</p></div></div><div class="trip-body"><div class="trip-features">${d.features.map(f=>`<span>${f}</span>`).join('')}</div><div class="trip-bottom"><div class="trip-price"><span class="price-note">Prezzo totale indicativo</span><strong>€${price}</strong></div><button class="book-button" type="button">Vedi proposta</button></div></div></article>`; }
function renderResults(){ const f=state.lastForm; const budget=Number(f.budget)||700; const picks=pickThree(); $('#cardsGrid').innerHTML=picks.map((d,i)=>createCard(d,budget,i)).join(''); $('#resultsMeta').textContent=`Da ${f.partenza} · ${f.destination || 'Ovunque'} · ${state.adults} adulti · ${state.children} bambini · budget €${budget}`; $('#risultati').hidden=false; $('#risultati').scrollIntoView({behavior:'smooth',block:'start'}); $$('.book-button').forEach(b=>b.addEventListener('click',openDemoModal)); }

$('#motore').addEventListener('submit',e=>{ e.preventDefault(); const budget=$('#budget').value; const partenza=$('#partenza').value; if(!budget){showToast('Inserisci il budget totale');$('#budget').focus();return;} if(!partenza){showToast('Seleziona la partenza');$('#partenza').focus();return;} if(!$('#startDate').value||!$('#endDate').value){showToast('Seleziona le date');$('#dateTrigger').focus();return;} state.lastForm={budget,partenza,destination:$('#destinazione').value}; state.shown.clear(); renderResults(); });
$('#moreResults').addEventListener('click',()=>state.lastForm&&renderResults());

function openDemoModal(){ $('#demoModal').hidden=false; document.body.style.overflow='hidden'; }
function closeDemoModal(){ $('#demoModal').hidden=true; document.body.style.overflow=''; }
$('.modal-close').addEventListener('click',closeDemoModal); $('.modal-action').addEventListener('click',closeDemoModal); $('#demoModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeDemoModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDemoModal();$$('.popover').forEach(p=>p.hidden=true);}});
