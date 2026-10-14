import { Component, inject } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

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

  // 4 Tahap sesuai 4 layar di Prototype Figma (1, 2, 3, 4)
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
    jenis_pelanggan: 'RUMAH_TANGGA',
    alamat: ''
  };

  // Tahap 1: Pilih Pengguna Pribadi / Mitra
  pilihKartuPeran(peran: 'PRIBADI' | 'MITRA') {
    this.peranDipilih = peran;
  }

  // Tahap 2: Pilih Rumah Tangga / UMKM Kuliner / Pedagang Pasar
  pilihKategoriPelanggan(kategori: 'RUMAH_TANGGA' | 'UMKM' | 'PEDAGANG') {
    this.formDaftar.jenis_pelanggan = kategori;
    if (kategori === 'RUMAH_TANGGA') {
      this.formDaftar.nama_usaha = '';
    }
  }

  // Navigasi Maju Antar Tahap (1 -> 2 -> 3 -> 4)
  lanjutTahapBerikutnya() {
    if (this.tahapDaftar === 1) {
      // Jika memilih Mitra, bisa tetap melihat kategori atau langsung ke isi biodata
      this.tahapDaftar = 2;
    } else if (this.tahapDaftar === 2) {
      this.tahapDaftar = 3;
    } else if (this.tahapDaftar === 3) {
      // Validasi form biodata di Tahap 3 sebelum masuk ke Tahap 4 (Password)
      if (!this.formDaftar.nama || !this.formDaftar.email || !this.formDaftar.no_hp || !this.formDaftar.alamat) {
        this.tampilPesan('Mohon lengkapi Nama, Email, Nomor HP, dan Alamat Lengkap!', 'warning');
        return;
      }
      this.tahapDaftar = 4;
    }
  }

  // Navigasi Tombol Kembali (Mundur 1 tahap, atau kembali ke Onboarding jika di Tahap 1)
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

  // Tahap 4: Simpan Pendaftaran ke SQL Server
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
      message: 'Mendaftarkan akun ke EcoApp...',
      spinner: 'crescent'
    });
    await loading.present();

    this.api.register(this.formDaftar).subscribe({
      next: async () => {
        await loading.dismiss();
        await this.tampilPesan('Registrasi berhasil! Silakan masuk dengan akun barumu. 🌱', 'success');
        this.navCtrl.navigateRoot('/login', { animated: true, animationDirection: 'forward' });
      },
      error: async (err) => {
        await loading.dismiss();
        const msg = err.error?.message || 'Gagal mendaftar, periksa kembali koneksi server.';
        this.tampilPesan(msg, 'danger');
      }
    });
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