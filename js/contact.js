(() => {
  const form = document.getElementById('projectInquiryForm');
  if (!form) return;
  const status = document.getElementById('inquiryStatus');
  const submit = form.querySelector('[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const originalLabel = submit.textContent;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    status.textContent = 'Sending your inquiry securely…';
    status.style.color = '';

    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const response = await fetch('https://formsubmit.co/ajax/bloom.crativesss@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();

      if (!response.ok || String(result.success).toLowerCase() !== 'true') {
        throw new Error(result.message || 'FormSubmit could not accept this message.');
      }

      form.reset();
      status.textContent = 'Thank you! Your inquiry has been sent successfully. BLOOM CREATIVES will get back to you soon.';
      status.style.color = '#9fe0b2';
    } catch (error) {
      status.textContent = 'Sorry, your inquiry was not sent. ' +
        (error.message || 'Please check your connection and try again.');
      status.style.color = '#ffb0a8';
    } finally {
      submit.disabled = false;
      submit.textContent = originalLabel;
    }
  });
})();