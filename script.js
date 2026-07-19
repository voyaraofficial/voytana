const alternatives = [
  [
    {city:'Valencia', vibe:'Sole · Cultura', detail:'4 notti · Hotel 4★ · Volo incluso', price:'€641', tag:'Miglior equilibrio', image:'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=1400&q=85'},
    {city:'Praga', vibe:'Cultura · City break', detail:'4 notti · Boutique hotel · Colazione', price:'€552', tag:'Più conveniente', image:'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&w=1200&q=85'},
    {city:'Malta', vibe:'Mare · Scoperta', detail:'5 notti · Resort · Mezza pensione', price:'€693', tag:'Più sorprendente', image:'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=85'}
  ],
  [
    {city:'Lisbona', vibe:'Oceano · Cultura', detail:'4 notti · Hotel centrale · Volo incluso', price:'€676', tag:'Miglior equilibrio', image:'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1400&q=85'},
    {city:'Cracovia', vibe:'Storia · Low cost', detail:'4 notti · Hotel 4★ · Colazione', price:'€489', tag:'Più conveniente', image:'https://images.unsplash.com/photo-1519197924294-4ba991a11128?auto=format&fit=crop&w=1200&q=85'},
    {city:'Rodi', vibe:'Mare · Relax', detail:'5 notti · Resort · Mezza pensione', price:'€698', tag:'Più sorprendente', image:'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=1200&q=85'}
  ]
];
let setIndex = 0;
const toast = document.getElementById('toast');
function showToast(text){toast.textContent=text;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2800)}

document.getElementById('search').addEventListener('submit', e=>{
  e.preventDefault();
  const budget=document.getElementById('budget').value || 'il tuo';
  document.getElementById('results').scrollIntoView({behavior:'smooth'});
  showToast(`Stiamo selezionando 3 proposte entro €${budget}`);
});

document.querySelectorAll('.category-card').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.category-card').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('search').scrollIntoView({behavior:'smooth',block:'center'});
}));

document.getElementById('moreButton').addEventListener('click',()=>{
  const cards=[...document.querySelectorAll('.destination-card')];
  const data=alternatives[setIndex % alternatives.length];
  cards.forEach((card,i)=>{
    card.style.opacity='0'; card.style.transform='translateY(14px)';
    setTimeout(()=>{
      card.querySelector('img').src=data[i].image;
      card.querySelector('.pill').textContent=data[i].tag;
      card.querySelector('.card-vibe').textContent=data[i].vibe;
      card.querySelector('h3').textContent=data[i].city;
      card.querySelector('p').textContent=data[i].detail;
      card.querySelector('.card-bottom strong').textContent=data[i].price;
      card.style.opacity='1'; card.style.transform='';
    },220+i*90);
  });
  setIndex++;
  showToast('Ecco 3 nuove destinazioni, senza ripetizioni.');
});

document.querySelectorAll('.card-top button').forEach(btn=>btn.addEventListener('click',()=>{
  btn.textContent = btn.textContent==='♥' ? '♡' : '♥';
  showToast(btn.textContent==='♥' ? 'Proposta salvata' : 'Proposta rimossa');
}));

document.querySelectorAll('.card-cta').forEach(btn=>btn.addEventListener('click',()=>showToast('Dettagli completi presto disponibili.')));

const header=document.querySelector('.site-header');
window.addEventListener('scroll',()=>{
  const scrolled=window.scrollY>60;
  header.style.position=scrolled?'fixed':'absolute';
  header.style.background=scrolled?'rgba(7,25,54,.94)':'transparent';
  header.style.boxShadow=scrolled?'0 8px 30px rgba(0,0,0,.12)':'none';
});
