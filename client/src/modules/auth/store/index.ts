
// import { Module } from 'vuex';
import state from './auth.state';
import mutations from './auth.mutations';
import actions from './auth.actions';
import getters from './auth.getters';

const auth = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};

export default auth;