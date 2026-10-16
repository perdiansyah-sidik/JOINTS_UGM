import { Component, OnInit, inject } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard-mitra',
  templateUrl: './dashboard-mitra.page.html',
  styleUrls: ['./dashboard-mitra.page.scss'],
  standalone: false,
})
export class DashboardMitraPage implements OnInit {
  private api = inject(ApiService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);

  loading = false;
  tabAktif: 'beranda' | 'timbangan' | 'armada' | 'gudang' | 'profil' = 'beranda';

  // Identitas Organisasi Mitra dari Database (tabel mitra)
  idMitra: number = 1;
  namaMitra: string = 'Memuat Mitra...';
  penanggungJawab: string = '-';
  noHpMitra: string = '-';
  alamatFasilitas: string = '-';
  statusAktif: boolean = true;
  bulanBerjalan: string = '';

  // Statistik Real dari Database (Awal = 0, tanpa angka karangan)
  totalPembelianRp: number = 0;
  totalBeratKg: number = 0;
  totalTiketTransaksi: number = 0;
  jumlahTugasAktif: number = 0;
  jumlahTugasSelesai: number = 0;

  // Monitoring 4 Material Resmi Pilahin
  kapasitasTargetKg: number = 1000;
  persenKapasitas: number = 0;
  sisaKapasitasKg: number = 1000;

  rincianMaterial = [
    { nama: 'Plastik', beratKg: 0, persen: 0, warna: '#2563EB' },
    { nama: 'Kardus',  beratKg: 0, persen: 0, warna: '#15803D' },
    { nama: 'Kaca',    beratKg: 0, persen: 0, warna: '#0D9488' },
    { nama: 'Logam',   beratKg: 0, persen: 0, warna: '#D97706' }
  ];

  // Daftar Tugas Penjemputan & Katalog Jenis Sampah dari Database
  tugasJemputAktif: any[] = [];
  daftarJenisSampah: any[] = [];

  ngOnInit() {
    this.setBulanBerjalan();
    this.muatSesiMitra();
  }

  ionViewWillEnter() {
    this.setBulanBerjalan();
    this.muatSesiMitra();
  }

  setBulanBerjalan() {
    const namaBulan = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const skrg = new Date();
    this.bulanBerjalan = `${namaBulan[skrg.getMonth()]} ${skrg.getFullYear()}`;
  }

  muatSesiMitra() {
    const tersimpan = localStorage.getItem('ecoapp_user');
    if (tersimpan) {
      try {
        const user = JSON.parse(tersimpan);
        if (user.id_mitra) this.idMitra = Number(user.id_mitra);
        if (user.nama_mitra) this.namaMitra = user.nama_mitra;
        if (user.nama) this.penanggungJawab = user.nama;
        if (user.alamat) this.alamatFasilitas = user.alamat;
      } catch (e) {}
    }
    this.ambilDataDashboardMitra();
  }

  ambilDataDashboardMitra(event?: any) {
    this.loading = true;
    this.api.getDashboardMitra(this.idMitra).subscribe({
      next: (res) => {
        this.loading = false;
        if (res && res.data) {
          const d = res.data;

          // 1. Profil Organisasi Mitra dari Tabel mitra
          if (d.profil_mitra) {
            this.idMitra = d.profil_mitra.id_mitra;
            this.namaMitra = d.profil_mitra.nama_mitra || this.namaMitra;
            this.penanggungJawab = d.profil_mitra.nama_penanggung_jawab || 'Penanggung Jawab';
            this.noHpMitra = d.profil_mitra.no_hp || '-';
            this.alamatFasilitas = d.profil_mitra.alamat_fasilitas || d.profil_mitra.alamat_fasilitas || '-';
            this.statusAktif = Number(d.profil_mitra.aktif) === 1;
          }

          // 2. Statistik Real
          if (d.statistik) {
            this.totalPembelianRp = Number(d.statistik.total_pembelian_rp || 0);
            this.totalBeratKg = Number(d.statistik.total_berat_kg || 0);
            this.totalTiketTransaksi = Number(d.statistik.total_transaksi || 0);
            this.jumlahTugasAktif = Number(d.statistik.jumlah_tugas_aktif || 0);
            this.jumlahTugasSelesai = Number(d.statistik.jumlah_tugas_selesai || 0);
          }

          // 3. Komposisi Material
          const m = d.material_kg || {};
          const plastik = Number(m.plastik || 0);
          const kardus = Number(m.kardus || 0);
          const kaca = Number(m.kaca || 0);
          const logam = Number(m.logam || 0);
          const totalMat = plastik + kardus + kaca + logam;

          this.persenKapasitas = Math.min(100, Math.round((this.totalBeratKg / this.kapasitasTargetKg) * 100));
          this.sisaKapasitasKg = Math.max(0, Number((this.kapasitasTargetKg - this.totalBeratKg).toFixed(1)));

          const hitungPct = (val: number) => (totalMat > 0 ? Math.round((val / totalMat) * 100) : 0);

          this.rincianMaterial = [
            { nama: 'Plastik', beratKg: plastik, persen: hitungPct(plastik), warna: '#2563EB' },
            { nama: 'Kardus',  beratKg: kardus,  persen: hitungPct(kardus),  warna: '#15803D' },
            { nama: 'Kaca',    beratKg: kaca,    persen: hitungPct(kaca),    warna: '#0D9488' },
            { nama: 'Logam',   beratKg: logam,   persen: hitungPct(logam),   warna: '#D97706' }
          ];

          // 4. Antrean Penjemputan & Katalog Jenis Sampah
          this.tugasJemputAktif = Array.isArray(d.tugas_aktif) ? d.tugas_aktif : [];
          this.daftarJenisSampah = Array.isArray(d.jenis_sampah) ? d.jenis_sampah : [];
        }
        if (event?.target) event.target.complete();
      },
      error: () => {
        this.loading = false;
        if (event?.target) event.target.complete();
      }
    });
  }

  // Navigasi ke Halaman Kurir Lapangan (Beda Page sesuai permintaan)
  bukaHalamanKurir() {
    this.navCtrl.navigateForward('/kurir-mitra', { animated: true });
  }

  formatRibuan(angka: number): string {
    return (angka || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  pilihTab(tab: 'beranda' | 'timbangan' | 'armada' | 'gudang' | 'profil') {
    this.tabAktif = tab;
    if (tab === 'armada' || tab === 'timbangan') {
      this.bukaHalamanKurir();
    } else if (tab !== 'beranda') {
      this.tampilInfo(`Membuka tab ${tab.toUpperCase()}...`);
    }
  }

  keluarAkun() {
    localStorage.removeItem('ecoapp_user');
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

  async tampilInfo(pesan: string) {
    const toast = await this.toastCtrl.create({
      message: pesan,
      duration: 1800,
      color: 'success',
      position: 'top'
    });
    await toast.present();
  }
}