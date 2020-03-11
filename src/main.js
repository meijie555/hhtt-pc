import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import App from './App.vue'
import axios from '@/apis'

import MyBread from '@/components/my-bread'
Vue.component('my-bread', MyBread)

Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
