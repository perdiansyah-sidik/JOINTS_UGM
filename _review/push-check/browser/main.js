import {
  BrowserModule,
  Component,
  HttpClientModule,
  IonApp,
  IonRouterOutlet,
  IonicModule,
  IonicRouteStrategy,
  NgModule,
  PreloadAllModules,
  RouteReuseStrategy,
  RouterModule,
  platformBrowser,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart
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

// src/app/app.component.ts
var _AppComponent = class _AppComponent {
  constructor() {
  }
};
_AppComponent.\u0275fac = function AppComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AppComponent)();
};
_AppComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: false, decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-app");
    \u0275\u0275element(1, "ion-router-outlet");
    \u0275\u0275elementEnd();
  }
}, dependencies: [IonApp, IonRouterOutlet], encapsulation: 2 });
var AppComponent = _AppComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{ selector: "app-root", standalone: false, template: "<ion-app>\r\n  <ion-router-outlet></ion-router-outlet>\r\n</ion-app>\r\n" }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.component.ts", lineNumber: 9 });
})();

// src/app/app-routing.module.ts
var routes = [
  {
    path: "master-pengguna",
    loadChildren: () => import("./master-pengguna.module-DHRQ4BLD.js").then((m) => m.MasterPenggunaPageModule)
  },
  {
    path: "",
    redirectTo: "welcome",
    // <-- OTOMATIS BUKA HALAMAN WELCOME SAAT PERTAMA KALI DIJALANKAN
    pathMatch: "full"
  },
  {
    path: "welcome",
    loadChildren: () => import("./welcome.module-RYEFL272.js").then((m) => m.WelcomePageModule)
  },
  {
    path: "onboarding",
    loadChildren: () => import("./onboarding.module-XLZYH4UM.js").then((m) => m.OnboardingPageModule)
  },
  {
    path: "home",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "login",
    loadChildren: () => import("./login.module-LFX7NNJ7.js").then((m) => m.LoginPageModule)
  },
  {
    path: "register",
    loadChildren: () => import("./register.module-JR7RNV4D.js").then((m) => m.RegisterPageModule)
  },
  {
    path: "dashboard",
    loadChildren: () => import("./dashboard.module-WQND2US4.js").then((m) => m.DashboardPageModule)
  }
];
var _AppRoutingModule = class _AppRoutingModule {
};
_AppRoutingModule.\u0275fac = function AppRoutingModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AppRoutingModule)();
};
_AppRoutingModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AppRoutingModule });
_AppRoutingModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), RouterModule] });
var AppRoutingModule = _AppRoutingModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
      ],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/app.module.ts
var _AppModule = class _AppModule {
};
_AppModule.\u0275fac = function AppModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _AppModule)();
};
_AppModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AppModule, bootstrap: [AppComponent] });
_AppModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ providers: [
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
], imports: [
  BrowserModule,
  IonicModule.forRoot(),
  AppRoutingModule,
  HttpClientModule
  // Sudah ditambahkan di sini
] });
var AppModule = _AppModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppModule, [{
    type: NgModule,
    args: [{
      declarations: [AppComponent],
      imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule
        // Sudah ditambahkan di sini
      ],
      providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
      ],
      bootstrap: [AppComponent]
    }]
  }], null, null);
})();

// src/main.ts
platformBrowser().bootstrapModule(AppModule).catch((err) => console.log(err));
//# sourceMappingURL=main.js.map
