import { ActionContext, ActionTree } from "vuex";
import { RootState } from "@/store";
import { ExamState, ExamParams, ExamMutations, ExamForm } from "../constants";
import examAPI from "../service";
import TokenServices from "../../../helpers/token";
import get from 'lodash/get'

const actions: ActionTree<ExamState, RootState> = {
  async getExamList(
    context: ActionContext<ExamState, RootState>,
    params: ExamParams
  ) {
    const response = await examAPI.fetch(params);
    const examList = response?.data?.items || [];
    examList.forEach(item => {
      const foundUser = item.users.find(
        _item => {
          const userId = get(_item, 'user') as any;
          return userId === TokenServices.getUser()._id
        }
      );
      if (foundUser && foundUser.score >= 0) item.score = foundUser.score;
      const authorId = item?.author?._id;
      if (authorId && authorId === TokenServices.getUser()._id)
        item.yours = true;
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

  async updateExamDetail(
    context: ActionContext<ExamState, RootState>,
    data: { id: string; data: ExamForm }
  ) {
    const response = await examAPI.update(data.id, data.data);
    const examDetail = response?.data || {};
    const foundUser = examDetail.users.find(
      _item => _item.user._id === TokenServices.getUser()._id
    );
    if (foundUser && foundUser.score >= 0) examDetail.score = foundUser.score;
    const authorId = examDetail?.author?._id;
    if (authorId && authorId === TokenServices.getUser()._id)
      examDetail.yours = true;
    context.commit(`${ExamMutations.SET_DETAIL}`, examDetail);
    return response;
  }
};
export default actions;
