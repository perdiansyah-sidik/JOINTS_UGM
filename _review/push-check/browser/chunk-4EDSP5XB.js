import {
  __spreadValues
} from "./chunk-PAXKX5KU.js";

// node_modules/@ionic/core/dist/esm/config-DWCzVL3Y.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var setupConfig = (config) => {
  const win = window;
  const Ionic = win.Ionic;
  if (Ionic && Ionic.config && Ionic.config.constructor.name !== "Object") {
    return;
  }
  win.Ionic = win.Ionic || {};
  win.Ionic.config = __spreadValues(__spreadValues({}, win.Ionic.config), config);
  return win.Ionic.config;
};
var ENABLE_HTML_CONTENT_DEFAULT = false;

export {
  setupConfig,
  ENABLE_HTML_CONTENT_DEFAULT
};
//# sourceMappingURL=chunk-4EDSP5XB.js.map
