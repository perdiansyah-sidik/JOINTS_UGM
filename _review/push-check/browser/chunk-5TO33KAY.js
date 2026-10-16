import {
  n
} from "./chunk-KTDVXKZ4.js";

// node_modules/@ionic/core/components/p-HO1CDBeU.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var r = "ion-content";
var e = ".ion-content-scroll-host";
var t = `${r}, ${e}`;
var n2 = (o) => "ION-CONTENT" === o.tagName;
var a = async (s) => n2(s) ? (await new Promise(((r2) => n(s, r2))), s.getScrollElement()) : s;
var l = (o) => o.closest(t);
var c = (o, s) => n2(o) ? o.scrollToTop(s) : Promise.resolve(o.scrollTo({ top: 0, left: 0, behavior: "smooth" }));
var h = (o, s, r2, e2) => n2(o) ? o.scrollByPoint(s, r2, e2) : Promise.resolve(o.scrollBy({ top: r2, left: s, behavior: e2 > 0 ? "smooth" : "auto" }));

export {
  a,
  l,
  c,
  h
};
//# sourceMappingURL=chunk-5TO33KAY.js.map
