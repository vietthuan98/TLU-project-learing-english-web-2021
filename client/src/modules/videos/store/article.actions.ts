import Vue from "vue";
import Vuex, { ActionContext, ActionTree } from "vuex";
import { RootState } from "@/store";
import { VideoState, VideoParams, VideoForm } from "../constants";
import articleAPI from "../service/index";
import TokenServices from "../../../helpers/token";

const actions: ActionTree<VideoState, RootState> = {
  // async getArticleList(
  //   context: ActionContext<VideoState, RootState>,
  //   params: VideoParams
  // ) {
  //   const response = await articleAPI.fetch(params);
  //   const articleList = response?.data?.items || [];
  //   articleList.forEach(article => {
  //     article.yours = TokenServices.getUser()._id === article.author?._id;
  //   });
  //   context.commit("setList", articleList);
  //   context.commit("setTotal", response?.data?.total || 0);
  //   return response;
  // },

  // async uploadImage(
  //   context: ActionContext<VideoState, RootState>,
  //   file: FormData
  // ) {
  //   const response = await articleAPI.uploadImage(file);
  //   return response;
  // },

  // async getArticleDetail(
  //   context: ActionContext<VideoState, RootState>,
  //   id: string
  // ) {
  //   const response = await articleAPI.detail(id);
  //   context.commit("setDetail", response?.data || {});
  //   return response;
  // },

  // async updateArticleDetail(
  //   context: ActionContext<VideoState, RootState>,
  //   data: { id: string; data: VideoForm }
  // ) {
  //   const response = await articleAPI.update(data.id, data.data);
  //   context.commit("setDetail", response?.data || {});
  //   return response;
  // }
};
export default actions;
