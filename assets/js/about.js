/*
  ============================================================================
  File: about.js
  Deskripsi: Fungsi untuk halaman tentang
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// about.js - Handle halaman tentang
(function() {
  console.log('about.js v1.0.0 loaded');
  
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
  
  // Load methods data
  async function loadMethods() {
    const methodGrid = qs('#methodGrid');
    if (!methodGrid) return;
    
    const lang = getLang();
    const methods = await loadJSON(`/data/about-methods-${lang}.json`);
    if (!methods) return;
    
    methodGrid.innerHTML = methods
      .map((method) => `
        <article class="method-card reveal in-view">
          <b>${escapeHtml(method.number)}</b>
          <h3>${escapeHtml(method.title)}</h3>
          <p>${escapeHtml(method.description)}</p>
        </article>
      `)
      .join("");
  }
  
  // Load legal data
  async function loadLegal() {
    const legalGrid = qs('#legalGrid');
    if (!legalGrid) return;
    
    const lang = getLang();
    const legal = await loadJSON(`/data/about-legal-${lang}.json`);
    if (!legal) return;
    
    legalGrid.innerHTML = legal
      .map((item) => `
        <article class="legal-info-card reveal in-view">
          <span>${escapeHtml(item.label)}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
        </article>
      `)
      .join("");
  }
  
  // Load trust data
  async function loadTrust() {
    const trustGrid = qs('#trustGrid');
    if (!trustGrid) return;
    
    const lang = getLang();
    const trust = await loadJSON(`/data/about-trust-${lang}.json`);
    if (!trust) return;
    
    trustGrid.innerHTML = trust
      .map((item) => `
        <article class="trust-card reveal in-view">
          <div class="trust-icon">${escapeHtml(item.icon)}</div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
          <a href="${escapeHtml(item.link)}" class="text-link">${escapeHtml(item.linkText)}</a>
        </article>
      `)
      .join("");
  }
  
  // Load founders data
  async function loadFounders() {
    const founderGrid = qs('#founderGrid');
    if (!founderGrid) return;
    
    const lang = getLang();
    const founders = await loadJSON(`/data/about-founders-${lang}.json`);
    if (!founders) return;
    
    founderGrid.innerHTML = founders
      .map((founder) => `
        <article class="founder-card reveal in-view">
          <img src="${escapeHtml(founder.image)}" alt="${escapeHtml(founder.name)}">
          <h3>${escapeHtml(founder.name)}</h3>
          <p><strong>${escapeHtml(founder.position)}</strong></p>
          <p>${escapeHtml(founder.description)}</p>
        </article>
      `)
      .join("");
  }
  
  // Load FAQ data
  async function loadFAQ() {
    const faqList = qs('#faqList');
    if (!faqList) return;
    
    const lang = getLang();
    const faq = await loadJSON(`/data/about-faq-${lang}.json`);
    if (!faq) return;
    
    faqList.innerHTML = faq
      .map((item, index) => `
        <div class="faq-item ${index === 0 ? 'open' : ''}">
          <button class="faq-button" type="button">
            ${escapeHtml(item.question)}
            <span>+</span>
          </button>
          <div class="faq-panel">
            <p>${escapeHtml(item.answer)}</p>
          </div>
        </div>
      `)
      .join("");
    
    // Initialize FAQ toggle
    qsa('.faq-button', faqList).forEach(button => {
      button.addEventListener('click', () => {
        const item = button.closest('.faq-item');
        if (!item) return;
        item.classList.toggle('open');
      });
    });
  }
  
  // Load all data
  async function loadAllData() {
    await Promise.all([
      loadMethods(),
      loadLegal(),
      loadTrust(),
      loadFounders(),
      loadFAQ()
    ]);
  }
  
  // Initialize
  function init() {
    console.log('Initializing about.js');
    initReveal();
    loadAllData();
  }
  
  // Listen for language changes
  document.addEventListener('language-changed', loadAllData);
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();