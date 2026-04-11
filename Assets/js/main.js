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
// Project Modal
// ===========================
const projectData = {
  'covid-cluster': {
    title: 'COVID-19 Cluster Analysis',
    images: ['Assets/R.png'],
    description: 'Comprehensive study applying unsupervised machine learning to understand global disparities in COVID-19 outcomes. The goal was to identify country clusters sharing similar pandemic trajectories and uncover the socioeconomic and geopolitical factors behind those patterns.',
    methodology: 'K-means clustering with feature normalization across four variables: total deaths per million, confirmed cases per million, vaccination rate, and government stringency index. Used the elbow method and silhouette scores to determine the optimal number of clusters (k=4). Built as an interactive R Shiny app allowing users to explore cluster assignments dynamically by region and time period.',
    results: [
      'Identified 4 distinct country clusters with significantly different pandemic response profiles.',
      'High-income countries with early vaccination rollout formed a separate cluster from low-income nations, confirming vaccine equity as a critical factor.',
      'Strong inverse correlation found between vaccination rate and mortality across clusters.',
      'Interactive Shiny app deployed publicly, allowing dynamic filtering by continent and date range.'
    ],
    tags: ['R', 'Shiny', 'K-Means Clustering', 'Unsupervised ML', 'Public Health Data'],
    link: 'https://carlos-aizaga.shinyapps.io/appcovidtarea6/',
    linkText: 'View Live App'
  },
  'sentiment': {
    title: 'Sentiment Analysis — CEO Viewpoints',
    images: ['Assets/P1.png'],
    description: 'Longitudinal NLP analysis of 5+ years of corporate communications from a CEO, with the objective of quantifying shifts in organizational tone and identifying periods of strategic optimism or concern.',
    methodology: 'Text preprocessing pipeline: tokenization, stopword removal, and lemmatization. Applied VADER (Valence Aware Dictionary and sEntiment Reasoner) from the NLTK library — specifically calibrated for informal and corporate text. Generated compound sentiment scores per document aggregated by quarter. Word clouds segmented by positive, negative, and neutral polarity to identify dominant vocabulary in each category.',
    results: [
      'Mapped a clear sentiment trajectory from 2017 to 2022 across economic and corporate cycles.',
      'Detected a significant tonal shift in 2019–2020, correlating with macroeconomic deterioration in Venezuela.',
      'Most frequent positive terms: "growth", "innovation", "team", "future".',
      'Negative vocabulary concentrated around operational and regulatory challenges.'
    ],
    tags: ['Python', 'NLTK', 'VADER', 'NLP', 'Text Analytics'],
    link: 'https://github.com/caizaga/PortafolioProjects/blob/main/Sentiment_Analisys_BV.ipynb',
    linkText: 'View on GitHub'
  },
  'top100': {
    title: 'Top 100 Companies Venezuela',
    images: ['Assets/T2.png'],
    description: 'Annual econometric corporate ranking of Venezuela\'s top 100 corporations, published across 6 consecutive editions (2017–2022) in Business Venezuela Magazine. The project combined rigorous quantitative methodology with interactive data visualization to communicate complex financial rankings to a broad business audience.',
    methodology: 'Multi-criteria composite index built on four dimensions: total revenue, number of employees, capital investment, and social investment. Each dimension normalized using z-score standardization. Relative weights determined via Principal Component Analysis (PCA). Data collected through structured corporate surveys with validation protocols.',
    results: [
      '6 consecutive annual editions tracking corporate evolution through Venezuela\'s economic crisis (2017–2022).',
      'Dataset of 600+ company-year observations across all major economic sectors.',
      'Interactive Tableau dashboard showing rankings, sector distribution, and year-over-year performance.',
      'Research cited by the Venezuelan business community, academic institutions, and international press.'
    ],
    tags: ['Tableau', 'Power BI', 'Econometrics', 'PCA', 'Corporate Finance', 'Survey Design'],
    link: 'https://public.tableau.com/app/profile/carlos.aizaga/viz/TopCompanies2022/Dashboard1',
    linkText: 'View Dashboard'
  },
  'pipeline': {
    title: 'Health Microinsurance Survey Pipeline',
    images: ['Assets/p1_1.png', 'Assets/p1_2.png', 'Assets/p1_3.png', 'Assets/p1_4.png', 'Assets/p1_5.png'],
    description: 'ETL pipeline for processing a field survey on the health impact of microinsurance among vulnerable populations. Automates the full flow from Google Forms to an interactive Looker Studio dashboard — covering ingestion, cleaning, recoding of open-text responses, and bivariate analysis with cross-tabulations.',
    methodology: 'Google Forms → Google Sheets → Python ETL (column normalization, open-text categorization, multi-choice variable explosion, crosstabs with n / row% / column%) → Google Sheets output → Looker Studio interactive dashboard. Pipeline designed for reproducibility: re-running the script on updated form responses regenerates all outputs automatically.',
    results: [
      '43% of affiliates report lower healthcare spending since enrollment — the effect is strongest in the low-income segment.',
      '72% used the plan in the past year, but only 1 in 5 accesses it preventively, pointing to a utilization gap.',
      '45% have no other insurance coverage — for this segment, the plan is their only safety net.',
      '47% feel fully protected; 28% have coverage but maintain active health concerns, signaling a perception-protection gap.'
    ],
    tags: ['Python', 'Google Sheets', 'Looker Studio', 'ETL', 'Survey Analysis', 'Health Economics'],
    link: 'https://lookerstudio.google.com/reporting/597550ec-2ae1-4998-8595-81134096159d',
    linkText: 'View Dashboard',
    link2: 'https://github.com/caizaga/survey-analysis-pipeline',
    linkText2: 'View Code'
  }
};

