export default {
  //
  postLoading(state, payload) {
    state.global.post.loading = true;

    return state;
  },
  //
  addPost(state, payload) {
    state.global.post.posts = [payload, ...state.global.post.posts];

    return state;
  },
  //
  getPost(state, payload) {
    state.global.post.post = payload;
    state.global.post.loading = false;

    return state;
  },
  //
  getPosts(state, payload) {
    state.global.post.posts = payload;
    state.global.post.loading = false;

    return state;
  },
  //
  deletePost(state, payload) {
    state.global.post.posts = state.global.post.posts.filter(
      post => post._id !== payload
    );

    return state;
  }
};
