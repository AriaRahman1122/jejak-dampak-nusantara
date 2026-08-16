/*
  ============================================================================
  File: donation-detail.js
  Deskripsi: Fungsi untuk halaman detail campaign donasi
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// donation-detail.js - Handle halaman detail donasi
(function() {
  console.log('donation-detail.js v1.0.0 loaded');
  
  // State
  let selectedAmount = 50000;
  let selectedPayment = 'qris';
  let campaignData = null;
  
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
  
  function t(key) {
    const lang = getLang();
    const translations = {
      id: { 'days-left': 'hari lagi' },
      en: { 'days-left': 'days left' }
    };
    return translations[lang]?.[key] || translations.id[key] || key;
  }
  async function loadJSON(url) {
    return window.JDN ? window.JDN.data(url, getLang()) : null;
  }
  
  // Format rupiah
  function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
  }
  
  // Get slug from URL
  function getSlugFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('slug');
  }
  
  // Load campaign detail
  async function loadCampaignDetail() {
    const slug = getSlugFromURL();
    
    if (!slug) {
      console.error('No slug provided');
      return;
    }
    
    const lang = getLang();
    const campaigns = await loadJSON(`/data/campaigns-${lang}.json`);
    if (!campaigns) return;
    
    const campaign = campaigns.find(c => c.slug === slug);
    if (!campaign) {
      console.error('Campaign not found:', slug);
      return;
    }
    
    campaignData = campaign;
    const progressPercent = Math.round((campaign.collected / campaign.target) * 100);
    
    // Update document title
    document.title = `${campaign.title} | Donasi JDN`;
    
    // Update campaign category
    const categoryEl = qs('#campaignCategory');
    if (categoryEl) categoryEl.textContent = campaign.category;
    
    // Update campaign title
    const titleEl = qs('#campaignTitle');
    if (titleEl) titleEl.textContent = campaign.title;
    
    // Update campaign excerpt
    const excerptEl = qs('#campaignExcerpt');
    if (excerptEl) excerptEl.textContent = campaign.excerpt;
    
    // Update campaign facts
    const factsEl = qs('#campaignFacts');
    if (factsEl) {
      factsEl.innerHTML = `
        <span>${escapeHtml(campaign.location)}</span>
        <span>${escapeHtml(campaign.beneficiaries)}</span>
        <span>${campaign.days} ${t('days-left')}</span>
      `;
    }
    
    // Update campaign image
    const imageEl = qs('#campaignImage');
    if (imageEl) {
      imageEl.src = window.JDN.url(`/assets/img/${campaign.image}`);
      imageEl.alt = campaign.title;
    }
    
    // Update progress
    const progressEl = qs('#campaignProgress');
    if (progressEl) {
      progressEl.style.width = `${progressPercent}%`;
    }
    
    // Update collected amount
    const collectedEl = qs('#campaignCollected');
    if (collectedEl) collectedEl.textContent = formatRupiah(campaign.collected);
    
    // Update target amount
    const targetEl = qs('#campaignTarget');
    if (targetEl) {
      targetEl.textContent = `${lang === 'id' ? 'dari' : 'from'} ${formatRupiah(campaign.target)}`;
    }
    
    // Update funded list
    const fundedList = qs('#fundedList');
    if (fundedList && campaign.content && campaign.content.funded) {
      fundedList.innerHTML = campaign.content.funded
        .map(item => `<li>${escapeHtml(item)}</li>`)
        .join("");
    }
    
    // Update timeline
    const timelineList = qs('#timelineList');
    if (timelineList && campaign.content && campaign.content.timeline) {
      timelineList.innerHTML = campaign.content.timeline
        .map(item => `
          <div>
            <b>${escapeHtml(item.title)}</b>
            <span>${escapeHtml(item.description)}</span>
          </div>
        `)
        .join("");
    }
    
    // Initialize form interactions
    initFormInteractions();
  }
  
  // Initialize form interactions
  function initFormInteractions() {
    // Preset buttons
    qsa('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const amount = parseInt(btn.dataset.amount);
        selectAmount(amount);
        
        // Update active state
        qsa('.preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update slider
        const slider = qs('#donationSlider');
        if (slider) slider.value = amount;
      });
    });
    
    // Slider
    const slider = qs('#donationSlider');
    if (slider) {
      slider.addEventListener('input', () => {
        const amount = parseInt(slider.value);
        selectAmount(amount);
        
        // Update preset buttons active state
        qsa('.preset-btn').forEach(btn => {
          const btnAmount = parseInt(btn.dataset.amount);
          btn.classList.toggle('active', btnAmount === amount);
        });
      });
    }
    
    // Payment methods
    qsa('.payment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedPayment = btn.dataset.method;
        
        qsa('.payment-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    
    // Submit button
    const submitBtn = qs('[data-demo-form]');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const lang = getLang();
        alert(lang === 'id' 
          ? `Terima kasih! Donasi ${formatRupiah(selectedAmount)} akan diproses.` 
          : `Thank you! Donation of ${formatRupiah(selectedAmount)} will be processed.`);
      });
    }
  }
  
  // Select amount
  function selectAmount(amount) {
    selectedAmount = amount;
    
    // Update display
    const amountDisplay = qs('#donationAmountDisplay');
    if (amountDisplay) {
      amountDisplay.textContent = formatRupiah(amount);
    }
    
    // Update submit button
    const submitAmount = qs('#submitAmount');
    if (submitAmount) {
      submitAmount.textContent = formatRupiah(amount);
    }
    
    // Update impact preview
    updateImpactPreview(amount);
  }
  
  // Update impact preview
  function updateImpactPreview(amount) {
    const impactText = qs('#impactText');
    if (!impactText || !campaignData) return;
    
    const lang = getLang();
    
    // Calculate impact based on amount
    let impactMessage = '';
    
    if (lang === 'id') {
      if (amount < 50000) {
        impactMessage = `Dengan ${formatRupiah(amount)}, Anda membantu mendukung operasional program.`;
      } else if (amount < 100000) {
        impactMessage = `Dengan ${formatRupiah(amount)}, Anda membantu menyediakan makanan bergizi untuk anak sekolah.`;
      } else if (amount < 250000) {
        impactMessage = `Dengan ${formatRupiah(amount)}, Anda membantu mendukung 1 minggu program untuk penerima manfaat.`;
      } else if (amount < 500000) {
        impactMessage = `Dengan ${formatRupiah(amount)}, Anda membantu mendukung 1 bulan program untuk penerima manfaat.`;
      } else {
        impactMessage = `Dengan ${formatRupiah(amount)}, Anda membantu mendukung program secara signifikan.`;
      }
    } else {
      if (amount < 50000) {
        impactMessage = `With ${formatRupiah(amount)}, you help support program operations.`;
      } else if (amount < 100000) {
        impactMessage = `With ${formatRupiah(amount)}, you help provide nutritious food for school children.`;
      } else if (amount < 250000) {
        impactMessage = `With ${formatRupiah(amount)}, you help support 1 week of program for beneficiaries.`;
      } else if (amount < 500000) {
        impactMessage = `With ${formatRupiah(amount)}, you help support 1 month of program for beneficiaries.`;
      } else {
        impactMessage = `With ${formatRupiah(amount)}, you help significantly support the program.`;
      }
    }
    
    impactText.textContent = impactMessage;
  }
  
  // Initialize
  function init() {
    console.log('Initializing donation-detail.js');
    loadCampaignDetail();
  }
  
  // Listen for language changes
  document.addEventListener('language-changed', loadCampaignDetail);
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();