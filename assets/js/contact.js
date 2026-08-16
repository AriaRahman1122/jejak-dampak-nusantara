/*
  ============================================================================
  File: contact.js
  Deskripsi: Fungsi untuk halaman kontak
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// contact.js - Handle halaman kontak (logic only)
(function() {
  console.log('contact.js v1.0.0 loaded');
  
  // Helper functions
  function qs(s, r = document) {
    return r.querySelector(s);
  }
  
  function getLang() {
    return localStorage.getItem('jdn-lang') || 'id';
  }
  
  function t(key) {
    const lang = getLang();
    const translations = {
      id: {
        'success-message': 'Terima kasih! Pesan Anda sedang diproses.',
        'error-message': 'Maaf, terjadi kesalahan. Silakan coba lagi.'
      },
      en: {
        'success-message': 'Thank you! Your message is being processed.',
        'error-message': 'Sorry, an error occurred. Please try again.'
      }
    };
    return translations[lang]?.[key] || translations.id[key] || key;
  }
  
  // Initialize contact form
  function initContactForm() {
    const form = qs('#contactForm');
    const statusEl = qs('#contactStatus');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Ambil data form
      const formData = new FormData(form);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const topic = formData.get('topic') || '';
      const message = formData.get('message') || '';
      
      // Cek apakah email client tersedia
      // Buat mailto link
      const subject = `[Kontak JDN] ${topic} - ${name}`;
      const body = `Nama: ${name}\nEmail: ${email}\nWhatsApp: ${phone}\nTopik: ${topic}\n\nPesan:\n${message}`;
      
      const mailtoLink = `mailto:asepnugraha@jejakdampak.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Buka email client
      window.location.href = mailtoLink;
      
      // Tampilkan status sukses
      if (statusEl) {
        statusEl.textContent = t('success-message');
        statusEl.className = 'form-status success';
      }
      
      // Reset form setelah 2 detik
      setTimeout(() => {
        form.reset();
        if (statusEl) {
          statusEl.textContent = '';
          statusEl.className = 'form-status';
        }
      }, 3000);
    });
  }
  
  // Initialize
  function init() {
    console.log('Initializing contact.js');
    initContactForm();
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();