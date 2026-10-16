# PILAHIN CODEX BRIEF

## Instruksi penggunaan

Simpan file ini di root repository Pilahin. Pesan pembuka yang dapat dikirim ke Codex:

> Baca PILAHIN_CODEX_BRIEF.md sampai selesai dan periksa repository serta AGENTS.md yang berlaku. Gunakan keputusan terbaru di file ini. Mulai dari audit kondisi proyek, validasi aturan bisnis dan rancangan database, lalu susun rencana planning, analysis, design, implementation beserta urutan fitur. Kerjakan bertahap dan laporkan hasil yang dapat diuji. Gunakan kemampuan ECC atau subagent hanya jika benar-benar tersedia. Jangan menambah scope atau mengganti stack.

File ini adalah briefing proyek untuk membantu kerja, bukan instruksi yang mengesampingkan system/developer instruction, aturan repository, persetujuan, atau pembatasan akses. Jika ada konflik substantif, jelaskan sebelum mengganti keputusan bisnis.

## Kontrak scope terbaru

- Nama proyek Pilahin; target MVP lima hari, tim empat orang.
- Tiga role login: PELANGGAN, PENGELOLA, MITRA. Tidak ada role ADMIN atau KURIR terpisah.
- Satu stakeholder pelanggan, dengan jenis RUMAH_TANGGA, UMKM_KULINER, PEDAGANG_PASAR.
- Kurir dan petugas pengolah adalah personel organisasi mitra. Akun masing-masing petugas terhubung ke m_mitra.
- Mitra memasukkan hasil jemput/timbang dan mengajukannya. Pengelola memverifikasi dan memfinalisasi setoran. Poin baru tersedia setelah FINAL.
- Antar sendiri dan dijemput sama-sama tersedia. Pengambilan gagal hanya untuk dijemput.
- Sampah yang diterima: plastik, kardus, kaca, logam sesuai syarat. Tidak ada organik atau campuran makanan.
- Satu kawasan, satu drop point, satu organisasi mitra operasional pada MVP. Material sejenis boleh digabung setelah identitas dan timbang tercatat.
- Poin ditukar uang melalui pengelola, bukan merchandise; pelanggan tidak membayar jemput di muka; mitra membayar pengelola atas pembelian material.
- Cadangan 40%, komunitas 10%, operasional sisanya 50%. Komunitas hanya pihak penyedia area yang nyata; sebelum penerima jelas, jatah itu tidak dibayarkan atau dialihkan otomatis.
- Dua belas tabel bisnis adalah baseline, bukan dalih mengabaikan integritas atau klaim otomatis 3NF. Tidak ada tabel laporan permanen.
- Kas mencatat uang nyata. Transfer bank dan pembayaran mitra dilakukan manual di luar aplikasi. Jangan membuat integrasi pembayaran sungguhan.
- Jangan memakai rancangan lama 17 tabel, dua role login, langganan iuran warga, kelompok RT/blok, atau hadiah merchandise.

## Cara bekerja di repository

1. Baca AGENTS.md dan panduan lokal, lihat struktur folder, git status, package manifest, konfigurasi database, dan implementasi yang sudah ada.
2. Jangan menimpa perubahan manusia, mereset repository, mengganti framework, atau menjalankan migrasi destruktif. Pertahankan struktur/nama yang sudah sesuai. Jangan mencetak secret.
3. Ringkas kondisi yang benar-benar teramati. Jangan mengklaim sudah melihat screenshot Figma atau template yang belum tersedia.
4. Cocokkan scope dan tabel dengan repository. Perubahan nama/struktur harus dipetakan, bukan dibuatkan modul paralel yang menduplikasi pekerjaan lama.
5. Gunakan versi dependensi yang kompatibel dengan repository. Jangan otomatis memasang versi “terbaru”. Untuk API backend gunakan JavaScript; frontend mengikuti konvensi Angular yang sudah ada, termasuk TypeScript bila digunakan.
6. Selesaikan alur per fitur dari database sampai UI, dengan validasi API sebagai sumber aturan bisnis. Jangan berhenti pada UI dengan data mock tanpa memberi label.
7. Berikan laporan singkat: file berubah, perilaku yang selesai, perintah verifikasi yang benar-benar dijalankan, hasil, serta kendala tersisa.
8. Jangan melakukan deploy, mengirim pesan eksternal, atau memindahkan uang. Perubahan bisnis seperti menghapus metode jemput/menambah role/modul harus dibahas, bukan diasumsikan.

## Fase kerja dan hasil yang diharapkan

### Planning

- Susun docs/scope.md berisi tiga peran, tujuan, batasan, parameter operasional, dan urutan prioritas lima hari.
- Bedakan keputusan bisnis dari nilai demo. Jika angka tarif belum ditentukan, gunakan konfigurasi demo berlabel dan jangan menyebutnya tarif operasional yang disepakati.
- Catat bahwa frontend belum punya pembagian coding eksplisit; desain Figma Zafrans/Perdi dan database/API/BPMN Rifqi/Syauqi bukan bukti frontend telah dibuat.

### Analysis

- Susun kebutuhan dan aturan bisnis yang dapat diuji tanpa memperluas scope.
- Tetapkan hak akses object-level, status/transisi, perhitungan, definisi waktu, foto bukti, pembatalan, gagal, penolakan, dan pengembalian.
- Buat docs/acceptance.md yang mencakup alur sukses dan risiko konkret saldo/kapasitas/transaksi ganda.
- Seluruh hasil timbang ditolak tidak boleh FINAL berisi poin; gunakan DITOLAK dan nol poin.
- Bedakan gangguan penjemputan, penolakan material, dan selisih kedatangan drop point.

### Design

- Buat ERD, kamus data, PDM SQL Server, dan matriks fitur terhadap tabel. Dokumentasikan PK, alternate key, FK, nullability, CHECK, UNIQUE, delete/update behavior.
- Sertakan functional dependency serta alasan 1NF/2NF/3NF per tabel. Jangan mengklaim normalisasi hanya berdasarkan jumlah tabel.
- Setoran adalah induk identitas. Penjemputan menyimpan id_setoran unik; pelanggan/titik tidak diduplikasi pada penjemputan. Metode berasal dari keberadaan penjemputan.
- Pada MVP satu titik, t_slot_jemput hanya slot kawasan, tidak menggandakan hubungan drop point.
- Akun mitra menyimpan id_mitra; penjemputan menyimpan id_petugas_mitra agar organisasi tidak disalin lagi.
- Jangan menyimpan saldo atau total header yang bisa dihitung kecuali ada alasan konsistensi/performa terdokumentasi.
- Jangan menambah kembali ledger poin/stok/konfigurasi/merchant yang sudah dikeluarkan dari MVP tanpa alasan kebutuhan baru yang jelas.
- Buat BPMN proses utama dengan pelanggan, pengelola, mitra, dan aktivitas sistem. Gunakan pool/lane/message flow secara benar; Mermaid biasa bukan otomatis file BPMN.
- Tetapkan kontrak API, error format, status dan contoh payload sebelum pekerjaan frontend/backend paralel.
- Hormati referensi UI/Figma yang tersedia. Bila tidak ada, buat layout sederhana konsisten tanpa mengaku meniru referensi yang belum dibaca.

