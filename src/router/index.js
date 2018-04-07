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
import StudentAccount from '@/components/student/sub/StudentAccount'

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
          children:[
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
              component: StudentAccount
            }
          ]
        },
        {
          path: 'institutions/:id',
          component: InstitutionIndex,
          meta: {
            requiresAuth: true,
            requiresMySelf: true
          }
        }, 
        {
          path: 'managers/:id',
          component: ManagerIndex,
          meta: {
            requiresAuth: true,
            requiresMySelf: true
          }
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
      component : RegisterEmailValidation
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
