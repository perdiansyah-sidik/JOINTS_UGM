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
    return this.http.post(`${this.apiUrl}/drop-points`, payload);
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
    return this.http.get(`${this.apiUrl}/setoran/kedatangan`);
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
    return this.http.put(`${this.apiUrl}/setoran/terima/${idSetoran}`, payload);
  }

  // ================= PENJUALAN MATERIAL & RETUR (T06 - ZAAFRANS) =================
  getDaftarPenjualan(idMitra?: number | null): Observable<any> {
    const query = idMitra ? `?id_mitra=${idMitra}` : '';
    return this.http.get(`${this.apiUrl}/penjualan${query}`);
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
    return this.http.post(`${this.apiUrl}/penjualan`, payload);
  }

  kirimDraftPenjualan(idPenjualan: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/penjualan/${idPenjualan}/kirim`, {});
  }

  batalkanDraftPenjualan(idPenjualan: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/penjualan/${idPenjualan}/batal`, {});
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
    return this.http.put(`${this.apiUrl}/penjualan/konfirmasi/${idPenjualan}`, payload);
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
