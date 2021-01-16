import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      token: null
    }
  }
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
