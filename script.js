/* ── NAV SCROLL SHRINK ── */
(function () {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav-scrolled', window.scrollY > 50);
  }, { passive: true });
})();

/* ── TOAST ── */
(function () {
  const toast = document.getElementById('toast');
  if (!toast) return;
  let timer;
  document.querySelectorAll('.nav-fake, .footer-fake').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      toast.classList.add('toast-show');
      clearTimeout(timer);
      timer = setTimeout(() => toast.classList.remove('toast-show'), 2600);
    });
  });
})();

/* ── INTERSECTION OBSERVER (scroll reveal) ── */
(function () {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ── TESTIMONIAL CAROUSEL ── */
(function () {
  const items = document.querySelectorAll('.testimonial-item');
  const dots  = document.querySelectorAll('.carousel-dot');
  if (!items.length || dots.length !== items.length) return;
  let current = 0;
  let timer;

  function goTo(n) {
    items[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + items.length) % items.length;
    items[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startTimer(); });
  });

  goTo(0);
  startTimer();
})();
