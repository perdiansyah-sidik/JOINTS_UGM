import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard-pengelola',
  templateUrl: './dashboard-pengelola.page.html',
  styleUrls: ['./dashboard-pengelola.page.scss'],
  standalone: false
})
export class DashboardPengelolaPage implements OnInit {
  private router = inject(Router);
  private api = inject(ApiService);
  private toastCtrl = inject(ToastController);

  pengelola = {
    nama: 'Pak Andi',
    lokasi: 'Drop Point Pasar Blok A'
  };

  kas = {
    tersedia: 8350000,
    dipesan: 1240000
  };

  jumlahMitraAktif = 1;

  tindakanHariIni = [
    { icon: 'clipboard-outline', title: 'Setoran menunggu verifikasi', subtitle: 'Hasil timbang petugas mitra', count: 5, badgeClass: 'badge-green', iconClass: 'box-green', route: '/timbang-verifikasi' },
    { icon: 'bus-outline', title: 'Jemputan belum ditugaskan', subtitle: 'Pilih petugas mitra', count: 3, badgeClass: 'badge-amber', iconClass: 'box-amber', route: '/penugasan-jemput' },
    { icon: 'cash-outline', title: 'Pengajuan pencairan poin', subtitle: 'Transfer manual & bukti', count: 2, badgeClass: 'badge-purple', iconClass: 'box-purple', route: '/pencairan-poin' },
    { icon: 'cube-outline', title: 'Selisih kedatangan material', subtitle: 'Belum masuk stok', count: 1, badgeClass: 'badge-red', iconClass: 'box-red', route: '/terima-di-titik' }
  ];

  stok = {
    total: 300,
    items: [
      { nama: 'Plastik', berat: 142, persentase: 47, warna: '#2563EB' },
      { nama: 'Kardus',  berat: 96,  persentase: 32, warna: '#D97706' },
      { nama: 'Kaca',    berat: 38,  persentase: 13, warna: '#16A34A' },
      { nama: 'Logam',   berat: 24,  persentase: 8,  warna: '#64748B' }
    ]
  };

  ngOnInit() {
    this.muatSesiPengelola();
    this.sinkronDataPengelola();
  }

  ionViewWillEnter() {
    this.muatSesiPengelola();
    this.sinkronDataPengelola();
  }

  muatSesiPengelola() {
    const sesi = localStorage.getItem('ecoapp_user');
    if (sesi) {
      try {
        const user = JSON.parse(sesi);
        if (user.nama) this.pengelola.nama = user.nama;
      } catch (e) {
        console.error(e);
      }
    }
  }

  sinkronDataPengelola(event?: any) {
    this.api.getMitraList().subscribe({
      next: (res) => {
        if (res && Array.isArray(res.data)) {
          this.jumlahMitraAktif = res.data.filter((m: any) => Number(m.aktif) === 1).length;
        }
      },
      error: () => {}
    });

    this.api.getRingkasanPengelola().subscribe({
      next: (res) => {
        if (res && res.data) {
          if (res.data.lokasi_drop_point) this.pengelola.lokasi = res.data.lokasi_drop_point;
          this.tindakanHariIni[0].count = Number(res.data.menunggu_verifikasi ?? this.tindakanHariIni[0].count);
          this.tindakanHariIni[1].count = Number(res.data.belum_ditugaskan ?? this.tindakanHariIni[1].count);
          this.tindakanHariIni[2].count = Number(res.data.pengajuan_pencairan ?? this.tindakanHariIni[2].count);
          this.tindakanHariIni[3].count = Number(res.data.selisih_kedatangan ?? this.tindakanHariIni[3].count);
        }
      },
      error: () => {}
    });

    this.api.getLaporanStokPenjualan().subscribe({
      next: (res) => {
        if (res && res.status === 'success' && Array.isArray(res.data)) {
          const totalStok = Number(res.ringkasan?.total_stok_tersedia_kg || 0);
          const warnaMap: Record<string, string> = {
            Plastik: '#2563EB',
            Kardus: '#D97706',
            Kaca: '#16A34A',
            Logam: '#64748B'
          };
          this.stok.total = totalStok;
          this.stok.items = res.data.map((m: any) => {
            const brt = Number(m.stok_tersedia_kg || 0);
            const pct = totalStok > 0 ? Math.round((brt / totalStok) * 100) : 0;
            return {
              nama: m.nama_jenis,
              berat: brt,
              persentase: pct,
              warna: warnaMap[m.nama_jenis] || '#15803D'
            };
          });
        }
        if (event?.target) event.target.complete();
      },
      error: () => {
        if (event?.target) event.target.complete();
      }
    });
  }

  // Navigasi ke Halaman CRUD Master Mitra (M02)
  goToMitra() {
    this.router.navigate(['/master-mitra']);
  }

  // Navigasi ke Halaman CRUD Master Drop Point (M03)
  goToDropPoint() {
    this.router.navigate(['/master-drop-point']);
  }

  bukaTindakan(item: any) {
    if (item.route === '/terima-di-titik') {
      this.router.navigate(['/terima-di-titik']);
      return;
    }
    this.bukaMenu(item.title);
  }

  async bukaMenu(namaFitur: string) {
    const toast = await this.toastCtrl.create({
      message: `Membuka modul ${namaFitur}...`,
      duration: 1500,
      color: 'success',
      position: 'top'
    });
    await toast.present();
  }
}