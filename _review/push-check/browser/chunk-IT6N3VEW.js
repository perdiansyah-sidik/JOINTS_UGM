// node_modules/@ionic/core/dist/esm/overlay-control-label-BSQPZ79H.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var getOverlayLabelPlacement = (mode, control, interfaceType) => {
  if (mode === "ios" && control === "radio" && interfaceType !== "modal") {
    return "start";
  }
  return "end";
};
var getOverlayLabelJustify = (mode, control, interfaceType) => {
  if (mode === "ios" && control === "radio" && interfaceType !== "modal") {
    return "space-between";
  }
  return "start";
};

export {
  getOverlayLabelPlacement,
  getOverlayLabelJustify
};
//# sourceMappingURL=chunk-IT6N3VEW.js.map
