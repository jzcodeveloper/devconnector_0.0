export default class Component {
  constructor(props) {
    this.element = props.element || "any";

    window.addEventListener("stateChange", e => {
      if (this.state.hasOwnProperty("errors")) {
        this.state.errors = e.detail.state.global.errors;
      }
      if (document.querySelector(this.element)) {
        this.render();
      }
    });
  }

  setState(props) {
    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        this.state[key] = props[key];
      }
    }
  }

  resetState() {
    for (const key in this.state) {
      if (typeof this.state[key] === "string") {
        this.state[key] = "";
      }
      if (typeof this.state[key] === "object") {
        this.state[key] = {};
      }
      if (typeof this.state[key] === "boolean") {
        this.state[key] = false;
      }
      if (typeof this.state[key] === "array") {
        this.state[key] = [];
      }
    }
  }
}
