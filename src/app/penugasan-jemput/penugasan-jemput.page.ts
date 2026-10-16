import { Component, OnInit, inject } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-penugasan-jemput',
  templateUrl: './penugasan-jemput.page.html',
  styleUrls: ['./penugasan-jemput.page.scss'],
  standalone: false,
})
export class PenugasanJemputPage implements OnInit {
  private api = inject(ApiService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  loading = false;
  modeTampilan: 'TRANSAKSI' | 'LAPORAN' = 'TRANSAKSI';
  filterStatus: 'SEMUA' | 'DIAJUKAN' | 'DIJADWALKAN' | 'DALAM_PERJALANAN' | 'SELESAI' = 'SEMUA';
  kataKunci = '';

  daftarTransaksi: any[] = [];
  daftarTampil: any[] = [];
  daftarMitra: any[] = [];
  daftarDropPoint: any[] = [];
  daftarPelanggan: any[] = [];

  // Ringkasan Statistik T04
  statMenunggu = 0;
  statDitugaskan = 0;
  statBerjalan = 0;
  statSelesai = 0;
  totalEstimasiKg = 0;

  // Modal 1: Penugasan Mitra oleh Pengelola (T04)
  tampilModalTugaskan = false;
  itemDitugaskan: any = null;
  formTugas = {
    id_mitra: 1,
    nama_kurir: '',
    no_hp_kurir: '',
    jadwal_slot: '08.00 - 10.00 WIB (Sesi Pagi)',
    potongan_persen: 10
  };

  // Modal 2: Input / Simulasi Jadwal & Form Penjemputan Pelanggan (Sesuai Referensi Gambar 1)
  tampilModalPesananBaru = false;
  pilihanSlot = [
    { label: '08.00 - 10.00 WIB', sub: 'Sesi Jemput Pagi', kuota: 'Sisa 3 slot' },
    { label: '13.00 - 15.00 WIB', sub: 'Sesi Jemput Siang', kuota: 'Sisa 5 slot' },
    { label: '15.30 - 17.30 WIB', sub: 'Sesi Jemput Sore', kuota: 'Tersedia' }
  ];

  formPesanan = {
    id_pelanggan: 1,
    id_drop_point: 1,
    alamat_jemput: 'Jl. Mawar Melati No. 14, RT 03/RW 05, Kel. Sukajaya',
    catatan_pelanggan: 'Pagar hitam samping warung, sampah sudah dipilah rapi',
    jadwal_slot: '08.00 - 10.00 WIB (Sesi Jemput Pagi)',
    potongan_persen: 10,
    plastik_kg: 6,
    kardus_kg: 4,
    kaca_kg: 0,
    logam_kg: 0
  };

  ngOnInit() {
    this.muatDataPenugasan();
  }

  ionViewWillEnter() {
    this.muatDataPenugasan();
  }

  muatDataPenugasan(event?: any) {
    this.loading = true;
    this.api.getPenjemputanTransaksi().subscribe({
      next: (res) => {
        this.loading = false;
        const d = res?.data || {};
        this.daftarTransaksi = Array.isArray(d.transaksi) ? d.transaksi : [];
        this.daftarMitra = Array.isArray(d.mitra_list) ? d.mitra_list : [];
        this.daftarDropPoint = Array.isArray(d.drop_point_list) ? d.drop_point_list : [];
        this.daftarPelanggan = Array.isArray(d.pengguna_list) ? d.pengguna_list : [];

        this.hitungRingkasan();
        this.terapkanFilter();
        if (event?.target) event.target.complete();
      },
      error: () => {
        this.loading = false;
        if (event?.target) event.target.complete();
      }
    });
  }

  hitungRingkasan() {
    this.statMenunggu = this.daftarTransaksi.filter(t => t.status === 'DIAJUKAN').length;
    this.statDitugaskan = this.daftarTransaksi.filter(t => t.status === 'DIJADWALKAN').length;
    this.statBerjalan = this.daftarTransaksi.filter(t => t.status === 'DALAM_PERJALANAN').length;
    this.statSelesai = this.daftarTransaksi.filter(t => t.status === 'SELESAI').length;
    this.totalEstimasiKg = Number(
      this.daftarTransaksi.reduce((acc, t) => acc + Number(t.total_berat_kg || 0), 0).toFixed(1)
    );
  }

  pilihFilter(status: 'SEMUA' | 'DIAJUKAN' | 'DIJADWALKAN' | 'DALAM_PERJALANAN' | 'SELESAI') {
    this.filterStatus = status;
    this.terapkanFilter();
  }

  terapkanFilter() {
    const q = (this.kataKunci || '').trim().toLowerCase();
    this.daftarTampil = this.daftarTransaksi.filter(t => {
      const cocokStatus = this.filterStatus === 'SEMUA' || t.status === this.filterStatus;
      const cocokKata =
        !q ||
        (t.kode_setoran || '').toLowerCase().includes(q) ||
        (t.nama_pelanggan || '').toLowerCase().includes(q) ||
        (t.alamat_jemput || '').toLowerCase().includes(q) ||
        (t.nama_mitra || '').toLowerCase().includes(q) ||
        (t.nama_kurir || '').toLowerCase().includes(q);
      return cocokStatus && cocokKata;
    });
  }

  // Buka Modal Penugasan Mitra (T04)
  bukaModalTugaskan(item: any) {
    this.itemDitugaskan = item;
    const mitraAwal = this.daftarMitra.find(m => m.id_mitra === item.id_mitra) || this.daftarMitra[0];
    this.formTugas = {
      id_mitra: mitraAwal ? mitraAwal.id_mitra : 1,
      nama_kurir: item.sudah_ditugaskan ? item.nama_kurir : (mitraAwal?.nama_penanggung_jawab || 'Pak Budi'),
      no_hp_kurir: item.sudah_ditugaskan ? item.no_hp_kurir : (mitraAwal?.no_hp || '081122334455'),
      jadwal_slot: item.jadwal_slot || '08.00 - 10.00 WIB (Sesi Jemput Pagi)',
      potongan_persen: item.potongan_persen || 10
    };
    this.tampilModalTugaskan = true;
  }

  saatGantiMitra() {
    const m = this.daftarMitra.find(x => Number(x.id_mitra) === Number(this.formTugas.id_mitra));
    if (m) {
      this.formTugas.nama_kurir = m.nama_penanggung_jawab || `Kurir ${m.nama_mitra}`;
      this.formTugas.no_hp_kurir = m.no_hp || '081122334455';
    }
  }

  async simpanPenugasanMitra() {
    if (!this.itemDitugaskan) return;
    const mitraTerpilih = this.daftarMitra.find(m => Number(m.id_mitra) === Number(this.formTugas.id_mitra));
    const namaMitra = mitraTerpilih ? mitraTerpilih.nama_mitra : 'PT Daur Ulang Nusantara';

    const loading = await this.loadingCtrl.create({
      message: 'Menugaskan organisasi mitra & kurir...',
      spinner: 'crescent'
    });
    await loading.present();

    this.api.tugaskanMitraJemput(this.itemDitugaskan.id_penjemputan, {
      id_mitra: this.formTugas.id_mitra,
      nama_mitra: namaMitra,
      nama_kurir: this.formTugas.nama_kurir,
      no_hp_kurir: this.formTugas.no_hp_kurir,
      jadwal_slot: this.formTugas.jadwal_slot,
      potongan_persen: this.formTugas.potongan_persen
    }).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.tampilModalTugaskan = false;
        await this.tampilPesan(res?.message || 'Mitra berhasil ditugaskan!', 'success');
        this.muatDataPenugasan();
      },
      error: async (err) => {
        await loading.dismiss();
        this.tampilPesan(err?.error?.message || 'Gagal menyimpan penugasan.', 'danger');
      }
    });
  }

  // Buka Modal Buat Jadwal & Form Penjemputan Baru
  bukaModalPesananBaru() {
    if (this.daftarPelanggan.length > 0) {
      const pel = this.daftarPelanggan[0];
      this.formPesanan.id_pelanggan = pel.id_pengguna;
      if (pel.alamat) this.formPesanan.alamat_jemput = pel.alamat;
    }
    if (this.daftarDropPoint.length > 0) {
      this.formPesanan.id_drop_point = this.daftarDropPoint[0].id_drop_point;
    }
    this.tampilModalPesananBaru = true;
  }

  ubahBeratMaterial(jenis: 'plastik' | 'kardus' | 'kaca' | 'logam', delta: number) {
    const key = `${jenis}_kg` as 'plastik_kg' | 'kardus_kg' | 'kaca_kg' | 'logam_kg';
    this.formPesanan[key] = Math.max(0, Number((this.formPesanan[key] + delta).toFixed(1)));
  }

  get estimasiTotalMuatanForm(): number {
    return (
      Number(this.formPesanan.plastik_kg || 0) +
      Number(this.formPesanan.kardus_kg || 0) +
      Number(this.formPesanan.kaca_kg || 0) +
      Number(this.formPesanan.logam_kg || 0)
    );
  }

  async simpanPesananBaru() {
    if (!this.formPesanan.alamat_jemput.trim()) {
      this.tampilPesan('Alamat titik penjemputan wajib diisi!', 'warning');
      return;
    }
    if (this.estimasiTotalMuatanForm <= 0) {
      this.tampilPesan('Pilih minimal 1 material sampah dengan berat lebih dari 0 kg!', 'warning');
      return;
    }

    const rincian: any[] = [];
    if (this.formPesanan.plastik_kg > 0) rincian.push({ nama: 'Plastik', berat_kg: this.formPesanan.plastik_kg });
    if (this.formPesanan.kardus_kg > 0) rincian.push({ nama: 'Kardus', berat_kg: this.formPesanan.kardus_kg });
    if (this.formPesanan.kaca_kg > 0) rincian.push({ nama: 'Kaca', berat_kg: this.formPesanan.kaca_kg });
    if (this.formPesanan.logam_kg > 0) rincian.push({ nama: 'Logam', berat_kg: this.formPesanan.logam_kg });

    const loading = await this.loadingCtrl.create({
      message: 'Membuat pesanan penjemputan...',
      spinner: 'crescent'
    });
    await loading.present();

    this.api.buatPesananJemput({
      id_pelanggan: this.formPesanan.id_pelanggan,
      id_drop_point: this.formPesanan.id_drop_point,
      alamat_jemput: this.formPesanan.alamat_jemput,
      catatan_pelanggan: this.formPesanan.catatan_pelanggan,
      jadwal_slot: this.formPesanan.jadwal_slot,
      potongan_persen: this.formPesanan.potongan_persen,
      rincian_material: rincian
    }).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.tampilModalPesananBaru = false;
        await this.tampilPesan(res?.message || 'Pesanan penjemputan berhasil dibuat!', 'success');
        this.muatDataPenugasan();
      },
      error: async (err) => {
        await loading.dismiss();
        this.tampilPesan(err?.error?.message || 'Gagal membuat pesanan penjemputan.', 'danger');
      }
    });
  }

  // ====================================================================
  // EXPORT LAPORAN T04 KE EXCEL (.XLS) DAN PDF
  // ====================================================================
  exportKeExcel() {
    if (this.daftarTampil.length === 0) {
      this.tampilPesan('Tidak ada data laporan untuk diekspor.', 'warning');
      return;
    }

    let htmlTabel = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head><meta charset="UTF-8"></head>
      <body>
        <h2>LAPORAN PENUGASAN PENJEMPUTAN SAMPAH OLEH PENGELOLA (T04) - PILAHIN</h2>
        <p>Tanggal Cetak: ${new Date().toLocaleString('id-ID')} | Total Transaksi: ${this.daftarTampil.length} | Total Tonase: ${this.totalEstimasiKg} kg</p>
        <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:12px;">
          <thead style="background-color:#14532D;color:#FFFFFF;font-weight:bold;">
            <tr>
              <th>No</th>
              <th>Kode Setoran</th>
              <th>Tanggal</th>
              <th>Nama Pelanggan</th>
              <th>Kategori</th>
              <th>Lokasi Penjemputan</th>
              <th>Drop Point Tujuan</th>
              <th>Slot Waktu Jemput</th>
              <th>Organisasi Mitra Ditugaskan</th>
              <th>Petugas / Kurir</th>
              <th>Total Berat (kg)</th>
              <th>Potongan (%)</th>
              <th>Status Penugasan</th>
            </tr>
          </thead>
          <tbody>
    `;

    this.daftarTampil.forEach((t, idx) => {
      htmlTabel += `
        <tr>
          <td>${idx + 1}</td>
          <td>${t.kode_setoran}</td>
          <td>${new Date(t.tanggal_jemput).toLocaleDateString('id-ID')}</td>
          <td>${t.nama_pelanggan}</td>
          <td>${t.kategori_pelanggan}</td>
          <td>${t.alamat_jemput}</td>
          <td>${t.nama_drop_point}</td>
          <td>${t.jadwal_slot}</td>
          <td>${t.nama_mitra}</td>
          <td>${t.nama_kurir}</td>
          <td>${t.total_berat_kg}</td>
          <td>${t.potongan_persen}%</td>
          <td>${t.status}</td>
        </tr>
      `;
    });

    htmlTabel += `</tbody></table></body></html>`;

    const blob = new Blob([htmlTabel], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Laporan_Penugasan_Penjemputan_T04_${new Date().toISOString().slice(0, 10)}.xls`;
    a.click();
    window.URL.revokeObjectURL(url);
    this.tampilPesan('Laporan Excel (.xls) T04 berhasil diunduh!', 'success');
  }

  exportKePDF() {
    if (this.daftarTampil.length === 0) {
      this.tampilPesan('Tidak ada data laporan untuk dicetak ke PDF.', 'warning');
      return;
    }

    const barisHtml = this.daftarTampil.map((t, i) => `
      <tr>
        <td>${i + 1}</td>
        <td><strong>${t.kode_setoran}</strong><br><small>${new Date(t.tanggal_jemput).toLocaleDateString('id-ID')}</small></td>
        <td><strong>${t.nama_pelanggan}</strong><br><small>${t.kategori_pelanggan}</small></td>
        <td>${t.alamat_jemput}</td>
        <td>${t.nama_drop_point}<br><small>${t.jadwal_slot}</small></td>
        <td><strong>${t.nama_mitra}</strong><br><small>Kurir: ${t.nama_kurir}</small></td>
        <td style="text-align:right;"><strong>${t.total_berat_kg} kg</strong></td>
        <td><strong>${t.status}</strong></td>
      </tr>
    `).join('');

    const jendelaCetak = window.open('', '_blank', 'width=980,height=720');
    if (!jendelaCetak) {
      this.tampilPesan('Izinkan pop-up di browser untuk menyimpan PDF.', 'warning');
      return;
    }

    jendelaCetak.document.write(`
      <html>
      <head>
        <title>Laporan Penugasan Penjemputan (T04) - Pilahin</title>
        <style>
          body { font-family: Arial, sans-serif; color: #0F291E; padding: 24px; }
          .header { border-bottom: 3px solid #15803D; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; }
          h1 { margin: 0 0 4px; font-size: 20px; color: #14532D; }
          p { margin: 2px 0; font-size: 12px; color: #475569; }
          .summary { display: flex; gap: 12px; margin-bottom: 18px; }
          .box { border: 1px solid #CBD5E1; border-radius: 8px; padding: 10px 14px; flex: 1; background: #F8FAFC; }
          .box strong { display: block; font-size: 18px; color: #14532D; }
          table { width: 100%; border-collapse: collapse; font-size: 11.5px; }
          th { background: #14532D; color: #FFFFFF; padding: 8px; text-align: left; border: 1px solid #14532D; }
          td { padding: 8px; border: 1px solid #CBD5E1; vertical-align: top; }
          tr:nth-child(even) { background: #F8FAF9; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>LAPORAN TRANSAKSI PENUGASAN PENJEMPUTAN SAMPAH (T04)</h1>
            <p>Sistem Informasi Pengelolaan Daur Ulang Sampah Terpilah (PILAHIN)</p>
          </div>
          <div style="text-align:right;">
            <p><strong>Tanggal Cetak:</strong> ${new Date().toLocaleString('id-ID')}</p>
            <p><strong>Otoritas:</strong> Pengelola Drop Point</p>
          </div>
        </div>
        <div class="summary">
          <div class="box"><span>Total Permintaan</span><strong>${this.daftarTransaksi.length}</strong></div>
          <div class="box"><span>Menunggu Tugas</span><strong>${this.statMenunggu}</strong></div>
          <div class="box"><span>Sudah Ditugaskan</span><strong>${this.statDitugaskan + this.statBerjalan}</strong></div>
          <div class="box"><span>Selesai Jemput</span><strong>${this.statSelesai}</strong></div>
          <div class="box"><span>Total Tonase</span><strong>${this.totalEstimasiKg} kg</strong></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Kode & Tgl</th>
              <th>Pelanggan</th>
              <th>Lokasi Penjemputan</th>
              <th>Drop Point & Slot</th>
              <th>Mitra & Kurir Ditugaskan</th>
              <th>Berat</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${barisHtml}</tbody>
        </table>
        <script>window.onload = function() { window.print(); };</script>
      </body>
      </html>
    `);
    jendelaCetak.document.close();
  }

  bukaHalamanKurirMitra() {
    this.navCtrl.navigateForward('/kurir-mitra');
  }

  kembali() {
    this.navCtrl.navigateBack('/dashboard-pengelola');
  }

  async tampilPesan(pesan: string, warna: string) {
    const toast = await this.toastCtrl.create({
      message: pesan,
      duration: 2500,
      color: warna,
      position: 'top'
    });
    await toast.present();
  }
}