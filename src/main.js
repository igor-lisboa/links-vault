import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'font-awesome/css/font-awesome.css'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(BootstrapVue)

Vue.use(VueSweetalert2);

Vue.config.productionTip = process.env.NODE_ENV !== 'production'

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')