import { Component, inject } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: false,
})
export class WelcomePage {
  private navCtrl = inject(NavController);

  // Fungsi saat tombol "Mulai Sekarang" diklik
  mulaiSekarang() {
    this.navCtrl.navigateForward('/register', { animated: true });
  }

  // Fungsi saat teks "Masuk" diklik
  keLogin() {
    this.navCtrl.navigateForward('/login', { animated: true });
  }
}