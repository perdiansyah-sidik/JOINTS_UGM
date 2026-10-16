import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  // Menggunakan inject() sesuai standar Angular terbaru
  private api = inject(ApiService);

  daftarDropPoint: any[] = [];
  daftarJenisSampah: any[] = [];

  // Penampung inputan form dari user
  formSetoran = {
    id_pengguna: null as number | null,
    id_drop_point: null as number | null,
  };

  ngOnInit() {
    this.muatDataAwal();
  }

  muatDataAwal() {
    this.api.getDropPoints().subscribe({
      next: (res) => {
        console.log('✅ Data Drop Point berhasil dimuat:', res);
        this.daftarDropPoint = res.data;
      },
      error: (err) => console.error('❌ Gagal memuat Drop Point:', err)
    });
  }

  kirimSetoranUser() {
    if (!this.formSetoran.id_pengguna || !this.formSetoran.id_drop_point) {
      alert('Pilih pelanggan dan lokasi Drop Point terlebih dahulu!');
      return;
    }

    this.api.kirimSetoran(this.formSetoran).subscribe({
      next: (res) => {
        alert('✅ Setoran berhasil masuk ke database!');
        this.formSetoran.id_pengguna = null;
        this.formSetoran.id_drop_point = null;
      },
      error: (err) => {
        alert('❌ Gagal mengirim setoran!');
        console.error(err);
      }
    });
  }
}
