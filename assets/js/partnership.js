/*
  ============================================================================
  File: partnership.js
  Deskripsi: Fungsi untuk halaman kemitraan
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// partnership.js - Handle halaman kemitraan
(function() {
  console.log('partnership.js v1.0.0 loaded');
  
  // Helper functions
  function qs(s, r = document) {
    return r.querySelector(s);
  }
  
  function qsa(s, r = document) {
    return [...r.querySelectorAll(s)];
  }
  
  function escapeHtml(s) {
    return String(s || "").replace(
      /[&<>'"]/g,
      (m) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[m]
    );
  }
  
  function getLang() {
    return localStorage.getItem('jdn-lang') || 'id';
  }
  
  async function loadJSON(url) {
    return window.JDN ? window.JDN.data(url, getLang()) : null;
  }
  
  // Initialize reveal animations
  function initReveal() {
    const items = qsa(".reveal");
    if (!items.length) return;
    
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    
    items.forEach((i) => io.observe(i));
    
    // Fallback: Tampilkan semua jika observer tidak bekerja
    setTimeout(() => {
      items.forEach((i) => {
        const rect = i.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          i.classList.add("in-view");
        }
      });
    }, 1000);
  }
  
  // Load brands
  async function loadBrands() {
    const brandTrack = qs('#brandTrack1');
    if (!brandTrack) return;
    
    const brands = await loadJSON('brands');
    if (!brands || !brands.length) return;
    
    const brandHTML = brands
      .map((brand) => `<img src="${escapeHtml(brand.logo)}" alt="${escapeHtml(brand.name)}">`)
      .join("");
    
    brandTrack.innerHTML = brandHTML + brandHTML;
  }
  
  // Load CSR process
  async function loadCSRProcess() {
    const processGrid = qs('#csrProcessGrid');
    if (!processGrid) return;
    
    const processes = await loadJSON('csr-process');
    if (!processes || !processes.length) return;
    
    processGrid.innerHTML = processes
      .map((process) => `
        <article class="process-card">
          <b>${escapeHtml(process.number)}</b>
          <h3>${escapeHtml(process.title)}</h3>
          <p>${escapeHtml(process.description)}</p>
        </article>
      `)
      .join("");
  }
  
  // Load Crowdfunding process
  async function loadCrowdfundingProcess() {
    const processGrid = qs('#crowdfundingProcessGrid');
    if (!processGrid) return;
    
    const processes = await loadJSON('crowdfunding-process');
    if (!processes || !processes.length) return;
    
    processGrid.innerHTML = processes
      .map((process) => `
        <article class="process-card">
          <b>${escapeHtml(process.number)}</b>
          <h3>${escapeHtml(process.title)}</h3>
          <p>${escapeHtml(process.description)}</p>
        </article>
      `)
      .join("");
  }
  
  // Load Why JDN
  async function loadWhyJDN() {
    const whyGrid = qs('#whyGrid');
    if (!whyGrid) return;
    
    const items = await loadJSON('why-jdn');
    if (!items || !items.length) return;
    
    whyGrid.innerHTML = items
      .map((item) => `
        <article class="why-card reveal in-view">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
        </article>
      `)
      .join("");
  }
  
  // Load Testimonials - DIAKTIFKAN KEMBALI
  async function loadTestimonials() {
    const track1 = qs('#testimonialTrack1');
    const track2 = qs('#testimonialTrack2');
    
    if (!track1 || !track2) {
      console.warn('Testimonial tracks not found');
      return;
    }
    
    const data = await loadJSON('testimonials');
    if (!data) {
      console.warn('No testimonials data found');
      return;
    }
    
    console.log('Testimonials data loaded:', data);
    
    // Load column 1
    if (data.column1 && data.column1.length) {
      const itemsHTML = data.column1
        .map((item) => `
          <article class="testimonial-card">
            <p>"${escapeHtml(item.quote)}"</p>
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.role)}</span>
          </article>
        `)
        .join("");
      
      track1.innerHTML = itemsHTML + itemsHTML; // Duplicate for seamless loop
      console.log('Column 1 loaded:', data.column1.length);
    }
    
    // Load column 2
    if (data.column2 && data.column2.length) {
      const itemsHTML = data.column2
        .map((item) => `
          <article class="testimonial-card">
            <p>"${escapeHtml(item.quote)}"</p>
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.role)}</span>
          </article>
        `)
        .join("");
      
      track2.innerHTML = itemsHTML + itemsHTML; // Duplicate for seamless loop
      console.log('Column 2 loaded:', data.column2.length);
    }
  }
  
  // Initialize form
  function initForm() {
    qsa('[data-demo-form]').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const lang = getLang();
        alert(lang === 'id' ? 'Terima kasih. Form ini siap disambungkan ke backend.' : 'Thank you. This form is ready to be connected to the backend.');
      });
    });
  }
  
  // Update content when language changes
  function updateContent() {
    loadCSRProcess();
    loadCrowdfundingProcess();
    loadWhyJDN();
    loadTestimonials();
  }
  
  // Initialize
  function init() {
    console.log('Initializing partnership.js');
    initReveal();
    loadBrands();
    loadCSRProcess();
    loadCrowdfundingProcess();
    loadWhyJDN();
    loadTestimonials(); // Sekarang dipanggil
    initForm();
  }
  
  // Listen for language changes
  document.addEventListener('language-changed', updateContent);
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();