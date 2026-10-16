import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { MasterPenggunaService } from '../services/master-pengguna.service';
import { finalize, timeout } from 'rxjs';
import { idValid, pesanApi } from './pengguna-validation';
import { LABEL_PERAN, NilaiPeran, Pengguna } from '../models/pengguna.model';

@Component({
  selector: 'app-master-pengguna',
  templateUrl: './master-pengguna.page.html',
  styleUrls: ['./master-pengguna.page.scss'],
  standalone: false,
})
export class MasterPenggunaPage {
  private readonly api = inject(MasterPenggunaService);
  private readonly navCtrl = inject(NavController);
  private readonly toastCtrl = inject(ToastController);
  private readonly alertCtrl = inject(AlertController);

  private readonly cdr = inject(ChangeDetectorRef);
  sedangUbahStatus = false;

  readonly labelPeran = LABEL_PERAN;

  daftarPengguna: Pengguna[] = [];
  daftarTertampil: Pengguna[] = [];

  sedangMuat = false;
  pesanError = '';
  kataKunci = '';

  // 'SEMUA' atau salah satu NilaiPeran (dikirim sebagai string karena ion-segment).
  filterPeran: 'SEMUA' | NilaiPeran = 'SEMUA';

  ionViewWillEnter() {
    // Refresh tiap kali kembali dari halaman tambah/ubah supaya datanya terbaru.
    this.muatDaftar();
  }

  muatDaftar(event?: { target: { complete(): Promise<void> } }) {
    if (this.sedangMuat) { void event?.target.complete(); return; }
    this.sedangMuat = true;
    this.pesanError = '';

    this.api.getListPengguna().pipe(timeout(15000), finalize(() => this.cdr.markForCheck())).subscribe({
      next: (res) => {
        if (!Array.isArray(res?.data) || !res.data.every(p => p && idValid(p.id_pengguna) && typeof p.nama === 'string' && typeof p.email === 'string' && [1,2,3,4,5].includes(p.peran) && [0,1].includes(p.aktif) && [0,1].includes(p.is_deleted))) {
          this.pesanError = 'Format daftar akun dari server belum sesuai kontrak Pilahin.';
          this.sedangMuat = false;
          void event?.target.complete();
          return;
        }
        this.daftarPengguna = res.data.filter(p => p.is_deleted === 0);
        this.terapkanFilter();
        this.sedangMuat = false;
        if (event?.target) event.target.complete();
      },
      error: (err) => {
        this.sedangMuat = false;
        this.pesanError = 'Gagal memuat daftar akun. Periksa koneksi ke server lalu coba lagi.';
        if (event?.target) event.target.complete();
        console.error('❌ Gagal memuat pengguna:', err);
      },
    });
  }

  ubahFilterPeran(nilai: string | number | undefined) {
    const angka = Number(nilai);
    this.filterPeran = [1,2,3,4,5].includes(angka) ? angka as NilaiPeran : 'SEMUA';
    this.terapkanFilter();
  }

  ubahKataKunci(nilai: string) {
    this.kataKunci = nilai;
    this.terapkanFilter();
  }

  private terapkanFilter() {
    const kataKunciRapi = this.kataKunci.trim().toLowerCase();
    this.daftarTertampil = this.daftarPengguna.filter((p) => {
      const cocokPeran = this.filterPeran === 'SEMUA' || p.peran === this.filterPeran;
      const cocokKataKunci =
        !kataKunciRapi ||
        p.nama.toLowerCase().includes(kataKunciRapi) ||
        p.email.toLowerCase().includes(kataKunciRapi);
      return cocokPeran && cocokKataKunci;
    });
  }

  bukaTambahPetugasMitra() {
    this.navCtrl.navigateForward('/master-pengguna/form/tambah');
  }

  bukaUbah(pengguna: Pengguna) {
    this.navCtrl.navigateForward(`/master-pengguna/form/ubah?id=${pengguna.id_pengguna}`);
  }

  async konfirmasiNonaktifkan(pengguna: Pengguna) {
    if (this.sedangUbahStatus || pengguna.is_deleted !== 0) return;
    const alert = await this.alertCtrl.create({
      header: pengguna.aktif ? 'Nonaktifkan akun?' : 'Aktifkan kembali akun?',
      message: pengguna.aktif
        ? 'Akun ini tidak akan bisa login setelah dinonaktifkan. Riwayat transaksi tetap tersimpan.'
        : 'Akun ini akan bisa login kembali.',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: pengguna.aktif ? 'Nonaktifkan' : 'Aktifkan',
          role: 'destructive',
          handler: () => this.prosesTogelAktif(pengguna),
        },
      ],
    });
    await alert.present();
  }

  private prosesTogelAktif(pengguna: Pengguna) {
    if (this.sedangUbahStatus || pengguna.is_deleted !== 0) return;
    this.sedangUbahStatus = true;
    const aksi = pengguna.aktif
      ? this.api.nonaktifkanPengguna(pengguna.id_pengguna)
      : this.api.aktifkanPengguna(pengguna.id_pengguna);

    aksi.pipe(timeout(20000), finalize(() => { this.sedangUbahStatus = false; this.cdr.markForCheck(); })).subscribe({
      next: async () => {
        await this.tampilToast(
          pengguna.aktif ? 'Akun berhasil dinonaktifkan.' : 'Akun berhasil diaktifkan kembali.',
          'success',
        );
        this.muatDaftar();
      },
      error: async (err) => {
        const pesan = pesanApi(err);
        await this.tampilToast(pesan, 'danger');
      },
    });
  }

  private async tampilToast(pesan: string, warna: string) {
    const toast = await this.toastCtrl.create({
      message: pesan,
      duration: 2500,
      color: warna,
      position: 'top',
    });
    await toast.present();
  }
}
