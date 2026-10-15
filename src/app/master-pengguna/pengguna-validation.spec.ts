import { describe, expect, it } from 'vitest';
import { Pengguna } from '../models/pengguna.model';
import { idValid, normalisasiHp, payloadUbah, pesanApi, validasiPengguna } from './pengguna-validation';

const mitra = [{ id_mitra: 1, nama_mitra: 'Bank Sampah' }];
const form = { nama: '  Rifqi  ', email: 'rifqi@example.com', password: 'kata sandi panjang', no_hp: '', id_mitra: 1, alamat: 'Jalan Merdeka', nama_usaha: '' };
const akun: Pengguna = { id_pengguna: 7, nama: 'Rifqi', email: form.email, no_hp: null, peran: 1, id_mitra: null, nama_usaha: null, alamat: form.alamat, aktif: 1, is_deleted: 0 };

describe('Aturan bisnis master pengguna', () => {
  it('menerima nama Unicode, HP opsional dan password tanpa syarat simbol', () => {
    expect(validasiPengguna({ ...form, nama: "Éka O'Neil" }, null, mitra)).toEqual({});
  });
  it('menolak nama kosong, email rusak dan password hanya spasi', () => {
    expect(validasiPengguna({ ...form, nama: ' ', email: 'abc', password: '        ' }, null, mitra))
      .toEqual(expect.objectContaining({ nama: expect.any(String), email: expect.any(String), password: expect.any(String) }));
  });
  it.each([1, 2, 3] as const)('alamat wajib bagi pelanggan peran %s', peran => {
    expect(validasiPengguna({ ...form, alamat: ' ' }, { ...akun, peran }, mitra).alamat).toBeTruthy();
  });
  it('menolak input melebihi ukuran kolom database', () => {
    expect(validasiPengguna({ ...form, nama: 'a'.repeat(101), email: 'a'.repeat(145)+'@x.com' }, null, mitra).nama).toBeTruthy();
    expect(validasiPengguna({ ...form, email: 'a'.repeat(145)+'@x.com' }, null, mitra).email).toBeTruthy();
    expect(validasiPengguna({ ...form, alamat: 'a'.repeat(256), nama_usaha: 'a'.repeat(151) }, { ...akun, peran: 2 }, mitra))
      .toEqual(expect.objectContaining({ alamat: expect.any(String), nama_usaha: expect.any(String) }));
  });
  it('memvalidasi HP dan menormalkan pemisah tanpa mengubah kode negara', () => {
    expect(normalisasiHp('+62 812-3456-7890')).toBe('+6281234567890');
    expect(validasiPengguna({ ...form, no_hp: '0812abc123' }, null, mitra).no_hp).toBeTruthy();
    expect(validasiPengguna({ ...form, no_hp: '+62 812-3456-7890' }, null, mitra).no_hp).toBeUndefined();
  });
  it.each([0, -1, 1.5, Infinity, NaN, 2147483648, '1'])('menolak ID tidak sah %s', id => expect(idValid(id)).toBe(false));
  it('menolak organisasi yang tidak ada dalam daftar server', () => {
    expect(validasiPengguna({ ...form, id_mitra: 99 }, null, mitra).id_mitra).toBeTruthy();
    expect(validasiPengguna(form, null, []).id_mitra).toBeTruthy();
  });
  it.each([true, undefined])('tidak mengirim perubahan organisasi ketika status kunci %s', terkunci_transaksi => {
    const petugas: Pengguna = { ...akun, peran: 5, id_mitra: 1, terkunci_transaksi };
    expect(payloadUbah({ ...form, id_mitra: 99 }, petugas)).not.toHaveProperty('id_mitra');
    expect(payloadUbah(form, petugas)).not.toHaveProperty('alamat');
  });
  it('mengirim organisasi hanya untuk petugas yang secara eksplisit tidak terkunci', () => {
    expect(payloadUbah(form, { ...akun, peran: 5, terkunci_transaksi: false }).id_mitra).toBe(1);
    expect(payloadUbah(form, akun)).not.toHaveProperty('id_mitra');
    expect(payloadUbah(form, akun)).not.toHaveProperty('nama_usaha');
    expect(payloadUbah(form, akun)).not.toHaveProperty('peran');
  });
  it('tidak menampilkan rincian error internal server', () => {
    expect(pesanApi({ status: 500, error: { message: 'SQL connection secret' } })).not.toContain('secret');
  });
});