### Implementation

Urutan pengerjaan:
1. Infrastruktur minimum, migrasi/seed, autentikasi tiga role dan otorisasi.
2. Master pengguna/mitra/drop point/material.
3. Slot, permintaan, kode setoran, penugasan, status jemput.
4. Timbang antar sendiri atau oleh mitra, bukti, pengajuan, verifikasi, poin.
5. Kedatangan drop point, stok, penjualan, penerimaan mitra, retur.
6. Pencairan, kas, alokasi, laporan.
7. Integrasi UI, pengujian lintas role, build, petunjuk menjalankan dan demo.

Jangan menunggu semua layar selesai untuk menguji satu alur utuh. Prototype Figma dan kode aplikasi merupakan deliverable berbeda.

## Penggunaan agen bila tersedia

ECC yang terpasang pada komputer pengguna tidak menjamin skill atau agent tertentu tersedia pada sesi ini. Periksa kemampuan yang benar-benar disediakan dan baca instruksi relevannya. Jangan mengarang nama command, tool, atau skill ECC.

Jika fitur subagent tersedia dan instruksi sesi mengizinkan, gunakan pembagian berikut setelah kontrak disepakati:
- Koordinator: scope, status, kontrak API/schema dan integrasi. Menjadi satu pemilik keputusan lintas modul.
- Agen data: ERD/PDM, migrasi/seed, constraint dan query; tidak mengubah kontrak tanpa sinkronisasi.
- Agen backend: API dan aturan bisnis sesuai kontrak data.
- Agen frontend: layar tiga peran dan integrasi sesuai kontrak API.
- Agen QA: tinjau serta uji alur kritis, tidak menulis ulang modul milik agen lain.

Tetapkan kepemilikan file, batasi agen aktif sesuai kemampuan, jangan izinkan penulisan bersamaan pada file yang sama, dan jangan paralelkan pekerjaan yang masih saling menunggu keputusan schema. Jika subagent tidak tersedia, kerjakan urutan yang sama secara serial. Agen AI tidak menggantikan penanggung jawab manusia.

## Persyaratan integritas yang wajib diuji

- Publik hanya dapat registrasi PELANGGAN. MITRA dibuat pengelola dan memiliki id_mitra; pelanggan tidak boleh menaikkan peran lewat payload.
- Petugas hanya dapat membuka tugas penjemputan yang ditugaskan. Konfirmasi penjualan dibatasi ke organisasi akun MITRA; pelanggan tidak dapat mengubah berat, tarif, status final, atau kas.
- Gunakan hash password, validasi input, parameterized query, pembatasan file bukti dan otorisasi unduh bukti. Nomor rekening jangan dibuka ke mitra.
- id_setoran pada penjemputan UNIQUE. Detail UNIQUE per induk+jenis. Kas pelunasan dan pencairan masing-masing memiliki filtered unique reference.
- Jangan memakai Math.random atau timestamp sebagai satu-satunya jaminan keunikan ID transaksi. PK database dan constraint adalah sumber keunikan.
- Request ulang finalisasi/konfirmasi bayar tidak menghasilkan efek ganda.
- Slot penuh ditolak atomik. Penjualan tidak boleh mengirim melebihi stok. Simultaneous cashout tidak boleh memakai saldo poin/cadangan yang sama.
- Kas pembayaran dan status DIBAYAR berubah dalam satu transaksi setelah pembayaran eksternal dikonfirmasi. Jangan mencoba “atomic transfer bank” karena tidak ada integrasi bank.
- Persen alokasi hanya pada penerimaan penjualan; total alokasi tepat sama dengan penerimaan setelah pembulatan. Jangan mencatat tiga alokasi sebagai tiga penerimaan baru.
- Pengeluaran cadangan tidak boleh menghabiskan dana yang sudah dipesan pencairan aktif.
- Pencairan pelanggan boleh dibatalkan hanya sebelum DIPROSES. Setelah DIPROSES, pengelola menyelesaikan setelah kepastian hasil transfer.
- Aktivitas fisik dan status harus sesuai: stok hanya setelah tiba; retur hanya setelah kembali; selesai penjualan sesudah pelunasan dan penanganan penolakan.
- Kategori pelanggan dan organisasi akun petugas dikunci setelah dirujuk transaksi; pemindahan organisasi menggunakan akun baru atau rancangan riwayat yang disepakati.
- Tidak ada refund/poin koreksi bebas atau pembatalan transaksi final dari CRUD umum.

## Keluaran proyek yang harus bisa diperiksa

Sesuaikan folder dengan repository, jangan membuat duplikat bila sudah ada:
- docs/scope.md dan kebutuhan/aturan bisnis.
- docs/erd.md, kamus data, serta PDM/migrasi SQL Server.
- BPMN berupa format yang benar jika tooling tersedia; jika hanya uraian alur, beri nama yang jujur.
- docs/api-contract.md atau spesifikasi API setara.
- Backend dan frontend yang terhubung.
- Seed demo untuk tiga kategori pelanggan, pengelola, petugas mitra, empat material, satu drop point.
- .env.example tanpa secret, README setup dan perintah menjalankan/migrasi/build.
- docs/acceptance.md, hasil verifikasi, serta skenario presentasi.
- Catatan keterbatasan yang benar-benar masih ada; jangan menyebut tes/build lolos bila belum dijalankan.

## Acuan bisnis lengkap

Bagian berikut adalah isi bisnis yang sama dengan dokumen Word final. Jika menemukan konflik teknis, jelaskan temuannya dan usulkan perbaikan minimum tanpa mengubah tujuan layanan.

## Finalisasi Rancangan Bisnis Pilahin

Versi 1.0 | 12 Oktober 2026

Dokumen ini menjadi acuan bersama Zafrans, Perdi, Rifqi, dan Syauqi untuk menyusun proposal, prototype, database, serta aplikasi Pilahin dalam lima hari. Scope mencakup tiga peran login, empat master, delapan tabel transaksi, dan empat kelompok laporan. Identitas penyetor dicatat sebelum material digabung, poin ditukar menjadi uang, dan pengangkutan serta pengolahan dilakukan oleh satu organisasi mitra.

## 1 Identitas dan arah proyek

**Nama:** Pilahin.

**Deskripsi:** Aplikasi yang membantu rumah tangga, UMKM kuliner, dan pedagang pasar menyalurkan sampah anorganik yang memenuhi ketentuan melalui antar sendiri atau penjemputan. Sampah ditimbang, dicatat, dikumpulkan di drop point, dan dijual kepada mitra pengolah. Pelanggan memperoleh poin dari berat yang diterima dan dapat mengajukan pencairan poin menjadi uang.

**Tema:** Sustainability dengan fokus pengelolaan sampah anorganik dan penyaluran material kepada mitra pengolah.

