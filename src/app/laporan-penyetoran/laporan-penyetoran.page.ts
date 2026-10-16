import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { LaporanService, LaporanSetoranItem, ItemMaterialSetoran } from '../services/laporan.service';

@Component({
  selector: 'app-laporan-penyetoran',
  templateUrl: './laporan-penyetoran.page.html',
  styleUrls: ['./laporan-penyetoran.page.scss'],
  standalone: false
})
export class LaporanPenyetoranPage implements OnInit {
  private laporanSvc = inject(LaporanService);
  private toastCtrl = inject(ToastController);
  cdr = inject(ChangeDetectorRef);

  daftarSemua: LaporanSetoranItem[] = [];
  sedangMemuat = true;

  // Filter State sesuai Penugasan Tim
  tanggalMulai = '';
  tanggalSelesai = '';
  filterPeriodeCepat: 'SEMUA' | 'HARI_INI' | '7_HARI' | 'BULAN_INI' = 'SEMUA';
  sumberPilih: string = 'SEMUA'; // 'SEMUA' | 'RUMAH_TANGGA' | 'UMKM_KULINER' | 'PEDAGANG_PASAR'
  metodePilih: string = 'SEMUA'; // 'SEMUA' | 'JEMPUT' | 'ANTAR_SENDIRI'
  materialPilih: string = 'SEMUA';
  statusPilih: string = 'SEMUA';
  kataKunci: string = '';

  filterModalTerbuka = false;
  detailModalTerbuka = false;
  itemDetailTerpilih: LaporanSetoranItem | null = null;

  ngOnInit() {
    this.muatData();
  }

  ionViewWillEnter() {
    this.muatData();
  }

  muatData(event?: any) {
    this.sedangMemuat = !event && this.daftarSemua.length === 0;
    this.cdr.detectChanges();

    this.laporanSvc.getLaporanPenyetoran().subscribe({
      next: (data) => {
        this.daftarSemua = data;
        this.sedangMemuat = false;
        if (event?.target) event.target.complete();
        this.cdr.detectChanges();
      },
      error: () => {
        this.sedangMemuat = false;
        if (event?.target) event.target.complete();
        this.cdr.detectChanges();
      }
    });
  }

  // Daftar Pilihan Material Unik
  get listMaterialUnik(): string[] {
    const setMaterial = new Set<string>();
    this.daftarSemua.forEach((s) => {
      s.items?.forEach((i) => {
        if (i.nama_jenis) setMaterial.add(i.nama_jenis);
      });
    });
    return Array.from(setMaterial);
  }

  // Filter Periode Cepat
  setPeriodeCepat(tipe: 'SEMUA' | 'HARI_INI' | '7_HARI' | 'BULAN_INI') {
    this.filterPeriodeCepat = tipe;
    const now = new Date();
    const toDateStr = (d: Date) => d.toISOString().substring(0, 10);

    if (tipe === 'SEMUA') {
      this.tanggalMulai = '';
      this.tanggalSelesai = '';
    } else if (tipe === 'HARI_INI') {
      this.tanggalMulai = toDateStr(now);
      this.tanggalSelesai = toDateStr(now);
    } else if (tipe === '7_HARI') {
      const past7 = new Date();
      past7.setDate(now.getDate() - 7);
      this.tanggalMulai = toDateStr(past7);
      this.tanggalSelesai = toDateStr(now);
    } else if (tipe === 'BULAN_INI') {
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      this.tanggalMulai = toDateStr(firstDay);
      this.tanggalSelesai = toDateStr(now);
    }
    this.cdr.detectChanges();
  }

  resetFilter() {
    this.tanggalMulai = '';
    this.tanggalSelesai = '';
    this.filterPeriodeCepat = 'SEMUA';
    this.sumberPilih = 'SEMUA';
    this.metodePilih = 'SEMUA';
    this.materialPilih = 'SEMUA';
    this.statusPilih = 'SEMUA';
    this.kataKunci = '';
    this.cdr.detectChanges();
  }

  // Data Terfilter
  get laporanTersaring(): LaporanSetoranItem[] {
    return this.daftarSemua.filter((item) => {
      // 1. Filter Tanggal
      if (this.tanggalMulai && item.tanggal < this.tanggalMulai) return false;
      if (this.tanggalSelesai && item.tanggal > this.tanggalSelesai) return false;

      // 2. Filter Sumber (Kategori Pelanggan)
      if (this.sumberPilih !== 'SEMUA' && item.sumber_pelanggan !== this.sumberPilih) return false;

      // 3. Filter Metode (Jemput vs Antar Sendiri)
      if (this.metodePilih !== 'SEMUA' && item.metode !== this.metodePilih) return false;

      // 4. Filter Status
      if (this.statusPilih !== 'SEMUA' && item.status !== this.statusPilih) return false;

      // 5. Filter Material
      if (this.materialPilih !== 'SEMUA') {
        const punyaMaterial = item.items?.some((i) => i.nama_jenis === this.materialPilih);
        if (!punyaMaterial) return false;
      }

      // 6. Pencarian Kata Kunci
      if (this.kataKunci.trim()) {
        const q = this.kataKunci.toLowerCase();
        const cocokNama = item.nama_pelanggan.toLowerCase().includes(q);
        const cocokKode = item.kode_setoran.toLowerCase().includes(q);
        const cocokDropPoint = item.nama_drop_point.toLowerCase().includes(q);
        const cocokMaterial = item.items?.some((i) => i.nama_jenis.toLowerCase().includes(q));
        if (!cocokNama && !cocokKode && !cocokDropPoint && !cocokMaterial) return false;
      }

      return true;
    });
  }

