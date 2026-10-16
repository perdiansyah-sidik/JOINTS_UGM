import {
  $,
  B,
  D,
  H,
  I,
  Injectable,
  O,
  OverlayBaseController,
  Q,
  V,
  W,
  an,
  en,
  o,
  o2,
  on,
  q,
  r as r2,
  s,
  setClassMetadata,
  sn,
  tn,
  v,
  z as z2,
  ɵɵdefineInjectable
} from "./chunk-F6TCNWYA.js";
import {
  r
} from "./chunk-3CPGIZT6.js";
import {
  f,
  m
} from "./chunk-KTDVXKZ4.js";
import {
  n as n2
} from "./chunk-XTVSKRH4.js";
import {
  A,
  J,
  Jn,
  Lt,
  Qt,
  Rt,
  Y,
  a,
  d,
  n,
  oe,
  z
} from "./chunk-5SKCZ2KH.js";
import {
  d as d2
} from "./chunk-DI3VEDFV.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-PAXKX5KU.js";

// node_modules/@ionic/core/components/p-B-hirT0v.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var t = () => {
  let t2;
  return { lock: async () => {
    const e2 = t2;
    let n3;
    return t2 = new Promise(((t3) => n3 = t3)), void 0 !== e2 && await e2, n3;
  } };
};

// node_modules/@ionic/core/components/p-DKX1mWld.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var e = Jn(class extends A {
  constructor(o3) {
    super(), false !== o3 && this.__registerHost(), this.__attachShadow(), this.ionBackdropTap = Qt(this, "ionBackdropTap", 7), this.visible = true, this.tappable = true, this.stopPropagation = true;
  }
  onMouseDown(o3) {
    this.emitTap(o3);
  }
  emitTap(o3) {
    this.stopPropagation && (o3.preventDefault(), o3.stopPropagation()), this.tappable && this.ionBackdropTap.emit();
  }
  render() {
    const o3 = v(this);
    return Rt(Lt, { key: "7abaf2c310aa399607451b14063265e8a5846938", "aria-hidden": "true", class: { [o3]: true, "backdrop-hide": !this.visible, "backdrop-no-tappable": !this.tappable } });
  }
  static get style() {
    return { ios: ":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:pointer;opacity:0.01;-ms-touch-action:none;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color, #000)}", md: ":host{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:pointer;opacity:0.01;-ms-touch-action:none;touch-action:none;z-index:2}:host(.backdrop-hide){background:transparent}:host(.backdrop-no-tappable){cursor:auto}:host{background-color:var(--ion-backdrop-color, #000)}" };
  }
}, [33, "ion-backdrop", { visible: [4], tappable: [4], stopPropagation: [4, "stop-propagation"] }, [[2, "click", "onMouseDown"]]]);
function c() {
  "undefined" != typeof customElements && ["ion-backdrop"].forEach(((o3) => {
    "ion-backdrop" === o3 && (customElements.get(oe(o3)) || customElements.define(oe(o3), e));
  }));
}

// node_modules/@ionic/core/components/p-BjizFeM6.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var l = { bubbles: { dur: 1e3, circles: 9, fn: (e2, r3, s3) => {
  const t2 = e2 * r3 / s3 - e2 + "ms", n3 = 2 * Math.PI * r3 / s3;
  return { r: 5, style: { top: 32 * Math.sin(n3) + "%", left: 32 * Math.cos(n3) + "%", "animation-delay": t2 } };
} }, circles: { dur: 1e3, circles: 8, fn: (e2, r3, s3) => {
  const t2 = r3 / s3, n3 = e2 * t2 - e2 + "ms", i = 2 * Math.PI * t2;
  return { r: 5, style: { top: 32 * Math.sin(i) + "%", left: 32 * Math.cos(i) + "%", "animation-delay": n3 } };
} }, circular: { dur: 1400, elmDuration: true, circles: 1, fn: () => ({ r: 20, cx: 48, cy: 48, fill: "none", viewBox: "24 24 48 48", transform: "translate(0,0)", style: {} }) }, crescent: { dur: 750, circles: 1, fn: () => ({ r: 26, style: {} }) }, dots: { dur: 750, circles: 3, fn: (e2, r3) => ({ r: 6, style: { left: 32 - 32 * r3 + "%", "animation-delay": -110 * r3 + "ms" } }) }, lines: { dur: 1e3, lines: 8, fn: (e2, r3, s3) => ({ y1: 14, y2: 26, style: { transform: `rotate(${360 / s3 * r3 + (r3 < s3 / 2 ? 180 : -180)}deg)`, "animation-delay": e2 * r3 / s3 - e2 + "ms" } }) }, "lines-small": { dur: 1e3, lines: 8, fn: (e2, r3, s3) => ({ y1: 12, y2: 20, style: { transform: `rotate(${360 / s3 * r3 + (r3 < s3 / 2 ? 180 : -180)}deg)`, "animation-delay": e2 * r3 / s3 - e2 + "ms" } }) }, "lines-sharp": { dur: 1e3, lines: 12, fn: (e2, r3, s3) => ({ y1: 17, y2: 29, style: { transform: `rotate(${30 * r3 + (r3 < 6 ? 180 : -180)}deg)`, "animation-delay": e2 * r3 / s3 - e2 + "ms" } }) }, "lines-sharp-small": { dur: 1e3, lines: 12, fn: (e2, r3, s3) => ({ y1: 12, y2: 20, style: { transform: `rotate(${30 * r3 + (r3 < 6 ? 180 : -180)}deg)`, "animation-delay": e2 * r3 / s3 - e2 + "ms" } }) } };
var c2 = Jn(class extends A {
  constructor(e2) {
    super(), false !== e2 && this.__registerHost(), this.__attachShadow(), this.paused = false;
  }
  getName() {
    const e2 = this.name || n.get("spinner"), r3 = v(this);
    return e2 || ("ios" === r3 ? "lines" : "circular");
  }
  render() {
    const e2 = this, r3 = v(e2), i = e2.getName(), c5 = l[i] ?? l.lines, m5 = "number" == typeof e2.duration && e2.duration > 10 ? e2.duration : c5.dur, d4 = [];
    if (void 0 !== c5.circles) for (let e3 = 0; e3 < c5.circles; e3++) d4.push(p(c5, m5, e3, c5.circles));
    else if (void 0 !== c5.lines) for (let e3 = 0; e3 < c5.lines; e3++) d4.push(f2(c5, m5, e3, c5.lines));
    return Rt(Lt, { key: "87102ff9ea58b0ecde5d0978386374f7d0e9cf98", class: o2(e2.color, { [r3]: true, [`spinner-${i}`]: true, "spinner-paused": e2.paused || n.getBoolean("_testing") }), role: "progressbar", style: c5.elmDuration ? { animationDuration: m5 + "ms" } : {} }, d4);
  }
  static get style() {
    return ":host{display:inline-block;position:relative;width:28px;height:28px;color:var(--color);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host(.ion-color){color:var(--ion-color-base)}svg{-webkit-transform-origin:center;transform-origin:center;position:absolute;top:0;left:0;width:100%;height:100%;-webkit-transform:translateZ(0);transform:translateZ(0)}:host-context([dir=rtl]) svg{-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}[dir=rtl] svg{-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}@supports selector(:dir(rtl)){svg:dir(rtl){-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}}:host(.spinner-lines) line,:host(.spinner-lines-small) line{stroke-width:7px}:host(.spinner-lines-sharp) line,:host(.spinner-lines-sharp-small) line{stroke-width:4px}:host(.spinner-lines) line,:host(.spinner-lines-small) line,:host(.spinner-lines-sharp) line,:host(.spinner-lines-sharp-small) line{stroke-linecap:round;stroke:currentColor}:host(.spinner-lines) svg,:host(.spinner-lines-small) svg,:host(.spinner-lines-sharp) svg,:host(.spinner-lines-sharp-small) svg{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite}:host(.spinner-bubbles) svg{-webkit-animation:spinner-scale-out 1s linear infinite;animation:spinner-scale-out 1s linear infinite;fill:currentColor}:host(.spinner-circles) svg{-webkit-animation:spinner-fade-out 1s linear infinite;animation:spinner-fade-out 1s linear infinite;fill:currentColor}:host(.spinner-crescent) circle{fill:transparent;stroke-width:4px;stroke-dasharray:128px;stroke-dashoffset:82px;stroke:currentColor}:host(.spinner-crescent) svg{-webkit-animation:spinner-rotate 1s linear infinite;animation:spinner-rotate 1s linear infinite}:host(.spinner-dots) circle{stroke-width:0;fill:currentColor}:host(.spinner-dots) svg{-webkit-animation:spinner-dots 1s linear infinite;animation:spinner-dots 1s linear infinite}:host(.spinner-circular) svg{-webkit-animation:spinner-circular linear infinite;animation:spinner-circular linear infinite}:host(.spinner-circular) circle{-webkit-animation:spinner-circular-inner ease-in-out infinite;animation:spinner-circular-inner ease-in-out infinite;stroke:currentColor;stroke-dasharray:80px, 200px;stroke-dashoffset:0px;stroke-width:5.6;fill:none}:host(.spinner-paused),:host(.spinner-paused) svg,:host(.spinner-paused) circle{-webkit-animation-play-state:paused;animation-play-state:paused}@-webkit-keyframes spinner-fade-out{0%{opacity:1}100%{opacity:0}}@keyframes spinner-fade-out{0%{opacity:1}100%{opacity:0}}@-webkit-keyframes spinner-scale-out{0%{-webkit-transform:scale(1, 1);transform:scale(1, 1)}100%{-webkit-transform:scale(0, 0);transform:scale(0, 0)}}@keyframes spinner-scale-out{0%{-webkit-transform:scale(1, 1);transform:scale(1, 1)}100%{-webkit-transform:scale(0, 0);transform:scale(0, 0)}}@-webkit-keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-rotate{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes spinner-dots{0%{-webkit-transform:scale(1, 1);transform:scale(1, 1);opacity:0.9}50%{-webkit-transform:scale(0.4, 0.4);transform:scale(0.4, 0.4);opacity:0.3}100%{-webkit-transform:scale(1, 1);transform:scale(1, 1);opacity:0.9}}@keyframes spinner-dots{0%{-webkit-transform:scale(1, 1);transform:scale(1, 1);opacity:0.9}50%{-webkit-transform:scale(0.4, 0.4);transform:scale(0.4, 0.4);opacity:0.3}100%{-webkit-transform:scale(1, 1);transform:scale(1, 1);opacity:0.9}}@-webkit-keyframes spinner-circular{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-circular{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes spinner-circular-inner{0%{stroke-dasharray:1px, 200px;stroke-dashoffset:0px}50%{stroke-dasharray:100px, 200px;stroke-dashoffset:-15px}100%{stroke-dasharray:100px, 200px;stroke-dashoffset:-125px}}@keyframes spinner-circular-inner{0%{stroke-dasharray:1px, 200px;stroke-dashoffset:0px}50%{stroke-dasharray:100px, 200px;stroke-dashoffset:-15px}100%{stroke-dasharray:100px, 200px;stroke-dashoffset:-125px}}";
  }
}, [1, "ion-spinner", { color: [513], duration: [2], name: [1], paused: [4] }]);
var p = (e2, r3, s3, n3) => {
  const i = e2.fn(r3, s3, n3);
  return i.style["animation-duration"] = r3 + "ms", Rt("svg", { viewBox: i.viewBox || "0 0 64 64", style: i.style }, Rt("circle", { transform: i.transform || "translate(32,32)", cx: i.cx, cy: i.cy, r: i.r, style: e2.elmDuration ? { animationDuration: r3 + "ms" } : {} }));
};
var f2 = (e2, r3, s3, n3) => {
  const i = e2.fn(r3, s3, n3);
  return i.style["animation-duration"] = r3 + "ms", Rt("svg", { viewBox: i.viewBox || "0 0 64 64", style: i.style }, Rt("line", { transform: "translate(32,32)", y1: i.y1, y2: i.y2 }));
};
function m2() {
  "undefined" != typeof customElements && ["ion-spinner"].forEach(((e2) => {
    "ion-spinner" === e2 && (customElements.get(oe(e2)) || customElements.define(oe(e2), c2));
  }));
}