**Batas waktu pengerjaan:** lima hari, empat anggota tim.

**Arah keberlanjutan:** membantu pemilahan awal, pencatatan material dari tiga sumber, pengumpulan, dan penyaluran ke mitra pengolah. Berat diterima mitra tidak otomatis membuktikan seluruh material sudah didaur ulang. MVP tidak menghitung pengurangan emisi atau hasil pengolahan yang tidak mempunyai bukti.

### Keputusan scope dan parameter layanan

| Bagian | Ketentuan |
|---|---|
| Pengguna sistem | PELANGGAN, PENGELOLA, MITRA. Kurir menggunakan akun petugas dengan peran MITRA. |
| Sumber pelanggan | Rumah tangga, UMKM kuliner, pedagang pasar; satu kelompok stakeholder pelanggan dengan tiga kategori profil. |
| Cara setor | Antar sendiri atau dijemput pada slot tersedia. |
| Material | Plastik, kardus, kaca, dan logam sesuai ketentuan penerimaan. |
| Lokasi dan layanan | Satu kawasan, satu drop point, dan satu organisasi mitra pada MVP. |
| Imbalan | Poin berdasarkan berat diterima; pencairan uang melalui transfer bank manual oleh pengelola. |
| Pembagian dana | 40% cadangan poin, 10% komunitas penyedia area drop point, 50% operasional. Alokasi komunitas belum dibayarkan sebelum penerimanya jelas. |
| Pembatasan transaksi | Satu pelunasan per penjualan; satu retur per detail; tidak ada koreksi poin/stok bebas. |
| Parameter operasional | Tarif poin/kg, nilai rupiah/poin, potongan jemput, minimal pencairan, kapasitas slot, waktu pencairan, dan modal cadangan awal ditetapkan sebelum operasional. |

Komunitas bukan peran login dan tidak wajib menjadi organisasi baru. Komunitas dapat berupa paguyuban atau pihak yang menyediakan area drop point. Jika tidak ada pihak tersebut, skema alokasi 10% harus ditinjau ulang; dana tidak otomatis dialihkan ke pos lain.

## 2 Proses bisnis

Pengelola Pilahin bekerja sama dengan satu organisasi mitra yang menjalankan pengangkutan sekaligus pengolahan sampah. Sebelum layanan dibuka, pengelola dan mitra menetapkan kawasan layanan, lokasi drop point, material yang diterima, ketentuan pemilahan, jadwal serta kapasitas penjemputan, dan dasar penilaian material. Pengelola juga menetapkan tarif poin per kilogram, nilai konversi poin menjadi uang, potongan poin untuk penjemputan, serta ketentuan pencairan yang harus dapat dibaca pelanggan.

Pelanggan dari rumah tangga, UMKM kuliner, atau pedagang pasar membuat akun dan memilih kategori sumbernya. Ketiga kategori dicatat terpisah dalam data dan laporan, tetapi menggunakan alur layanan yang sama. Pelanggan mengisi identitas, kontak, alamat, dan nama usaha bila relevan. Sampah yang disiapkan berupa plastik, kardus, kaca, atau logam yang memenuhi ketentuan. Pemisahan minimum dari sisa makanan dan sampah organik diperlukan; layanan MVP ini tidak menerima semua sampah campuran.

Pelanggan dapat mengantar sampah sendiri atau meminta penjemputan. Untuk antar sendiri, pelanggan melihat alamat, jam operasional, dan lokasi drop point lalu membawa material ke tempat tersebut. Tidak diperlukan transaksi pemesanan antar sendiri; setoran dibuat pengelola ketika pelanggan datang. Untuk penjemputan, pelanggan memilih slot yang masih tersedia, mengisi alamat, petunjuk lokasi, dan perkiraan material. Pengelola memeriksa permintaan serta menugaskan mitra. Jadwal hanya dapat dipilih dari slot yang dibuka, bukan waktu bebas tanpa memperhitungkan kapasitas.

Kurir merupakan petugas dari organisasi mitra dan menggunakan akun pribadi dengan peran MITRA. Pengelola menugaskan petugas melalui aplikasi. Petugas hanya melihat tugas yang menjadi tanggung jawabnya, memperbarui status, dan mencatat hasil penjemputan beserta bukti. Status pengambilan gagal hanya berlaku pada metode dijemput, misalnya pelanggan tidak dapat dihubungi, material belum siap, alamat tidak dapat diakses, atau kendaraan bermasalah. Antar sendiri menggunakan hasil pemeriksaan material, bukan status pengambilan gagal. Penjadwalan ulang menghasilkan permintaan pengganti yang terhubung dengan permintaan awal.

Setiap penyetoran mempunyai kode setoran yang terhubung dengan pelanggan. Pada antar sendiri, pengelola mengidentifikasi akun pelanggan dan membuat setoran ketika pelanggan datang. Pada penjemputan, sistem membuat setoran berstatus DRAFT bersamaan dengan permintaan, sehingga nomor setoran sudah tersedia untuk label kantong atau wadah. Bila belum ditimbang, material tiap pelanggan harus tetap terpisah dan berlabel; label tulisan tangan cukup untuk MVP.

Sampah antar sendiri ditimbang dan dicatat pengelola di drop point. Pada penjemputan, petugas mitra yang ditugaskan mencatat berat aktual diterima dan ditolak per material beserta foto, lalu mengajukan hasil untuk verifikasi pengelola. Identitas petugas pencatat tersimpan melalui akun yang login. Perkiraan berat yang ditulis pelanggan bukan dasar perolehan poin. Jika seluruh material ditolak, tidak ada poin yang diberikan. Apabila belum ada penimbangan aktual yang dapat dikonfirmasi saat penjemputan, perolehan poin menunggu penimbangan di drop point.

Setoran yang telah diperiksa difinalisasi oleh pengelola. Sistem menghitung poin dari berat material yang diterima dan tarif poin/kg saat transaksi. Pelanggan yang mengantar sendiri menerima poin tanpa potongan layanan jemput, sedangkan pelanggan yang dijemput menerima poin setelah potongan yang telah diinformasikan sebelum pemesanan. Poin tidak boleh masuk dua kali akibat tombol finalisasi ditekan berulang. Potongan poin merupakan mekanisme biaya layanan dalam model ini; potongan itu tidak dengan sendirinya membayar uang kepada kurir. Biaya nyata mitra/kurir harus mempunyai kesepakatan dan dicatat sebagai pengeluaran jika dibayarkan.

Material yang dijemput dibawa ke satu drop point yang melayani ketiga sumber pelanggan. Material boleh digabung hanya setelah identitas penyetor dan hasil timbang masing-masing tercatat. Penyimpanan dibedakan berdasarkan plastik, kardus, kaca, dan logam; bukan satu tumpukan campuran. Riwayat asal penyetor tetap tersedia walaupun material sejenis sudah digabung. Pengelola mengonfirmasi kedatangan fisik sebelum material dihitung sebagai stok yang tersedia di titik tersebut. Penimbangan atau serah terima ulang tidak menambah poin pelanggan lagi. Bila ada selisih, material ditandai untuk diperiksa dan belum dimasukkan ke stok tersedia sampai jumlah fisiknya disepakati. MVP tidak menyediakan penyesuaian stok atau pemotongan poin bebas setelah transaksi final.

