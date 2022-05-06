import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - note-frontend',
    title: 'note-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'apple-touch-icon', type: 'image/png', sizes: '180,180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '16,16', href: '/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32,32', href: '/favicon-32x32.png' },
      { rel: 'mask-icon', type: 'image/svg+xml', href: '/safari-pinned-tab.svg'},
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=PT+Serif|Open+Sans:300,400,600,700,800'},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/default.css',
  ],

  // Plugins to run before rendeplugring page: https://go.nuxtjs.dev/config-plugins
  // plugins: [
  //   {
  //     src: '~/plugins/amplify.js',
  //     mode: 'client'
  //   },
  // ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Configuration
  publicRuntimeConfig: {
    apiGateway: {
      REGION: process.env.APP_REGION || 'Chumby!',
      URL: process.env.APP_API_URL,
    },
    cognito: {
      REGION: process.env.APP_REGION,
      USER_POOL_ID: process.env.APP_USER_POOL_ID,
      APP_CLIENT_ID: process.env.APP_USER_POOL_CLIENT_ID,
      IDENTITY_POOL_ID: process.env.APP_IDENTITY_POOL_ID,
    },
    s3: {
      REGION: process.env.APP_REGION,
      BUCKET: process.env.APP_BUCKET,
    },
  },
  privateRuntimeConfig: {
    // Nothing as of yet
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
