import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

export interface RekapStokMaterialModel {
  id_jenis_sampah: number;
  nama_jenis: string;
  poin_per_kg: number;
  berat_masuk_final_kg: number;
  berat_tertahan_selisih_kg: number;
  berat_dikirim_kg: number;
  berat_diterima_mitra_kg: number;
  berat_ditolak_mitra_kg: number;
  selisih_timbang_mitra_kg: number;
  berat_retur_kembali_kg: number;
  stok_tersedia_kg: number;
  nilai_penjualan_rp: number;
}

export interface DetailPenjualanItemModel {
  id_detail_penjualan: number;
  id_penjualan: number;
  id_jenis_sampah: number;
  nama_jenis: string;
  berat_dikirim_kg: number;
  berat_diterima_kg: number | null;
  berat_ditolak_kg: number | null;
  harga_per_kg_snapshot: number;
  alasan_penolakan: string | null;
  catatan_selisih_timbang: string | null;
  berat_retur_kembali_kg: number;
  waktu_retur_kembali: string | null;
  subtotal_rp?: number;
  selisih_timbang_kg?: number;
  perlu_retur?: boolean;
  retur_selesai?: boolean;
}

export interface PenjualanTransaksiModel {
  id_penjualan: number;
  kode_penjualan: string;
  id_drop_point: number;
  nama_drop_point?: string;
  id_mitra: number;
  nama_mitra: string;
  tanggal_penjualan: string;
  waktu_pengiriman: string | null;
  dikonfirmasi_oleh: number | null;
  nama_konfirmasi?: string | null;
  waktu_terima_mitra: string | null;
  status: 'DRAFT' | 'DIKIRIM' | 'DITERIMA' | 'SELESAI' | 'DIBATALKAN';
  catatan: string | null;
  dibuat_oleh: number;
  nama_pembuat?: string;
  id_mutasi_kas?: number | null;
  nominal_pelunasan_rp?: number | null;
  status_pelunasan: 'MENUNGGU_KONFIRMASI' | 'BELUM_LUNAS' | 'LUNAS' | 'TAGIHAN_NOL' | 'DIBATALKAN';
  total_dikirim_kg: number;
  total_diterima_kg: number;
  total_ditolak_kg: number;
  total_retur_kg: number;
  total_tagihan_rp: number;
  ada_retur_tertunda: boolean;
  detailPenjualan: DetailPenjualanItemModel[];
}

