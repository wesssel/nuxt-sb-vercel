const DOMAIN = 'https://www.ngrave.io'

const STORYBLOK_TOKEN = 'eZ7U1qlVufxeKaUg1soAQQtt'
const LANGUAGES = ['en']
const LANGUAGE_DEFAULT = 'en'

export default defineNuxtConfig({
  components: {
    global: false,
  },
  app: {
    head: {
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#da532c' },
        { name: 'theme-color', content: '#ffffff' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      DOMAIN,
      API_URL: process.env.DEPLOY_URL || 'http://localhost:3000',
      LANGUAGE_DEFAULT,
      LANGUAGES,
      VUE_IS_PREVIEW: process.env.VUE_IS_PREVIEW === 'true',
      VUE_IS_TEST: process.env.VUE_IS_TEST === 'true',
    },
  },
  modules: [
    '~/modules/redirects',
    '~/modules/sitemap',
    '@nuxtjs/tailwindcss',
    [
      '@storyblok/nuxt',
      {
        accessToken: STORYBLOK_TOKEN,
        bridge: process.env.VUE_IS_PREVIEW === 'true',
      },
    ],
  ],

  sitemap: {
    hostname: DOMAIN,
    sbToken: STORYBLOK_TOKEN,
  },

  redirects: {
    sbToken: STORYBLOK_TOKEN,
  },

  nitro: {
    commonJS: {
      dynamicRequireTargets: [
        './node_modules/@vue/compiler-core',
        './node_modules/@vue/compiler-dom',
        './node_modules/@vue/compiler-ssr',
        './node_modules/vue/server-renderer',
        './node_modules/vue',
      ],
    },
  },

  css: ['swiper/swiper-bundle.css'],

  alias: {
    '@vue/compiler-core': '@vue/compiler-core',
    '@vue/compiler-dom': '@vue/compiler-dom',
    '@vue/compiler-ssr': '@vue/compiler-ssr',
    'vue/server-renderer': 'vue/server-renderer',
    'estree-walker': 'estree-walker',
    '@babel/parser': '@babel/parser',
  },

  hooks: {
    'vite:extendConfig': (config, { isClient, isServer }) => {
      if (isClient) {
        config.resolve.alias.vue = 'vue/dist/vue.esm-bundler'
      }
    },
  },
})
