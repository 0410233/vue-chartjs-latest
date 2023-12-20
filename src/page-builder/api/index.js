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

/** 获取可装修页面列表 */
export function getDecoratablePages() {
  return [{
    name: '店铺首页',
    path: 'pages/merchant/home/index',
  }, {
    name: '店铺详情',
    path: 'pages/merchant/detail/index',
  }, {
    name: '商品分类',
    path: 'pages/merchant/category/index',
  }, {
    name: '其他1',
    path: 'pages/merchant/other1',
  }, {
    name: '其他2',
    path: 'pages/merchant/other2',
  }]
}

/**
 * 获取页面装修数据列表
 * @param {object} params
 * @param {number} [params.page]
 * @param {number} [params.limit]
 */
export function getPageDataList(params) {
  return request({
    url: '/mall/api/admin/merchantDecoration/list',
    method: 'GET',
    params,
  })
}

/** 保存装修数据 */
export function postSavePage(data) {
  return request({
    url: '/mall/api/admin/merchantDecoration/save',
    method: 'POST',
    data,
  })
}

/**
 * 删除装修数据
 * @param {number} id - 装修数据id
 */
export function postDeletePage(id) {
  return request({
    url: `/mall/api/admin/merchantDecoration/delete/${id}`,
    method: 'POST',
  })
}

/**
 * 查询装修数据
 * @param {number} id
 * @returns
 */
export function getPageData(id) {
  return request({
    url: `/mall/api/admin/merchantDecoration/getDetail/${id}`,
    method: 'GET',
  })
}

/**
 * 获取底部导航栏数据
 * @returns
 */
export function getTabbarData() {
  return request({
    url: `/mall/api/admin/merchantDecorationNavigation/getOneByMerId`,
    method: 'GET',
  })
}
