/* BLOOM CREATIVES — lightweight scroll reveals and image loading helpers */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const selectors = [".section-head",".about-visual",".about-copy",".service",".project",".gallery-tile",".step",".contact-panel",".feedback-form-panel",".feedback-reviews-panel",".intro",".filters",".item",".contact-form",".skills-card","footer .foot"];
  document.querySelectorAll(selectors.join(",")).forEach(el => el.setAttribute("data-reveal","up"));
  document.querySelectorAll(".services,.work-grid,.gallery-grid,.process,.grid,.skills-grid").forEach(el => {
    el.classList.add("reveal-stagger"); el.setAttribute("data-reveal","up");
  });
  document.querySelectorAll("img").forEach(img => {
    img.decoding = "async";
    if (!img.closest("header,footer") && !img.complete) img.loading = "lazy";
  });
  document.documentElement.classList.add("motion-ready");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    document.querySelectorAll("[data-reveal]").forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries,io) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
    });
  },{rootMargin:"0px 0px 80px 0px",threshold:0.08});
  document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
  window.addEventListener("pagehide",()=>observer.disconnect(),{once:true});
})();
