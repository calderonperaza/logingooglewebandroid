<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white">
        <q-btn flat dense round icon="menu" aria-label="Menu" />

        <q-toolbar-title> Mi App Quasar </q-toolbar-title>

        <!-- Contenedor del Usuario (se muestra si está autenticado) -->
        <div v-if="isAuthenticated" class="row items-center q-gutter-x-sm">
          <!-- Avatar + Menú desplegable -->
          <q-btn flat round dense>
            <q-avatar size="36px">
              <img
                v-if="user?.imageUrl || user?.picture"
                :src="user?.imageUrl || user?.picture"
                alt="Avatar"
              />
              <q-icon v-else name="person" />
            </q-avatar>

            <!-- Menú al hacer clic en el Avatar -->
            <q-menu auto-close class="q-pa-md">
              <div class="column items-center style-user-card" style="min-width: 200px">
                <q-avatar size="60px" class="q-mb-sm">
                  <img :src="user?.imageUrl || user?.picture" />
                </q-avatar>

                <div class="text-subtitle1 text-weight-bold">
                  {{ user?.givenName || user?.name }} {{ user?.familyName || '' }}
                </div>
                <div class="text-caption text-grey-7 q-mb-md">{{ user?.email }}</div>

                <q-btn
                  color="negative"
                  outline
                  icon="logout"
                  label="Cerrar Sesión"
                  class="full-width"
                  @click="handleSignOut"
                />
              </div>
            </q-menu>
          </q-btn>

          <!-- Nombre visible solo en pantallas medianas o grandes (gt-xs) -->
          <div class="gt-xs column text-left">
            <span class="text-weight-bold text-body2">
              {{ user?.givenName || user?.name }}
            </span>
            <span class="text-caption text-grey-3" style="font-size: 11px">
              {{ user?.email }}
            </span>
          </div>

          <!-- Botón de logout directo en el toolbar -->
          <q-btn flat round dense icon="logout" color="white" @click="handleSignOut">
            <q-tooltip>Cerrar Sesión</q-tooltip>
          </q-btn>
        </div>

        <!-- Botón para ir al Login si no hay sesión -->
        <q-btn v-else flat icon="login" label="Iniciar Sesión" to="/login" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'
import { GoogleSignIn } from '@capawesome/capacitor-google-sign-in'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()
const { user, isAuthenticated, clearUser } = useAuth()

const handleSignOut = async () => {
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
    // Redirigir a la pantalla de login
    router.push('/login')
  }
}
</script>
