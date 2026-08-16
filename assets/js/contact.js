(function () {
  function init() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('contactStatus');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const lang = localStorage.getItem('jdn-lang') || 'id';
      const data = new FormData(form);
      const subject = `[JDN] ${data.get('topic') || 'Kontak'}`;
      const body = [
        `Nama: ${data.get('name') || ''}`,
        `Email: ${data.get('email') || ''}`,
        `WhatsApp: ${data.get('phone') || ''}`,
        `Topik: ${data.get('topic') || ''}`,
        '',
        `Pesan:
${data.get('message') || ''}`
      ].join('\
');
      window.location.href = `mailto:asepnugraha@jejakdampak.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (status) status.textContent = lang === 'en' ? 'Your email app should open now.' : 'Aplikasi email Anda seharusnya terbuka sekarang.';
    });
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
