import { ArticleState } from "../constants";

const state: ArticleState = {
  articleList: [],
  params: {
    page: 1,
    limit: 8,
    title: null
  },
  articleDetail: {},
  total: 0
};

export default state;
