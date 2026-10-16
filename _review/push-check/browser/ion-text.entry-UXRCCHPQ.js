import {
  createColorClasses
} from "./chunk-TP4O33LA.js";
import {
  getIonMode
} from "./chunk-ULZJEVRP.js";
import {
  Host,
  h,
  registerInstance
} from "./chunk-IDLJUR4P.js";
import "./chunk-PAXKX5KU.js";

// node_modules/@ionic/core/dist/esm/ion-text.entry.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var textCss = () => `:host(.ion-color){color:var(--ion-color-base)}`;
var Text = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    const mode = getIonMode(this);
    return h(Host, { key: "b6f604df1b7aa5705a5b9a458e669a6a921c02a1", class: createColorClasses(this.color, {
      [mode]: true
    }) }, h("slot", { key: "055d07b024a6554dfcf959fc8ed7b405e2730af2" }));
  }
};
Text.style = textCss();
export {
  Text as ion_text
};
//# sourceMappingURL=ion-text.entry-UXRCCHPQ.js.map
