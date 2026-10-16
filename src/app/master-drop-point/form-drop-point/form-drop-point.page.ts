import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-form-drop-point',
  templateUrl: './form-drop-point.page.html',
  styleUrls: ['./form-drop-point.page.scss'],
  standalone: false
})
export class FormDropPointPage implements OnInit {
  isEdit: boolean = false;
  map: L.Map | undefined;
  marker: L.Marker | undefined;
  
  formData = {
    id: null,
    nama: '',
    alamat: '',
    jamOperasional: '',
    status: 'aktif',
    latitude: null as number | null,
    longitude: null as number | null
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    // Mengecek apakah halaman dibuka untuk mengedit data lama
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id > 0) this.http.get<any>(`${environment.apiUrl}/drop-points/${id}`).subscribe({next:r=>{const d=r.data;this.isEdit=true;this.formData={id:d.id_drop_point,nama:d.nama_drop_point,alamat:d.alamat,jamOperasional:d.jam_operasional,status:d.aktif===1?'aktif':'nonaktif',latitude:d.latitude===null?null:Number(d.latitude),longitude:d.longitude===null?null:Number(d.longitude)};},error:e=>alert(e.error?.message||'Data drop point gagal dimuat.')});
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        const data = this.router.getCurrentNavigation()?.extras.state?.['dataDropPoint'];
        if (data) {
          this.isEdit = true;
          this.formData = { ...data };
        }
      }
    });
  }

  // ionViewDidEnter dipanggil saat HTML selesai dimuat. Wajib untuk inisialisasi peta di Ionic.
  ionViewDidEnter() {
    this.inisialisasiPeta();
  }

  inisialisasiPeta() {
    const iconDefault = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
    L.Marker.prototype.options.icon = iconDefault;

    const startLat = this.formData.latitude || -6.2235;
    const startLng = this.formData.longitude || 107.0466;

    this.map = L.map('mapId').setView([startLat, startLng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    if (this.formData.latitude && this.formData.longitude) {
      this.marker = L.marker([this.formData.latitude, this.formData.longitude]).addTo(this.map);
    }

    // EVENT KLIK PETA (Sekarang ditambah Reverse Geocoding)
    this.map.on('click', async (e: any) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      if (this.marker) {
        this.map?.removeLayer(this.marker);
      }
      this.marker = L.marker([lat, lng]).addTo(this.map!);
      
      this.formData.latitude = lat;
      this.formData.longitude = lng;

      // Fitur Canggih: Mengambil teks alamat dari koordinat yang diklik
      try {
        const respon = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await respon.json();
        if (data && data.display_name) {
          // Otomatis isi kotak Alamat Lengkap
          this.formData.alamat = data.display_name;
        }
      } catch (error) {
        console.error('Gagal mengambil nama jalan:', error);
      }
    });
  }

  // FUNGSI BARU: Menerjemahkan Teks Alamat menjadi Pin di Peta
  async cariAlamatKePeta() {
    if (!this.formData.alamat) return;

    try {
      // Mencari koordinat berdasarkan teks alamat
      const respon = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${this.formData.alamat}`);
      const data = await respon.json();

      if (data && data.length > 0) {
        // Ambil hasil pencarian pertama yang paling relevan
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        // Terbang ke lokasi baru dengan animasi zoom level 16
        this.map?.setView([lat, lon], 16);

        // Pindahkan pin marker
        if (this.marker) {
          this.map?.removeLayer(this.marker);
        }
        this.marker = L.marker([lat, lon]).addTo(this.map!);

        // Simpan koordinatnya
        this.formData.latitude = lat;
        this.formData.longitude = lon;
      } else {
        alert('Alamat tidak ditemukan di peta. Coba gunakan nama kota atau jalan yang lebih umum.');
      }
    } catch (error) {
      console.error('Gagal mencari alamat:', error);
    }
  }

  simpanData() {
    const b={nama_drop_point:this.formData.nama.trim(),alamat:this.formData.alamat.trim(),jam_operasional:this.formData.jamOperasional.trim(),latitude:this.formData.latitude,longitude:this.formData.longitude,aktif:this.formData.status==='aktif'?1:0};
    if(!b.nama_drop_point||!b.alamat||!b.jam_operasional){alert('Nama, alamat, dan jam operasional wajib diisi.');return;}
    const id=Number(this.route.snapshot.paramMap.get('id'));
    const request=id?this.http.put(`${environment.apiUrl}/drop-points/${id}`,b):this.http.post<any>(`${environment.apiUrl}/drop-points`,(({aktif,...data})=>data)(b));
    request.subscribe({next:(response:any)=>{
      if (!id && b.aktif===0) {
        this.http.patch(`${environment.apiUrl}/drop-points/${response.data.id_drop_point}/status`,{aktif:0}).subscribe({next:()=>this.router.navigate(['/master-drop-point']),error:(e:any)=>alert(e.error?.message||'Drop point tersimpan, tetapi status belum berhasil diubah.')});
      } else this.router.navigate(['/master-drop-point']);
    },error:(e:any)=>alert(e.error?.message||'Gagal menyimpan drop point.')});
  }

  // FUNGSI BARU: Mendapatkan lokasi GPS terkini dari perangkat pengguna
  // FUNGSI BARU: Mendapatkan lokasi GPS dengan Loading Animation
  async dapatkanLokasiTerkini() {
    if (navigator.geolocation) {
      
      // 1. Munculkan buletan loading
      const loading = await this.loadingCtrl.create({
        message: 'Mencari lokasi Anda...',
        spinner: 'crescent' // Gaya buletan muter (bisa juga 'circles' atau 'dots')
      });
      await loading.present();

      // 2. Mulai cari GPS
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        this.map?.setView([lat, lng], 16);

        if (this.marker) {
          this.map?.removeLayer(this.marker);
        }
        this.marker = L.marker([lat, lng]).addTo(this.map!);

        this.formData.latitude = lat;
        this.formData.longitude = lng;

        try {
          const respon = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await respon.json();
          if (data && data.display_name) {
            this.formData.alamat = data.display_name;
          }
        } catch (error) {
          console.error('Gagal mengambil nama jalan dari GPS:', error);
        } finally {
          // 3. Matikan loading saat berhasil
          loading.dismiss(); 
        }
        
      }, (error) => {
        // 4. Matikan loading jika GPS gagal/ditolak, lalu beri peringatan
        loading.dismiss();
        alert('Gagal mendapatkan lokasi. Pastikan GPS/Location menyala dan aplikasi diizinkan mengaksesnya.');
      }, {
        enableHighAccuracy: true, // Memaksa browser mencari koordinat paling akurat
        timeout: 10000 // Batas waktu pencarian 10 detik agar loading tidak nyangkut selamanya
      });

    } else {
      alert('Browser atau perangkat kamu tidak mendukung fitur lokasi GPS.');
    }
  }
}
