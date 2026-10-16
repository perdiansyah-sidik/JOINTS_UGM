import {
  LABEL_PERAN,
  MasterPenggunaService,
  idValid,
  pesanApi
} from "./chunk-4J7JPUME.js";
import "./chunk-3ROYJO5F.js";
import {
  ToastController
} from "./chunk-LTX2EDXK.js";
import {
  ChangeDetectorRef,
  CommonModule,
  Component,
  DefaultValueAccessor,
  FormsModule,
  HostListener,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonicModule,
  NavController,
  NgControlStatus,
  NgModel,
  NgModule,
  Router,
  RouterModule,
  TextValueAccessorDirective,
  finalize,
  inject,
  setClassMetadata,
  timeout,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵresolveDocument,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
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

// src/app/master-pengguna/pengelola.guard.ts
var pengelolaGuard = () => {
  const router = inject(Router);
  try {
    const sesi = JSON.parse(localStorage.getItem("ecoapp_user") ?? "null");
    if (!sesi)
      return router.parseUrl("/login");
    if ((sesi.peran === 4 || sesi.peran === "PENGELOLA") && sesi.aktif !== 0 && sesi.is_deleted !== 1)
      return true;
    return router.parseUrl("/dashboard");
  } catch {
    return router.parseUrl("/login");
  }
};

// src/app/master-pengguna/master-pengguna.page.ts
var _forTrack0 = ($index, $item) => $item.id_pengguna;
function MasterPenggunaPage_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "ion-spinner", 16);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Memuat daftar akun...");
    \u0275\u0275elementEnd()();
  }
}
function MasterPenggunaPage_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "ion-icon", 17);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-button", 18);
    \u0275\u0275listener("click", function MasterPenggunaPage_Conditional_26_Template_ion_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.muatDaftar());
    });
    \u0275\u0275text(5, "Coba Lagi");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.pesanError);
  }
}
function MasterPenggunaPage_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "ion-icon", 19);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Tidak ada akun yang cocok dengan pencarian/filter ini.");
    \u0275\u0275elementEnd()();
  }
}
function MasterPenggunaPage_Conditional_28_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "Nonaktif");
    \u0275\u0275elementEnd();
  }
}
function MasterPenggunaPage_Conditional_28_For_2_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pengguna_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(pengguna_r4.nama_usaha);
  }
}
function MasterPenggunaPage_Conditional_28_For_2_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 35)(1, "button", 36);
    \u0275\u0275listener("click", function MasterPenggunaPage_Conditional_28_For_2_Conditional_19_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r5);
      const pengguna_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.bukaDetail(pengguna_r4));
    });
    \u0275\u0275element(2, "ion-icon", 37);
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Detail");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 38);
    \u0275\u0275listener("click", function MasterPenggunaPage_Conditional_28_For_2_Conditional_19_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r5);
      const pengguna_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.bukaUbah(pengguna_r4));
    });
    \u0275\u0275element(6, "ion-icon", 39);
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8, "Edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 40);
    \u0275\u0275listener("click", function MasterPenggunaPage_Conditional_28_For_2_Conditional_19_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r5);
      const pengguna_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.konfirmasiAksi(pengguna_r4, "hapus"));
    });
    \u0275\u0275element(10, "ion-icon", 41);
    \u0275\u0275elementStart(11, "span");
    \u0275\u0275text(12, "Hapus");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const pengguna_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("id", "mp-menu-" + pengguna_r4.id_pengguna);
    \u0275\u0275attribute("aria-label", "Aksi untuk " + pengguna_r4.nama);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", pengguna_r4.is_deleted === 1);
  }
}
function MasterPenggunaPage_Conditional_28_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "button", 22);
    \u0275\u0275listener("click", function MasterPenggunaPage_Conditional_28_For_2_Template_button_click_1_listener() {
      const pengguna_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.bukaDetail(pengguna_r4));
    });
    \u0275\u0275elementStart(2, "div", 23);
    \u0275\u0275element(3, "ion-icon", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 25)(5, "div", 26)(6, "h3");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(8, MasterPenggunaPage_Conditional_28_For_2_Conditional_8_Template, 2, 0, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 28);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 29)(12, "span", 30);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, MasterPenggunaPage_Conditional_28_For_2_Conditional_14_Template, 2, 1, "span", 31);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "button", 32);
    \u0275\u0275listener("click", function MasterPenggunaPage_Conditional_28_For_2_Template_button_click_15_listener() {
      const pengguna_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.konfirmasiAksi(pengguna_r4, "status"));
    });
    \u0275\u0275element(16, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 33);
    \u0275\u0275listener("click", function MasterPenggunaPage_Conditional_28_For_2_Template_button_click_17_listener() {
      const pengguna_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggleMenu(pengguna_r4.id_pengguna));
    });
    \u0275\u0275element(18, "ion-icon", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(19, MasterPenggunaPage_Conditional_28_For_2_Conditional_19_Template, 13, 3, "div", 35);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pengguna_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("inactive", !pengguna_r4.aktif)("menu-open", ctx_r1.menuAkun === pengguna_r4.id_pengguna);
    \u0275\u0275attribute("data-pengguna-id", pengguna_r4.id_pengguna);
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", "Lihat detail akun " + pengguna_r4.nama);
    \u0275\u0275advance();
    \u0275\u0275classProp("avatar-mitra", pengguna_r4.peran === 5)("avatar-pengelola", pengguna_r4.peran === 4);
    \u0275\u0275advance();
    \u0275\u0275property("name", pengguna_r4.peran === 5 ? "bicycle-outline" : pengguna_r4.peran === 4 ? "shield-checkmark-outline" : "person-outline");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(pengguna_r4.nama);
    \u0275\u0275advance();
    \u0275\u0275conditional(!pengguna_r4.aktif ? 8 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(pengguna_r4.email);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.labelPeran[pengguna_r4.peran]);
    \u0275\u0275advance();
    \u0275\u0275conditional(pengguna_r4.nama_usaha ? 14 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("on", pengguna_r4.aktif === 1);
    \u0275\u0275property("disabled", ctx_r1.sedangUbahStatus || ctx_r1.sedangHapus);
    \u0275\u0275attribute("aria-checked", pengguna_r4.aktif === 1)("aria-label", (pengguna_r4.aktif ? "Nonaktifkan akun " : "Aktifkan akun ") + pengguna_r4.nama);
    \u0275\u0275advance(2);
    \u0275\u0275attribute("aria-label", "Aksi untuk " + pengguna_r4.nama)("aria-expanded", ctx_r1.menuAkun === pengguna_r4.id_pengguna)("aria-controls", "mp-menu-" + pengguna_r4.id_pengguna);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.menuAkun === pengguna_r4.id_pengguna ? 19 : -1);
  }
}
function MasterPenggunaPage_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275repeaterCreate(1, MasterPenggunaPage_Conditional_28_For_2_Template, 20, 25, "div", 20, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.daftarTertampil);
  }
}
function MasterPenggunaPage_Conditional_32_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" Akun ", item_r7.pengguna.nama, " akan hilang permanen. Akun yang sudah punya riwayat transaksi harus ditolak server. ");
  }
}
function MasterPenggunaPage_Conditional_32_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" Akun ", item_r7.pengguna.nama, " tidak bisa masuk sampai diaktifkan lagi. Riwayat transaksi tetap tersimpan. ");
  }
}
function MasterPenggunaPage_Conditional_32_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" Akun ", item_r7.pengguna.nama, " bisa masuk kembali setelah diaktifkan. ");
  }
}
function MasterPenggunaPage_Conditional_32_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 50);
    \u0275\u0275text(1, "Ketik HAPUS untuk melanjutkan");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function MasterPenggunaPage_Conditional_32_Conditional_10_Template_input_ngModelChange_2_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.teksKonfirmasiHapus, $event) || (ctx_r1.teksKonfirmasiHapus = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.teksKonfirmasiHapus);
    \u0275\u0275control();
  }
}
function MasterPenggunaPage_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275listener("click", function MasterPenggunaPage_Conditional_32_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.batalKonfirmasi());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(1, "section", 43)(2, "div", 44);
    \u0275\u0275element(3, "ion-icon", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 45);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 46);
    \u0275\u0275conditionalCreate(7, MasterPenggunaPage_Conditional_32_Conditional_7_Template, 1, 1)(8, MasterPenggunaPage_Conditional_32_Conditional_8_Template, 1, 1)(9, MasterPenggunaPage_Conditional_32_Conditional_9_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, MasterPenggunaPage_Conditional_32_Conditional_10_Template, 3, 1);
    \u0275\u0275elementStart(11, "div", 47)(12, "button", 48);
    \u0275\u0275listener("click", function MasterPenggunaPage_Conditional_32_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.batalKonfirmasi());
    });
    \u0275\u0275text(13, "Batal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 49);
    \u0275\u0275listener("click", function MasterPenggunaPage_Conditional_32_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.jalankanKonfirmasi());
    });
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r7 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275classProp("danger", item_r7.aksi === "hapus");
    \u0275\u0275advance();
    \u0275\u0275property("name", item_r7.aksi === "hapus" ? "trash-outline" : item_r7.pengguna.aktif ? "pause-circle-outline" : "checkmark-circle-outline");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r7.aksi === "hapus" ? "Hapus akun permanen?" : item_r7.pengguna.aktif ? "Nonaktifkan akun?" : "Aktifkan kembali akun?");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r7.aksi === "hapus" ? 7 : item_r7.pengguna.aktif ? 8 : 9);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(item_r7.aksi === "hapus" ? 10 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("danger", item_r7.aksi === "hapus");
    \u0275\u0275property("disabled", item_r7.aksi === "hapus" && ctx_r1.teksKonfirmasiHapus !== "HAPUS");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r7.aksi === "hapus" ? "Hapus permanen" : item_r7.pengguna.aktif ? "Nonaktifkan" : "Aktifkan", " ");
  }
}
var _MasterPenggunaPage = class _MasterPenggunaPage {
  constructor() {
    this.api = inject(MasterPenggunaService);
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.cdr = inject(ChangeDetectorRef);
    this.sedangUbahStatus = false;
    this.sedangHapus = false;
    this.menuAkun = null;
    this.konfirmasi = null;
    this.teksKonfirmasiHapus = "";
    this.sedangSinkronDaftar = false;
    this.labelPeran = LABEL_PERAN;
    this.daftarPengguna = [];
    this.daftarTertampil = [];
    this.sedangMuat = false;
    this.pesanError = "";
    this.kataKunci = "";
    this.filterPeran = "SEMUA";
  }
  ionViewWillEnter() {
    this.muatDaftar();
  }
  muatDaftar(event, pertahankanDaftar = false) {
    if (this.sedangSinkronDaftar) {
      void event?.target.complete();
      return;
    }
    this.sedangSinkronDaftar = true;
    this.sedangMuat = !pertahankanDaftar;
    this.pesanError = "";
    this.api.getListPengguna().pipe(timeout(15e3), finalize(() => {
      this.sedangSinkronDaftar = false;
      this.sedangMuat = false;
      void event?.target.complete();
      this.cdr.markForCheck();
    })).subscribe({
      next: (res) => {
        if (!Array.isArray(res?.data) || !res.data.every((p) => p && idValid(p.id_pengguna) && typeof p.nama === "string" && typeof p.email === "string" && [1, 2, 3, 4, 5].includes(p.peran) && [0, 1].includes(p.aktif) && [0, 1].includes(p.is_deleted))) {
          this.pesanError = "Format daftar akun dari server belum sesuai kontrak Pilahin.";
          return;
        }
        this.daftarPengguna = res.data;
        this.terapkanFilter();
      },
      error: () => {
        this.pesanError = "Gagal memuat daftar akun. Periksa koneksi lalu coba lagi.";
      }
    });
  }
  ubahFilterPeran(nilai) {
    const angka = Number(nilai);
    this.filterPeran = [1, 2, 3, 4, 5].includes(angka) ? angka : "SEMUA";
    this.terapkanFilter();
  }
  ubahKataKunci(nilai) {
    this.kataKunci = nilai;
    this.terapkanFilter();
  }
  terapkanFilter() {
    const kataKunciRapi = this.kataKunci.trim().toLowerCase();
    this.daftarTertampil = this.daftarPengguna.filter((p) => {
      const cocokPeran = this.filterPeran === "SEMUA" || p.peran === this.filterPeran;
      const cocokKataKunci = !kataKunciRapi || p.nama.toLowerCase().includes(kataKunciRapi) || p.email.toLowerCase().includes(kataKunciRapi);
      return cocokPeran && cocokKataKunci;
    });
  }
  bukaTambahPetugasMitra() {
    this.tutupMenu();
    this.navCtrl.navigateForward("/master-pengguna/form/tambah");
  }
  bukaUbah(pengguna) {
    this.tutupMenu();
    if (pengguna.is_deleted === 1) {
      void this.tampilToast("Pulihkan akun dahulu sebelum mengubahnya.", "warning");
      return;
    }
    this.navCtrl.navigateForward(`/master-pengguna/form/ubah?id=${pengguna.id_pengguna}`);
  }
  bukaDetail(pengguna) {
    this.tutupMenu();
    this.navCtrl.navigateForward(`/master-pengguna/detail/${pengguna.id_pengguna}`);
  }
  toggleMenu(id) {
    if (this.sedangUbahStatus || this.sedangHapus)
      return;
    this.menuAkun = this.menuAkun === id ? null : id;
  }
  tutupMenu() {
    this.menuAkun = null;
  }
  tutupMenuSaatKlikDiLuar(event) {
    if (this.menuAkun === null)
      return;
    const kartu = event.target instanceof Element ? event.target.closest(".mp-card") : null;
    if (Number(kartu?.getAttribute("data-pengguna-id")) !== this.menuAkun)
      this.tutupMenu();
  }
  konfirmasiAksi(pengguna, aksi) {
    if (this.sedangUbahStatus || this.sedangHapus)
      return;
    this.tutupMenu();
    this.teksKonfirmasiHapus = "";
    this.konfirmasi = { pengguna, aksi };
    setTimeout(() => document.getElementById("mp-dialog-cancel")?.focus(), 0);
  }
  batalKonfirmasi() {
    if (this.sedangUbahStatus || this.sedangHapus)
      return;
    this.konfirmasi = null;
    this.teksKonfirmasiHapus = "";
  }
  jalankanKonfirmasi() {
    const item = this.konfirmasi;
    if (!item)
      return;
    if (item.aksi === "hapus" && this.teksKonfirmasiHapus !== "HAPUS")
      return;
    this.konfirmasi = null;
    if (item.aksi === "hapus")
      this.prosesHapusPermanen(item.pengguna);
    else
      this.prosesTogelAktif(item.pengguna);
  }
  prosesTogelAktif(pengguna) {
    if (this.sedangUbahStatus)
      return;
    this.sedangUbahStatus = true;
    const menjadiAktif = pengguna.aktif === 0;
    const aksi = pengguna.aktif === 1 ? this.api.nonaktifkanPengguna(pengguna.id_pengguna) : this.api.aktifkanPengguna(pengguna.id_pengguna);
    aksi.pipe(timeout(2e4), finalize(() => {
      this.sedangUbahStatus = false;
      this.cdr.markForCheck();
    })).subscribe({
      next: () => {
        pengguna.aktif = menjadiAktif ? 1 : 0;
        pengguna.is_deleted = menjadiAktif ? 0 : 1;
        this.cdr.markForCheck();
        void this.tampilToast(menjadiAktif ? "Akun aktif kembali." : "Akun dinonaktifkan sementara.", "success");
        this.muatDaftar(void 0, true);
      },
      error: (err) => {
        void this.tampilToast(pesanApi(err), "danger");
      }
    });
  }
  prosesHapusPermanen(pengguna) {
    if (this.sedangHapus)
      return;
    this.sedangHapus = true;
    this.api.hapusPermanenPengguna(pengguna.id_pengguna).pipe(timeout(2e4), finalize(() => {
      this.sedangHapus = false;
      this.cdr.markForCheck();
    })).subscribe({
      next: () => {
        this.daftarPengguna = this.daftarPengguna.filter((p) => p.id_pengguna !== pengguna.id_pengguna);
        this.terapkanFilter();
        void this.tampilToast("Akun berhasil dihapus permanen.", "success");
        this.muatDaftar(void 0, true);
      },
      error: (err) => {
        const pesan = err?.status === 409 ? "Akun sudah punya riwayat atau masih dibutuhkan. Hapus permanen ditolak." : pesanApi(err);
        void this.tampilToast(pesan, "danger");
      }
    });
  }
  async tampilToast(pesan, warna) {
    const toast = await this.toastCtrl.create({
      message: pesan,
      duration: 2500,
      color: warna,
      position: "top"
    });
    await toast.present();
  }
};
_MasterPenggunaPage.\u0275fac = function MasterPenggunaPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MasterPenggunaPage)();
};
_MasterPenggunaPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MasterPenggunaPage, selectors: [["app-master-pengguna"]], hostBindings: function MasterPenggunaPage_HostBindings(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275listener("click", function MasterPenggunaPage_click_HostBindingHandler($event) {
      return ctx.tutupMenuSaatKlikDiLuar($event);
    }, \u0275\u0275resolveDocument);
  }
}, standalone: false, decls: 33, vars: 22, consts: [[1, "ion-no-border"], [1, "mp-toolbar"], ["slot", "start"], ["defaultHref", "/dashboard", "text", ""], [1, "mp-bg", 3, "fullscreen"], ["slot", "fixed", 3, "ionRefresh"], [1, "mp-container"], [1, "mp-searchbar-wrap"], ["placeholder", "Cari nama atau email...", "inputmode", "search", "mode", "ios", 3, "ionInput", "value"], ["role", "tablist", "aria-label", "Saring berdasarkan peran", 1, "mp-filter-scroll"], ["type", "button", "role", "tab", 3, "click"], [1, "mp-state-box"], [1, "mp-list"], ["vertical", "bottom", "horizontal", "end", "slot", "fixed"], ["aria-label", "Tambah petugas mitra", 1, "mp-fab", 3, "click"], ["name", "person-add-outline"], ["name", "crescent"], ["name", "cloud-offline-outline"], ["fill", "outline", "size", "small", 3, "click"], ["name", "people-outline"], [1, "mp-card", 3, "inactive", "menu-open"], [1, "mp-card"], ["type", "button", 1, "mp-open", 3, "click"], [1, "mp-avatar"], [3, "name"], [1, "mp-info"], [1, "mp-top-row"], [1, "mp-badge", "badge-nonaktif"], [1, "mp-email"], [1, "mp-tags"], [1, "mp-tag"], [1, "mp-tag", "tag-muted"], ["type", "button", "role", "switch", 1, "mp-status-switch", 3, "click", "disabled"], ["type", "button", 1, "mp-more", 3, "click"], ["name", "ellipsis-horizontal"], [1, "mp-action-menu", 3, "id"], ["type", "button", 3, "click"], ["name", "eye-outline"], ["type", "button", 3, "click", "disabled"], ["name", "create-outline"], ["type", "button", 1, "danger", 3, "click"], ["name", "trash-outline"], [1, "mp-confirm-backdrop", 3, "click"], ["role", "alertdialog", "aria-modal", "true", "aria-labelledby", "mp-confirm-title", "aria-describedby", "mp-confirm-message", 1, "mp-confirm"], [1, "mp-confirm-icon"], ["id", "mp-confirm-title"], ["id", "mp-confirm-message"], [1, "mp-confirm-actions"], ["id", "mp-dialog-cancel", "type", "button", 3, "click"], ["type", "button", 1, "primary", 3, "click", "disabled"], ["for", "mp-delete-confirm"], ["id", "mp-delete-confirm", "type", "text", "autocomplete", "off", 3, "ngModelChange", "ngModel"]], template: function MasterPenggunaPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header", 0)(1, "ion-toolbar", 1)(2, "ion-buttons", 2);
    \u0275\u0275element(3, "ion-back-button", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-title");
    \u0275\u0275text(5, "Master Pengguna");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "ion-content", 4)(7, "ion-refresher", 5);
    \u0275\u0275listener("ionRefresh", function MasterPenggunaPage_Template_ion_refresher_ionRefresh_7_listener($event) {
      return ctx.muatDaftar($event);
    });
    \u0275\u0275element(8, "ion-refresher-content");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 6)(10, "div", 7)(11, "ion-searchbar", 8);
    \u0275\u0275listener("ionInput", function MasterPenggunaPage_Template_ion_searchbar_ionInput_11_listener($event) {
      return ctx.ubahKataKunci($event.detail.value || "");
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 9)(13, "button", 10);
    \u0275\u0275listener("click", function MasterPenggunaPage_Template_button_click_13_listener() {
      return ctx.ubahFilterPeran("SEMUA");
    });
    \u0275\u0275text(14, "Semua");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 10);
    \u0275\u0275listener("click", function MasterPenggunaPage_Template_button_click_15_listener() {
      return ctx.ubahFilterPeran(1);
    });
    \u0275\u0275text(16, "Rumah Tangga");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 10);
    \u0275\u0275listener("click", function MasterPenggunaPage_Template_button_click_17_listener() {
      return ctx.ubahFilterPeran(2);
    });
    \u0275\u0275text(18, "UMKM");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 10);
    \u0275\u0275listener("click", function MasterPenggunaPage_Template_button_click_19_listener() {
      return ctx.ubahFilterPeran(3);
    });
    \u0275\u0275text(20, "Pedagang");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 10);
    \u0275\u0275listener("click", function MasterPenggunaPage_Template_button_click_21_listener() {
      return ctx.ubahFilterPeran(4);
    });
    \u0275\u0275text(22, "Pengelola");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 10);
    \u0275\u0275listener("click", function MasterPenggunaPage_Template_button_click_23_listener() {
      return ctx.ubahFilterPeran(5);
    });
    \u0275\u0275text(24, "Mitra");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(25, MasterPenggunaPage_Conditional_25_Template, 4, 0, "div", 11)(26, MasterPenggunaPage_Conditional_26_Template, 6, 1, "div", 11)(27, MasterPenggunaPage_Conditional_27_Template, 4, 0, "div", 11)(28, MasterPenggunaPage_Conditional_28_Template, 3, 0, "div", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "ion-fab", 13)(30, "ion-fab-button", 14);
    \u0275\u0275listener("click", function MasterPenggunaPage_Template_ion_fab_button_click_30_listener() {
      return ctx.bukaTambahPetugasMitra();
    });
    \u0275\u0275element(31, "ion-icon", 15);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(32, MasterPenggunaPage_Conditional_32_Template, 16, 10);
  }
  if (rf & 2) {
    let tmp_15_0;
    \u0275\u0275advance(6);
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx.kataKunci);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx.filterPeran === "SEMUA");
    \u0275\u0275attribute("aria-selected", ctx.filterPeran === "SEMUA");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx.filterPeran === 1);
    \u0275\u0275attribute("aria-selected", ctx.filterPeran === 1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx.filterPeran === 2);
    \u0275\u0275attribute("aria-selected", ctx.filterPeran === 2);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx.filterPeran === 3);
    \u0275\u0275attribute("aria-selected", ctx.filterPeran === 3);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx.filterPeran === 4);
    \u0275\u0275attribute("aria-selected", ctx.filterPeran === 4);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx.filterPeran === 5);
    \u0275\u0275attribute("aria-selected", ctx.filterPeran === 5);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.sedangMuat ? 25 : ctx.pesanError ? 26 : ctx.daftarTertampil.length === 0 ? 27 : 28);
    \u0275\u0275advance(7);
    \u0275\u0275conditional((tmp_15_0 = ctx.konfirmasi) ? 32 : -1, tmp_15_0);
  }
}, dependencies: [DefaultValueAccessor, NgControlStatus, NgModel, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonRefresher, IonRefresherContent, IonSearchbar, IonSpinner, IonTitle, IonToolbar, TextValueAccessorDirective, IonBackButton], styles: ['\n.mp-toolbar[_ngcontent-%COMP%] {\n  --background: #FFFFFF;\n  --color: #0F2A1D;\n}\n.mp-bg[_ngcontent-%COMP%] {\n  --background: #F8FAF9;\n}\n.mp-container[_ngcontent-%COMP%] {\n  padding: 8px 16px 100px;\n  max-width: 560px;\n  margin: 0 auto;\n}\n.mp-searchbar-wrap[_ngcontent-%COMP%] {\n  padding: 0 0 4px;\n}\n.mp-searchbar-wrap[_ngcontent-%COMP%]   ion-searchbar[_ngcontent-%COMP%] {\n  --background: #FFFFFF;\n  --border-radius: 14px;\n  --box-shadow: 0 2px 10px rgba(15, 42, 29, 0.06);\n  padding: 0;\n}\n.mp-filter-scroll[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 7px;\n  overflow-x: auto;\n  overscroll-behavior-x: contain;\n  -webkit-overflow-scrolling: touch;\n  scrollbar-width: none;\n  margin: 6px 0 16px;\n  padding: 3px 1px 5px;\n}\n.mp-filter-scroll[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n.mp-filter-scroll[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: none;\n  min-height: 42px;\n  padding: 7px 14px;\n  border: 1px solid transparent;\n  border-bottom: 2px solid transparent;\n  border-radius: 13px 13px 9px 9px;\n  background: transparent;\n  color: #587064;\n  font: inherit;\n  font-size: 13px;\n  font-weight: 600;\n  white-space: nowrap;\n  cursor: pointer;\n  transition: background 150ms ease, border-color 150ms ease;\n}\n.mp-filter-scroll[_ngcontent-%COMP%]   button.active[_ngcontent-%COMP%] {\n  background: rgba(34, 173, 92, 0.12);\n  border-color: rgba(34, 173, 92, 0.16);\n  border-bottom-color: #16813e;\n  color: #126934;\n}\n.mp-filter-scroll[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #16813e;\n  outline-offset: 2px;\n}\n.mp-state-box[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 48px 16px;\n  color: #64748B;\n  text-align: center;\n}\n.mp-state-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  color: #9CC9AC;\n}\n.mp-state-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n}\n.mp-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.mp-card[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: #FFFFFF;\n  border-radius: 16px;\n  padding: 8px 12px 8px 8px;\n  border: 1px solid #e2eae5;\n  transition: opacity 0.15s ease;\n}\n.mp-card.inactive[_ngcontent-%COMP%]   .mp-avatar[_ngcontent-%COMP%], \n.mp-card.inactive[_ngcontent-%COMP%]   .mp-info[_ngcontent-%COMP%] {\n  opacity: 0.66;\n}\n.mp-card.menu-open[_ngcontent-%COMP%] {\n  z-index: 30;\n}\n.mp-open[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  flex: 1;\n  min-width: 0;\n  gap: 12px;\n  padding: 4px;\n  border: 0;\n  background: none;\n  text-align: left;\n  cursor: pointer;\n}\n.mp-open[_ngcontent-%COMP%]:focus-visible, \n.mp-status-switch[_ngcontent-%COMP%]:focus-visible, \n.mp-more[_ngcontent-%COMP%]:focus-visible, \n.mp-action-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, \n.mp-confirm[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, \n.mp-confirm[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid #16813e;\n  outline-offset: 2px;\n}\n.mp-avatar[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background: #EAF6F0;\n  color: #22AD5C;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n}\n.mp-avatar.avatar-mitra[_ngcontent-%COMP%] {\n  background: #E7F2FE;\n  color: #1DA1F2;\n}\n.mp-avatar.avatar-pengelola[_ngcontent-%COMP%] {\n  background: #FFF1DE;\n  color: #D97706;\n}\n.mp-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.mp-top-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.mp-top-row[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 700;\n  color: #0F2A1D;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.mp-badge[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 10px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 999px;\n}\n.mp-badge.badge-nonaktif[_ngcontent-%COMP%] {\n  background: #FEE2E2;\n  color: #B91C1C;\n}\n.mp-email[_ngcontent-%COMP%] {\n  margin: 2px 0 6px;\n  font-size: 12.5px;\n  color: #64748B;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.mp-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.mp-tag[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  padding: 2px 9px;\n  border-radius: 999px;\n  background: #EAF6F0;\n  color: #22AD5C;\n}\n.mp-tag.tag-muted[_ngcontent-%COMP%] {\n  background: #F1F5F9;\n  color: #64748B;\n}\n.mp-status-switch[_ngcontent-%COMP%] {\n  position: relative;\n  flex: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  padding: 0;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  cursor: pointer;\n}\n.mp-status-switch[_ngcontent-%COMP%]:disabled {\n  cursor: wait;\n}\n.mp-status-switch[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  width: 34px;\n  height: 20px;\n  border-radius: 999px;\n  background: #cbd5d1;\n  transition: background 240ms ease;\n}\n.mp-status-switch[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 7px;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  background: #fff;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16);\n  transform: translateX(0);\n  transition: transform 240ms ease;\n}\n.mp-status-switch.on[_ngcontent-%COMP%]::before {\n  background: #22ad5c;\n}\n.mp-status-switch.on[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\n  transform: translateX(14px);\n}\n.mp-more[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  margin-right: -7px;\n  border: 0;\n  border-radius: 12px;\n  background: transparent;\n  color: #365746;\n  font-size: 21px;\n  cursor: pointer;\n}\n.mp-more[aria-expanded=true][_ngcontent-%COMP%] {\n  background: #eaf6ee;\n}\n.mp-action-menu[_ngcontent-%COMP%] {\n  position: absolute;\n  z-index: 40;\n  right: 0;\n  bottom: calc(100% + 8px);\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 4px;\n  width: min(236px, 100vw - 42px);\n  padding: 8px;\n  border: 1px solid #deebe2;\n  border-radius: 16px;\n  background: #fff;\n  box-shadow: 0 12px 34px rgba(15, 42, 29, 0.16);\n  transform-origin: bottom right;\n  animation: _ngcontent-%COMP%_mp-menu-in 180ms ease-out both;\n}\n.mp-action-menu[_ngcontent-%COMP%]::after {\n  content: "";\n  position: absolute;\n  right: 20px;\n  bottom: -7px;\n  width: 12px;\n  height: 12px;\n  background: #fff;\n  border-right: 1px solid #deebe2;\n  border-bottom: 1px solid #deebe2;\n  transform: rotate(45deg);\n}\n.mp-action-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  min-height: 62px;\n  border: 0;\n  border-radius: 11px;\n  background: #f5f9f6;\n  color: #234935;\n  font: inherit;\n  font-size: 10px;\n  font-weight: 600;\n  cursor: pointer;\n  animation: _ngcontent-%COMP%_mp-action-in 220ms cubic-bezier(0.2, 0.8, 0.2, 1) both;\n}\n.mp-action-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 35ms;\n}\n.mp-action-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 95ms;\n}\n.mp-action-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 155ms;\n}\n.mp-action-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.mp-action-menu[_ngcontent-%COMP%]   button.danger[_ngcontent-%COMP%] {\n  background: #fff4f2;\n  color: #b64032;\n}\n.mp-action-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n@keyframes _ngcontent-%COMP%_mp-menu-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@keyframes _ngcontent-%COMP%_mp-action-in {\n  from {\n    opacity: 0;\n    transform: translateY(7px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .mp-action-menu[_ngcontent-%COMP%], \n   .mp-action-menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n.mp-confirm-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 100;\n  inset: 0;\n  background: rgba(12, 36, 22, 0.34);\n}\n.mp-confirm[_ngcontent-%COMP%] {\n  position: fixed;\n  z-index: 101;\n  top: 50%;\n  left: 50%;\n  width: min(100vw - 40px, 360px);\n  transform: translate(-50%, -50%);\n  padding: 23px 20px 18px;\n  border-radius: 22px;\n  background: #fff;\n  box-shadow: 0 24px 60px rgba(12, 36, 22, 0.22);\n  text-align: center;\n}\n.mp-confirm[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 12px 0 6px;\n  color: #143522;\n  font-size: 19px;\n}\n.mp-confirm[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 19px;\n  color: #53695d;\n  font-size: 13px;\n  line-height: 1.5;\n}\n.mp-confirm[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 7px;\n  color: #485a4d;\n  font-size: 12px;\n  text-align: left;\n}\n.mp-confirm[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 42px;\n  margin-bottom: 16px;\n  padding: 8px 12px;\n  border: 1px solid #cbd9cf;\n  border-radius: 10px;\n  font: inherit;\n}\n.mp-confirm-icon[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  margin: 0 auto;\n  border-radius: 14px;\n  background: #e7f6ec;\n  color: #16813e;\n  font-size: 26px;\n}\n.mp-confirm-icon.danger[_ngcontent-%COMP%] {\n  background: #fff0ed;\n  color: #b64032;\n}\n.mp-confirm-actions[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 9px;\n}\n.mp-confirm-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 0;\n  border-radius: 11px;\n  background: #edf2ee;\n  color: #355444;\n  font: inherit;\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n}\n.mp-confirm-actions[_ngcontent-%COMP%]   button.primary[_ngcontent-%COMP%] {\n  background: #16813e;\n  color: #fff;\n}\n.mp-confirm-actions[_ngcontent-%COMP%]   button.danger[_ngcontent-%COMP%] {\n  background: #b64032;\n}\n.mp-confirm-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.mp-fab[_ngcontent-%COMP%] {\n  --background: #22AD5C;\n  --background-activated: #1C9650;\n  --box-shadow: 0 6px 16px rgba(34, 173, 92, 0.35);\n}\n/*# sourceMappingURL=master-pengguna.page.css.map */'] });
var MasterPenggunaPage = _MasterPenggunaPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MasterPenggunaPage, [{
    type: Component,
    args: [{ selector: "app-master-pengguna", standalone: false, template: `<ion-header class="ion-no-border">\r
  <ion-toolbar class="mp-toolbar">\r
    <ion-buttons slot="start">\r
      <ion-back-button defaultHref="/dashboard" text=""></ion-back-button>\r
    </ion-buttons>\r
    <ion-title>Master Pengguna</ion-title>\r
  </ion-toolbar>\r
</ion-header>\r
\r
<ion-content [fullscreen]="true" class="mp-bg">\r
  <ion-refresher slot="fixed" (ionRefresh)="muatDaftar($event)">\r
    <ion-refresher-content></ion-refresher-content>\r
  </ion-refresher>\r
\r
  <div class="mp-container">\r
\r
    <div class="mp-searchbar-wrap">\r
      <ion-searchbar\r
        placeholder="Cari nama atau email..."\r
        [value]="kataKunci"\r
        (ionInput)="ubahKataKunci($event.detail.value || '')"\r
        inputmode="search"\r
        mode="ios">\r
      </ion-searchbar>\r
    </div>\r
\r
    <div class="mp-filter-scroll" role="tablist" aria-label="Saring berdasarkan peran">\r
      <button type="button" role="tab" [class.active]="filterPeran === 'SEMUA'" [attr.aria-selected]="filterPeran === 'SEMUA'" (click)="ubahFilterPeran('SEMUA')">Semua</button>\r
      <button type="button" role="tab" [class.active]="filterPeran === 1" [attr.aria-selected]="filterPeran === 1" (click)="ubahFilterPeran(1)">Rumah Tangga</button>\r
      <button type="button" role="tab" [class.active]="filterPeran === 2" [attr.aria-selected]="filterPeran === 2" (click)="ubahFilterPeran(2)">UMKM</button>\r
      <button type="button" role="tab" [class.active]="filterPeran === 3" [attr.aria-selected]="filterPeran === 3" (click)="ubahFilterPeran(3)">Pedagang</button>\r
      <button type="button" role="tab" [class.active]="filterPeran === 4" [attr.aria-selected]="filterPeran === 4" (click)="ubahFilterPeran(4)">Pengelola</button>\r
      <button type="button" role="tab" [class.active]="filterPeran === 5" [attr.aria-selected]="filterPeran === 5" (click)="ubahFilterPeran(5)">Mitra</button>\r
    </div>\r
\r
    @if (sedangMuat) {\r
      <div class="mp-state-box">\r
        <ion-spinner name="crescent"></ion-spinner>\r
        <p>Memuat daftar akun...</p>\r
      </div>\r
    } @else if (pesanError) {\r
      <div class="mp-state-box">\r
        <ion-icon name="cloud-offline-outline"></ion-icon>\r
        <p>{{ pesanError }}</p>\r
        <ion-button fill="outline" size="small" (click)="muatDaftar()">Coba Lagi</ion-button>\r
      </div>\r
    } @else if (daftarTertampil.length === 0) {\r
      <div class="mp-state-box">\r
        <ion-icon name="people-outline"></ion-icon>\r
        <p>Tidak ada akun yang cocok dengan pencarian/filter ini.</p>\r
      </div>\r
    } @else {\r
      <div class="mp-list">\r
        @for (pengguna of daftarTertampil; track pengguna.id_pengguna) {\r
          <div class="mp-card" [class.inactive]="!pengguna.aktif" [class.menu-open]="menuAkun === pengguna.id_pengguna" [attr.data-pengguna-id]="pengguna.id_pengguna">\r
            <button type="button" class="mp-open" (click)="bukaDetail(pengguna)" [attr.aria-label]="'Lihat detail akun ' + pengguna.nama">\r
            <div class="mp-avatar" [class.avatar-mitra]="pengguna.peran === 5" [class.avatar-pengelola]="pengguna.peran === 4">\r
              <ion-icon [name]="pengguna.peran === 5 ? 'bicycle-outline' : (pengguna.peran === 4 ? 'shield-checkmark-outline' : 'person-outline')"></ion-icon>\r
            </div>\r
\r
            <div class="mp-info">\r
              <div class="mp-top-row">\r
                <h3>{{ pengguna.nama }}</h3>\r
                @if (!pengguna.aktif) {\r
                  <span class="mp-badge badge-nonaktif">Nonaktif</span>\r
                }\r
              </div>\r
              <p class="mp-email">{{ pengguna.email }}</p>\r
              <div class="mp-tags">\r
                <span class="mp-tag">{{ labelPeran[pengguna.peran] }}</span>\r
                @if (pengguna.nama_usaha) {\r
                  <span class="mp-tag tag-muted">{{ pengguna.nama_usaha }}</span>\r
                }\r
              </div>\r
            </div>\r
            </button>\r
\r
            <button type="button" role="switch" class="mp-status-switch" [class.on]="pengguna.aktif === 1"\r
              [attr.aria-checked]="pengguna.aktif === 1"\r
              [attr.aria-label]="(pengguna.aktif ? 'Nonaktifkan akun ' : 'Aktifkan akun ') + pengguna.nama"\r
              [disabled]="sedangUbahStatus || sedangHapus" (click)="konfirmasiAksi(pengguna, 'status')"><span></span></button>\r
            <button type="button" class="mp-more" [attr.aria-label]="'Aksi untuk ' + pengguna.nama"\r
              [attr.aria-expanded]="menuAkun === pengguna.id_pengguna" [attr.aria-controls]="'mp-menu-' + pengguna.id_pengguna"\r
              (click)="toggleMenu(pengguna.id_pengguna)">\r
              <ion-icon name="ellipsis-horizontal"></ion-icon>\r
            </button>\r
\r
            @if (menuAkun === pengguna.id_pengguna) {\r
              <div class="mp-action-menu" [id]="'mp-menu-' + pengguna.id_pengguna" [attr.aria-label]="'Aksi untuk ' + pengguna.nama">\r
                <button type="button" (click)="bukaDetail(pengguna)">\r
                  <ion-icon name="eye-outline"></ion-icon><span>Detail</span>\r
                </button>\r
                <button type="button" [disabled]="pengguna.is_deleted === 1" (click)="bukaUbah(pengguna)">\r
                  <ion-icon name="create-outline"></ion-icon><span>Edit</span>\r
                </button>\r
                <button type="button" class="danger" (click)="konfirmasiAksi(pengguna, 'hapus')">\r
                  <ion-icon name="trash-outline"></ion-icon><span>Hapus</span>\r
                </button>\r
              </div>\r
            }\r
          </div>\r
        }\r
      </div>\r
    }\r
\r
  </div>\r
\r
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">\r
    <ion-fab-button class="mp-fab" aria-label="Tambah petugas mitra" (click)="bukaTambahPetugasMitra()">\r
      <ion-icon name="person-add-outline"></ion-icon>\r
    </ion-fab-button>\r
  </ion-fab>\r
</ion-content>\r
\r
@if (konfirmasi; as item) {\r
  <div class="mp-confirm-backdrop" (click)="batalKonfirmasi()"></div>\r
  <section class="mp-confirm" role="alertdialog" aria-modal="true" aria-labelledby="mp-confirm-title" aria-describedby="mp-confirm-message">\r
    <div class="mp-confirm-icon" [class.danger]="item.aksi === 'hapus'">\r
      <ion-icon [name]="item.aksi === 'hapus' ? 'trash-outline' : (item.pengguna.aktif ? 'pause-circle-outline' : 'checkmark-circle-outline')"></ion-icon>\r
    </div>\r
    <h2 id="mp-confirm-title">{{ item.aksi === 'hapus' ? 'Hapus akun permanen?' : (item.pengguna.aktif ? 'Nonaktifkan akun?' : 'Aktifkan kembali akun?') }}</h2>\r
    <p id="mp-confirm-message">\r
      @if (item.aksi === 'hapus') {\r
        Akun {{ item.pengguna.nama }} akan hilang permanen. Akun yang sudah punya riwayat transaksi harus ditolak server.\r
      } @else if (item.pengguna.aktif) {\r
        Akun {{ item.pengguna.nama }} tidak bisa masuk sampai diaktifkan lagi. Riwayat transaksi tetap tersimpan.\r
      } @else {\r
        Akun {{ item.pengguna.nama }} bisa masuk kembali setelah diaktifkan.\r
      }\r
    </p>\r
    @if (item.aksi === 'hapus') {\r
      <label for="mp-delete-confirm">Ketik HAPUS untuk melanjutkan</label>\r
      <input id="mp-delete-confirm" type="text" autocomplete="off" [(ngModel)]="teksKonfirmasiHapus" />\r
    }\r
    <div class="mp-confirm-actions">\r
      <button id="mp-dialog-cancel" type="button" (click)="batalKonfirmasi()">Batal</button>\r
      <button type="button" class="primary" [class.danger]="item.aksi === 'hapus'"\r
        [disabled]="item.aksi === 'hapus' && teksKonfirmasiHapus !== 'HAPUS'"\r
        (click)="jalankanKonfirmasi()">\r
        {{ item.aksi === 'hapus' ? 'Hapus permanen' : (item.pengguna.aktif ? 'Nonaktifkan' : 'Aktifkan') }}\r
      </button>\r
    </div>\r
  </section>\r
}\r
`, styles: ['/* src/app/master-pengguna/master-pengguna.page.scss */\n.mp-toolbar {\n  --background: #FFFFFF;\n  --color: #0F2A1D;\n}\n.mp-bg {\n  --background: #F8FAF9;\n}\n.mp-container {\n  padding: 8px 16px 100px;\n  max-width: 560px;\n  margin: 0 auto;\n}\n.mp-searchbar-wrap {\n  padding: 0 0 4px;\n}\n.mp-searchbar-wrap ion-searchbar {\n  --background: #FFFFFF;\n  --border-radius: 14px;\n  --box-shadow: 0 2px 10px rgba(15, 42, 29, 0.06);\n  padding: 0;\n}\n.mp-filter-scroll {\n  display: flex;\n  gap: 7px;\n  overflow-x: auto;\n  overscroll-behavior-x: contain;\n  -webkit-overflow-scrolling: touch;\n  scrollbar-width: none;\n  margin: 6px 0 16px;\n  padding: 3px 1px 5px;\n}\n.mp-filter-scroll::-webkit-scrollbar {\n  display: none;\n}\n.mp-filter-scroll button {\n  flex: none;\n  min-height: 42px;\n  padding: 7px 14px;\n  border: 1px solid transparent;\n  border-bottom: 2px solid transparent;\n  border-radius: 13px 13px 9px 9px;\n  background: transparent;\n  color: #587064;\n  font: inherit;\n  font-size: 13px;\n  font-weight: 600;\n  white-space: nowrap;\n  cursor: pointer;\n  transition: background 150ms ease, border-color 150ms ease;\n}\n.mp-filter-scroll button.active {\n  background: rgba(34, 173, 92, 0.12);\n  border-color: rgba(34, 173, 92, 0.16);\n  border-bottom-color: #16813e;\n  color: #126934;\n}\n.mp-filter-scroll button:focus-visible {\n  outline: 2px solid #16813e;\n  outline-offset: 2px;\n}\n.mp-state-box {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 48px 16px;\n  color: #64748B;\n  text-align: center;\n}\n.mp-state-box ion-icon {\n  font-size: 40px;\n  color: #9CC9AC;\n}\n.mp-state-box p {\n  margin: 0;\n  font-size: 14px;\n}\n.mp-list {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.mp-card {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  background: #FFFFFF;\n  border-radius: 16px;\n  padding: 8px 12px 8px 8px;\n  border: 1px solid #e2eae5;\n  transition: opacity 0.15s ease;\n}\n.mp-card.inactive .mp-avatar,\n.mp-card.inactive .mp-info {\n  opacity: 0.66;\n}\n.mp-card.menu-open {\n  z-index: 30;\n}\n.mp-open {\n  display: flex;\n  align-items: center;\n  flex: 1;\n  min-width: 0;\n  gap: 12px;\n  padding: 4px;\n  border: 0;\n  background: none;\n  text-align: left;\n  cursor: pointer;\n}\n.mp-open:focus-visible,\n.mp-status-switch:focus-visible,\n.mp-more:focus-visible,\n.mp-action-menu button:focus-visible,\n.mp-confirm button:focus-visible,\n.mp-confirm input:focus-visible {\n  outline: 2px solid #16813e;\n  outline-offset: 2px;\n}\n.mp-avatar {\n  flex-shrink: 0;\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  background: #EAF6F0;\n  color: #22AD5C;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n}\n.mp-avatar.avatar-mitra {\n  background: #E7F2FE;\n  color: #1DA1F2;\n}\n.mp-avatar.avatar-pengelola {\n  background: #FFF1DE;\n  color: #D97706;\n}\n.mp-info {\n  flex: 1;\n  min-width: 0;\n}\n.mp-top-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.mp-top-row h3 {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 700;\n  color: #0F2A1D;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.mp-badge {\n  flex-shrink: 0;\n  font-size: 10px;\n  font-weight: 700;\n  padding: 2px 8px;\n  border-radius: 999px;\n}\n.mp-badge.badge-nonaktif {\n  background: #FEE2E2;\n  color: #B91C1C;\n}\n.mp-email {\n  margin: 2px 0 6px;\n  font-size: 12.5px;\n  color: #64748B;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.mp-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.mp-tag {\n  font-size: 11px;\n  font-weight: 600;\n  padding: 2px 9px;\n  border-radius: 999px;\n  background: #EAF6F0;\n  color: #22AD5C;\n}\n.mp-tag.tag-muted {\n  background: #F1F5F9;\n  color: #64748B;\n}\n.mp-status-switch {\n  position: relative;\n  flex: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  padding: 0;\n  border: 0;\n  border-radius: 999px;\n  background: transparent;\n  cursor: pointer;\n}\n.mp-status-switch:disabled {\n  cursor: wait;\n}\n.mp-status-switch::before {\n  content: "";\n  position: absolute;\n  width: 34px;\n  height: 20px;\n  border-radius: 999px;\n  background: #cbd5d1;\n  transition: background 240ms ease;\n}\n.mp-status-switch > span {\n  position: absolute;\n  left: 7px;\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n  background: #fff;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16);\n  transform: translateX(0);\n  transition: transform 240ms ease;\n}\n.mp-status-switch.on::before {\n  background: #22ad5c;\n}\n.mp-status-switch.on > span {\n  transform: translateX(14px);\n}\n.mp-more {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  margin-right: -7px;\n  border: 0;\n  border-radius: 12px;\n  background: transparent;\n  color: #365746;\n  font-size: 21px;\n  cursor: pointer;\n}\n.mp-more[aria-expanded=true] {\n  background: #eaf6ee;\n}\n.mp-action-menu {\n  position: absolute;\n  z-index: 40;\n  right: 0;\n  bottom: calc(100% + 8px);\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 4px;\n  width: min(236px, 100vw - 42px);\n  padding: 8px;\n  border: 1px solid #deebe2;\n  border-radius: 16px;\n  background: #fff;\n  box-shadow: 0 12px 34px rgba(15, 42, 29, 0.16);\n  transform-origin: bottom right;\n  animation: mp-menu-in 180ms ease-out both;\n}\n.mp-action-menu::after {\n  content: "";\n  position: absolute;\n  right: 20px;\n  bottom: -7px;\n  width: 12px;\n  height: 12px;\n  background: #fff;\n  border-right: 1px solid #deebe2;\n  border-bottom: 1px solid #deebe2;\n  transform: rotate(45deg);\n}\n.mp-action-menu button {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 5px;\n  min-height: 62px;\n  border: 0;\n  border-radius: 11px;\n  background: #f5f9f6;\n  color: #234935;\n  font: inherit;\n  font-size: 10px;\n  font-weight: 600;\n  cursor: pointer;\n  animation: mp-action-in 220ms cubic-bezier(0.2, 0.8, 0.2, 1) both;\n}\n.mp-action-menu button:nth-child(1) {\n  animation-delay: 35ms;\n}\n.mp-action-menu button:nth-child(2) {\n  animation-delay: 95ms;\n}\n.mp-action-menu button:nth-child(3) {\n  animation-delay: 155ms;\n}\n.mp-action-menu button ion-icon {\n  font-size: 20px;\n}\n.mp-action-menu button.danger {\n  background: #fff4f2;\n  color: #b64032;\n}\n.mp-action-menu button:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n@keyframes mp-menu-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px) scale(0.95);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0) scale(1);\n  }\n}\n@keyframes mp-action-in {\n  from {\n    opacity: 0;\n    transform: translateY(7px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .mp-action-menu,\n  .mp-action-menu button {\n    animation: none;\n  }\n}\n.mp-confirm-backdrop {\n  position: fixed;\n  z-index: 100;\n  inset: 0;\n  background: rgba(12, 36, 22, 0.34);\n}\n.mp-confirm {\n  position: fixed;\n  z-index: 101;\n  top: 50%;\n  left: 50%;\n  width: min(100vw - 40px, 360px);\n  transform: translate(-50%, -50%);\n  padding: 23px 20px 18px;\n  border-radius: 22px;\n  background: #fff;\n  box-shadow: 0 24px 60px rgba(12, 36, 22, 0.22);\n  text-align: center;\n}\n.mp-confirm h2 {\n  margin: 12px 0 6px;\n  color: #143522;\n  font-size: 19px;\n}\n.mp-confirm p {\n  margin: 0 0 19px;\n  color: #53695d;\n  font-size: 13px;\n  line-height: 1.5;\n}\n.mp-confirm label {\n  display: block;\n  margin-bottom: 7px;\n  color: #485a4d;\n  font-size: 12px;\n  text-align: left;\n}\n.mp-confirm input {\n  width: 100%;\n  min-height: 42px;\n  margin-bottom: 16px;\n  padding: 8px 12px;\n  border: 1px solid #cbd9cf;\n  border-radius: 10px;\n  font: inherit;\n}\n.mp-confirm-icon {\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  margin: 0 auto;\n  border-radius: 14px;\n  background: #e7f6ec;\n  color: #16813e;\n  font-size: 26px;\n}\n.mp-confirm-icon.danger {\n  background: #fff0ed;\n  color: #b64032;\n}\n.mp-confirm-actions {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 9px;\n}\n.mp-confirm-actions button {\n  min-height: 44px;\n  border: 0;\n  border-radius: 11px;\n  background: #edf2ee;\n  color: #355444;\n  font: inherit;\n  font-size: 13px;\n  font-weight: 700;\n  cursor: pointer;\n}\n.mp-confirm-actions button.primary {\n  background: #16813e;\n  color: #fff;\n}\n.mp-confirm-actions button.danger {\n  background: #b64032;\n}\n.mp-confirm-actions button:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.mp-fab {\n  --background: #22AD5C;\n  --background-activated: #1C9650;\n  --box-shadow: 0 6px 16px rgba(34, 173, 92, 0.35);\n}\n/*# sourceMappingURL=master-pengguna.page.css.map */\n'] }]
  }], null, { tutupMenuSaatKlikDiLuar: [{
    type: HostListener,
    args: ["document:click", ["$event"]]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MasterPenggunaPage, { className: "MasterPenggunaPage", filePath: "src/app/master-pengguna/master-pengguna.page.ts", lineNumber: 14 });
})();