// node_modules/@ionic/core/components/ion-loading.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var L = (i) => {
  const t2 = r(), n3 = r(), o3 = r();
  return n3.addElement(i.querySelector("ion-backdrop")).fromTo("opacity", 0.01, "var(--backdrop-opacity)").beforeStyles({ "pointer-events": "none" }).afterClearStyles(["pointer-events"]), o3.addElement(i.querySelector(".loading-wrapper")).keyframes([{ offset: 0, opacity: 0.01, transform: "scale(1.1)" }, { offset: 1, opacity: 1, transform: "scale(1)" }]), t2.addElement(i).easing("ease-in-out").duration(200).addAnimation([n3, o3]);
};
var z3 = (i) => {
  const t2 = r(), n3 = r(), o3 = r();
  return n3.addElement(i.querySelector("ion-backdrop")).fromTo("opacity", "var(--backdrop-opacity)", 0), o3.addElement(i.querySelector(".loading-wrapper")).keyframes([{ offset: 0, opacity: 0.99, transform: "scale(1)" }, { offset: 1, opacity: 0, transform: "scale(0.9)" }]), t2.addElement(i).easing("ease-in-out").duration(200).addAnimation([n3, o3]);
};
var E = (i) => {
  const t2 = r(), n3 = r(), o3 = r();
  return n3.addElement(i.querySelector("ion-backdrop")).fromTo("opacity", 0.01, "var(--backdrop-opacity)").beforeStyles({ "pointer-events": "none" }).afterClearStyles(["pointer-events"]), o3.addElement(i.querySelector(".loading-wrapper")).keyframes([{ offset: 0, opacity: 0.01, transform: "scale(1.1)" }, { offset: 1, opacity: 1, transform: "scale(1)" }]), t2.addElement(i).easing("ease-in-out").duration(200).addAnimation([n3, o3]);
};
var W2 = (i) => {
  const t2 = r(), n3 = r(), o3 = r();
  return n3.addElement(i.querySelector("ion-backdrop")).fromTo("opacity", "var(--backdrop-opacity)", 0), o3.addElement(i.querySelector(".loading-wrapper")).keyframes([{ offset: 0, opacity: 0.99, transform: "scale(1)" }, { offset: 1, opacity: 0, transform: "scale(0.9)" }]), t2.addElement(i).easing("ease-in-out").duration(200).addAnimation([n3, o3]);
};
var T = Jn(class extends A {
  constructor(i) {
    super(), false !== i && this.__registerHost(), this.didPresent = Qt(this, "ionLoadingDidPresent", 7), this.willPresent = Qt(this, "ionLoadingWillPresent", 7), this.willDismiss = Qt(this, "ionLoadingWillDismiss", 7), this.didDismiss = Qt(this, "ionLoadingDidDismiss", 7), this.didPresentShorthand = Qt(this, "didPresent", 7), this.willPresentShorthand = Qt(this, "willPresent", 7), this.willDismissShorthand = Qt(this, "willDismiss", 7), this.didDismissShorthand = Qt(this, "didDismiss", 7), this.delegateController = an(this), this.lockController = t(), this.triggerController = sn(), this.customHTMLEnabled = n.get("innerHTMLTemplatesEnabled", s), this.presented = false, this.hasController = false, this.keyboardClose = true, this.duration = 0, this.backdropDismiss = false, this.showBackdrop = true, this.translucent = false, this.animated = true, this.isOpen = false, this.onBackdropTap = () => {
      this.dismiss(void 0, en);
    };
  }
  onIsOpenChange(i, t2) {
    true === i && false === t2 ? this.present() : false === i && true === t2 && this.dismiss();
  }
  triggerChanged() {
    const { trigger: i, el: t2, triggerController: n3 } = this;
    i && n3.addClickListener(t2, i);
  }
  connectedCallback() {
    D(this.el), this.triggerChanged(), this.presented && q(this.el);
  }
  componentWillLoad() {
    if (void 0 === this.spinner) {
      const i = v(this);
      this.spinner = n.get("loadingSpinner", n.get("spinner", "ios" === i ? "lines" : "crescent"));
    }
    this.htmlAttributes?.id || I(this.el);
  }
  componentDidLoad() {
    true === this.isOpen && f((() => this.present())), this.triggerChanged();
  }
  disconnectedCallback() {
    this.triggerController.removeClickListener(), this.presented && $();
  }
  async present() {
    const i = await this.lockController.lock();
    await this.delegateController.attachViewToDom(), await z2(this, "loadingEnter", L, E), this.duration > 0 && (this.durationTimeout = setTimeout((() => this.dismiss()), this.duration + 10)), i();
  }
  async dismiss(i, t2) {
    const n3 = await this.lockController.lock();
    this.durationTimeout && clearTimeout(this.durationTimeout);
    const o3 = await V(this, i, t2, "loadingLeave", z3, W2);
    return o3 && this.delegateController.removeViewFromDom(), n3(), o3;
  }
  onDidDismiss() {
    return W(this.el, "ionLoadingDidDismiss");
  }
  onWillDismiss() {
    return W(this.el, "ionLoadingWillDismiss");
  }
  renderLoadingMessage(i) {
    const { customHTMLEnabled: t2, message: n3 } = this;
    return t2 ? Rt("div", { class: "loading-content", id: i, innerHTML: o(n3) }) : Rt("div", { class: "loading-content", id: i }, n3);
  }
  render() {
    const { message: i, spinner: t2, htmlAttributes: n3, overlayIndex: o3 } = this, a3 = v(this), r3 = `loading-${o3}-msg`;
    return Rt(Lt, __spreadProps(__spreadValues({ key: "b4430bc66aedeca19d5645667cba73c169c4bd76", role: "dialog", "aria-modal": "true", "aria-labelledby": void 0 !== i ? r3 : null, tabindex: "-1" }, n3), { style: { zIndex: "" + (4e4 + this.overlayIndex) }, onIonBackdropTap: this.onBackdropTap, class: __spreadProps(__spreadValues({}, r2(this.cssClass)), { [a3]: true, "overlay-hidden": true, "loading-translucent": this.translucent }) }), Rt("ion-backdrop", { key: "dec0df942ae778c99ebd4dbf08d6c2a0a992639d", visible: this.showBackdrop, tappable: this.backdropDismiss }), Rt("div", { key: "71b2d5fc259666225047fc901648ada1efcd5d4b", tabindex: "0", "aria-hidden": "true" }), Rt("div", { key: "1d83dc3b57ee70c9e8c0f006c6fa576bd96ecded", class: "loading-wrapper ion-overlay-wrapper" }, t2 && Rt("div", { key: "d1cd127e044b8831e396b53122322c1db7e89904", class: "loading-spinner" }, Rt("ion-spinner", { key: "38c2580cf5659da612872f01801a5fbdc2c023ba", name: t2, "aria-hidden": "true" })), void 0 !== i && this.renderLoadingMessage(r3)), Rt("div", { key: "90e5e32ffe0df2c691f364149f43374e676bfaa3", tabindex: "0", "aria-hidden": "true" }));
  }
  get el() {
    return this;
  }
  static get watchers() {
    return { isOpen: [{ onIsOpenChange: 0 }], trigger: [{ triggerChanged: 0 }] };
  }
  static get style() {
    return { ios: ".sc-ion-loading-ios-h{--min-width:auto;--width:auto;--min-height:auto;--height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-loading-ios-h{display:none}.loading-wrapper.sc-ion-loading-ios{display:-ms-flexbox;display:flex;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);opacity:0;z-index:10}ion-spinner.sc-ion-loading-ios{color:var(--spinner-color)}.sc-ion-loading-ios-h{--background:var(--ion-overlay-background-color, var(--ion-color-step-100, var(--ion-background-color-step-100, #f9f9f9)));--max-width:270px;--max-height:90%;--spinner-color:var(--ion-color-step-600, var(--ion-text-color-step-400, #666666));--backdrop-opacity:var(--ion-backdrop-opacity, 0.3);color:var(--ion-text-color, #000);font-size:0.875rem}.loading-wrapper.sc-ion-loading-ios{border-radius:8px;-webkit-padding-start:34px;padding-inline-start:34px;-webkit-padding-end:34px;padding-inline-end:34px;padding-top:24px;padding-bottom:24px}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){.loading-translucent.sc-ion-loading-ios-h .loading-wrapper.sc-ion-loading-ios{background-color:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}.loading-content.sc-ion-loading-ios{font-weight:bold}.loading-spinner.sc-ion-loading-ios+.loading-content.sc-ion-loading-ios{-webkit-margin-start:16px;margin-inline-start:16px}", md: ".sc-ion-loading-md-h{--min-width:auto;--width:auto;--min-height:auto;--height:auto;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;font-family:var(--ion-font-family, inherit);contain:strict;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:1001}.overlay-hidden.sc-ion-loading-md-h{display:none}.loading-wrapper.sc-ion-loading-md{display:-ms-flexbox;display:flex;-ms-flex-align:inherit;align-items:inherit;-ms-flex-pack:inherit;justify-content:inherit;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);opacity:0;z-index:10}ion-spinner.sc-ion-loading-md{color:var(--spinner-color)}.sc-ion-loading-md-h{--background:var(--ion-color-step-50, var(--ion-background-color-step-50, #f2f2f2));--max-width:280px;--max-height:90%;--spinner-color:var(--ion-color-primary, #0054e9);--backdrop-opacity:var(--ion-backdrop-opacity, 0.32);color:var(--ion-color-step-850, var(--ion-text-color-step-150, #262626));font-size:0.875rem}.loading-wrapper.sc-ion-loading-md{border-radius:2px;-webkit-padding-start:24px;padding-inline-start:24px;-webkit-padding-end:24px;padding-inline-end:24px;padding-top:24px;padding-bottom:24px;-webkit-box-shadow:0 16px 20px rgba(0, 0, 0, 0.4);box-shadow:0 16px 20px rgba(0, 0, 0, 0.4)}.loading-spinner.sc-ion-loading-md+.loading-content.sc-ion-loading-md{-webkit-margin-start:16px;margin-inline-start:16px}" };
  }
}, [34, "ion-loading", { overlayIndex: [2, "overlay-index"], delegate: [16], hasController: [4, "has-controller"], keyboardClose: [4, "keyboard-close"], enterAnimation: [16], leaveAnimation: [16], message: [1], cssClass: [1, "css-class"], duration: [2], backdropDismiss: [4, "backdrop-dismiss"], showBackdrop: [4, "show-backdrop"], spinner: [1025], translucent: [4], animated: [4], htmlAttributes: [16], isOpen: [4, "is-open"], trigger: [1], present: [64], dismiss: [64], onDidDismiss: [64], onWillDismiss: [64] }, void 0, { isOpen: [{ onIsOpenChange: 0 }], trigger: [{ triggerChanged: 0 }] }]);
var B2 = function() {
  "undefined" != typeof customElements && ["ion-loading", "ion-backdrop", "ion-spinner"].forEach(((i) => {
    switch (i) {
      case "ion-loading":
        customElements.get(oe(i)) || customElements.define(oe(i), T);
        break;
      case "ion-backdrop":
        customElements.get(oe(i)) || c();
        break;
      case "ion-spinner":
        customElements.get(oe(i)) || m2();
    }
  }));
};

