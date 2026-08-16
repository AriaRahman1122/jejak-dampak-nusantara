/*
  ============================================================================
  File: home.js
  Deskripsi: Fungsi untuk halaman beranda (counter, brands, programs, news)
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// home.js - Handle halaman beranda
(function() {
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
  
  // Fungsi loadJSON yang sama dengan halaman lain
  async function loadJSON(url) {
    return window.JDN ? window.JDN.data(url, getLang()) : null;
  }
  
  // ============ COUNTER ANIMATION ============
  function initCounters() {
    const counters = qsa("[data-count]");
    console.log('Counters found:', counters.length);
    
    if (!counters.length) return;
    
    function animateCounter(el, delay) {
      const target = parseInt(el.dataset.count) || 0;
      const suffix = el.dataset.suffix || "";
      const duration = 2000;
      
      setTimeout(() => {
        const startTime = performance.now();
        
        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(target * eased);
          
          el.textContent = currentValue.toLocaleString("id-ID") + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target.toLocaleString("id-ID") + suffix;
          }
        }
        
        requestAnimationFrame(update);
      }, delay);
    }
    
    counters.forEach((counter, index) => {
      animateCounter(counter, index * 200);
    });
  }
  
  // ============ LOAD BRANDS ============
  async function loadBrands() {
    const brandTracks = qsa('.brand-track');
    if (!brandTracks.length) return;
    
    const brands = await loadJSON('/data/brands.json');
    
    if (!brands || !brands.length) {
      console.warn('No brands data found');
      return;
    }
    
    const brandHTML = brands
      .map((brand) => `<img src="${escapeHtml(brand.logo)}" alt="${escapeHtml(brand.name)}">`)
      .join("");
    
    brandTracks.forEach(track => {
      track.innerHTML = brandHTML + brandHTML;
    });
    
    console.log('Brands loaded:', brands.length);
  }
  
  // ============ LOAD FEATURED PROGRAMS ============
  async function loadFeaturedPrograms() {
    const programGrid = qs('#homeProgramGrid');
    if (!programGrid) {
      console.warn('Program grid element not found');
      return;
    }
    
    const lang = getLang();
    
    // Gunakan loadJSON seperti halaman lain
    const programs = await loadJSON(`/data/programs-${lang}.json`);
    
    console.log('Loading programs for lang:', lang);
    console.log('Programs data:', programs ? programs.length + ' items' : 'null');
    
    if (!programs || !programs.length) {
      console.warn('No programs data found for lang:', lang);
      return;
    }
    
    const featuredPrograms = programs.slice(0, 6);
    
    programGrid.innerHTML = featuredPrograms
      .map((p) => {
        const title = p.title || '';
        const summary = p.summary || p.excerpt || '';
        const cat = p.cat || p.category || '';
        
        return `
          <a class="program-tile reveal in-view" href="${window.JDN.url('/program/')}">
            <span>${escapeHtml(cat)}</span>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(summary)}</p>
          </a>
        `;
      })
      .join("");
    
    console.log('Featured programs loaded:', featuredPrograms.length);
  }
  
  // ============ LOAD LATEST NEWS ============
  async function loadLatestNews() {
    const newsGrid = qs('#homeNewsGrid');
    if (!newsGrid) {
      console.warn('News grid element not found');
      return;
    }
    
    const lang = getLang();
    const readLabel = lang === 'en' ? 'reads' : 'dibaca';
    
    // Gunakan loadJSON seperti halaman lain
    const news = await loadJSON(`/data/news-${lang}.json`);
    
    console.log('Loading news for lang:', lang);
    console.log('News data:', news ? news.length + ' items' : 'null');
    
    if (!news || !news.length) {
      console.warn('No news data found for lang:', lang);
      return;
    }
    
    const latestNews = news.slice(0, 3);
    
    newsGrid.innerHTML = latestNews
      .map((n) => {
        const title = n.title || '';
        const excerpt = n.excerpt || '';
        const category = n.category || '';
        const views = n.views || 0;
        const image = n.image || '';
        const slug = n.slug || '';
        
        return `
          <a class="news-card reveal in-view" href="${window.JDN.url(`/berita/detail.html?slug=${encodeURIComponent(slug)}`)}">
            <img src="${window.JDN.url(`/assets/img/${image}`)}" alt="${escapeHtml(title)}">
            <div>
              <span class="meta">${escapeHtml(category)} · ${views.toLocaleString('id-ID')} ${readLabel}</span>
              <h3>${escapeHtml(title)}</h3>
              <p>${escapeHtml(excerpt)}</p>
            </div>
          </a>
        `;
      })
      .join("");
    
    console.log('Latest news loaded:', latestNews.length);
  }
  
  // ============ UPDATE CONTENT WHEN LANGUAGE CHANGES ============
  function updateContent() {
    initCounters();
    loadFeaturedPrograms();
    loadLatestNews();
  }
  
  // ============ INITIALIZE ============
  function init() {
    console.log('Initializing home.js');
    
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