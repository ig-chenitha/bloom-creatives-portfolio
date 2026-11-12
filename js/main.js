const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('.navigation');menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');}));document.querySelector('#year').textContent=new Date().getFullYear();const lightbox=document.querySelector('.lightbox');const lightboxImage=lightbox.querySelector('img');const lightboxCaption=lightbox.querySelector('p');function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';}// BLOOM VIEW PROJECT + BASIC IMAGE SAVE PROTECTION
document.querySelectorAll('.work-card').forEach(card=>{
  const viewButton=card.querySelector('.work-view');
  viewButton?.addEventListener('click',()=>{
    lightboxImage.src=card.dataset.image;
    lightboxImage.alt=card.dataset.title;
    lightboxCaption.textContent=card.dataset.title;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });
});
document.querySelectorAll('.work-image img,.lightbox img').forEach(image=>{
  image.setAttribute('draggable','false');
  image.addEventListener('dragstart',event=>event.preventDefault());
  image.addEventListener('contextmenu',event=>event.preventDefault());
});
document.addEventListener('contextmenu',event=>{
  if(event.target.closest('.work-image,.lightbox')) event.preventDefault();
});lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox();});const glow=document.querySelector('.cursor-glow');if(matchMedia('(pointer:fine)').matches){document.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';});}const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});document.querySelectorAll('.section-label,.intro-copy,.service-list article,.work-card,.approach-steps p,.contact h2').forEach(el=>{el.classList.add('reveal');observer.observe(el);});