// Menu burger
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  burger.setAttribute('aria-expanded', false);
}));

// Lien actif dans la navbar selon la section visible
const links = [...menu.querySelectorAll('a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));

// Formulaire : validation puis ouverture du client mail
const form = document.getElementById('form');
const msg = document.getElementById('msg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const nom = form.nom.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  msg.classList.remove('ok');
  if (!nom || !message) { msg.textContent = 'Renseigne ton nom et ton message.'; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = 'Entre une adresse email valide.'; return; }
  const subject = encodeURIComponent('Contact portfolio : ' + nom);
  const body = encodeURIComponent(message + '\n\n' + nom + ' (' + email + ')');
  window.location.href = 'mailto:mohammedbenberri@gmail.com?subject=' + subject + '&body=' + body;
  msg.classList.add('ok');
  msg.textContent = 'Ton application mail s’ouvre pour envoyer le message.';
  form.reset();
});

// Année du footer
document.getElementById('year').textContent = new Date().getFullYear();