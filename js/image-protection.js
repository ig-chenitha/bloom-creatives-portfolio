(() => {
  // Best-effort browser deterrents for portfolio artwork; these cannot prevent OS screenshots.
  const artworkSelector = [
    '.gallery-page .media img',
    '.gallery-page .lightbox-artwork img',
    '.project-detail-page #projectArtwork',
    '.project-detail-page .project-artwork-frame img'
  ].join(', ');

  document.addEventListener('contextmenu', (event) => {
    if (event.target instanceof Element && event.target.closest(artworkSelector)) {
      event.preventDefault();
    }
  });

  document.addEventListener('dragstart', (event) => {
    if (event.target instanceof Element && event.target.closest(artworkSelector)) {
      event.preventDefault();
    }
  });

  document.addEventListener('copy', (event) => {
    const selection = window.getSelection();
    const node = selection?.anchorNode;
    const element = node instanceof Element ? node : node?.parentElement;
    if (element?.closest?.(artworkSelector)) event.preventDefault();
  });

  document.querySelectorAll(artworkSelector).forEach((img) => {
    img.draggable = false;
    img.setAttribute('draggable', 'false');
  });
})();
