import {
  div,
  h1,
  p,
  input,
  a,
  small,
  form,
  h6,
  label
} from "../../libs/elements.js";
import { Push } from "../../libs/router.js";
import TextFieldGroup from "../common/TextFieldGroup.js";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.js";
import Component from "../../libs/component.js";
import store from "../../store/index.js";

export default new class AddExperience extends Component {
  constructor() {
    super({ element: ".addexperiencep" });
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      disabled: false,
      errors: {}
    };
  }

  onClick(e) {
    e.preventDefault();
    Push(e.target.href);
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
    this.render();
  }

  onInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const experienceData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    store.dispatch("addExperience", experienceData);
  }

  render() {
    document.querySelector(".addexperiencep").innerHTML = "";
    document.querySelector(".addexperiencep").appendChild(
      div(
        { className: "add-experience" },
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
              h1({ className: "display-4 text-center" }, "Add Experience"),
              p(
                { className: "lead text-center" },
                "Add any job or position that you have in the past or current"
              ),
              small({ className: "d-block pb-3" }, "* = required fields"),
              form(
                { onsubmit: this.onSubmit.bind(this) },
                TextFieldGroup({
                  placeholder: "* Company",
                  name: "company",
                  value: this.state.company,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.company
                }),
                TextFieldGroup({
                  placeholder: "* Job Title",
                  name: "title",
                  value: this.state.title,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.title
                }),
                TextFieldGroup({
                  placeholder: "Location",
                  name: "location",
                  value: this.state.location,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.location
                }),
                h6("From Date"),
                TextFieldGroup({
                  name: "from",
                  type: "date",
                  value: this.state.from,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.from
                }),
                h6("To Date"),
                TextFieldGroup({
                  name: "to",
                  type: "date",
                  value: this.state.to,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.to,
                  disabled: this.state.disabled ? "disabled" : ""
                }),
                div(
                  { className: "form-check mb-4" },
                  input({
                    type: "checkbox",
                    className: "form-check-input",
                    name: "current",
                    value: this.state.current,
                    checked: this.state.current,
                    onchange: this.onCheck.bind(this),
                    id: "current"
                  }),
                  label(
                    { className: "form-check-label", htmlFor: "current" },
                    "Current Job"
                  )
                ),
                TextAreaFieldGroup({
                  placeholder: "Job Description",
                  name: "description",
                  value: this.state.description,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.description,
                  info: "Tell us about your position"
                }),
                input({
                  type: "submit",
                  value: "Submit",
                  className: "btn btn-info btn-block mt-4"
                })
              )
            )
          )
        )
      )
    );
  }
}();
