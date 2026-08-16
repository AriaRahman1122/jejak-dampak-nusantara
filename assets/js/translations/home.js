/*
  ============================================================================
  File: home.js
  Deskripsi: Translation untuk halaman beranda
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// translations/home.js - Translation untuk halaman beranda
(function() {
  console.log('home translations loaded');
  
  // Translations object khusus untuk halaman beranda
  const translations = {
    id: {
      // Hero Section
      'since2026': 'Jejak Dampak Nusantara · Since 2026',
      'hero-title': 'Setiap aksi kecil meninggalkan jejak dampak yang nyata.',
      'hero-desc': 'Jejak Dampak Nusantara menjadi jembatan antara donatur, perusahaan, dan masyarakat untuk memajukan pendidikan, kesehatan, dan keberlanjutan di seluruh Indonesia.',
      'view-programs': 'Lihat Bank Program',
      
      // Stats Section
      'funds-donated': 'Dana Terdonasi (Miliar IDR)',
      'programs-completed': 'Program Terlaksana',
      'donors': 'Donatur',
      'volunteers': 'Relawan',
      'partners': 'Mitra',
      
      // Impact Section
      'measurable-impact': 'Dampak Terukur',
      'impact-title': 'Dirancang agar publik lebih percaya, mitra lebih mudah mengambil keputusan.',
      'clear-legality': 'Legalitas Jelas',
      'legality-desc': 'Akta, pengesahan, profil pengurus, dan kontak resmi ditampilkan terbuka.',
      'impact-report': 'Impact Report',
      'report-desc': 'Setiap program memiliki indikator, output, dokumentasi, dan laporan.',
      'program-bank': 'Bank Program',
      'bank-desc': 'Mitra dapat memilih program sesuai isu, wilayah, SDGs, dan target dampak.',
      'csr-ready': 'CSR Ready',
      'csr-desc': 'Siap dari needs assessment, desain program, implementasi, sampai M&E.',
      
      // Quote Section
      'quote-text': '"Setiap aksi kecil meninggalkan jejak dampak yang nyata, terukur, dan berkelanjutan."',
      'quote-desc': 'Jejak Dampak Nusantara hadir sebagai jembatan kolaborasi antara donatur, perusahaan, dan masyarakat untuk menciptakan dampak yang dapat dibuktikan.',
      'read-profile': 'Baca profil yayasan →',
      
      // Ecosystem Section
      'ecosystem': 'Ekosistem',
      'ecosystem-title': 'Partner dan Ekosistem JDN.',
      
      // Programs Section
      'featured-programs': 'Program Pilihan',
      'programs-title': 'Bank program yang siap dikembangkan bersama donatur dan mitra.',
      'view-all-programs': 'Lihat Semua Program',
      
      // News Section
      'latest-news': 'Berita Terbaru',
      'news-title': 'Update cerita, program, dan transparansi dampak.',
      
      // CTA Section
      'cta-title': 'Perluas Jejak Dampak bersama kami.',
      'cta-desc': 'Pilih program, susun skema CSR, atau mulai campaign donasi yang transparan dan terdokumentasi.',
      'open-campaign': 'Buka Campaign',
      'partnership-discussion': 'Diskusi Kemitraan'
    },
    en: {
      // Hero Section
      'since2026': 'Jejak Dampak Nusantara · Since 2026',
      'hero-title': 'Every small action leaves a real impact trail.',
      'hero-desc': 'Jejak Dampak Nusantara bridges donors, companies, and communities to advance education, health, and sustainability across Indonesia.',
      'view-programs': 'View Program Bank',
      
      // Stats Section
      'funds-donated': 'Funds Donated (Billion IDR)',
      'programs-completed': 'Programs Completed',
      'donors': 'Donors',
      'volunteers': 'Volunteers',
      'partners': 'Partners',
      
      // Impact Section
      'measurable-impact': 'Measurable Impact',
      'impact-title': 'Designed for public trust and easier partner decision-making.',
      'clear-legality': 'Clear Legality',
      'legality-desc': 'Deeds, legalization, board profiles, and official contacts displayed openly.',
      'impact-report': 'Impact Report',
      'report-desc': 'Every program has indicators, outputs, documentation, and reports.',
      'program-bank': 'Program Bank',
      'bank-desc': 'Partners can choose programs by issue, region, SDGs, and impact targets.',
      'csr-ready': 'CSR Ready',
      'csr-desc': 'Ready from needs assessment, program design, implementation, to M&E.',
      
      // Quote Section
      'quote-text': '"Every small action leaves a real, measurable, and sustainable impact trail."',
      'quote-desc': 'Jejak Dampak Nusantara exists as a collaboration bridge between donors, companies, and communities to create verifiable impact.',
      'read-profile': 'Read foundation profile →',
      
      // Ecosystem Section
      'ecosystem': 'Ecosystem',
      'ecosystem-title': 'Partners and JDN Ecosystem.',
      
      // Programs Section
      'featured-programs': 'Featured Programs',
      'programs-title': 'Program bank ready to be developed with donors and partners.',
      'view-all-programs': 'View All Programs',
      
      // News Section
      'latest-news': 'Latest News',
      'news-title': 'Updates on stories, programs, and impact transparency.',
      
      // CTA Section
      'cta-title': 'Expand Your Impact Trail with us.',
      'cta-desc': 'Choose programs, arrange CSR schemes, or start transparent and documented donation campaigns.',
      'open-campaign': 'Open Campaign',
      'partnership-discussion': 'Partnership Discussion'
    }
  };
  
  // Apply language untuk halaman beranda
  function applyLanguage(lang) {
    console.log('Applying home translations:', lang);
    
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