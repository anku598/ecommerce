import { SET_SEARCH_NAV_TOGGLE } from '~/utils/store/mutations.names'
import { namespaced, NS_ANIM } from '~/utils/store/namespaces.names'

export default ({ store }: any) => {
  store.commit(namespaced(NS_ANIM, SET_SEARCH_NAV_TOGGLE), {
    fieldShow: false,
    animation: true
  })
}
