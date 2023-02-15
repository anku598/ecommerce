import { GetterTree, ActionTree, MutationTree, Module } from 'vuex'
import { ACCEPT_COOKIE, CHECK_COOKIE_CONSENT, DECLINE_COOKIE } from '~/utils/store/actions.names'
import { COOKIE_CONSENT } from '~/utils/store/getters.names'
import { RETRIEVE_COOKIE_CONSENT, SET_COOKIE_CONSENT_STATUS } from '~/utils/store/mutations.names'
import { CookiesState, RootState } from '~/utils/store/store.types'

const namespaced: boolean = false

export const state: CookiesState = {
  cookieAccepted: null
}

const getters: GetterTree<CookiesState, RootState> = {
  [COOKIE_CONSENT] (state) {
    return state.cookieAccepted
  }
}

export const actions: ActionTree<CookiesState, RootState> = {
  [ACCEPT_COOKIE] ({ commit }) {
    commit(SET_COOKIE_CONSENT_STATUS, true)
  },
  [DECLINE_COOKIE] ({ commit }) {
    commit(SET_COOKIE_CONSENT_STATUS, false)
  },
  [CHECK_COOKIE_CONSENT] ({ commit }) {
    commit(RETRIEVE_COOKIE_CONSENT)
  }
}

export const mutations: MutationTree<CookiesState> = {
  [SET_COOKIE_CONSENT_STATUS] (state, payload) {
    state.cookieAccepted = payload
    localStorage.setItem('cookieAccepted', payload.toString())
  },
  [RETRIEVE_COOKIE_CONSENT] (state) {
    const storeVal: string | null = localStorage.getItem('cookieAccepted')
    let val: boolean | null
    switch (storeVal) {
      case null:
        val = null
        break
      case 'true':
        val = true
        break
      case 'false':
        val = false
        break
      default:
        val = null
    }
    state.cookieAccepted = val
  }
}
