import { input, div, h1, p, form } from "../../libs/elements.js";
import TextFieldGroup from "../common/TextFieldGroup.js";
import Component from "../../libs/component.js";
import store from "../../store/index.js";

export default new class Register extends Component {
  constructor() {
    super({ element: ".registerp" });
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  onInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    store.dispatch("registerUser", newUser);
  }

  render() {
    document.querySelector(".registerp").innerHTML = "";
    document.querySelector(".registerp").appendChild(
      div(
        { className: "register" },
        div(
          { className: "container" },
          div(
            { className: "row" },
            div(
              { className: "col-md-8 m-auto" },
              h1({ className: "display-4 text-center" }, "Sign Up"),
              p(
                { className: "lead text-center" },
                "Create your DevConnector account"
              ),
              form(
                { id: "form", onsubmit: this.onSubmit.bind(this) },
                TextFieldGroup({
                  placeholder: "Name",
                  name: "name",
                  value: this.state.name,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.name
                }),
                TextFieldGroup({
                  placeholder: "Email Address",
                  name: "email",
                  type: "email",
                  value: this.state.email,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.email,
                  info:
                    "This site uses Gravatar so if you want a profile image, use a Gravatar email"
                }),
                TextFieldGroup({
                  placeholder: "Password",
                  name: "password",
                  type: "password",
                  value: this.state.password,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.password
                }),
                TextFieldGroup({
                  placeholder: "Confirm Password",
                  name: "password2",
                  type: "password",
                  value: this.state.password2,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.password2
                }),
                input({
                  type: "submit",
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
