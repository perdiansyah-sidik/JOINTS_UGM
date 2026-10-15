import { Component, inject } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { timeout, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  private api = inject(ApiService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  tahapDaftar: 1 | 2 | 3 | 4 = 1;
  peranDipilih: 'PRIBADI' | 'MITRA' = 'PRIBADI';

  tampilkanSandi = false;
  tampilkanVerifikasiSandi = false;
  verifikasiPassword = '';

  formDaftar = {
    nama: '',
    nama_usaha: '',
    email: '',
    no_hp: '',
    password: '',
    peran: 'PELANGGAN',
    jenis_pelanggan: 'RUMAH_TANGGA',
    alamat: ''
  };

  pilihKartuPeran(peran: 'PRIBADI' | 'MITRA') {
    this.peranDipilih = peran;
  }

  pilihKategoriPelanggan(kategori: string) {
    if (kategori === 'UMKM') kategori = 'UMKM_KULINER';
    if (kategori === 'PEDAGANG') kategori = 'PEDAGANG_PASAR';
    this.formDaftar.jenis_pelanggan = kategori;

    if (kategori === 'RUMAH_TANGGA') {
      this.formDaftar.nama_usaha = '';
    }
  }

  lanjutTahapBerikutnya() {
    if (this.tahapDaftar === 1) {
      if (this.peranDipilih === 'MITRA') {
        this.tampilPesan('Akun Mitra dibuat oleh Pengelola. Silakan masuk jika sudah memiliki akun Mitra.', 'warning');
        this.navCtrl.navigateForward('/login', { animated: true });
        return;
      }
      this.tahapDaftar = 2;
    } else if (this.tahapDaftar === 2) {
      this.tahapDaftar = 3;
    } else if (this.tahapDaftar === 3) {
      if (!this.formDaftar.nama.trim() || !this.formDaftar.email.trim() || !this.formDaftar.no_hp.trim() || !this.formDaftar.alamat.trim()) {
        this.tampilPesan('Mohon lengkapi Nama Lengkap, Email, Nomor HP, dan Alamat Lengkap!', 'warning');
        return;
      }
      this.tahapDaftar = 4;
    }
  }

  tombolKembali() {
    if (this.tahapDaftar > 1) {
      this.tahapDaftar = (this.tahapDaftar - 1) as 1 | 2 | 3 | 4;
    } else {
      this.navCtrl.back();
    }
  }

  keHalamanMasuk() {
    this.navCtrl.navigateForward('/login', { animated: true });
  }

  async simpanPendaftaran() {
    if (!this.formDaftar.password || this.formDaftar.password.length < 6) {
      this.tampilPesan('Password minimal 6 karakter!', 'warning');
      return;
    }

    if (this.formDaftar.password !== this.verifikasiPassword) {
      this.tampilPesan('Password dan Verifikasi Password tidak sama!', 'danger');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Menyimpan akun ke EcoApp...',
      spinner: 'crescent'
    });
    await loading.present();

    const payload = {
      nama: this.formDaftar.nama.trim(),
      nama_usaha: this.formDaftar.jenis_pelanggan === 'RUMAH_TANGGA' ? null : (this.formDaftar.nama_usaha.trim() || null),
      email: this.formDaftar.email.trim().toLowerCase(),
      no_hp: this.formDaftar.no_hp.trim(),
      password: this.formDaftar.password,
      peran: 'PELANGGAN',
      jenis_pelanggan: this.formDaftar.jenis_pelanggan,
      alamat: this.formDaftar.alamat.trim()
    };

    this.api.register(payload)
      .pipe(
        timeout(10000),
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe({
        next: async () => {
          await this.tampilPesan('Registrasi berhasil! Silakan masuk dengan akun Anda. 🌱', 'success');
          // Langsung arahkan ke halaman Login
          this.navCtrl.navigateRoot('/login', { animated: true, animationDirection: 'forward' });
        },
        error: async (err) => {
          let msg = 'Gagal menyimpan pendaftaran. Pastikan terminal Backend (node index.js) menyala.';
          if (err.name === 'TimeoutError') {
            msg = 'Waktu koneksi habis (Timeout). Cek terminal Backend Anda!';
          } else if (err.error?.message) {
            msg = err.error.message;
          }
          this.tampilPesan(msg, 'danger');
        }
      });
  }

  async tampilPesan(pesan: string, warna: string) {
    const toast = await this.toastCtrl.create({
      message: pesan,
      duration: 2800,
      color: warna,
      position: 'top'
    });
    await toast.present();
  }
}