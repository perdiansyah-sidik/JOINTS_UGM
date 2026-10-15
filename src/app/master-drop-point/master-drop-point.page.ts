import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Tambahkan ChangeDetectorRef
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-drop-point',
  templateUrl: './master-drop-point.page.html',
  styleUrls: ['./master-drop-point.page.scss'],
  standalone: false
})
export class MasterDropPointPage implements OnInit {
  dropPoints: any[] = [];
  apiUrl = 'https://7n947wwl-3000.asse.devtunnels.ms/api/drop-points';
  isLoading = true;

  // 2. Suntikkan private cdr: ChangeDetectorRef ke dalam constructor
  constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit() {
    this.loadDataDropPoint();
  }

  loadDataDropPoint() {
    this.isLoading = true;
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        if (response && response.status === 'success' && response.data) {
          this.dropPoints = response.data;
        } else {
          this.dropPoints = [];
        }
        this.isLoading = false;
        
        // 3. Tambahkan baris ini untuk memaksa UI langsung me-refresh tampilan
        this.cdr.detectChanges(); 
      },
      error: (error) => {
        console.error('Terjadi kesalahan saat menarik data API:', error);
        this.isLoading = false;
        
        // Tambahkan juga di bagian error
        this.cdr.detectChanges(); 
      }
    });
  }

  kembaliKeDashboard() {
    this.router.navigate(['/dashboard-pengelola']);
  }

  tambahData() {
    // Tombol ini belum pindah halaman karena kita belum membuat halaman 'tambah-drop-point'
    console.log('Buka halaman form tambah');
  }

  editData(id: number) {
    // Sama seperti tambah, butuh halaman khusus untuk form edit
    console.log('Buka form edit untuk ID:', id);
  }

  toggleStatus(item: any) {
    item.aktif = item.aktif === 1 ? 0 : 1; 
    console.log('Status diubah:', item.nama_drop_point, item.aktif);
  }
}