import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-pengelola',
  templateUrl: './dashboard-pengelola.page.html',
  styleUrls: ['./dashboard-pengelola.page.scss'],
  standalone: false
})
export class DashboardPengelolaPage implements OnInit {
  pengelola = {
    nama: 'Pak Andi',
    lokasi: 'Drop Point Pasar Blok A'
  };

  kas = {
    tersedia: 8350000,
    dipesan: 1240000
  };

  tindakanHariIni = [
    { icon: 'clipboard-outline', title: 'Setoran menunggu verifikasi', subtitle: 'Hasil timbang petugas mitra', count: 5, color: 'success' },
    { icon: 'bus-outline', title: 'Jemputan belum ditugaskan', subtitle: 'Pilih petugas mitra', count: 3, color: 'warning' },
    { icon: 'cash-outline', title: 'Pengajuan pencairan poin', subtitle: 'Transfer manual & bukti', count: 2, color: 'tertiary' },
    { icon: 'cube-outline', title: 'Selisih kedatangan material', subtitle: 'Belum masuk stok', count: 1, color: 'danger' }
  ];

  stok = {
    total: 300,
    items: [
      { nama: 'Plastik', berat: 142, persentase: 47, color: 'primary', value: 0.47 },
      { nama: 'Kardus', berat: 96, persentase: 32, color: 'warning', value: 0.32 },
      { nama: 'Kaca', berat: 38, persentase: 13, color: 'success', value: 0.13 },
      { nama: 'Logam', berat: 24, persentase: 8, color: 'medium', value: 0.08 }
    ]
  };

  constructor(private router: Router) { }

  ngOnInit() { }

  goToDropPoint() {
    this.router.navigate(['/master-drop-point']);
  }
}