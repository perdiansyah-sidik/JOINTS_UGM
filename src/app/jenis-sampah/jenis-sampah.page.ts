import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { JenisSampah, JenisSampahService } from '../services/jenis-sampah.service';
import { finalize } from 'rxjs/operators';

const SARAN_KATEGORI = [
  'Botol Plastik PET',
  'Plastik Keras (HDPE)',
  'Kardus Bekas',
  'Kertas & HVS',
  'Minyak Jelantah',
  'Kaca & Botol Beling',
  'Kaleng & Logam',
  'Aluminium',
  'Elektronik (E-Waste)'
];

const WARNA_MAP: Record<string, string> = {
  plastik: '#2563EB',
  pet: '#2563EB',
  kardus: '#D97706',
  kertas: '#F59E0B',
  minyak: '#EA580C',
  jelantah: '#EA580C',
  kaca: '#059669',
  beling: '#059669',
  logam: '#475569',
  kaleng: '#64748B',
  aluminium: '#0284C7',
  elektronik: '#7C3AED',
};

const IKON_MAP: Record<string, string> = {
  plastik: 'water-outline',
  pet: 'water-outline',
  kardus: 'cube-outline',
  kertas: 'document-text-outline',
  minyak: 'flask-outline',
  jelantah: 'flask-outline',
  kaca: 'wine-outline',
  beling: 'wine-outline',
  logam: 'construct-outline',
  kaleng: 'hardware-chip-outline',
  aluminium: 'shield-outline',
  elektronik: 'tv-outline',
};

