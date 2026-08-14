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
                <img :src="user.profile?.imageUrl" alt="Avatar" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">{{ user.profile?.name }}</q-item-label>
              <q-item-label caption>{{ user.profile?.email }}</q-item-label>
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
import { ref, onMounted } from 'vue'
import { SocialLogin } from '@capgo/capacitor-social-login'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const user = ref(null)

//const WEB_CLIENT_ID = '205298612426-934ctufpon5pfhap4sl9rvopf7ios2ra.apps.googleusercontent.com'
//nuevo capgo
const WEB_CLIENT_ID = '205298612426-rf8pnig8lq8srqd3ftokaeku2tb9v328.apps.googleusercontent.com'

onMounted(async () => {
  try {
    await SocialLogin.initialize({
      google: {
        webClientId: WEB_CLIENT_ID,
        mode: 'online',
      },
    })
  } catch (e) {
    console.error('Error al inicializar SocialLogin:', e)
  }
})

const signIn = async () => {
  try {
    const result = await SocialLogin.login({
      provider: 'google',
      options: {
        scopes: ['profile', 'email'],
      },
    })

    user.value = result.result
    $q.notify({
      type: 'positive',
      message: `¡Bienvenido ${user.value.profile?.name || ''}!`,
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
    await SocialLogin.logout({ provider: 'google' })
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
