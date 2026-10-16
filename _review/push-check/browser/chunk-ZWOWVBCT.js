import {
  printIonError
} from "./chunk-IDLJUR4P.js";

// node_modules/@ionic/core/dist/esm/input.utils-C3mVJhji.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var getCounterText = (value, maxLength, counterFormatter) => {
  const valueLength = value == null ? 0 : value.toString().length;
  const defaultCounterText = defaultCounterFormatter(valueLength, maxLength);
  if (counterFormatter === void 0) {
    return defaultCounterText;
  }
  try {
    return counterFormatter(valueLength, maxLength);
  } catch (e) {
    printIonError("[ion-input] - Exception in provided `counterFormatter`:", e);
    return defaultCounterText;
  }
};
var defaultCounterFormatter = (length, maxlength) => {
  return `${length} / ${maxlength}`;
};

export {
  getCounterText
};
//# sourceMappingURL=chunk-ZWOWVBCT.js.map
