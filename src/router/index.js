import VueRouter from 'vue-router'
import Vue from 'vue'
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

export default router
