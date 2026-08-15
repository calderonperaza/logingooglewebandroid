const { defineCapacitorConfig } = require('@quasar/app-vite/capacitor')

module.exports = defineCapacitorConfig({
  appId: 'com.esaapp.pruebagoogleauthwebandroid',
  appName: 'Quasar App',
  webDir: 'dist/spa',
  plugins: {
    GoogleSignIn: {
      scopes: ['profile', 'email'],
      clientId: '205298612426-rf8pnig8lq8srqd3ftokaeku2tb9v328.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
})
