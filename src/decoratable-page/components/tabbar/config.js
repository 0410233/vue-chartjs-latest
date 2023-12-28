import { getDefaultProps } from '../utils'

/**
 * @typedef {object} Link
 * @property {string} pagePath - 页面路径
 * @property {string} iconPath - 未选中图标
 * @property {string} selectedIconPath - 选中图标
 * @property {string} text - 导航标题
 */

/** 组件属性 */
export function getProps() {
  return Object.assign(getDefaultProps(), {
    /**
     * 底部导航
     * @type {Link[]}
     */
    links: {
      type: Array,
      default: () => [],
    },
    /** 未选中颜色 */
    textColor: {
      type: String,
      default: '#333333',
    },
    /** 选中颜色 */
    selectedTextColor: {
      type: String,
      default: '#333333',
    },
    /** 背景色 */
    backgroundColor: {
      type: String,
      default: '#ffffff',
    },
    /** 是否占位元素 */
    isPlaceholder: {
      type: Boolean,
      default: false,
    }
  })
}
