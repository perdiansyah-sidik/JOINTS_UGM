import { Component, OnInit, inject } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { timeout, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DEMO_ACCOUNTS, DEMO_PASSWORD } from '../demo/demo-accounts';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  private api = inject(ApiService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  email = '';
  password = '';
  tampilkanSandi = false;
  ingatSaya = false;
  peran: 'pribadi' | 'mitra' = 'pribadi';
  readonly demoMode = environment.demoMode;
  readonly demoAccounts = DEMO_ACCOUNTS;
  readonly demoPassword = DEMO_PASSWORD;

  pilihAkunDemo(email: string) {
    this.email = email;
    this.password = DEMO_PASSWORD;
    this.peran = email.startsWith('mitra@') ? 'mitra' : 'pribadi';
  }

  get jenisAkun(): 'PRIBADI' | 'MITRA' { return this.peran === 'mitra' ? 'MITRA' : 'PRIBADI'; }

  ngOnInit() {
    // Isi otomatis email bila sebelumnya memilih "Ingat saya"
    const emailTersimpan = localStorage.getItem('ecoapp_remember_email');
    if (emailTersimpan) {
      this.email = emailTersimpan;
      this.ingatSaya = true;
    }
  }

  pilihPeran(peran: 'pribadi' | 'mitra') {
    this.peran = peran;
  }

  async prosesLogin() {
    if (!this.email.trim() || !this.password) {
      this.tampilPesan('Masukkan email dan password Anda!', 'warning');
      return;
    }

    localStorage.removeItem('ecoapp_token');
    localStorage.removeItem('ecoapp_user');

    const loading = await this.loadingCtrl.create({
      message: 'Memverifikasi akun...',
      spinner: 'crescent'
    });
    await loading.present();

    this.api.login({ email: this.email.trim().toLowerCase(), password: this.password })
      .pipe(
        timeout(10000),
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe({
        next: async (res) => {
          if (typeof res?.token !== 'string' || !res.token) {
            this.tampilPesan('Sesi dari server tidak tersedia. Coba masuk lagi.', 'danger');
            return;
          }
          localStorage.setItem('ecoapp_token', res.token);
          if (res && res.data) {
            localStorage.setItem('ecoapp_user', JSON.stringify(res.data));
          }

          if (this.ingatSaya) {
            localStorage.setItem('ecoapp_remember_email', this.email.trim());
          } else {
            localStorage.removeItem('ecoapp_remember_email');
          }

          await this.tampilPesan(`Selamat datang, ${res.data?.nama || 'Sobat EcoApp'}! 🌱`, 'success');
          const peran = Number(res.data?.peran);
          const tujuan = peran === 4 ? '/dashboard-pengelola' : peran === 5 ? '/dashboard-mitra' : '/dashboard';
          await this.navCtrl.navigateRoot(tujuan, { animated: true, animationDirection: 'forward' });
        },
        error: async (err) => {
          const msg = err.error?.message || 'Email atau password salah!';
          this.tampilPesan(msg, 'danger');
        }
      });
  }

  // Fungsi cadangan bila tombol di HTML lama memanggil login() atau masuk()
  login() {
    this.prosesLogin();
  }

  masuk() {
    this.prosesLogin();
  }

  lupaSandi() {
    this.tampilPesan('Fitur lupa kata sandi segera hadir.', 'medium');
  }

  loginSosial(penyedia: string) {
    this.tampilPesan(`Masuk dengan ${penyedia} segera hadir.`, 'medium');
  }

  keHalamanDaftar() {
    this.navCtrl.navigateForward('/register', { animated: true });
  }

  tombolKembali() {
    this.navCtrl.navigateBack('/onboarding', { animated: true });
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
