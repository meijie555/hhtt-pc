import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'
import JSONBIG from 'json-bigint'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [(data) => {
  // 后台的原始数据   理想情况 json字符串
  // 后台可能没有任何响应内容  data 值是 null
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]

// if (local.getUser()) {
//   axios.defaults.headers.Authorizations = `Bearer ${local.getUser().token}`
// }

// 请求拦截器
axios.interceptors.request.use(config => {
  // 1. 获取token
  const user = local.getUser() || {}
  // 2. 头部设置token
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 请求失败
  if (err.response.status === 401) {
    return router.push('/login')
  }
  return Promise.reject(err)
})

export default axios
