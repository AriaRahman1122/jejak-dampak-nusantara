/*
  ============================================================================
  File: about.js
  Deskripsi: Translation untuk halaman tentang
  Author: Aria Rahman
  Versi: 1.0.0
  ============================================================================
*/

// translations/about.js - Translation untuk halaman tentang
(function() {
  console.log('about translations loaded');
  
  const translations = {
    id: {
      'hero-eyebrow': 'Tentang Yayasan',
      'hero-title': 'Jejak Dampak Nusantara',
      'hero-desc': 'Lembaga sosial yang menjadi jembatan antara donatur, perusahaan, dan masyarakat untuk memajukan pendidikan, kesehatan, dan keberlanjutan di seluruh Indonesia.',
      'intro-eyebrow': 'Apa itu JDN?',
      'intro-title': 'Bukan sekadar charity, tetapi ekosistem dampak yang berkelanjutan.',
      'intro-desc-1': 'Yayasan Jejak Dampak Nusantara adalah lembaga non-profit berbasis di Indonesia yang hadir sebagai katalisator dampak dan penghubung strategis antara donatur publik, korporasi, dan masyarakat penerima manfaat.',
      'intro-desc-2': 'JDN fokus pada pengembangan program di sektor pendidikan, kesehatan, dan keberlanjutan dengan pendekatan yang terukur, terdokumentasi, dan dapat dikembangkan lintas wilayah.',
      'highlight-label': 'Jejak yang nyata',
      'highlight-title': 'Setiap aksi kecil harus meninggalkan dampak yang bisa dibuktikan.',
      'highlight-desc': 'Kami menggabungkan social mapping, desain program, implementasi lapangan, monitoring, evaluasi, dan pelaporan dampak dalam satu alur kerja yang rapi.',
      'vision-eyebrow': 'Visi & Misi',
      'vision-title': 'Arah kerja JDN dibangun untuk dampak yang inklusif dan terukur.',
      'vision-label': 'Visi',
      'vision-text': 'Menjadi katalisator dampak terdepan di Indonesia.',
      'vision-desc': 'Menggerakkan kolaborasi multi-sektor untuk pertumbuhan pendidikan dan kesehatan yang inklusif, terukur, dan berkelanjutan.',
      'mission-label': 'Misi',
      'mission-1': 'Menjadi mitra strategis korporasi dalam merancang dan mengeksekusi program CSR yang berdampak nyata dan terdokumentasi profesional.',
      'mission-2': 'Mendorong kolaborasi multi-pihak untuk akselerasi pencapaian Tujuan Pembangunan Berkelanjutan atau SDGs Indonesia.',
      'mission-3': 'Memperluas dampak di seluruh wilayah Indonesia sebagai bentuk kontribusi menuju Indonesia Emas 2045.',
      'method-eyebrow': 'Cara Kerja',
      'method-title': 'Dari kebutuhan lapangan sampai laporan dampak.',
      'method-desc': 'JDN tidak hanya menjalankan kegiatan sosial, tetapi membangun alur program yang dapat dipahami donatur, mitra, dan penerima manfaat.',
      'legal-eyebrow': 'Legalitas',
      'legal-title': 'Dasar legal Yayasan Jejak Dampak Nusantara.',
      'legal-desc': 'Legalitas menjadi fondasi kepercayaan publik, donatur, dan mitra dalam membangun kolaborasi sosial yang profesional.',
      'trust-eyebrow': 'Trust Center',
      'trust-title': 'Transparansi untuk membangun kepercayaan publik.',
      'trust-desc': 'JDN menempatkan legalitas, tata kelola, penggunaan dana, laporan program, dan dokumentasi dampak sebagai bagian penting dari akuntabilitas lembaga.',
      'founder-eyebrow': 'Founder Team',
      'founder-title': 'Tiga pendiri dengan keahlian yang saling melengkapi.',
      'founder-desc': 'Leadership, program development, dan digital growth menjadi fondasi kerja JDN dalam membangun ekosistem dampak.',
      'faq-eyebrow': 'FAQ',
      'faq-title': 'Pertanyaan yang sering muncul terkait kepercayaan dan transparansi.',
      'cta-title': 'Ingin mengenal JDN lebih dalam?',
      'cta-desc': 'Lihat bank program, diskusikan kebutuhan kemitraan, atau hubungi tim untuk mendapatkan informasi resmi.',
      'view-programs': 'Lihat Program',
      'become-partner': 'Jadi Mitra'
    },
    en: {
      'hero-eyebrow': 'About Foundation',
      'hero-title': 'Jejak Dampak Nusantara',
      'hero-desc': 'A social institution that bridges donors, companies, and communities to advance education, health, and sustainability across Indonesia.',
      'intro-eyebrow': 'What is JDN?',
      'intro-title': 'Not just charity, but a sustainable impact ecosystem.',
      'intro-desc-1': 'Jejak Dampak Nusantara Foundation is a non-profit organization based in Indonesia that serves as an impact catalyst and strategic bridge between public donors, corporations, and beneficiary communities.',
      'intro-desc-2': 'JDN focuses on developing programs in education, health, and sustainability sectors with a measurable, documented, and scalable approach across regions.',
      'highlight-label': 'Real footprint',
      'highlight-title': 'Every small action must leave a provable impact.',
      'highlight-desc': 'We combine social mapping, program design, field implementation, monitoring, evaluation, and impact reporting in one neat workflow.',
      'vision-eyebrow': 'Vision & Mission',
      'vision-title': 'JDN direction is built for inclusive and measurable impact.',
      'vision-label': 'Vision',
      'vision-text': 'To become the leading impact catalyst in Indonesia.',
      'vision-desc': 'Mobilizing multi-sector collaboration for inclusive, measurable, and sustainable education and health growth.',
      'mission-label': 'Mission',
      'mission-1': 'Become a strategic partner for corporations in designing and executing CSR programs with real impact and professional documentation.',
      'mission-2': 'Encourage multi-party collaboration to accelerate the achievement of Indonesia Sustainable Development Goals or SDGs.',
      'mission-3': 'Expand impact throughout Indonesia as a contribution towards Indonesia Emas 2045.',
      'method-eyebrow': 'How We Work',
      'method-title': 'From field needs to impact reports.',
      'method-desc': 'JDN not only runs social activities but builds program flows that donors, partners, and beneficiaries can understand.',
      'legal-eyebrow': 'Legality',
      'legal-title': 'Legal foundation of Jejak Dampak Nusantara Foundation.',
      'legal-desc': 'Legality is the foundation of public trust, donors, and partners in building professional social collaboration.',
      'trust-eyebrow': 'Trust Center',
      'trust-title': 'Transparency to build public trust.',
      'trust-desc': 'JDN places legality, governance, fund usage, program reports, and impact documentation as important parts of institutional accountability.',
      'founder-eyebrow': 'Founder Team',
      'founder-title': 'Three founders with complementary expertise.',
      'founder-desc': 'Leadership, program development, and digital growth are the foundations of JDN work in building an impact ecosystem.',
      'faq-eyebrow': 'FAQ',
      'faq-title': 'Frequently asked questions regarding trust and transparency.',
      'cta-title': 'Want to know JDN more?',
      'cta-desc': 'View program bank, discuss partnership needs, or contact the team for official information.',
      'view-programs': 'View Programs',
      'become-partner': 'Become a Partner'
    }
  };
  
  function applyLanguage(lang) {
    console.log('Applying about translations:', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }
  
  document.addEventListener('language-changed', (e) => {
    applyLanguage(e.detail.lang);
  });
  
  function applyInitialLanguage() {
    const initialLang = localStorage.getItem('jdn-lang') || 'id';
    applyLanguage(initialLang);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(applyInitialLanguage, 100);
    });
  } else {
    setTimeout(applyInitialLanguage, 100);
  }
})();