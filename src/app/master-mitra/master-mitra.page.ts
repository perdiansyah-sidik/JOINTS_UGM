import { Component, OnInit, inject } from '@angular/core';
import { NavController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

export interface MitraModel {
  id_mitra: number;
  nama_mitra: string;
  nama_penanggung_jawab: string | null;
  no_hp: string | null;
  alamat_mitra: string;
  aktif: number;
  dibuat_pada?: string;
  diubah_pada?: string;
  jumlah_petugas?: number;
  daftar_petugas?: any[];
}

@Component({
  selector: 'app-master-mitra',
  templateUrl: './master-mitra.page.html',
  styleUrls: ['./master-mitra.page.scss'],
  standalone: false,
})
export class MasterMitraPage implements OnInit {
  private api = inject(ApiService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private loadingCtrl = inject(LoadingController);

  loading = false;
  kataKunci = '';
  filterStatus: 'SEMUA' | 'AKTIF' | 'NONAKTIF' = 'SEMUA';

  daftarMitra: MitraModel[] = [];
  daftarMitraTampil: MitraModel[] = [];

  // Statistik Header
  totalMitra = 0;
  totalMitraAktif = 0;
  totalMitraNonaktif = 0;
  totalPetugasTerhubung = 0;

  // State Modal Form Tambah / Ubah & Detail
  tampilModalForm = false;
  modeEdit = false;
  idMitraDiedit: number | null = null;

  tampilModalDetail = false;
  mitraDetailTerpilih: MitraModel | null = null;

  formMitra = {
    nama_mitra: '',
    nama_penanggung_jawab: '',
    no_hp: '',
    alamat_mitra: '',
    aktif: 1
  };

  idPengelolaLogin: number | null = null;

  ngOnInit() {
    this.ambilSesiPengelola();
    this.muatDataMitra();
  }

  ionViewWillEnter() {
    this.muatDataMitra();
  }

  ambilSesiPengelola() {
    const tersimpan = localStorage.getItem('ecoapp_user');
    if (tersimpan) {
      try {
        const user = JSON.parse(tersimpan);
        if (user.id_pengguna) this.idPengelolaLogin = Number(user.id_pengguna);
      } catch (e) {
        console.error(e);
      }
    }
  }

  muatDataMitra(event?: any) {
    this.loading = true;
    this.api.getMitraList().subscribe({
      next: (res) => {
        this.loading = false;
        this.daftarMitra = Array.isArray(res?.data) ? res.data : [];
        this.hitungStatistik();
        this.terapkanFilter();
        if (event?.target) event.target.complete();
      },
      error: (err) => {
        this.loading = false;
        this.tampilPesan(err?.error?.message || 'Gagal memuat data organisasi mitra.', 'danger');
        if (event?.target) event.target.complete();
      }
    });
  }

  hitungStatistik() {
    this.totalMitra = this.daftarMitra.length;
    this.totalMitraAktif = this.daftarMitra.filter((m) => Number(m.aktif) === 1).length;
    this.totalMitraNonaktif = this.daftarMitra.filter((m) => Number(m.aktif) === 0).length;
    this.totalPetugasTerhubung = this.daftarMitra.reduce((acc, m) => acc + Number(m.jumlah_petugas || 0), 0);
  }

  pilihFilterStatus(status: 'SEMUA' | 'AKTIF' | 'NONAKTIF') {
    this.filterStatus = status;
    this.terapkanFilter();
  }

  terapkanFilter() {
    const q = (this.kataKunci || '').trim().toLowerCase();

    this.daftarMitraTampil = this.daftarMitra.filter((m) => {
      const cocokStatus =
        this.filterStatus === 'SEMUA' ||
        (this.filterStatus === 'AKTIF' && Number(m.aktif) === 1) ||
        (this.filterStatus === 'NONAKTIF' && Number(m.aktif) === 0);

      const cocokKata =
        !q ||
        (m.nama_mitra || '').toLowerCase().includes(q) ||
        (m.nama_penanggung_jawab || '').toLowerCase().includes(q) ||
        (m.alamat_mitra || '').toLowerCase().includes(q) ||
        (m.no_hp || '').toLowerCase().includes(q);

      return cocokStatus && cocokKata;
    });
  }

  // Buka Form Tambah Mitra Baru
  bukaModalTambah() {
    this.modeEdit = false;
    this.idMitraDiedit = null;
    this.formMitra = {
      nama_mitra: '',
      nama_penanggung_jawab: '',
      no_hp: '',
      alamat_mitra: '',
      aktif: 1
    };
    this.tampilModalForm = true;
  }

  // Buka Form Edit Mitra
  bukaModalEdit(mitra: MitraModel) {
    this.modeEdit = true;
    this.idMitraDiedit = mitra.id_mitra;
    this.formMitra = {
      nama_mitra: mitra.nama_mitra || '',
      nama_penanggung_jawab: mitra.nama_penanggung_jawab || '',
      no_hp: mitra.no_hp || '',
      alamat_mitra: mitra.alamat_mitra || '',
      aktif: Number(mitra.aktif) === 1 ? 1 : 0
    };
    this.tampilModalForm = true;
  }

  tutupModalForm() {
    this.tampilModalForm = false;
  }

  // Buka Modal Detail Mitra & Daftar Petugasnya
  bukaDetailMitra(mitra: MitraModel) {
    this.mitraDetailTerpilih = { ...mitra, daftar_petugas: [] };
    this.tampilModalDetail = true;

    this.api.getMitraDetail(mitra.id_mitra).subscribe({
      next: (res) => {
        if (res && res.data) {
          this.mitraDetailTerpilih = res.data;
        }
      }
    });
  }

  tutupModalDetail() {
    this.tampilModalDetail = false;
    this.mitraDetailTerpilih = null;
  }

  // Simpan Tambah atau Perubahan Mitra ke SQL Server
  async simpanMitra() {
    const nama = (this.formMitra.nama_mitra || '').trim();
    const alamat = (this.formMitra.alamat_mitra || '').trim();
    const pj = (this.formMitra.nama_penanggung_jawab || '').trim();
    const hp = (this.formMitra.no_hp || '').trim();

    if (!nama || !alamat) {
      this.tampilPesan('Nama Organisasi Mitra dan Alamat Fasilitas wajib diisi!', 'warning');
      return;
    }

    if (nama.length > 150) {
      this.tampilPesan('Nama Mitra maksimal 150 karakter sesuai kamus data!', 'warning');
      return;
    }

    if (alamat.length > 255) {
      this.tampilPesan('Alamat Mitra maksimal 255 karakter sesuai kamus data!', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: this.modeEdit ? 'Menyimpan perubahan mitra...' : 'Menambahkan organisasi mitra...',
      spinner: 'crescent'
    });
    await loading.present();

    if (this.modeEdit && this.idMitraDiedit !== null) {
      this.api.updateMitra(this.idMitraDiedit, {
        nama_mitra: nama,
        nama_penanggung_jawab: pj || null,
        no_hp: hp || null,
        alamat_mitra: alamat,
        aktif: this.formMitra.aktif,
        diubah_oleh: this.idPengelolaLogin
      }).subscribe({
        next: async (res) => {
          await loading.dismiss();
          this.tampilModalForm = false;
          await this.tampilPesan(res?.message || 'Data organisasi mitra berhasil diperbarui!', 'success');
          this.muatDataMitra();
        },
        error: async (err) => {
          await loading.dismiss();
          this.tampilPesan(err?.error?.message || 'Gagal memperbarui data mitra.', 'danger');
        }
      });
    } else {
      this.api.tambahMitra({
        nama_mitra: nama,
        nama_penanggung_jawab: pj || null,
        no_hp: hp || null,
        alamat_mitra: alamat,
        dibuat_oleh: this.idPengelolaLogin
      }).subscribe({
        next: async (res) => {
          await loading.dismiss();
          this.tampilModalForm = false;
          await this.tampilPesan(res?.message || 'Organisasi mitra baru berhasil ditambahkan!', 'success');
          this.muatDataMitra();
        },
        error: async (err) => {
          await loading.dismiss();
          this.tampilPesan(err?.error?.message || 'Gagal menambahkan mitra baru.', 'danger');
        }
      });
    }
  }

  // Konfirmasi Aktifkan / Nonaktifkan Mitra
  async konfirmasiToggleStatus(mitra: MitraModel) {
    const targetAktif = Number(mitra.aktif) === 1 ? 0 : 1;
    const aksiTeks = targetAktif === 1 ? 'Aktifkan' : 'Nonaktifkan';

    const alert = await this.alertCtrl.create({
      header: `${aksiTeks} Organisasi Mitra?`,
      message: targetAktif === 0
        ? `Menonaktifkan "${mitra.nama_mitra}" akan menghentikan penugasan baru ke organisasi ini tanpa menghapus histori transaksi lama.`
        : `Aktifkan kembali organisasi "${mitra.nama_mitra}" sebagai mitra operasional?`,
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: `Ya, ${aksiTeks}`,
          handler: () => {
            this.api.ubahStatusMitra(mitra.id_mitra, targetAktif, this.idPengelolaLogin || undefined).subscribe({
              next: async (res) => {
                await this.tampilPesan(res?.message || `Status mitra berhasil diubah!`, 'success');
                this.muatDataMitra();
              },
              error: (err) => {
                this.tampilPesan(err?.error?.message || 'Gagal mengubah status mitra.', 'danger');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  // Konfirmasi Soft Delete sesuai Kamus Data (is_deleted = 1, aktif = 0)
  async konfirmasiSoftDelete(mitra: MitraModel) {
    const alert = await this.alertCtrl.create({
      header: 'Nonaktifkan / Soft Delete Mitra?',
      message: `Sesuai aturan Master Pilahin, organisasi "${mitra.nama_mitra}" yang dirujuk transaksi tidak dihapus fisik melainkan di-soft delete (aktif = 0) agar histori laporan tetap terjaga.`,
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Soft Delete',
          role: 'destructive',
          handler: () => {
            this.api.hapusMitra(mitra.id_mitra).subscribe({
              next: async (res) => {
                await this.tampilPesan(res?.message || 'Mitra berhasil di-soft delete.', 'success');
                this.muatDataMitra();
              },
              error: (err) => {
                this.tampilPesan(err?.error?.message || 'Gagal memproses soft delete mitra.', 'danger');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  kembaliKeDashboard() {
    this.navCtrl.navigateBack('/dashboard-pengelola');
  }

  async tampilPesan(pesan: string, warna: string) {
    const toast = await this.toastCtrl.create({
      message: pesan,
      duration: 2600,
      color: warna,
      position: 'top'
    });
    await toast.present();
  }
}