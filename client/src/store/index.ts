import Vue from "vue";
import Vuex, { ActionContext, ActionTree } from 'vuex';

//modules
import auth from '@/modules/auth/store';

Vue.use(Vuex);

interface RootState {
  isShowLoadingIndicator: boolean,
  searchEngine: {
    keyword?: string;
    searchBy?: string;
  }

}

const rootState = {
  isShowLoadingIndicator: false,
  searchEngine: {
    keyword: '',
  }
}

export enum ROOT_MUTATION {
  SET_LOADING = 'SET_LOADING',
  SET_SEARCH_ENGINE = 'SET_SEARCH_ENGINE',
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
  }
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
    auth
  }
});
