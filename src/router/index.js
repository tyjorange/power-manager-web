import Vue from 'vue'
import Router from 'vue-router'
import mLogin from '@/components/Login.vue'
import mIndex from '@/components/Index.vue'
import mCommMeun from '@/components/comm/CommMeun.vue'
import mUserList from '@/components/pages/UserList.vue'
import mDeviceList from '@/components/pages/DeviceList.vue'
import mDashBoard from '@/components/pages/DashBoard.vue'
import mGradeTime from '@/components/pages/GradeTime.vue'
import mGradeSubentry from '@/components/pages/GradeSubentry.vue'
import mClassifySumm from '@/components/pages/ClassifySumm.vue'

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
          path: '/aa',
          name: '首页',
          icon: 'el-icon-menu',
          components: {root_view: mDashBoard}
        },{
          path: '1',//主菜单
          name: '系统运行监视和控制',
          icon: 'el-icon-view',
          components: {root_view: mCommMeun},
          children: [//子菜单
            {
              path: '/userlist',
              name: '实时数据',
              components: {main_view: mUserList}
            },{
              path: '/devicelist',
              name: '抄表数据',
              components: {main_view: mDeviceList}
            },{
              path: '/dashboard',
              name: '用能数据',
              components: {main_view: mDashBoard}
            }
          ]
        },{
          path: '2',//主菜单
          name: '电能质量监视和分析',
          icon: 'el-icon-printer',
          components: {root_view: mCommMeun},
          children: [//子菜单
            {
              path: '/21',
              name: '谐波含量',
              components: {main_view: mUserList}
            },{
              path: '/22',
              name: '电压闪变、扰动',
              components: {main_view: mDeviceList}
            },{
              path: '/23',
              name: '频率偏差',
              components: {main_view: mDashBoard}
            },{
              path: '/24',
              name: '三相不平衡',
              components: {main_view: mDashBoard}
            },{
              path: '/25',
              name: '功率因数',
              components: {main_view: mDeviceList}
            }
          ]
        },{
          path: '3',//主菜单
          name: '高精度电能计量',
          icon: 'el-icon-news',
          components: {root_view: mCommMeun},
          children: [//子菜单
            {
              path: '/31',
              name: '实时电能计量',
              components: {main_view: mUserList}
            },{
              path: '/32',
              name: '定时电能计量',
              components: {main_view: mDeviceList}
            }
          ]
        },{
          path: '4',//主菜单
          name: '电能消耗统计和分析',
          icon: 'el-icon-document',
          components: {root_view: mCommMeun},
          children: [//子菜单
            {
              path: '/41',
              name: '分级分项统计',
              components: {main_view: mGradeSubentry}
            },{
              path: '/42',
              name: '分级分时统计',
              components: {main_view: mGradeTime}
            },{
              path: '/43',
              name: '分时计费统计',
              components: {main_view: mDashBoard}
            },{
              path: '/44',
              name: '分时电度统计',
              components: {main_view: mDashBoard}
            },{
              path: '/45',
              name: '图表统计',
              components: {main_view: mDashBoard}
            },{
              path: '/46',
              name: '分类汇总统计',
              components: {main_view: mClassifySumm}
            },{
              path: '/47',
              name: '同期对比分析',
              components: {main_view: mDashBoard}
            },{
              path: '/48',
              name: '用能趋势分析',
              components: {main_view: mDashBoard}
            },{
              path: '/49',
              name: '分时用能分析',
              components: {main_view: mDashBoard}
            }
          ]
        },{
          path: '/a',//主菜单
          name: '报警和事件管理',
          icon: 'el-icon-bell',
          components: {root_view: mCommMeun},
        },{
          path: '/b',//主菜单
          name: '历史数据管理',
          icon: 'el-icon-date',
          components: {root_view: mCommMeun},
        },{
          path: '5',//主菜单
          name: '用户权限管理',
          icon: 'el-icon-service',
          components: {root_view: mCommMeun},
          children: [//子菜单
            {
              path: '/51',
              name: '用户管理',
              components: {main_view: mUserList}
            }
          ]
        }
      ]
    }
  ]
})
