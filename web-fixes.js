// Small fixes: maintenance-close fallback, preload models, and improved contact error handling
document.addEventListener('DOMContentLoaded', function(){
  // 1) maintenance banner close fallback
  const mClose = document.getElementById('maintenance-close');
  if (mClose) {
    mClose.addEventListener('click', function(){
      const banner = document.getElementById('maintenance-banner');
      if (banner) banner.style.display = 'none';
    });
    // also keep inline fallback attribute
    if (!mClose.getAttribute('onclick')) {
      mClose.setAttribute('onclick', "document.getElementById('maintenance-banner').style.display='none'");
    }
  }

  // 2) preload models into select if possible
  const sel = document.getElementById('model-select');
  if (sel && typeof loadModels === 'function') {
    // call but ignore errors (they're logged inside loadModels)
    loadModels().catch(e => console.warn('preload models failed', e));
  }

  // 3) wire up custom select fallback UI if present
  const selBtn = document.getElementById('model-select-btn');
  const list = document.getElementById('model-list');
  if (selBtn && list) {
    selBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = selBtn.getAttribute('aria-expanded') === 'true';
      selBtn.setAttribute('aria-expanded', open ? 'false' : 'true');
      list.style.display = open ? 'none' : 'block';
    });
    document.addEventListener('click', (e) => { if (!selBtn.contains(e.target) && !list.contains(e.target)) list.style.display = 'none'; });
  }
});

// Enhance contact-form-ajax: log fetch details for easier debugging (kept small)
(function(){
  const original = window.fetch;
  window.fetch = function(resource, init) {
    // only log for formspree requests to reduce noise
    try {
      const url = (typeof resource === 'string') ? resource : resource.url;
      if (url && url.includes('formspree.io')) console.debug('fetch ->', url, init && init.method);
    } catch (e) {}
    return original.apply(this, arguments);
  };
})();
