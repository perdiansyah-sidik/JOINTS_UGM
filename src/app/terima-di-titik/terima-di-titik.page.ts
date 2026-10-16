import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';

export interface ItemMaterialTitik {
  id_detail_setoran: number;
  id_jenis_sampah: number;
  jenis: string;
  beratDiterimaAwal: number;
  beratDitolakAwal: number;
  alasan_penolakan?: string | null;
  poin_per_kg_snapshot: number;
  beratMasukFisik: number | null;
}

export interface SetoranKedatanganModel {
  id_setoran: number;
  nomor: string;
  id_pengguna: number;
  pelanggan: string;
  peran_pelanggan?: number;
  nama_usaha?: string | null;
  id_drop_point: number;
  nama_drop_point?: string;
  status: number | string;
  status_label: string;
  status_drop_point: number | string;
  status_drop_point_label: string;
  metode_setor: 'DIJEMPUT' | 'ANTAR_SENDIRI';
  waktu_timbang?: string | null;
  waktu_verifikasi?: string | null;
  waktu_terima_drop_point?: string | null;
  catatan_serah_terima?: string | null;
  diterima_oleh?: number | null;
  nama_penerima?: string | null;
  nama_kurir?: string | null;
  masuk_stok: boolean;
  total_berat_awal_kg?: number;
  total_berat_masuk_kg?: number | null;
  jumlah_item_material?: number;
  detailMaterial: ItemMaterialTitik[];
}

@Component({
  selector: 'app-terima-di-titik',
  templateUrl: './terima-di-titik.page.html',
  styleUrls: ['./terima-di-titik.page.scss'],
  standalone: false
})
export class TerimaDiTitikPage implements OnInit {
  private router = inject(Router);
  private api = inject(ApiService);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private loadingCtrl = inject(LoadingController);

  nomorSetoran: string = '';
  filterStatusDp: 'SEMUA' | 'MENUNGGU' | 'SELISIH' | 'DITERIMA' = 'SEMUA';

  daftarAntrean: SetoranKedatanganModel[] = [];
  daftarAntreanTampil: SetoranKedatanganModel[] = [];
  loadingList: boolean = false;

  dataSetoran: SetoranKedatanganModel | null = null;
  adaSelisih: boolean = false;
  catatanPenerimaan: string = '';

  idPengelolaLogin: number = 1;
  namaPengelolaLogin: string = 'Pak Andi (Pengelola)';

  private readonly STORAGE_KEY_T05 = 'pilahin_cache_kedatangan_t05';

  ngOnInit() {
    this.ambilSesiPengelola();
    this.muatDaftarKedatangan();
  }

  ionViewWillEnter() {
    this.ambilSesiPengelola();
    this.muatDaftarKedatangan();
  }

  ambilSesiPengelola() {
    const sesi = localStorage.getItem('ecoapp_user');
    if (sesi) {
      try {
        const user = JSON.parse(sesi);
        if (user.id_pengguna) this.idPengelolaLogin = Number(user.id_pengguna);
        if (user.nama) this.namaPengelolaLogin = user.nama;
      } catch (e) {}
    }
  }

  private getDefaultKedatangan(): SetoranKedatanganModel[] {
    if (!environment.demoMode) return [];
    const cached = localStorage.getItem(this.STORAGE_KEY_T05);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }

    const seed: SetoranKedatanganModel[] = [
      {
        id_setoran: 101,
        nomor: 'STR-101',
        id_pengguna: 3,
        pelanggan: 'Bu Siti Aminah',
        peran_pelanggan: 1,
        nama_usaha: null,
        id_drop_point: 1,
        nama_drop_point: 'Drop Point Pasar Blok A',
        status: 3,
        status_label: 'FINAL',
        status_drop_point: 1,
        status_drop_point_label: 'MENUNGGU',
        metode_setor: 'DIJEMPUT',
        waktu_timbang: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
        waktu_verifikasi: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
        waktu_terima_drop_point: null,
        catatan_serah_terima: null,
        diterima_oleh: null,
        nama_penerima: null,
        nama_kurir: 'Budi Santoso (Mitra)',
        masuk_stok: false,
        total_berat_awal_kg: 18.5,
        total_berat_masuk_kg: null,
        jumlah_item_material: 2,
        detailMaterial: [
          {
            id_detail_setoran: 201,
            id_jenis_sampah: 1,
            jenis: 'Plastik',
            beratDiterimaAwal: 10.5,
            beratDitolakAwal: 0.5,
            alasan_penolakan: 'Tercampur plastik multilayer',
            poin_per_kg_snapshot: 300,
            beratMasukFisik: 10.5
          },
          {
            id_detail_setoran: 202,
            id_jenis_sampah: 2,
            jenis: 'Kardus',
            beratDiterimaAwal: 8.0,
            beratDitolakAwal: 0,
            alasan_penolakan: null,
            poin_per_kg_snapshot: 200,
            beratMasukFisik: 8.0
          }
        ]
      },
      {
        id_setoran: 102,
        nomor: 'STR-102',
        id_pengguna: 4,
        pelanggan: 'Warung Makan Sederhana',
        peran_pelanggan: 2,
        nama_usaha: 'WM Sederhana Jaya',
        id_drop_point: 1,
        nama_drop_point: 'Drop Point Pasar Blok A',
        status: 3,
        status_label: 'FINAL',
        status_drop_point: 2,
        status_drop_point_label: 'SELISIH',
        metode_setor: 'DIJEMPUT',
        waktu_timbang: new Date(Date.now() - 3600 * 1000 * 6).toISOString(),
        waktu_verifikasi: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
        waktu_terima_drop_point: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
        catatan_serah_terima: '1 karung botol kaca masih tertinggal di armada jemput, menunggu pengantaran susulan.',
        diterima_oleh: 1,
        nama_penerima: 'Pak Andi (Pengelola)',
        nama_kurir: 'Budi Santoso (Mitra)',
        masuk_stok: false,
        total_berat_awal_kg: 15.0,
        total_berat_masuk_kg: 12.5,
        jumlah_item_material: 2,
        detailMaterial: [
          {
            id_detail_setoran: 203,
            id_jenis_sampah: 3,
            jenis: 'Kaca',
            beratDiterimaAwal: 9.0,
            beratDitolakAwal: 0,
            alasan_penolakan: null,
            poin_per_kg_snapshot: 150,
            beratMasukFisik: 6.5
          },
          {
            id_detail_setoran: 204,
            id_jenis_sampah: 4,
            jenis: 'Logam',
            beratDiterimaAwal: 6.0,
            beratDitolakAwal: 0,
            alasan_penolakan: null,
            poin_per_kg_snapshot: 500,
            beratMasukFisik: 6.0
          }
        ]
      },
      {
        id_setoran: 103,
        nomor: 'STR-103',
        id_pengguna: 5,
        pelanggan: 'Pak Hendra (Lapak Sayur Blok B)',
        peran_pelanggan: 3,
        nama_usaha: 'Lapak Hendra Pasar',
        id_drop_point: 1,
        nama_drop_point: 'Drop Point Pasar Blok A',
        status: 3,
        status_label: 'FINAL',
        status_drop_point: 3,
        status_drop_point_label: 'DITERIMA',
        metode_setor: 'ANTAR_SENDIRI',
        waktu_timbang: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
        waktu_verifikasi: new Date(Date.now() - 3600 * 1000 * 11).toISOString(),
        waktu_terima_drop_point: new Date(Date.now() - 3600 * 1000 * 11).toISOString(),
        catatan_serah_terima: 'Diterima lengkap di titik sesuai hasil timbang.',
        diterima_oleh: 1,
        nama_penerima: 'Pak Andi (Pengelola)',
        nama_kurir: null,
        masuk_stok: true,
        total_berat_awal_kg: 24.0,
        total_berat_masuk_kg: 24.0,
        jumlah_item_material: 2,
        detailMaterial: [
          {
            id_detail_setoran: 205,
            id_jenis_sampah: 1,
            jenis: 'Plastik',
            beratDiterimaAwal: 14.0,
            beratDitolakAwal: 0,
            alasan_penolakan: null,
            poin_per_kg_snapshot: 300,
            beratMasukFisik: 14.0
          },
          {
            id_detail_setoran: 206,
            id_jenis_sampah: 2,
            jenis: 'Kardus',
            beratDiterimaAwal: 10.0,
            beratDitolakAwal: 0,
            alasan_penolakan: null,
            poin_per_kg_snapshot: 200,
            beratMasukFisik: 10.0
          }
        ]
      }
    ];
    localStorage.setItem(this.STORAGE_KEY_T05, JSON.stringify(seed));
    return seed;
  }

  private simpanCacheKedatangan(list: SetoranKedatanganModel[]) {
    if (!environment.demoMode) return;
    localStorage.setItem(this.STORAGE_KEY_T05, JSON.stringify(list));
  }

  isUsingFallback: boolean = false;

  muatDaftarKedatangan(event?: any) {
    this.loadingList = true;
    this.api.getAntreanKedatanganSetoran().subscribe({
      next: (res: any) => {
        if (res && res.status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
          this.isUsingFallback = false;
          this.daftarAntrean = res.data;
          this.simpanCacheKedatangan(this.daftarAntrean);
        } else {
          this.isUsingFallback = true;
          this.daftarAntrean = this.getDefaultKedatangan();
        }
        this.terapkanFilterAntrean();
        this.loadingList = false;
        if (event?.target) event.target.complete();
      },
      error: () => {
        this.isUsingFallback = true;
        this.daftarAntrean = this.getDefaultKedatangan();
        this.terapkanFilterAntrean();
        this.loadingList = false;
        if (event?.target) event.target.complete();
      }
    });
  }

  // Statistik Header T05
  get jmlMenunggu(): number {
    return this.daftarAntrean.filter(s => s.status_drop_point_label === 'MENUNGGU' || Number(s.status_drop_point) === 1).length;
  }
  get jmlSelisih(): number {
    return this.daftarAntrean.filter(s => s.status_drop_point_label === 'SELISIH' || Number(s.status_drop_point) === 2).length;
  }
  get jmlDiterima(): number {
    return this.daftarAntrean.filter(s => s.status_drop_point_label === 'DITERIMA' || Number(s.status_drop_point) === 3).length;
  }
  get jmlMasukStok(): number {
    return this.daftarAntrean.filter(s => s.masuk_stok).length;
  }

  pilihFilterStatus(status: 'SEMUA' | 'MENUNGGU' | 'SELISIH' | 'DITERIMA') {
    this.filterStatusDp = status;
    this.terapkanFilterAntrean();
  }

  terapkanFilterAntrean() {
    let list = [...this.daftarAntrean];

    if (this.filterStatusDp !== 'SEMUA') {
      list = list.filter(s => s.status_drop_point_label === this.filterStatusDp);
    }

    if (this.nomorSetoran && this.nomorSetoran.trim() !== '') {
      const q = this.nomorSetoran.trim().toLowerCase();
      const digits = q.replace(/\D/g, '');
      list = list.filter(s =>
        (s.nomor && s.nomor.toLowerCase().includes(q)) ||
        (digits && String(s.id_setoran) === digits) ||
        (s.pelanggan && s.pelanggan.toLowerCase().includes(q))
      );
    }

    this.daftarAntreanTampil = list;
  }

  // 1. MENGAMBIL DATA DETAIL SETORAN DARI API ATAU CACHE (GET)
  async cariSetoran(idAtauNomor?: string | number) {
    const targetInput = idAtauNomor !== undefined ? String(idAtauNomor) : this.nomorSetoran;
    if (!targetInput || !targetInput.trim()) {
      this.tampilToast('Masukkan Nomor Setoran terlebih dahulu (contoh: STR-101 atau 101).', 'warning');
      return;
    }

    const digits = targetInput.replace(/\D/g, '');
    const idPencarian = digits || targetInput.trim();
    const idNum = Number(idPencarian);

    // Jika sedang mode fallback lokal dan ID ada di daftar lokal, langsung buka tanpa memicu 404 ke server
    if (environment.demoMode && this.isUsingFallback) {
      const localMatch = this.daftarAntrean.find(x => Number(x.id_setoran) === idNum && Array.isArray(x.detailMaterial) && x.detailMaterial.length > 0);
      if (localMatch) {
        this.setDataSetoranAktif(JSON.parse(JSON.stringify(localMatch)));
        return;
      }
    }

    const loading = await this.loadingCtrl.create({
      message: `Memuat rincian setoran #${idPencarian}...`,
      spinner: 'crescent'
    });
    await loading.present();

    this.api.getDetailSetoranTitik(idPencarian).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        if (res && res.status === 'success' && res.data) {
          this.setDataSetoranAktif(res.data);
        } else {
          this.cariDariCacheLokal(idNum);
        }
      },
      error: async () => {
        await loading.dismiss();
        this.cariDariCacheLokal(idNum);
      }
    });
  }

  private cariDariCacheLokal(idNum: number) {
    if (!environment.demoMode) { this.tampilToast(`Setoran #${idNum} tidak dapat dimuat dari server.`, 'danger'); return; }
    const list = this.getDefaultKedatangan();
    const found = list.find(x => Number(x.id_setoran) === Number(idNum));
    if (found) {
      this.setDataSetoranAktif(JSON.parse(JSON.stringify(found)));
    } else {
      this.tampilToast(`Setoran dengan nomor #${idNum} tidak ditemukan.`, 'danger');
      this.dataSetoran = null;
    }
  }

  private setDataSetoranAktif(raw: any) {
    const detail: ItemMaterialTitik[] = Array.isArray(raw.detailMaterial)
      ? raw.detailMaterial.map((d: any) => ({
          id_detail_setoran: d.id_detail_setoran,
          id_jenis_sampah: d.id_jenis_sampah,
          jenis: d.jenis || d.nama_jenis || 'Material',
          beratDiterimaAwal: Number(d.beratDiterimaAwal ?? d.berat_diterima_kg ?? 0),
          beratDitolakAwal: Number(d.beratDitolakAwal ?? d.berat_ditolak_kg ?? 0),
          alasan_penolakan: d.alasan_penolakan || null,
          poin_per_kg_snapshot: Number(d.poin_per_kg_snapshot || 0),
          beratMasukFisik:
            d.beratMasukFisik !== null && d.beratMasukFisik !== undefined
              ? Number(d.beratMasukFisik)
              : Number(d.beratDiterimaAwal ?? d.berat_diterima_kg ?? 0)
        }))
      : [];

    this.dataSetoran = {
      ...raw,
      nomor: raw.nomor || `STR-${String(raw.id_setoran).padStart(3, '0')}`,
      status_label: raw.status_label || (Number(raw.status) === 3 ? 'FINAL' : 'DIAJUKAN'),
      status_drop_point_label: raw.status_drop_point_label || 'MENUNGGU',
      detailMaterial: detail
    };

    this.catatanPenerimaan = raw.catatan_serah_terima || '';
    this.cekSelisih();
  }

  tutupDetailPemeriksaan() {
    this.dataSetoran = null;
    this.adaSelisih = false;
    this.catatanPenerimaan = '';
  }

  samakanSemuaBeratAwal() {
    if (!this.dataSetoran) return;
    for (const item of this.dataSetoran.detailMaterial) {
      item.beratMasukFisik = Number(item.beratDiterimaAwal);
    }
    this.cekSelisih();
    this.tampilToast('Seluruh berat masuk fisik disamakan dengan berat timbang awal.', 'primary');
  }

  cekSelisih() {
    this.adaSelisih = false;
    if (this.dataSetoran && Array.isArray(this.dataSetoran.detailMaterial)) {
      for (const item of this.dataSetoran.detailMaterial) {
        if (
          item.beratMasukFisik !== null &&
          item.beratMasukFisik !== undefined &&
          Math.abs(Number(item.beratMasukFisik) - Number(item.beratDiterimaAwal)) > 0.0005
        ) {
          this.adaSelisih = true;
          break;
        }
      }
    }
  }

  getSelisihItem(item: ItemMaterialTitik): number {
    const fisik = Number(item.beratMasukFisik ?? 0);
    const awal = Number(item.beratDiterimaAwal ?? 0);
    return Number((fisik - awal).toFixed(3));
  }

  get totalBeratAwalDetail(): number {
    if (!this.dataSetoran) return 0;
    return Number(this.dataSetoran.detailMaterial.reduce((a, b) => a + Number(b.beratDiterimaAwal || 0), 0).toFixed(3));
  }

  get totalBeratFisikDetail(): number {
    if (!this.dataSetoran) return 0;
    return Number(this.dataSetoran.detailMaterial.reduce((a, b) => a + Number(b.beratMasukFisik || 0), 0).toFixed(3));
  }

  // 2. MENGIRIM DATA KONFIRMASI PENERIMAAN FISIK KE API (PUT /api/setoran/terima/:id_setoran)
  async simpanPenerimaan() {
    if (!this.dataSetoran) return;

    // Validasi setiap material wajib memiliki beratMasukFisik >= 0
    for (const item of this.dataSetoran.detailMaterial) {
      if (
        item.beratMasukFisik === null ||
        item.beratMasukFisik === undefined ||
        String(item.beratMasukFisik).trim() === '' ||
        Number.isNaN(Number(item.beratMasukFisik)) ||
        Number(item.beratMasukFisik) < 0
      ) {
        this.tampilToast(`Berat masuk fisik untuk ${item.jenis} wajib diisi angka >= 0 kg!`, 'warning');
        return;
      }
    }

    this.cekSelisih();
    const statusAkhirLabel = this.adaSelisih ? 'SELISIH' : 'DITERIMA';
    const kodeStatusInt = this.adaSelisih ? 2 : 3;
    const catatanBersih = (this.catatanPenerimaan || '').trim();

    if (this.adaSelisih && !catatanBersih) {
      this.tampilToast('Terdapat selisih berat! Catatan Serah Terima wajib diisi sesuai kamus data.', 'warning');
      return;
    }

    if (catatanBersih.length > 500) {
      this.tampilToast('Catatan Serah Terima maksimal 500 karakter (NVARCHAR(500))!', 'warning');
      return;
    }

    const payload = {
      status_drop_point: kodeStatusInt,
      status_terima_drop_point: statusAkhirLabel,
      catatan_serah_terima: catatanBersih || null,
      diterima_oleh: this.idPengelolaLogin,
      detailMaterial: this.dataSetoran.detailMaterial.map(d => ({
        id_detail_setoran: d.id_detail_setoran,
        jenis: d.jenis,
        beratDiterimaAwal: Number(d.beratDiterimaAwal),
        beratMasukFisik: Number(Number(d.beratMasukFisik).toFixed(3))
      }))
    };

    const loading = await this.loadingCtrl.create({
      message: 'Menyimpan penerimaan fisik di Drop Point...',
      spinner: 'crescent'
    });
    await loading.present();

    const idSetoran = this.dataSetoran.id_setoran;

    this.api.simpanPenerimaanFisikDropPoint(idSetoran, payload).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        this.perbaruiCacheSetoranLokal(idSetoran, kodeStatusInt, statusAkhirLabel, catatanBersih);
        await this.tampilToast(
          res?.message || `Kedatangan fisik ${this.dataSetoran?.nomor} berhasil dicatat dengan status ${statusAkhirLabel}!`,
          kodeStatusInt === 3 ? 'success' : 'warning'
        );
        this.tutupDetailPemeriksaan();
        this.muatDaftarKedatangan();
      },
      error: async (err) => {
        await loading.dismiss();
        if (environment.demoMode && (!err?.status || err.status === 0 || err.status === 404 || err.status >= 500)) {
          this.perbaruiCacheSetoranLokal(idSetoran, kodeStatusInt, statusAkhirLabel, catatanBersih);
          const masukStok = this.dataSetoran?.status_label === 'FINAL' && kodeStatusInt === 3;
          await this.tampilToast(
            masukStok
              ? `Penerimaan fisik DITERIMA & setoran FINAL. Material resmi masuk ke stok tersedia Drop Point!`
              : `Kedatangan dicatat sebagai ${statusAkhirLabel} (Belum masuk stok tersedia sampai diselesaikan).`,
            kodeStatusInt === 3 ? 'success' : 'warning'
          );
          this.tutupDetailPemeriksaan();
          this.muatDaftarKedatangan();
        } else {
          await this.tampilToast(err?.error?.message || 'Gagal menyimpan konfirmasi penerimaan.', 'danger');
        }
      }
    });
  }

  private perbaruiCacheSetoranLokal(idSetoran: number, kodeInt: number, label: string, catatan: string) {
    if (!environment.demoMode) return;
    try {
      const list = this.getDefaultKedatangan();
      const idx = list.findIndex(s => Number(s.id_setoran) === Number(idSetoran));
      if (idx >= 0 && this.dataSetoran) {
        const totalFisik = Number(
          this.dataSetoran.detailMaterial.reduce((a, b) => a + Number(b.beratMasukFisik || 0), 0).toFixed(3)
        );
        const isFinal = list[idx].status_label === 'FINAL' || Number(list[idx].status) === 3;
        list[idx] = {
          ...list[idx],
          status_drop_point: kodeInt,
          status_drop_point_label: label,
          catatan_serah_terima: catatan || null,
          diterima_oleh: this.idPengelolaLogin,
          nama_penerima: this.namaPengelolaLogin,
          waktu_terima_drop_point: new Date().toISOString(),
          masuk_stok: isFinal && kodeInt === 3,
          total_berat_masuk_kg: totalFisik,
          detailMaterial: this.dataSetoran.detailMaterial.map(d => ({
            ...d,
            beratMasukFisik: Number(Number(d.beratMasukFisik).toFixed(3))
          }))
        };
        this.simpanCacheKedatangan(list);
      }
    } catch (e) {}
  }

  async tampilToast(message: string, color: 'success' | 'warning' | 'danger' | 'primary' = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2800,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