Ketika jumlah material memenuhi kesepakatan pengambilan atau pembelian mitra, pengelola membuat transaksi penjualan. Tidak ditetapkan bahwa seluruh penjualan wajib mencapai tonase tertentu; batas minimum mengikuti kesepakatan mitra. Material dikirim atau diambil dari drop point, lalu petugas mitra menggunakan akun MITRA untuk mengonfirmasi berat yang diterima maupun ditolak pada transaksi penjualan milik organisasinya. Nilai penjualan dihitung dari berat yang diterima dan harga per jenis material yang disepakati. Material ditolak tidak otomatis kembali menjadi stok; penambahan stok hanya dilakukan ketika retur benar-benar diterima kembali di drop point.

Pelanggan tidak membayar biaya jemput di muka dan tidak menerima pembayaran langsung dari mitra dalam model ini. Mitra membayar hasil pembelian material terkumpul kepada pengelola di luar aplikasi; pengelola membayar pelanggan ketika poin dicairkan. Pada MVP, satu penjualan diselesaikan melalui satu pelunasan. Pengelola mencatat penerimaan uang yang sudah dikonfirmasi beserta bukti atau kuitansi. Sistem menampilkan pembagian uang tersebut menjadi cadangan pencairan poin 40%, bagian komunitas 10%, dan dana operasional 50%. Pembagian ini merupakan alokasi dana. Pembayaran kepada komunitas, pelanggan, atau pihak operasional baru menjadi pengeluaran setelah uang benar-benar dibayarkan dan dicatat. Bagian operasional bukan otomatis laba bersih.

Pelanggan dapat mengajukan pencairan poin dengan memilih jumlah poin dan mengisi rekening tujuan. Sistem memeriksa saldo, batas minimal, nilai konversi saat pengajuan, dan dana cadangan yang masih tersedia setelah memperhitungkan pengajuan lain yang aktif. Jika pengajuan diterima, poin tersebut tidak dapat digunakan untuk permintaan lain selama proses berlangsung. Pengelola memeriksa permintaan, mentransfer uang secara manual, dan mencatat bukti pembayaran. Sistem mengubah status menjadi dibayar serta mencatat pengeluaran kas dalam satu proses database. Pengajuan yang ditolak atau dibatalkan sebelum dibayar melepaskan kembali poin yang dicadangkan. Bila status transfer belum pasti, pengelola memeriksanya sebelum melakukan transfer ulang atau membatalkan permintaan.

Pengelola memantau penyetoran, penjemputan, stok dan penjualan, serta poin dan keuangan melalui empat kelompok laporan. Pelanggan hanya dapat melihat profil, permintaan, setoran, saldo, dan pencairan miliknya. Komunitas penyedia area drop point, apabila ada, memperoleh rekap bagiannya dari pengelola tanpa akun tersendiri. Dengan alur ini, aplikasi berfungsi sebagai pencatatan dan penghubung operasional; pengangkutan, penimbangan, pengolahan, dan transfer uang tetap merupakan kegiatan fisik atau eksternal.

## 3 Rumusan masalah

Rumusan berikut merupakan masalah desain yang dituju, belum merupakan kesimpulan survei lapangan.

1. Bagaimana menyediakan cara penyaluran sampah anorganik yang dapat digunakan rumah tangga, UMKM kuliner, dan pedagang pasar sesuai kemampuan mereka untuk mengantar atau menunggu penjemputan?
2. Bagaimana mengatur permintaan dan kapasitas penjemputan serta menampilkan status pelaksanaan yang dapat ditelusuri pelanggan dan pengelola?
3. Bagaimana mencatat berat material yang diterima maupun ditolak dan menghitung poin secara transparan berdasarkan hasil timbang aktual?
4. Bagaimana memantau material yang terkumpul, penjualan kepada mitra, dan material yang ditolak atau dikembalikan agar catatan sesuai pergerakan fisik?
5. Bagaimana memfasilitasi penukaran poin menjadi uang dengan pencatatan pengajuan, pemrosesan, dan bukti pembayaran?
6. Bagaimana mencatat penerimaan dan penggunaan dana serta menyediakan laporan operasional dari ketiga sumber pelanggan?

## 4 Tujuan

Urutan tujuan menjawab rumusan masalah dengan nomor yang sama.

1. Menyediakan pilihan antar sendiri dan penjemputan untuk pelanggan rumah tangga, UMKM kuliner, dan pedagang pasar.
2. Menyediakan slot berkapasitas, pencatatan permintaan, penugasan mitra oleh pengelola, serta riwayat status penjemputan.
3. Menyediakan pencatatan timbang per jenis material, bukti penerimaan/penolakan, dan perhitungan poin beserta potongan layanan.
4. Menyediakan informasi stok berdasarkan penerimaan fisik, pengiriman penjualan, dan retur yang telah kembali.
5. Menyediakan pengajuan pencairan poin menjadi uang, pemeriksaan saldo, pengelolaan status, dan pencatatan bukti transfer.
6. Menyediakan pencatatan uang masuk–keluar dan empat kelompok laporan yang dapat difilter sesuai periode serta kategori sumber pelanggan yang relevan.

## 5 Stakeholder dan kebutuhan

| Stakeholder | Kebutuhan | Fitur atau dukungan |
|---|---|---|
| Pelanggan | Rumah tangga, UMKM kuliner, dan pedagang pasar membutuhkan cara setor, hasil timbang yang dapat ditelusuri, serta pencairan imbalan | Registrasi kategori sumber; profil; panduan material; lokasi drop point; permintaan jemput; riwayat setoran; saldo poin; pencairan |
| Pengelola Pilahin | Mengatur layanan dan petugas, memverifikasi hasil timbang, mengelola material serta dana | Master; slot; penugasan; timbang antar sendiri; verifikasi setoran; kedatangan material; penjualan; kas; pencairan; laporan |
| Mitra | Mengetahui tugas dan lokasi, mencatat pengambilan/timbang, serta mengonfirmasi material yang diterima organisasi | Login petugas; daftar tugas; status jemput; formulir hasil timbang dan bukti; konfirmasi penerimaan penjualan |
| Komunitas penyedia area bila ada | Mengetahui alokasi dan pembayaran atas kontribusi penyediaan area drop point | Rekap dari pengelola dan bukti pembayaran; tanpa login |

Pelanggan merupakan satu stakeholder utama karena hak akses dan kebutuhan intinya sama. Tiga kategori sumber tetap disimpan untuk profil dan laporan. Kurir dan pengolah merupakan personel mitra, bukan peran login terpisah.

## 6 Aktor dan hak akses

Tiga peran login adalah PELANGGAN, PENGELOLA, dan MITRA. Setiap petugas mitra mempunyai akun sendiri yang terhubung dengan organisasi melalui id_mitra. Akun bersama tidak digunakan untuk mencatat aktivitas petugas.

