import Vue from "vue";
import { ArticleState, ArticleParams, ArticleDetail } from "../constants";

const mutations = {
  setParams(state: ArticleState, params: ArticleParams) {
    Vue.set(state, "params", params);
  },
  setList(state: ArticleState, data: ArticleDetail[]) {
    Vue.set(state, "articleList", data);
  },
  setTotal(state: ArticleState, total: number) {
    Vue.set(state, "total", total);
  },
  setDetail(state: ArticleState, data: ArticleDetail) {
    Vue.set(state, "articleDetail", data);
  }
};

export default mutations;
