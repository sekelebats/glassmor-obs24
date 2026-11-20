# Sekelebat — Eleventy starter

Starter ini mengubah desain single-file HTML V2 menjadi blog Eleventy (11ty) dengan konten Markdown. Desain Swiss editorial, tipografi Inter + JetBrains Mono, token warna HSL, dan mode gelap dipertahankan.

## Kebutuhan

- Node.js 20 atau lebih baru
- npm

## Jalankan di komputer

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Eleventy (biasanya `http://localhost:8080`).

Build produksi:

```bash
npm run build
```

Hasil build berada di folder `_site/`.

## Struktur proyek

```text
sekelebat-eleventy/
├── .eleventy.js
├── package.json
├── README.md
└── src/
    ├── _data/
    │   └── site.js
    ├── _includes/
    │   ├── layouts/
    │   │   ├── base.njk
    │   │   └── post.njk
    │   └── partials/
    │       ├── header.njk
    │       └── footer.njk
    ├── assets/
    │   ├── css/site.css
    │   └── js/site.js
    ├── posts/
    │   └── *.md
    ├── journal/index.njk
    ├── search/index.njk
    ├── 404.njk
    ├── feed.njk
    ├── robots.njk
    ├── sitemap.njk
    └── index.njk
```

## Menulis artikel baru

Buat file Markdown baru di `src/posts/`, misalnya `catatan-baru.md`:

```md
---
layout: layouts/post.njk
title: "Judul tulisan"
description: "Ringkasan singkat untuk SEO dan daftar artikel."
date: 2026-11-22
tags:
  - post
  - Catatan
permalink: "/journal/{{ page.fileSlug }}/"
---

Isi artikel ditulis menggunakan Markdown biasa.
```

Wajib sertakan tag `post` agar artikel masuk ke koleksi Journal. Tag lain menjadi label kategori. Tanggal memakai format `YYYY-MM-DD`.

## Pengaturan situs

Edit `src/_data/site.js`:
- `url`: ganti `https://example.com` dengan domain final tanpa slash di akhir.
- `name`, `title`, `description`, `author`.
- `navigation`, `products`, dan email kontak.

Canonical, Open Graph dasar, RSS Atom, `robots.txt`, dan `sitemap.xml` dibuat saat build. Setelah deploy, daftarkan sitemap di Google Search Console. Jangan lupa sesuaikan domain di `site.url`.

## Search dan archive

- `/journal/` menampilkan seluruh artikel.
- `/search/` menyediakan pencarian ringan di browser dari judul + deskripsi artikel.
- `/404.html` adalah halaman not-found untuk konfigurasi static hosting.

Search sengaja tidak mengunduh isi seluruh artikel; hanya metadata judul dan deskripsi.

## Deploy ke Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `_site`
- Framework preset: None
- Node version: gunakan Node 20+ pada pengaturan build.

Folder `_site` adalah hasil build. Jangan edit file di `_site` secara manual; ubah sumber di `src/`.

## Catatan teknis

- Google Fonts dimuat dari CDN untuk menjaga desain preview. Jika ingin mengurangi request eksternal, font dapat di-self-host pada tahap optimasi berikutnya.
- Belum ada CMS/admin. Artikel ditulis sebagai Markdown. Integrasi editor visual/Hono dapat dibuat sebagai tahap terpisah setelah fondasi blog stabil.
- `example.com` adalah placeholder; ganti sebelum produksi.