| Aktivitas | Pelanggan | Pengelola | Mitra |
|---|---|---|---|
| Registrasi | Mendaftar sendiri | Akun awal melalui setup | Akun dibuat pengelola |
| Login dan profil | Ya | Ya | Ya |
| Master dan konfigurasi | Lihat informasi layanan | Kelola sesuai kebutuhan | Lihat informasi yang relevan |
| Permintaan jemput | Ajukan dan lihat milik sendiri | Konfirmasi, pilih slot dan petugas | Lihat tugas yang ditugaskan; perbarui pelaksanaan |
| Hasil timbang | Lihat setoran sendiri | Catat antar sendiri; periksa hasil mitra; finalisasi | Catat dan ajukan hasil timbang pada tugas sendiri |
| Kedatangan drop point | Lihat status terkait | Konfirmasi kedatangan dan selisih | Lihat status tugas terkait |
| Penjualan | Tidak | Buat, kirim, catat retur serta pelunasan | Konfirmasi berat diterima/ditolak untuk organisasi sendiri |
| Pencairan | Ajukan dan lihat milik sendiri | Periksa dan catat pembayaran | Tidak |
| Kas dan laporan keseluruhan | Tidak | Ya | Hanya data transaksi organisasinya yang diperlukan |

Akun pelanggan memiliki jenis_pelanggan dan tidak memiliki id_mitra. Akun MITRA wajib mempunyai id_mitra dan tidak memiliki jenis_pelanggan. Akun PENGELOLA tidak memerlukan keduanya. Password disimpan sebagai hash. Pendaftaran publik tidak boleh menentukan peran MITRA/PENGELOLA. API memeriksa peran, organisasi, penugasan, dan kepemilikan data; pembatasan tidak hanya dilakukan di layar.

## 7 Scope MVP

### Termasuk
- Tiga sumber pelanggan dengan alur layanan yang sama.
- Satu kawasan, satu drop point, satu mitra operasional pada demo.
- Empat kategori material dan ketentuan penerimaannya.
- Antar sendiri dan penjemputan dengan slot terbatas.
- Tiga peran login; pengelolaan master, jadwal, penugasan, timbang, verifikasi, bukti, dan status.
- Perhitungan poin, potongan jemput, saldo, serta pengajuan pencairan uang.
- Konfirmasi kedatangan material, stok, penjualan, penerimaan/penolakan mitra, dan retur sederhana.
- Satu pelunasan per penjualan; pencatatan kas serta pembagian dana.
- Empat kelompok laporan.
- Lokasi drop point dan tautan navigasi. Peta interaktif tertanam hanya jika waktu integrasi mencukupi.

### Tidak termasuk pada versi lima hari
- Sampah organik, sampah campuran makanan, limbah berbahaya, dan elektronik.
- Marketplace penawaran sampah, merchant, merchandise, donasi, atau katalog hadiah.
- Pelacakan kendaraan langsung, penugasan kurir otomatis, atau optimasi rute.
- Pencairan otomatis melalui payment gateway atau e-wallet.
- Banyak wilayah, banyak cabang, jadwal bebas, cicilan pembayaran, serta retur bertahap.
- Penyesuaian saldo/stok bebas, akuntansi lengkap, dan penghitungan laba bersih.
- Klaim emisi atau hasil pengolahan yang belum diukur.

## 8 Master 4 tabel

Nama tabel berikut menjadi acuan master untuk database, API, dan antarmuka.

| Tabel | Fungsi | Atribut |
|---|---|---|
| m_pengguna | Akun dan profil | id_pengguna (PK), nama, email, password_hash, no_hp, peran, jenis_pelanggan, id_mitra (FK opsional), nama_usaha, alamat, aktif, dibuat_pada |
| m_mitra | Organisasi pengangkut sekaligus pengolah | id_mitra (PK), nama_mitra, nama_penanggung_jawab, no_hp, alamat_fasilitas, aktif |
| m_drop_point | Lokasi pengumpulan | id_drop_point (PK), nama_drop_point, alamat, latitude, longitude, jam_operasional, nama_komunitas, kontak_komunitas, aktif |
| m_jenis_sampah | Material dan tarif poin | id_jenis_sampah (PK), nama_jenis, ketentuan, poin_per_kg, aktif |

Master yang telah dirujuk transaksi dinonaktifkan, bukan dihapus. Perubahan tarif poin berlaku untuk transaksi baru. Konfigurasi nilai rupiah/poin, minimal pencairan, potongan jemput, dan pembagian dana belum dibuatkan tabel/menu master khusus; nilai yang berlaku saat kejadian disimpan sebagai snapshot pada transaksi yang relevan.

## 9 Transaksi dan rancangan data

Delapan tabel transaksi berikut digunakan bersama empat master. Setoran menjadi catatan induk identitas penyetor. Permintaan jemput merupakan perluasan setoran khusus metode dijemput. Kode publik untuk label diturunkan dari ID, misalnya STR-000123; kode tersebut bukan bukti otorisasi.

### Daftar tabel dan atribut

| Tabel | Fungsi |
|---|---|
| t_slot_jemput | Waktu dan kapasitas layanan pada satu kawasan MVP |
| t_penjemputan | Permintaan serta penugasan petugas untuk sebuah setoran |
| t_setoran | Identitas pemilik material dan status penyetoran |
| t_detail_setoran | Material, berat, dan tarif poin saat setoran |
| t_pencairan_poin | Pengajuan penukaran poin menjadi uang |
| t_penjualan | Penjualan material terkumpul kepada organisasi mitra |
| t_detail_penjualan | Material, harga, penerimaan, dan retur per penjualan |
| t_mutasi_kas | Uang masuk dan keluar yang sudah terkonfirmasi |

**t_slot_jemput.** id_slot (PK), mulai_pada, selesai_pada, kapasitas, aktif. Slot berlaku pada kawasan dengan satu drop point dalam scope MVP; tidak menyimpan FK titik tambahan.

**t_penjemputan.** id_penjemputan (PK), id_setoran (FK dan UNIQUE), id_slot (FK), id_petugas_mitra (FK ke m_pengguna, boleh kosong sebelum ditugaskan), alamat_jemput, petunjuk_lokasi, catatan_perkiraan, potongan_persen_disepakati, status, alasan_gagal, waktu_pengambilan, id_penjemputan_awal (FK opsional), dibuat_pada. Pelanggan dan titik tujuan dibaca dari setoran; organisasi mitra dibaca dari akun petugas.

**t_setoran.** id_setoran (PK), id_pelanggan (FK), id_drop_point (FK), status, waktu_timbang, foto_bukti, status_terima_drop_point, waktu_terima_drop_point, catatan_serah_terima, dibuat_oleh (FK), dicatat_oleh (FK opsional), diverifikasi_oleh (FK opsional), waktu_verifikasi, catatan_verifikasi, diterima_oleh (FK opsional), dibuat_pada. Kolom kejadian yang belum terjadi boleh kosong. Metode dijemput ditentukan oleh keberadaan t_penjemputan; tidak menyimpan id_penjemputan atau metode duplikat pada induk.

