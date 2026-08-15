/*
  ============================================================================
  File: main.js
  Deskripsi: Fungsi utama untuk halaman beranda
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// main.js - Handle halaman beranda
(function() {
  console.log('main.js v1.0.0 loaded');
  
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
  
  // Initialize counters
  function initCounters() {
    const counters = qsa("[data-count]");
    if (!counters.length) return;
    
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          
          let el = e.target,
            target = +el.dataset.count || 0,
            suffix = el.dataset.suffix || "",
            start = performance.now();
          
          function tick(t) {
            let p = Math.min(1, (t - start) / 1100),
              v = Math.floor(target * (1 - Math.pow(1 - p, 3)));
            el.textContent = v.toLocaleString("id-ID") + suffix;
            if (p < 1) requestAnimationFrame(tick);
          }
          
          requestAnimationFrame(tick);
          io.unobserve(el);
        }),
      { threshold: 0.4 }
    );
    
    counters.forEach((c) => io.observe(c));
  }
  
  // Load brands
  async function loadBrands() {
    const brandTracks = qsa('.brand-track');
    if (!brandTracks.length) return;
    
    const brands = await loadJSON('/data/brands.json');
    if (!brands) return;
    
    const brandHTML = brands
      .map((brand) => `<img src="${escapeHtml(brand.logo)}" alt="${escapeHtml(brand.name)}">`)
      .join("");
    
    brandTracks.forEach((track) => {
      track.innerHTML = brandHTML + brandHTML;
    });
  }
  
  // Load featured programs
  async function loadFeaturedPrograms() {
    const programGrid = qs('#homeProgramGrid');
    if (!programGrid) return;
    
    const lang = getLang();
    const programs = await loadJSON(`/data/programs-${lang}.json`);
    if (!programs) return;
    
    const featuredPrograms = programs.slice(0, 6);
    
    programGrid.innerHTML = featuredPrograms
      .map((p) => `
        <a class="program-tile" href="/program/">
          <span>${escapeHtml(p.cat)}</span>
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.summary)}</p>
        </a>
      `)
      .join("");
  }
  
  // Load latest news
  async function loadLatestNews() {
    const newsGrid = qs('#homeNewsGrid');
    if (!newsGrid) return;
    
    const lang = getLang();
    const news = await loadJSON(`/data/news-${lang}.json`);
    if (!news) return;
    
    const latestNews = news.slice(0, 3);
    
    newsGrid.innerHTML = latestNews
      .map((n) => {
        const readLabel = lang === 'en' ? 'reads' : 'dibaca';
        
        return `<a class="news-card" href="/berita/detail.html?slug=${encodeURIComponent(n.slug)}">
          <img src="/assets/img/${escapeHtml(n.image)}" alt="${escapeHtml(n.title)}">
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
    console.log('Initializing main.js');
    initReveal();
    initCounters();
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