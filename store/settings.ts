import { GetterTree, ActionTree, MutationTree } from 'vuex'
import Vue from 'vue'
import { COUNTRIES } from '../utils/store/getters.names'
import { FETCH_MAIN_MENU, FETCH_SETTINGS } from '~/utils/store/actions.names'
import { MENU_ENDPOINT, SETTINGS_ENDPOINT } from '~/utils/store/endpoints'
import { SETTINGS, MAIN_MENU } from '~/utils/store/getters.names'
import {
  SET_MAIN_MENU,
  SET_MAIN_MENU_ERROR,
  SET_SETTINGS,
  SET_SETTINGS_ERROR
} from '~/utils/store/mutations.names'

export const state = () => ({
  settings: null,
  // flatmenus: [],
  error: false
})

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  [SETTINGS]: (state: any) => state.settings,
  [MAIN_MENU] (state: any) {
    if (state.settings != null) {
      return state.settings.menus.main_menu
    } else {
      return []
    }
  },
  [COUNTRIES] (state: any) {
    if (state.settings !== null) {
      return Object.keys(state.settings.countries).map((key: string) => {
        return {
          label: state.settings.countries[key],
          text: state.settings.countries[key],
          value: key
        }
      })
    } else {
      return []
    }
  }
  // [FLAT_MENU]: state => state.flatmenus
}

export const actions: ActionTree<RootState, RootState> = {
  async [FETCH_SETTINGS] ({ commit }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(SETTINGS_ENDPOINT)
        .then((data: any) => {
          commit(SET_SETTINGS, data)
          resolve(data)
        })
        .catch((e: any) => {
          commit(SET_SETTINGS_ERROR)
          reject(e)
        })
    })
  }
}

export const mutations: MutationTree<RootState> = {
  [SET_SETTINGS] (state: any, settings: any) {
    state.error = false
    // state.settings = settings;

    Vue.set(state, 'settings', settings)
  },

  [SET_SETTINGS_ERROR] (state: any) {
    state.settings = []
    state.error = true
  }

}