**t_detail_setoran.** id_detail_setoran (PK), id_setoran (FK), id_jenis_sampah (FK), berat_diterima_kg, berat_ditolak_kg, alasan_penolakan, poin_per_kg_snapshot, berat_masuk_drop_point_kg (kosong sebelum kedatangan). Satu baris per jenis sampah dalam setoran.

**t_pencairan_poin.** id_pencairan (PK), id_pelanggan (FK), jumlah_poin, nilai_rupiah_per_poin_snapshot, nama_bank, nomor_rekening, nama_pemilik_rekening, status, diajukan_pada, diproses_oleh (FK opsional), diproses_pada, alasan_penolakan.

**t_penjualan.** id_penjualan (PK), id_drop_point (FK), id_mitra (FK), tanggal_penjualan, waktu_pengiriman, dikonfirmasi_oleh (FK opsional), waktu_terima_mitra, status, catatan, dibuat_oleh (FK). Mitra tujuan adalah pihak pembeli; dikonfirmasi_oleh adalah jejak akun yang mengonfirmasi penerimaan.

**t_detail_penjualan.** id_detail_penjualan (PK), id_penjualan (FK), id_jenis_sampah (FK), berat_dikirim_kg, berat_diterima_kg, berat_ditolak_kg, harga_per_kg_snapshot, alasan_penolakan, catatan_selisih_timbang, berat_retur_kembali_kg, waktu_retur_kembali. Berat penerimaan boleh kosong sebelum konfirmasi mitra; nol tidak digunakan untuk menyatakan belum diketahui.

**t_mutasi_kas.** id_mutasi_kas (PK), jenis_mutasi, pos_dana, jumlah_rupiah, id_penjualan (FK opsional), id_pencairan (FK opsional), metode, pihak_terkait, bukti, keterangan, persen_cadangan_snapshot, persen_komunitas_snapshot, waktu_transaksi, dicatat_oleh (FK). Persen operasional dihitung sebagai sisa 100 persen. Persentase hanya diisi pada penerimaan hasil penjualan. id_penjualan dan id_pencairan tidak boleh terisi bersamaan.

### Hubungan dan ketentuan PDM

- m_mitra mempunyai banyak akun m_pengguna dengan peran MITRA.
- m_pengguna sebagai pelanggan mempunyai banyak setoran dan pencairan.
- m_drop_point mempunyai banyak setoran dan penjualan.
- t_setoran mempunyai nol atau satu t_penjemputan. Setoran antar sendiri tidak mempunyai permintaan jemput.
- t_slot_jemput mempunyai banyak permintaan; satu permintaan menunjuk satu slot.
- t_setoran mempunyai banyak t_detail_setoran; t_penjualan mempunyai banyak t_detail_penjualan.
- m_jenis_sampah dirujuk oleh kedua tabel detail.
- t_penjualan mempunyai paling banyak satu penerimaan pelunasan pada t_mutasi_kas.
- t_pencairan_poin mempunyai paling banyak satu pengeluaran pembayaran pada t_mutasi_kas.
- FK petugas, pencatat, pemverifikasi, serta penerima mengacu ke m_pengguna sesuai peran dan penugasan.
- Pembuatan setoran DRAFT dan permintaan jemput dilakukan atomik agar tidak meninggalkan setoran antar sendiri palsu.
- Permintaan pengganti dibuat dengan setoran DRAFT baru, hanya jika permintaan sebelumnya gagal tanpa material diterima. Setoran lama dibatalkan tanpa poin.

### Perhitungan tanpa tabel saldo tambahan

Poin detail dihitung dari berat diterima dikalikan tarif poin/kg snapshot, dibulatkan ke bawah. Poin kotor adalah jumlah poin detail. Potongan jemput dihitung dari poin kotor dikalikan persen yang disepakati pada permintaan, dibulatkan ke bawah. Antar sendiri memiliki potongan nol. Poin bersih adalah poin kotor dikurangi potongan.

Saldo poin tersedia adalah seluruh poin bersih setoran FINAL dikurangi jumlah poin pencairan DIAJUKAN, DIPROSES, atau DIBAYAR. Pencairan DITOLAK/DIBATALKAN tidak ikut mengurangi saldo. Nilai uang pencairan dihitung dari jumlah poin dikalikan nilai rupiah/poin snapshot.

Stok tersedia adalah berat masuk drop point pada setoran FINAL dan DITERIMA, dikurangi berat pengiriman penjualan yang sudah dikirim, ditambah retur yang telah benar-benar kembali. Status SELISIH belum masuk stok tersedia. Poin pelanggan tidak otomatis dikurangi karena selisih kedatangan.

Nilai penjualan adalah jumlah berat diterima mitra dikalikan harga/kg snapshot per detail. Penerimaan belum terkonfirmasi belum mempunyai nilai tagihan final. Kas menggunakan angka positif untuk masuk dan negatif untuk keluar.

Penerimaan penjualan dicatat satu kali pada pos HASIL_PENJUALAN. Cadangan dan bagian komunitas dihitung dari persentase snapshot; operasional merupakan sisanya setelah pembulatan agar jumlah tepat sama dengan uang masuk. Modal awal dan pengeluaran dicatat pada pos CADANGAN_POIN, KOMUNITAS, atau OPERASIONAL. Jangan memasukkan tiga alokasi sebagai tiga penerimaan tambahan.

Bukti pembayaran pelanggan disimpan pada kas yang terhubung ke pencairan; bukti pelunasan mitra pada kas yang terhubung ke penjualan. Saldo cadangan yang dapat dipesan dikurangi nominal pencairan DIAJUKAN/DIPROSES. Pembayaran nyata, perubahan status DIBAYAR, dan pencatatan kas dilakukan atomik setelah transfer dikonfirmasi.

### Normalisasi dan validasi desain

Rancangan menghindari pengulangan identitas pelanggan/titik pada permintaan jemput, menghubungkan petugas melalui akun, memisahkan header dan detail, serta menghitung total dan saldo dari fakta transaksi. Tarif dan rekening snapshot menyimpan fakta historis pada kejadian yang berbeda dari profil/master saat ini.

PDM tetap harus mencantumkan functional dependency, candidate key, PK/FK, nullable, CHECK, dan indeks unik per tabel sebelum dinyatakan memenuhi 3NF. Ketergantungan bersyarat pada kas dan referensi audit juga harus diperiksa, bukan hanya jumlah tabel. Nama 12 tabel adalah baseline scope; perubahan struktur hanya dilakukan bila ada alasan integritas atau kebutuhan bisnis yang dijelaskan dan diselaraskan dengan dokumen.

Tipe data acuan SQL Server: INT IDENTITY untuk PK; INT untuk FK; NVARCHAR untuk nama/alamat; DECIMAL(12,3) untuk berat; BIGINT untuk poin; DECIMAL(18,2) untuk uang; DECIMAL(5,2) untuk persen; DATETIME2 untuk waktu; BIT untuk aktif. Nomor telepon/rekening berupa teks. Waktu disimpan dengan konvensi UTC dan ditampilkan dalam zona lokasi layanan.

