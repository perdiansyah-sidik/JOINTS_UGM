import { ChangeDetectorRef, Component, HostListener, inject } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
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
  private readonly cdr = inject(ChangeDetectorRef);
  sedangUbahStatus = false;
  sedangHapus = false;
  menuAkun: number | null = null;
  konfirmasi: { pengguna: Pengguna; aksi: 'status' | 'hapus' } | null = null;
  teksKonfirmasiHapus = '';
  private sedangSinkronDaftar = false;

  readonly labelPeran = LABEL_PERAN;

  daftarPengguna: Pengguna[] = [];
  daftarTertampil: Pengguna[] = [];

  sedangMuat = false;
  pesanError = '';
  kataKunci = '';

  // 'SEMUA' atau salah satu nilai peran.
  filterPeran: 'SEMUA' | NilaiPeran = 'SEMUA';

  ionViewWillEnter() {
    // Refresh tiap kali kembali dari halaman tambah/ubah supaya datanya terbaru.
    this.muatDaftar();
  }

  muatDaftar(event?: { target: { complete(): Promise<void> } }, pertahankanDaftar = false) {
    if (this.sedangSinkronDaftar) { void event?.target.complete(); return; }
    this.sedangSinkronDaftar = true;
    this.sedangMuat = !pertahankanDaftar;
    this.pesanError = '';

    this.api.getListPengguna().pipe(timeout(15000), finalize(() => {
      this.sedangSinkronDaftar = false;
      this.sedangMuat = false;
      void event?.target.complete();
      this.cdr.markForCheck();
    })).subscribe({
      next: (res) => {
        if (!Array.isArray(res?.data) || !res.data.every(p => p && idValid(p.id_pengguna) && typeof p.nama === 'string' && typeof p.email === 'string' && [1,2,3,4,5].includes(p.peran) && [0,1].includes(p.aktif) && [0,1].includes(p.is_deleted))) {
          this.pesanError = 'Format daftar akun dari server belum sesuai kontrak Pilahin.';
          return;
        }
        this.daftarPengguna = res.data;
        this.terapkanFilter();
      },
      error: () => {
        this.pesanError = 'Gagal memuat daftar akun. Periksa koneksi lalu coba lagi.';
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
    this.tutupMenu();
    this.navCtrl.navigateForward('/master-pengguna/form/tambah');
  }

  bukaUbah(pengguna: Pengguna) {
    this.tutupMenu();
    if (pengguna.is_deleted === 1) {
      void this.tampilToast('Pulihkan akun dahulu sebelum mengubahnya.', 'warning');
      return;
    }
    this.navCtrl.navigateForward(`/master-pengguna/form/ubah?id=${pengguna.id_pengguna}`);
  }

  bukaDetail(pengguna: Pengguna) {
    this.tutupMenu();
    this.navCtrl.navigateForward(`/master-pengguna/detail/${pengguna.id_pengguna}`);
  }

  toggleMenu(id: number) {
    if (this.sedangUbahStatus || this.sedangHapus) return;
    this.menuAkun = this.menuAkun === id ? null : id;
  }

  tutupMenu() { this.menuAkun = null; }

  @HostListener('document:click', ['$event'])
  tutupMenuSaatKlikDiLuar(event: MouseEvent) {
    if (this.menuAkun === null) return;
    const kartu = event.target instanceof Element ? event.target.closest('.mp-card') : null;
    if (Number(kartu?.getAttribute('data-pengguna-id')) !== this.menuAkun) this.tutupMenu();
  }

  konfirmasiAksi(pengguna: Pengguna, aksi: 'status' | 'hapus') {
    if (this.sedangUbahStatus || this.sedangHapus) return;
    this.tutupMenu();
    this.teksKonfirmasiHapus = '';
    this.konfirmasi = { pengguna, aksi };
    setTimeout(() => document.getElementById('mp-dialog-cancel')?.focus(), 0);
  }

  batalKonfirmasi() {
    if (this.sedangUbahStatus || this.sedangHapus) return;
    this.konfirmasi = null;
    this.teksKonfirmasiHapus = '';
  }

  jalankanKonfirmasi() {
    const item = this.konfirmasi;
    if (!item) return;
    if (item.aksi === 'hapus' && this.teksKonfirmasiHapus !== 'HAPUS') return;
    this.konfirmasi = null;
    if (item.aksi === 'hapus') this.prosesHapusPermanen(item.pengguna);
    else this.prosesTogelAktif(item.pengguna);
  }

  private prosesTogelAktif(pengguna: Pengguna) {
    if (this.sedangUbahStatus) return;
    this.sedangUbahStatus = true;
    const menjadiAktif = pengguna.aktif === 0;
    const aksi = pengguna.aktif === 1
      ? this.api.nonaktifkanPengguna(pengguna.id_pengguna)
      : this.api.aktifkanPengguna(pengguna.id_pengguna);

    aksi.pipe(timeout(20000), finalize(() => { this.sedangUbahStatus = false; this.cdr.markForCheck(); })).subscribe({
      next: () => {
        pengguna.aktif = menjadiAktif ? 1 : 0;
        pengguna.is_deleted = menjadiAktif ? 0 : 1;
        this.cdr.markForCheck();
        void this.tampilToast(menjadiAktif ? 'Akun aktif kembali.' : 'Akun dinonaktifkan sementara.', 'success');
        this.muatDaftar(undefined, true);
      },
      error: err => { void this.tampilToast(pesanApi(err), 'danger'); },
    });
  }

  private prosesHapusPermanen(pengguna: Pengguna) {
    if (this.sedangHapus) return;
    this.sedangHapus = true;
    this.api.hapusPermanenPengguna(pengguna.id_pengguna)
      .pipe(timeout(20000), finalize(() => { this.sedangHapus = false; this.cdr.markForCheck(); }))
      .subscribe({
        next: () => {
          this.daftarPengguna = this.daftarPengguna.filter(p => p.id_pengguna !== pengguna.id_pengguna);
          this.terapkanFilter();
          void this.tampilToast('Akun berhasil dihapus permanen.', 'success');
          this.muatDaftar(undefined, true);
        },
        error: err => {
          const pesan = err?.status === 409
            ? 'Akun sudah punya riwayat atau masih dibutuhkan. Hapus permanen ditolak.'
            : pesanApi(err);
          void this.tampilToast(pesan, 'danger');
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