// node_modules/@ionic/angular/dist/standalone/providers/loading-controller.js
var LoadingController = class _LoadingController extends OverlayBaseController {
  constructor() {
    super(O);
    B2();
  }
  /** @nocollapse */
  static \u0275fac = function LoadingController_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoadingController)();
  };
  /** @nocollapse */
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _LoadingController,
    factory: _LoadingController.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoadingController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

// node_modules/@ionic/core/components/p-MLplUp3U.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var s2;
var c3 = (o3, t2, n3, i, r3) => (n3 = "ios" === (n3 && h(n3)) ? "ios" : "md", i && "ios" === n3 ? o3 = h(i) : r3 && "md" === n3 ? o3 = h(r3) : (o3 || !t2 || a2(t2) || (o3 = t2), d3(o3) && (o3 = h(o3))), d3(o3) && "" !== o3.trim() ? "" !== o3.replace(/[a-z]|-|\d/gi, "") ? null : o3 : null);
var l2 = (o3) => d3(o3) && (o3 = o3.trim(), a2(o3)) ? o3 : null;
var a2 = (o3) => o3.length > 0 && /(\/|\.)/.test(o3);
var d3 = (o3) => "string" == typeof o3;
var h = (o3) => o3.toLowerCase();
var f3 = (o3) => {
  if (1 === o3.nodeType) {
    if ("script" === o3.nodeName.toLowerCase()) return false;
    for (let t2 = 0; t2 < o3.attributes.length; t2++) {
      const n3 = o3.attributes[t2].name;
      if (d3(n3) && 0 === n3.toLowerCase().indexOf("on")) return false;
    }
    for (let t2 = 0; t2 < o3.childNodes.length; t2++) if (!f3(o3.childNodes[t2])) return false;
  }
  return true;
};
var u = /* @__PURE__ */ new Map();
var m3 = /* @__PURE__ */ new Map();
var p2;
function g(o3) {
  return u.set(o3, ""), "";
}
var w = Jn(class extends A {
  constructor(o3) {
    super(), false !== o3 && this.__registerHost(), this.__attachShadow(), this.iconName = null, this.inheritedAttributes = {}, this.didLoadIcon = false, this.isVisible = false, this.mode = b(), this.lazy = false, this.sanitize = true;
  }
  componentWillLoad() {
    this.inheritedAttributes = ((o3, t2 = []) => {
      const n3 = {};
      return t2.forEach(((t3) => {
        o3.hasAttribute(t3) && (null !== o3.getAttribute(t3) && (n3[t3] = o3.getAttribute(t3)), o3.removeAttribute(t3));
      })), n3;
    })(this.el, ["aria-label"]);
  }
  connectedCallback() {
    this.waitUntilVisible(this.el, "50px", (() => {
      this.isVisible = true, this.loadIcon();
    }));
  }
  componentDidLoad() {
    this.didLoadIcon || this.loadIcon();
  }
  disconnectedCallback() {
    this.io && (this.io.disconnect(), this.io = void 0);
  }
  waitUntilVisible(o3, t2, n3) {
    if (!Boolean(this.lazy && "undefined" != typeof window && window.IntersectionObserver)) return n3();
    const i = this.io = new window.IntersectionObserver(((o4) => {
      o4[0].isIntersecting && (i.disconnect(), this.io = void 0, n3());
    }), { rootMargin: t2 });
    i.observe(o3);
  }
  loadIcon() {
    if (this.isVisible) {
      const t2 = ((t3) => {
        let n3 = l2(t3.src);
        if (n3) return n3;
        if (n3 = c3(t3.name, t3.icon, t3.mode, t3.ios, t3.md), n3) return ((t4, n4) => {
          const i = (() => {
            if ("undefined" == typeof window) return /* @__PURE__ */ new Map();
            if (!s2) {
              const o3 = window;
              o3.Ionicons = o3.Ionicons || {}, s2 = o3.Ionicons.map = o3.Ionicons.map || /* @__PURE__ */ new Map();
            }
            return s2;
          })().get(t4);
          if (i) return i;
          try {
            return Y(`svg/${t4}.svg`);
          } catch (o3) {
            console.log("e", o3), console.warn(`[Ionicons Warning]: Could not load icon with name "${t4}". Ensure that the icon is registered using addIcons or that the icon SVG data is passed directly to the icon component.`, n4);
          }
        })(n3, t3);
        if (t3.icon) {
          if (n3 = l2(t3.icon), n3) return n3;
          if (n3 = l2(t3.icon[t3.mode]), n3) return n3;
        }
        return null;
      })(this);
      t2 && (u.has(t2) ? this.svgContent = u.get(t2) : ((o3, t3) => m3.get(o3) || ("undefined" != typeof fetch && "undefined" != typeof document ? ((o4) => o4.startsWith("data:image/svg+xml"))(o3) && ((o4) => -1 !== o4.indexOf(";utf8,"))(o3) ? Promise.resolve((function(o4) {
        p2 || (p2 = new DOMParser());
        const t4 = p2.parseFromString(o4, "text/html").querySelector("svg");
        if (t4) return u.set(o4, t4.outerHTML), t4.outerHTML;
        throw new Error(`Could not parse svg from ${o4}`);
      })(o3)) : (function(o4, t4) {
        const n3 = fetch(o4).then(((n4) => n4.text().then(((n5) => {
          n5 && false !== t4 && (n5 = ((o5) => {
            const t5 = document.createElement("div");
            t5.innerHTML = o5;
            for (let o6 = t5.childNodes.length - 1; o6 >= 0; o6--) "svg" !== t5.childNodes[o6].nodeName.toLowerCase() && t5.removeChild(t5.childNodes[o6]);
            const n6 = t5.firstElementChild;
            if (n6 && "svg" === n6.nodeName.toLowerCase()) {
              const o6 = n6.getAttribute("class") || "";
              if (n6.setAttribute("class", (o6 + " s-ion-icon").trim()), f3(n6)) return t5.innerHTML;
            }
            return "";
          })(n5));
          const i = n5 || "";
          return u.set(o4, i), i;
        })).catch((() => g(o4))))).catch((() => g(o4)));
        return m3.set(o4, n3), n3;
      })(o3, t3) : Promise.resolve(g(o3))))(t2, this.sanitize).then((() => this.svgContent = u.get(t2))), this.didLoadIcon = true);
    }
    this.iconName = c3(this.name, this.icon, this.mode, this.ios, this.md);
  }
  render() {
    const { flipRtl: o3, iconName: t2, inheritedAttributes: n3, el: e2 } = this, s3 = this.mode || "md", c5 = !!t2 && (t2.includes("arrow") || t2.includes("chevron")) && false !== o3, l4 = o3 || c5;
    return Rt(Lt, Object.assign({ key: "0578c899781ca145dd8205acd9670af39b57cf2e", role: "img", class: Object.assign(Object.assign({ [s3]: true }, v2(this.color)), { [`icon-${this.size}`]: !!this.size, "flip-rtl": l4, "icon-rtl": l4 && (a3 = e2, a3 && "" !== a3.dir ? "rtl" === a3.dir.toLowerCase() : "rtl" === (null === document || void 0 === document ? void 0 : document.dir.toLowerCase())) }) }, n3), this.svgContent ? Rt("div", { class: "icon-inner", innerHTML: this.svgContent }) : Rt("div", { class: "icon-inner" }, Rt("slot", null)));
    var a3;
  }
  static get assetsDirs() {
    return ["svg"];
  }
  get el() {
    return this;
  }
  static get watchers() {
    return { name: [{ loadIcon: 0 }], src: [{ loadIcon: 0 }], icon: [{ loadIcon: 0 }], ios: [{ loadIcon: 0 }], md: [{ loadIcon: 0 }] };
  }
  static get style() {
    return ":host{display:inline-block;width:1em;height:1em;font-size:1em;contain:layout style;fill:currentColor;-webkit-box-sizing:content-box !important;box-sizing:content-box !important}:host .ionicon{stroke:currentColor}.ionicon-fill-none{fill:none}.ionicon-stroke-width{stroke-width:var(--ionicon-stroke-width, 32px)}.icon-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.ionicon,svg{display:block;height:100%;width:100%}::slotted(*){font-size:inherit !important}@supports (background: -webkit-named-image(i)){:host(.icon-rtl) .icon-inner{-webkit-transform:scaleX(-1);transform:scaleX(-1)}}@supports not selector(:dir(rtl)) and selector(:host-context([dir='rtl'])){:host(.icon-rtl) .icon-inner{-webkit-transform:scaleX(-1);transform:scaleX(-1)}}:host(.flip-rtl):host-context([dir='rtl']) .icon-inner{-webkit-transform:scaleX(-1);transform:scaleX(-1)}@supports selector(:dir(rtl)){:host(.flip-rtl:dir(rtl)) .icon-inner{-webkit-transform:scaleX(-1);transform:scaleX(-1)}:host(.flip-rtl:dir(ltr)) .icon-inner{-webkit-transform:scaleX(1);transform:scaleX(1)}}:host(.icon-small){font-size:1.125rem !important}:host(.icon-large){font-size:2rem !important}:host(.ion-color){color:var(--ion-color-base) !important}:host(.ion-color-primary){--ion-color-base:var(--ion-color-primary, #3880ff)}:host(.ion-color-secondary){--ion-color-base:var(--ion-color-secondary, #0cd1e8)}:host(.ion-color-tertiary){--ion-color-base:var(--ion-color-tertiary, #f4a942)}:host(.ion-color-success){--ion-color-base:var(--ion-color-success, #10dc60)}:host(.ion-color-warning){--ion-color-base:var(--ion-color-warning, #ffce00)}:host(.ion-color-danger){--ion-color-base:var(--ion-color-danger, #f14141)}:host(.ion-color-light){--ion-color-base:var(--ion-color-light, #f4f5f8)}:host(.ion-color-medium){--ion-color-base:var(--ion-color-medium, #989aa2)}:host(.ion-color-dark){--ion-color-base:var(--ion-color-dark, #222428)}";
  }
}, [257, "ion-icon", { mode: [1025], color: [1], ios: [1], md: [1], flipRtl: [4, "flip-rtl"], name: [513], src: [1], icon: [8], size: [1], lazy: [4], sanitize: [4], svgContent: [32], isVisible: [32] }, void 0, { name: [{ loadIcon: 0 }], src: [{ loadIcon: 0 }], icon: [{ loadIcon: 0 }], ios: [{ loadIcon: 0 }], md: [{ loadIcon: 0 }] }]);
var b = () => "undefined" != typeof document && document.documentElement.getAttribute("mode") || "md";
var v2 = (o3) => o3 ? { "ion-color": true, [`ion-color-${o3}`]: true } : null;
function y() {
  "undefined" != typeof customElements && ["ion-icon"].forEach(((o3) => {
    "ion-icon" === o3 && (customElements.get(oe(o3)) || customElements.define(oe(o3), w));
  }));
}

