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

export default new class AddEducation extends Component {
  constructor() {
    super({ element: ".addeducationp" });
    this.state = {
      school: "",
      degree: "",
      fieldOfStudy: "",
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

    const educationData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    store.dispatch("addEducation", educationData);
  }

  render() {
    document.querySelector(".addeducationp").innerHTML = "";
    document.querySelector(".addeducationp").appendChild(
      div(
        { className: "add-education" },
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
              h1({ className: "display-4 text-center" }, "Add Education"),
              p(
                { className: "lead text-center" },
                "Add any school, bootcamp etc that you have attended"
              ),
              small({ className: "d-block pb-3" }, "* = required fields"),
              form(
                { onsubmit: this.onSubmit.bind(this) },
                TextFieldGroup({
                  placeholder: "* School",
                  name: "school",
                  value: this.state.school,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.school
                }),
                TextFieldGroup({
                  placeholder: "* Degree or Certification",
                  name: "degree",
                  value: this.state.degree,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.degree
                }),
                TextFieldGroup({
                  placeholder: "* Field of Study",
                  name: "fieldOfStudy",
                  value: this.state.fieldOfStudy,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.fieldOfStudy
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
                    "Current Degree"
                  )
                ),
                TextAreaFieldGroup({
                  placeholder: "Program Description",
                  name: "description",
                  value: this.state.description,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.description,
                  info: "Tell us about the program that you were in"
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
