import { ActionContext, ActionTree } from "vuex";
import { RootState } from "@/store";
import { VideoState, VideoParams, VideoForm } from "../constants";
import videoAPI from "../service/index";
import TokenServices from "../../../helpers/token";

const actions: ActionTree<VideoState, RootState> = {
  async getVideoList(
    context: ActionContext<VideoState, RootState>,
    params: VideoParams
  ) {
    const response = await videoAPI.fetch(params);
    const videoList = response?.data?.items || [];
    videoList.forEach(video => {
      video.yours = TokenServices.getUser()._id === video.author?._id;
    });
    context.commit("setList", videoList);
    context.commit("setTotal", response?.data?.total || 0);
    return response;
  },

  // async uploadImage(
  //   context: ActionContext<VideoState, RootState>,
  //   file: FormData
  // ) {
  //   const response = await articleAPI.uploadImage(file);
  //   return response;
  // },

  async getVideoDetail(
    context: ActionContext<VideoState, RootState>,
    id: string
  ) {
    const response = await videoAPI.detail(id);
    const video = response?.data || {};
    if (video.comments)
      video.comments.forEach(comment => {
        if (comment?.userId?._id)
          comment.yours = comment.userId._id === TokenServices.getUser()._id;
      });
    context.commit("setDetail", video);
    return response;
  },

  async updateVideoDetail(
    context: ActionContext<VideoState, RootState>,
    data: { id: string; data: VideoForm }
  ) {
    const response = await videoAPI.update(data.id, data.data);
    const video = response?.data || {};
    if (video.comments)
      video.comments.forEach(comment => {
        if (comment?.userId?._id)
          comment.yours = comment.userId._id === TokenServices.getUser()._id;
      });
    context.commit("setDetail", video);
    return response;
  }
};
export default actions;
