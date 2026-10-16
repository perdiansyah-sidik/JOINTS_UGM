import {
  eye,
  eyeOff
} from "./chunk-YL5RWUAI.js";
import {
  createColorClasses
} from "./chunk-TP4O33LA.js";
import {
  getIonMode
} from "./chunk-ULZJEVRP.js";
import {
  Host,
  getElement,
  h,
  printIonWarning,
  registerInstance
} from "./chunk-IDLJUR4P.js";
import "./chunk-PAXKX5KU.js";

// node_modules/@ionic/core/dist/esm/ion-input-password-toggle.entry.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var iosInputPasswordToggleCss = () => ``;
var mdInputPasswordToggleCss = () => ``;
var InputPasswordToggle = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = "password";
    this.togglePasswordVisibility = () => {
      const { inputElRef } = this;
      if (!inputElRef) {
        return;
      }
      inputElRef.type = inputElRef.type === "text" ? "password" : "text";
    };
  }
  /**
   * Whenever the input type changes we need to re-run validation to ensure the password
   * toggle is being used with the correct input type. If the application changes the type
   * outside of this component we also need to re-render so the correct icon is shown.
   */
  onTypeChange(newValue) {
    if (newValue !== "text" && newValue !== "password") {
      printIonWarning(`[ion-input-password-toggle] - Only inputs of type "text" or "password" are supported. Input of type "${newValue}" is not compatible.`, this.el);
      return;
    }
  }
  connectedCallback() {
    const { el } = this;
    const inputElRef = this.inputElRef = el.closest("ion-input");
    if (!inputElRef) {
      printIonWarning("[ion-input-password-toggle] - No ancestor ion-input found. This component must be slotted inside of an ion-input.", el);
      return;
    }
    this.type = inputElRef.type;
  }
  disconnectedCallback() {
    this.inputElRef = null;
  }
  render() {
    const { color, type } = this;
    const mode = getIonMode(this);
    const showPasswordIcon = this.showIcon ?? eye;
    const hidePasswordIcon = this.hideIcon ?? eyeOff;
    const isPasswordVisible = type === "text";
    return h(Host, { key: "15a29e51abc236cc21943225ed377f5edca7d103", class: createColorClasses(color, {
      [mode]: true
    }) }, h("ion-button", { key: "cc9c290e809db66c14aaf63eb496ccf94d3f6414", mode, color, fill: "clear", shape: "round", "aria-label": isPasswordVisible ? "Hide password" : "Show password", "aria-pressed": isPasswordVisible ? "true" : "false", type: "button", onPointerDown: (ev) => {
      ev.preventDefault();
    }, onClick: this.togglePasswordVisibility }, h("ion-icon", { key: "8d1f5143bedabcff2a8792f35ef07fdac1236fd5", slot: "icon-only", "aria-hidden": "true", icon: isPasswordVisible ? hidePasswordIcon : showPasswordIcon })));
  }
  get el() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "type": [{
        "onTypeChange": 0
      }]
    };
  }
};
InputPasswordToggle.style = {
  ios: iosInputPasswordToggleCss(),
  md: mdInputPasswordToggleCss()
};
export {
  InputPasswordToggle as ion_input_password_toggle
};
//# sourceMappingURL=ion-input-password-toggle.entry-ZWGJRAN5.js.map
