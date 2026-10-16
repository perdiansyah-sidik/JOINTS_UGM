# Pilahin: menjalankan aplikasi dengan Supabase

Frontend ada di branch `feature/master-pengguna`; backend di repo saudara `EcoApp-Backend`, branch `feature/supabase-integrasi`. Keduanya sudah mengambil perubahan terbaru tim dari `origin/main`. Supabase adalah PostgreSQL jarak jauh. Browser memanggil API Express lokal di `http://localhost:3000/api`; hanya backend yang memegang `DATABASE_URL`.

## Menjalankan

1. Dari folder `EcoApp-Backend`, jalankan `npm install`, `node scripts/migrate.js`, lalu `npm start`.
2. Dari folder `JOINTS_UGM`, jalankan `npm install`, lalu `npm start`. Buka `http://localhost:4200/`.
3. Untuk akun uji, jalankan `node scripts/seed-demo.js` sekali di backend. Lima email dan password acak tersimpan hanya di file backend `.demo-accounts.local.txt` yang diabaikan Git. Seed tidak menambahkan poin, kas, atau transaksi fiktif.
4. Jalankan `node scripts/check-schema.js`, `node scripts/smoke-live.js`, dan `npm test` dari backend untuk memeriksa koneksi, login kelima akun, dan alur API pada skema uji terpisah. Build frontend: `npm run build -- --configuration live`.

`npm start` frontend memakai mode live. `npm run start:demo` mempertahankan mode demo lama. File `.env`, `DATABASE_URL`, dan `.demo-accounts.local.txt` jangan dipublikasikan.

## Data dan endpoint

Skema awal ada di [PILAHIN_SUPABASE_SCHEMA.sql](PILAHIN_SUPABASE_SCHEMA.sql). Backend juga memiliki `migrations/000-baseline.sql` untuk proyek kosong dan `001-live-users.sql` untuk kolom profil, versi sesi, serta kunci permintaan unik. Skema live sudah memiliki 12 tabel bisnis, 36 foreign key, dan RLS pada 12 tabel. API memakai akun database backend; frontend tidak mendapat akses langsung ke tabel. SQL Server lama belum memiliki data sumber atau ekspor untuk dipindahkan; tidak ada baris SQL Server yang diimpor.

Semua endpoint di bawah berawalan `/api`. Selain register, login, dan health, endpoint memerlukan header `Authorization: Bearer <token>`.

| Bagian | API utama | Aktor |
| --- | --- | --- |
| Autentikasi dan profil | `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `GET/PUT /profil` | Pengguna terdaftar; pendaftaran hanya pelanggan |
| M01 pengguna | `GET/POST /pengguna`, `GET/PUT/DELETE /pengguna/:id`, `PATCH /pengguna/:id/status` | Pengelola |
| M02 mitra | `GET/POST /mitra`, `GET/PUT/DELETE /mitra/:id`, `PATCH /mitra/:id/status` | Baca sesuai peran; tulis pengelola |
| M03 drop point | `GET/POST /drop-points`, `GET/PUT/DELETE /drop-points/:id`, `PATCH /drop-points/:id/status` | Baca sesuai peran; tulis pengelola |
| M04 jenis sampah | `GET/POST /jenis-sampah`, `GET/PUT/DELETE /jenis-sampah/:id`, `PATCH /jenis-sampah/:id/status` | Baca sesuai peran; tulis pengelola |
| T01/T02 setoran dan jemput | `GET/POST /setoran`, `GET /setoran/:id`, `PATCH /setoran/:id/tugaskan`, `PUT /setoran/:id/timbang`, `PATCH /setoran/:id/verifikasi`, `PATCH /setoran/:id/batalkan`, `GET/POST /slot-jemput` | Pelanggan mengajukan jemput; pengelola mencatat antar, membuat slot, menugaskan dan memverifikasi; mitra tertugas menimbang |
| T03 penerimaan fisik | `GET /setoran/detail/:id`, `PUT /setoran/terima/:id` | Pengelola |
| T04 penjualan material | `GET/POST /penjualan`, `GET /penjualan/:id`, `PATCH /penjualan/:id/kirim`, `PUT /penjualan/konfirmasi/:id`, `PUT /penjualan/retur/:id` | Pengelola membuat/mengirim; mitra tujuan mengonfirmasi; retur sesuai izin |
| T07 pencairan poin | `GET/POST /pencairan`, `GET /pencairan/saldo`, `PATCH /pencairan/:id/status`, `GET/POST /kas/cadangan` | Pelanggan mengajukan/membatalkan; pengelola mencatat dana, memproses, menolak, atau mencatat transfer manual |
| T08 buku kas | `GET /mutasi-kas`, `GET /mutasi-kas/ringkasan`, `POST /mutasi-kas`, `POST /mutasi-kas/penjualan` | Pengelola |

Penonaktifan dan penghapusan master merupakan soft delete agar riwayat transaksi tetap utuh. Transaksi keuangan dan penimbangan memakai transaksi database dan validasi status. Permintaan baru memakai `request_key` UUID agar retry tidak menggandakan setoran, pencairan, penjualan, atau mutasi kas. Bukti transaksi harus berupa tautan HTTPS; foto profil disimpan sebagai gambar kecil di database.

## Keputusan bisnis yang masih diperlukan

T07 sengaja menolak pengajuan baru sampai `POIN_RUPIAH` dan `MIN_PENCAIRAN_POIN` disepakati dan diisi di `.env` backend. Penjemputan baru memerlukan `POTONGAN_JEMPUT_PERSEN`. Pelunasan penjualan memerlukan `PERSEN_CADANGAN` dan `PERSEN_KOMUNITAS`. Jangan menebak nilai ini; setelah tim menetapkan nilainya, restart backend. Transfer bank tetap dilakukan manual, lalu pengelola mengonfirmasi dengan bukti HTTPS di aplikasi.
