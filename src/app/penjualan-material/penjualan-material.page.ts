import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-penjualan-material',
  templateUrl: './penjualan-material.page.html',
  styleUrls: ['./penjualan-material.page.scss'],
  standalone: false
})
export class PenjualanMaterialPage implements OnInit {
  // Ganti URL ini sesuai Dev Tunnels atau Localhost milikmu yang aktif
  apiUrl: string = 'https://7n947wwl-3000.asse.devtunnels.ms/api';

  listMitra: any[] = [];
  listJenisSampah: any[] = [];
  
  idMitraPilih: number | null = null;
  keranjangJual: any[] = [];
  
  // Model sementara untuk form input sebelum dimasukkan ke keranjang
  itemBaru: any = {
    id_jenis_sampah: null,
    berat_dikirim_kg: null,
    harga_per_kg_snapshot: null
  };

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.muatDataMaster();
  }

  muatDataMaster() {
    // 1. Tarik daftar Mitra dari API yang sudah ada di index.js
    this.http.get(`${this.apiUrl}/mitra`).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.listMitra = res.data;
        }
      },
      error: (err) => console.error('Gagal ambil data mitra', err)
    });

    // 2. Tarik daftar Jenis Sampah dari API
    this.http.get(`${this.apiUrl}/jenis-sampah`).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.listJenisSampah = res.data;
        }
      },
      error: (err) => console.error('Gagal ambil jenis sampah', err)
    });
  }

  tambahKeKeranjang() {
    if (!this.itemBaru.id_jenis_sampah || !this.itemBaru.berat_dikirim_kg || !this.itemBaru.harga_per_kg_snapshot) {
      alert('Harap lengkapi Jenis, Berat, dan Harga!');
      return;
    }

    // Masukkan data ke array keranjang
    this.keranjangJual.push({ ...this.itemBaru });
    
    // Kosongkan form input
    this.itemBaru = { id_jenis_sampah: null, berat_dikirim_kg: null, harga_per_kg_snapshot: null };
  }

  hapusItem(index: number) {
    this.keranjangJual.splice(index, 1);
  }

  // Fungsi pembantu untuk memunculkan nama sampah di HTML berdasarkan ID
  getNamaSampah(id: number) {
    const sampah = this.listJenisSampah.find(s => s.id_jenis_sampah === id);
    return sampah ? sampah.nama_jenis : 'Tidak diketahui';
  }

  simpanPenjualan() {
    // Menyiapkan Payload untuk dikirim ke Backend nanti
    const payloadData = {
      id_mitra: this.idMitraPilih,
      id_drop_point: 1, // Anggap sementara admin login dari Drop Point ID 1
      detailPenjualan: this.keranjangJual
    };

    console.log('Data Siap Kirim:', payloadData);
    alert('Bagus! UI Penjualan berhasil. Silakan cek Console untuk melihat struktur Payload yang siap dikirim.');
    
    // Nanti di sini kita pasang http.post ke '/api/penjualan' jika teman backend-mu sudah membuatnya.
  }
}