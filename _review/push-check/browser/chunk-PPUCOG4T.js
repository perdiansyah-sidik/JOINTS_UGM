// node_modules/@ionic/core/dist/esm/item-multiple-inputs-CffmpUe9.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var createItemMultipleInputsObserver = (el, onChange, classNames = ["item-multiple-inputs"]) => {
  const item = el.closest("ion-item");
  if (!item || false || typeof MutationObserver === "undefined") {
    return void 0;
  }
  const readClasses = () => classNames.map((name) => item.classList.contains(name)).join(",");
  let previousClasses = readClasses();
  const observer = new MutationObserver(() => {
    const currentClasses = readClasses();
    if (currentClasses !== previousClasses) {
      previousClasses = currentClasses;
      onChange();
    }
  });
  observer.observe(item, { attributes: true, attributeFilter: ["class"] });
  return observer;
};

export {
  createItemMultipleInputsObserver
};
//# sourceMappingURL=chunk-PPUCOG4T.js.map
