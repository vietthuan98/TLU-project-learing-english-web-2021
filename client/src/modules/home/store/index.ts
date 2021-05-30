// import { Module } from 'vuex';
import state from "./home.state";
import mutations from "./home.mutations";
import actions from "./home.actions";
import getters from "./home.getters";

const home = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default home;
