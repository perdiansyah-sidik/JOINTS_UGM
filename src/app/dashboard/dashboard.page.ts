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
  error: boolean = false;
  data: any = null;

  constructor() { }

  ngOnInit() {
  }

  load(event: any) {
    setTimeout(() => {
      // Memastikan event.target ada sebelum dijalankan agar tidak error
      if (event && event.target) {
        event.target.complete();
      }
    }, 2000);
  }
}