  // Metrik Agregasi / KPI
  get totalBeratDiterima(): number {
    return Math.round(this.laporanTersaring.reduce((sum, x) => sum + x.total_berat_diterima, 0) * 10) / 10;
  }

  get totalBeratDitolak(): number {
    return Math.round(this.laporanTersaring.reduce((sum, x) => sum + x.total_berat_ditolak, 0) * 10) / 10;
  }

  get totalPoinBersih(): number {
    return this.laporanTersaring.reduce((sum, x) => sum + x.poin_bersih, 0);
  }

  get totalPoinKotor(): number {
    return this.laporanTersaring.reduce((sum, x) => sum + x.poin_kotor, 0);
  }

  get totalPoinPotongan(): number {
    return this.laporanTersaring.reduce((sum, x) => sum + x.potongan_poin, 0);
  }

  get totalEstimasiCo2(): number {
    return Math.round(this.laporanTersaring.reduce((sum, x) => sum + x.estimasi_hemat_co2, 0) * 10) / 10;
  }

  get rasioPenolakan(): number {
    const totalSemua = this.totalBeratDiterima + this.totalBeratDitolak;
    if (totalSemua === 0) return 0;
    return Math.round((this.totalBeratDitolak / totalSemua) * 1000) / 10;
  }

  bukaDetail(item: LaporanSetoranItem) {
    this.itemDetailTerpilih = item;
    this.detailModalTerbuka = true;
    this.cdr.detectChanges();
  }

  labelSumber(sumber: string): string {
    switch (sumber) {
      case 'RUMAH_TANGGA': return 'Rumah Tangga';
      case 'UMKM_KULINER': return 'UMKM Kuliner';
      case 'PEDAGANG_PASAR': return 'Pedagang Pasar';
      default: return sumber;
    }
  }

  badgeSumberColor(sumber: string): string {
    switch (sumber) {
      case 'RUMAH_TANGGA': return 'primary';
      case 'UMKM_KULINER': return 'warning';
      case 'PEDAGANG_PASAR': return 'tertiary';
      default: return 'medium';
    }
  }

  labelMetode(metode: string): string {
    return metode === 'JEMPUT' ? 'Penjemputan Kurir' : 'Antar di Drop Point';
  }

  fmt(n: number | undefined | null): string {
    return Number(n || 0).toLocaleString('id-ID');
  }

  // ================= EKSPOR LAPORAN KE CSV / EXCEL =================
  async eksporCSV() {
    if (this.laporanTersaring.length === 0) {
      this.toast('Tidak ada data untuk diekspor!', 'warning');
      return;
    }

    const barisHeader = [
      'No',
      'ID Setoran',
      'Tanggal',
      'Waktu',
      'Nama Pelanggan',
      'Kategori Sumber',
      'Metode Penyetoran',
      'Drop Point',
      'Material Sampah',
      'Berat Diterima (kg)',
      'Berat Ditolak (kg)',
      'Alasan Penolakan',
      'Tarif Poin/kg',
      'Poin Kotor',
      'Potongan Jemputan (%)',
      'Poin Bersih Diterima',
      'Estimasi Hemat CO2 (kg)',
      'Status Setoran'
    ];

    const dataBaris: string[][] = [];
    let counter = 1;

    this.laporanTersaring.forEach((s) => {
      if (s.items && s.items.length > 0) {
        s.items.forEach((item) => {
          dataBaris.push([
            String(counter++),
            s.kode_setoran,
            s.tanggal,
            s.waktu,
            `"${s.nama_pelanggan.replace(/"/g, '""')}"`,
            this.labelSumber(s.sumber_pelanggan),
            this.labelMetode(s.metode),
            `"${s.nama_drop_point.replace(/"/g, '""')}"`,
            `"${item.nama_jenis.replace(/"/g, '""')}"`,
            String(item.berat_diterima_kg),
            String(item.berat_ditolak_kg),
            `"${(item.alasan_penolakan || '-').replace(/"/g, '""')}"`,
            String(item.poin_per_kg_snapshot),
            String(item.subtotal_poin),
            `${s.potongan_persen}%`,
            String(s.poin_bersih),
            String(item.estimasi_co2_kg || 0),
            s.status
          ]);
        });
      } else {
        dataBaris.push([
          String(counter++),
          s.kode_setoran,
          s.tanggal,
          s.waktu,
          `"${s.nama_pelanggan.replace(/"/g, '""')}"`,
          this.labelSumber(s.sumber_pelanggan),
          this.labelMetode(s.metode),
          `"${s.nama_drop_point.replace(/"/g, '""')}"`,
          'Campuran',
          String(s.total_berat_diterima),
          String(s.total_berat_ditolak),
          '-',
          '-',
          String(s.poin_kotor),
          `${s.potongan_persen}%`,
          String(s.poin_bersih),
          String(s.estimasi_hemat_co2),
          s.status
        ]);
      }
    });

    const csvContent =
      '\uFEFF' + // BOM for Excel UTF-8
      barisHeader.join(',') + '\n' +
      dataBaris.map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Laporan_Penyetoran_Pilahin_${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    this.toast('Laporan penyetoran berhasil diunduh (format CSV Excel)!', 'success');
  }

  private async toast(pesan: string, warna: string) {
    const t = await this.toastCtrl.create({
      message: pesan,
      duration: 2500,
      color: warna,
      position: 'top'
    });
    await t.present();
  }
}
