// Mengikuti kamus data tabel `pengguna` pada dokumen Pilahin_Final_dan_Pembagian_Tugas.
// Nilai peran: 1 Rumah Tangga, 2 UMKM Kuliner, 3 Pedagang Pasar, 4 Pengelola, 5 Mitra.
export type NilaiPeran = 1 | 2 | 3 | 4 | 5;

export const LABEL_PERAN: Record<NilaiPeran, string> = {
  1: 'Rumah Tangga',
  2: 'UMKM Kuliner',
  3: 'Pedagang Pasar',
  4: 'Pengelola',
  5: 'Mitra (Petugas)',
};

// Peran yang boleh dibuat lewat Master Pengguna (CRUD pengelola).
// Peran 1-3 dibuat lewat registrasi publik, peran 4 lewat setup terkontrol di server.

export interface Pengguna {
  foto_profil?: string | null;
  id_pengguna: number;
  nama: string;
  email: string;
  no_hp: string | null;
  peran: NilaiPeran;
  id_mitra: number | null;
  nama_usaha: string | null;
  alamat: string | null;
  aktif: 0 | 1;
  is_deleted: 0 | 1;
  dibuat_pada?: string;
  diubah_pada?: string | null;
  // Dikirim backend bila akun ini sudah dirujuk transaksi, sehingga
  // peran & organisasi dikunci (lihat ketentuan dokumen bagian "Keputusan rancangan").
  terkunci_transaksi?: boolean;
}

// Payload membuat akun petugas mitra (peran = 5) oleh pengelola.
export interface BuatPetugasMitraPayload {
  nama: string;
  email: string;
  password: string;
  no_hp?: string;
  id_mitra: number;
}

// Payload ubah profil akun yang diizinkan (tidak termasuk peran/password di sini).
export interface UbahPenggunaPayload {
  nama?: string;
  no_hp?: string | null;
  alamat?: string | null;
  nama_usaha?: string | null;
  id_mitra?: number | null;
}

export interface MitraRingkas {
  id_mitra: number;
  nama_mitra: string;
}