## 10 Laporan 4 kelompok

| Nama laporan | Informasi utama | Sumber tabel |
|---|---|---|
| Laporan penyetoran | Periode, pelanggan, kategori sumber, metode setor, jenis material, berat diterima/ditolak, poin | m_pengguna, m_jenis_sampah, t_setoran, t_detail_setoran, t_penjemputan untuk potongan jemput |
| Laporan penjemputan | Slot, alamat, pelanggan, mitra, petugas, status, alasan gagal, permintaan pengganti | m_pengguna, m_mitra, t_slot_jemput, t_penjemputan, t_setoran |
| Laporan stok dan penjualan | Stok per material, berat dikirim/diterima/ditolak/retur, nilai penjualan dan pelunasan | m_drop_point, m_jenis_sampah, m_mitra, t_setoran, t_detail_setoran, t_penjualan, t_detail_penjualan, t_mutasi_kas |
| Laporan poin dan keuangan | Poin diperoleh/tersedia/dipesan/dicairkan, pengajuan pencairan, penerimaan, alokasi, pengeluaran, saldo kas dan dana tersedia | m_pengguna, t_setoran, t_detail_setoran, t_penjemputan, t_pencairan_poin, t_mutasi_kas |

Laporan dapat terdiri dari tab, query, atau view; empat kelompok laporan tidak berarti persis empat view SQL. Data laporan tidak disalin menjadi tabel permanen baru. Saldo dan total harus dihitung dengan agregasi yang benar; jangan menggandakan nominal header ketika bergabung dengan banyak detail. Pada MVP kategori pelanggan dikunci setelah memiliki transaksi agar pelaporan sumber tidak berubah tanpa rancangan riwayat.

## 11 Fitur dan tabel yang digunakan

| Fitur | Pengguna | Tabel |
|---|---|---|
| Registrasi dan profil pelanggan | Pelanggan | m_pengguna |
| Login tiga peran dan akun petugas | Semua peran; pengelola membuat akun mitra | m_pengguna, m_mitra |
| Mitra dan drop point | Pengelola; informasi publik untuk pelanggan | m_mitra, m_drop_point |
| Panduan dan tarif material | Pelanggan melihat; pengelola mengelola | m_jenis_sampah |
| Membuat slot serta kapasitas | Pengelola | t_slot_jemput, t_penjemputan |
| Permintaan jemput dan label setoran | Pelanggan | t_setoran, t_penjemputan, t_slot_jemput |
| Penugasan dan pelaksanaan jemput | Pengelola menugaskan; mitra melaksanakan | m_pengguna, m_mitra, t_penjemputan, t_setoran |
| Timbang antar sendiri | Pengelola | m_pengguna, m_jenis_sampah, t_setoran, t_detail_setoran |
| Timbang penjemputan dan bukti | Mitra pada tugas sendiri | t_penjemputan, t_setoran, t_detail_setoran, m_jenis_sampah |
| Verifikasi dan finalisasi setoran | Pengelola | t_setoran, t_detail_setoran, t_penjemputan |
| Konfirmasi kedatangan material | Pengelola | t_setoran, t_detail_setoran |
| Riwayat dan saldo poin sendiri | Pelanggan | t_setoran, t_detail_setoran, t_penjemputan, t_pencairan_poin |
| Pengajuan pencairan | Pelanggan | Tabel pembentuk saldo poin, t_pencairan_poin, t_mutasi_kas |
| Pencairan dan bukti pembayaran | Pengelola | t_pencairan_poin, t_mutasi_kas |
| Stok dan penjualan | Pengelola | Tabel setoran/detail, t_penjualan, t_detail_penjualan, m_jenis_sampah, m_mitra |
| Konfirmasi penerimaan penjualan | Mitra organisasi terkait | t_penjualan, t_detail_penjualan, m_pengguna |
| Penerimaan pelunasan dan pengeluaran | Pengelola | t_mutasi_kas, t_penjualan, t_detail_penjualan, t_pencairan_poin |
| Empat kelompok laporan | Pengelola | Sesuai sumber laporan |

Detail berada di formulir induk, bukan halaman CRUD terpisah. Pelanggan tidak dapat mengubah hasil timbang atau saldo. Petugas mitra tidak dapat memfinalisasi poin, mengelola kas, atau melihat rekening pencairan pelanggan.

## 12 Aturan bisnis untuk implementasi

1. Pelanggan hanya mengakses data miliknya; tiga sumber pelanggan memperoleh alur yang sama. Mitra hanya mengakses tugas yang ditugaskan dan transaksi penerimaan organisasinya. Pengelola mengelola operasional serta keuangan.
2. Material harus memenuhi ketentuan penerimaan. Berat ditolak tidak menghasilkan poin.
3. Slot hanya dapat dipesan sebelum waktu mulai, saat aktif, dan kapasitas masih tersedia. Reservasi kapasitas dilakukan atomik.
4. Permintaan dapat dibatalkan pelanggan sebelum dikonfirmasi pengelola. Setelah diproses, perubahan dilakukan pengelola berdasarkan koordinasi.
5. Penjemputan gagal menyimpan alasan; pengganti memiliki referensi ke permintaan awal.
6. Tidak ada biaya pelanggan yang dibayar di muka pada model ini. Potongan poin hanya diterapkan ketika setoran diterima dan difinalisasi.
7. Pengelola menetapkan FINAL setelah data detail dan bukti diperiksa. Mitra hanya mengajukan hasil timbang. Jika seluruh material ditolak, setoran berstatus DITOLAK dan memberikan nol poin.
8. Finalisasi tidak boleh memberi efek ganda. Setoran final dan detailnya dikunci dari CRUD umum.
9. Material yang belum tiba tidak termasuk stok drop point. Retur yang belum tiba juga tidak termasuk stok.
10. Penjualan tidak boleh mengirim melebihi stok tersedia. Pemeriksaan stok dan perubahan status kirim dilakukan dalam transaksi database.
11. Satu penjualan mempunyai satu pelunasan pada MVP. Pembayaran kas diterima hanya setelah berat/harga final disepakati dan nominal sama dengan nilai penjualan.
12. Persentase pembagian dana berjumlah 100 dan disimpan pada penerimaan penjualan; pembagian bukan bukti pengeluaran.
13. Permintaan pencairan harus memenuhi saldo poin, minimum, dan dana cadangan tersedia. Cadangan tersedia memperhitungkan pencairan DIAJUKAN/DIPROSES agar dana tidak dipesan dua kali.
14. Pengajuan dan pemeriksaan saldo harus atomik. Sesudah transfer terkonfirmasi, status DIBAYAR dan catatan kas keluar diproses atomik.
15. DITOLAK/DIBATALKAN melepaskan poin yang dipesan karena tidak lagi ikut pengurang saldo. DIBAYAR tidak boleh dibatalkan melalui alur biasa.
16. Pencairan tidak dijanjikan instan. Waktu pemrosesan dan alasan tidak dapat mengajukan harus ditampilkan sebelum pelanggan memutuskan.
17. Kas hanya mencatat transaksi nyata dengan bukti. Dana cadangan awal harus dicatat bila tersedia; alokasi 40% tidak menjamin semua poin dapat dibayar tanpa perencanaan dana dan tarif.
18. Riwayat final tidak dihapus. Unique constraint diperlukan untuk satu penjemputan per setoran, satu pelunasan per penjualan, dan satu pembayaran per pencairan. Nomor setoran harus dicantumkan pada wadah yang belum ditimbang; material berbagai pelanggan tidak digabung sebelum pencatatan selesai.

