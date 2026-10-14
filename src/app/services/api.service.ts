import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Menggunakan inject() sesuai standar Angular terbaru
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  // ==========================================
  // 1. AUTENTIKASI & PENGGUNA
  // ==========================================
  register(dataPengguna: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, dataPengguna);
  }

  login(kredensial: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, kredensial);
  }

  getProfil(idPengguna: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pengguna/${idPengguna}`);
  }

  // ==========================================
  // 2. MASTER DATA (DROP POINT & JENIS SAMPAH)
  // ==========================================
  getDropPoints(): Observable<any> {
    return this.http.get(`${this.baseUrl}/drop-points`);
  }

  getJenisSampah(): Observable<any> {
    return this.http.get(`${this.baseUrl}/jenis-sampah`);
  }

  // ==========================================
  // 3. TRANSAKSI SETORAN SAMPAH
  // ==========================================
  kirimSetoran(dataSetoran: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/setoran`, dataSetoran);
  }

  getRiwayatSetoran(idPelanggan: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/setoran/riwayat/${idPelanggan}`);
  }

  // ==========================================
  // 4. PENCAIRAN POIN / REWARDS
  // ==========================================
  ajukanPencairan(dataPencairan: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pencairan`, dataPencairan);
  }

  getRiwayatPencairan(idPelanggan: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pencairan/riwayat/${idPelanggan}`);
  }
}