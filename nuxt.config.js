import { getCategories, getProducts } from './utils/sitemap'
import { createProxy } from './utils/proxy'

const BASE_API = `${process.env.VUE_APP_DEVHOST || 'localhost:8000'}`
// console.log(BASE_API);

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'LoveGen',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      {
        hid: 'fb-verification',
        name: 'facebook-domain-verification',
        content: 'ovoaxmz5kz4u1c373jqhl9v3ocrd31'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap-grid.min.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.8.2/css/all.css'
      }
    ],
    script: [
      // { src: "//cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.min.js" },
      // { src: "//cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/ScrollToPlugin.min.js" },
      {
        src:
          '//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.min.js'
      }
    ]
  },

  router: {
    middleware: ['toggles']
  },

  server: process.env.SOCKET
    ? {
      socket: process.env.SOCKET
    }
    : {
      port: 3000, // default: 3000
      host: '0.0.0.0', // default: localhost,
      timing: false
    },

  target: process.env.TARGET || 'server',

  env: {
    HOST:
      process.env.VUE_APP_STATIC_HOST ||
      process.env.VUE_APP_DEVBROWSERHOST ||
      process.env.VUE_APP_DEVHOST ||
      'http://localhost:3000',
    SITE_URL: process.env.SITE_URL || 'http://localhost:3000',
    SITE_COUNTRY: process.env.SITE_COUNTRY || 'IN'
    // BASE_API: process.env.VUE_APP_DEVHOST || "localhost:8000",
  },

  proxy: createProxy(
    process.env.VUE_APP_DEVHOST || 'localhost:8000',
    process.env.SERVER_SOCKET
  ),

  // axios: {
  //   baseURL: BASE_API,
  //   browserBaseURL:
  //     process.env.VUE_APP_DEVBROWSERHOST ||
  //     process.env.VUE_APP_DEVHOST ||
  //     "http://localhost:8000",
  //   prefix: "/api",
  //   proxy: true,
  // },

  sitemap: {
    cacheTime: 1000 * 60 * 60 * 3, // 3 hours.
    hostname: process.env.SITE_URL,
    gzip: true,
    exclude: ['/user/**', '/login', '/404'],
    routes: async () => {
      const data = []
      await getProducts(
        process.env.VUE_APP_DEVHOST || 'localhost:8000',
        (val) => {
          data.push(val)
        }
      )
      await getCategories(
        process.env.VUE_APP_DEVHOST || 'localhost:8000',
        (val) => {
          data.push(val)
        }
      )
      return data
    }
  },

  apollo: {
    clientConfigs: {
      default: '~/apollo.config.js'
    },
    authenticationType: 'JWT'
    // watchLoading: "~/plugins/apolloWatchLoading.js",
  },

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },

  publicRuntimeConfig: {
    HOST:
      process.env.VUE_APP_STATIC_HOST ||
      process.env.VUE_APP_DEVBROWSERHOST ||
      process.env.VUE_APP_DEVHOST ||
      'http://localhost:3000',
    SITE_URL: process.env.SITE_URL || 'http://localhost:3000',
    SITE_COUNTRY: process.env.SITE_COUNTRY || 'IN',
    BASE_API: process.env.VUE_APP_DEVHOST || 'localhost:8000',
    axios: {
      baseURL: process.env.VUE_APP_DEVHOST || 'localhost:8000',
      browserBaseURL:
        process.env.VUE_APP_DEVBROWSERHOST ||
        process.env.VUE_APP_DEVHOST ||
        'http://localhost:8000',
      prefix: '/api',
      proxy: true
    },

    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    },
    sitemap: {
      cacheTime: 1000 * 60 * 60 * 3, // 3 hours.
      hostname: process.env.SITE_URL,
      gzip: true,
      exclude: ['/user/**', '/login', '/404'],
      routes: async () => {
        const data = []
        await getProducts(
          process.env.VUE_APP_DEVHOST || 'localhost:8000',
          (val) => {
            data.push(val)
          }
        )
        await getCategories(
          process.env.VUE_APP_DEVHOST || 'localhost:8000',
          (val) => {
            data.push(val)
          }
        )
        return data
      }
    }
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    // '~assets/css/style.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    //  { src: '~/plugins/ScrollMagic.js', mode: 'client'}
    { src: '~/plugins/vue-plyr.js', mode: 'client' },
    { src: '~/plugins/vue-awesome-swiper.js', mode: 'client' },
    { src: '~/plugins/toast.js', mode: 'client' },
    { src: '~/plugins/vtooltip.js', mode: 'client' },
    { src: '~/plugins/vueDebounce.js' },
    { src: '~/plugins/stepwizard.js' }
    // { src: "@/plugins/infinite-loading", ssr: false, mode: "client" },
  ],

  // loading: '~/components/loaders/LoadingBar.vue',

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/google-analytics'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',

    '@nuxtjs/proxy',
    '@nuxtjs/dotenv',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/style-resources',
    'nuxt-vue-select',
    '@nuxtjs/sitemap',
    '@nuxtjs/dayjs'
  ],
  styleResources: {
    scss: ['~assets/css/style.scss']
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['gsap', 'qrcode-generator-es6']
  }
}
