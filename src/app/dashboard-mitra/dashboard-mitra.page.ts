import { Component, OnInit, inject } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
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
  private loadingCtrl = inject(LoadingController);

  loading = false;

  // Kontrol Halaman: 'DASHBOARD' (Beranda Mitra) | 'TUGAS_JEMPUT' (Halaman Transaksi Slot & Kurir T03)
  halamanAktif: 'DASHBOARD' | 'TUGAS_JEMPUT' = 'DASHBOARD';
  subTabJemput: 'EKSEKUSI' | 'PROGRES' | 'LAPORAN' = 'EKSEKUSI';
  langkahAktif: 1 | 2 | 3 = 1;
  tabAktif: string = 'beranda';

  // Identitas Organisasi Mitra dari Database
  idMitra: number = 1;
  namaMitra: string = 'PT Daur Ulang Nusantara';
  penanggungJawab: string = 'Pak Budi';
  noHpMitra: string = '081122334455';
  alamatFasilitas: string = 'Kawasan Industri Cikarang';
  statusAktif: boolean = true;
  bulanBerjalan: string = '';

  // Statistik Real Dashboard Mitra
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

  tugasJemputAktif: any[] = [];
  daftarJenisSampah: any[] = [];

  // =========================================================================
  // DATA TRANSAKSI SLOT & PENJEMPUTAN MITRA (T03 - TERUSAN DARI PENGELOLA T04)
  // =========================================================================
  semuaPenjemputanMitra: any[] = [];
  tugasTerpilih: any = null;
  indeksTugasTerpilih: number = 0;

  daftarTanggalSlot = [
    { labelHari: 'Kemarin', tanggal: '15 Okt', status: 'Selesai', aktif: false, penuh: false },
    { labelHari: 'Hari Ini', tanggal: '16 Okt', status: 'Tugas Aktif', aktif: true, penuh: false },
    { labelHari: 'Besok', tanggal: '17 Okt', status: 'Terjadwal', aktif: false, penuh: false }
  ];
  tanggalTerpilih = '16 Okt';

  daftarJamSlot = [
    {
      kode: 'PAGI',
      jam: '08.00 - 10.00 WIB',
      sesi: 'Sesi Jemput Pagi (Ditugaskan Pengelola)',
      badge: 'Slot Tugas Aktif',
      ikon: 'sunny-outline',
      disabled: false
    },
    {
      kode: 'SIANG',
      jam: '13.00 - 15.00 WIB',
      sesi: 'Sesi Jemput Siang',
      badge: 'Sisa 5 slot',
      ikon: 'partly-sunny-outline',
      disabled: false
    },
    {
      kode: 'SORE',
      jam: '15.30 - 17.30 WIB',
      sesi: 'Sesi Jemput Sore',
      badge: 'Kuota Habis',
      ikon: 'cloudy-night-outline',
      disabled: true
    }
  ];
  slotJamTerpilih = '08.00 - 10.00 WIB';

  materialList = [
    {
      kunci: 'plastik',
      nama: 'Plastik',
      deskripsi: 'PET, HDPE, Gelas',
      satuanKemasan: 'Karung',
      beratPerKemasanKg: 3,
      jumlahKemasan: 2,
      beratKg: 6,
      tarifPoinPerKg: 500,
      dipilih: true,
      warnaTema: 'blue',
      ikon: 'water-outline'
    },
    {
      kunci: 'kardus',
      nama: 'Kardus & Kertas',
      deskripsi: 'Karton, Buku, Arsip',
      satuanKemasan: 'Ikat',
      beratPerKemasanKg: 4,
      jumlahKemasan: 1,
      beratKg: 4,
      tarifPoinPerKg: 400,
      dipilih: true,
      warnaTema: 'amber',
      ikon: 'cube-outline'
    },
    {
      kunci: 'kaca',
      nama: 'Kaca & Botol Selai',
      deskripsi: 'Utuh, tidak pecah',
      satuanKemasan: 'Box',
      beratPerKemasanKg: 2,
      jumlahKemasan: 0,
      beratKg: 0,
      tarifPoinPerKg: 300,
      dipilih: false,
      warnaTema: 'green',
      ikon: 'wine-outline'
    },
    {
      kunci: 'logam',
      nama: 'Logam & Kaleng',
      deskripsi: 'Aluminium, Seng',
      satuanKemasan: 'Karung',
      beratPerKemasanKg: 3,
      jumlahKemasan: 0,
      beratKg: 0,
      tarifPoinPerKg: 1500,
      dipilih: false,
      warnaTema: 'slate',
      ikon: 'construct-outline'
    }
  ];

  catatanLapanganKurir: string = 'Pagar hitam samping warung, sampah terpilah rapi dalam karung';

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
        if (user.no_hp) this.noHpMitra = user.no_hp;
        if (user.alamat_fasilitas || user.alamat) {
          this.alamatFasilitas = user.alamat_fasilitas || user.alamat;
        }
      } catch (e) {}
    }
    this.ambilDataDashboardMitra();
    this.ambilDataTugasDariPengelola();
  }

  ambilDataDashboardMitra(event?: any) {
    this.loading = true;
    this.api.getDashboardMitra(this.idMitra).subscribe({
      next: (res) => {
        this.loading = false;
        if (res && res.data) {
          const d = res.data;

          if (d.profil_mitra) {
            this.idMitra = d.profil_mitra.id_mitra;
            this.namaMitra = d.profil_mitra.nama_mitra || this.namaMitra;
            this.penanggungJawab = d.profil_mitra.nama_penanggung_jawab || this.penanggungJawab;
            this.noHpMitra = d.profil_mitra.no_hp || this.noHpMitra;
            this.alamatFasilitas = d.profil_mitra.alamat_fasilitas || this.alamatFasilitas;
            this.statusAktif = Number(d.profil_mitra.aktif) === 1;
          }

          if (d.statistik) {
            this.totalPembelianRp = Number(d.statistik.total_pembelian_rp || 0);
            this.totalBeratKg = Number(d.statistik.total_berat_kg || 0);
            this.totalTiketTransaksi = Number(d.statistik.total_transaksi || 0);
            this.jumlahTugasAktif = Number(d.statistik.jumlah_tugas_aktif || 0);
            this.jumlahTugasSelesai = Number(d.statistik.jumlah_tugas_selesai || 0);
          }

          this.perbaruiGrafikMaterial(d.material_kg);
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

  perbaruiGrafikMaterial(m: any) {
    const mat = m || {};
    const plastik = Number(mat.plastik || 0);
    const kardus = Number(mat.kardus || 0);
    const kaca = Number(mat.kaca || 0);
    const logam = Number(mat.logam || 0);
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
  }

  ambilDataTugasDariPengelola() {
    this.api.getPenjemputanTransaksi().subscribe({
      next: (res) => {
        const d = res?.data || {};
        const dariServer = Array.isArray(d.transaksi) ? d.transaksi : [];

        if (dariServer.length > 0) {
          this.semuaPenjemputanMitra = dariServer;
        } else {
          this.buatTugasDefaultDemo();
        }
        this.sinkronisasiDaftarTugas();
      },
      error: () => {
        this.buatTugasDefaultDemo();
        this.sinkronisasiDaftarTugas();
      }
    });
  }

  buatTugasDefaultDemo() {
    if (this.semuaPenjemputanMitra.length > 0) return;
    this.semuaPenjemputanMitra = [
      {
        id_penjemputan: 1,
        id_setoran: 42,
        kode_setoran: 'STR-202610-0042',
        nama_pelanggan: 'Bpk. Ardiansyah',
        kategori_pelanggan: 'Rumah Tangga',
        no_hp_pelanggan: '081298765432',
        alamat_jemput: 'Jl. Mawar Melati No. 14, RT 03/RW 05, Kel. Sukajaya',
        catatan_pelanggan: 'Pagar hitam samping warung, titip di pos satpam jika sedang keluar',
        nama_drop_point: 'Drop Point Pasar Blok A',
        nama_mitra: this.namaMitra,
        nama_kurir: this.penanggungJawab || 'Pak Joko Widodo',
        jadwal_slot: '08.00 - 10.00 WIB (Sesi Jemput Pagi)',
        tanggal_jemput: new Date().toISOString(),
        potongan_persen: 10,
        total_berat_kg: 10,
        poin_kotor: 4600,
        potongan_poin: 460,
        poin_bersih: 4140,
        status: 'DIJADWALKAN',
        rincian_material: [
          { nama: 'Plastik', berat_kg: 6 },
          { nama: 'Kardus', berat_kg: 4 }
        ]
      }
    ];
  }

  sinkronisasiDaftarTugas() {
    this.tugasJemputAktif = this.semuaPenjemputanMitra.filter((t) => t.status !== 'SELESAI');
    this.jumlahTugasAktif = this.tugasJemputAktif.length;
    this.pilihTugas(this.indeksTugasTerpilih < this.semuaPenjemputanMitra.length ? this.indeksTugasTerpilih : 0);
  }

  pilihTugas(index: number) {
    if (!this.semuaPenjemputanMitra[index]) return;
    this.indeksTugasTerpilih = index;
    this.tugasTerpilih = this.semuaPenjemputanMitra[index];
    this.catatanLapanganKurir =
      this.tugasTerpilih.catatan_pelanggan ||
      'Pagar hitam samping warung, sampah terpilah rapi';

    const rincian = Array.isArray(this.tugasTerpilih.rincian_material)
      ? this.tugasTerpilih.rincian_material
      : [];

    this.materialList.forEach((m) => {
      const cocok = rincian.find((r: any) =>
        String(r.nama || '').toLowerCase().includes(m.kunci)
      );
      if (cocok && Number(cocok.berat_kg) > 0) {
        m.beratKg = Number(cocok.berat_kg);
        m.jumlahKemasan = Math.max(1, Math.round(m.beratKg / m.beratPerKemasanKg));
        m.dipilih = true;
      } else if (rincian.length > 0) {
        m.beratKg = 0;
        m.jumlahKemasan = 0;
        m.dipilih = false;
      }
    });

    if (this.tugasTerpilih.status === 'SELESAI') {
      this.langkahAktif = 3;
    } else if (this.tugasTerpilih.status === 'DALAM_PERJALANAN') {
      this.langkahAktif = 2;
    } else {
      this.langkahAktif = 1;
    }
  }

  // =========================================================================
  // NAVIGASI TOMBOL AKSI CEPAT & FOOTER (100% LANGSUNG MEMBUKA HALAMAN T03)
  // =========================================================================

  // 1. Klik "Buka Halaman Kurir" atau "Timbang & Kurir" -> Buka Halaman T03
  bukaHalamanKurir() {
    this.halamanAktif = 'TUGAS_JEMPUT';
    this.subTabJemput = 'EKSEKUSI';
    this.tabAktif = 'kurir';
    this.navCtrl.navigateForward('/setoran', { animated: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 2. Klik "Tugas Jemput" -> Buka Halaman Transaksi Slot & Penjemputan (T03)
  bukaHalamanPenugasan() {
    this.halamanAktif = 'TUGAS_JEMPUT';
    this.subTabJemput = 'EKSEKUSI';
    this.tabAktif = 'kurir';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  kembaliKeBerandaMitra() {
    this.halamanAktif = 'DASHBOARD';
    this.tabAktif = 'beranda';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 3. Klik "Pembelian & Retur"
  bukaHalamanPembelian() {
    this.navCtrl.navigateForward('/penjualan-material', { animated: true });
  }

  bukaHalamanPenjualan() {
    this.navCtrl.navigateForward('/penjualan-material', { animated: true });
  }

  // 4. Klik "Serah Terima Drop Point"
  bukaHalamanSerahTerima() {
    this.navCtrl.navigateForward('/terima-di-titik', { animated: true });
  }

  // 5. Klik "Profil Mitra"
  bukaHalamanProfilMitra() {
    this.navCtrl.navigateForward('/master-mitra', { animated: true });
  }

  bukaKelolaMitra() {
    this.navCtrl.navigateForward('/master-mitra', { animated: true });
  }

  // Navigasi 5 Tab Footer Bawah
  pilihTab(tab: string) {
    this.tabAktif = tab;

    if (tab === 'timbangan') {
      this.halamanAktif = 'TUGAS_JEMPUT';
      this.subTabJemput = 'EKSEKUSI';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tab === 'kurir' || tab === 'armada') {
      this.halamanAktif = 'TUGAS_JEMPUT';
      this.subTabJemput = 'PROGRES';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tab === 'fasilitas' || tab === 'gudang') {
      this.halamanAktif = 'DASHBOARD';
      setTimeout(() => {
        const el = document.getElementById('seksi-fasilitas');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }

    if (tab === 'profil') {
      this.navCtrl.navigateForward('/master-mitra', { animated: true });
      return;
    }

    this.halamanAktif = 'DASHBOARD';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  }

  formatRibuan(angka: number): string {
    return (angka || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  pilihTab(tab: 'beranda' | 'timbangan' | 'armada' | 'gudang' | 'profil') {
    this.tabAktif = tab;

    if (tab === 'armada' || tab === 'timbangan') {
      this.bukaHalamanKurir();
      return;
    }

    if (tab === 'profil') {
      this.navCtrl.navigateForward('/profil', { animated: true });
      return;
    }

    if (tab !== 'beranda') {
      this.tampilInfo(`Membuka tab ${tab.toUpperCase()}...`);
      return;
    }

    this.halamanAktif = 'DASHBOARD';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  keluarAkun() {
    this.navCtrl.navigateForward('/profil', { animated: true });
  }

  async tampilInfo(pesan: string) {
    const toast = await this.toastCtrl.create({
      message: pesan,
      duration: 2200,
      color: 'success',
      position: 'top'
    });
    await toast.present();
  }
}