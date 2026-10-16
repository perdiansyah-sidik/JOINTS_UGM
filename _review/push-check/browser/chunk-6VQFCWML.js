import {
  Keyboard,
  KeyboardResize
} from "./chunk-PNMRWMUL.js";
import {
  doc,
  win
} from "./chunk-ZEW2DO4D.js";

// node_modules/@ionic/core/dist/esm/keyboard-controller-BLvRgxgP.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var getResizeContainer = (resizeMode) => {
  if (doc === void 0 || resizeMode === KeyboardResize.None || resizeMode === void 0) {
    return null;
  }
  const ionApp = doc.querySelector("ion-app");
  return ionApp ?? doc.body;
};
var getResizeContainerHeight = (resizeMode) => {
  const containerElement = getResizeContainer(resizeMode);
  return containerElement === null ? 0 : containerElement.clientHeight;
};
var createKeyboardController = async (keyboardChangeCallback) => {
  let keyboardWillShowHandler;
  let keyboardWillHideHandler;
  let keyboardVisible;
  let initialResizeContainerHeight;
  const init = async () => {
    const resizeOptions = await Keyboard.getResizeMode();
    const resizeMode = resizeOptions === void 0 ? void 0 : resizeOptions.mode;
    keyboardWillShowHandler = () => {
      if (initialResizeContainerHeight === void 0) {
        initialResizeContainerHeight = getResizeContainerHeight(resizeMode);
      }
      keyboardVisible = true;
      fireChangeCallback(keyboardVisible, resizeMode);
    };
    keyboardWillHideHandler = () => {
      keyboardVisible = false;
      fireChangeCallback(keyboardVisible, resizeMode);
    };
    win?.addEventListener("keyboardWillShow", keyboardWillShowHandler);
    win?.addEventListener("keyboardWillHide", keyboardWillHideHandler);
  };
  const fireChangeCallback = (state, resizeMode) => {
    if (keyboardChangeCallback) {
      keyboardChangeCallback(state, createResizePromiseIfNeeded(resizeMode));
    }
  };
  const createResizePromiseIfNeeded = (resizeMode) => {
    if (
      /**
       * If we are in an SSR environment then there is
       * no window to resize. Additionally, if there
       * is no resize mode or the resize mode is "None"
       * then initialResizeContainerHeight will be 0
       */
      initialResizeContainerHeight === 0 || /**
       * If the keyboard is closed before the webview resizes initially
       * then the webview will never resize.
       */
      initialResizeContainerHeight === getResizeContainerHeight(resizeMode)
    ) {
      return;
    }
    const containerElement = getResizeContainer(resizeMode);
    if (containerElement === null) {
      return;
    }
    return new Promise((resolve) => {
      const callback = () => {
        if (containerElement.clientHeight === initialResizeContainerHeight) {
          ro.disconnect();
          resolve();
        }
      };
      const ro = new ResizeObserver(callback);
      ro.observe(containerElement);
    });
  };
  const destroy = () => {
    win?.removeEventListener("keyboardWillShow", keyboardWillShowHandler);
    win?.removeEventListener("keyboardWillHide", keyboardWillHideHandler);
    keyboardWillShowHandler = keyboardWillHideHandler = void 0;
  };
  const isKeyboardVisible = () => keyboardVisible;
  await init();
  return { init, destroy, isKeyboardVisible };
};

export {
  createKeyboardController
};
//# sourceMappingURL=chunk-6VQFCWML.js.map
