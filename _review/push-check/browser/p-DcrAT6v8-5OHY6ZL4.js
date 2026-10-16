import {
  e,
  t
} from "./chunk-RKEQPGTQ.js";
import {
  a,
  h,
  l
} from "./chunk-5TO33KAY.js";
import {
  c,
  d as d2,
  n
} from "./chunk-KTDVXKZ4.js";
import "./chunk-5SKCZ2KH.js";
import {
  d,
  o
} from "./chunk-DI3VEDFV.js";
import "./chunk-PAXKX5KU.js";

// node_modules/@ionic/core/components/p-DcrAT6v8.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var l2 = /* @__PURE__ */ new WeakMap();
var u = (o2, t2, n2, i = 0, e2 = false) => {
  l2.has(o2) !== n2 && (n2 ? f(o2, t2, i, e2) : w(o2, t2));
};
var f = (o2, t2, n2, i = false) => {
  const e2 = t2.parentNode, a2 = t2.cloneNode(false);
  a2.classList.add("cloned-input"), a2.tabIndex = -1, i && (a2.disabled = true);
  const r = "rtl" === o2.ownerDocument.dir;
  a2.style.insetInlineStart = r ? e2.offsetWidth - t2.offsetLeft - t2.offsetWidth + "px" : `${t2.offsetLeft}px`, e2.appendChild(a2), l2.set(o2, a2);
  const s = r ? 9999 : -9999;
  o2.style.pointerEvents = "none", t2.style.transform = `translate3d(${s}px,${n2}px,0) scale(0)`;
};
var w = (o2, t2) => {
  const n2 = l2.get(o2);
  n2 && (l2.delete(o2), n2.remove()), o2.style.pointerEvents = "", t2.style.transform = "";
};
var p = "input, textarea, [no-blur], [contenteditable]";
var m = "$ionPaddingTimer";
var h2 = (o2, t2, n2) => {
  const i = o2[m];
  i && clearTimeout(i), t2 > 0 ? o2.style.setProperty("--keyboard-offset", `${t2}px`) : o2[m] = setTimeout((() => {
    o2.style.setProperty("--keyboard-offset", "0px"), n2 && n2();
  }), 120);
};
var y = (o2, t2, n2) => {
  o2.addEventListener("focusout", (() => {
    t2 && h2(t2, 0, n2);
  }), { once: true });
};
var b = 0;
var S = "data-ionic-skip-scroll-assist";
var D = (o2) => {
  if (document.activeElement === o2) return;
  const t2 = o2.getAttribute("id"), n2 = o2.closest(`label[for="${t2}"]`), i = document.activeElement?.closest(`label[for="${t2}"]`);
  null !== n2 && n2 === i || (o2.setAttribute(S, "true"), o2.focus());
};
var M = async (o2, t2, e2, a2, r, s, d3 = false, c2 = 0, l3 = true) => {
  if (!e2 && !a2) return;
  const f2 = ((o3, t3, n2, i) => ((o4, t4, n3, i2) => {
    const e3 = o4.top, a3 = o4.bottom, r2 = t4.top, s2 = r2 + 15, d4 = Math.min(t4.bottom, i2 - n3) - 50 - a3, c3 = s2 - e3, l4 = Math.round(d4 < 0 ? -d4 : c3 > 0 ? -c3 : 0), u2 = Math.min(l4, e3 - r2), f3 = Math.abs(u2);
    return { scrollAmount: u2, scrollDuration: Math.min(400, Math.max(150, f3 / 0.3)), scrollPadding: n3, inputSafeY: 4 - (e3 - s2) };
  })((o3.closest("ion-item,[ion-item]") ?? o3).getBoundingClientRect(), t3.getBoundingClientRect(), n2, i))(o2, e2 || a2, r, c2);
  if (e2 && Math.abs(f2.scrollAmount) < 4) return D(t2), void (s && null !== e2 && (h2(e2, b), y(t2, e2, (() => b = 0))));
  if (u(o2, t2, true, f2.inputSafeY, d3), D(t2), s && e2 && (b = f2.scrollPadding, h2(e2, b)), "undefined" != typeof window) {
    let a3;
    const r2 = async () => {
      void 0 !== a3 && clearTimeout(a3), window.removeEventListener("ionKeyboardDidShow", d4), window.removeEventListener("ionKeyboardDidShow", r2), e2 && await h(e2, 0, f2.scrollAmount, f2.scrollDuration), u(o2, t2, false, f2.inputSafeY), document.activeElement === t2 && D(t2), s && y(t2, e2, (() => b = 0));
    }, d4 = () => {
      window.removeEventListener("ionKeyboardDidShow", d4), window.addEventListener("ionKeyboardDidShow", r2);
    };
    if (e2) {
      const o3 = await a(e2);
      if (l3 && f2.scrollAmount > o3.scrollHeight - o3.clientHeight - o3.scrollTop) return "password" === t2.type ? (f2.scrollAmount += 50, window.addEventListener("ionKeyboardDidShow", d4)) : window.addEventListener("ionKeyboardDidShow", r2), void (a3 = setTimeout(r2, 1e3));
    }
    r2();
  }
};
var x = async (n2, i) => {
  if (void 0 === o) return;
  const l3 = "ios" === i, f2 = "android" === i, w2 = n2.getNumber("keyboardHeight", 290), m2 = n2.getBoolean("scrollAssist", true), h3 = n2.getBoolean("hideCaretOnScroll", l3), y2 = n2.getBoolean("inputBlurring", false), b2 = n2.getBoolean("scrollPadding", true), D2 = Array.from(o.querySelectorAll("ion-input, ion-textarea")), x2 = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), v = await e.getResizeMode(), k = async (t2) => {
    await new Promise(((o2) => n(t2, o2)));
    const n3 = t2.shadowRoot || t2, i2 = n3.querySelector("input") || n3.querySelector("textarea"), c2 = l(t2), l4 = c2 ? null : t2.closest("ion-footer");
    if (i2) {
      if (c2 && h3 && !x2.has(t2)) {
        const o2 = ((o3, t3, n4) => {
          if (!n4 || !t3) return () => {
          };
          const i3 = (n5) => {
            var i4;
            (i4 = t3) === i4.getRootNode().activeElement && u(o3, t3, n5);
          }, e2 = () => u(o3, t3, false), s = () => i3(true), d3 = () => i3(false);
          return d2(n4, "ionScrollStart", s), d2(n4, "ionScrollEnd", d3), t3.addEventListener("blur", e2), () => {
            c(n4, "ionScrollStart", s), c(n4, "ionScrollEnd", d3), t3.removeEventListener("blur", e2);
          };
        })(t2, i2, c2);
        x2.set(t2, o2);
      }
      if ("date" !== i2.type && "datetime-local" !== i2.type && (c2 || l4) && m2 && !K.has(t2)) {
        const n4 = ((t3, n5, i3, e2, a2, r, s, c3 = false) => {
          const l5 = r && (void 0 === s || s.mode === t.None);
          let u2 = false;
          const f3 = void 0 !== d ? d.innerHeight : 0, w3 = (o2) => {
            false !== u2 ? M(t3, n5, i3, e2, o2.detail.keyboardHeight, l5, c3, f3, false) : u2 = true;
          }, p2 = () => {
            u2 = false, d?.removeEventListener("ionKeyboardDidShow", w3), t3.removeEventListener("focusout", p2);
          }, m3 = async () => {
            n5.hasAttribute(S) ? n5.removeAttribute(S) : (M(t3, n5, i3, e2, a2, l5, c3, f3), d?.addEventListener("ionKeyboardDidShow", w3), t3.addEventListener("focusout", p2));
          };
          return t3.addEventListener("focusin", m3), () => {
            t3.removeEventListener("focusin", m3), d?.removeEventListener("ionKeyboardDidShow", w3), t3.removeEventListener("focusout", p2);
          };
        })(t2, i2, c2, l4, w2, b2, v, f2);
        K.set(t2, n4);
      }
    }
  };
  y2 && (() => {
    let o2 = true, t2 = false;
    const n3 = document;
    d2(n3, "ionScrollStart", (() => {
      t2 = true;
    })), n3.addEventListener("focusin", (() => {
      o2 = true;
    }), true), n3.addEventListener("touchend", ((i2) => {
      if (t2) return void (t2 = false);
      const e2 = n3.activeElement;
      if (!e2) return;
      if (e2.matches(p)) return;
      const a2 = i2.target;
      a2 !== e2 && (a2.matches(p) || a2.closest(p) || (o2 = false, setTimeout((() => {
        o2 || e2.blur();
      }), 50)));
    }), false);
  })();
  for (const o2 of D2) k(o2);
  o.addEventListener("ionInputDidLoad", ((o2) => {
    k(o2.detail);
  })), o.addEventListener("ionInputDidUnload", ((o2) => {
    ((o3) => {
      if (h3) {
        const t2 = x2.get(o3);
        t2 && t2(), x2.delete(o3);
      }
      if (m2) {
        const t2 = K.get(o3);
        t2 && t2(), K.delete(o3);
      }
    })(o2.detail);
  }));
};
export {
  x as startInputShims
};
//# sourceMappingURL=p-DcrAT6v8-5OHY6ZL4.js.map
