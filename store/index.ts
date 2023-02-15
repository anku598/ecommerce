import {
  FETCH_MAIN_MENU,
  FETCH_SETTINGS,
  RETRIEVE_CREDENTIAL_FROM_STORAGE
} from '../utils/store/actions.names'

export const state = () => ({})

// type RootState = ReturnType<typeof state>;

export const actions = {
  async nuxtServerInit ({ dispatch }: { dispatch: any }) {
    await dispatch(`settings/${FETCH_SETTINGS}`)
  }
}
