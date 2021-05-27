import Axios from 'axios'
import qs from 'qs'
import config from '@/config'
const { serverApi, errorFnc } = config
import request from './request'

let $ajax = {
  get(url, params, headers = {}) {
    return request({
      method: 'get',
      url,
      params,
      headers
    })
  },
  post(url, params, headers = {}) {
    return request({
      method: 'post',
      url,
      data: params,
      headers
    })
  },
  postForm(url, params, headers = {}) {
    return request({
      method: 'post',
      url,
      data: qs.stringify(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        ...headers
      }
    })
  },
  put(url, params, headers = {}) {
    return request({
      method: 'put',
      url,
      data: params,
      headers
    })
  },
  putForm(url, params, headers = {}) {
    return request({
      method: 'put',
      url,
      data: qs.stringify(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        ...headers
      }
    })
  },
  delete(url, headers = {}) {
    return request({
      method: 'delete',
      url,
      headers
    })
  },
  upload(url, params, headers = {}) {
    let formdata = new FormData();
    for (let key in params) {
      formdata.append(key, params[key])
    }
    return request({
      method: 'post',
      url,
      data: formdata,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers
      }
    })
  },
}

export { $axios, $ajax }

export default {
  install (Vue, options) {
    Vue.prototype.$axios = Axios
    Vue.prototype.$ajax = $ajax
  }
}
