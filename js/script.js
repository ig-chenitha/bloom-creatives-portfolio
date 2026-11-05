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
      filterButtons.forEach((item) => item.classList.toggle("active", item === button));
      let visibleCount = 0;
      galleryItems.forEach((item) => {
        const visible = button.dataset.filter === "all" || item.dataset.category === button.dataset.filter;
        item.hidden = !visible;
        if (visible) visibleCount++;
      });
      if (emptyState) emptyState.style.display = visibleCount ? "none" : "block";
    });
  });

  const openGalleryPreview = (item) => {
    const image = item.querySelector("img");
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
    item.addEventListener("click", () => openGalleryPreview(item));
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
