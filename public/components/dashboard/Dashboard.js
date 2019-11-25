import { button, div, h1, p, a } from "../../libs/elements.js";
import { Push } from "../../libs/router.js";
import Spinner from "../common/Spinner.js";
import ProfileActions from "./ProfileActions.js";
import Experience from "./Experience.js";
import Education from "./Education.js";
import Component from "../../libs/component.js";
import store from "../../store/index.js";

export default new class Dashboard extends Component {
  constructor() {
    super({ element: ".dashboardp" });
    this.state = {
      didMount: false
    };
  }

  didMount() {
    if (this.state.didMount === false) {
      this.setState({ didMount: true });
      store.dispatch("getCurrentProfile");
    }
  }

  onClick(e) {
    e.preventDefault();
    Push(e.target.href);
  }

  onDeleteClick(e) {
    e.preventDefault();
    store.dispatch("deleteAccount");
  }

  render() {
    this.didMount();

    const { profile, loading } = store.state.global.profile;
    const { user } = store.state.global.auth;

    let dashboardContent;
    if (profile === null || loading) {
      dashboardContent = Spinner();
    } else {
      //Check if user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = div(
          {},
          p(
            { className: "lead text-muted" },
            "Welcome ",
            a(
              {
                href: `/profile/${profile.handle}`,
                onclick: this.onClick.bind(this)
              },
              profile.handle
            )
          ),
          ProfileActions(),
          Experience({ experience: profile.experience }),
          Education({ education: profile.education }),
          div(
            { style: { marginBottom: "60px" } },
            button(
              {
                className: "btn btn-danger",
                onclick: this.onDeleteClick.bind(this)
              },
              "Delete My Account"
            )
          )
        );
      } else {
        dashboardContent = div(
          {},
          p({ className: "lead text-muted" }, `Welcome ${user.name}`),
          p("You have not yet setup a profile, please add some info"),
          a(
            {
              className: "btn btn-lg btn-info",
              href: "/create-profile",
              onclick: this.onClick.bind(this)
            },
            "Create Profile"
          )
        );
      }
    }

    document.querySelector(".dashboardp").innerHTML = "";
    document
      .querySelector(".dashboardp")
      .appendChild(
        div(
          { className: "dashboard" },
          div(
            { className: "container" },
            div(
              { className: "row" },
              div(
                { className: "col-md-12" },
                h1({ className: "display-4" }, "Dashboard"),
                dashboardContent
              )
            )
          )
        )
      );
  }
}();