Status acuan:
- Penjemputan: DIAJUKAN, DIJADWALKAN, DALAM_PERJALANAN, SELESAI, GAGAL, DIBATALKAN.
- Setoran: DRAFT, DIAJUKAN, FINAL, DITOLAK, DIBATALKAN. Hasil mitra DIAJUKAN untuk verifikasi; pengelola dapat mengembalikan ke DRAFT dengan alasan untuk diperbaiki. Seluruh material ditolak menggunakan DITOLAK.
- Penerimaan drop point: MENUNGGU, SELISIH, DITERIMA.
- Pencairan: DIAJUKAN, DIPROSES, DIBAYAR, DITOLAK, DIBATALKAN.
- Penjualan: DRAFT, DIKIRIM, DITERIMA, SELESAI, DIBATALKAN. Pembatalan biasa hanya sebelum pengiriman; setelah dikirim selesaikan penerimaan/retur. SELESAI setelah pelunasan dan penanganan material ditolak selesai.

## 13 Rencana teknologi

Mengikuti arah stack proyek yang telah dibahas; versi paket perlu ditetapkan pada setup, bukan diasumsikan dalam dokumen bisnis.

| Bagian | Rencana |
|---|---|
| Desain | Figma untuk wireframe, desain antarmuka, dan prototype |
| Aplikasi | Ionic dengan Angular, dikemas ke Android melalui Capacitor |
| API | Node.js dengan JavaScript; REST API untuk autentikasi dan proses bisnis |
| Database | SQL Server; pengelolaan melalui SSMS |
| Lokasi | Koordinat drop point dan tautan navigasi; integrasi peta tertanam bukan syarat demo |
| Pembayaran | Transfer/tunai di luar aplikasi dengan bukti; tanpa payment gateway |
| Pengujian | Uji API, alur aplikasi, pembatasan akses, dan integritas saldo/stok |

API memegang perhitungan poin, pemeriksaan kapasitas, otorisasi, dan pencatatan pembayaran. Aplikasi tidak boleh mempercayai total, peran, atau kepemilikan data yang dikirim klien. Gambar bukti disimpan sebagai file, sedangkan database menyimpan referensinya.

## 14 Pembagian kerja dan target lima hari

Pembagian yang sudah dipilih tim:
- Zafrans dan Perdi: desain Figma dari wireframe sampai prototype.
- Rifqi dan Syauqi: database, API, BPMN, termasuk penyelarasan ERD dan PDM.
- Pengujian: bersama untuk fitur masing-masing.

**Hal yang belum mempunyai penanggung jawab eksplisit:** implementasi frontend. Desain Figma tidak otomatis menjadi aplikasi. Usulan tambahan: Zafrans/Perdi mengimplementasikan layar masing-masing setelah prototype disepakati, bila sesuai kemampuan; Rifqi/Syauqi mendampingi integrasi API. Ini usulan pembagian, bukan keputusan tim yang sudah dikonfirmasi.

| Hari | Hasil yang dituju |
|---|---|
| 1 | Scope tiga peran, aturan layanan, BPMN, wireframe, data dan kontrak API disepakati |
| 2 | Login tiga peran, master, slot, permintaan dan penugasan jemput; desain layar inti selesai |
| 3 | Penimbangan mitra/pengelola, verifikasi setoran, poin, kedatangan drop point, dan integrasi tiga peran |
| 4 | Pencairan, penjualan, kas, serta empat kelompok laporan sederhana |
| 5 | Pengujian lintas peran, perbaikan, data demo, build aplikasi, dan latihan presentasi |

Target ini merupakan rencana kerja; kelayakannya bergantung pada kemampuan frontend/backend tim dan kesiapan lingkungan. Prioritaskan satu alur lengkap yang dapat dijalankan sebelum menambah variasi tampilan.

## 15 Skenario penerimaan demo

1. Akun dari masing-masing kategori pelanggan dapat mendaftar dan hanya melihat data sendiri. Akun MITRA tidak dapat membuka tugas petugas lain, transaksi organisasi lain, atau rekening pelanggan.
2. Antar sendiri dengan dua material menghasilkan rincian timbang dan poin tanpa potongan jemput.
3. Penjemputan menghasilkan kode setoran DRAFT, memakai slot tersedia, ditugaskan ke akun mitra, ditimbang dan diajukan mitra, lalu diverifikasi pengelola sebelum poin muncul.
4. Slot penuh tidak dapat dipesan; penjemputan gagal menyimpan alasan dan belum memberi poin.
5. Menekan finalisasi berulang tidak menggandakan hasil. Material ditolak tidak menambah poin.
6. Sampah yang belum tiba belum menambah stok. Penjualan mengurangi stok ketika dikirim; retur menambah stok setelah kembali.
7. Pengajuan pencairan mengurangi saldo tersedia sekali; penolakan mengembalikannya; pembayaran tidak mengurangi poin untuk kedua kalinya.
8. Pengajuan bersamaan tidak membuat saldo poin atau dana cadangan negatif.
9. Satu pembayaran mitra tercatat sekali; alokasi berjumlah sama dengan penerimaan; pembayaran komunitas ditampilkan terpisah sebagai pengeluaran.
10. Laporan dapat menampilkan ketiga sumber pelanggan tanpa menggandakan total saat menggabungkan detail.

## 16 Kesimpulan

Pilahin difokuskan pada layanan penyaluran sampah anorganik dari rumah tangga, UMKM kuliner, dan pedagang pasar melalui antar sendiri atau penjemputan. Pengelola menjadi pusat pencatatan, mitra menangani pengangkutan dan pengolahan, sedangkan pelanggan memperoleh poin berdasarkan material yang benar-benar diterima dan dapat mengajukan pencairan uang.

Scope finalisasi bisnis menggunakan tiga peran login, empat tabel master, delapan tabel transaksi, dan empat kelompok laporan. Pelanggan merupakan satu stakeholder dengan tiga kategori sumber; komunitas merupakan stakeholder tambahan apabila menyediakan area drop point. Sebelum digunakan secara operasional, tim menetapkan parameter layanan dan dana cadangan, melengkapi PDM beserta validasi normalisasinya, serta memastikan penanggung jawab implementasi frontend. Target demo adalah alur setor sampai pencairan dan penjualan yang benar-benar dapat dijalankan.

