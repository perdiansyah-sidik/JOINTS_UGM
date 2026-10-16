import {
  ApiService
} from "./chunk-3TCVYCWI.js";
import "./chunk-3ROYJO5F.js";
import {
  LoadingController,
  ToastController
} from "./chunk-LTX2EDXK.js";
import {
  CommonModule,
  Component,
  DefaultValueAccessor,
  FormsModule,
  IonButton,
  IonContent,
  IonIcon,
  IonicModule,
  NavController,
  NgControlStatus,
  NgModel,
  NgModule,
  RouterModule,
  finalize,
  inject,
  setClassMetadata,
  timeout,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵcontrol,
  ɵɵcontrolCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵproperty,
  ɵɵtext,
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

// src/app/login/login.page.ts
var _LoginPage = class _LoginPage {
  constructor() {
    this.api = inject(ApiService);
    this.navCtrl = inject(NavController);
    this.toastCtrl = inject(ToastController);
    this.loadingCtrl = inject(LoadingController);
    this.email = "";
    this.password = "";
    this.tampilkanSandi = false;
  }
  async prosesLogin() {
    if (!this.email.trim() || !this.password) {
      this.tampilPesan("Masukkan email dan password Anda!", "warning");
      return;
    }
    const loading = await this.loadingCtrl.create({
      message: "Memverifikasi akun...",
      spinner: "crescent"
    });
    await loading.present();
    this.api.login({ email: this.email.trim().toLowerCase(), password: this.password }).pipe(timeout(1e4), finalize(() => {
      loading.dismiss();
    })).subscribe({
      next: async (res) => {
        if (res && res.data) {
          localStorage.setItem("ecoapp_user", JSON.stringify(res.data));
        }
        await this.tampilPesan(`Selamat datang, ${res.data?.nama || "Sobat EcoApp"}! \u{1F331}`, "success");
        this.navCtrl.navigateRoot("/dashboard", { animated: true, animationDirection: "forward" });
      },
      error: async (err) => {
        const msg = err.error?.message || "Email atau password salah!";
        this.tampilPesan(msg, "danger");
      }
    });
  }
  // Fungsi cadangan bila tombol di HTML lama memanggil login() atau masuk()
  login() {
    this.prosesLogin();
  }
  masuk() {
    this.prosesLogin();
  }
  keHalamanDaftar() {
    this.navCtrl.navigateForward("/register", { animated: true });
  }
  tombolKembali() {
    this.navCtrl.navigateBack("/onboarding", { animated: true });
  }
  async tampilPesan(pesan, warna) {
    const toast = await this.toastCtrl.create({
      message: pesan,
      duration: 2500,
      color: warna,
      position: "top"
    });
    await toast.present();
  }
};
_LoginPage.\u0275fac = function LoginPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LoginPage)();
};
_LoginPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginPage, selectors: [["app-login"]], standalone: false, decls: 45, vars: 5, consts: [[1, "eco-login-bg", 3, "fullscreen"], [1, "login-container"], [1, "top-bar"], ["type", "button", 1, "back-btn", 3, "click"], ["name", "arrow-undo-outline"], [1, "hero-header"], [1, "logo-badge-wrap"], [1, "mini-eco-logo"], ["viewBox", "0 0 120 120", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["cx", "60", "cy", "60", "r", "54", "fill", "#EAF6F0"], ["d", "M28 66 C23 40, 42 22, 66 24", "stroke", "#1DA1F2", "stroke-width", "9", "stroke-linecap", "round"], ["points", "64,13 82,25 62,35", "fill", "#1DA1F2"], ["d", "M92 54 C97 80, 78 98, 54 96", "stroke", "#22AD5C", "stroke-width", "9", "stroke-linecap", "round"], ["points", "56,107 38,95 58,85", "fill", "#22AD5C"], ["d", "M46 74 C45 55, 58 44, 74 45 C73 61, 63 74, 46 74 Z", "fill", "#22AD5C"], ["d", "M46 74 C45 55, 58 44, 74 45 C60 54, 53 63, 46 74 Z", "fill", "#1DA1F2"], [1, "leaf-corner-badge"], ["name", "leaf"], [1, "white-box-card"], [1, "form-group"], [1, "input-box"], ["name", "mail-outline", 1, "prefix-icon"], ["type", "email", "placeholder", "nama@email.com", 3, "ngModelChange", "ngModel"], ["name", "lock-closed-outline", 1, "prefix-icon"], ["placeholder", "password", 3, "ngModelChange", "keyup.enter", "type", "ngModel"], [1, "suffix-icon", 3, "click", "name"], [1, "bottom-action-area"], ["expand", "block", 1, "btn-masuk-eco", 3, "click"], ["name", "arrow-forward-outline", "slot", "end"], [1, "bottom-register-link"], [3, "click"]], template: function LoginPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-content", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3);
    \u0275\u0275listener("click", function LoginPage_Template_button_click_3_listener() {
      return ctx.tombolKembali();
    });
    \u0275\u0275element(4, "ion-icon", 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 5)(6, "div", 6)(7, "div", 7);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(8, "svg", 8);
    \u0275\u0275element(9, "circle", 9)(10, "path", 10)(11, "polygon", 11)(12, "path", 12)(13, "polygon", 13)(14, "path", 14)(15, "path", 15);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(16, "div", 16);
    \u0275\u0275element(17, "ion-icon", 17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "h2");
    \u0275\u0275text(19, "Masuk ke EcoApp");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p");
    \u0275\u0275text(21, "Masukkan email dan kata sandi akun yang telah Anda daftarkan");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 18)(23, "div", 19)(24, "label");
    \u0275\u0275text(25, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 20);
    \u0275\u0275element(27, "ion-icon", 21);
    \u0275\u0275elementStart(28, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function LoginPage_Template_input_ngModelChange_28_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
      return $event;
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 19)(30, "label");
    \u0275\u0275text(31, "Password");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 20);
    \u0275\u0275element(33, "ion-icon", 23);
    \u0275\u0275elementStart(34, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function LoginPage_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
      return $event;
    });
    \u0275\u0275listener("keyup.enter", function LoginPage_Template_input_keyup_enter_34_listener() {
      return ctx.prosesLogin();
    });
    \u0275\u0275elementEnd();
    \u0275\u0275controlCreate();
    \u0275\u0275elementStart(35, "ion-icon", 25);
    \u0275\u0275listener("click", function LoginPage_Template_ion_icon_click_35_listener() {
      return ctx.tampilkanSandi = !ctx.tampilkanSandi;
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(36, "div", 26)(37, "ion-button", 27);
    \u0275\u0275listener("click", function LoginPage_Template_ion_button_click_37_listener() {
      return ctx.prosesLogin();
    });
    \u0275\u0275elementStart(38, "span");
    \u0275\u0275text(39, "Masuk Sekarang");
    \u0275\u0275elementEnd();
    \u0275\u0275element(40, "ion-icon", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 29);
    \u0275\u0275text(42, " Belum punya akun? ");
    \u0275\u0275elementStart(43, "a", 30);
    \u0275\u0275listener("click", function LoginPage_Template_a_click_43_listener() {
      return ctx.keHalamanDaftar();
    });
    \u0275\u0275text(44, "Daftar Akun");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275property("fullscreen", true);
    \u0275\u0275advance(28);
    \u0275\u0275twoWayProperty("ngModel", ctx.email);
    \u0275\u0275control();
    \u0275\u0275advance(6);
    \u0275\u0275property("type", ctx.tampilkanSandi ? "text" : "password");
    \u0275\u0275twoWayProperty("ngModel", ctx.password);
    \u0275\u0275control();
    \u0275\u0275advance();
    \u0275\u0275property("name", ctx.tampilkanSandi ? "eye-off-outline" : "eye-outline");
  }
}, dependencies: [DefaultValueAccessor, NgControlStatus, NgModel, IonButton, IonContent, IonIcon], styles: ['\n.eco-login-bg[_ngcontent-%COMP%] {\n  --background: #F4FBF7;\n}\n.login-container[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 100%;\n  padding: 28px 20px 24px;\n  max-width: 440px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.top-bar[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 16px;\n  left: 20px;\n}\n.top-bar[_ngcontent-%COMP%]   .back-btn[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  color: #3B7A57;\n  font-size: 24px;\n  cursor: pointer;\n}\n.logo-badge-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 14px;\n}\n.logo-badge-wrap[_ngcontent-%COMP%]   .mini-eco-logo[_ngcontent-%COMP%] {\n  position: relative;\n  width: 72px;\n  height: 72px;\n}\n.logo-badge-wrap[_ngcontent-%COMP%]   .mini-eco-logo[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  filter: drop-shadow(0 4px 12px rgba(34, 173, 92, 0.15));\n}\n.logo-badge-wrap[_ngcontent-%COMP%]   .mini-eco-logo[_ngcontent-%COMP%]   .leaf-corner-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 2px;\n  right: 2px;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: #22AD5C;\n  color: #FFFFFF;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 11px;\n  border: 2px solid #FFFFFF;\n}\n.hero-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 20px;\n}\n.hero-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: #111827;\n  margin: 0 0 6px;\n}\n.hero-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 12.5px;\n  color: #6B7280;\n  line-height: 1.5;\n  margin: 0 auto;\n  max-width: 290px;\n}\n.role-switcher[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  background: #E8EFEA;\n  padding: 4px;\n  border-radius: 14px;\n  margin-bottom: 18px;\n}\n.role-switcher[_ngcontent-%COMP%]   .switch-btn[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  padding: 10px 8px;\n  border-radius: 11px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-size: 12.5px;\n  font-weight: 700;\n  color: #4B5563;\n  transition: all 0.25s ease;\n  cursor: pointer;\n}\n.role-switcher[_ngcontent-%COMP%]   .switch-btn.active[_ngcontent-%COMP%] {\n  background: #FFFFFF;\n  color: #22AD5C;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n}\n.white-box-card[_ngcontent-%COMP%] {\n  background: #FFFFFF;\n  border-radius: 22px;\n  padding: 20px 18px;\n  box-shadow: 0 10px 28px rgba(20, 83, 45, 0.05);\n}\n.white-box-card[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%] {\n  margin-bottom: 14px;\n}\n.white-box-card[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 12.5px;\n  font-weight: 700;\n  color: #1F2937;\n  margin-bottom: 6px;\n}\n.white-box-card[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  background: #EEF2EF;\n  border-radius: 12px;\n  padding: 0 12px;\n  height: 46px;\n  border: 1.5px solid transparent;\n  transition: border 0.2s ease;\n}\n.white-box-card[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]:focus-within {\n  border-color: #22AD5C;\n  background: #F9FDFB;\n}\n.white-box-card[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   .prefix-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #6B7280;\n  margin-right: 10px;\n}\n.white-box-card[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  background: transparent;\n  outline: none;\n  font-size: 13.5px;\n  color: #111827;\n}\n.white-box-card[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   .suffix-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #6B7280;\n  cursor: pointer;\n  padding: 4px;\n}\n.white-box-card[_ngcontent-%COMP%]   .options-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 8px 0 18px;\n  font-size: 12px;\n}\n.white-box-card[_ngcontent-%COMP%]   .options-row[_ngcontent-%COMP%]   .remember-me[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #4B5563;\n  cursor: pointer;\n}\n.white-box-card[_ngcontent-%COMP%]   .options-row[_ngcontent-%COMP%]   .remember-me[_ngcontent-%COMP%]   ion-checkbox[_ngcontent-%COMP%] {\n  --size: 16px;\n  --checkbox-background-checked: #22AD5C;\n  --border-color-checked: #22AD5C;\n}\n.white-box-card[_ngcontent-%COMP%]   .options-row[_ngcontent-%COMP%]   .forgot-link[_ngcontent-%COMP%] {\n  color: #1DA1F2;\n  font-weight: 700;\n  text-decoration: none;\n  cursor: pointer;\n}\n.white-box-card[_ngcontent-%COMP%]   .btn-submit-eco[_ngcontent-%COMP%] {\n  --background: #22AD5C;\n  --background-activated: #1B8F4B;\n  --border-radius: 14px;\n  --box-shadow: 0 6px 16px rgba(34, 173, 92, 0.28);\n  height: 48px;\n  font-size: 14.5px;\n  font-weight: 700;\n  text-transform: none;\n  margin: 0;\n}\n.divider-line[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  text-align: center;\n  margin: 18px 0 14px;\n  color: #9CA3AF;\n  font-size: 11.5px;\n}\n.divider-line[_ngcontent-%COMP%]::before, \n.divider-line[_ngcontent-%COMP%]::after {\n  content: "";\n  flex: 1;\n  border-bottom: 1px solid #E5E7EB;\n}\n.divider-line[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 0 12px;\n}\n.social-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.social-grid[_ngcontent-%COMP%]   .social-btn[_ngcontent-%COMP%] {\n  height: 44px;\n  border-radius: 12px;\n  border: 1px solid #E5E7EB;\n  background: #FFFFFF;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  font-size: 13px;\n  font-weight: 700;\n  color: #1F2937;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);\n}\n.social-grid[_ngcontent-%COMP%]   .social-btn[_ngcontent-%COMP%]   .google-icon[_ngcontent-%COMP%] {\n  color: #EA4335;\n  font-size: 17px;\n}\n.social-grid[_ngcontent-%COMP%]   .social-btn[_ngcontent-%COMP%]   .apple-icon[_ngcontent-%COMP%] {\n  color: #111827;\n  font-size: 18px;\n}\n.bottom-action-area[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.btn-masuk-eco[_ngcontent-%COMP%] {\n  --background: #22AD5C;\n  --background-activated: #1B8F4B;\n  --color: #FFFFFF;\n  --border-radius: 14px;\n  --box-shadow: 0 6px 16px rgba(34, 173, 92, 0.28);\n  height: 48px;\n  margin: 0;\n  font-size: 14.5px;\n  font-weight: 700;\n  text-transform: none;\n}\n.bottom-register-link[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  text-align: center;\n  font-size: 13px;\n  color: #6B7280;\n}\n.bottom-register-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #1DA1F2;\n  font-weight: 800;\n  text-decoration: none;\n  cursor: pointer;\n}\n/*# sourceMappingURL=login.page.css.map */'] });
var LoginPage = _LoginPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginPage, [{
    type: Component,
    args: [{ selector: "app-login", standalone: false, template: `<ion-content [fullscreen]="true" class="eco-login-bg">\r
  <div class="login-container">\r
\r
    <div class="top-bar">\r
      <button type="button" class="back-btn" (click)="tombolKembali()">\r
        <ion-icon name="arrow-undo-outline"></ion-icon>\r
      </button>\r
    </div>\r
\r
    <div class="hero-header">\r
      <div class="logo-badge-wrap">\r
        <div class="mini-eco-logo">\r
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">\r
            <circle cx="60" cy="60" r="54" fill="#EAF6F0"/>\r
            <path d="M28 66 C23 40, 42 22, 66 24" stroke="#1DA1F2" stroke-width="9" stroke-linecap="round"/>\r
            <polygon points="64,13 82,25 62,35" fill="#1DA1F2"/>\r
            <path d="M92 54 C97 80, 78 98, 54 96" stroke="#22AD5C" stroke-width="9" stroke-linecap="round"/>\r
            <polygon points="56,107 38,95 58,85" fill="#22AD5C"/>\r
            <path d="M46 74 C45 55, 58 44, 74 45 C73 61, 63 74, 46 74 Z" fill="#22AD5C"/>\r
            <path d="M46 74 C45 55, 58 44, 74 45 C60 54, 53 63, 46 74 Z" fill="#1DA1F2"/>\r
          </svg>\r
          <div class="leaf-corner-badge">\r
            <ion-icon name="leaf"></ion-icon>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <h2>Masuk ke EcoApp</h2>\r
      <p>Masukkan email dan kata sandi akun yang telah Anda daftarkan</p>\r
    </div>\r
\r
    <div class="white-box-card">\r
      <div class="form-group">\r
        <label>Email</label>\r
        <div class="input-box">\r
          <ion-icon name="mail-outline" class="prefix-icon"></ion-icon>\r
          <input type="email" placeholder="nama@email.com" [(ngModel)]="email" />\r
        </div>\r
      </div>\r
\r
      <div class="form-group">\r
        <label>Password</label>\r
        <div class="input-box">\r
          <ion-icon name="lock-closed-outline" class="prefix-icon"></ion-icon>\r
          <input \r
            [type]="tampilkanSandi ? 'text' : 'password'" \r
            placeholder="password" \r
            [(ngModel)]="password" \r
            (keyup.enter)="prosesLogin()" />\r
          <ion-icon \r
            [name]="tampilkanSandi ? 'eye-off-outline' : 'eye-outline'" \r
            class="suffix-icon" \r
            (click)="tampilkanSandi = !tampilkanSandi">\r
          </ion-icon>\r
        </div>\r
      </div>\r
    </div>\r
\r
    <div class="bottom-action-area">\r
      <ion-button expand="block" class="btn-masuk-eco" (click)="prosesLogin()">\r
        <span>Masuk Sekarang</span>\r
        <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>\r
      </ion-button>\r
\r
      <div class="bottom-register-link">\r
        Belum punya akun? <a (click)="keHalamanDaftar()">Daftar Akun</a>\r
      </div>\r
    </div>\r
\r
  </div>\r
</ion-content>`, styles: ['/* src/app/login/login.page.scss */\n.eco-login-bg {\n  --background: #F4FBF7;\n}\n.login-container {\n  position: relative;\n  min-height: 100%;\n  padding: 28px 20px 24px;\n  max-width: 440px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n.top-bar {\n  position: absolute;\n  top: 16px;\n  left: 20px;\n}\n.top-bar .back-btn {\n  border: 0;\n  background: transparent;\n  color: #3B7A57;\n  font-size: 24px;\n  cursor: pointer;\n}\n.logo-badge-wrap {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 14px;\n}\n.logo-badge-wrap .mini-eco-logo {\n  position: relative;\n  width: 72px;\n  height: 72px;\n}\n.logo-badge-wrap .mini-eco-logo svg {\n  width: 100%;\n  height: 100%;\n  filter: drop-shadow(0 4px 12px rgba(34, 173, 92, 0.15));\n}\n.logo-badge-wrap .mini-eco-logo .leaf-corner-badge {\n  position: absolute;\n  bottom: 2px;\n  right: 2px;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: #22AD5C;\n  color: #FFFFFF;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 11px;\n  border: 2px solid #FFFFFF;\n}\n.hero-header {\n  text-align: center;\n  margin-bottom: 20px;\n}\n.hero-header h2 {\n  font-size: 22px;\n  font-weight: 800;\n  color: #111827;\n  margin: 0 0 6px;\n}\n.hero-header p {\n  font-size: 12.5px;\n  color: #6B7280;\n  line-height: 1.5;\n  margin: 0 auto;\n  max-width: 290px;\n}\n.role-switcher {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  background: #E8EFEA;\n  padding: 4px;\n  border-radius: 14px;\n  margin-bottom: 18px;\n}\n.role-switcher .switch-btn {\n  border: none;\n  background: transparent;\n  padding: 10px 8px;\n  border-radius: 11px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  font-size: 12.5px;\n  font-weight: 700;\n  color: #4B5563;\n  transition: all 0.25s ease;\n  cursor: pointer;\n}\n.role-switcher .switch-btn.active {\n  background: #FFFFFF;\n  color: #22AD5C;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\n}\n.white-box-card {\n  background: #FFFFFF;\n  border-radius: 22px;\n  padding: 20px 18px;\n  box-shadow: 0 10px 28px rgba(20, 83, 45, 0.05);\n}\n.white-box-card .form-group {\n  margin-bottom: 14px;\n}\n.white-box-card .form-group label {\n  display: block;\n  font-size: 12.5px;\n  font-weight: 700;\n  color: #1F2937;\n  margin-bottom: 6px;\n}\n.white-box-card .form-group .input-box {\n  display: flex;\n  align-items: center;\n  background: #EEF2EF;\n  border-radius: 12px;\n  padding: 0 12px;\n  height: 46px;\n  border: 1.5px solid transparent;\n  transition: border 0.2s ease;\n}\n.white-box-card .form-group .input-box:focus-within {\n  border-color: #22AD5C;\n  background: #F9FDFB;\n}\n.white-box-card .form-group .input-box .prefix-icon {\n  font-size: 18px;\n  color: #6B7280;\n  margin-right: 10px;\n}\n.white-box-card .form-group .input-box input {\n  flex: 1;\n  border: none;\n  background: transparent;\n  outline: none;\n  font-size: 13.5px;\n  color: #111827;\n}\n.white-box-card .form-group .input-box .suffix-icon {\n  font-size: 18px;\n  color: #6B7280;\n  cursor: pointer;\n  padding: 4px;\n}\n.white-box-card .options-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin: 8px 0 18px;\n  font-size: 12px;\n}\n.white-box-card .options-row .remember-me {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #4B5563;\n  cursor: pointer;\n}\n.white-box-card .options-row .remember-me ion-checkbox {\n  --size: 16px;\n  --checkbox-background-checked: #22AD5C;\n  --border-color-checked: #22AD5C;\n}\n.white-box-card .options-row .forgot-link {\n  color: #1DA1F2;\n  font-weight: 700;\n  text-decoration: none;\n  cursor: pointer;\n}\n.white-box-card .btn-submit-eco {\n  --background: #22AD5C;\n  --background-activated: #1B8F4B;\n  --border-radius: 14px;\n  --box-shadow: 0 6px 16px rgba(34, 173, 92, 0.28);\n  height: 48px;\n  font-size: 14.5px;\n  font-weight: 700;\n  text-transform: none;\n  margin: 0;\n}\n.divider-line {\n  display: flex;\n  align-items: center;\n  text-align: center;\n  margin: 18px 0 14px;\n  color: #9CA3AF;\n  font-size: 11.5px;\n}\n.divider-line::before,\n.divider-line::after {\n  content: "";\n  flex: 1;\n  border-bottom: 1px solid #E5E7EB;\n}\n.divider-line span {\n  padding: 0 12px;\n}\n.social-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.social-grid .social-btn {\n  height: 44px;\n  border-radius: 12px;\n  border: 1px solid #E5E7EB;\n  background: #FFFFFF;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  font-size: 13px;\n  font-weight: 700;\n  color: #1F2937;\n  cursor: pointer;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);\n}\n.social-grid .social-btn .google-icon {\n  color: #EA4335;\n  font-size: 17px;\n}\n.social-grid .social-btn .apple-icon {\n  color: #111827;\n  font-size: 18px;\n}\n.bottom-action-area {\n  margin-top: 24px;\n}\n.btn-masuk-eco {\n  --background: #22AD5C;\n  --background-activated: #1B8F4B;\n  --color: #FFFFFF;\n  --border-radius: 14px;\n  --box-shadow: 0 6px 16px rgba(34, 173, 92, 0.28);\n  height: 48px;\n  margin: 0;\n  font-size: 14.5px;\n  font-weight: 700;\n  text-transform: none;\n}\n.bottom-register-link {\n  margin-top: 20px;\n  text-align: center;\n  font-size: 13px;\n  color: #6B7280;\n}\n.bottom-register-link a {\n  color: #1DA1F2;\n  font-weight: 800;\n  text-decoration: none;\n  cursor: pointer;\n}\n/*# sourceMappingURL=login.page.css.map */\n'] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginPage, { className: "LoginPage", filePath: "src/app/login/login.page.ts", lineNumber: 12 });
})();

// src/app/login/login-routing.module.ts
var routes = [
  {
    path: "",
    component: LoginPage
  }
];
var _LoginPageRoutingModule = class _LoginPageRoutingModule {
};
_LoginPageRoutingModule.\u0275fac = function LoginPageRoutingModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LoginPageRoutingModule)();
};
_LoginPageRoutingModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _LoginPageRoutingModule });
_LoginPageRoutingModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
var LoginPageRoutingModule = _LoginPageRoutingModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginPageRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/login/login.module.ts
var _LoginPageModule = class _LoginPageModule {
};
_LoginPageModule.\u0275fac = function LoginPageModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _LoginPageModule)();
};
_LoginPageModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _LoginPageModule });
_LoginPageModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
  CommonModule,
  FormsModule,
  IonicModule,
  LoginPageRoutingModule
] });
var LoginPageModule = _LoginPageModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginPageModule, [{
    type: NgModule,
    args: [{
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule
      ],
      declarations: [LoginPage]
    }]
  }], null, null);
})();
export {
  LoginPageModule
};
//# sourceMappingURL=login.module-LFX7NNJ7.js.map
