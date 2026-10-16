import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-terima-di-titik',
  templateUrl: './terima-di-titik.page.html',
  styleUrls: ['./terima-di-titik.page.scss'],
  standalone: false
})
export class TerimaDiTitikPage implements OnInit {
  nomorSetoran: string = '';
  dataSetoran: any = null;
  adaSelisih: boolean = false;
  catatanPenerimaan: string = '';

  // Ganti URL ini dengan URL backend-mu (misal: localhost atau link devtunnels)
  apiUrl: string = environment.apiUrl;

  constructor(
    private router: Router,
    private http: HttpClient // <-- Masukkan HttpClient ke dalam constructor
  ) { }

  ngOnInit() {
  }

  // 1. MENGAMBIL DATA DARI API (GET)
  cariSetoran() {
    if (!this.nomorSetoran) return;

    // Menghilangkan awalan "ST-" jika backend hanya butuh angkanya (ID)
    // Atau hapus baris ini jika backend butuh format teks utuh
    const idPencarian = this.nomorSetoran.replace('ST-', ''); 

    // Memanggil API GET Detail yang dibuat temanmu
    this.http.get(`${this.apiUrl}/setoran/detail/${idPencarian}`).subscribe({
      next: (res: any) => {
        if (res.status === 'success' && res.data) {
          this.dataSetoran = res.data;
          
          // Format untuk tampilan nomor:
          this.dataSetoran.nomor = `ST-${this.dataSetoran.id_setoran}`;
          this.cekSelisih(); // Reset status selisih
        }
      },
      error: (err) => {
        console.error('Gagal mengambil data:', err);
        alert('Setoran tidak ditemukan atau terjadi kesalahan server.');
        this.dataSetoran = null; // Kosongkan tampilan jika gagal
      }
    });
  }

  cekSelisih() {
    this.adaSelisih = false;
    if (this.dataSetoran && this.dataSetoran.detailMaterial) {
      for (let item of this.dataSetoran.detailMaterial) {
        if (item.beratMasukFisik !== null && item.beratMasukFisik !== item.beratDiterimaAwal) {
          this.adaSelisih = true;
          break;
        }
      }
    }
  }

  // 2. MENGIRIM DATA KE API (PUT)
  simpanPenerimaan() {
    const statusAkhir = this.adaSelisih ? 'SELISIH' : 'DITERIMA';
    
    // Siapkan data yang akan dikirim (Payload)
    const payload = {
      status_terima_drop_point: statusAkhir,
      catatan_serah_terima: this.catatanPenerimaan,
      detailMaterial: this.dataSetoran.detailMaterial
    };

    // Panggil API PUT untuk update data
    this.http.put(`${this.apiUrl}/setoran/terima/${this.dataSetoran.id_setoran}`, payload).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          alert(`Berhasil! Kedatangan material dicatat dengan status: ${statusAkhir}`);
          
          // Reset form dan kembali ke dashboard
          this.nomorSetoran = '';
          this.dataSetoran = null;
          this.router.navigate(['/dashboard-pengelola']);
        }
      },
      error: (err) => {
        console.error('Gagal menyimpan:', err);
        alert(err.error?.message || 'Gagal menyimpan konfirmasi penerimaan.');
      }
    });
  }

  simpanVerifikasiFinal() {
    // Siapkan Payload Data Verifikasi
    const payloadVerifikasi = {
      // Identitas pengelola diambil server dari token login.
      catatan_verifikasi: "Verifikasi aman, sesuai standar.",
      detailVerifikasi: this.dataSetoran.detailMaterial.map((item: any) => ({
        id_detail_setoran: item.id_detail_setoran,
        berat_diterima_kg: item.beratMasukFisik, // Anggap semua berat fisik disetujui jadi poin
        berat_ditolak_kg: 0,                     // Jika ada yang ditolak, ganti angka ini dari form HTML
        alasan_penolakan: null                   // Wajib diisi string jika berat_ditolak_kg > 0
      }))
    };

    // Panggil API Verifikasi
    this.http.put(`${this.apiUrl}/setoran/verifikasi/${this.dataSetoran.id_setoran}`, payloadVerifikasi).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          alert('Selesai! Status setoran sekarang FINAL dan pelanggan telah menerima poinnya.');
          this.router.navigate(['/dashboard-pengelola']);
        }
      },
      error: (err) => {
        console.error('Gagal memverifikasi:', err);
        alert(err.error?.message || 'Terjadi kesalahan saat memverifikasi setoran.');
      }
    });
  }
}