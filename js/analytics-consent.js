(() => {
  const storageKey = 'bloom_analytics_consent';
  const banner = document.getElementById('analyticsConsent');

  function loadAnalytics() {
    if (window.gtag) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-HZBWW6RNK6');
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=G-HZBWW6RNK6';
    document.head.appendChild(tag);
  }

  let choice = null;
  try { choice = localStorage.getItem(storageKey); } catch (_) {}
  if (choice === 'accepted') loadAnalytics();
  if (!banner) return;
  if (!choice) banner.hidden = false;

  banner.querySelectorAll('[data-consent]').forEach((button) => {
    button.addEventListener('click', () => {
      const decision = button.dataset.consent;
      try { localStorage.setItem(storageKey, decision === 'accept' ? 'accepted' : 'rejected'); } catch (_) {}
      banner.hidden = true;
      if (decision === 'accept') loadAnalytics();
    });
  });
})();