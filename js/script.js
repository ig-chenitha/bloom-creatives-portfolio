/* VYNTRO CREATIVES — shared site interactions */
(() => {
  const header = document.getElementById("header");
  if (header) {
    const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  window.showImage = (src) => {
    const image = document.getElementById("largeImage");
    const box = document.getElementById("lightbox");
    if (!image || !box) return;
    image.src = src;
    box.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  window.hideImage = () => {
    const box = document.getElementById("lightbox");
    if (!box) return;
    box.classList.remove("open");
    document.body.style.overflow = "";
  };

  const galleryItems = [...document.querySelectorAll(".item")];
  const filterButtons = [...document.querySelectorAll(".filter")];
  const emptyState = document.getElementById("empty");
  const lightbox = document.getElementById("lightbox");
  const largeImage = document.getElementById("largeImage");
  const closeButton = document.getElementById("closePreview");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle("active", item === button));

      let visibleCount = 0;
      galleryItems.forEach((item) => {
        const visible =
          selectedCategory === "all" ||
          item.dataset.category === selectedCategory;

        item.hidden = !visible;
        item.style.setProperty("display", visible ? "inline-block" : "none", "important");
        if (visible) visibleCount++;
      });

      if (emptyState) emptyState.style.display = visibleCount ? "none" : "block";
    });
  });

  const openGalleryPreview = (item, clickedImage = null) => {
    const image = clickedImage || item.querySelector("img");
    if (!image || !lightbox || !largeImage) return;
    largeImage.src = image.src;
    largeImage.alt = image.alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const closeGalleryPreview = () => {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  };

  galleryItems.forEach((item) => {
    item.addEventListener("click", (event) => openGalleryPreview(item, event.target.closest("img")));
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGalleryPreview(item);
      }
    });
  });

  closeButton?.addEventListener("click", closeGalleryPreview);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeGalleryPreview();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      window.hideImage();
      closeGalleryPreview();
    }
  });

  const inquiryForm = document.getElementById("projectInquiryForm");
  inquiryForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!inquiryForm.reportValidity()) return;
    const data = new FormData(inquiryForm);
    const subject = encodeURIComponent("New project inquiry — VYNTRO CREATIVES");
    const body = encodeURIComponent(
      "Name: " + data.get("name") + "\n" +
      "Email: " + data.get("email") + "\n" +
      "Project type: " + data.get("projectType") + "\n" +
      "Budget: " + (data.get("budget") || "Not specified") + "\n\n" +
      "Project brief:\n" + data.get("brief")
    );
    window.location.href = "mailto:vyntro.creatives@gmail.com?subject=" + subject + "&body=" + body;
  });
})();

/* Scroll reveal: animate existing sections/cards without changing their layout */
(() => {
  const targets = document.querySelectorAll(
    ".section-heading, .project, .service-card, .about-content, .testimonial, .contact-content"
  );
  if (!targets.length) return;
  targets.forEach((el, index) => {
    el.setAttribute("data-scroll-reveal", "");
    el.style.transitionDelay = (index % 4) * 75 + "ms";
  });
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }
  if (!("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  targets.forEach(el => observer.observe(el));
})();
