import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Mengecek apakah halaman dibuka untuk mengedit data lama
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
    // Memperbaiki isu gambar pin/marker bawaan Leaflet yang sering tidak muncul di Angular
    const iconDefault = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
    L.Marker.prototype.options.icon = iconDefault;

    // Titik tengah peta saat pertama kali dimuat 
    const startLat = this.formData.latitude || -6.2235;
    const startLng = this.formData.longitude || 107.0466;

    // Membangun peta di elemen div HTML yang memiliki id="mapId"
    this.map = L.map('mapId').setView([startLat, startLng], 14);

    // Memuat desain gambar peta jalanan dari OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Jika sedang mode Edit dan koordinat sudah ada di database, pasang pin-nya
    if (this.formData.latitude && this.formData.longitude) {
      this.marker = L.marker([this.formData.latitude, this.formData.longitude]).addTo(this.map);
    }

    // Fungsi ketika admin mengklik sebuah area di dalam peta
    this.map.on('click', (e: any) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      // Hapus pin lama (jika ada) agar tidak ada dua pin sekaligus
      if (this.marker) {
        this.map?.removeLayer(this.marker);
      }

      // Pasang pin baru di titik yang baru saja diklik
      this.marker = L.marker([lat, lng]).addTo(this.map!);
      
      // Simpan koordinat baru ke variabel form untuk dikirim ke database nanti
      this.formData.latitude = lat;
      this.formData.longitude = lng;
    });
  }

  simpanData() {
    console.log('Data yang siap dikirim ke API database:', this.formData);
    // TODO: Nanti kita hubungkan dengan API backend di sini
    
    // Setelah tekan simpan, kembali ke tabel halaman utama master drop point
    this.router.navigate(['/master-drop-point']);
  }
}