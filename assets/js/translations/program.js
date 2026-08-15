/*
  ============================================================================
  File: program.js
  Deskripsi: Translation untuk halaman program
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// translations/program.js - Translation untuk halaman program
(function() {
  console.log('program translations loaded');
  
  // Translations object khusus untuk halaman program
  const translations = {
    id: {
      'hero-eyebrow': 'Bank Program',
      'hero-title': 'Temukan program berdasarkan kategori dan wilayah.',
      'hero-desc': 'Gunakan search, pilih beberapa kategori, lalu filter provinsi/kota untuk menemukan program yang paling sesuai.',
      'search-placeholder': 'Cari program, kategori, SDGs, provinsi, atau kota...',
      'category-label': 'Kategori',
      'all-provinces': 'Semua Provinsi',
      'all-cities': 'Semua Kota',
      'program-count-label': 'program',
      'result-hint': 'klik card untuk melihat detail program',
      'select-all': 'Pilih Semua',
      'detail': 'Detail',
      'region': 'Wilayah',
      'beneficiaries': 'Penerima',
      'program-scope': 'Ruang lingkup program',
      'scope-1': 'Needs assessment dan validasi penerima manfaat.',
      'scope-2': 'Desain aktivitas, indikator, dan timeline implementasi.',
      'scope-3': 'Dokumentasi lapangan dan laporan dampak.',
      'consult-program': 'Konsultasikan Program',
      'no-results-title': 'Program tidak ditemukan',
      'no-results-desc': 'Coba ubah kategori, provinsi, kota, atau kata kunci pencarian.'
    },
    en: {
      'hero-eyebrow': 'Program Bank',
      'hero-title': 'Find programs by category and region.',
      'hero-desc': 'Use search, select multiple categories, then filter province/city to find the most suitable program.',
      'search-placeholder': 'Search programs, categories, SDGs, provinces, or cities...',
      'category-label': 'Category',
      'all-provinces': 'All Provinces',
      'all-cities': 'All Cities',
      'program-count-label': 'programs',
      'result-hint': 'click card to view program details',
      'select-all': 'Select All',
      'detail': 'Detail',
      'region': 'Region',
      'beneficiaries': 'Beneficiaries',
      'program-scope': 'Program scope',
      'scope-1': 'Needs assessment and beneficiary validation.',
      'scope-2': 'Activity design, indicators, and implementation timeline.',
      'scope-3': 'Field documentation and impact reports.',
      'consult-program': 'Consult Program',
      'no-results-title': 'Program not found',
      'no-results-desc': 'Try changing categories, provinces, cities, or search keywords.'
    }
  };
  
  // Apply language untuk halaman program
  function applyLanguage(lang) {
    console.log('Applying program translations:', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    
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
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(applyInitialLanguage, 100);
    });
  } else {
    setTimeout(applyInitialLanguage, 100);
  }
})();