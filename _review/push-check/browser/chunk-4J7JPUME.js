import {
  environment
} from "./chunk-3ROYJO5F.js";
import {
  HttpClient,
  Injectable,
  inject,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-F6TCNWYA.js";

// src/app/services/master-pengguna.service.ts
var _MasterPenggunaService = class _MasterPenggunaService {
  constructor() {
    this.http = inject(HttpClient);
    this.baseUrl = environment.apiUrl;
  }
  getListPengguna() {
    return this.http.get(`${this.baseUrl}/pengguna`);
  }
  getDetailPengguna(idPengguna) {
    return this.http.get(`${this.baseUrl}/pengguna/${idPengguna}`);
  }
  // Khusus pengelola. API wajib menolak permintaan dengan peran selain 5
  // dari endpoint ini (registrasi publik tidak boleh membuat PENGELOLA/MITRA).
  buatAkunPetugasMitra(payload) {
    return this.http.post(`${this.baseUrl}/pengguna/petugas-mitra`, payload);
  }
  ubahPengguna(idPengguna, payload) {
    return this.http.put(`${this.baseUrl}/pengguna/${idPengguna}`, payload);
  }
  // Hapus sementara yang dapat dipulihkan: aktif=0, is_deleted=1.
  nonaktifkanPengguna(idPengguna) {
    return this.http.patch(`${this.baseUrl}/pengguna/${idPengguna}/nonaktifkan`, {});
  }
  aktifkanPengguna(idPengguna) {
    return this.http.patch(`${this.baseUrl}/pengguna/${idPengguna}/aktifkan`, {});
  }
  // Hapus fisik hanya jika API memastikan akun belum direferensikan transaksi/audit.
  hapusPermanenPengguna(idPengguna) {
    return this.http.delete(`${this.baseUrl}/pengguna/${idPengguna}`);
  }
  // Dipakai untuk dropdown pilih organisasi mitra saat membuat akun petugas.
  getListMitraRingkas() {
    return this.http.get(`${this.baseUrl}/mitra/ringkas`);
  }
};
_MasterPenggunaService.\u0275fac = function MasterPenggunaService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MasterPenggunaService)();
};
_MasterPenggunaService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _MasterPenggunaService, factory: _MasterPenggunaService.\u0275fac, providedIn: "root" });
var MasterPenggunaService = _MasterPenggunaService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MasterPenggunaService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/master-pengguna/pengguna-validation.ts
function idValid(id) {
  return typeof id === "number" && Number.isInteger(id) && id > 0 && id <= 2147483647;
}
function normalisasiHp(value) {
  return value.trim().replace(/[ ()-]/g, "");
}
function validasiPengguna(form, asli, mitra) {
  const errors = {};
  const teks = (kolom, label, max, wajib = false) => {
    const value = String(form[kolom] ?? "").trim();
    if (wajib && !value)
      errors[kolom] = `${label} wajib diisi.`;
    else if (value.length > max)
      errors[kolom] = `${label} maksimal ${max} karakter.`;
  };
  teks("nama", "Nama", 100, true);
  const hp = normalisasiHp(form.no_hp);
  if (hp && (!/^\+?[0-9]{8,15}$/.test(hp) || form.no_hp.trim().length > 20)) {
    errors.no_hp = "Isi 8\u201315 digit; boleh diawali +. Maksimal 20 karakter termasuk pemisah.";
  }
  if (!asli) {
    teks("email", "Email", 150, true);
    const email = (form.email ?? "").trim();
    if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Format email belum benar.";
    const password = form.password ?? "";
    if (password.length < 8 || password.length > 128 || !password.trim()) {
      errors.password = "Password 8\u2013128 karakter, tidak boleh hanya spasi.";
    }
  } else {
    if (asli.peran !== 5)
      teks("alamat", "Alamat", 255, asli.peran <= 3);
    if (asli.peran === 2 || asli.peran === 3)
      teks("nama_usaha", "Nama usaha", 150);
  }
  if (!asli || asli.peran === 5 && asli.terkunci_transaksi === false) {
    if (!idValid(form.id_mitra) || !mitra.some((m) => m.id_mitra === form.id_mitra)) {
      errors.id_mitra = "Pilih organisasi dari daftar mitra yang tersedia.";
    }
  }
  return errors;
}
function payloadUbah(form, asli) {
  const payload = { nama: form.nama.trim(), no_hp: normalisasiHp(form.no_hp) || null };
  if (asli.peran !== 5)
    payload.alamat = form.alamat?.trim() || null;
  if (asli.peran === 2 || asli.peran === 3)
    payload.nama_usaha = form.nama_usaha?.trim() || null;
  if (asli.peran === 5 && asli.terkunci_transaksi === false)
    payload.id_mitra = form.id_mitra;
  return payload;
}
function pesanApi(error) {
  const status = error?.status;
  if (status === 401)
    return "Sesi berakhir. Silakan masuk kembali.";
  if (status === 403)
    return "Akun ini tidak memiliki izin untuk tindakan tersebut.";
  if (status === 404)
    return "Data atau layanan belum tersedia. Muat ulang daftar.";
  if (status === 409)
    return "Data sudah berubah atau email telah dipakai. Muat ulang dan periksa kembali.";
  if (status === 400 || status === 422)
    return "Data ditolak server. Periksa isian dan muat ulang daftar mitra.";
  return "Belum dapat memastikan hasil permintaan. Periksa koneksi dan muat ulang daftar sebelum mencoba lagi.";
}

// src/app/models/pengguna.model.ts
var LABEL_PERAN = {
  1: "Rumah Tangga",
  2: "UMKM Kuliner",
  3: "Pedagang Pasar",
  4: "Pengelola",
  5: "Mitra (Petugas)"
};

export {
  MasterPenggunaService,
  idValid,
  normalisasiHp,
  validasiPengguna,
  payloadUbah,
  pesanApi,
  LABEL_PERAN
};
//# sourceMappingURL=chunk-4J7JPUME.js.map
