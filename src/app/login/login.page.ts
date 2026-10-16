import { Component, OnInit, inject } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { timeout, finalize } from 'rxjs/operators';

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

  get jenisAkun(): 'PRIBADI' | 'MITRA' {
    return this.peran === 'mitra' ? 'MITRA' : 'PRIBADI';
  }

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
    const emailInput = this.email.trim();
    const passwordInput = this.password.trim();

    if (!emailInput || !passwordInput) {
      this.tampilPesan('Mohon isi Email/No. HP dan Kata Sandi terlebih dahulu!', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Memverifikasi akun...',
      spinner: 'crescent'
    });
    await loading.present();

    this.api.login({
      email: emailInput,
      password: passwordInput,
      jenis_akun: this.jenisAkun
    })
      .pipe(
        timeout(10000),
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe({
        next: async (res: any) => {
          if (res && res.data) {
            localStorage.setItem('ecoapp_user', JSON.stringify(res.data));
          }

          // Jika login sebagai Mitra / Komunitas, arahkan langsung ke /dashboard-mitra
          if (this.jenisAkun === 'MITRA' || res?.data?.peran_aplikasi === 'MITRA' || res?.data?.id_mitra) {
            await this.tampilPesan(
              `Selamat datang, ${res?.data?.nama_mitra || res?.data?.nama || 'Mitra Pilahin'}!`,
              'success'
            );
            this.navCtrl.navigateRoot('/dashboard-mitra', { animated: true, animationDirection: 'forward' });
          } else {
            await this.tampilPesan(`Selamat datang, ${res?.data?.nama || 'Pengguna'}!`, 'success');
            this.navCtrl.navigateRoot('/dashboard', { animated: true, animationDirection: 'forward' });
          }
        },
        error: async (err: any) => {
          const msg = err?.error?.message || 'Email/No. HP atau Kata Sandi salah!';
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