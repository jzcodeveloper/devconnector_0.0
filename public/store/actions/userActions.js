import { Push, Router } from "../../libs/router.js";

export default {
  //
  registerUser(context, payload) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("registerUser", responseObject);
        context.commit("getErrors", {});
        Push("/login");
      }
      if (req.readyState === 4 && req.status === 400) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getErrors", responseObject);
      }
    };
    req.open("POST", "/api/users/register");
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(payload));
  },
  //
  loginUser(context, payload) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        let responseObject = JSON.parse(req.responseText);
        localStorage.setItem("Authorization", responseObject.token);
        context.dispatch("setCurrentUser", responseObject.token);
        context.commit("getErrors", {});
        Push("/dashboard");
      }
      if (req.readyState === 4 && req.status === 400) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getErrors", responseObject);
      }
      if (req.readyState === 4 && req.status === 404) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getErrors", responseObject);
      }
    };
    req.open("POST", "/api/users/login");
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(payload));
  },
  //
  setCurrentUser(context, payload) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("setCurrentUser", responseObject);
        Router();
      }
      if (req.readyState === 4 && req.status === 401) {
        context.dispatch("logoutUser");
        Push("/login");
      }
    };
    req.open("GET", "/api/users/decode");
    req.setRequestHeader("Authorization", payload);
    req.send(null);
  },
  //
  logoutUser(context, payload) {
    context.commit("setCurrentUser");
    localStorage.removeItem("Authorization");
    context.commit("clearCurrentProfile");
    Push("/login");
  }
};
