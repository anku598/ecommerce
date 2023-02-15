export default ({ app, redirect }: any) => {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken) {
    redirect('/login')
  }
}
