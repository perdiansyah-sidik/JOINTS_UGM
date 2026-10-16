import {
  __spreadValues
} from "./chunk-PAXKX5KU.js";

// node_modules/@ionic/core/dist/esm/theme-byZM6qHV.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var hostContext = (selector, el) => {
  return el.closest(selector) !== null;
};
var createColorClasses = (color, cssClassMap) => {
  return typeof color === "string" && color.length > 0 ? __spreadValues({
    "ion-color": true,
    [`ion-color-${color}`]: true
  }, cssClassMap) : cssClassMap;
};
var getClassList = (classes) => {
  if (classes !== void 0) {
    const array = Array.isArray(classes) ? classes : classes.split(" ");
    return array.filter((c) => c != null).map((c) => c.trim()).filter((c) => c !== "");
  }
  return [];
};
var getClassMap = (classes) => {
  const map = {};
  getClassList(classes).forEach((c) => map[c] = true);
  return map;
};
var SCHEME = /^[a-z][a-z0-9+\-.]*:/;
var openURL = async (url, ev, direction, animation) => {
  if (url != null && url[0] !== "#" && !SCHEME.test(url)) {
    const router = document.querySelector("ion-router");
    if (router) {
      if (ev != null) {
        ev.preventDefault();
      }
      return router.push(url, direction, animation);
    }
  }
  return false;
};

export {
  hostContext,
  createColorClasses,
  getClassMap,
  openURL
};
//# sourceMappingURL=chunk-TP4O33LA.js.map
