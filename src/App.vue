<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { GoogleSignIn } from '@capawesome/capacitor-google-sign-in'
import { useQuasar } from 'quasar'
import { useAuth } from '/src/composables/useAuth'

const $q = useQuasar()
const router = useRouter()
const { setUser } = useAuth()

const CLIENT_ID = '205298612426-rf8pnig8lq8srqd3ftokaeku2tb9v328.apps.googleusercontent.com'

// Función helper para decodificar el JWT (id_token) recibido en la URL
const parseGoogleJwt = (idToken) => {
  try {
    const base64Url = idToken.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    )
    const payload = JSON.parse(jsonPayload)

    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      givenName: payload.given_name,
      familyName: payload.family_name,
      imageUrl: payload.picture,
    }
  } catch (e) {
    console.error('Error al decodificar JWT de Google:', e)
    return null
  }
}

onMounted(async () => {
  try {
    // 1. Inicialización de Google Sign-In
    await GoogleSignIn.initialize({
      clientId: CLIENT_ID,
      scopes: ['profile', 'email'],
      redirectUrl: window.location.origin,
    })

    // 2. Comprobar si la URL trae la respuesta de retorno de Google
    const hash = window.location.hash
    if (hash.includes('id_token=') || hash.includes('access_token=')) {
      const params = new URLSearchParams(hash.replace(/^#/, ''))
      const idToken = params.get('id_token')

      if (idToken) {
        // Decodificamos la información del perfil directamente desde el token
        const userData = parseGoogleJwt(idToken)

        if (userData) {
          // Guardamos en localStorage
          setUser(userData, idToken)

          $q.notify({
            type: 'positive',
            message: `¡Bienvenido ${userData.givenName || userData.name || ''}!`,
          })

          // Limpiamos la URL quitando los parámetros de token gigantes
          window.history.replaceState({}, document.title, window.location.pathname)

          // Redirigimos a la página principal
          router.push('/')
        }
      }
    }
  } catch (error) {
    console.error('Error al procesar la autenticación de Google:', error)
  }
})
</script>
