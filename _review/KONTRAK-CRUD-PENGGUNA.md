# Syarat agar Master Pengguna memakai SQL Server asli

Acuan bisnis: `Pilahin_Final_dan_Pembagian_Tugas.docx` (14 Oktober 2026),
bukan PDM 13 Oktober yang masih memakai `m_pengguna`, peran teks, dan
`jenis_pelanggan`. Permintaan Rifqi pada 15 Oktober menambah kebutuhan hard delete
yang perlu dibatasi agar histori transaksi tidak putus.

## Hak akses

| Aktor | Aksi |
|---|---|
| Pengelola (`peran=4`) | Daftar/detail semua akun; buat petugas mitra (`peran=5`); ubah kolom profil yang diizinkan; hapus sementara/pulihkan; hard delete hanya akun tanpa referensi transaksi atau audit lain. |
| Pelanggan (`peran=1/2/3`) | Lihat dan ubah **profil sendiri** melalui endpoint `/me`. Tidak menerima ID pengguna lain dari UI. Peran, organisasi, status, password, dan audit tidak dapat diubah lewat endpoint ini. |
| Petugas mitra (`peran=5`) | Lihat dan ubah profil sendiri saja. Organisasi/peran tidak bebas diubah. |
| Sistem/bootstrap | Buat pengelola awal melalui setup terkontrol; endpoint publik tidak boleh membuat `peran=4/5`. |

Registrasi publik pelanggan tetap mengikuti keputusan dokumen final.
Hak di atas harus diperiksa di API pada setiap permintaan, bukan disimpulkan
dari `localStorage` atau menu yang sedang terlihat. Token/sesi harus dapat
diverifikasi di server. Saat review, login lokal hanya menyimpan objek pengguna
di `localStorage`; itu belum bukti identitas yang aman untuk CRUD admin.

## API yang perlu selesai

Semua respons baca memakai `{status:'success',data:...}` sesuai service M01.

| Operasi | Endpoint | Pemeriksaan utama |
|---|---|---|
| Daftar akun | `GET /api/pengguna` | Pengelola saja; tampilkan juga akun terhapus sementara agar bisa dipulihkan lewat switch |
| Detail akun | `GET /api/pengguna/:id` | Pengelola; data nullable lengkap; hitung `terkunci_transaksi` dari DB |
| Buat petugas | `POST /api/pengguna/petugas-mitra` | Pengelola; `peran=5` dipatok server; mitra aktif; email unik; hash password |
| Ubah akun | `PUT /api/pengguna/:id` | Pengelola; whitelist kolom; cek organisasi/riwayat lagi saat menulis |
| Soft delete/pulihkan | `PATCH /api/pengguna/:id/nonaktifkan` dan `/aktifkan` | Pengelola; atomik set `aktif=0, is_deleted=1` dan sebaliknya; riwayat tetap ada |
| Hard delete | Usulan `DELETE /api/pengguna/:id` | Pengelola; **tolak 409** jika pernah dirujuk transaksi/audit; transaksi DB dengan pemeriksaan FK. Jangan menghapus historinya diam-diam |
| Profil sendiri | `GET /api/pengguna/me`, `PUT /api/pengguna/me` | ID dari sesi server; whitelist nama, no_hp, alamat, nama_usaha sesuai peran |
| Pilihan mitra | `GET /api/mitra/ringkas` | Pengelola; `id_mitra`,`nama_mitra` dari organisasi aktif |

Setiap mutasi mengisi aktor/waktu audit dari identitas server. Seluruh input
divalidasi ulang di API dengan panjang kolom final, termasuk email ternormalisasi,
nomor HP opsional dan alamat wajib bagi pelanggan. Format password awal yang
diusulkan UI adalah 8–128 karakter tanpa syarat simbol; samakan aturan di API.
Gunakan kode 401 (sesi), 403 (izin), 404 (tidak ada), 409 (email/FK/konflik),
dan 400/422 (input). Perlakukan email unik dan pemeriksaan FK sebagai constraint
database juga, karena dua permintaan bisa datang bersamaan.

## Syarat database dan uji penerimaan

1. Sepakati migrasi DB aktif ke schema final `pengguna`/`mitra` dan kolom
   `peran` angka, `aktif`, `is_deleted`, `id_mitra`, audit. Backup DB aktif
   sebelum perubahan schema atau hard delete. Jangan menebak bahwa PDM lama
   dan Word final sudah setara.
2. Pasang dependensi backend di repo backend. Saat dicek, `node_modules/mssql`
   tidak ada dan koneksi SQL Server belum dapat dijalankan.
3. Implementasikan sesi/login yang server bisa verifikasi, lalu endpoint admin
   dan `/me`. UI perlu mengirim kredensial sesi ke API; guard lokal hanya UX.
4. Uji pada DB percobaan: pelanggan tidak dapat mengubah ID orang lain;
   petugas tidak dapat membuat akun; pengelola dapat buat/edit/nonaktif/soft
   delete; hard delete akun yang dirujuk transaksi ditolak; histori tetap utuh.
5. Uji dari Android atau browser yang mengarah ke backend asli dan lihat perubahan
   pada SQL Server. Preview port 4310 selalu memakai data contoh di memori.

Status 15 Oktober: frontend M01 dan preview ada, API backend belum sesuai
kontrak, koneksi DB belum terverifikasi. Karena itu belum ada tanggal pasti
fitur menjadi nyata; empat pekerjaan pertama di atas adalah penentunya.
