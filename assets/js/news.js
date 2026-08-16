/*
  ============================================================================
  File: news.js
  Deskripsi: Fungsi untuk halaman berita (load data, filter, search, sidebar)
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// news.js - Handle halaman berita
(function() {
  console.log('news.js v1.0.0 loaded');
  
  // State
  let allNews = [];
  let filteredNews = [];
  let selectedCategories = [];
  let searchQuery = '';
  let displayedCount = 6;
  const itemsPerPage = 6;
  
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
        'all-categories': 'Semua',
        'reads': 'dibaca',
        'load-more': 'Muat Lebih Banyak',
        'no-results-title': 'Berita tidak ditemukan',
        'no-results-desc': 'Coba ubah kata kunci pencarian atau filter kategori.'
      },
      en: {
        'select-all': 'Select All',
        'all-categories': 'All',
        'reads': 'reads',
        'load-more': 'Load More',
        'no-results-title': 'No news found',
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
  
  // Load news data berdasarkan bahasa
  async function loadNews() {
    const lang = getLang();
    const news = await loadJSON(`../data/news-${lang}.json`);
    if (!news) return;
    
    allNews = news;
    filteredNews = [...allNews];
    
    renderCategories();
    renderNewsGrid();
    renderPopularNews();
  }
  
  // Render category filters
  function renderCategories() {
    const categoryPanel = qs('[data-category-panel]');
    if (!categoryPanel) return;
    
    const categories = [...new Set(allNews.map(n => n.category))];
    
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
    filteredNews = allNews.filter(news => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(news.category);
      
      const title = news.title;
      const excerpt = news.excerpt;
      const matchesSearch = !searchQuery || 
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    displayedCount = itemsPerPage;
    renderNewsGrid();
  }
  
  // Render news grid
  function renderNewsGrid() {
    const newsGrid = qs('#newsGrid');
    const loadMoreContainer = qs('#loadMoreContainer');
    const newsCount = qs('[data-news-count]');
    const categoryCount = qs('[data-category-count]');
    const selectedFilters = qs('[data-selected-filters]');
    const loadMoreBtn = qs('#loadMoreBtn');
    
    if (!newsGrid) return;
    
    const newsToShow = filteredNews.slice(0, displayedCount);
    
    // Update count
    if (newsCount) {
      newsCount.textContent = filteredNews.length;
    }
    
    // Update category count
    if (categoryCount) {
      categoryCount.textContent = selectedCategories.length === 0 
        ? t('all-categories') 
        : selectedCategories.length;
    }
    
    // Update load more button text
    if (loadMoreBtn) {
      loadMoreBtn.textContent = t('load-more');
    }
    
    // Update selected filters
    if (selectedFilters) {
      selectedFilters.innerHTML = selectedCategories
        .map((c) => `<span>${escapeHtml(c)}</span>`)
        .join("");
    }
    
    // Check if no results
    if (newsToShow.length === 0) {
      newsGrid.innerHTML = `
        <div class="no-results">
          <h3>${t('no-results-title')}</h3>
          <p>${t('no-results-desc')}</p>
        </div>
      `;
      
      if (loadMoreContainer) loadMoreContainer.style.display = 'none';
      return;
    }
    
    // Render news cards
    newsGrid.innerHTML = newsToShow
      .map((news) => `
        <a class="news-card" href="../berita/detail.html?slug=${encodeURIComponent(news.slug)}">
          <img src="../assets/img/${escapeHtml(news.image)}" alt="${escapeHtml(news.title)}">
          <div class="news-card-body">
            <div class="news-card-meta">
              <span class="news-card-category">${escapeHtml(news.category)}</span>
              <span class="news-card-views">👁 ${news.views.toLocaleString('id-ID')} ${t('reads')}</span>
            </div>
            <h3>${escapeHtml(news.title)}</h3>
            <p>${escapeHtml(news.excerpt)}</p>
          </div>
        </a>
      `)
      .join("");
    
    // Show/hide load more button
    if (loadMoreContainer) {
      if (filteredNews.length > displayedCount) {
        loadMoreContainer.style.display = 'block';
      } else {
        loadMoreContainer.style.display = 'none';
      }
    }
  }
  
  // Render popular news sidebar
  function renderPopularNews() {
    const popularList = qs('#popularNewsList');
    if (!popularList) return;
    
    // Sort by views (most popular first)
    const popularNews = [...allNews]
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
    
    popularList.innerHTML = popularNews
      .map((news, index) => `
        <a class="popular-news-item" href="../berita/detail.html?slug=${encodeURIComponent(news.slug)}">
          <span class="popular-news-rank">${index + 1}</span>
          <div class="popular-news-content">
            <div class="popular-news-title">${escapeHtml(news.title)}</div>
            <div class="popular-news-views">${news.views.toLocaleString('id-ID')} ${t('reads')}</div>
          </div>
        </a>
      `)
      .join("");
  }
  
  // Initialize search
  function initSearch() {
    const searchInput = qs('#newsSearch');
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
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }
  
  // Initialize load more
  function initLoadMore() {
    const loadMoreBtn = qs('#loadMoreBtn');
    if (!loadMoreBtn) return;
    
    loadMoreBtn.addEventListener('click', () => {
      displayedCount += itemsPerPage;
      renderNewsGrid();
    });
  }
  
  // Initialize
  function init() {
    console.log('Initializing news.js');
    loadNews();
    initSearch();
    initFilterDropdown();
    initLoadMore();
  }
  
  // Listen for language changes
  document.addEventListener('language-changed', () => {
    // Reload news data with new language
    loadNews();
  });
  
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();