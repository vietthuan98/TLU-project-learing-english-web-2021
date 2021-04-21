import Vue from "vue";
import Vuex, { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store'
import { ArticleState, ArticleParams } from '../constants';
import articleAPI from "../service/index";
import TokenServices from '../../../helpers/token';

const actions: ActionTree<ArticleState, RootState> = {
    async getArticleList(context: ActionContext<ArticleState, RootState>, params: ArticleParams) {
        const response = await articleAPI.fetch(params);
        const articleList = response?.data?.items || [];
        articleList.forEach(article => {
            article.yours = TokenServices.getUser()._id === article.author?._id;
        });
        context.commit('setList', articleList);
        context.commit('setTotal', response?.data?.total || 0);
        return response;
    },
    async uploadImage(context: ActionContext<ArticleState, RootState>, file: FormData) {
        const response = await articleAPI.uploadImage(file);
        return response;
    }
}

export default actions;