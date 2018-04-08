import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from '@/pages/LoginPage'
import EndpointPage from '@/pages/EndpointPage'
import Error403Page from '@/pages/error-pages/403'
import Error404Page from '@/pages/error-pages/404'

import StudentIndex from '@/components/student/StudentIndex'
import InstitutionIndex from '@/components/institution/InstitutionIndex'
import ManagerIndex from '@/components/manager/ManagerIndex'

import StudentRegisterPage from '@/pages/StudentRegisterPage'
import RegisterEmailValidation from '@/components/student/RegisterEmailValidation'
import InstitutionRegisterPage from '@/pages/InstitutionRegisterPage'

import StudentInfo from '@/components/student/sub/StudentInfo'
import CourseMarket from '@/components/student/sub/CourseMarket'
import StudentOrder from '@/components/student/sub/StudentOrder'
import Account from '@/components/account/Account'
import StudentStudyRecord from '@/components/student/sub/StudentStudyRecord'


import InstitutionCourse from '@/components/institution/sub/InstitutionCourse'
import InstitutionInfo from '@/components/institution/sub/InstitutionInfo'
import InstitutionOrder from '@/components/institution/sub/InstitutionOrder'
import InstitutionSettlement from '@/components/institution/sub/InstitutionSettlement'

import ManagerApproval from '@/components/manager/sub/ManagerApproval'
import ManagerInstitution from '@/components/manager/sub/ManagerInstitution'
import ManagerOrder from '@/components/manager/sub/ManagerOrder'
import ManagerSettlement from '@/components/manager/sub/ManagerSettlement'
import ManagerStudent from '@/components/manager/sub/ManagerStudent'

import { Message } from 'element-ui'

Vue.use(Router)
// main.js引入了VueRouter，所有的页面路由都写到router/index.js这个文件里
// 在创建的 router 对象中，如果不配置 mode，就会使用默认的 hash 模式，该模式下会将路径格式化为 #! 开头。
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: LoginPage,
    },
    {
      path: '/endpoint',
      component: EndpointPage,
      children: [
        {
          path: 'students/:id',
          component: StudentIndex,
          meta: {
            requiresAuth: true,
            requiresMySelf: true
          },
          children: [
            {
              path: 'info',
              component: StudentInfo
            },
            {
              path: 'course_market',
              component: CourseMarket
            },
            {
              path: 'orders',
              component: StudentOrder
            },
            {
              path: 'account',
              component: Account
            },
            {
              path: 'courses',
              component: StudentStudyRecord
            }
          ]
        },
        {
          path: 'institutions/:id',
          component: InstitutionIndex,
          meta: {
            requiresAuth: true,
            requiresMySelf: true
          },
          children: [
            {
              path: 'courses',
              component: InstitutionCourse
            },
            {
              path: 'info',
              component: InstitutionInfo
            },
            {
              path: 'orders',
              component: InstitutionOrder
            },
            {
              path: 'account',
              component: Account
            },
            {
              path: 'settlement',
              component: InstitutionSettlement
            }
          ]
        },
        {
          path: 'managers/:id',
          component: ManagerIndex,
          meta: {
            requiresAuth: true,
            requiresMySelf: true
          },
          children: [
            {
              path: 'approval',
              component: ManagerApproval
            },
            {
              path: 'orders',
              component: ManagerOrder
            },
            {
              path: 'account',
              component: Account
            },
            {
              path: 'settlement',
              component: ManagerSettlement
            },
            {
              path: 'students',
              component: ManagerStudent
            },
            {
              path: 'institutions',
              component: ManagerInstitution
            }
          ]
        },
      ]
    },
    {
      path: '/register/student',
      component: StudentRegisterPage,
    },
    {
      path: '/register/institution',
      component: InstitutionRegisterPage,
    },
    {
      path: '/register/validate/:activationId/:activationCode',
      component: RegisterEmailValidation
    },
    {
      path: '/error/403',
      component: Error403Page
    },
    {
      path: '*',
      component: Error404Page
    }
  ]
})
// 处理需要登录才能访问的页面
router.beforeEach((to, from, next) => {
  // 如果需要验证登录状态
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 如果没有登录
    if (localStorage.getItem('loginResult') === null) {
      Message.error('尚未登录，转至登录页面')
      next({
        path: '/',
        // to.fullPath表示把当前路由信息传递过去方便登录后跳转回
        query: { redirect: to.fullPath }
      })
    } else if (to.matched.some(record => record.meta.requiresMySelf)) {
      // 如果要求登录并且是本人访问
      if (to.params.id == JSON.parse(localStorage.getItem('loginResult')).id) {
        console.log('是本人访问，放行')
        next()
      } else {
        console.log('不是本人访问')
        Message.error('非来自本人的请求，拒绝访问')
        next('/error/403')
      }
    } else {
      // 如果登录，那么放行
      next()
    }
  } else {
    // 如果不需要验证，那么放行
    next()
  }
})
export default router
