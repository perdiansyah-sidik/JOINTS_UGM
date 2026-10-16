import {
  findClosestIonContent,
  scrollToTop
} from "./chunk-G2KBMZHL.js";
import {
  componentOnReady
} from "./chunk-ZEW2DO4D.js";
import "./chunk-AWSGH3DX.js";
import {
  readTask,
  writeTask
} from "./chunk-IDLJUR4P.js";
import "./chunk-PAXKX5KU.js";

// node_modules/@ionic/core/dist/esm/status-tap-BsTKKfug.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var startStatusTap = () => {
  const win = window;
  win.addEventListener("statusTap", () => {
    readTask(() => {
      const width = win.innerWidth;
      const height = win.innerHeight;
      const el = document.elementFromPoint(width / 2, height / 2);
      if (!el) {
        return;
      }
      const contentEl = findClosestIonContent(el);
      if (contentEl) {
        new Promise((resolve) => componentOnReady(contentEl, resolve)).then(() => {
          writeTask(async () => {
            contentEl.style.setProperty("--overflow", "hidden");
            await scrollToTop(contentEl, 300);
            contentEl.style.removeProperty("--overflow");
          });
        });
      }
    });
  });
};
export {
  startStatusTap
};
//# sourceMappingURL=status-tap-BsTKKfug-PN7KFSZS.js.map
