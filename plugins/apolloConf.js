export default ({ app, $config }) => {
  const BASE_API = `${$config.BASE_API}`

  return {
    httpEndpoint: `${BASE_API}/graphql`,
    getAuth: () => {
      const token = app.$apolloHelpers.getToken()
      const hasToken = !!token
      if (hasToken) {
        return `JWT ${token}`
      } else {
        return undefined
      }
    }
  }
}
