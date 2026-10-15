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

  // 1. AUTENTIKASI & PENGGUNA
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
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
}