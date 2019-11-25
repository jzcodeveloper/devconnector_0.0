import { Push } from "../../libs/router.js";
import { div, img, i, span, button, p, a, br } from "../../libs/elements.js";
import store from "../../store/index.js";

export default props => {
  const { post, showActions } = props;

  const onDeleteClick = id => {
    store.dispatch("deletePost", id);
  };

  const onLikeClick = id => {
    store.dispatch("addLike", id);
  };

  const onUnlikeClick = id => {
    store.dispatch("removeLike", id);
  };

  const onClick = e => {
    e.preventDefault();
    Push(e.target.href);
  };

  const findUserLike = likes => {
    const { auth } = store.state.global;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const { auth } = store.state.global;

  const postUser =
    post.user === auth.user.id
      ? button(
          {
            type: "button",
            className: "btn btn-danger mr-1",
            onclick: onDeleteClick.bind(this, post._id)
          },
          i({ className: "fas fa-times" })
        )
      : null;

  const green = findUserLike(post.likes) ? "text-info" : "";

  const showActionsNode =
    showActions === true
      ? span(
          {},
          button(
            {
              type: "button",
              className: "btn btn-light mr-1",
              onclick: onLikeClick.bind(this, post._id)
            },
            i({ className: `${green} fas fa-thumbs-up` }),
            span(
              { className: "badge badge-light" },
              post.likes.length.toString()
            )
          ),
          button(
            {
              type: "button",
              className: "btn btn-light mr-1",
              onclick: onUnlikeClick.bind(this, post._id)
            },
            i({ className: "text-secondary fas fa-thumbs-down" })
          ),
          a(
            {
              href: `/post/${post._id}`,
              className: "btn btn-info mr-1",
              onclick: onClick
            },
            "Comments"
          ),
          postUser
        )
      : null;

  return div(
    { className: "card card-body mb-3" },
    div(
      { className: "row" },
      div(
        { className: "col-md-2" },
        a(
          { href: `/profile/${auth.user.name}`, onclick: onClick },
          img({
            className: "rounded-circle d-none d-md-block",
            src: post.avatar
          })
        ),
        br(),
        p({ className: "text-center" }, post.name)
      ),
      div(
        { className: "col-md-10" },
        p({ className: "lead" }, post.text),
        showActionsNode
      )
    )
  );
};
