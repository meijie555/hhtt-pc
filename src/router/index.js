import VueRouter from 'vue-router'
import Vue from 'vue'
import local from '@/utils/local'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Welcome from '@/views/Welcome'
import notFound from '@/views/404'
import Article from '@/views/Articles'
import Image from '@/views/Image'
import Publish from '@/views/Publish'
import Comment from '@/views/Comment'
import Setting from '@/views/Setting'
import Fans from '@/views/Fans'

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
        // 欢迎页面
        { path: '/', component: Welcome },
        // 内容管理
        { path: '/article', component: Article },
        // 素材管理
        { path: '/image', component: Image },
        // 发布文章
        { path: '/publish', component: Publish },
        // 评论管理
        { path: '/comment', component: Comment },
        // 粉丝管理
        { path: '/fans', component: Fans },
        // 个人设置
        { path: '/setting', component: Setting }
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
