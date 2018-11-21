// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引用axios，并设置基础URL为后端服务api地址
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8081/web_api'
// 将API方法绑定到全局
Vue.prototype.$axios = axios
axios.defaults.withCredentials = true
Vue.config.productionTip = false
//引入font-awesome,ElementUI
import 'font-awesome/css/font-awesome.min.css'
import './assets/theme/element-#8097B0/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
//引入公共JS
import common from "./components/comm/common.js";
Vue.prototype.common = common

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
