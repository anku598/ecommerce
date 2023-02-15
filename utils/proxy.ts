export function createProxy(
  baseURL: string,
  socket: string | null | undefined = null
) {
  const proxySettings = {
    "/api": {
      changeOrigin: true,
      target: baseURL,
      xfwd: true,
      pathRewrite: { "^/api/api/": "/api/" },
    },
    "/cms": {
      changeOrigin: true,
      target: baseURL,
      pathRewrite: { "^/cms/cms/": "/cms/" },
    },
    "/documents": {
      changeOrigin: true,
      target: baseURL,
      pathRewrite: { "^/documents/documents/": "/documents/" },
    },
    "/feeds": {
      changeOrigin: true,
      target: baseURL,
      pathRewrite: { "^/feeds/feeds/": "/feeds/" },
    },
    "/digital-download": {
      changeOrigin: true,
      target: baseURL,
      pathRewrite: {
        "^/digital-download/digital-download/": "/digital-download/",
      },
    },
    "/plugins": {
      changeOrigin: true,
      target: baseURL,
      pathRewrite: { "^/plugins/plugins/": "/plugins/" },
    },

    "/dashboard": {
      changeOrigin: true,
      target: baseURL,
      pathRewrite: { "^/dashboard/dashboard/": "/dashboard/" },
    },
    "/static": {
      changeOrigin: true,
      target: baseURL,
      pathRewrite: { "^/static/static/": "/static/" },
    },
    "/media": {
      changeOrigin: true,
      target: baseURL,
      pathRewrite: { "^/media/media/": "/media/" },
    },
    "/graphql": {
      changeOrigin: true,
      target: baseURL,
      xfwd: true,
      pathRewrite: { "^/graphql/graphql/": "/graphql/" },
    },
  };

  if (socket) {
    (proxySettings["/api"] as any).target = { socketPath: socket };
  }
  return proxySettings;
}
