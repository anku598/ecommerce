import { GetterTree, ActionTree, MutationTree, Module } from 'vuex'
import axios from 'axios'
import { RootState, MediaState, MediaItem } from '~/utils/store/store.types'

import { API_ENDPOINT, OTHER_ENDPOINTS } from '~/utils/store/endpoints'
import { FETCH_MEDIA_ITEM } from '~/utils/store/actions.names'
import { SET_MEDIA_ITEM } from '~/utils/store/mutations.names'

export const state = () => ({
  medias: []
})

export const getters: GetterTree<MediaState, RootState> = {
  medias (state): MediaItem[] {
    return state.medias
  }
}

export const actions: ActionTree<MediaState, RootState> = {
  async [FETCH_MEDIA_ITEM] ({ commit }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${OTHER_ENDPOINTS}/media/`)
        .then(({ data }) => {
          commit(SET_MEDIA_ITEM, data)
          resolve(data)
        })
        .catch((err) => {
          reject()
        })
    })
  }
}

export const mutations: MutationTree<MediaState> = {
  [SET_MEDIA_ITEM] (state, payload: MediaItem[]): any {
    state.medias = payload
  }
}
