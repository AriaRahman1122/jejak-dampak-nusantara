/*
  ============================================================================
  File: news-detail.js
  Deskripsi: Fungsi untuk halaman detail berita
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// news-detail.js - Handle halaman detail berita
(function() {
  console.log('news-detail.js v1.0.0 loaded');
  
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
        'reads': 'dibaca',
        'read-time': '4 menit baca',
        'related-news': 'Berita Terkait',
        'no-related': 'Tidak ada berita terkait.'
      },
      en: {
        'reads': 'reads',
        'read-time': '4 min read',
        'related-news': 'Related News',
        'no-related': 'No related news.'
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
  
  // Get slug from URL
  function getSlugFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('slug');
  }
  
  // Load article detail
  async function loadArticleDetail() {
    const slug = getSlugFromURL();
    
    if (!slug) {
      console.error('No slug provided');
      return;
    }
    
    const lang = getLang();
    const news = await loadJSON(`/data/news-${lang}.json`);
    if (!news) return;
    
    const article = news.find(n => n.slug === slug);
    if (!article) {
      console.error('Article not found:', slug);
      return;
    }
    
    // Update document title
    document.title = `${article.title} | Jejak Dampak Nusantara`;
    
    // Update article title
    const titleEl = qs('#articleTitle');
    if (titleEl) titleEl.textContent = article.title;
    
    // Update article excerpt
    const excerptEl = qs('#articleExcerpt');
    if (excerptEl) excerptEl.textContent = article.excerpt;
    
    // Update article category
    const categoryEl = qs('#articleCategory');
    if (categoryEl) categoryEl.textContent = article.category;
    
    // Update article date
    const dateEl = qs('#articleDate');
    if (dateEl) dateEl.textContent = article.date;
    
    // Update article views
    const viewsEl = qs('#articleViews');
    if (viewsEl) viewsEl.textContent = article.views.toLocaleString('id-ID');
    
    // Update article image
    const imageEl = qs('#articleImage');
    if (imageEl) {
      imageEl.src = `/assets/img/${article.image}`;
      imageEl.alt = article.title;
    }
    
    // Build article content HTML
    const contentHTML = article.content
      .map((paragraph, index) => {
        // Insert highlight after middle paragraph
        if (index === Math.floor(article.content.length / 2) && article.highlight) {
          return `<p>${escapeHtml(paragraph)}</p><div class="quote-box">${escapeHtml(article.highlight)}</div>`;
        }
        return `<p>${escapeHtml(paragraph)}</p>`;
      })
      .join("");
    
    const bodyEl = qs('#articleBody');
    if (bodyEl) {
      bodyEl.innerHTML = `<div class="article-body-text">${contentHTML}</div>`;
    }
    
    // Load related news
    loadRelatedNews(article.slug, article.category);
    
    // Setup share buttons
    setupShareButtons(article.title, slug);
  }
  
  // Load related news
  async function loadRelatedNews(currentSlug, currentCategory) {
    const relatedList = qs('#relatedNewsList');
    if (!relatedList) return;
    
    const lang = getLang();
    const news = await loadJSON(`/data/news-${lang}.json`);
    if (!news) return;
    
    // Filter related news by same category first
    const sameCategory = news.filter(n => n.slug !== currentSlug && n.category === currentCategory);
    const otherNews = news.filter(n => n.slug !== currentSlug && n.category !== currentCategory);
    const relatedNews = [...sameCategory, ...otherNews].slice(0, 5);
    
    if (relatedNews.length === 0) {
      relatedList.innerHTML = `<p style="color: var(--muted);">${t('no-related')}</p>`;
      return;
    }
    
    relatedList.innerHTML = relatedNews
      .map((news) => `
        <a class="related-news-item" href="/berita/detail.html?slug=${encodeURIComponent(news.slug)}">
          <div class="related-news-thumb">
            <img src="/assets/img/${escapeHtml(news.image)}" alt="${escapeHtml(news.title)}">
          </div>
          <div class="related-news-content">
            <span class="related-news-category">${escapeHtml(news.category)}</span>
            <div class="related-news-title">${escapeHtml(news.title)}</div>
          </div>
        </a>
      `)
      .join("");
  }
  
  // Setup share buttons
  function setupShareButtons(title, slug) {
    const currentUrl = window.location.href;
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);
    
    const facebookBtn = qs('#shareFacebook');
    if (facebookBtn) {
      facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    }
    
    const twitterBtn = qs('#shareTwitter');
    if (twitterBtn) {
      twitterBtn.href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    }
    
    const whatsappBtn = qs('#shareWhatsApp');
    if (whatsappBtn) {
      whatsappBtn.href = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
    }
  }
  
  // Update content when language changes
  function updateContent() {
    loadArticleDetail();
  }
  
  // Initialize
  function init() {
    console.log('Initializing news-detail.js');
    loadArticleDetail();
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