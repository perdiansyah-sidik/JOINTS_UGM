import { Component, OnInit, inject } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

interface MaterialStat {
  nama: string;
  beratKg: number;
  persen: number;
  warnaDot: string;
  warnaTeks: string;
  warnaBar: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  private api = inject(ApiService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);

  loading = false;
  error = false;
  data: any = null;

  tabAktif: 'beranda' | 'riwayat' | 'dompet' | 'profil' = 'beranda';

  // Data pengguna & sapaan (otomatis menyesuaikan dengan user yang login, fallback ke tampilan Figma)
  idPengguna: number = 2;
  namaUser: string = 'Bu Sari';
  alamatUser: string = 'Pasar Blok A, Kios 14';
  sapaanWaktu: string = 'Selamat pagi';

  // Data Kartu Poin Hijau
  saldoPoin: number = 4320;
  nominalRupiah: number = 43200;
  poinDiproses: number = 0;

  // Data Sampah Bulan Ini (4 Material sesuai Figma & Dokumen Pilahin)
  totalBeratBulanIni: number = 25;
  daftarMaterial: MaterialStat[] = [
    { nama: 'Plastik', beratKg: 12, persen: 48, warnaDot: '#2563EB', warnaTeks: '#2563EB', warnaBar: '#2563EB' },
    { nama: 'Kardus',  beratKg: 8,  persen: 32, warnaDot: '#F59E0B', warnaTeks: '#F59E0B', warnaBar: '#F59E0B' },
    { nama: 'Kaca',    beratKg: 3,  persen: 12, warnaDot: '#0D9488', warnaTeks: '#0D9488', warnaBar: '#0D9488' },
    { nama: 'Logam',   beratKg: 2,  persen: 8,  warnaDot: '#64748B', warnaTeks: '#64748B', warnaBar: '#64748B' }
  ];

  // Data Jemputan Berikutnya
  jemputanBerikutnya = {
    hariSingkat: 'SEL',
    tanggal: '14',
    judul: 'Penjemputan Sampah',
    kodeLabel: 'STR-000123',
    namaKurir: "Kurir 'Pak Joko'",
    jamSlot: '08.00 - 10.00',
    statusLabel: 'Terjadwal'
  };

  ngOnInit() {
    this.aturSapaanWaktu();
    this.muatSesiPengguna();
    this.ambilDataDashboard();
  }

  ionViewWillEnter() {
    this.muatSesiPengguna();
    this.ambilDataDashboard();
  }

  aturSapaanWaktu() {
    const jam = new Date().getHours();
    if (jam >= 4 && jam < 11) {
      this.sapaanWaktu = 'Selamat pagi';
    } else if (jam >= 11 && jam < 15) {
      this.sapaanWaktu = 'Selamat siang';
    } else if (jam >= 15 && jam < 18) {
      this.sapaanWaktu = 'Selamat sore';
    } else {
      this.sapaanWaktu = 'Selamat malam';
    }
  }

  muatSesiPengguna() {
    const tersimpan = localStorage.getItem('ecoapp_user');
    if (tersimpan) {
      try {
        const user = JSON.parse(tersimpan);
        if (user.id_pengguna) this.idPengguna = Number(user.id_pengguna);
        if (user.nama) this.namaUser = user.nama;
        if (user.alamat) {
          this.alamatUser = user.nama_usaha ? `${user.nama_usaha}, ${user.alamat}` : user.alamat;
        }
      } catch (e) {
        console.error('Gagal membaca sesi user:', e);
      }
    }
  }

  ambilDataDashboard(event?: any) {
    this.loading = true;
    this.api.getDashboardPelanggan(this.idPengguna).subscribe({
      next: (res) => {
        this.loading = false;
        if (res && res.data) {
          this.data = res.data;

          if (res.data.profil) {
            this.namaUser = res.data.profil.nama || this.namaUser;
            this.alamatUser = res.data.profil.alamat || this.alamatUser;
          }

          // Jika user sudah memiliki transaksi riil di database, tampilkan angkanya
          if (res.data.saldo_poin_aktif > 0 || res.data.total_berat_kg > 0) {
            this.saldoPoin = res.data.saldo_poin_aktif;
            this.nominalRupiah = res.data.nominal_rupiah || (this.saldoPoin * 10);
            this.poinDiproses = res.data.poin_diproses || 0;
            this.totalBeratBulanIni = res.data.total_berat_kg;
          }
        }
        if (event && event.target) event.target.complete();
      },
      error: () => {
        this.loading = false;
        if (event && event.target) event.target.complete();
      }
    });
  }

  // Fungsi ion-refresher apabila ditarik ke bawah
  load(event: any) {
    this.ambilDataDashboard(event);
  }

  formatTitikRibuan(angka: number): string {
    return (angka || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  async klikFitur(namaFitur: string) {
    const toast = await this.toastCtrl.create({
      message: `Membuka menu ${namaFitur}...`,
      duration: 1500,
      color: 'success',
      position: 'top'
    });
    await toast.present();
  }

  pilihTab(tab: 'beranda' | 'riwayat' | 'dompet' | 'profil') {
    this.tabAktif = tab;
    if (tab !== 'beranda') {
      this.klikFitur(tab.charAt(0).toUpperCase() + tab.slice(1));
    }
  }
}