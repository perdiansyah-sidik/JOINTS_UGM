import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface DetailSetoranInput {
  id_jenis_sampah: number;
  nama_jenis?: string;
  berat_diterima_kg: number;
  berat_ditolak_kg: number;
  alasan_penolakan?: string;
  poin_per_kg_snapshot: number;
}

export interface SetoranTimbang {
  id_setoran: number;
  id_pelanggan?: number;
  id_pengguna?: number;
  nama_pelanggan?: string;
  id_drop_point: number;
  nama_drop_point?: string;
  status: number | string; // 'DRAFT', 'DIAJUKAN', 'FINAL', 'DITOLAK', 'DIBATALKAN' atau 1..5
  status_label?: string;
  waktu_timbang?: string;
  foto_bukti?: string;
  status_terima_drop_point?: string; // 'MENUNGGU', 'SELISIH', 'DITERIMA'
  status_drop_point?: number | string;
  dibuat_oleh?: number;
  dicatat_oleh?: number;
  ditimbang_oleh?: number;
  diverifikasi_oleh?: number;
  waktu_verifikasi?: string;
  catatan_verifikasi?: string;
  potongan_persen?: number;
  potongan_persen_disepakati?: number;
  poin_kotor?: number;
  potongan_poin?: number;
  poin_bersih?: number;
  details?: DetailSetoranInput[];
}

@Injectable({ providedIn: 'root' })
export class PenimbanganService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  private opsi() {
    let token = localStorage.getItem('token');
    if (!token) {
      try {
        const u = JSON.parse(localStorage.getItem('ecoapp_user') || 'null');
        token = u?.token || u?.access_token || null;
      } catch {}
    }
    return {
      headers: token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders(),
    };
  }

  // Mendapatkan daftar setoran yang siap ditimbang atau diverifikasi
  getDaftarSetoran(): Observable<SetoranTimbang[]> {
    return this.http.get<any>(`${this.baseUrl}/setoran`, this.opsi()).pipe(
      catchError(() => this.http.get<any>(`${this.baseUrl}/setoran/antrean`, this.opsi())),
      map((res) => {
        const data = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
        return data.map((s: any) => ({
          ...s,
          id_setoran: s.id_setoran ?? s.id,
          id_pelanggan: s.id_pelanggan ?? s.id_pengguna,
          potongan_persen: Number(s.potongan_persen_disepakati ?? s.potongan_persen ?? 0),
          status_drop_point: s.status_terima_drop_point ?? s.status_drop_point ?? 'MENUNGGU',
        }));
      })
    );
  }

  // Detail setoran berdasarkan ID
  getDetailSetoran(idSetoran: number): Observable<SetoranTimbang> {
    return this.http.get<any>(`${this.baseUrl}/setoran/${idSetoran}`, this.opsi()).pipe(
      map((res) => (res && res.data ? res.data : res))
    );
  }

  // Menyimpan hasil penimbangan (T02)
  simpanPenimbangan(payload: {
    id_setoran: number;
    waktu_timbang: string;
    foto_bukti: string;
    dicatat_oleh?: number;
    ditimbang_oleh?: number;
    details: DetailSetoranInput[];
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/setoran/${payload.id_setoran}/timbang`, payload, this.opsi());
  }

  // Pengelola memverifikasi setoran menjadi FINAL (3) atau DITOLAK (4)
  verifikasiSetoran(payload: {
    id_setoran: number;
    status: 3 | 4 | 'FINAL' | 'DITOLAK';
    catatan_verifikasi?: string;
    diverifikasi_oleh?: number;
    waktu_verifikasi?: string;
  }): Observable<any> {
    return this.http.patch(`${this.baseUrl}/setoran/${payload.id_setoran}/verifikasi`, payload, this.opsi());
  }
}
