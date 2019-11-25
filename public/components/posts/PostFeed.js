import PostItem from "./PostItem.js";

export default props => {
  const { posts } = props;

  if (posts.length > 0) {
    return posts.map(post => PostItem({ post, showActions: true }));
  } else {
    return {};
  }
};
