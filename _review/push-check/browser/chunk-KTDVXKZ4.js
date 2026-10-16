// node_modules/@ionic/core/components/p-Dojwmvde.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var r = (r2) => {
  for (let t = r2; t; t = t.parentElement) {
    const r3 = t.getAttribute("dir")?.toLowerCase();
    if ("rtl" === r3) return true;
    if ("ltr" === r3) return false;
  }
  return "rtl" === document?.dir?.toLowerCase();
};

// node_modules/@ionic/core/components/p-DEvF_E6y.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var n = (a, i) => {
  a.componentOnReady ? a.componentOnReady().then(((a2) => i(a2))) : f((() => i(a)));
};
var d = (a, i, e, r2) => a.addEventListener(i, e, r2);
var c = (a, i, e, r2) => a.removeEventListener(i, e, r2);
var m = (a, i = a) => a.shadowRoot || i;
var f = (a) => "function" == typeof __zone_symbol__requestAnimationFrame ? __zone_symbol__requestAnimationFrame(a) : "function" == typeof requestAnimationFrame ? requestAnimationFrame(a) : setTimeout(a);
var b = (a) => {
  if (a.focus(), a.classList.contains("ion-focusable")) {
    const i = a.closest("ion-app");
    i && i.setFocus([a]);
  }
};
var w = (a, i, e) => Math.max(a, Math.min(i, e));
var y = (a) => {
  if (a) {
    const i = a.changedTouches;
    if (i && i.length > 0) {
      const a2 = i[0];
      return { x: a2.clientX, y: a2.clientY };
    }
    if (void 0 !== a.pageX) return { x: a.pageX, y: a.pageY };
  }
  return { x: 0, y: 0 };
};

export {
  r,
  n,
  d,
  c,
  m,
  f,
  b,
  w,
  y
};
//# sourceMappingURL=chunk-KTDVXKZ4.js.map
