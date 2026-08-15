<template>
  <q-page class="flex flex-center">
    <div class="column items-center q-gutter-y-md" style="max-width: 400px; width: 100%">
      <q-icon name="account_circle" size="80px" color="primary" />
      <div class="text-h5 text-bold">Google Auth Demo</div>

      <template v-if="!isAuthenticated">
        <q-btn
          color="white"
          text-color="black"
          icon="img:https://developers.google.com/identity/images/g-logo.png"
          label="Iniciar Sesión con Google"
          no-caps
          class="full-width"
          @click="signIn"
        />
      </template>

      <template v-else>
        <q-card flat bordered class="full-width">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src="user?.imageUrl || user?.picture" alt="Avatar" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">
                {{ user?.givenName || user?.name }} {{ user?.familyName || '' }}
              </q-item-label>
              <q-item-label caption>{{ user?.email }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-card-actions align="right">
            <q-btn flat color="negative" label="Cerrar Sesión" @click="signOut" />
          </q-card-actions>
        </q-card>
      </template>
    </div>
  </q-page>
</template>

<script setup>
import { GoogleSignIn } from '@capawesome/capacitor-google-sign-in'
import { useQuasar } from 'quasar'
import { useAuth } from '/src/composables/useAuth'

import { useRouter } from 'vue-router'
const $q = useQuasar()
const { user, isAuthenticated, clearUser, setUser } = useAuth()
const router = useRouter()
const signIn = async () => {
  try {
    const result = await GoogleSignIn.signIn({
      redirectUrl: window.location.origin,
    })

    // 📱 EN ANDROID/iOS NATIVO:
    // La promesa resuelve DIRECTAMENTE aquí con el perfil del usuario (sin recargar la página).
    if (result && result.user) {
      setUser(result.user, result.idToken)

      $q.notify({
        type: 'positive',
        message: `¡Bienvenido ${result.user.givenName || result.user.name || ''}!`,
      })

      router.push('/')
    }
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error)
  }
}

const signOut = async () => {
  try {
    await GoogleSignIn.signOut()
  } catch (error) {
    console.warn('Advertencia al cerrar sesión:', error)
  } finally {
    clearUser()
    $q.notify({
      type: 'info',
      message: 'Sesión cerrada correctamente',
    })
  }
}
</script>
