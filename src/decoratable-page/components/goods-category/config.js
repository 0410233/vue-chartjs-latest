import { getDefaultProps } from '../utils'

/**
 * @typedef {object} Category
 * @property {number} id - 页面路径
 * @property {string} name - 分类名
 * @property {boolean} showAll - 是否显示全部
 * @property {number} showCount - 不显示全部时，指定显示商品数
 * @property {number[]} children - 子类 id 列表
 */

/** 组件属性 */
export function getProps() {
  return Object.assign(getDefaultProps(), {
    /**
     * 商品分类
     * @type {Category[]}
     */
    cateList: {
      type: Array,
      default: () => [],
    },
    /** 布局方式 = {aside:左侧,top:顶部} */
    layout: {
      type: String,
      default: 'aside',
    },
    /** 是否显示名称 */
    isShowName: {
      type: Boolean,
      default: true,
    },
    /** 是否显示描述 */
    isShowDesc: {
      type: Boolean,
      default: true,
    },
    /** 是否显示价格 */
    isShowPrice: {
      type: Boolean,
      default: true,
    },
  })
}
