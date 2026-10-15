import { Component, inject } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { JenisSampah, JenisSampahService } from '../services/jenis-sampah.service';
import { finalize } from 'rxjs/operators';

const NAMA_JENIS = ['Plastik', 'Kardus', 'Kaca', 'Logam'];
const WARNA: Record<string, string> = {
  plastik: '#3b82f6', kardus: '#fdba4d', kaca: '#14b8a6', logam: '#6b7280',
};
const IKON: Record<string, string> = {
  plastik: 'water-outline', kardus: 'cube-outline', kaca: 'wine-outline', logam: 'construct-outline',
};

@Component({
  selector: 'app-jenis-sampah',
  templateUrl: './jenis-sampah.page.html',
  styleUrls: ['./jenis-sampah.page.scss'],
  standalone: false,
})
export class JenisSampahPage {
  private layanan = inject(JenisSampahService);
  private alertCtrl = inject(AlertController);
  private toastCtrl = inject(ToastController);

  daftar: JenisSampah[] = [];
  memuat = true;
  gagal = false;
  bolehUbah = false;

  modalTerbuka = false;
  mode: 'tambah' | 'ubah' = 'tambah';
  idDiubah: number | null = null;
  menyimpan = false;
  form = { nama_jenis: '', ketentuan: '', poin_per_kg: null as number | string | null };

  ionViewWillEnter() {
    this.bolehUbah = this.penggunaPengelola();
    this.muat();
  }

  get defaultBackHref(): string {
    return this.bolehUbah ? '/dashboard-pengelola' : '/dashboard';
  }

  private penggunaPengelola(): boolean {
    try {
      const raw = localStorage.getItem('ecoapp_user') || localStorage.getItem('pengguna');
      const p = JSON.parse(raw || 'null');
      return p?.peran === 'PENGELOLA' || p?.peran === 4 || p?.id_peran === 4;
    } catch {
      return false;
    }
  }

  get belumAda(): string[] {
    return NAMA_JENIS.filter(
      (n) => !this.daftar.some((d) => d.nama_jenis?.toLowerCase() === n.toLowerCase())
    );
  }

  warna(j: JenisSampah): string {
    return WARNA[j.nama_jenis?.toLowerCase()] ?? '#9ca3af';
  }

  ikon(j: JenisSampah): string {
    return IKON[j.nama_jenis?.toLowerCase()] ?? 'cube-outline';
  }

  fmt(n: number): string {
    return Number(n || 0).toLocaleString('id-ID', { maximumFractionDigits: 2 });
  }

  muat(event?: any) {
    this.memuat = !event && this.daftar.length === 0;
    this.gagal = false;

    this.layanan.daftar().pipe(
      finalize(() => {
        this.memuat = false;
        event?.target?.complete();
      })
    ).subscribe({
      next: (d) => {
        this.daftar = Array.isArray(d) ? d : [];
      },
      error: () => {
        this.gagal = true;
      },
    });
  }

  bukaTambah() {
    this.mode = 'tambah';
    this.idDiubah = null;
    this.form = { nama_jenis: this.belumAda[0] ?? '', ketentuan: '', poin_per_kg: null };
    this.modalTerbuka = true;
  }

  bukaUbah(j: JenisSampah) {
    this.mode = 'ubah';
    this.idDiubah = j.id_jenis_sampah;
    this.form = { nama_jenis: j.nama_jenis, ketentuan: j.ketentuan, poin_per_kg: j.poin_per_kg };
    this.modalTerbuka = true;
  }

  simpan() {
    const nama = (this.form.nama_jenis || '').trim();
    const ketentuan = (this.form.ketentuan || '').trim();
    const poin = Number(this.form.poin_per_kg);
    
    if (this.mode === 'tambah' && !nama) {
      this.toast('Nama / kategori jenis sampah wajib dipilih', 'warning');
      return;
    }

    if (!ketentuan) {
      this.toast('Ketentuan penerimaan wajib diisi', 'warning');
      return;
    }
    
    if (!poin || poin <= 0) {
      this.toast('Tarif poin per kg harus lebih dari 0', 'warning');
      return;
    }

    this.menyimpan = true;
    const permintaan =
      this.mode === 'tambah'
        ? this.layanan.tambah({ nama_jenis: nama, ketentuan, poin_per_kg: poin })
        : this.layanan.ubah(this.idDiubah!, { ketentuan, poin_per_kg: poin });

    permintaan.subscribe({
      next: () => {
        this.menyimpan = false;
        this.modalTerbuka = false;
        this.toast(this.mode === 'tambah' ? 'Jenis sampah ditambahkan' : 'Perubahan disimpan', 'success');
        this.muat();
      },
      error: (e) => {
        this.menyimpan = false;
        this.toast(e.error?.message || 'Gagal menyimpan', 'danger');
      },
    });
  }

  async ubahStatus(j: JenisSampah) {
    const aktifkan = Number(j.aktif) === 0 || (j.aktif as any) === false;
    if (!aktifkan && !(await this.konfirmasi(
      `Nonaktifkan ${j.nama_jenis}?`,
      'Pelanggan tidak bisa memilih material ini lagi. Transaksi lama tetap aman.',
      'Nonaktifkan'
    ))) return;

    this.layanan.setAktif(j.id_jenis_sampah, aktifkan ? 1 : 0).subscribe({
      next: () => {
        this.toast(aktifkan ? 'Diaktifkan' : 'Dinonaktifkan', 'success');
        this.muat();
      },
      error: (e) => this.toast(e.error?.message || 'Gagal mengubah status', 'danger'),
    });
  }

  async hapus(j: JenisSampah) {
    if (!(await this.konfirmasi(
      `Hapus ${j.nama_jenis}?`,
      'Dihapus dari daftar, riwayat transaksi tetap tersimpan. Kamu bisa menambahkannya lagi nanti.',
      'Hapus'
    ))) return;

    this.layanan.hapus(j.id_jenis_sampah).subscribe({
      next: () => {
        this.toast('Dihapus dari daftar', 'success');
        this.muat();
      },
      error: (e) => this.toast(e.error?.message || 'Gagal menghapus', 'danger'),
    });
  }

  private async konfirmasi(header: string, message: string, tombol: string): Promise<boolean> {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [{ text: 'Batal', role: 'cancel' }, { text: tombol, role: 'confirm' }],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === 'confirm';
  }

  private async toast(pesan: string, warna: string) {
    const t = await this.toastCtrl.create({ message: pesan, duration: 2500, color: warna, position: 'top' });
    await t.present();
  }
}