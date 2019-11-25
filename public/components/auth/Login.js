import { input, div, h1, p, form } from "../../libs/elements.js";
import TextFieldGroup from "../common/TextFieldGroup.js";
import Component from "../../libs/component.js";
import store from "../../store/index.js";

export default new class Login extends Component {
  constructor() {
    super({ element: ".loginp" });
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  onInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const User = {
      email: this.state.email,
      password: this.state.password
    };

    store.dispatch("loginUser", User);
  }

  render() {
    document.querySelector(".loginp").innerHTML = "";
    document.querySelector(".loginp").appendChild(
      div(
        { className: "login" },
        div(
          { className: "container" },
          div(
            { className: "row" },
            div(
              { className: "col-md-8 m-auto" },
              h1({ className: "display-4 text-center" }, "Log In"),
              p(
                { className: "lead text-center" },
                "Sign in to your DevConnector account"
              ),
              form(
                { onsubmit: this.onSubmit.bind(this) },
                TextFieldGroup({
                  placeholder: "Email Address",
                  name: "email",
                  type: "email",
                  value: this.state.email,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.email
                }),
                TextFieldGroup({
                  placeholder: "Password",
                  name: "password",
                  type: "password",
                  value: this.state.password,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.password
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
