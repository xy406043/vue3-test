import { createStore } from 'vuex'
import { UserStore, State as UserState } from '@/store/modules/user'
import { store as user } from '@/store/modules/user'

export type RootState = {
  user: UserState
}

export type Store = UserStore<Pick<RootState, 'user'>>

const store = createStore({
  mutations: {},

  actions: {},

  getters: {},

  modules: {
    user
  }
})

export default store
