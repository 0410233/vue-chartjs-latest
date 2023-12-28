import { getDefaultProps } from '../utils'

/** 组件属性 */
export function getProps() {
  return Object.assign(getDefaultProps(), {
    // 背景图片
    backgroundImage: {
      type: String,
      default: '',
    },
    // 店铺 logo
    logo: {
      type: String,
      default: '',
    },
    // 显示关注
    isShowFollow: {
      type: Boolean,
      default: true,
    },
    // 显示评分
    isShowStars: {
      type: Boolean,
      default: true,
    },
  })
}
