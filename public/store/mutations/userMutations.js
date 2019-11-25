export default {
  //
  registerUser(state, payload) {
    state.global.auth.user = payload;

    return state;
  },
  //
  setCurrentUser(state, payload) {
    state.global.auth.isAuthenticated = payload ? true : false;
    state.global.auth.user = payload;

    return state;
  },
  //
  getErrors(state, payload) {
    state.global.errors = payload;

    return state;
  }
};
