import {
  LABEL_PERAN,
  MasterPenggunaService,
  idValid,
  pesanApi
} from "./chunk-4J7JPUME.js";
import "./chunk-3ROYJO5F.js";
import "./chunk-LTX2EDXK.js";
import {
  ActivatedRoute,
  ChangeDetectorRef,
  CommonModule,
  Component,
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
  NavController,
  NgModule,
  RouterModule,
  finalize,
  inject,
  setClassMetadata,
  timeout,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
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

// src/app/master-pengguna/detail-pengguna/detail-pengguna.page.ts
function DetailPenggunaPage_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "ion-spinner", 7);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Memuat akun...");
    \u0275\u0275elementEnd()();
  }
}
function DetailPenggunaPage_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6)(1, "p");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ion-button", 8);
    \u0275\u0275listener("click", function DetailPenggunaPage_Conditional_9_Template_ion_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.kembali());
    });
    \u0275\u0275text(4, "Kembali");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.pesanError);
  }
}
function DetailPenggunaPage_Conditional_10_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 14);
    \u0275\u0275text(1, "Akun ini dihapus sementara. Pulihkan lewat menu di daftar sebelum mengedit.");
    \u0275\u0275elementEnd();
  }
}
function DetailPenggunaPage_Conditional_10_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2, "Alamat");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const akun_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(akun_r3.alamat || "Belum diisi");
  }
}
function DetailPenggunaPage_Conditional_10_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2, "Nama usaha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const akun_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(akun_r3.nama_usaha || "Belum diisi");
  }
}
function DetailPenggunaPage_Conditional_10_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span");
    \u0275\u0275text(2, "Organisasi mitra");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.namaMitra || "Memuat...");
  }
}
function DetailPenggunaPage_Conditional_10_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "ion-button", 17);
    \u0275\u0275listener("click", function DetailPenggunaPage_Conditional_10_Conditional_31_Template_ion_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ubah());
    });
    \u0275\u0275text(1, "Edit profil akun");
    \u0275\u0275elementEnd();
  }
}
function DetailPenggunaPage_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 9)(1, "div", 10);
    \u0275\u0275element(2, "ion-icon", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h1");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 12);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 13);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, DetailPenggunaPage_Conditional_10_Conditional_9_Template, 2, 0, "p", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "section", 15)(11, "h2");
    \u0275\u0275text(12, "Informasi akun");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div")(14, "span");
    \u0275\u0275text(15, "Peran");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "strong");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div")(19, "span");
    \u0275\u0275text(20, "Nomor HP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "strong");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(23, DetailPenggunaPage_Conditional_10_Conditional_23_Template, 5, 1, "div");
    \u0275\u0275conditionalCreate(24, DetailPenggunaPage_Conditional_10_Conditional_24_Template, 5, 1, "div");
    \u0275\u0275conditionalCreate(25, DetailPenggunaPage_Conditional_10_Conditional_25_Template, 5, 1, "div");
    \u0275\u0275elementStart(26, "div")(27, "span");
    \u0275\u0275text(28, "ID akun");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "strong");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(31, DetailPenggunaPage_Conditional_10_Conditional_31_Template, 2, 0, "ion-button", 16);
  }
  if (rf & 2) {
    const akun_r3 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(akun_r3.nama);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(akun_r3.email);
    \u0275\u0275advance();
    \u0275\u0275classProp("nonaktif", !akun_r3.aktif);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(akun_r3.aktif ? "Aktif" : "Nonaktif");
    \u0275\u0275advance();
    \u0275\u0275conditional(akun_r3.is_deleted ? 9 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r1.labelPeran[akun_r3.peran]);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(akun_r3.no_hp || "Belum diisi");
    \u0275\u0275advance();
    \u0275\u0275conditional(akun_r3.peran <= 3 ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(akun_r3.peran === 2 || akun_r3.peran === 3 ? 24 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(akun_r3.peran === 5 ? 25 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("#", akun_r3.id_pengguna);
    \u0275\u0275advance();
    \u0275\u0275conditional(!akun_r3.is_deleted ? 31 : -1);
  }
}
var _DetailPenggunaPage = class _DetailPenggunaPage {
  constructor() {
    this.route = inject(ActivatedRoute);
    this.api = inject(MasterPenggunaService);
    this.nav = inject(NavController);
    this.cdr = inject(ChangeDetectorRef);
    this.labelPeran = LABEL_PERAN;
    this.pengguna = null;
    this.namaMitra = "";
    this.sedangMuat = true;
    this.pesanError = "";
  }
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (!idValid(id)) {
      this.pesanError = "ID akun tidak valid.";
      this.sedangMuat = false;
      return;
    }
    this.api.getDetailPengguna(id).pipe(timeout(15e3), finalize(() => {
      this.sedangMuat = false;
      this.cdr.markForCheck();
    })).subscribe({
      next: (res) => {
        const data = res?.data;
        if (!data || data.id_pengguna !== id || ![1, 2, 3, 4, 5].includes(data.peran) || typeof data.nama !== "string" || typeof data.email !== "string" || ![0, 1].includes(data.aktif) || ![0, 1].includes(data.is_deleted)) {
          this.pesanError = "Data akun dari server belum sesuai.";
          return;
        }
        this.pengguna = data;
        if (data.peran === 5)
          this.muatNamaMitra(data.id_mitra);
      },
      error: (err) => {
        this.pesanError = pesanApi(err);
      }
    });
  }
  muatNamaMitra(id) {
    if (!idValid(id))
      return;
    this.api.getListMitraRingkas().pipe(timeout(15e3)).subscribe({
      next: (res) => {
        const mitra = res?.data?.find((m) => m.id_mitra === id);
        this.namaMitra = mitra?.nama_mitra || `Organisasi #${id}`;
        this.cdr.markForCheck();
      },
      error: () => {
        this.namaMitra = `Organisasi #${id}`;
        this.cdr.markForCheck();
      }
    });
  }
  kembali() {
    void this.nav.navigateBack("/master-pengguna");
  }
  ubah() {
    if (this.pengguna?.is_deleted === 0) {
      void this.nav.navigateForward(`/master-pengguna/form/ubah?id=${this.pengguna.id_pengguna}`);
    }
  }
};
_DetailPenggunaPage.\u0275fac = function DetailPenggunaPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DetailPenggunaPage)();
};
_DetailPenggunaPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailPenggunaPage, selectors: [["app-detail-pengguna"]], standalone: false, decls: 11, vars: 2, consts: [[1, "ion-no-border"], [1, "dp-toolbar"], ["slot", "start"], ["defaultHref", "/master-pengguna", "text", ""], [1, "dp-bg", 3, "fullscreen"], [1, "dp-container"], [1, "dp-state"], ["name", "crescent"], ["fill", "outline", 3, "click"], [1, "dp-card"], [1, "dp-avatar"], ["name", "person-outline"], [1, "dp-email"], [1, "dp-status"], [1, "dp-notice"], [1, "dp-card", "dp-details"], ["expand", "block", 1, "dp-edit"], ["expand", "block", 1, "dp-edit", 3, "click"]], template: function DetailPenggunaPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header", 0)(1, "ion-toolbar", 1)(2, "ion-buttons", 2);
    \u0275\u0275element(3, "ion-back-button", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ion-title");
    \u0275\u0275text(5, "Detail Pengguna");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "ion-content", 4)(7, "div", 5);
    \u0275\u0275conditionalCreate(8, DetailPenggunaPage_Conditional_8_Template, 4, 0, "div", 6)(9, DetailPenggunaPage_Conditional_9_Template, 5, 1, "div", 6)(10, DetailPenggunaPage_Conditional_10_Template, 32, 13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_1_0;
    \u0275\u0275advance(6);
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx.sedangMuat ? 8 : ctx.pesanError ? 9 : (tmp_1_0 = ctx.pengguna) ? 10 : -1, tmp_1_0);
  }
}, dependencies: [IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonSpinner, IonTitle, IonToolbar, IonBackButton], styles: ["\n.dp-toolbar[_ngcontent-%COMP%] {\n  --background: #fff;\n  --color: #143522;\n}\n.dp-bg[_ngcontent-%COMP%] {\n  --background: #f8faf9;\n}\n.dp-container[_ngcontent-%COMP%] {\n  max-width: 480px;\n  margin: 0 auto;\n  padding: 18px 16px 32px;\n}\n.dp-state[_ngcontent-%COMP%] {\n  padding: 70px 16px;\n  text-align: center;\n  color: #62796b;\n}\n.dp-card[_ngcontent-%COMP%] {\n  padding: 22px 18px;\n  margin-bottom: 14px;\n  border: 1px solid #e2eae5;\n  border-radius: 18px;\n  background: #fff;\n  text-align: center;\n}\n.dp-avatar[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 54px;\n  height: 54px;\n  margin: 0 auto 10px;\n  border-radius: 16px;\n  background: #eaf6ee;\n  color: #16813e;\n  font-size: 29px;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0 0 2px;\n  color: #143522;\n  font-size: 21px;\n}\n.dp-email[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  color: #63766b;\n  font-size: 13px;\n}\n.dp-status[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 5px 11px;\n  border-radius: 999px;\n  background: #e5f6e9;\n  color: #147739;\n  font-size: 12px;\n  font-weight: 700;\n}\n.dp-status.nonaktif[_ngcontent-%COMP%] {\n  background: #f2f2f2;\n  color: #707b73;\n}\n.dp-notice[_ngcontent-%COMP%] {\n  margin: 14px 0 0;\n  color: #8d5c18;\n  font-size: 12px;\n}\n.dp-details[_ngcontent-%COMP%] {\n  text-align: left;\n}\n.dp-details[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 12px;\n  color: #143522;\n  font-size: 15px;\n}\n.dp-details[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 13px 0;\n  border-top: 1px solid #edf1ee;\n  font-size: 13px;\n}\n.dp-details[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #6e7e73;\n}\n.dp-details[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  max-width: 62%;\n  color: #263d2e;\n  text-align: right;\n  overflow-wrap: anywhere;\n}\n.dp-edit[_ngcontent-%COMP%] {\n  --background: #16813e;\n  --border-radius: 12px;\n  min-height: 48px;\n}\n/*# sourceMappingURL=detail-pengguna.page.css.map */"] });
var DetailPenggunaPage = _DetailPenggunaPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DetailPenggunaPage, [{
    type: Component,
    args: [{ selector: "app-detail-pengguna", standalone: false, template: `<ion-header class="ion-no-border">\r
  <ion-toolbar class="dp-toolbar">\r
    <ion-buttons slot="start"><ion-back-button defaultHref="/master-pengguna" text=""></ion-back-button></ion-buttons>\r
    <ion-title>Detail Pengguna</ion-title>\r
  </ion-toolbar>\r
</ion-header>\r
\r
<ion-content [fullscreen]="true" class="dp-bg">\r
  <div class="dp-container">\r
    @if (sedangMuat) {\r
      <div class="dp-state"><ion-spinner name="crescent"></ion-spinner><p>Memuat akun...</p></div>\r
    } @else if (pesanError) {\r
      <div class="dp-state"><p>{{ pesanError }}</p><ion-button fill="outline" (click)="kembali()">Kembali</ion-button></div>\r
    } @else if (pengguna; as akun) {\r
      <section class="dp-card">\r
        <div class="dp-avatar"><ion-icon name="person-outline"></ion-icon></div>\r
        <h1>{{ akun.nama }}</h1>\r
        <p class="dp-email">{{ akun.email }}</p>\r
        <span class="dp-status" [class.nonaktif]="!akun.aktif">{{ akun.aktif ? 'Aktif' : 'Nonaktif' }}</span>\r
        @if (akun.is_deleted) { <p class="dp-notice">Akun ini dihapus sementara. Pulihkan lewat menu di daftar sebelum mengedit.</p> }\r
      </section>\r
\r
      <section class="dp-card dp-details">\r
        <h2>Informasi akun</h2>\r
        <div><span>Peran</span><strong>{{ labelPeran[akun.peran] }}</strong></div>\r
        <div><span>Nomor HP</span><strong>{{ akun.no_hp || 'Belum diisi' }}</strong></div>\r
        @if (akun.peran <= 3) {\r
          <div><span>Alamat</span><strong>{{ akun.alamat || 'Belum diisi' }}</strong></div>\r
        }\r
        @if (akun.peran === 2 || akun.peran === 3) {\r
          <div><span>Nama usaha</span><strong>{{ akun.nama_usaha || 'Belum diisi' }}</strong></div>\r
        }\r
        @if (akun.peran === 5) {\r
          <div><span>Organisasi mitra</span><strong>{{ namaMitra || 'Memuat...' }}</strong></div>\r
        }\r
        <div><span>ID akun</span><strong>#{{ akun.id_pengguna }}</strong></div>\r
      </section>\r
\r
      @if (!akun.is_deleted) {\r
        <ion-button expand="block" class="dp-edit" (click)="ubah()">Edit profil akun</ion-button>\r
      }\r
    }\r
  </div>\r
</ion-content>\r
`, styles: ["/* src/app/master-pengguna/detail-pengguna/detail-pengguna.page.scss */\n.dp-toolbar {\n  --background: #fff;\n  --color: #143522;\n}\n.dp-bg {\n  --background: #f8faf9;\n}\n.dp-container {\n  max-width: 480px;\n  margin: 0 auto;\n  padding: 18px 16px 32px;\n}\n.dp-state {\n  padding: 70px 16px;\n  text-align: center;\n  color: #62796b;\n}\n.dp-card {\n  padding: 22px 18px;\n  margin-bottom: 14px;\n  border: 1px solid #e2eae5;\n  border-radius: 18px;\n  background: #fff;\n  text-align: center;\n}\n.dp-avatar {\n  display: grid;\n  place-items: center;\n  width: 54px;\n  height: 54px;\n  margin: 0 auto 10px;\n  border-radius: 16px;\n  background: #eaf6ee;\n  color: #16813e;\n  font-size: 29px;\n}\nh1 {\n  margin: 0 0 2px;\n  color: #143522;\n  font-size: 21px;\n}\n.dp-email {\n  margin: 0 0 12px;\n  color: #63766b;\n  font-size: 13px;\n}\n.dp-status {\n  display: inline-block;\n  padding: 5px 11px;\n  border-radius: 999px;\n  background: #e5f6e9;\n  color: #147739;\n  font-size: 12px;\n  font-weight: 700;\n}\n.dp-status.nonaktif {\n  background: #f2f2f2;\n  color: #707b73;\n}\n.dp-notice {\n  margin: 14px 0 0;\n  color: #8d5c18;\n  font-size: 12px;\n}\n.dp-details {\n  text-align: left;\n}\n.dp-details h2 {\n  margin: 0 0 12px;\n  color: #143522;\n  font-size: 15px;\n}\n.dp-details > div {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n  padding: 13px 0;\n  border-top: 1px solid #edf1ee;\n  font-size: 13px;\n}\n.dp-details span {\n  color: #6e7e73;\n}\n.dp-details strong {\n  max-width: 62%;\n  color: #263d2e;\n  text-align: right;\n  overflow-wrap: anywhere;\n}\n.dp-edit {\n  --background: #16813e;\n  --border-radius: 12px;\n  min-height: 48px;\n}\n/*# sourceMappingURL=detail-pengguna.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailPenggunaPage, { className: "DetailPenggunaPage", filePath: "src/app/master-pengguna/detail-pengguna/detail-pengguna.page.ts", lineNumber: 15 });
})();

// src/app/master-pengguna/detail-pengguna/detail-pengguna-routing.module.ts
var routes = [{ path: "", component: DetailPenggunaPage }];
var _DetailPenggunaPageRoutingModule = class _DetailPenggunaPageRoutingModule {
};
_DetailPenggunaPageRoutingModule.\u0275fac = function DetailPenggunaPageRoutingModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DetailPenggunaPageRoutingModule)();
};
_DetailPenggunaPageRoutingModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DetailPenggunaPageRoutingModule });
_DetailPenggunaPageRoutingModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
var DetailPenggunaPageRoutingModule = _DetailPenggunaPageRoutingModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DetailPenggunaPageRoutingModule, [{
    type: NgModule,
    args: [{ imports: [RouterModule.forChild(routes)], exports: [RouterModule] }]
  }], null, null);
})();

// src/app/master-pengguna/detail-pengguna/detail-pengguna.module.ts
var _DetailPenggunaPageModule = class _DetailPenggunaPageModule {
};
_DetailPenggunaPageModule.\u0275fac = function DetailPenggunaPageModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _DetailPenggunaPageModule)();
};
_DetailPenggunaPageModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DetailPenggunaPageModule });
_DetailPenggunaPageModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [CommonModule, IonicModule, DetailPenggunaPageRoutingModule] });
var DetailPenggunaPageModule = _DetailPenggunaPageModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DetailPenggunaPageModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, IonicModule, DetailPenggunaPageRoutingModule],
      declarations: [DetailPenggunaPage]
    }]
  }], null, null);
})();
export {
  DetailPenggunaPageModule
};
//# sourceMappingURL=detail-pengguna.module-V7O2HDCM.js.map
