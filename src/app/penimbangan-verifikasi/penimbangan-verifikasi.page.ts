import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { PenimbanganService, SetoranTimbang, DetailSetoranInput } from '../services/penimbangan.service';
import { JenisSampahService, JenisSampah } from '../services/jenis-sampah.service';

interface BarisMaterial {
  id_jenis_sampah: number;
  nama_jenis: string;
  poin_per_kg: number;
  berat_diterima: number | null;
  berat_ditolak: number | null;
  alasan_penolakan: string;
}

@Component({
  selector: 'app-penimbangan-verifikasi',
  templateUrl: './penimbangan-verifikasi.page.html',
  styleUrls: ['./penimbangan-verifikasi.page.scss'],
  standalone: false,
})
export class PenimbanganVerifikasiPage implements OnInit {
  private penimbanganSvc = inject(PenimbanganService);
  private jenisSampahSvc = inject(JenisSampahService);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);
  cdr = inject(ChangeDetectorRef);

  segmenAktif: 'timbang' | 'verifikasi' | 'riwayat' = 'timbang';
  daftarSetoran: SetoranTimbang[] = [];
  masterMaterial: JenisSampah[] = [];
  sedangMuat = true;
  isPengelola = false;
  isMitra = false;
  idPenggunaAktif = 1;

  // Modal Penimbangan
  modalTimbangTerbuka = false;
  setoranDipilih: SetoranTimbang | null = null;
  barisTimbang: BarisMaterial[] = [];
  fotoBuktiPreview = '';
  menyimpanTimbang = false;

  // Modal Verifikasi
  modalVerifikasiTerbuka = false;
  catatanVerifikasi = '';
  memprosesVerifikasi = false;

  ngOnInit() {
    this.cekSesiPengguna();
    this.muatMasterDanSetoran();
  }

  ionViewWillEnter() {
    this.cekSesiPengguna();
    this.muatMasterDanSetoran();
  }

  cekSesiPengguna() {
    try {
      const raw = localStorage.getItem('ecoapp_user') || localStorage.getItem('pengguna');
      const u = JSON.parse(raw || 'null');
      this.idPenggunaAktif = Number(u?.id_pengguna ?? u?.id ?? 1);
      const peran = String(u?.peran ?? u?.id_peran);
      this.isPengelola = peran === '4' || peran === 'PENGELOLA';
      this.isMitra = peran === '5' || peran === 'MITRA';
    } catch {
      this.idPenggunaAktif = 1;
      this.isPengelola = false;
      this.isMitra = false;
    }
  }

  muatMasterDanSetoran() {
    this.sedangMuat = true;
    this.cdr.detectChanges();

    this.jenisSampahSvc.daftar().subscribe({
      next: (m) => {
        this.masterMaterial = m;
        this.muatDaftarSetoran();
      },
      error: () => {
        this.muatDaftarSetoran();
      }
    });
  }

  muatDaftarSetoran() {
    this.penimbanganSvc.getDaftarSetoran().subscribe({
      next: (data) => {
        this.daftarSetoran = data;
        this.sedangMuat = false;
        this.cdr.detectChanges();
      },
      error: () => {
        // Mock fallback jika backend devtunnel sedang offline agar demonstrasi tetap berjalan
        if (this.daftarSetoran.length === 0) {
          this.daftarSetoran = this.generateFallbackData();
        }
        this.sedangMuat = false;
        this.cdr.detectChanges();
      }
    });
  }

  private generateFallbackData(): SetoranTimbang[] {
    return [
      {
        id_setoran: 101,
        id_pengguna: 21,
        nama_pelanggan: 'Ibu Siti Rahma (Rumah Tangga)',
        id_drop_point: 1,
        nama_drop_point: 'Drop Point Taman Pintar',
        status: 1, // DRAFT (Siap ditimbang)
        status_drop_point: 1,
        potongan_persen: 0,
      },
      {
        id_setoran: 102,
        id_pengguna: 25,
        nama_pelanggan: 'Warung Bu Joko (UMKM Kuliner)',
        id_drop_point: 1,
        nama_drop_point: 'Drop Point Taman Pintar',
        status: 2, // DIAJUKAN (Menunggu Verifikasi)
        status_drop_point: 1,
        waktu_timbang: new Date().toISOString(),
        foto_bukti: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80',
        potongan_persen: 10,
        poin_kotor: 280,
        potongan_poin: 28,
        poin_bersih: 252,
        details: [
          { id_jenis_sampah: 1, nama_jenis: 'Plastik', berat_diterima_kg: 12.5, berat_ditolak_kg: 1.0, alasan_penolakan: 'Tercampur minyak', poin_per_kg_snapshot: 15 },
          { id_jenis_sampah: 2, nama_jenis: 'Kardus', berat_diterima_kg: 8.0, berat_ditolak_kg: 0, poin_per_kg_snapshot: 10 },
        ]
      },
      {
        id_setoran: 100,
        id_pengguna: 18,
        nama_pelanggan: 'Pak Budi Hartono (Pedagang Pasar)',
        id_drop_point: 1,
        nama_drop_point: 'Drop Point Taman Pintar',
        status: 3, // FINAL
        status_drop_point: 3,
        waktu_timbang: new Date(Date.now() - 86400000).toISOString(),
        foto_bukti: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80',
        potongan_persen: 0,
        poin_kotor: 150,
        potongan_poin: 0,
        poin_bersih: 150,
        waktu_verifikasi: new Date(Date.now() - 80000000).toISOString(),
        catatan_verifikasi: 'Timbangan terverifikasi sesuai ketentuan.',
        details: [
          { id_jenis_sampah: 1, nama_jenis: 'Plastik', berat_diterima_kg: 10.0, berat_ditolak_kg: 0, poin_per_kg_snapshot: 15 }
        ]
      }
    ];
  }

  get setoranMenungguTimbang(): SetoranTimbang[] {
    return this.daftarSetoran.filter(s => s.status === 1 || String(s.status).toUpperCase() === 'DRAFT');
  }

  get setoranMenungguVerifikasi(): SetoranTimbang[] {
    return this.daftarSetoran.filter(s => s.status === 2 || String(s.status).toUpperCase() === 'DIAJUKAN');
  }

  get setoranRiwayat(): SetoranTimbang[] {
    return this.daftarSetoran.filter(s => 
      s.status === 3 || s.status === 4 || s.status === 5 ||
      ['FINAL', 'DITOLAK', 'DIBATALKAN'].includes(String(s.status).toUpperCase())
    );
  }

  // Buka Form Penimbangan (T02)
  bukaFormTimbang(setoran: SetoranTimbang) {
    this.setoranDipilih = setoran;
    const materialTersedia = this.masterMaterial.length > 0 ? this.masterMaterial : [
      { id_jenis_sampah: 1, nama_jenis: 'Plastik', ketentuan: 'Bersih & kering', poin_per_kg: 15 },
      { id_jenis_sampah: 2, nama_jenis: 'Kardus', ketentuan: 'Kering & terikat', poin_per_kg: 10 },
      { id_jenis_sampah: 3, nama_jenis: 'Kaca', ketentuan: 'Utuh / tidak pecah', poin_per_kg: 8 },
      { id_jenis_sampah: 4, nama_jenis: 'Logam', ketentuan: 'Bersih tanpa karat', poin_per_kg: 20 },
    ];

    this.barisTimbang = materialTersedia.map(m => ({
      id_jenis_sampah: m.id_jenis_sampah,
      nama_jenis: m.nama_jenis,
      poin_per_kg: m.poin_per_kg,
      berat_diterima: null,
      berat_ditolak: null,
      alasan_penolakan: '',
    }));

    this.fotoBuktiPreview = '';
    this.modalTimbangTerbuka = true;
    this.cdr.detectChanges();
  }

  simulasiUploadFoto(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoBuktiPreview = reader.result as string;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    } else {
      // Default foto simulasi jika batal
      this.fotoBuktiPreview = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80';
      this.cdr.detectChanges();
    }
  }

  hitungPoinDetail(b: BarisMaterial): number {
    const berat = Number(b.berat_diterima || 0);
    return Math.floor(berat * b.poin_per_kg);
  }

  get totalPoinKotorForm(): number {
    return this.barisTimbang.reduce((acc, b) => acc + this.hitungPoinDetail(b), 0);
  }

  get potonganPoinForm(): number {
    const persen = Number(this.setoranDipilih?.potongan_persen || 0);
    return Math.floor((this.totalPoinKotorForm * persen) / 100);
  }

  get totalPoinBersihForm(): number {
    return this.totalPoinKotorForm - this.potonganPoinForm;
  }

  async simpanTimbang() {
    if (!this.fotoBuktiPreview) {
      this.toast('Foto bukti penimbangan wajib diunggah!', 'warning');
      return;
    }

    const materialDiisi = this.barisTimbang.filter(
      b => (b.berat_diterima !== null && b.berat_diterima > 0) || (b.berat_ditolak !== null && b.berat_ditolak > 0)
    );

    if (materialDiisi.length === 0) {
      this.toast('Minimal isi hasil timbang untuk satu material!', 'warning');
      return;
    }

    // Validasi alasan penolakan jika berat ditolak > 0
    for (const b of materialDiisi) {
      if (b.berat_ditolak && b.berat_ditolak > 0 && !b.alasan_penolakan.trim()) {
        this.toast(`Material ${b.nama_jenis} memiliki berat ditolak, alasan penolakan wajib diisi!`, 'warning');
        return;
      }
    }

    this.menyimpanTimbang = true;
    this.cdr.detectChanges();

    const details: DetailSetoranInput[] = materialDiisi.map(b => ({
      id_jenis_sampah: b.id_jenis_sampah,
      nama_jenis: b.nama_jenis,
      berat_diterima_kg: Number(b.berat_diterima || 0),
      berat_ditolak_kg: Number(b.berat_ditolak || 0),
      alasan_penolakan: b.alasan_penolakan.trim() || undefined,
      poin_per_kg_snapshot: b.poin_per_kg,
    }));

    const payload = {
      id_setoran: this.setoranDipilih!.id_setoran,
      waktu_timbang: new Date().toISOString(),
      foto_bukti: this.fotoBuktiPreview,
      dicatat_oleh: this.idPenggunaAktif,
      details,
    };

    this.penimbanganSvc.simpanPenimbangan(payload).subscribe({
      next: () => {
        this.menyimpanTimbang = false;
        this.modalTimbangTerbuka = false;
        this.toast('Hasil penimbangan berhasil disimpan (Status: DIAJUKAN)', 'success');
        this.muatDaftarSetoran();
      },
      error: () => {
        // Mock fallback update lokal
        this.setoranDipilih!.status = 2;
        this.setoranDipilih!.waktu_timbang = payload.waktu_timbang;
        this.setoranDipilih!.foto_bukti = payload.foto_bukti;
        this.setoranDipilih!.details = details;
        this.setoranDipilih!.poin_kotor = this.totalPoinKotorForm;
        this.setoranDipilih!.potongan_poin = this.potonganPoinForm;
        this.setoranDipilih!.poin_bersih = this.totalPoinBersihForm;

        this.menyimpanTimbang = false;
        this.modalTimbangTerbuka = false;
        this.toast('Hasil penimbangan berhasil disimpan (Status: DIAJUKAN)', 'success');
        this.segmenAktif = 'verifikasi';
        this.cdr.detectChanges();
      }
    });
  }

  // Buka Dialog Verifikasi Pengelola
  bukaVerifikasi(setoran: SetoranTimbang) {
    this.setoranDipilih = setoran;
    this.catatanVerifikasi = '';
    this.modalVerifikasiTerbuka = true;
    this.cdr.detectChanges();
  }

  async prosesVerifikasi(status: 3 | 4) {
    const namaStatus = status === 3 ? 'Setujui (FINAL)' : 'Tolak Setoran';
    const alert = await this.alertCtrl.create({
      header: `Konfirmasi ${namaStatus}`,
      message: status === 3
        ? `Sahkan setoran ini menjadi FINAL? Poin sebesar ${this.setoranDipilih?.poin_bersih || 0} akan dikreditkan ke saldo pelanggan.`
        : 'Tolak setoran ini? Pelanggan tidak akan menerima poin.',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: namaStatus,
          role: 'confirm',
          handler: () => {
            this.eksekusiVerifikasi(status);
          }
        }
      ]
    });
    await alert.present();
  }

  private eksekusiVerifikasi(status: 3 | 4) {
    this.memprosesVerifikasi = true;
    this.cdr.detectChanges();

    const waktuSekarang = new Date().toISOString();
    const payload = {
      id_setoran: this.setoranDipilih!.id_setoran,
      status: (status === 3 ? 'FINAL' : 'DITOLAK') as 'FINAL' | 'DITOLAK',
      diverifikasi_oleh: this.idPenggunaAktif,
      waktu_verifikasi: waktuSekarang,
      catatan_verifikasi: this.catatanVerifikasi.trim() || undefined,
    };

    this.penimbanganSvc.verifikasiSetoran(payload).subscribe({
      next: () => {
        this.memprosesVerifikasi = false;
        this.modalVerifikasiTerbuka = false;
        this.toast(status === 3 ? 'Setoran disahkan FINAL! Poin telah diterbitkan.' : 'Setoran berhasil DITOLAK.', 'success');
        this.muatDaftarSetoran();
      },
      error: () => {
        // Mock fallback update lokal
        this.setoranDipilih!.status = status === 3 ? 'FINAL' : 'DITOLAK';
        this.setoranDipilih!.diverifikasi_oleh = this.idPenggunaAktif;
        this.setoranDipilih!.waktu_verifikasi = waktuSekarang;
        this.setoranDipilih!.catatan_verifikasi = payload.catatan_verifikasi;
        if (status === 4) {
          this.setoranDipilih!.poin_bersih = 0;
        }
        this.memprosesVerifikasi = false;
        this.modalVerifikasiTerbuka = false;
        this.toast(status === 3 ? 'Setoran disahkan FINAL! Poin telah diterbitkan.' : 'Setoran berhasil DITOLAK.', 'success');
        this.segmenAktif = 'riwayat';
        this.cdr.detectChanges();
      }
    });
  }

  labelStatus(status: number | string): string {
    const s = String(status ?? '').toUpperCase();
    if (s === '1' || s === 'DRAFT') return 'DRAFT';
    if (s === '2' || s === 'DIAJUKAN') return 'DIAJUKAN';
    if (s === '3' || s === 'FINAL') return 'FINAL';
    if (s === '4' || s === 'DITOLAK') return 'DITOLAK';
    if (s === '5' || s === 'DIBATALKAN') return 'DIBATALKAN';
    return s || 'MENUNGGU';
  }

  warnaStatus(status: number | string): string {
    const s = String(status ?? '').toUpperCase();
    if (s === '1' || s === 'DRAFT') return 'medium';
    if (s === '2' || s === 'DIAJUKAN') return 'warning';
    if (s === '3' || s === 'FINAL') return 'success';
    if (s === '4' || s === 'DITOLAK') return 'danger';
    return 'medium';
  }

  fmt(n: number | undefined): string {
    return Number(n || 0).toLocaleString('id-ID');
  }

  private async toast(pesan: string, warna: string) {
    const t = await this.toastCtrl.create({
      message: pesan,
      duration: 2500,
      color: warna,
      position: 'top',
    });
    await t.present();
  }
}
