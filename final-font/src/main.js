import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Moment from 'vue-moment'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'
import * as API from './api/login'

Vue.prototype.$echarts = echarts
Vue.prototype.API = API
Vue.use(ElementUI)
Vue.use(Moment)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
