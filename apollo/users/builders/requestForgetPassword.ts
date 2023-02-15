import gql from 'graphql-tag'

export function requestForgetPassword (email: string, siteUrl: string) {
  const query: string = String.raw`mutation {requestPasswordReset(email: "${email}", redirectUrl: "${siteUrl}/user/reset-password/") {
    accountErrors {
      field
      message
      code
    }
}} `
  return gql(query)
}
