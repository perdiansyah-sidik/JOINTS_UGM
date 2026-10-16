import {
  deepReady,
  waitForMount
} from "./chunk-PBFIAVCV.js";
import {
  createLockController
} from "./chunk-K2ATXY75.js";
import {
  createAnimation
} from "./chunk-JGMRS7JO.js";
import {
  getClassMap
} from "./chunk-TP4O33LA.js";
import {
  BACKDROP,
  FOCUS_TRAP_DISABLE_CLASS,
  cleanupRootFocusTrapAccessibility,
  dismiss,
  eventMethod,
  focusFirstDescendant,
  prepareOverlay,
  present,
  restoreRootFocusTrapAccessibility,
  setOverlayId
} from "./chunk-GGI4CDCA.js";
import {
  CoreDelegate,
  attachComponent,
  detachComponent
} from "./chunk-XUMX4TJF.js";
import {
  addEventListener,
  getElementRoot,
  hasLazyBuild,
  raf
} from "./chunk-ZEW2DO4D.js";
import "./chunk-AWSGH3DX.js";
import {
  getIonMode,
  isPlatform
} from "./chunk-ULZJEVRP.js";
import {
  Host,
  createEvent,
  getElement,
  h,
  printIonWarning,
  registerInstance
} from "./chunk-IDLJUR4P.js";
import "./chunk-HCYEB4TZ.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-PAXKX5KU.js";

