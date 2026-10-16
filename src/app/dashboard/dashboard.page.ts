import { Component, OnInit, inject } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

interface MaterialStat {
  kode: 'plastik' | 'kardus' | 'kaca' | 'logam';
  nama: string;
  beratKg: number;
  persen: number;
  warna: string;
  bgCard: string;
  borderCard: string;
  dashArray: string;
  dashOffset: number;
}

interface JadwalJemputView {
  hariSingkat: string;
  tanggal: string;
  judul: string;
  namaKurir: string;
  noHpKurir: string;
  jamSlot: string;
  labelWaktu: string;
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
  tabAktif: 'beranda' | 'setor' | 'peta' | 'dompet' | 'profil' = 'beranda';

  // 1. Identitas Asli Pengguna dari Database (Tanpa Nama/Alamat Palsu)
  idPengguna: number = 0;
  namaUser: string = '';
  lokasiHeader: string = '';
  sapaanWaktu: string = 'Selamat pagi';
  kategoriAktif: 'RUMAH_TANGGA' | 'UMKM_KULINER' | 'PEDAGANG_PASAR' = 'RUMAH_TANGGA';

  // 2. Data Poin Pilahin & Target Tier (Murni dari Database, Awal = 0)
  saldoPoin: number = 0;
  nominalRupiah: number = 0;
  poinDiproses: number = 0;
  tierSekarang: string = 'Perunggu';
  namaTargetTier: string = 'Target Perak';
  sisaPoinTarget: number = 3000;
  persenTarget: number = 0;

  // 3. Info Drop Point Aktif dari Database
  jumlahDropPoint: number = 0;

  // 4. Data Timbangan Terverifikasi Bulan Ini & Donut Chart (Awal = 0)
  namaBulanIni: string = '';
  totalBeratBulanIni: number = 0;
  reduksiEmisiKg: number = 0;
  readonly kelilingLingkaran = 2 * Math.PI * 38; // r = 38 untuk SVG Donut Chart

  daftarMaterial: MaterialStat[] = [
    { kode: 'plastik', nama: 'Plastik', beratKg: 0, persen: 0, warna: '#2563EB', bgCard: '#EFF6FF', borderCard: '#DBEAFE', dashArray: '0 239', dashOffset: 0 },
    { kode: 'kardus',  nama: 'Kardus',  beratKg: 0, persen: 0, warna: '#D97706', bgCard: '#FFFBEB', borderCard: '#FEF3C7', dashArray: '0 239', dashOffset: 0 },
    { kode: 'kaca',    nama: 'Kaca',    beratKg: 0, persen: 0, warna: '#0D9488', bgCard: '#ECFDF5', borderCard: '#D1FAE5', dashArray: '0 239', dashOffset: 0 },
    { kode: 'logam',   nama: 'Logam',   beratKg: 0, persen: 0, warna: '#64748B', bgCard: '#F8FAFC', borderCard: '#E2E8F0', dashArray: '0 239', dashOffset: 0 }
  ];

  // 5. Jadwal Penjemputan Terjadwal (Bernilai null jika belum ada di Database)
  jemputanBerikutnya: JadwalJemputView | null = null;

  ngOnInit() {
    this.aturWaktuDanBulan();
    this.muatSesiPengguna();
  }

  ionViewWillEnter() {
    this.aturWaktuDanBulan();
    this.muatSesiPengguna();
  }

  aturWaktuDanBulan() {
    const sekarang = new Date();
    const jam = sekarang.getHours();
    if (jam >= 4 && jam < 11) {
      this.sapaanWaktu = 'Selamat pagi';
    } else if (jam >= 11 && jam < 15) {
      this.sapaanWaktu = 'Selamat siang';
    } else if (jam >= 15 && jam < 18) {
      this.sapaanWaktu = 'Selamat sore';
    } else {
      this.sapaanWaktu = 'Selamat malam';
    }

    const daftarBulan = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    this.namaBulanIni = daftarBulan[sekarang.getMonth()];
  }

  muatSesiPengguna() {
    const tersimpan = localStorage.getItem('ecoapp_user');
    if (!tersimpan) {
      this.navCtrl.navigateRoot('/login');
      return;
    }

    try {
      const user = JSON.parse(tersimpan);
      this.idPengguna = Number(user.id_pengguna || 0);
      this.namaUser = user.nama || 'Pengguna';
      this.aturLokasiHeader(user.nama_usaha, user.alamat);
      this.tetapkanKategoriDariProfil(user.jenis_pelanggan, user.peran);

      if (this.idPengguna > 0) {
        this.ambilDataDashboard();
      }
    } catch (e) {
      this.navCtrl.navigateRoot('/login');
    }
  }

