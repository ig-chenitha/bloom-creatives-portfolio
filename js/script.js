/* VYNTRO CREATIVES — shared site interactions */
const header=document.getElementById('header');if(header)window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>24));
const menuToggle=document.getElementById('menuToggle'),navLinks=document.getElementById('navLinks');if(menuToggle&&navLinks){menuToggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');header?.classList.toggle('menu-open',open);menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');menuToggle.textContent=open?'×':'☰'});navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('open');header?.classList.remove('menu-open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰'}));}
function showImage(src){const image=document.getElementById('largeImage'),box=document.getElementById('lightbox');if(image&&box){image.src=src;box.classList.add('open');document.body.style.overflow='hidden'}}function hideImage(){const box=document.getElementById('lightbox');if(box){box.classList.remove('open');document.body.style.overflow=''}}document.addEventListener('keydown',e=>{if(e.key==='Escape')hideImage()});

/* Gallery filters and artwork preview */
const buttons=[...document.querySelectorAll('.filter')],items=[...document.querySelectorAll('.item')],empty=document.getElementById('empty');
buttons.forEach(btn=>btn.addEventListener('click',()=>{buttons.forEach(b=>b.classList.toggle('active',b===btn));let shown=0;items.forEach(item=>{const visible=btn.dataset.filter==='all'||item.dataset.category===btn.dataset.filter;item.style.display=visible?'':'none';if(visible)shown++});empty.style.display=shown?'none':'block'}));
const lightbox=document.getElementById('lightbox'),large=document.getElementById('largeImage');
function openPreview(item){const img=item.querySelector('img');large.src=img.src;large.alt=img.alt;lightbox.classList.add('open');document.body.style.overflow='hidden'}
function closePreview(){lightbox.classList.remove('open');document.body.style.overflow=''}
items.forEach(item=>{item.addEventListener('click',()=>openPreview(item));item.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openPreview(item)}})});
document.getElementById('closePreview').addEventListener('click',closePreview);lightbox.addEventListener('click',e=>{if(e.target===lightbox)closePreview()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closePreview()});
/* Close mobile navigation with Escape or when tapping outside */
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navLinks?.classList.contains('open')){navLinks.classList.remove('open');header?.classList.remove('menu-open');menuToggle?.setAttribute('aria-expanded','false');if(menuToggle)menuToggle.textContent='☰'}});
document.addEventListener('click',e=>{if(navLinks?.classList.contains('open')&&!e.target.closest('header')){navLinks.classList.remove('open');header?.classList.remove('menu-open');menuToggle?.setAttribute('aria-expanded','false');if(menuToggle)menuToggle.textContent='☰'}});
