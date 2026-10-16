import { Pengguna } from '../models/pengguna.model';

// Akun untuk preview lokal saja; tidak dibuat di Supabase.
export const DEMO_PASSWORD = 'DemoPilahin123!';

export const DEMO_ACCOUNTS: Pengguna[] = [
  { id_pengguna: 101, nama: 'Pelanggan Rumah Tangga', email: 'rumah@demo.pilahin.local', no_hp: null, peran: 1, id_mitra: null, nama_usaha: null, alamat: 'Yogyakarta', aktif: 1, is_deleted: 0 },
  { id_pengguna: 102, nama: 'Pelanggan UMKM Kuliner', email: 'umkm@demo.pilahin.local', no_hp: null, peran: 2, id_mitra: null, nama_usaha: 'Warung Demo', alamat: 'Yogyakarta', aktif: 1, is_deleted: 0 },
  { id_pengguna: 103, nama: 'Pelanggan Pedagang Pasar', email: 'pasar@demo.pilahin.local', no_hp: null, peran: 3, id_mitra: null, nama_usaha: 'Kios Demo', alamat: 'Yogyakarta', aktif: 1, is_deleted: 0 },
  { id_pengguna: 104, nama: 'Pengelola Demo', email: 'pengelola@demo.pilahin.local', no_hp: null, peran: 4, id_mitra: null, nama_usaha: null, alamat: null, aktif: 1, is_deleted: 0 },
  { id_pengguna: 105, nama: 'Petugas Mitra Demo', email: 'mitra@demo.pilahin.local', no_hp: null, peran: 5, id_mitra: 1, nama_usaha: null, alamat: null, aktif: 1, is_deleted: 0 },
];
