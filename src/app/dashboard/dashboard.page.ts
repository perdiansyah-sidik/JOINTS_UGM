import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  // 1. Tambahkan 3 variabel penampung yang dicari oleh HTML:
  loading: boolean = false;
  error: string | null = null;
  data: any = null;

  // Data sesuai struktur yang dipanggil di dashboard.page.html
  data: any = {
    pelanggan: {
      nama: 'Bu Sari',
      jenis_pelanggan: 'PEDAGANG_PASAR',
      alamat: 'Pasar Blok A, Kios 14'
    },
    poin: {
      tersedia: 4320,
      dalamPencairan: 0,
      minimalPencairan: 1000,
      nilaiPerPoin: 10
    }
  };

  lokasi: string = 'Pasar Blok A, Kios 14';
  jenisLabel: string = 'Pedagang Pasar';
  greeting: string = 'pagi';

  quickActions = [
    { label: 'Riwayat Setor', icon: 'receipt-outline', link: '/riwayat' },
    { label: 'Pesan Jemput', icon: 'calendar-outline', link: '/pesan-jemput' },
    { label: 'Drop Point', icon: 'location-outline', link: '/drop-point' },
    { label: 'Panduan', icon: 'book-outline', link: '/panduan' }
  ];

  totalKg: number = 25;
  wastes = [
    { name: 'Plastik', kg: 12, percent: 48, color: '#2563eb' },
    { name: 'Kardus', kg: 8, percent: 32, color: '#f59e0b' },
    { name: 'Kaca', kg: 3, percent: 12, color: '#0d9488' },
    { name: 'Logam', kg: 2, percent: 8, color: '#475569' }
  ];

  pickup: any = {
    hari: 'SEL',
    tanggal: '14',
    kode: 'STR-000123',
    info: "Kurir 'Pak Joko' • 08.00 - 10.00",
    potongan: 10,
    cls: 'terjadwal',
    label: 'Terjadwal'
  };

  constructor() {}

  ngOnInit() {
    this.setGreeting();
    this.load();
  }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour < 11) this.greeting = 'pagi';
    else if (hour < 15) this.greeting = 'siang';
    else if (hour < 19) this.greeting = 'sore';
    else this.greeting = 'malam';
  }

  get canWithdraw(): boolean {
    if (!this.data?.poin) return false;
    return this.data.poin.tersedia >= this.data.poin.minimalPencairan;
  }

  get nominal(): number {
    if (!this.data?.poin) return 0;
    return this.data.poin.tersedia * (this.data.poin.nilaiPerPoin || 10);
  }

  load(event?: any) {
    this.loading = true;
    this.error = null;

    setTimeout(() => {
      this.loading = false;
      if (event && event.target) {
        event.target.complete();
      }
    }, 300);
  }

  fmt(val: number | undefined | null, decimals: number = 0): string {
    if (val === null || val === undefined) return '0';
    return Number(val).toLocaleString('id-ID', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }
  }
}