// node_modules/@ionic/core/components/p-BuxZkazO.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var m4 = Jn(class extends A {
  constructor(t2) {
    super(), false !== t2 && this.__registerHost(), this.__attachShadow(), this.type = "bounded";
  }
  async addRipple(t2, n3) {
    return new Promise(((e2) => {
      z((() => {
        const i = this.el.getBoundingClientRect(), o3 = i.width, r3 = i.height, s3 = Math.sqrt(o3 * o3 + r3 * r3), m5 = Math.max(r3, o3), u3 = this.unbounded ? m5 : s3 + f4, p3 = Math.floor(m5 * l3), d4 = u3 / p3;
        let b2 = t2 - i.left, k = n3 - i.top;
        this.unbounded && (b2 = 0.5 * o3, k = 0.5 * r3);
        const w2 = b2 - 0.5 * p3, y2 = k - 0.5 * p3, h2 = 0.5 * o3 - b2, g2 = 0.5 * r3 - k;
        J((() => {
          const t3 = document.createElement("div");
          t3.classList.add("ripple-effect");
          const n4 = t3.style;
          n4.top = y2 + "px", n4.left = w2 + "px", n4.width = n4.height = p3 + "px", n4.setProperty("--final-scale", `${d4}`), n4.setProperty("--translate-end", `${h2}px, ${g2}px`), (this.el.shadowRoot || this.el).appendChild(t3), setTimeout((() => {
            e2((() => {
              c4(t3);
            }));
          }), 325);
        }));
      }));
    }));
  }
  get unbounded() {
    return "unbounded" === this.type;
  }
  render() {
    const t2 = v(this);
    return Rt(Lt, { key: "371350cb76e98338ef7467191aaaf817b1298b3f", role: "presentation", class: { [t2]: true, unbounded: this.unbounded } });
  }
  get el() {
    return this;
  }
  static get style() {
    return ":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:strict;pointer-events:none}:host(.unbounded){contain:layout size style}.ripple-effect{border-radius:50%;position:absolute;background-color:currentColor;color:inherit;contain:strict;opacity:0;-webkit-animation:225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;animation:225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;will-change:transform, opacity;pointer-events:none}.fade-out{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1));-webkit-animation:150ms fadeOutAnimation forwards;animation:150ms fadeOutAnimation forwards}@-webkit-keyframes rippleAnimation{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1))}}@keyframes rippleAnimation{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1))}}@-webkit-keyframes fadeInAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:0.16}}@keyframes fadeInAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:0.16}}@-webkit-keyframes fadeOutAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0.16}to{opacity:0}}@keyframes fadeOutAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0.16}to{opacity:0}}";
  }
}, [1, "ion-ripple-effect", { type: [1], addRipple: [64] }]);
var c4 = (t2) => {
  t2.classList.add("fade-out"), setTimeout((() => {
    t2.remove();
  }), 200);
};
var f4 = 10;
var l3 = 0.5;
function u2() {
  "undefined" != typeof customElements && ["ion-ripple-effect"].forEach(((t2) => {
    "ion-ripple-effect" === t2 && (customElements.get(oe(t2)) || customElements.define(oe(t2), m4));
  }));
}

