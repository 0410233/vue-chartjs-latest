import { getDefaultProps } from '../utils'

/** 组件属性 */
export function getProps() {
  return Object.assign(getDefaultProps(), {
    /** 是否固定到顶部 */
    fixed: {
      type: Boolean,
      default: false,
    },
    /** 圆角大小 */
    borderRadius: {
      type: Number,
      default: 48,
    },
    /** 显示位置 = {left:居左,center:居中} */
    textAlign: {
      type: String,
      default: 'left',
    },
    /** 搜索框高度 = [24,48] */
    barHeight: {
      type: Number,
      default: 32,
    },
    /** 外框颜色 */
    outerColor: {
      type: String,
      default: '#efeff5'
    },
    /** 文本颜色 */
    textColor: {
      type: String,
      default: '#858585'
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
