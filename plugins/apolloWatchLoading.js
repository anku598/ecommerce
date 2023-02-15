export default (isLoading, countModifier, nuxtContext) => {
  // console.log(isLoading);
  if (isLoading) {
    nuxtContext.$loading.start()
  } else {
    nuxtContext.$loading.finish()
  }
}
