import {
  componentOnReady
} from "./chunk-ZEW2DO4D.js";
import {
  printRequiredElementError
} from "./chunk-IDLJUR4P.js";

// node_modules/@ionic/core/dist/esm/index-obGyiHiO.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var ION_CONTENT_TAG_NAME = "ION-CONTENT";
var ION_CONTENT_ELEMENT_SELECTOR = "ion-content";
var ION_CONTENT_CLASS_SELECTOR = ".ion-content-scroll-host";
var ION_CONTENT_SELECTOR = `${ION_CONTENT_ELEMENT_SELECTOR}, ${ION_CONTENT_CLASS_SELECTOR}`;
var isIonContent = (el) => el.tagName === ION_CONTENT_TAG_NAME;
var getScrollElement = async (el) => {
  if (isIonContent(el)) {
    await new Promise((resolve) => componentOnReady(el, resolve));
    return el.getScrollElement();
  }
  return el;
};
var findIonContent = (el) => {
  const customContentHost = el.querySelector(ION_CONTENT_CLASS_SELECTOR);
  if (customContentHost) {
    return customContentHost;
  }
  return el.querySelector(ION_CONTENT_SELECTOR);
};
var findClosestIonContent = (el) => {
  return el.closest(ION_CONTENT_SELECTOR);
};
var findRefresherScrollHost = (ionContent) => {
  return ionContent.querySelector(ION_CONTENT_CLASS_SELECTOR);
};
var findRefresherInContent = (contentEl) => {
  if (isIonContent(contentEl)) {
    return contentEl.querySelector("ion-refresher");
  }
  const ionContent = contentEl.closest(ION_CONTENT_ELEMENT_SELECTOR);
  if (ionContent === null) {
    return null;
  }
  const refresherScrollHost = findRefresherScrollHost(ionContent);
  if (refresherScrollHost === null || !refresherScrollHost.contains(contentEl)) {
    return null;
  }
  return ionContent.querySelector("ion-refresher");
};
var scrollToTop = (el, durationMs) => {
  if (isIonContent(el)) {
    const content = el;
    return content.scrollToTop(durationMs);
  }
  return Promise.resolve(el.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  }));
};
var scrollByPoint = (el, x, y, durationMs) => {
  if (isIonContent(el)) {
    const content = el;
    return content.scrollByPoint(x, y, durationMs);
  }
  return Promise.resolve(el.scrollBy({
    top: y,
    left: x,
    behavior: durationMs > 0 ? "smooth" : "auto"
  }));
};
var printIonContentErrorMsg = (el) => {
  return printRequiredElementError(el, ION_CONTENT_ELEMENT_SELECTOR);
};
var disableContentScrollY = (contentEl) => {
  if (isIonContent(contentEl)) {
    const ionContent = contentEl;
    const initialScrollY = ionContent.scrollY;
    ionContent.scrollY = false;
    return initialScrollY;
  } else {
    contentEl.style.setProperty("overflow", "hidden");
    return true;
  }
};
var resetContentScrollY = (contentEl, initialScrollY) => {
  if (isIonContent(contentEl)) {
    contentEl.scrollY = initialScrollY;
  } else {
    contentEl.style.removeProperty("overflow");
  }
};

export {
  ION_CONTENT_ELEMENT_SELECTOR,
  ION_CONTENT_CLASS_SELECTOR,
  isIonContent,
  getScrollElement,
  findIonContent,
  findClosestIonContent,
  findRefresherScrollHost,
  findRefresherInContent,
  scrollToTop,
  scrollByPoint,
  printIonContentErrorMsg,
  disableContentScrollY,
  resetContentScrollY
};
//# sourceMappingURL=chunk-G2KBMZHL.js.map
