import { ActionTree, ActionContext } from "vuex";
import { RootState } from "@/store";
import { AuthState, AuthParams, AuthMutations } from "../constants";
import AuthAPI from '../service';

const actions: ActionTree<AuthState, RootState> = {
    async getListBelongToProfile(
        context: ActionContext<AuthState, RootState>,
        params: AuthParams
    ) {
        const response = await AuthAPI.getItemListBelongProfile(params);
        const data = response?.data || {};
        const { video, exam, article } = data;
        context.commit(AuthMutations.SET_ARTICLE_LIST, article?.items || []);
        context.commit(AuthMutations.SET_ARTICLE_TOTAL, article?.total || 0);
        context.commit(AuthMutations.SET_VIDEO_LIST, video?.items || []);
        context.commit(AuthMutations.SET_VIDEO_TOTAL, video?.total || 0);
        context.commit(AuthMutations.SET_EXAM_LIST, exam?.items || []);
        context.commit(AuthMutations.SET_EXAM_TOTAL, exam?.total || 0);
        return response;
    },

    async getProfile(context: ActionContext<AuthState, RootState>,) {
        const response = await AuthAPI.getProfile();
        const data = response?.data || {};
        context.commit(AuthMutations.SET_PROFILE, data);
        return response;
    }
}

export default actions;
