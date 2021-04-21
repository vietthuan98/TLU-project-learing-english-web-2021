import Vue from "vue";
import Vuex, { ActionContext, ActionTree } from 'vuex';
import { genId } from '../helpers/functions';

//modules
import auth from '@/modules/auth/store';
import articles from '@/modules/articles/store';

Vue.use(Vuex);

export interface RootState {
  isShowLoadingIndicator: boolean,
  searchEngine: {
    keyword?: string;
    searchBy?: string;
  }
  popupMessage: {
    id: string;
    message: string,
    isError: boolean
  }[];
}

const rootState: RootState = {
  isShowLoadingIndicator: false,
  searchEngine: {
    keyword: '',
  },
  popupMessage: [],
}

export enum ROOT_MUTATION {
  SET_LOADING = 'SET_LOADING',
  SET_SEARCH_ENGINE = 'SET_SEARCH_ENGINE',
  SET_POPUP_MESSAGE = 'SET_POPUP_MESSAGE',
  DELETE_POPUP_MESSAGE = 'DELETE_POPUP_MESSAGE',
}

const rootMutations = {
  [ROOT_MUTATION.SET_LOADING](state: RootState, isShow: boolean) {
    state.isShowLoadingIndicator = isShow;
  },
  [ROOT_MUTATION.SET_SEARCH_ENGINE](state: RootState, data: { keyword: string, searchBy: string }) {
    state.searchEngine = {
      ...state.searchEngine,
      keyword: data.keyword || '',
      searchBy: data.searchBy || '',
    };
  },
  [ROOT_MUTATION.SET_POPUP_MESSAGE](state: RootState, data: { message: string, isError: boolean }) {
    state.popupMessage.push({
      id: genId(),
      message: data.message || '',
      isError: data.isError,
    })
    if (state.popupMessage.length > 3) {
      state.popupMessage.splice(1, 1)
    }
  },
  [ROOT_MUTATION.DELETE_POPUP_MESSAGE](state: RootState, index: number) {
    state.popupMessage.splice(index, 1);
  },


}

const rootActions: ActionTree<RootState, RootState> = {
  setLoading(context: ActionContext<RootState, RootState>, isShow: boolean) {
    context.commit(ROOT_MUTATION.SET_LOADING, isShow);
  }
}



export default new Vuex.Store<RootState>({
  state: rootState,
  mutations: rootMutations,
  actions: rootActions,
  modules: {
    auth,
    articles
  }
});
