/*
  ============================================================================
  File: contact.js
  Deskripsi: Translation untuk halaman kontak
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// translations/contact.js - Translation untuk halaman kontak
(function() {
  console.log('contact translations loaded');
  
  const translations = {
    id: {
      'contact-eyebrow': 'Kontak',
      'contact-title': 'Mari berkolaborasi',
      'contact-desc': 'Sampaikan kebutuhan donasi, kemitraan CSR, atau konsultasi program Anda.',
      'official-contact': 'Kontak Resmi',
      'contact-form-eyebrow': 'Kirim Pesan',
      'contact-form-title': 'Ceritakan kebutuhan Anda',
      'form-name': 'Nama',
      'form-email': 'Email',
      'form-phone': 'WhatsApp',
      'form-topic': 'Topik',
      'topic-donation': 'Donasi',
      'topic-csr': 'Kemitraan CSR',
      'topic-program': 'Program Sosial',
      'topic-media': 'Media / Berita',
      'form-message': 'Pesan',
      'send-message': 'Kirim Pesan',
      'success-message': 'Terima kasih! Pesan Anda sedang diproses.',
      'error-message': 'Maaf, terjadi kesalahan. Silakan coba lagi.'
    },
    en: {
      'contact-eyebrow': 'Contact',
      'contact-title': "Let's collaborate",
      'contact-desc': 'Tell us about your donation, CSR partnership, or program needs.',
      'official-contact': 'Official Contact',
      'contact-form-eyebrow': 'Send a Message',
      'contact-form-title': 'Tell us what you need',
      'form-name': 'Name',
      'form-email': 'Email',
      'form-phone': 'WhatsApp',
      'form-topic': 'Topic',
      'topic-donation': 'Donation',
      'topic-csr': 'CSR Partnership',
      'topic-program': 'Social Program',
      'topic-media': 'Media / News',
      'form-message': 'Message',
      'send-message': 'Send Message',
      'success-message': 'Thank you! Your message is being processed.',
      'error-message': 'Sorry, an error occurred. Please try again.'
    }
  };
  
  function applyLanguage(lang) {
    console.log('Applying contact translations:', lang);
    
    const activeTranslations = translations[lang] || translations.id;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (activeTranslations[key]) {
        el.textContent = activeTranslations[key];
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