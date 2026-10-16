import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import * as L from 'leaflet';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-form-drop-point',
  templateUrl: './form-drop-point.page.html',
  styleUrls: ['./form-drop-point.page.scss'],
  standalone: false
})
export class FormDropPointPage implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private loadingCtrl = inject(LoadingController);
  private toastCtrl = inject(ToastController);
  private api = inject(ApiService);

  isEdit: boolean = false;
  idDropPoint: number | null = null;
  idPengelolaLogin: number = 1;

  map: L.Map | undefined;
  marker: L.Marker | undefined;

  formData = {
    id_drop_point: null as number | null,
    nama_drop_point: '',
    alamat: '',
    jam_operasional: 'Senin - Sabtu (08.00 - 16.00 WIB)',
    nama_komunitas: '',
    kontak_komunitas: '',
    aktif: 1,
    latitude: null as number | null,
    longitude: null as number | null
  };

  private readonly STORAGE_KEY = 'pilahin_cache_drop_points';

  ngOnInit() {
    this.ambilSesiPengguna();

    // 1. Cek jika dikirim via Router state
    const navState = this.router.getCurrentNavigation()?.extras.state || history.state;
    if (navState && navState['dataDropPoint']) {
      this.isiFormDariObjek(navState['dataDropPoint']);
    }

    // 2. Cek parameter rute /:id
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId && !Number.isNaN(Number(paramId))) {
      this.isEdit = true;
      this.idDropPoint = Number(paramId);
      this.muatDetailDariApiAtauCache(this.idDropPoint);
    }
  }

  ionViewDidEnter() {
    this.inisialisasiPeta();
  }

  ambilSesiPengguna() {
    const sesi = localStorage.getItem('ecoapp_user');
    if (sesi) {
      try {
        const user = JSON.parse(sesi);
        if (user.id_pengguna) this.idPengelolaLogin = Number(user.id_pengguna);
      } catch (e) {}
    }
  }

  isiFormDariObjek(data: any) {
    if (!data) return;
    this.isEdit = true;
    this.idDropPoint = Number(data.id_drop_point || data.id);
    this.formData = {
      id_drop_point: this.idDropPoint,
      nama_drop_point: data.nama_drop_point || data.nama || '',
      alamat: data.alamat || '',
      jam_operasional: data.jam_operasional || data.jamOperasional || '',
      nama_komunitas: data.nama_komunitas || '',
      kontak_komunitas: data.kontak_komunitas || '',
      aktif: data.aktif !== undefined ? (Number(data.aktif) === 0 ? 0 : 1) : 1,
      latitude: data.latitude !== null && data.latitude !== undefined ? Number(data.latitude) : null,
      longitude: data.longitude !== null && data.longitude !== undefined ? Number(data.longitude) : null
    };
    this.perbaruiPinPeta();
  }

  muatDetailDariApiAtauCache(id: number) {
    this.api.getDropPointDetail(id).subscribe({
      next: (res: any) => {
        if (res && res.status === 'success' && res.data) {
          this.isiFormDariObjek(res.data);
        }
      },
      error: () => {
        if (!environment.demoMode) return;
        const cached = localStorage.getItem(this.STORAGE_KEY);
        if (cached) {
          try {
            const list = JSON.parse(cached);
            const found = list.find((d: any) => Number(d.id_drop_point) === id);
            if (found) this.isiFormDariObjek(found);
          } catch (e) {}
        }
      }
    });
  }

  inisialisasiPeta() {
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }

    const iconDefault = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
    L.Marker.prototype.options.icon = iconDefault;

    const startLat = this.formData.latitude ?? -6.259124;
    const startLng = this.formData.longitude ?? 106.797215;

    this.map = L.map('mapId').setView([startLat, startLng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    if (this.formData.latitude !== null && this.formData.longitude !== null) {
      this.marker = L.marker([this.formData.latitude, this.formData.longitude]).addTo(this.map);
    }

    this.map.on('click', async (e: any) => {
      const lat = Number(e.latlng.lat.toFixed(6));
      const lng = Number(e.latlng.lng.toFixed(6));

      if (this.marker) {
        this.map?.removeLayer(this.marker);
      }
      this.marker = L.marker([lat, lng]).addTo(this.map!);

      this.formData.latitude = lat;
      this.formData.longitude = lng;

      try {
        const respon = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await respon.json();
        if (data && data.display_name && !this.formData.alamat) {
          this.formData.alamat = String(data.display_name).slice(0, 255);
        }
      } catch (error) {
        console.error('Gagal mengambil nama jalan:', error);
      }
    });
  }

  perbaruiPinPeta() {
    if (!this.map) return;
    if (this.formData.latitude !== null && this.formData.longitude !== null) {
      const lat = Number(this.formData.latitude);
      const lng = Number(this.formData.longitude);
      this.map.setView([lat, lng], 15);
      if (this.marker) this.map.removeLayer(this.marker);
      this.marker = L.marker([lat, lng]).addTo(this.map);
    }
  }

  resetKoordinat() {
    this.formData.latitude = null;
    this.formData.longitude = null;
    if (this.marker && this.map) {
      this.map.removeLayer(this.marker);
      this.marker = undefined;
    }
  }

  async cariAlamatKePeta() {
    if (!this.formData.alamat || !this.formData.alamat.trim()) {
      this.tampilToast('Masukkan teks alamat terlebih dahulu untuk dicari di peta.', 'warning');
      return;
    }

    try {
      const respon = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.formData.alamat)}`);
      const data = await respon.json();

      if (data && data.length > 0) {
        const lat = Number(parseFloat(data[0].lat).toFixed(6));
        const lon = Number(parseFloat(data[0].lon).toFixed(6));

        this.map?.setView([lat, lon], 16);

        if (this.marker) {
          this.map?.removeLayer(this.marker);
        }
        this.marker = L.marker([lat, lon]).addTo(this.map!);

        this.formData.latitude = lat;
        this.formData.longitude = lon;
        this.tampilToast('Titik koordinat berhasil ditemukan di peta!', 'success');
      } else {
        this.tampilToast('Alamat tidak ditemukan di peta. Coba gunakan nama jalan/kecamatan yang lebih umum.', 'warning');
      }
    } catch (error) {
      console.error('Gagal mencari alamat:', error);
    }
  }

  async dapatkanLokasiTerkini() {
    if (!navigator.geolocation) {
      this.tampilToast('Browser atau perangkat tidak mendukung fitur lokasi GPS.', 'danger');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Mencari koordinat GPS Anda...',
      spinner: 'crescent'
    });
    await loading.present();

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = Number(position.coords.latitude.toFixed(6));
        const lng = Number(position.coords.longitude.toFixed(6));

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
            this.formData.alamat = String(data.display_name).slice(0, 255);
          }
        } catch (error) {
          console.error('Gagal mengambil nama jalan dari GPS:', error);
        } finally {
          loading.dismiss();
        }
      },
      () => {
        loading.dismiss();
        this.tampilToast('Gagal mendapatkan GPS. Pastikan izin lokasi diaktifkan.', 'warning');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  validasiSesuaiKamusData(): string | null {
    const nama = (this.formData.nama_drop_point || '').trim();
    const alamat = (this.formData.alamat || '').trim();
    const jam = (this.formData.jam_operasional || '').trim();
    const komp = (this.formData.nama_komunitas || '').trim();
    const kontak = (this.formData.kontak_komunitas || '').trim();

    if (!nama || !alamat || !jam) {
      return 'Nama Drop Point, Alamat Lengkap, dan Jam Operasional wajib diisi!';
    }
    if (nama.length > 100) {
      return 'Nama Drop Point maksimal 100 karakter (NVARCHAR(100))!';
    }
    if (alamat.length > 255) {
      return 'Alamat Lengkap maksimal 255 karakter (NVARCHAR(255))!';
    }
    if (jam.length > 200) {
      return 'Jam Operasional maksimal 200 karakter (NVARCHAR(200))!';
    }
    if (komp.length > 20) {
      return 'Nama Komunitas maksimal 20 karakter (VARCHAR(20)) sesuai kamus data!';
    }
    if (kontak.length > 20) {
      return 'Kontak Komunitas maksimal 20 karakter (VARCHAR(20)) sesuai kamus data!';
    }
    // Constraint Kamus Data Tabel 3: "Kontak tidak boleh terisi tanpa nama"
    if (kontak && !komp) {
      return 'Kontak Komunitas tidak boleh diisi jika Nama Komunitas kosong!';
    }

    // Constraint Kamus Data Tabel 3: "Latitude [-90..90], Longitude [-180..180]. Keduanya NULL atau keduanya terisi."
    const hasLat = this.formData.latitude !== null && this.formData.latitude !== undefined && String(this.formData.latitude).trim() !== '';
    const hasLng = this.formData.longitude !== null && this.formData.longitude !== undefined && String(this.formData.longitude).trim() !== '';

    if (hasLat !== hasLng) {
      return 'Koordinat Latitude dan Longitude harus diisi berpasangan (keduanya terisi atau keduanya dikosongkan)!';
    }
    if (hasLat && hasLng) {
      const lat = Number(this.formData.latitude);
      const lng = Number(this.formData.longitude);
      if (Number.isNaN(lat) || Number.isNaN(lng)) {
        return 'Koordinat Latitude dan Longitude harus berupa angka desimal yang valid!';
      }
      if (lat < -90 || lat > 90) {
        return 'Latitude harus berada pada rentang -90 hingga 90!';
      }
      if (lng < -180 || lng > 180) {
        return 'Longitude harus berada pada rentang -180 hingga 180!';
      }
    }

    return null;
  }

  async simpanData() {
    const errorMsg = this.validasiSesuaiKamusData();
    if (errorMsg) {
      this.tampilToast(errorMsg, 'warning');
      return;
    }

    const hasCoord = this.formData.latitude !== null && this.formData.latitude !== undefined && String(this.formData.latitude).trim() !== '';

    const payload = {
      nama_drop_point: this.formData.nama_drop_point.trim(),
      alamat: this.formData.alamat.trim(),
      jam_operasional: this.formData.jam_operasional.trim(),
      nama_komunitas: this.formData.nama_komunitas.trim() || null,
      kontak_komunitas: this.formData.kontak_komunitas.trim() || null,
      latitude: hasCoord ? Number(Number(this.formData.latitude).toFixed(6)) : null,
      longitude: hasCoord ? Number(Number(this.formData.longitude).toFixed(6)) : null,
      aktif: Number(this.formData.aktif) === 0 ? 0 : 1,
      dibuat_oleh: this.idPengelolaLogin,
      diubah_oleh: this.idPengelolaLogin
    };

    const loading = await this.loadingCtrl.create({
      message: this.isEdit ? 'Menyimpan perubahan Drop Point...' : 'Menambahkan Drop Point baru...',
      spinner: 'crescent'
    });
    await loading.present();

    if (this.isEdit && this.idDropPoint) {
      this.api.updateDropPoint(this.idDropPoint, payload).subscribe({
        next: async (res: any) => {
          await loading.dismiss();
          if (environment.demoMode) this.sinkronKeCacheLokal(this.idDropPoint!, payload, false);
          await this.tampilToast(res?.message || 'Data Drop Point berhasil diperbarui!', 'success');
          this.router.navigate(['/master-drop-point']);
        },
        error: async (err) => {
          await loading.dismiss();
          if (environment.demoMode && (!err?.status || err.status === 0 || err.status === 404 || err.status >= 500)) {
            this.sinkronKeCacheLokal(this.idDropPoint!, payload, false);
            await this.tampilToast('Data Drop Point berhasil diperbarui!', 'success');
            this.router.navigate(['/master-drop-point']);
          } else {
            await this.tampilToast(err?.error?.message || 'Gagal memperbarui Drop Point.', 'danger');
          }
        }
      });
    } else {
      this.api.tambahDropPoint(payload).subscribe({
        next: async (res: any) => {
          await loading.dismiss();
          const newId = res?.data?.id_drop_point || Date.now();
          if (environment.demoMode) this.sinkronKeCacheLokal(newId, payload, true);
          await this.tampilToast(res?.message || 'Drop Point baru berhasil ditambahkan!', 'success');
          this.router.navigate(['/master-drop-point']);
        },
        error: async (err) => {
          await loading.dismiss();
          if (environment.demoMode && (!err?.status || err.status === 0 || err.status === 404 || err.status >= 500)) {
            const newId = Math.floor(Math.random() * 900) + 10;
            this.sinkronKeCacheLokal(newId, payload, true);
            await this.tampilToast('Drop Point baru berhasil ditambahkan!', 'success');
            this.router.navigate(['/master-drop-point']);
          } else {
            await this.tampilToast(err?.error?.message || 'Gagal menambahkan Drop Point.', 'danger');
          }
        }
      });
    }
  }

  private sinkronKeCacheLokal(id: number, payload: any, isNew: boolean) {
    if (!environment.demoMode) return;
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];
      if (isNew) {
        list.unshift({
          id_drop_point: id,
          ...payload,
          is_deleted: 0,
          dibuat_pada: new Date().toISOString()
        });
      } else {
        const idx = list.findIndex((x: any) => Number(x.id_drop_point) === Number(id));
        if (idx >= 0) {
          list[idx] = { ...list[idx], ...payload, diubah_pada: new Date().toISOString() };
        }
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  async tampilToast(message: string, color: 'success' | 'warning' | 'danger' = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2600,
      color,
      position: 'top'
    });
    await toast.present();
  }
}
