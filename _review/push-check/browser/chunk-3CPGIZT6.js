import {
  d
} from "./chunk-5SKCZ2KH.js";
import {
  d as d2
} from "./chunk-DI3VEDFV.js";

// node_modules/@ionic/core/components/p-CPGp3WWG.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var t;
var i = (e, o, i2) => {
  const n2 = o.startsWith("animation") ? (r3 = e, void 0 === t && (t = void 0 === r3.style.animationName && void 0 !== r3.style.webkitAnimationName ? "-webkit-" : ""), t) : "";
  var r3;
  e.style.setProperty(n2 + o, i2);
};
var n = (e = [], o) => {
  if (void 0 !== o) {
    const t3 = Array.isArray(o) ? o : [o];
    return [...e, ...t3];
  }
  return e;
};
var r = (t3) => {
  let r3, a, s2, d3, f, l2, c2, v, m, u, p, y = [], g = [], A = [], b = false, C = {}, E = [], h = [], S = {}, j = 0, k = false, R = false, w = true, T = false, D = true, F = false;
  const W = t3, Z = [], I = [], K = [], M = [], P = [], q = [], x = [], G = [], z = [], B2 = [], H = [], J = "function" == typeof AnimationEffect || void 0 !== d2 && "function" == typeof d2.AnimationEffect, L = "function" == typeof Element && "function" == typeof Element.prototype.animate && J, N = () => H, O = (e, o) => {
    const t4 = o.findIndex(((o2) => o2.c === e));
    t4 > -1 && o.splice(t4, 1);
  }, Q = (e, o) => ((o?.oneTimeCallback ? I : Z).push({ c: e, o }), p), U = () => {
    L && (H.forEach(((e) => {
      e.cancel();
    })), H.length = 0);
  }, V = () => {
    q.forEach(((e) => {
      e?.parentNode && e.parentNode.removeChild(e);
    })), q.length = 0;
  }, X = () => void 0 !== f ? f : c2 ? c2.getFill() : "both", Y = () => void 0 !== v ? v : void 0 !== l2 ? l2 : c2 ? c2.getDirection() : "normal", $ = () => k ? "linear" : void 0 !== s2 ? s2 : c2 ? c2.getEasing() : "linear", _ = () => R ? 0 : void 0 !== m ? m : void 0 !== a ? a : c2 ? c2.getDuration() : 0, ee = () => void 0 !== d3 ? d3 : c2 ? c2.getIterations() : 1, oe = () => void 0 !== u ? u : void 0 !== r3 ? r3 : c2 ? c2.getDelay() : 0, te = () => {
    0 !== j && (j--, 0 === j && ((() => {
      z.forEach(((e2) => e2())), B2.forEach(((e2) => e2()));
      const e = w ? 1 : 0, o = E, t4 = h, n2 = S;
      M.forEach(((e2) => {
        const r4 = e2.classList;
        o.forEach(((e3) => r4.add(e3))), t4.forEach(((e3) => r4.remove(e3)));
        for (const o2 in n2) n2.hasOwnProperty(o2) && i(e2, o2, n2[o2]);
      })), m = void 0, v = void 0, u = void 0, Z.forEach(((o2) => o2.c(e, p))), I.forEach(((o2) => o2.c(e, p))), I.length = 0, D = true, w && (T = true), w = true;
    })(), c2 && c2.animationFinish()));
  }, ie = () => {
    (() => {
      x.forEach(((e2) => e2())), G.forEach(((e2) => e2()));
      const e = g, o = A, t4 = C;
      M.forEach(((n2) => {
        const r4 = n2.classList;
        e.forEach(((e2) => r4.add(e2))), o.forEach(((e2) => r4.remove(e2)));
        for (const e2 in t4) t4.hasOwnProperty(e2) && i(n2, e2, t4[e2]);
      }));
    })(), y.length > 0 && L && (M.forEach(((e) => {
      const o = e.animate(y, { id: W, delay: oe(), duration: _(), easing: $(), iterations: ee(), fill: X(), direction: Y() });
      o.pause(), H.push(o);
    })), H.length > 0 && (H[0].onfinish = () => {
      te();
    })), b = true;
  }, ne = (e) => {
    e = Math.min(Math.max(e, 0), 0.9999), L && H.forEach(((o) => {
      o.currentTime = o.effect.getComputedTiming().delay + _() * e, o.pause();
    }));
  }, re = (e) => {
    H.forEach(((e2) => {
      e2.effect.updateTiming({ delay: oe(), duration: _(), easing: $(), iterations: ee(), fill: X(), direction: Y() });
    })), void 0 !== e && ne(e);
  }, ae = (e = false, o = true, t4) => (e && P.forEach(((i2) => {
    i2.update(e, o, t4);
  })), L && re(t4), p), se = () => {
    b && (L ? H.forEach(((e) => {
      e.pause();
    })) : M.forEach(((e) => {
      i(e, "animation-play-state", "paused");
    })), F = true);
  }, de = (e) => new Promise(((o) => {
    e?.sync && (R = true, Q((() => R = false), { oneTimeCallback: true })), b || ie(), T && (L && (ne(0), re()), T = false), D && (j = P.length + 1, D = false);
    const t4 = () => {
      O(i2, I), o();
    }, i2 = () => {
      O(t4, K), o();
    };
    Q(i2, { oneTimeCallback: true }), K.push({ c: t4, o: { oneTimeCallback: true } }), P.forEach(((e2) => {
      e2.play();
    })), L ? (H.forEach(((e2) => {
      e2.play();
    })), 0 !== y.length && 0 !== M.length || te()) : te(), F = false;
  })), fe = (e, o) => {
    const t4 = y[0];
    return void 0 === t4 || void 0 !== t4.offset && 0 !== t4.offset ? y = [{ offset: 0, [e]: o }, ...y] : t4[e] = o, p;
  };
  return p = { parentAnimation: c2, elements: M, childAnimations: P, id: W, animationFinish: te, from: fe, to: (e, o) => {
    const t4 = y[y.length - 1];
    return void 0 === t4 || void 0 !== t4.offset && 1 !== t4.offset ? y = [...y, { offset: 1, [e]: o }] : t4[e] = o, p;
  }, fromTo: (e, o, t4) => fe(e, o).to(e, t4), parent: (e) => (c2 = e, p), play: de, pause: () => (P.forEach(((e) => {
    e.pause();
  })), se(), p), stop: () => {
    P.forEach(((e) => {
      e.stop();
    })), b && (U(), b = false), k = false, R = false, D = true, v = void 0, m = void 0, u = void 0, j = 0, T = false, w = true, F = false, K.forEach(((e) => e.c(0, p))), K.length = 0;
  }, destroy: (e) => (P.forEach(((o) => {
    o.destroy(e);
  })), ((e2) => {
    U(), e2 && V();
  })(e), M.length = 0, P.length = 0, y.length = 0, Z.length = 0, I.length = 0, b = false, D = true, p), keyframes: (e) => {
    const o = y !== e;
    return y = e, o && ((e2) => {
      L && N().forEach(((o2) => {
        const t4 = o2.effect;
        if (t4.setKeyframes) t4.setKeyframes(e2);
        else {
          const i2 = new KeyframeEffect(t4.target, e2, t4.getTiming());
          o2.effect = i2;
        }
      }));
    })(y), p;
  }, addAnimation: (e) => {
    if (null != e) if (Array.isArray(e)) for (const o of e) o.parent(p), P.push(o);
    else e.parent(p), P.push(e);
    return p;
  }, addElement: (o) => {
    if (null != o) if (1 === o.nodeType) M.push(o);
    else if (o.length >= 0) for (let e = 0; e < o.length; e++) M.push(o[e]);
    else d("createAnimation - Invalid addElement value.");
    return p;
  }, update: ae, fill: (e) => (f = e, ae(true), p), direction: (e) => (l2 = e, ae(true), p), iterations: (e) => (d3 = e, ae(true), p), duration: (e) => (L || 0 !== e || (e = 1), a = e, ae(true), p), easing: (e) => (s2 = e, ae(true), p), delay: (e) => (r3 = e, ae(true), p), getWebAnimations: N, getKeyframes: () => y, getFill: X, getDirection: Y, getDelay: oe, getIterations: ee, getEasing: $, getDuration: _, afterAddRead: (e) => (z.push(e), p), afterAddWrite: (e) => (B2.push(e), p), afterClearStyles: (e = []) => {
    for (const o of e) S[o] = "";
    return p;
  }, afterStyles: (e = {}) => (S = e, p), afterRemoveClass: (e) => (h = n(h, e), p), afterAddClass: (e) => (E = n(E, e), p), beforeAddRead: (e) => (x.push(e), p), beforeAddWrite: (e) => (G.push(e), p), beforeClearStyles: (e = []) => {
    for (const o of e) C[o] = "";
    return p;
  }, beforeStyles: (e = {}) => (C = e, p), beforeRemoveClass: (e) => (A = n(A, e), p), beforeAddClass: (e) => (g = n(g, e), p), onFinish: Q, isRunning: () => 0 !== j && !F, progressStart: (e = false, o) => (P.forEach(((t4) => {
    t4.progressStart(e, o);
  })), se(), k = e, b || ie(), ae(false, true, o), p), progressStep: (e) => (P.forEach(((o) => {
    o.progressStep(e);
  })), ne(e), p), progressEnd: (e, o, t4) => (k = false, P.forEach(((i2) => {
    i2.progressEnd(e, o, t4);
  })), void 0 !== t4 && (m = t4), T = false, w = true, 0 === e ? (v = "reverse" === Y() ? "normal" : "reverse", "reverse" === v && (w = false), L ? (ae(), ne(1 - o)) : (u = (1 - o) * _() * -1, ae(false, false))) : 1 === e && (L ? (ae(), ne(o)) : (u = o * _() * -1, ae(false, false))), void 0 === e || c2 || de(), p) };
};

// node_modules/@ionic/core/components/p-CEs5NmKW.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var r2 = "ionViewWillEnter";
var t2 = "ionViewDidEnter";
var s = "ionViewWillLeave";
var c = "ionViewDidLeave";
var l = "ionViewWillUnload";
var B = (n2) => {
  if (n2.classList.contains("ion-page")) return n2;
  return n2.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs") || n2;
};

export {
  r,
  r2,
  t2 as t,
  s,
  c,
  l,
  B
};
//# sourceMappingURL=chunk-3CPGIZT6.js.map
