import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { MasterPenggunaService } from '../../services/master-pengguna.service';
import { finalize, timeout } from 'rxjs';
import { idValid, Kolom, normalisasiHp, payloadUbah, pesanApi, validasiPengguna } from '../pengguna-validation';
import { LABEL_PERAN, MitraRingkas, Pengguna } from '../../models/pengguna.model';

type Mode = 'tambah' | 'ubah';

@Component({
  selector: 'app-form-pengguna',
  templateUrl: './form-pengguna.page.html',
  styleUrls: ['./form-pengguna.page.scss'],
  standalone: false,
})
export class FormPenggunaPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(MasterPenggunaService);
  private readonly navCtrl = inject(NavController);
  private readonly toastCtrl = inject(ToastController);
  private readonly cdr = inject(ChangeDetectorRef);
  sedangMuatMitra = false;
  errorMitra = '';
  sudahSubmit = false;
  private disentuh = new Set<Kolom>();

  sentuh(kolom: Kolom) { this.disentuh.add(kolom); }
  errorKolom(kolom: Kolom): string {
    if (!this.sudahSubmit && !this.disentuh.has(kolom)) return '';
    return validasiPengguna(this.isTambah ? this.formTambah : this.formUbah,
      this.isTambah ? null : this.penggunaAsli, this.daftarMitra)[kolom] ?? '';
  }
  get blokSimpan(): boolean {
    return this.sedangMuat || this.sedangSimpan || !!this.pesanError ||
      (!this.isTambah && !this.penggunaAsli) ||
      ((this.isTambah || (this.butuhPilihMitra && !this.kuncOrganisasiDanPeran)) &&
        (this.sedangMuatMitra || !!this.errorMitra || this.daftarMitra.length === 0));
  }

  readonly labelPeran = LABEL_PERAN;

  mode: Mode = 'tambah';
  idPengguna: number | null = null;

  sedangMuat = false;
  sedangSimpan = false;
  pesanError = '';

  tampilkanSandi = false;
  daftarMitra: MitraRingkas[] = [];

  // Form tambah petugas mitra (peran selalu dikunci = 5 pada endpoint ini).
  formTambah = {
    nama: '',
    email: '',
    password: '',
    no_hp: '',
    id_mitra: null as number | null,
  };

  // Form ubah profil akun yang sudah ada.
  penggunaAsli: Pengguna | null = null;
  formUbah = {
    nama: '',
    no_hp: '',
    alamat: '',
    nama_usaha: '',
    id_mitra: null as number | null,
  };

  get isTambah(): boolean {
    return this.mode === 'tambah';
  }

  get butuhPilihMitra(): boolean {
    // Saat tambah: selalu petugas mitra. Saat ubah: hanya jika akun berperan Mitra (5).
    return this.isTambah || this.penggunaAsli?.peran === 5;
  }

  get kuncOrganisasiDanPeran(): boolean {
    return this.penggunaAsli?.terkunci_transaksi !== false;
  }

  ngOnInit() {
    const modeParam = this.route.snapshot.paramMap.get('mode');
    if (modeParam !== 'tambah' && modeParam !== 'ubah') {
      this.pesanError = 'Alamat halaman tidak valid. Kembali ke daftar pengguna.';
      return;
    }
    this.mode = modeParam;

    if (this.butuhPilihMitra) {
      this.muatDaftarMitra();
    }

    if (this.mode === 'ubah') {
      const idParam = this.route.snapshot.queryParamMap.get('id');
      this.idPengguna = idParam ? Number(idParam) : null;
      if (!idValid(this.idPengguna)) {
        this.pesanError = 'ID akun tidak ditemukan. Kembali ke daftar dan coba lagi.';
        return;
      }
      this.muatDetail(this.idPengguna);
    }
  }

  muatDaftarMitra() {
    if (this.sedangMuatMitra) return;
    this.sedangMuatMitra = true;
    this.errorMitra = '';
    this.api.getListMitraRingkas().pipe(timeout(15000), finalize(() => {
      this.sedangMuatMitra = false;
      this.cdr.markForCheck();
    })).subscribe({
      next: res => {
        if (!Array.isArray(res?.data) || !res.data.every(m => m && idValid(m.id_mitra) && typeof m.nama_mitra === 'string')) {
          this.errorMitra = 'Data organisasi dari server belum sesuai.';
          return;
        }
        this.daftarMitra = res.data;
      },
      error: () => { this.errorMitra = 'Daftar organisasi belum dapat dimuat.'; },
    });
  }

  private muatDetail(id: number) {
    this.sedangMuat = true;
    this.pesanError = '';

    this.api.getDetailPengguna(id).pipe(timeout(15000), finalize(() => {
      this.sedangMuat = false;
      this.cdr.markForCheck();
    })).subscribe({
      next: (res) => {
        this.sedangMuat = false;
        const pengguna = res?.data;
        if (!pengguna || pengguna.id_pengguna !== id || ![1,2,3,4,5].includes(pengguna.peran) ||
          typeof pengguna.nama !== 'string' || typeof pengguna.email !== 'string' ||
          ![0,1].includes(pengguna.aktif) || pengguna.is_deleted !== 0 ||
          ![pengguna.no_hp, pengguna.alamat, pengguna.nama_usaha].every(v => v === null || typeof v === 'string') ||
          (pengguna.peran === 5 ? !idValid(pengguna.id_mitra) : pengguna.id_mitra !== null)) {
          this.pesanError = 'Akun tidak tersedia atau format data server belum sesuai.';
          return;
        }
        this.penggunaAsli = pengguna;
        this.formUbah = {
          nama: pengguna.nama ?? '',
          no_hp: pengguna.no_hp ?? '',
          alamat: pengguna.alamat ?? '',
          nama_usaha: pengguna.nama_usaha ?? '',
          id_mitra: pengguna.id_mitra ?? null,
        };
        if (pengguna.peran === 5 && this.daftarMitra.length === 0) {
          this.muatDaftarMitra();
        }
      },
      error: (err) => {
        this.sedangMuat = false;
        this.pesanError = 'Gagal memuat detail akun. Periksa koneksi lalu coba lagi.';
        console.error('❌ Gagal memuat detail pengguna:', err);
      },
    });
  }

  batal() {
    if (this.sedangSimpan) return;
    this.navCtrl.navigateBack('/master-pengguna');
  }

  simpanTambah() {
    if (this.blokSimpan) return;
    this.sudahSubmit = true;
    if (Object.keys(validasiPengguna(this.formTambah, null, this.daftarMitra)).length) return;
    if (!idValid(this.formTambah.id_mitra)) return;
    this.sedangSimpan = true;
    this.api.buatAkunPetugasMitra({
      nama: this.formTambah.nama.trim(),
      email: this.formTambah.email.trim().toLowerCase(),
      password: this.formTambah.password,
      no_hp: normalisasiHp(this.formTambah.no_hp) || undefined,
      id_mitra: this.formTambah.id_mitra,
    }).pipe(timeout(20000), finalize(() => {
      this.sedangSimpan = false;
      this.cdr.markForCheck();
    })).subscribe({
      next: () => {
        this.formTambah.password = '';
        void this.tampilToast('Akun petugas berhasil dibuat.', 'success');
        void this.navCtrl.navigateBack('/master-pengguna');
      },
      error: err => { void this.tampilToast(pesanApi(err), 'danger'); },
    });
  }

  simpanUbah() {
    if (this.blokSimpan || !idValid(this.idPengguna) || !this.penggunaAsli) return;
    this.sudahSubmit = true;
    if (Object.keys(validasiPengguna(this.formUbah, this.penggunaAsli, this.daftarMitra)).length) return;
    this.sedangSimpan = true;
    this.api.ubahPengguna(this.idPengguna, payloadUbah(this.formUbah, this.penggunaAsli))
      .pipe(timeout(20000), finalize(() => {
        this.sedangSimpan = false;
        this.cdr.markForCheck();
      })).subscribe({
        next: () => {
          void this.tampilToast('Profil akun berhasil diperbarui.', 'success');
          void this.navCtrl.navigateBack('/master-pengguna');
        },
        error: err => { void this.tampilToast(pesanApi(err), 'danger'); },
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
