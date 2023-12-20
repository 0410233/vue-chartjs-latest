import _ from 'lodash'
import { generateFormdata, generateWatchers } from '../utils'

/** 组件属性 */
export function getProps() {
  return {
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
  }
}

/** 表单数据 */
export function getFormdata() {
  const formdata = generateFormdata(getProps())
  return formdata
}

/** 监听器 */
export function getWatchers(context) {
  const watchers = generateWatchers(getProps())
  watchers.fixed = {
    handler(newValue) {
      if (!_.isEqual(this.formdata.fixed, newValue)) {
        this.formdata.fixed = newValue
        this.$emit('fixed-change', newValue)
      }
    },
    immediate: true,
  }
  return watchers
}

/** 元数据 */
export function getMeta() {
  return {
    name: 'search',
    label: '搜索商品',
    cate: 'basic',
    // count: 0,
    limit: 3,
    data: getFormdata(),
  }
}

/** 验证规则 */
export function getRules(context) {
  return {
    //
  }
}

// /** 生成提交数据 */
// export function generateSubmitData(formdata) {
//   return clone(formdata)
// }
