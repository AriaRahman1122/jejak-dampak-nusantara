(function () {
  function init() {
    document.querySelectorAll('[data-toggle-password]').forEach(btn => btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
    }));

    document.querySelectorAll('[data-auth-form]').forEach(form => form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const lang = localStorage.getItem('jdn-lang') || 'id';
      if (status) {
        status.textContent = lang === 'en'
          ? 'Static preview only. Connect this form to your authentication service before using it in production.'
          : 'Ini hanya pratinjau statis. Hubungkan form ini ke layanan autentikasi sebelum digunakan di produksi.';
      }
    }));
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
