export default {
  //
  profileLoading(state, payload) {
    state.global.profile.loading = true;

    return state;
  },
  //
  getProfile(state, payload) {
    state.global.profile.profile = payload;
    state.global.profile.loading = false;

    return state;
  },
  //
  getProfiles(state, payload) {
    state.global.profile.profiles = payload;
    state.global.profile.loading = false;

    return state;
  },
  //
  clearCurrentProfile(state, payload) {
    state.global.profile.profile = null;

    return state;
  }
};
