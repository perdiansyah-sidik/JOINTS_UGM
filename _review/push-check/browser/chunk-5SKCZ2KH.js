import {
  __spreadValues
} from "./chunk-PAXKX5KU.js";

// node_modules/@ionic/core/components/p-CthoZqG1.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var t = class {
  constructor() {
    this.m = /* @__PURE__ */ new Map();
  }
  reset(t3) {
    this.m = new Map(Object.entries(t3));
  }
  get(t3, n2) {
    const e = this.m.get(t3);
    return void 0 !== e ? e : n2;
  }
  getBoolean(t3, n2 = false) {
    const e = this.m.get(t3);
    return void 0 === e ? n2 : "string" == typeof e ? "true" === e : !!e;
  }
  getNumber(t3, n2) {
    const e = parseFloat(this.m.get(t3));
    return isNaN(e) ? void 0 !== n2 ? n2 : NaN : e;
  }
  set(t3, n2) {
    this.m.set(t3, n2);
  }
};
var n = new t();
var c;
!(function(t3) {
  t3.OFF = "OFF", t3.ERROR = "ERROR", t3.WARN = "WARN", t3.DEBUG = "DEBUG";
})(c || (c = {}));
var u = { [c.OFF]: 0, [c.ERROR]: 1, [c.WARN]: 2, [c.DEBUG]: 3 };
var f = (t3) => {
  const e = String(n.get("logLevel", c.WARN)).toUpperCase();
  return u[e] >= u[t3];
};
var a = (t3, ...n2) => {
  if (f(c.WARN)) return console.warn(`[Ionic Warning]: ${t3}`, ...n2);
};
var d = (t3, ...n2) => {
  if (f(c.ERROR)) return console.error(`[Ionic Error]: ${t3}`, ...n2);
};
var p = ((t3) => (t3.Undefined = "undefined", t3.Null = "null", t3.String = "string", t3.Number = "number", t3.SpecialNumber = "number", t3.Boolean = "boolean", t3.BigInt = "bigint", t3))(p || {});
var $ = ((t3) => (t3.Array = "array", t3.Date = "date", t3.Map = "map", t3.Object = "object", t3.RegularExpression = "regexp", t3.Set = "set", t3.Channel = "channel", t3.Symbol = "symbol", t3))($ || {});
var b = "type";
var g = "value";
var m = "serialized:";
function y(t3, n2, e) {
  const o = "undefined" != typeof HTMLElement ? HTMLElement.prototype : null;
  for (; t3 && t3 !== o; ) {
    const o2 = Object.getOwnPropertyDescriptor(t3, n2);
    if (o2 && (!e || o2.get)) return o2;
    t3 = Object.getPrototypeOf(t3);
  }
}
var w;
var j = (t3, n2) => {
  var e;
  Object.entries(null != (e = n2.o.t) ? e : {}).map((([e2, [o]]) => {
    if (31 & o || 32 & o) {
      const o2 = t3[e2], s = y(Object.getPrototypeOf(t3), e2, true) || Object.getOwnPropertyDescriptor(t3, e2);
      s && Object.defineProperty(t3, e2, { get() {
        return s.get.call(this);
      }, set(t4) {
        s.set.call(this, t4);
      }, configurable: true, enumerable: true }), n2.l.has(e2) ? t3[e2] = n2.l.get(e2) : void 0 !== o2 && (t3[e2] = o2);
    }
  }));
};
var O = (t3) => {
  if (t3.__stencil__getHostRef) return t3.__stencil__getHostRef();
};
var N = (t3, n2) => n2 in t3;
var S = (t3, n2) => (0, console.error)(t3, n2);
var x = /* @__PURE__ */ new Map();
var E = [];
var k = "s-id";
var C = "sty-id";
var M = "c-id";
var I = "http://www.w3.org/1999/xlink";
var R = "undefined" != typeof window ? window : {};
var A = R.HTMLElement || class {
};
var L = { i: 0, u: "", jmp: (t3) => t3(), raf: (t3) => requestAnimationFrame(t3), ael: (t3, n2, e, o) => t3.addEventListener(n2, e, o), rel: (t3, n2, e, o) => t3.removeEventListener(n2, e, o), ce: (t3, n2) => new CustomEvent(t3, n2) };
var B = (() => {
  var t3;
  let n2 = false;
  try {
    null == (t3 = R.document) || t3.addEventListener("e", null, Object.defineProperty({}, "passive", { get() {
      n2 = true;
    } }));
  } catch (t4) {
  }
  return n2;
})();
var _ = (() => {
  try {
    return !!R.document.adoptedStyleSheets && (new CSSStyleSheet(), "function" == typeof new CSSStyleSheet().replaceSync);
  } catch (t3) {
  }
  return false;
})();
var T = !!_ && (() => !!R.document && Object.getOwnPropertyDescriptor(R.document.adoptedStyleSheets, "length").writable)();
var F = false;
var U = [];
var D = [];
var W = () => {
  var t3;
  return (null == (t3 = R.document) ? void 0 : t3.hidden) ? q(P) : L.raf(P);
};
var V = (t3, n2) => (e) => {
  t3.push(e), F || (F = true, n2 && 4 & L.i ? q(P) : W());
};
var H = (t3) => {
  for (let n2 = 0; n2 < t3.length; n2++) try {
    t3[n2](performance.now());
  } catch (t4) {
    S(t4);
  }
  t3.length = 0;
};
var P = () => {
  H(U), H(D), (F = U.length > 0) && W();
};
var q = (t3) => Promise.resolve(void 0).then(t3);
var z = V(U, false);
var J = V(D, true);
var Y = (t3) => {
  const n2 = new URL(t3, L.u);
  return n2.origin !== R.location.origin ? n2.href : n2.pathname;
};
function Z(t3) {
  const n2 = { mode: "open" };
  n2.delegatesFocus = !!(16 & t3.i);
  const e = this.attachShadow(n2);
  void 0 === w && (w = null), w && (T ? e.adoptedStyleSheets.push(w) : e.adoptedStyleSheets = [...e.adoptedStyleSheets, w]);
}
var K = (t3) => {
  const n2 = xt(t3, "childNodes");
  t3.tagName && t3.tagName.includes("-") && t3["s-cr"] && "SLOT-FB" !== t3.tagName && X(n2, t3.tagName).forEach(((t4) => {
    1 === t4.nodeType && "SLOT-FB" === t4.tagName && (t4.hidden = !!tt(t4, ot(t4), false).length);
  }));
  let e = 0;
  for (e = 0; e < n2.length; e++) {
    const t4 = n2[e];
    1 === t4.nodeType && xt(t4, "childNodes").length && K(t4);
  }
};
var Q = (t3) => {
  const n2 = [];
  for (let e = 0; e < t3.length; e++) {
    const o = t3[e]["s-nr"] || void 0;
    o && o.isConnected && n2.push(o);
  }
  return n2;
};
function X(t3, n2, e) {
  let o, s = 0, l = [];
  for (; s < t3.length; s++) {
    if (o = t3[s], o["s-sr"] && (!n2 || o["s-hn"] === n2) && (void 0 === e || ot(o) === e) && (l.push(o), void 0 !== e)) return l;
    l = [...l, ...X(xt(o, "childNodes"), n2, e)];
  }
  return l;
}
var tt = (t3, n2, e = true) => {
  const o = [];
  (e && t3["s-sr"] || !t3["s-sr"]) && o.push(t3);
  let s = t3;
  for (; s = s.nextSibling; ) ot(s) !== n2 || !e && s["s-sr"] || o.push(s);
  return o;
};
var nt = (t3, n2) => 1 === t3.nodeType ? null === t3.getAttribute("slot") && "" === n2 || t3.getAttribute("slot") === n2 : t3["s-sn"] === n2 || "" === n2;
var et = (t3, n2, e, o) => {
  if (t3["s-ol"] && t3["s-ol"].isConnected) return;
  const s = document.createTextNode("");
  if (s["s-nr"] = t3, !n2["s-cr"] || !n2["s-cr"].parentNode) return;
  const l = n2["s-cr"].parentNode, i = xt(l, e ? "prepend" : "appendChild");
  if (void 0 !== o) {
    s["s-oo"] = o;
    const t4 = xt(l, "childNodes"), n3 = [s];
    t4.forEach(((t5) => {
      t5["s-nr"] && n3.push(t5);
    })), n3.sort(((t5, n4) => !t5["s-oo"] || t5["s-oo"] < (n4["s-oo"] || 0) ? -1 : !n4["s-oo"] || n4["s-oo"] < t5["s-oo"] ? 1 : 0)), n3.forEach(((t5) => i.call(l, t5)));
  } else i.call(l, s);
  t3["s-ol"] = s, t3["s-sh"] = n2["s-hn"];
};
var ot = (t3) => "string" == typeof t3["s-sn"] ? t3["s-sn"] : 1 === t3.nodeType && t3.getAttribute("slot") || void 0;
function st(t3) {
  if (t3.assignedElements || t3.assignedNodes || !t3["s-sr"]) return;
  const n2 = (n3) => (function(t4) {
    const e = [], o = this["s-sn"];
    (null == t4 ? void 0 : t4.flatten) && console.error("\n          Flattening is not supported for Stencil non-shadow slots.\n          You can use `.childNodes` to nested slot fallback content.\n          If you have a particular use case, please open an issue on the Stencil repo.\n        ");
    const s = this["s-cr"].parentElement;
    return (s.__childNodes ? s.childNodes : Q(s.childNodes)).forEach(((t5) => {
      o === ot(t5) && e.push(t5);
    })), n3 ? e.filter(((t5) => 1 === t5.nodeType)) : e;
  }).bind(t3);
  t3.assignedElements = n2(true), t3.assignedNodes = n2(false);
}
function lt(t3) {
  t3.dispatchEvent(new CustomEvent("slotchange", { bubbles: false, cancelable: false, composed: false }));
}
function it(t3, n2) {
  var e;
  if (!(n2 = n2 || (null == (e = t3["s-ol"]) ? void 0 : e.parentElement))) return { slotNode: null, slotName: "" };
  const o = t3["s-sn"] = ot(t3) || "";
  return { slotNode: X(xt(n2, "childNodes"), n2.tagName, o)[0], slotName: o };
}
var rt = (t3) => {
  if (t3.__cloneNode) return;
  const n2 = t3.__cloneNode = t3.cloneNode;
  t3.cloneNode = function(t4) {
    const e = this.shadowRoot && true, o = n2.call(this, !!e && t4);
    if (!e && t4) {
      let t5, n3, e2 = 0;
      const s = ["s-id", "s-cr", "s-lr", "s-rc", "s-sc", "s-p", "s-cn", "s-sr", "s-sn", "s-hn", "s-ol", "s-nr", "s-si", "s-rf", "s-scs"], l = this.__childNodes || this.childNodes;
      for (; e2 < l.length; e2++) t5 = l[e2]["s-nr"], n3 = s.every(((t6) => !l[e2][t6])), t5 && (o.__appendChild ? o.__appendChild(t5.cloneNode(true)) : o.appendChild(t5.cloneNode(true))), n3 && o.appendChild(l[e2].cloneNode(true));
    }
    return o;
  };
};
var ct = (t3) => {
  t3.__appendChild || (t3.__appendChild = t3.appendChild, t3.appendChild = function(t4) {
    const { slotName: n2, slotNode: e } = it(t4, this);
    if (e) {
      et(t4, e);
      const o = tt(e, n2), s = o[o.length - 1], l = xt(s, "parentNode"), i = xt(l, "insertBefore")(t4, s.nextSibling);
      return lt(e), K(this), i;
    }
    return this.__appendChild(t4);
  });
};
var ut = (t3) => {
  t3.__removeChild || (t3.__removeChild = t3.removeChild, t3.removeChild = function(t4) {
    return t4 && void 0 !== t4["s-sn"] && X(this.__childNodes || this.childNodes, this.tagName, t4["s-sn"]) && t4.isConnected ? (t4.remove(), void K(this)) : this.__removeChild(t4);
  });
};
var ft = (t3) => {
  t3.__prepend || (t3.__prepend = t3.prepend, t3.prepend = function(...n2) {
    n2.forEach(((n3) => {
      "string" == typeof n3 && (n3 = this.ownerDocument.createTextNode(n3));
      const e = (n3["s-sn"] = ot(n3)) || "", o = X(xt(this, "childNodes"), this.tagName, e)[0];
      if (o) {
        et(n3, o, true);
        const t4 = tt(o, e)[0], s = xt(t4, "parentNode"), l = xt(s, "insertBefore")(n3, xt(t4, "nextSibling"));
        return lt(o), l;
      }
      return 1 === n3.nodeType && n3.getAttribute("slot") && (n3.hidden = true), t3.__prepend(n3);
    }));
  });
};
var at = (t3) => {
  t3.__append || (t3.__append = t3.append, t3.append = function(...t4) {
    t4.forEach(((t5) => {
      "string" == typeof t5 && (t5 = this.ownerDocument.createTextNode(t5)), this.appendChild(t5);
    }));
  });
};
var dt = (t3) => {
  if (t3.__insertAdjacentHTML) return;
  const n2 = t3.insertAdjacentHTML;
  t3.insertAdjacentHTML = function(t4, e) {
    if ("afterbegin" !== t4 && "beforeend" !== t4) return n2.call(this, t4, e);
    const o = this.ownerDocument.createElement("_");
    let s;
    if (o.innerHTML = e, "afterbegin" === t4) for (; s = o.firstChild; ) this.prepend(s);
    else if ("beforeend" === t4) for (; s = o.firstChild; ) this.append(s);
  };
};
var ht = (t3) => {
  t3.insertAdjacentText = function(t4, n2) {
    this.insertAdjacentHTML(t4, n2);
  };
};
var vt = (t3) => {
  t3.__insertBefore || t3.__insertBefore || (t3.__insertBefore = t3.insertBefore, t3.insertBefore = function(t4, n2) {
    const { slotName: e, slotNode: o } = it(t4, this), s = this.__childNodes ? this.childNodes : Q(this.childNodes);
    if (o) {
      let l2 = false;
      if (s.forEach(((s2) => {
        if (s2 !== n2 && null !== n2) ;
        else {
          if (l2 = true, null === n2 || e !== n2["s-sn"]) return void this.appendChild(t4);
          if (e === n2["s-sn"]) {
            et(t4, o);
            const e2 = xt(n2, "parentNode");
            xt(e2, "insertBefore")(t4, n2), lt(o);
          }
        }
      })), l2) return t4;
    }
    const l = null == n2 ? void 0 : n2.__parentNode;
    return l && !this.isSameNode(l) ? this.appendChild(t4) : this.__insertBefore(t4, n2);
  });
};
var pt = (t3) => {
  if (t3.__insertAdjacentElement) return;
  const n2 = t3.insertAdjacentElement;
  t3.insertAdjacentElement = function(t4, e) {
    return "afterbegin" !== t4 && "beforeend" !== t4 ? n2.call(this, t4, e) : "afterbegin" === t4 ? (this.prepend(e), e) : "beforeend" === t4 ? (this.append(e), e) : e;
  };
};
var $t = (t3) => {
  St("textContent", t3), Object.defineProperty(t3, "textContent", { get: function() {
    let t4 = "";
    return (this.__childNodes ? this.childNodes : Q(this.childNodes)).forEach(((n2) => t4 += n2.textContent || "")), t4;
  }, set: function(t4) {
    (this.__childNodes ? this.childNodes : Q(this.childNodes)).forEach(((t5) => {
      t5["s-ol"] && t5["s-ol"].remove(), t5.remove();
    })), this.insertAdjacentHTML("beforeend", t4);
  } });
};
var bt = (t3) => {
  class n2 extends Array {
    item(t4) {
      return this[t4];
    }
  }
  St("children", t3), Object.defineProperty(t3, "children", { get() {
    return this.childNodes.filter(((t4) => 1 === t4.nodeType));
  } }), Object.defineProperty(t3, "childElementCount", { get() {
    return this.children.length;
  } }), St("firstChild", t3), Object.defineProperty(t3, "firstChild", { get() {
    return this.childNodes[0] || null;
  } }), St("lastChild", t3), Object.defineProperty(t3, "lastChild", { get() {
    return this.childNodes[this.childNodes.length - 1] || null;
  } }), St("childNodes", t3), Object.defineProperty(t3, "childNodes", { get() {
    const t4 = new n2();
    return t4.push(...Q(this.__childNodes)), t4;
  } });
};
var gt = (t3) => {
  t3 && !t3.__nextSibling && (St("nextSibling", t3), Object.defineProperty(t3, "nextSibling", { get: function() {
    var t4;
    const n2 = null == (t4 = this["s-ol"]) ? void 0 : t4.parentNode.childNodes, e = null == n2 ? void 0 : n2.indexOf(this);
    return n2 && e > -1 ? n2[e + 1] || null : this.__nextSibling;
  } }));
};
var mt = (t3) => {
  t3 && !t3.__nextElementSibling && (St("nextElementSibling", t3), Object.defineProperty(t3, "nextElementSibling", { get: function() {
    var t4;
    const n2 = null == (t4 = this["s-ol"]) ? void 0 : t4.parentNode.children, e = null == n2 ? void 0 : n2.indexOf(this);
    return n2 && e > -1 ? n2[e + 1] || null : this.__nextElementSibling;
  } }));
};
var yt = (t3) => {
  t3 && !t3.__previousSibling && (St("previousSibling", t3), Object.defineProperty(t3, "previousSibling", { get: function() {
    var t4;
    const n2 = null == (t4 = this["s-ol"]) ? void 0 : t4.parentNode.childNodes, e = null == n2 ? void 0 : n2.indexOf(this);
    return n2 && e > -1 ? n2[e - 1] || null : this.__previousSibling;
  } }));
};
var wt = (t3) => {
  t3 && !t3.__previousElementSibling && (St("previousElementSibling", t3), Object.defineProperty(t3, "previousElementSibling", { get: function() {
    var t4;
    const n2 = null == (t4 = this["s-ol"]) ? void 0 : t4.parentNode.children, e = null == n2 ? void 0 : n2.indexOf(this);
    return n2 && e > -1 ? n2[e - 1] || null : this.__previousElementSibling;
  } }));
};
var jt = (t3) => {
  t3 && !t3.__parentNode && (St("parentNode", t3), Object.defineProperty(t3, "parentNode", { get: function() {
    var t4;
    return (null == (t4 = this["s-ol"]) ? void 0 : t4.parentNode) || this.__parentNode;
  }, set: function(t4) {
    this.__parentNode = t4;
  } }));
};
var Ot = ["children", "nextElementSibling", "previousElementSibling"];
var Nt = ["childNodes", "firstChild", "lastChild", "nextSibling", "previousSibling", "textContent", "parentNode"];
function St(t3, n2) {
  if (!globalThis.Node || !globalThis.Element) return;
  let e;
  Ot.includes(t3) ? e = Object.getOwnPropertyDescriptor(Element.prototype, t3) : Nt.includes(t3) && (e = Object.getOwnPropertyDescriptor(Node.prototype, t3)), e || (e = Object.getOwnPropertyDescriptor(n2, t3)), e && Object.defineProperty(n2, "__" + t3, e);
}
function xt(t3, n2) {
  if ("__" + n2 in t3) {
    const e = t3["__" + n2];
    return "function" != typeof e ? e : e.bind(t3);
  }
  return "function" != typeof t3[n2] ? t3[n2] : t3[n2].bind(t3);
}
var Et = /* @__PURE__ */ new WeakMap();
var kt = (t3, n2, e) => {
  let o = x.get(t3);
  _ && e ? (o = o || new CSSStyleSheet(), "string" == typeof o ? o = n2 : o.replaceSync(n2)) : o = n2, x.set(t3, o);
};
var Ct = (t3, n2, e) => {
  var o, s, l;
  const i = Mt(n2, e), r = x.get(i);
  if (!R.document) return i;
  if (t3 = 11 === t3.nodeType ? t3 : R.document, r) if ("string" == typeof r) {
    let e2, l2 = Et.get(t3 = t3.head || t3);
    l2 || Et.set(t3, l2 = /* @__PURE__ */ new Set());
    const c2 = t3.querySelector(`[${C}="${i}"]`);
    if (c2) c2.textContent = r;
    else if (!l2.has(i)) {
      e2 = R.document.createElement("style"), e2.textContent = r;
      const c3 = null != (o = L.h) ? o : (function() {
        var t4, n3, e3;
        return null != (e3 = null == (n3 = null == (t4 = R.document.head) ? void 0 : t4.querySelector('meta[name="csp-nonce"]')) ? void 0 : n3.getAttribute("content")) ? e3 : void 0;
      })();
      if (null != c3 && e2.setAttribute("nonce", c3), !(1 & n2.i)) if ("HEAD" === t3.nodeName) {
        const n3 = t3.querySelectorAll("link[rel=preconnect]"), o2 = n3.length > 0 ? n3[n3.length - 1].nextSibling : t3.querySelector("style");
        t3.insertBefore(e2, (null == o2 ? void 0 : o2.parentNode) === t3 ? o2 : null);
      } else if ("host" in t3) if (_) {
        const n3 = new (null != (s = t3.defaultView) ? s : t3.ownerDocument.defaultView).CSSStyleSheet();
        n3.replaceSync(r), T ? t3.adoptedStyleSheets.unshift(n3) : t3.adoptedStyleSheets = [n3, ...t3.adoptedStyleSheets];
      } else {
        const n3 = t3.querySelector("style");
        n3 ? n3.textContent = r + n3.textContent : t3.prepend(e2);
      }
      else t3.append(e2);
      1 & n2.i && t3.insertBefore(e2, null), 4 & n2.i && (e2.textContent += "slot-fb{display:contents}slot-fb[hidden]{display:none}"), l2 && l2.add(i);
    }
  } else {
    let n3 = Et.get(t3);
    if (n3 || Et.set(t3, n3 = /* @__PURE__ */ new Set()), !n3.has(i)) {
      const e2 = null != (l = t3.defaultView) ? l : t3.ownerDocument.defaultView;
      let o2;
      if (r.constructor === e2.CSSStyleSheet) o2 = r;
      else {
        o2 = new e2.CSSStyleSheet();
        for (let t4 = 0; t4 < r.cssRules.length; t4++) o2.insertRule(r.cssRules[t4].cssText, t4);
      }
      if (T ? t3.adoptedStyleSheets.push(o2) : t3.adoptedStyleSheets = [...t3.adoptedStyleSheets, o2], n3.add(i), "host" in t3) {
        const n4 = t3.querySelector(`[${C}="${i}"]`);
        n4 && J((() => n4.remove()));
      }
    }
  }
  return i;
};
var Mt = (t3, n2) => "sc-" + (n2 && 32 & t3.i ? t3.v + "-" + n2 : t3.v);
var It = (t3) => "object" == (t3 = typeof t3) || "function" === t3;
var Rt = (t3, n2, ...e) => {
  let o = null, s = null, l = null, i = false, r = false;
  const c2 = [], u2 = (n3) => {
    for (let e2 = 0; e2 < n3.length; e2++) if (o = n3[e2], Array.isArray(o)) u2(o);
    else if (null != o && "boolean" != typeof o) {
      if (i = "function" != typeof t3 && !It(o)) o = String(o);
      else if ("function" != typeof t3 && void 0 === o.i) {
        S("Invalid vNode child");
        continue;
      }
      i && r ? c2[c2.length - 1].p += o : c2.push(i ? At(null, o) : o), r = i;
    }
  };
  if (u2(e), n2) {
    n2.key && (s = n2.key), n2.name && (l = n2.name);
    {
      const t4 = n2.className || n2.class;
      t4 && (n2.class = "object" != typeof t4 ? t4 : Object.keys(t4).filter(((n3) => t4[n3])).join(" "));
    }
  }
  if ("function" == typeof t3) return t3(null === n2 ? {} : n2, c2, Bt);
  const f2 = At(t3, null);
  return f2.$ = n2, c2.length > 0 && (f2.j = c2), f2.O = s, f2.N = l, f2;
};
var At = (t3, n2) => ({ i: 0, S: t3, p: null != n2 ? n2 : null, k: null, j: null, $: null, O: null, N: null });
var Lt = {};
var Bt = { forEach: (t3, n2) => t3.map(_t).forEach(n2), map: (t3, n2) => t3.map(_t).map(n2).map(Tt) };
var _t = (t3) => ({ vattrs: t3.$, vchildren: t3.j, vkey: t3.O, vname: t3.N, vtag: t3.S, vtext: t3.p });
var Tt = (t3) => {
  if ("function" == typeof t3.vtag) {
    const n3 = __spreadValues({}, t3.vattrs);
    return t3.vkey && (n3.key = t3.vkey), t3.vname && (n3.name = t3.vname), Rt(t3.vtag, n3, ...t3.vchildren || []);
  }
  const n2 = At(t3.vtag, t3.vtext);
  return n2.$ = t3.vattrs, n2.j = t3.vchildren, n2.O = t3.vkey, n2.N = t3.vname, n2;
};
var Ft = (t3, n2, e, o, s, l, i, r = []) => {
  let c2, u2, f2, a2;
  const d2 = s["s-sc"];
  if (1 === l.nodeType) {
    if (c2 = l.getAttribute(M), c2 && (u2 = c2.split("."), u2[0] === i || "0" === u2[0])) {
      f2 = Dt({ i: 0, C: u2[0], M: u2[1], I: u2[2], R: u2[3], S: l.tagName.toLowerCase(), k: l, $: { class: l.className || "" } }), n2.push(f2), l.removeAttribute(M), t3.j || (t3.j = []), d2 && u2[0] === i && (l["s-si"] = d2, f2.$.class += " " + d2);
      const s2 = f2.k.getAttribute("s-sn");
      "string" == typeof s2 && ("slot-fb" === f2.S && (Wt(s2, u2[2], f2, l, t3, n2, e, o, r), d2 && l.classList.add(d2)), f2.k["s-sn"] = s2, f2.k.removeAttribute("s-sn")), void 0 !== f2.R && (t3.j[f2.R] = f2), t3 = f2, o && "0" === f2.I && (o[f2.R] = f2.k);
    }
    if (l.shadowRoot) for (a2 = l.shadowRoot.childNodes.length - 1; a2 >= 0; a2--) Ft(t3, n2, e, o, s, l.shadowRoot.childNodes[a2], i, r);
    const h = l.__childNodes || l.childNodes;
    for (a2 = h.length - 1; a2 >= 0; a2--) Ft(t3, n2, e, o, s, h[a2], i, r);
  } else if (8 === l.nodeType) u2 = l.nodeValue.split("."), (u2[1] === i || "0" === u2[1]) && (c2 = u2[0], f2 = Dt({ C: u2[1], M: u2[2], I: u2[3], R: u2[4] || "0", k: l, $: null, j: null, O: null, N: null, S: null, p: null }), "t" === c2 ? (f2.k = Ht(l, 3), f2.k && 3 === f2.k.nodeType && (f2.p = f2.k.textContent, n2.push(f2), l.remove(), i === f2.C && (t3.j || (t3.j = []), t3.j[f2.R] = f2), o && "0" === f2.I && (o[f2.R] = f2.k))) : "c" === c2 ? (f2.k = Ht(l, 8), f2.k && 8 === f2.k.nodeType && (n2.push(f2), l.remove())) : f2.C === i && ("s" === c2 ? Wt(l["s-sn"] = u2[5] || "", u2[2], f2, l, t3, n2, e, o, r) : "r" === c2 && (o ? l.remove() : (s["s-cr"] = l, l["s-cn"] = true))));
  else if (t3 && "style" === t3.S) {
    const n3 = At(null, l.textContent);
    n3.k = l, n3.R = "0", t3.j = [n3];
  }
  return t3;
};
var Ut = (t3, n2) => {
  if (1 === t3.nodeType) {
    const e = t3[k] || t3.getAttribute(k);
    e && n2.set(e, t3);
    let o = 0;
    if (t3.shadowRoot) for (; o < t3.shadowRoot.childNodes.length; o++) Ut(t3.shadowRoot.childNodes[o], n2);
    const s = t3.__childNodes || t3.childNodes;
    for (o = 0; o < s.length; o++) Ut(s[o], n2);
  } else if (8 === t3.nodeType) {
    const e = t3.nodeValue.split(".");
    "o" === e[0] && (n2.set(e[1] + "." + e[2], t3), t3.nodeValue = "", t3["s-en"] = e[3]);
  }
};
var Dt = (t3) => __spreadValues({ i: 0, C: null, M: null, I: null, R: "0", k: null, $: null, j: null, O: null, N: null, S: null, p: null }, t3);
function Wt(t3, n2, e, o, s, l, i, r, c2) {
  o["s-sr"] = true, e.N = t3 || null, e.S = "slot";
  const u2 = (null == s ? void 0 : s.k) ? s.k["s-id"] || s.k.getAttribute("s-id") : "";
  if (r && R.document) {
    const l2 = e.k = R.document.createElement(e.S);
    e.N && e.k.setAttribute("name", t3), s.k.shadowRoot && u2 && u2 !== e.C ? xt(s.k, "insertBefore")(l2, xt(s.k, "children")[0]) : xt(xt(o, "parentNode"), "insertBefore")(l2, o), Vt(c2, n2, t3, o, e.C), o.remove(), "0" === e.I && (r[e.R] = e.k);
  } else {
    const l2 = e.k, i2 = u2 && u2 !== e.C && s.k.shadowRoot;
    Vt(c2, n2, t3, o, i2 ? u2 : e.C), st(o), i2 && s.k.insertBefore(l2, s.k.children[0]);
  }
  l.push(e), i.push(e), s.j || (s.j = []), s.j[e.R] = e;
}
var Vt = (t3, n2, e, o, s) => {
  var l, i;
  let r = o.nextSibling;
  if (t3[n2] = t3[n2] || [], r && !(null == (l = r.nodeValue) ? void 0 : l.startsWith("s."))) do {
    !r || (r.getAttribute && r.getAttribute("slot") || r["s-sn"]) !== e && ("" !== e || r["s-sn"] || r.getAttribute && r.getAttribute("slot") || 8 !== r.nodeType && 3 !== r.nodeType) || (r["s-sn"] = e, t3[n2].push({ slot: o, node: r, hostId: s })), r = null == r ? void 0 : r.nextSibling;
  } while (r && !(null == (i = r.nodeValue) ? void 0 : i.startsWith("s.")));
};
var Ht = (t3, n2) => {
  let e = t3;
  do {
    e = e.nextSibling;
  } while (e && (e.nodeType !== n2 || !e.nodeValue));
  return e;
};
var qt = (t3) => {
  var n2;
  return null == (n2 = O(t3)) ? void 0 : n2.A;
};
var zt = (t3) => {
  if (!t3) return;
  const n2 = Object.keys(t3);
  if (0 === n2.length) return;
  let e = false;
  for (const o2 of n2) {
    if (e) break;
    for (const n3 of t3[o2]) if ("string" == typeof n3) {
      e = true;
      break;
    }
  }
  if (!e) return t3;
  const o = {};
  for (const e2 of n2) o[e2] = t3[e2].map(((t4) => "string" == typeof t4 ? { [t4]: 0 } : t4));
  return o;
};
var Jt = class t2 {
  static fromLocalValue(n2) {
    const e = n2[b], o = g in n2 ? n2[g] : void 0;
    switch (e) {
      case "string":
      case "boolean":
        return o;
      case "bigint":
        return BigInt(o);
      case "undefined":
        return;
      case "null":
        return null;
      case "number":
        return "NaN" === o ? NaN : "-0" === o ? -0 : "Infinity" === o ? 1 / 0 : "-Infinity" === o ? -1 / 0 : o;
      case "array":
        return o.map(((n4) => t2.fromLocalValue(n4)));
      case "date":
        return new Date(o);
      case "map":
        const n3 = /* @__PURE__ */ new Map();
        for (const [e2, s2] of o) {
          const o2 = "object" == typeof e2 && null !== e2 ? t2.fromLocalValue(e2) : e2, l2 = t2.fromLocalValue(s2);
          n3.set(o2, l2);
        }
        return n3;
      case "object":
        const s = {};
        for (const [n4, e2] of o) s[n4] = t2.fromLocalValue(e2);
        return s;
      case "regexp":
        const { pattern: l, flags: i } = o;
        return new RegExp(l, i);
      case "set":
        const r = /* @__PURE__ */ new Set();
        for (const n4 of o) r.add(t2.fromLocalValue(n4));
        return r;
      case "symbol":
        return Symbol(o);
      default:
        throw new Error(`Unsupported type: ${e}`);
    }
  }
  static fromLocalValueArray(n2) {
    return n2.map(((n3) => t2.fromLocalValue(n3)));
  }
  static isLocalValueObject(t3) {
    if ("object" != typeof t3 || null === t3) return false;
    if (!t3.hasOwnProperty(b)) return false;
    const n2 = t3[b];
    return !!Object.values(__spreadValues(__spreadValues({}, p), $)).includes(n2) && ("null" === n2 || "undefined" === n2 || t3.hasOwnProperty(g));
  }
};
var Yt;
var Gt;
var Zt;
var Kt = (t3, n2) => {
  return "string" == typeof t3 && t3.startsWith(m) ? t3 = "string" == typeof (e = t3) && e.startsWith(m) ? Jt.fromLocalValue(JSON.parse((function(t4) {
    const n3 = atob(t4), e2 = new Uint8Array(n3.length);
    for (let t5 = 0; t5 < n3.length; t5++) e2[t5] = n3.charCodeAt(t5);
    return new TextDecoder().decode(e2);
  })(e.slice(11)))) : e : null == t3 || It(t3) ? t3 : 4 & n2 ? "false" !== t3 && ("" === t3 || !!t3) : 2 & n2 ? "string" == typeof t3 ? parseFloat(t3) : "number" == typeof t3 ? t3 : NaN : 1 & n2 ? String(t3) : t3;
  var e;
};
var Qt = (t3, n2, e) => {
  const o = t3;
  return { emit: (t4) => Xt(o, n2, { bubbles: !!(4 & e), composed: !!(2 & e), cancelable: !!(1 & e), detail: t4 }) };
};
var Xt = (t3, n2, e) => {
  const o = L.ce(n2, e);
  return t3.dispatchEvent(o), o;
};
var tn = (t3, n2, e, o, s, l, i) => {
  if (e === o) return;
  let r = N(t3, n2), c2 = n2.toLowerCase();
  if ("class" === n2) {
    const n3 = t3.classList, s2 = sn(e);
    let l2 = sn(o);
    if ((t3["s-si"] || t3["s-sc"]) && i) {
      const e2 = t3["s-sc"] || t3["s-si"];
      l2.push(e2), s2.forEach(((t4) => {
        t4.startsWith(e2) && l2.push(t4);
      })), l2 = [...new Set(l2)].filter(((t4) => t4)), n3.add(...l2);
    } else n3.remove(...s2.filter(((t4) => t4 && !l2.includes(t4)))), n3.add(...l2.filter(((t4) => t4 && !s2.includes(t4))));
  } else if ("style" === n2) {
    for (const n3 in e) o && null != o[n3] || (n3.includes("-") ? t3.style.removeProperty(n3) : t3.style[n3] = "");
    for (const n3 in o) e && o[n3] === e[n3] || (n3.includes("-") ? t3.style.setProperty(n3, o[n3]) : t3.style[n3] = o[n3]);
  } else if ("key" === n2) ;
  else if ("ref" === n2) o && En(o, t3);
  else if (t3.__lookupSetter__(n2) || "o" !== n2[0] || "n" !== n2[1]) {
    if ("a" === n2[0] && n2.startsWith("attr:")) {
      const e2 = n2.slice(5);
      let s2;
      {
        const n3 = O(t3);
        if (n3 && n3.o && n3.o.t) {
          const t4 = n3.o.t[e2];
          t4 && t4[1] && (s2 = t4[1]);
        }
      }
      return s2 || (s2 = e2.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()), void (null == o || false === o ? false === o && "" !== t3.getAttribute(s2) || t3.removeAttribute(s2) : t3.setAttribute(s2, true === o ? "" : o));
    }
    if ("p" === n2[0] && n2.startsWith("prop:")) {
      const e2 = n2.slice(5);
      try {
        t3[e2] = o;
      } catch (t4) {
      }
      return;
    }
    {
      const i2 = It(o);
      if ((r || i2 && null !== o) && !s) try {
        if (t3.tagName.includes("-")) t3[n2] !== o && (t3[n2] = o);
        else {
          const s2 = null == o ? "" : o;
          "list" === n2 ? r = false : null != e && t3[n2] === s2 || ("function" == typeof t3.__lookupSetter__(n2) ? t3[n2] = s2 : t3.setAttribute(n2, s2));
        }
      } catch (t4) {
      }
      let u2 = false;
      c2 !== (c2 = c2.replace(/^xlink\:?/, "")) && (n2 = c2, u2 = true), null == o || false === o ? (false !== o || "" === t3.getAttribute(n2) || 4 & l && !en(n2)) && (u2 ? t3.removeAttributeNS(I, n2) : t3.removeAttribute(n2)) : (!r || 4 & l || s) && !i2 && 1 === t3.nodeType && (o = true === o ? "" : o, u2 ? t3.setAttributeNS(I, n2, o) : t3.setAttribute(n2, o));
    }
  } else if (n2 = "-" === n2[2] ? n2.slice(3) : N(R, c2) ? c2.slice(2) : c2[2] + n2.slice(3), e || o) {
    const s2 = n2.endsWith(ln);
    n2 = n2.replace(rn, ""), e && L.rel(t3, n2, e, s2), o && L.ael(t3, n2, o, s2);
  }
};
var nn = /* @__PURE__ */ new Set(["draggable", "contenteditable", "spellcheck"]);
var en = (t3) => nn.has(t3) || t3.startsWith("aria-");
var on = /\s/;
var sn = (t3) => ("object" == typeof t3 && t3 && "baseVal" in t3 && (t3 = t3.baseVal), t3 && "string" == typeof t3 ? t3.split(on) : []);
var ln = "Capture";
var rn = new RegExp(ln + "$");
var cn = (t3, n2, e, o) => {
  const s = 11 === n2.k.nodeType && n2.k.host ? n2.k.host : n2.k, l = t3 && t3.$ || {}, i = n2.$ || {};
  for (const t4 of un(Object.keys(l))) t4 in i || tn(s, t4, l[t4], void 0, e, n2.i, o);
  for (const t4 of un(Object.keys(i))) tn(s, t4, l[t4], i[t4], e, n2.i, o);
};
function un(t3) {
  return t3.includes("ref") ? [...t3.filter(((t4) => "ref" !== t4)), "ref"] : t3;
}
var fn = false;
var an = false;
var dn = false;
var hn = false;
var vn = [];
var pn = [];
var $n = (t3, n2, e) => {
  var o;
  const s = n2.j[e];
  let l, i, r, c2 = 0;
  if (fn || (dn = true, "slot" === s.S && (s.i |= s.j ? 2 : 1)), null != s.p) l = s.k = R.document.createTextNode(s.p);
  else if (1 & s.i) l = s.k = R.document.createTextNode(""), cn(null, s, hn);
  else {
    if (hn || (hn = "svg" === s.S), !R.document) throw new Error("You are trying to render a Stencil component in an environment that doesn't support the DOM.");
    if (l = s.k = R.document.createElementNS(hn ? "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", !fn && 2 & s.i ? "slot-fb" : s.S), hn && "foreignObject" === s.S && (hn = false), cn(null, s, hn), null != (u2 = Yt) && void 0 !== u2 && l["s-si"] !== Yt && l.classList.add(l["s-si"] = Yt), s.j) {
      const n3 = "template" === s.S ? l.content : l;
      for (c2 = 0; c2 < s.j.length; ++c2) i = $n(t3, s, c2), i && n3.appendChild(i);
    }
    "svg" === s.S ? hn = false : "foreignObject" === l.tagName && (hn = true);
  }
  var u2;
  return l["s-hn"] = Zt, 3 & s.i && (l["s-sr"] = true, l["s-cr"] = Gt, l["s-sn"] = s.N || "", l["s-rf"] = null == (o = s.$) ? void 0 : o.ref, st(l), r = t3 && t3.j && t3.j[e], r && r.S === s.S && t3.k && bn(t3.k), Cn(Gt, l, n2.k, null == t3 ? void 0 : t3.k)), l;
};
var bn = (t3) => {
  L.i |= 1;
  const n2 = t3.closest(Zt.toLowerCase());
  if (null != n2) {
    const e = Array.from(n2.__childNodes || n2.childNodes).find(((t4) => t4["s-cr"])), o = Array.from(t3.__childNodes || t3.childNodes);
    for (const t4 of e ? o.reverse() : o) null != t4["s-sh"] && (kn(n2, t4, null != e ? e : null), t4["s-sh"] = void 0, dn = true);
  }
  L.i &= -2;
};
var gn = (t3, n2) => {
  L.i |= 1;
  const e = Array.from(t3.__childNodes || t3.childNodes);
  if (t3["s-sr"]) {
    let n3 = t3;
    for (; n3 = n3.nextSibling; ) n3 && n3["s-sn"] === t3["s-sn"] && n3["s-sh"] === Zt && e.push(n3);
  }
  for (let t4 = e.length - 1; t4 >= 0; t4--) {
    const o = e[t4];
    o["s-hn"] !== Zt && o["s-ol"] && (kn(jn(o).parentNode, o, jn(o)), o["s-ol"].remove(), o["s-ol"] = void 0, o["s-sh"] = void 0, dn = true), n2 && gn(o, n2);
  }
  L.i &= -2;
};
var mn = (t3, n2, e, o, s, l) => {
  let i, r = t3["s-cr"] && t3["s-cr"].parentNode || t3;
  for (r.shadowRoot && r.tagName === Zt && (r = r.shadowRoot), "template" === e.S && (r = r.content); s <= l; ++s) o[s] && (i = $n(null, e, s), i && (o[s].k = i, kn(r, i, jn(n2))));
};
var yn = (t3, n2, e) => {
  for (let o = n2; o <= e; ++o) {
    const n3 = t3[o];
    if (n3) {
      const t4 = n3.k;
      xn(n3), t4 && (an = true, t4["s-ol"] ? t4["s-ol"].remove() : gn(t4, true), t4.remove());
    }
  }
};
var wn = (t3, n2, e = false) => t3.S === n2.S && ("slot" === t3.S ? t3.N === n2.N : e ? (e && !t3.O && n2.O && (t3.O = n2.O), true) : t3.O === n2.O);
var jn = (t3) => t3 && t3["s-ol"] || t3;
var On = (t3, n2, e = false) => {
  const o = n2.k = t3.k, s = t3.j, l = n2.j, i = n2.S, r = n2.p;
  let c2;
  null == r ? (hn = "svg" === i || "foreignObject" !== i && hn, "slot" !== i || fn || t3.N !== n2.N && (n2.k["s-sn"] = n2.N || "", bn(n2.k.parentElement)), cn(t3, n2, hn, e), null !== s && null !== l ? ((t4, n3, e2, o2, s2 = false) => {
    let l2, i2, r2 = 0, c3 = 0, u2 = 0, f2 = 0, a2 = n3.length - 1, d2 = n3[0], h = n3[a2], v = o2.length - 1, p2 = o2[0], $2 = o2[v];
    const b2 = "template" === e2.S ? t4.content : t4;
    for (; r2 <= a2 && c3 <= v; ) if (null == d2) d2 = n3[++r2];
    else if (null == h) h = n3[--a2];
    else if (null == p2) p2 = o2[++c3];
    else if (null == $2) $2 = o2[--v];
    else if (wn(d2, p2, s2)) On(d2, p2, s2), d2 = n3[++r2], p2 = o2[++c3];
    else if (wn(h, $2, s2)) On(h, $2, s2), h = n3[--a2], $2 = o2[--v];
    else if (wn(d2, $2, s2)) "slot" !== d2.S && "slot" !== $2.S || gn(d2.k.parentNode, false), On(d2, $2, s2), kn(b2, d2.k, h.k.nextSibling), d2 = n3[++r2], $2 = o2[--v];
    else if (wn(h, p2, s2)) "slot" !== d2.S && "slot" !== $2.S || gn(h.k.parentNode, false), On(h, p2, s2), kn(b2, h.k, d2.k), h = n3[--a2], p2 = o2[++c3];
    else {
      for (u2 = -1, f2 = r2; f2 <= a2; ++f2) if (n3[f2] && null !== n3[f2].O && n3[f2].O === p2.O) {
        u2 = f2;
        break;
      }
      u2 >= 0 ? (i2 = n3[u2], i2.S !== p2.S ? l2 = $n(n3 && n3[c3], e2, c3) : (On(i2, p2, s2), n3[u2] = void 0, l2 = i2.k), p2 = o2[++c3]) : (l2 = $n(n3 && n3[c3], e2, c3), p2 = o2[++c3]), l2 && kn(jn(d2.k).parentNode, l2, jn(d2.k));
    }
    r2 > a2 ? mn(t4, null == o2[v + 1] ? null : o2[v + 1].k, e2, o2, c3, v) : c3 > v && yn(n3, r2, a2);
  })(o, s, n2, l, e) : null !== l ? (null !== t3.p && (o.textContent = ""), mn(o, null, n2, l, 0, l.length - 1)) : e || null === s ? e && null !== s && null === l && (n2.j = s) : yn(s, 0, s.length - 1), hn && "svg" === i && (hn = false)) : (c2 = o["s-cr"]) ? c2.parentNode.textContent = r : t3.p !== r && (o.data = r);
};
var Nn = [];
var Sn = (t3) => {
  let n2, e, o;
  const s = t3.__childNodes || t3.childNodes;
  for (const t4 of s) {
    if (t4["s-sr"] && (n2 = t4["s-cr"]) && n2.parentNode) {
      e = n2.parentNode.__childNodes || n2.parentNode.childNodes;
      const s2 = t4["s-sn"];
      for (o = e.length - 1; o >= 0; o--) if (n2 = e[o], !n2["s-cn"] && !n2["s-nr"] && n2["s-hn"] !== t4["s-hn"] && (!n2["s-sh"] || n2["s-sh"] !== t4["s-hn"] || "" !== s2 && ot(n2) === s2)) if (nt(n2, s2)) {
        let e2 = Nn.find(((t5) => t5.L === n2));
        an = true, n2["s-sn"] = n2["s-sn"] || s2, e2 ? (e2.L["s-sh"] = t4["s-hn"], e2.B = t4) : (n2["s-sh"] = t4["s-hn"], Nn.push({ B: t4, L: n2 })), n2["s-sr"] && Nn.map(((t5) => {
          nt(t5.L, n2["s-sn"]) && (e2 = Nn.find(((t6) => t6.L === n2)), e2 && !t5.B && (t5.B = e2.B));
        }));
      } else Nn.some(((t5) => t5.L === n2)) || Nn.push({ L: n2 });
    }
    1 === t4.nodeType && Sn(t4);
  }
};
var xn = (t3) => {
  t3.$ && t3.$.ref && vn.push((() => t3.$.ref(null))), t3.j && t3.j.map(xn);
};
var En = (t3, n2) => {
  pn.push((() => t3(n2)));
};
var kn = (t3, n2, e, o) => {
  if ("string" == typeof n2["s-sn"] && n2["s-sr"] && n2["s-cr"]) Cn(n2["s-cr"], n2, t3, n2.parentElement);
  else if ("string" == typeof n2["s-sn"]) {
    11 !== t3.getRootNode().nodeType && jt(n2), t3.insertBefore(n2, e);
    const { slotNode: s } = it(n2);
    return s && !o && lt(s), n2;
  }
  return (null == t3 ? void 0 : t3.__insertBefore) ? t3.__insertBefore(n2, e) : null == t3 ? void 0 : t3.insertBefore(n2, e);
};
function Cn(t3, n2, e, o) {
  var s, l;
  let i;
  if (t3 && "string" == typeof n2["s-sn"] && n2["s-sr"] && t3.parentNode && t3.parentNode["s-sc"] && (i = n2["s-si"] || t3.parentNode["s-sc"])) {
    const t4 = n2["s-sn"], r = n2["s-hn"];
    if (null == (s = e.classList) || s.add(i + "-s"), o && (null == (l = o.classList) ? void 0 : l.contains(i + "-s"))) {
      let n3 = (o.__childNodes || o.childNodes)[0], e2 = false;
      for (; n3; ) {
        if (n3["s-sn"] !== t4 && n3["s-hn"] === r && n3["s-sr"]) {
          e2 = true;
          break;
        }
        n3 = n3.nextSibling;
      }
      e2 || o.classList.remove(i + "-s");
    }
  }
}
var Mn = (t3, n2, e = false) => {
  var o, s, l, i, r;
  const c2 = t3.$hostElement$, u2 = t3.o, f2 = t3._ || At(null, null);
  var a2;
  const d2 = (a2 = n2) && a2.S === Lt ? n2 : Rt(null, null, n2);
  if (Zt = c2.tagName, u2.T && (d2.$ = d2.$ || {}, u2.T.forEach((([t4, n3]) => {
    d2.$[n3] = c2[t4];
  }))), e && d2.$) for (const t4 of Object.keys(d2.$)) c2.hasAttribute(t4) && !["key", "ref", "style", "class"].includes(t4) && (d2.$[t4] = c2[t4]);
  if (d2.S = null, d2.i |= 4, t3._ = d2, d2.k = f2.k = c2.shadowRoot || c2, Yt = c2["s-sc"], fn = !(!(1 & u2.i) || 128 & u2.i), Gt = c2["s-cr"], an = false, On(f2, d2, e), L.i |= 1, dn) {
    Sn(d2.k);
    for (const t4 of Nn) {
      const n3 = t4.L;
      if (!n3["s-ol"] && R.document) {
        const t5 = R.document.createTextNode("");
        t5["s-nr"] = n3, kn(n3.parentNode, n3["s-ol"] = t5, n3, e);
      }
    }
    for (const t4 of Nn) {
      const n3 = t4.L, r2 = t4.B;
      if (1 === n3.nodeType && e && (n3["s-ih"] = null != (o = n3.hidden) && o), r2) {
        const t5 = r2.parentNode;
        let o2 = r2.nextSibling;
        if (o2 && 1 === o2.nodeType) {
          let e2 = null == (s = n3["s-ol"]) ? void 0 : s.previousSibling;
          for (; e2; ) {
            let s2 = null != (l = e2["s-nr"]) ? l : null;
            if (s2 && s2["s-sn"] === n3["s-sn"] && t5 === (s2.__parentNode || s2.parentNode)) {
              for (s2 = s2.nextSibling; s2 === n3 || (null == s2 ? void 0 : s2["s-sr"]); ) s2 = null == s2 ? void 0 : s2.nextSibling;
              if (!s2 || !s2["s-nr"]) {
                o2 = s2;
                break;
              }
            }
            e2 = e2.previousSibling;
          }
        }
        if ((!o2 && t5 !== (n3.__parentNode || n3.parentNode) || (n3.__nextSibling || n3.nextSibling) !== o2) && n3 !== o2) {
          if (kn(t5, n3, o2, e), 8 === n3.nodeType && n3.nodeValue.startsWith("s-nt-")) {
            const t6 = R.document.createTextNode(n3.nodeValue.replace(/^s-nt-/, ""));
            t6["s-hn"] = n3["s-hn"], t6["s-sn"] = n3["s-sn"], t6["s-sh"] = n3["s-sh"], t6["s-sr"] = n3["s-sr"], t6["s-ol"] = n3["s-ol"], t6["s-ol"]["s-nr"] = t6, kn(n3.parentNode, t6, n3, e), n3.parentNode.removeChild(n3);
          }
          1 === n3.nodeType && "SLOT-FB" !== n3.tagName && (n3.hidden = null != (i = n3["s-ih"]) && i);
        }
        n3 && "function" == typeof r2["s-rf"] && r2["s-rf"](r2);
      } else 1 === n3.nodeType && (n3.hidden = true);
    }
  }
  if (an && K(d2.k), L.i &= -2, Nn.length = 0, !fn && !(1 & u2.i) && c2["s-cr"]) {
    const t4 = d2.k.__childNodes || d2.k.childNodes;
    for (const n3 of t4) if (n3["s-hn"] !== Zt && !n3["s-sh"]) {
      if (e && null == n3["s-ih"] && (n3["s-ih"] = null != (r = n3.hidden) && r), 1 === n3.nodeType) n3.hidden = true;
      else if (3 === n3.nodeType && n3.nodeValue.trim()) {
        const t5 = R.document.createComment("s-nt-" + n3.nodeValue);
        t5["s-sn"] = n3["s-sn"], kn(n3.parentNode, t5, n3, e), n3.parentNode.removeChild(n3);
      }
    }
  }
  Gt = void 0, vn.forEach(((t4) => t4())), vn.length = 0, pn.forEach(((t4) => t4())), pn.length = 0;
};
var In = (t3, n2) => {
  if (n2 && !t3.F && n2["s-p"]) {
    const e = n2["s-p"].push(new Promise(((o) => t3.F = () => {
      n2["s-p"].splice(e - 1, 1), o();
    })));
  }
};
var Rn = (t3, n2) => {
  if (t3.i |= 16, 4 & t3.i) return void (t3.i |= 512);
  In(t3, t3.U);
  const e = () => An(t3, n2);
  if (!n2) return J(e);
  queueMicrotask((() => {
    e();
  }));
};
var An = (t3, n2) => {
  const e = t3.$hostElement$, o = e;
  if (!o) throw new Error(`Can't render component <${e.tagName.toLowerCase()} /> with invalid Stencil runtime! Make sure this imported component is compiled with a \`externalRuntime: true\` flag. For more information, please refer to https://stenciljs.com/docs/custom-elements#externalruntime`);
  let s;
  return s = Wn(o, n2 ? "componentWillLoad" : "componentWillUpdate", void 0, e), s = Ln(s, (() => Wn(o, "componentWillRender", void 0, e))), Ln(s, (() => _n(t3, o, n2)));
};
var Ln = (t3, n2) => Bn(t3) ? t3.then(n2).catch(((t4) => {
  console.error(t4), n2();
})) : n2();
var Bn = (t3) => t3 instanceof Promise || t3 && t3.then && "function" == typeof t3.then;
var _n = async (t3, n2, e) => {
  var o;
  const s = t3.$hostElement$, l = s["s-rc"];
  e && ((t4) => {
    const n3 = t4.o, e2 = t4.$hostElement$, o2 = n3.i, s2 = Ct(e2.shadowRoot ? e2.shadowRoot : e2.getRootNode(), n3, t4.A);
    10 & o2 && (e2["s-sc"] = s2, e2.classList.add(s2 + "-h"));
  })(t3);
  Tn(t3, n2, s, e), l && (l.map(((t4) => t4())), s["s-rc"] = void 0);
  {
    const n3 = null != (o = s["s-p"]) ? o : [], e2 = () => Fn(t3);
    0 === n3.length ? e2() : (Promise.all(n3).then(e2).catch(e2), t3.i |= 4, n3.length = 0);
  }
};
var Tn = (t3, n2, e, o) => {
  try {
    n2 = n2.render && n2.render(), t3.i &= -17, t3.i |= 2, Mn(t3, n2, o);
  } catch (n3) {
    S(n3, t3.$hostElement$);
  }
  return null;
};
var Fn = (t3) => {
  const n2 = t3.$hostElement$, e = n2, o = t3.U;
  Wn(e, "componentDidRender", void 0, n2), 64 & t3.i ? Wn(e, "componentDidUpdate", void 0, n2) : (t3.i |= 64, Vn(n2), Wn(e, "componentDidLoad", void 0, n2), t3.D(n2), o || Dn()), t3.F && (t3.F(), t3.F = void 0), 512 & t3.i && q((() => Rn(t3, false))), t3.i &= -517;
};
var Dn = () => {
  var t3;
  q((() => Xt(R, "appload", { detail: { namespace: "ionic" } }))), (null == (t3 = L.W) ? void 0 : t3.size) && L.W.clear();
};
var Wn = (t3, n2, e, o) => {
  if (t3 && t3[n2]) try {
    return t3[n2](e);
  } catch (t4) {
    S(t4, o);
  }
};
var Vn = (t3) => t3.classList.add("hydrated");
var Hn = (t3, n2, e, o) => {
  const s = O(t3);
  if (!s) return;
  const l = t3, i = s.l.get(n2), r = s.i, c2 = l;
  e = Kt(e, o.t[n2][0]);
  const u2 = Number.isNaN(i) && Number.isNaN(e);
  if (e !== i && !u2) {
    if (s.l.set(n2, e), o.V) {
      const t4 = o.V[n2];
      t4 && t4.map(((t5) => {
        try {
          const [[o2, l2]] = Object.entries(t5);
          (128 & r || 1 & l2) && (c2 ? c2[o2](e, i, n2) : s.H.push((() => {
            s.P[o2](e, i, n2);
          })));
        } catch (t6) {
          S(t6, l);
        }
      }));
    }
    if (2 & r) {
      if (c2.componentShouldUpdate && false === c2.componentShouldUpdate(e, i, n2) && !(16 & r)) return;
      16 & r || Rn(s, false);
    }
  }
};
var Pn = (t3, n2) => {
  var e, o;
  const s = t3.prototype;
  {
    t3.watchers && !n2.V && (n2.V = zt(t3.watchers)), t3.deserializers && !n2.q && (n2.q = t3.deserializers), t3.serializers && !n2.J && (n2.J = t3.serializers);
    const l = Object.entries(null != (e = n2.t) ? e : {});
    l.map((([t4, [e2]]) => {
      if (31 & e2 || 32 & e2) {
        const { get: o2, set: l2 } = y(s, t4) || {};
        o2 && (n2.t[t4][0] |= 2048), l2 && (n2.t[t4][0] |= 4096), Object.defineProperty(s, t4, { get() {
          return o2 ? o2.apply(this) : (n3 = t4, O(this).l.get(n3));
          var n3;
        }, configurable: true, enumerable: true }), Object.defineProperty(s, t4, { set(o3) {
          const s2 = O(this);
          if (s2) {
            if (l2) return void 0 === (32 & e2 ? this[t4] : s2.$hostElement$[t4]) && s2.l.get(t4) && (o3 = s2.l.get(t4)), l2.apply(this, [Kt(o3, e2)]), void Hn(this, t4, o3 = 32 & e2 ? this[t4] : s2.$hostElement$[t4], n2);
            Hn(this, t4, o3, n2);
          }
        } });
      }
    }));
    {
      const e2 = /* @__PURE__ */ new Map();
      s.attributeChangedCallback = function(t4, o2, i) {
        L.jmp((() => {
          var r;
          const c2 = e2.get(t4), u2 = O(this);
          if (this.hasOwnProperty(c2), s.hasOwnProperty(c2) && "number" == typeof this[c2] && this[c2] == i) return;
          if (null == c2) {
            const e3 = null == u2 ? void 0 : u2.i;
            if (u2 && e3 && !(8 & e3) && i !== o2) {
              const s2 = this, l2 = null == (r = n2.V) ? void 0 : r[t4];
              null == l2 || l2.forEach(((n3) => {
                const [[l3, r2]] = Object.entries(n3);
                null != s2[l3] && (128 & e3 || 1 & r2) && s2[l3].call(s2, i, o2, t4);
              }));
            }
            return;
          }
          const f2 = l.find((([t5]) => t5 === c2)), a2 = f2 ? f2[1][0] : 0, d2 = 4 & a2;
          if (512 & a2 && 8 & a2 && !It(this[c2]) && (null == (h = this[c2]) || false === h ? null : true === h ? "" : String(h)) === i) return;
          var h;
          const v = d2 && null === i && void 0 === this[c2];
          d2 && (i = null !== i && "false" !== i);
          const p2 = Object.getOwnPropertyDescriptor(s, c2);
          v || i == this[c2] || p2.get && !p2.set || (this[c2] = i);
        }));
      }, t3.observedAttributes = Array.from(/* @__PURE__ */ new Set([...Object.keys(null != (o = n2.V) ? o : {}), ...l.filter((([t4, n3]) => 31 & n3[0])).map((([t4, o2]) => {
        var s2;
        const l2 = o2[1] || t4;
        return e2.set(l2, t4), 512 & o2[0] && (null == (s2 = n2.T) || s2.push([t4, l2])), l2;
      }))]));
    }
  }
  return t3;
};
var qn = async (t3, n2, e) => {
  let o;
  try {
    if (!(32 & n2.i) && (n2.i |= 32, n2.i &= -1025, o = t3.constructor, customElements.whenDefined(t3.localName).then((() => n2.i |= 128)), o && o.style)) {
      let s2;
      "string" == typeof o.style ? s2 = o.style : "string" != typeof o.style && (n2.A = ((t4) => E.map(((n3) => n3(t4))).find(((t5) => !!t5)))(t3), n2.A && (s2 = o.style[n2.A]));
      const l2 = Mt(e, n2.A);
      if (!x.has(l2)) {
        const t4 = () => {
        };
        kt(l2, s2, !!(1 & e.i)), t4();
      }
    }
    const s = n2.U, l = () => Rn(n2, true);
    s && s["s-rc"] ? s["s-rc"].push(l) : l();
  } catch (e2) {
    S(e2, t3), n2.F && (n2.F(), n2.F = void 0), !n2.D || 1024 & n2.i || n2.D(t3);
  }
};
var zn = (t3) => {
  if (!R.document) return;
  const n2 = t3["s-cr"] = R.document.createComment("");
  n2["s-cn"] = true, kn(t3, n2, t3.firstChild);
};
var Jn = (t3, n2) => {
  const e = { i: n2[0], v: n2[1] };
  try {
    e.t = n2[2], e.Y = n2[3], e.V = zt(t3.V), e.q = t3.q, e.J = t3.J, e.T = [], !(1 & e.i) && 256 & e.i ? (rt(o = t3.prototype), ct(o), at(o), ft(o), pt(o), dt(o), ht(o), vt(o), $t(o), bt(o), ut(o)) : rt(t3.prototype), (() => {
      if (!R.document) return;
      const t4 = R.document.querySelectorAll(`[${C}]`);
      let n3 = 0;
      for (; n3 < t4.length; n3++) kt(t4[n3].getAttribute(C), t4[n3].innerHTML.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g, "$1{"), true);
    })();
    const s = t3.prototype.connectedCallback, l = t3.prototype.disconnectedCallback;
    return Object.assign(t3.prototype, { __hasHostListenerAttached: false, __registerHost() {
      ((t4, n3) => {
        const e2 = { i: 0, $hostElement$: t4, o: n3, l: /* @__PURE__ */ new Map(), G: /* @__PURE__ */ new Map() };
        e2.Z = new Promise(((t5) => e2.D = t5)), t4["s-p"] = [], t4["s-rc"] = [];
        const o2 = e2;
        t4.__stencil__getHostRef = () => o2, 512 & n3.i && j(t4, e2);
      })(this, e);
    }, connectedCallback() {
      if (!this.__hasHostListenerAttached) {
        const t4 = O(this);
        if (!t4) return;
        Gn(this, t4, e.Y), this.__hasHostListenerAttached = true;
      }
      ((t4) => {
        if (!(1 & L.i)) {
          const n3 = O(t4);
          if (!n3) return;
          const e2 = n3.o, o2 = () => {
          };
          if (1 & n3.i) Gn(t4, n3, e2.Y), (null == n3 ? void 0 : n3.P) || (1024 & n3.i ? setTimeout((() => qn(t4, n3, e2)), 1e3) : (null == n3 ? void 0 : n3.Z) && n3.Z.then((() => {
          })));
          else {
            let o3;
            if (n3.i |= 1, o3 = t4.getAttribute(k), o3) {
              if (1 & e2.i) {
                const n4 = Ct(t4.shadowRoot, e2, t4.getAttribute("s-mode"));
                t4.classList.remove(n4 + "-h", n4 + "-s");
              } else if (2 & e2.i) {
                const n4 = Mt(e2, t4.getAttribute("s-mode"));
                t4["s-sc"] = n4;
              }
              ((t5, n4, e3, o4) => {
                var s2, l2, i, r;
                const c2 = t5.shadowRoot, u2 = [], f2 = [], a2 = [], d2 = c2 ? [] : null, h = At(n4, null);
                let v;
                h.k = t5;
                {
                  const n5 = o4.o;
                  n5 && 10 & n5.i && t5["s-sc"] ? (v = t5["s-sc"], t5.classList.add(v + "-h")) : t5["s-sc"] && delete t5["s-sc"];
                }
                !R.document || L.W && L.W.size || Ut(R.document.body, L.W = /* @__PURE__ */ new Map()), t5[k] = e3, t5.removeAttribute(k), o4._ = Ft(h, u2, f2, d2, t5, t5, e3, a2);
                let p2 = 0;
                const $2 = u2.length;
                let b2;
                for (; p2 < $2; p2++) {
                  b2 = u2[p2];
                  const e4 = b2.C + "." + b2.M, o5 = L.W.get(e4), l3 = b2.k;
                  if (c2) {
                    if ((null == (s2 = b2.S) ? void 0 : s2.toString().includes("-")) && "slot-fb" !== b2.S && !b2.k.shadowRoot) {
                      const t6 = O(b2.k);
                      if (t6) {
                        const n5 = Mt(t6.o, b2.k.getAttribute("s-mode")), e5 = R.document.querySelector(`style[sty-id="${n5}"]`);
                        e5 && d2.unshift(e5.cloneNode(true));
                      }
                    }
                  } else l3["s-hn"] = n4.toUpperCase(), "slot" === b2.S && (l3["s-cr"] = t5["s-cr"]);
                  "slot" === b2.S && (b2.N = b2.k["s-sn"] || b2.k.name || null, b2.j ? (b2.i |= 2, b2.k.childNodes.length || b2.j.forEach(((t6) => {
                    b2.k.appendChild(t6.k);
                  }))) : b2.i |= 1), o5 && o5.isConnected && (o5.parentElement.shadowRoot && "" === o5["s-en"] && o5.parentNode.insertBefore(l3, o5.nextSibling), o5.parentNode.removeChild(o5), c2 || (l3["s-oo"] = parseInt(b2.M))), o5 && !o5["s-id"] && L.W.delete(e4);
                }
                const g2 = [], m2 = a2.length;
                let y2, w2, j2, N2, S2 = 0, x2 = 0;
                for (; S2 < m2; S2++) if (y2 = a2[S2], y2 && y2.length) for (j2 = y2.length, w2 = 0; w2 < j2; w2++) {
                  if (N2 = y2[w2], g2[N2.hostId] || (g2[N2.hostId] = L.W.get(N2.hostId)), !g2[N2.hostId]) continue;
                  const t6 = g2[N2.hostId];
                  t6.shadowRoot && N2.node.parentElement !== t6 && t6.insertBefore(N2.node, null == (i = null == (l2 = y2[w2 - 1]) ? void 0 : l2.node) ? void 0 : i.nextSibling), t6.shadowRoot && c2 || (N2.slot["s-cr"] || (N2.slot["s-cr"] = t6["s-cr"], N2.slot["s-cr"] = !N2.slot["s-cr"] && t6.shadowRoot ? t6 : (t6.__childNodes || t6.childNodes)[0]), et(N2.node, N2.slot, false, N2.node["s-oo"] || x2), (null == (r = N2.node.parentElement) ? void 0 : r.shadowRoot) && N2.node.getAttribute && N2.node.getAttribute("slot") && N2.node.removeAttribute("slot"), (E2 = N2.node) && void 0 === E2.__nextSibling && globalThis.Node && (gt(E2), yt(E2), jt(E2), E2.nodeType === Node.ELEMENT_NODE && (mt(E2), wt(E2)))), x2 = (N2.node["s-oo"] || x2) + 1;
                }
                var E2;
                if (v && f2.length && f2.forEach(((t6) => {
                  t6.k.parentElement.classList.add(v + "-s");
                })), c2 && !c2.childNodes.length) {
                  let n5 = 0;
                  const e4 = d2.length;
                  if (e4) {
                    for (; n5 < e4; n5++) {
                      const t6 = d2[n5];
                      t6 && c2.appendChild(t6);
                    }
                    Array.from(t5.childNodes).forEach(((t6) => {
                      "string" != typeof t6["s-en"] && "string" != typeof t6["s-sn"] && (1 === t6.nodeType && t6.slot && t6.hidden ? t6.removeAttribute("hidden") : 8 !== t6.nodeType || t6.nodeValue || t6.parentNode.removeChild(t6));
                    }));
                  }
                }
                o4.$hostElement$ = t5;
              })(t4, e2.v, o3, n3);
            }
            o3 || 12 & e2.i && zn(t4);
            {
              let e3 = t4;
              for (; e3 = e3.parentNode || e3.host; ) if (1 === e3.nodeType && e3.hasAttribute("s-id") && e3["s-p"] || e3["s-p"]) {
                In(n3, n3.U = e3);
                break;
              }
            }
            e2.t && Object.entries(e2.t).map((([n4, [e3]]) => {
              if (31 & e3 && Object.prototype.hasOwnProperty.call(t4, n4)) {
                const e4 = t4[n4];
                delete t4[n4], t4[n4] = e4;
              }
            })), qn(t4, n3, e2);
          }
          o2();
        }
      })(this), s && s.call(this);
    }, disconnectedCallback() {
      (async (t4) => {
        if (!(1 & L.i)) {
          const n3 = O(t4);
          (null == n3 ? void 0 : n3.K) && (n3.K.map(((t5) => t5())), n3.K = void 0);
        }
        Et.has(t4) && Et.delete(t4), t4.shadowRoot && Et.has(t4.shadowRoot) && Et.delete(t4.shadowRoot);
      })(this), l && l.call(this);
    }, __attachShadow() {
      if (this.shadowRoot) {
        if ("open" !== this.shadowRoot.mode) throw new Error(`Unable to re-use existing shadow root for ${e.v}! Mode is set to ${this.shadowRoot.mode} but Stencil only supports open shadow roots.`);
      } else Z.call(this, e);
    } }), Object.defineProperty(t3, "is", { value: e.v, configurable: true }), Pn(t3, e);
  } catch (n3) {
    return S(n3), t3;
  }
  var o;
};
var Gn = (t3, n2, e) => {
  e && R.document && e.map((([e2, o, s]) => {
    const l = Kn(R.document, t3, e2), i = Zn(n2, s), r = Qn(e2);
    L.ael(l, o, i, r), (n2.K = n2.K || []).push((() => L.rel(l, o, i, r)));
  }));
};
var Zn = (t3, n2) => (e) => {
  try {
    t3.$hostElement$[n2](e);
  } catch (n3) {
    S(n3, t3.$hostElement$);
  }
};
var Kn = (t3, n2, e) => 4 & e ? t3 : 8 & e ? R : 16 & e ? t3.body : n2;
var Qn = (t3) => B ? { passive: !!(1 & t3), capture: !!(2 & t3) } : !!(2 & t3);
function oe(t3) {
  return t3;
}

export {
  n,
  a,
  d,
  A,
  z,
  J,
  Y,
  Rt,
  Lt,
  qt,
  Qt,
  Jn,
  oe
};
//# sourceMappingURL=chunk-5SKCZ2KH.js.map
