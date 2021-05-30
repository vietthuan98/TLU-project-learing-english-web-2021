import { HomeState } from "../constants";

const state: HomeState = {
  video: {
    items: [],
    total: 0,
  },
  exam: {
    items: [],
    total: 0,
  },
  article: {
    items: [],
    total: 0
  },
  params: {
    video: {
      page: 1,
      limit: 10,
    },
    article: {
      page: 1,
      limit: 10,
    },
    exam: {
      page: 1,
      limit: 10,
    },
  }
};

export default state;
