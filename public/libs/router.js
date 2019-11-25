import { div } from "../libs/elements.js";
import store from "../store/index.js";
import Login from "../components/auth/Login.js";
import Register from "../components/auth/Register.js";
import Navbar from "../components/layout/Navbar.js";
import Landing from "../components/layout/Landing.js";
import Footer from "../components/layout/Footer.js";
import Dashboard from "../components/dashboard/Dashboard.js";
import CreateProfile from "../components/create-profile/CreateProfile.js";
import EditProfile from "../components/edit-profile/EditProfile.js";
import AddExperience from "../components/add-credentials/AddExperience.js";
import AddEducation from "../components/add-credentials/AddEducation.js";
import Profiles from "../components/profiles/Profiles.js";
import Profile from "../components/profile/Profile.js";
import Posts from "../components/posts/Posts.js";
import Post from "../components/post/Post.js";
import NotFound from "../components/not-found/NotFound.js";

const o = window.location.origin;

const Push = url => {
  window.history.pushState("", "", url);
  Router();
};

const Router = () => {
  const h = window.location.href;
  if (store.state.global.auth.isAuthenticated === true) {
    if (h === o + "/" || h === o + "/login" || h === o + "/register") {
      Push("/dashboard");
    } else {
      Render();
    }
  } else {
    if (
      h === o + "/dashboard" ||
      h === o + "/create-profile" ||
      h === o + "/edit-profile" ||
      h === o + "/add-experience" ||
      h === o + "/add-education" ||
      h === o + "/feed" ||
      h === o + "/post/" + window.location.pathname.split("/")[2]
    ) {
      Push("/login");
    } else {
      Render();
    }
  }
};

const Render = () => {
  store.commit("getErrors", {});
  document.body.innerHTML = "";

  document.body.appendChild(Navbar());
  switch (window.location.href) {
    case o + "/":
      document.body.appendChild(Landing());
      break;

    case o + "/login":
      document.body.appendChild(div({ className: "loginp" }));
      Login.resetState();
      Login.render();
      break;

    case o + "/register":
      document.body.appendChild(div({ className: "registerp" }));
      Register.resetState();
      Register.render();
      break;

    case o + "/dashboard":
      document.body.appendChild(div({ className: "dashboardp" }));
      Dashboard.resetState();
      Dashboard.render();
      break;

    case o + "/create-profile":
      document.body.appendChild(div({ className: "createprofilep" }));
      CreateProfile.resetState();
      CreateProfile.render();
      break;

    case o + "/edit-profile":
      document.body.appendChild(div({ className: "editprofilep" }));
      EditProfile.resetState();
      EditProfile.render();
      break;

    case o + "/add-experience":
      document.body.appendChild(div({ className: "addexperiencep" }));
      AddExperience.resetState();
      AddExperience.render();
      break;

    case o + "/add-education":
      document.body.appendChild(div({ className: "addeducationp" }));
      AddEducation.resetState();
      AddEducation.render();
      break;

    case o + "/profiles":
      document.body.appendChild(div({ className: "profilesp" }));
      Profiles.resetState();
      Profiles.render();
      break;

    case o + "/profile/" + window.location.pathname.split("/")[2]:
      document.body.appendChild(div({ className: "profilep" }));
      Profile.resetState();
      Profile.render();
      break;

    case o + "/post/" + window.location.pathname.split("/")[2]:
      document.body.appendChild(div({ className: "postp" }));
      Post.resetState();
      Post.render();
      break;

    case o + "/feed":
      document.body.appendChild(div({ className: "feedp" }));
      Posts.resetState();
      Posts.render();
      break;

    default:
      document.body.appendChild(NotFound());
      break;
  }
  document.body.appendChild(Footer());
};

export { Push, Router, Render };
