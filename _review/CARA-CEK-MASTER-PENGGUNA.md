# Cara cek Master Pengguna

Fitur sudah dimasukkan ke repo utama:

- `src/app/master-pengguna/`
- `src/app/models/pengguna.model.ts`
- `src/app/services/master-pengguna.service.ts`
- Satu route baru di `src/app/app-routing.module.ts`: `/master-pengguna`.

Login, registrasi, API service bersama dan backend tidak diubah. Menu dashboard
bersama belum ditambah; gunakan route langsung untuk sementara.

## 1. Cek tampilan dan interaksi dengan data contoh

Buka **http://127.0.0.1:4310/preview** lalu klik **Buka sebagai pengelola demo**.
Tidak perlu membuat akun sungguhan. Jangan isi data pribadi/password sungguhan.
Banner kuning menandakan SIMULASI. Server ini hanya mendengarkan koneksi laptop lokal.

Chrome/Edge: tekan F12, lalu Ctrl+Shift+M, pilih Responsive dan ukuran 390 × 844.
Ini pratinjau aplikasi smartphone melalui browser; tidak mengubah target aplikasi
menjadi website desktop. Perilaku keyboard, tombol Back Android dan safe area
tetap perlu diuji pada perangkat Android nanti.

Jika pratinjau sudah berhenti, dari terminal root repo jalankan:

```powershell
node _review/master-preview-server.cjs
```

Jika kode sumber baru diedit atau build pratinjau belum ada:

```powershell
node _review/build-master-preview.cjs
node _review/master-preview-server.cjs
```

Build ini menyalin sumber repo ke `_review/master-browser-preview`, menggunakan
API relatif `/api` hanya di salinan. Environment utama tetap sama. Preview bukan
hot reload: setelah mengubah sumber, build ulang lalu refresh browser. Jika server
masih berjalan, cukup build dari terminal kedua dan refresh; tidak perlu menjalankan
server kedua pada port yang sama. Ctrl+C menghentikan server sekaligus membuang
semua perubahan data contoh dari memori. Menjalankannya kembali mengembalikan seed.

## 2. Skenario pengujian manual

| Langkah | Hasil yang diharapkan |
|---|---|
| Cari Sari | Hanya akun yang cocok muncul |
| Pilih tab Mitra; geser tab bila tidak terlihat | Hanya petugas mitra muncul |
| Tekan tombol tambah lalu simpan form kosong | Error nama, email, organisasi dan password muncul di bawah kolom |
| Isi email tidak valid / HP berisi huruf | Error terlihat setelah keluar dari kolom atau menekan simpan |
| Buat petugas dengan email baru | Kembali ke daftar; akun baru muncul |
| Coba email yang sama | Konflik ditampilkan; akun tidak dibuat dua kali |
| Ubah nama petugas baru dan pilih organisasi lain | Data pada daftar/detail berubah |
| Buka Joko Petugas | Organisasi terkunci karena contoh akun sudah dirujuk transaksi |
| Kosongkan alamat Sari lalu simpan | Alamat pelanggan wajib, penyimpanan ditolak UI |
| Ketuk `...` pada kartu | Menu kecil di atas tombol menampilkan Detail, Edit, dan Hapus secara bergiliran |
| Pilih Detail | Halaman baca saja berisi profil dan status akun |
| Ketuk switch hijau petugas contoh | Dialog putih muncul; setelah disetujui switch bergeser kiri dan menjadi abu |
| Ketuk switch abu petugas contoh | Setelah disetujui switch bergeser kanan dan menjadi hijau |
| Hapus permanen Joko Petugas | Harus mengetik `HAPUS`; mock menolak karena akun sudah dirujuk transaksi |
| Hapus permanen Dina Petugas Baru | Setelah mengetik `HAPUS`, akun hilang dari daftar data contoh |

Seed memiliki pelanggan, pengelola, petugas terkunci, petugas belum terkunci, dan
pelanggan nonaktif. Akun pengelola demo tidak dapat dinonaktifkan di mock agar
pengujian tetap dapat diakses. Ini aturan simulasi, belum implementasi backend asli.

Verifikasi browser yang telah dilakukan: daftar tampil pada viewport mobile,
form kosong menampilkan error inline, tambah petugas, pencarian, ubah nama dan
organisasi, normalisasi HP, organisasi terkunci, menu aksi, halaman detail,
nonaktif sementara (`aktif=0`, `is_deleted=1`) yang dapat dipulihkan,
dan hard delete contoh tanpa riwayat. Build development salinan sumber terintegrasi lulus.
Data `Petugas Uji Browser Diperbarui` mungkin terlihat sebagai hasil uji ini.

## 3. Cek terhadap backend asli

```powershell
npm start
```

Buka alamat yang dicetak Angular (biasanya http://localhost:4200), masuk melalui
login yang sesungguhnya sebagai pengelola, lalu buka `/master-pengguna`.
Guard membutuhkan sesi `ecoapp_user` dengan `peran: 4` numerik. Tanpa sesi atau
dengan peran lain akan dialihkan. Tombol demo tidak ditambahkan ke aplikasi asli.

Backend lokal saat review masih memakai kontrak lama dan belum memiliki endpoint
tambah petugas, ubah pengguna, aktif/nonaktif, serta daftar organisasi. Karena itu
alur asli belum dapat dites lengkap. Samakan kontrak dengan tim backend dahulu;
jangan menghapus guard untuk menganggap masalah integrasi selesai.

Mock tidak membuktikan keamanan backend: otorisasi sesi, hash password,
keunikan email di database, audit, pemeriksaan relasi transaksi dan perubahan
serentak harus diuji lagi pada API asli. Tidak ada perubahan database dalam sesi ini.

Folder `_review` berisi alat bantu dan build lokal, bukan bagian paket aplikasi
untuk dibagikan ke tim. Untuk integrasi source, tinjau empat lokasi di awal dokumen.
