import Vue from "vue";
import { ExamMutations, ExamParams, ExamDetail, ExamState } from "../constants";

const mutations = {
  [ExamMutations.SET_PARAMS]: (state: ExamState, params: ExamParams) => {
    Vue.set(state, "params", params);
  },
  [ExamMutations.SET_LIST]: (state: ExamState, data: ExamDetail[]) => {
    Vue.set(state, "examList", data);
  },
  [ExamMutations.SET_TOTAL]: (state: ExamState, total: number) => {
    Vue.set(state, "total", total);
  },
  [ExamMutations.SET_DETAIL]: (state: ExamState, data: ExamDetail) => {
    Vue.set(state, "examDetail", data);
  },
};

export default mutations;
