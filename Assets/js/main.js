// ===========================
// AOS — Animate on Scroll
// ===========================
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
});

// ===========================
// Typed.js — Hero typewriter
// ===========================
new Typed('#typed-output', {
  strings: [
    'Quantitative Economist',
    'Data Scientist',
    'Applied Econometrician',
    'Socioeconomic Analyst',
  ],
  typeSpeed: 58,
  backSpeed: 32,
  backDelay: 2400,
  loop: true,
  smartBackspace: true,
});

// ===========================
// Navbar — scroll behavior
// ===========================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===========================
// Navbar — active link highlight
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// ===========================
// Mobile menu toggle
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinksList = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksList.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinksList.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksList.classList.remove('open');
  });
});

// ===========================
// Counter animation for stats
// ===========================
const counters = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };

    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ===========================
// Skill bar animation
// ===========================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const fill = entry.target;
    // Small delay to let the card appear first via AOS
    setTimeout(() => {
      fill.style.width = fill.dataset.width + '%';
    }, 200);
    skillObserver.unobserve(fill);
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));
