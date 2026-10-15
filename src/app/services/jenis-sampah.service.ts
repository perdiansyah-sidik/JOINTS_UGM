import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface JenisSampah {
  id_jenis_sampah: number;
  nama_jenis: string;
  ketentuan: string;
  poin_per_kg: number;
  aktif?: number; // hanya dikirim untuk pengelola
}

interface Balasan<T> {
  status: string;
  message?: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class JenisSampahService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/jenis-sampah`;

  private opsi() {
    let token = localStorage.getItem('token');
    if (!token) {
      try {
        const user = JSON.parse(localStorage.getItem('ecoapp_user') || 'null');
        token = user?.token || user?.access_token || null;
      } catch {
        token = null;
      }
    }
    return {
      headers: token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders(),
    };
  }

  daftar(): Observable<JenisSampah[]> {
    return this.http.get<Balasan<JenisSampah[]>>(this.url, this.opsi()).pipe(map((r) => r.data));
  }

  tambah(body: { nama_jenis: string; ketentuan: string; poin_per_kg: number }): Observable<unknown> {
    return this.http.post(this.url, body, this.opsi());
  }

  ubah(id: number, body: { ketentuan: string; poin_per_kg: number }): Observable<unknown> {
    return this.http.put(`${this.url}/${id}`, body, this.opsi());
  }

  setAktif(id: number, aktif: 0 | 1): Observable<unknown> {
    return this.http.patch(`${this.url}/${id}/status`, { aktif }, this.opsi());
  }

  hapus(id: number): Observable<unknown> {
    return this.http.delete(`${this.url}/${id}`, this.opsi());
  }
}