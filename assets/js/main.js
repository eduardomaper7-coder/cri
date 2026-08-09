
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
  const onHeaderScroll = () => {
    if (window.scrollY > 30) siteHeader.classList.add('scrolled');
    else siteHeader.classList.remove('scrolled');
  };
  onHeaderScroll();
  window.addEventListener('scroll', onHeaderScroll, { passive: true });
}
document.querySelectorAll('.nav-drop > button').forEach(btn => {
  btn.addEventListener('click', () => btn.parentElement.classList.toggle('open'));
});
document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => {
    if (card.querySelector('iframe')) return;
    const id = card.dataset.youtube;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1&iv_load_policy=3&cc_load_policy=0&enablejsapi=1&vq=hd1080`;
    iframe.title = card.dataset.title || 'Vídeo de CRI';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.dataset.disableCaptions = '';
    card.appendChild(iframe);
    initCaptionBlockingPlayer(iframe);
  });
});

const captionPlayers = new WeakMap();
function suppressYouTubeCaptions(player) {
  try { player.unloadModule('captions'); } catch (_) {}
  try { player.unloadModule('cc'); } catch (_) {}
  try { player.setOption('captions', 'track', {}); } catch (_) {}
}
function forceHighestQuality(player) {
  try {
    const levels = player.getAvailableQualityLevels ? player.getAvailableQualityLevels() : [];
    const best = levels && levels.length ? levels[0] : 'hd1080';
    player.setPlaybackQuality(best);
  } catch (_) {}
}
function initCaptionBlockingPlayer(iframe) {
  if (!window.YT || !window.YT.Player || captionPlayers.has(iframe)) return;
  const player = new window.YT.Player(iframe, {
    events: {
      onReady: event => {
        suppressYouTubeCaptions(event.target);
        forceHighestQuality(event.target);
        window.setTimeout(() => suppressYouTubeCaptions(event.target), 800);
        window.setTimeout(() => forceHighestQuality(event.target), 1200);
      },
      onStateChange: event => {
        suppressYouTubeCaptions(event.target);
        forceHighestQuality(event.target);
      }
    }
  });
  captionPlayers.set(iframe, player);
}
window.onYouTubeIframeAPIReady = () => {
  document.querySelectorAll('iframe[data-disable-captions]').forEach(initCaptionBlockingPlayer);
};
if (document.querySelector('iframe[data-disable-captions]')) {
  const api = document.createElement('script');
  api.src = 'https://www.youtube.com/iframe_api';
  api.async = true;
  document.head.appendChild(api);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const form = document.querySelector('[data-demo-form]');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const status = form.querySelector('.form-status');
    status.style.display = 'block';
    status.textContent = 'Gracias. Esta maqueta está preparada para conectar el formulario con el sistema de citas o el correo de CRI.';
    form.reset();
  });
}
