(function(){
  function setYear(id){
    var el=document.getElementById(id);
    if(el) el.textContent=new Date().getFullYear();
  }
  setYear('year'); setYear('year-about'); setYear('year-services'); setYear('year-contact');

  (function(){
    var heroes = document.querySelectorAll('.hero, .hero-about');
    heroes.forEach(function(hero){
      var bg = hero.getAttribute('data-bg') || hero.dataset.bg;
      if(!bg) return;
      hero.style.backgroundImage = 'url("' + bg + '")';
      hero.style.backgroundSize = 'cover';
      hero.style.backgroundPosition = 'center';
      hero.classList.add('has-image');
    });
  })();

  function attachNavToggle(btnId, navId){
    var btn=document.getElementById(btnId);
    var nav=document.getElementById(navId);
    if(!btn||!nav) return;
    btn.addEventListener('click',function(){ nav.classList.toggle('open'); });
  }
  attachNavToggle('nav-toggle','main-nav');
  attachNavToggle('nav-toggle-about','main-nav-about');
  attachNavToggle('nav-toggle-services','main-nav-services');
  attachNavToggle('nav-toggle-contact','main-nav-contact');

  function createImageModal(opts){
    var modal = document.getElementById(opts.modalId);
    if(!modal) return;
    var img = modal.querySelector('img');
    var close = modal.querySelector('.modal-close');
    function open(src, alt){ img.src=src; img.alt=alt||''; modal.setAttribute('aria-hidden','false'); }
    function closeModal(){ modal.setAttribute('aria-hidden','true'); img.src=''; }
    close.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e){ if(e.target===modal) closeModal(); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeModal(); });
    document.querySelectorAll(opts.triggerSelector).forEach(function(el){
      el.addEventListener('click', function(){ open(el.src || el.getAttribute('data-src'), el.alt); });
    });
  }
  createImageModal({modalId:'image-modal', triggerSelector:'.card img'});
  createImageModal({modalId:'image-modal-about', triggerSelector:'.team-img'});

  var form = document.getElementById('contact-form');
  if(form){
    var feedback = document.getElementById('form-feedback');
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var valid = true;
      if(!name || !email || !message) valid=false;
      var emailRx=/^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if(!emailRx.test(email)) valid=false;
      if(!valid){ feedback.textContent='Please complete the form with a valid email.'; feedback.style.color='crimson'; return; }
      feedback.textContent='Thanks — your message was recorded locally. (No server in this demo)'; feedback.style.color='var(--accent)';
      form.reset();
    });
  }

  var filterBtns = document.querySelectorAll('.filter-btn');
  if(filterBtns.length){
    var cards = document.querySelectorAll('.service-cards .card');
    function setActive(btn){ filterBtns.forEach(function(b){ b.classList.toggle('active', b===btn); }); }
    filterBtns.forEach(function(btn){
      btn.addEventListener('click', function(){
        var key = btn.getAttribute('data-filter'); setActive(btn);
        cards.forEach(function(c){
          if(key==='all'||c.getAttribute('data-category')===key) c.style.display='block'; else c.style.display='none';
        });
      });
    });
  }
})();
