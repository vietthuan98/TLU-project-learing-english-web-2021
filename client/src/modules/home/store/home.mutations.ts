import Vue from "vue";
import { HomeMutations, HomeState } from "../constants";
import { ArticleDetail } from '@/modules/articles/constants';
import { ExamDetail } from '@/modules/exams/constants';
import { VideoDetail } from '@/modules/videos/constants';

const mutations = {
  [HomeMutations.SET_ARTICLE_LIST](state: HomeState, data: ArticleDetail[]) {
    Vue.set(state.article, 'items', data);
  },
  [HomeMutations.SET_ARTICLE_TOTAL](state: HomeState, total: number) {
    Vue.set(state.article, 'total', total);
  },
  [HomeMutations.SET_EXAM_LIST](state: HomeState, data: ExamDetail[]) {
    Vue.set(state.exam, 'items', data);
  },
  [HomeMutations.SET_EXAM_TOTAL](state: HomeState, total: number) {
    Vue.set(state.exam, 'total', total);
  },
  [HomeMutations.SET_VIDEO_LIST](state: HomeState, data: VideoDetail[]) {
    Vue.set(state.video, 'items', data);
  },
  [HomeMutations.SET_VIDEO_TOTAL](state: HomeState, total: number) {
    Vue.set(state.video, 'total', total);
  }
};

export default mutations;
