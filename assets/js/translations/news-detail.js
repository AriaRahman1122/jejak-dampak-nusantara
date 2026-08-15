/*
  ============================================================================
  File: news-detail.js
  Deskripsi: Translation untuk halaman detail berita
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// translations/news-detail.js - Translation untuk halaman detail berita
(function() {
  console.log('news-detail translations loaded');
  
  // Translations object khusus untuk halaman detail berita
  const translations = {
    id: {
      // Breadcrumb
      'breadcrumb-home': 'Beranda',
      'breadcrumb-news': 'Berita',
      
      // Meta
      'reads': 'dibaca',
      'read-time': '4 menit baca',
      
      // Share
      'share-label': 'Bagikan:',
      
      // Sidebar
      'related-news': 'Berita Terkait',
      'cta-sidebar-title': 'Ingin berkontribusi?',
      'cta-sidebar-desc': 'Dukung program-program kami untuk menciptakan dampak yang nyata.',
      'donate-now': 'Donasi Sekarang'
    },
    en: {
      // Breadcrumb
      'breadcrumb-home': 'Home',
      'breadcrumb-news': 'News',
      
      // Meta
      'reads': 'reads',
      'read-time': '4 min read',
      
      // Share
      'share-label': 'Share:',
      
      // Sidebar
      'related-news': 'Related News',
      'cta-sidebar-title': 'Want to contribute?',
      'cta-sidebar-desc': 'Support our programs to create real impact.',
      'donate-now': 'Donate Now'
    }
  };
  
  // Apply language untuk halaman detail berita
  function applyLanguage(lang) {
    console.log('Applying news-detail translations:', lang);
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
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