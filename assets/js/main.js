
document.addEventListener('DOMContentLoaded', function(){

  // Mobile toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const nav = document.querySelector('.nav');
  mobileToggle && mobileToggle.addEventListener('click', ()=> {
    if(nav.style.display === 'flex'){ nav.style.display = 'none'; }
    else{ nav.style.display = 'flex'; nav.style.flexDirection = 'column'; nav.style.gap = '10px'; nav.style.padding = '12px'; }
  });

  // Header scroll
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', ()=> {
    if(window.scrollY > 40){ header.style.backdropFilter = 'blur(8px)'; header.style.background = 'linear-gradient(180deg, rgba(6,6,9,0.6), rgba(6,6,9,0.25))'; }
    else{ header.style.backdropFilter = 'blur(6px)'; header.style.background = 'linear-gradient(180deg, rgba(10,10,12,0.45), rgba(10,10,12,0.12))'; }
  });

  // Portfolio modal
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.portfolio-card').forEach(card=>{
    card.addEventListener('click', ()=> openModal(card));
    card.addEventListener('keypress', (e)=> { if(e.key === 'Enter') openModal(card); });
  });

  function openModal(card){
    const title = card.dataset.title || 'Projeto';
    const desc = card.dataset.desc || 'Descrição do projeto.';
    modalBody.innerHTML = `
      <div style="display:flex;gap:18px;align-items:flex-start;flex-wrap:wrap">
        <div style="flex:1;min-width:260px;height:220px;border-radius:10px;overflow:hidden;background:linear-gradient(120deg, rgba(91,18,255,0.12), rgba(0,119,255,0.06));display:flex;align-items:center;justify-content:center">
          <strong style="font-size:18px;color:#5b12ff;">Preview</strong>
        </div>
        <div style="flex:1.6;min-width:260px">
          <h3 style="margin-top:0">${title}</h3>
          <p style="color:rgba(230,230,233,0.9)">${desc}</p>
          <p style="color:rgba(230,230,233,0.75)">Tecnologias: HTML, CSS, JavaScript. Foco em performance, SEO e UX.</p>
          <div style="margin-top:14px">
            <a href="#" class="btn btn-primary" style="margin-right:8px">Ver Projeto</a>
            <a href="#contato" class="btn btn-ghost">Solicitar Orçamento</a>
          </div>
        </div>
      </div>
    `;
    modal.setAttribute('aria-hidden','false');
  }

  modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (e)=> { if(e.target === modal) modal.setAttribute('aria-hidden','true'); });

  // Form submit (AJAX) to /api/contact
  const form = document.getElementById('form-contact');
  const sendBtn = document.getElementById('send-btn');
  form && form.addEventListener('submit', async (e) => {
    e.preventDefault();
    sendBtn.textContent = 'Enviando...';
    sendBtn.disabled = true;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    try{
      const res = await fetch(form.action, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      if(res.ok){
        sendBtn.textContent = 'Mensagem Enviada';
        form.reset();
      } else {
        const err = await res.json();
        alert('Erro: ' + (err.message || 'Falha ao enviar'));
      }
    }catch(err){
      alert('Erro ao enviar: ' + err.message);
    }finally{
      setTimeout(()=>{ sendBtn.textContent = 'Enviar Mensagem'; sendBtn.disabled = false; }, 1600);
    }
  });

  // simple inview fade using IntersectionObserver
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('inview');
    });
  }, {threshold:0.12});
  document.querySelectorAll('section, .card, .portfolio-card').forEach(el=> io.observe(el));
});
