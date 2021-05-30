import { ActionContext, ActionTree } from "vuex";
import { RootState } from "@/store";
import { HomeState, HomeParams, HomeMutations } from "../constants";
import { getHomeList } from '../services';

const actions: ActionTree<HomeState, RootState> = {
  async getHomeList(
    context: ActionContext<HomeState, RootState>,
    params: HomeParams
  ) {
    const response = await getHomeList(params);
    const data = response?.data || {};
    const { video, exam, article } = data;
    context.commit(HomeMutations.SET_ARTICLE_LIST, article?.items || []);
    context.commit(HomeMutations.SET_ARTICLE_TOTAL, article?.total || 0);
    context.commit(HomeMutations.SET_VIDEO_LIST, video?.items || []);
    context.commit(HomeMutations.SET_VIDEO_TOTAL, video?.total || 0);
    context.commit(HomeMutations.SET_EXAM_TOTAL, exam?.items || []);
    context.commit(HomeMutations.SET_EXAM_TOTAL, exam?.total || 0);

    console.log('resposnse', response);
    return response;
  },
};
export default actions;
