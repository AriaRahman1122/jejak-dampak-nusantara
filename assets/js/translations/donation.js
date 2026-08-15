/*
  ============================================================================
  File: donation.js
  Deskripsi: Translation untuk halaman donasi
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// translations/donation.js - Translation untuk halaman donasi
(function() {
  console.log('donation translations loaded');
  
  const translations = {
    id: {
      'hero-eyebrow': 'Campaign Donasi',
      'hero-title': 'Pilih campaign yang sedang dibuka.',
      'hero-desc': 'Setiap campaign menampilkan target, progres dana, sisa waktu, penerima manfaat, dan update program.',
      'donate-now': 'Donasi Sekarang',
      'search-placeholder': 'Cari campaign...',
      'category-label': 'Kategori',
      'campaign-count-label': 'campaign',
      'result-hint': 'klik card untuk melihat detail campaign',
      'ending-soon': 'Segera Berakhir',
      'detail-title': 'Detail Campaign',
      'detail-desc': 'Campaign ini mendukung penerima manfaat melalui rangkaian aktivitas yang terukur, terdokumentasi, dan dilaporkan secara berkala kepada donatur.',
      'funded-title': 'Yang didanai',
      'update-title': 'Update Program',
      'form-title': 'Form Donasi',
      'donation-amount': 'Nominal Donasi',
      'payment-method': 'Metode Pembayaran',
      'bank-transfer': 'Transfer Bank',
      'name-placeholder': 'Nama Donatur',
      'amount-placeholder': 'Nominal Donasi',
      'contact-placeholder': 'Email / WhatsApp',
      'anonymous-donation': 'Sembunyikan nama saya (Donatur Anonim)',
      'submit-donation': 'Kirim Donasi',
      'form-note': 'Form siap disambungkan ke payment gateway.',
      'secure-payment': 'Pembayaran Aman',
      'transparent-report': 'Laporan Transparan'
    },
    en: {
      'hero-eyebrow': 'Donation Campaign',
      'hero-title': 'Choose an open campaign.',
      'hero-desc': 'Each campaign displays targets, fund progress, remaining time, beneficiaries, and program updates.',
      'donate-now': 'Donate Now',
      'search-placeholder': 'Search campaigns...',
      'category-label': 'Category',
      'campaign-count-label': 'campaigns',
      'result-hint': 'click card to view campaign details',
      'ending-soon': 'Ending Soon',
      'detail-title': 'Campaign Details',
      'detail-desc': 'This campaign supports beneficiaries through a series of measurable, documented, and regularly reported activities to donors.',
      'funded-title': 'What is funded',
      'update-title': 'Program Updates',
      'form-title': 'Donation Form',
      'donation-amount': 'Donation Amount',
      'payment-method': 'Payment Method',
      'bank-transfer': 'Bank Transfer',
      'name-placeholder': 'Donor Name',
      'amount-placeholder': 'Donation Amount',
      'contact-placeholder': 'Email / WhatsApp',
      'anonymous-donation': 'Hide my name (Anonymous Donor)',
      'submit-donation': 'Submit Donation',
      'form-note': 'Form is ready to be connected to payment gateway.',
      'secure-payment': 'Secure Payment',
      'transparent-report': 'Transparent Report'
    }
  };
  
  function applyLanguage(lang) {
    console.log('Applying donation translations:', lang);
    
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
  
  document.addEventListener('language-changed', (e) => {
    applyLanguage(e.detail.lang);
  });
  
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