import "./chunk-LTX2EDXK.js";
import {
  CommonModule,
  Component,
  FormsModule,
  IonButton,
  IonContent,
  IonIcon,
  IonicModule,
  NavController,
  NgModule,
  RouterLink,
  RouterLinkDelegateDirective,
  RouterLinkWithHrefDelegateDirective,
  RouterModule,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵtext
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

// src/app/welcome/welcome.page.ts
var _WelcomePage = class _WelcomePage {
  constructor() {
    this.navCtrl = inject(NavController);
  }
  // Fungsi saat tombol "Mulai Sekarang" diklik
  mulaiSekarang() {
    this.navCtrl.navigateForward("/register", { animated: true });
  }
  // Fungsi saat teks "Masuk" diklik
  keLogin() {
    this.navCtrl.navigateForward("/login", { animated: true });
  }
};
_WelcomePage.\u0275fac = function WelcomePage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _WelcomePage)();
};
_WelcomePage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WelcomePage, selectors: [["app-welcome"]], standalone: false, decls: 28, vars: 1, consts: [[1, "welcome-content", 3, "fullscreen"], [1, "welcome-container"], [1, "top-bar"], [1, "brand"], [1, "badge-pill"], [1, "logo-wrap"], ["src", "assets/icon/logo.jpeg", "alt", "Logo EcoApp"], [1, "bottom-section"], [1, "tag"], [1, "highlight"], [1, "desc"], ["expand", "block", "routerLink", "/register", 1, "btn-start"], ["slot", "end", "name", "arrow-forward"], [1, "login-text"], ["routerLink", "/login"]], template: function WelcomePage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "strong");
    \u0275\u0275text(5, "EcoApp");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "Sampah Menjadi Rupiah");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 4);
    \u0275\u0275text(9, "Jadi Berkah");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 5);
    \u0275\u0275element(11, "img", 6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 7)(13, "span", 8);
    \u0275\u0275text(14, "\u267B LANGKAH KECIL, DAMPAK BESAR");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "h1");
    \u0275\u0275text(16, "Ubah Sampah Jadi ");
    \u0275\u0275elementStart(17, "span", 9);
    \u0275\u0275text(18, "Dampak Positif");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "p", 10);
    \u0275\u0275text(20, " Selesaikan permintaan tanpa ribet: setor sampah dari rumah, dan pantau perkembangannya bersama komunitas. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "ion-button", 11);
    \u0275\u0275text(22, " Mulai Sekarang ");
    \u0275\u0275element(23, "ion-icon", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p", 13);
    \u0275\u0275text(25, " Sudah punya akun? ");
    \u0275\u0275elementStart(26, "a", 14);
    \u0275\u0275text(27, "Masuk");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275property("fullscreen", true);
  }
}, dependencies: [IonButton, IonContent, IonIcon, RouterLinkDelegateDirective, RouterLinkWithHrefDelegateDirective, RouterLink], styles: ["\n.welcome-content[_ngcontent-%COMP%] {\n  --background: #f1fbf4;\n}\n.welcome-container[_ngcontent-%COMP%] {\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 16px 20px 24px;\n}\n.top-bar[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.top-bar[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.top-bar[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #1f2937;\n}\n.top-bar[_ngcontent-%COMP%]   .brand[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: #6b7280;\n}\n.top-bar[_ngcontent-%COMP%]   .badge-pill[_ngcontent-%COMP%] {\n  background: #d1fae5;\n  color: #059669;\n  font-size: 11px;\n  font-weight: 600;\n  padding: 4px 10px;\n  border-radius: 999px;\n}\n.logo-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.logo-wrap[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 190px;\n  max-width: 60%;\n  height: auto;\n  object-fit: contain;\n}\n.bottom-section[_ngcontent-%COMP%]   .tag[_ngcontent-%COMP%] {\n  display: inline-block;\n  background: #fff;\n  border-radius: 999px;\n  padding: 4px 10px;\n  font-size: 10px;\n  font-weight: 700;\n  color: #374151;\n  margin-bottom: 12px;\n}\n.bottom-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 800;\n  line-height: 1.15;\n  color: #111827;\n  margin: 0 0 10px;\n}\n.bottom-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]   .highlight[_ngcontent-%COMP%] {\n  color: #16a34a;\n}\n.bottom-section[_ngcontent-%COMP%]   .desc[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #6b7280;\n  line-height: 1.5;\n  margin: 0 0 20px;\n}\n.bottom-section[_ngcontent-%COMP%]   .btn-start[_ngcontent-%COMP%] {\n  --background: #22c55e;\n  --border-radius: 12px;\n  --box-shadow: none;\n  font-weight: 700;\n  height: 48px;\n  text-transform: none;\n}\n.bottom-section[_ngcontent-%COMP%]   .login-text[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 12px;\n  color: #6b7280;\n  margin-top: 14px;\n}\n.bottom-section[_ngcontent-%COMP%]   .login-text[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #111827;\n  font-weight: 700;\n  text-decoration: none;\n}\n/*# sourceMappingURL=welcome.page.css.map */"] });
var WelcomePage = _WelcomePage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WelcomePage, [{
    type: Component,
    args: [{ selector: "app-welcome", standalone: false, template: '<ion-content [fullscreen]="true" class="welcome-content">\r\n  <div class="welcome-container">\r\n\r\n    <div class="top-bar">\r\n      <div class="brand">\r\n        <strong>EcoApp</strong>\r\n        <span>Sampah Menjadi Rupiah</span>\r\n      </div>\r\n      <span class="badge-pill">Jadi Berkah</span>\r\n    </div>\r\n\r\n    <div class="logo-wrap">\r\n      <img src="assets/icon/logo.jpeg" alt="Logo EcoApp" />\r\n    </div>\r\n\r\n    <div class="bottom-section">\r\n      <span class="tag">\u267B LANGKAH KECIL, DAMPAK BESAR</span>\r\n\r\n      <h1>Ubah Sampah Jadi <span class="highlight">Dampak Positif</span></h1>\r\n\r\n      <p class="desc">\r\n        Selesaikan permintaan tanpa ribet: setor sampah dari rumah,\r\n        dan pantau perkembangannya bersama komunitas.\r\n      </p>\r\n\r\n      <ion-button expand="block" class="btn-start" routerLink="/register">\r\n        Mulai Sekarang\r\n        <ion-icon slot="end" name="arrow-forward"></ion-icon>\r\n      </ion-button>\r\n\r\n      <p class="login-text">\r\n        Sudah punya akun? <a routerLink="/login">Masuk</a>\r\n      </p>\r\n    </div>\r\n\r\n  </div>\r\n</ion-content>', styles: ["/* src/app/welcome/welcome.page.scss */\n.welcome-content {\n  --background: #f1fbf4;\n}\n.welcome-container {\n  min-height: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 16px 20px 24px;\n}\n.top-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.top-bar .brand {\n  display: flex;\n  flex-direction: column;\n}\n.top-bar .brand strong {\n  font-size: 14px;\n  color: #1f2937;\n}\n.top-bar .brand span {\n  font-size: 10px;\n  color: #6b7280;\n}\n.top-bar .badge-pill {\n  background: #d1fae5;\n  color: #059669;\n  font-size: 11px;\n  font-weight: 600;\n  padding: 4px 10px;\n  border-radius: 999px;\n}\n.logo-wrap {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.logo-wrap img {\n  width: 190px;\n  max-width: 60%;\n  height: auto;\n  object-fit: contain;\n}\n.bottom-section .tag {\n  display: inline-block;\n  background: #fff;\n  border-radius: 999px;\n  padding: 4px 10px;\n  font-size: 10px;\n  font-weight: 700;\n  color: #374151;\n  margin-bottom: 12px;\n}\n.bottom-section h1 {\n  font-size: 28px;\n  font-weight: 800;\n  line-height: 1.15;\n  color: #111827;\n  margin: 0 0 10px;\n}\n.bottom-section h1 .highlight {\n  color: #16a34a;\n}\n.bottom-section .desc {\n  font-size: 13px;\n  color: #6b7280;\n  line-height: 1.5;\n  margin: 0 0 20px;\n}\n.bottom-section .btn-start {\n  --background: #22c55e;\n  --border-radius: 12px;\n  --box-shadow: none;\n  font-weight: 700;\n  height: 48px;\n  text-transform: none;\n}\n.bottom-section .login-text {\n  text-align: center;\n  font-size: 12px;\n  color: #6b7280;\n  margin-top: 14px;\n}\n.bottom-section .login-text a {\n  color: #111827;\n  font-weight: 700;\n  text-decoration: none;\n}\n/*# sourceMappingURL=welcome.page.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WelcomePage, { className: "WelcomePage", filePath: "src/app/welcome/welcome.page.ts", lineNumber: 10 });
})();

// src/app/welcome/welcome-routing.module.ts
var routes = [
  {
    path: "",
    component: WelcomePage
  }
];
var _WelcomePageRoutingModule = class _WelcomePageRoutingModule {
};
_WelcomePageRoutingModule.\u0275fac = function WelcomePageRoutingModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _WelcomePageRoutingModule)();
};
_WelcomePageRoutingModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _WelcomePageRoutingModule });
_WelcomePageRoutingModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
var WelcomePageRoutingModule = _WelcomePageRoutingModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WelcomePageRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/welcome/welcome.module.ts
var _WelcomePageModule = class _WelcomePageModule {
};
_WelcomePageModule.\u0275fac = function WelcomePageModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _WelcomePageModule)();
};
_WelcomePageModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _WelcomePageModule });
_WelcomePageModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
  CommonModule,
  FormsModule,
  IonicModule,
  WelcomePageRoutingModule
] });
var WelcomePageModule = _WelcomePageModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WelcomePageModule, [{
    type: NgModule,
    args: [{
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        WelcomePageRoutingModule
      ],
      declarations: [WelcomePage]
    }]
  }], null, null);
})();
export {
  WelcomePageModule
};
//# sourceMappingURL=welcome.module-RYEFL272.js.map
