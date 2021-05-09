import Vue from "vue";
import Vuex, { ActionContext, ActionTree } from "vuex";
import { RootState } from "@/store";
import { ExamState, ExamParams, ExamMutations } from "../constants";
import examAPI from "../service";
import TokenServices from "../../../helpers/token";

const actions: ActionTree<ExamState, RootState> = {
  async getExamList(
    context: ActionContext<ExamState, RootState>,
    params: ExamParams
  ) {
    const response = await examAPI.fetch(params);
    const examList = response?.data?.items || [];
    examList.forEach(item => {
      const foundUser = item.users.find(_item => _item.user === TokenServices.getUser()._id);
      if (foundUser) item.score = foundUser.score || null;
      const authorId = item?.author?._id;
      if (authorId && authorId === TokenServices.getUser()._id) item.yours = true;
    });
    context.commit(`${ExamMutations.SET_LIST}`, examList);
    context.commit(`${ExamMutations.SET_TOTAL}`, response?.data?.total || 0);
    return response;
  },

  async getExamDetail(
    context: ActionContext<ExamState, RootState>,
    id: string
  ) {
    const response = await examAPI.detail(id);
    const exam = response?.data || {};
    const authorId = exam?.author?._id;
    if (authorId && authorId === TokenServices.getUser()._id) exam.yours = true;
    context.commit(`${ExamMutations.SET_DETAIL}`, exam);
    return response;
  },

  // async updateArticleDetail(
  //   context: ActionContext<ArticleState, RootState>,
  //   data: { id: string; data: ArticleForm }
  // ) {
  //   const response = await articleAPI.update(data.id, data.data);
  //   context.commit("setDetail", response?.data || {});
  //   return response;
  // }
};
export default actions;