// src/app/master-pengguna/master-pengguna-routing.module.ts
var routes = [
  {
    path: "",
    canActivate: [pengelolaGuard],
    component: MasterPenggunaPage
  },
  {
    path: "detail/:id",
    canActivate: [pengelolaGuard],
    loadChildren: () => import("./detail-pengguna.module-V7O2HDCM.js").then((m) => m.DetailPenggunaPageModule)
  },
  {
    path: "form/:mode",
    canActivate: [pengelolaGuard],
    // mode: 'tambah' | 'ubah'. id akun ubah dikirim lewat query param ?id=
    loadChildren: () => import("./form-pengguna.module-X5NEHVB2.js").then((m) => m.FormPenggunaPageModule)
  }
];
var _MasterPenggunaPageRoutingModule = class _MasterPenggunaPageRoutingModule {
};
_MasterPenggunaPageRoutingModule.\u0275fac = function MasterPenggunaPageRoutingModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MasterPenggunaPageRoutingModule)();
};
_MasterPenggunaPageRoutingModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _MasterPenggunaPageRoutingModule });
_MasterPenggunaPageRoutingModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
var MasterPenggunaPageRoutingModule = _MasterPenggunaPageRoutingModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MasterPenggunaPageRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/master-pengguna/master-pengguna.module.ts
var _MasterPenggunaPageModule = class _MasterPenggunaPageModule {
};
_MasterPenggunaPageModule.\u0275fac = function MasterPenggunaPageModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _MasterPenggunaPageModule)();
};
_MasterPenggunaPageModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _MasterPenggunaPageModule });
_MasterPenggunaPageModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
  CommonModule,
  FormsModule,
  IonicModule,
  MasterPenggunaPageRoutingModule
] });
var MasterPenggunaPageModule = _MasterPenggunaPageModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MasterPenggunaPageModule, [{
    type: NgModule,
    args: [{
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MasterPenggunaPageRoutingModule
      ],
      declarations: [MasterPenggunaPage]
    }]
  }], null, null);
})();
export {
  MasterPenggunaPageModule
};
//# sourceMappingURL=master-pengguna.module-DHRQ4BLD.js.map
