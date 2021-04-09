
// import { Module } from 'vuex';
import state from './article.state';
import mutations from './article.mutations';
import actions from './article.actions';
import getters from './article.getters';

const article = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};

export default article;