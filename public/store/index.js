import actions from "./actions/index.js";
import mutations from "./mutations/index.js";
import state from "./states/index.js";
import Store from "./store.js";

export default new Store({
  actions,
  mutations,
  state
});
