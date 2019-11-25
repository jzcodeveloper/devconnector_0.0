import CommentItem from "./CommentItem.js";

export default props => {
  const { comments, postId } = props;

  if (comments.length > 0) {
    return comments.map(comment => CommentItem({ comment, postId }));
  } else {
    return {};
  }
};
