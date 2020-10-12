import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

import testPath from './path_list/test'


// 路由列表
Vue.use(Router)

/**
 * 
 */

let routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页' // 页面标题
    }
  },
  ...testPath
]

// 添加404路由列表
routes = routes.concat(
  [
    {
    path: '*',
    component: () => import('@/views/404')
  }
])

// 新建路由实例
const router = new Router({
  mode: 'history',
  routes: routes,
})


// 根据 meta 修改页面标题
router.beforeEach((to, from, next) => {
  
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }

  // 不写会无法 resolve 对应的路由界面
  next()
})

export default router
