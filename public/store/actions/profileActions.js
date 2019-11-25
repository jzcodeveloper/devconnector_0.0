import { Push } from "../../libs/router.js";

export default {
  //
  getCurrentProfile(context, payload) {
    context.commit("profileLoading");
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getProfile", responseObject);
        context.commit("getErrors", {});
      }
      if (req.readyState === 4 && req.status === 404) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getProfile", {});
        context.commit("getErrors", responseObject);
      }
    };
    req.open("GET", "/api/profile");
    req.setRequestHeader("Authorization", localStorage.Authorization);
    req.send(null);
  },
  //
  getProfileByHandle(context, payload) {
    context.commit("profileLoading");
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getProfile", responseObject);
        context.commit("getErrors", {});
      }
      if (req.readyState === 4 && req.status === 404) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getProfile", null);
        context.commit("getErrors", responseObject);
        Push("/not-found");
      }
    };
    req.open("GET", `/api/profile/handle/${payload}`);
    req.setRequestHeader("Authorization", localStorage.Authorization);
    req.send(null);
  },
  //
  createProfile(context, payload) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        context.commit("getErrors", {});
        context.dispatch("getCurrentProfile");
        Push("/dashboard");
      }
      if (req.readyState === 4 && req.status === 400) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getErrors", responseObject);
      }
    };
    req.open("POST", "/api/profile");
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("Authorization", localStorage.Authorization);
    req.send(JSON.stringify(payload));
  },
  //
  addExperience(context, payload) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        context.commit("getErrors", {});
        Push("/dashboard");
      }
      if (req.readyState === 4 && req.status === 400) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getErrors", responseObject);
      }
    };
    req.open("POST", "/api/profile/experience");
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("Authorization", localStorage.Authorization);
    req.send(JSON.stringify(payload));
  },
  //
  addEducation(context, payload) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        context.commit("getErrors", {});
        Push("/dashboard");
      }
      if (req.readyState === 4 && req.status === 400) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getErrors", responseObject);
      }
    };
    req.open("POST", "/api/profile/education");
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("Authorization", localStorage.Authorization);
    req.send(JSON.stringify(payload));
  },
  //
  deleteExperience(context, payload) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        context.commit("getErrors", {});
        context.dispatch("getCurrentProfile");
      }
      if (req.readyState === 4 && req.status === 400) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getErrors", responseObject);
      }
    };
    req.open("DELETE", `/api/profile/experience/${payload}`);
    req.setRequestHeader("Authorization", localStorage.Authorization);
    req.send(null);
  },
  //
  deleteEducation(context, payload) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        context.commit("getErrors", {});
        context.dispatch("getCurrentProfile");
      }
      if (req.readyState === 4 && req.status === 400) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getErrors", responseObject);
      }
    };
    req.open("DELETE", `/api/profile/education/${payload}`);
    req.setRequestHeader("Authorization", localStorage.Authorization);
    req.send(null);
  },
  //
  getProfiles(context, payload) {
    context.commit("profileLoading");
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getProfiles", responseObject);
        context.commit("getErrors", {});
      }
      if (req.readyState === 4 && req.status === 404) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getProfiles", null);
        context.commit("getErrors", responseObject);
      }
    };
    req.open("GET", "/api/profile/all");
    req.send(null);
  },
  //
  deleteAccount(context, payload) {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
      let req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        if (req.readyState === 4 && req.status === 200) {
          context.commit("setCurrentUser");
          context.dispatch("logoutUser");
        }
        if (req.readyState === 4 && req.status === 400) {
          let responseObject = JSON.parse(req.responseText);
          context.commit("getErrors", responseObject);
        }
      };
      req.open("DELETE", "/api/profile");
      req.setRequestHeader("Authorization", localStorage.Authorization);
      req.send(null);
    }
  },
  //
  profileLoading(context, payload) {
    context.commit("profileLoading");
  },
  //
  clearCurrentProfile(context, payload) {
    context.commit("clearCurrentProfile");
  }
};
