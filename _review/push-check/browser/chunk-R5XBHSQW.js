import {
  B,
  r
} from "./chunk-3CPGIZT6.js";

// node_modules/@ionic/core/components/p-CDvyV0r0.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var r2 = (r3, a) => {
  const i = "40px", s = "back" === a.direction, n = a.leavingEl, e = B(a.enteringEl), c = e.querySelector("ion-toolbar"), p = r();
  if (p.addElement(e).fill("both").beforeRemoveClass("ion-page-invisible"), s ? p.duration((a.duration ?? 0) || 200).easing("cubic-bezier(0.47,0,0.745,0.715)") : p.duration((a.duration ?? 0) || 280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("transform", `translateY(${i})`, "translateY(0px)").fromTo("opacity", 0.01, 1), c) {
    const o = r();
    o.addElement(c), p.addAnimation(o);
  }
  if (n && s) {
    p.duration((a.duration ?? 0) || 200).easing("cubic-bezier(0.47,0,0.745,0.715)");
    const r4 = r();
    r4.addElement(B(n)).onFinish(((t) => {
      1 === t && r4.elements.length > 0 && r4.elements[0].style.setProperty("display", "none");
    })).fromTo("transform", "translateY(0px)", `translateY(${i})`).fromTo("opacity", 1, 0), p.addAnimation(r4);
  }
  return p;
};

export {
  r2 as r
};
//# sourceMappingURL=chunk-R5XBHSQW.js.map
