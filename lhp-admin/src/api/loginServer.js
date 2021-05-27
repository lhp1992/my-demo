import request from '@/public/request'
import $$cache from './cache'

export function getSignUpData(data, params, headers) {
  return $$cache.getResponse('signUp', () => request({
    url: 'getSignUpData',
    method: 'post',
    data
  }))
}

export function putSignUpData(data, params) {
  return request({
    url: 'getSignUpData',
    method: 'put',
    data,
    params
  })
}




