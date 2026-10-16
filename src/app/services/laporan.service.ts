import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ItemMaterialSetoran {
  id_detail_setoran?: number;
  id_jenis_sampah: number;
  nama_jenis: string;
  berat_diterima_kg: number;
  berat_ditolak_kg: number;
  alasan_penolakan?: string | null;
  poin_per_kg_snapshot: number;
  subtotal_poin: number;
  estimasi_co2_kg?: number;
}

export interface LaporanSetoranItem {
  id_setoran: number;
  kode_setoran: string;
  tanggal: string; // YYYY-MM-DD
  waktu: string;
  id_pelanggan: number;
  nama_pelanggan: string;
  sumber_pelanggan: 'RUMAH_TANGGA' | 'UMKM_KULINER' | 'PEDAGANG_PASAR';
  metode: 'JEMPUT' | 'ANTAR_SENDIRI';
  id_drop_point: number;
  nama_drop_point: string;
  status: 'FINAL' | 'DIAJUKAN' | 'DITOLAK' | 'DRAFT';
  potongan_persen: number;
  total_berat_diterima: number;
  total_berat_ditolak: number;
  poin_kotor: number;
  potongan_poin: number;
  poin_bersih: number;
  estimasi_hemat_co2: number;
  petugas_timbang?: string;
  pengelola_verifikasi?: string;
  items: ItemMaterialSetoran[];
}

export interface FilterLaporan {
  tanggalMulai?: string;
  tanggalSelesai?: string;
  sumber?: string; // 'SEMUA' | 'RUMAH_TANGGA' | 'UMKM_KULINER' | 'PEDAGANG_PASAR'
  metode?: string; // 'SEMUA' | 'JEMPUT' | 'ANTAR_SENDIRI'
  material?: string; // 'SEMUA' atau nama material
  status?: string; // 'SEMUA' | 'FINAL' | 'DIAJUKAN'
  kataKunci?: string;
}

@Injectable({ providedIn: 'root' })
export class LaporanService {
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

