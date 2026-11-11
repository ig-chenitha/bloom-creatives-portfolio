/* VYNTRO client feedback — Supabase REST API */
const VYNTRO_DB_URL="https://zkxtlbvgurziniicpdyg.supabase.co";
const VYNTRO_DB_KEY="sb_publishable_Q3IBH3JE1e6fGoqFQNUoig_FLufny0b";
const feedbackApi=(path,options={})=>fetch(VYNTRO_DB_URL+"/rest/v1/"+path,{...options,headers:{apikey:VYNTRO_DB_KEY,Authorization:"Bearer "+VYNTRO_DB_KEY,"Content-Type":"application/json",...options.headers}});
const feedbackForm=document.getElementById("feedbackForm"),feedbackStatus=document.getElementById("feedbackStatus");let selectedRating=0;
const ratingStars=[...document.querySelectorAll(".rating-star")];
function setSelectedRating(rating){
  selectedRating=Math.max(0,Math.min(5,Number(rating)||0));
  ratingStars.forEach(star=>{
    const value=Number(star.dataset.rating);
    const active=value<=selectedRating;
    star.classList.toggle("selected",active);
    star.setAttribute("aria-pressed",String(value===selectedRating));
  });
}
ratingStars.forEach(star=>star.addEventListener("click",()=>setSelectedRating(star.dataset.rating)));
// Keep every star up to the chosen rating visibly highlighted, including after theme CSS loads.
if(!document.getElementById("feedback-rating-fix")){
  const style=document.createElement("style");
  style.id="feedback-rating-fix";
  style.textContent=".feedback-section .rating-star.selected,.feedback-section .rating-star[aria-pressed=true]{color:#28A0FF!important;text-shadow:0 0 14px rgba(22,139,255,.65)}.feedback-section .rating-star{transition:color .16s ease,text-shadow .16s ease,transform .16s ease}.feedback-section .rating-star:hover{transform:translateY(-2px)}.feedback-section .approved-reviews,.feedback-section .review-card{min-width:0}.feedback-section .review-card{overflow-wrap:anywhere;word-break:normal}.feedback-section .review-card p{white-space:normal;overflow-wrap:anywhere;}";
  document.head.append(style);
}
async function loadApprovedFeedback(){const host=document.getElementById("approvedReviews");if(!host)return;try{const response=await feedbackApi("public_approved_feedback?select=id,name,rating,feedback,created_at&order=created_at.desc&limit=12");if(!response.ok)throw Error();const reviews=await response.json();document.getElementById("reviewCount").textContent=String(reviews.length);document.getElementById("averageRating").textContent=reviews.length?(reviews.reduce((sum,r)=>sum+r.rating,0)/reviews.length).toFixed(1)+" ★":"—";host.replaceChildren();if(!reviews.length){const p=document.createElement("p");p.className="feedback-note";p.textContent="No published reviews yet. Be the first to share your experience.";host.append(p);return}reviews.forEach(review=>{const card=document.createElement("article");card.className="review-card";const stars=document.createElement("div");stars.className="review-stars";stars.textContent="★".repeat(review.rating)+"☆".repeat(5-review.rating);const message=document.createElement("p");message.textContent=review.feedback;const name=document.createElement("strong");name.textContent=review.name;card.append(stars,message,name);host.append(card)})}catch(error){host.innerHTML='<p class="feedback-note">Reviews are temporarily unavailable. Please try again later.</p>'}}
if(feedbackForm)feedbackForm.addEventListener("submit",async event=>{event.preventDefault();if(document.getElementById("feedbackWebsite").value)return;const name=document.getElementById("feedbackName").value.trim(),email=document.getElementById("feedbackEmail").value.trim(),feedback=document.getElementById("feedbackMessage").value.trim();if(!selectedRating){feedbackStatus.textContent="Please select a star rating.";return}const submit=feedbackForm.querySelector('[type="submit"]');submit.disabled=true;submit.textContent="Submitting…";feedbackStatus.textContent="";try{const response=await feedbackApi("client_feedback",{method:"POST",headers:{Prefer:"return=minimal"},body:JSON.stringify({name,email,rating:selectedRating,feedback})});if(!response.ok)throw Error();feedbackForm.reset();selectedRating=0;setSelectedRating(0);feedbackStatus.textContent="Thank you! Your review was submitted and is awaiting approval."}catch(error){feedbackStatus.textContent="Sorry, we couldn't submit your review. Please try again."}finally{submit.disabled=false;submit.textContent="Submit feedback ↗"}});
loadApprovedFeedback();
