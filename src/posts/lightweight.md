---
layout: layouts/post.njk
title: "Membangun website yang ringan tanpa mengorbankan pengalaman"
description: "Beberapa prinsip sederhana untuk membuat website cepat, mudah dirawat, dan tetap nyaman digunakan."
date: 2026-11-21
tags:
  - post
  - Performance
  - Frontend
permalink: "/journal/{{ page.fileSlug }}/"
---
Website yang baik tidak harus dipenuhi animasi, library, atau komponen yang kompleks. Sering kali, pengalaman terbaik datang dari keputusan yang lebih sederhana: **konten yang jelas, struktur yang masuk akal, dan aset yang seperlunya.**

Dalam proyek kecil maupun besar, saya mencoba memulai dari HTML semantik, CSS yang terukur, dan JavaScript hanya ketika interaksi benar-benar membutuhkannya.

## Start with the structure

Gunakan elemen HTML sesuai maknanya. Heading membentuk outline dokumen, paragraf menyimpan isi, dan navigasi membantu pembaca berpindah konteks.

> Desain minimal bukan berarti menghilangkan semuanya. Minimal berarti setiap elemen punya alasan untuk hadir.

## Typography creates hierarchy

Perbedaan ukuran, ketebalan, lebar baris, dan ruang kosong membantu pembaca memahami prioritas informasi.

### Hal sederhana yang membantu

- Batasi lebar kolom artikel agar nyaman dibaca.
- Gunakan jarak antarbagian secara konsisten.
- Pastikan kontras teks tetap memadai.

Untuk langkah berurutan, gunakan daftar bernomor:

1. Bangun struktur HTML.
2. Terapkan token desain.
3. Tambahkan interaksi seperlunya.

## Design tokens

Token warna dapat dikelola menggunakan custom properties berbasis HSL:

```css
:root {
  --fg: 0 0% 8%;
  --bg: 0 0% 98%;
}
```

Performa bukan pekerjaan setelah desain selesai. Ia bagian dari keputusan desain sejak awal.