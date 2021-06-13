import { AuthState } from '../constants';
import TokenService from '../../../helpers/token';

const author = TokenService.getUser()._id;

const state: AuthState = {
  userName: "",
  user: null,
  profile: null,

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
      limit: 500,
      author,
    },
    article: {
      page: 1,
      limit: 500,
      author,
    },
    exam: {
      page: 1,
      limit: 500,
      author,
    },
  }
};

export default state;
