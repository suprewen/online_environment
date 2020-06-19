import axios from 'axios'
import { message } from 'ant-design-vue'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => config, error => {
  console.log(error)
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  const res = response.data

  // TODO 与后端协商，出错的 code
  if (res.code !== 200) {
    message.warning('oops! something went wrong!')
    return Promise.reject(new Error(res.message || 'Error'))
  }

  return res
}, error => {
  console.error(error)
  message.error(error.message)
  return Promise.reject(error)
})

export default service