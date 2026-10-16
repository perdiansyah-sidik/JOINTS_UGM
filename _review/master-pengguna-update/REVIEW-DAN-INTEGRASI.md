# Review Master Pengguna — Rifqi

Tanggal: 15 Oktober 2026. Skill digunakan: `ecc:angular-developer`.

## Kesimpulan

Struktur awal sesuai arah M01: pengelola melihat daftar akun, mencari/filter,
membuat petugas mitra, mengubah profil, dan mengubah status akun.
Paket awal belum siap dipasang: impor Ionic tidak sesuai versi repo, validasi belum
lengkap, dan backend lokal belum menyediakan sebagian besar endpoint yang dipanggil.

Seluruh 13 file ZIP awal diperiksa: routing aplikasi, model, API service,
modul/routing/TypeScript/HTML/SCSS halaman daftar dan form. ZIP sumber di Downloads
tetap utuh. Revisi hanya ada di salinan `_review/master-pengguna-update`.
File aplikasi utama, login, registrasi, backend, database, serta stash tidak diubah.

## Acuan dan keputusan

- Acuan bisnis: `Pilahin_Final_dan_Pembagian_Tugas.docx`, sesuai penegasan Rifqi
  bahwa dokumen tersebut final. Peran angka 1–5; akun orang berbeda dari organisasi.
- M01 hanya membuat petugas mitra. Pelanggan mendaftar melalui registrasi publik;
  pengelola dibuat melalui setup terkontrol. Peran tidak bisa diedit pada form ini.
- Nama maksimal 100, email 150, no_hp 20, alamat 255, nama_usaha 150 karakter.
  Alamat pelanggan 1–3 wajib. Nomor HP dan nama usaha opsional.
- `Pilahin_PDM_SQLServer.md` yang terbuka di editor memuat rancangan lama berbeda
  (awalan m_/t_, peran teks, jenis_pelanggan). Jangan mencampur kedua kontrak.

**Usulan yang diterapkan pada salinan, perlu disamakan dengan backend:** password
8–128 karakter tanpa syarat simbol/huruf besar; nomor HP 8–15 digit, boleh + di awal,
spasi/tanda kurung/tanda hubung dibersihkan sebelum dikirim. Batas input HP tetap 20.
Email dirapikan menjadi lowercase, password tidak dipangkas atau diubah.

**Keputusan yang masih perlu disepakati:** tombol nonaktif di salinan berarti
nonaktif sementara (`aktif=0`, `is_deleted` tetap 0), sehingga bisa diaktifkan lagi.
ZIP awal menyebut endpoint itu soft delete (`is_deleted=1`) sekaligus menyediakan
aktifkan kembali, sehingga artinya bertentangan. Soft delete belum ditambahkan;
akun yang sudah dihapus tidak ditampilkan/diaktifkan oleh UI ini. Jika tim memilih
nonaktif = soft delete, kontrak dan tombol aktifkan harus disesuaikan sebelum integrasi.

## Temuan dan perbaikan frontend

| Temuan awal | Revisi salinan |
|---|---|
| `IonicModule` diimpor dari root Ionic 9 | Mengikuti repo: `@ionic/angular/lazy` |
| Halaman dapat dibuka tanpa pemeriksaan peran | Guard navigasi untuk sesi peran 4 |
| Nama/alamat/HP/panjang input belum tervalidasi | Aturan terpusat, error di bawah kolom setelah blur atau Simpan |
| ID negatif/pecahan dan mode URL salah diterima | ID integer positif SQL INT, mode harus tambah/ubah |
| Status kunci tidak dikirim dianggap tidak terkunci | Organisasi hanya dapat diedit jika `terkunci_transaksi === false` |
| Payload bisa mengirim organisasi pada pelanggan | Payload hanya memuat kolom yang relevan dan diizinkan |
| Gagal memuat organisasi hanya tercatat di console | Pesan, tombol coba lagi, kondisi kosong, simpan diblokir |
| Daftar dimuat di ngOnInit dan ionViewWillEnter | Hanya ionViewWillEnter; permintaan bersamaan dibatasi |
| Data backend lama bisa dianggap cocok | Validasi respons dasar, tolak peran/status/relasi yang tidak cocok |
| Ubah status bisa dikirim berulang saat masih berjalan | Tombol dan handler dibatasi selama permintaan |
| Perubahan async pada aplikasi tanpa Zone.js | `markForCheck()` setelah respons agar UI diperbarui |
| Error server mentah ditampilkan | Pesan berdasarkan status HTTP, tidak membuka detail SQL |

Duplikasi yang dibuang: aksi aktif/nonaktif pada form (tetap tersedia di daftar),
loading overlay yang berulang (spinner tombol dipakai), konstanta peran tidak
terpakai, pilihan ikon ternary identik, parameter filter API tidak digunakan,
dan CSS tombol status form yang tidak lagi dipakai.

