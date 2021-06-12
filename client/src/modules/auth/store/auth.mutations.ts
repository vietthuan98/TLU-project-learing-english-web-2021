import Vue from 'vue';
import { AuthMutations, AuthUser, AuthState } from '../constants';

const mutations = {
    [AuthMutations.SET_USER](state: AuthState, user: AuthUser) {
        Vue.set(state, 'user', user);
    }
};

export default mutations;
