import { div, form, button } from "../../libs/elements.js";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.js";
import Component from "../../libs/component.js";
import store from "../../store/index.js";

export default new class PostForm extends Component {
  constructor() {
    super({ element: ".postformp" });
    this.state = {
      text: "",
      errors: {}
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = store.state.global.auth;

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    store.dispatch("addPost", newPost);

    this.setState({ text: "" });
  }

  onInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (!this.state.errors.text) {
      this.setState({ text: "" });
    }

    document.querySelector(".postformp").innerHTML = "";
    document.querySelector(".postformp").appendChild(
      div(
        { className: "post-form mb-3" },
        div(
          { className: "card card-info" },
          div(
            { className: "card-header bg-info text-white" },
            "Say Something..."
          ),
          div(
            { className: "card-body" },
            form(
              { onsubmit: this.onSubmit.bind(this) },
              div(
                { className: "form-group" },
                TextAreaFieldGroup({
                  placeholder: "Create a post",
                  name: "text",
                  value: this.state.text,
                  onInput: this.onInput.bind(this),
                  error: this.state.errors.text
                })
              ),
              button(
                {
                  type: "submit",
                  className: "btn btn-dark"
                },
                "Submit"
              )
            )
          )
        )
      )
    );
  }
}();
