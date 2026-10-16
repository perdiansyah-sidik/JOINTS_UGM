import {
  componentOnReady
} from "./chunk-ZEW2DO4D.js";

// node_modules/@ionic/core/dist/esm/framework-delegate-CUDbUfWS.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var attachComponent = async (delegate, container, component, cssClasses, componentProps, inline) => {
  if (delegate) {
    return delegate.attachViewToDom(container, component, componentProps, cssClasses);
  }
  if (!inline && typeof component !== "string" && !(component instanceof HTMLElement)) {
    throw new Error("framework delegate is missing");
  }
  const el = typeof component === "string" ? container.ownerDocument?.createElement(component) : component;
  if (cssClasses) {
    cssClasses.forEach((c) => el.classList.add(c));
  }
  if (componentProps) {
    Object.assign(el, componentProps);
  }
  container.appendChild(el);
  await new Promise((resolve) => componentOnReady(el, resolve));
  return el;
};
var detachComponent = (delegate, element) => {
  if (element) {
    if (delegate) {
      const container = element.parentElement;
      return delegate.removeViewFromDom(container, element);
    }
    element.remove();
  }
  return Promise.resolve();
};
var CoreDelegate = () => {
  let BaseComponent;
  let Reference;
  const attachViewToDom = async (parentElement, userComponent, userComponentProps = {}, cssClasses = []) => {
    BaseComponent = parentElement;
    let ChildComponent;
    if (userComponent) {
      const el = typeof userComponent === "string" ? BaseComponent.ownerDocument?.createElement(userComponent) : userComponent;
      cssClasses.forEach((c) => el.classList.add(c));
      Object.assign(el, userComponentProps);
      BaseComponent.appendChild(el);
      ChildComponent = el;
      await new Promise((resolve) => componentOnReady(el, resolve));
    } else if (BaseComponent.children.length > 0 && (BaseComponent.tagName === "ION-MODAL" || BaseComponent.tagName === "ION-POPOVER")) {
      const root = ChildComponent = BaseComponent.children[0];
      if (!root.classList.contains("ion-delegate-host")) {
        const el = BaseComponent.ownerDocument?.createElement("div");
        el.classList.add("ion-delegate-host");
        cssClasses.forEach((c) => el.classList.add(c));
        el.append(...BaseComponent.children);
        BaseComponent.appendChild(el);
        ChildComponent = el;
      }
    }
    const app = document.querySelector("ion-app") || document.body;
    Reference = document.createComment("ionic teleport");
    BaseComponent.parentNode.insertBefore(Reference, BaseComponent);
    app.appendChild(BaseComponent);
    return ChildComponent ?? BaseComponent;
  };
  const removeViewFromDom = () => {
    if (BaseComponent && Reference) {
      Reference.parentNode.insertBefore(BaseComponent, Reference);
      Reference.remove();
    }
    return Promise.resolve();
  };
  return { attachViewToDom, removeViewFromDom };
};

export {
  attachComponent,
  detachComponent,
  CoreDelegate
};
//# sourceMappingURL=chunk-XUMX4TJF.js.map
