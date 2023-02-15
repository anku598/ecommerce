// apollo.config.js
export default function ({ $config }) {
  return {
    httpEndpoint: `${$config.BASE_API}/graphql/`,
    httpLinkOptions: {
      headers: {
        Country: $config.SITE_COUNTRY || 'IN'
      }
    }
  }
}
