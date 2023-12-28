import { getDefaultProps } from '../utils'

/** 组件属性 */
export function getProps() {
  return Object.assign(getDefaultProps(), {
    /** 标题 */
    title: {
      type: String,
      default: '（页面标题）',
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
