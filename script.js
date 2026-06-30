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

/* ── LÖSUNGEN DROPDOWN ── */
(function () {
  const dropdown = document.getElementById('nav-loesungen');
  if (!dropdown) return;
  const trigger = dropdown.querySelector('.nav-dropdown-trigger');

  function open()  { dropdown.dataset.open = ''; trigger.setAttribute('aria-expanded', 'true'); }
  function close() { delete dropdown.dataset.open;  trigger.setAttribute('aria-expanded', 'false'); }
  function toggle() { dropdown.hasAttribute('data-open') ? close() : open(); }

  trigger.addEventListener('click', e => { e.stopPropagation(); toggle(); });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) close();
  });

  // Close on Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Close after clicking an item
  dropdown.querySelectorAll('.nav-dropdown-item').forEach(item => {
    item.addEventListener('click', () => close());
  });
})();

/* ── CHATBOT ── */
(function () {
  const widget   = document.getElementById('chat-widget');
  const trigger  = document.getElementById('chat-trigger');
  const panel    = document.getElementById('chat-panel');
  const messages = document.getElementById('chat-messages');
  const quickEl  = document.getElementById('chat-quick-replies');
  const input    = document.getElementById('chat-input');
  const sendBtn  = document.getElementById('chat-send');
  if (!widget || !trigger || !panel) return;

  const RESPONSES = {
    was: 'PartsCloud ist eine KI-gestützte Software für Ersatzteilplanung. Sie verbindet sich nativ mit Ihrem ERP und liefert wöchentliche, priorisierte Bestellvorschläge — damit Sie Fehlteile vermeiden und gebundenes Kapital reduzieren.',
    integration: 'Die Integration in SAP, Microsoft Dynamics, proALPHA und 20+ weitere ERP-Systeme dauert typischerweise nur wenige Tage. Kein IT-Projekt, keine Datenmigration — PartsCloud liest Bestands- und Auftragsdaten direkt aus Ihrem System.',
    kosten: 'Unser Pricing richtet sich nach Unternehmensgröße und Nutzungsumfang. Am besten vereinbaren wir eine kurze Demo — dann können wir Ihnen ein konkretes Angebot machen. Einfach Demo anfragen!',
    demo: '__DEMO__',
    default: 'Gute Frage! Für detaillierte Antworten empfehle ich eine persönliche Demo mit unserem Team. Schreiben Sie uns gerne an info@partscloud.de.'
  };

  function addMsg(text, type) {
    const el = document.createElement('div');
    el.className = 'chat-msg chat-msg--' + type;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  function botReply(key) {
    const response = RESPONSES[key] || RESPONSES.default;
    if (response === '__DEMO__') {
      window.open('https://partscloud.com', '_blank', 'noopener');
      addMsg('Ich öffne die Demo-Seite für Sie! Unser Team freut sich auf Sie.', 'bot');
      return;
    }
    const typing = addMsg('…', 'typing');
    setTimeout(() => {
      messages.removeChild(typing);
      addMsg(response, 'bot');
      // Re-show quick replies if they were hidden
      quickEl.style.display = 'flex';
    }, 900);
  }

  function handleInput() {
    const text = input.value.trim();
    if (!text) return;
    addMsg(text, 'user');
    input.value = '';
    quickEl.style.display = 'none';

    // Simple keyword matching
    const lower = text.toLowerCase();
    if (lower.includes('was') || lower.includes('partscloud') || lower.includes('was ist')) {
      botReply('was');
    } else if (lower.includes('integration') || lower.includes('erp') || lower.includes('sap')) {
      botReply('integration');
    } else if (lower.includes('kosten') || lower.includes('preis') || lower.includes('cost')) {
      botReply('kosten');
    } else if (lower.includes('demo') || lower.includes('termin')) {
      botReply('demo');
    } else {
      botReply('default');
    }
  }

  // Open/close
  trigger.addEventListener('click', () => {
    const isOpen = widget.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(isOpen));
    panel.hidden = !isOpen;
  });

  // Quick replies
  quickEl.querySelectorAll('.chat-quick').forEach(btn => {
    btn.addEventListener('click', () => {
      addMsg(btn.textContent, 'user');
      quickEl.style.display = 'none';
      botReply(btn.dataset.q);
    });
  });

  // Send button + Enter
  sendBtn.addEventListener('click', handleInput);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(); });
})();
