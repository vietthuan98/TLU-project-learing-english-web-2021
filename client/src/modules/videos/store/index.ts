// import { Module } from 'vuex';
import state from "./video.state";
import mutations from "./video.mutations";
import actions from "./video.actions";
import getters from "./video.getters";

const video = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default video;
