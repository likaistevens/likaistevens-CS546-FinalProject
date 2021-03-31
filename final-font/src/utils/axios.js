// 封装axios的请求，返回重新封装的数据格式
// 对错误的统一处理
import axios from 'axios'

import { Message, Notification } from 'element-ui'

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  // 获取axios配置
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
      // withCredentials: true // 表示发起跨域访问并要求携带Cookie等认证信息
    }
    return config
  }
  // 设定拦截器
  interceptors(instance) {
    // 请求拦截器
    instance.interceptors.request.use((config) => {
      return config
    }, (err) => {
      // debugger
      const errResponse = err.response
      // Message({
      //   message: errResponse.data.error,
      //   type: 'error'
      // duration: 4 * 1000,
      // customClass: 'z-index-3000'
      // })
      console.log(errResponse.data.error)
      return Promise.reject(errResponse.data.error)
    })

    // 响应请求的拦截器
    instance.interceptors.response.use((res) => {
      if (res.status === 200) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(res)
      }
    }, (err) => {
      // error这个变量在控制台看不到具体属性
      // const config = err.config
      const errResponse = err.response // data即包含了后台传过来的错误信息
      // Message({
      //   message: errResponse.data.error,
      //   type: 'error'
      // duration: 4 * 1000,
      // customClass: 'z-index-3000'
      // })
      console.log(errResponse.data.error)
      return Promise.reject(errResponse.data.error)
    })
  }
  // 创建实例
  request(options) {
    const instance = axios.create()
    const newOptions = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(newOptions)
  }
  get(url, config) {
    const options = Object.assign({
      method: 'get',
      url: url
    }, config)
    return this.request(options)
  }
  post(url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default HttpRequest
