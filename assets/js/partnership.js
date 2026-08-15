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
  
  // Load JSON data
  async function loadJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return await response.json();
    } catch (error) {
      console.error(`Error loading ${url}:`, error);
      return null;
    }
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
    const processes = await loadJSON(`/data/csr-process-${lang}.json`);
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
    const processes = await loadJSON(`/data/crowdfunding-process-${lang}.json`);
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
    const items = await loadJSON(`/data/why-jdn-${lang}.json`);
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
  
  // Load testimonials
  async function loadTestimonials() {
    const track1 = qs('#testimonialTrack1');
    const track2 = qs('#testimonialTrack2');
    if (!track1 || !track2) return;
    
    const lang = getLang();
    const data = await loadJSON(`/data/testimonials-${lang}.json`);
    if (!data) return;
    
    if (data.column1) {
      const itemsHTML = data.column1
        .map((item) => `
          <article class="testimonial-card">
            <p>"${escapeHtml(item.quote)}"</p>
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.role)}</span>
          </article>
        `)
        .join("");
      
      track1.innerHTML = itemsHTML + itemsHTML;
    }
    
    if (data.column2) {
      const itemsHTML = data.column2
        .map((item) => `
          <article class="testimonial-card">
            <p>"${escapeHtml(item.quote)}"</p>
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.role)}</span>
          </article>
        `)
        .join("");
      
      track2.innerHTML = itemsHTML + itemsHTML;
    }
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