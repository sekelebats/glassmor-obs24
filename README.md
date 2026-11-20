# Sekelebat — Eleventy + Pagefind

Starter blog editorial monochrome dengan Eleventy v3, Markdown, Pagefind, dan koleksi Objects.

## Versi package yang dipatok

- `@11ty/eleventy`: 3.1.8 (stable)
- `@11ty/eleventy-plugin-rss`: 3.1.0
- `pagefind`: 1.6.0

Versi tersebut adalah versi stable/latest yang diperiksa pada 21 November 2026. Tidak memakai Eleventy v4 alpha.

## Jalankan

```bash
npm install
npm run dev
```

Build produksi (Eleventy lalu Pagefind):

```bash
npm run build
```

Build HTML saja: `npm run build:site`. Buat ulang indeks search: `npm run search:index`.

Catatan: `npm run dev` membuat build + indeks Pagefind terlebih dahulu, lalu menjalankan server Eleventy. Jika kamu mengubah atau menambah konten saat server berjalan, jalankan `npm run search:index` lagi agar indeks pencarian ikut diperbarui.

Output: `_site/`. Deploy Cloudflare Pages dengan build command `npm run build` dan output directory `_site`.

## Struktur

```text
sekelebat-eleventy/
├── .eleventy.js
├── package.json
├── src/
│   ├── _data/site.js
│   ├── _includes/
│   │   ├── layouts/{base,post,object}.njk
│   │   └── partials/{header,footer,pagination}.njk
│   ├── assets/{css/site.css,js/site.js}
│   ├── posts/*.md
│   ├── objects/*.md
│   ├── journal/index.njk
│   ├── objects/index.njk
│   ├── search/index.njk
│   ├── about/index.njk
│   ├── contact/index.njk
│   ├── privacy/index.njk
│   ├── disclaimer/index.njk
│   ├── terms/index.njk
│   ├── license/index.njk
│   ├── refunds/index.njk
│   ├── index.njk
│   ├── 404.njk
│   ├── feed.njk
│   ├── robots.njk
│   └── sitemap.njk
└── _site/ (generated; not committed)
```

## Homepage, archive, pagination

- Homepage menampilkan 4 artikel terbaru dan 2 Objects terbaru.
- Homepage tidak memakai pagination; ia hanya menampilkan cuplikan.
- `/journal/`: 10 artikel per halaman; halaman berikutnya `/journal/2/`, `/journal/3/`, dan seterusnya.
- `/objects/`: 8 Objects per halaman; halaman berikutnya `/objects/2/`, dan seterusnya.
- Setiap object punya halaman detail `/objects/<slug>/`.

## Pagefind: single body region

Hanya template detail artikel dan detail object yang diberi **satu** `data-pagefind-body` pada elemen `<main>` terluar. Judul dan isi berada di dalam elemen yang sama. Header, navigasi, footer, homepage, arsip, dan halaman legal tidak diindeks. Jangan menambahkan `data-pagefind-body` kedua pada `.prose` karena Pagefind akan menggabungkan beberapa region.

Pagefind berjalan setelah Eleventy selesai membangun HTML. Indeks dibuat di `_site/pagefind/`. Tidak ada indeks pencarian JavaScript buatan sendiri.

## Menambah artikel

Buat file `src/posts/nama-artikel.md`:

```md
---
layout: layouts/post.njk
title: "Judul artikel"
description: "Ringkasan singkat artikel."
date: 2026-11-22
tags:
  - post
  - Frontend
permalink: "/journal/{{ page.fileSlug }}/"
---

Isi artikel Markdown.
```

Tag `post` wajib agar artikel masuk ke koleksi Journal.

## Menambah Object / produk digital

Buat file `src/objects/nama-produk.md`:

```md
---
layout: layouts/object.njk
title: "Nama produk"
description: "Deskripsi singkat produk."
date: 2026-11-22
tags:
  - object
  - Website template
permalink: "/objects/{{ page.fileSlug }}/"
category: "WEBSITE TEMPLATE"
status: "IN DEVELOPMENT"
format: "HTML / CSS / JS"
version: "0.1"
priceLabel: "NOT ANNOUNCED"
shortName: "NAMA PRODUK"
coverText: "NAMA\nPRODUK"
highlights:
  - Fitur satu
  - Fitur dua
---

## Tentang produk

Deskripsi lengkap produk dengan Markdown.
```

Tag `object` wajib. Dua object yang disertakan adalah contoh konsep, belum produk siap jual. Harga dan checkout sengaja belum dibuat.

## Site settings

Edit `src/_data/site.js`, terutama `url` dan `contactEmail`. Ganti `https://example.com` dengan domain final sebelum deploy. Perbarui isi halaman Privacy, Disclaimer, dan Terms agar sesuai praktik aktual situs dan ketentuan penjualanmu.

## Catatan produksi

- `package.json` dipatok ke versi stable spesifik. Jalankan `npm install` untuk menghasilkan `package-lock.json`, lalu commit keduanya agar build Cloudflare reproducible.
- Jangan edit `_site` langsung; edit sumber di `src/`.
- Google Fonts masih eksternal. Jika ingin meniadakan request font pihak ketiga, self-host font pada tahap optimasi berikutnya.
- `404.html` disiapkan; pastikan platform hosting menyajikannya sebagai custom 404.
- Terms/Privacy/Disclaimer/License/Refunds adalah draft awal, bukan nasihat hukum. Sesuaikan dengan praktik aktual dan hukum yang berlaku sebelum menerima pembayaran atau memasang analytics/affiliate.