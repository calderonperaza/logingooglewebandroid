import { defineRouter } from '#q-app'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import routes from './routes.js'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : import.meta.env.QUASAR_VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE),
  })

  // PARA LAS RUTAS RESTRINGIDAS A LOGIN
  Router.beforeEach((to) => {
    const isAuthenticated = !!localStorage.getItem('auth_user')

    // 1. Si la ruta requiere auth y NO está autenticado -> Redirige a /login
    if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
      return '/login'
    }

    // 2. Si ya está autenticado e intenta ir a /login -> Redirige al Home /
    if (to.matched.some((record) => record.meta.requiresGuest) && isAuthenticated) {
      return '/'
    }

    // 3. Si no cumple ninguna condición anterior, permite la navegación normal
    return true
  })
  //PARA LAS RUTAS RESTRINGIDAS A LOGIN

  return Router
})
