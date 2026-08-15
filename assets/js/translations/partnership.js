/*
  ============================================================================
  File: partnership.js
  Deskripsi: Translation untuk halaman kemitraan
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// translations/partnership.js - Translation untuk halaman kemitraan
(function() {
  console.log('partnership translations loaded');
  
  // Translations object khusus untuk halaman kemitraan
  const translations = {
    id: {
      // Hero Section
      'hero-eyebrow': 'CSR & Crowdfunding',
      'hero-title': 'Kemitraan yang rapi dari desain program sampai laporan dampak.',
      'hero-desc': 'JDN membantu perusahaan, komunitas, dan institusi membangun program sosial yang terukur, profesional, transparan, dan mudah dikomunikasikan.',
      
      // Trusted Section
      'trusted-eyebrow': 'Dipercaya Ekosistem',
      'trusted-title': 'Brand dan institusi yang pernah berada dalam ekosistem kolaborasi founder team.',
      
      // Service Choice Section
      'service-eyebrow': 'Layanan Kemitraan',
      'service-title': 'Pilih bentuk kolaborasi yang paling sesuai dengan kebutuhan Anda.',
      'service-desc': 'JDN menyediakan dua jalur utama: kemitraan CSR end-to-end dan penggalangan donasi digital yang transparan.',
      'csr-title': 'CSR Partnership',
      'csr-desc': 'Cocok untuk perusahaan yang ingin menjalankan program sosial secara profesional, terukur, dan siap masuk laporan keberlanjutan.',
      'crowdfunding-title': 'Digital Crowdfunding',
      'crowdfunding-desc': 'Cocok untuk campaign donasi publik, employee giving, corporate matching, dan program digital berbasis transparansi dampak.',
      'view-detail': 'Lihat Detail',
      'view-programs': 'Lihat Program',
      
      // CSR Detail Section
      'csr-eyebrow': 'CSR Partnership',
      'csr-detail-title': 'Layanan end-to-end untuk program CSR perusahaan.',
      'csr-detail-desc': 'JDN membantu perusahaan merancang, menjalankan, memantau, dan melaporkan program CSR agar dampaknya jelas, terukur, dan mudah dipertanggungjawabkan.',
      
      // Crowdfunding Detail Section
      'crowdfunding-eyebrow': 'Digital Crowdfunding',
      'crowdfunding-detail-title': 'Campaign donasi digital yang transparan dan mudah dipercaya.',
      'crowdfunding-detail-desc': 'JDN membantu campaign sosial tampil lebih kredibel melalui kurasi program, storytelling, update progres, dan pelaporan yang mudah dipahami donatur maupun perusahaan.',
      
      // Why JDN Section
      'why-eyebrow': 'Kenapa JDN?',
      'why-title': 'Mitra pelaksana yang fokus pada dampak, transparansi, dan keberlanjutan.',
      
      // Testimonial Section
      'testimonial-eyebrow': 'Testimoni',
      'testimonial-title': 'Apa yang dicari mitra saat memilih pelaksana program sosial?',
      'testimonial-desc': 'Kolaborasi yang baik membutuhkan komunikasi rapi, program yang jelas, dan bukti dampak yang bisa dipertanggungjawabkan.',
      
      // Form Section
      'form-eyebrow': 'Konsultasi Kemitraan',
      'form-title': 'Masih butuh bantuan memilih skema program?',
      'form-desc': 'Isi form berikut dan tim JDN dapat membantu menyesuaikan kebutuhan program, wilayah, target penerima manfaat, dan format pelaporan.',
      'form-name': 'Nama Lengkap',
      'form-company': 'Instansi / Perusahaan',
      'form-email': 'Email',
      'form-phone': 'Nomor WhatsApp',
      'form-service': 'Jenis Kemitraan',
      'form-select-service': 'Pilih jenis kemitraan',
      'form-consult': 'Belum yakin, ingin konsultasi dulu',
      'form-budget': 'Estimasi Budget',
      'form-select-budget': 'Pilih estimasi budget',
      'form-message': 'Ceritakan kebutuhan program',
      'form-submit': 'Kirim Konsultasi'
    },
    en: {
      // Hero Section
      'hero-eyebrow': 'CSR & Crowdfunding',
      'hero-title': 'Partnerships that are neat from program design to impact reporting.',
      'hero-desc': 'JDN helps companies, communities, and institutions build social programs that are measurable, professional, transparent, and easy to communicate.',
      
      // Trusted Section
      'trusted-eyebrow': 'Trusted Ecosystem',
      'trusted-title': 'Brands and institutions that have been in the founder team collaboration ecosystem.',
      
      // Service Choice Section
      'service-eyebrow': 'Partnership Services',
      'service-title': 'Choose the collaboration form that best suits your needs.',
      'service-desc': 'JDN provides two main paths: end-to-end CSR partnerships and transparent digital crowdfunding.',
      'csr-title': 'CSR Partnership',
      'csr-desc': 'Suitable for companies that want to run social programs professionally, measurably, and ready for sustainability reports.',
      'crowdfunding-title': 'Digital Crowdfunding',
      'crowdfunding-desc': 'Suitable for public donation campaigns, employee giving, corporate matching, and digital programs based on impact transparency.',
      'view-detail': 'View Details',
      'view-programs': 'View Programs',
      
      // CSR Detail Section
      'csr-eyebrow': 'CSR Partnership',
      'csr-detail-title': 'End-to-end services for corporate CSR programs.',
      'csr-detail-desc': 'JDN helps companies design, execute, monitor, and report CSR programs so their impact is clear, measurable, and easy to account for.',
      
      // Crowdfunding Detail Section
      'crowdfunding-eyebrow': 'Digital Crowdfunding',
      'crowdfunding-detail-title': 'Digital donation campaigns that are transparent and trustworthy.',
      'crowdfunding-detail-desc': 'JDN helps social campaigns appear more credible through program curation, storytelling, progress updates, and reporting that is easy for donors and companies to understand.',
      
      // Why JDN Section
      'why-eyebrow': 'Why JDN?',
      'why-title': 'An implementing partner focused on impact, transparency, and sustainability.',
      
      // Testimonial Section
      'testimonial-eyebrow': 'Testimonials',
      'testimonial-title': 'What do partners look for when choosing a social program implementer?',
      'testimonial-desc': 'Good collaboration requires neat communication, clear programs, and evidence of impact that can be accounted for.',
      
      // Form Section
      'form-eyebrow': 'Partnership Consultation',
      'form-title': 'Still need help choosing a program scheme?',
      'form-desc': 'Fill out the following form and the JDN team can help adjust program needs, regions, beneficiary targets, and reporting formats.',
      'form-name': 'Full Name',
      'form-company': 'Institution / Company',
      'form-email': 'Email',
      'form-phone': 'WhatsApp Number',
      'form-service': 'Partnership Type',
      'form-select-service': 'Select partnership type',
      'form-consult': 'Not sure, want to consult first',
      'form-budget': 'Estimated Budget',
      'form-select-budget': 'Select estimated budget',
      'form-message': 'Tell us about your program needs',
      'form-submit': 'Send Consultation'
    }
  };
  
  // Apply language untuk halaman kemitraan
  function applyLanguage(lang) {
    console.log('Applying partnership translations:', lang);
    
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