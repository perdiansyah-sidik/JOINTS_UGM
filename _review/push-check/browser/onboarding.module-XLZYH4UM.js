import {
  CommonModule,
  Component,
  FormsModule,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonicModule,
  NgModule,
  RouterModule,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
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

// src/app/onboarding/onboarding.page.ts
var _OnboardingPage = class _OnboardingPage {
  constructor() {
  }
  ngOnInit() {
  }
};
_OnboardingPage.\u0275fac = function OnboardingPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _OnboardingPage)();
};
_OnboardingPage.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OnboardingPage, selectors: [["app-onboarding"]], standalone: false, decls: 9, vars: 2, consts: [[3, "translucent"], [3, "fullscreen"], ["collapse", "condense"], ["size", "large"]], template: function OnboardingPage_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ion-header", 0)(1, "ion-toolbar")(2, "ion-title");
    \u0275\u0275text(3, "onboarding");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(4, "ion-content", 1)(5, "ion-header", 2)(6, "ion-toolbar")(7, "ion-title", 3);
    \u0275\u0275text(8, "onboarding");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275property("translucent", true);
    \u0275\u0275advance(4);
    \u0275\u0275property("fullscreen", true);
  }
}, dependencies: [IonContent, IonHeader, IonTitle, IonToolbar], encapsulation: 2 });
var OnboardingPage = _OnboardingPage;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OnboardingPage, [{
    type: Component,
    args: [{ selector: "app-onboarding", standalone: false, template: '<ion-header [translucent]="true">\r\n  <ion-toolbar>\r\n    <ion-title>onboarding</ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content [fullscreen]="true">\r\n  <ion-header collapse="condense">\r\n    <ion-toolbar>\r\n      <ion-title size="large">onboarding</ion-title>\r\n    </ion-toolbar>\r\n  </ion-header>\r\n</ion-content>\r\n' }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OnboardingPage, { className: "OnboardingPage", filePath: "src/app/onboarding/onboarding.page.ts", lineNumber: 9 });
})();

// src/app/onboarding/onboarding-routing.module.ts
var routes = [
  {
    path: "",
    component: OnboardingPage
  }
];
var _OnboardingPageRoutingModule = class _OnboardingPageRoutingModule {
};
_OnboardingPageRoutingModule.\u0275fac = function OnboardingPageRoutingModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _OnboardingPageRoutingModule)();
};
_OnboardingPageRoutingModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _OnboardingPageRoutingModule });
_OnboardingPageRoutingModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
var OnboardingPageRoutingModule = _OnboardingPageRoutingModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OnboardingPageRoutingModule, [{
    type: NgModule,
    args: [{
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }]
  }], null, null);
})();

// src/app/onboarding/onboarding.module.ts
var _OnboardingPageModule = class _OnboardingPageModule {
};
_OnboardingPageModule.\u0275fac = function OnboardingPageModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _OnboardingPageModule)();
};
_OnboardingPageModule.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _OnboardingPageModule });
_OnboardingPageModule.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
  CommonModule,
  FormsModule,
  IonicModule,
  OnboardingPageRoutingModule
] });
var OnboardingPageModule = _OnboardingPageModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OnboardingPageModule, [{
    type: NgModule,
    args: [{
      imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OnboardingPageRoutingModule
      ],
      declarations: [OnboardingPage]
    }]
  }], null, null);
})();
export {
  OnboardingPageModule
};
//# sourceMappingURL=onboarding.module-XLZYH4UM.js.map
