
import { GetterTree, ActionTree, MutationTree, Module } from 'vuex'
import axios from 'axios'
import { FaqItem, FaqState, RootState } from '~/utils/store/store.types'
import { FETCH_FAQ } from '~/utils/store/actions.names'
import { OTHER_ENDPOINTS } from '~/utils/store/endpoints'
import { SET_FAQ } from '~/utils/store/mutations.names'

export const state = () => ({
  faq: []
})

export const getters: GetterTree<FaqState, RootState> = {
  faq (state): FaqItem[] {
    return state.faq
  }
}

export const actions: ActionTree<FaqState, RootState> = {
  async [FETCH_FAQ] ({ commit }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${OTHER_ENDPOINTS}/faq/`)
        .then(({ data }) => {
          commit(SET_FAQ, data)
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export const mutations: MutationTree<FaqState> = {
  [SET_FAQ] (state, payload: FaqItem[]): any {
    state.faq = payload
  }
}
