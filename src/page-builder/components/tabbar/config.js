import { generateFormdata, generateWatchers } from '../utils'

/** 组件属性 */
export function getProps() {
  return {
    /** 底部导航 */
    links: {
      type: Array,
      default: () => [],
    },
    /** 选中颜色 */
    textColor: {
      type: String,
      default: '#333333',
    },
    /** 未选中颜色 */
    selectedTextColor: {
      type: String,
      default: '#333333',
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
    name: 'tabbar',
    label: '底部导航',
    cate: '',
    // count: 0,
    limit: 1,
    data: getFormdata(),
  }
}

/** 验证规则 */
export function getRules(context) {
  return {
    links: {
      type: 'array',
      required: true,
      min: 2,
      message: '请至少添加两个导航',
      defaultField: {
        type: 'object',
        fields: {
          iconPath: {type: 'string', required: true, message: '请选择图标'},
          selectedIconPath: {type: 'string', required: true, message: '请选择图标'},
          name: {type: 'string', required: true, message: '请输入标题'},
        }
      },
    }
  }
}

// /** 生成提交数据 */
// export function generateSubmitData(formdata) {
//   return clone(formdata)
// }
