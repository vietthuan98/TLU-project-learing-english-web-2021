import Vue from 'vue';
import { AuthMutations, AuthUser, AuthState } from '../constants';
import { ArticleDetail } from '@/modules/articles/constants';
import { ExamDetail } from '@/modules/exams/constants';
import { VideoDetail } from '@/modules/videos/constants';

const mutations = {
    [AuthMutations.SET_USER](state: AuthState, user: AuthUser) {
        Vue.set(state, 'user', user);
    },
    [AuthMutations.SET_PROFILE](state: AuthState, profile: AuthUser) {
        Vue.set(state, 'profile', profile);
    },
    [AuthMutations.SET_ARTICLE_LIST](state: AuthState, data: ArticleDetail[]) {
        Vue.set(state.article, 'items', data);
    },
    [AuthMutations.SET_ARTICLE_TOTAL](state: AuthState, total: number) {
        Vue.set(state.article, 'total', total);
    },
    [AuthMutations.SET_EXAM_LIST](state: AuthState, data: ExamDetail[]) {
        Vue.set(state.exam, 'items', data);
    },
    [AuthMutations.SET_EXAM_TOTAL](state: AuthState, total: number) {
        Vue.set(state.exam, 'total', total);
    },
    [AuthMutations.SET_VIDEO_LIST](state: AuthState, data: VideoDetail[]) {
        Vue.set(state.video, 'items', data);
    },
    [AuthMutations.SET_VIDEO_TOTAL](state: AuthState, total: number) {
        Vue.set(state.video, 'total', total);
    }
};

export default mutations;



