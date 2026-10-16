import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-master-drop-point',
  templateUrl: './master-drop-point.page.html',
  styleUrls: ['./master-drop-point.page.scss'],
  standalone: false
})
export class MasterDropPointPage {
  listDropPoint: any[] = [];
  daftarDropPointTampil: any[] = [];
  loading: boolean = true;
  
  kataKunci: string = '';
  filterStatus: string = 'SEMUA'; // SEMUA, AKTIF, NONAKTIF
  
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ionViewWillEnter() {
    this.muatData();
  }

  muatData() {
    this.loading = true;
    this.http.get(`${this.apiUrl}/drop-points`).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.listDropPoint = res.data;
          this.terapkanFilter();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Gagal memuat drop point:', err);
        this.loading = false;
      }
    });
  }

  // MENGHITUNG STATISTIK BANNER
  get totalDP() { return this.listDropPoint.length; }
  get totalDPAktif() { return this.listDropPoint.filter(dp => dp.aktif === 1).length; }
  get totalDPNonaktif() { return this.listDropPoint.filter(dp => dp.aktif === 0).length; }

  pilihFilterStatus(status: string) {
    this.filterStatus = status;
    this.terapkanFilter();
  }

  terapkanFilter() {
    let filtered = this.listDropPoint;

    // 1. Filter Status
    if (this.filterStatus === 'AKTIF') {
      filtered = filtered.filter(dp => dp.aktif === 1);
    } else if (this.filterStatus === 'NONAKTIF') {
      filtered = filtered.filter(dp => dp.aktif === 0);
    }

    // 2. Filter Teks Pencarian
    if (this.kataKunci && this.kataKunci.trim() !== '') {
      const key = this.kataKunci.toLowerCase();
      filtered = filtered.filter(dp => 
        (dp.nama_drop_point && dp.nama_drop_point.toLowerCase().includes(key)) ||
        (dp.alamat && dp.alamat.toLowerCase().includes(key))
      );
    }

    this.daftarDropPointTampil = filtered;
  }

  konfirmasiToggleStatus(dp: any) {
    const aksi = dp.aktif === 1 ? 'menonaktifkan' : 'mengaktifkan';
    if (confirm(`Apakah Anda yakin ingin ${aksi} drop point ini?`)) {
      this.http.patch(`${this.apiUrl}/drop-points/${dp.id_drop_point}/status`, {aktif: dp.aktif === 1 ? 0 : 1}).subscribe({next:()=>this.muatData(),error:(e:any)=>alert(e.error?.message || 'Gagal mengubah status.')});
    }
  }

  konfirmasiSoftDelete(dp: any) {
    if (confirm('Apakah Anda yakin ingin menghapus (soft-delete) drop point ini?')) {
      this.http.delete(`${this.apiUrl}/drop-points/${dp.id_drop_point}`).subscribe({next:()=>this.muatData(),error:(e:any)=>alert(e.error?.message || 'Gagal menghapus data.')});
    }
  }
}