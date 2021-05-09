export enum EXCEL_HEADERS {
  QUESTION = "Question",
  OPTION_1 = "Option 1",
  OPTION_2 = "Option 2",
  OPTION_3 = "Option 3",
  OPTION_4 = "Option 4",
  ANSWER = "Answer",
  EXPLANATION = "Explanation"
}

export const ANSWERS = ['A', 'B', 'C', 'D'];

export enum ExamMutations {
  SET_PARAMS = "SET_PARAMS",
  SET_LIST = "SET_LIST",
  SET_TOTAL = "SET_TOTAL",
  SET_DETAIL = "SET_DETAIL"
}

export interface ExamDetail {
  _id: string,
  title: string,
  description: string,
  questions: QuestionDetail[],
  comments: [],
  users: [
    {
      _id: string,
      user: {
        _id: string,
        name: string
      },
      score: 1
    }
  ],
  author: {
    _id: string,
    email: string,
    name: string,
    phone: string
  },
  createdAt: string,
  updatedAt: string,
  score?: number | null;
  yours?: boolean;
}

export interface QuestionDetail {
  question: string,
  options: string[]
  answer: number,
  explanation: string,
}
export interface ExamForm {
  title?: string,
  description?: string,
  questions?: QuestionDetail[];
  deletedCommentId?: null,
  score?: 1
}

export interface ExamParams {
  page: number,
  limit: number
}

export interface ExamState {
  examList: ExamDetail[],
  params: ExamParams,
  examDetail?: ExamDetail,
  total: number
}