import userMutations from "./userMutations.js";
import profileMutations from "./profileMutations.js";
import postMutations from "./postMutations.js";

export default {
  ...userMutations,
  ...profileMutations,
  ...postMutations
};
