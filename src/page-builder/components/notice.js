import { generateFormdata, generateWatchers } from './utils'

/** 组件属性 */
export function getProps() {
  return {
    // 标题内容
    gg: {
      type: Array,
      default: () => [],
    },
    caption: {
      type: String,
      default: '',
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
  return watchers
}

/** 元数据 */
export function getMeta() {
  return {
    name: 'notice',
    label: '公告',
    cate: 'basic',
    // count: 0,
    limit: 10,
    data: getFormdata(),
  }
}

/** 验证规则 */
export function getRules(context) {
  return {
    //
  }
}
