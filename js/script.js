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
  const projectDetailsLink = document.getElementById("openProjectDetails");

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
    const title = item.querySelector(".meta strong")?.textContent?.trim() || "Selected Poster Design";
    const detail = item.dataset.description || item.querySelector(".meta span")?.textContent?.trim() || "Creative visual design";
    const category = item.dataset.category || "visual";
    if (projectDetailsLink) projectDetailsLink.href = "project.html?id=" + encodeURIComponent(item.dataset.project || "");
    const categoryNames = {
      event: "EVENT POSTER",
      promotion: "PROMOTION POSTER",
      identity: "BRAND IDENTITY",
      visual: "EXPERIMENTAL POSTER"
    };
    const description = document.getElementById("previewDescription");
    const previewTitle = document.getElementById("previewTitle");
    const previewCategory = document.getElementById("previewCategory");
    if (previewTitle) previewTitle.textContent = title;
    if (previewCategory) previewCategory.textContent = "BLOOM CREATIVES / " + (categoryNames[category] || "SELECTED WORK");
    if (description) description.textContent = detail;
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
})();
