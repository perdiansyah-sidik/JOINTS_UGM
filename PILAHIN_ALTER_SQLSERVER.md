# Migrasi SQL Server Pilahin

**BELUM SIAP DIEKSEKUSI.** `ALTER` ini menargetkan skema `m_`/`t_` yang Rifqi kirim. Data lama dan isi database aktual belum diverifikasi; pengisian audit detail dan kas masih perlu keputusan agar riwayat tidak keliru. Uji pada salinan database setelah masalah data diselesaikan. Kolom waktu `DATETIME2` tetap dipertahankan agar presisinya tidak turun.

```sql
IF DB_ID(N'ecoapp_db') IS NULL
    THROW 51013, 'Database ecoapp_db belum ada; ALTER tidak dapat dijalankan.', 1;
USE ecoapp_db;
IF DB_NAME() <> N'ecoapp_db'
    THROW 51014, 'Database aktif bukan ecoapp_db. Migrasi dihentikan.', 1;
SET XACT_ABORT ON;

IF OBJECT_ID(N'dbo.m_pengguna', N'U') IS NULL OR OBJECT_ID(N'dbo.t_mutasi_kas', N'U') IS NULL
    THROW 51000, 'Skema lama m_/t_ tidak ditemukan.', 1;
IF OBJECT_ID(N'dbo.pengguna', N'U') IS NOT NULL OR OBJECT_ID(N'dbo.mutasi_kas', N'U') IS NOT NULL
    THROW 51001, 'Sebagian tabel baru sudah ada. Jangan jalankan migrasi dua kali.', 1;
IF EXISTS (SELECT 1 FROM dbo.m_drop_point WHERE LEN(nama_komunitas) > 20)
    THROW 51002, 'Nama komunitas lebih dari 20 karakter. Perbaiki data sebelum migrasi.', 1;
IF EXISTS (SELECT 1 FROM dbo.m_drop_point WHERE CONVERT(NVARCHAR(150), CONVERT(VARCHAR(20), nama_komunitas)) <> nama_komunitas)
    THROW 51011, 'Nama komunitas akan berubah saat dikonversi ke VARCHAR.', 1;
IF EXISTS (SELECT 1 FROM dbo.t_penjemputan WHERE id_penjemputan_awal IS NOT NULL)
    THROW 51003, 'Relasi penjemputan awal terisi. Arsipkan datanya sebelum kolom dihapus.', 1;
IF EXISTS (SELECT 1 FROM dbo.t_penjemputan WHERE petunjuk_lokasi IS NULL OR LEN(petunjuk_lokasi) > 225)
    THROW 51004, 'Petunjuk lokasi harus terisi dan maksimal 225 karakter.', 1;
IF EXISTS (SELECT 1 FROM dbo.t_detail_penjualan WHERE berat_diterima_kg IS NOT NULL)
    THROW 51005, 'Berat ditolak pada penjualan lama tidak bisa ditebak. Lengkapi data secara manual.', 1;
IF EXISTS (SELECT 1 FROM dbo.m_jenis_sampah WHERE aktif = 1 AND nama_jenis NOT IN (N'Plastik',N'Kardus',N'Kaca',N'Logam'))
    THROW 51006, 'Jenis sampah aktif di luar empat material final. Putuskan pemetaannya dulu.', 1;
IF EXISTS (SELECT 1 FROM dbo.m_jenis_sampah WHERE CONVERT(NVARCHAR(500), CONVERT(VARCHAR(500), ketentuan)) <> ketentuan)
    THROW 51012, 'Ketentuan sampah akan berubah saat dikonversi ke VARCHAR.', 1;
IF COL_LENGTH(N'dbo.m_jenis_sampah', N'estimasi_hemat_co2_per_kg') IS NOT NULL
    EXEC(N'IF EXISTS (SELECT 1 FROM dbo.m_jenis_sampah WHERE estimasi_hemat_co2_per_kg <> 0) THROW 51007, ''Nilai CO2 harus diarsipkan sebelum kolom ekstra dihapus.'', 1;');

BEGIN TRY
    BEGIN TRANSACTION;

    ALTER TABLE dbo.m_pengguna DROP CONSTRAINT ck_pengguna_peran, ck_pengguna_jenis, ck_pengguna_atribut_peran;
    EXEC sp_rename N'dbo.m_pengguna.peran', N'peran_lama', N'COLUMN';
    ALTER TABLE dbo.m_pengguna ADD peran INT NULL;
    EXEC(N'UPDATE dbo.m_pengguna SET peran = CASE WHEN peran_lama = ''PELANGGAN'' AND jenis_pelanggan = ''RUMAH_TANGGA'' THEN 1 WHEN peran_lama = ''PELANGGAN'' AND jenis_pelanggan = ''UMKM_KULINER'' THEN 2 WHEN peran_lama = ''PELANGGAN'' AND jenis_pelanggan = ''PEDAGANG_PASAR'' THEN 3 WHEN peran_lama = ''PENGELOLA'' THEN 4 WHEN peran_lama = ''MITRA'' THEN 5 END;');
    EXEC(N'IF EXISTS (SELECT 1 FROM dbo.m_pengguna WHERE peran IS NULL) THROW 51008, ''Ada peran pengguna yang tidak bisa dipetakan.'', 1;');
    ALTER TABLE dbo.m_pengguna DROP COLUMN peran_lama, jenis_pelanggan;
    ALTER TABLE dbo.m_pengguna ALTER COLUMN peran INT NOT NULL;
    ALTER TABLE dbo.m_pengguna ADD is_deleted INT NOT NULL CONSTRAINT df_pengguna_deleted DEFAULT 0;
    ALTER TABLE dbo.m_pengguna ADD CONSTRAINT ck_pengguna_peran_final CHECK (peran IN (1,2,3,4,5));
    ALTER TABLE dbo.m_pengguna ADD CONSTRAINT ck_pengguna_afiliasi_final CHECK
        ((peran IN (1,2,3) AND id_mitra IS NULL AND NULLIF(LTRIM(RTRIM(alamat)), N'') IS NOT NULL) OR
         (peran = 4 AND id_mitra IS NULL) OR (peran = 5 AND id_mitra IS NOT NULL));
    ALTER TABLE dbo.m_pengguna ADD CONSTRAINT ck_pengguna_deleted CHECK (is_deleted IN (0,1) AND (is_deleted = 0 OR aktif = 0));
    ALTER TABLE dbo.m_pengguna ADD CONSTRAINT ck_pengguna_audit CHECK
        ((diubah_oleh IS NULL AND diubah_pada IS NULL) OR (diubah_oleh IS NOT NULL AND diubah_pada IS NOT NULL));

    EXEC sp_rename N'dbo.m_mitra.alamat_fasilitas', N'alamat_mitra', N'COLUMN';
    ALTER TABLE dbo.m_mitra ALTER COLUMN nama_penanggung_jawab NVARCHAR(100) NULL;
    ALTER TABLE dbo.m_mitra ADD is_deleted INT NOT NULL CONSTRAINT df_mitra_deleted DEFAULT 0;
    ALTER TABLE dbo.m_mitra ADD CONSTRAINT ck_mitra_deleted CHECK (is_deleted IN (0,1) AND (is_deleted = 0 OR aktif = 0));
    ALTER TABLE dbo.m_mitra ADD CONSTRAINT ck_mitra_audit CHECK
        ((diubah_oleh IS NULL AND diubah_pada IS NULL) OR (diubah_oleh IS NOT NULL AND diubah_pada IS NOT NULL));

    ALTER TABLE dbo.m_drop_point ALTER COLUMN jam_operasional NVARCHAR(200) NOT NULL;
    ALTER TABLE dbo.m_drop_point ALTER COLUMN nama_komunitas VARCHAR(20) NULL;
    ALTER TABLE dbo.m_drop_point ADD is_deleted INT NOT NULL CONSTRAINT df_dp_deleted DEFAULT 0;
    ALTER TABLE dbo.m_drop_point ADD CONSTRAINT ck_dp_deleted CHECK (is_deleted IN (0,1) AND (is_deleted = 0 OR aktif = 0));
    ALTER TABLE dbo.m_drop_point ADD CONSTRAINT ck_dp_komunitas CHECK
        (kontak_komunitas IS NULL OR NULLIF(LTRIM(RTRIM(nama_komunitas)), '') IS NOT NULL);
    ALTER TABLE dbo.m_drop_point ADD CONSTRAINT ck_dp_audit CHECK
        ((diubah_oleh IS NULL AND diubah_pada IS NULL) OR (diubah_oleh IS NOT NULL AND diubah_pada IS NOT NULL));

    ALTER TABLE dbo.m_jenis_sampah ALTER COLUMN ketentuan VARCHAR(500) NOT NULL;
    ALTER TABLE dbo.m_jenis_sampah ADD is_deleted INT NOT NULL CONSTRAINT df_js_deleted DEFAULT 0;
    ALTER TABLE dbo.m_jenis_sampah ADD CONSTRAINT ck_js_jenis_final CHECK
        (aktif = 0 OR nama_jenis IN (N'Plastik',N'Kardus',N'Kaca',N'Logam'));
    ALTER TABLE dbo.m_jenis_sampah ADD CONSTRAINT ck_js_deleted CHECK (is_deleted IN (0,1) AND (is_deleted = 0 OR aktif = 0));
    ALTER TABLE dbo.m_jenis_sampah ADD CONSTRAINT ck_js_audit CHECK
        ((diubah_oleh IS NULL AND diubah_pada IS NULL) OR (diubah_oleh IS NOT NULL AND diubah_pada IS NOT NULL));
    IF COL_LENGTH(N'dbo.m_jenis_sampah', N'estimasi_hemat_co2_per_kg') IS NOT NULL
    BEGIN
        DECLARE @default_co2 SYSNAME;
        SELECT @default_co2 = dc.name
        FROM sys.default_constraints AS dc
        JOIN sys.columns AS c ON c.object_id = dc.parent_object_id AND c.column_id = dc.parent_column_id
        WHERE dc.parent_object_id = OBJECT_ID(N'dbo.m_jenis_sampah') AND c.name = N'estimasi_hemat_co2_per_kg';
        IF @default_co2 IS NOT NULL
            EXEC(N'ALTER TABLE dbo.m_jenis_sampah DROP CONSTRAINT ' + QUOTENAME(@default_co2));
        EXEC(N'ALTER TABLE dbo.m_jenis_sampah DROP COLUMN estimasi_hemat_co2_per_kg;');
    END;

    ALTER TABLE dbo.t_slot_jemput ADD CONSTRAINT uq_slot_waktu UNIQUE (mulai_pada, selesai_pada);

    ALTER TABLE dbo.t_setoran DROP CONSTRAINT ck_setoran_status, ck_setoran_terima,
        ck_setoran_terima_waktu, ck_setoran_final, df_setoran_terima;
    EXEC sp_rename N'dbo.t_setoran.id_pelanggan', N'id_pengguna', N'COLUMN';
    EXEC sp_rename N'dbo.t_setoran.dicatat_oleh', N'ditimbang_oleh', N'COLUMN';
    EXEC sp_rename N'dbo.t_setoran.status', N'status_lama', N'COLUMN';
    EXEC sp_rename N'dbo.t_setoran.status_terima_drop_point', N'status_dp_lama', N'COLUMN';
    ALTER TABLE dbo.t_setoran ADD status INT NULL, status_drop_point INT NULL;
    EXEC(N'UPDATE dbo.t_setoran SET status = CASE status_lama WHEN ''DRAFT'' THEN 1 WHEN ''DIAJUKAN'' THEN 2 WHEN ''FINAL'' THEN 3 WHEN ''DITOLAK'' THEN 4 WHEN ''DIBATALKAN'' THEN 5 END, status_drop_point = CASE status_dp_lama WHEN ''MENUNGGU'' THEN 1 WHEN ''SELISIH'' THEN 2 WHEN ''DITERIMA'' THEN 3 END;');
    EXEC(N'IF EXISTS (SELECT 1 FROM dbo.t_setoran WHERE status IS NULL OR status_drop_point IS NULL) THROW 51009, ''Ada status setoran yang tidak bisa dipetakan.'', 1;');
    ALTER TABLE dbo.t_setoran DROP COLUMN status_lama, status_dp_lama;
    ALTER TABLE dbo.t_setoran ALTER COLUMN status INT NOT NULL;
    ALTER TABLE dbo.t_setoran ALTER COLUMN status_drop_point INT NOT NULL;
    ALTER TABLE dbo.t_setoran ADD CONSTRAINT df_setoran_dp_final DEFAULT 1 FOR status_drop_point;
    ALTER TABLE dbo.t_setoran ADD aktif INT NOT NULL CONSTRAINT df_setoran_aktif DEFAULT 1;
    ALTER TABLE dbo.t_setoran ADD CONSTRAINT ck_setoran_aktif CHECK (aktif IN (0,1));
    ALTER TABLE dbo.t_setoran ADD CONSTRAINT ck_setoran_status_final CHECK (status IN (1,2,3,4,5));
    ALTER TABLE dbo.t_setoran ADD CONSTRAINT ck_setoran_dp_final CHECK (status_drop_point IN (1,2,3));
    ALTER TABLE dbo.t_setoran ADD CONSTRAINT ck_setoran_timbang_final CHECK
        (status NOT IN (2,3,4) OR (waktu_timbang IS NOT NULL AND ditimbang_oleh IS NOT NULL AND NULLIF(LTRIM(RTRIM(foto_bukti)), N'') IS NOT NULL));
    ALTER TABLE dbo.t_setoran ADD CONSTRAINT ck_setoran_verifikasi_final CHECK
        (status NOT IN (3,4) OR (diverifikasi_oleh IS NOT NULL AND waktu_verifikasi IS NOT NULL));
    ALTER TABLE dbo.t_setoran ADD CONSTRAINT ck_setoran_tolak_final CHECK
        (status <> 4 OR NULLIF(LTRIM(RTRIM(catatan_verifikasi)), N'') IS NOT NULL);
    ALTER TABLE dbo.t_setoran ADD CONSTRAINT ck_setoran_penerimaan_final CHECK
        (status_drop_point = 1 OR (diterima_oleh IS NOT NULL AND waktu_terima_drop_point IS NOT NULL));
    ALTER TABLE dbo.t_setoran ADD CONSTRAINT ck_setoran_selisih_final CHECK
        (status_drop_point <> 2 OR NULLIF(LTRIM(RTRIM(catatan_serah_terima)), N'') IS NOT NULL);

    ALTER TABLE dbo.t_penjemputan DROP CONSTRAINT ck_jemput_status, ck_jemput_gagal, ck_jemput_selesai, fk_jemput_awal;
    DROP INDEX ux_jemput_awal ON dbo.t_penjemputan;
    ALTER TABLE dbo.t_penjemputan DROP COLUMN id_penjemputan_awal;
    EXEC sp_rename N'dbo.t_penjemputan.id_petugas_mitra', N'id_petugas', N'COLUMN';
    ALTER TABLE dbo.t_penjemputan ALTER COLUMN petunjuk_lokasi NVARCHAR(225) NOT NULL;
    ALTER TABLE dbo.t_penjemputan ALTER COLUMN status VARCHAR(20) NOT NULL;
    ALTER TABLE dbo.t_penjemputan ADD aktif INT NOT NULL CONSTRAINT df_jemput_aktif DEFAULT 1;
    ALTER TABLE dbo.t_penjemputan ADD dibuat_oleh INT NULL;
    EXEC(N'UPDATE p SET dibuat_oleh = s.dibuat_oleh FROM dbo.t_penjemputan AS p JOIN dbo.t_setoran AS s ON s.id_setoran = p.id_setoran;');
    ALTER TABLE dbo.t_penjemputan ALTER COLUMN dibuat_oleh INT NOT NULL;
    ALTER TABLE dbo.t_penjemputan ADD CONSTRAINT fk_jemput_dibuat_final FOREIGN KEY (dibuat_oleh) REFERENCES dbo.m_pengguna(id_pengguna);
    ALTER TABLE dbo.t_penjemputan ADD CONSTRAINT ck_jemput_aktif CHECK (aktif IN (0,1));
    ALTER TABLE dbo.t_penjemputan ADD CONSTRAINT ck_jemput_status_final CHECK
        (status IN ('DIAJUKAN','DIJADWALKAN','DALAM_PERJALANAN','SELESAI','GAGAL','DIBATALKAN'));
    ALTER TABLE dbo.t_penjemputan ADD CONSTRAINT ck_jemput_petugas_final CHECK
        (status IN ('DIAJUKAN','DIBATALKAN') OR id_petugas IS NOT NULL);
    ALTER TABLE dbo.t_penjemputan ADD CONSTRAINT ck_jemput_gagal_final CHECK
        (status <> 'GAGAL' OR NULLIF(LTRIM(RTRIM(alasan_gagal)), N'') IS NOT NULL);

    ALTER TABLE dbo.t_pencairan_poin DROP CONSTRAINT ck_cair_status, ck_cair_tolak, ck_cair_proses;
    EXEC sp_rename N'dbo.t_pencairan_poin.id_pelanggan', N'id_pengguna', N'COLUMN';
    EXEC sp_rename N'dbo.t_pencairan_poin.status', N'status_lama', N'COLUMN';
    ALTER TABLE dbo.t_pencairan_poin ADD status INT NULL;
    EXEC(N'UPDATE dbo.t_pencairan_poin SET status = CASE status_lama WHEN ''DIAJUKAN'' THEN 1 WHEN ''DIPROSES'' THEN 2 WHEN ''DIBAYAR'' THEN 3 WHEN ''DITOLAK'' THEN 4 WHEN ''DIBATALKAN'' THEN 5 END;');
    EXEC(N'IF EXISTS (SELECT 1 FROM dbo.t_pencairan_poin WHERE status IS NULL) THROW 51010, ''Ada status pencairan yang tidak bisa dipetakan.'', 1;');
    ALTER TABLE dbo.t_pencairan_poin DROP COLUMN status_lama;
    ALTER TABLE dbo.t_pencairan_poin ALTER COLUMN status INT NOT NULL;
    ALTER TABLE dbo.t_pencairan_poin ADD aktif INT NOT NULL CONSTRAINT df_cair_aktif DEFAULT 1;
    ALTER TABLE dbo.t_pencairan_poin ADD dibuat_oleh INT NULL;
    EXEC(N'UPDATE dbo.t_pencairan_poin SET dibuat_oleh = id_pengguna;');
    ALTER TABLE dbo.t_pencairan_poin ALTER COLUMN dibuat_oleh INT NOT NULL;
    ALTER TABLE dbo.t_pencairan_poin ADD CONSTRAINT fk_cair_dibuat_final FOREIGN KEY (dibuat_oleh) REFERENCES dbo.m_pengguna(id_pengguna);
    ALTER TABLE dbo.t_pencairan_poin ADD CONSTRAINT ck_cair_aktif CHECK (aktif IN (0,1));
    ALTER TABLE dbo.t_pencairan_poin ADD CONSTRAINT ck_cair_status_final CHECK (status IN (1,2,3,4,5));
    ALTER TABLE dbo.t_pencairan_poin ADD CONSTRAINT ck_cair_proses_final CHECK
        (status NOT IN (2,3,4) OR (diproses_oleh IS NOT NULL AND diproses_pada IS NOT NULL));
    ALTER TABLE dbo.t_pencairan_poin ADD CONSTRAINT ck_cair_tolak_final CHECK
        (status <> 4 OR NULLIF(LTRIM(RTRIM(alasan_penolakan)), N'') IS NOT NULL);

    ALTER TABLE dbo.t_penjualan DROP CONSTRAINT ck_jual_kirim;
    ALTER TABLE dbo.t_penjualan ADD aktif INT NOT NULL CONSTRAINT df_jual_aktif DEFAULT 1;
    ALTER TABLE dbo.t_penjualan ADD CONSTRAINT ck_jual_aktif CHECK (aktif IN (0,1));
    ALTER TABLE dbo.t_penjualan ADD CONSTRAINT ck_jual_kirim_final CHECK
        (status NOT IN ('DIKIRIM','DITERIMA','SELESAI') OR waktu_pengiriman IS NOT NULL);
    ALTER TABLE dbo.t_penjualan ADD CONSTRAINT ck_jual_terima_final CHECK
        (status NOT IN ('DITERIMA','SELESAI') OR
         (dikonfirmasi_oleh IS NOT NULL AND waktu_terima_mitra IS NOT NULL AND waktu_terima_mitra >= waktu_pengiriman));

    ALTER TABLE dbo.t_detail_setoran ADD aktif INT NOT NULL CONSTRAINT df_dsetoran_aktif DEFAULT 1;
    ALTER TABLE dbo.t_detail_setoran ADD dibuat_oleh INT NULL, dibuat_pada DATETIME2 NULL;
    EXEC(N'UPDATE d SET dibuat_oleh = s.dibuat_oleh, dibuat_pada = s.dibuat_pada FROM dbo.t_detail_setoran AS d JOIN dbo.t_setoran AS s ON s.id_setoran = d.id_setoran;');
    ALTER TABLE dbo.t_detail_setoran ALTER COLUMN dibuat_oleh INT NOT NULL;
    ALTER TABLE dbo.t_detail_setoran ALTER COLUMN dibuat_pada DATETIME2 NOT NULL;
    ALTER TABLE dbo.t_detail_setoran ADD CONSTRAINT df_dsetoran_dibuat DEFAULT SYSUTCDATETIME() FOR dibuat_pada;
    ALTER TABLE dbo.t_detail_setoran ADD CONSTRAINT fk_dsetoran_dibuat_final FOREIGN KEY (dibuat_oleh) REFERENCES dbo.m_pengguna(id_pengguna);
    ALTER TABLE dbo.t_detail_setoran ADD CONSTRAINT ck_dsetoran_aktif CHECK (aktif IN (0,1));
    ALTER TABLE dbo.t_detail_setoran ADD CONSTRAINT ck_dsetoran_berat_final CHECK
        ((berat_diterima_kg IS NULL AND berat_ditolak_kg IS NULL) OR
         (berat_diterima_kg IS NOT NULL AND berat_ditolak_kg IS NOT NULL AND berat_diterima_kg + berat_ditolak_kg > 0));

    ALTER TABLE dbo.t_detail_penjualan DROP CONSTRAINT ck_djual_terima, ck_djual_retur, ck_djual_retur_waktu;
    ALTER TABLE dbo.t_detail_penjualan ADD berat_ditolak_kg DECIMAL(12,3) NULL;
    ALTER TABLE dbo.t_detail_penjualan ADD aktif INT NOT NULL CONSTRAINT df_djual_aktif DEFAULT 1;
    ALTER TABLE dbo.t_detail_penjualan ADD dibuat_oleh INT NULL, dibuat_pada DATETIME2 NULL;
    EXEC(N'UPDATE d SET dibuat_oleh = p.dibuat_oleh, dibuat_pada = p.dibuat_pada FROM dbo.t_detail_penjualan AS d JOIN dbo.t_penjualan AS p ON p.id_penjualan = d.id_penjualan;');
    ALTER TABLE dbo.t_detail_penjualan ALTER COLUMN dibuat_oleh INT NOT NULL;
    ALTER TABLE dbo.t_detail_penjualan ALTER COLUMN dibuat_pada DATETIME2 NOT NULL;
    ALTER TABLE dbo.t_detail_penjualan ADD CONSTRAINT df_djual_dibuat DEFAULT SYSUTCDATETIME() FOR dibuat_pada;
    ALTER TABLE dbo.t_detail_penjualan ADD CONSTRAINT fk_djual_dibuat_final FOREIGN KEY (dibuat_oleh) REFERENCES dbo.m_pengguna(id_pengguna);
    ALTER TABLE dbo.t_detail_penjualan ADD CONSTRAINT ck_djual_aktif CHECK (aktif IN (0,1));
    ALTER TABLE dbo.t_detail_penjualan ADD CONSTRAINT ck_djual_berat_final CHECK
        ((berat_diterima_kg IS NULL AND berat_ditolak_kg IS NULL) OR
         (berat_diterima_kg IS NOT NULL AND berat_ditolak_kg IS NOT NULL AND berat_diterima_kg >= 0 AND berat_ditolak_kg >= 0));
    ALTER TABLE dbo.t_detail_penjualan ADD CONSTRAINT ck_djual_alasan_final CHECK
        (berat_ditolak_kg IS NULL OR berat_ditolak_kg = 0 OR NULLIF(LTRIM(RTRIM(alasan_penolakan)), N'') IS NOT NULL);
    ALTER TABLE dbo.t_detail_penjualan ADD CONSTRAINT ck_djual_selisih_final CHECK
        (berat_diterima_kg IS NULL OR berat_diterima_kg + berat_ditolak_kg = berat_dikirim_kg OR
         NULLIF(LTRIM(RTRIM(catatan_selisih_timbang)), N'') IS NOT NULL);
    ALTER TABLE dbo.t_detail_penjualan ADD CONSTRAINT ck_djual_retur_final CHECK
        (berat_retur_kembali_kg >= 0 AND (berat_retur_kembali_kg = 0 OR
         (berat_ditolak_kg IS NOT NULL AND berat_retur_kembali_kg <= berat_ditolak_kg)));
    ALTER TABLE dbo.t_detail_penjualan ADD CONSTRAINT ck_djual_retur_waktu_final CHECK
        ((berat_retur_kembali_kg = 0 AND waktu_retur_kembali IS NULL) OR
         (berat_retur_kembali_kg > 0 AND waktu_retur_kembali IS NOT NULL));

    ALTER TABLE dbo.t_mutasi_kas DROP CONSTRAINT ck_kas_penerimaan, ck_kas_pembayaran, ck_kas_komunitas;
    EXEC sp_rename N'dbo.t_mutasi_kas.dicatat_oleh', N'dibuat_oleh', N'COLUMN';
    ALTER TABLE dbo.t_mutasi_kas ADD aktif INT NOT NULL CONSTRAINT df_kas_aktif DEFAULT 1;
    ALTER TABLE dbo.t_mutasi_kas ADD dibuat_pada DATETIME2 NULL;
    EXEC(N'UPDATE dbo.t_mutasi_kas SET dibuat_pada = waktu_transaksi;');
    ALTER TABLE dbo.t_mutasi_kas ALTER COLUMN dibuat_pada DATETIME2 NOT NULL;
    ALTER TABLE dbo.t_mutasi_kas ADD CONSTRAINT df_kas_dibuat DEFAULT SYSUTCDATETIME() FOR dibuat_pada;
    ALTER TABLE dbo.t_mutasi_kas ADD CONSTRAINT ck_kas_aktif CHECK (aktif IN (0,1));
    ALTER TABLE dbo.t_mutasi_kas ADD CONSTRAINT ck_kas_bukti_final CHECK (NULLIF(LTRIM(RTRIM(bukti)), N'') IS NOT NULL);
    ALTER TABLE dbo.t_mutasi_kas ADD CONSTRAINT ck_kas_penerimaan_final CHECK
        ((pos_dana = 'HASIL_PENJUALAN' AND id_penjualan IS NOT NULL AND jumlah_rupiah > 0 AND
          persen_cadangan_snapshot IS NOT NULL AND persen_komunitas_snapshot IS NOT NULL AND
          persen_cadangan_snapshot BETWEEN 0 AND 100 AND persen_komunitas_snapshot BETWEEN 0 AND 100 AND
          persen_cadangan_snapshot + persen_komunitas_snapshot <= 100) OR
         (pos_dana <> 'HASIL_PENJUALAN' AND id_penjualan IS NULL AND
          persen_cadangan_snapshot IS NULL AND persen_komunitas_snapshot IS NULL));
    ALTER TABLE dbo.t_mutasi_kas ADD CONSTRAINT ck_kas_pembayaran_final CHECK
        (id_pencairan IS NULL OR (pos_dana = 'CADANGAN_POIN' AND jumlah_rupiah < 0 AND metode = 'TRANSFER'));
    ALTER TABLE dbo.t_mutasi_kas ADD CONSTRAINT ck_kas_komunitas_final CHECK
        (pos_dana <> 'KOMUNITAS' OR
         (jumlah_rupiah < 0 AND NULLIF(LTRIM(RTRIM(pihak_terkait)), N'') IS NOT NULL));
    ALTER TABLE dbo.t_mutasi_kas ADD CONSTRAINT ck_kas_tanpa_ref_final CHECK
        (id_penjualan IS NOT NULL OR id_pencairan IS NOT NULL OR
         (NULLIF(LTRIM(RTRIM(pihak_terkait)), N'') IS NOT NULL AND
          NULLIF(LTRIM(RTRIM(keterangan)), N'') IS NOT NULL));

    EXEC sp_rename N'dbo.m_mitra', N'mitra';
    EXEC sp_rename N'dbo.m_pengguna', N'pengguna';
    EXEC sp_rename N'dbo.m_drop_point', N'drop_point';
    EXEC sp_rename N'dbo.m_jenis_sampah', N'jenis_sampah';
    EXEC sp_rename N'dbo.t_slot_jemput', N'slot_jemput';
    EXEC sp_rename N'dbo.t_setoran', N'setoran';
    EXEC sp_rename N'dbo.t_penjemputan', N'penjemputan';
    EXEC sp_rename N'dbo.t_pencairan_poin', N'pencairan_poin';
    EXEC sp_rename N'dbo.t_penjualan', N'penjualan';
    EXEC sp_rename N'dbo.t_mutasi_kas', N'mutasi_kas';
    EXEC sp_rename N'dbo.t_detail_setoran', N'detail_setoran';
    EXEC sp_rename N'dbo.t_detail_penjualan', N'detail_penjualan';

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
    THROW;
END CATCH;
```

Skema dummy lama akan berhenti di pemeriksaan awal karena `Karang Taruna Cempaka` berisi 21 karakter; batas final 20. Nama jenis sampah dummy juga belum cocok dengan empat material final. Perbaikan data tersebut perlu diputuskan sebelum migrasi. Backend yang masih memakai nama tabel/kolom lama harus diperbarui bersama migrasi ini.
