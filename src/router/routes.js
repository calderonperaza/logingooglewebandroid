const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('@/pages/IndexPage.vue') },
      { path: 'login', component: () => import('@/pages/LoginGoogle.vue') },
      {
        path: 'pagina',
        component: () => import('@/pages/PaginaRestringida.vue'),
        meta: { requiresAuth: true }, //Requiere inicio de sesión
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
]

export default routes
