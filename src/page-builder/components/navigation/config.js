import { generateFormdata, generateWatchers } from '../utils'

/** 组件属性 */
export function getProps() {
  return {
    // 导航链接
    links: {
      type: Array,
      default: () => [],
    },
    // 样式 = {image:图文导航,text:文字导航}
    navStyle: {
      type: String,
      default: 'image',
    },
    // 布局方式 = {wrap:折行,scroll:横向滚动}
    layout: {
      type: String,
      default: 'wrap',
    },
    // 每行/每屏显示多少个 = [1,6]
    groupCount: {
      type: Number,
      default: 4,
    },
    // 背景色
    backgroundColor: {
      type: String,
      default: '#ffffff',
    },
    // 文字颜色
    fontColor: {
      type: String,
      default: '#333333',
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
    name: 'navigation',
    label: '图文导航',
    cate: 'basic',
    // count: 0,
    limit: 100,
    data: getFormdata(),
  }
}

/** 验证规则 */
export function getRules(context) {
  return {
    links: {
      type: 'array',
      required: true,
      message: '请选择链接',
      defaultField: {
        type: 'object',
        fields: {
          path: {type: 'string', required: true, message: '请选择链接'},
        }
      },
    }
  }
}

// /** 生成提交数据 */
// export function generateSubmitData(formdata) {
//   return clone(formdata)
// }
