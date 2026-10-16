import {
  CoreDelegate
} from "./chunk-XUMX4TJF.js";
import {
  addEventListener,
  componentOnReady,
  doc,
  focusVisibleElement,
  getElementRoot,
  removeEventListener,
  win
} from "./chunk-ZEW2DO4D.js";
import {
  getIonMode
} from "./chunk-ULZJEVRP.js";
import {
  config,
  printIonError,
  printIonWarning
} from "./chunk-IDLJUR4P.js";
import {
  BACKDROP_NO_SCROLL
} from "./chunk-HCYEB4TZ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-PAXKX5KU.js";

// node_modules/@ionic/core/dist/esm/overlays-a_5AhqWk.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var shouldUseCloseWatcher = () => config.get("experimentalCloseWatcher", false) && win !== void 0 && "CloseWatcher" in win;
var blockHardwareBackButton = () => {
  document.addEventListener("backbutton", () => {
  });
};
var startHardwareBackButton = () => {
  const doc2 = document;
  let busy = false;
  const backButtonCallback = () => {
    if (busy) {
      return;
    }
    let index = 0;
    let handlers = [];
    const ev = new CustomEvent("ionBackButton", {
      bubbles: false,
      detail: {
        register(priority, handler) {
          handlers.push({ priority, handler, id: index++ });
        }
      }
    });
    doc2.dispatchEvent(ev);
    const executeAction = async (handlerRegister) => {
      try {
        if (handlerRegister?.handler) {
          const result = handlerRegister.handler(processHandlers);
          if (result != null) {
            await result;
          }
        }
      } catch (e) {
        printIonError("[ion-app] - Exception in startHardwareBackButton:", e);
      }
    };
    const processHandlers = () => {
      if (handlers.length > 0) {
        let selectedHandler = {
          priority: Number.MIN_SAFE_INTEGER,
          handler: () => void 0,
          id: -1
        };
        handlers.forEach((handler) => {
          if (handler.priority >= selectedHandler.priority) {
            selectedHandler = handler;
          }
        });
        busy = true;
        handlers = handlers.filter((handler) => handler.id !== selectedHandler.id);
        executeAction(selectedHandler).then(() => busy = false);
      }
    };
    processHandlers();
  };
  if (shouldUseCloseWatcher()) {
    let watcher;
    const configureWatcher = () => {
      watcher?.destroy();
      watcher = new win.CloseWatcher();
      watcher.onclose = () => {
        backButtonCallback();
        configureWatcher();
      };
    };
    configureWatcher();
  } else {
    doc2.addEventListener("backbutton", backButtonCallback);
  }
};
var OVERLAY_BACK_BUTTON_PRIORITY = 100;
var MENU_BACK_BUTTON_PRIORITY = 99;
var hardwareBackButton = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  MENU_BACK_BUTTON_PRIORITY,
  OVERLAY_BACK_BUTTON_PRIORITY,
  blockHardwareBackButton,
  shouldUseCloseWatcher,
  startHardwareBackButton
});
var focusableQueryString = '[tabindex]:not([tabindex^="-"]):not([hidden]):not([disabled]), input:not([type=hidden]):not([tabindex^="-"]):not([hidden]):not([disabled]), textarea:not([tabindex^="-"]):not([hidden]):not([disabled]), button:not([tabindex^="-"]):not([hidden]):not([disabled]), select:not([tabindex^="-"]):not([hidden]):not([disabled]), ion-checkbox:not([tabindex^="-"]):not([hidden]):not([disabled]), ion-radio:not([tabindex^="-"]):not([hidden]):not([disabled]), .ion-focusable:not([tabindex^="-"]):not([hidden]):not([disabled]), .ion-focusable[disabled="false"]:not([tabindex^="-"]):not([hidden])';
var focusFirstDescendant = (ref, fallbackElement) => {
  const firstInput = ref.querySelector(focusableQueryString);
  focusElementInContext(firstInput, fallbackElement ?? ref);
};
var focusLastDescendant = (ref, fallbackElement) => {
  const inputs = Array.from(ref.querySelectorAll(focusableQueryString));
  const lastInput = inputs.length > 0 ? inputs[inputs.length - 1] : null;
  focusElementInContext(lastInput, fallbackElement ?? ref);
};
var focusElementInContext = (hostToFocus, fallbackElement) => {
  let elementToFocus = hostToFocus;
  const shadowRoot = hostToFocus?.shadowRoot;
  if (shadowRoot) {
    elementToFocus = shadowRoot.querySelector(focusableQueryString) || hostToFocus;
  }
  if (elementToFocus) {
    const radioGroup = elementToFocus.closest("ion-radio-group");
    if (radioGroup) {
      radioGroup.setFocus();
    } else {
      focusVisibleElement(elementToFocus);
    }
  } else {
    fallbackElement.focus();
  }
};
var lastOverlayIndex = 0;
var lastId = 0;
var activeAnimations = /* @__PURE__ */ new WeakMap();
var isBackdropAlwaysBlocking = (el) => {
  return el.showBackdrop !== false && !((el.backdropBreakpoint ?? 0) > 0);
};
var locksAppRoot = (el) => {
  return el.tagName !== "ION-TOAST" && el.focusTrap !== false && isBackdropAlwaysBlocking(el);
};
var createController = (tagName) => {
  return {
    create(options) {
      return createOverlay(tagName, options);
    },
    dismiss(data, role, id) {
      return dismissOverlay(document, data, role, tagName, id);
    },
    async getTop() {
      return getPresentedOverlay(document, tagName);
    }
  };
};
var alertController = /* @__PURE__ */ createController("ion-alert");
var actionSheetController = /* @__PURE__ */ createController("ion-action-sheet");
var loadingController = /* @__PURE__ */ createController("ion-loading");
var modalController = /* @__PURE__ */ createController("ion-modal");
var popoverController = /* @__PURE__ */ createController("ion-popover");
var toastController = /* @__PURE__ */ createController("ion-toast");
var prepareOverlay = (el) => {
  if (typeof document !== "undefined") {
    connectListeners(document);
  }
  const overlayIndex = lastOverlayIndex++;
  el.overlayIndex = overlayIndex;
};
var setOverlayId = (el) => {
  if (!el.hasAttribute("id")) {
    el.id = `ion-overlay-${++lastId}`;
  }
  return el.id;
};
var createOverlay = (tagName, opts) => {
  if (typeof window !== "undefined" && typeof window.customElements !== "undefined") {
    return window.customElements.whenDefined(tagName).then(() => {
      const element = document.createElement(tagName);
      element.classList.add("overlay-hidden");
      Object.assign(element, __spreadProps(__spreadValues({}, opts), { hasController: true }));
      getAppRoot(document).appendChild(element);
      return new Promise((resolve) => componentOnReady(element, resolve));
    });
  }
  return Promise.resolve();
};
var isOverlayHidden = (overlay) => overlay.classList.contains("overlay-hidden");
var focusElementInOverlay = (hostToFocus, overlay) => {
  let elementToFocus = hostToFocus;
  const shadowRoot = hostToFocus?.shadowRoot;
  if (shadowRoot) {
    elementToFocus = shadowRoot.querySelector(focusableQueryString) || hostToFocus;
  }
  if (elementToFocus) {
    focusVisibleElement(elementToFocus);
  } else {
    overlay.focus();
  }
};
var trapKeyboardFocus = (ev, doc2) => {
  const lastOverlay = getPresentedOverlay(doc2, "ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-popover");
  const target = ev.target;
  if (!lastOverlay || !target) {
    return;
  }
  if (lastOverlay.classList.contains(FOCUS_TRAP_DISABLE_CLASS)) {
    return;
  }
  const trapScopedFocus = () => {
    if (lastOverlay === target) {
      lastOverlay.lastFocus = void 0;
    } else if (target.tagName === "ION-TOAST") {
      focusElementInOverlay(lastOverlay.lastFocus, lastOverlay);
    } else {
      const overlayRoot = getElementRoot(lastOverlay);
      if (!overlayRoot.contains(target)) {
        return;
      }
      const overlayWrapper = overlayRoot.querySelector(".ion-overlay-wrapper");
      if (!overlayWrapper) {
        return;
      }
      if (overlayWrapper.contains(target) || target === overlayRoot.querySelector("ion-backdrop")) {
        lastOverlay.lastFocus = target;
      } else {
        const lastFocus = lastOverlay.lastFocus;
        focusFirstDescendant(overlayWrapper, lastOverlay);
        if (lastFocus === doc2.activeElement) {
          focusLastDescendant(overlayWrapper, lastOverlay);
        }
        lastOverlay.lastFocus = doc2.activeElement;
      }
    }
  };
  const trapShadowFocus = () => {
    if (lastOverlay.contains(target)) {
      lastOverlay.lastFocus = target;
    } else if (target.tagName === "ION-TOAST") {
      focusElementInOverlay(lastOverlay.lastFocus, lastOverlay);
    } else {
      const lastFocus = lastOverlay.lastFocus;
      focusFirstDescendant(lastOverlay);
      if (lastFocus === doc2.activeElement) {
        focusLastDescendant(lastOverlay);
      }
      lastOverlay.lastFocus = doc2.activeElement;
    }
  };
  if (lastOverlay.shadowRoot) {
    trapShadowFocus();
  } else {
    trapScopedFocus();
  }
};
var connectListeners = (doc2) => {
  if (lastOverlayIndex === 0) {
    lastOverlayIndex = 1;
    doc2.addEventListener("focus", (ev) => {
      trapKeyboardFocus(ev, doc2);
    }, true);
    doc2.addEventListener("ionBackButton", (ev) => {
      const lastOverlay = getPresentedOverlay(doc2);
      if (lastOverlay?.backdropDismiss) {
        ev.detail.register(OVERLAY_BACK_BUTTON_PRIORITY, () => {
          lastOverlay.dismiss(void 0, BACKDROP);
        });
      }
    });
    if (!shouldUseCloseWatcher()) {
      doc2.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape") {
          const lastOverlay = getPresentedOverlay(doc2);
          if (lastOverlay?.backdropDismiss) {
            lastOverlay.dismiss(void 0, BACKDROP);
          }
        }
      });
    }
  }
};
var dismissOverlay = (doc2, data, role, overlayTag, id) => {
  const overlay = getPresentedOverlay(doc2, overlayTag, id);
  if (!overlay) {
    return Promise.reject("overlay does not exist");
  }
  return overlay.dismiss(data, role);
};
var getOverlays = (doc2, selector) => {
  if (selector === void 0) {
    selector = "ion-alert,ion-action-sheet,ion-loading,ion-modal,ion-popover,ion-toast";
  }
  return Array.from(doc2.querySelectorAll(selector)).filter((c) => c.overlayIndex > 0);
};
var getPresentedOverlays = (doc2, overlayTag) => {
  return getOverlays(doc2, overlayTag).filter((o) => !isOverlayHidden(o));
};
var getPresentedOverlay = (doc2, overlayTag, id) => {
  const overlays = getPresentedOverlays(doc2, overlayTag);
  return (id === void 0 ? overlays : overlays.filter((o) => o.id === id)).slice(-1)[0];
};
var getViewContainer = () => {
  return getAppRoot(document).querySelector("ion-router-outlet, #ion-view-container-root");
};
var setRootAriaHidden = (hidden = false) => {
  const viewContainer = getViewContainer();
  if (!viewContainer) {
    return;
  }
  if (hidden) {
    viewContainer.setAttribute("aria-hidden", "true");
  } else {
    viewContainer.removeAttribute("aria-hidden");
  }
};
var cleanupRootFocusTrapAccessibility = () => {
  if (typeof document === "undefined") {
    return;
  }
  const remainingOverlays = getPresentedOverlays(document);
  const hasRemainingLocking = remainingOverlays.some((o) => locksAppRoot(o));
  if (!hasRemainingLocking) {
    setRootAriaHidden(false);
    document.body.classList.remove(BACKDROP_NO_SCROLL);
  }
};
var applyRootLock = (el) => {
  if (!getViewContainer()?.contains(el)) {
    setRootAriaHidden(true);
  }
  document.body.classList.add(BACKDROP_NO_SCROLL);
};
var restoreRootFocusTrapAccessibility = (overlayEl) => {
  if (typeof document === "undefined") {
    return;
  }
  const el = overlayEl;
  if (!locksAppRoot(el)) {
    return;
  }
  applyRootLock(el);
};
var present = async (overlay, name, iosEnterAnimation, mdEnterAnimation, opts) => {
  if (overlay.presented) {
    return;
  }
  if (overlay.el.tagName !== "ION-TOAST") {
    restoreElementFocus(overlay.el);
  }
  const overlayEl = overlay.el;
  const shouldLockRoot = locksAppRoot(overlayEl);
  overlay.presented = true;
  overlay.willPresent.emit();
  if (shouldLockRoot) {
    applyRootLock(overlayEl);
  }
  overlay.willPresentShorthand?.emit();
  const mode = getIonMode(overlay);
  const animationBuilder = overlay.enterAnimation ? overlay.enterAnimation : config.get(name, mode === "ios" ? iosEnterAnimation : mdEnterAnimation);
  const completed = await overlayAnimation(overlay, animationBuilder, overlay.el, opts);
  if (completed) {
    overlay.didPresent.emit();
    overlay.didPresentShorthand?.emit();
  }
  if (overlay.keyboardClose && (document.activeElement === null || !overlay.el.contains(document.activeElement))) {
    const overlayWrapper = getElementRoot(overlay.el).querySelector('[role="dialog"][tabindex]');
    const focusTarget = overlayWrapper ?? overlay.el;
    try {
      focusTarget.focus({ preventScroll: true });
    } catch {
      focusTarget.focus();
    }
  }
  overlay.el.removeAttribute("aria-hidden");
  overlay.el.removeAttribute("inert");
};
var restoreElementFocus = async (overlayEl) => {
  let previousElement = document.activeElement;
  if (!previousElement) {
    return;
  }
  previousElement.blur();
  const shadowRoot = previousElement?.shadowRoot;
  if (shadowRoot) {
    previousElement = shadowRoot.querySelector(focusableQueryString) || previousElement;
  }
  await overlayEl.onDidDismiss();
  if (document.activeElement === null || document.activeElement === document.body) {
    previousElement.focus();
  }
};
var dismiss = async (overlay, data, role, name, iosLeaveAnimation, mdLeaveAnimation, opts) => {
  if (!overlay.presented) {
    return false;
  }
  const presentedOverlays = doc !== void 0 ? getPresentedOverlays(doc) : [];
  const overlaysLockingRoot = presentedOverlays.filter((o) => locksAppRoot(o));
  const overlayEl = overlay.el;
  const locksRoot = locksAppRoot(overlayEl);
  const lastOverlayTrappingFocus = locksRoot && overlaysLockingRoot.length === 1 && overlaysLockingRoot[0].id === overlayEl.id;
  if (lastOverlayTrappingFocus) {
    setRootAriaHidden(false);
    document.body.classList.remove(BACKDROP_NO_SCROLL);
  }
  overlay.presented = false;
  try {
    overlay.el.style.setProperty("pointer-events", "none");
    overlay.willDismiss.emit({ data, role });
    overlay.willDismissShorthand?.emit({ data, role });
    const mode = getIonMode(overlay);
    const animationBuilder = overlay.leaveAnimation ? overlay.leaveAnimation : config.get(name, mode === "ios" ? iosLeaveAnimation : mdLeaveAnimation);
    if (role !== GESTURE) {
      await overlayAnimation(overlay, animationBuilder, overlay.el, opts);
    }
    overlay.didDismiss.emit({ data, role });
    overlay.didDismissShorthand?.emit({ data, role });
    const animations = activeAnimations.get(overlay) || [];
    animations.forEach((ani) => ani.destroy());
    activeAnimations.delete(overlay);
    overlay.el.classList.add("overlay-hidden");
    overlay.el.style.removeProperty("pointer-events");
    if (overlay.el.lastFocus !== void 0) {
      overlay.el.lastFocus = void 0;
    }
  } catch (err) {
    printIonError(`[${overlay.el.tagName.toLowerCase()}] - `, err);
  }
  overlay.el.remove();
  return true;
};
var getAppRoot = (doc2) => {
  return doc2.querySelector("ion-app") || doc2.body;
};
var overlayAnimation = async (overlay, animationBuilder, baseEl, opts) => {
  baseEl.classList.remove("overlay-hidden");
  const aniRoot = overlay.el;
  const animation = animationBuilder(aniRoot, opts);
  if (!overlay.animated || !config.getBoolean("animated", true)) {
    animation.duration(0);
  }
  if (overlay.keyboardClose) {
    animation.beforeAddWrite(() => {
      const activeElement = baseEl.ownerDocument.activeElement;
      if (activeElement?.matches("input,ion-input, ion-textarea")) {
        activeElement.blur();
      }
    });
  }
  const activeAni = activeAnimations.get(overlay) || [];
  activeAnimations.set(overlay, [...activeAni, animation]);
  await animation.play();
  return true;
};
var eventMethod = (element, eventName) => {
  let resolve;
  const promise = new Promise((r) => resolve = r);
  onceEvent(element, eventName, (event) => {
    resolve(event.detail);
  });
  return promise;
};
var onceEvent = (element, eventName, callback) => {
  const handler = (ev) => {
    removeEventListener(element, eventName, handler);
    callback(ev);
  };
  addEventListener(element, eventName, handler);
};
var isCancel = (role) => {
  return role === "cancel" || role === BACKDROP;
};
var defaultGate = (h) => h();
var safeCall = (handler, arg) => {
  if (typeof handler === "function") {
    const jmp = config.get("_zoneGate", defaultGate);
    return jmp(() => {
      try {
        return handler(arg);
      } catch (e) {
        throw e;
      }
    });
  }
  return void 0;
};
var FULLSCREEN_SIZES = ["", "100%", "100vw", "100vh", "100dvw", "100dvh", "100svw", "100svh"];
var CONTENT_SIZES = ["auto", "fit-content", "min-content", "max-content"];
var getOverlaySizeType = (size) => {
  const value = size.trim().toLowerCase();
  if (FULLSCREEN_SIZES.includes(value)) {
    return "fullscreen";
  }
  if (CONTENT_SIZES.some((keyword) => value.endsWith(keyword))) {
    return "content";
  }
  return "definite";
};
var BACKDROP = "backdrop";
var GESTURE = "gesture";
var OVERLAY_GESTURE_PRIORITY = 39;
var createDelegateController = (ref) => {
  let inline = false;
  let workingDelegate;
  const coreDelegate = CoreDelegate();
  const getDelegate = (force = false) => {
    if (workingDelegate && !force) {
      return {
        delegate: workingDelegate,
        inline
      };
    }
    const { el, hasController, delegate } = ref;
    const parentEl = el.parentNode;
    inline = parentEl !== null && !hasController;
    workingDelegate = inline ? delegate || coreDelegate : delegate;
    return { inline, delegate: workingDelegate };
  };
  const attachViewToDom = async (component) => {
    const { delegate } = getDelegate(true);
    if (delegate) {
      return await delegate.attachViewToDom(ref.el, component);
    }
    const { hasController } = ref;
    if (hasController && component !== void 0) {
      throw new Error("framework delegate is missing");
    }
    return null;
  };
  const removeViewFromDom = () => {
    const { delegate } = getDelegate();
    if (delegate && ref.el !== void 0) {
      delegate.removeViewFromDom(ref.el.parentElement, ref.el);
    }
  };
  return {
    attachViewToDom,
    removeViewFromDom
  };
};
var createTriggerController = () => {
  let destroyTriggerInteraction;
  const removeClickListener = () => {
    if (destroyTriggerInteraction) {
      destroyTriggerInteraction();
      destroyTriggerInteraction = void 0;
    }
  };
  const addClickListener = (el, trigger) => {
    removeClickListener();
    const triggerEl = trigger !== void 0 ? document.getElementById(trigger) : null;
    if (!triggerEl) {
      printIonWarning(`[${el.tagName.toLowerCase()}] - A trigger element with the ID "${trigger}" was not found in the DOM. The trigger element must be in the DOM when the "trigger" property is set on an overlay component.`, el);
      return;
    }
    const configureTriggerInteraction = (targetEl, overlayEl) => {
      const openOverlay = () => {
        overlayEl.present();
      };
      targetEl.addEventListener("click", openOverlay);
      return () => {
        targetEl.removeEventListener("click", openOverlay);
      };
    };
    destroyTriggerInteraction = configureTriggerInteraction(triggerEl, el);
  };
  return {
    addClickListener,
    removeClickListener
  };
};
var FOCUS_TRAP_DISABLE_CLASS = "ion-disable-focus-trap";

export {
  shouldUseCloseWatcher,
  MENU_BACK_BUTTON_PRIORITY,
  hardwareBackButton,
  focusFirstDescendant,
  focusLastDescendant,
  alertController,
  actionSheetController,
  loadingController,
  modalController,
  popoverController,
  toastController,
  prepareOverlay,
  setOverlayId,
  getPresentedOverlay,
  cleanupRootFocusTrapAccessibility,
  restoreRootFocusTrapAccessibility,
  present,
  dismiss,
  eventMethod,
  isCancel,
  safeCall,
  getOverlaySizeType,
  BACKDROP,
  GESTURE,
  OVERLAY_GESTURE_PRIORITY,
  createDelegateController,
  createTriggerController,
  FOCUS_TRAP_DISABLE_CLASS
};
//# sourceMappingURL=chunk-GGI4CDCA.js.map