  // Data komprehensif dummy jika server/dev tunnel offline
  private generateMockLaporan(): LaporanSetoranItem[] {
    return [
      {
        id_setoran: 101,
        kode_setoran: 'ST-101',
        tanggal: '2026-10-16',
        waktu: '09:30 WIB',
        id_pelanggan: 2,
        nama_pelanggan: 'Bapak Zafrans',
        sumber_pelanggan: 'RUMAH_TANGGA',
        metode: 'JEMPUT',
        id_drop_point: 1,
        nama_drop_point: 'Bank Sampah Cempaka',
        status: 'FINAL',
        potongan_persen: 10.0,
        total_berat_diterima: 14.5,
        total_berat_ditolak: 0.5,
        poin_kotor: 32500,
        potongan_poin: 3250,
        poin_bersih: 29250,
        estimasi_hemat_co2: 24.5,
        petugas_timbang: 'Kurir Perdi',
        pengelola_verifikasi: 'Syauqi Admin',
        items: [
          {
            id_jenis_sampah: 1,
            nama_jenis: 'Botol Plastik PET',
            berat_diterima_kg: 8.5,
            berat_ditolak_kg: 0.5,
            alasan_penolakan: 'Tercampur lumpur tanah',
            poin_per_kg_snapshot: 2500,
            subtotal_poin: 21250,
            estimasi_co2_kg: 12.75
          },
          {
            id_jenis_sampah: 2,
            nama_jenis: 'Kardus Bekas',
            berat_diterima_kg: 6.0,
            berat_ditolak_kg: 0.0,
            alasan_penolakan: null,
            poin_per_kg_snapshot: 1500,
            subtotal_poin: 9000,
            estimasi_co2_kg: 12.0
          }
        ]
      },
      {
        id_setoran: 102,
        kode_setoran: 'ST-102',
        tanggal: '2026-10-15',
        waktu: '11:15 WIB',
        id_pelanggan: 5,
        nama_pelanggan: 'Warung Nasi Bu Siti',
        sumber_pelanggan: 'UMKM_KULINER',
        metode: 'ANTAR_SENDIRI',
        id_drop_point: 1,
        nama_drop_point: 'Bank Sampah Cempaka',
        status: 'FINAL',
        potongan_persen: 0.0,
        total_berat_diterima: 22.0,
        total_berat_ditolak: 1.0,
        poin_kotor: 84000,
        potongan_poin: 0,
        poin_bersih: 84000,
        estimasi_hemat_co2: 74.0,
        petugas_timbang: 'Petugas Joko',
        pengelola_verifikasi: 'Syauqi Admin',
        items: [
          {
            id_jenis_sampah: 3,
            nama_jenis: 'Minyak Jelantah',
            berat_diterima_kg: 18.0,
            berat_ditolak_kg: 1.0,
            alasan_penolakan: 'Tercampur air terlalu banyak',
            poin_per_kg_snapshot: 4000,
            subtotal_poin: 72000,
            estimasi_co2_kg: 63.0
          },
          {
            id_jenis_sampah: 1,
            nama_jenis: 'Botol Plastik PET',
            berat_diterima_kg: 4.0,
            berat_ditolak_kg: 0.0,
            alasan_penolakan: null,
            poin_per_kg_snapshot: 2500,
            subtotal_poin: 10000,
            estimasi_co2_kg: 6.0
          }
        ]
      },
      {
        id_setoran: 103,
        kode_setoran: 'ST-103',
        tanggal: '2026-10-14',
        waktu: '14:00 WIB',
        id_pelanggan: 7,
        nama_pelanggan: 'Kios Buah Segar Pasar',
        sumber_pelanggan: 'PEDAGANG_PASAR',
        metode: 'JEMPUT',
        id_drop_point: 2,
        nama_drop_point: 'Bank Sampah Melati',
        status: 'FINAL',
        potongan_persen: 15.0,
        total_berat_diterima: 35.0,
        total_berat_ditolak: 2.5,
        poin_kotor: 52500,
        potongan_poin: 7875,
        poin_bersih: 44625,
        estimasi_hemat_co2: 70.0,
        petugas_timbang: 'Kurir Perdi',
        pengelola_verifikasi: 'Syauqi Admin',
        items: [
          {
            id_jenis_sampah: 2,
            nama_jenis: 'Kardus Bekas',
            berat_diterima_kg: 35.0,
            berat_ditolak_kg: 2.5,
            alasan_penolakan: 'Kardus basah terkena air hujan',
            poin_per_kg_snapshot: 1500,
            subtotal_poin: 52500,
            estimasi_co2_kg: 70.0
          }
        ]
      },
      {
        id_setoran: 104,
        kode_setoran: 'ST-104',
        tanggal: '2026-10-13',
        waktu: '10:20 WIB',
        id_pelanggan: 8,
        nama_pelanggan: 'Ibu Ratna Dewi',
        sumber_pelanggan: 'RUMAH_TANGGA',
        metode: 'ANTAR_SENDIRI',
        id_drop_point: 2,
        nama_drop_point: 'Bank Sampah Melati',
        status: 'FINAL',
        potongan_persen: 0.0,
        total_berat_diterima: 11.2,
        total_berat_ditolak: 0.0,
        poin_kotor: 28000,
        potongan_poin: 0,
        poin_bersih: 28000,
        estimasi_hemat_co2: 17.5,
        petugas_timbang: 'Petugas Joko',
        pengelola_verifikasi: 'Syauqi Admin',
        items: [
          {
            id_jenis_sampah: 1,
            nama_jenis: 'Botol Plastik PET',
            berat_diterima_kg: 6.2,
            berat_ditolak_kg: 0.0,
            alasan_penolakan: null,
            poin_per_kg_snapshot: 2500,
            subtotal_poin: 15500,
            estimasi_co2_kg: 9.3
          },
          {
            id_jenis_sampah: 4,
            nama_jenis: 'Kaca & Botol Beling',
            berat_diterima_kg: 5.0,
            berat_ditolak_kg: 0.0,
            alasan_penolakan: null,
            poin_per_kg_snapshot: 800,
            subtotal_poin: 4000,
            estimasi_co2_kg: 4.0
          }
        ]
      },
      {
        id_setoran: 105,
        kode_setoran: 'ST-105',
        tanggal: '2026-10-12',
        waktu: '15:45 WIB',
        id_pelanggan: 9,
        nama_pelanggan: 'Bengkel Motor Abadi',
        sumber_pelanggan: 'UMKM_KULINER',
        metode: 'JEMPUT',
        id_drop_point: 1,
        nama_drop_point: 'Bank Sampah Cempaka',
        status: 'FINAL',
        potongan_persen: 10.0,
        total_berat_diterima: 16.0,
        total_berat_ditolak: 1.0,
        poin_kotor: 56000,
        potongan_poin: 5600,
        poin_bersih: 50400,
        estimasi_hemat_co2: 67.2,
        petugas_timbang: 'Kurir Perdi',
        pengelola_verifikasi: 'Syauqi Admin',
        items: [
          {
            id_jenis_sampah: 5,
            nama_jenis: 'Kaleng & Logam',
            berat_diterima_kg: 16.0,
            berat_ditolak_kg: 1.0,
            alasan_penolakan: 'Logam tercampur limbah oli beracun',
            poin_per_kg_snapshot: 3500,
            subtotal_poin: 56000,
            estimasi_co2_kg: 67.2
          }
        ]
      }
    ];
  }

