import { Component, OnInit, inject } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-kurir-mitra',
  templateUrl: './kurir-mitra.page.html',
  styleUrls: ['./kurir-mitra.page.scss'],
  standalone: false,
})
export class KurirMitraPage implements OnInit {
  private api = inject(ApiService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  loading = false;
  tabUtama: 'OPERASIONAL' | 'LAPORAN' = 'OPERASIONAL';
  tabFilter: 'AKTIF' | 'SELESAI' = 'AKTIF';

  // Profil Mitra & Kurir
  idMitra: number = 1;
  inisialKurir: string = 'PB';
  namaKurir: string = 'Pak Budi';
  namaOrganisasiMitra: string = 'PT Daur Ulang Nusantara';
  noHpKurir: string = '081122334455';
  alamatMitra: string = 'Kawasan Industri Cikarang';

  // Statistik T03
  totalTugasHariIni: number = 0;
  totalSelesai: number = 0;
  totalTerangkutKg: number = 0;
  totalPoinBersihPelanggan: number = 0;

  semuaPenjemputanMitra: any[] = [];
  tugasAktifList: any[] = [];
  tugasSelesaiList: any[] = [];

  // Modal 1: Detail Progres Penjemputan 5 Tahap (Sesuai Gambar Referensi 2)
  tampilModalProgres = false;
  itemProgresTerpilih: any = null;

  // Modal 2: Input Timbangan Fisik Kurir Mitra (T03)
  tampilModalTimbang = false;
  itemDitimbang: any = null;
  formTimbang = {
    plastik_kg: 0,
    kardus_kg: 0,
    kaca_kg: 0,
    logam_kg: 0,
    catatan_kurir: 'Material terpilah bersih dan sudah ditimbang di lokasi pelanggan'
  };

  ngOnInit() {
    this.muatSesiKurir();
  }

  ionViewWillEnter() {
    this.muatSesiKurir();
  }

  muatSesiKurir() {
    const sesi = localStorage.getItem('ecoapp_user');
    if (sesi) {
      try {
        const user = JSON.parse(sesi);
        if (user.id_mitra) this.idMitra = Number(user.id_mitra);
        if (user.nama) {
          this.namaKurir = user.nama;
          this.inisialKurir = this.buatInisial(user.nama);
        }
        if (user.nama_mitra) this.namaOrganisasiMitra = user.nama_mitra;
        if (user.no_hp) this.noHpKurir = user.no_hp;
        if (user.alamat_fasilitas || user.alamat) this.alamatMitra = user.alamat_fasilitas || user.alamat;
      } catch (e) {}
    }
    this.ambilTugasKurir();
  }

  buatInisial(nama: string): string {
    const bagian = (nama || 'Mitra').trim().split(' ');
    if (bagian.length >= 2) return (bagian[0][0] + bagian[1][0]).toUpperCase();
    return nama.substring(0, 2).toUpperCase();
  }

  ambilTugasKurir(event?: any) {
    this.loading = true;
    this.api.getPenjemputanTransaksi().subscribe({
      next: (res) => {
        this.loading = false;
        const d = res?.data || {};
        const semua = Array.isArray(d.transaksi) ? d.transaksi : [];

        // Tampilkan tugas yang sudah ditugaskan oleh Pengelola (DIJADWALKAN, DALAM_PERJALANAN, SELESAI)
        this.semuaPenjemputanMitra = semua;
        this.tugasAktifList = semua.filter((t: any) =>
          ['DIAJUKAN', 'DIJADWALKAN', 'DALAM_PERJALANAN'].includes(t.status)
        );
        this.tugasSelesaiList = semua.filter((t: any) => t.status === 'SELESAI');

        this.totalTugasHariIni = this.semuaPenjemputanMitra.length;
        this.totalSelesai = this.tugasSelesaiList.length;
        this.totalTerangkutKg = Number(
          this.semuaPenjemputanMitra.reduce((acc, t) => acc + Number(t.total_berat_kg || 0), 0).toFixed(1)
        );
        this.totalPoinBersihPelanggan = this.semuaPenjemputanMitra.reduce(
          (acc, t) => acc + Number(t.poin_bersih || 0),
          0
        );

        if (event?.target) event.target.complete();
      },
      error: () => {
        this.loading = false;
        if (event?.target) event.target.complete();
      }
    });
  }

  // Mulai Perjalanan Kurir (DIJADWALKAN -> DALAM_PERJALANAN)
  async mulaiPerjalanan(item: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Memulai perjalanan ke lokasi pelanggan...',
      spinner: 'crescent'
    });
    await loading.present();

