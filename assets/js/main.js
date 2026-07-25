
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}
document.querySelectorAll('.nav-drop > button').forEach(btn => {
  btn.addEventListener('click', () => btn.parentElement.classList.toggle('open'));
});
document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => {
    if (card.querySelector('iframe')) return;
    const id = card.dataset.youtube;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1&iv_load_policy=3&cc_load_policy=0&vq=hd1080`;
    iframe.title = card.dataset.title || 'Vídeo de CRI';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    card.appendChild(iframe);
  });
});
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
