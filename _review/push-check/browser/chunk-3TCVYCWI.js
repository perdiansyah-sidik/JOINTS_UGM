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

// src/app/services/api.service.ts
var _ApiService = class _ApiService {
  constructor() {
    this.http = inject(HttpClient);
    this.apiUrl = environment.apiUrl;
    this.baseUrl = environment.apiUrl;
  }
  // 1. AUTENTIKASI & PENGGUNA
  login(data) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }
  register(data) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }
  getProfil(id) {
    return this.http.get(`${this.apiUrl}/pengguna/${id}`);
  }
  updateProfil(idPengguna, data) {
    return this.http.put(`${this.apiUrl}/pengguna/${idPengguna}`, data);
  }
  // 2. MITRA, DROP POINT & JENIS SAMPAH
  getMitra() {
    return this.http.get(`${this.apiUrl}/mitra`);
  }
  getDropPoints() {
    return this.http.get(`${this.apiUrl}/drop-points`);
  }
  getJenisSampah() {
    return this.http.get(`${this.apiUrl}/jenis-sampah`);
  }
  // 3. DASHBOARD & SALDO POIN PELANGGAN
  getDashboardPelanggan(idPelanggan) {
    return this.http.get(`${this.apiUrl}/dashboard/${idPelanggan}`);
  }
  // 4. SETORAN & PENJEMPUTAN SAMPAH
  kirimSetoran(data) {
    return this.http.post(`${this.apiUrl}/setoran`, data);
  }
  getRiwayatSetoran(idPelanggan) {
    return this.http.get(`${this.apiUrl}/setoran/riwayat/${idPelanggan}`);
  }
  getAntreanSetoranMitra() {
    return this.http.get(`${this.apiUrl}/setoran/antrean`);
  }
  getSlotJemput() {
    return this.http.get(`${this.apiUrl}/slot-jemput`);
  }
  // 5. PENCAIRAN POIN
  ajukanPencairan(data) {
    return this.http.post(`${this.apiUrl}/pencairan`, data);
  }
  getRiwayatPencairan(idPelanggan) {
    return this.http.get(`${this.apiUrl}/pencairan/riwayat/${idPelanggan}`);
  }
  verifikasiPencairan(idPencairan, data) {
    return this.http.put(`${this.apiUrl}/pencairan/verifikasi/${idPencairan}`, data);
  }
};
_ApiService.\u0275fac = function ApiService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _ApiService)();
};
_ApiService.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
var ApiService = _ApiService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApiService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  ApiService
};
//# sourceMappingURL=chunk-3TCVYCWI.js.map
