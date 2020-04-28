// import { Component } from 'react'
import axios from 'axios'
import './config'

// const base = 'http://120.76.157.227:10001'

// 请求前拦截
axios.interceptors.request.use(
  (config) => config,
  (err) => {
    console.log('请求超时')
    return Promise.reject(err)
  },
)

// 返回后拦截
axios.interceptors.response.use(
  (data) => data,
  (err) => {
    if (err.response.status === 504 || err.response.status === 404) {
      console.log('服务器被吃了⊙﹏⊙∥')
    } else if (err.response.status === 401) {
      console.log('登录信息失效⊙﹏⊙∥')
    } else if (err.response.status === 500) {
      console.log('服务器开小差了⊙﹏⊙∥')
    }
    return Promise.reject(err)
  },
)

// 获取local storage中的值
// const i18nextLng = localStorage.getItem('i18nextLng')
// const lng = i18nextLng === 'en' ? 'en' : 'zh'
// console.log('i18nextLng is:', i18nextLng)

class http {
  constructor() {
    this.i18nextLng = localStorage.getItem('i18nextLng')
    // this.lng = this.i18nextLng === 'en' ? 'en' : 'zh'
  }

  static get(url) {
    return axios.get(`${global.url.baseUrl}${url}`, {
      headers: { 'Accept-Language': this.i18nextLng === 'en' ? 'en' : 'zh' },
    })
  }
}

export default http
// // get请求
// const get = (url) => axios({
//   method: 'get',
//   url: `${base}${url}`,
// })

// Component.prototype.get = get
