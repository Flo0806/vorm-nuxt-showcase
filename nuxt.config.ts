// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    'vorm-nuxt',
    '@nuxtjs/tailwindcss'
  ],

  app: {
    head: {
      title: 'vorm-nuxt Showcase',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Interactive showcase of vorm-nuxt - The intuitive form engine for Nuxt 3'
        }
      ]
    }
  }
})
