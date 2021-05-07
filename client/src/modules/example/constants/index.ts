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

export interface ExampleDetail {
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
}

export interface QuestionDetail {
  question: string,
  options: string[]
  answer: number,
  explanation: string,
}
export interface ExampleForm {
  title?: string,
  description?: string,
  questions?: QuestionDetail[];
  deletedCommentId?: null,
  score?: 1
}