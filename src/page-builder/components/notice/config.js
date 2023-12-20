import { generateFormdata, generateWatchers } from '../utils'

/** 组件属性 */
export function getProps() {
  return {
    /** 公告内容 */
    caption: {
      type: String,
      default: '',
    },
    captionColor: {
      type: String,
      default: '#333333',
    },
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

// /** 生成提交数据 */
// export function generateSubmitData(formdata) {
//   return clone(formdata)
// }
