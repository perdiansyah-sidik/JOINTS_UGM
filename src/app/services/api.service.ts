import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  // Menyediakan apiUrl dan baseUrl sekaligus agar semua fungsi aman tanpa garis merah
  private apiUrl = environment.apiUrl;
  private baseUrl = environment.apiUrl;

  login(credentials: { email: string; password: string; jenis_akun?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  // ================= DASHBOARD & KURIR MITRA =================
  getDashboardMitra(idMitra: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard-mitra/${idMitra}`);
  }

  updateStatusJemputKurir(idPenjemputan: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/kurir-mitra/penjemputan/${idPenjemputan}/status`, { status });
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  getProfil(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pengguna/${id}`);
  }

  updateProfil(idPengguna: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/pengguna/${idPengguna}`, data);
  }

  // 2. MITRA, DROP POINT & JENIS SAMPAH
  getMitra(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mitra`);
  }

  getDropPoints(): Observable<any> {
    return this.http.get(`${this.apiUrl}/drop-points`);
  }

  getJenisSampah(): Observable<any> {
    return this.http.get(`${this.apiUrl}/jenis-sampah`);
  }

  // 3. DASHBOARD & SALDO POIN PELANGGAN
  getDashboardPelanggan(idPelanggan: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/${idPelanggan}`);
  }

  // 4. SETORAN & PENJEMPUTAN SAMPAH
  kirimSetoran(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/setoran`, data);
  }

  getRiwayatSetoran(idPelanggan: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/setoran/riwayat/${idPelanggan}`);
  }

  getAntreanSetoranMitra(): Observable<any> {
    return this.http.get(`${this.apiUrl}/setoran/antrean`);
  }

  getSlotJemput(): Observable<any> {
    return this.http.get(`${this.apiUrl}/slot-jemput`);
  }

  // 5. PENCAIRAN POIN
  ajukanPencairan(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pencairan`, data);
  }

  getRiwayatPencairan(idPelanggan: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pencairan/riwayat/${idPelanggan}`);
  }

  verifikasiPencairan(idPencairan: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/pencairan/verifikasi/${idPencairan}`, data);
  }

  updateKategoriPelanggan(idPengguna: number, jenisPelanggan: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/pengguna/${idPengguna}/kategori`, {
      jenis_pelanggan: jenisPelanggan
    });
  }

 // ================= MASTER MITRA (M02) =================
  getMitraList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mitra`);
  }

  getMitraDetail(idMitra: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/mitra/${idMitra}`);
  }

  tambahMitra(payload: {
    nama_mitra: string;
    nama_penanggung_jawab?: string | null;
    no_hp?: string | null;
    alamat_fasilitas?: string;
    alamat_mitra?: string;
    dibuat_oleh?: number | null;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/mitra`, payload);
  }

  updateMitra(idMitra: number, payload: {
    nama_mitra: string;
    nama_penanggung_jawab?: string | null;
    no_hp?: string | null;
    alamat_fasilitas?: string;
    alamat_mitra?: string;
    aktif?: number;
    diubah_oleh?: number | null;
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}/mitra/${idMitra}`, payload);
  }

  ubahStatusMitra(idMitra: number, aktif: number, diubahOleh?: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/mitra/${idMitra}/status`, {
      aktif,
      diubah_oleh: diubahOleh
    });
  }

  hapusMitra(idMitra: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/mitra/${idMitra}`);
  }

  // ================= TRANSAKSI T04 (PENUGASAN) & T03 (PENJEMPUTAN MITRA) =================
  getPenjemputanTransaksi(): Observable<any> {
    return this.http.get(`${this.apiUrl}/penjemputan-transaksi`);
  }

  buatPesananJemput(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/penjemputan-transaksi/buat-pesanan`, payload);
  }

  tugaskanMitraJemput(idPenjemputan: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/penjemputan-transaksi/${idPenjemputan}/tugaskan`, payload);
  }

  updateStatusKurirDanTimbang(idPenjemputan: number, payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/penjemputan-transaksi/${idPenjemputan}/status-kurir`, payload);
  }

  getRingkasanPengelola(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard-pengelola`);
  }
}