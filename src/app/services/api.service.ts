import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
    return this.http.get(`${this.apiUrl}/profil`);
  }

  updateProfil(idPengguna: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profil`, data);
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
    return this.http.get(`${this.apiUrl}/setoran`);
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
    return this.http.patch(`${this.apiUrl}/pencairan/${idPencairan}/status`, data);
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
    alamat_mitra: string;
    dibuat_oleh?: number | null;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/mitra`, payload);
  }

  updateMitra(idMitra: number, payload: {
    nama_mitra: string;
    nama_penanggung_jawab?: string | null;
    no_hp?: string | null;
    alamat_mitra: string;
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

  getRingkasanPengelola(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard-pengelola`);
  }

  // ================= MASTER DROP POINT (M03 - ZAAFRANS) =================
  getDropPointList(hanyaAktif?: boolean): Observable<any> {
    const query = hanyaAktif ? '?aktif=1' : '';
    return this.http.get(`${this.apiUrl}/drop-points${query}`);
  }

  getDropPointDetail(idDropPoint: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/drop-points/${idDropPoint}`);
  }

  tambahDropPoint(payload: {
    nama_drop_point: string;
    alamat: string;
    jam_operasional: string;
    latitude?: number | null;
    longitude?: number | null;
    nama_komunitas?: string | null;
    kontak_komunitas?: string | null;
    aktif?: number;
    dibuat_oleh?: number | null;
  }): Observable<any> {
    if (environment.demoMode) return this.http.post(`${this.apiUrl}/drop-points`, payload);
    const { aktif, dibuat_oleh, ...body } = payload;
    return this.http.post<any>(`${this.apiUrl}/drop-points`, body).pipe(
      switchMap(res => aktif === 0 ? this.http.patch(`${this.apiUrl}/drop-points/${res.data.id_drop_point}/status`, { aktif: 0 }) : of(res))
    );
  }

  updateDropPoint(idDropPoint: number, payload: {
    nama_drop_point: string;
    alamat: string;
    jam_operasional: string;
    latitude?: number | null;
    longitude?: number | null;
    nama_komunitas?: string | null;
    kontak_komunitas?: string | null;
    aktif?: number;
    diubah_oleh?: number | null;
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}/drop-points/${idDropPoint}`, payload);
  }

  ubahStatusDropPoint(idDropPoint: number, aktif: number, diubahOleh?: number | null): Observable<any> {
    return this.http.patch(`${this.apiUrl}/drop-points/${idDropPoint}/status`, {
      aktif,
      diubah_oleh: diubahOleh ?? null
    });
  }

  hapusDropPoint(idDropPoint: number, diubahOleh?: number | null): Observable<any> {
    const query = diubahOleh ? `?diubah_oleh=${diubahOleh}` : '';
    return this.http.delete(`${this.apiUrl}/drop-points/${idDropPoint}${query}`);
  }

  // ================= PENERIMAAN FISIK DI DROP POINT (T05 - ZAAFRANS) =================
  getAntreanKedatanganSetoran(): Observable<any> {
    if (environment.demoMode) return this.http.get(`${this.apiUrl}/setoran/kedatangan`);
    return this.http.get<any>(`${this.apiUrl}/setoran`).pipe(map(res => ({...res, data: (res.data || []).filter((s: any) => [2, 3].includes(Number(s.status))).map((s: any) => ({
      ...s, nomor: `STR-${String(s.id_setoran).padStart(3, '0')}`, pelanggan: s.nama_pelanggan || s.nama || '',
      status_label: Number(s.status) === 3 ? 'FINAL' : 'DITIMBANG',
      status_drop_point_label: ({1:'MENUNGGU',2:'SELISIH',3:'DITERIMA'} as Record<number,string>)[Number(s.status_drop_point)] || 'MENUNGGU',
      masuk_stok: Number(s.status) === 3 && Number(s.status_drop_point) === 3
    })) })));
  }

  getDetailSetoranTitik(nomorAtauId: string | number): Observable<any> {
    return this.http.get(`${this.apiUrl}/setoran/detail/${encodeURIComponent(String(nomorAtauId).trim())}`);
  }

  simpanPenerimaanFisikDropPoint(idSetoran: number, payload: {
    status_drop_point?: number | string;
    status_terima_drop_point?: string;
    catatan_serah_terima?: string | null;
    diterima_oleh?: number | null;
    detailMaterial: Array<{
      id_detail_setoran: number;
      jenis?: string;
      beratDiterimaAwal?: number | null;
      beratMasukFisik: number;
    }>;
  }): Observable<any> {
    if (environment.demoMode) return this.http.put(`${this.apiUrl}/setoran/terima/${idSetoran}`, payload);
    return this.http.put(`${this.apiUrl}/setoran/terima/${idSetoran}`, {
      status_terima_drop_point: payload.status_terima_drop_point,
      catatan_serah_terima: payload.catatan_serah_terima,
      detailMaterial: payload.detailMaterial.map(d => ({ id_detail_setoran: d.id_detail_setoran, beratMasukFisik: d.beratMasukFisik }))
    });
  }

  // ================= PENJUALAN MATERIAL & RETUR (T06 - ZAAFRANS) =================
  getDaftarPenjualan(idMitra?: number | null): Observable<any> {
    const query = idMitra ? `?id_mitra=${idMitra}` : '';
    if (environment.demoMode) return this.http.get(`${this.apiUrl}/penjualan${query}`);
    return this.http.get<any>(`${this.apiUrl}/penjualan${query}`).pipe(switchMap(res => {
      const sales: any[] = res.data || [];
      if (!sales.length) return of({...res, data: []});
      return forkJoin(sales.map(s => this.http.get<any>(`${this.apiUrl}/penjualan/${s.id_penjualan}`).pipe(map(detailRes => {
        const raw = detailRes.data;
        const details = (raw.detail || []).map((d: any) => ({...d,
          nama_jenis: d.nama_jenis || `Material #${d.id_jenis_sampah}`,
          berat_dikirim_kg: Number(d.berat_dikirim_kg),
          berat_diterima_kg: d.berat_diterima_kg === null ? null : Number(d.berat_diterima_kg),
          berat_ditolak_kg: d.berat_ditolak_kg === null ? null : Number(d.berat_ditolak_kg),
          harga_per_kg_snapshot: Number(d.harga_per_kg_snapshot),
          berat_retur_kembali_kg: Number(d.berat_retur_kembali_kg || 0),
          perlu_retur: Number(d.berat_ditolak_kg || 0) > Number(d.berat_retur_kembali_kg || 0)
        }));
        return {...raw, kode_penjualan: `PJL-${raw.id_penjualan}`,
          status_pelunasan: raw.status === 'DIBATALKAN' ? 'DIBATALKAN' : ['DRAFT','DIKIRIM'].includes(raw.status) ? 'MENUNGGU_KONFIRMASI' : 'BELUM_LUNAS',
          detailPenjualan: details,
          total_dikirim_kg: details.reduce((a: number,d: any) => a+d.berat_dikirim_kg,0),
          total_diterima_kg: details.reduce((a: number,d: any) => a+Number(d.berat_diterima_kg || 0),0),
          total_ditolak_kg: details.reduce((a: number,d: any) => a+Number(d.berat_ditolak_kg || 0),0),
          total_retur_kg: details.reduce((a: number,d: any) => a+d.berat_retur_kembali_kg,0),
          total_tagihan_rp: Number(raw.total_tagihan || 0),
          ada_retur_tertunda: details.some((d: any) => d.perlu_retur)
        };
      })))).pipe(map(data => ({...res, data})));
    }));
  }

  buatPenjualan(payload: {
    id_drop_point?: number;
    id_mitra: number;
    dibuat_oleh?: number | null;
    mode_simpan: 'DRAFT' | 'DIKIRIM';
    request_key?: string;
    catatan?: string | null;
    detailPenjualan: Array<{
      id_jenis_sampah: number;
      berat_dikirim_kg: number;
      harga_per_kg_snapshot: number;
    }>;
  }): Observable<any> {
    if (environment.demoMode) return this.http.post(`${this.apiUrl}/penjualan`, payload);
    const { mode_simpan, dibuat_oleh, ...body } = payload;
    return this.http.post<any>(`${this.apiUrl}/penjualan`, { ...body, request_key: body.request_key || crypto.randomUUID() }).pipe(
      switchMap(res => mode_simpan === 'DIKIRIM' ? this.kirimDraftPenjualan(res.data.id_penjualan) : of(res))
    );
  }

  kirimDraftPenjualan(idPenjualan: number): Observable<any> {
    return environment.demoMode ? this.http.put(`${this.apiUrl}/penjualan/${idPenjualan}/kirim`, {}) : this.http.patch(`${this.apiUrl}/penjualan/${idPenjualan}/kirim`, {});
  }

  batalkanDraftPenjualan(idPenjualan: number): Observable<any> {
    return environment.demoMode ? this.http.put(`${this.apiUrl}/penjualan/${idPenjualan}/batal`, {}) : this.http.patch(`${this.apiUrl}/penjualan/${idPenjualan}/batal`, {});
  }

  konfirmasiPenerimaanMitra(idPenjualan: number, payload: {
    dikonfirmasi_oleh?: number | null;
    id_mitra?: number | null;
    detailKonfirmasi: Array<{
      id_detail_penjualan: number;
      berat_diterima_kg: number;
      berat_ditolak_kg: number;
      alasan_penolakan?: string | null;
      catatan_selisih_timbang?: string | null;
    }>;
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}/penjualan/konfirmasi/${idPenjualan}`, environment.demoMode ? payload : { detail: payload.detailKonfirmasi });
  }

  catatReturFisikKembali(idDetailPenjualan: number, beratReturKembaliKg: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/penjualan/retur/${idDetailPenjualan}`, {
      berat_retur_kembali_kg: beratReturKembaliKg
    });
  }

  // ================= LAPORAN STOK & PENJUALAN (LAPORAN 3 - ZAAFRANS) =================
  getLaporanStokPenjualan(): Observable<any> {
    return this.http.get(`${this.apiUrl}/laporan/stok`);
  }
}