    this.api.updateStatusKurirDanTimbang(item.id_penjemputan, {
      status: 'DALAM_PERJALANAN'
    }).subscribe({
      next: async (res) => {
        await loading.dismiss();
        await this.tampilPesan(res?.message || 'Kurir dalam perjalanan!', 'success');
        this.ambilTugasKurir();
      },
      error: async () => {
        await loading.dismiss();
        this.tampilPesan('Gagal memperbarui status perjalanan.', 'danger');
      }
    });
  }

  // Buka Modal Input Timbang Aktual di Lokasi Pelanggan (T03)
  bukaModalTimbang(item: any) {
    this.itemDitimbang = item;
    const rincian = Array.isArray(item.rincian_material) ? item.rincian_material : [];
    const cariKg = (nama: string) => {
      const f = rincian.find((m: any) => (m.nama || '').toLowerCase().includes(nama.toLowerCase()));
      return f ? Number(f.berat_kg || 0) : 0;
    };

    this.formTimbang = {
      plastik_kg: cariKg('Plastik') || 6,
      kardus_kg: cariKg('Kardus') || 4,
      kaca_kg: cariKg('Kaca') || 0,
      logam_kg: cariKg('Logam') || 0,
      catatan_kurir: 'Berat aktual sudah ditimbang di lokasi pelanggan & siap diserahkan ke Drop Point'
    };
    this.tampilModalTimbang = true;
  }

  get totalBeratTimbangAktual(): number {
    return Number((
      Number(this.formTimbang.plastik_kg || 0) +
      Number(this.formTimbang.kardus_kg || 0) +
      Number(this.formTimbang.kaca_kg || 0) +
      Number(this.formTimbang.logam_kg || 0)
    ).toFixed(1));
  }

  get estimasiPoinBersihTimbang(): number {
    const kotor =
      Number(this.formTimbang.plastik_kg || 0) * 500 +
      Number(this.formTimbang.kardus_kg || 0) * 400 +
      Number(this.formTimbang.kaca_kg || 0) * 300 +
      Number(this.formTimbang.logam_kg || 0) * 1500;
    const persen = Number(this.itemDitimbang?.potongan_persen ?? 10);
    return Math.max(0, Math.floor(kotor - (kotor * persen) / 100));
  }

  async simpanTimbangDanSelesai() {
    if (!this.itemDitimbang) return;
    if (this.totalBeratTimbangAktual <= 0) {
      this.tampilPesan('Total berat timbangan aktual harus lebih dari 0 kg!', 'warning');
      return;
    }

    const rincian: any[] = [];
    if (this.formTimbang.plastik_kg > 0) rincian.push({ nama: 'Plastik', berat_kg: Number(this.formTimbang.plastik_kg) });
    if (this.formTimbang.kardus_kg > 0) rincian.push({ nama: 'Kardus', berat_kg: Number(this.formTimbang.kardus_kg) });
    if (this.formTimbang.kaca_kg > 0) rincian.push({ nama: 'Kaca', berat_kg: Number(this.formTimbang.kaca_kg) });
    if (this.formTimbang.logam_kg > 0) rincian.push({ nama: 'Logam', berat_kg: Number(this.formTimbang.logam_kg) });

    const loading = await this.loadingCtrl.create({
      message: 'Menyimpan hasil timbangan & menyelesaikan penjemputan (T03)...',
      spinner: 'crescent'
    });
    await loading.present();

    this.api.updateStatusKurirDanTimbang(this.itemDitimbang.id_penjemputan, {
      status: 'SELESAI',
      rincian_material: rincian,
      catatan_kurir: this.formTimbang.catatan_kurir
    }).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.tampilModalTimbang = false;
        await this.tampilPesan(res?.message || 'Penjemputan selesai!', 'success');
        this.ambilTugasKurir();
      },
      error: async () => {
        await loading.dismiss();
        this.tampilPesan('Gagal menyimpan hasil timbangan.', 'danger');
      }
    });
  }

  // Buka Modal Progres Penjemputan 5 Tahap (Sesuai Gambar Referensi 2)
  bukaDetailProgres(item: any) {
    this.itemProgresTerpilih = item;
    this.tampilModalProgres = true;
  }

  bukaPetaNavigasi(alamat: string) {
    const encoded = encodeURIComponent(alamat || '');
    window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank');
  }

  // ====================================================================
  // EXPORT LAPORAN PENJEMPUTAN MITRA (T03) KE EXCEL (.XLS) & PDF
  // ====================================================================
  exportLaporanMitraExcel() {
    if (this.semuaPenjemputanMitra.length === 0) {
      this.tampilPesan('Belum ada data penjemputan untuk diekspor.', 'warning');
      return;
    }

    let html = `
      <html><head><meta charset="UTF-8"></head><body>
      <h2>LAPORAN TRANSAKSI PENJEMPUTAN SAMPAH OLEH MITRA (T03)</h2>
      <p>Organisasi Mitra: ${this.namaOrganisasiMitra} | Petugas: ${this.namaKurir} | Tanggal Cetak: ${new Date().toLocaleString('id-ID')}</p>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:12px;">
        <thead style="background-color:#0F6E38;color:#FFFFFF;font-weight:bold;">
          <tr>
            <th>No</th>
            <th>Kode Kantong</th>
            <th>Tanggal</th>
            <th>Pelanggan</th>
            <th>Kategori</th>
            <th>Lokasi Jemput</th>
            <th>Drop Point Tujuan</th>
            <th>Kurir Penjemput</th>
            <th>Berat Aktual (kg)</th>
            <th>Potongan Jemput (%)</th>
            <th>Poin Bersih Pelanggan</th>
            <th>Status Penjemputan</th>
          </tr>
        </thead>
        <tbody>
    `;

    this.semuaPenjemputanMitra.forEach((t, i) => {
      html += `
        <tr>
          <td>${i + 1}</td>
          <td>${t.kode_setoran}</td>
          <td>${new Date(t.tanggal_jemput).toLocaleDateString('id-ID')}</td>
          <td>${t.nama_pelanggan}</td>
          <td>${t.kategori_pelanggan}</td>
          <td>${t.alamat_jemput}</td>
          <td>${t.nama_drop_point}</td>
          <td>${t.nama_kurir}</td>
          <td>${t.total_berat_kg}</td>
          <td>${t.potongan_persen}%</td>
          <td>${t.poin_bersih} Poin</td>
          <td>${t.status}</td>
        </tr>
      `;
    });

    html += `</tbody></table></body></html>`;
    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Laporan_Penjemputan_Mitra_T03_${new Date().toISOString().slice(0, 10)}.xls`;
    a.click();
    window.URL.revokeObjectURL(url);
    this.tampilPesan('Laporan Excel (.xls) T03 berhasil diunduh!', 'success');
  }

  exportLaporanMitraPDF() {
    if (this.semuaPenjemputanMitra.length === 0) {
      this.tampilPesan('Belum ada data penjemputan untuk dicetak ke PDF.', 'warning');
      return;
    }

    const rows = this.semuaPenjemputanMitra.map((t, i) => `
      <tr>
        <td>${i + 1}</td>
        <td><strong>${t.kode_setoran}</strong><br><small>${new Date(t.tanggal_jemput).toLocaleDateString('id-ID')}</small></td>
        <td><strong>${t.nama_pelanggan}</strong><br><small>${t.kategori_pelanggan}</small></td>
        <td>${t.alamat_jemput}</td>
        <td>${t.nama_drop_point}<br><small>Kurir: ${t.nama_kurir}</small></td>
        <td style="text-align:right;"><strong>${t.total_berat_kg} kg</strong></td>
        <td style="text-align:right;"><strong>+${t.poin_bersih} Poin</strong><br><small>Potongan ${t.potongan_persen}%</small></td>
        <td><strong>${t.status}</strong></td>
      </tr>
    `).join('');

    const win = window.open('', '_blank', 'width=980,height=720');
    if (!win) {
      this.tampilPesan('Izinkan pop-up di browser untuk menyimpan PDF.', 'warning');
      return;
    }

    win.document.write(`
      <html>
      <head>
        <title>Laporan Penjemputan Sampah oleh Mitra (T03)</title>
        <style>
          body { font-family: Arial, sans-serif; color: #0F291E; padding: 24px; }
          .head { border-bottom: 3px solid #0F6E38; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; }
          h1 { margin: 0 0 4px; font-size: 20px; color: #0F6E38; }
          p { margin: 2px 0; font-size: 12px; color: #475569; }
          .summary { display: flex; gap: 12px; margin-bottom: 18px; }
          .card { border: 1px solid #CBD5E1; border-radius: 8px; padding: 10px 14px; flex: 1; background: #F8FAFC; }
          .card strong { display: block; font-size: 18px; color: #0F6E38; }
          table { width: 100%; border-collapse: collapse; font-size: 11.5px; }
          th { background: #0F6E38; color: #FFFFFF; padding: 8px; text-align: left; border: 1px solid #0F6E38; }
          td { padding: 8px; border: 1px solid #CBD5E1; vertical-align: top; }
        </style>
      </head>
      <body>
        <div class="head">
          <div>
            <h1>LAPORAN TRANSAKSI PENJEMPUTAN SAMPAH OLEH MITRA (T03)</h1>
            <p>Organisasi Mitra: <strong>${this.namaOrganisasiMitra}</strong> | Penanggung Jawab/Kurir: <strong>${this.namaKurir}</strong></p>
          </div>
          <div style="text-align:right;">
            <p><strong>Tanggal Cetak:</strong> ${new Date().toLocaleString('id-ID')}</p>
            <p><strong>Fasilitas:</strong> ${this.alamatMitra}</p>
          </div>
        </div>
        <div class="summary">
          <div class="card"><span>Total Tugas Jemput</span><strong>${this.totalTugasHariIni}</strong></div>
          <div class="card"><span>Selesai Dijemput</span><strong>${this.totalSelesai}</strong></div>
          <div class="card"><span>Total Berat Terangkut</span><strong>${this.totalTerangkutKg} kg</strong></div>
          <div class="card"><span>Estimasi Poin Pelanggan</span><strong>+${this.totalPoinBersihPelanggan} Poin</strong></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Kode Kantong</th>
              <th>Pelanggan</th>
              <th>Lokasi Jemput</th>
              <th>Tujuan & Kurir</th>
              <th>Berat Aktual</th>
              <th>Poin Bersih</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
        <script>window.onload = function() { window.print(); };</script>
      </body>
      </html>
    `);
    win.document.close();
  }

  kembaliKeDashboardMitra() {
    this.navCtrl.navigateBack('/dashboard-mitra', { animated: true });
  }

  async tampilPesan(pesan: string, warna: string) {
    const toast = await this.toastCtrl.create({
      message: pesan,
      duration: 2400,
      color: warna,
      position: 'top'
    });
    await toast.present();
  }
}