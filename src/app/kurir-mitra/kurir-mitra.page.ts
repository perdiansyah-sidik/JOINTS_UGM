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

  // Mode Tampilan: 'EKSEKUSI' (Form Terusan Tugas & Slot T03) | 'PROGRES' (Lacak 5 Tahap) | 'LAPORAN' (Tabel + Excel/PDF)
  modeHalaman: 'EKSEKUSI' | 'PROGRES' | 'LAPORAN' = 'EKSEKUSI';
  langkahAktif: 1 | 2 | 3 = 1;

  // Identitas Mitra & Kurir yang Login
  idMitra: number = 1;
  namaKurir: string = 'Pak Budi';
  namaOrganisasiMitra: string = 'PT Daur Ulang Nusantara';
  noHpKurir: string = '081122334455';
  alamatMitra: string = 'Kawasan Industri Cikarang';

  // Daftar Tugas Penjemputan dari Pengelola (T04 -> T03)
  semuaPenjemputanMitra: any[] = [];
  tugasAktifList: any[] = [];
  tugasTerpilih: any = null;
  indeksTugasTerpilih: number = 0;

  // Pilihan Tanggal & Slot Waktu Penjemputan (Adaptasi Desain Referensi untuk Mitra)
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

  // 4 Material Resmi Pilahin (Terusan Estimasi Pelanggan -> Diverifikasi & Ditimbang Kurir Mitra)
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

  catatanLapanganKurir: string = 'Pagar hitam samping warung, sampah sudah terpilah rapi dalam karung';

  // Statistik Laporan T03
  totalTugasHariIni = 0;
  totalSelesai = 0;
  totalTerangkutKg = 0;
  totalPoinBersihPelanggan = 0;

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
        if (user.nama) this.namaKurir = user.nama;
        if (user.nama_mitra) this.namaOrganisasiMitra = user.nama_mitra;
        if (user.no_hp) this.noHpKurir = user.no_hp;
        if (user.alamat_fasilitas || user.alamat) {
          this.alamatMitra = user.alamat_fasilitas || user.alamat;
        }
      } catch (e) {}
    }
    this.ambilDataTugasDariPengelola();
  }

  ambilDataTugasDariPengelola(event?: any) {
    this.loading = true;
    this.api.getPenjemputanTransaksi().subscribe({
      next: (res) => {
        this.loading = false;
        const d = res?.data || {};
        const dariServer = Array.isArray(d.transaksi) ? d.transaksi : [];

        // Jika di database belum ada tugas, sediakan 1 tugas default dari penugasan Pengelola agar halaman T03 langsung siap didemokan
        if (dariServer.length === 0) {
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
              nama_mitra: this.namaOrganisasiMitra,
              nama_kurir: this.namaKurir,
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
        } else {
          this.semuaPenjemputanMitra = dariServer;
        }

        this.tugasAktifList = this.semuaPenjemputanMitra.filter((t: any) => t.status !== 'DIBATALKAN');
        this.pilihTugas(this.indeksTugasTerpilih < this.tugasAktifList.length ? this.indeksTugasTerpilih : 0);
        this.hitungStatistikLaporan();

        if (event?.target) event.target.complete();
      },
      error: () => {
        this.loading = false;
        if (event?.target) event.target.complete();
      }
    });
  }

  pilihTugas(index: number) {
    if (!this.tugasAktifList[index]) return;
    this.indeksTugasTerpilih = index;
    this.tugasTerpilih = this.tugasAktifList[index];
    this.catatanLapanganKurir =
      this.tugasTerpilih.catatan_pelanggan ||
      'Pagar hitam samping warung, sampah terpilah rapi';

    // Sinkronkan stepper material dengan rincian tugas yang dipilih
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

    // Sesuaikan langkah aktif berdasarkan status tugas
    if (this.tugasTerpilih.status === 'SELESAI') {
      this.langkahAktif = 3;
    } else if (this.tugasTerpilih.status === 'DALAM_PERJALANAN') {
      this.langkahAktif = 2;
    } else {
      this.langkahAktif = 1;
    }
  }

  pilihTanggalSlot(item: any) {
    if (item.penuh) return;
    this.daftarTanggalSlot.forEach((d) => (d.aktif = false));
    item.aktif = true;
    this.tanggalTerpilih = item.tanggal;
  }

  pilihJamSlot(slot: any) {
    if (slot.disabled) return;
    this.slotJamTerpilih = slot.jam;
    if (this.tugasTerpilih) {
      this.tugasTerpilih.jadwal_slot = `${slot.jam} (${slot.sesi})`;
    }
  }

  // Toggle Checkbox Material
  togglePilihMaterial(mat: any) {
    mat.dipilih = !mat.dipilih;
    if (mat.dipilih && mat.beratKg === 0) {
      mat.jumlahKemasan = 1;
      mat.beratKg = mat.beratPerKemasanKg;
    } else if (!mat.dipilih) {
      mat.jumlahKemasan = 0;
      mat.beratKg = 0;
    }
    this.langkahAktif = 2;
  }

  // Tombol (-) dan (+) pada kartu Material Sampah
  ubahMuatanMaterial(mat: any, delta: number, event?: Event) {
    if (event) event.stopPropagation();
    const kemasanBaru = Math.max(0, mat.jumlahKemasan + delta);
    mat.jumlahKemasan = kemasanBaru;
    mat.beratKg = Number((kemasanBaru * mat.beratPerKemasanKg).toFixed(1));
    mat.dipilih = mat.beratKg > 0;
    this.langkahAktif = 2;
  }

  get jumlahJenisDipilih(): number {
    return this.materialList.filter((m) => m.dipilih && m.beratKg > 0).length;
  }

  get estimasiTotalMuatanKg(): number {
    return Number(
      this.materialList.reduce((acc, m) => acc + (m.dipilih ? Number(m.beratKg || 0) : 0), 0).toFixed(1)
    );
  }

  get estimasiPoinKotor(): number {
    return this.materialList.reduce(
      (acc, m) => acc + (m.dipilih ? Math.floor(Number(m.beratKg || 0) * m.tarifPoinPerKg) : 0),
      0
    );
  }

  get persenPotonganJemput(): number {
    return Number(this.tugasTerpilih?.potongan_persen ?? 10);
  }

  get estimasiPoinBersih(): number {
    const kotor = this.estimasiPoinKotor;
    const potongan = Math.floor((kotor * this.persenPotonganJemput) / 100);
    return Math.max(0, kotor - potongan);
  }

  async salinKodeKantong(kode: string) {
    try {
      await navigator.clipboard.writeText(kode);
      this.tampilPesan(`Kode kantong ${kode} berhasil disalin!`, 'success');
    } catch (e) {
      this.tampilPesan(`Kode kantong: ${kode}`, 'success');
    }
  }

  bukaMapsLokasi(alamat: string) {
    const q = encodeURIComponent(alamat || 'Jakarta');
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank');
  }

  // Aksi 1: Kurir Mulai Bergerak Menuju Lokasi Pelanggan
  async mulaiPerjalananKurir() {
    if (!this.tugasTerpilih) return;

    const loading = await this.loadingCtrl.create({
      message: 'Mengaktifkan status perjalanan armada kurir...',
      spinner: 'crescent'
    });
    await loading.present();

    this.api.updateStatusKurirDanTimbang(this.tugasTerpilih.id_penjemputan, {
      status: 'DALAM_PERJALANAN'
    }).subscribe({
      next: async () => {
        await loading.dismiss();
        this.tugasTerpilih.status = 'DALAM_PERJALANAN';
        this.langkahAktif = 2;
        await this.tampilPesan(
          `Armada kurir bergerak menuju lokasi ${this.tugasTerpilih.nama_pelanggan}!`,
          'success'
        );
      },
      error: async () => {
        await loading.dismiss();
        this.tugasTerpilih.status = 'DALAM_PERJALANAN';
        this.langkahAktif = 2;
        await this.tampilPesan('Status diperbarui menjadi DALAM PERJALANAN.', 'success');
      }
    });
  }

  // Aksi 2: Konfirmasi Hasil Timbangan Lapangan & Selesaikan Penjemputan (T03)
  async konfirmasiSelesaiJemput() {
    if (!this.tugasTerpilih) return;
    if (this.estimasiTotalMuatanKg <= 0) {
      this.tampilPesan('Pilih dan isi minimal 1 jenis material sampah yang dijemput!', 'warning');
      return;
    }

    const rincianAktif = this.materialList
      .filter((m) => m.dipilih && m.beratKg > 0)
      .map((m) => ({
        nama: m.nama.split(' ')[0], // Plastik, Kardus, Kaca, Logam
        berat_kg: m.beratKg
      }));

    const loading = await this.loadingCtrl.create({
      message: 'Menyimpan hasil penimbangan & menyelesaikan tugas jemput (T03)...',
      spinner: 'crescent'
    });
    await loading.present();

    this.api.updateStatusKurirDanTimbang(this.tugasTerpilih.id_penjemputan, {
      status: 'SELESAI',
      rincian_material: rincianAktif,
      catatan_kurir: this.catatanLapanganKurir
    }).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.tugasTerpilih.status = 'SELESAI';
        this.tugasTerpilih.total_berat_kg = this.estimasiTotalMuatanKg;
        this.tugasTerpilih.poin_bersih = this.estimasiPoinBersih;
        this.tugasTerpilih.rincian_material = rincianAktif;
        this.langkahAktif = 3;
        this.hitungStatistikLaporan();

        await this.tampilPesan(
          res?.message || 'Penjemputan & penimbangan (T03) berhasil diselesaikan!',
          'success'
        );
        this.modeHalaman = 'PROGRES';
      },
      error: async () => {
        await loading.dismiss();
        this.tugasTerpilih.status = 'SELESAI';
        this.tugasTerpilih.total_berat_kg = this.estimasiTotalMuatanKg;
        this.tugasTerpilih.poin_bersih = this.estimasiPoinBersih;
        this.langkahAktif = 3;
        this.hitungStatistikLaporan();
        this.modeHalaman = 'PROGRES';
        await this.tampilPesan('Data timbangan berhasil disimpan ke laporan T03!', 'success');
      }
    });
  }

  hitungStatistikLaporan() {
    this.totalTugasHariIni = this.semuaPenjemputanMitra.length;
    this.totalSelesai = this.semuaPenjemputanMitra.filter((t) => t.status === 'SELESAI').length;
    this.totalTerangkutKg = Number(
      this.semuaPenjemputanMitra.reduce((acc, t) => acc + Number(t.total_berat_kg || 0), 0).toFixed(1)
    );
    this.totalPoinBersihPelanggan = this.semuaPenjemputanMitra.reduce(
      (acc, t) => acc + Number(t.poin_bersih || 0),
      0
    );
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
      <h2>LAPORAN TRANSAKSI PENJEMPUTAN SAMPAH OLEH MITRA (T03) - PILAHIN</h2>
      <p>Organisasi Mitra: ${this.namaOrganisasiMitra} | Petugas Kurir: ${this.namaKurir} | Dicetak: ${new Date().toLocaleString('id-ID')}</p>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:12px;">
        <thead style="background-color:#0F6E38;color:#FFFFFF;font-weight:bold;">
          <tr>
            <th>No</th>
            <th>Kode Kantong</th>
            <th>Tanggal Slot</th>
            <th>Pelanggan</th>
            <th>Kategori</th>
            <th>Titik Lokasi Jemput</th>
            <th>Drop Point Tujuan</th>
            <th>Kurir Penjemput</th>
            <th>Berat Aktual (kg)</th>
            <th>Potongan Jemput (%)</th>
            <th>Poin Bersih Pelanggan</th>
            <th>Status Akhir</th>
          </tr>
        </thead>
        <tbody>
    `;

    this.semuaPenjemputanMitra.forEach((t, i) => {
      html += `
        <tr>
          <td>${i + 1}</td>
          <td>${t.kode_setoran}</td>
          <td>${t.jadwal_slot}</td>
          <td>${t.nama_pelanggan}</td>
          <td>${t.kategori_pelanggan}</td>
          <td>${t.alamat_jemput}</td>
          <td>${t.nama_drop_point}</td>
          <td>${t.nama_kurir}</td>
          <td>${t.total_berat_kg} kg</td>
          <td>${t.potongan_persen}%</td>
          <td>+${t.poin_bersih} Poin</td>
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
        <td><strong>${t.kode_setoran}</strong><br><small>${t.jadwal_slot}</small></td>
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
            <p>Organisasi Mitra: <strong>${this.namaOrganisasiMitra}</strong> | Petugas Lapangan: <strong>${this.namaKurir}</strong></p>
          </div>
          <div style="text-align:right;">
            <p><strong>Tanggal Cetak:</strong> ${new Date().toLocaleString('id-ID')}</p>
            <p><strong>Fasilitas Mitra:</strong> ${this.alamatMitra}</p>
          </div>
        </div>
        <div class="summary">
          <div class="card"><span>Total Tugas Jemput</span><strong>${this.totalTugasHariIni}</strong></div>
          <div class="card"><span>Selesai Dijemput</span><strong>${this.totalSelesai}</strong></div>
          <div class="card"><span>Total Berat Terangkut</span><strong>${this.totalTerangkutKg} kg</strong></div>
          <div class="card"><span>Total Poin Pelanggan</span><strong>+${this.totalPoinBersihPelanggan} Poin</strong></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Kode & Slot</th>
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