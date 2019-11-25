import { Router } from "./libs/router.js";
import store from "./store/index.js";

function initialize() {
  if (localStorage.Authorization) {
    store.dispatch("setCurrentUser", localStorage.Authorization);
  } else {
    Router();
  }
  window.addEventListener("popstate", Router);
}

window.addEventListener("load", initialize);
