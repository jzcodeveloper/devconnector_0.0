import userActions from "./userActions.js";
import profileActions from "./profileActions.js";
import postActions from "./postActions.js";

export default {
  ...userActions,
  ...profileActions,
  ...postActions
};