// node_modules/@ionic/core/dist/esm/ion-popover.entry.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var cachedInsets = null;
var cacheInvalidationScheduled = false;
var getSafeAreaInsets = (doc) => {
  if (cachedInsets !== null) {
    return cachedInsets;
  }
  if (doc.body === null) {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }
  const el = doc.createElement("div");
  el.style.cssText = "position:fixed;visibility:hidden;pointer-events:none;top:0;left:0;padding-top:var(--ion-safe-area-top,0px);padding-bottom:var(--ion-safe-area-bottom,0px);padding-left:var(--ion-safe-area-left,0px);padding-right:var(--ion-safe-area-right,0px);";
  doc.body.appendChild(el);
  const style = getComputedStyle(el);
  const insets = {
    top: parseFloat(style.paddingTop) || 0,
    bottom: parseFloat(style.paddingBottom) || 0,
    left: parseFloat(style.paddingLeft) || 0,
    right: parseFloat(style.paddingRight) || 0
  };
  el.remove();
  cachedInsets = insets;
  if (!cacheInvalidationScheduled) {
    cacheInvalidationScheduled = true;
    raf(() => {
      cachedInsets = null;
      cacheInvalidationScheduled = false;
    });
  }
  return insets;
};
var getArrowDimensions = (arrowEl) => {
  if (!arrowEl) {
    return { arrowWidth: 0, arrowHeight: 0 };
  }
  const { width, height } = arrowEl.getBoundingClientRect();
  return { arrowWidth: width, arrowHeight: height };
};
var getPopoverDimensions = (size, contentEl, triggerEl) => {
  const contentDimentions = contentEl.getBoundingClientRect();
  const contentHeight = contentDimentions.height;
  let contentWidth = contentDimentions.width;
  if (size === "cover" && triggerEl) {
    const triggerDimensions = triggerEl.getBoundingClientRect();
    contentWidth = triggerDimensions.width;
  }
  return {
    contentWidth,
    contentHeight
  };
};
var configureDismissInteraction = (triggerEl, triggerAction, popoverEl, parentPopoverEl) => {
  let dismissCallbacks = [];
  const root = getElementRoot(parentPopoverEl);
  const parentContentEl = root.querySelector(".popover-content");
  switch (triggerAction) {
    case "hover":
      dismissCallbacks = [
        {
          /**
           * Do not use mouseover here
           * as this will causes the event to
           * be dispatched on each underlying
           * element rather than on the popover
           * content as a whole.
           */
          eventName: "mouseenter",
          callback: (ev) => {
            const element = document.elementFromPoint(ev.clientX, ev.clientY);
            if (element === triggerEl) {
              return;
            }
            popoverEl.dismiss(void 0, void 0, false);
          }
        }
      ];
      break;
    case "context-menu":
    case "click":
    default:
      dismissCallbacks = [
        {
          eventName: "click",
          callback: (ev) => {
            const target = ev.target;
            const closestTrigger = target.closest("[data-ion-popover-trigger]");
            if (closestTrigger === triggerEl) {
              ev.stopPropagation();
              return;
            }
            popoverEl.dismiss(void 0, void 0, false);
          }
        }
      ];
      break;
  }
  dismissCallbacks.forEach(({ eventName, callback }) => parentContentEl.addEventListener(eventName, callback));
  return () => {
    dismissCallbacks.forEach(({ eventName, callback }) => parentContentEl.removeEventListener(eventName, callback));
  };
};
var configureTriggerInteraction = (triggerEl, triggerAction, popoverEl) => {
  let triggerCallbacks = [];
  switch (triggerAction) {
    case "hover":
      let hoverTimeout;
      triggerCallbacks = [
        {
          eventName: "mouseenter",
          callback: async (ev) => {
            ev.stopPropagation();
            if (hoverTimeout) {
              clearTimeout(hoverTimeout);
            }
            hoverTimeout = setTimeout(() => {
              raf(() => {
                popoverEl.presentFromTrigger(ev);
                hoverTimeout = void 0;
              });
            }, 100);
          }
        },
        {
          eventName: "mouseleave",
          callback: (ev) => {
            if (hoverTimeout) {
              clearTimeout(hoverTimeout);
            }
            const target = ev.relatedTarget;
            if (!target) {
              return;
            }
            if (target.closest("ion-popover") !== popoverEl) {
              popoverEl.dismiss(void 0, void 0, false);
            }
          }
        },
        {
          /**
           * stopPropagation here prevents the popover
           * from dismissing when dismiss-on-select="true".
           */
          eventName: "click",
          callback: (ev) => ev.stopPropagation()
        },
        {
          eventName: "ionPopoverActivateTrigger",
          callback: (ev) => popoverEl.presentFromTrigger(ev, true)
        }
      ];
      break;
    case "context-menu":
      triggerCallbacks = [
        {
          eventName: "contextmenu",
          callback: (ev) => {
            ev.preventDefault();
            popoverEl.presentFromTrigger(ev);
          }
        },
        {
          eventName: "click",
          callback: (ev) => ev.stopPropagation()
        },
        {
          eventName: "ionPopoverActivateTrigger",
          callback: (ev) => popoverEl.presentFromTrigger(ev, true)
        }
      ];
      break;
    case "click":
    default:
      triggerCallbacks = [
        {
          /**
           * Do not do a stopPropagation() here
           * because if you had two click triggers
           * then clicking the first trigger and then
           * clicking the second trigger would not cause
           * the first popover to dismiss.
           */
          eventName: "click",
          callback: (ev) => popoverEl.presentFromTrigger(ev)
        },
        {
          eventName: "ionPopoverActivateTrigger",
          callback: (ev) => popoverEl.presentFromTrigger(ev, true)
        }
      ];
      break;
  }
  triggerCallbacks.forEach(({ eventName, callback }) => triggerEl.addEventListener(eventName, callback));
  triggerEl.setAttribute("data-ion-popover-trigger", "true");
  return () => {
    triggerCallbacks.forEach(({ eventName, callback }) => triggerEl.removeEventListener(eventName, callback));
    triggerEl.removeAttribute("data-ion-popover-trigger");
  };
};
var getIndexOfItem = (items, item) => {
  if (!item || item.tagName !== "ION-ITEM") {
    return -1;
  }
  return items.findIndex((el) => el === item);
};
var getNextItem = (items, currentItem) => {
  const currentItemIndex = getIndexOfItem(items, currentItem);
  return items[currentItemIndex + 1];
};
var getPrevItem = (items, currentItem) => {
  const currentItemIndex = getIndexOfItem(items, currentItem);
  return items[currentItemIndex - 1];
};
var focusItem = (item) => {
  const root = getElementRoot(item);
  const button = root.querySelector("button");
  if (button) {
    raf(() => button.focus());
  }
};
var isTriggerElement = (el) => el.hasAttribute("data-ion-popover-trigger");
var configureKeyboardInteraction = (popoverEl) => {
  const callback = async (ev) => {
    const activeElement = document.activeElement;
    let items = [];
    const targetTagName = ev.target?.tagName;
    if (targetTagName !== "ION-POPOVER" && targetTagName !== "ION-ITEM") {
      return;
    }
    try {
      items = Array.from(popoverEl.querySelectorAll("ion-item:not(ion-popover ion-popover *):not([disabled])"));
    } catch {
    }
    switch (ev.key) {
      /**
       * If we are in a child popover
       * then pressing the left arrow key
       * should close this popover and move
       * focus to the popover that presented
       * this one.
       */
      case "ArrowLeft":
        const parentPopover = await popoverEl.getParentPopover();
        if (parentPopover) {
          popoverEl.dismiss(void 0, void 0, false);
        }
        break;
      /**
       * ArrowDown should move focus to the next focusable ion-item.
       */
      case "ArrowDown":
        ev.preventDefault();
        const nextItem = getNextItem(items, activeElement);
        if (nextItem !== void 0) {
          focusItem(nextItem);
        }
        break;
      /**
       * ArrowUp should move focus to the previous focusable ion-item.
       */
      case "ArrowUp":
        ev.preventDefault();
        const prevItem = getPrevItem(items, activeElement);
        if (prevItem !== void 0) {
          focusItem(prevItem);
        }
        break;
      /**
       * Home should move focus to the first focusable ion-item.
       */
      case "Home":
        ev.preventDefault();
        const firstItem = items[0];
        if (firstItem !== void 0) {
          focusItem(firstItem);
        }
        break;
      /**
       * End should move focus to the last focusable ion-item.
       */
      case "End":
        ev.preventDefault();
        const lastItem = items[items.length - 1];
        if (lastItem !== void 0) {
          focusItem(lastItem);
        }
        break;
      /**
       * ArrowRight, Spacebar, or Enter should activate
       * the currently focused trigger item to open a
       * popover if the element is a trigger item.
       */
      case "ArrowRight":
      case " ":
      case "Enter":
        if (activeElement && isTriggerElement(activeElement)) {
          const rightEvent = new CustomEvent("ionPopoverActivateTrigger");
          activeElement.dispatchEvent(rightEvent);
        }
        break;
    }
  };
  popoverEl.addEventListener("keydown", callback);
  return () => popoverEl.removeEventListener("keydown", callback);
};
var getPopoverPosition = (isRTL, contentWidth, contentHeight, arrowWidth, arrowHeight, reference, side, align, defaultPosition, triggerEl, event) => {
  let referenceCoordinates = {
    top: 0,
    left: 0,
    width: 0,
    height: 0
  };
  switch (reference) {
    case "event":
      if (!event) {
        return defaultPosition;
      }
      const mouseEv = event;
      referenceCoordinates = {
        top: mouseEv.clientY,
        left: mouseEv.clientX,
        width: 1,
        height: 1
      };
      break;
    /**
     * Calculate position relative to the bounding
     * box on either the trigger element
     * specified via the `trigger` prop or
     * the target specified on the event
     * that was passed in.
     */
    case "trigger":
    default:
      const customEv = event;
      const actualTriggerEl = triggerEl || customEv?.detail?.ionShadowTarget || customEv?.target;
      if (!actualTriggerEl) {
        return defaultPosition;
      }
      const triggerBoundingBox = actualTriggerEl.getBoundingClientRect();
      referenceCoordinates = {
        top: triggerBoundingBox.top,
        left: triggerBoundingBox.left,
        width: triggerBoundingBox.width,
        height: triggerBoundingBox.height
      };
      break;
  }
  const coordinates = calculatePopoverSide(side, referenceCoordinates, contentWidth, contentHeight, arrowWidth, arrowHeight, isRTL);
  const alignedCoordinates = calculatePopoverAlign(align, side, referenceCoordinates, contentWidth, contentHeight);
  const top = coordinates.top + alignedCoordinates.top;
  const left = coordinates.left + alignedCoordinates.left;
  const { arrowTop, arrowLeft } = calculateArrowPosition(side, arrowWidth, arrowHeight, top, left, contentWidth, contentHeight, isRTL);
  const { originX, originY } = calculatePopoverOrigin(side, align, isRTL);
  return { top, left, referenceCoordinates, arrowTop, arrowLeft, originX, originY };
};
var calculatePopoverOrigin = (side, align, isRTL) => {
  switch (side) {
    case "top":
      return { originX: getOriginXAlignment(align), originY: "bottom" };
    case "bottom":
      return { originX: getOriginXAlignment(align), originY: "top" };
    case "left":
      return { originX: "right", originY: getOriginYAlignment(align) };
    case "right":
      return { originX: "left", originY: getOriginYAlignment(align) };
    case "start":
      return { originX: isRTL ? "left" : "right", originY: getOriginYAlignment(align) };
    case "end":
      return { originX: isRTL ? "right" : "left", originY: getOriginYAlignment(align) };
  }
};
var getOriginXAlignment = (align) => {
  switch (align) {
    case "start":
      return "left";
    case "center":
      return "center";
    case "end":
      return "right";
  }
};
var getOriginYAlignment = (align) => {
  switch (align) {
    case "start":
      return "top";
    case "center":
      return "center";
    case "end":
      return "bottom";
  }
};
var calculateArrowPosition = (side, arrowWidth, arrowHeight, top, left, contentWidth, contentHeight, isRTL) => {
  const leftPosition = {
    arrowTop: top + contentHeight / 2 - arrowWidth / 2,
    arrowLeft: left + contentWidth - arrowWidth / 2
  };
  const rightPosition = { arrowTop: top + contentHeight / 2 - arrowWidth / 2, arrowLeft: left - arrowWidth * 1.5 };
  switch (side) {
    case "top":
      return { arrowTop: top + contentHeight, arrowLeft: left + contentWidth / 2 - arrowWidth / 2 };
    case "bottom":
      return { arrowTop: top - arrowHeight, arrowLeft: left + contentWidth / 2 - arrowWidth / 2 };
    case "left":
      return leftPosition;
    case "right":
      return rightPosition;
    case "start":
      return isRTL ? rightPosition : leftPosition;
    case "end":
      return isRTL ? leftPosition : rightPosition;
    default:
      return { arrowTop: 0, arrowLeft: 0 };
  }
};
var calculatePopoverSide = (side, triggerBoundingBox, contentWidth, contentHeight, arrowWidth, arrowHeight, isRTL) => {
  const sideLeft = {
    top: triggerBoundingBox.top,
    left: triggerBoundingBox.left - contentWidth - arrowWidth
  };
  const sideRight = {
    top: triggerBoundingBox.top,
    left: triggerBoundingBox.left + triggerBoundingBox.width + arrowWidth
  };
  switch (side) {
    case "top":
      return {
        top: triggerBoundingBox.top - contentHeight - arrowHeight,
        left: triggerBoundingBox.left
      };
    case "right":
      return sideRight;
    case "bottom":
      return {
        top: triggerBoundingBox.top + triggerBoundingBox.height + arrowHeight,
        left: triggerBoundingBox.left
      };
    case "left":
      return sideLeft;
    case "start":
      return isRTL ? sideRight : sideLeft;
    case "end":
      return isRTL ? sideLeft : sideRight;
  }
};
var calculatePopoverAlign = (align, side, triggerBoundingBox, contentWidth, contentHeight) => {
  switch (align) {
    case "center":
      return calculatePopoverCenterAlign(side, triggerBoundingBox, contentWidth, contentHeight);
    case "end":
      return calculatePopoverEndAlign(side, triggerBoundingBox, contentWidth, contentHeight);
    case "start":
    default:
      return { top: 0, left: 0 };
  }
};
var calculatePopoverEndAlign = (side, triggerBoundingBox, contentWidth, contentHeight) => {
  switch (side) {
    case "start":
    case "end":
    case "left":
    case "right":
      return {
        top: -(contentHeight - triggerBoundingBox.height),
        left: 0
      };
    case "top":
    case "bottom":
    default:
      return {
        top: 0,
        left: -(contentWidth - triggerBoundingBox.width)
      };
  }
};
var calculatePopoverCenterAlign = (side, triggerBoundingBox, contentWidth, contentHeight) => {
  switch (side) {
    case "start":
    case "end":
    case "left":
    case "right":
      return {
        top: -(contentHeight / 2 - triggerBoundingBox.height / 2),
        left: 0
      };
    case "top":
    case "bottom":
    default:
      return {
        top: 0,
        left: -(contentWidth / 2 - triggerBoundingBox.width / 2)
      };
  }
};
var calculateWindowAdjustment = (side, coordTop, coordLeft, bodyPadding, bodyWidth, bodyHeight, contentWidth, contentHeight, safeArea, contentOriginX, contentOriginY, triggerCoordinates, coordArrowTop = 0, coordArrowLeft = 0, arrowHeight = 0) => {
  let arrowTop = coordArrowTop;
  const arrowLeft = coordArrowLeft;
  let left = coordLeft;
  let top = coordTop;
  let bottom;
  let originX = contentOriginX;
  let originY = contentOriginY;
  let checkSafeAreaLeft = false;
  let checkSafeAreaRight = false;
  let checkSafeAreaTop = false;
  let checkSafeAreaBottom = false;
  const triggerTop = triggerCoordinates ? triggerCoordinates.top + triggerCoordinates.height : bodyHeight / 2 - contentHeight / 2;
  const triggerHeight = triggerCoordinates ? triggerCoordinates.height : 0;
  let addPopoverBottomClass = false;
  const hideArrow = false;
  if (left < bodyPadding + safeArea.left) {
    left = bodyPadding;
    checkSafeAreaLeft = true;
    originX = "left";
  } else if (contentWidth + bodyPadding + left + safeArea.right > bodyWidth) {
    checkSafeAreaRight = true;
    left = bodyWidth - contentWidth - bodyPadding;
    originX = "right";
  }
  if (triggerTop + triggerHeight + contentHeight > bodyHeight - safeArea.bottom && (side === "top" || side === "bottom")) {
    const idealFlipTop = triggerTop - contentHeight - triggerHeight - (arrowHeight - 1);
    if (idealFlipTop >= safeArea.top + bodyPadding) {
      top = idealFlipTop;
      arrowTop = top + contentHeight;
      originY = "bottom";
      addPopoverBottomClass = true;
    } else {
      bottom = bodyPadding;
      checkSafeAreaBottom = true;
      const bottomEdge = bodyHeight - safeArea.bottom - bodyPadding;
      if (top >= bottomEdge) {
        top = safeArea.top + bodyPadding;
        checkSafeAreaTop = true;
      }
    }
  }
  return {
    top,
    left,
    bottom,
    originX,
    originY,
    checkSafeAreaLeft,
    checkSafeAreaRight,
    checkSafeAreaTop,
    checkSafeAreaBottom,
    arrowTop,
    arrowLeft,
    addPopoverBottomClass,
    hideArrow
  };
};
var shouldShowArrow = (side, didAdjustBounds = false, ev, trigger) => {
  if (!ev && !trigger) {
    return false;
  }
  if (side !== "top" && side !== "bottom" && didAdjustBounds) {
    return false;
  }
  return true;
};
var POPOVER_IOS_BODY_PADDING = 5;
var POPOVER_IOS_MIN_EDGE_MARGIN = 25;
var iosEnterAnimation = (baseEl, opts) => {
  const { event: ev, size, trigger, reference, side, align } = opts;
  const doc = baseEl.ownerDocument;
  const isRTL = doc.dir === "rtl";
  const bodyWidth = doc.defaultView.innerWidth;
  const bodyHeight = doc.defaultView.innerHeight;
  const root = getElementRoot(baseEl);
  const contentEl = root.querySelector(".popover-content");
  const arrowEl = root.querySelector(".popover-arrow");
  const referenceSizeEl = trigger || ev?.detail?.ionShadowTarget || ev?.target;
  const { contentWidth, contentHeight } = getPopoverDimensions(size, contentEl, referenceSizeEl);
  const { arrowWidth, arrowHeight } = getArrowDimensions(arrowEl);
  const defaultPosition = {
    top: bodyHeight / 2 - contentHeight / 2,
    left: bodyWidth / 2 - contentWidth / 2,
    originX: isRTL ? "right" : "left",
    originY: "top"
  };
  const results = getPopoverPosition(isRTL, contentWidth, contentHeight, arrowWidth, arrowHeight, reference, side, align, defaultPosition, trigger, ev);
  const padding = size === "cover" ? 0 : POPOVER_IOS_BODY_PADDING;
  const rawSafeArea = getSafeAreaInsets(doc);
  const safeArea = size === "cover" ? { top: 0, bottom: 0, left: 0, right: 0 } : {
    top: Math.max(rawSafeArea.top, POPOVER_IOS_MIN_EDGE_MARGIN),
    bottom: Math.max(rawSafeArea.bottom, POPOVER_IOS_MIN_EDGE_MARGIN),
    left: Math.max(rawSafeArea.left, POPOVER_IOS_MIN_EDGE_MARGIN),
    right: Math.max(rawSafeArea.right, POPOVER_IOS_MIN_EDGE_MARGIN)
  };
  const { originX, originY, top, left, bottom, checkSafeAreaLeft, checkSafeAreaRight, checkSafeAreaTop, checkSafeAreaBottom, arrowTop, arrowLeft, addPopoverBottomClass } = calculateWindowAdjustment(side, results.top, results.left, padding, bodyWidth, bodyHeight, contentWidth, contentHeight, safeArea, results.originX, results.originY, results.referenceCoordinates, results.arrowTop, results.arrowLeft, arrowHeight);
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation();
  const contentAnimation = createAnimation();
  backdropAnimation.addElement(root.querySelector("ion-backdrop")).fromTo("opacity", 0.01, "var(--backdrop-opacity)").beforeStyles({
    "pointer-events": "none"
  }).afterClearStyles(["pointer-events"]);
  contentAnimation.addElement(root.querySelector(".popover-arrow")).addElement(root.querySelector(".popover-content")).fromTo("opacity", 0.01, 1);
  return baseAnimation.easing("ease").duration(100).beforeAddWrite(() => {
    if (size === "cover") {
      baseEl.style.setProperty("--width", `${contentWidth}px`);
    }
    if (addPopoverBottomClass) {
      baseEl.classList.add("popover-bottom");
    }
    if (bottom !== void 0) {
      let bottomValue = `${bottom}px`;
      if (checkSafeAreaBottom) {
        bottomValue = `${bottom}px + var(--ion-safe-area-bottom, 0px)`;
      }
      contentEl.style.setProperty("bottom", `calc(${bottomValue})`);
    }
    const safeAreaLeft = " + var(--ion-safe-area-left, 0px)";
    const safeAreaRight = " - var(--ion-safe-area-right, 0px)";
    let leftValue = `${left}px`;
    if (checkSafeAreaLeft) {
      leftValue = `${left}px${safeAreaLeft}`;
    }
    if (checkSafeAreaRight) {
      leftValue = `${left}px${safeAreaRight}`;
    }
    let topValue = `${top}px`;
    if (checkSafeAreaTop) {
      topValue = `${top}px + var(--ion-safe-area-top, 0px)`;
    }
    contentEl.style.setProperty("top", `calc(${topValue} + var(--offset-y, 0))`);
    contentEl.style.setProperty("left", `calc(${leftValue} + var(--offset-x, 0))`);
    contentEl.style.setProperty("transform-origin", `${originY} ${originX}`);
    if (arrowEl !== null) {
      const didAdjustBounds = results.top !== top || results.left !== left;
      const showArrow = shouldShowArrow(side, didAdjustBounds, ev, trigger);
      if (showArrow) {
        arrowEl.style.setProperty("top", `calc(${arrowTop}px + var(--offset-y, 0))`);
        arrowEl.style.setProperty("left", `calc(${arrowLeft}px + var(--offset-x, 0))`);
      } else {
        arrowEl.style.setProperty("display", "none");
      }
    }
  }).addAnimation([backdropAnimation, contentAnimation]);
};
var iosLeaveAnimation = (baseEl) => {
  const root = getElementRoot(baseEl);
  const contentEl = root.querySelector(".popover-content");
  const arrowEl = root.querySelector(".popover-arrow");
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation();
  const contentAnimation = createAnimation();
  backdropAnimation.addElement(root.querySelector("ion-backdrop")).fromTo("opacity", "var(--backdrop-opacity)", 0);
  contentAnimation.addElement(root.querySelector(".popover-arrow")).addElement(root.querySelector(".popover-content")).fromTo("opacity", 0.99, 0);
  return baseAnimation.easing("ease").afterAddWrite(() => {
    baseEl.style.removeProperty("--width");
    baseEl.classList.remove("popover-bottom");
    contentEl.style.removeProperty("top");
    contentEl.style.removeProperty("left");
    contentEl.style.removeProperty("bottom");
    contentEl.style.removeProperty("transform-origin");
    if (arrowEl) {
      arrowEl.style.removeProperty("top");
      arrowEl.style.removeProperty("left");
      arrowEl.style.removeProperty("display");
    }
  }).duration(300).addAnimation([backdropAnimation, contentAnimation]);
};
var POPOVER_MD_BODY_PADDING = 12;
var mdEnterAnimation = (baseEl, opts) => {
  const { event: ev, size, trigger, reference, side, align } = opts;
  const doc = baseEl.ownerDocument;
  const isRTL = doc.dir === "rtl";
  const bodyWidth = doc.defaultView.innerWidth;
  const bodyHeight = doc.defaultView.innerHeight;
  const root = getElementRoot(baseEl);
  const contentEl = root.querySelector(".popover-content");
  const referenceSizeEl = trigger || ev?.detail?.ionShadowTarget || ev?.target;
  const { contentWidth, contentHeight } = getPopoverDimensions(size, contentEl, referenceSizeEl);
  const defaultPosition = {
    top: bodyHeight / 2 - contentHeight / 2,
    left: bodyWidth / 2 - contentWidth / 2,
    originX: isRTL ? "right" : "left",
    originY: "top"
  };
  const results = getPopoverPosition(isRTL, contentWidth, contentHeight, 0, 0, reference, side, align, defaultPosition, trigger, ev);
  const padding = size === "cover" ? 0 : POPOVER_MD_BODY_PADDING;
  const safeArea = size === "cover" ? { top: 0, bottom: 0, left: 0, right: 0 } : getSafeAreaInsets(doc);
  const { originX, originY, top, left, bottom, checkSafeAreaLeft, checkSafeAreaRight, checkSafeAreaTop, checkSafeAreaBottom, addPopoverBottomClass } = calculateWindowAdjustment(side, results.top, results.left, padding, bodyWidth, bodyHeight, contentWidth, contentHeight, safeArea, results.originX, results.originY, results.referenceCoordinates);
  const safeAreaLeftCalc = " + var(--ion-safe-area-left, 0px)";
  const safeAreaRightCalc = " - var(--ion-safe-area-right, 0px)";
  let leftValue = `${left}px`;
  if (checkSafeAreaLeft) {
    leftValue = `${left}px${safeAreaLeftCalc}`;
  }
  if (checkSafeAreaRight) {
    leftValue = `${left}px${safeAreaRightCalc}`;
  }
  let topValue = `${top}px`;
  if (checkSafeAreaTop) {
    topValue = `${top}px + var(--ion-safe-area-top, 0px)`;
  }
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation();
  const wrapperAnimation = createAnimation();
  const contentAnimation = createAnimation();
  const viewportAnimation = createAnimation();
  backdropAnimation.addElement(root.querySelector("ion-backdrop")).fromTo("opacity", 0.01, "var(--backdrop-opacity)").beforeStyles({
    "pointer-events": "none"
  }).afterClearStyles(["pointer-events"]);
  wrapperAnimation.addElement(root.querySelector(".popover-wrapper")).duration(150).fromTo("opacity", 0.01, 1);
  contentAnimation.addElement(contentEl).beforeStyles({
    top: `calc(${topValue} + var(--offset-y, 0px))`,
    left: `calc(${leftValue} + var(--offset-x, 0px))`,
    "transform-origin": `${originY} ${originX}`
  }).beforeAddWrite(() => {
    if (bottom !== void 0) {
      let bottomValue = `${bottom}px`;
      if (checkSafeAreaBottom) {
        bottomValue = `${bottom}px + var(--ion-safe-area-bottom, 0px)`;
      }
      contentEl.style.setProperty("bottom", `calc(${bottomValue})`);
    }
  }).fromTo("transform", "scale(0.8)", "scale(1)");
  viewportAnimation.addElement(root.querySelector(".popover-viewport")).fromTo("opacity", 0.01, 1);
  return baseAnimation.easing("cubic-bezier(0.36,0.66,0.04,1)").duration(300).beforeAddWrite(() => {
    if (size === "cover") {
      baseEl.style.setProperty("--width", `${contentWidth}px`);
    }
    if (addPopoverBottomClass) {
      baseEl.classList.add("popover-bottom");
    }
  }).addAnimation([backdropAnimation, wrapperAnimation, contentAnimation, viewportAnimation]);
};
var mdLeaveAnimation = (baseEl) => {
  const root = getElementRoot(baseEl);
  const contentEl = root.querySelector(".popover-content");
  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation();
  const wrapperAnimation = createAnimation();
  backdropAnimation.addElement(root.querySelector("ion-backdrop")).fromTo("opacity", "var(--backdrop-opacity)", 0);
  wrapperAnimation.addElement(root.querySelector(".popover-wrapper")).fromTo("opacity", 0.99, 0);
  return baseAnimation.easing("ease").afterAddWrite(() => {
    baseEl.style.removeProperty("--width");
    baseEl.classList.remove("popover-bottom");
    contentEl.style.removeProperty("top");
    contentEl.style.removeProperty("left");
    contentEl.style.removeProperty("bottom");
    contentEl.style.removeProperty("transform-origin");
  }).duration(150).addAnimation([backdropAnimation, wrapperAnimation]);
};
var popoverIosCss = () => `:host{--background:var(--ion-background-color, #fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;--offset-x:0px;--offset-y:0px;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);z-index:1001}:host(.popover-nested){pointer-events:none}:host(.popover-nested) .popover-wrapper{pointer-events:auto}:host(.overlay-hidden){display:none}.popover-wrapper{z-index:10}.popover-content{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}::slotted(.popover-viewport){--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}:host(.popover-nested.popover-side-left){--offset-x:5px}:host(.popover-nested.popover-side-right){--offset-x:-5px}:host(.popover-nested.popover-side-start){--offset-x:5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-start),:host-context([dir=rtl]).popover-nested.popover-side-start{--offset-x:-5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-start:dir(rtl)){--offset-x:-5px}}:host(.popover-nested.popover-side-end){--offset-x:-5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-end),:host-context([dir=rtl]).popover-nested.popover-side-end{--offset-x:5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-end:dir(rtl)){--offset-x:5px}}:host(.select-popover-rich-content){--width:clamp(250px, calc(100vw - 40px), 400px)}:host{--width:200px;--max-height:90%;--box-shadow:none;--backdrop-opacity:var(--ion-backdrop-opacity, 0.08)}:host(.popover-desktop){--box-shadow:0px 4px 16px 0px rgba(0, 0, 0, 0.12)}.popover-content{border-radius:10px}:host(.popover-desktop) .popover-content{border:0.5px solid var(--ion-color-step-100, var(--ion-background-color-step-100, #e6e6e6))}.popover-arrow{display:block;position:absolute;width:20px;height:10px;overflow:hidden;z-index:11}.popover-arrow::after{top:3px;border-radius:3px;position:absolute;width:14px;height:14px;-webkit-transform:rotate(45deg);transform:rotate(45deg);background:var(--background);content:"";z-index:10}.popover-arrow::after{inset-inline-start:3px}:host(.popover-bottom) .popover-arrow{top:auto;bottom:-10px}:host(.popover-bottom) .popover-arrow::after{top:-6px}:host(.popover-side-left) .popover-arrow{-webkit-transform:rotate(90deg);transform:rotate(90deg)}:host(.popover-side-right) .popover-arrow{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}:host(.popover-side-top) .popover-arrow{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host(.popover-side-start) .popover-arrow{-webkit-transform:rotate(90deg);transform:rotate(90deg)}:host-context([dir=rtl]):host(.popover-side-start) .popover-arrow,:host-context([dir=rtl]).popover-side-start .popover-arrow{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}@supports selector(:dir(rtl)){:host(.popover-side-start:dir(rtl)) .popover-arrow{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}}:host(.popover-side-end) .popover-arrow{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}:host-context([dir=rtl]):host(.popover-side-end) .popover-arrow,:host-context([dir=rtl]).popover-side-end .popover-arrow{-webkit-transform:rotate(90deg);transform:rotate(90deg)}@supports selector(:dir(rtl)){:host(.popover-side-end:dir(rtl)) .popover-arrow{-webkit-transform:rotate(90deg);transform:rotate(90deg)}}.popover-arrow,.popover-content{opacity:0}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){:host(.popover-translucent) .popover-content,:host(.popover-translucent) .popover-arrow::after{background:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}}`;
var popoverMdCss = () => `:host{--background:var(--ion-background-color, #fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;--offset-x:0px;--offset-y:0px;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);z-index:1001}:host(.popover-nested){pointer-events:none}:host(.popover-nested) .popover-wrapper{pointer-events:auto}:host(.overlay-hidden){display:none}.popover-wrapper{z-index:10}.popover-content{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}::slotted(.popover-viewport){--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}:host(.popover-nested.popover-side-left){--offset-x:5px}:host(.popover-nested.popover-side-right){--offset-x:-5px}:host(.popover-nested.popover-side-start){--offset-x:5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-start),:host-context([dir=rtl]).popover-nested.popover-side-start{--offset-x:-5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-start:dir(rtl)){--offset-x:-5px}}:host(.popover-nested.popover-side-end){--offset-x:-5px}:host-context([dir=rtl]):host(.popover-nested.popover-side-end),:host-context([dir=rtl]).popover-nested.popover-side-end{--offset-x:5px}@supports selector(:dir(rtl)){:host(.popover-nested.popover-side-end:dir(rtl)){--offset-x:5px}}:host(.select-popover-rich-content){--width:clamp(250px, calc(100vw - 40px), 400px)}:host{--width:250px;--max-height:90%;--box-shadow:0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);--backdrop-opacity:var(--ion-backdrop-opacity, 0.32)}.popover-content{border-radius:4px;-webkit-transform-origin:left top;transform-origin:left top}:host-context([dir=rtl]) .popover-content{-webkit-transform-origin:right top;transform-origin:right top}[dir=rtl] .popover-content{-webkit-transform-origin:right top;transform-origin:right top}@supports selector(:dir(rtl)){.popover-content:dir(rtl){-webkit-transform-origin:right top;transform-origin:right top}}.popover-viewport{-webkit-transition-delay:100ms;transition-delay:100ms}.popover-wrapper{opacity:0}`;
var Popover = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.didPresent = createEvent(this, "ionPopoverDidPresent", 7);
    this.willPresent = createEvent(this, "ionPopoverWillPresent", 7);
    this.willDismiss = createEvent(this, "ionPopoverWillDismiss", 7);
    this.didDismiss = createEvent(this, "ionPopoverDidDismiss", 7);
    this.didPresentShorthand = createEvent(this, "didPresent", 7);
    this.willPresentShorthand = createEvent(this, "willPresent", 7);
    this.willDismissShorthand = createEvent(this, "willDismiss", 7);
    this.didDismissShorthand = createEvent(this, "didDismiss", 7);
    this.ionMount = createEvent(this, "ionMount", 7);
    this.parentPopover = null;
    this.coreDelegate = CoreDelegate();
    this.lockController = createLockController();
    this.inline = false;
    this.focusDescendantOnPresent = false;
    this.presented = false;
    this.hasController = false;
    this.keyboardClose = true;
    this.backdropDismiss = true;
    this.showBackdrop = true;
    this.translucent = false;
    this.animated = true;
    this.triggerAction = "click";
    this.size = "auto";
    this.dismissOnSelect = false;
    this.reference = "trigger";
    this.side = "bottom";
    this.arrow = true;
    this.isOpen = false;
    this.keyboardEvents = false;
    this.focusTrap = true;
    this.keepContentsMounted = false;
    this.onBackdropTap = () => {
      this.dismiss(void 0, BACKDROP);
    };
    this.onLifecycle = (modalEvent) => {
      const el = this.usersElement;
      const name = LIFECYCLE_MAP[modalEvent.type];
      if (el && name) {
        const event = new CustomEvent(name, {
          bubbles: false,
          cancelable: false,
          detail: modalEvent.detail
        });
        el.dispatchEvent(event);
      }
    };
    this.configureTriggerInteraction = () => {
      const { trigger, triggerAction, el, destroyTriggerInteraction } = this;
      if (destroyTriggerInteraction) {
        destroyTriggerInteraction();
      }
      if (trigger === void 0) {
        return;
      }
      const triggerEl = this.triggerEl = trigger !== void 0 ? document.getElementById(trigger) : null;
      if (!triggerEl) {
        printIonWarning(`[ion-popover] - A trigger element with the ID "${trigger}" was not found in the DOM. The trigger element must be in the DOM when the "trigger" property is set on ion-popover.`, this.el);
        return;
      }
      this.destroyTriggerInteraction = configureTriggerInteraction(triggerEl, triggerAction, el);
    };
    this.configureKeyboardInteraction = () => {
      const { destroyKeyboardInteraction, el } = this;
      if (destroyKeyboardInteraction) {
        destroyKeyboardInteraction();
      }
      this.destroyKeyboardInteraction = configureKeyboardInteraction(el);
    };
    this.configureDismissInteraction = () => {
      const { destroyDismissInteraction, parentPopover, triggerAction, triggerEl, el } = this;
      if (!parentPopover || !triggerEl) {
        return;
      }
      if (destroyDismissInteraction) {
        destroyDismissInteraction();
      }
      this.destroyDismissInteraction = configureDismissInteraction(triggerEl, triggerAction, el, parentPopover);
    };
  }
  onTriggerChange() {
    this.configureTriggerInteraction();
  }
  onIsOpenChange(newValue, oldValue) {
    if (newValue === true && oldValue === false) {
      this.present();
    } else if (newValue === false && oldValue === true) {
      this.dismiss();
    }
  }
  connectedCallback() {
    const { configureTriggerInteraction: configureTriggerInteraction2, el } = this;
    prepareOverlay(el);
    configureTriggerInteraction2();
    if (this.presented) {
      restoreRootFocusTrapAccessibility(el);
      this.recalculateContentOnHeaderReady();
    }
  }
  disconnectedCallback() {
    const { destroyTriggerInteraction } = this;
    if (destroyTriggerInteraction) {
      destroyTriggerInteraction();
    }
    if (this.headerResizeObserver) {
      this.headerResizeObserver.disconnect();
      this.headerResizeObserver = void 0;
    }
    if (this.presented) {
      cleanupRootFocusTrapAccessibility();
    }
  }
  componentWillLoad() {
    const { el } = this;
    const popoverId = this.htmlAttributes?.id ?? setOverlayId(el);
    this.parentPopover = el.closest(`ion-popover:not(#${popoverId})`);
    if (this.alignment === void 0) {
      this.alignment = getIonMode(this) === "ios" ? "center" : "start";
    }
  }
  componentDidLoad() {
    const { parentPopover, isOpen } = this;
    if (isOpen === true) {
      raf(() => this.present());
    }
    if (parentPopover) {
      addEventListener(parentPopover, "ionPopoverWillDismiss", () => {
        this.dismiss(void 0, void 0, false);
      });
    }
    this.configureTriggerInteraction();
  }
  /**
   * When opening a popover from a trigger, we should not be
   * modifying the `event` prop from inside the component.
   * Additionally, when pressing the "Right" arrow key, we need
   * to shift focus to the first descendant in the newly presented
   * popover.
   *
   * @internal
   */
  async presentFromTrigger(event, focusDescendant = false) {
    this.focusDescendantOnPresent = focusDescendant;
    await this.present(event);
    this.focusDescendantOnPresent = false;
  }
  /**
   * Determines whether or not an overlay
   * is being used inline or via a controller/JS
   * and returns the correct delegate.
   * By default, subsequent calls to getDelegate
   * will use a cached version of the delegate.
   * This is useful for calling dismiss after
   * present so that the correct delegate is given.
   */
  getDelegate(force = false) {
    if (this.workingDelegate && !force) {
      return {
        delegate: this.workingDelegate,
        inline: this.inline
      };
    }
    const parentEl = this.el.parentNode;
    const inline = this.inline = parentEl !== null && !this.hasController;
    const delegate = this.workingDelegate = inline ? this.delegate || this.coreDelegate : this.delegate;
    return { inline, delegate };
  }
  /**
   * Present the popover overlay after it has been created.
   * Developers can pass a mouse, touch, or pointer event
   * to position the popover relative to where that event
   * was dispatched.
   *
   * @param event The event to position the popover relative to.
   */
  async present(event) {
    const unlock = await this.lockController.lock();
    if (this.presented) {
      unlock();
      return;
    }
    const { el } = this;
    const { inline, delegate } = this.getDelegate(true);
    this.ionMount.emit();
    this.usersElement = await attachComponent(delegate, el, this.component, ["popover-viewport"], this.componentProps, inline);
    this.recalculateContentOnHeaderReady();
    if (!this.keyboardEvents) {
      this.configureKeyboardInteraction();
    }
    this.configureDismissInteraction();
    if (hasLazyBuild(el)) {
      await deepReady(this.usersElement);
    } else if (!this.keepContentsMounted) {
      await waitForMount();
    }
    await present(this, "popoverEnter", iosEnterAnimation, mdEnterAnimation, {
      event: event || this.event,
      size: this.size,
      trigger: this.triggerEl,
      reference: this.reference,
      side: this.side,
      align: this.alignment
    });
    if (this.focusDescendantOnPresent) {
      focusFirstDescendant(el);
    }
    unlock();
  }
  /**
   * Watch the header for height changes and trigger content dimension
   * recalculation when the header has a height > 0. This sets the offset-top
   * of the content to the height of the header correctly.
   */
  recalculateContentOnHeaderReady() {
    const popoverContent = this.el.shadowRoot?.querySelector(".popover-content");
    if (!popoverContent) {
      return;
    }
    const contentContainer = this.usersElement || popoverContent;
    const header = contentContainer.querySelector("ion-header");
    const contentElements = contentContainer.querySelectorAll("ion-content");
    if (!header || contentElements.length === 0) {
      return;
    }
    if (this.headerResizeObserver) {
      this.headerResizeObserver.disconnect();
      this.headerResizeObserver = void 0;
    }
    this.headerResizeObserver = new ResizeObserver(async () => {
      if (header.offsetHeight > 0) {
        this.headerResizeObserver?.disconnect();
        this.headerResizeObserver = void 0;
        for (const contentEl of contentElements) {
          await contentEl.recalculateDimensions();
        }
      }
    });
    this.headerResizeObserver.observe(header);
  }
  /**
   * Dismiss the popover overlay after it has been presented.
   * This is a no-op if the overlay has not been presented yet. If you want
   * to remove an overlay from the DOM that was never presented, use the
   * [remove](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) method.
   *
   * @param data Any data to emit in the dismiss events.
   * @param role The role of the element that is dismissing the popover. For example, `cancel` or `backdrop`.
   * @param dismissParentPopover If `true`, dismissing this popover will also dismiss
   * a parent popover if this popover is nested. Defaults to `true`.
   */
  async dismiss(data, role, dismissParentPopover = true) {
    const unlock = await this.lockController.lock();
    const { destroyKeyboardInteraction, destroyDismissInteraction } = this;
    if (dismissParentPopover && this.parentPopover) {
      this.parentPopover.dismiss(data, role, dismissParentPopover);
    }
    const shouldDismiss = await dismiss(this, data, role, "popoverLeave", iosLeaveAnimation, mdLeaveAnimation, this.event);
    if (shouldDismiss) {
      if (destroyKeyboardInteraction) {
        destroyKeyboardInteraction();
        this.destroyKeyboardInteraction = void 0;
      }
      if (destroyDismissInteraction) {
        destroyDismissInteraction();
        this.destroyDismissInteraction = void 0;
      }
      const { delegate } = this.getDelegate();
      await detachComponent(delegate, this.usersElement);
    }
    unlock();
    return shouldDismiss;
  }
  /**
   * @internal
   */
  async getParentPopover() {
    return this.parentPopover;
  }
  /**
   * Returns a promise that resolves when the popover did dismiss.
   */
  onDidDismiss() {
    return eventMethod(this.el, "ionPopoverDidDismiss");
  }
  /**
   * Returns a promise that resolves when the popover will dismiss.
   */
  onWillDismiss() {
    return eventMethod(this.el, "ionPopoverWillDismiss");
  }
  render() {
    const mode = getIonMode(this);
    const { onLifecycle, parentPopover, dismissOnSelect, side, arrow, htmlAttributes, focusTrap } = this;
    const desktop = isPlatform("desktop");
    const enableArrow = arrow && !parentPopover;
    return h(Host, __spreadProps(__spreadValues({ key: "b5e9c788f58397203976d5f8302dfb89e916efe1", "aria-modal": "true", "no-router": true, tabindex: "-1" }, htmlAttributes), { style: {
      zIndex: `${2e4 + this.overlayIndex}`
    }, class: __spreadProps(__spreadValues({}, getClassMap(this.cssClass)), {
      [mode]: true,
      "popover-translucent": this.translucent,
      "overlay-hidden": true,
      "popover-desktop": desktop,
      [`popover-side-${side}`]: true,
      [FOCUS_TRAP_DISABLE_CLASS]: focusTrap === false,
      "popover-nested": !!parentPopover
    }), onIonPopoverDidPresent: onLifecycle, onIonPopoverWillPresent: onLifecycle, onIonPopoverWillDismiss: onLifecycle, onIonPopoverDidDismiss: onLifecycle, onIonBackdropTap: this.onBackdropTap }), !parentPopover && h("ion-backdrop", { key: "f3977833c5b2c0087c286ee54363b478d69eb115", tappable: this.backdropDismiss, visible: this.showBackdrop, part: "backdrop" }), h("div", { key: "1059893d6fd2932ca8adcdf8d45a5d66f4794727", class: "popover-wrapper ion-overlay-wrapper", onClick: dismissOnSelect ? () => this.dismiss() : void 0 }, enableArrow && h("div", { key: "24d7988bdd95882ad77fcaa7112aeda55878bee4", class: "popover-arrow", part: "arrow" }), h("div", { key: "4d6992e0a9d629f11763045f9199f9a77fa521ab", class: "popover-content", part: "content" }, h("slot", { key: "b29747419620a01a6c34e9e846cd529b0b210145" }))));
  }
  get el() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "trigger": [{
        "onTriggerChange": 0
      }],
      "triggerAction": [{
        "onTriggerChange": 0
      }],
      "isOpen": [{
        "onIsOpenChange": 0
      }]
    };
  }
};
var LIFECYCLE_MAP = {
  ionPopoverDidPresent: "ionViewDidEnter",
  ionPopoverWillPresent: "ionViewWillEnter",
  ionPopoverWillDismiss: "ionViewWillLeave",
  ionPopoverDidDismiss: "ionViewDidLeave"
};
Popover.style = {
  ios: popoverIosCss(),
  md: popoverMdCss()
};
export {
  Popover as ion_popover
};
//# sourceMappingURL=ion-popover.entry-V4Z6ZS4Z.js.map
