/*
  ============================================================================
  File: home.js
  Deskripsi: Fungsi untuk halaman beranda (load brands, programs, news)
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// home.js - Handle halaman beranda
(function () {
  console.log('home.js v1.0.0 loaded');
  
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
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[m],
    );
  }
  
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
  
  function getLang() {
    return localStorage.getItem('jdn-lang') || 'id';
  }
  
  // Load brands marquee
  async function loadBrands() {
    const brandMarquees = qsa('.brand-track');
    if (!brandMarquees.length) return;
    
    const brands = await loadJSON('data/brands.json');
    if (!brands) return;
    
    const brandHTML = brands
      .map(
        (brand) =>
          `<img src="${escapeHtml(brand.logo)}" alt="${escapeHtml(brand.name)}" />`,
      )
      .join("");
    
    brandMarquees.forEach(track => {
      track.innerHTML = brandHTML + brandHTML; // Duplicate for seamless loop
    });
  }
  
  // Load featured programs
  async function loadFeaturedPrograms() {
    const programGrid = qs('.home-program-grid');
    if (!programGrid) return;
    
    const lang = getLang();
    const programs = await loadJSON(`data/programs-${lang}.json`);
    if (!programs) return;
    
    const featuredPrograms = programs.slice(0, 6);
    
    programGrid.innerHTML = featuredPrograms
      .map((p) => {
        return `<a class="program-tile reveal in-view" href="program/">
          <span>${escapeHtml(p.cat)}</span>
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.summary)}</p>
        </a>`;
      })
      .join("");
  }
  
  // Load latest news
  async function loadLatestNews() {
    const newsGrid = qs('.news-grid.three');
    if (!newsGrid) return;
    
    const lang = getLang();
    const news = await loadJSON(`data/news-${lang}.json`);
    if (!news) return;
    
    const latestNews = news.slice(0, 3);
    const readLabel = lang === 'en' ? 'reads' : 'dibaca';
    
    newsGrid.innerHTML = latestNews
      .map((n) => {
        return `<a class="news-card reveal in-view" href="berita/detail.html?slug=${encodeURIComponent(n.slug)}">
          <img src="assets/img/${escapeHtml(n.image)}" alt="${escapeHtml(n.title)}" />
          <div>
            <span class="meta">${escapeHtml(n.category)} · ${escapeHtml(n.views.toLocaleString('id-ID'))} ${readLabel}</span>
            <h3>${escapeHtml(n.title)}</h3>
            <p>${escapeHtml(n.excerpt)}</p>
          </div>
        </a>`;
      })
      .join("");
  }
  
  // Update content when language changes
  function updateContent() {
    loadFeaturedPrograms();
    loadLatestNews();
  }
  
  // Initialize
  function init() {
    console.log('Initializing home.js');
    loadBrands();
    loadFeaturedPrograms();
    loadLatestNews();
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