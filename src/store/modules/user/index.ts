import { RootState } from '@/store';
import { state } from './state';
import { Store as VuexStore, DispatchOptions, CommitOptions, Module } from 'vuex';
import { actions, Actions } from './actions';
import { mutations } from './mutations';

import type { State } from './state';

export { State };

export type UserStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'>;

export const store: Module<State, RootState> = {
  actions,
  state,
  mutations,
};
