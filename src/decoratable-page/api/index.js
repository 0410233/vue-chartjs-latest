import request from "@/utils/request.js";

/**
 * 获取页面装修数据
 * @param {object} data 
 * @param {number} data.merId - 商户id
 * @param {string} data.path - 页面路径
 * @returns 
 */
export function getDecorationData(data) {
  const url = 'merchantDecoration/getDetailByMerIdAndPath'
  return request.get(url, data, {noAuth:true})
}

/**
 * 获取分类商品列表
 * @param {object} data 
 * @param {number} data.page
 * @param {number} data.limit
 * @param {number} data.merId - 商户 id
 * @param {number[]} data.cateId - 分类 id（包含一级和二级分类 id 的列表）
 * @returns 
 */
export function getCateGoodsList(data) {
  return request.post(`product/merchant/shop/pro/list`, data, {noAuth:true});
}

/**
 * 获取商品列表
 * @param {object} data 
 * @param {number} data.page
 * @param {number} data.limit
 * @param {number} data.merId - 商户 id
 * @param {number[]} data.productIds - 商品 id 列表
 * @returns 
 */
export function getGoodsList(data) {
  return request.post(`product/merchant/shop/pro/list`, data, {noAuth:true});
}
