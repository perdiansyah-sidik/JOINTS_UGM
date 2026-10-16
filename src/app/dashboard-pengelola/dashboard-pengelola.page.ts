import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { KasService, MutasiKas, PosDana, MetodeBayar, PenjualanSiapLunas } from '../services/kas.service';
import { PenimbanganService } from '../services/penimbangan.service';

@Component({
  selector: 'app-dashboard-pengelola',
  templateUrl: './dashboard-pengelola.page.html',
  styleUrls: ['./dashboard-pengelola.page.scss'],
  standalone: false
})
export class DashboardPengelolaPage implements OnInit {
  private router = inject(Router);
  private api = inject(ApiService);
  private kasSvc = inject(KasService);
  private penimbanganSvc = inject(PenimbanganService);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);
  cdr = inject(ChangeDetectorRef);

  pengelola = {
    nama: 'Pak Andi',
    lokasi: 'Drop Point Pasar Blok A'
  };

  kas = {
    tersedia: 8350000,
    dipesan: 1240000,
    total: 12500000,
    komunitas: 1250000,
    operasional: 6250000
  };

  countMenungguVerifikasi = 5;
  idPenggunaAktif = 1;

  // State Modal Buku Kas (T08)
  modalKasTerbuka = false;
  sedangMuatKas = false;
  filterPos: 'SEMUA' | PosDana = 'SEMUA';
  daftarMutasi: MutasiKas[] = [];
  penjualanTersedia: PenjualanSiapLunas[] = [];

  // Modal Tambah Mutasi Kas Baru
  modalTambahTerbuka = false;
  menyimpan = false;
  form = {
    pos_dana: 'HASIL_PENJUALAN' as PosDana,
    tipe_arah: 'MASUK' as 'MASUK' | 'KELUAR',
    id_penjualan: null as number | null,
    nominal: null as number | null,
    metode: 'TRANSFER' as MetodeBayar,
    pihak_terkait: '',
    keterangan: '',
    bukti: '',
  };

  jumlahMitraAktif = 1;

  tindakanHariIni = [
    { icon: 'clipboard-outline', title: 'Setoran menunggu verifikasi', subtitle: 'Hasil timbang petugas mitra', count: 5, badgeClass: 'badge-green', iconClass: 'box-green', route: '/penimbangan-verifikasi' },
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
    this.muatRingkasanKas();
    this.muatAntreanTimbang();
  }

  ionViewWillEnter() {
    this.muatSesiPengelola();
    this.sinkronDataPengelola();
    this.muatRingkasanKas();
    this.muatAntreanTimbang();
  }

  muatSesiPengelola() {
    try {
      const raw = localStorage.getItem('ecoapp_user') || localStorage.getItem('pengguna');
      const u = JSON.parse(raw || 'null');
      this.idPenggunaAktif = Number(u?.id_pengguna ?? u?.id ?? 1);
      if (u?.nama) this.pengelola.nama = u.nama;
    } catch {
      this.idPenggunaAktif = 1;
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

  muatRingkasanKas() {
    this.kasSvc.getRingkasanKas().subscribe({
      next: (r) => {
        this.kas.tersedia = r.cadangan_poin;
        this.kas.dipesan = r.cadangan_dipesan;
        this.kas.total = r.total_kas;
        this.kas.komunitas = r.komunitas;
        this.kas.operasional = r.operasional;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  muatAntreanTimbang() {
    this.penimbanganSvc.getDaftarSetoran().subscribe({
      next: (data) => {
        const menunggu = data.filter(s => s.status === 2 || String(s.status).toUpperCase() === 'DIAJUKAN');
        this.countMenungguVerifikasi = menunggu.length;
        if (this.tindakanHariIni[0]) {
          this.tindakanHariIni[0].count = menunggu.length;
        }
        this.cdr.detectChanges();
      },
      error: () => {}
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
  // Navigasi ke Modul Master Jenis Sampah (M04)
  goToJenisSampah() {
    this.router.navigate(['/jenis-sampah']);
  }

  // Navigasi ke Penimbangan & Verifikasi (T02)
  goToTimbang() {
    this.router.navigate(['/penimbangan-verifikasi']);
  }

  // Navigasi ke Laporan Penyetoran (Tugas Perdi)
  goToLaporanPenyetoran() {
    this.router.navigate(['/laporan-penyetoran']);
  }

  async bukaMenu(namaFitur: string) {
    if (namaFitur === 'Laporan Penyetoran') {
      this.goToLaporanPenyetoran();
      return;
    }
    if (namaFitur === 'Timbang & Verifikasi' || namaFitur === 'Setoran menunggu verifikasi') {
      this.goToTimbang();
      return;
    }
    if (namaFitur === 'Master Jenis Sampah') {
      this.goToJenisSampah();
      return;
    }
    if (namaFitur === 'Master Mitra') {
      this.goToMitra();
      return;
    }
    if (namaFitur === 'Master Drop Point') {
      this.goToDropPoint();
      return;
    }
    if (namaFitur === 'Mutasi Kas & Alokasi') {
      this.bukaModalKas();
      return;
    }

    const toast = await this.toastCtrl.create({
      message: `Membuka modul ${namaFitur}...`,
      duration: 1500,
      color: 'success',
      position: 'top'
    });
    await toast.present();
  }

  async keluarAkun() {
    (document.activeElement as HTMLElement)?.blur();
    const alert = await this.alertCtrl.create({
      header: 'Keluar Akun?',
      message: 'Apakah Anda yakin ingin keluar dari sesi Pengelola?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Ya, Keluar',
          role: 'destructive',
          handler: () => {
            localStorage.removeItem('ecoapp_user');
            localStorage.removeItem('pengguna');
            localStorage.removeItem('token');
            this.router.navigateByUrl('/login', { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();
  }

  // --- LOGIKA BUKU KAS (T08) ---
  bukaModalKas() {
    this.modalKasTerbuka = true;
    this.sedangMuatKas = true;
    this.cdr.detectChanges();

    this.kasSvc.getMutasiKas().subscribe({
      next: (data) => {
        this.daftarMutasi = data;
        this.muatPenjualan();
      },
      error: () => {
        if (this.daftarMutasi.length === 0) {
          this.daftarMutasi = this.generateFallbackMutasi();
        }
        this.muatPenjualan();
      }
    });
  }

  private muatPenjualan() {
    this.kasSvc.getPenjualanBelumLunas().subscribe({
      next: (p) => {
        this.penjualanTersedia = p;
        this.sedangMuatKas = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.penjualanTersedia = [
          { id_penjualan: 501, nama_mitra: 'PT Daur Ulang Nusantara', tanggal_penjualan: '2026-10-15', total_tagihan: 2500000, status: 'DIKIRIM', sudah_lunas: false },
          { id_penjualan: 502, nama_mitra: 'CV Logam Jaya Abadi', tanggal_penjualan: '2026-10-16', total_tagihan: 1800000, status: 'DITERIMA', sudah_lunas: false }
        ];
        this.sedangMuatKas = false;
        this.cdr.detectChanges();
      }
    });
  }

  get mutasiTersaring(): MutasiKas[] {
    if (this.filterPos === 'SEMUA') {
      return this.daftarMutasi;
    }
    return this.daftarMutasi.filter(m => m.pos_dana === this.filterPos);
  }

  bukaModalTambah() {
    this.form = {
      pos_dana: 'HASIL_PENJUALAN',
      tipe_arah: 'MASUK',
      id_penjualan: this.penjualanTersedia.length ? this.penjualanTersedia[0].id_penjualan : null,
      nominal: this.penjualanTersedia.length ? this.penjualanTersedia[0].total_tagihan : null,
      metode: 'TRANSFER',
      pihak_terkait: this.penjualanTersedia.length ? this.penjualanTersedia[0].nama_mitra : '',
      keterangan: 'Pelunasan penjualan material ke mitra daur ulang',
      bukti: '',
    };
    this.modalTambahTerbuka = true;
    this.cdr.detectChanges();
  }

  onPosDanaChange() {
    if (this.form.pos_dana === 'HASIL_PENJUALAN') {
      this.form.tipe_arah = 'MASUK';
      this.onPilihPenjualan();
    } else if (this.form.pos_dana === 'CADANGAN_POIN') {
      this.form.tipe_arah = 'MASUK';
      this.form.id_penjualan = null;
      this.form.pihak_terkait = 'Pengelola Pusat';
      this.form.keterangan = 'Setoran modal cadangan poin';
    } else if (this.form.pos_dana === 'KOMUNITAS') {
      this.form.tipe_arah = 'KELUAR';
      this.form.id_penjualan = null;
      this.form.pihak_terkait = this.pengelola.lokasi;
      this.form.keterangan = 'Penyaluran bagi hasil komunitas drop point';
    } else if (this.form.pos_dana === 'OPERASIONAL') {
      this.form.tipe_arah = 'KELUAR';
      this.form.id_penjualan = null;
      this.form.pihak_terkait = '';
      this.form.keterangan = 'Biaya operasional pengelolaan sampah';
    }
    this.cdr.detectChanges();
  }

  onPilihPenjualan() {
    const p = this.penjualanTersedia.find(x => x.id_penjualan === this.form.id_penjualan);
    if (p) {
      this.form.nominal = p.total_tagihan;
      this.form.pihak_terkait = p.nama_mitra;
      this.form.keterangan = `Pelunasan penjualan #PJL-${p.id_penjualan} ke ${p.nama_mitra}`;
    }
    this.cdr.detectChanges();
  }

  get alokasiCadangan(): number {
    return Math.floor((Number(this.form.nominal || 0) * 40) / 100);
  }
  get alokasiKomunitas(): number {
    return Math.floor((Number(this.form.nominal || 0) * 10) / 100);
  }
  get alokasiOperasional(): number {
    return Number(this.form.nominal || 0) - this.alokasiCadangan - this.alokasiKomunitas;
  }

  simulasiUploadBukti(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.form.bukti = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  async simpanMutasi() {
    const nominal = Number(this.form.nominal || 0);
    if (!nominal || nominal <= 0) {
      this.toast('Nominal harus lebih dari 0!', 'warning');
      return;
    }
    if (!this.form.bukti) {
      this.toast('Foto bukti transaksi wajib diunggah!', 'warning');
      return;
    }

    if (this.form.pos_dana === 'HASIL_PENJUALAN') {
      if (!this.form.id_penjualan) {
        this.toast('Pilih referensi penjualan yang dilunasi!', 'warning');
        return;
      }
    } else {
      if (!this.form.pihak_terkait.trim()) {
        this.toast('Pihak terkait (nama penerima / penyetor) wajib diisi!', 'warning');
        return;
      }
      if (!this.form.keterangan.trim()) {
        this.toast('Keterangan keperluan transaksi wajib diisi!', 'warning');
        return;
      }
    }

    this.menyimpan = true;
    this.cdr.detectChanges();

    if (this.form.pos_dana === 'HASIL_PENJUALAN') {
      this.kasSvc.catatPelunasanPenjualan({
        id_penjualan: this.form.id_penjualan!,
        jumlah_rupiah: nominal,
        metode: this.form.metode,
        bukti: this.form.bukti,
        keterangan: this.form.keterangan,
        dicatat_oleh: this.idPenggunaAktif,
        waktu_transaksi: new Date().toISOString(),
      }).subscribe({
        next: () => {
          this.selesaiSimpan();
        },
        error: () => {
          // Mock update lokal
          this.daftarMutasi.unshift({
            id_mutasi_kas: Date.now(),
            pos_dana: 'HASIL_PENJUALAN',
            jumlah_rupiah: nominal,
            id_penjualan: this.form.id_penjualan,
            metode: this.form.metode,
            pihak_terkait: this.form.pihak_terkait,
            keterangan: this.form.keterangan,
            bukti: this.form.bukti,
            persen_cadangan_snapshot: 40,
            persen_komunitas_snapshot: 10,
            waktu_transaksi: new Date().toISOString(),
          });
          const p = this.penjualanTersedia.find(x => x.id_penjualan === this.form.id_penjualan);
          if (p) p.sudah_lunas = true;
          this.kas.total += nominal;
          this.kas.tersedia += this.alokasiCadangan;
          this.kas.komunitas += this.alokasiKomunitas;
          this.kas.operasional += this.alokasiOperasional;
          this.selesaiSimpan();
        }
      });
    } else {
      const nominalArah = this.form.tipe_arah === 'KELUAR' ? -Math.abs(nominal) : Math.abs(nominal);
      this.kasSvc.catatMutasi({
        pos_dana: this.form.pos_dana,
        jumlah_rupiah: nominalArah,
        metode: this.form.metode,
        pihak_terkait: this.form.pihak_terkait.trim(),
        keterangan: this.form.keterangan.trim(),
        bukti: this.form.bukti,
        dicatat_oleh: this.idPenggunaAktif,
        waktu_transaksi: new Date().toISOString(),
      }).subscribe({
        next: () => {
          this.selesaiSimpan();
        },
        error: () => {
          this.daftarMutasi.unshift({
            id_mutasi_kas: Date.now(),
            pos_dana: this.form.pos_dana,
            jumlah_rupiah: nominalArah,
            metode: this.form.metode,
            pihak_terkait: this.form.pihak_terkait,
            keterangan: this.form.keterangan,
            bukti: this.form.bukti,
            waktu_transaksi: new Date().toISOString(),
          });
          this.kas.total += nominalArah;
          if (this.form.pos_dana === 'CADANGAN_POIN') this.kas.tersedia += nominalArah;
          if (this.form.pos_dana === 'KOMUNITAS') this.kas.komunitas += nominalArah;
          if (this.form.pos_dana === 'OPERASIONAL') this.kas.operasional += nominalArah;
          this.selesaiSimpan();
        }
      });
    }
  }

  private selesaiSimpan() {
    this.menyimpan = false;
    this.modalTambahTerbuka = false;
    this.toast('Pencatatan kas berhasil disahkan!', 'success');
    this.cdr.detectChanges();
  }

  async lihatBukti(m: MutasiKas) {
    const alert = await this.alertCtrl.create({
      header: `Bukti Transaksi #${m.id_mutasi_kas || ''}`,
      message: `<img src="${m.bukti}" style="max-height: 250px; border-radius: 8px; margin: 10px 0;" /><p>${m.keterangan || ''}</p>`,
      buttons: ['Tutup']
    });
    await alert.present();
  }

  warnaPos(pos: PosDana): string {
    switch (pos) {
      case 'HASIL_PENJUALAN': return 'success';
      case 'CADANGAN_POIN': return 'primary';
      case 'KOMUNITAS': return 'tertiary';
      case 'OPERASIONAL': return 'warning';
      default: return 'medium';
    }
  }

  labelPos(pos: PosDana): string {
    switch (pos) {
      case 'HASIL_PENJUALAN': return 'Pelunasan Penjualan';
      case 'CADANGAN_POIN': return 'Cadangan Poin';
      case 'KOMUNITAS': return 'Komunitas Drop Point';
      case 'OPERASIONAL': return 'Operasional';
      default: return pos;
    }
  }

  fmt(n: number | undefined): string {
    return Number(n || 0).toLocaleString('id-ID');
  }

  private async toast(pesan: string, warna: string) {
    const t = await this.toastCtrl.create({
      message: pesan,
      color: warna,
      duration: 2500,
      position: 'top',
    });
    await t.present();
  }

  private generateFallbackMutasi(): MutasiKas[] {
    return [
      {
        id_mutasi_kas: 1,
        pos_dana: 'CADANGAN_POIN',
        jumlah_rupiah: 3000000,
        metode: 'TRANSFER',
        pihak_terkait: 'Pengelola Pusat',
        keterangan: 'Setoran modal awal cadangan poin',
        bukti: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
        waktu_transaksi: '2026-10-10 09:00:00'
      },
      {
        id_mutasi_kas: 2,
        pos_dana: 'HASIL_PENJUALAN',
        jumlah_rupiah: 4000000,
        id_penjualan: 500,
        metode: 'TRANSFER',
        pihak_terkait: 'PT Daur Ulang Nusantara',
        keterangan: 'Pelunasan penjualan #PJL-500 (Alokasi: 40% Cadangan, 10% Komunitas, 50% Operasional)',
        bukti: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
        persen_cadangan_snapshot: 40,
        persen_komunitas_snapshot: 10,
        waktu_transaksi: '2026-10-12 14:30:00'
      },
      {
        id_mutasi_kas: 3,
        pos_dana: 'KOMUNITAS',
        jumlah_rupiah: -500000,
        metode: 'TRANSFER',
        pihak_terkait: 'Paguyuban Warga RW 05',
        keterangan: 'Pemberian insentif pengelola drop point',
        bukti: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
        waktu_transaksi: '2026-10-14 11:15:00'
      }
    ];
  }
}