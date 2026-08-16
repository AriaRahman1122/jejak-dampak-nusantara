(function () {
  const t = {
    id: {
      'auth-eyebrow': 'Akun Donatur & Mitra', 'auth-title': 'Masuk atau Daftar',
      'auth-desc': 'Antarmuka akun sudah siap secara frontend. Autentikasi nyata memerlukan layanan backend atau identity provider.',
      'login-eyebrow': 'Masuk', 'login-title': 'Masuk ke akun', 'login-button': 'Masuk',
      'register-eyebrow': 'Daftar', 'register-title': 'Buat akun', 'register-button': 'Buat Akun',
      'form-name': 'Nama', 'form-email': 'Email', 'form-password': 'Password',
      'auth-static-notice': 'Mode statis aktif: tidak ada password yang disimpan dan tidak ada autentikasi palsu. Hubungkan halaman ini ke backend/identity provider saat login diperlukan.'
    },
    en: {
      'auth-eyebrow': 'Donor & Partner Account', 'auth-title': 'Login or Register',
      'auth-desc': 'The account interface is ready on the frontend. Real authentication requires a backend or identity provider.',
      'login-eyebrow': 'Login', 'login-title': 'Sign in to your account', 'login-button': 'Login',
      'register-eyebrow': 'Register', 'register-title': 'Create an account', 'register-button': 'Create Account',
      'form-name': 'Name', 'form-email': 'Email', 'form-password': 'Password',
      'auth-static-notice': 'Static mode is active: no passwords are stored and no fake authentication is performed. Connect this page to a backend/identity provider when real login is needed.'
    }
  };
  function apply(lang) { Object.entries(t[lang] || t.id).forEach(([key, value]) => document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => el.textContent = value)); }
  function init() {
    apply(localStorage.getItem('jdn-lang') || 'id');
    document.querySelectorAll('[data-toggle-password]').forEach(btn => btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
    }));
    document.querySelectorAll('[data-auth-form]').forEach(form => form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const lang = localStorage.getItem('jdn-lang') || 'id';
      if (status) status.textContent = lang === 'en'
        ? 'Static preview only. Connect this form to your authentication service before using it in production.'
        : 'Ini hanya pratinjau statis. Hubungkan form ini ke layanan autentikasi sebelum digunakan di produksi.';
    }));
  }
  document.addEventListener('language-changed', e => apply(e.detail.lang));
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
})();
