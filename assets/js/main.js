
// Basic helpers and animations (replacing framer-motion)
function scrollTo(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
}

function toggleMenu(){
  const nav = document.querySelector('.nav');
  if(!nav) return;
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

// IntersectionObserver reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.classList.add('inview');
      io.unobserve(e.target);
    }
  });
},{threshold:0.12});

document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));

// Floating elements/hero float subtle animation
let floatEl = document.querySelector('.hero-float');
if(floatEl){
  floatEl.style.width = '140px';
  floatEl.style.height = '140px';
  floatEl.style.borderRadius = '50%';
  floatEl.style.position = 'absolute';
  floatEl.style.right = '6%';
  floatEl.style.top = '20%';
  floatEl.style.background = 'linear-gradient(90deg, rgba(168,85,247,0.18), rgba(59,130,246,0.18))';
  floatEl.style.filter = 'blur(18px)';
  floatEl.animate([{transform:'translateY(0px)'},{transform:'translateY(24px)'},{transform:'translateY(0px)'}],{duration:4500,iterations:Infinity});
}

// Simple form handler - default: show success message locally.
// If you deploy Google Apps Script, replace FORM_ENDPOINT with the deployed URL
const FORM_ENDPOINT = ''; // <-- paste your Google Apps Script POST URL here to enable real sending

function handleForm(e){
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const payload = {};
  data.forEach((v,k) => payload[k]=v);
  if(FORM_ENDPOINT){
    // Attempt to send (CORS might block if not set in Apps Script)
    fetch(FORM_ENDPOINT, {method:'POST',mode:'no-cors',body: JSON.stringify(payload)})
      .then(()=>{ alert('Mensagem enviada! Obrigado.'); form.reset(); })
      .catch(()=>{ alert('Erro ao enviar. Verifique o endpoint do Apps Script.'); });
  } else {
    // local friendly behavior
    alert('Formulário não está configurado para envio. Para ativar, abra apps_script.txt e README e siga as instruções.');
  }
}

// small CSS-in JS to animate elements when inview
const style = document.createElement('style');
style.innerHTML = `
[data-animate].inview { transform: translateY(0); opacity:1; transition: all .7s cubic-bezier(.2,.9,.3,1); }
[data-animate] { transform: translateY(24px); opacity:0; }
`;
document.head.appendChild(style);


// dynamically assign generated portfolio images (if thumbs exist)
(function assignPortfolioImages(){
  const thumbs = document.querySelectorAll('.grid-3 .thumb');
  if(!thumbs.length) return;
  thumbs.forEach((t, i) => {
    const idx = (i % 6) + 1;
    t.style.backgroundImage = `url('assets/img/portfolio${idx}.png')`;
    // add label and title if missing
    if(!t.querySelector('.label')){
      const lab = document.createElement('div'); lab.className='label'; lab.textContent = ['Loja Online','Landing Page','Blog','Website','Website','Landing Page'][i%6];
      t.appendChild(lab);
    }
    if(!t.querySelector('.title')){
      const title = document.createElement('div'); title.className='title'; title.textContent = ['E-commerce Premium','App Fitness Tech','Blog Corporativo','Portal Imobiliário','Restaurant Delivery','Startup SaaS'][i%6];
      t.appendChild(title);
    }
  });
})();


// Smooth scroll fallback for browsers that ignore CSS smooth behavior
document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener("click", function(e){
        const targetID = this.getAttribute("href").substring(1);
        const target = document.getElementById(targetID);
        if(target){
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 40;
            window.scrollTo({ top: top, behavior: "smooth" });
        }
    });
});