  aturLokasiHeader(namaUsaha?: string, alamat?: string) {
    if (namaUsaha && alamat) {
      this.lokasiHeader = `${namaUsaha} • ${alamat}`;
    } else if (alamat) {
      this.lokasiHeader = alamat;
    } else {
      this.lokasiHeader = 'Lokasi belum diatur';
    }
  }

  tetapkanKategoriDariProfil(jenisPelanggan?: string, peran?: any) {
    if (jenisPelanggan === 'UMKM_KULINER' || jenisPelanggan === 'UMKM' || Number(peran) === 2) {
      this.kategoriAktif = 'UMKM_KULINER';
    } else if (jenisPelanggan === 'PEDAGANG_PASAR' || jenisPelanggan === 'PEDAGANG' || Number(peran) === 3) {
      this.kategoriAktif = 'PEDAGANG_PASAR';
    } else {
      this.kategoriAktif = 'RUMAH_TANGGA';
    }
  }

  ambilDataDashboard(event?: any) {
    this.loading = true;
    this.error = false;

    this.api.getDashboardPelanggan(this.idPengguna).subscribe({
      next: (res) => {
        this.loading = false;
        if (res && res.data) {
          const d = res.data;

          // 1. Update Profil Real dari Database
          if (d.profil) {
            this.namaUser = d.profil.nama || this.namaUser;
            this.aturLokasiHeader(d.profil.nama_usaha, d.profil.alamat);
            this.tetapkanKategoriDariProfil(d.profil.jenis_pelanggan, d.profil.peran);

            // Sinkronkan kembali ke localStorage
            localStorage.setItem('ecoapp_user', JSON.stringify(d.profil));
          }

          // 2. Update Saldo Poin & Kalkulasi Target Tier
          this.saldoPoin = Number(d.saldo_poin_aktif || 0);
          this.nominalRupiah = Number(d.nominal_rupiah || 0);
          this.poinDiproses = Number(d.poin_diproses || 0);
          this.hitungLevelPoin(this.saldoPoin);

          // 3. Update Jumlah Drop Point Aktif
          this.jumlahDropPoint = Number(d.jumlah_drop_point || 0);

          // 4. Update Berat Timbangan Terverifikasi, Donut Chart, & Emisi CO2e
          const plastik = Number(d.material_kg?.plastik || 0);
          const kardus = Number(d.material_kg?.kardus || 0);
          const kaca = Number(d.material_kg?.kaca || 0);
          const logam = Number(d.material_kg?.logam || 0);
          const totalKg = Number(d.total_berat_kg || (plastik + kardus + kaca + logam));

          this.totalBeratBulanIni = Number(totalKg.toFixed(2));
          // Faktor reduksi emisi daur ulang anorganik rata-rata: 1.248 kg CO2e per kg sampah
          this.reduksiEmisiKg = Number((totalKg * 1.248).toFixed(1));

          this.hitungDonutMaterial(plastik, kardus, kaca, logam, totalKg);

          // 5. Update Jadwal Penjemputan Terjadwal dari Database
          if (d.jemputan_berikutnya) {
            this.jemputanBerikutnya = this.formatJadwalJemput(d.jemputan_berikutnya);
          } else {
            this.jemputanBerikutnya = null;
          }
        }
        if (event && event.target) event.target.complete();
      },
      error: () => {
        this.loading = false;
        this.error = true;
        if (event && event.target) event.target.complete();
      }
    });
  }

  hitungLevelPoin(poin: number) {
    if (poin < 3000) {
      this.tierSekarang = 'Perunggu';
      this.namaTargetTier = 'Target Perak';
      const target = 3000;
      this.sisaPoinTarget = Math.max(0, target - poin);
      this.persenTarget = Math.min(100, Math.round((poin / target) * 100));
    } else if (poin < 10000) {
      this.tierSekarang = 'Perak';
      this.namaTargetTier = 'Target Emas';
      const target = 10000;
      this.sisaPoinTarget = Math.max(0, target - poin);
      this.persenTarget = Math.min(100, Math.round((poin / target) * 100));
    } else {
      this.tierSekarang = 'Emas';
      this.namaTargetTier = 'Level Maksimal';
      this.sisaPoinTarget = 0;
      this.persenTarget = 100;
    }
  }

