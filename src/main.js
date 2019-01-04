// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引用axios，并设置基础URL为后端服务api地址
var axios = require('axios')
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//访问后端方式：
// 1.使用web api
axios.defaults.baseURL = 'http://localhost:8082/web_api'
//axios.defaults.baseURL = 'http://116.62.38.203:8081/web_api'
// 2.使用mock 
//npmrequire('./mock');
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
//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
