/* VYNTRO mobile navigation — isolated so other page scripts cannot break it. */
(() => {
  const initMenu = () => {
    const button = document.getElementById("menuToggle");
    const nav = document.getElementById("navLinks");
    const header = document.getElementById("header") || document.querySelector("header");
    if (!button || !nav || button.dataset.menuReady === "true") return;
    button.dataset.menuReady = "true";
    button.type = "button";

    const closeMenu = () => {
      nav.classList.remove("open");
      header?.classList.remove("menu-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation");
      button.textContent = "☰";
    };
    const openMenu = () => {
      nav.classList.add("open");
      header?.classList.add("menu-open");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "Close navigation");
      button.textContent = "×";
    };

    closeMenu();
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      nav.classList.contains("open") ? closeMenu() : openMenu();
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("click", (event) => {
      if (nav.classList.contains("open") &&
          !nav.contains(event.target) &&
          !button.contains(event.target)) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMenu, { once: true });
  } else {
    initMenu();
  }
})();