// node_modules/@ionic/core/components/ion-toast.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var O2 = (t2, o3) => Math.floor(t2 / 2 - o3 / 2);
var W3 = (t2, o3) => {
  const e2 = r(), i = r(), { position: a3, top: s3, bottom: n3 } = o3, r3 = m(t2).querySelector(".toast-wrapper");
  switch (i.addElement(r3), a3) {
    case "top":
      i.fromTo("transform", "translateY(-100%)", `translateY(${s3})`);
      break;
    case "middle":
      const o4 = O2(t2.clientHeight, r3.clientHeight);
      r3.style.top = o4 + "px", i.fromTo("opacity", 0.01, 1);
      break;
    default:
      i.fromTo("transform", "translateY(100%)", `translateY(${n3})`);
  }
  return e2.easing("cubic-bezier(.155,1.105,.295,1.12)").duration(400).addAnimation(i);
};
var A2 = (t2, o3) => {
  const e2 = r(), i = r(), { position: a3, top: s3, bottom: n3 } = o3, r3 = m(t2).querySelector(".toast-wrapper");
  switch (i.addElement(r3), a3) {
    case "top":
      i.fromTo("transform", `translateY(${s3})`, "translateY(-100%)");
      break;
    case "middle":
      i.fromTo("opacity", 0.99, 0);
      break;
    default:
      i.fromTo("transform", `translateY(${n3})`, "translateY(100%)");
  }
  return e2.easing("cubic-bezier(.36,.66,.04,1)").duration(300).addAnimation(i);
};
var P = (t2, o3) => {
  const e2 = r(), i = r(), { position: a3, top: s3, bottom: n3 } = o3, r3 = m(t2).querySelector(".toast-wrapper");
  switch (i.addElement(r3), a3) {
    case "top":
      r3.style.setProperty("transform", `translateY(${s3})`), i.fromTo("opacity", 0.01, 1);
      break;
    case "middle":
      const o4 = O2(t2.clientHeight, r3.clientHeight);
      r3.style.top = o4 + "px", i.fromTo("opacity", 0.01, 1);
      break;
    default:
      r3.style.setProperty("transform", `translateY(${n3})`), i.fromTo("opacity", 0.01, 1);
  }
  return e2.easing("cubic-bezier(.36,.66,.04,1)").duration(400).addAnimation(i);
};
var I2 = (t2) => {
  const o3 = r(), e2 = r(), i = m(t2).querySelector(".toast-wrapper");
  return e2.addElement(i).fromTo("opacity", 0.99, 0), o3.easing("cubic-bezier(.36,.66,.04,1)").duration(300).addAnimation(e2);
};
var H2 = Jn(class extends A {
  constructor(t2) {
    super(), false !== t2 && this.__registerHost(), this.__attachShadow(), this.didPresent = Qt(this, "ionToastDidPresent", 7), this.willPresent = Qt(this, "ionToastWillPresent", 7), this.willDismiss = Qt(this, "ionToastWillDismiss", 7), this.didDismiss = Qt(this, "ionToastDidDismiss", 7), this.didPresentShorthand = Qt(this, "didPresent", 7), this.willPresentShorthand = Qt(this, "willPresent", 7), this.willDismissShorthand = Qt(this, "willDismiss", 7), this.didDismissShorthand = Qt(this, "didDismiss", 7), this.delegateController = an(this), this.lockController = t(), this.triggerController = sn(), this.customHTMLEnabled = n.get("innerHTMLTemplatesEnabled", s), this.presented = false, this.revealContentToScreenReader = false, this.hasController = false, this.duration = n.getNumber("toastDuration", 0), this.layout = "baseline", this.keyboardClose = false, this.position = "bottom", this.translucent = false, this.animated = true, this.isOpen = false, this.dispatchCancelHandler = (t3) => {
      if (H(t3.detail.role)) {
        const t4 = this.getButtons().find(((t5) => "cancel" === t5.role));
        this.callButtonHandler(t4);
      }
    }, this.createSwipeGesture = (t3) => {
      const o3 = this.gesture = ((t4, o4, e2) => {
        const i = m(t4).querySelector(".toast-wrapper"), a3 = t4.clientHeight, s3 = i.getBoundingClientRect();
        let n3 = 0;
        const r3 = "middle" === t4.position ? 0.5 : 0, d4 = "top" === t4.position ? -1 : 1, l4 = O2(a3, s3.height), c5 = [{ offset: 0, transform: `translateY(-${l4 + s3.height}px)` }, { offset: 0.5, transform: "translateY(0px)" }, { offset: 1, transform: `translateY(${l4 + s3.height}px)` }], h2 = r("toast-swipe-to-dismiss-animation").addElement(i).duration(100);
        switch (t4.position) {
          case "middle":
            n3 = a3 + s3.height, h2.keyframes(c5), h2.progressStart(true, 0.5);
            break;
          case "top":
            n3 = s3.bottom, h2.keyframes([{ offset: 0, transform: `translateY(${o4.top})` }, { offset: 1, transform: "translateY(-100%)" }]), h2.progressStart(true, 0);
            break;
          default:
            n3 = a3 - s3.top, h2.keyframes([{ offset: 0, transform: `translateY(${o4.bottom})` }, { offset: 1, transform: "translateY(100%)" }]), h2.progressStart(true, 0);
        }
        const b2 = (t5) => t5 * d4 / n3, u3 = n2({ el: i, gestureName: "toast-swipe-to-dismiss", gesturePriority: tn, direction: "y", onMove: (t5) => {
          const o5 = r3 + b2(t5.deltaY);
          h2.progressStep(o5);
        }, onEnd: (o5) => {
          const a4 = o5.velocityY, s4 = (o5.deltaY + 1e3 * a4) / n3 * d4;
          u3.enable(false);
          let r4 = true, p3 = 1, m5 = 0, g2 = 0;
          if ("middle" === t4.position) {
            r4 = s4 >= 0.25 || s4 <= -0.25, p3 = 1, m5 = 0;
            const t5 = i.getBoundingClientRect(), e3 = t5.top - l4, a5 = (l4 + t5.height) * (o5.deltaY <= 0 ? -1 : 1);
            h2.keyframes([{ offset: 0, transform: `translateY(${e3 + "px"})` }, { offset: 1, transform: `translateY(${r4 ? a5 + "px" : "0px"})` }]), g2 = a5 - e3;
          } else r4 = s4 >= 0.5, p3 = r4 ? 1 : 0, m5 = b2(o5.deltaY), g2 = (r4 ? 1 - m5 : m5) * n3;
          const f5 = Math.min(Math.abs(g2) / Math.abs(a4), 200);
          h2.onFinish((() => {
            r4 ? (e2(), h2.destroy()) : ("middle" === t4.position ? h2.keyframes(c5).progressStart(true, 0.5) : h2.progressStart(true, 0), u3.enable(true));
          }), { oneTimeCallback: true }).progressEnd(p3, m5, f5);
        } });
        return u3;
      })(this.el, t3, (() => {
        this.dismiss(void 0, on);
      }));
      o3.enable(true);
    }, this.destroySwipeGesture = () => {
      const { gesture: t3 } = this;
      void 0 !== t3 && (t3.destroy(), this.gesture = void 0);
    }, this.prefersSwipeGesture = () => {
      const { swipeGesture: t3 } = this;
      return "vertical" === t3;
    };
  }
  swipeGestureChanged() {
    this.destroySwipeGesture(), this.presented && this.prefersSwipeGesture() && this.createSwipeGesture(this.lastPresentedPosition);
  }
  onIsOpenChange(t2, o3) {
    true === t2 && false === o3 ? this.present() : false === t2 && true === o3 && this.dismiss();
  }
  triggerChanged() {
    const { trigger: t2, el: o3, triggerController: e2 } = this;
    t2 && e2.addClickListener(o3, t2);
  }
  connectedCallback() {
    D(this.el), this.triggerChanged();
  }
  disconnectedCallback() {
    this.triggerController.removeClickListener();
  }
  componentWillLoad() {
    this.htmlAttributes?.id || I(this.el);
  }
  componentDidLoad() {
    true === this.isOpen && f((() => this.present())), this.triggerChanged();
  }
  async present() {
    const o3 = await this.lockController.lock();
    await this.delegateController.attachViewToDom();
    const { el: e2, position: i } = this, a3 = (function(o4, e3, i2, a4) {
      let s3;
      if (s3 = "md" === i2 ? "top" === o4 ? 8 : -8 : "top" === o4 ? 10 : -10, e3 && d2) {
        !(function(o5, e4) {
          null === o5.offsetParent && a("[ion-toast] - The positionAnchor element for ion-toast was found in the DOM, but appears to be hidden. This may lead to unexpected positioning of the toast.", e4);
        })(e3, a4);
        const i3 = e3.getBoundingClientRect();
        return "top" === o4 ? s3 += i3.bottom : "bottom" === o4 && (s3 -= d2.innerHeight - i3.top), { top: s3 + "px", bottom: s3 + "px" };
      }
      return { top: `calc(${s3}px + var(--ion-safe-area-top, 0px))`, bottom: `calc(${s3}px - var(--ion-safe-area-bottom, 0px))` };
    })(i, this.getAnchorElement(), v(this), e2);
    this.lastPresentedPosition = a3, await z2(this, "toastEnter", W3, P, { position: i, top: a3.top, bottom: a3.bottom }), this.revealContentToScreenReader = true, this.duration > 0 && (this.durationTimeout = setTimeout((() => this.dismiss(void 0, "timeout")), this.duration)), this.prefersSwipeGesture() && this.createSwipeGesture(a3), o3();
  }
  async dismiss(t2, o3) {
    const e2 = await this.lockController.lock(), { durationTimeout: i, position: a3, lastPresentedPosition: s3 } = this;
    i && clearTimeout(i);
    const n3 = await V(this, t2, o3, "toastLeave", A2, I2, { position: a3, top: s3?.top ?? "", bottom: s3?.bottom ?? "" });
    return n3 && (this.delegateController.removeViewFromDom(), this.revealContentToScreenReader = false), this.lastPresentedPosition = void 0, this.destroySwipeGesture(), e2(), n3;
  }
  onDidDismiss() {
    return W(this.el, "ionToastDidDismiss");
  }
  onWillDismiss() {
    return W(this.el, "ionToastWillDismiss");
  }
  getButtons() {
    return this.buttons ? this.buttons.map(((t2) => "string" == typeof t2 ? { text: t2 } : t2)) : [];
  }
  getAnchorElement() {
    const { position: o3, positionAnchor: i, el: a3 } = this;
    if (void 0 !== i) if ("middle" !== o3 || void 0 === i) {
      if ("string" == typeof i) {
        const o4 = document.getElementById(i);
        return null === o4 ? void a(`[ion-toast] - An anchor element with an ID of "${i}" was not found in the DOM.`, a3) : o4;
      }
      if (i instanceof A) return i;
      a("[ion-toast] - Invalid positionAnchor value:", i, a3);
    } else a('[ion-toast] - The positionAnchor property is ignored when using position="middle".', this.el);
  }
  async buttonClick(t2) {
    const o3 = t2.role;
    return H(o3) || await this.callButtonHandler(t2) ? this.dismiss(void 0, o3) : Promise.resolve();
  }
  async callButtonHandler(t2) {
    if (t2?.handler) try {
      if (false === await Q(t2.handler)) return false;
    } catch (t3) {
      d("[ion-toast] - Exception in callButtonHandler:", t3);
    }
    return true;
  }
  renderButtons(t2, o3) {
    if (0 === t2.length) return;
    const e2 = v(this);
    return Rt("div", { class: { "toast-button-group": true, ["toast-button-group-" + o3]: true } }, t2.map(((t3) => Rt("button", __spreadProps(__spreadValues({}, t3.htmlAttributes), { type: "button", class: L2(t3), tabIndex: 0, onClick: () => this.buttonClick(t3), part: B3(t3) }), Rt("div", { class: "toast-button-inner" }, t3.icon && Rt("ion-icon", { "aria-hidden": "true", icon: t3.icon, slot: void 0 === t3.text ? "icon-only" : void 0, class: "toast-button-icon" }), t3.text), "md" === e2 && Rt("ion-ripple-effect", { type: void 0 !== t3.icon && void 0 === t3.text ? "unbounded" : "bounded" })))));
  }
  renderToastMessage(t2, o3 = null) {
    const { customHTMLEnabled: e2, message: i } = this;
    return e2 ? Rt("div", { key: t2, "aria-hidden": o3, class: "toast-message", part: "message", innerHTML: o(i) }) : Rt("div", { key: t2, "aria-hidden": o3, class: "toast-message", part: "message" }, i);
  }
  renderHeader(t2, o3 = null) {
    return Rt("div", { key: t2, class: "toast-header", "aria-hidden": o3, part: "header" }, this.header);
  }
  render() {
    const { layout: o3, el: e2, revealContentToScreenReader: i, header: a3, message: s3 } = this, d4 = this.getButtons(), l4 = d4.filter(((t2) => "start" === t2.side)), p3 = d4.filter(((t2) => "start" !== t2.side)), c5 = v(this), h2 = { "toast-wrapper": true, ["toast-" + this.position]: true, ["toast-layout-" + o3]: true };
    return "stacked" === o3 && l4.length > 0 && p3.length > 0 && a("[ion-toast] - This toast is using start and end buttons with the stacked toast layout. We recommend following the best practice of using either start or end buttons with the stacked toast layout.", e2), Rt(Lt, __spreadProps(__spreadValues({ key: "15d2ff8b689e40bb5cae3e304448dadf91b11b88", tabindex: "-1" }, this.htmlAttributes), { style: { zIndex: "" + (6e4 + this.overlayIndex) }, class: o2(this.color, __spreadProps(__spreadValues({ [c5]: true }, r2(this.cssClass)), { "overlay-hidden": true, "toast-translucent": this.translucent })), onIonToastWillDismiss: this.dispatchCancelHandler }), Rt("div", { key: "d26cc17a59e3d81810e22ee422398f2cc4c7a05c", class: h2, part: "wrapper" }, Rt("div", { key: "f15e1a97f13defcbf96612df4c7ba45999e6244d", class: "toast-container", part: "container" }, this.renderButtons(l4, "start"), void 0 !== this.icon && Rt("ion-icon", { key: "639cacec828f969673071e54dc68284050e9f2fd", class: "toast-icon", part: "icon", icon: this.icon, lazy: false, "aria-hidden": "true" }), Rt("div", { key: "a07e68cf68e4c507e4515de1a4b43dd8fb3541d3", class: "toast-content", part: "content", role: "status", "aria-atomic": "true", "aria-live": "polite" }, !i && void 0 !== a3 && this.renderHeader("oldHeader", "true"), !i && void 0 !== s3 && this.renderToastMessage("oldMessage", "true"), i && void 0 !== a3 && this.renderHeader("header"), i && void 0 !== s3 && this.renderToastMessage("header")), this.renderButtons(p3, "end"))));
  }
  get el() {
    return this;
  }
  static get watchers() {
    return { swipeGesture: [{ swipeGestureChanged: 0 }], isOpen: [{ onIsOpenChange: 0 }], trigger: [{ triggerChanged: 0 }] };
  }
  static get style() {
    return { ios: ":host{--border-width:0;--border-style:none;--border-color:initial;--box-shadow:none;--min-width:auto;--width:auto;--min-height:auto;--height:auto;--max-height:auto;--white-space:normal;top:0;display:block;position:absolute;width:100%;height:100%;outline:none;color:var(--color);font-family:var(--ion-font-family, inherit);contain:strict;z-index:1001;pointer-events:none}:host{inset-inline-start:0}:host(.overlay-hidden){display:none}:host(.ion-color){--button-color:inherit;color:var(--ion-color-contrast)}:host(.ion-color) .toast-button-cancel{color:inherit}:host(.ion-color) .toast-wrapper{background:var(--ion-color-base)}.toast-wrapper{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);pointer-events:auto}.toast-wrapper{inset-inline-start:var(--start);inset-inline-end:var(--end)}.toast-wrapper.toast-top{-webkit-transform:translate3d(0,  -100%,  0);transform:translate3d(0,  -100%,  0);top:0}.toast-wrapper.toast-bottom{-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0);bottom:0}.toast-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;height:inherit;min-height:inherit;max-height:inherit;contain:content}.toast-layout-stacked .toast-container{-ms-flex-wrap:wrap;flex-wrap:wrap}.toast-layout-baseline .toast-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.toast-icon{-webkit-margin-start:16px;margin-inline-start:16px}.toast-content{-ms-flex:1;flex:1;min-width:0}.toast-message{-ms-flex:1;flex:1;white-space:var(--white-space)}.toast-button-group{display:-ms-flexbox;display:flex}.toast-layout-stacked .toast-button-group{-ms-flex-pack:end;justify-content:end;width:100%}.toast-button{border:0;outline:none;color:var(--button-color);z-index:0}.toast-icon,.toast-button-icon{font-size:1.4em}.toast-button-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}@media (any-hover: hover){.toast-button:hover{cursor:pointer}}:host{--background:var(--ion-color-step-50, var(--ion-background-color-step-50, #f2f2f2));--border-radius:14px;--button-color:var(--ion-color-primary, #0054e9);--color:var(--ion-color-step-850, var(--ion-text-color-step-150, #262626));--max-width:700px;--max-height:478px;--start:10px;--end:10px;font-size:clamp(14px, 0.875rem, 43.4px)}.toast-wrapper{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:auto;margin-bottom:auto;display:block;position:absolute;z-index:10}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){:host(.toast-translucent) .toast-wrapper{background:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}:host(.ion-color.toast-translucent) .toast-wrapper{background:rgba(var(--ion-color-base-rgb), 0.8)}}.toast-wrapper.toast-middle{opacity:0.01}.toast-content{-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px;padding-top:15px;padding-bottom:15px}.toast-header{margin-bottom:2px;font-weight:500}.toast-button{-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px;padding-top:10px;padding-bottom:10px;min-height:44px;-webkit-transition:background-color, opacity 100ms linear;transition:background-color, opacity 100ms linear;border:0;background-color:transparent;font-family:var(--ion-font-family);font-size:clamp(17px, 1.0625rem, 21.998px);font-weight:500;overflow:hidden}.toast-button.ion-activated{opacity:0.4}@media (any-hover: hover){.toast-button:hover{opacity:0.6}}", md: ":host{--border-width:0;--border-style:none;--border-color:initial;--box-shadow:none;--min-width:auto;--width:auto;--min-height:auto;--height:auto;--max-height:auto;--white-space:normal;top:0;display:block;position:absolute;width:100%;height:100%;outline:none;color:var(--color);font-family:var(--ion-font-family, inherit);contain:strict;z-index:1001;pointer-events:none}:host{inset-inline-start:0}:host(.overlay-hidden){display:none}:host(.ion-color){--button-color:inherit;color:var(--ion-color-contrast)}:host(.ion-color) .toast-button-cancel{color:inherit}:host(.ion-color) .toast-wrapper{background:var(--ion-color-base)}.toast-wrapper{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);pointer-events:auto}.toast-wrapper{inset-inline-start:var(--start);inset-inline-end:var(--end)}.toast-wrapper.toast-top{-webkit-transform:translate3d(0,  -100%,  0);transform:translate3d(0,  -100%,  0);top:0}.toast-wrapper.toast-bottom{-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0);bottom:0}.toast-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;height:inherit;min-height:inherit;max-height:inherit;contain:content}.toast-layout-stacked .toast-container{-ms-flex-wrap:wrap;flex-wrap:wrap}.toast-layout-baseline .toast-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.toast-icon{-webkit-margin-start:16px;margin-inline-start:16px}.toast-content{-ms-flex:1;flex:1;min-width:0}.toast-message{-ms-flex:1;flex:1;white-space:var(--white-space)}.toast-button-group{display:-ms-flexbox;display:flex}.toast-layout-stacked .toast-button-group{-ms-flex-pack:end;justify-content:end;width:100%}.toast-button{border:0;outline:none;color:var(--button-color);z-index:0}.toast-icon,.toast-button-icon{font-size:1.4em}.toast-button-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}@media (any-hover: hover){.toast-button:hover{cursor:pointer}}:host{--background:var(--ion-color-step-800, var(--ion-background-color-step-800, #333333));--border-radius:4px;--box-shadow:0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);--button-color:var(--ion-color-primary, #0054e9);--color:var(--ion-color-step-50, var(--ion-text-color-step-950, #f2f2f2));--max-width:700px;--start:8px;--end:8px;font-size:0.875rem}.toast-wrapper{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:auto;margin-bottom:auto;display:block;position:absolute;opacity:0.01;z-index:10}.toast-content{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:14px;padding-bottom:14px}.toast-header{margin-bottom:2px;font-weight:500;line-height:1.25rem}.toast-message{line-height:1.25rem}.toast-layout-baseline .toast-button-group-start{-webkit-margin-start:8px;margin-inline-start:8px}.toast-layout-stacked .toast-button-group-start{-webkit-margin-end:8px;margin-inline-end:8px;margin-top:8px}.toast-layout-baseline .toast-button-group-end{-webkit-margin-end:8px;margin-inline-end:8px}.toast-layout-stacked .toast-button-group-end{-webkit-margin-end:8px;margin-inline-end:8px;margin-bottom:8px}.toast-button{-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px;padding-top:10px;padding-bottom:10px;position:relative;background-color:transparent;font-family:var(--ion-font-family);font-size:0.875rem;font-weight:500;letter-spacing:0.84px;text-transform:uppercase;overflow:hidden}.toast-button-cancel{color:var(--ion-color-step-100, var(--ion-text-color-step-900, #e6e6e6))}.toast-button-icon-only{border-radius:50%;-webkit-padding-start:9px;padding-inline-start:9px;-webkit-padding-end:9px;padding-inline-end:9px;padding-top:9px;padding-bottom:9px;width:36px;height:36px}@media (any-hover: hover){.toast-button:hover{background-color:rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.08)}.toast-button-cancel:hover{background-color:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.08)}}" };
  }
}, [33, "ion-toast", { overlayIndex: [2, "overlay-index"], delegate: [16], hasController: [4, "has-controller"], color: [513], enterAnimation: [16], leaveAnimation: [16], cssClass: [1, "css-class"], duration: [2], header: [1], layout: [1], message: [1], keyboardClose: [4, "keyboard-close"], position: [1], positionAnchor: [1, "position-anchor"], buttons: [16], translucent: [4], animated: [4], icon: [1], htmlAttributes: [16], swipeGesture: [1, "swipe-gesture"], isOpen: [4, "is-open"], trigger: [1], revealContentToScreenReader: [32], present: [64], dismiss: [64], onDidDismiss: [64], onWillDismiss: [64] }, void 0, { swipeGesture: [{ swipeGestureChanged: 0 }], isOpen: [{ onIsOpenChange: 0 }], trigger: [{ triggerChanged: 0 }] }]);
var L2 = (t2) => ({ "toast-button": true, "toast-button-icon-only": void 0 !== t2.icon && void 0 === t2.text, ["toast-button-" + t2.role]: void 0 !== t2.role, "ion-focusable": true, "ion-activatable": true });
var B3 = (t2) => H(t2.role) ? "button cancel" : "button";
var R = function() {
  "undefined" != typeof customElements && ["ion-toast", "ion-icon", "ion-ripple-effect"].forEach(((t2) => {
    switch (t2) {
      case "ion-toast":
        customElements.get(oe(t2)) || customElements.define(oe(t2), H2);
        break;
      case "ion-icon":
        customElements.get(oe(t2)) || y();
        break;
      case "ion-ripple-effect":
        customElements.get(oe(t2)) || u2();
    }
  }));
};

// node_modules/@ionic/angular/dist/standalone/providers/toast-controller.js
var ToastController = class _ToastController extends OverlayBaseController {
  constructor() {
    super(B);
    R();
  }
  /** @nocollapse */
  static \u0275fac = function ToastController_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ToastController)();
  };
  /** @nocollapse */
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _ToastController,
    factory: _ToastController.\u0275fac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastController, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();

export {
  LoadingController,
  ToastController
};
//# sourceMappingURL=chunk-LTX2EDXK.js.map
