import { MitraRingkas, Pengguna, UbahPenggunaPayload } from '../models/pengguna.model';

export interface FormPengguna {
  nama: string;
  no_hp: string;
  id_mitra: number | null;
  email?: string;
  password?: string;
  alamat?: string;
  nama_usaha?: string;
}
export type Kolom = keyof FormPengguna;
export type Kesalahan = Partial<Record<Kolom, string>>;

export function idValid(id: unknown): id is number {
  return typeof id === 'number' && Number.isInteger(id) && id > 0 && id <= 2147483647;
}

export function normalisasiHp(value: string): string {
  return value.trim().replace(/[ ()-]/g, '');
}

// Kebijakan password dan panjang nomor HP merupakan usulan UI; samakan di API.
export function validasiPengguna(form: FormPengguna, asli: Pengguna | null, mitra: MitraRingkas[]): Kesalahan {
  const errors: Kesalahan = {};
  const teks = (kolom: Kolom, label: string, max: number, wajib = false) => {
    const value = String(form[kolom] ?? '').trim();
    if (wajib && !value) errors[kolom] = `${label} wajib diisi.`;
    else if (value.length > max) errors[kolom] = `${label} maksimal ${max} karakter.`;
  };
  teks('nama', 'Nama', 100, true);
  const hp = normalisasiHp(form.no_hp);
  if (hp && (!/^\+?[0-9]{8,15}$/.test(hp) || form.no_hp.trim().length > 20)) {
    errors.no_hp = 'Isi 8–15 digit; boleh diawali +. Maksimal 20 karakter termasuk pemisah.';
  }
  if (!asli) {
    teks('email', 'Email', 150, true);
    const email = (form.email ?? '').trim();
    if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Format email belum benar.';
    const password = form.password ?? '';
    if (password.length < 8 || password.length > 128 || !password.trim()) {
      errors.password = 'Password 8–128 karakter, tidak boleh hanya spasi.';
    }
  } else {
    if (asli.peran !== 5) teks('alamat', 'Alamat', 255, asli.peran <= 3);
    if (asli.peran === 2 || asli.peran === 3) teks('nama_usaha', 'Nama usaha', 150);
  }
  // Status kunci yang belum tersedia tidak boleh dianggap "bebas diubah".
  if (!asli || (asli.peran === 5 && asli.terkunci_transaksi === false)) {
    if (!idValid(form.id_mitra) || !mitra.some(m => m.id_mitra === form.id_mitra)) {
      errors.id_mitra = 'Pilih organisasi dari daftar mitra yang tersedia.';
    }
  }
  return errors;
}

export function payloadUbah(form: FormPengguna, asli: Pengguna): UbahPenggunaPayload {
  const payload: UbahPenggunaPayload = { nama: form.nama.trim(), no_hp: normalisasiHp(form.no_hp) || null };
  if (asli.peran !== 5) payload.alamat = form.alamat?.trim() || null;
  if (asli.peran === 2 || asli.peran === 3) payload.nama_usaha = form.nama_usaha?.trim() || null;
  if (asli.peran === 5 && asli.terkunci_transaksi === false) payload.id_mitra = form.id_mitra;
  return payload;
}

export function pesanApi(error: unknown): string {
  const status = (error as { status?: number } | null)?.status;
  if (status === 401) return 'Sesi berakhir. Silakan masuk kembali.';
  if (status === 403) return 'Akun ini tidak memiliki izin untuk tindakan tersebut.';
  if (status === 404) return 'Data atau layanan belum tersedia. Muat ulang daftar.';
  if (status === 409) return 'Data sudah berubah atau email telah dipakai. Muat ulang dan periksa kembali.';
  if (status === 400 || status === 422) return 'Data ditolak server. Periksa isian dan muat ulang daftar mitra.';
  return 'Belum dapat memastikan hasil permintaan. Periksa koneksi dan muat ulang daftar sebelum mencoba lagi.';
}
