import { div, a } from "../../libs/elements.js";
import { Push } from "../../libs/router.js";
import ProfileHeader from "./ProfileHeader.js";
import ProfileAbout from "./ProfileAbout.js";
import ProfileCreds from "./ProfileCreds.js";
import ProfileGithub from "./ProfileGithub.js";
import Spinner from "../common/Spinner.js";
import Component from "../../libs/component.js";
import store from "../../store/index.js";

export default new class Profile extends Component {
  constructor() {
    super({ element: ".profilep" });
    this.state = {
      didMount: false
    };
  }

  didMount() {
    if (this.state.didMount === false) {
      this.setState({ didMount: true });
      let param = window.location.pathname.split("/")[2];
      store.dispatch("getProfileByHandle", param);
    }
  }

  onClick(e) {
    e.preventDefault();
    Push(e.target.href);
  }

  render() {
    this.didMount();

    const { profile, loading } = store.state.global.profile;

    let profileContent;

    if (profile === null || loading) {
      profileContent = Spinner();
    } else {
      //Check if there are profiles
      if (profile.githubusername) {
        ProfileGithub.setGithubRepos();
      }

      profileContent = div(
        {},
        div(
          { className: "row" },
          div(
            { className: "col-md-6" },
            a(
              {
                href: "/profiles",
                className: "btn btn-light mb-3 float-left",
                onclick: this.onClick.bind(this)
              },
              "Back To Profiles"
            )
          ),
          div({ className: "col-md-6" })
        ),
        ProfileHeader({ profile }),
        ProfileAbout({ profile }),
        ProfileCreds({
          experience: profile.experience,
          education: profile.education
        }),
        div({ className: "github" })
      );
    }

    document.querySelector(".profilep").innerHTML = "";
    document
      .querySelector(".profilep")
      .appendChild(
        div(
          { className: "profile" },
          div(
            { className: "container" },
            div(
              { className: "row" },
              div({ className: "col-md-12" }, profileContent)
            )
          )
        )
      );
  }
}();
