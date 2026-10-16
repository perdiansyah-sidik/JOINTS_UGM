import {
  LABEL_PERAN,
  MasterPenggunaService,
  idValid,
  normalisasiHp,
  payloadUbah,
  pesanApi,
  validasiPengguna
} from "./chunk-4J7JPUME.js";
import "./chunk-3ROYJO5F.js";
import {
  ToastController
} from "./chunk-LTX2EDXK.js";
import {
  ActivatedRoute,
  ChangeDetectorRef,
  CommonModule,
  Component,
  DefaultValueAccessor,
  FormsModule,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonicModule,
  MaxLengthValidator,
  NavController,
  NgControlStatus,
  NgModel,
  NgModule,
  NgSelectOption,
  RouterModule,
  SelectControlValueAccessor,
  finalize,
  inject,
  setClassMetadata,
  timeout,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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

// src/app/master-pengguna/form-pengguna/form-pengguna.page.ts
var _forTrack0 = ($index, $item) => $item.id_mitra;
function FormPenggunaPage_Conditional_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Memuat organisasi...");
    \u0275\u0275elementEnd();
  }
}
function FormPenggunaPage_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "ion-button", 9);
    \u0275\u0275listener("click", function FormPenggunaPage_Conditional_8_Conditional_1_Template_ion_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.muatDaftarMitra());
    });
    \u0275\u0275text(3, "Coba lagi");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.errorMitra);
  }
}
function FormPenggunaPage_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1, "Belum ada organisasi yang dapat dipilih. Hubungi pengelola mitra.");
    \u0275\u0275elementEnd();
  }
}
function FormPenggunaPage_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, FormPenggunaPage_Conditional_8_Conditional_0_Template, 2, 0, "p", 7)(1, FormPenggunaPage_Conditional_8_Conditional_1_Template, 4, 1)(2, FormPenggunaPage_Conditional_8_Conditional_2_Template, 2, 0, "p", 7);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.sedangMuatMitra ? 0 : ctx_r1.errorMitra ? 1 : ctx_r1.daftarMitra.length === 0 && (ctx_r1.isTambah || !ctx_r1.kuncOrganisasiDanPeran) ? 2 : -1);
  }
}
function FormPenggunaPage_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "ion-spinner", 10);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Memuat data akun...");
    \u0275\u0275elementEnd()();
  }
}
function FormPenggunaPage_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "ion-icon", 11);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-button", 12);
    \u0275\u0275listener("click", function FormPenggunaPage_Conditional_10_Template_ion_button_click_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.batal());
    });
    \u0275\u0275text(5, "Kembali");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.pesanError);
  }
}
function FormPenggunaPage_Conditional_11_Conditional_0_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const mitra_r5 = ctx.$implicit;
    \u0275\u0275property("ngValue", mitra_r5.id_mitra);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(mitra_r5.nama_mitra);
  }
}
function FormPenggunaPage_Conditional_11_Conditional_0_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-spinner", 10);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\xA0Menyimpan...");
    \u0275\u0275elementEnd();
  }
}
function FormPenggunaPage_Conditional_11_Conditional_0_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Buat Akun Petugas");
    \u0275\u0275elementEnd();
  }
}
function FormPenggunaPage_Conditional_11_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "p", 14);
    \u0275\u0275text(2, "Akun ini otomatis berperan ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4, "Mitra (Petugas)");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " dan terikat pada satu organisasi mitra.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 15)(7, "label", 16);
    \u0275\u0275text(8, "Nama Lengkap");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 17);
    \u0275\u0275element(10, "ion-icon", 18);
    \u0275\u0275elementStart(11, "input", 19);
    \u0275\u0275listener("blur", function FormPenggunaPage_Conditional_11_Conditional_0_Template_input_blur_11_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.sentuh("nama"));
    });
    \u0275\u0275twoWayListener("ngModelChange", function FormPenggunaPage_Conditional_11_Conditional_0_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.formTambah.nama, $event) || (ctx_r1.formTambah.nama = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 20);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 15)(15, "label", 21);
    \u0275\u0275text(16, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 17);
    \u0275\u0275element(18, "ion-icon", 22);
    \u0275\u0275elementStart(19, "input", 23);
    \u0275\u0275listener("blur", function FormPenggunaPage_Conditional_11_Conditional_0_Template_input_blur_19_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.sentuh("email"));
    });
    \u0275\u0275twoWayListener("ngModelChange", function FormPenggunaPage_Conditional_11_Conditional_0_Template_input_ngModelChange_19_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.formTambah.email, $event) || (ctx_r1.formTambah.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 24);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 15)(23, "label", 25);
    \u0275\u0275text(24, "Nomor HP ");
    \u0275\u0275elementStart(25, "span", 26);
    \u0275\u0275text(26, "(opsional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 17);
    \u0275\u0275element(28, "ion-icon", 27);
    \u0275\u0275elementStart(29, "input", 28);
    \u0275\u0275listener("blur", function FormPenggunaPage_Conditional_11_Conditional_0_Template_input_blur_29_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.sentuh("no_hp"));
    });
    \u0275\u0275twoWayListener("ngModelChange", function FormPenggunaPage_Conditional_11_Conditional_0_Template_input_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.formTambah.no_hp, $event) || (ctx_r1.formTambah.no_hp = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "p", 29);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 15)(33, "label", 30);
    \u0275\u0275text(34, "Organisasi Mitra");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 31);
    \u0275\u0275element(36, "ion-icon", 32);
    \u0275\u0275elementStart(37, "select", 33);
    \u0275\u0275listener("blur", function FormPenggunaPage_Conditional_11_Conditional_0_Template_select_blur_37_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.sentuh("id_mitra"));
    });
    \u0275\u0275twoWayListener("ngModelChange", function FormPenggunaPage_Conditional_11_Conditional_0_Template_select_ngModelChange_37_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.formTambah.id_mitra, $event) || (ctx_r1.formTambah.id_mitra = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(38, "option", 34);
    \u0275\u0275text(39, "Pilih organisasi...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(40, FormPenggunaPage_Conditional_11_Conditional_0_For_41_Template, 2, 2, "option", 35, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "p", 36);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 15)(45, "label", 37);
    \u0275\u0275text(46, "Password Awal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "div", 17);
    \u0275\u0275element(48, "ion-icon", 38);
    \u0275\u0275elementStart(49, "input", 39);
    \u0275\u0275listener("blur", function FormPenggunaPage_Conditional_11_Conditional_0_Template_input_blur_49_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.sentuh("password"));
    });
    \u0275\u0275twoWayListener("ngModelChange", function FormPenggunaPage_Conditional_11_Conditional_0_Template_input_ngModelChange_49_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.formTambah.password, $event) || (ctx_r1.formTambah.password = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(50, "button", 40);
    \u0275\u0275listener("click", function FormPenggunaPage_Conditional_11_Conditional_0_Template_button_click_50_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.tampilkanSandi = !ctx_r1.tampilkanSandi);
    });
    \u0275\u0275element(51, "ion-icon", 41);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "p", 42);
    \u0275\u0275text(53);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "ion-button", 43);
    \u0275\u0275listener("click", function FormPenggunaPage_Conditional_11_Conditional_0_Template_ion_button_click_54_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.simpanTambah());
    });
    \u0275\u0275conditionalCreate(55, FormPenggunaPage_Conditional_11_Conditional_0_Conditional_55_Template, 3, 0)(56, FormPenggunaPage_Conditional_11_Conditional_0_Conditional_56_Template, 2, 0, "span");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(11);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formTambah.nama);
    \u0275\u0275property("disabled", ctx_r1.sedangSimpan);
    \u0275\u0275attribute("aria-invalid", !!ctx_r1.errorKolom("nama"));
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorKolom("nama"));
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formTambah.email);
    \u0275\u0275property("disabled", ctx_r1.sedangSimpan);
    \u0275\u0275attribute("aria-invalid", !!ctx_r1.errorKolom("email"));
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorKolom("email"));
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formTambah.no_hp);
    \u0275\u0275property("disabled", ctx_r1.sedangSimpan);
    \u0275\u0275attribute("aria-invalid", !!ctx_r1.errorKolom("no_hp"));
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorKolom("no_hp"));
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formTambah.id_mitra);
    \u0275\u0275property("disabled", ctx_r1.sedangSimpan);
    \u0275\u0275attribute("aria-invalid", !!ctx_r1.errorKolom("id_mitra"));
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.daftarMitra);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.errorKolom("id_mitra"));
    \u0275\u0275advance(6);
    \u0275\u0275property("type", ctx_r1.tampilkanSandi ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formTambah.password);
    \u0275\u0275property("disabled", ctx_r1.sedangSimpan);
    \u0275\u0275attribute("aria-invalid", !!ctx_r1.errorKolom("password"));
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275attribute("aria-label", ctx_r1.tampilkanSandi ? "Sembunyikan password" : "Tampilkan password")("aria-pressed", ctx_r1.tampilkanSandi);
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx_r1.tampilkanSandi ? "eye-off-outline" : "eye-outline");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorKolom("password"));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.blokSimpan);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.sedangSimpan ? 55 : 56);
  }
}
function FormPenggunaPage_Conditional_11_Conditional_1_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 47);
    \u0275\u0275element(1, "ion-icon", 38);
    \u0275\u0275text(2, " Organisasi hanya bisa diubah jika server memastikan akun belum dirujuk transaksi. Peran tidak diubah dari menu ini. ");
    \u0275\u0275elementEnd();
  }
}
function FormPenggunaPage_Conditional_11_Conditional_1_Conditional_26_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "label", 58);
    \u0275\u0275text(2, "Nama Usaha ");
    \u0275\u0275elementStart(3, "span", 26);
    \u0275\u0275text(4, "(opsional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 17);
    \u0275\u0275element(6, "ion-icon", 59);
    \u0275\u0275elementStart(7, "input", 60);
    \u0275\u0275listener("blur", function FormPenggunaPage_Conditional_11_Conditional_1_Conditional_26_Conditional_8_Template_input_blur_7_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.sentuh("nama_usaha"));
    });
    \u0275\u0275twoWayListener("ngModelChange", function FormPenggunaPage_Conditional_11_Conditional_1_Conditional_26_Conditional_8_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r1.formUbah.nama_usaha, $event) || (ctx_r1.formUbah.nama_usaha = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 61);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formUbah.nama_usaha);
    \u0275\u0275property("disabled", ctx_r1.sedangSimpan);
    \u0275\u0275attribute("aria-invalid", !!ctx_r1.errorKolom("nama_usaha"));
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorKolom("nama_usaha"));
  }
}
function FormPenggunaPage_Conditional_11_Conditional_1_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "label", 54);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 17);
    \u0275\u0275element(4, "ion-icon", 55);
    \u0275\u0275elementStart(5, "input", 56);
    \u0275\u0275listener("blur", function FormPenggunaPage_Conditional_11_Conditional_1_Conditional_26_Template_input_blur_5_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.sentuh("alamat"));
    });
    \u0275\u0275twoWayListener("ngModelChange", function FormPenggunaPage_Conditional_11_Conditional_1_Conditional_26_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.formUbah.alamat, $event) || (ctx_r1.formUbah.alamat = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 57);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, FormPenggunaPage_Conditional_11_Conditional_1_Conditional_26_Conditional_8_Template, 10, 4, "div", 15);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Alamat ", ctx_r1.penggunaAsli.peran <= 3 ? "(wajib)" : "(opsional)");
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formUbah.alamat);
    \u0275\u0275property("disabled", ctx_r1.sedangSimpan);
    \u0275\u0275attribute("aria-invalid", !!ctx_r1.errorKolom("alamat"));
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorKolom("alamat"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.penggunaAsli.peran === 2 || ctx_r1.penggunaAsli.peran === 3 ? 8 : -1);
  }
}
function FormPenggunaPage_Conditional_11_Conditional_1_Conditional_27_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const mitra_r10 = ctx.$implicit;
    \u0275\u0275property("ngValue", mitra_r10.id_mitra);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(mitra_r10.nama_mitra);
  }
}
function FormPenggunaPage_Conditional_11_Conditional_1_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "label", 62);
    \u0275\u0275text(2, "Organisasi Mitra");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 31);
    \u0275\u0275element(4, "ion-icon", 32);
    \u0275\u0275elementStart(5, "select", 63);
    \u0275\u0275listener("blur", function FormPenggunaPage_Conditional_11_Conditional_1_Conditional_27_Template_select_blur_5_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.sentuh("id_mitra"));
    });
    \u0275\u0275twoWayListener("ngModelChange", function FormPenggunaPage_Conditional_11_Conditional_1_Conditional_27_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.formUbah.id_mitra, $event) || (ctx_r1.formUbah.id_mitra = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(6, "option", 34);
    \u0275\u0275text(7, "Pilih organisasi...");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, FormPenggunaPage_Conditional_11_Conditional_1_Conditional_27_For_9_Template, 2, 2, "option", 35, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 64);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formUbah.id_mitra);
    \u0275\u0275property("disabled", ctx_r1.sedangSimpan || ctx_r1.kuncOrganisasiDanPeran);
    \u0275\u0275attribute("aria-invalid", !!ctx_r1.errorKolom("id_mitra"));
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.daftarMitra);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.errorKolom("id_mitra"));
  }
}
function FormPenggunaPage_Conditional_11_Conditional_1_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "ion-spinner", 10);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\xA0Menyimpan...");
    \u0275\u0275elementEnd();
  }
}
function FormPenggunaPage_Conditional_11_Conditional_1_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Simpan Perubahan");
    \u0275\u0275elementEnd();
  }
}
function FormPenggunaPage_Conditional_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 44)(2, "div")(3, "label");
    \u0275\u0275text(4, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 45);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 46);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(9, FormPenggunaPage_Conditional_11_Conditional_1_Conditional_9_Template, 3, 0, "p", 47);
    \u0275\u0275elementStart(10, "div", 15)(11, "label", 48);
    \u0275\u0275text(12, "Nama Lengkap");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 17);
    \u0275\u0275element(14, "ion-icon", 18);
    \u0275\u0275elementStart(15, "input", 49);
    \u0275\u0275listener("blur", function FormPenggunaPage_Conditional_11_Conditional_1_Template_input_blur_15_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.sentuh("nama"));
    });
    \u0275\u0275twoWayListener("ngModelChange", function FormPenggunaPage_Conditional_11_Conditional_1_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.formUbah.nama, $event) || (ctx_r1.formUbah.nama = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "p", 50);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 15)(19, "label", 51);
    \u0275\u0275text(20, "Nomor HP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 17);
    \u0275\u0275element(22, "ion-icon", 27);
    \u0275\u0275elementStart(23, "input", 52);
    \u0275\u0275listener("blur", function FormPenggunaPage_Conditional_11_Conditional_1_Template_input_blur_23_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.sentuh("no_hp"));
    });
    \u0275\u0275twoWayListener("ngModelChange", function FormPenggunaPage_Conditional_11_Conditional_1_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.formUbah.no_hp, $event) || (ctx_r1.formUbah.no_hp = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p", 53);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(26, FormPenggunaPage_Conditional_11_Conditional_1_Conditional_26_Template, 9, 6);
    \u0275\u0275conditionalCreate(27, FormPenggunaPage_Conditional_11_Conditional_1_Conditional_27_Template, 12, 5, "div", 15);
    \u0275\u0275elementStart(28, "ion-button", 43);
    \u0275\u0275listener("click", function FormPenggunaPage_Conditional_11_Conditional_1_Template_ion_button_click_28_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.simpanUbah());
    });
    \u0275\u0275conditionalCreate(29, FormPenggunaPage_Conditional_11_Conditional_1_Conditional_29_Template, 3, 0)(30, FormPenggunaPage_Conditional_11_Conditional_1_Conditional_30_Template, 2, 0, "span");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.penggunaAsli.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.labelPeran[ctx_r1.penggunaAsli.peran]);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.butuhPilihMitra && ctx_r1.kuncOrganisasiDanPeran ? 9 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formUbah.nama);
    \u0275\u0275property("disabled", ctx_r1.sedangSimpan);
    \u0275\u0275attribute("aria-invalid", !!ctx_r1.errorKolom("nama"));
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorKolom("nama"));
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formUbah.no_hp);
    \u0275\u0275property("disabled", ctx_r1.sedangSimpan);
    \u0275\u0275attribute("aria-invalid", !!ctx_r1.errorKolom("no_hp"));
    \u0275\u0275control();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.errorKolom("no_hp"));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.penggunaAsli.peran !== 5 ? 26 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.butuhPilihMitra ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.blokSimpan);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.sedangSimpan ? 29 : 30);
  }
}
function FormPenggunaPage_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, FormPenggunaPage_Conditional_11_Conditional_0_Template, 57, 27, "div", 13);
    \u0275\u0275conditionalCreate(1, FormPenggunaPage_Conditional_11_Conditional_1_Template, 31, 15, "div", 13);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.isTambah ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r1.isTambah && ctx_r1.penggunaAsli ? 1 : -1);
  }
}
var _FormPenggunaPage = class _FormPenggunaPage {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.api = inject(MasterPenggunaService);
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.cdr = inject(ChangeDetectorRef);
    this.sedangMuatMitra = false;
    this.errorMitra = "";
    this.sudahSubmit = false;
    this.disentuh = /* @__PURE__ */ new Set();
    this.labelPeran = LABEL_PERAN;
    this.mode = "tambah";
    this.idPengguna = null;
    this.sedangMuat = false;
    this.sedangSimpan = false;
    this.pesanError = "";
    this.tampilkanSandi = false;
    this.daftarMitra = [];
    this.formTambah = {
      nama: "",
      email: "",
      password: "",
      no_hp: "",
      id_mitra: null
    };
    this.penggunaAsli = null;
    this.formUbah = {
      nama: "",
      no_hp: "",
      alamat: "",
      nama_usaha: "",
      id_mitra: null
    };
  }
  sentuh(kolom) {
    this.disentuh.add(kolom);
  }
  errorKolom(kolom) {
    if (!this.sudahSubmit && !this.disentuh.has(kolom))
      return "";
    return validasiPengguna(this.isTambah ? this.formTambah : this.formUbah, this.isTambah ? null : this.penggunaAsli, this.daftarMitra)[kolom] ?? "";
  }
  get blokSimpan() {
    return this.sedangMuat || this.sedangSimpan || !!this.pesanError || !this.isTambah && !this.penggunaAsli || (this.isTambah || this.butuhPilihMitra && !this.kuncOrganisasiDanPeran) && (this.sedangMuatMitra || !!this.errorMitra || this.daftarMitra.length === 0);
  }
  get isTambah() {
    return this.mode === "tambah";
  }
  get butuhPilihMitra() {
    return this.isTambah || this.penggunaAsli?.peran === 5;
  }
  get kuncOrganisasiDanPeran() {
    return this.penggunaAsli?.terkunci_transaksi !== false;
  }
  ngOnInit() {
    const modeParam = this.route.snapshot.paramMap.get("mode");
    if (modeParam !== "tambah" && modeParam !== "ubah") {
      this.pesanError = "Alamat halaman tidak valid. Kembali ke daftar pengguna.";
      return;
    }
    this.mode = modeParam;
    if (this.butuhPilihMitra) {
      this.muatDaftarMitra();
    }
    if (this.mode === "ubah") {
      const idParam = this.route.snapshot.queryParamMap.get("id");
      this.idPengguna = idParam ? Number(idParam) : null;
      if (!idValid(this.idPengguna)) {
        this.pesanError = "ID akun tidak ditemukan. Kembali ke daftar dan coba lagi.";
        return;
      }
      this.muatDetail(this.idPengguna);
    }
  }
  muatDaftarMitra() {
    if (this.sedangMuatMitra)
      return;
    this.sedangMuatMitra = true;
    this.errorMitra = "";
    this.api.getListMitraRingkas().pipe(timeout(15e3), finalize(() => {
      this.sedangMuatMitra = false;
      this.cdr.markForCheck();
    })).subscribe({
      next: (res) => {
        if (!Array.isArray(res?.data) || !res.data.every((m) => m && idValid(m.id_mitra) && typeof m.nama_mitra === "string")) {
          this.errorMitra = "Data organisasi dari server belum sesuai.";
          return;
        }
        this.daftarMitra = res.data;
      },
      error: () => {
        this.errorMitra = "Daftar organisasi belum dapat dimuat.";
      }
    });
  }
  muatDetail(id) {
    this.sedangMuat = true;
    this.pesanError = "";
    this.api.getDetailPengguna(id).pipe(timeout(15e3), finalize(() => {
      this.sedangMuat = false;
      this.cdr.markForCheck();
    })).subscribe({
      next: (res) => {
        this.sedangMuat = false;
        const pengguna = res?.data;
        if (!pengguna || pengguna.id_pengguna !== id || ![1, 2, 3, 4, 5].includes(pengguna.peran) || typeof pengguna.nama !== "string" || typeof pengguna.email !== "string" || ![0, 1].includes(pengguna.aktif) || pengguna.is_deleted !== 0 || ![pengguna.no_hp, pengguna.alamat, pengguna.nama_usaha].every((v) => v === null || typeof v === "string") || (pengguna.peran === 5 ? !idValid(pengguna.id_mitra) : pengguna.id_mitra !== null)) {
          this.pesanError = "Akun tidak tersedia atau format data server belum sesuai.";
          return;
        }
        this.penggunaAsli = pengguna;
        this.formUbah = {
          nama: pengguna.nama ?? "",
          no_hp: pengguna.no_hp ?? "",
          alamat: pengguna.alamat ?? "",
          nama_usaha: pengguna.nama_usaha ?? "",
          id_mitra: pengguna.id_mitra ?? null
        };
        if (pengguna.peran === 5 && this.daftarMitra.length === 0) {
          this.muatDaftarMitra();
        }
      },
      error: (err) => {
        this.sedangMuat = false;
        this.pesanError = "Gagal memuat detail akun. Periksa koneksi lalu coba lagi.";
        console.error("\u274C Gagal memuat detail pengguna:", err);
      }
    });
  }
  batal() {
    if (this.sedangSimpan)
      return;
    this.navCtrl.navigateBack("/master-pengguna");
  }
  simpanTambah() {
    if (this.blokSimpan)
      return;
    this.sudahSubmit = true;
    if (Object.keys(validasiPengguna(this.formTambah, null, this.daftarMitra)).length)
      return;
    if (!idValid(this.formTambah.id_mitra))
      return;
    this.sedangSimpan = true;
    this.api.buatAkunPetugasMitra({
      nama: this.formTambah.nama.trim(),
      email: this.formTambah.email.trim().toLowerCase(),
      password: this.formTambah.password,
      no_hp: normalisasiHp(this.formTambah.no_hp) || void 0,
      id_mitra: this.formTambah.id_mitra
    }).pipe(timeout(2e4), finalize(() => {
      this.sedangSimpan = false;
      this.cdr.markForCheck();
    })).subscribe({
      next: () => {
        this.formTambah.password = "";
        void this.tampilToast("Akun petugas berhasil dibuat.", "success");
        void this.navCtrl.navigateBack("/master-pengguna");
      },
      error: (err) => {
        void this.tampilToast(pesanApi(err), "danger");
      }
    });
  }
  simpanUbah() {
    if (this.blokSimpan || !idValid(this.idPengguna) || !this.penggunaAsli)
      return;
    this.sudahSubmit = true;
    if (Object.keys(validasiPengguna(this.formUbah, this.penggunaAsli, this.daftarMitra)).length)
      return;
    this.sedangSimpan = true;
    this.api.ubahPengguna(this.idPengguna, payloadUbah(this.formUbah, this.penggunaAsli)).pipe(timeout(2e4), finalize(() => {
      this.sedangSimpan = false;
      this.cdr.markForCheck();
    })).subscribe({
      next: () => {
        void this.tampilToast("Profil akun berhasil diperbarui.", "success");
        void this.navCtrl.navigateBack("/master-pengguna");
      },
      error: (err) => {
        void this.tampilToast(pesanApi(err), "danger");
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
_FormPenggunaPage.\u0275fac = function FormPenggunaPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FormPenggunaPage)();
};
_FormPenggunaPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormPenggunaPage, selectors: [["app-form-pengguna"]], standalone: false, decls: 12, vars: 4, consts: [[1, "ion-no-border"], [1, "fp-toolbar"], ["slot", "start"], ["defaultHref", "/master-pengguna", "text", ""], [1, "fp-bg", 3, "fullscreen"], [1, "fp-container"], [1, "fp-state-box"], ["role", "status"], ["role", "alert"], ["fill", "outline", 3, "click"], ["name", "crescent"], ["name", "alert-circle-outline"], ["fill", "outline", "size", "small", 3, "click"], [1, "fp-card"], [1, "fp-hint"], [1, "fp-group"], ["for", "formTambah-nama"], [1, "fp-input"], ["name", "person-outline"], ["maxlength", "100", "id", "formTambah-nama", "name", "nama", "aria-describedby", "formTambah-nama-error", "type", "text", "placeholder", "nama petugas", 3, "blur", "ngModelChange", "ngModel", "disabled"], ["id", "formTambah-nama-error", "aria-live", "polite", 1, "fp-error"], ["for", "formTambah-email"], ["name", "mail-outline"], ["autocomplete", "email", "autocapitalize", "none", "maxlength", "150", "id", "formTambah-email", "name", "email", "aria-describedby", "formTambah-email-error", "type", "email", "placeholder", "nama@email.com", 3, "blur", "ngModelChange", "ngModel", "disabled"], ["id", "formTambah-email-error", "aria-live", "polite", 1, "fp-error"], ["for", "formTambah-no_hp"], [1, "fp-optional"], ["name", "call-outline"], ["autocomplete", "tel", "maxlength", "20", "id", "formTambah-no_hp", "name", "no_hp", "aria-describedby", "formTambah-no_hp-error", "type", "tel", "placeholder", "08xxxxxxxxxx", 3, "blur", "ngModelChange", "ngModel", "disabled"], ["id", "formTambah-no_hp-error", "aria-live", "polite", 1, "fp-error"], ["for", "formTambah-id_mitra"], [1, "fp-input", "fp-select"], ["name", "git-network-outline"], ["id", "formTambah-id_mitra", "name", "id_mitra", "aria-describedby", "formTambah-id_mitra-error", 3, "blur", "ngModelChange", "ngModel", "disabled"], ["disabled", "", 3, "ngValue"], [3, "ngValue"], ["id", "formTambah-id_mitra-error", "aria-live", "polite", 1, "fp-error"], ["for", "formTambah-password"], ["name", "lock-closed-outline"], ["autocomplete", "new-password", "maxlength", "128", "id", "formTambah-password", "name", "password", "aria-describedby", "formTambah-password-error", "placeholder", "8\u2013128 karakter", 3, "blur", "ngModelChange", "type", "ngModel", "disabled"], ["type", "button", 1, "fp-eye", 3, "click"], [1, "fp-suffix", 3, "name"], ["id", "formTambah-password-error", "aria-live", "polite", 1, "fp-error"], ["expand", "block", 1, "fp-btn-submit", 3, "click", "disabled"], [1, "fp-readonly-row"], [1, "fp-readonly-value"], [1, "fp-role-badge"], [1, "fp-warning"], ["for", "formUbah-nama"], ["maxlength", "100", "id", "formUbah-nama", "name", "nama", "aria-describedby", "formUbah-nama-error", "type", "text", 3, "blur", "ngModelChange", "ngModel", "disabled"], ["id", "formUbah-nama-error", "aria-live", "polite", 1, "fp-error"], ["for", "formUbah-no_hp"], ["autocomplete", "tel", "maxlength", "20", "id", "formUbah-no_hp", "name", "no_hp", "aria-describedby", "formUbah-no_hp-error", "type", "tel", "placeholder", "08xxxxxxxxxx", 3, "blur", "ngModelChange", "ngModel", "disabled"], ["id", "formUbah-no_hp-error", "aria-live", "polite", 1, "fp-error"], ["for", "formUbah-alamat"], ["name", "location-outline"], ["maxlength", "255", "id", "formUbah-alamat", "name", "alamat", "aria-describedby", "formUbah-alamat-error", "type", "text", 3, "blur", "ngModelChange", "ngModel", "disabled"], ["id", "formUbah-alamat-error", "aria-live", "polite", 1, "fp-error"], ["for", "formUbah-nama_usaha"], ["name", "briefcase-outline"], ["maxlength", "150", "id", "formUbah-nama_usaha", "name", "nama_usaha", "aria-describedby", "formUbah-nama_usaha-error", "type", "text", 3, "blur", "ngModelChange", "ngModel", "disabled"], ["id", "formUbah-nama_usaha-error", "aria-live", "polite", 1, "fp-error"], ["for", "formUbah-id_mitra"], ["id", "formUbah-id_mitra", "name", "id_mitra", "aria-describedby", "formUbah-id_mitra-error", 3, "blur", "ngModelChange", "ngModel", "disabled"], ["id", "formUbah-id_mitra-error", "aria-live", "polite", 1, "fp-error"]], template: function FormPenggunaPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header", 0)(1, "ion-toolbar", 1)(2, "ion-buttons", 2);
    \u0275\u0275element(3, "ion-back-button", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-title");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "ion-content", 4)(7, "div", 5);
    \u0275\u0275conditionalCreate(8, FormPenggunaPage_Conditional_8_Template, 3, 1);
    \u0275\u0275conditionalCreate(9, FormPenggunaPage_Conditional_9_Template, 4, 0, "div", 6)(10, FormPenggunaPage_Conditional_10_Template, 6, 1, "div", 6)(11, FormPenggunaPage_Conditional_11_Template, 2, 2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx.isTambah ? "Tambah Petugas Mitra" : "Ubah Akun");
    \u0275\u0275advance();
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.butuhPilihMitra ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.sedangMuat ? 9 : ctx.pesanError ? 10 : 11);
  }
}, dependencies: [NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, MaxLengthValidator, NgModel, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonSpinner, IonTitle, IonToolbar, IonBackButton], styles: ["\n.fp-toolbar[_ngcontent-%COMP%] {\n  --background: #FFFFFF;\n  --color: #0F2A1D;\n}\n.fp-bg[_ngcontent-%COMP%] {\n  --background:\n    linear-gradient(\n      180deg,\n      #F2FBF6 0%,\n      #FFFFFF 40%);\n}\n.fp-container[_ngcontent-%COMP%] {\n  padding: 16px 16px 40px;\n  max-width: 480px;\n  margin: 0 auto;\n}\n.fp-state-box[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  padding: 64px 16px;\n  color: #64748B;\n  text-align: center;\n}\n.fp-state-box[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  color: #9CC9AC;\n}\n.fp-state-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n}\n.fp-card[_ngcontent-%COMP%] {\n  background: #FFFFFF;\n  border-radius: 18px;\n  padding: 20px 18px;\n  box-shadow: 0 2px 14px rgba(15, 42, 29, 0.06);\n}\n.fp-hint[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  font-size: 13px;\n  color: #3B7A57;\n  background: #EAF6F0;\n  padding: 10px 12px;\n  border-radius: 12px;\n}\n.fp-hint[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.fp-warning[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin: 0 0 16px;\n  font-size: 12.5px;\n  color: #92400E;\n  background: #FFF7E6;\n  padding: 10px 12px;\n  border-radius: 12px;\n}\n.fp-warning[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 16px;\n}\n.fp-readonly-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.fp-readonly-row[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 11.5px;\n  font-weight: 700;\n  color: #64748B;\n  margin-bottom: 2px;\n}\n.fp-readonly-value[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: #0F2A1D;\n}\n.fp-role-badge[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 999px;\n  background: #EAF6F0;\n  color: #22AD5C;\n  white-space: nowrap;\n}\n.fp-group[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n}\n.fp-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12.5px;\n  font-weight: 600;\n  color: #3B7A57;\n  margin-bottom: 6px;\n}\n.fp-optional[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: #94A3B8;\n}\n.fp-input[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #F8FAF9;\n  border: 1px solid #E2E8E4;\n  border-radius: 12px;\n  padding: 0 12px;\n  height: 46px;\n}\n.fp-input[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]:first-child {\n  color: #94A3B8;\n  font-size: 18px;\n  flex-shrink: 0;\n}\n.fp-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.fp-input[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  background: transparent;\n  outline: none;\n  font-size: 14px;\n  color: #0F2A1D;\n  height: 100%;\n  min-width: 0;\n}\n.fp-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder, \n.fp-input[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]::placeholder {\n  color: #B5C2BC;\n}\n.fp-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:disabled, \n.fp-input[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:disabled {\n  color: #94A3B8;\n}\n.fp-input[_ngcontent-%COMP%]   .fp-suffix[_ngcontent-%COMP%] {\n  color: #94A3B8;\n  font-size: 18px;\n  cursor: pointer;\n}\n.fp-select[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  appearance: none;\n  -webkit-appearance: none;\n}\n.fp-btn-submit[_ngcontent-%COMP%] {\n  --background: #22AD5C;\n  --background-activated: #1C9650;\n  --border-radius: 14px;\n  height: 48px;\n  font-weight: 700;\n  margin-top: 6px;\n}\n.fp-error[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: #b91c1c;\n  font-size: 12px;\n}\n.fp-error[_ngcontent-%COMP%]:empty {\n  display: none;\n}\n.fp-eye[_ngcontent-%COMP%] {\n  background: transparent;\n  min-width: 44px;\n  min-height: 44px;\n}\n.fp-input[_ngcontent-%COMP%]:focus-within {\n  border-color: #16813e;\n  outline: 2px solid #16813e;\n}\n/*# sourceMappingURL=form-pengguna.page.css.map */"] });
var FormPenggunaPage = _FormPenggunaPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormPenggunaPage, [{
    type: Component,
    args: [{ selector: "app-form-pengguna", standalone: false, template: `<ion-header class="ion-no-border">\r
  <ion-toolbar class="fp-toolbar">\r
    <ion-buttons slot="start">\r
      <ion-back-button defaultHref="/master-pengguna" text=""></ion-back-button>\r
    </ion-buttons>\r
    <ion-title>{{ isTambah ? 'Tambah Petugas Mitra' : 'Ubah Akun' }}</ion-title>\r
  </ion-toolbar>\r
</ion-header>\r
\r
<ion-content [fullscreen]="true" class="fp-bg">\r
  <div class="fp-container">\r
    @if (butuhPilihMitra) {\r
      @if (sedangMuatMitra) { <p role="status">Memuat organisasi...</p> }\r
      @else if (errorMitra) {\r
        <p role="alert">{{ errorMitra }}</p>\r
        <ion-button fill="outline" (click)="muatDaftarMitra()">Coba lagi</ion-button>\r
      } @else if (daftarMitra.length === 0 && (isTambah || !kuncOrganisasiDanPeran)) {\r
        <p role="status">Belum ada organisasi yang dapat dipilih. Hubungi pengelola mitra.</p>\r
      }\r
    }\r
\r
    @if (sedangMuat) {\r
      <div class="fp-state-box">\r
        <ion-spinner name="crescent"></ion-spinner>\r
        <p>Memuat data akun...</p>\r
      </div>\r
    } @else if (pesanError) {\r
      <div class="fp-state-box">\r
        <ion-icon name="alert-circle-outline"></ion-icon>\r
        <p>{{ pesanError }}</p>\r
        <ion-button fill="outline" size="small" (click)="batal()">Kembali</ion-button>\r
      </div>\r
    } @else {\r
\r
      <!-- ============== MODE TAMBAH PETUGAS MITRA ============== -->\r
      @if (isTambah) {\r
        <div class="fp-card">\r
          <p class="fp-hint">Akun ini otomatis berperan <strong>Mitra (Petugas)</strong> dan terikat pada satu organisasi mitra.</p>\r
\r
          <div class="fp-group">\r
            <label for="formTambah-nama">Nama Lengkap</label>\r
            <div class="fp-input">\r
              <ion-icon name="person-outline"></ion-icon>\r
              <input maxlength="100" id="formTambah-nama" name="nama" (blur)="sentuh('nama')" [attr.aria-invalid]="!!errorKolom('nama')" aria-describedby="formTambah-nama-error" type="text" placeholder="nama petugas" [(ngModel)]="formTambah.nama" [disabled]="sedangSimpan" />\r
            </div>\r
<p id="formTambah-nama-error" class="fp-error" aria-live="polite">{{ errorKolom('nama') }}</p>\r
</div>\r
\r
          <div class="fp-group">\r
            <label for="formTambah-email">Email</label>\r
            <div class="fp-input">\r
              <ion-icon name="mail-outline"></ion-icon>\r
              <input autocomplete="email" autocapitalize="none" maxlength="150" id="formTambah-email" name="email" (blur)="sentuh('email')" [attr.aria-invalid]="!!errorKolom('email')" aria-describedby="formTambah-email-error" type="email" placeholder="nama@email.com" [(ngModel)]="formTambah.email" [disabled]="sedangSimpan" />\r
            </div>\r
<p id="formTambah-email-error" class="fp-error" aria-live="polite">{{ errorKolom('email') }}</p>\r
</div>\r
\r
          <div class="fp-group">\r
            <label for="formTambah-no_hp">Nomor HP <span class="fp-optional">(opsional)</span></label>\r
            <div class="fp-input">\r
              <ion-icon name="call-outline"></ion-icon>\r
              <input autocomplete="tel" maxlength="20" id="formTambah-no_hp" name="no_hp" (blur)="sentuh('no_hp')" [attr.aria-invalid]="!!errorKolom('no_hp')" aria-describedby="formTambah-no_hp-error" type="tel" placeholder="08xxxxxxxxxx" [(ngModel)]="formTambah.no_hp" [disabled]="sedangSimpan" />\r
            </div>\r
<p id="formTambah-no_hp-error" class="fp-error" aria-live="polite">{{ errorKolom('no_hp') }}</p>\r
</div>\r
\r
          <div class="fp-group">\r
            <label for="formTambah-id_mitra">Organisasi Mitra</label>\r
            <div class="fp-input fp-select">\r
              <ion-icon name="git-network-outline"></ion-icon>\r
              <select id="formTambah-id_mitra" name="id_mitra" (blur)="sentuh('id_mitra')" [attr.aria-invalid]="!!errorKolom('id_mitra')" aria-describedby="formTambah-id_mitra-error" [(ngModel)]="formTambah.id_mitra" [disabled]="sedangSimpan">\r
                <option [ngValue]="null" disabled>Pilih organisasi...</option>\r
                @for (mitra of daftarMitra; track mitra.id_mitra) {\r
                  <option [ngValue]="mitra.id_mitra">{{ mitra.nama_mitra }}</option>\r
                }\r
              </select>\r
            </div>\r
<p id="formTambah-id_mitra-error" class="fp-error" aria-live="polite">{{ errorKolom('id_mitra') }}</p>\r
</div>\r
\r
          <div class="fp-group">\r
            <label for="formTambah-password">Password Awal</label>\r
            <div class="fp-input">\r
              <ion-icon name="lock-closed-outline"></ion-icon>\r
              <input autocomplete="new-password" maxlength="128" id="formTambah-password" name="password" (blur)="sentuh('password')" [attr.aria-invalid]="!!errorKolom('password')" aria-describedby="formTambah-password-error" [type]="tampilkanSandi ? 'text' : 'password'" placeholder="8\u2013128 karakter"\r
                [(ngModel)]="formTambah.password" [disabled]="sedangSimpan" />\r
              <button type="button" class="fp-eye" [attr.aria-label]="tampilkanSandi ? 'Sembunyikan password' : 'Tampilkan password'" [attr.aria-pressed]="tampilkanSandi" (click)="tampilkanSandi = !tampilkanSandi"><ion-icon class="fp-suffix" [name]="tampilkanSandi ? 'eye-off-outline' : 'eye-outline'"\r
                ></ion-icon></button>\r
            </div>\r
<p id="formTambah-password-error" class="fp-error" aria-live="polite">{{ errorKolom('password') }}</p>\r
</div>\r
\r
          <ion-button expand="block" class="fp-btn-submit" [disabled]="blokSimpan" (click)="simpanTambah()">\r
            @if (sedangSimpan) {\r
              <ion-spinner name="crescent"></ion-spinner>\r
              <span>&nbsp;Menyimpan...</span>\r
            } @else {\r
              <span>Buat Akun Petugas</span>\r
            }\r
          </ion-button>\r
        </div>\r
      }\r
\r
      <!-- ============== MODE UBAH AKUN ============== -->\r
      @if (!isTambah && penggunaAsli) {\r
        <div class="fp-card">\r
          <div class="fp-readonly-row">\r
            <div>\r
              <label>Email</label>\r
              <p class="fp-readonly-value">{{ penggunaAsli.email }}</p>\r
            </div>\r
            <span class="fp-role-badge">{{ labelPeran[penggunaAsli.peran] }}</span>\r
          </div>\r
\r
          @if (butuhPilihMitra && kuncOrganisasiDanPeran) {\r
            <p class="fp-warning">\r
              <ion-icon name="lock-closed-outline"></ion-icon>\r
              Organisasi hanya bisa diubah jika server memastikan akun belum dirujuk transaksi. Peran tidak diubah dari menu ini.\r
            </p>\r
          }\r
\r
          <div class="fp-group">\r
            <label for="formUbah-nama">Nama Lengkap</label>\r
            <div class="fp-input">\r
              <ion-icon name="person-outline"></ion-icon>\r
              <input maxlength="100" id="formUbah-nama" name="nama" (blur)="sentuh('nama')" [attr.aria-invalid]="!!errorKolom('nama')" aria-describedby="formUbah-nama-error" type="text" [(ngModel)]="formUbah.nama" [disabled]="sedangSimpan" />\r
            </div>\r
<p id="formUbah-nama-error" class="fp-error" aria-live="polite">{{ errorKolom('nama') }}</p>\r
</div>\r
\r
          <div class="fp-group">\r
            <label for="formUbah-no_hp">Nomor HP</label>\r
            <div class="fp-input">\r
              <ion-icon name="call-outline"></ion-icon>\r
              <input autocomplete="tel" maxlength="20" id="formUbah-no_hp" name="no_hp" (blur)="sentuh('no_hp')" [attr.aria-invalid]="!!errorKolom('no_hp')" aria-describedby="formUbah-no_hp-error" type="tel" placeholder="08xxxxxxxxxx" [(ngModel)]="formUbah.no_hp" [disabled]="sedangSimpan" />\r
            </div>\r
<p id="formUbah-no_hp-error" class="fp-error" aria-live="polite">{{ errorKolom('no_hp') }}</p>\r
</div>\r
\r
          @if (penggunaAsli.peran !== 5) {\r
            <div class="fp-group">\r
              <label for="formUbah-alamat">Alamat {{ penggunaAsli.peran <= 3 ? '(wajib)' : '(opsional)' }}</label>\r
              <div class="fp-input">\r
                <ion-icon name="location-outline"></ion-icon>\r
                <input maxlength="255" id="formUbah-alamat" name="alamat" (blur)="sentuh('alamat')" [attr.aria-invalid]="!!errorKolom('alamat')" aria-describedby="formUbah-alamat-error" type="text" [(ngModel)]="formUbah.alamat" [disabled]="sedangSimpan" />\r
              </div>\r
<p id="formUbah-alamat-error" class="fp-error" aria-live="polite">{{ errorKolom('alamat') }}</p>\r
</div>\r
\r
            @if (penggunaAsli.peran === 2 || penggunaAsli.peran === 3) {\r
<div class="fp-group"><label for="formUbah-nama_usaha">Nama Usaha <span class="fp-optional">(opsional)</span></label>\r
              <div class="fp-input">\r
                <ion-icon name="briefcase-outline"></ion-icon>\r
                <input maxlength="150" id="formUbah-nama_usaha" name="nama_usaha" (blur)="sentuh('nama_usaha')" [attr.aria-invalid]="!!errorKolom('nama_usaha')" aria-describedby="formUbah-nama_usaha-error" type="text" [(ngModel)]="formUbah.nama_usaha" [disabled]="sedangSimpan" />\r
              </div>\r
<p id="formUbah-nama_usaha-error" class="fp-error" aria-live="polite">{{ errorKolom('nama_usaha') }}</p>\r
</div>\r
}\r
          }\r
\r
          @if (butuhPilihMitra) {\r
            <div class="fp-group">\r
              <label for="formUbah-id_mitra">Organisasi Mitra</label>\r
              <div class="fp-input fp-select">\r
                <ion-icon name="git-network-outline"></ion-icon>\r
                <select id="formUbah-id_mitra" name="id_mitra" (blur)="sentuh('id_mitra')" [attr.aria-invalid]="!!errorKolom('id_mitra')" aria-describedby="formUbah-id_mitra-error" [(ngModel)]="formUbah.id_mitra" [disabled]="sedangSimpan || kuncOrganisasiDanPeran">\r
                  <option [ngValue]="null" disabled>Pilih organisasi...</option>\r
                  @for (mitra of daftarMitra; track mitra.id_mitra) {\r
                    <option [ngValue]="mitra.id_mitra">{{ mitra.nama_mitra }}</option>\r
                  }\r
                </select>\r
              </div>\r
<p id="formUbah-id_mitra-error" class="fp-error" aria-live="polite">{{ errorKolom('id_mitra') }}</p>\r
</div>\r
          }\r
\r
          <ion-button expand="block" class="fp-btn-submit" [disabled]="blokSimpan" (click)="simpanUbah()">\r
            @if (sedangSimpan) {\r
              <ion-spinner name="crescent"></ion-spinner>\r
              <span>&nbsp;Menyimpan...</span>\r
            } @else {\r
              <span>Simpan Perubahan</span>\r
            }\r
          </ion-button>\r
\r
        </div>\r
      }\r
\r
    }\r
  </div>\r
</ion-content>\r
`, styles: ["/* src/app/master-pengguna/form-pengguna/form-pengguna.page.scss */\n.fp-toolbar {\n  --background: #FFFFFF;\n  --color: #0F2A1D;\n}\n.fp-bg {\n  --background:\n    linear-gradient(\n      180deg,\n      #F2FBF6 0%,\n      #FFFFFF 40%);\n}\n.fp-container {\n  padding: 16px 16px 40px;\n  max-width: 480px;\n  margin: 0 auto;\n}\n.fp-state-box {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  padding: 64px 16px;\n  color: #64748B;\n  text-align: center;\n}\n.fp-state-box ion-icon {\n  font-size: 40px;\n  color: #9CC9AC;\n}\n.fp-state-box p {\n  margin: 0;\n  font-size: 14px;\n}\n.fp-card {\n  background: #FFFFFF;\n  border-radius: 18px;\n  padding: 20px 18px;\n  box-shadow: 0 2px 14px rgba(15, 42, 29, 0.06);\n}\n.fp-hint {\n  margin: 0 0 16px;\n  font-size: 13px;\n  color: #3B7A57;\n  background: #EAF6F0;\n  padding: 10px 12px;\n  border-radius: 12px;\n}\n.fp-hint strong {\n  font-weight: 700;\n}\n.fp-warning {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin: 0 0 16px;\n  font-size: 12.5px;\n  color: #92400E;\n  background: #FFF7E6;\n  padding: 10px 12px;\n  border-radius: 12px;\n}\n.fp-warning ion-icon {\n  flex-shrink: 0;\n  font-size: 16px;\n}\n.fp-readonly-row {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n.fp-readonly-row label {\n  display: block;\n  font-size: 11.5px;\n  font-weight: 700;\n  color: #64748B;\n  margin-bottom: 2px;\n}\n.fp-readonly-value {\n  margin: 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: #0F2A1D;\n}\n.fp-role-badge {\n  flex-shrink: 0;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 999px;\n  background: #EAF6F0;\n  color: #22AD5C;\n  white-space: nowrap;\n}\n.fp-group {\n  margin-bottom: 14px;\n}\n.fp-group label {\n  display: block;\n  font-size: 12.5px;\n  font-weight: 600;\n  color: #3B7A57;\n  margin-bottom: 6px;\n}\n.fp-optional {\n  font-weight: 400;\n  color: #94A3B8;\n}\n.fp-input {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #F8FAF9;\n  border: 1px solid #E2E8E4;\n  border-radius: 12px;\n  padding: 0 12px;\n  height: 46px;\n}\n.fp-input ion-icon:first-child {\n  color: #94A3B8;\n  font-size: 18px;\n  flex-shrink: 0;\n}\n.fp-input input,\n.fp-input select {\n  flex: 1;\n  border: none;\n  background: transparent;\n  outline: none;\n  font-size: 14px;\n  color: #0F2A1D;\n  height: 100%;\n  min-width: 0;\n}\n.fp-input input::placeholder,\n.fp-input select::placeholder {\n  color: #B5C2BC;\n}\n.fp-input input:disabled,\n.fp-input select:disabled {\n  color: #94A3B8;\n}\n.fp-input .fp-suffix {\n  color: #94A3B8;\n  font-size: 18px;\n  cursor: pointer;\n}\n.fp-select select {\n  appearance: none;\n  -webkit-appearance: none;\n}\n.fp-btn-submit {\n  --background: #22AD5C;\n  --background-activated: #1C9650;\n  --border-radius: 14px;\n  height: 48px;\n  font-weight: 700;\n  margin-top: 6px;\n}\n.fp-error {\n  margin: 4px 0 0;\n  color: #b91c1c;\n  font-size: 12px;\n}\n.fp-error:empty {\n  display: none;\n}\n.fp-eye {\n  background: transparent;\n  min-width: 44px;\n  min-height: 44px;\n}\n.fp-input:focus-within {\n  border-color: #16813e;\n  outline: 2px solid #16813e;\n}\n/*# sourceMappingURL=form-pengguna.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormPenggunaPage, { className: "FormPenggunaPage", filePath: "src/app/master-pengguna/form-pengguna/form-pengguna.page.ts", lineNumber: 17 });
})();

// src/app/master-pengguna/form-pengguna/form-pengguna-routing.module.ts
var routes = [
  {
    path: "",
    component: FormPenggunaPage
  }
];
var _FormPenggunaPageRoutingModule = class _FormPenggunaPageRoutingModule {
};
_FormPenggunaPageRoutingModule.\u0275fac = function FormPenggunaPageRoutingModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FormPenggunaPageRoutingModule)();
};
_FormPenggunaPageRoutingModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _FormPenggunaPageRoutingModule });
_FormPenggunaPageRoutingModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
var FormPenggunaPageRoutingModule = _FormPenggunaPageRoutingModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormPenggunaPageRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/master-pengguna/form-pengguna/form-pengguna.module.ts
var _FormPenggunaPageModule = class _FormPenggunaPageModule {
};
_FormPenggunaPageModule.\u0275fac = function FormPenggunaPageModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _FormPenggunaPageModule)();
};
_FormPenggunaPageModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _FormPenggunaPageModule });
_FormPenggunaPageModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
  CommonModule,
  FormsModule,
  IonicModule,
  FormPenggunaPageRoutingModule
] });
var FormPenggunaPageModule = _FormPenggunaPageModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FormPenggunaPageModule, [{
    type: NgModule,
    args: [{
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FormPenggunaPageRoutingModule
      ],
      declarations: [FormPenggunaPage]
    }]
  }], null, null);
})();
export {
  FormPenggunaPageModule
};
//# sourceMappingURL=form-pengguna.module-X5NEHVB2.js.map
