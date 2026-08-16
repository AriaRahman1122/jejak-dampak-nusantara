# Jejak Dampak Nusantara — Static/GitHub Pages

Website ini sekarang sepenuhnya statis. Tidak ada Node/Express/PHP dan tidak ada `fetch()` ke file JSON saat runtime. Data JSON tetap disimpan di `data/` sebagai sumber data yang mudah diedit, lalu dibundle ke `assets/js/data.js` agar halaman juga bisa dibuka langsung dengan double-click pada file HTML.

## Jalankan langsung
Buka `index.html` dengan browser. Tidak perlu server lokal.

> Catatan: beberapa fitur seperti login nyata dan pengiriman form membutuhkan backend/identity provider. Pada versi statis ini, halaman Login hanya frontend preview dan halaman Kontak menggunakan `mailto:`.

## GitHub Pages
Repository sudah dilengkapi `.nojekyll` dan workflow `.github/workflows/deploy-pages.yml`.

1. Push seluruh folder ke repository GitHub pada branch `main`.
2. Buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **GitHub Actions**.
4. Push berikutnya akan menjalankan workflow dan menerbitkan site ke GitHub Pages.

## Catatan struktur data
- Edit sumber data di `data/*.json`.
- Setelah mengubah JSON, regenerasi `assets/js/data.js` agar versi statis ikut berubah.
- Saat ini `assets/js/data.js` sudah dibuat dari seluruh JSON yang ada.

## Perbaikan yang termasuk dalam versi ini
- Semua URL internal dan asset dibuat relatif sehingga bekerja di lokal dan GitHub Pages (termasuk repository project pages).
- Data tidak lagi bergantung pada `fetch('/data/...')`.
- Counter beranda dijalankan ulang setelah refresh dan tidak bergantung pada IntersectionObserver untuk initial render.
- Halaman Kontak dan Masuk/Daftar memakai navbar/footer/theme/language yang sama dengan halaman lain.
- Testimonial placeholder/dummy pada halaman Kemitraan tidak lagi ditampilkan sebagai social proof nyata.
- File konfigurasi hosting Vercel/Apache/Netlify yang tidak relevan untuk GitHub Pages dihapus.
