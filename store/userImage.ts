import { GetterTree, ActionTree, MutationTree, Module } from 'vuex'
import axios from 'axios'
import { RootState } from './settings'
import { OTHER_ENDPOINTS } from '~/utils/store/endpoints'
import { FETCH_USER_IMAGE } from '~/utils/store/actions.names'
import { UserImageState } from '~/utils/store/store.types'

const namespaced: boolean = false
const state: UserImageState = {

}

const getters: GetterTree<UserImageState, RootState> = {

}

const actions: ActionTree<UserImageState, RootState> = {
  async [FETCH_USER_IMAGE] ({ state }, pageInfo = { limit: 12, offset: 0 }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.$axios.$get(`${OTHER_ENDPOINTS}/user-images/?limit=${pageInfo.limit}&offset=${pageInfo.offset}`)
        .then((data: any) => {
          resolve(data)
        }).catch((err) => {
          reject(err)
        })
    })
  }
}

const mutations: MutationTree<UserImageState> = {

}

export const userImageData: Module<UserImageState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}

export default userImageData
