// node_modules/@ionic/core/dist/esm/lock-controller-B-hirT0v.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var createLockController = () => {
  let waitPromise;
  const lock = async () => {
    const p = waitPromise;
    let resolve;
    waitPromise = new Promise((r) => resolve = r);
    if (p !== void 0) {
      await p;
    }
    return resolve;
  };
  return {
    lock
  };
};

export {
  createLockController
};
//# sourceMappingURL=chunk-K2ATXY75.js.map
