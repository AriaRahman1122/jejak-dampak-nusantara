/*
  ============================================================================
  File: components.js
  Deskripsi: Translation untuk Navbar & Footer
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// translations/components.js - Translation untuk Navbar & Footer
(function() {
  console.log('components translations loaded');
  
  // Translations object untuk navbar dan footer
  const translations = {
    id: {
      'nav-home': 'Beranda',
      'nav-about': 'Tentang',
      'nav-programs': 'Program',
      'nav-partnership': 'Kemitraan',
      'nav-news': 'Berita',
      'donate-now': 'Donasi Sekarang',
      'become-partner': 'Jadi Mitra',
      'footer-desc': 'Yayasan Jejak Dampak Nusantara adalah jembatan kolaborasi antara donatur, perusahaan, dan masyarakat untuk pendidikan, kesehatan, dan keberlanjutan.',
      'menu': 'Menu',
      'trust': 'Kepercayaan',
      'impact': 'Dampak',
      'transparency': 'Transparansi',
      'donation-campaign': 'Campaign Donasi',
      'contact': 'Kontak'
    },
    en: {
      'nav-home': 'Home',
      'nav-about': 'About',
      'nav-programs': 'Programs',
      'nav-partnership': 'Partnership',
      'nav-news': 'News',
      'donate-now': 'Donate Now',
      'become-partner': 'Become a Partner',
      'footer-desc': 'Jejak Dampak Nusantara Foundation is a collaboration bridge between donors, companies, and communities for education, health, and sustainability.',
      'menu': 'Menu',
      'trust': 'Trust',
      'impact': 'Impact',
      'transparency': 'Transparency',
      'donation-campaign': 'Donation Campaign',
      'contact': 'Contact'
    }
  };
  
  // Apply language untuk navbar dan footer
  function applyLanguage(lang) {
    console.log('Applying components translations:', lang);
    
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
      setTimeout(applyInitialLanguage, 50);
    });
  } else {
    setTimeout(applyInitialLanguage, 50);
  }
})();