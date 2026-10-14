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
    id_pelanggan: 2, // Default pelanggan dummy (Bapak Zafrans)
    id_drop_point: null,
    catatan_serah_terima: '',
    id_dibuat_oleh: 2
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
    if (!this.formSetoran.id_drop_point || !this.formSetoran.catatan_serah_terima) {
      alert('Pilih lokasi Drop Point dan isi catatan terlebih dahulu!');
      return;
    }

    this.api.kirimSetoran(this.formSetoran).subscribe({
      next: (res) => {
        alert('✅ Setoran berhasil masuk ke database!');
        this.formSetoran.id_drop_point = null;
        this.formSetoran.catatan_serah_terima = '';
      },
      error: (err) => {
        alert('❌ Gagal mengirim setoran!');
        console.error(err);
      }
    });
  }
}