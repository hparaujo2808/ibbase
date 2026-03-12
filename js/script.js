// PROVABASE — script.js
const navbar = document.getElementById('navbar');
if (navbar) window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 20));

const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
if (hamburger && navMobile) hamburger.addEventListener('click', () => navMobile.classList.toggle('open'));

window.doSearch = function() {
  const q = document.getElementById('searchInput')?.value?.trim().toLowerCase();
  if (!q) return;
  const map = { 'calculo':'materias/calculo.html','cálculo':'materias/calculo.html','discreta':'materias/discreta.html','matemática':'materias/discreta.html','geometria':'materias/geometria.html','álgebra':'materias/geometria.html','estatistica':'materias/estatistica.html','estatística':'materias/estatistica.html' };
  for (const [k,v] of Object.entries(map)) { if (q.includes(k)) { window.location.href = v; return; } }
};
document.getElementById('searchInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; } });
}, { threshold: 0.12 });
document.querySelectorAll('.step, .materia-card').forEach(el => {
  el.style.opacity='0'; el.style.transform='translateY(24px)'; el.style.transition='opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

window.showToast = function(msg, type='success') {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id='toast'; t.className='toast'; document.body.appendChild(t); }
  t.textContent = msg; t.className = `toast ${type}`;
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => t.classList.remove('show'), 3500);
};

// Login modal
const loginModal = document.getElementById('loginModal');
document.getElementById('adminSecretLink')?.addEventListener('click', e => { e.preventDefault(); loginModal?.classList.add('open'); });
document.getElementById('loginCancel')?.addEventListener('click', () => loginModal?.classList.remove('open'));
loginModal?.addEventListener('click', e => { if (e.target === loginModal) loginModal.classList.remove('open'); });

document.getElementById('loginForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const err  = document.getElementById('loginError');
  if (user === 'hpa031121' && pass === 'Kito$031121') {
    sessionStorage.setItem('admin_auth', '1');
    window.location.href = 'admin.html';
  } else {
    err.textContent = 'Usuário ou senha incorretos.';
    err.classList.add('show');
  }
});
