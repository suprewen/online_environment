import request from '@/utils/request'

// TODO 填接口
export function dosth (query) {
  return request({
    url: '',
    method: 'get',
    params: query
  })
}

/**
 * 获取热词
 * @param {object} query
 * @return {Promise}
 */
export function getHotWords (query) {
  return request({
    url: '/analysis/hotwords',
    method: 'get',
    params: query
  })
}

/**
 * 获取敏感词
 * @param {object} query
 * @return {Promise}
 */
export function getSensitiveWords (query) {
  return request({
    url: '/analysis/sensitiveWords',
    method: 'get',
    params: query
  })
}

/**
 * 获取粗言秽语
 * @param {object} query
 * @return {Promise}
 */
export function getFoulWords (query) {
  return request({
    url: '/analysis/foulWords',
    method: 'get',
    params: query
  })
}

/**
 * 获取搜索词趋势
 * @param {object} query
 * @return {Promise}
 */
export function getSearchWord (query) {
  return request({
    url: '/trend/search',
    method: 'get',
    params: query
  })
}