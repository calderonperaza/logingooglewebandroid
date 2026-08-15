/*
Un composable en Vue 3 es una funcion reactiva y con acceso a estado y ciclo de vida
En desarrollo web es muy común querer reutilizar funcionalidades que dependen de un estado reactivo y de ciclos de vida.


*/

import { ref, computed } from 'vue'

// Estado reactivo global fuera de la función para compartirlo entre componentes
const user = ref(JSON.parse(localStorage.getItem('auth_user') || 'null'))
const idToken = ref(localStorage.getItem('auth_token') || 'null')

// Sincronización automática en tiempo real entre múltiples pestañas
window.addEventListener('storage', (event) => {
  if (event.key === 'auth_user') {
    user.value = event.newValue ? JSON.parse(event.newValue) : null
  }
  if (event.key === 'auth_token') {
    idToken.value = event.newValue
  }
})

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value)

  // Guardar datos en memoria y en localStorage
  const setUser = (userData, token = null) => {
    user.value = userData
    localStorage.setItem('auth_user', JSON.stringify(userData))

    if (token) {
      idToken.value = token
      localStorage.setItem('auth_token', token)
    }
  }

  // Eliminar datos
  const clearUser = () => {
    user.value = null
    idToken.value = null
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
  }

  return {
    user,
    idToken,
    isAuthenticated,
    setUser,
    clearUser,
  }
}