  // Mengambil data laporan dari API dengan fallback
  getLaporanPenyetoran(): Observable<LaporanSetoranItem[]> {
    return this.http.get<any>(`${this.baseUrl}/setoran`, this.opsi()).pipe(
      map((res) => {
        const data = Array.isArray(res) ? res : Array.isArray(res?.data) ? res.data : [];
        if (!data.length && environment.demoMode) {
          return this.generateMockLaporan();
        }

        return data.map((s: any) => {
          const id = s.id_setoran || s.id;
          const items: ItemMaterialSetoran[] = (s.details || s.detailMaterial || []).map((d: any) => ({
            id_detail_setoran: d.id_detail_setoran || d.id_detail,
            id_jenis_sampah: d.id_jenis_sampah,
            nama_jenis: d.nama_jenis || 'Material',
            berat_diterima_kg: Number(d.berat_diterima_kg || 0),
            berat_ditolak_kg: Number(d.berat_ditolak_kg || 0),
            alasan_penolakan: d.alasan_penolakan,
            poin_per_kg_snapshot: Number(d.poin_per_kg_snapshot || 0),
            subtotal_poin: Number(d.berat_diterima_kg || 0) * Number(d.poin_per_kg_snapshot || 0),
            estimasi_co2_kg: Number(d.berat_diterima_kg || 0) * 1.5
          }));

          const beratDiterima = items.reduce((acc, x) => acc + x.berat_diterima_kg, 0);
          const beratDitolak = items.reduce((acc, x) => acc + x.berat_ditolak_kg, 0);
          const poinKotor = items.reduce((acc, x) => acc + x.subtotal_poin, 0);
          const potonganPersen = Number(s.potongan_persen || s.potongan_persen_disepakati || 0);
          const potonganPoin = Math.floor((poinKotor * potonganPersen) / 100);
          const poinBersih = poinKotor - potonganPoin;

          const tanggalRaw = s.dibuat_pada || s.waktu_timbang || new Date().toISOString();
          const tanggal = tanggalRaw.substring(0, 10);

          let metode: 'JEMPUT' | 'ANTAR_SENDIRI' = 'ANTAR_SENDIRI';
          if (potonganPersen > 0 || s.id_penjemputan || s.alamat_jemput) {
            metode = 'JEMPUT';
          }

          let sumber: 'RUMAH_TANGGA' | 'UMKM_KULINER' | 'PEDAGANG_PASAR' = 'RUMAH_TANGGA';
          if (s.jenis_pelanggan) {
            sumber = s.jenis_pelanggan;
          }

          return {
            id_setoran: id,
            kode_setoran: `ST-${id}`,
            tanggal,
            waktu: tanggalRaw.substring(11, 16) + ' WIB',
            id_pelanggan: s.id_pelanggan || s.id_pengguna,
            nama_pelanggan: s.nama_pelanggan || s.nama_pengguna || s.nama || 'Pelanggan',
            sumber_pelanggan: sumber,
            metode,
            id_drop_point: s.id_drop_point,
            nama_drop_point: s.nama_drop_point || 'Drop point',
            status: ({1:'DRAFT',2:'DIAJUKAN',3:'FINAL',4:'DITOLAK'} as any)[s.status] || s.status,
            potongan_persen: potonganPersen,
            total_berat_diterima: beratDiterima || Number(s.total_berat_kg || 0),
            total_berat_ditolak: beratDitolak,
            poin_kotor: poinKotor,
            potongan_poin: potonganPoin,
            poin_bersih: poinBersih,
            estimasi_hemat_co2: Math.round(beratDiterima * 1.6 * 10) / 10,
            petugas_timbang: s.nama_petugas || 'Petugas Mitra',
            pengelola_verifikasi: s.nama_verifikator || 'Pengelola Drop Point',
            items
          };
        });
      }),
      catchError(error => environment.demoMode ? of(this.generateMockLaporan()) : throwError(() => error))
    );
  }
}
