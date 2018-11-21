import Vue from 'vue'
import Router from 'vue-router'
import mLogin from '@/components/Login.vue'
import mIndex from '@/components/Index.vue'
import mUserList from '@/components/UserList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'Index',
      component: mIndex
    },
    {
      path: '/login',
      name: 'Login',
      component: mLogin
    },
    {
      path: '/userlist',
      name: 'userlist',
      component: mUserList
    }
  ]
})
