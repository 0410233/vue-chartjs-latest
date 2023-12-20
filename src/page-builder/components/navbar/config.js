import { generateFormdata, generateWatchers } from '../utils'

/** 组件属性 */
export function getProps() {
  return {
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
    name: 'navbar',
    label: '顶部导航',
    cate: '',
    // count: 0,
    limit: 1,
    data: getFormdata(),
  }
}

/** 验证规则 */
export function getRules(context) {
  return {
    title: {type: 'string', required: true, message: '请输入页面标题'}
  }
}

// /** 生成提交数据 */
// export function generateSubmitData(formdata) {
//   return clone(formdata)
// }
