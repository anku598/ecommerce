import gql from "graphql-tag";

export function createAccountMutation(
  input: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  },
  siteUrl: string
) {
  (input as any).redirectUrl = `${siteUrl}/complete-registration/`;
  const query: string = String.raw`mutation {accountRegister(input: ${JSON.stringify(
    input
  )}) {
  requireConfirmation
    accountErrors {
      field
      message
      code
    }
    user {
      firstName
      lastName
      email
    }
}} `;
  return gql(query);
}
