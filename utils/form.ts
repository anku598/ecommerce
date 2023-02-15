import { Error } from '~/graphqlTypes'

export function transformErrorData (errors: Error[]) {
  const data: any = {}
  for (let i = 0; i < errors.length; i++) {
    const error = errors[i]
    if (error.field && error.message) {
      data[error.field] = [error.message]
    }
  }
  return data
}
