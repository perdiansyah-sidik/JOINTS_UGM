import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export type PosDana = 'HASIL_PENJUALAN' | 'CADANGAN_POIN' | 'KOMUNITAS' | 'OPERASIONAL';
export type MetodeBayar = 'TRANSFER' | 'TUNAI';

export interface MutasiKas {
  id_mutasi_kas?: number;
  pos_dana: PosDana;
  jumlah_rupiah: number; // positif masuk, negatif keluar
  id_penjualan?: number | null;
  id_pencairan?: number | null;
  metode: MetodeBayar;
  pihak_terkait?: string | null;
  bukti: string; // URL / Object key bukti transfer/kuitansi
  keterangan?: string | null;
  persen_cadangan_snapshot?: number | null; // 40%
  persen_komunitas_snapshot?: number | null; // 10%
  waktu_transaksi: string;
  dibuat_oleh?: number;
  dibuat_pada?: string;
  nama_pihak?: string;
}

export interface RingkasanKas {
  total_kas: number;
  cadangan_poin: number;
  cadangan_dipesan: number;
  komunitas: number;
  operasional: number;
}

export interface PenjualanSiapLunas {
  id_penjualan: number;
  nama_mitra: string;
  tanggal_penjualan: string;
  total_tagihan: number;
  status: string;
  sudah_lunas?: boolean;
}

@Injectable({ providedIn: 'root' })
export class KasService {
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

  // Mendapatkan daftar mutasi kas (mendukung varian URL backend)
  getMutasiKas(): Observable<MutasiKas[]> {
    return this.http.get<any>(`${this.baseUrl}/mutasi-kas`, this.opsi()).pipe(
      catchError(() => this.http.get<any>(`${this.baseUrl}/mutasi_kas`, this.opsi())),
      catchError(() => this.http.get<any>(`${this.baseUrl}/t_mutasi_kas`, this.opsi())),
      catchError(() => this.http.get<any>(`${this.baseUrl}/kas`, this.opsi())),
      map((res) => {
        const data = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
        return data.map((m: any) => ({
          ...m,
          jumlah_rupiah: Number(m.jumlah_rupiah || 0),
        }));
      })
    );
  }

  // Mendapatkan ringkasan saldo kas dan pembagian pos dana
  getRingkasanKas(): Observable<RingkasanKas> {
    return this.http.get<any>(`${this.baseUrl}/mutasi-kas/ringkasan`, this.opsi()).pipe(
      map((res) => {
        const d = res?.data ?? res;
        return {
          total_kas: Number(d?.total_kas || 0),
          cadangan_poin: Number(d?.cadangan_poin || 0),
          cadangan_dipesan: Number(d?.cadangan_dipesan || 0),
          komunitas: Number(d?.komunitas || 0),
          operasional: Number(d?.operasional || 0),
        };
      })
    );
  }

  // Daftar penjualan yang menunggu pelunasan (T08)
  getPenjualanBelumLunas(): Observable<PenjualanSiapLunas[]> {
    return this.http.get<any>(`${this.baseUrl}/penjualan/belum-lunas`, this.opsi()).pipe(
      map((res) => (Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : []))
    );
  }

  // Mencatat penerimaan pelunasan penjualan (Alokasi 40/10/50)
  catatPelunasanPenjualan(payload: {
    id_penjualan: number;
    jumlah_rupiah: number;
    metode: MetodeBayar;
    bukti: string;
    keterangan?: string;
    dicatat_oleh?: number;
    waktu_transaksi?: string;
  }): Observable<any> {
    const body = {
      ...payload,
      pos_dana: 'HASIL_PENJUALAN',
      persen_cadangan_snapshot: 40.0,
      persen_komunitas_snapshot: 10.0,
    };
    return this.http.post(`${this.baseUrl}/mutasi-kas/penjualan`, body, this.opsi()).pipe(
      catchError(() => this.http.post(`${this.baseUrl}/mutasi_kas/penjualan`, body, this.opsi())),
      catchError(() => this.http.post(`${this.baseUrl}/t_mutasi_kas/penjualan`, body, this.opsi()))
    );
  }

  // Mencatat modal cadangan atau pengeluaran operasional/komunitas
  catatMutasi(payload: {
    pos_dana: PosDana;
    jumlah_rupiah: number; // positif (modal cadangan) atau negatif (pengeluaran)
    metode: MetodeBayar;
    pihak_terkait: string;
    bukti: string;
    keterangan: string;
    dicatat_oleh?: number;
    waktu_transaksi?: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/mutasi-kas`, payload, this.opsi()).pipe(
      catchError(() => this.http.post(`${this.baseUrl}/mutasi_kas`, payload, this.opsi())),
      catchError(() => this.http.post(`${this.baseUrl}/t_mutasi_kas`, payload, this.opsi()))
    );
  }
}
