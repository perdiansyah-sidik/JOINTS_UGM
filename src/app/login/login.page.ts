import { Component, inject } from '@angular/core';
import { NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
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
export class LoginPage {
  private api = inject(ApiService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private loadingCtrl = inject(LoadingController);

  // Mendukung binding langsung dari HTML
  tabAktif: 'PRIBADI' | 'MITRA' = 'PRIBADI';
  email: string = '';
  password: string = '';
  tampilkanSandi: boolean = false;
  showPassword: boolean = false;
  ingatSaya: boolean = false;
  formLogin = {
    email: '',
    password: ''
  };
  peran: 'pribadi' | 'mitra' = 'pribadi';
  readonly demoMode = environment.demoMode;
  readonly demoAccounts = DEMO_ACCOUNTS;
  readonly demoPassword = DEMO_PASSWORD;

  pilihAkunDemo(email: string) {
    this.email = email;
    this.password = DEMO_PASSWORD;
    this.peran = email.startsWith('mitra@') ? 'mitra' : 'pribadi';
  }

  get jenisAkun(): 'PRIBADI' | 'MITRA' {
    return this.peran === 'mitra' ? 'MITRA' : 'PRIBADI';
  }

  pilihJenisAkun(jenis: 'PRIBADI' | 'MITRA') {
    this.tabAktif = jenis;
    this.peran = jenis === 'MITRA' ? 'mitra' : 'pribadi';
  }

  pilihPeran(peran: 'pribadi' | 'mitra') {
    this.peran = peran;
    this.tabAktif = peran === 'mitra' ? 'MITRA' : 'PRIBADI';
  }

  toggleSandi() {
    this.tampilkanSandi = !this.tampilkanSandi;
    this.showPassword = this.tampilkanSandi;
  }

  async lupaSandi() {
    const alert = await this.alertCtrl.create({
      header: 'Reset Kata Sandi',
      message: 'Masukkan Email atau Nomor HP akun Anda untuk menerima tautan pemulihan kata sandi.',
      inputs: [
        {
          name: 'identitas',
          type: 'text',
          placeholder: 'Email atau No. Handphone',
          value: this.email || this.formLogin.email
        }
      ],
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Kirim Reset',
          handler: (data) => {
            if (!data?.identitas?.trim()) {
              this.tampilPesan('Mohon masukkan Email atau Nomor HP Anda!', 'warning');
              return false;
            }
            this.tampilPesan(`Instruksi pemulihan kata sandi telah dikirim ke ${data.identitas}.`, 'success');
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
    const emailTersimpan = localStorage.getItem('ecoapp_remember_email');
    if (emailTersimpan) {
      this.email = emailTersimpan;
      this.ingatSaya = true;
    }
  }
    }

    // Deteksi apakah input yang dimasukkan adalah akun/email milik Mitra atau Kurir
    const indikasiAkunMitra =
      inputLower.includes('kurir') ||
      inputLower.includes('mitra') ||
      inputLower.includes('daurulang') ||
      inputLower.includes('pt ');

    if (this.jenisAkun === 'PRIBADI' && indikasiAkunMitra) {
      this.tampilPesan(
        'Akun Mitra/Kurir tidak dapat masuk dari tab Pengguna Pribadi! Silakan pindah ke tab "Mitra / Komunitas".',
        'danger'
      );
      return;
    }

    this.api.login({
      email: inputLower,
      password: passwordInput,
      jenis_akun: 'PRIBADI'
    })
      .pipe(
        timeout(10000),
        finalize(() => loading.dismiss())
      )
      .subscribe({
        next: async (res: any) => {
          const userData = res?.data || res?.user || null;
          if (!userData && !res?.token) {
            this.tampilPesan('Sesi dari server tidak tersedia. Coba masuk lagi.', 'danger');
            return;
          }

          const tokenSimpan = typeof res?.token === 'string' && res.token
            ? res.token
            : `ecoapp-session-${userData?.id_pengguna || 1}`;
          localStorage.setItem('ecoapp_token', tokenSimpan);
          if (userData) {
            localStorage.setItem('ecoapp_user', JSON.stringify(userData));
          }

          if (this.ingatSaya) {
            localStorage.setItem('ecoapp_remember_email', this.email.trim());
          } else {
            localStorage.removeItem('ecoapp_remember_email');
          }
      
          await this.tampilPesan(`Selamat datang, ${userData?.nama || 'Sobat EcoApp'}! 🌱`, 'success');
          this.navCtrl.navigateRoot('/dashboard', { animated: true, animationDirection: 'forward' });
        },
        error: async () => {
          this.tampilPesan('Login gagal. Periksa kembali email dan password Anda.', 'danger');
        }
      });
      return;
      return;
    }

    localStorage.removeItem('ecoapp_token');
    localStorage.removeItem('ecoapp_user');

    const loading = await this.loadingCtrl.create({
      message: 'Memverifikasi kredensial akun...',
      spinner: 'crescent'
    });
    await loading.present();

    // =========================================================================
    // A. JIKA LOGIN DARI TAB MITRA / KOMUNITAS (HANYA BOLEH AKUN MITRA)
    // =========================================================================
    if (this.jenisAkun === 'MITRA') {
      this.api.getMitraList()
        .pipe(
          timeout(10000),
          finalize(() => loading.dismiss())
        )
        .subscribe({
          next: async (res: any) => {
            const daftarMitra = Array.isArray(res?.data) ? res.data : [];

            const mitraCocok = daftarMitra.find((m: any) => {
              const hp = String(m.no_hp || '').trim();
              const pj = String(m.nama_penanggung_jawab || '').trim().toLowerCase();
              const namaOrg = String(m.nama_mitra || '').trim().toLowerCase();
              return (
                hp === inputUser ||
                pj === inputLower ||
                namaOrg === inputLower ||
                pj.includes(inputLower) ||
                namaOrg.includes(inputLower) ||
                (indikasiAkunMitra && Number(m.aktif) === 1)
              );
            });

            if (!mitraCocok) {
              this.tampilPesan(
                'Akun ini bukan akun Mitra/Komunitas! Gunakan tab "Pengguna Pribadi" untuk akun pelanggan biasa.',
                'danger'
              );
              return;
            }

            if (Number(mitraCocok.aktif) === 0) {
              this.tampilPesan('Organisasi Mitra ini sedang berstatus Nonaktif.', 'warning');
              return;
            }

            const sesiMitra = {
              id_mitra: mitraCocok.id_mitra,
              nama_mitra: mitraCocok.nama_mitra,
              nama: mitraCocok.nama_penanggung_jawab || mitraCocok.nama_mitra,
              nama_penanggung_jawab: mitraCocok.nama_penanggung_jawab,
              no_hp: mitraCocok.no_hp,
              alamat: mitraCocok.alamat_fasilitas || mitraCocok.alamat_mitra || '',
              alamat_fasilitas: mitraCocok.alamat_fasilitas || mitraCocok.alamat_mitra || '',
              aktif: mitraCocok.aktif,
              peran_aplikasi: 'MITRA'
            };

            localStorage.setItem('ecoapp_user', JSON.stringify(sesiMitra));
            await this.tampilPesan(
              `Selamat datang di Portal Mitra, ${sesiMitra.nama} (${sesiMitra.nama_mitra})!`,
              'success'
            );
            this.navCtrl.navigateRoot('/dashboard-mitra', { animated: true, animationDirection: 'forward' });
          },
          error: async () => {
            this.tampilPesan('Gagal memverifikasi data mitra ke server.', 'danger');
          }
        });
      return;
    }

    // =========================================================================
    // B. JIKA LOGIN DARI TAB PENGGUNA PRIBADI (HANYA BOLEH PELANGGAN / PENGELOLA)
    // =========================================================================
    this.api.login({
      email: inputLower,
      password: passwordInput,
      jenis_akun: 'PRIBADI'
    })
      .pipe(
        timeout(10000),
        finalize(() => loading.dismiss())
      )
      .subscribe({
        next: async (res: any) => {
          const userData = res?.data;

          if (userData?.id_mitra || userData?.peran_aplikasi === 'MITRA') {
            this.tampilPesan(
              'Akun Mitra hanya dapat login melalui tab "Mitra / Komunitas"!',
              'danger'
            );
            return;
          }

          if (userData) {
            localStorage.setItem('ecoapp_user', JSON.stringify(userData));
          }

          await this.tampilPesan(`Selamat datang kembali, ${userData?.nama || 'Pengguna'}!`, 'success');

          const isPengelola =
            Number(userData?.peran) === 4 ||
            String(userData?.peran || '').toUpperCase() === 'PENGELOLA' ||
            inputLower.includes('pengelola') ||
            inputLower.includes('admin');

          if (isPengelola) {
            this.navCtrl.navigateRoot('/dashboard-pengelola', { animated: true, animationDirection: 'forward' });
          } else {
            this.navCtrl.navigateRoot('/dashboard', { animated: true, animationDirection: 'forward' });
          }
        },
        error: async () => {
          this.tampilPesan('Login gagal. Periksa kembali email dan password Anda.', 'danger');
        }
      });
          }

          await this.tampilPesan(`Selamat datang, ${userData?.nama || 'Sobat EcoApp'}! 🌱`, 'success');
          const peranNum = Number(userData?.peran);
          const peranStr = String(userData?.peran || '').toUpperCase();
          const peranApp = String(userData?.peran_aplikasi || '').toUpperCase();

          let tujuan = '/dashboard';
          if (peranNum === 4 || peranStr === 'PENGELOLA' || peranStr === 'ADMIN') {
            tujuan = '/dashboard-pengelola';
          } else if (peranNum === 5 || peranStr === 'MITRA' || peranApp === 'MITRA' || this.jenisAkun === 'MITRA') {
            tujuan = '/dashboard-mitra';
          }
          await this.navCtrl.navigateRoot(tujuan, { animated: true, animationDirection: 'forward' });
        },
        error: async (err) => {
          const msg = err.error?.message || 'Email atau password salah!';
          this.tampilPesan(msg, 'danger');
        }
      });
  }

  // Integrasi Login dengan Google (Menyesuaikan Tab yang Sedang Dipilih)
  async loginSosial(provider: string = 'Google') {
    const alert = await this.alertCtrl.create({
      header: `Masuk dengan Google (${this.jenisAkun === 'MITRA' ? 'Mitra / Komunitas' : 'Pengguna Pribadi'})`,
      message: 'Pilih atau masukkan akun Google Anda untuk melanjutkan ke aplikasi Pilahin:',
      inputs: [
        {
          name: 'namaGoogle',
          type: 'text',
          placeholder: 'Nama Akun Google',
          value: this.jenisAkun === 'MITRA' ? 'Pak Budi (Mitra Google)' : 'Syauqi Hidayah'
        },
        {
          name: 'emailGoogle',
          type: 'email',
          placeholder: 'alamat.email@gmail.com',
          value: this.jenisAkun === 'MITRA' ? 'mitra.daurulang@gmail.com' : 'syauqi@gmail.com'
        }
      ],
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Lanjutkan dengan Google',
          handler: async (data) => {
            const emailG = (data?.emailGoogle || '').trim().toLowerCase();
            const namaG = (data?.namaGoogle || 'Pengguna Google').trim();

            if (!emailG || !emailG.includes('@')) {
              this.tampilPesan('Masukkan alamat email Google yang valid!', 'warning');
              return false;
            }

            if (this.jenisAkun === 'MITRA') {
              const sesiMitraGoogle = {
                id_mitra: 1,
                nama_mitra: 'PT Daur Ulang Nusantara',
                nama: namaG,
                nama_penanggung_jawab: namaG,
                email: emailG,
                no_hp: '081122334455',
                alamat_fasilitas: 'Kawasan Industri Cikarang',
                aktif: 1,
                peran_aplikasi: 'MITRA',
                login_via: 'GOOGLE'
              };
              localStorage.setItem('ecoapp_user', JSON.stringify(sesiMitraGoogle));
              await this.tampilPesan(`Berhasil masuk via Google sebagai Mitra (${namaG})!`, 'success');
              this.navCtrl.navigateRoot('/dashboard-mitra', { animated: true });
            } else {
              const sesiPribadiGoogle = {
                id_pengguna: 1,
                nama: namaG,
                email: emailG,
                no_hp: '081234567890',
                peran: 1,
                jenis_pelanggan: 'RUMAH_TANGGA',
                alamat: 'Jl. Mawar Melati No. 14',
                peran_aplikasi: 'PRIBADI',
                login_via: 'GOOGLE'
              };
              localStorage.setItem('ecoapp_user', JSON.stringify(sesiPribadiGoogle));
              await this.tampilPesan(`Berhasil masuk via Google sebagai ${namaG}!`, 'success');
              this.navCtrl.navigateRoot('/dashboard', { animated: true });
            }
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  keHalamanDaftar() {
    this.navCtrl.navigateForward('/register', { animated: true });
  }

  kembali() {
    this.navCtrl.navigateBack('/welcome', { animated: true });
  }

  async tampilPesan(pesan: string, warna: string) {
    const toast = await this.toastCtrl.create({
      message: pesan,
      duration: 2600,
      color: warna,
      position: 'top'
    });
    await toast.present();
  }
}
