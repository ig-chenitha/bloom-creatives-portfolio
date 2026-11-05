/* VYNTRO CREATIVES — shared site interactions */
const header=document.getElementById('header');if(header)window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>24));
const menuToggle=document.getElementById('menuToggle'),navLinks=document.getElementById('navLinks');if(menuToggle&&navLinks){navLinks.classList.remove('open');header?.classList.remove('menu-open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation');menuToggle.textContent='☰';menuToggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');header?.classList.toggle('menu-open',open);menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');menuToggle.textContent=open?'×':'☰'});navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('open');header?.classList.remove('menu-open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰'}));}
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
\n
/* VYNTRO feedback — public submission and approved reviews */
const VYNTRO_SUPABASE_URL="https://fcjrqzohjakjxvhruubc.supabase.co";
const VYNTRO_SUPABASE_KEY="sb_publishable_RkG0M_heNrwIpWmmjOHZZg_fSNth8Ew";
const feedbackClient=window.supabase?.createClient(VYNTRO_SUPABASE_URL,VYNTRO_SUPABASE_KEY);
const feedbackForm=document.getElementById('feedbackForm');
const feedbackStatus=document.getElementById('feedbackStatus');
let selectedRating=0;
document.querySelectorAll('.rating-star').forEach(star=>star.addEventListener('click',()=>{
 selectedRating=Number(star.dataset.rating);
 document.querySelectorAll('.rating-star').forEach(s=>{const active=Number(s.dataset.rating)<=selectedRating;s.classList.toggle('selected',active);s.setAttribute('aria-pressed',String(Number(s.dataset.rating)===selectedRating))});
}));
async function loadApprovedFeedback(){
 if(!feedbackClient)return;
 const {data,error}=await feedbackClient.from('vyntro_feedback').select('display_name,rating,message,created_at').eq('status','approved').order('created_at',{ascending:false}).limit(12);
 const host=document.getElementById('approvedReviews');
 if(error){host.innerHTML='<p class="feedback-note">Reviews are temporarily unavailable.</p>';return}
 const reviews=data||[];
 document.getElementById('reviewCount').textContent=String(reviews.length);
 document.getElementById('averageRating').textContent=reviews.length?(reviews.reduce((sum,r)=>sum+r.rating,0)/reviews.length).toFixed(1)+' ★':'—';
 host.replaceChildren();
 if(!reviews.length){host.innerHTML='<p class="feedback-note">No published reviews yet. Be the first to share your experience.</p>';return}
 reviews.forEach(review=>{
  const card=document.createElement('article');card.className='review-card';
  const stars=document.createElement('div');stars.className='review-stars';stars.textContent='★'.repeat(review.rating)+'☆'.repeat(5-review.rating);
  const message=document.createElement('p');message.textContent=review.message;
  const name=document.createElement('strong');name.textContent=review.display_name;
  card.append(stars,message,name);host.append(card);
 });
}
if(feedbackForm){
 feedbackForm.addEventListener('submit',async event=>{
  event.preventDefault();
  if(!feedbackClient){feedbackStatus.textContent='Feedback service is unavailable right now.';return}
  const display_name=document.getElementById('feedbackName').value.trim();
  const message=document.getElementById('feedbackMessage').value.trim();
  if(!selectedRating){feedbackStatus.textContent='Please choose a star rating.';return}
  const submit=feedbackForm.querySelector('[type=submit]');submit.disabled=true;submit.textContent='Submitting…';
  const {error}=await feedbackClient.from('vyntro_feedback').insert({display_name,rating:selectedRating,message});
  submit.disabled=false;submit.textContent='Submit feedback ↗';
  if(error){feedbackStatus.textContent='Could not submit right now. Please try again.';return}
  feedbackForm.reset();selectedRating=0;document.querySelectorAll('.rating-star').forEach(s=>{s.classList.remove('selected');s.setAttribute('aria-pressed','false')});
  feedbackStatus.textContent='Thank you! Your feedback is awaiting approval.';
 });
}
loadApprovedFeedback();
