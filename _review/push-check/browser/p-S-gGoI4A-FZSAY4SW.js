import {
  r,
  w
} from "./chunk-KTDVXKZ4.js";
import {
  n
} from "./chunk-XTVSKRH4.js";
import "./chunk-5SKCZ2KH.js";
import "./chunk-DI3VEDFV.js";
import "./chunk-PAXKX5KU.js";

// node_modules/@ionic/core/components/p-S-gGoI4A.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var s = (s2, e, n2, a, c) => {
  const p = s2.ownerDocument.defaultView;
  let i = r(s2);
  const m = (t) => i ? -t.deltaX : t.deltaX;
  return n({ el: s2, gestureName: "goback-swipe", gesturePriority: 101, threshold: 10, canStart: (t) => (i = r(s2), ((t2) => {
    const { startX: o } = t2;
    return i ? o >= p.innerWidth - 50 : o <= 50;
  })(t) && e()), onStart: n2, onMove: (t) => {
    const o = m(t);
    a(o / p.innerWidth);
  }, onEnd: (o) => {
    const r2 = m(o), s3 = p.innerWidth, e2 = r2 / s3, n3 = ((t) => i ? -t.velocityX : t.velocityX)(o), a2 = n3 >= 0 && (n3 > 0.2 || r2 > s3 / 2), f = (a2 ? 1 - e2 : e2) * s3;
    let j = 0;
    if (f > 5) {
      const t = f / Math.abs(n3);
      j = Math.min(t, 540);
    }
    c(a2, e2 <= 0 ? 0.01 : w(0, e2, 0.9999), j);
  } });
};
export {
  s as createSwipeBackGesture
};
//# sourceMappingURL=p-S-gGoI4A-FZSAY4SW.js.map
