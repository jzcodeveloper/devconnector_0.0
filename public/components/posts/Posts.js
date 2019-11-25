import { div } from "../../libs/elements.js";
import Spinner from "../common/Spinner.js";
import PostForm from "../posts/PostForm.js";
import PostFeed from "../posts/PostFeed.js";
import Component from "../../libs/component.js";
import store from "../../store/index.js";

export default new class Posts extends Component {
  constructor() {
    super({ element: ".feedp" });
    this.state = {
      didMount: false
    };
  }

  didMount() {
    if (this.state.didMount === false) {
      this.setState({ didMount: true });
      store.dispatch("getPosts");
    }
  }

  render() {
    this.didMount();

    const { posts, loading } = store.state.global.post;

    let postContent;

    if (posts === null || loading) {
      postContent = Spinner();
    } else {
      postContent = PostFeed({ posts });
    }

    let postContentDiv =
      Object.keys(postContent).length === 0
        ? div(postContent)
        : div(...postContent);

    document.querySelector(".feedp").innerHTML = "";
    document
      .querySelector(".feedp")
      .appendChild(
        div(
          { className: "feed" },
          div(
            { className: "container" },
            div(
              { className: "row" },
              div(
                { className: "col-md-12" },
                div({ className: "postformp" }),
                postContentDiv
              )
            )
          )
        )
      );
    PostForm.render();
  }
}();
