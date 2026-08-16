/*
  ============================================================================
  File: program.js
  Deskripsi: Fungsi untuk halaman program (filter, search, modal)
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// program.js - Handle halaman program
(function() {
  console.log('program.js v1.0.0 loaded');
  
  // State
  let allPrograms = [];
  let selectedCategories = [];
  
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
        'select-all': 'Pilih Semua',
        'all-provinces': 'Semua Provinsi',
        'detail': 'Detail',
        'region': 'Wilayah',
        'beneficiaries': 'Penerima',
        'program-scope': 'Ruang lingkup program',
        'scope-1': 'Needs assessment dan validasi penerima manfaat.',
        'scope-2': 'Desain aktivitas, indikator, dan timeline implementasi.',
        'scope-3': 'Dokumentasi lapangan dan laporan dampak.',
        'consult-program': 'Konsultasikan Program',
        'no-results-title': 'Program tidak ditemukan',
        'no-results-desc': 'Coba ubah kategori, provinsi, atau kata kunci pencarian.'
      },
      en: {
        'select-all': 'Select All',
        'all-provinces': 'All Provinces',
        'detail': 'Detail',
        'region': 'Region',
        'beneficiaries': 'Beneficiaries',
        'program-scope': 'Program scope',
        'scope-1': 'Needs assessment and beneficiary validation.',
        'scope-2': 'Activity design, indicators, and implementation timeline.',
        'scope-3': 'Field documentation and impact reports.',
        'consult-program': 'Consult Program',
        'no-results-title': 'Program not found',
        'no-results-desc': 'Try changing categories, provinces, or search keywords.'
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
  
  // Load programs data berdasarkan bahasa
  async function loadPrograms() {
    const lang = getLang();
    const programs = await loadJSON(`../data/programs-${lang}.json`);
    const categories = await loadJSON(`../data/categories-${lang}.json`);
    
    if (!programs || !categories) return;
    
    allPrograms = programs;
    
    renderCategories(categories);
    renderProvinces();
    renderPrograms();
  }
  
  // Render category filters
  function renderCategories(categories) {
    const categoryPanel = qs('[data-category-panel]');
    if (!categoryPanel) return;
    
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
        renderPrograms();
      });
    }
    
    categoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        selectedCategories = qsa('.check-row input:checked', categoryPanel).map(i => i.value);
        if (selectAllCheckbox) {
          selectAllCheckbox.checked = selectedCategories.length === categoryCheckboxes.length;
        }
        renderPrograms();
      });
    });
  }
  
  // Render provinces
  function renderProvinces() {
    const provinceFilter = qs('#provinceFilter');
    if (!provinceFilter) return;
    
    const provinces = [...new Set(allPrograms.map(p => p.province))].sort();
    
    provinceFilter.innerHTML = `
      <option value="all">${t('all-provinces')}</option>
      ${provinces.map(p => `<option value="${escapeHtml(p)}">${escapeHtml(p)}</option>`).join("")}
    `;
    
    provinceFilter.addEventListener('change', renderPrograms);
  }
  
  // Render programs
  function renderPrograms() {
    const programGrid = qs('#programGrid');
    const programCount = qs('[data-program-count]');
    const categoryCount = qs('[data-category-count]');
    const selectedFilters = qs('[data-selected-filters]');
    
    if (!programGrid) return;
    
    const searchInput = qs('#programSearch');
    const provinceFilter = qs('#provinceFilter');
    
    const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
    const provinceValue = provinceFilter ? provinceFilter.value : 'all';
    
    const filteredPrograms = allPrograms.filter(p => {
      const text = `${p.title} ${p.summary} ${p.cat} ${p.sdg} ${p.province} ${p.city}`.toLowerCase();
      
      const matchesSearch = !searchValue || text.includes(searchValue);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.cat);
      const matchesProvince = provinceValue === 'all' || p.province === provinceValue;
      
      return matchesSearch && matchesCategory && matchesProvince;
    });
    
    if (programCount) {
      programCount.textContent = filteredPrograms.length;
    }
    
    if (categoryCount) {
      categoryCount.textContent = selectedCategories.length === 0 
        ? t('all') 
        : selectedCategories.length;
    }
    
    if (selectedFilters) {
      selectedFilters.innerHTML = selectedCategories
        .map(c => `<span>${escapeHtml(c)}</span>`)
        .join("");
    }
    
    if (filteredPrograms.length === 0) {
      programGrid.innerHTML = `
        <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--soft); border-radius: 20px;">
          <h3>${t('no-results-title')}</h3>
          <p>${t('no-results-desc')}</p>
        </div>
      `;
      return;
    }
    
    programGrid.innerHTML = filteredPrograms
      .map(p => `
        <article class="program-card" data-id="${escapeHtml(p.id)}">
          <div class="meta">
            <span class="tag">${escapeHtml(p.cat)}</span>
            <span class="tag">${escapeHtml(p.sdg)}</span>
            <span class="tag">${escapeHtml(p.province)}</span>
          </div>
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.summary)}</p>
          <div class="program-bottom">
            <strong>${escapeHtml(p.budget)}</strong>
            <button class="btn btn-outline" type="button">${t('detail')}</button>
          </div>
        </article>
      `)
      .join("");
    
    qsa('.program-card', programGrid).forEach(card => {
      card.addEventListener('click', () => openProgram(card.dataset.id));
    });
  }
  
  // Open program modal
  function openProgram(id) {
    const p = allPrograms.find(x => x.id === id);
    if (!p) return;
    
    const modalContent = qs('#programModalContent');
    if (!modalContent) return;
    
    modalContent.innerHTML = `
      <span class="badge">${escapeHtml(p.cat)}</span>
      <h2>${escapeHtml(p.title)}</h2>
      <p>${escapeHtml(p.summary)}</p>
      <div class="trust-grid" style="grid-template-columns:repeat(2,1fr);margin:18px 0">
        <div class="mini-card">
          <b>${t('region')}</b>
          <h3>${escapeHtml(p.city)}</h3>
          <p>${escapeHtml(p.province)}</p>
        </div>
        <div class="mini-card">
          <b>${t('beneficiaries')}</b>
          <h3>${escapeHtml(p.beneficiaries)}</h3>
          <p>${escapeHtml(p.budget)}</p>
        </div>
      </div>
      <h3>${t('program-scope')}</h3>
      <ul>
        <li>${t('scope-1')}</li>
        <li>${t('scope-2')}</li>
        <li>${t('scope-3')}</li>
      </ul>
      <a class="btn" href="../kemitraan/#form-kemitraan">${t('consult-program')}</a>
    `;
    
    const modal = qs('#programModal');
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    }
  }
  
  // Initialize search
  function initSearch() {
    const searchInput = qs('#programSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', renderPrograms);
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
  
  // Initialize modal close
  function initModalClose() {
    qsa('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = qs('#programModal');
        if (modal) {
          modal.classList.remove('open');
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    });
  }
  
  // Update content when language changes
  function updateContent() {
    loadPrograms();
  }
  
  // Initialize
  function init() {
    console.log('Initializing program.js');
    loadPrograms();
    initSearch();
    initFilterDropdown();
    initModalClose();
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