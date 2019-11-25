import {
  div,
  h1,
  input,
  small,
  form,
  button,
  span,
  a
} from "../../libs/elements.js";
import { Push } from "../../libs/router.js";
import TextFieldGroup from "../common/TextFieldGroup.js";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.js";
import InputGroup from "../common/InputGroup.js";
import SelectListGroup from "../common/SelectListGroup.js";
import Component from "../../libs/component.js";
import store from "../../store/index.js";

export default new class EditProfile extends Component {
  constructor() {
    super({ element: ".editprofilep" });
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      getProfile: false,
      errors: {}
    };
  }

  onSocialClick(e) {
    e.preventDefault();
    this.setState({
      displaySocialInputs:
        this.state.displaySocialInputs === true ? false : true
    });
    this.render();
  }

  onClick(e) {
    e.preventDefault();
    Push(e.target.href);
  }

  onInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newProfile = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    store.dispatch("createProfile", newProfile);
  }

  didMount() {
    if (store.state.global.profile.profile && this.state.getProfile === false) {
      this.setState({ getProfile: true });
      const profile = store.state.global.profile.profile;
      const skills = profile.skills.join(",");
      profile.company = profile.company ? profile.company : "";
      profile.website = profile.website ? profile.website : "";
      profile.location = profile.location ? profile.location : "";
      profile.githubusername = profile.githubusername
        ? profile.githubusername
        : "";
      profile.bio = profile.bio ? profile.bio : "";
      profile.social = profile.social ? profile.social : {};
      profile.twitter = profile.social.twitter ? profile.social.twitter : "";
      profile.facebook = profile.social.facebook ? profile.social.facebook : "";
      profile.linkedin = profile.social.linkedin ? profile.social.linkedin : "";
      profile.youtube = profile.social.youtube ? profile.social.youtube : "";
      profile.instagram = profile.social.instagram
        ? profile.social.instagram
        : "";

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skills,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  render() {
    this.didMount();

    let socialInputs;
    if (this.state.displaySocialInputs === true) {
      socialInputs = div(
        {},
        InputGroup({
          placeholder: "Twitter Profile URL",
          name: "twitter",
          icon: "fab fa-twitter",
          value: this.state.twitter,
          onInput: this.onInput.bind(this),
          error: this.state.errors.twitter
        }),
        InputGroup({
          placeholder: "Facebook Page URL",
          name: "facebook",
          icon: "fab fa-facebook",
          value: this.state.facebook,
          onInput: this.onInput.bind(this),
          error: this.state.errors.facebook
        }),
        InputGroup({
          placeholder: "LinkedIn Profile URL",
          name: "linkedin",
          icon: "fab fa-linkedin",
          value: this.state.linkedin,
          onInput: this.onInput.bind(this),
          error: this.state.errors.linkedin
        }),
        InputGroup({
          placeholder: "YouTube Channel URL",
          name: "youtube",
          icon: "fab fa-youtube",
          value: this.state.youtube,
          onInput: this.onInput.bind(this),
          error: this.state.errors.youtube
        }),
        InputGroup({
          placeholder: "Instagram Page URL",
          name: "instagram",
          icon: "fab fa-instagram",
          value: this.state.instagram,
          onInput: this.onInput.bind(this),
          error: this.state.errors.instagram
        })
      );
    }

    //Select options
    const options = [
      { label: "Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    for (let i = 0; i < options.length; i++) {
      if (options[i].value === this.state.status) {
        options[i].selected = "true";
      }
    }

    document.querySelector(".editprofilep").innerHTML = "";
    document.querySelector(".editprofilep").appendChild(
      div(
        { className: "create-profile" },
        div(
          { className: "container" },
          div(
            { className: "row" },
            div(
              { className: "col-md-8 m-auto" },
              a(
                {
                  className: "btn btn-light",
                  href: "/dashboard",
                  onclick: this.onClick
                },
                "Go Back"
              ),
              h1({ className: "display-4 text-center" }, "Edit Profile"),
              small({ className: "d-block pb-3" }, "* = required fields"),
              form(
                { onsubmit: this.onSubmit.bind(this) },
                TextFieldGroup({
                  placeholder: "* Profile Handle",
                  name: "handle",
                  value: this.state.handle,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.handle,
                  info:
                    "A unique handle for your profile URL. Your full name, company name, nickname"
                }),
                SelectListGroup({
                  placeholder: "Status",
                  name: "status",
                  value: this.state.value,
                  onInput: this.onInput.bind(this),
                  options: options,
                  error: this.state.errors.status,
                  info: "Give us an idea of where you are at in your career"
                }),
                TextFieldGroup({
                  placeholder: "Company",
                  name: "company",
                  value: this.state.company,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.company,
                  info: "Could be your own company or one you work for"
                }),
                TextFieldGroup({
                  placeholder: "Website",
                  name: "website",
                  value: this.state.website,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.website,
                  info: "Could be your own company or a company one"
                }),
                TextFieldGroup({
                  placeholder: "Location",
                  name: "location",
                  value: this.state.location,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.location,
                  info: "City or City & state suggested (eg. Boston, MA)"
                }),
                TextFieldGroup({
                  placeholder: "* Skills",
                  name: "skills",
                  value: this.state.skills,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.skills,
                  info:
                    "Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                }),
                TextFieldGroup({
                  placeholder: "Github Username",
                  name: "githubusername",
                  value: this.state.githubusername,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.githubusername,
                  info:
                    "If you want your latest repos and a Github link, include your username"
                }),
                TextAreaFieldGroup({
                  placeholder: "Short Bio",
                  name: "bio",
                  value: this.state.bio,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.bio,
                  info: "Tell us a little about yourself"
                }),
                div(
                  { className: "mb-3" },
                  button(
                    {
                      className: "btn btn-light",
                      onclick: this.onSocialClick.bind(this),
                      type: "button"
                    },
                    "Add Social Network Links"
                  ),
                  span({ className: "text-muted" }, "Optional")
                ),
                socialInputs,
                input({
                  className: "btn btn-info btn-block mt-4",
                  type: "submit",
                  value: "Submit"
                })
              )
            )
          )
        )
      )
    );
  }
}();