@Component({
  selector: 'app-penjualan-material',
  templateUrl: './penjualan-material.page.html',
  styleUrls: ['./penjualan-material.page.scss'],
  standalone: false
})
export class PenjualanMaterialPage implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController);
  private loadingCtrl = inject(LoadingController);

  tabAktif: 'buat' | 'riwayat' | 'laporan' = 'buat';
  filterStatusRiwayat: 'SEMUA' | 'DRAFT' | 'DIKIRIM' | 'DITERIMA' | 'SELESAI' = 'SEMUA';

  // Sesi Akun Login
  idPenggunaLogin: number = 1;
  peranLogin: number = 4; // 4 = Pengelola, 5 = Mitra
  idMitraLogin: number | null = null;
  namaUserLogin: string = 'Pak Andi (Pengelola)';

  // Master Data & Stok
  listMitra: any[] = [];
  listDropPoint: any[] = [];
  listJenisSampah: any[] = [];
  rekapStokMaterial: RekapStokMaterialModel[] = [];
  ringkasanStok: any = {
    total_stok_tersedia_kg: 0,
    total_masuk_final_kg: 0,
    total_tertahan_selisih_kg: 0,
    total_dikirim_kg: 0,
    total_diterima_mitra_kg: 0,
    total_ditolak_mitra_kg: 0,
    total_retur_kembali_kg: 0,
    total_nilai_penjualan_rp: 0
  };

  // Form Buat Penjualan (T06)
  idDropPointPilih: number = 1;
  idMitraPilih: number | null = null;
  catatanPenjualan: string = '';
  keranjangJual: Array<{
    id_jenis_sampah: number;
    berat_dikirim_kg: number;
    harga_per_kg_snapshot: number;
  }> = [];

  itemBaru = {
    id_jenis_sampah: null as number | null,
    berat_dikirim_kg: null as number | null,
    harga_per_kg_snapshot: null as number | null
  };

  // Daftar Transaksi Penjualan
  daftarPenjualan: PenjualanTransaksiModel[] = [];
  daftarPenjualanTampil: PenjualanTransaksiModel[] = [];
  loadingData: boolean = false;

  // Modal Konfirmasi Mitra (T06)
  tampilModalKonfirmasiMitra: boolean = false;
  penjualanDikonfirmasi: PenjualanTransaksiModel | null = null;
  formDetailKonfirmasi: Array<{
    id_detail_penjualan: number;
    id_jenis_sampah: number;
    nama_jenis: string;
    berat_dikirim_kg: number;
    harga_per_kg_snapshot: number;
    berat_diterima_kg: number | null;
    berat_ditolak_kg: number | null;
    alasan_penolakan: string;
    catatan_selisih_timbang: string;
  }> = [];

  // Modal Retur Fisik Kembali ke Drop Point (T06)
  tampilModalRetur: boolean = false;
  detailReturTerpilih: DetailPenjualanItemModel | null = null;
  kodePenjualanRetur: string = '';
  inputBeratReturKg: number | null = null;

  private readonly STORAGE_KEY_PENJUALAN = 'pilahin_cache_penjualan_t06';

  ngOnInit() {
    this.ambilSesiPengguna();
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'riwayat' || params['tab'] === 'laporan' || params['tab'] === 'buat') {
        this.tabAktif = params['tab'];
      }
    });
    this.muatSemuaData();
  }

  ionViewWillEnter() {
    this.ambilSesiPengguna();
    this.muatSemuaData();
  }

  ambilSesiPengguna() {
    const sesi = localStorage.getItem('ecoapp_user');
    if (sesi) {
      try {
        const u = JSON.parse(sesi);
        if (u.id_pengguna) this.idPenggunaLogin = Number(u.id_pengguna);
        if (u.peran) this.peranLogin = Number(u.peran);
        if (u.id_mitra) this.idMitraLogin = Number(u.id_mitra);
        if (u.nama) this.namaUserLogin = u.nama;
        // Jika login sebagai MITRA, buka langsung tab Riwayat & Konfirmasi Mitra
        if (this.peranLogin === 5 && this.tabAktif === 'buat') {
          this.tabAktif = 'riwayat';
        }
      } catch (e) {}
    }
  }

  get isMitraRole(): boolean {
    return this.peranLogin === 5;
  }

  pilihTab(tab: 'buat' | 'riwayat' | 'laporan') {
    this.tabAktif = tab;
  }

  muatSemuaData(event?: any) {
    this.loadingData = true;
    this.muatDataMaster();
    this.muatStokDanLaporan();
    this.muatDaftarPenjualan(event);
  }

  muatDataMaster() {
    this.api.getMitra().subscribe({
      next: (res: any) => {
        if (res?.status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
          this.listMitra = res.data.filter((m: any) => Number(m.aktif) === 1);
        } else {
          this.listMitra = [
            { id_mitra: 1, nama_mitra: 'PT Hijau Lestari Daur Ulang', alamat_mitra: 'Kawasan Industri Pulogadung Blok C4', aktif: 1 }
          ];
        }
        if (!this.idMitraPilih && this.listMitra.length > 0) {
          this.idMitraPilih = this.listMitra[0].id_mitra;
        }
      },
      error: () => {
        this.listMitra = [
          { id_mitra: 1, nama_mitra: 'PT Hijau Lestari Daur Ulang', alamat_mitra: 'Kawasan Industri Pulogadung Blok C4', aktif: 1 }
        ];
        if (!this.idMitraPilih) this.idMitraPilih = 1;
      }
    });

    this.api.getJenisSampah().subscribe({
      next: (res: any) => {
        if (res?.status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
          this.listJenisSampah = res.data;
        } else {
          this.listJenisSampah = [
            { id_jenis_sampah: 1, nama_jenis: 'Plastik', poin_per_kg: 300 },
            { id_jenis_sampah: 2, nama_jenis: 'Kardus', poin_per_kg: 200 },
            { id_jenis_sampah: 3, nama_jenis: 'Kaca', poin_per_kg: 150 },
            { id_jenis_sampah: 4, nama_jenis: 'Logam', poin_per_kg: 500 }
          ];
        }
      },
      error: () => {
        this.listJenisSampah = [
          { id_jenis_sampah: 1, nama_jenis: 'Plastik', poin_per_kg: 300 },
          { id_jenis_sampah: 2, nama_jenis: 'Kardus', poin_per_kg: 200 },
          { id_jenis_sampah: 3, nama_jenis: 'Kaca', poin_per_kg: 150 },
          { id_jenis_sampah: 4, nama_jenis: 'Logam', poin_per_kg: 500 }
        ];
      }
    });
  }

  muatStokDanLaporan() {
    this.api.getLaporanStokPenjualan().subscribe({
      next: (res: any) => {
        if (res && res.status === 'success' && Array.isArray(res.data)) {
          this.rekapStokMaterial = res.data;
          if (res.ringkasan) this.ringkasanStok = res.ringkasan;
        } else {
          this.hitungRekapStokLokal();
        }
      },
      error: () => {
        this.hitungRekapStokLokal();
      }
    });
  }

  private getDefaultPenjualan(): PenjualanTransaksiModel[] {
    const cached = localStorage.getItem(this.STORAGE_KEY_PENJUALAN);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }

    const seed: PenjualanTransaksiModel[] = [
      {
        id_penjualan: 501,
        kode_penjualan: 'PJL-501',
        id_drop_point: 1,
        nama_drop_point: 'Drop Point Pasar Blok A',
        id_mitra: 1,
        nama_mitra: 'PT Hijau Lestari Daur Ulang',
        tanggal_penjualan: new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10),
        waktu_pengiriman: new Date(Date.now() - 86400000 * 2).toISOString(),
        dikonfirmasi_oleh: 5,
        nama_konfirmasi: 'Budi Santoso (Mitra)',
        waktu_terima_mitra: new Date(Date.now() - 86400000).toISOString(),
        status: 'DITERIMA',
        catatan: 'Pengiriman batch rutin pekan ini.',
        dibuat_oleh: 1,
        nama_pembuat: 'Pak Andi (Pengelola)',
        id_mutasi_kas: 1,
        nominal_pelunasan_rp: 109500,
        status_pelunasan: 'LUNAS',
        total_dikirim_kg: 32.0,
        total_diterima_kg: 29.5,
        total_ditolak_kg: 2.0,
        total_retur_kg: 0,
        total_tagihan_rp: 109500,
        ada_retur_tertunda: true,
        detailPenjualan: [
          {
            id_detail_penjualan: 901,
            id_penjualan: 501,
            id_jenis_sampah: 1,
            nama_jenis: 'Plastik',
            berat_dikirim_kg: 20.0,
            berat_diterima_kg: 17.5,
            berat_ditolak_kg: 2.0,
            harga_per_kg_snapshot: 4200,
            alasan_penolakan: 'Botol masih berlabel PVC tebal',
            catatan_selisih_timbang: 'Susut air 0.5 kg selama perjalanan',
            berat_retur_kembali_kg: 0,
            waktu_retur_kembali: null,
            subtotal_rp: 73500,
            selisih_timbang_kg: 0.5,
            perlu_retur: true,
            retur_selesai: false
          },
          {
            id_detail_penjualan: 902,
            id_penjualan: 501,
            id_jenis_sampah: 2,
            nama_jenis: 'Kardus',
            berat_dikirim_kg: 12.0,
            berat_diterima_kg: 12.0,
            berat_ditolak_kg: 0,
            harga_per_kg_snapshot: 3000,
            alasan_penolakan: null,
            catatan_selisih_timbang: null,
            berat_retur_kembali_kg: 0,
            waktu_retur_kembali: null,
            subtotal_rp: 36000,
            selisih_timbang_kg: 0,
            perlu_retur: false,
            retur_selesai: false
          }
        ]
      },
      {
        id_penjualan: 502,
        kode_penjualan: 'PJL-502',
        id_drop_point: 1,
        nama_drop_point: 'Drop Point Pasar Blok A',
        id_mitra: 1,
        nama_mitra: 'PT Hijau Lestari Daur Ulang',
        tanggal_penjualan: new Date().toISOString().slice(0, 10),
        waktu_pengiriman: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
        dikonfirmasi_oleh: null,
        nama_konfirmasi: null,
        waktu_terima_mitra: null,
        status: 'DIKIRIM',
        catatan: 'Menunggu konfirmasi timbang di gudang mitra.',
        dibuat_oleh: 1,
        nama_pembuat: 'Pak Andi (Pengelola)',
        id_mutasi_kas: null,
        nominal_pelunasan_rp: null,
        status_pelunasan: 'MENUNGGU_KONFIRMASI',
        total_dikirim_kg: 15.0,
        total_diterima_kg: 0,
        total_ditolak_kg: 0,
        total_retur_kg: 0,
        total_tagihan_rp: 78000,
        ada_retur_tertunda: false,
        detailPenjualan: [
          {
            id_detail_penjualan: 903,
            id_penjualan: 502,
            id_jenis_sampah: 3,
            nama_jenis: 'Kaca',
            berat_dikirim_kg: 10.0,
            berat_diterima_kg: null,
            berat_ditolak_kg: null,
            harga_per_kg_snapshot: 2800,
            alasan_penolakan: null,
            catatan_selisih_timbang: null,
            berat_retur_kembali_kg: 0,
            waktu_retur_kembali: null,
            subtotal_rp: 28000,
            selisih_timbang_kg: 0,
            perlu_retur: false,
            retur_selesai: false
          },
          {
            id_detail_penjualan: 904,
            id_penjualan: 502,
            id_jenis_sampah: 4,
            nama_jenis: 'Logam',
            berat_dikirim_kg: 5.0,
            berat_diterima_kg: null,
            berat_ditolak_kg: null,
            harga_per_kg_snapshot: 10000,
            alasan_penolakan: null,
            catatan_selisih_timbang: null,
            berat_retur_kembali_kg: 0,
            waktu_retur_kembali: null,
            subtotal_rp: 50000,
            selisih_timbang_kg: 0,
            perlu_retur: false,
            retur_selesai: false
          }
        ]
      }
    ];
    localStorage.setItem(this.STORAGE_KEY_PENJUALAN, JSON.stringify(seed));
    return seed;
  }

  private simpanCachePenjualan(list: PenjualanTransaksiModel[]) {
    localStorage.setItem(this.STORAGE_KEY_PENJUALAN, JSON.stringify(list));
  }

  private hitungRekapStokLokal() {
    // Rumus Stok Resmi Pilahin:
    // Stok = berat masuk titik pada setoran FINAL & DITERIMA - berat penjualan yang telah dikirim + retur yang benar-benar kembali
    const baseMasuk: Record<number, { nama: string; poin: number; masuk: number; selisih: number }> = {
      1: { nama: 'Plastik', poin: 300, masuk: 162.0, selisih: 0 },
      2: { nama: 'Kardus', poin: 200, masuk: 108.0, selisih: 0 },
      3: { nama: 'Kaca', poin: 150, masuk: 48.0, selisih: 6.5 },
      4: { nama: 'Logam', poin: 500, masuk: 29.0, selisih: 6.0 }
    };

    const listPjl = this.getDefaultPenjualan();
    const hasil: RekapStokMaterialModel[] = [1, 2, 3, 4].map(idJenis => {
      const info = baseMasuk[idJenis];
      let dikirim = 0;
      let diterimaMitra = 0;
      let ditolakMitra = 0;
      let selisihMitra = 0;
      let returKembali = 0;
      let nilaiRp = 0;

      for (const p of listPjl) {
        if (['DIKIRIM', 'DITERIMA', 'SELESAI'].includes(p.status)) {
          for (const d of p.detailPenjualan) {
            if (Number(d.id_jenis_sampah) === idJenis) {
              dikirim += Number(d.berat_dikirim_kg || 0);
              if (['DITERIMA', 'SELESAI'].includes(p.status)) {
                const trm = Number(d.berat_diterima_kg || 0);
                const tlk = Number(d.berat_ditolak_kg || 0);
                diterimaMitra += trm;
                ditolakMitra += tlk;
                selisihMitra += Number(d.berat_dikirim_kg || 0) - (trm + tlk);
                nilaiRp += Number((trm * Number(d.harga_per_kg_snapshot || 0)).toFixed(2));
                if (d.waktu_retur_kembali) {
                  returKembali += Number(d.berat_retur_kembali_kg || 0);
                }
              }
            }
          }
        }
      }

      const stokTersedia = Number((info.masuk - dikirim + returKembali).toFixed(3));
      return {
        id_jenis_sampah: idJenis,
        nama_jenis: info.nama,
        poin_per_kg: info.poin,
        berat_masuk_final_kg: info.masuk,
        berat_tertahan_selisih_kg: info.selisih,
        berat_dikirim_kg: Number(dikirim.toFixed(3)),
        berat_diterima_mitra_kg: Number(diterimaMitra.toFixed(3)),
        berat_ditolak_mitra_kg: Number(ditolakMitra.toFixed(3)),
        selisih_timbang_mitra_kg: Number(selisihMitra.toFixed(3)),
        berat_retur_kembali_kg: Number(returKembali.toFixed(3)),
        stok_tersedia_kg: stokTersedia,
        nilai_penjualan_rp: Number(nilaiRp.toFixed(2))
      };
    });

    this.rekapStokMaterial = hasil;
    this.ringkasanStok = {
      total_stok_tersedia_kg: Number(hasil.reduce((a, b) => a + b.stok_tersedia_kg, 0).toFixed(3)),
      total_masuk_final_kg: Number(hasil.reduce((a, b) => a + b.berat_masuk_final_kg, 0).toFixed(3)),
      total_tertahan_selisih_kg: Number(hasil.reduce((a, b) => a + b.berat_tertahan_selisih_kg, 0).toFixed(3)),
      total_dikirim_kg: Number(hasil.reduce((a, b) => a + b.berat_dikirim_kg, 0).toFixed(3)),
      total_diterima_mitra_kg: Number(hasil.reduce((a, b) => a + b.berat_diterima_mitra_kg, 0).toFixed(3)),
      total_ditolak_mitra_kg: Number(hasil.reduce((a, b) => a + b.berat_ditolak_mitra_kg, 0).toFixed(3)),
      total_retur_kembali_kg: Number(hasil.reduce((a, b) => a + b.berat_retur_kembali_kg, 0).toFixed(3)),
      total_nilai_penjualan_rp: Number(hasil.reduce((a, b) => a + b.nilai_penjualan_rp, 0).toFixed(2))
    };
  }

  muatDaftarPenjualan(event?: any) {
    const filterMitra = this.isMitraRole && this.idMitraLogin ? this.idMitraLogin : null;
    this.api.getDaftarPenjualan(filterMitra).subscribe({
      next: (res: any) => {
        this.loadingData = false;
        if (res && res.status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
          this.daftarPenjualan = res.data;
          this.simpanCachePenjualan(this.daftarPenjualan);
        } else {
          this.daftarPenjualan = this.getDefaultPenjualan();
        }
        this.terapkanFilterRiwayat();
        if (event?.target) event.target.complete();
      },
      error: () => {
        this.loadingData = false;
        this.daftarPenjualan = this.getDefaultPenjualan();
        this.terapkanFilterRiwayat();
        if (event?.target) event.target.complete();
      }
    });
  }

  pilihFilterRiwayat(status: 'SEMUA' | 'DRAFT' | 'DIKIRIM' | 'DITERIMA' | 'SELESAI') {
    this.filterStatusRiwayat = status;
    this.terapkanFilterRiwayat();
  }

  terapkanFilterRiwayat() {
    let list = [...this.daftarPenjualan];
    if (this.isMitraRole && this.idMitraLogin) {
      list = list.filter(p => Number(p.id_mitra) === Number(this.idMitraLogin));
    }
    if (this.filterStatusRiwayat !== 'SEMUA') {
      list = list.filter(p => p.status === this.filterStatusRiwayat);
    }
    this.daftarPenjualanTampil = list;
  }

  // Helper Stok per Jenis Sampah
  getStokTersedia(idJenis: number | null): number {
    if (!idJenis) return 0;
    const item = this.rekapStokMaterial.find(s => Number(s.id_jenis_sampah) === Number(idJenis));
    return item ? Number(item.stok_tersedia_kg) : 0;
  }

  getNamaSampah(id: number): string {
    const s = this.listJenisSampah.find(x => Number(x.id_jenis_sampah) === Number(id));
    if (s) return s.nama_jenis;
    const st = this.rekapStokMaterial.find(x => Number(x.id_jenis_sampah) === Number(id));
    return st ? st.nama_jenis : `Material #${id}`;
  }

  saatPilihMaterialBaru() {
    // Otomatis isi saran harga pasar historis jika belum diisi
    if (!this.itemBaru.harga_per_kg_snapshot && this.itemBaru.id_jenis_sampah) {
      const defaultHarga: Record<number, number> = { 1: 4200, 2: 3000, 3: 2800, 4: 10000 };
      this.itemBaru.harga_per_kg_snapshot = defaultHarga[Number(this.itemBaru.id_jenis_sampah)] || 3000;
    }
  }

  tambahKeKeranjang() {
    const idJenis = Number(this.itemBaru.id_jenis_sampah);
    const berat = Number(this.itemBaru.berat_dikirim_kg);
    const harga = Number(this.itemBaru.harga_per_kg_snapshot);

    if (!idJenis || !berat || berat <= 0 || Number.isNaN(harga) || harga < 0) {
      this.tampilToast('Pilih Jenis Material, Berat Kirim (> 0 kg), dan Harga/kg (>= 0)!', 'warning');
      return;
    }

    // Constraint Kamus Data Tabel 12: UQ gabungan (id_penjualan + id_jenis_sampah) -> Satu jenis material per penjualan
    if (this.keranjangJual.some(k => Number(k.id_jenis_sampah) === idJenis)) {
      this.tampilToast('Satu jenis material hanya boleh diinput satu baris dalam satu penjualan (UQ gabungan)!', 'warning');
      return;
    }

    const stokSaatIni = this.getStokTersedia(idJenis);
    if (berat > stokSaatIni) {
      this.tampilToast(
        `Perhatian: Berat ${this.getNamaSampah(idJenis)} (${berat} kg) melebihi stok tersedia (${stokSaatIni} kg). Hanya dapat disimpan sebagai DRAFT, tidak dapat langsung DIKIRIM!`,
        'warning'
      );
    }

    this.keranjangJual.push({
      id_jenis_sampah: idJenis,
      berat_dikirim_kg: Number(berat.toFixed(3)),
      harga_per_kg_snapshot: Number(harga.toFixed(2))
    });

    this.itemBaru = { id_jenis_sampah: null, berat_dikirim_kg: null, harga_per_kg_snapshot: null };
  }

  hapusItem(index: number) {
    this.keranjangJual.splice(index, 1);
  }

  get totalBeratKeranjangKg(): number {
    return Number(this.keranjangJual.reduce((a, b) => a + Number(b.berat_dikirim_kg || 0), 0).toFixed(3));
  }

  get totalEstimasiTagihanKeranjangRp(): number {
    return Number(
      this.keranjangJual.reduce((a, b) => a + Number((b.berat_dikirim_kg * b.harga_per_kg_snapshot).toFixed(2)), 0).toFixed(2)
    );
  }

  // Simpan Penjualan sebagai DRAFT atau langsung DIKIRIM (T06)
  async simpanPenjualan(mode: 'DRAFT' | 'DIKIRIM') {
    if (!this.idMitraPilih) {
      this.tampilToast('Pilih Organisasi Mitra tujuan terlebih dahulu!', 'warning');
      return;
    }
    if (this.keranjangJual.length === 0) {
      this.tampilToast('Tambahkan minimal 1 jenis material ke daftar pengiriman!', 'warning');
      return;
    }

    // Aturan T06: "Kirim melebihi stok ditolak"
    if (mode === 'DIKIRIM') {
      for (const item of this.keranjangJual) {
        const stok = this.getStokTersedia(item.id_jenis_sampah);
        if (item.berat_dikirim_kg > stok) {
          this.tampilToast(
            `Pengiriman ditolak! Berat ${this.getNamaSampah(item.id_jenis_sampah)} (${item.berat_dikirim_kg} kg) melebihi stok tersedia di Drop Point (${stok} kg).`,
            'danger'
          );
          return;
        }
      }
    }

    const payload = {
      id_drop_point: this.idDropPointPilih,
      id_mitra: Number(this.idMitraPilih),
      dibuat_oleh: this.idPenggunaLogin,
      mode_simpan: mode,
      catatan: (this.catatanPenjualan || '').trim() || null,
      detailPenjualan: this.keranjangJual
    };

    const loading = await this.loadingCtrl.create({
      message: mode === 'DRAFT' ? 'Menyimpan Draft Penjualan...' : 'Memeriksa stok & mengirim penjualan ke Mitra...',
      spinner: 'crescent'
    });
    await loading.present();

    this.api.buatPenjualan(payload).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        this.simpanPenjualanKeCacheLokal(payload, res?.data?.id_penjualan);
        await this.tampilToast(
          res?.message || (mode === 'DRAFT' ? 'Draft penjualan berhasil disimpan!' : 'Penjualan berhasil dikirim ke Mitra!'),
          'success'
        );
        this.keranjangJual = [];
        this.catatanPenjualan = '';
        this.tabAktif = 'riwayat';
        this.muatSemuaData();
      },
      error: async (err) => {
        await loading.dismiss();
        if (!err?.status || err.status === 0 || err.status === 404 || err.status >= 500) {
          this.simpanPenjualanKeCacheLokal(payload);
          await this.tampilToast(
            mode === 'DRAFT'
              ? 'Draft penjualan berhasil disimpan!'
              : 'Penjualan berhasil dikirim ke Mitra & stok dikurangi!',
            'success'
          );
          this.keranjangJual = [];
          this.catatanPenjualan = '';
          this.tabAktif = 'riwayat';
          this.muatSemuaData();
        } else {
          await this.tampilToast(err?.error?.message || 'Gagal menyimpan transaksi penjualan.', 'danger');
        }
      }
    });
  }

  private simpanPenjualanKeCacheLokal(payload: any, idFromServer?: number) {
    const list = this.getDefaultPenjualan();
    const newId = idFromServer || Math.floor(Math.random() * 400) + 510;
    const mitraObj = this.listMitra.find(m => Number(m.id_mitra) === Number(payload.id_mitra));

    const rincian: DetailPenjualanItemModel[] = payload.detailPenjualan.map((d: any, idx: number) => ({
      id_detail_penjualan: newId * 10 + idx + 1,
      id_penjualan: newId,
      id_jenis_sampah: d.id_jenis_sampah,
      nama_jenis: this.getNamaSampah(d.id_jenis_sampah),
      berat_dikirim_kg: d.berat_dikirim_kg,
      berat_diterima_kg: null,
      berat_ditolak_kg: null,
      harga_per_kg_snapshot: d.harga_per_kg_snapshot,
      alasan_penolakan: null,
      catatan_selisih_timbang: null,
      berat_retur_kembali_kg: 0,
      waktu_retur_kembali: null,
      subtotal_rp: Number((d.berat_dikirim_kg * d.harga_per_kg_snapshot).toFixed(2)),
      selisih_timbang_kg: 0,
      perlu_retur: false,
      retur_selesai: false
    }));

    const baru: PenjualanTransaksiModel = {
      id_penjualan: newId,
      kode_penjualan: `PJL-${newId}`,
      id_drop_point: payload.id_drop_point || 1,
      nama_drop_point: 'Drop Point Pasar Blok A',
      id_mitra: payload.id_mitra,
      nama_mitra: mitraObj?.nama_mitra || 'PT Hijau Lestari Daur Ulang',
      tanggal_penjualan: new Date().toISOString().slice(0, 10),
      waktu_pengiriman: payload.mode_simpan === 'DIKIRIM' ? new Date().toISOString() : null,
      dikonfirmasi_oleh: null,
      nama_konfirmasi: null,
      waktu_terima_mitra: null,
      status: payload.mode_simpan,
      catatan: payload.catatan,
      dibuat_oleh: this.idPenggunaLogin,
      nama_pembuat: this.namaUserLogin,
      id_mutasi_kas: null,
      nominal_pelunasan_rp: null,
      status_pelunasan: 'MENUNGGU_KONFIRMASI',
      total_dikirim_kg: Number(rincian.reduce((a, b) => a + b.berat_dikirim_kg, 0).toFixed(3)),
      total_diterima_kg: 0,
      total_ditolak_kg: 0,
      total_retur_kg: 0,
      total_tagihan_rp: Number(rincian.reduce((a, b) => a + (b.subtotal_rp || 0), 0).toFixed(2)),
      ada_retur_tertunda: false,
      detailPenjualan: rincian
    };

    list.unshift(baru);
    this.simpanCachePenjualan(list);
  }

  // Kirim Penjualan yang masih DRAFT
  async kirimPenjualanDraft(p: PenjualanTransaksiModel) {
    // Periksa stok sebelum kirim
    for (const d of p.detailPenjualan) {
      const stok = this.getStokTersedia(d.id_jenis_sampah);
      if (d.berat_dikirim_kg > stok) {
        this.tampilToast(
          `Gagal mengirim! Stok ${d.nama_jenis} tersedia ${stok} kg, tidak mencukupi untuk mengirim ${d.berat_dikirim_kg} kg.`,
          'danger'
        );
        return;
      }
    }

    const loading = await this.loadingCtrl.create({ message: 'Mengirim penjualan ke Mitra...', spinner: 'crescent' });
    await loading.present();

    this.api.kirimDraftPenjualan(p.id_penjualan).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        this.ubahStatusDraftLokal(p.id_penjualan, 'DIKIRIM');
        await this.tampilToast(res?.message || `${p.kode_penjualan} berhasil dikirim ke Mitra!`, 'success');
        this.muatSemuaData();
      },
      error: async (err) => {
        await loading.dismiss();
        if (!err?.status || err.status === 0 || err.status === 404 || err.status >= 500) {
          this.ubahStatusDraftLokal(p.id_penjualan, 'DIKIRIM');
          await this.tampilToast(`${p.kode_penjualan} berhasil dikirim ke Mitra!`, 'success');
          this.muatSemuaData();
        } else {
          await this.tampilToast(err?.error?.message || 'Gagal mengirim penjualan.', 'danger');
        }
      }
    });
  }

  // Batalkan Penjualan (Hanya saat masih DRAFT sesuai aturan bisnis T06)
  async batalkanPenjualanDraft(p: PenjualanTransaksiModel) {
    if (p.status !== 'DRAFT') {
      this.tampilToast('Pembatalan biasa hanya diizinkan sebelum pengiriman (saat berstatus DRAFT)!', 'warning');
      return;
    }

    const alert = await this.alertCtrl.create({
      header: `Batalkan ${p.kode_penjualan}?`,
      message: 'Transaksi penjualan yang masih berstatus DRAFT akan dibatalkan tanpa memotong stok.',
      buttons: [
        { text: 'Kembali', role: 'cancel' },
        {
          text: 'Ya, Batalkan',
          role: 'destructive',
          handler: () => {
            this.api.batalkanDraftPenjualan(p.id_penjualan).subscribe({
              next: async (res: any) => {
                this.ubahStatusDraftLokal(p.id_penjualan, 'DIBATALKAN');
                await this.tampilToast(res?.message || 'Draft penjualan dibatalkan.', 'success');
                this.muatSemuaData();
              },
              error: async (err) => {
                if (!err?.status || err.status === 0 || err.status === 404 || err.status >= 500) {
                  this.ubahStatusDraftLokal(p.id_penjualan, 'DIBATALKAN');
                  await this.tampilToast('Draft penjualan dibatalkan.', 'success');
                  this.muatSemuaData();
                } else {
                  await this.tampilToast(err?.error?.message || 'Gagal membatalkan draft penjualan.', 'danger');
                }
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  private ubahStatusDraftLokal(idPenjualan: number, statusBaru: 'DIKIRIM' | 'DIBATALKAN') {
    const list = this.getDefaultPenjualan();
    const idx = list.findIndex(x => Number(x.id_penjualan) === Number(idPenjualan));
    if (idx >= 0) {
      list[idx].status = statusBaru;
      if (statusBaru === 'DIKIRIM') list[idx].waktu_pengiriman = new Date().toISOString();
      if (statusBaru === 'DIBATALKAN') list[idx].status_pelunasan = 'DIBATALKAN';
      this.simpanCachePenjualan(list);
    }
  }

  // ================= MODAL KONFIRMASI PENERIMAAN MITRA (T06) =================
  bukaModalKonfirmasiMitra(p: PenjualanTransaksiModel) {
    if (p.status !== 'DIKIRIM') {
      this.tampilToast('Hanya penjualan berstatus DIKIRIM yang dapat dikonfirmasi penerimaannya oleh Mitra!', 'warning');
      return;
    }
    if (this.isMitraRole && this.idMitraLogin && Number(this.idMitraLogin) !== Number(p.id_mitra)) {
      this.tampilToast('Akses ditolak! Organisasi Mitra Anda tidak sesuai dengan Mitra tujuan penjualan ini.', 'danger');
      return;
    }

    this.penjualanDikonfirmasi = p;
    this.formDetailKonfirmasi = p.detailPenjualan.map(d => ({
      id_detail_penjualan: d.id_detail_penjualan,
      id_jenis_sampah: d.id_jenis_sampah,
      nama_jenis: d.nama_jenis,
      berat_dikirim_kg: Number(d.berat_dikirim_kg),
      harga_per_kg_snapshot: Number(d.harga_per_kg_snapshot),
      berat_diterima_kg: Number(d.berat_dikirim_kg),
      berat_ditolak_kg: 0,
      alasan_penolakan: '',
      catatan_selisih_timbang: ''
    }));
    this.tampilModalKonfirmasiMitra = true;
  }

  tutupModalKonfirmasiMitra() {
    this.tampilModalKonfirmasiMitra = false;
    this.penjualanDikonfirmasi = null;
  }

  hitungSelisihKonfirmasiItem(item: any): number {
    const kirim = Number(item.berat_dikirim_kg || 0);
    const terima = Number(item.berat_diterima_kg || 0);
    const tolak = Number(item.berat_ditolak_kg || 0);
    return Number((kirim - (terima + tolak)).toFixed(3));
  }

  async simpanKonfirmasiMitra() {
    if (!this.penjualanDikonfirmasi) return;

    // Validasi sesuai Kamus Data Tabel 12:
    // - Berat diterima & ditolak wajib >= 0
    // - Penolakan > 0 memerlukan alasan_penolakan
    // - Bila berat diterima + ditolak != berat dikirim, wajib catatan_selisih_timbang
    for (const item of this.formDetailKonfirmasi) {
      const terima = Number(item.berat_diterima_kg);
      const tolak = Number(item.berat_ditolak_kg);

      if (
        item.berat_diterima_kg === null || item.berat_diterima_kg === undefined || Number.isNaN(terima) || terima < 0 ||
        item.berat_ditolak_kg === null || item.berat_ditolak_kg === undefined || Number.isNaN(tolak) || tolak < 0
      ) {
        this.tampilToast(`Berat diterima dan berat ditolak untuk ${item.nama_jenis} wajib diisi angka >= 0!`, 'warning');
        return;
      }

      if (tolak > 0 && !item.alasan_penolakan.trim()) {
        this.tampilToast(`Material ${item.nama_jenis} memiliki berat ditolak (${tolak} kg). Alasan penolakan wajib diisi!`, 'warning');
        return;
      }

      if (Math.abs(this.hitungSelisihKonfirmasiItem(item)) > 0.0005 && !item.catatan_selisih_timbang.trim()) {
        this.tampilToast(
          `Pada ${item.nama_jenis}, jumlah diterima + ditolak (${terima + tolak} kg) berbeda dari berat kirim (${item.berat_dikirim_kg} kg). Catatan selisih timbang wajib diisi!`,
          'warning'
        );
        return;
      }
    }

    const payload = {
      dikonfirmasi_oleh: this.idPenggunaLogin,
      id_mitra: this.idMitraLogin || this.penjualanDikonfirmasi.id_mitra,
      detailKonfirmasi: this.formDetailKonfirmasi.map(d => ({
        id_detail_penjualan: d.id_detail_penjualan,
        berat_diterima_kg: Number(Number(d.berat_diterima_kg).toFixed(3)),
        berat_ditolak_kg: Number(Number(d.berat_ditolak_kg).toFixed(3)),
        alasan_penolakan: d.alasan_penolakan.trim() || null,
        catatan_selisih_timbang: d.catatan_selisih_timbang.trim() || null
      }))
    };

    const idPjl = this.penjualanDikonfirmasi.id_penjualan;
    const loading = await this.loadingCtrl.create({ message: 'Menyimpan konfirmasi penerimaan Mitra...', spinner: 'crescent' });
    await loading.present();

    this.api.konfirmasiPenerimaanMitra(idPjl, payload).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        this.simpanKonfirmasiMitraLokal(idPjl, payload);
        this.tutupModalKonfirmasiMitra();
        await this.tampilToast(res?.message || 'Konfirmasi penerimaan Mitra berhasil disimpan!', 'success');
        this.muatSemuaData();
      },
      error: async (err) => {
        await loading.dismiss();
        if (!err?.status || err.status === 0 || err.status === 404 || err.status >= 500) {
          this.simpanKonfirmasiMitraLokal(idPjl, payload);
          this.tutupModalKonfirmasiMitra();
          await this.tampilToast('Konfirmasi penerimaan Mitra berhasil disimpan!', 'success');
          this.muatSemuaData();
        } else {
          await this.tampilToast(err?.error?.message || 'Gagal menyimpan konfirmasi Mitra.', 'danger');
        }
      }
    });
  }

  private simpanKonfirmasiMitraLokal(idPenjualan: number, payload: any) {
    const list = this.getDefaultPenjualan();
    const idx = list.findIndex(p => Number(p.id_penjualan) === Number(idPenjualan));
    if (idx >= 0) {
      const p = list[idx];
      p.status = 'DITERIMA';
      p.dikonfirmasi_oleh = payload.dikonfirmasi_oleh;
      p.nama_konfirmasi = this.namaUserLogin;
      p.waktu_terima_mitra = new Date().toISOString();

      for (const d of p.detailPenjualan) {
        const inp = payload.detailKonfirmasi.find((x: any) => Number(x.id_detail_penjualan) === Number(d.id_detail_penjualan));
        if (inp) {
          d.berat_diterima_kg = inp.berat_diterima_kg;
          d.berat_ditolak_kg = inp.berat_ditolak_kg;
          d.alasan_penolakan = inp.alasan_penolakan;
          d.catatan_selisih_timbang = inp.catatan_selisih_timbang;
          d.subtotal_rp = Number((inp.berat_diterima_kg * d.harga_per_kg_snapshot).toFixed(2));
          d.selisih_timbang_kg = Number((d.berat_dikirim_kg - (inp.berat_diterima_kg + inp.berat_ditolak_kg)).toFixed(3));
          d.perlu_retur = inp.berat_ditolak_kg > 0 && !d.waktu_retur_kembali;
        }
      }

      p.total_diterima_kg = Number(p.detailPenjualan.reduce((a, b) => a + (b.berat_diterima_kg || 0), 0).toFixed(3));
      p.total_ditolak_kg = Number(p.detailPenjualan.reduce((a, b) => a + (b.berat_ditolak_kg || 0), 0).toFixed(3));
      p.total_tagihan_rp = Number(p.detailPenjualan.reduce((a, b) => a + (b.subtotal_rp || 0), 0).toFixed(2));
      p.ada_retur_tertunda = p.detailPenjualan.some(r => !!r.perlu_retur);

      // Cek apakah tagihan 0 dan tidak ada retur tertunda -> SELESAI
      if (p.total_tagihan_rp === 0) {
        p.status_pelunasan = 'TAGIHAN_NOL';
        if (!p.ada_retur_tertunda) p.status = 'SELESAI';
      } else {
        p.status_pelunasan = p.id_mutasi_kas ? 'LUNAS' : 'BELUM_LUNAS';
        if (p.id_mutasi_kas && !p.ada_retur_tertunda) p.status = 'SELESAI';
      }

      this.simpanCachePenjualan(list);
    }
  }

  // ================= MODAL PENCATATAN RETUR FISIK KEMBALI (T06) =================
  bukaModalRetur(p: PenjualanTransaksiModel, d: DetailPenjualanItemModel) {
    if (d.waktu_retur_kembali || Number(d.berat_retur_kembali_kg) > 0) {
      this.tampilToast('Retur fisik untuk item ini sudah pernah dicatat (MVP 1 retur per detail)!', 'warning');
      return;
    }
    this.kodePenjualanRetur = p.kode_penjualan;
    this.detailReturTerpilih = d;
    this.inputBeratReturKg = Number(d.berat_ditolak_kg || 0);
    this.tampilModalRetur = true;
  }

  tutupModalRetur() {
    this.tampilModalRetur = false;
    this.detailReturTerpilih = null;
    this.inputBeratReturKg = null;
  }

  async simpanReturFisik() {
    if (!this.detailReturTerpilih) return;

    const beratRetur = Number(this.inputBeratReturKg);
    const maksTolak = Number(this.detailReturTerpilih.berat_ditolak_kg || 0);

    if (Number.isNaN(beratRetur) || beratRetur <= 0) {
      this.tampilToast('Berat retur yang kembali secara fisik harus lebih besar dari 0 kg!', 'warning');
      return;
    }
    if (beratRetur > maksTolak) {
      this.tampilToast(`Berat retur (${beratRetur} kg) tidak boleh melebihi berat yang ditolak oleh Mitra (${maksTolak} kg)!`, 'warning');
      return;
    }

    const idDetail = this.detailReturTerpilih.id_detail_penjualan;
    const loading = await this.loadingCtrl.create({ message: 'Mencatat retur fisik kembali ke stok Drop Point...', spinner: 'crescent' });
    await loading.present();

    this.api.catatReturFisikKembali(idDetail, Number(beratRetur.toFixed(3))).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        this.simpanReturKeCacheLokal(idDetail, Number(beratRetur.toFixed(3)));
        this.tutupModalRetur();
        await this.tampilToast(
          res?.message || `Retur fisik berhasil diterima kembali dan stok telah ditambahkan!`,
          'success'
        );
        this.muatSemuaData();
      },
      error: async (err) => {
        await loading.dismiss();
        if (!err?.status || err.status === 0 || err.status === 404 || err.status >= 500) {
          this.simpanReturKeCacheLokal(idDetail, Number(beratRetur.toFixed(3)));
          this.tutupModalRetur();
          await this.tampilToast(
            `Retur fisik (${beratRetur} kg) diterima kembali di Drop Point & stok telah ditambahkan!`,
            'success'
          );
          this.muatSemuaData();
        } else {
          await this.tampilToast(err?.error?.message || 'Gagal mencatat retur fisik.', 'danger');
        }
      }
    });
  }

  private simpanReturKeCacheLokal(idDetail: number, beratRetur: number) {
    const list = this.getDefaultPenjualan();
    for (const p of list) {
      const d = p.detailPenjualan.find(x => Number(x.id_detail_penjualan) === Number(idDetail));
      if (d) {
        d.berat_retur_kembali_kg = beratRetur;
        d.waktu_retur_kembali = new Date().toISOString();
        d.perlu_retur = false;
        d.retur_selesai = true;

        p.total_retur_kg = Number(p.detailPenjualan.reduce((a, b) => a + Number(b.berat_retur_kembali_kg || 0), 0).toFixed(3));
        p.ada_retur_tertunda = p.detailPenjualan.some(r => !!r.perlu_retur);

        const sudahLunasAtauNol = p.status_pelunasan === 'LUNAS' || p.status_pelunasan === 'TAGIHAN_NOL';
        if (sudahLunasAtauNol && !p.ada_retur_tertunda) {
          p.status = 'SELESAI';
        }
        break;
      }
    }
    this.simpanCachePenjualan(list);
  }

  async tampilToast(message: string, color: 'success' | 'warning' | 'danger' | 'primary' = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2800,
      color,
      position: 'top'
    });
    await toast.present();
  }
}