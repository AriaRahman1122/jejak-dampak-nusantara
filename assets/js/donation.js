/*
  ============================================================================
  File: donation.js
  Deskripsi: Fungsi untuk halaman list campaign donasi
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// donation.js - Handle halaman list donasi
(function() {
  console.log('donation.js v1.0.0 loaded');
  
  // State
  let allCampaigns = [];
  let filteredCampaigns = [];
  let selectedCategories = [];
  let searchQuery = '';
  
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
      id: {
        'days-left': 'hari lagi',
        'select-all': 'Pilih Semua',
        'all-categories': 'Semua',
        'no-results-title': 'Campaign tidak ditemukan',
        'no-results-desc': 'Coba ubah kata kunci pencarian atau filter kategori.'
      },
      en: {
        'days-left': 'days left',
        'select-all': 'Select All',
        'all-categories': 'All',
        'no-results-title': 'No campaigns found',
        'no-results-desc': 'Try changing your search keywords or category filters.'
      }
    };
    return translations[lang]?.[key] || translations.id[key] || key;
  }
  
  // Load JSON data
  async function loadJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return await response.json();
    } catch (error) {
      console.error(`Error loading ${url}:`, error);
      return null;
    }
  }
  
  // Format rupiah
  function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
  }
  
  // Load campaigns
  async function loadCampaigns() {
    const lang = getLang();
    const campaigns = await loadJSON(`../data/campaigns-${lang}.json`);
    if (!campaigns) return;
    
    allCampaigns = campaigns;
    filteredCampaigns = [...campaigns];
    
    renderCategories();
    renderCampaigns();
    renderEndingSoon();
  }
  
  // Render category filters
  function renderCategories() {
    const categoryPanel = qs('[data-category-panel]');
    if (!categoryPanel) return;
    
    const categories = [...new Set(allCampaigns.map(c => c.category))];
    
    categoryPanel.innerHTML = `
      <label class="select-all-row">
        <input type="checkbox" id="selectAllCategories">
        <span>${t('select-all')}</span>
      </label>
      ${categories
        .map(
          (c) =>
            `<label class="check-row"><input type="checkbox" value="${escapeHtml(c)}"><span>${escapeHtml(c)}</span></label>`,
        )
        .join("")}
    `;
    
    const selectAllCheckbox = qs('#selectAllCategories', categoryPanel);
    const categoryCheckboxes = qsa('.check-row input[type="checkbox"]', categoryPanel);
    
    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', () => {
        const isChecked = selectAllCheckbox.checked;
        categoryCheckboxes.forEach(checkbox => {
          checkbox.checked = isChecked;
        });
        selectedCategories = isChecked ? categoryCheckboxes.map(cb => cb.value) : [];
        applyFilters();
      });
    }
    
    categoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        selectedCategories = qsa('.check-row input:checked', categoryPanel).map(i => i.value);
        if (selectAllCheckbox) {
          selectAllCheckbox.checked = selectedCategories.length === categoryCheckboxes.length;
        }
        applyFilters();
      });
    });
  }
  
  // Apply filters
  function applyFilters() {
    filteredCampaigns = allCampaigns.filter(campaign => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(campaign.category);
      
      const title = campaign.title;
      const excerpt = campaign.excerpt;
      const matchesSearch = !searchQuery || 
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    renderCampaigns();
  }
  
  // Render campaigns
  function renderCampaigns() {
    const campaignGrid = qs('#campaignGrid');
    const campaignCount = qs('[data-campaign-count]');
    const categoryCount = qs('[data-category-count]');
    const selectedFilters = qs('[data-selected-filters]');
    
    if (!campaignGrid) return;
    
    const lang = getLang();
    
    // Update count
    if (campaignCount) {
      campaignCount.textContent = filteredCampaigns.length;
    }
    
    // Update category count
    if (categoryCount) {
      categoryCount.textContent = selectedCategories.length === 0 
        ? t('all-categories') 
        : selectedCategories.length + ' ' + t('all-categories');
    }
    
    // Update selected filters
    if (selectedFilters) {
      selectedFilters.innerHTML = selectedCategories
        .map((c) => `<span>${escapeHtml(c)}</span>`)
        .join("");
    }
    
    // Check if no results
    if (filteredCampaigns.length === 0) {
      campaignGrid.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1;">
          <h3>${t('no-results-title')}</h3>
          <p>${t('no-results-desc')}</p>
        </div>
      `;
      return;
    }
    
    // Render campaign cards
    campaignGrid.innerHTML = filteredCampaigns
      .map((campaign) => {
        const progressPercent = Math.round((campaign.collected / campaign.target) * 100);
        
        return `<a class="campaign-card" href="../donasi/donation-detail.html?slug=${encodeURIComponent(campaign.slug)}">
          <img src="../assets/img/${escapeHtml(campaign.image)}" alt="${escapeHtml(campaign.title)}">
          <div>
            <span class="badge">${escapeHtml(campaign.category)}</span>
            <h3>${escapeHtml(campaign.title)}</h3>
            <p>${escapeHtml(campaign.excerpt)}</p>
            <div class="progress"><span style="width: ${progressPercent}%"></span></div>
            <div class="campaign-meta">
              <strong>${formatRupiah(campaign.collected)}</strong>
              <span>${lang === 'id' ? 'dari' : 'from'} ${formatRupiah(campaign.target)}</span>
            </div>
            <div class="campaign-foot">
              <span>${campaign.days} ${t('days-left')}</span>
              <span>${escapeHtml(campaign.beneficiaries)}</span>
            </div>
          </div>
        </a>`;
      })
      .join("");
  }
  
  // Render ending soon sidebar
  function renderEndingSoon() {
    const endingSoonList = qs('#endingSoonList');
    if (!endingSoonList) return;
    
    const lang = getLang();
    
    // Sort by days (smallest first = ending soonest)
    const endingSoon = [...allCampaigns]
      .sort((a, b) => a.days - b.days)
      .slice(0, 5);
    
    endingSoonList.innerHTML = endingSoon
      .map((campaign, index) => {
        const progressPercent = Math.round((campaign.collected / campaign.target) * 100);
        
        return `<a class="ending-soon-item" href="../donasi/donation-detail.html?slug=${encodeURIComponent(campaign.slug)}">
          <span class="ending-soon-rank">${index + 1}</span>
          <div class="ending-soon-content">
            <div class="ending-soon-title">${escapeHtml(campaign.title)}</div>
            <div class="ending-soon-days">⏰ ${campaign.days} ${t('days-left')}</div>
            <div class="progress" style="margin: 6px 0 0;"><span style="width: ${progressPercent}%"></span></div>
          </div>
        </a>`;
      })
      .join("");
  }
  
  // Initialize search
  function initSearch() {
    const searchInput = qs('#campaignSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim();
      applyFilters();
    });
  }
  
  // Initialize filter dropdown
  function initFilterDropdown() {
    const dropdown = qs('[data-filter-dropdown]');
    if (!dropdown) return;
    
    const filterButton = qs('.filter-button', dropdown);
    
    if (filterButton) {
      filterButton.addEventListener('click', () => {
        dropdown.classList.toggle('open');
      });
    }
    
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }
  
  // Initialize
  function init() {
    console.log('Initializing donation.js');
    loadCampaigns();
    initSearch();
    initFilterDropdown();
  }
  
  // Listen for language changes
  document.addEventListener('language-changed', loadCampaigns);
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();