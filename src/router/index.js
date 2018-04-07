import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/pages/IndexPage'
import Error403Page from '@/pages/error-pages/403'
import Error404Page from '@/pages/error-pages/404'

import { Message } from 'element-ui'
Vue.use(Router)
// main.js引入了VueRouter，所有的页面路由都写到router/index.js这个文件里
// 在创建的 router 对象中，如果不配置 mode，就会使用默认的 hash 模式，该模式下会将路径格式化为 #! 开头。
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage,
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
