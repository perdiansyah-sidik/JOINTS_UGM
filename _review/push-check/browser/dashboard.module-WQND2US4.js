import {
  ApiService
} from "./chunk-3TCVYCWI.js";
import "./chunk-3ROYJO5F.js";
import {
  ToastController
} from "./chunk-LTX2EDXK.js";
import {
  CommonModule,
  Component,
  FormsModule,
  IonButton,
  IonContent,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonicModule,
  NavController,
  NgModule,
  RouterModule,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-F6TCNWYA.js";
import "./chunk-G7ZYI2SI.js";
import "./chunk-CATNAYO6.js";
import "./chunk-HIM4Z7KX.js";
import "./chunk-UGUZQALC.js";
import "./chunk-PBFIAVCV.js";
import "./chunk-4EDSP5XB.js";
import "./chunk-RVTDGRYU.js";
import "./chunk-R5XBHSQW.js";
import "./chunk-3CPGIZT6.js";
import "./chunk-KTDVXKZ4.js";
import "./chunk-XTVSKRH4.js";
import "./chunk-MQGZ5TGO.js";
import "./chunk-5SKCZ2KH.js";
import "./chunk-DI3VEDFV.js";
import "./chunk-KJC3JPTO.js";
import "./chunk-JGMRS7JO.js";
import "./chunk-TP4O33LA.js";
import "./chunk-Z7QPZLB7.js";
import "./chunk-GGI4CDCA.js";
import "./chunk-XUMX4TJF.js";
import "./chunk-ZEW2DO4D.js";
import "./chunk-AWSGH3DX.js";
import "./chunk-ULZJEVRP.js";
import "./chunk-IDLJUR4P.js";
import "./chunk-HCYEB4TZ.js";
import "./chunk-PAXKX5KU.js";

// src/app/dashboard/dashboard.page.ts
var _forTrack0 = ($index, $item) => $item.nama;
function DashboardPage_For_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40)(1, "div", 59)(2, "div", 60);
    \u0275\u0275element(3, "span", 61);
    \u0275\u0275elementStart(4, "span", 62);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 63)(7, "strong");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 64);
    \u0275\u0275element(12, "div", 65);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("background", item_r1.warnaDot);
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", item_r1.warnaTeks);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.nama);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", item_r1.beratKg, " kg");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", item_r1.persen, "%)");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", item_r1.persen, "%")("background", item_r1.warnaBar);
  }
}
var _DashboardPage = class _DashboardPage {
  constructor() {
    this.api = inject(ApiService);
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.loading = false;
    this.error = false;
    this.data = null;
    this.tabAktif = "beranda";
    this.idPengguna = 2;
    this.namaUser = "Bu Sari";
    this.alamatUser = "Pasar Blok A, Kios 14";
    this.sapaanWaktu = "Selamat pagi";
    this.saldoPoin = 4320;
    this.nominalRupiah = 43200;
    this.poinDiproses = 0;
    this.totalBeratBulanIni = 25;
    this.daftarMaterial = [
      { nama: "Plastik", beratKg: 12, persen: 48, warnaDot: "#2563EB", warnaTeks: "#2563EB", warnaBar: "#2563EB" },
      { nama: "Kardus", beratKg: 8, persen: 32, warnaDot: "#F59E0B", warnaTeks: "#F59E0B", warnaBar: "#F59E0B" },
      { nama: "Kaca", beratKg: 3, persen: 12, warnaDot: "#0D9488", warnaTeks: "#0D9488", warnaBar: "#0D9488" },
      { nama: "Logam", beratKg: 2, persen: 8, warnaDot: "#64748B", warnaTeks: "#64748B", warnaBar: "#64748B" }
    ];
    this.jemputanBerikutnya = {
      hariSingkat: "SEL",
      tanggal: "14",
      judul: "Penjemputan Sampah",
      kodeLabel: "STR-000123",
      namaKurir: "Kurir 'Pak Joko'",
      jamSlot: "08.00 - 10.00",
      statusLabel: "Terjadwal"
    };
  }
  ngOnInit() {
    this.aturSapaanWaktu();
    this.muatSesiPengguna();
    this.ambilDataDashboard();
  }
  ionViewWillEnter() {
    this.muatSesiPengguna();
    this.ambilDataDashboard();
  }
  aturSapaanWaktu() {
    const jam = (/* @__PURE__ */ new Date()).getHours();
    if (jam >= 4 && jam < 11) {
      this.sapaanWaktu = "Selamat pagi";
    } else if (jam >= 11 && jam < 15) {
      this.sapaanWaktu = "Selamat siang";
    } else if (jam >= 15 && jam < 18) {
      this.sapaanWaktu = "Selamat sore";
    } else {
      this.sapaanWaktu = "Selamat malam";
    }
  }
  muatSesiPengguna() {
    const tersimpan = localStorage.getItem("ecoapp_user");
    if (tersimpan) {
      try {
        const user = JSON.parse(tersimpan);
        if (user.id_pengguna)
          this.idPengguna = Number(user.id_pengguna);
        if (user.nama)
          this.namaUser = user.nama;
        if (user.alamat) {
          this.alamatUser = user.nama_usaha ? `${user.nama_usaha}, ${user.alamat}` : user.alamat;
        }
      } catch (e) {
        console.error("Gagal membaca sesi user:", e);
      }
    }
  }
  ambilDataDashboard(event) {
    this.loading = true;
    this.api.getDashboardPelanggan(this.idPengguna).subscribe({
      next: (res) => {
        this.loading = false;
        if (res && res.data) {
          this.data = res.data;
          if (res.data.profil) {
            this.namaUser = res.data.profil.nama || this.namaUser;
            this.alamatUser = res.data.profil.alamat || this.alamatUser;
          }
          if (res.data.saldo_poin_aktif > 0 || res.data.total_berat_kg > 0) {
            this.saldoPoin = res.data.saldo_poin_aktif;
            this.nominalRupiah = res.data.nominal_rupiah || this.saldoPoin * 10;
            this.poinDiproses = res.data.poin_diproses || 0;
            this.totalBeratBulanIni = res.data.total_berat_kg;
          }
        }
        if (event && event.target)
          event.target.complete();
      },
      error: () => {
        this.loading = false;
        if (event && event.target)
          event.target.complete();
      }
    });
  }
  // Fungsi ion-refresher apabila ditarik ke bawah
  load(event) {
    this.ambilDataDashboard(event);
  }
  formatTitikRibuan(angka) {
    return (angka || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  async klikFitur(namaFitur) {
    const toast = await this.toastCtrl.create({
      message: `Membuka menu ${namaFitur}...`,
      duration: 1500,
      color: "success",
      position: "top"
    });
    await toast.present();
  }
  pilihTab(tab) {
    this.tabAktif = tab;
    if (tab !== "beranda") {
      this.klikFitur(tab.charAt(0).toUpperCase() + tab.slice(1));
    }
  }
};
_DashboardPage.\u0275fac = function DashboardPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardPage)();
};
_DashboardPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardPage, selectors: [["app-dashboard"]], standalone: false, decls: 122, vars: 24, consts: [[1, "beranda-bg", 3, "fullscreen"], ["slot", "fixed", 3, "ionRefresh"], [1, "beranda-wrapper"], [1, "top-greeting-row"], [1, "greeting-left"], [1, "location-line"], ["name", "location-outline"], [1, "greeting-title"], [1, "wave-emoji"], ["type", "button", 1, "notif-btn", 3, "click"], ["name", "notifications-outline"], [1, "notif-dot"], [1, "points-hero-card"], [1, "card-circle-decor", "circle-1"], [1, "card-circle-decor", "circle-2"], [1, "points-top-row"], [1, "points-label"], ["name", "wallet-outline"], ["type", "button", 1, "btn-cairkan", 3, "click"], ["name", "chevron-forward-outline"], [1, "points-main-value"], [1, "big-number"], [1, "unit-text"], [1, "nominal-badge"], ["name", "cash-outline"], [1, "points-divider"], [1, "points-footer-text"], [1, "quick-menu-grid"], [1, "menu-item", 3, "click"], [1, "menu-icon-box", "box-green-soft"], ["name", "receipt-outline"], [1, "menu-icon-box", "box-slate-soft"], ["name", "calendar-clear-outline"], [1, "menu-icon-box", "box-mint-soft"], ["name", "book-outline"], [1, "section-white-card"], [1, "card-header-flex"], [1, "title-group"], [1, "total-kg-pill"], [1, "material-bars-list"], [1, "material-row"], [1, "section-white-card", "pickup-section-card"], [1, "section-eyebrow"], [1, "pickup-inner-box"], [1, "date-badge"], [1, "day-text"], [1, "date-num"], [1, "pickup-info"], [1, "label-code"], [1, "courier-meta"], [1, "dot-sep"], [1, "status-scheduled-pill"], ["expand", "block", 1, "btn-ajukan-jemput", 3, "click"], ["name", "arrow-forward-outline", "slot", "end"], [1, "eco-bottom-nav"], ["type", "button", 1, "nav-tab", 3, "click"], [3, "name"], ["name", "compass-outline"], ["name", "person-outline"], [1, "mat-label-row"], [1, "mat-name"], [1, "color-dot"], [1, "name-text"], [1, "mat-weight"], [1, "progress-track"], [1, "progress-fill"]], template: function DashboardPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "ion-refresher", 1);
    \u0275\u0275listener("ionRefresh", function DashboardPage_Template_ion_refresher_ionRefresh_1_listener($event) {
      return ctx.load($event);
    });
    \u0275\u0275element(2, "ion-refresher-content");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "div", 5);
    \u0275\u0275element(7, "ion-icon", 6);
    \u0275\u0275elementStart(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "h1", 7);
    \u0275\u0275text(11);
    \u0275\u0275elementStart(12, "span", 8);
    \u0275\u0275text(13, "\u{1F44B}");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "button", 9);
    \u0275\u0275listener("click", function DashboardPage_Template_button_click_14_listener() {
      return ctx.klikFitur("Notifikasi");
    });
    \u0275\u0275element(15, "ion-icon", 10)(16, "span", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 12);
    \u0275\u0275element(18, "div", 13)(19, "div", 14);
    \u0275\u0275elementStart(20, "div", 15)(21, "div", 16);
    \u0275\u0275element(22, "ion-icon", 17);
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24, "Saldo Poin Tersedia");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "button", 18);
    \u0275\u0275listener("click", function DashboardPage_Template_button_click_25_listener() {
      return ctx.klikFitur("Cairkan Dana");
    });
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27, "Cairkan dana");
    \u0275\u0275elementEnd();
    \u0275\u0275element(28, "ion-icon", 19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 20)(30, "span", 21);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 22);
    \u0275\u0275text(33, "Poin");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 23);
    \u0275\u0275element(35, "ion-icon", 24);
    \u0275\u0275elementStart(36, "span");
    \u0275\u0275text(37);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(38, "div", 25);
    \u0275\u0275elementStart(39, "div", 26);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 27)(42, "div", 28);
    \u0275\u0275listener("click", function DashboardPage_Template_div_click_42_listener() {
      return ctx.klikFitur("Riwayat Setor");
    });
    \u0275\u0275elementStart(43, "div", 29);
    \u0275\u0275element(44, "ion-icon", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span");
    \u0275\u0275text(46, "Riwayat");
    \u0275\u0275element(47, "br");
    \u0275\u0275text(48, "Setor");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "div", 28);
    \u0275\u0275listener("click", function DashboardPage_Template_div_click_49_listener() {
      return ctx.klikFitur("Pesan Jemput");
    });
    \u0275\u0275elementStart(50, "div", 31);
    \u0275\u0275element(51, "ion-icon", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "span");
    \u0275\u0275text(53, "Pesan");
    \u0275\u0275element(54, "br");
    \u0275\u0275text(55, "Jemput");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "div", 28);
    \u0275\u0275listener("click", function DashboardPage_Template_div_click_56_listener() {
      return ctx.klikFitur("Drop Point");
    });
    \u0275\u0275elementStart(57, "div", 33);
    \u0275\u0275element(58, "ion-icon", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(59, "span");
    \u0275\u0275text(60, "Drop Point");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 28);
    \u0275\u0275listener("click", function DashboardPage_Template_div_click_61_listener() {
      return ctx.klikFitur("Panduan");
    });
    \u0275\u0275elementStart(62, "div", 29);
    \u0275\u0275element(63, "ion-icon", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "span");
    \u0275\u0275text(65, "Panduan");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(66, "div", 35)(67, "div", 36)(68, "div", 37)(69, "h3");
    \u0275\u0275text(70, "Sampah Anda bulan ini");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "p");
    \u0275\u0275text(72, "Berdasarkan data timbangan terverifikasi");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "div", 38);
    \u0275\u0275text(74);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(75, "div", 39);
    \u0275\u0275repeaterCreate(76, DashboardPage_For_77_Template, 13, 11, "div", 40, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "div", 41)(79, "span", 42);
    \u0275\u0275text(80, "JEMPUTAN BERIKUTNYA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "div", 43)(82, "div", 44)(83, "span", 45);
    \u0275\u0275text(84);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "span", 46);
    \u0275\u0275text(86);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(87, "div", 47)(88, "h4");
    \u0275\u0275text(89);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "p", 48);
    \u0275\u0275text(91);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "div", 49)(93, "span");
    \u0275\u0275text(94);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(95, "span", 50);
    \u0275\u0275text(96, "\u2022");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(97, "span");
    \u0275\u0275text(98);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(99, "div", 51);
    \u0275\u0275text(100);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(101, "ion-button", 52);
    \u0275\u0275listener("click", function DashboardPage_Template_ion_button_click_101_listener() {
      return ctx.klikFitur("Ajukan Penjemputan Sampah");
    });
    \u0275\u0275elementStart(102, "span");
    \u0275\u0275text(103, "Ajukan Penjemputan Sampah");
    \u0275\u0275elementEnd();
    \u0275\u0275element(104, "ion-icon", 53);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(105, "div", 54)(106, "button", 55);
    \u0275\u0275listener("click", function DashboardPage_Template_button_click_106_listener() {
      return ctx.pilihTab("beranda");
    });
    \u0275\u0275element(107, "ion-icon", 56);
    \u0275\u0275elementStart(108, "span");
    \u0275\u0275text(109, "Beranda");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(110, "button", 55);
    \u0275\u0275listener("click", function DashboardPage_Template_button_click_110_listener() {
      return ctx.pilihTab("riwayat");
    });
    \u0275\u0275element(111, "ion-icon", 57);
    \u0275\u0275elementStart(112, "span");
    \u0275\u0275text(113, "Riwayat");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(114, "button", 55);
    \u0275\u0275listener("click", function DashboardPage_Template_button_click_114_listener() {
      return ctx.pilihTab("dompet");
    });
    \u0275\u0275element(115, "ion-icon", 17);
    \u0275\u0275elementStart(116, "span");
    \u0275\u0275text(117, "Dompet");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(118, "button", 55);
    \u0275\u0275listener("click", function DashboardPage_Template_button_click_118_listener() {
      return ctx.pilihTab("profil");
    });
    \u0275\u0275element(119, "ion-icon", 58);
    \u0275\u0275elementStart(120, "span");
    \u0275\u0275text(121, "Profil");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx.alamatUser);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx.sapaanWaktu, ", ", ctx.namaUser, " ");
    \u0275\u0275advance(20);
    \u0275\u0275textInterpolate(ctx.formatTitikRibuan(ctx.saldoPoin));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Setara nominal Rp ", ctx.formatTitikRibuan(ctx.nominalRupiah));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Poin Diproses: ", ctx.formatTitikRibuan(ctx.poinDiproses), " Poin ");
    \u0275\u0275advance(34);
    \u0275\u0275textInterpolate1(" ", ctx.totalBeratBulanIni, " kg ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx.daftarMaterial);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx.jemputanBerikutnya.hariSingkat);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx.jemputanBerikutnya.tanggal);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.jemputanBerikutnya.judul);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Kode Label: ", ctx.jemputanBerikutnya.kodeLabel);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.jemputanBerikutnya.namaKurir);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx.jemputanBerikutnya.jamSlot);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx.jemputanBerikutnya.statusLabel, " ");
    \u0275\u0275advance(6);
    \u0275\u0275classProp("active", ctx.tabAktif === "beranda");
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx.tabAktif === "beranda" ? "home" : "home-outline");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active", ctx.tabAktif === "riwayat");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx.tabAktif === "dompet");
    \u0275\u0275advance(4);
    \u0275\u0275classProp("active", ctx.tabAktif === "profil");
  }
}, dependencies: [IonButton, IonContent, IonIcon, IonRefresher, IonRefresherContent], styles: ["\n.beranda-bg[_ngcontent-%COMP%] {\n  --background: #F7FAF8;\n}\n.beranda-wrapper[_ngcontent-%COMP%] {\n  max-width: 450px;\n  margin: 0 auto;\n  padding: 20px 18px 96px;\n}\n.top-greeting-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}\n.top-greeting-row[_ngcontent-%COMP%]   .greeting-left[_ngcontent-%COMP%]   .location-line[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #64748B;\n  margin-bottom: 4px;\n}\n.top-greeting-row[_ngcontent-%COMP%]   .greeting-left[_ngcontent-%COMP%]   .location-line[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #16A34A;\n  font-size: 14px;\n}\n.top-greeting-row[_ngcontent-%COMP%]   .greeting-left[_ngcontent-%COMP%]   .greeting-title[_ngcontent-%COMP%] {\n  font-size: 20px;\n  font-weight: 800;\n  color: #0F172A;\n  margin: 0;\n  letter-spacing: -0.3px;\n}\n.top-greeting-row[_ngcontent-%COMP%]   .greeting-left[_ngcontent-%COMP%]   .greeting-title[_ngcontent-%COMP%]   .wave-emoji[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 19px;\n}\n.top-greeting-row[_ngcontent-%COMP%]   .notif-btn[_ngcontent-%COMP%] {\n  position: relative;\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  background: #FFFFFF;\n  border: 1px solid #E2E8F0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 21px;\n  color: #0F172A;\n  cursor: pointer;\n  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);\n}\n.top-greeting-row[_ngcontent-%COMP%]   .notif-btn[_ngcontent-%COMP%]   .notif-dot[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #0284C7;\n  border: 1.5px solid #FFFFFF;\n}\n.points-hero-card[_ngcontent-%COMP%] {\n  position: relative;\n  background:\n    linear-gradient(\n      135deg,\n      #065F31 0%,\n      #0D7A3F 55%,\n      #138A47 100%);\n  border-radius: 22px;\n  padding: 20px 18px 16px;\n  color: #FFFFFF;\n  overflow: hidden;\n  box-shadow: 0 12px 26px rgba(6, 95, 49, 0.22);\n  margin-bottom: 22px;\n}\n.points-hero-card[_ngcontent-%COMP%]   .card-circle-decor[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.06);\n  pointer-events: none;\n}\n.points-hero-card[_ngcontent-%COMP%]   .circle-1[_ngcontent-%COMP%] {\n  width: 150px;\n  height: 150px;\n  right: -35px;\n  bottom: -45px;\n}\n.points-hero-card[_ngcontent-%COMP%]   .circle-2[_ngcontent-%COMP%] {\n  width: 90px;\n  height: 90px;\n  right: 10px;\n  top: -25px;\n}\n.points-hero-card[_ngcontent-%COMP%]   .points-top-row[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n.points-hero-card[_ngcontent-%COMP%]   .points-top-row[_ngcontent-%COMP%]   .points-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12.5px;\n  font-weight: 600;\n  color: #A7F3D0;\n}\n.points-hero-card[_ngcontent-%COMP%]   .points-top-row[_ngcontent-%COMP%]   .points-label[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #6EE7B7;\n}\n.points-hero-card[_ngcontent-%COMP%]   .points-top-row[_ngcontent-%COMP%]   .btn-cairkan[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  background: #0284C7;\n  color: #FFFFFF;\n  border: none;\n  border-radius: 20px;\n  padding: 7px 13px;\n  font-size: 12px;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 4px 10px rgba(2, 132, 199, 0.35);\n}\n.points-hero-card[_ngcontent-%COMP%]   .points-top-row[_ngcontent-%COMP%]   .btn-cairkan[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.points-hero-card[_ngcontent-%COMP%]   .points-main-value[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.points-hero-card[_ngcontent-%COMP%]   .points-main-value[_ngcontent-%COMP%]   .big-number[_ngcontent-%COMP%] {\n  font-size: 36px;\n  font-weight: 800;\n  color: #FFFFFF;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n}\n.points-hero-card[_ngcontent-%COMP%]   .points-main-value[_ngcontent-%COMP%]   .unit-text[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  color: #6EE7B7;\n}\n.points-hero-card[_ngcontent-%COMP%]   .nominal-badge[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: rgba(0, 0, 0, 0.22);\n  padding: 6px 12px;\n  border-radius: 10px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #ECFDF5;\n  margin-bottom: 14px;\n}\n.points-hero-card[_ngcontent-%COMP%]   .nominal-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #34D399;\n  font-size: 15px;\n}\n.points-hero-card[_ngcontent-%COMP%]   .points-divider[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  height: 1px;\n  background: rgba(255, 255, 255, 0.14);\n  margin-bottom: 10px;\n}\n.points-hero-card[_ngcontent-%COMP%]   .points-footer-text[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  font-size: 11.5px;\n  color: rgba(236, 253, 245, 0.8);\n  font-weight: 500;\n}\n.quick-menu-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 12px;\n  margin-bottom: 22px;\n}\n.quick-menu-grid[_ngcontent-%COMP%]   .menu-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  cursor: pointer;\n}\n.quick-menu-grid[_ngcontent-%COMP%]   .menu-item[_ngcontent-%COMP%]   .menu-icon-box[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  margin-bottom: 8px;\n  border: 1px solid rgba(34, 173, 92, 0.14);\n  transition: transform 0.2s ease;\n}\n.quick-menu-grid[_ngcontent-%COMP%]   .menu-item[_ngcontent-%COMP%]   .menu-icon-box.box-green-soft[_ngcontent-%COMP%] {\n  background: #E8F8EE;\n  color: #16A34A;\n}\n.quick-menu-grid[_ngcontent-%COMP%]   .menu-item[_ngcontent-%COMP%]   .menu-icon-box.box-slate-soft[_ngcontent-%COMP%] {\n  background: #E2E8F0;\n  color: #1E293B;\n}\n.quick-menu-grid[_ngcontent-%COMP%]   .menu-item[_ngcontent-%COMP%]   .menu-icon-box.box-mint-soft[_ngcontent-%COMP%] {\n  background: #E6F7F2;\n  color: #0F766E;\n}\n.quick-menu-grid[_ngcontent-%COMP%]   .menu-item[_ngcontent-%COMP%]:active   .menu-icon-box[_ngcontent-%COMP%] {\n  transform: scale(0.95);\n}\n.quick-menu-grid[_ngcontent-%COMP%]   .menu-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 700;\n  color: #334155;\n  line-height: 1.3;\n}\n.section-white-card[_ngcontent-%COMP%] {\n  background: #FFFFFF;\n  border-radius: 22px;\n  padding: 20px 18px;\n  border: 1px solid #EDF2F7;\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);\n  margin-bottom: 18px;\n}\n.section-white-card[_ngcontent-%COMP%]   .card-header-flex[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}\n.section-white-card[_ngcontent-%COMP%]   .card-header-flex[_ngcontent-%COMP%]   .title-group[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 800;\n  color: #0F172A;\n  margin: 0 0 4px;\n}\n.section-white-card[_ngcontent-%COMP%]   .card-header-flex[_ngcontent-%COMP%]   .title-group[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  color: #94A3B8;\n  margin: 0;\n}\n.section-white-card[_ngcontent-%COMP%]   .card-header-flex[_ngcontent-%COMP%]   .total-kg-pill[_ngcontent-%COMP%] {\n  background: #ECFDF5;\n  color: #065F46;\n  border: 1px solid #A7F3D0;\n  font-size: 14px;\n  font-weight: 800;\n  padding: 6px 14px;\n  border-radius: 20px;\n}\n.material-bars-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.material-bars-list[_ngcontent-%COMP%]   .material-row[_ngcontent-%COMP%]   .mat-label-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 6px;\n}\n.material-bars-list[_ngcontent-%COMP%]   .material-row[_ngcontent-%COMP%]   .mat-label-row[_ngcontent-%COMP%]   .mat-name[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\n.material-bars-list[_ngcontent-%COMP%]   .material-row[_ngcontent-%COMP%]   .mat-label-row[_ngcontent-%COMP%]   .mat-name[_ngcontent-%COMP%]   .color-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n}\n.material-bars-list[_ngcontent-%COMP%]   .material-row[_ngcontent-%COMP%]   .mat-label-row[_ngcontent-%COMP%]   .mat-name[_ngcontent-%COMP%]   .name-text[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  font-weight: 700;\n}\n.material-bars-list[_ngcontent-%COMP%]   .material-row[_ngcontent-%COMP%]   .mat-label-row[_ngcontent-%COMP%]   .mat-weight[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.material-bars-list[_ngcontent-%COMP%]   .material-row[_ngcontent-%COMP%]   .mat-label-row[_ngcontent-%COMP%]   .mat-weight[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #0F172A;\n  font-weight: 800;\n  margin-right: 3px;\n}\n.material-bars-list[_ngcontent-%COMP%]   .material-row[_ngcontent-%COMP%]   .mat-label-row[_ngcontent-%COMP%]   .mat-weight[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #94A3B8;\n  font-weight: 600;\n}\n.material-bars-list[_ngcontent-%COMP%]   .material-row[_ngcontent-%COMP%]   .progress-track[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 8px;\n  background: #F1F5F9;\n  border-radius: 10px;\n  overflow: hidden;\n}\n.material-bars-list[_ngcontent-%COMP%]   .material-row[_ngcontent-%COMP%]   .progress-track[_ngcontent-%COMP%]   .progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 10px;\n  transition: width 0.4s ease;\n}\n.pickup-section-card[_ngcontent-%COMP%] {\n  padding: 18px;\n}\n.pickup-section-card[_ngcontent-%COMP%]   .section-eyebrow[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11px;\n  font-weight: 800;\n  color: #94A3B8;\n  letter-spacing: 0.5px;\n  margin-bottom: 12px;\n}\n.pickup-section-card[_ngcontent-%COMP%]   .pickup-inner-box[_ngcontent-%COMP%] {\n  background: #F8FAFC;\n  border: 1px solid #E2E8F0;\n  border-radius: 16px;\n  padding: 14px 12px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.pickup-section-card[_ngcontent-%COMP%]   .pickup-inner-box[_ngcontent-%COMP%]   .date-badge[_ngcontent-%COMP%] {\n  width: 46px;\n  height: 52px;\n  background: #FFFFFF;\n  border-radius: 12px;\n  border: 1px solid #E2E8F0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);\n}\n.pickup-section-card[_ngcontent-%COMP%]   .pickup-inner-box[_ngcontent-%COMP%]   .date-badge[_ngcontent-%COMP%]   .day-text[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 800;\n  color: #0284C7;\n  text-transform: uppercase;\n}\n.pickup-section-card[_ngcontent-%COMP%]   .pickup-inner-box[_ngcontent-%COMP%]   .date-badge[_ngcontent-%COMP%]   .date-num[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 800;\n  color: #0F172A;\n  line-height: 1.1;\n}\n.pickup-section-card[_ngcontent-%COMP%]   .pickup-inner-box[_ngcontent-%COMP%]   .pickup-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.pickup-section-card[_ngcontent-%COMP%]   .pickup-inner-box[_ngcontent-%COMP%]   .pickup-info[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 800;\n  color: #0F172A;\n  margin: 0 0 3px;\n}\n.pickup-section-card[_ngcontent-%COMP%]   .pickup-inner-box[_ngcontent-%COMP%]   .pickup-info[_ngcontent-%COMP%]   .label-code[_ngcontent-%COMP%] {\n  font-size: 11.5px;\n  font-weight: 800;\n  color: #1E293B;\n  margin: 0 0 4px;\n}\n.pickup-section-card[_ngcontent-%COMP%]   .pickup-inner-box[_ngcontent-%COMP%]   .pickup-info[_ngcontent-%COMP%]   .courier-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 5px;\n  font-size: 11px;\n  color: #64748B;\n  font-weight: 500;\n}\n.pickup-section-card[_ngcontent-%COMP%]   .pickup-inner-box[_ngcontent-%COMP%]   .status-scheduled-pill[_ngcontent-%COMP%] {\n  background: #DCFCE7;\n  color: #15803D;\n  font-size: 11px;\n  font-weight: 800;\n  padding: 6px 11px;\n  border-radius: 20px;\n  flex-shrink: 0;\n}\n.btn-ajukan-jemput[_ngcontent-%COMP%] {\n  --background: #22AD5C;\n  --background-activated: #1B8F4B;\n  --border-radius: 16px;\n  --box-shadow: 0 8px 20px rgba(34, 173, 92, 0.28);\n  height: 52px;\n  font-size: 14.5px;\n  font-weight: 800;\n  text-transform: none;\n  margin: 6px 0 12px;\n}\n.eco-bottom-nav[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 68px;\n  background: #FFFFFF;\n  border-top: 1px solid #E2E8F0;\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  z-index: 100;\n  padding-bottom: env(safe-area-inset-bottom);\n}\n.eco-bottom-nav[_ngcontent-%COMP%]   .nav-tab[_ngcontent-%COMP%] {\n  flex: 1;\n  background: transparent;\n  border: none;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  color: #94A3B8;\n  font-size: 11px;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 8px 0;\n}\n.eco-bottom-nav[_ngcontent-%COMP%]   .nav-tab[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n.eco-bottom-nav[_ngcontent-%COMP%]   .nav-tab.active[_ngcontent-%COMP%] {\n  color: #16A34A;\n  font-weight: 800;\n}\n/*# sourceMappingURL=dashboard.page.css.map */"] });
var DashboardPage = _DashboardPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardPage, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: false, template: `<ion-content [fullscreen]="true" class="beranda-bg">\r
  <ion-refresher slot="fixed" (ionRefresh)="load($event)">\r
    <ion-refresher-content></ion-refresher-content>\r
  </ion-refresher>\r
\r
  <div class="beranda-wrapper">\r
\r
    <!-- 1. HEADER ATAS: LOKASI, SAPAAN & LONCENG NOTIFIKASI -->\r
    <div class="top-greeting-row">\r
      <div class="greeting-left">\r
        <div class="location-line">\r
          <ion-icon name="location-outline"></ion-icon>\r
          <span>{{ alamatUser }}</span>\r
        </div>\r
        <h1 class="greeting-title">{{ sapaanWaktu }}, {{ namaUser }} <span class="wave-emoji">\u{1F44B}</span></h1>\r
      </div>\r
\r
      <button type="button" class="notif-btn" (click)="klikFitur('Notifikasi')">\r
        <ion-icon name="notifications-outline"></ion-icon>\r
        <span class="notif-dot"></span>\r
      </button>\r
    </div>\r
\r
    <!-- 2. KARTU HIJAU SALDO POIN TERSEDIA -->\r
    <div class="points-hero-card">\r
      <div class="card-circle-decor circle-1"></div>\r
      <div class="card-circle-decor circle-2"></div>\r
\r
      <div class="points-top-row">\r
        <div class="points-label">\r
          <ion-icon name="wallet-outline"></ion-icon>\r
          <span>Saldo Poin Tersedia</span>\r
        </div>\r
\r
        <button type="button" class="btn-cairkan" (click)="klikFitur('Cairkan Dana')">\r
          <span>Cairkan dana</span>\r
          <ion-icon name="chevron-forward-outline"></ion-icon>\r
        </button>\r
      </div>\r
\r
      <div class="points-main-value">\r
        <span class="big-number">{{ formatTitikRibuan(saldoPoin) }}</span>\r
        <span class="unit-text">Poin</span>\r
      </div>\r
\r
      <div class="nominal-badge">\r
        <ion-icon name="cash-outline"></ion-icon>\r
        <span>Setara nominal Rp {{ formatTitikRibuan(nominalRupiah) }}</span>\r
      </div>\r
\r
      <div class="points-divider"></div>\r
\r
      <div class="points-footer-text">\r
        Poin Diproses: {{ formatTitikRibuan(poinDiproses) }} Poin\r
      </div>\r
    </div>\r
\r
    <!-- 3. EMPAT MENU CEPAT (RIWAYAT SETOR, PESAN JEMPUT, DROP POINT, PANDUAN) -->\r
    <div class="quick-menu-grid">\r
      <div class="menu-item" (click)="klikFitur('Riwayat Setor')">\r
        <div class="menu-icon-box box-green-soft">\r
          <ion-icon name="receipt-outline"></ion-icon>\r
        </div>\r
        <span>Riwayat<br>Setor</span>\r
      </div>\r
\r
      <div class="menu-item" (click)="klikFitur('Pesan Jemput')">\r
        <div class="menu-icon-box box-slate-soft">\r
          <ion-icon name="calendar-clear-outline"></ion-icon>\r
        </div>\r
        <span>Pesan<br>Jemput</span>\r
      </div>\r
\r
      <div class="menu-item" (click)="klikFitur('Drop Point')">\r
        <div class="menu-icon-box box-mint-soft">\r
          <ion-icon name="location-outline"></ion-icon>\r
        </div>\r
        <span>Drop Point</span>\r
      </div>\r
\r
      <div class="menu-item" (click)="klikFitur('Panduan')">\r
        <div class="menu-icon-box box-green-soft">\r
          <ion-icon name="book-outline"></ion-icon>\r
        </div>\r
        <span>Panduan</span>\r
      </div>\r
    </div>\r
\r
    <!-- 4. KARTU "SAMPAH ANDA BULAN INI" (MENGGUNAKAN @for BEBAS GARIS MERAH) -->\r
    <div class="section-white-card">\r
      <div class="card-header-flex">\r
        <div class="title-group">\r
          <h3>Sampah Anda bulan ini</h3>\r
          <p>Berdasarkan data timbangan terverifikasi</p>\r
        </div>\r
        <div class="total-kg-pill">\r
          {{ totalBeratBulanIni }} kg\r
        </div>\r
      </div>\r
\r
      <div class="material-bars-list">\r
        @for (item of daftarMaterial; track item.nama) {\r
        <div class="material-row">\r
          <div class="mat-label-row">\r
            <div class="mat-name">\r
              <span class="color-dot" [style.background]="item.warnaDot"></span>\r
              <span class="name-text" [style.color]="item.warnaTeks">{{ item.nama }}</span>\r
            </div>\r
            <div class="mat-weight">\r
              <strong>{{ item.beratKg }} kg</strong>\r
              <span>({{ item.persen }}%)</span>\r
            </div>\r
          </div>\r
\r
          <div class="progress-track">\r
            <div \r
              class="progress-fill" \r
              [style.width.%]="item.persen" \r
              [style.background]="item.warnaBar">\r
            </div>\r
          </div>\r
        </div>\r
        }\r
      </div>\r
    </div>\r
\r
    <!-- 5. KARTU "JEMPUTAN BERIKUTNYA" -->\r
    <div class="section-white-card pickup-section-card">\r
      <span class="section-eyebrow">JEMPUTAN BERIKUTNYA</span>\r
\r
      <div class="pickup-inner-box">\r
        <div class="date-badge">\r
          <span class="day-text">{{ jemputanBerikutnya.hariSingkat }}</span>\r
          <span class="date-num">{{ jemputanBerikutnya.tanggal }}</span>\r
        </div>\r
\r
        <div class="pickup-info">\r
          <h4>{{ jemputanBerikutnya.judul }}</h4>\r
          <p class="label-code">Kode Label: {{ jemputanBerikutnya.kodeLabel }}</p>\r
          <div class="courier-meta">\r
            <span>{{ jemputanBerikutnya.namaKurir }}</span>\r
            <span class="dot-sep">\u2022</span>\r
            <span>{{ jemputanBerikutnya.jamSlot }}</span>\r
          </div>\r
        </div>\r
\r
        <div class="status-scheduled-pill">\r
          {{ jemputanBerikutnya.statusLabel }}\r
        </div>\r
      </div>\r
    </div>\r
\r
    <!-- 6. TOMBOL UTAMA AJUKAN PENJEMPUTAN SAMPAH -->\r
    <ion-button expand="block" class="btn-ajukan-jemput" (click)="klikFitur('Ajukan Penjemputan Sampah')">\r
      <span>Ajukan Penjemputan Sampah</span>\r
      <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>\r
    </ion-button>\r
\r
  </div>\r
</ion-content>\r
\r
<!-- 7. BOTTOM NAVIGATION BAR -->\r
<div class="eco-bottom-nav">\r
  <button type="button" class="nav-tab" [class.active]="tabAktif === 'beranda'" (click)="pilihTab('beranda')">\r
    <ion-icon [name]="tabAktif === 'beranda' ? 'home' : 'home-outline'"></ion-icon>\r
    <span>Beranda</span>\r
  </button>\r
\r
  <button type="button" class="nav-tab" [class.active]="tabAktif === 'riwayat'" (click)="pilihTab('riwayat')">\r
    <ion-icon name="compass-outline"></ion-icon>\r
    <span>Riwayat</span>\r
  </button>\r
\r
  <button type="button" class="nav-tab" [class.active]="tabAktif === 'dompet'" (click)="pilihTab('dompet')">\r
    <ion-icon name="wallet-outline"></ion-icon>\r
    <span>Dompet</span>\r
  </button>\r
\r
  <button type="button" class="nav-tab" [class.active]="tabAktif === 'profil'" (click)="pilihTab('profil')">\r
    <ion-icon name="person-outline"></ion-icon>\r
    <span>Profil</span>\r
  </button>\r
</div>`, styles: ["/* src/app/dashboard/dashboard.page.scss */\n.beranda-bg {\n  --background: #F7FAF8;\n}\n.beranda-wrapper {\n  max-width: 450px;\n  margin: 0 auto;\n  padding: 20px 18px 96px;\n}\n.top-greeting-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}\n.top-greeting-row .greeting-left .location-line {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #64748B;\n  margin-bottom: 4px;\n}\n.top-greeting-row .greeting-left .location-line ion-icon {\n  color: #16A34A;\n  font-size: 14px;\n}\n.top-greeting-row .greeting-left .greeting-title {\n  font-size: 20px;\n  font-weight: 800;\n  color: #0F172A;\n  margin: 0;\n  letter-spacing: -0.3px;\n}\n.top-greeting-row .greeting-left .greeting-title .wave-emoji {\n  display: inline-block;\n  font-size: 19px;\n}\n.top-greeting-row .notif-btn {\n  position: relative;\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  background: #FFFFFF;\n  border: 1px solid #E2E8F0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 21px;\n  color: #0F172A;\n  cursor: pointer;\n  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);\n}\n.top-greeting-row .notif-btn .notif-dot {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  background: #0284C7;\n  border: 1.5px solid #FFFFFF;\n}\n.points-hero-card {\n  position: relative;\n  background:\n    linear-gradient(\n      135deg,\n      #065F31 0%,\n      #0D7A3F 55%,\n      #138A47 100%);\n  border-radius: 22px;\n  padding: 20px 18px 16px;\n  color: #FFFFFF;\n  overflow: hidden;\n  box-shadow: 0 12px 26px rgba(6, 95, 49, 0.22);\n  margin-bottom: 22px;\n}\n.points-hero-card .card-circle-decor {\n  position: absolute;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.06);\n  pointer-events: none;\n}\n.points-hero-card .circle-1 {\n  width: 150px;\n  height: 150px;\n  right: -35px;\n  bottom: -45px;\n}\n.points-hero-card .circle-2 {\n  width: 90px;\n  height: 90px;\n  right: 10px;\n  top: -25px;\n}\n.points-hero-card .points-top-row {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n.points-hero-card .points-top-row .points-label {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12.5px;\n  font-weight: 600;\n  color: #A7F3D0;\n}\n.points-hero-card .points-top-row .points-label ion-icon {\n  font-size: 16px;\n  color: #6EE7B7;\n}\n.points-hero-card .points-top-row .btn-cairkan {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  background: #0284C7;\n  color: #FFFFFF;\n  border: none;\n  border-radius: 20px;\n  padding: 7px 13px;\n  font-size: 12px;\n  font-weight: 700;\n  cursor: pointer;\n  box-shadow: 0 4px 10px rgba(2, 132, 199, 0.35);\n}\n.points-hero-card .points-top-row .btn-cairkan ion-icon {\n  font-size: 13px;\n}\n.points-hero-card .points-main-value {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  align-items: baseline;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.points-hero-card .points-main-value .big-number {\n  font-size: 36px;\n  font-weight: 800;\n  color: #FFFFFF;\n  letter-spacing: -0.5px;\n  line-height: 1.1;\n}\n.points-hero-card .points-main-value .unit-text {\n  font-size: 16px;\n  font-weight: 700;\n  color: #6EE7B7;\n}\n.points-hero-card .nominal-badge {\n  position: relative;\n  z-index: 1;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: rgba(0, 0, 0, 0.22);\n  padding: 6px 12px;\n  border-radius: 10px;\n  font-size: 12px;\n  font-weight: 600;\n  color: #ECFDF5;\n  margin-bottom: 14px;\n}\n.points-hero-card .nominal-badge ion-icon {\n  color: #34D399;\n  font-size: 15px;\n}\n.points-hero-card .points-divider {\n  position: relative;\n  z-index: 1;\n  height: 1px;\n  background: rgba(255, 255, 255, 0.14);\n  margin-bottom: 10px;\n}\n.points-hero-card .points-footer-text {\n  position: relative;\n  z-index: 1;\n  font-size: 11.5px;\n  color: rgba(236, 253, 245, 0.8);\n  font-weight: 500;\n}\n.quick-menu-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 12px;\n  margin-bottom: 22px;\n}\n.quick-menu-grid .menu-item {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  cursor: pointer;\n}\n.quick-menu-grid .menu-item .menu-icon-box {\n  width: 56px;\n  height: 56px;\n  border-radius: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 24px;\n  margin-bottom: 8px;\n  border: 1px solid rgba(34, 173, 92, 0.14);\n  transition: transform 0.2s ease;\n}\n.quick-menu-grid .menu-item .menu-icon-box.box-green-soft {\n  background: #E8F8EE;\n  color: #16A34A;\n}\n.quick-menu-grid .menu-item .menu-icon-box.box-slate-soft {\n  background: #E2E8F0;\n  color: #1E293B;\n}\n.quick-menu-grid .menu-item .menu-icon-box.box-mint-soft {\n  background: #E6F7F2;\n  color: #0F766E;\n}\n.quick-menu-grid .menu-item:active .menu-icon-box {\n  transform: scale(0.95);\n}\n.quick-menu-grid .menu-item span {\n  font-size: 11.5px;\n  font-weight: 700;\n  color: #334155;\n  line-height: 1.3;\n}\n.section-white-card {\n  background: #FFFFFF;\n  border-radius: 22px;\n  padding: 20px 18px;\n  border: 1px solid #EDF2F7;\n  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);\n  margin-bottom: 18px;\n}\n.section-white-card .card-header-flex {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  margin-bottom: 18px;\n}\n.section-white-card .card-header-flex .title-group h3 {\n  font-size: 16px;\n  font-weight: 800;\n  color: #0F172A;\n  margin: 0 0 4px;\n}\n.section-white-card .card-header-flex .title-group p {\n  font-size: 11.5px;\n  color: #94A3B8;\n  margin: 0;\n}\n.section-white-card .card-header-flex .total-kg-pill {\n  background: #ECFDF5;\n  color: #065F46;\n  border: 1px solid #A7F3D0;\n  font-size: 14px;\n  font-weight: 800;\n  padding: 6px 14px;\n  border-radius: 20px;\n}\n.material-bars-list {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n.material-bars-list .material-row .mat-label-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 6px;\n}\n.material-bars-list .material-row .mat-label-row .mat-name {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n}\n.material-bars-list .material-row .mat-label-row .mat-name .color-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n}\n.material-bars-list .material-row .mat-label-row .mat-name .name-text {\n  font-size: 12.5px;\n  font-weight: 700;\n}\n.material-bars-list .material-row .mat-label-row .mat-weight {\n  font-size: 12px;\n}\n.material-bars-list .material-row .mat-label-row .mat-weight strong {\n  color: #0F172A;\n  font-weight: 800;\n  margin-right: 3px;\n}\n.material-bars-list .material-row .mat-label-row .mat-weight span {\n  color: #94A3B8;\n  font-weight: 600;\n}\n.material-bars-list .material-row .progress-track {\n  width: 100%;\n  height: 8px;\n  background: #F1F5F9;\n  border-radius: 10px;\n  overflow: hidden;\n}\n.material-bars-list .material-row .progress-track .progress-fill {\n  height: 100%;\n  border-radius: 10px;\n  transition: width 0.4s ease;\n}\n.pickup-section-card {\n  padding: 18px;\n}\n.pickup-section-card .section-eyebrow {\n  display: block;\n  font-size: 11px;\n  font-weight: 800;\n  color: #94A3B8;\n  letter-spacing: 0.5px;\n  margin-bottom: 12px;\n}\n.pickup-section-card .pickup-inner-box {\n  background: #F8FAFC;\n  border: 1px solid #E2E8F0;\n  border-radius: 16px;\n  padding: 14px 12px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.pickup-section-card .pickup-inner-box .date-badge {\n  width: 46px;\n  height: 52px;\n  background: #FFFFFF;\n  border-radius: 12px;\n  border: 1px solid #E2E8F0;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);\n}\n.pickup-section-card .pickup-inner-box .date-badge .day-text {\n  font-size: 10px;\n  font-weight: 800;\n  color: #0284C7;\n  text-transform: uppercase;\n}\n.pickup-section-card .pickup-inner-box .date-badge .date-num {\n  font-size: 18px;\n  font-weight: 800;\n  color: #0F172A;\n  line-height: 1.1;\n}\n.pickup-section-card .pickup-inner-box .pickup-info {\n  flex: 1;\n  min-width: 0;\n}\n.pickup-section-card .pickup-inner-box .pickup-info h4 {\n  font-size: 14px;\n  font-weight: 800;\n  color: #0F172A;\n  margin: 0 0 3px;\n}\n.pickup-section-card .pickup-inner-box .pickup-info .label-code {\n  font-size: 11.5px;\n  font-weight: 800;\n  color: #1E293B;\n  margin: 0 0 4px;\n}\n.pickup-section-card .pickup-inner-box .pickup-info .courier-meta {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 5px;\n  font-size: 11px;\n  color: #64748B;\n  font-weight: 500;\n}\n.pickup-section-card .pickup-inner-box .status-scheduled-pill {\n  background: #DCFCE7;\n  color: #15803D;\n  font-size: 11px;\n  font-weight: 800;\n  padding: 6px 11px;\n  border-radius: 20px;\n  flex-shrink: 0;\n}\n.btn-ajukan-jemput {\n  --background: #22AD5C;\n  --background-activated: #1B8F4B;\n  --border-radius: 16px;\n  --box-shadow: 0 8px 20px rgba(34, 173, 92, 0.28);\n  height: 52px;\n  font-size: 14.5px;\n  font-weight: 800;\n  text-transform: none;\n  margin: 6px 0 12px;\n}\n.eco-bottom-nav {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 68px;\n  background: #FFFFFF;\n  border-top: 1px solid #E2E8F0;\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  z-index: 100;\n  padding-bottom: env(safe-area-inset-bottom);\n}\n.eco-bottom-nav .nav-tab {\n  flex: 1;\n  background: transparent;\n  border: none;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  color: #94A3B8;\n  font-size: 11px;\n  font-weight: 600;\n  cursor: pointer;\n  padding: 8px 0;\n}\n.eco-bottom-nav .nav-tab ion-icon {\n  font-size: 22px;\n}\n.eco-bottom-nav .nav-tab.active {\n  color: #16A34A;\n  font-weight: 800;\n}\n/*# sourceMappingURL=dashboard.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardPage, { className: "DashboardPage", filePath: "src/app/dashboard/dashboard.page.ts", lineNumber: 20 });
})();

// src/app/dashboard/dashboard-routing.module.ts
var routes = [
  {
    path: "",
    component: DashboardPage
  }
];
var _DashboardPageRoutingModule = class _DashboardPageRoutingModule {
};
_DashboardPageRoutingModule.\u0275fac = function DashboardPageRoutingModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardPageRoutingModule)();
};
_DashboardPageRoutingModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DashboardPageRoutingModule });
_DashboardPageRoutingModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
var DashboardPageRoutingModule = _DashboardPageRoutingModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardPageRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/dashboard/dashboard.module.ts
var _DashboardPageModule = class _DashboardPageModule {
};
_DashboardPageModule.\u0275fac = function DashboardPageModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DashboardPageModule)();
};
_DashboardPageModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DashboardPageModule });
_DashboardPageModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
  CommonModule,
  FormsModule,
  IonicModule,
  DashboardPageRoutingModule
] });
var DashboardPageModule = _DashboardPageModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardPageModule, [{
    type: NgModule,
    args: [{
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DashboardPageRoutingModule
      ],
      declarations: [DashboardPage]
    }]
  }], null, null);
})();
export {
  DashboardPageModule
};
//# sourceMappingURL=dashboard.module-WQND2US4.js.map