// ===========================
// Carousel state
// ===========================
let carouselImages = [];
let carouselIndex = 0;

const carouselTrack = document.getElementById('carousel-track');
const carouselPrev = document.getElementById('carousel-prev');
const carouselNext = document.getElementById('carousel-next');
const carouselDotsEl = document.getElementById('carousel-dots');

function buildCarousel(images, title) {
  carouselImages = images;
  carouselIndex = 0;

  carouselTrack.innerHTML = images.map(src =>
    `<img src="${src}" alt="${title}">`
  ).join('');

  carouselDotsEl.innerHTML = images.map((_, i) =>
    `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Image ${i + 1}"></button>`
  ).join('');

  carouselDotsEl.querySelectorAll('.carousel-dot').forEach(dot => {
    dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.index)));
  });

  updateCarousel();
}

function goToSlide(index) {
  carouselIndex = index;
  updateCarousel();
}

function updateCarousel() {
  carouselTrack.style.transform = `translateX(-${carouselIndex * 100}%)`;

  carouselDotsEl.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === carouselIndex);
  });

  const single = carouselImages.length <= 1;
  carouselPrev.classList.toggle('hidden', single || carouselIndex === 0);
  carouselNext.classList.toggle('hidden', single || carouselIndex === carouselImages.length - 1);
  carouselDotsEl.style.display = single ? 'none' : 'flex';
}

carouselPrev.addEventListener('click', () => {
  if (carouselIndex > 0) goToSlide(carouselIndex - 1);
});

carouselNext.addEventListener('click', () => {
  if (carouselIndex < carouselImages.length - 1) goToSlide(carouselIndex + 1);
});

const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');

function openModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  buildCarousel(data.images, data.title);
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-desc').textContent = data.description;
  document.getElementById('modal-methodology').textContent = data.methodology;

  const resultsList = document.getElementById('modal-results');
  resultsList.innerHTML = data.results.map(r => `<li>${r}</li>`).join('');

  const tagsEl = document.getElementById('modal-tags');
  tagsEl.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');

  const link = document.getElementById('modal-link');
  link.href = data.link;
  link.innerHTML = `${data.linkText} <i class="fa-solid fa-arrow-up-right-from-square"></i>`;

  const link2 = document.getElementById('modal-link2');
  if (data.link2) {
    link2.href = data.link2;
    link2.innerHTML = `${data.linkText2} <i class="fa-brands fa-github"></i>`;
    link2.classList.remove('hidden');
  } else {
    link2.classList.add('hidden');
  }

  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.modal-trigger').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(btn.dataset.project);
  });
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  if (e.key === 'ArrowLeft' && modal.classList.contains('open') && carouselIndex > 0) goToSlide(carouselIndex - 1);
  if (e.key === 'ArrowRight' && modal.classList.contains('open') && carouselIndex < carouselImages.length - 1) goToSlide(carouselIndex + 1);
});

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

// ===========================
// Easter egg — Nuclear Throne
// ===========================
const ntToast = document.getElementById('nt-toast');
const ntAudio = new Audio('Assets/sndMutant2Wrld.wav');
const ntSequence = 'throne';
let ntBuffer = '';
let ntTimer = null;

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  ntBuffer += e.key.toLowerCase();
  if (ntBuffer.length > ntSequence.length) ntBuffer = ntBuffer.slice(-ntSequence.length);

  clearTimeout(ntTimer);
  ntTimer = setTimeout(() => { ntBuffer = ''; }, 1500);

  if (ntBuffer === ntSequence) {
    ntBuffer = '';
    ntAudio.currentTime = 0;
    ntAudio.play();
    ntToast.classList.add('show');
    setTimeout(() => ntToast.classList.remove('show'), 4000);
  }
});
