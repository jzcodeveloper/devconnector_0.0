//Appends text
function appendText(element, text) {
  const textNode = document.createTextNode(text);
  element.appendChild(textNode);
}

//Appends an array
function appendArray(el, ...children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      appendArray(el, children[i]);
    } else if (children[i] instanceof window.Element) {
      el.appendChild(children[i]);
    } else if (typeof children[i] === `string`) {
      appendText(el, children[i]);
    }
  }
}

//Apply styles
function setStyles(element, styles) {
  if (!styles) {
    element.removeAttribute(`styles`);
    return;
  }

  for (var styleName in styles) {
    if (styleName in element.style) {
      element.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
    } else {
      console.warn(
        `${styleName} is not a valid style for a <${element.tagName.toLowerCase()}>`
      );
    }
  }
}

//Creates an element
function makeElement(type, textOrPropsOrChild, ...otherChildren) {
  const element = document.createElement(type);

  //Appends an array to the element
  if (Array.isArray(textOrPropsOrChild)) {
    appendArray(element, textOrPropsOrChild);
    //Appends a node to the element
  } else if (textOrPropsOrChild instanceof window.Element) {
    element.appendChild(textOrPropsOrChild);
    //Appends text to the element
  } else if (typeof textOrPropsOrChild === `string`) {
    appendText(element, textOrPropsOrChild);
    //Adds attributes to the element
  } else if (typeof textOrPropsOrChild === `object`) {
    for (var propName in textOrPropsOrChild) {
      if (propName in element) {
        const value = textOrPropsOrChild[propName];

        if (propName === `style`) {
          setStyles(element, value);
        } else if (value) {
          element[propName] = value;
        }
      } else {
        console.warn(`${propName} is not a valid property of a <${type}>`);
      }
    }
  }

  if (otherChildren) appendArray(element, ...otherChildren);

  return element;
}

export const a = (...args) => makeElement(`a`, ...args);
export const i = (...args) => makeElement(`i`, ...args);
export const button = (...args) => makeElement(`button`, ...args);
export const input = (...args) => makeElement(`input`, ...args);
export const div = (...args) => makeElement(`div`, ...args);
export const img = (...args) => makeElement(`img`, ...args);
export const h1 = (...args) => makeElement(`h1`, ...args);
export const h3 = (...args) => makeElement(`h3`, ...args);
export const h4 = (...args) => makeElement(`h4`, ...args);
export const h6 = (...args) => makeElement(`h6`, ...args);
export const ul = (...args) => makeElement(`ul`, ...args);
export const li = (...args) => makeElement(`li`, ...args);
export const header = (...args) => makeElement(`header`, ...args);
export const nav = (...args) => makeElement(`nav`, ...args);
export const p = (...args) => makeElement(`p`, ...args);
export const form = (...args) => makeElement(`form`, ...args);
export const small = (...args) => makeElement(`small`, ...args);
export const span = (...args) => makeElement(`span`, ...args);
export const strong = (...args) => makeElement(`strong`, ...args);
export const footer = (...args) => makeElement(`footer`, ...args);
export const textarea = (...args) => makeElement(`textarea`, ...args);
export const option = (...args) => makeElement(`option`, ...args);
export const select = (...args) => makeElement(`select`, ...args);
export const label = (...args) => makeElement(`label`, ...args);
export const table = (...args) => makeElement(`table`, ...args);
export const thead = (...args) => makeElement(`thead`, ...args);
export const th = (...args) => makeElement(`th`, ...args);
export const tr = (...args) => makeElement(`tr`, ...args);
export const td = (...args) => makeElement(`td`, ...args);
export const br = (...args) => makeElement(`br`, ...args);
