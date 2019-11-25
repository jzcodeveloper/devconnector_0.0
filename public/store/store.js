export default class Store {
  constructor(params) {
    let self = this;
    self.actions = {};
    self.mutations = {};
    self.state = {};
    self.status = "resting";

    if (params.hasOwnProperty("actions")) {
      self.actions = params.actions;
    }

    if (params.hasOwnProperty("mutations")) {
      self.mutations = params.mutations;
    }

    self.state = new Proxy(params.state || {}, {
      set: function(state, key, value) {
        state[key] = value;

        self.event = new CustomEvent("stateChange", {
          detail: {
            state: self.state
          }
        });
        window.dispatchEvent(self.event);

        if (self.status !== "mutation") {
          console.warn(`You should use a mutation to set ${key}`);
        }

        self.status = "resting";

        return true;
      }
    });
  }

  dispatch(actionKey, payload) {
    let self = this;

    if (typeof self.actions[actionKey] !== "function") {
      console.error(`Action "${actionKey}" doesn't exist.`);
      return false;
    }

    console.groupCollapsed(`ACTION: ${actionKey}`);
    console.log(self.state.global);
    console.groupEnd();

    self.status = "action";

    self.actions[actionKey](self, payload);

    return true;
  }

  commit(mutationKey, payload) {
    let self = this;

    if (typeof self.mutations[mutationKey] !== "function") {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    console.groupCollapsed(`MUTATION: ${mutationKey}`);
    console.log(self.state.global);
    console.groupEnd();

    self.status = "mutation";

    let newState = self.mutations[mutationKey](self.state, payload);

    self.state = Object.assign(self.state, newState);

    return true;
  }
}
