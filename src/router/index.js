import VueRouter from 'vue-router'
import Vue from 'vue'
import local from '@/utils/local'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Welcome from '@/views/Welcome'
import notFound from '@/views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 登录
    { path: '/login', component: Login },
    // 首页
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎
        { path: '/', component: Welcome }
      ]
    },
    { path: '*', component: notFound }
  ]
})

router.beforeEach((to, from, next) => {
  const user = local.getUser()
  // 判断是否登录
  if (to.path !== '/login' && !user) return next('/login')
  next()
})

export default router
