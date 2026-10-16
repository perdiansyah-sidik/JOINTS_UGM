import {
  sanitizeDOMTree
} from "./chunk-KJC3JPTO.js";
import {
  h
} from "./chunk-IDLJUR4P.js";

// node_modules/@ionic/core/dist/esm/select-option-render-C_PCwA67.js
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
var cloneToVNode = (node, keyPrefix, index) => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent ?? "";
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }
  const el = node;
  const tag = el.tagName.toLowerCase();
  const key = `${keyPrefix}-${index}`;
  const attrs = { key };
  for (let i = 0; i < el.attributes.length; i++) {
    const attr = el.attributes.item(i);
    attrs[attr.name] = attr.value;
  }
  const children = Array.from(el.childNodes).map((child, i) => cloneToVNode(child, key, i)).filter((c) => c !== null);
  return h(tag, attrs, children);
};
var renderClonedContent = (id, content, className, useSpan = false) => {
  const Tag = useSpan ? "span" : "div";
  const keyPrefix = `${className}-${id}`;
  sanitizeDOMTree(content);
  return h(Tag, { class: className, key: keyPrefix }, Array.from(content.childNodes).map((child, i) => cloneToVNode(child, keyPrefix, i)));
};
var renderOptionLabel = (option, className, useSpan = false) => {
  const { id, label, startContent, endContent, description } = option;
  const hasRichContent = !!startContent || !!endContent || !!description;
  const Tag = useSpan ? "span" : "div";
  if (!hasRichContent && (typeof label === "string" || !label)) {
    return h(Tag, { class: className, key: `${className}-${id}` }, label);
  }
  const labelEl = typeof label === "string" || !label ? (
    // Label is a simple string or undefined
    h(Tag, { key: `${className}-label-${id}` }, label)
  ) : (
    // Label is an HTMLElement with potential rich content
    renderClonedContent(id, label, `${className}-text`, useSpan)
  );
  if (!hasRichContent) {
    return h(Tag, { class: className, key: `${className}-${id}` }, labelEl);
  }
  return h(Tag, { class: `${className} ${className}-has-rich-content`, key: `${className}-${id}` }, startContent && renderClonedContent(id, startContent, "select-option-start", useSpan), h(Tag, { class: "select-option-content", key: `${className}-content-${id}` }, labelEl, description && h(Tag, { class: "select-option-description", key: `${className}-desc-${id}` }, description)), endContent && renderClonedContent(id, endContent, "select-option-end", useSpan));
};

export {
  renderOptionLabel
};
//# sourceMappingURL=chunk-GOK7PKOL.js.map
