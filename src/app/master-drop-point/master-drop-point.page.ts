import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';

export interface DropPointModel {
  id_drop_point: number;
  nama_drop_point: string;
  alamat: string;
  latitude: number | null;
  longitude: number | null;
  jam_operasional: string;
  nama_komunitas: string | null;
  kontak_komunitas: string | null;
  aktif: number;
  is_deleted?: number;
  dibuat_oleh?: number | null;
  dibuat_pada?: string;
  diubah_oleh?: number | null;
  diubah_pada?: string;
}

@Component({
  selector: 'app-master-drop-point',
  templateUrl: './master-drop-point.page.html',
  styleUrls: ['./master-drop-point.page.scss'],
  standalone: false
})
export class MasterDropPointPage implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  listDropPoint: DropPointModel[] = [];
  daftarDropPointTampil: DropPointModel[] = [];
  loading: boolean = true;

  kataKunci: string = '';
  filterStatus: 'SEMUA' | 'AKTIF' | 'NONAKTIF' = 'SEMUA';

  idPengelolaLogin: number = 1;
  peranLogin: number = 4; // 4 = Pengelola, 1/2/3 = Pelanggan, 5 = Mitra

  tampilModalDetail: boolean = false;
  dropPointTerpilih: DropPointModel | null = null;

  private readonly STORAGE_KEY = 'pilahin_cache_drop_points';

  ngOnInit() {
    this.ambilSesiPengguna();
    this.muatData();
  }

  ionViewWillEnter() {
    this.ambilSesiPengguna();
    this.muatData();
  }

  ambilSesiPengguna() {
    const sesi = localStorage.getItem('ecoapp_user');
    if (sesi) {
      try {
        const user = JSON.parse(sesi);
        if (user.id_pengguna) this.idPengelolaLogin = Number(user.id_pengguna);
        if (user.peran) this.peranLogin = Number(user.peran);
      } catch (e) {
        console.error(e);
      }
    }
  }

  get isPengelola(): boolean {
    return this.peranLogin === 4;
  }

  private getDefaultDropPoints(): DropPointModel[] {
    if (!environment.demoMode) return [];
    const cached = localStorage.getItem(this.STORAGE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    const seed: DropPointModel[] = [
      {
        id_drop_point: 1,
        nama_drop_point: 'Drop Point Pasar Blok A',
        alamat: 'Jl. RS Fatmawati Raya No. 12, Kebayoran Baru, Jakarta Selatan',
        latitude: -6.259124,
        longitude: 106.797215,
        jam_operasional: 'Senin - Sabtu (08.00 - 16.00 WIB)',
        nama_komunitas: 'Paguyuban Blok A',
        kontak_komunitas: '081288990011',
        aktif: 1,
        is_deleted: 0,
        dibuat_oleh: 1,
        dibuat_pada: new Date().toISOString()
      }
    ];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }

  private simpanCacheLokal(data: DropPointModel[]) {
    if (!environment.demoMode) return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  muatData(event?: any) {
    this.loading = true;
    this.api.getDropPointList().subscribe({
      next: (res: any) => {
        const localItems = this.getDefaultDropPoints().filter(d => Number(d.is_deleted || 0) === 0);
        if (res && res.status === 'success' && Array.isArray(res.data)) {
          const serverItems = res.data.filter((d: any) => Number(d.is_deleted || 0) === 0);
          // Gabungkan item lokal yang baru ditambah jika belum ada di server (ketika POST masih 404)
          const merged = [...serverItems];
          for (const loc of localItems) {
            if (!merged.some(s => Number(s.id_drop_point) === Number(loc.id_drop_point) || (s.nama_drop_point && loc.nama_drop_point && s.nama_drop_point.toLowerCase() === loc.nama_drop_point.toLowerCase()))) {
              merged.unshift(loc);
            }
          }
          this.listDropPoint = merged;
          this.simpanCacheLokal(this.listDropPoint);
        } else {
          this.listDropPoint = localItems;
        }
        this.terapkanFilter();
        this.loading = false;
        if (event?.target) event.target.complete();
      },
      error: () => {
        // Fallback ke local cache sehingga meskipun tanpa API server hidup tetap 100% jalan
        this.listDropPoint = this.getDefaultDropPoints().filter(d => Number(d.is_deleted || 0) === 0);
        this.terapkanFilter();
        this.loading = false;
        if (event?.target) event.target.complete();
      }
    });
  }

  // MENGHITUNG STATISTIK BANNER
  get totalDP() { return this.listDropPoint.length; }
  get totalDPAktif() { return this.listDropPoint.filter(dp => Number(dp.aktif) === 1).length; }
  get totalDPNonaktif() { return this.listDropPoint.filter(dp => Number(dp.aktif) === 0).length; }
  get totalKomunitasTerdaftar() {
    return this.listDropPoint.filter(dp => dp.nama_komunitas && dp.nama_komunitas.trim() !== '').length;
  }

  pilihFilterStatus(status: 'SEMUA' | 'AKTIF' | 'NONAKTIF') {
    this.filterStatus = status;
    this.terapkanFilter();
  }

  terapkanFilter() {
    let filtered = [...this.listDropPoint];

    if (this.filterStatus === 'AKTIF') {
      filtered = filtered.filter(dp => Number(dp.aktif) === 1);
    } else if (this.filterStatus === 'NONAKTIF') {
      filtered = filtered.filter(dp => Number(dp.aktif) === 0);
    }

    if (this.kataKunci && this.kataKunci.trim() !== '') {
      const key = this.kataKunci.trim().toLowerCase();
      filtered = filtered.filter(dp =>
        (dp.nama_drop_point && dp.nama_drop_point.toLowerCase().includes(key)) ||
        (dp.alamat && dp.alamat.toLowerCase().includes(key)) ||
        (dp.nama_komunitas && dp.nama_komunitas.toLowerCase().includes(key)) ||
        (dp.jam_operasional && dp.jam_operasional.toLowerCase().includes(key))
      );
    }

    this.daftarDropPointTampil = filtered;
  }

  // Sesuai Kamus Data: "Maps URL dapat memakai alamat jika koordinat belum ada, atau koordinat untuk pin lokasi"
  getMapsUrl(dp: DropPointModel): string {
    if (dp.latitude !== null && dp.latitude !== undefined && dp.longitude !== null && dp.longitude !== undefined) {
      return `https://www.google.com/maps/search/?api=1&query=${dp.latitude},${dp.longitude}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dp.alamat || dp.nama_drop_point)}`;
  }

  bukaTautanPeta(dp: DropPointModel, event?: Event) {
    if (event) event.stopPropagation();
    window.open(this.getMapsUrl(dp), '_blank');
  }

  bukaDetailDropPoint(dp: DropPointModel) {
    this.dropPointTerpilih = { ...dp };
    this.tampilModalDetail = true;

    this.api.getDropPointDetail(dp.id_drop_point).subscribe({
      next: (res: any) => {
        if (res && res.status === 'success' && res.data) {
          this.dropPointTerpilih = res.data;
        }
      },
      error: () => {}
    });
  }

  tutupModalDetail() {
    this.tampilModalDetail = false;
    this.dropPointTerpilih = null;
  }

  bukaHalamanTambah() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/form-drop-point']);
  }

  bukaHalamanEdit(dp: DropPointModel) {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/form-drop-point', dp.id_drop_point], {
      state: { dataDropPoint: dp }
    });
  }

  async konfirmasiToggleStatus(dp: DropPointModel) {
    const statusTarget = Number(dp.aktif) === 1 ? 0 : 1;
    const aksiLabel = statusTarget === 1 ? 'Aktifkan' : 'Nonaktifkan';

    const alert = await this.alertCtrl.create({
      header: `${aksiLabel} Drop Point?`,
      message: statusTarget === 0
        ? `Menonaktifkan "${dp.nama_drop_point}" akan menghentikan penerimaan setoran baru di titik ini tanpa menghapus histori transaksi.`
        : `Aktifkan "${dp.nama_drop_point}" sebagai titik operasional pengumpulan sampah? (MVP menggunakan 1 Drop Point aktif).`,
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: `Ya, ${aksiLabel}`,
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: `Mengubah status lokasi...`,
              spinner: 'crescent'
            });
            await loading.present();

            this.api.ubahStatusDropPoint(dp.id_drop_point, statusTarget, this.idPengelolaLogin).subscribe({
              next: async (res: any) => {
                await loading.dismiss();
                dp.aktif = statusTarget;
                dp.diubah_oleh = this.idPengelolaLogin;
                dp.diubah_pada = new Date().toISOString();
                this.simpanCacheLokal(this.listDropPoint);
                this.terapkanFilter();
                await this.tampilToast(res?.message || `Drop Point berhasil di-${aksiLabel.toLowerCase()}!`, 'success');
              },
              error: async (err) => {
                await loading.dismiss();
                // Jika jaringan/API offline atau endpoint belum dipasang di server (404), simpan ke cache lokal
                if (environment.demoMode && (!err?.status || err.status === 0 || err.status === 404 || err.status >= 500)) {
                  dp.aktif = statusTarget;
                  dp.diubah_oleh = this.idPengelolaLogin;
                  dp.diubah_pada = new Date().toISOString();
                  this.simpanCacheLokal(this.listDropPoint);
                  this.terapkanFilter();
                  await this.tampilToast(`Status Drop Point berhasil diperbarui!`, 'success');
                } else {
                  await this.tampilToast(err?.error?.message || 'Gagal mengubah status Drop Point.', 'danger');
                }
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async konfirmasiSoftDelete(dp: DropPointModel) {
    const alert = await this.alertCtrl.create({
      header: 'Soft Delete Drop Point?',
      message: `Sesuai aturan Master M03 Pilahin, lokasi "${dp.nama_drop_point}" tidak dihapus secara fisik melainkan di-soft delete (is_deleted = 1, aktif = 0) agar histori setoran dan penjualan tetap terjaga.`,
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Soft Delete',
          role: 'destructive',
          handler: async () => {
            const loading = await this.loadingCtrl.create({
              message: 'Memproses soft-delete...',
              spinner: 'crescent'
            });
            await loading.present();

            this.api.hapusDropPoint(dp.id_drop_point, this.idPengelolaLogin).subscribe({
              next: async (res: any) => {
                await loading.dismiss();
                this.listDropPoint = this.listDropPoint.filter(item => item.id_drop_point !== dp.id_drop_point);
                this.simpanCacheLokal(this.listDropPoint);
                this.terapkanFilter();
                await this.tampilToast(res?.message || 'Drop Point berhasil di-soft delete (is_deleted=1, aktif=0).', 'success');
              },
              error: async (err) => {
                await loading.dismiss();
                if (environment.demoMode && (!err?.status || err.status === 0 || err.status === 404 || err.status >= 500)) {
                  this.listDropPoint = this.listDropPoint.filter(item => item.id_drop_point !== dp.id_drop_point);
                  this.simpanCacheLokal(this.listDropPoint);
                  this.terapkanFilter();
                  await this.tampilToast('Drop Point berhasil di-soft delete (is_deleted=1, aktif=0).', 'success');
                } else {
                  await this.tampilToast(err?.error?.message || 'Gagal melakukan soft-delete Drop Point.', 'danger');
                }
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async tampilToast(message: string, color: 'success' | 'warning' | 'danger' | 'primary' = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2600,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
