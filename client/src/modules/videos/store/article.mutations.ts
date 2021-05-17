import Vue from "vue";
import { VideoState, VideoParams, VideoDetail } from "../constants";

const mutations = {
  setParams(state: VideoState, params: VideoParams) {
    Vue.set(state, "params", params);
  },
  setList(state: VideoState, data: VideoDetail[]) {
    Vue.set(state, "articleList", data);
  },
  setTotal(state: VideoState, total: number) {
    Vue.set(state, "total", total);
  },
  setDetail(state: VideoState, data: VideoDetail) {
    Vue.set(state, "articleDetail", data);
  }
};

export default mutations;
