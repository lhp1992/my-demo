import axios from 'axios'
import config from '@/config'
import { state } from './state'
const { serverApi, errorFnc } = config

const service = axios.create({
  baseURL: serverApi
})

service.interceptors.request.use(
  config => {
    state.waits++
    const token = '00000000000000000000000000000000'
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  error => {
    state.waits--
    // console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    state.waits--
    const res = response.data
    if (res.success && res.code == 0) {
      return res
    } else {
      errorFnc(res.message)
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    state.waits--
    // console.log('err' + error)
    // errorFnc(error.message)
    return Promise.reject(error)
  }
)

export default service