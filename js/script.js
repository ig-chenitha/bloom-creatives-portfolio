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


/* Homepage-only subtle pointer depth for the decorative 3D hero */
(() => {
  const scene = document.querySelector(".hero-3d-scene");
  const hero = document.querySelector(".hero");
  if (!scene || !hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let frame = 0;
  hero.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    cancelAnimationFrame(frame);
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    frame = requestAnimationFrame(() => {
      scene.style.marginLeft = (x * -16) + "px";
      scene.style.marginTop = (y * -12) + "px";
    });
  }, { passive: true });
  hero.addEventListener("pointerleave", () => {
    scene.style.marginLeft = "0";
    scene.style.marginTop = "0";
  }, { passive: true });
})();
