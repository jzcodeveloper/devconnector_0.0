import userState from "./userState.js";
import profileState from "./profileState.js";
import postState from "./postState.js";
import errorState from "./errorState.js";

export default {
  global: {
    ...userState,
    ...errorState,
    ...profileState,
    ...postState
  }
};
