// 导出本地用户信息模块
const KEY = 'hhtt-pc'
const local = {
  // 存储
  setUser (user) {
    const jsonstr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonstr)
  },
  //   获取
  getUser () {
    const jsonstr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonstr)
  },
  //   删除
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}

export default local
