import { div, h1, p, h4 } from "../../libs/elements.js";
import Spinner from "../common/Spinner.js";
import ProfileItem from "./ProfileItem.js";
import Component from "../../libs/component.js";
import store from "../../store/index.js";

export default new class Profiles extends Component {
  constructor() {
    super({ element: ".profilesp" });
    this.state = {
      didMount: false
    };
  }

  didMount() {
    if (this.state.didMount === false) {
      this.setState({ didMount: true });
      store.dispatch("getProfiles");
    }
  }

  render() {
    this.didMount();

    const { profiles, loading } = store.state.global.profile;

    let profileItems;

    if (profiles === null || loading) {
      profileItems = Spinner();
    } else {
      //Check if there are profiles
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => ProfileItem({ profile }));
      } else {
        profileItems = h4("No profiles found...");
      }
    }

    let profileItemsDiv =
      Object.keys(profileItems).length === 0
        ? div(profileItems)
        : div(...profileItems);

    document.querySelector(".profilesp").innerHTML = "";
    document
      .querySelector(".profilesp")
      .appendChild(
        div(
          { className: "profiles" },
          div(
            { className: "container" },
            div(
              { className: "row" },
              div(
                { className: "col-md-12" },
                h1(
                  { className: "display-4 text-center" },
                  "Developer Profiles"
                ),
                p(
                  { className: "lead text-center" },
                  "Browse and connect with developers"
                ),
                profileItemsDiv
              )
            )
          )
        )
      );
  }
}();
