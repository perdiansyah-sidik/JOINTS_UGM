import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-penjualan-material',
  templateUrl: './penjualan-material.page.html',
  styleUrls: ['./penjualan-material.page.scss'],
  standalone: false
})
export class PenjualanMaterialPage implements OnInit {
  apiUrl: string = environment.apiUrl;
  isMitra = false;
  penjualanDipilih: any = null;
  rincianTerima: any[] = [];
  catatanTerima = '';

  listMitra: any[] = [];
  listDropPoint: any[] = [];
  idDropPointPilih: number | null = null;
  daftarPenjualan: any[] = [];
  sedangSimpan = false;
  requestKey = crypto.randomUUID();
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
    try { this.isMitra = JSON.parse(localStorage.getItem('ecoapp_user') || 'null')?.peran === 5; } catch {}
    if (!this.isMitra) this.muatDataMaster();
    this.muatPenjualan();
  }

  muatPenjualan() { this.http.get<any>(`${this.apiUrl}/penjualan`).subscribe({next:r=>this.daftarPenjualan=r.data,error:e=>alert(e.error?.message||'Penjualan gagal dimuat.')}); }
  muatDataMaster() {
    this.http.get<any>(`${this.apiUrl}/drop-points`).subscribe({next:r=>this.listDropPoint=r.data.filter((d:any)=>d.aktif===1),error:e=>alert(e.error?.message||'Drop point gagal dimuat.')});
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
    if (this.sedangSimpan || !this.idMitraPilih || !this.idDropPointPilih || !this.keranjangJual.length) return;
    this.sedangSimpan=true;
    const body={id_mitra:this.idMitraPilih,id_drop_point:this.idDropPointPilih,detailPenjualan:this.keranjangJual,request_key:this.requestKey};
    this.http.post<any>(`${this.apiUrl}/penjualan`,body).subscribe({next:r=>{
      this.sedangSimpan=false;this.requestKey=crypto.randomUUID();this.keranjangJual=[];this.muatPenjualan();alert(`Draft penjualan #${r.data.id_penjualan} tersimpan di Supabase.`);
    },error:e=>{this.sedangSimpan=false;alert(e.error?.message||'Penjualan belum tersimpan. Coba lagi.');}});
  }
  kirimPenjualan(id:number){this.http.patch(`${this.apiUrl}/penjualan/${id}/kirim`,{}).subscribe({next:()=>this.muatPenjualan(),error:e=>alert(e.error?.message||'Pengiriman gagal dicatat.')});}
  bukaPenjualan(id:number){this.http.get<any>(`${this.apiUrl}/penjualan/${id}`).subscribe({next:r=>{this.penjualanDipilih=r.data;this.rincianTerima=r.data.detail.map((d:any)=>({id_detail_penjualan:d.id_detail_penjualan,berat_diterima_kg:d.berat_diterima_kg??d.berat_dikirim_kg,berat_ditolak_kg:d.berat_ditolak_kg??0,alasan_penolakan:d.alasan_penolakan||'',catatan_selisih_timbang:d.catatan_selisih_timbang||''}));},error:e=>alert(e.error?.message||'Rincian penjualan gagal dimuat.')});}
  konfirmasiTerima(){
    if(!this.penjualanDipilih||this.sedangSimpan)return;
    this.sedangSimpan=true;
    this.http.put(`${this.apiUrl}/penjualan/konfirmasi/${this.penjualanDipilih.id_penjualan}`,{detail:this.rincianTerima,catatan:this.catatanTerima}).subscribe({next:()=>{this.sedangSimpan=false;this.penjualanDipilih=null;this.rincianTerima=[];this.muatPenjualan();},error:e=>{this.sedangSimpan=false;alert(e.error?.message||'Konfirmasi penerimaan gagal disimpan.');}});
  }
}
