(function () {
  const t = {
    id: {
      'contact-eyebrow': 'Kontak', 'contact-title': 'Mari berkolaborasi',
      'contact-desc': 'Sampaikan kebutuhan donasi, kemitraan CSR, atau konsultasi program Anda.',
      'official-contact': 'Kontak Resmi', 'contact-note': 'Form ini bekerja tanpa server: pengiriman akan membuka aplikasi email Anda.',
      'contact-form-eyebrow': 'Kirim Pesan', 'contact-form-title': 'Ceritakan kebutuhan Anda',
      'form-name': 'Nama', 'form-email': 'Email', 'form-phone': 'WhatsApp', 'form-topic': 'Topik',
      'topic-donation': 'Donasi', 'topic-csr': 'Kemitraan CSR', 'topic-program': 'Program Sosial', 'topic-media': 'Media / Berita',
      'form-message': 'Pesan', 'send-message': 'Kirim Pesan'
    },
    en: {
      'contact-eyebrow': 'Contact', 'contact-title': 'Let’s collaborate',
      'contact-desc': 'Tell us about your donation, CSR partnership, or program needs.',
      'official-contact': 'Official Contact', 'contact-note': 'This form works without a server: submitting opens your email app.',
      'contact-form-eyebrow': 'Send a Message', 'contact-form-title': 'Tell us what you need',
      'form-name': 'Name', 'form-email': 'Email', 'form-phone': 'WhatsApp', 'form-topic': 'Topic',
      'topic-donation': 'Donation', 'topic-csr': 'CSR Partnership', 'topic-program': 'Social Program', 'topic-media': 'Media / News',
      'form-message': 'Message', 'send-message': 'Send Message'
    }
  };
  function apply(lang) { Object.entries(t[lang] || t.id).forEach(([key, value]) => document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => el.textContent = value)); }
  const init = () => apply(localStorage.getItem('jdn-lang') || 'id');
  document.addEventListener('DOMContentLoaded', init);
  document.addEventListener('language-changed', e => apply(e.detail.lang));
})();
