import { div, form, button } from "../../libs/elements.js";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.js";
import Component from "../../libs/component.js";
import store from "../../store/index.js";

export default new class CommentForm extends Component {
  constructor() {
    super({ element: ".commentformp" });
    this.state = {
      text: "",
      errors: {}
    };
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = store.state.global.auth;
    const { _id } = store.state.global.post.post;

    const newComment = {
      postId: _id,
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    store.dispatch("addComment", newComment);
  }

  onInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (!this.state.errors.text) {
      this.setState({ text: "" });
    }

    document.querySelector(".commentformp").innerHTML = "";
    document.querySelector(".commentformp").appendChild(
      div(
        { className: "comment-form mb-3" },
        div(
          { className: "card card-info" },
          div(
            { className: "card-header bg-info text-white" },
            "Make a comment..."
          ),
          div(
            { className: "card-body" },
            form(
              { onsubmit: this.onSubmit.bind(this) },
              div(
                { className: "form-group" },
                TextAreaFieldGroup({
                  placeholder: "Reply to post",
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
