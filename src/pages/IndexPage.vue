<template>
  <q-page class="flex flex-center">
    <div class="column items-center q-gutter-y-md" style="max-width: 400px; width: 100%">
      <q-icon name="account_circle" size="80px" color="primary" />

      <div class="text-h5 text-bold">Google Auth Demo</div>

      <template v-if="!user">
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
                <img :src="user.imageUrl" alt="Avatar" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">{{ user.displayName }}</q-item-label>
              <q-item-label caption>{{ user.email }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-card-section>
            <div class="text-caption text-grey-8 ellipsis-3-lines">
              <strong>ID Token:</strong> {{ user.authentication?.idToken }}
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat color="negative" label="Cerrar Sesión" @click="signOut" />
          </q-card-actions>
        </q-card>
      </template>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import { Capacitor } from '@capacitor/core'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const user = ref(null)

const CLIENT_ID_WEB = '205298612426-934ctufpon5pfhap4sl9rvopf7ios2ra.apps.googleusercontent.com'

onMounted(() => {
  // En plataforma Web se requiere llamar a initialize() explicitamente
  if (Capacitor.getPlatform() === 'web') {
    GoogleAuth.initialize({
      clientId: CLIENT_ID_WEB,
      scopes: ['profile', 'email'],
      grantOfflineAccess: false, // se puso en false
    })
  }
})

const signIn = async () => {
  try {
    const response = await GoogleAuth.signIn()
    user.value = response
    $q.notify({
      type: 'positive',
      message: `¡Bienvenido ${response.givenName}!`,
    })
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error)
    $q.notify({
      type: 'negative',
      message: 'Error al iniciar sesión con Google',
    })
  }
}

const signOut = async () => {
  try {
    await GoogleAuth.signOut()
    user.value = null
    $q.notify({
      type: 'info',
      message: 'Sesión cerrada correctamente',
    })
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}
</script>
