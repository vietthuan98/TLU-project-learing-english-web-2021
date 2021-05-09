// import { Module } from 'vuex';
import state from "./exam.state";
import mutations from "./exam.mutations";
import actions from "./exam.actions";
import getters from "./exam.getters";

const exam = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default exam;
