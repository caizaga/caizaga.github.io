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
// Project Modal
// ===========================
const projectData = {
  'covid-cluster': {
    title: 'COVID-19 Cluster Analysis',
    image: 'Assets/R.png',
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
    image: 'Assets/P1.png',
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
    image: 'Assets/T2.png',
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
  }
};

const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');

function openModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  document.getElementById('modal-img').src = data.image;
  document.getElementById('modal-img').alt = data.title;
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
