import { Component, inject } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  private api = inject(ApiService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  // Tab Peran: 'PRIBADI' atau 'MITRA'
  jenisAkun: 'PRIBADI' | 'MITRA' = 'PRIBADI';
  tampilkanSandi = false;
  ingatSaya = false;

  formLogin = {
    email: '',
    password: ''
  };

  pilihJenisAkun(jenis: 'PRIBADI' | 'MITRA') {
    this.jenisAkun = jenis;
  }

  toggleLihatSandi() {
    this.tampilkanSandi = !this.tampilkanSandi;
  }

  async prosesMasuk() {
    if (!this.formLogin.email || !this.formLogin.password) {
      this.tampilPesan('Harap isi Email/No. HP dan Kata Sandi!', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Memverifikasi akun EcoApp...',
      spinner: 'crescent'
    });
    await loading.present();

    this.api.login(this.formLogin).subscribe({
      next: async (res) => {
        await loading.dismiss();
        // Simpan sesi pengguna ke penyimpanan lokal HP/Browser
        localStorage.setItem('ecoapp_user', JSON.stringify(res.data));
        await this.tampilPesan(`Selamat datang kembali, ${res.data.nama}! 🌱`, 'success');
        this.navCtrl.navigateRoot('/home', { animated: true, animationDirection: 'forward' });
      },
      error: async (err) => {
        await loading.dismiss();
        const pesanError = err.error?.message || 'Email atau kata sandi salah!';
        this.tampilPesan(pesanError, 'danger');
      }
    });
  }

  async loginSosial(provider: string) {
    this.tampilPesan(`Login cepat via ${provider} segera hadir! Gunakan email terdaftar.`, 'primary');
  }

  keHalamanDaftar() {
    this.navCtrl.navigateForward('/register', { animated: true, animationDirection: 'forward' });
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