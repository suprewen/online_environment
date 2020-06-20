import request from '@/utils/request'

// TODO 填接口
export function dosth (query) {
  return request({
    url: '',
    method: 'get',
    params: query
  })
}

export function getRecentHotWords () {
  return request({
    url: '/getRecentHotWords',
    method: 'get'
  })
}