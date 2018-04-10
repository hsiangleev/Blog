import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'

import App from './App.vue'
import VueResource from "vue-resource"

Vue.use(ElementUI)
Vue.use(VueResource)

// 注册路由
import route from "./router"
const router=route.router();

// 状态管理模式
import stor from "./store"
const store=stor.store();

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})
