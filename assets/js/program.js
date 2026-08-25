/*
  ============================================================================
  File: program.js
  Deskripsi: Fungsi untuk halaman program (filter, pencarian, dan modal)
  Author: Aria Rahman
  Versi: 1.1.0
  ============================================================================
*/

(function () {
  "use strict";

  console.log("program.js v1.1.0 loaded");

  let allPrograms = [];
  let selectedCategories = [];
  let selectedProvince = "all";
  let lastFocusedElement = null;

  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return [...root.querySelectorAll(selector)];
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(
      /[&<>'"]/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[character],
    );
  }

  function getLang() {
    return (
      localStorage.getItem("jdn-lang") ||
      document.documentElement.getAttribute("lang") ||
      "id"
    );
  }

  function t(key) {
    const translations = {
      id: {
        all: "Semua",
        "select-all": "Pilih Semua",
        category: "Kategori",
        province: "Provinsi",
        "all-provinces": "Semua Provinsi",
        detail: "Detail",
        region: "Wilayah",
        beneficiaries: "Penerima",
        "program-scope": "Ruang lingkup program",
        "scope-1": "Asesmen kebutuhan dan validasi penerima manfaat.",
        "scope-2": "Desain aktivitas, indikator, dan jadwal implementasi.",
        "scope-3": "Dokumentasi lapangan dan laporan dampak.",
        "consult-program": "Konsultasikan Program",
        "no-results-title": "Program tidak ditemukan",
        "no-results-desc":
          "Coba ubah kategori, provinsi, atau kata kunci pencarian.",
        "close-modal": "Tutup detail program",
      },
      en: {
        all: "All",
        "select-all": "Select All",
        category: "Category",
        province: "Province",
        "all-provinces": "All Provinces",
        detail: "Details",
        region: "Region",
        beneficiaries: "Beneficiaries",
        "program-scope": "Program scope",
        "scope-1": "Needs assessment and beneficiary validation.",
        "scope-2": "Activity design, indicators, and implementation timeline.",
        "scope-3": "Field documentation and impact reports.",
        "consult-program": "Discuss This Program",
        "no-results-title": "No programs found",
        "no-results-desc":
          "Try changing the category, province, or search keywords.",
        "close-modal": "Close program details",
      },
    };

    const lang = getLang();

    return translations[lang]?.[key] ?? translations.id[key] ?? key;
  }

  async function loadJSON(url) {
    return window.JDN ? window.JDN.data(url, getLang()) : null;
  }

  async function loadPrograms() {
    const lang = getLang();

    const [programs, categories] = await Promise.all([
      loadJSON(`/data/programs-${lang}.json`),
      loadJSON(`/data/categories-${lang}.json`),
    ]);

    if (!Array.isArray(programs) || !Array.isArray(categories)) {
      console.error("Data program atau kategori tidak tersedia.");
      return;
    }

    allPrograms = programs;
    selectedCategories = [];
    selectedProvince = "all";

    syncStaticLabels();
    renderCategories(categories);
    renderProvinces();
    renderPrograms();
  }

  function syncStaticLabels() {
    const categoryLabel = qs("[data-category-label]");
    const provinceLabel = qs("[data-province-label]");
    const closeModalButton = qs(".modal-close");

    if (categoryLabel) {
      categoryLabel.textContent = t("category");
    }

    if (provinceLabel) {
      provinceLabel.textContent = t("province");
    }

    if (closeModalButton) {
      closeModalButton.setAttribute("aria-label", t("close-modal"));
    }
  }

  function renderCategories(categories) {
    const categoryPanel = qs("[data-category-panel]");

    if (!categoryPanel) {
      return;
    }

    categoryPanel.innerHTML = `
      <label class="select-all-row">
        <input type="checkbox" data-select-all-categories>
        <span>${escapeHtml(t("select-all"))}</span>
      </label>

      ${categories
        .map(
          (category) => `
            <label class="check-row">
              <input
                type="checkbox"
                value="${escapeHtml(category)}"
                ${selectedCategories.includes(category) ? "checked" : ""}
              >
              <span>${escapeHtml(category)}</span>
            </label>
          `,
        )
        .join("")}
    `;

    const selectAllCheckbox = qs(
      "[data-select-all-categories]",
      categoryPanel,
    );

    const categoryCheckboxes = qsa(
      '.check-row input[type="checkbox"]',
      categoryPanel,
    );

    if (selectAllCheckbox) {
      selectAllCheckbox.checked =
        categoryCheckboxes.length > 0 &&
        selectedCategories.length === categoryCheckboxes.length;

      selectAllCheckbox.addEventListener("change", () => {
        const isChecked = selectAllCheckbox.checked;

        categoryCheckboxes.forEach((checkbox) => {
          checkbox.checked = isChecked;
        });

        selectedCategories = isChecked
          ? categoryCheckboxes.map((checkbox) => checkbox.value)
          : [];

        renderPrograms();
      });
    }

    categoryCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        selectedCategories = qsa(
          '.check-row input[type="checkbox"]:checked',
          categoryPanel,
        ).map((input) => input.value);

        if (selectAllCheckbox) {
          selectAllCheckbox.checked =
            selectedCategories.length === categoryCheckboxes.length;

          selectAllCheckbox.indeterminate =
            selectedCategories.length > 0 &&
            selectedCategories.length < categoryCheckboxes.length;
        }

        renderPrograms();
      });
    });
  }

  function renderProvinces() {
    const provincePanel = qs("[data-province-panel]");

    if (!provincePanel) {
      return;
    }

    const provinces = [
      ...new Set(allPrograms.map((program) => program.province)),
    ]
      .filter(Boolean)
      .sort((firstProvince, secondProvince) =>
        firstProvince.localeCompare(secondProvince, getLang()),
      );

    const provinceOptions = [
      {
        value: "all",
        label: t("all-provinces"),
      },
      ...provinces.map((province) => ({
        value: province,
        label: province,
      })),
    ];

    provincePanel.innerHTML = provinceOptions
      .map(
        ({ value, label }) => `
          <label
            class="province-option${
              selectedProvince === value ? " active" : ""
            }"
          >
            <input
              type="radio"
              name="province-filter"
              value="${escapeHtml(value)}"
              ${selectedProvince === value ? "checked" : ""}
            >

            <span
              class="province-radio-mark"
              aria-hidden="true"
            ></span>

            <span class="province-option-label">
              ${escapeHtml(label)}
            </span>
          </label>
        `,
      )
      .join("");

    qsa('input[name="province-filter"]', provincePanel).forEach((input) => {
      input.addEventListener("change", () => {
        selectedProvince = input.value;

        renderProvinces();
        renderPrograms();
        closeDropdown(qs("[data-province-dropdown]"));
      });
    });
  }

  function renderPrograms() {
    const programGrid = qs("#programGrid");
    const programCount = qs("[data-program-count]");
    const categoryCount = qs("[data-category-count]");
    const provinceValueLabel = qs("[data-province-value]");
    const selectedFilters = qs("[data-selected-filters]");
    const searchInput = qs("#programSearch");

    if (!programGrid) {
      return;
    }

    const searchValue =
      searchInput?.value.trim().toLocaleLowerCase(getLang()) ?? "";

    const filteredPrograms = allPrograms.filter((program) => {
      const searchableText = [
        program.title,
        program.summary,
        program.cat,
        program.sdg,
        program.province,
        program.city,
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase(getLang());

      const matchesSearch =
        searchValue.length === 0 || searchableText.includes(searchValue);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(program.cat);

      const matchesProvince =
        selectedProvince === "all" ||
        program.province === selectedProvince;

      return matchesSearch && matchesCategory && matchesProvince;
    });

    if (programCount) {
      programCount.textContent = filteredPrograms.length;
    }

    if (categoryCount) {
      categoryCount.textContent =
        selectedCategories.length === 0
          ? t("all")
          : String(selectedCategories.length);
    }

    if (provinceValueLabel) {
      provinceValueLabel.textContent =
        selectedProvince === "all"
          ? t("all")
          : selectedProvince;
    }

    if (selectedFilters) {
      const activeFilters = [...selectedCategories];

      if (selectedProvince !== "all") {
        activeFilters.push(selectedProvince);
      }

      selectedFilters.innerHTML = activeFilters
        .map((filter) => `<span>${escapeHtml(filter)}</span>`)
        .join("");
    }

    if (filteredPrograms.length === 0) {
      programGrid.innerHTML = `
        <div class="no-results">
          <h3>${escapeHtml(t("no-results-title"))}</h3>
          <p>${escapeHtml(t("no-results-desc"))}</p>
        </div>
      `;

      return;
    }

    programGrid.innerHTML = filteredPrograms
      .map(
        (program) => `
          <article
            class="program-card"
            data-id="${escapeHtml(program.id)}"
            tabindex="0"
            role="button"
            aria-label="${escapeHtml(
              `${t("detail")}: ${program.title}`,
            )}"
          >
            <div class="meta">
              <span class="tag">
                ${escapeHtml(program.cat)}
              </span>

              <span class="tag">
                ${escapeHtml(program.sdg)}
              </span>

              <span class="tag">
                ${escapeHtml(program.province)}
              </span>
            </div>

            <h3>${escapeHtml(program.title)}</h3>

            <p>${escapeHtml(program.summary)}</p>

            <div class="program-bottom">
              <strong>${escapeHtml(program.budget)}</strong>

              <span
                class="btn btn-outline"
                aria-hidden="true"
              >
                ${escapeHtml(t("detail"))}
              </span>
            </div>
          </article>
        `,
      )
      .join("");

    qsa(".program-card", programGrid).forEach((card) => {
      card.addEventListener("click", () => {
        openProgram(card.dataset.id);
      });

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openProgram(card.dataset.id);
        }
      });
    });
  }

  function openProgram(id) {
    const program = allPrograms.find((item) => item.id === id);
    const modal = qs("#programModal");
    const modalContent = qs("#programModalContent");
    const modalCard = modal
      ? qs(".modal-card", modal)
      : null;

    if (!program || !modal || !modalContent || !modalCard) {
      return;
    }

    modalContent.innerHTML = `
      <span class="badge">
        ${escapeHtml(program.cat)}
      </span>

      <h2 id="programModalTitle">
        ${escapeHtml(program.title)}
      </h2>

      <p>${escapeHtml(program.summary)}</p>

      <div class="trust-grid program-modal-grid">
        <div class="mini-card">
          <b>${escapeHtml(t("region"))}</b>
          <h3>${escapeHtml(program.city)}</h3>
          <p>${escapeHtml(program.province)}</p>
        </div>

        <div class="mini-card">
          <b>${escapeHtml(t("beneficiaries"))}</b>
          <h3>${escapeHtml(program.beneficiaries)}</h3>
          <p>${escapeHtml(program.budget)}</p>
        </div>
      </div>

      <h3>${escapeHtml(t("program-scope"))}</h3>

      <ul>
        <li>${escapeHtml(t("scope-1"))}</li>
        <li>${escapeHtml(t("scope-2"))}</li>
        <li>${escapeHtml(t("scope-3"))}</li>
      </ul>

      <a
        class="btn"
        href="${window.JDN.url("/kemitraan/#form-kemitraan")}"
      >
        ${escapeHtml(t("consult-program"))}
      </a>
    `;

    lastFocusedElement = document.activeElement;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    modalCard.setAttribute("tabindex", "-1");
    modalCard.focus();
  }

  function closeModal() {
    const modal = qs("#programModal");

    if (!modal?.classList.contains("open")) {
      return;
    }

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  }

  function closeDropdown(dropdown) {
    if (!dropdown) {
      return;
    }

    dropdown.classList.remove("open");

    const button = qs(".filter-button", dropdown);

    if (button) {
      button.setAttribute("aria-expanded", "false");
    }
  }

  function closeAllDropdowns(exception = null) {
    qsa(".filter-dropdown").forEach((dropdown) => {
      if (dropdown !== exception) {
        closeDropdown(dropdown);
      }
    });
  }

  function initSearch() {
    const searchInput = qs("#programSearch");

    if (!searchInput) {
      return;
    }

    searchInput.addEventListener("input", renderPrograms);
  }

  function initFilterDropdowns() {
    qsa(".filter-dropdown").forEach((dropdown) => {
      const button = qs(".filter-button", dropdown);

      if (!button) {
        return;
      }

      button.addEventListener("click", (event) => {
        event.stopPropagation();

        const shouldOpen =
          !dropdown.classList.contains("open");

        closeAllDropdowns(dropdown);

        dropdown.classList.toggle("open", shouldOpen);
        button.setAttribute(
          "aria-expanded",
          String(shouldOpen),
        );
      });

      const panel = qs(".filter-panel", dropdown);

      if (panel) {
        panel.addEventListener("click", (event) => {
          event.stopPropagation();
        });
      }
    });

    document.addEventListener("click", () => {
      closeAllDropdowns();
    });
  }

  function initModal() {
    qsa("[data-close-modal]").forEach((element) => {
      element.addEventListener("click", closeModal);
    });
  }

  function handleGlobalKeydown(event) {
    if (event.key !== "Escape") {
      return;
    }

    if (qs("#programModal")?.classList.contains("open")) {
      closeModal();
      return;
    }

    closeAllDropdowns();
  }

  function updateContent() {
    closeAllDropdowns();
    closeModal();
    loadPrograms();
  }

  function init() {
    console.log("Initializing program.js");

    initSearch();
    initFilterDropdowns();
    initModal();

    document.addEventListener(
      "keydown",
      handleGlobalKeydown,
    );

    loadPrograms();
  }

  document.addEventListener(
    "language-changed",
    updateContent,
  );

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true },
    );
  } else {
    init();
  }
})();