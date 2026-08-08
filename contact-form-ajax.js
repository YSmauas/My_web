(async function installContactAjax() {
  const contactForm = document.getElementById('contact-form') || document.querySelector('.contact-form');
  if (!contactForm) return;

  const submitBtn = contactForm.querySelector('button[type="submit"]') || contactForm.querySelector('.btn-primary');
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : null;

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-disabled', 'true');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> שולח...';
    }

    const formData = new FormData(contactForm);

    try {
      const resp = await fetch(contactForm.action, {
        method: contactForm.method || 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (resp.ok) {
        showNotification('✓ ההודעה נשלחה בהצלחה!');
        contactForm.reset();
      } else {
        let errText = '❌ אירעה שגיאה, נסה שוב.';
        try {
          const j = await resp.json();
          if (j?.error) errText = `❌ ${j.error}`;
          else if (j?.errors && Array.isArray(j.errors)) errText = `❌ ${j.errors.map(x => x.message || x).join(', ')}`;
        } catch (_) {
          errText = `❌ שגיאה: ${resp.status} ${resp.statusText}`;
        }
        showNotification(errText);
      }
    } catch (networkErr) {
      console.error('Contact submit failed', networkErr);
      showNotification('❌ שגיאת רשת — בדוק את החיבור.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-disabled');
        submitBtn.innerHTML = originalBtnHtml;
      }
    }
  });
})();
