import {
  d,
  n
} from "./chunk-5SKCZ2KH.js";
import {
  d as d2
} from "./chunk-DI3VEDFV.js";

// node_modules/@ionic/core/components/p-k92zpBT6.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var n2 = () => n.get("experimentalCloseWatcher", false) && void 0 !== d2 && "CloseWatcher" in d2;
var r = () => {
  document.addEventListener("backbutton", (() => {
  }));
};
var i = () => {
  const e = document;
  let r2 = false;
  const i2 = () => {
    if (r2) return;
    let t = 0, n3 = [];
    const i3 = new CustomEvent("ionBackButton", { bubbles: false, detail: { register(e2, o) {
      n3.push({ priority: e2, handler: o, id: t++ });
    } } });
    e.dispatchEvent(i3);
    const a2 = () => {
      if (n3.length > 0) {
        let t2 = { priority: Number.MIN_SAFE_INTEGER, handler: () => {
        }, id: -1 };
        n3.forEach(((e2) => {
          e2.priority >= t2.priority && (t2 = e2);
        })), r2 = true, n3 = n3.filter(((e2) => e2.id !== t2.id)), (async (t3) => {
          try {
            if (t3?.handler) {
              const e2 = t3.handler(a2);
              null != e2 && await e2;
            }
          } catch (t4) {
            d("[ion-app] - Exception in startHardwareBackButton:", t4);
          }
        })(t2).then((() => r2 = false));
      }
    };
    a2();
  };
  if (n2()) {
    let e2;
    const o = () => {
      e2?.destroy(), e2 = new d2.CloseWatcher(), e2.onclose = () => {
        i2(), o();
      };
    };
    o();
  } else e.addEventListener("backbutton", i2);
};
var a = 100;
var c = 99;

export {
  n2 as n,
  r,
  i,
  a,
  c
};
//# sourceMappingURL=chunk-MQGZ5TGO.js.map
