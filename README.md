# Jejak Dampak Nusantara - Website Revisi

## Cara menjalankan lokal
Jalankan dari folder ini:

```bash
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000/`.

## Struktur clean URL
Halaman dibuat dengan folder route dan `index.html` di dalamnya sehingga ketika di-hosting URL tampil bersih seperti:
- `/`
- `/tentang/`
- `/program/`
- `/kemitraan/`
- `/berita/`
- `/donasi/`

File `.htaccess`, `_redirects`, dan `vercel.json` disediakan untuk membantu clean URL saat deployment.

## Catatan integrasi
- Form donasi, login, dan kontak masih frontend static dan siap disambungkan ke backend/payment gateway.
- Logo mitra memakai montage dari company profile sebagai placeholder. Untuk produksi, ganti dengan file logo resmi satu per satu.
- Hero menggunakan foto alam/terasering dari Brand Identity PDF.
