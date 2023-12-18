import request from '@/utils/request';
import { pages } from './pages'
import _ from 'lodash'

/**
 * 获取移动端页面列表
 * @param {object} data
 * @param {number} [data.page]
 * @param {number} [data.limit]
 * @param {string} [data.keywords]
 */
export function getPathList(data) {
  // @TEST
  data = data || {page: 1, limit: 6}
  const page = Math.max(parseInt(data.page) || 1, 1)
  const limit = Math.max(parseInt(data.limit) || 1, 1)
  const records = data.keywords
    ? pages.filter(x => x.name.indexOf(data.keywords) >= 0)
    : pages.slice()
  return Promise.resolve({
    total: pages.length,
    list: _.cloneDeep(records.slice((page-1)*limit, page*limit)),
  })
  // return request({
  //   url: '/mall/api/admin/merchantPickupPoint/save',
  //   method: 'POST',
  //   data,
  // })
}

/**
 * 获取商品列表
 * @param {object} data
 * @param {number} [data.page]
 * @param {number} [data.limit]
 * @param {string} [data.cateId]
 */
export function getProductList(data) {
  return request({
    url: '/mall/api/admin/merchant/product/merchant/shop/pro/list',
    method: 'POST',
    data,
  })
}
