import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Login from '../views/Login'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home,
    meta: {
      middleware: ['auth'],
      title: 'Home'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: {
      middleware: ['check_auth'],
      title: 'Registro'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      middleware: ['check_auth'],
      title: 'Login'
    }
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/Categories.vue'),
    meta: {
      middleware: ['auth'],
      title: 'Categorias'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      middleware: ['auth'],
      title: 'Seus Dados'
    }
  },
  {
    path: '*',
    redirect: { name: 'home' },
    meta: {
      middleware: ['check_auth'],
      title: 'Não encontrado'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((routeTo, routeFrom, next) => {
  document.title = 'LINKS Vault | ' + routeTo.meta?.title

  const user_token = store.state?.user?.token
  const routeTo_middleware = routeTo.meta?.middleware ?? []

  let nextRoute = null
  if (routeFrom.name) {
    nextRoute = routeFrom
  }

  if (routeTo_middleware.includes("auth")) {
    if (user_token === undefined || user_token === null) {

      if (nextRoute === null) {
        nextRoute = {
          name: 'login'
        }
      }

      next(nextRoute)
    } else {
      next()
    }
  } else if (routeTo_middleware.includes("check_auth")) {
    if (user_token !== undefined && user_token !== null) {

      if (nextRoute == null) {
        nextRoute = {
          name: 'home'
        }
      }

      next(nextRoute)
    } else {
      next()
    }
  } else {
    next()
  }
})


export default router
