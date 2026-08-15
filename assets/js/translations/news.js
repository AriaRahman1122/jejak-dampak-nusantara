/*
  ============================================================================
  File: news.js
  Deskripsi: Translation untuk halaman berita
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// translations/news.js - Translation untuk halaman berita
(function() {
  console.log('news translations loaded');
  
  // Translations object khusus untuk halaman berita
  const translations = {
    id: {
      // Hero Section
      'news-eyebrow': 'Berita & Update',
      'news-page-title': 'Cerita dampak, program, dan transparansi.',
      'news-page-desc': 'Ikuti perkembangan terbaru dari Jejak Dampak Nusantara. Kami membagikan cerita dampak, update program, dan laporan transparansi secara berkala.',
      
      // Toolbar
      'search-placeholder': 'Cari berita, kategori...',
      'category-label': 'Kategori',
      'select-all': 'Pilih Semua',
      'all-categories': 'Semua',
      
      // Result
      'news-count-label': 'berita',
      'result-hint': 'klik card untuk membaca berita',
      
      // Sidebar
      'popular-news': 'Berita Terpopuler',
      
      // Card
      'reads': 'dibaca',
      
      // Load More
      'load-more': 'Muat Lebih Banyak',
      
      // No Results
      'no-results-title': 'Berita tidak ditemukan',
      'no-results-desc': 'Coba ubah kata kunci pencarian atau filter kategori.'
    },
    en: {
      // Hero Section
      'news-eyebrow': 'News & Updates',
      'news-page-title': 'Impact stories, programs, and transparency.',
      'news-page-desc': 'Follow the latest developments from Jejak Dampak Nusantara. We share impact stories, program updates, and transparency reports regularly.',
      
      // Toolbar
      'search-placeholder': 'Search news, categories...',
      'category-label': 'Category',
      'select-all': 'Select All',
      'all-categories': 'All',
      
      // Result
      'news-count-label': 'news',
      'result-hint': 'click card to read news',
      
      // Sidebar
      'popular-news': 'Popular News',
      
      // Card
      'reads': 'reads',
      
      // Load More
      'load-more': 'Load More',
      
      // No Results
      'no-results-title': 'No news found',
      'no-results-desc': 'Try changing your search keywords or category filters.'
    }
  };
  
  // Apply language untuk halaman berita
  function applyLanguage(lang) {
    console.log('Applying news translations:', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    
    // Update placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });
  }
  
  // Listen for language changes
  document.addEventListener('language-changed', (e) => {
    applyLanguage(e.detail.lang);
  });
  
  // Apply initial language after components are loaded
  function applyInitialLanguage() {
    const initialLang = localStorage.getItem('jdn-lang') || 'id';
    applyLanguage(initialLang);
  }
  
  // Wait for components to be loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(applyInitialLanguage, 100);
    });
  } else {
    setTimeout(applyInitialLanguage, 100);
  }
})();