  hitungDonutMaterial(plastik: number, kardus: number, kaca: number, logam: number, totalKg: number) {
    const nilai = [
      { kode: 'plastik' as const, nama: 'Plastik', beratKg: plastik, warna: '#2563EB', bgCard: '#EFF6FF', borderCard: '#DBEAFE' },
      { kode: 'kardus' as const,  nama: 'Kardus',  beratKg: kardus,  warna: '#D97706', bgCard: '#FFFBEB', borderCard: '#FEF3C7' },
      { kode: 'kaca' as const,    nama: 'Kaca',    beratKg: kaca,    warna: '#0D9488', bgCard: '#ECFDF5', borderCard: '#D1FAE5' },
      { kode: 'logam' as const,   nama: 'Logam',   beratKg: logam,   warna: '#64748B', bgCard: '#F8FAFC', borderCard: '#E2E8F0' }
    ];

    let akumulasiPanjang = 0;
    this.daftarMaterial = nilai.map((item) => {
      const rasio = totalKg > 0 ? item.beratKg / totalKg : 0;
      const persen = totalKg > 0 ? Math.round(rasio * 100) : 0;
      const panjangBusur = rasio * this.kelilingLingkaran;
      const dashArray = `${panjangBusur} ${this.kelilingLingkaran}`;
      const dashOffset = -akumulasiPanjang;
      akumulasiPanjang += panjangBusur;

      return {
        ...item,
        beratKg: Number(item.beratKg.toFixed(1)),
        persen,
        dashArray,
        dashOffset
      };
    });
  }

  formatJadwalJemput(raw: any): JadwalJemputView {
    const namaHari = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];
    const mulai = raw.mulai_pada ? new Date(raw.mulai_pada) : new Date();
    const selesai = raw.selesai_pada ? new Date(raw.selesai_pada) : new Date();

    const formatJam = (dt: Date) => {
      const jam = dt.getHours().toString().padStart(2, '0');
      const menit = dt.getMinutes().toString().padStart(2, '0');
      return `${jam}.${menit}`;
    };

    // Hitung selisih waktu menuju jadwal jemput secara real-time
    const selisihMs = mulai.getTime() - new Date().getTime();
    const selisihJam = Math.ceil(selisihMs / (1000 * 60 * 60));
    let labelWaktu = 'Terjadwal';
    if (raw.status === 'DALAM_PERJALANAN') {
      labelWaktu = 'Dalam Perjalanan';
    } else if (raw.status === 'DIAJUKAN') {
      labelWaktu = 'Menunggu Petugas';
    } else if (selisihJam > 0 && selisihJam <= 24) {
      labelWaktu = `Dalam ${selisihJam} Jam`;
    }

    let judulJemput = 'Penjemputan Rumah Tangga';
    if (this.kategoriAktif === 'UMKM_KULINER') judulJemput = 'Penjemputan UMKM Kuliner';
    if (this.kategoriAktif === 'PEDAGANG_PASAR') judulJemput = 'Penjemputan Kolektif Pasar';

    return {
      hariSingkat: namaHari[mulai.getDay()],
      tanggal: String(mulai.getDate()).padStart(2, '0'),
      judul: judulJemput,
      namaKurir: raw.nama_kurir || 'Menunggu Penugasan',
      noHpKurir: raw.no_hp_kurir || '',
      jamSlot: `${formatJam(mulai)} - ${formatJam(selesai)} WIB`,
      labelWaktu
    };
  }

  pilihKategoriProfil(kategori: 'RUMAH_TANGGA' | 'UMKM_KULINER' | 'PEDAGANG_PASAR') {
    if (this.kategoriAktif === kategori) return;
    this.tampilPesan('Kategori mengikuti peran akun. Perubahan kategori belum tersedia.', 'medium');
  }

  async tampilPesan(pesan: string, warna: string = 'medium') {
    const toast = await this.toastCtrl.create({
      message: pesan,
      duration: 2000,
      color: warna,
      position: 'top'
    });
    await toast.present();
  }

  hubungiKurir(noHp: string) {
    if (!noHp) {
      this.tampilPesan('Nomor telepon kurir belum tersedia.', 'warning');
      return;
    }
    window.open(`tel:${noHp}`, '_system');
  }

  load(event: any) {
    this.ambilDataDashboard(event);
  }

  formatTitikRibuan(angka: number): string {
    return (angka || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  async klikFitur(namaFitur: string) {
    if (/setor|jemput|riwayat/i.test(namaFitur)) { this.navCtrl.navigateForward('/setoran'); return; }
    if (/dompet|poin|cair/i.test(namaFitur)) { this.navCtrl.navigateForward('/pencairan'); return; }
    const toast = await this.toastCtrl.create({
      message: `${namaFitur} belum tersedia untuk dicoba.`,
      duration: 1500,
      color: 'medium',
      position: 'top'
    });
    await toast.present();
  }

  pilihTab(tab: 'beranda' | 'setor' | 'peta' | 'dompet' | 'profil') {
    if (tab === 'profil') {
      this.navCtrl.navigateForward('/profil');
    } else if (tab !== 'beranda') {
      this.klikFitur(tab.charAt(0).toUpperCase() + tab.slice(1));
    }
  }
}
