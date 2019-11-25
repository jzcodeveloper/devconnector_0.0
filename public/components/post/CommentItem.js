import { div, img, i, button, p, a, br } from "../../libs/elements.js";
import { Push } from "../../libs/router.js";
import store from "../../store/index.js";

export default props => {
  const { comment, postId } = props;

  const onDeleteClick = (postId, commentId) => {
    store.dispatch("deleteComment", { postId, commentId });
  };

  const onClick = e => {
    e.preventDefault();
    Push(e.target.href);
  };

  const { auth } = store.state.global;

  const commentUser =
    comment.user === auth.user.id
      ? button(
          {
            type: "button",
            className: "btn btn-danger mr-1",
            onclick: onDeleteClick.bind(this, postId, comment._id)
          },
          i({ className: "fas fa-times" })
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
            src: comment.avatar
          })
        ),
        br(),
        p({ className: "text-center" }, comment.name)
      ),
      div(
        { className: "col-md-10" },
        p({ className: "lead" }, comment.text),
        commentUser
      )
    )
  );
};
