# Patch kecil Master Pengguna — SQL Server

Untuk database lama `ecoapp_db` dengan tabel `dbo.m_pengguna`. Skrip ini hanya menambah `is_deleted`; semua akun lama tetap `is_deleted = 0`. `aktif = 0` saja berarti nonaktif, sedangkan `aktif = 0` dan `is_deleted = 1` berarti dihapus sementara. Tidak ada data pengguna yang dihapus.

```sql
USE [ecoapp_db];
GO

IF DB_NAME() <> N'ecoapp_db'
    THROW 51100, 'Database aktif bukan ecoapp_db.', 1;

IF OBJECT_ID(N'dbo.m_pengguna', N'U') IS NULL
    THROW 51101, 'Tabel lama dbo.m_pengguna tidak ditemukan.', 1;

SET XACT_ABORT ON;
BEGIN TRY
    BEGIN TRANSACTION;

    IF EXISTS (
        SELECT 1 FROM sys.columns
        WHERE object_id = OBJECT_ID(N'dbo.m_pengguna') AND name = N'is_deleted'
          AND (system_type_id <> 56 OR is_nullable <> 0 OR default_object_id = 0)
    )
        THROW 51102, 'Kolom is_deleted sudah ada tetapi tipe, NULL, atau default-nya berbeda. Periksa manual.', 1;

    IF NOT EXISTS (
        SELECT 1 FROM sys.columns
        WHERE object_id = OBJECT_ID(N'dbo.m_pengguna') AND name = N'is_deleted'
    )
    BEGIN
        EXEC(N'ALTER TABLE dbo.m_pengguna ADD is_deleted INT NOT NULL CONSTRAINT df_pengguna_is_deleted DEFAULT (0);');
    END;

    IF NOT EXISTS (
        SELECT 1 FROM sys.check_constraints
        WHERE parent_object_id = OBJECT_ID(N'dbo.m_pengguna') AND name = N'ck_pengguna_is_deleted'
    )
    BEGIN
        EXEC(N'ALTER TABLE dbo.m_pengguna WITH CHECK ADD CONSTRAINT ck_pengguna_is_deleted CHECK (is_deleted IN (0,1) AND (is_deleted = 0 OR aktif = 0));');
    END;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
    THROW;
END CATCH;
```

Jalankan pada salinan database dulu. Jika kolom dan constraint sudah sesuai, skrip tidak mengubah apa pun. Query ini tidak memperbaiki backend atau login/registrasi.
