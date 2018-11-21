import Vue from 'vue'
import Router from 'vue-router'
import mLogin from '@/components/Login.vue'
import mIndex from '@/components/Index.vue'
import mUserList from '@/components/NavBarItem/UserList.vue'
import mDeviceList from '@/components/NavBarItem/DeviceList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: mLogin,
      hidden: true
    },
    {
      path: '/index',
      name: 'Index',
      component: mIndex,
      children: [
        {
          path: '/userlist',
          name: 'userlist',
          component: mUserList,
        },
        {
          path: '/devicelist',
          name: 'device',
          component: mDeviceList
        },
      ]
    }
  ]
})
