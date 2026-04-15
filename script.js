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
