import { div, a } from "../../libs/elements.js";
import { Push } from "../../libs/router.js";
import Spinner from "../common/Spinner.js";
import PostItem from "../posts/PostItem.js";
import CommentForm from "../post/CommentForm.js";
import CommentFeed from "../post/CommentFeed.js";
import Component from "../../libs/component.js";
import store from "../../store/index.js";

export default new class Post extends Component {
  constructor() {
    super({ element: ".postp" });
    this.state = {
      didMount: false,
      errors: {}
    };
  }

  didMount() {
    if (this.state.didMount === false) {
      this.setState({ didMount: true });
      store.dispatch("getPost", window.location.pathname.split("/")[2]);
    }
  }

  onClick(e) {
    e.preventDefault();
    Push(e.target.href);
  }

  render() {
    this.didMount();

    const { post, loading } = store.state.global.post;

    let postContent, formContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = Spinner();
      formContent = {};
    } else {
      postContent = PostItem({ post, showActions: false });
      formContent = CommentFeed({
        postId: post._id,
        comments: post.comments
      });
    }

    let postContentDiv =
      Object.keys(postContent).length === 0
        ? div(postContent)
        : div(...postContent);

    let formContentDiv =
      Object.keys(formContent).length === 0
        ? div(formContent)
        : div(...formContent);

    document.querySelector(".postp").innerHTML = "";
    document.querySelector(".postp").appendChild(
      div(
        { className: "post" },
        div(
          { className: "container" },
          div(
            { className: "row" },
            div(
              { className: "col-md-12" },
              a(
                {
                  href: "/feed",
                  className: "btn btn-light mb-3",
                  onclick: this.onClick
                },
                "Back To Feed"
              ),
              postContentDiv,
              div({ className: "commentformp" }),
              formContentDiv
            )
          )
        )
      )
    );
    if (post !== null && !loading && Object.keys(post).length !== 0) {
      CommentForm.render();
    }
  }
}();
