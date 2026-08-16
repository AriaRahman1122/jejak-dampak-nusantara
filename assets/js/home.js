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
  
  // ============ COUNTER ANIMATION (DENGAN TRANSLASI) ============
  function initCounters() {
    const counters = qsa("[data-count]");
    console.log('Counters found:', counters.length);
    
    if (!counters.length) return;
    
    // Fungsi untuk mendapatkan suffix berdasarkan bahasa
    function getTranslatedSuffix(suffix, lang) {
      if (lang === 'en') {
        // Ganti kata Indonesia dengan Inggris
        const translations = {
          'Miliar': 'Billion',
          'Juta': 'Million',
          'Ribu': 'Thousand',
          '+': '+',
        };
        
        let translatedSuffix = suffix;
        for (const [id, en] of Object.entries(translations)) {
          translatedSuffix = translatedSuffix.replace(id, en);
        }
        return translatedSuffix;
      }
      return suffix;
    }
    
    // Fungsi animasi untuk satu counter
    function animateCounter(el, delay) {
      const target = parseInt(el.dataset.count) || 0;
      const originalSuffix = el.dataset.suffix || "";
      const lang = getLang();
      const suffix = getTranslatedSuffix(originalSuffix, lang);
      const duration = 2000; // 2 detik
      
      console.log('Animating counter:', target, suffix);
      
      setTimeout(() => {
        const startTime = performance.now();
        
        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing: easeOutCubic
          const eased = 1 - Math.pow(1 - progress, 3);
          
          const currentValue = Math.floor(target * eased);
          el.textContent = currentValue.toLocaleString("id-ID") + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            // Pastikan nilai akhir benar
            el.textContent = target.toLocaleString("id-ID") + suffix;
          }
        }
        
        requestAnimationFrame(update);
      }, delay);
    }
    
    // Langsung animasikan semua counter dengan delay berurutan
    counters.forEach((counter, index) => {
      animateCounter(counter, index * 200);
    });
  }
  
  // ============ LOAD BRANDS ============
  function loadBrands() {
    const brandTracks = qsa('.brand-track');
    if (!brandTracks.length) return;
    
    let brands = null;
    
    if (window.JDN_DATA && window.JDN_DATA.brands) {
      brands = window.JDN_DATA.brands;
    } else if (window.JDN_BRANDS) {
      brands = window.JDN_BRANDS;
    }
    
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
  function loadFeaturedPrograms() {
    const programGrid = qs('#homeProgramGrid');
    if (!programGrid) return;
    
    const lang = getLang();
    
    let programs = null;
    
    if (lang === 'id') {
      if (window.JDN_DATA && window.JDN_DATA.programs_id) {
        programs = window.JDN_DATA.programs_id;
      } else if (window.JDN_PROGRAMS_ID) {
        programs = window.JDN_PROGRAMS_ID;
      }
    } else {
      if (window.JDN_DATA && window.JDN_DATA.programs_en) {
        programs = window.JDN_DATA.programs_en;
      } else if (window.JDN_PROGRAMS_EN) {
        programs = window.JDN_PROGRAMS_EN;
      }
    }
    
    if (!programs || !programs.length) {
      console.warn('No programs data found for lang:', lang);
      return;
    }
    
    const featuredPrograms = programs.slice(0, 6);
    
    programGrid.innerHTML = featuredPrograms
      .map((p) => `
        <a class="program-tile reveal in-view" href="program/">
          <span>${escapeHtml(p.cat)}</span>
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.summary)}</p>
        </a>
      `)
      .join("");
    
    console.log('Featured programs loaded:', featuredPrograms.length);
  }
  
  // ============ LOAD LATEST NEWS ============
  function loadLatestNews() {
    const newsGrid = qs('#homeNewsGrid');
    if (!newsGrid) return;
    
    const lang = getLang();
    const readLabel = lang === 'en' ? 'reads' : 'dibaca';
    
    let news = null;
    
    if (lang === 'id') {
      if (window.JDN_DATA && window.JDN_DATA.news_id) {
        news = window.JDN_DATA.news_id;
      } else if (window.JDN_NEWS_ID) {
        news = window.JDN_NEWS_ID;
      }
    } else {
      if (window.JDN_DATA && window.JDN_DATA.news_en) {
        news = window.JDN_DATA.news_en;
      } else if (window.JDN_NEWS_EN) {
        news = window.JDN_NEWS_EN;
      }
    }
    
    if (!news || !news.length) {
      console.warn('No news data found for lang:', lang);
      return;
    }
    
    const latestNews = news.slice(0, 3);
    
    newsGrid.innerHTML = latestNews
      .map((n) => `
        <a class="news-card reveal in-view" href="berita/detail.html?slug=${encodeURIComponent(n.slug)}">
          <img src="assets/img/${escapeHtml(n.image)}" alt="${escapeHtml(n.title)}">
          <div>
            <span class="meta">${escapeHtml(n.category)} · ${n.views.toLocaleString('id-ID')} ${readLabel}</span>
            <h3>${escapeHtml(n.title)}</h3>
            <p>${escapeHtml(n.excerpt)}</p>
          </div>
        </a>
      `)
      .join("");
    
    console.log('Latest news loaded:', latestNews.length);
  }
  
  // ============ UPDATE CONTENT WHEN LANGUAGE CHANGES ============
  function updateContent() {
    // Re-animate counters dengan bahasa baru
    initCounters();
    
    loadFeaturedPrograms();
    loadLatestNews();
  }
  
  // ============ INITIALIZE ============
  function init() {
    console.log('Initializing home.js');
    
    // Jalankan counter langsung
    initCounters();
    
    // Load data
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