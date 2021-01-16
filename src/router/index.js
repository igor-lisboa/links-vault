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
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      public: true
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((routeTo, routeFrom, next) => {
  if (!routeTo.meta.public && !store.state.user.token) {
    next({
      name: 'login'
    })
  } else {
    next()
  }
})


export default router
