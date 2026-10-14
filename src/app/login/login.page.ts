import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  userType: 'pribadi' | 'mitra' = 'pribadi';
  showPassword = false;
  email = '';
  password = '';
  remember = false;

  setType(type: 'pribadi' | 'mitra') {
    this.userType = type;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}