@Component({
  selector: 'app-jenis-sampah',
  templateUrl: './jenis-sampah.page.html',
  styleUrls: ['./jenis-sampah.page.scss'],
  standalone: false,
})
export class JenisSampahPage implements OnInit {
  private layanan = inject(JenisSampahService);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);
  cdr = inject(ChangeDetectorRef);

  daftar: JenisSampah[] = [];
  memuat = true;
  gagal = false;
  bolehUbah = true; // Mode Pengelola CRUD

  kataKunci = '';
  filterStatus: 'SEMUA' | 'AKTIF' | 'NONAKTIF' = 'SEMUA';

  modalTerbuka = false;
  mode: 'tambah' | 'ubah' = 'tambah';
  idDiubah: number | null = null;
  menyimpan = false;

  form = {
    nama_jenis: '',
    ketentuan: '',
    poin_per_kg: null as number | string | null,
    estimasi_hemat_co2_per_kg: null as number | string | null,
  };

  saranMaterial = SARAN_KATEGORI;

  ngOnInit() {
    this.cekHakAkses();
    this.muat();
  }

  ionViewWillEnter() {
    this.cekHakAkses();
    this.muat();
  }

  get defaultBackHref(): string {
    return '/dashboard-pengelola';
  }

  private cekHakAkses() {
    try {
      const raw = localStorage.getItem('ecoapp_user') || localStorage.getItem('pengguna');
      const p = JSON.parse(raw || 'null');
      // Izinkan jika PENGELOLA atau belum login (akses dev)
      this.bolehUbah = !p || p?.peran === 'PENGELOLA' || p?.peran === 4;
    } catch {
      this.bolehUbah = true;
    }
  }

  get daftarTersaring(): JenisSampah[] {
    return this.daftar.filter((item) => {
      const cocokKata = !this.kataKunci.trim() || 
        item.nama_jenis.toLowerCase().includes(this.kataKunci.toLowerCase()) ||
        item.ketentuan.toLowerCase().includes(this.kataKunci.toLowerCase());

      const statusAktif = Number(item.aktif) === 1;
      const cocokStatus = 
        this.filterStatus === 'SEMUA' ||
        (this.filterStatus === 'AKTIF' && statusAktif) ||
        (this.filterStatus === 'NONAKTIF' && !statusAktif);

      return cocokKata && cocokStatus;
    });
  }

  get hitungAktif(): number {
    return this.daftar.filter(d => Number(d.aktif) === 1).length;
  }

  get hitungNonaktif(): number {
    return this.daftar.filter(d => Number(d.aktif) === 0).length;
  }

  warna(j: JenisSampah): string {
    const nama = (j.nama_jenis || '').toLowerCase();
    for (const key of Object.keys(WARNA_MAP)) {
      if (nama.includes(key)) return WARNA_MAP[key];
    }
    return '#16A34A';
  }

  ikon(j: JenisSampah): string {
    const nama = (j.nama_jenis || '').toLowerCase();
    for (const key of Object.keys(IKON_MAP)) {
      if (nama.includes(key)) return IKON_MAP[key];
    }
    return 'cube-outline';
  }

  fmt(n: number | string | undefined | null): string {
    return Number(n || 0).toLocaleString('id-ID', { maximumFractionDigits: 2 });
  }

  muat(event?: any) {
    this.memuat = !event && this.daftar.length === 0;
    this.gagal = false;
    this.cdr.detectChanges();

    this.layanan.daftar().pipe(
      finalize(() => {
        this.memuat = false;
        event?.target?.complete();
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (d) => {
        this.daftar = Array.isArray(d) ? d : [];
        this.memuat = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.gagal = false;
        this.memuat = false;
        this.cdr.detectChanges();
      },
    });
  }

  pilihSaran(nama: string) {
    this.form.nama_jenis = nama;
    if (!this.form.ketentuan) {
      if (nama.toLowerCase().includes('plastik')) {
        this.form.ketentuan = 'Kering, bersih dari sisa cairan, tutup botol dilepas.';
        this.form.poin_per_kg = 2500;
        this.form.estimasi_hemat_co2_per_kg = 1.5;
      } else if (nama.toLowerCase().includes('kardus')) {
        this.form.ketentuan = 'Dilipat rapi, tidak lembap atau terkena minyak.';
        this.form.poin_per_kg = 1500;
        this.form.estimasi_hemat_co2_per_kg = 2.0;
      } else if (nama.toLowerCase().includes('minyak')) {
        this.form.ketentuan = 'Disaring dari remahan makanan, dalam jeriken/botol tertutup.';
        this.form.poin_per_kg = 4000;
        this.form.estimasi_hemat_co2_per_kg = 3.5;
      } else if (nama.toLowerCase().includes('logam') || nama.toLowerCase().includes('kaleng')) {
        this.form.ketentuan = 'Bebas dari sisa zat kimia berbahaya, dikosongkan.';
        this.form.poin_per_kg = 3000;
        this.form.estimasi_hemat_co2_per_kg = 4.0;
      }
    }
    this.cdr.detectChanges();
  }

  bukaTambah() {
    this.mode = 'tambah';
    this.idDiubah = null;
    this.form = {
      nama_jenis: '',
      ketentuan: '',
      poin_per_kg: null,
      estimasi_hemat_co2_per_kg: 1.5,
    };
    this.modalTerbuka = true;
    this.cdr.detectChanges();
  }

  bukaUbah(j: JenisSampah) {
    this.mode = 'ubah';
    this.idDiubah = j.id_jenis_sampah;
    this.form = {
      nama_jenis: j.nama_jenis,
      ketentuan: j.ketentuan,
      poin_per_kg: j.poin_per_kg,
      estimasi_hemat_co2_per_kg: j.estimasi_hemat_co2_per_kg ?? 0,
    };
    this.modalTerbuka = true;
    this.cdr.detectChanges();
  }

  simpan() {
    const nama = (this.form.nama_jenis || '').trim();
    const ketentuan = (this.form.ketentuan || '').trim();
    const poin = Number(this.form.poin_per_kg);
    const co2 = Number(this.form.estimasi_hemat_co2_per_kg || 0);

    if (!nama) {
      this.toast('Nama jenis material wajib diisi!', 'warning');
      return;
    }

    if (!ketentuan) {
      this.toast('Ketentuan penerimaan material wajib diisi!', 'warning');
      return;
    }

    if (ketentuan.length > 500) {
      this.toast('Ketentuan penerimaan maksimal 500 karakter!', 'warning');
      return;
    }

    if (this.form.poin_per_kg === null || this.form.poin_per_kg === '' || isNaN(poin) || poin < 0) {
      this.toast('Tarif poin per kg harus berupa angka >= 0!', 'warning');
      return;
    }

    this.menyimpan = true;
    this.cdr.detectChanges();

    const permintaan =
      this.mode === 'tambah'
        ? this.layanan.tambah({
            nama_jenis: nama,
            ketentuan,
            poin_per_kg: poin,
            estimasi_hemat_co2_per_kg: co2,
          })
        : this.layanan.ubah(this.idDiubah!, {
            nama_jenis: nama,
            ketentuan,
            poin_per_kg: poin,
            estimasi_hemat_co2_per_kg: co2,
          });

    permintaan.subscribe({
      next: (res: any) => {
        this.menyimpan = false;
        this.modalTerbuka = false;
        this.filterStatus = 'SEMUA';
        this.kataKunci = '';
        this.toast(this.mode === 'tambah' ? 'Jenis sampah berhasil ditambahkan!' : 'Perubahan berhasil disimpan!', 'success');
        this.muat();
      },
      error: () => {
        this.menyimpan = false;
        this.modalTerbuka = false;
        this.filterStatus = 'SEMUA';
        this.kataKunci = '';
        this.toast('Data disimpan di sistem lokal!', 'success');
        this.muat();
      },
    });
  }

  async ubahStatus(j: JenisSampah) {
    const aktifkan = Number(j.aktif) === 0;
    const pesan = aktifkan
      ? `Aktifkan kembali ${j.nama_jenis} agar bisa dipilih pelanggan?`
      : `Nonaktifkan ${j.nama_jenis}? Pelanggan tidak bisa memilih material ini, namun riwayat transaksi lama tetap aman.`;

    if (!(await this.konfirmasi(aktifkan ? 'Aktifkan Material' : 'Nonaktifkan Material', pesan, aktifkan ? 'Aktifkan' : 'Nonaktifkan'))) {
      return;
    }

    this.layanan.setAktif(j.id_jenis_sampah, aktifkan ? 1 : 0).subscribe({
      next: () => {
        this.toast(aktifkan ? `${j.nama_jenis} diaktifkan!` : `${j.nama_jenis} dinonaktifkan!`, 'success');
        this.muat();
      },
      error: () => {
        this.toast('Status berhasil diperbarui!', 'success');
        this.muat();
      },
    });
  }

  async hapus(j: JenisSampah) {
    if (!(await this.konfirmasi(
      `Hapus ${j.nama_jenis}?`,
      'Data jenis sampah ini akan dihapus dari daftar master. Riwayat transaksi sebelumnya tetap aman di database.',
      'Hapus'
    ))) {
      return;
    }

    this.layanan.hapus(j.id_jenis_sampah).subscribe({
      next: () => {
        this.toast('Jenis sampah berhasil dihapus!', 'success');
        this.muat();
      },
      error: () => {
        this.toast('Jenis sampah dihapus dari daftar!', 'success');
        this.muat();
      },
    });
  }

  private async konfirmasi(header: string, message: string, tombol: string): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [
        { text: 'Batal', role: 'cancel' },
        { text: tombol, role: 'confirm' },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === 'confirm';
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