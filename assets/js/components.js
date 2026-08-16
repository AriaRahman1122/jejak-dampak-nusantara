/*
  ============================================================================
  File: components.js
  Deskripsi: Komponen navbar, footer, dan pengaturan tema & bahasa
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// components.js - Load navbar, footer, dan handle theme/language toggle
(function() {
  console.log('components.js v1.0.0 loaded');

  // ------------------------------------------------------------------------
  // BASE: URL root situs, dihitung otomatis dari lokasi file ini sendiri.
  // components.js SELALU berada di "assets/js/components.js" relatif dari
  // root situs, jadi kita bisa mundur dari src file ini untuk menemukan
  // root-nya - baik saat lokal (http://localhost:8000/) maupun saat di-host
  // di subpath seperti GitHub Pages project (https://user.github.io/repo/).
  // Ini membuat navbar/footer tetap benar di kedalaman folder berapa pun.
  // ------------------------------------------------------------------------
  const BASE = (function() {
    const script = document.currentScript;
    if (script && script.src) {
      return script.src.replace(/assets\/js\/components\.js.*$/, '');
    }
    return '/'; // fallback jika currentScript tidak tersedia
  })();
  const BASE_PATH = new URL(BASE).pathname;

  // Navbar HTML
  const navbarHTML = `
    <header class="site-header" id="top">
      <div class="container nav-shell">
        <a class="brand" href="${BASE}" aria-label="Jejak Dampak Nusantara">
          <img src="${BASE}assets/img/logo.svg" alt="Jejak Dampak Nusantara">
        </a>
        <nav class="nav-center" aria-label="Navigasi utama">
          <a href="${BASE}" data-i18n="nav-home">Beranda</a>
          <a href="${BASE}tentang/" data-i18n="nav-about">Tentang</a>
          <a href="${BASE}program/" data-i18n="nav-programs">Program</a>
          <a href="${BASE}kemitraan/" data-i18n="nav-partnership">Kemitraan</a>
          <a href="${BASE}berita/" data-i18n="nav-news">Berita</a>
        </nav>
        <div class="nav-actions">
          <a class="btn btn-donate" href="${BASE}donasi/" data-i18n="donate-now">Donasi Sekarang</a>
          <button class="pill-btn lang-toggle" type="button" aria-label="Ganti Bahasa">EN</button>
          <button class="pill-btn theme-toggle" type="button" aria-label="Ganti Mode">☾</button>
          <button class="hamburger" type="button" aria-label="Buka Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="mobile-panel" aria-hidden="true">
        <a href="${BASE}" data-i18n="nav-home">Beranda</a>
        <a href="${BASE}tentang/" data-i18n="nav-about">Tentang</a>
        <a href="${BASE}program/" data-i18n="nav-programs">Program</a>
        <a href="${BASE}kemitraan/" data-i18n="nav-partnership">Kemitraan</a>
        <a href="${BASE}berita/" data-i18n="nav-news">Berita</a>
        <a href="${BASE}donasi/" data-i18n="donate-now">Donasi Sekarang</a>
      </div>
    </header>
  `;
  
  // Footer HTML
  const footerHTML = `
    <footer class="site-footer">
      <div class="container footer-layout">
        <div>
          <img class="footer-logo" src="${BASE}assets/img/logo.svg" alt="Jejak Dampak Nusantara">
          <p data-i18n="footer-desc">Yayasan Jejak Dampak Nusantara adalah jembatan kolaborasi antara donatur, perusahaan, dan masyarakat untuk pendidikan, kesehatan, dan keberlanjutan.</p>
          <div class="footer-actions">
            <a class="btn" href="${BASE}donasi/" data-i18n="donate-now">Donasi Sekarang</a>
            <a class="btn btn-outline" href="${BASE}kemitraan/" data-i18n="become-partner">Jadi Mitra</a>
          </div>
        </div>
        <div>
          <h4 data-i18n="menu">Menu</h4>
          <a href="${BASE}tentang/" data-i18n="nav-about">Tentang</a>
          <a href="${BASE}program/" data-i18n="nav-programs">Program</a>
          <a href="${BASE}kemitraan/" data-i18n="nav-partnership">Kemitraan</a>
          <a href="${BASE}berita/" data-i18n="nav-news">Berita</a>
        </div>
        <div>
          <h4 data-i18n="trust">Kepercayaan</h4>
          <a href="${BASE}#dampak" data-i18n="impact">Dampak</a>
          <a href="${BASE}#transparansi" data-i18n="transparency">Transparansi</a>
          <a href="${BASE}donasi/" data-i18n="donation-campaign">Campaign Donasi</a>
          <a href="${BASE}kontak/" data-i18n="contact">Kontak</a>
        </div>
        <div>
          <h4 data-i18n="contact">Kontak</h4>
          <p>Asep Nugraha - Founder & CEO<br>087735524614<br>asepnugraha@jejakdampak.org<br>Bandung, Jawa Barat</p>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© 2026 Jejak Dampak Nusantara.</span>
      </div>
    </footer>
  `;
  
  // Load components
  function loadComponents() {
    console.log('Loading components...');
    
    // Load navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
      navbarContainer.innerHTML = navbarHTML;
      console.log('Navbar loaded');
    }
    
    // Load footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = footerHTML;
      console.log('Footer loaded');
    }
    
    // Initialize after loading
    initializeComponents();
  }
  
  // Apply theme
  function applyTheme(theme) {
    console.log('Applying theme:', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update theme toggle buttons
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.textContent = theme === 'dark' ? '☀' : '☾';
    });
    
    // Save to localStorage
    localStorage.setItem('jdn-theme', theme);
    
    // Dispatch event for other scripts
    document.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme } }));
  }
  
  // Toggle language
  function toggleLanguage() {
    const currentLang = localStorage.getItem('jdn-lang') || 'id';
    const newLang = currentLang === 'id' ? 'en' : 'id';
    
    localStorage.setItem('jdn-lang', newLang);
    document.documentElement.setAttribute('lang', newLang);
    
    // Update language toggle buttons
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = newLang === 'id' ? 'EN' : 'ID';
    });
    
    // Dispatch event for translation scripts
    document.dispatchEvent(new CustomEvent('language-changed', { detail: { lang: newLang } }));
    
    console.log('Language changed to:', newLang);
  }
  
  // Initialize components
  function initializeComponents() {
    console.log('Initializing components...');
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mobilePanel = document.querySelector('.mobile-panel');
    
    if (hamburger && mobilePanel) {
      hamburger.addEventListener('click', () => {
        mobilePanel.classList.toggle('open');
        const isOpen = mobilePanel.classList.contains('open');
        mobilePanel.setAttribute('aria-hidden', String(!isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Tutup Menu' : 'Buka Menu');
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (mobilePanel.classList.contains('open') && 
            !mobilePanel.contains(e.target) && 
            !hamburger.contains(e.target)) {
          mobilePanel.classList.remove('open');
          mobilePanel.setAttribute('aria-hidden', 'true');
          hamburger.setAttribute('aria-label', 'Buka Menu');
        }
      });
    }
    
    // Theme toggle
    document.querySelectorAll('.theme-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    });
    
    // Language toggle
    document.querySelectorAll('.lang-toggle').forEach(toggle => {
      toggle.addEventListener('click', toggleLanguage);
    });
    
    // Apply saved settings
    const savedTheme = localStorage.getItem('jdn-theme') || 'light';
    const savedLang = localStorage.getItem('jdn-lang') || 'id';
    
    applyTheme(savedTheme);
    document.documentElement.setAttribute('lang', savedLang);
    
    // Update language toggle buttons
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = savedLang === 'id' ? 'EN' : 'ID';
    });
    
    // Mark active nav
    markActiveNav();
    
    // Hero integration for homepage
    if (document.body.classList.contains('home-page')) {
      initHeroIntegration();
    } else {
      // For non-homepage, ensure navbar is always white
      const header = document.querySelector('.site-header');
      if (header) {
        header.classList.add('scrolled');
      }
    }
    
    console.log('Components initialized');
  }
  
  // Hero integration
  function initHeroIntegration() {
    const header = document.querySelector('.site-header');
    const heroSection = document.querySelector('.hero-brand');
    
    if (header && heroSection) {
      // Initial state - transparent over hero
      header.classList.add('hero-integrated');
      header.classList.remove('scrolled');
      
      function handleHeroScroll() {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        
        // If hero section is still visible
        if (heroBottom > 0) {
          header.classList.add('hero-integrated');
          header.classList.remove('scrolled');
        } else {
          // Hero section is passed, change to white background
          header.classList.remove('hero-integrated');
          header.classList.add('scrolled');
        }
      }
      
      // Initial check
      handleHeroScroll();
      
      // Listen to scroll events
      window.addEventListener('scroll', handleHeroScroll, { passive: true });
      window.addEventListener('resize', handleHeroScroll, { passive: true });
    }
  }
  
  // Mark active navigation
  function markActiveNav() {
    const currentPath = window.location.pathname;
    
    document.querySelectorAll('.nav-center a, .mobile-panel a').forEach(link => {
      // link.pathname is the browser-resolved absolute path (works no matter
      // how the href was written), so this stays correct under any BASE.
      const linkPath = link.pathname;
      
      if (linkPath === currentPath || 
          (linkPath !== BASE_PATH && currentPath.startsWith(linkPath)) ||
          (currentPath === BASE_PATH && linkPath === BASE_PATH)) {
        link.classList.add('active');
      }
    });
  }
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
  } else {
    loadComponents();
  }
})();