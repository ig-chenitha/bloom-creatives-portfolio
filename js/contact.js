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
    status.textContent = 'Sending your inquiry. Please wait…';
    try {
      const response = await fetch('https://formsubmit.co/ajax/bloom.crativesss@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries()))
      });
      const result = await response.json();
      if (String(result.success).toLowerCase() !== 'true') {
        throw new Error(result.message || 'FormSubmit did not accept the submission.');
      }
      form.reset();
      status.textContent = 'Thank you! Your inquiry has been sent successfully. BLOOM CREATIVES will get back to you soon.';
      status.style.color = '#9fe0b2';
    } catch (error) {
      status.textContent = 'Could not send: ' + (error.message || 'Network error. Please try again or email bloom.crativesss@gmail.com directly.');
      status.style.color = '#ffb0a8';
    } finally {
      submit.disabled = false;
      submit.textContent = originalLabel;
    }
  });
})();