Service M01 dipisah menjadi `master-pengguna.service.ts`. Paket revisi tidak
membawa pengganti `api.service.ts` atau `app-routing.module.ts` milik bersama.

## Backend: masih menjadi penghambat

Pemeriksaan statis `D:\Matkul_FullSemester\HACKATON\EcoApp-Backend\index.js`:

| Endpoint | Kondisi saat diperiksa |
|---|---|
| GET /api/pengguna | Ada, tetapi masih m_pengguna dan kolom kontrak baru belum lengkap |
| GET /api/pengguna/:id | Ada, tetapi aktif/is_deleted/id_mitra/status kunci belum lengkap |
| POST /api/pengguna/petugas-mitra | Belum ada |
| PUT /api/pengguna/:id | Belum ada |
| PATCH /api/pengguna/:id/nonaktifkan | Belum ada |
| PATCH /api/pengguna/:id/aktifkan | Belum ada |
| GET /api/mitra/ringkas | Belum ada |

Semua GET memakai envelope `{ status: 'success', data: ... }`. Bentuk data
pengguna mengikuti `src/app/models/pengguna.model.ts`; nilai nullable dikirim
`null`, bukan hilang. Detail petugas wajib memiliki id_mitra valid.
`terkunci_transaksi` dihitung server dari referensi transaksi, bukan kiriman form.
Endpoint mitra mengembalikan organisasi aktif yang boleh dipilih: `id_mitra`,
`nama_mitra`. Perubahan organisasi harus diperiksa ulang saat menyimpan.

API wajib memverifikasi sesi pengelola, membatasi kolom yang boleh diedit,
memvalidasi ulang seluruh input, memastikan email unik (termasuk permintaan
bersamaan), hash password, memeriksa organisasi aktif dan relasi transaksi,
serta mengisi audit actor/waktu dari sesi server. Guard localStorage hanya
mengatur navigasi; pengguna bisa memalsukan nilainya. Backend saat diperiksa
belum memiliki middleware autentikasi/otorisasi untuk endpoint pengguna.

Saran tambahan: backend menolak penonaktifan akun sendiri/pengelola aktif terakhir
agar akses pengelolaan tidak terkunci. Ini usulan, bukan keputusan dokumen final.
Balas 401 untuk sesi tidak sah, 403 untuk izin, 404 untuk data tidak tersedia,
409 untuk konflik, 400/422 untuk input. Mutasi harus mengembalikan HTTP sukses
hanya setelah tersimpan; jangan HTTP 200 dengan `status: 'error'`.

## Cara integrasi agar minim konflik

1. Koordinasikan kepemilikan folder `master-pengguna`, model, dan service baru.
2. Salin hanya folder/file tersebut dari `src/app` paket ini. Bandingkan dahulu
   jika tim sudah memiliki file dengan nama sama. Jangan menimpa src aplikasi penuh.
3. Gabungkan satu route berikut ke array routes yang sudah ada:

```ts
{
  path: 'master-pengguna',
  loadChildren: () => import('./master-pengguna/master-pengguna.module')
    .then(m => m.MasterPenggunaPageModule),
},
```

4. Tautkan menu dashboard pengelola ke `/master-pengguna`. Menu dashboard bersama
   belum diedit dalam review ini.
5. Sesi `ecoapp_user` harus memakai peran numerik 4 sesuai dokumen final.
   Backend lama dengan peran teks belum kompatibel; jangan mengakali guard
   untuk mengklaim autentikasi sudah selesai.
6. Pastikan `environment.apiUrl` tersedia untuk development dan production.
   Di smartphone, localhost menunjuk perangkat itu sendiri, bukan laptop backend;
   pilih alamat backend sesuai konfigurasi pengujian tim.
7. Terapkan kontrak endpoint di backend sebelum menguji simpan/nonaktif sungguhan.

## Verifikasi

- 19 pengujian aturan validasi/payload lulus dengan Vitest, termasuk panjang
  kolom, alamat wajib, HP, ID tidak sah, organisasi tidak tersedia, dan penguncian
  organisasi ketika status transaksi belum diketahui.
- Pengujian tidak mengirim perubahan ke database.
- Build dilakukan pada salinan aplikasi di `_review/master-build-check`, memakai
  dependency lokal dan route M01 yang digabungkan hanya di salinan tersebut.
- Hasil akhir build dicatat di `HASIL-VERIFIKASI.md`.
- Belum ada uji alur lengkap dengan backend maupun perangkat Android nyata.
  Paket ini merupakan revisi frontend untuk ditinjau, bukan bukti fitur siap produksi.

Menjalankan ulang unit test dari root repo setelah paket diekstrak ke lokasi ini:

```powershell
node node_modules/vitest/vitest.mjs run _review/master-pengguna-update/src/app/master-pengguna/pengguna-validation.spec.ts
```
