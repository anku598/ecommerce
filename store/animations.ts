import { GetterTree, ActionTree, MutationTree } from 'vuex'
import Vue from 'vue'
import { SEARCH_FIELD_NAV_STATE, IS_FIRST_LOAD } from '~/utils/store/getters.names'
import { SET_IS_FIRST_LOAD, SET_SEARCH_NAV_TOGGLE } from '~/utils/store/mutations.names'
import { SearchFieldToggleEvent } from '~/utils/store/store.types'
export const state = () => ({
  searchFieldToggle: {
    fieldShow: false,
    animation: true
  },
  firstLoad: true
})

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  [SEARCH_FIELD_NAV_STATE] (state: any) {
    return state.searchFieldToggle
  },
  [IS_FIRST_LOAD] (state: any) {
    return state.firstLoad
  }
}

export const actions: ActionTree<RootState, RootState> = {

}

export const mutations: MutationTree<RootState> = {
  [SET_SEARCH_NAV_TOGGLE] (state: any, payload: SearchFieldToggleEvent) {
    Vue.set(state, 'searchFieldToggle', payload)
  },
  [SET_IS_FIRST_LOAD] (state: any, payload: boolean) {
    state.firstLoad = payload
  }
}
