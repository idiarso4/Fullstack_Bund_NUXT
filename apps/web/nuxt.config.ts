// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: 'latest',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui'
  ],
  css: ['~/assets/css/main.css'],
  devServer: {
    port: 3001
  },
  ssr: false,
  ui: {
    global: true,
    icons: ['lucide']
  }
})
