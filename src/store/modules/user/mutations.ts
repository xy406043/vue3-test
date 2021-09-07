import { MutationTree } from 'vuex';

import { State, state } from './state';
import { UserMutationTypes as MutationTypes } from './mutation-types';
import LocalStore from 'store2';

export type Mutations<S = State> = {
  [MutationTypes.SET_TOKEN](state: S, payload: string): void;
  [MutationTypes.SET_PROFILE](state: S, payload: any): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_TOKEN](state: State, token?: string) {
    state.token = token;
    if (token) {
      LocalStore.set('TOKEN', token);
    } else {
      LocalStore.remove('TOKEN');
    }
  },

  [MutationTypes.SET_PROFILE](state: State, userInfo: any) {
    state.info = {
      ...state.info,
      ...userInfo,
    };
    LocalStore.set('USER_INFO', state.info);
  },
};
