export default ({ app, redirect, store, route }: any) => {
  const hasToken = !!app.$apolloHelpers.getToken();
  if (!(hasToken || store.getters["user/guest"])) {
    redirect(`/login?next=${route.path}`);
  }
};
