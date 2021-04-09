import Vue from "vue";
import Vuex, { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store'
import { ArticleState, ArticleParams } from '../constants';
import articleAPI from "../service/index";

const actions: ActionTree<ArticleState, RootState> = {
    async getArticleList(context: ActionContext<ArticleState, RootState>, params: ArticleParams) {
        const response = await articleAPI.fetch(params);
        context.commit('setList', response?.data?.items || []);
        context.commit('setTotal', response?.data?.total || 0);
        return response;
    },
    async uploadImage(context: ActionContext<ArticleState, RootState>, file: Record<string, unknown>) {
        const response = await articleAPI.uploadImage(file);
        return response;
    }
}

export default actions;