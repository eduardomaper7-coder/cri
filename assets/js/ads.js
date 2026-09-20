(() => {
  // Paste ONLY the conversion label (the part after / in send_to) for each action.
  const labels = { whatsapp: 'uNeICKDOyP4cEJ654c9C', appointment: 'V8xWCIS-y_4cEJ654c9C' };
  const tagId = 'AW-17884011678';
  let enabled = false;
  let initialized = false;
  function enable() {
    if (enabled) return;
    enabled = true;
    if (initialized) {
      window.gtag('consent', 'update', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'denied', analytics_storage: 'denied' });
      return;
    }
    initialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'denied', analytics_storage: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', tagId);
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
    document.head.appendChild(script);
  }
  window.criConversion = (type) => {
    if (!enabled || !labels[type]) return;
    const params = { send_to: `${tagId}/${labels[type]}` };
    // Only send the conversion identifier to Google.
    window.gtag('event', 'conversion', params);
  };
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com') window.criConversion('whatsapp');
    if (url.hostname === 'www.doctoralia.es' || url.hostname === 'doctoralia.es') window.criConversion('appointment');
  });
  let choice;
  try { choice = localStorage.getItem('cri-ads-consent'); } catch {}
  if (choice === 'yes') enable();
  function showPreferences() {
    if (document.getElementById('cri-cookie-choice')) return;
    const panel = document.createElement('section');
    panel.id = 'cri-cookie-choice';
    panel.setAttribute('aria-label', 'Preferencias de cookies');
    panel.style.cssText = 'position:fixed;bottom:16px;left:16px;right:16px;max-width:660px;background:#fff;color:#26221e;padding:20px;border:1px solid #c9c0b6;border-radius:12px;box-shadow:0 4px 24px #0003;z-index:10000';
    panel.innerHTML = '<p>Con tu permiso, usamos cookies de Google Ads para medir qué anuncios generan contactos. Puedes aceptar o rechazar esta medición y cambiar tu decisión en «Cookies».</p><div style="display:flex;gap:12px;margin-top:12px"><button type="button" class="btn btn-outline-dark" data-choice="no">Rechazar</button><button type="button" class="btn btn-dark" data-choice="yes">Aceptar</button></div>';
    panel.addEventListener('click', event => {
      const button = event.target.closest('[data-choice]');
      if (!button) return;
      try { localStorage.setItem('cri-ads-consent', button.dataset.choice); } catch {}
      if (button.dataset.choice === 'yes') enable();
      else {
        if (enabled) window.gtag('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
        enabled = false;
      }
      panel.remove();
    });
    document.body.appendChild(panel);
  }
  const footer = document.querySelector('.footer-bottom');
  if (footer) {
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = 'Cookies';
    button.addEventListener('click', showPreferences);
    footer.appendChild(button);
  }
  if (!choice) showPreferences();
})();

