import { Push } from "../../libs/router.js";

export default {
  //
  addPost(context, payload) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("addPost", responseObject);
        context.commit("getErrors", {});
      }
      if (req.readyState === 4 && req.status === 400) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getErrors", responseObject);
      }
    };
    req.open("POST", "/api/posts");
    req.setRequestHeader("Authorization", localStorage.Authorization);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(payload));
  },
  //
  getPosts(context, payload) {
    context.commit("postLoading");
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getPosts", responseObject);
      }
      if (req.readyState === 4 && req.status === 400) {
        context.commit("getPosts", null);
      }
    };
    req.open("GET", "/api/posts");
    req.setRequestHeader("Authorization", localStorage.Authorization);
    req.send(null);
  },
  //
  getPost(context, payload) {
    context.commit("postLoading");
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getPost", responseObject);
      }
      if (req.readyState === 4 && req.status === 404) {
        context.commit("getPost", null);
        Push("/not-found");
      }
    };
    req.open("GET", `/api/posts/${payload}`);
    req.setRequestHeader("Authorization", localStorage.Authorization);
    req.send(null);
  },
  //
  deletePost(context, payload) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        context.commit("deletePost", payload);
        context.commit("getErrors", {});
      }
      if (req.readyState === 4 && req.status === 400) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getErrors", responseObject);
      }
    };
    req.open("DELETE", `/api/posts/${payload}`);
    req.setRequestHeader("Authorization", localStorage.Authorization);
    req.send(null);
  },
  //
  addLike(context, payload) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        context.dispatch("getPosts");
        context.commit("getErrors", {});
      }
      if (req.readyState === 4 && req.status === 400) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getErrors", responseObject);
      }
    };
    req.open("POST", `/api/posts/like/${payload}`);
    req.setRequestHeader("Authorization", localStorage.Authorization);
    req.setRequestHeader("Content-type", "application/json");
    req.send(null);
  },
  //
  removeLike(context, payload) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        context.dispatch("getPosts");
        context.commit("getErrors", {});
      }
      if (req.readyState === 4 && req.status === 400) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getErrors", responseObject);
      }
    };
    req.open("POST", `/api/posts/unlike/${payload}`);
    req.setRequestHeader("Authorization", localStorage.Authorization);
    req.setRequestHeader("Content-type", "application/json");
    req.send(null);
  },
  //
  addComment(context, payload) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getPost", responseObject);
        context.commit("getErrors", {});
      }
      if (req.readyState === 4 && req.status === 400) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getErrors", responseObject);
      }
    };
    req.open("POST", `/api/posts/comment/${payload.postId}`);
    req.setRequestHeader("Authorization", localStorage.Authorization);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(payload));
  },
  //
  deleteComment(context, payload) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getPost", responseObject);
        context.commit("getErrors", {});
      }
      if (req.readyState === 4 && req.status === 400) {
        let responseObject = JSON.parse(req.responseText);
        context.commit("getErrors", responseObject);
      }
    };
    req.open(
      "DELETE",
      `/api/posts/comment/${payload.postId}/${payload.commentId}`
    );
    req.setRequestHeader("Authorization", localStorage.Authorization);
    req.send(null);
  }
};
