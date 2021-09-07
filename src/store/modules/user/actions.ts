import { RootState } from '@/store';
import { ActionTree, ActionContext } from 'vuex';
import { UserActionTypes } from './action-types';
import { State } from './state';
import { UserMutationTypes } from './mutation-types';
import { UserService } from '../../../api/user';

export interface Actions {
  [UserActionTypes.LOGIN](content: ActionContext<any, any>, loginParams: any): void;
  [UserActionTypes.LOGOUT](content: ActionContext<any, any>): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
  async [UserActionTypes.LOGIN]({ commit }, params: any) {
    const token = await UserService.login(params);
    commit(UserMutationTypes.SET_TOKEN, token);
    commit(UserMutationTypes.SET_PROFILE, params);
  },

  async [UserActionTypes.LOGOUT]({ commit }) {
    commit(UserMutationTypes.SET_TOKEN);
  },
};
