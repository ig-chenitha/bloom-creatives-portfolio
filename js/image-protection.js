(() => {
  const artworkSelector = '.gallery-page .media img, .gallery-page .lightbox-artwork img';
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
    if (selection && selection.anchorNode instanceof Element &&
        selection.anchorNode.closest && selection.anchorNode.closest(artworkSelector)) {
      event.preventDefault();
    }
  });
})();