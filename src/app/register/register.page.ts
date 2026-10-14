import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  selected: 'pribadi' | 'mitra' | null = 'pribadi';

  constructor(private router: Router) {}

  select(type: 'pribadi' | 'mitra') {
    this.selected = type;
  }

  next() {
    // sementara ke dashboard, nanti diganti ke form pendaftaran sesuai kategori
    this.router.navigateByUrl('/dashboard');
  }
}