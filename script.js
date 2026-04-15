// =====================
// ANIMATED TILE BACKGROUND
// =====================
(function () {
  const canvas = document.getElementById('tileCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const TILE = 64;
  const tiles = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function initTiles() {
    tiles.length = 0;
    const cols = Math.ceil(canvas.width  / TILE) + 2;
    const rows = Math.ceil(canvas.height / TILE) + 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        tiles.push({
          x: c * TILE,
          y: r * TILE,
          alpha: Math.random() * 0.12 + 0.01,
          speed: Math.random() * 0.3 + 0.08,
          dir: Math.random() > 0.5 ? 1 : -1,
          phase: Math.random() * Math.PI * 2,
          size: TILE - 2,
        });
      }
    }
  }

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Radial fade mask: bright center, transparent edges
    const cx = canvas.width  / 2;
    const cy = canvas.height / 2;
    const maxR = Math.hypot(cx, cy);

    tiles.forEach(tile => {
      // Floating drift
      const dy = Math.sin(t * tile.speed + tile.phase) * 6;
      const dx = Math.cos(t * tile.speed * 0.7 + tile.phase) * 4;

      const px = tile.x + dx;
      const py = tile.y + dy;

      // Distance from center for fade
      const dist = Math.hypot(px + TILE/2 - cx, py + TILE/2 - cy);
      const fade = Math.max(0, 1 - dist / (maxR * 0.75));

      const a = tile.alpha * fade;
      if (a < 0.005) return;

      // Tile border
      ctx.strokeStyle = `rgba(180, 60, 50, ${a * 0.9})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 1, py + 1, tile.size, tile.size);

      // Occasional glow fill on random tiles
      if (tile.alpha > 0.09) {
        ctx.fillStyle = `rgba(200, 80, 60, ${a * 0.12})`;
        ctx.fillRect(px + 1, py + 1, tile.size, tile.size);
      }
    });

    t += 0.012;
    requestAnimationFrame(draw);
  }

  resize();
  initTiles();
  draw();

  window.addEventListener('resize', () => {
    resize();
    initTiles();
  });
})();


// =====================
// LANGUAGE SWITCHER
// =====================
const translations = {
  de: {
    'hero-badge':       'Verfügbar für neue Projekte',
    'hero-title':       'Automatisierung<br /><span class="accent">ohne Chaos.</span>',
    'hero-sub':         'Ich helfe Unternehmen, Zeit zu sparen und Prozesse zu skalieren, durch smarte KI-Lösungen und maßgeschneiderte Automatisierungen.',
    'btn-start':        'Jetzt starten',
    'btn-projects':     'Projekte ansehen',
    'stat-1-label':     'Jahre Erfahrung',
    'stat-2-label':     'Projekte umgesetzt',
    'stat-3-label':     'Remote und flexibel',
    'about-label':      'Über mich',
    'about-title':      'Prozesse, die wirklich<br /><span class="red-text">funktionieren.</span>',
    'about-body-1':     'Ich bin Till, 25 Jahre alt, und helfe Unternehmen dabei, wiederkehrende Aufgaben zu automatisieren und digitale Prozesse aufzubauen. Damit du dich auf das konzentrieren kannst, was wirklich zählt.',
    'about-body-2':     'Mit Erfahrung aus der Lufthansa Group und zahlreichen Freelance-Projekten weiß ich, wie komplexe Unternehmensstrukturen ticken. Und wie man sie smarter macht.',
    'fact-loc-label':   'Standort',     'fact-loc-val':  'Hamburg, DE',
    'fact-exp-label':   'Erfahrung',    'fact-exp-val':  '5+ Jahre',
    'fact-bg-label':    'Hintergrund',  'fact-bg-val':   'Lufthansa Group',
    'fact-avail-label': 'Verfügbarkeit','fact-avail-val':'Remote, flexibel',
    'services-label':   'Leistungen',
    'services-title':   'Was ich für dich<br /><span class="red-text">umsetze.</span>',
    'services-sub':     'Von der ersten Idee bis zum laufenden System. Alles aus einer Hand.',
    's1-title': 'Automatisierung und Workflows',
    's1-text':  'Wiederkehrende Prozesse vollständig automatisieren, mit Make.com, n8n oder Power Automate. Du sparst Zeit, ich baue das System das wirklich läuft.',
    's2-title': 'KI in deine Workflows integrieren',
    's2-text':  'Künstliche Intelligenz sinnvoll einsetzen, direkt in deinen bestehenden Prozessen. Smarte Assistenten, automatisierte Auswertungen und intelligente Entscheidungshilfen.',
    's3-title': 'Webentwicklung',
    's3-text':  'Moderne, performante Websites und Web-Apps. Von der Landing Page bis zum internen Dashboard. Sauber gebaut und schnell ausgeliefert.',
    's4-title': 'IT-Beratung und Strategie',
    's4-text':  'Ich analysiere deine Prozesse und zeige konkrete Hebel. Kein Buzzword-Bingo, sondern klare Maßnahmen mit echtem Impact für dein Unternehmen.',
    'process-label': 'Mein Prozess',
    'process-title': 'So arbeiten wir<br /><span class="red-text">zusammen.</span>',
    'p1-title':'System-Audit',       'p1-text':'Wir analysieren gemeinsam deine aktuellen Prozesse. Was läuft gut, was kostet unnötig Zeit und Geld?',
    'p2-title':'Konzept und Planung','p2-text':'Ich entwerfe eine maßgeschneiderte Lösung mit klarem Scope, realistischer Timeline und fixem Budget.',
    'p3-title':'Aufbau und Umsetzung','p3-text':'Ich setze die Lösung um. Sauber, dokumentiert und mit dir abgestimmt. Du siehst jeden Schritt.',
    'p4-title':'Übergabe und Monitoring','p4-text':'Du übernimmst ein laufendes System. Ich bleibe Ansprechpartner und optimiere bei Bedarf weiter.',
    'portfolio-label': 'Portfolio',
    'portfolio-title': 'Projekte, die<br /><span class="red-text">Ergebnisse liefern.</span>',
    'proj1-title':'Automatisierte Routenplanung',   'proj1-text':'Vollautomatische Optimierung von Lieferrouten. Spart Stunden manueller Planung pro Woche und reduziert Fehlerquoten spürbar.',
    'proj2-title':'Expansionsprozess Einzelhandel', 'proj2-text':'Strukturierter digitaler Workflow für den Expansionsprozess eines Einzelhändlers. Von der Standortsuche bis zur Eröffnung in einem System.',
    'proj3-title':'AI Bootcamp',                   'proj3-text':'Entwicklung eines strukturierten Bootcamps, das Einsteiger ohne Vorkenntnisse Schritt für Schritt an KI-Werkzeuge und Automatisierung heranführt.',
    'cta-label':  'Lass uns arbeiten',
    'cta-title':  'Bereit, deine Prozesse<br /><span class="accent">auf das nächste Level</span> zu bringen?',
    'cta-sub':    'Ich nehme aktuell neue Projekte an. Schreib mir, ich antworte in der Regel innerhalb von 24 Stunden.',
    'cta-btn':    'Kostenloses Erstgespräch buchen',
    'contact-label': 'Kontakt',
    'contact-title': 'Lass uns reden<span class="red-text">.</span>',
    'contact-body':  'Hast du eine Idee, ein Problem oder möchtest einfach wissen, was möglich ist? Schreib mir. Kein Druck, kein Sales-Pitch.',
    'form-name':'Name','form-company':'Unternehmen','form-email':'E-Mail','form-subject':'Worum geht es?','form-msg':'Nachricht','form-submit':'Nachricht senden',
    'select-placeholder':'Thema auswählen...','opt1':'Automatisierung','opt2':'KI-Integration','opt3':'Webentwicklung','opt4':'IT-Beratung','opt5':'Sonstiges',
    'footer-tagline':'KI und Automatisierung Freelancer<br />Hamburg, Deutschland',
    'footer-copy':'© 2026 Till Schäfer. Alle Rechte vorbehalten.',
    'cookie-text':'Diese Website verwendet ausschließlich technisch notwendige Cookies. Mehr dazu in unserer <a href="datenschutz.html">Datenschutzerklärung</a>.',
    'cookie-accept':'Verstanden','cookie-decline':'Nur notwendige',
  },
  en: {
    'hero-badge':       'Available for new projects',
    'hero-title':       'Automation<br /><span class="accent">without chaos.</span>',
    'hero-sub':         'I help companies save time and scale processes, through smart AI solutions and tailored automation.',
    'btn-start':        'Get started',
    'btn-projects':     'View projects',
    'stat-1-label':     'Years of experience',
    'stat-2-label':     'Projects delivered',
    'stat-3-label':     'Remote & flexible',
    'about-label':      'About me',
    'about-title':      'Processes that actually<br /><span class="red-text">work.</span>',
    'about-body-1':     'I\'m Till, 25 years old, and I help companies automate repetitive tasks and build digital processes — so you can focus on what truly matters.',
    'about-body-2':     'With experience at Lufthansa Group and numerous freelance projects, I know how complex corporate structures work. And how to make them smarter.',
    'fact-loc-label':   'Location',      'fact-loc-val':  'Hamburg, DE',
    'fact-exp-label':   'Experience',    'fact-exp-val':  '5+ years',
    'fact-bg-label':    'Background',    'fact-bg-val':   'Lufthansa Group',
    'fact-avail-label': 'Availability',  'fact-avail-val':'Remote, flexible',
    'services-label':   'Services',
    'services-title':   'What I deliver<br /><span class="red-text">for you.</span>',
    'services-sub':     'From the first idea to a running system. Everything from one source.',
    's1-title': 'Automation & Workflows',
    's1-text':  'Fully automating repetitive processes with Make.com, n8n or Power Automate. You save time, I build the system that actually runs.',
    's2-title': 'Integrating AI into your workflows',
    's2-text':  'Deploying artificial intelligence directly in your existing processes. Smart assistants, automated analyses, and intelligent decision support.',
    's3-title': 'Web Development',
    's3-text':  'Modern, high-performance websites and web apps. From landing pages to internal dashboards. Built clean and delivered fast.',
    's4-title': 'IT Consulting & Strategy',
    's4-text':  'I analyse your processes and show concrete levers. No buzzword bingo, just clear actions with real impact for your business.',
    'process-label': 'My Process',
    'process-title': 'How we work<br /><span class="red-text">together.</span>',
    'p1-title':'System Audit',        'p1-text':'We analyse your current processes together. What works well, what wastes time and money?',
    'p2-title':'Concept & Planning',  'p2-text':'I design a tailored solution with a clear scope, realistic timeline and fixed budget. No surprises.',
    'p3-title':'Build & Implement',   'p3-text':'I implement the solution. Clean, documented and aligned with you. You see every step.',
    'p4-title':'Handover & Monitoring','p4-text':'You take over a running system. I stay as your contact and optimise further when needed.',
    'portfolio-label': 'Portfolio',
    'portfolio-title': 'Projects that<br /><span class="red-text">deliver results.</span>',
    'proj1-title':'Automated Route Planning',  'proj1-text':'Fully automated optimisation of delivery routes. Saves hours of manual planning per week and noticeably reduces error rates.',
    'proj2-title':'Retail Expansion Process',  'proj2-text':'Structured digital workflow for a retailer\'s expansion process. From site search to opening — all in one system.',
    'proj3-title':'AI Bootcamp',               'proj3-text':'Development of a structured bootcamp that guides beginners with no prior knowledge step by step into AI tools and automation.',
    'cta-label':  'Let\'s work together',
    'cta-title':  'Ready to take your processes<br /><span class="accent">to the next level?</span>',
    'cta-sub':    'I\'m currently taking on new projects. Write to me, I usually respond within 24 hours.',
    'cta-btn':    'Book a free intro call',
    'contact-label': 'Contact',
    'contact-title': 'Let\'s talk<span class="red-text">.</span>',
    'contact-body':  'Got an idea, a problem, or just want to know what\'s possible? Write to me. No pressure, no sales pitch.',
    'form-name':'Name','form-company':'Company','form-email':'Email','form-subject':'What is it about?','form-msg':'Message','form-submit':'Send message',
    'select-placeholder':'Select topic...','opt1':'Automation','opt2':'AI Integration','opt3':'Web Development','opt4':'IT Consulting','opt5':'Other',
    'footer-tagline':'AI & Automation Freelancer<br />Hamburg, Germany',
    'footer-copy':'© 2026 Till Schäfer. All rights reserved.',
    'cookie-text':'This website uses only technically necessary cookies. See our <a href="datenschutz.html">Privacy Policy</a> for details.',
    'cookie-accept':'Got it','cookie-decline':'Necessary only',
  }
};

(function () {
  const btn = document.getElementById('langSwitch');
  if (!btn) return;
  let lang = localStorage.getItem('lang') || 'de';

  function applyLang(l) {
    lang = l;
    localStorage.setItem('lang', l);
    btn.textContent = l === 'de' ? 'EN' : 'DE';
    const t = translations[l];

    // nav mobile
    const mobLinks = document.querySelectorAll('.mob-link');
    const mobLabels = l === 'de'
      ? ['Über mich','Leistungen','Prozess','Portfolio','Kontakt']
      : ['About','Services','Process','Portfolio','Contact'];
    mobLinks.forEach((a, i) => { if (mobLabels[i]) a.textContent = mobLabels[i]; });

    // nav desktop via data attrs
    document.querySelectorAll('.nav-links a[data-de]').forEach(a => {
      a.textContent = a.getAttribute('data-' + l);
    });

    const set = (sel, html) => { const el = document.querySelector(sel); if (el) el.innerHTML = html; };
    const setTxt = (sel, txt) => { const el = document.querySelector(sel); if (el) el.textContent = txt; };

    set('[data-i18n="hero-badge"] .badge-text', t['hero-badge']);
    set('[data-i18n="hero-title"]', t['hero-title']);
    setTxt('[data-i18n="hero-sub"]', t['hero-sub']);
    setTxt('[data-i18n="btn-start"]', t['btn-start']);
    setTxt('[data-i18n="btn-projects"]', t['btn-projects']);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = t[key];
        else if (key.startsWith('form-') && el.tagName === 'LABEL') el.textContent = t[key];
        else el.innerHTML = t[key];
      }
    });
  }

  btn.addEventListener('click', () => applyLang(lang === 'de' ? 'en' : 'de'));
  applyLang(lang);
})();

// =====================
// COOKIE BANNER
// =====================
(function () {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  if (localStorage.getItem('cookieConsent')) return;
  setTimeout(() => banner.classList.add('visible'), 1200);
  document.getElementById('cookieAccept').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    banner.classList.remove('visible');
  });
  document.getElementById('cookieDecline').addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    banner.classList.remove('visible');
  });
})();

// =====================
// NAVBAR: scroll effect + burger
// =====================
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// =====================
// REVEAL ON SCROLL
// =====================
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${Math.min(idx * 80, 400)}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// =====================
// SMOOTH SCROLL
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

// =====================
// ACTIVE NAV LINK
// =====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { threshold: 0.4 }).observe.call(
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.4 }),
  ...sections
);

// simpler active link
const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObs.observe(s));

// =====================
// CONTACT FORM
// =====================
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Nachricht gesendet!';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Nachricht senden';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}
