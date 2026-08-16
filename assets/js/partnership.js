/*
  ============================================================================
  File: partnership.js
  Deskripsi: Fungsi untuk halaman kemitraan
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// partnership.js - Handle halaman kemitraan
(function() {
  console.log('partnership.js v1.0.0 loaded');
  
  // Helper functions
  function qs(s, r = document) {
    return r.querySelector(s);
  }
  
  function qsa(s, r = document) {
    return [...r.querySelectorAll(s)];
  }
  
  function escapeHtml(s) {
    return String(s || "").replace(
      /[&<>'"]/g,
      (m) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[m]
    );
  }
  
  function getLang() {
    return localStorage.getItem('jdn-lang') || 'id';
  }
  async function loadJSON(url) {
    return window.JDN ? window.JDN.data(url, getLang()) : null;
  }
  
  // Initialize reveal animations
  function initReveal() {
    const items = qsa(".reveal");
    if (!items.length) return;
    
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    
    items.forEach((i) => io.observe(i));
  }
  
  // Load brands
  async function loadBrands() {
    const brandTrack = qs('#brandTrack1');
    if (!brandTrack) return;
    
    const brands = await loadJSON('/data/brands.json');
    if (!brands) return;
    
    const brandHTML = brands
      .map((brand) => `<img src="${escapeHtml(brand.logo)}" alt="${escapeHtml(brand.name)}">`)
      .join("");
    
    brandTrack.innerHTML = brandHTML + brandHTML;
  }
  
  // Load CSR process
  async function loadCSRProcess() {
    const processGrid = qs('#csrProcessGrid');
    if (!processGrid) return;
    
    const lang = getLang();
    const processes = await loadJSON('/data/csr-process.json');
    if (!processes) return;
    
    processGrid.innerHTML = processes
      .map((process) => `
        <article class="process-card">
          <b>${escapeHtml(process.number)}</b>
          <h3>${escapeHtml(process.title)}</h3>
          <p>${escapeHtml(process.description)}</p>
        </article>
      `)
      .join("");
  }
  
  // Load Crowdfunding process
  async function loadCrowdfundingProcess() {
    const processGrid = qs('#crowdfundingProcessGrid');
    if (!processGrid) return;
    
    const lang = getLang();
    const processes = await loadJSON('/data/crowdfunding-process.json');
    if (!processes) return;
    
    processGrid.innerHTML = processes
      .map((process) => `
        <article class="process-card">
          <b>${escapeHtml(process.number)}</b>
          <h3>${escapeHtml(process.title)}</h3>
          <p>${escapeHtml(process.description)}</p>
        </article>
      `)
      .join("");
  }
  
  // Load Why JDN
  async function loadWhyJDN() {
    const whyGrid = qs('#whyGrid');
    if (!whyGrid) return;
    
    const lang = getLang();
    const items = await loadJSON('/data/why-jdn.json');
    if (!items) return;
    
    whyGrid.innerHTML = items
      .map((item) => `
        <article class="why-card reveal in-view">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
        </article>
      `)
      .join("");
  }
  
  // Testimonial placeholder data is intentionally disabled.
  // The original JSON contains demo quotes rather than verified public testimonials.
  function loadTestimonials() {
    const section = qs('.testimonial-section');
    if (section) section.hidden = true;
  }
  
  // Initialize form
  function initForm() {
    qsa('[data-demo-form]').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const lang = getLang();
        alert(lang === 'id' ? 'Terima kasih. Form ini siap disambungkan ke backend.' : 'Thank you. This form is ready to be connected to the backend.');
      });
    });
  }
  
  // Update content when language changes
  function updateContent() {
    loadCSRProcess();
    loadCrowdfundingProcess();
    loadWhyJDN();
    loadTestimonials();
  }
  
  // Initialize
  function init() {
    console.log('Initializing partnership.js');
    initReveal();
    loadBrands();
    loadCSRProcess();
    loadCrowdfundingProcess();
    loadWhyJDN();
    loadTestimonials();
    initForm();
  }
  
  // Listen for language changes
  document.addEventListener('language-changed', updateContent);
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();