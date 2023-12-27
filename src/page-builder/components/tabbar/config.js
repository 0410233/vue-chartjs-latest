import { generateFormdata, generateWatchers } from '../utils'

/**
 * @typedef {object} Link
 * @property {string} pagePath - 页面路径
 * @property {string} iconPath - 未选中图标
 * @property {string} selectedIconPath - 选中图标
 * @property {string} text - 导航标题
 */

/** 组件属性 */
export function getProps() {
  return {
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
          text: {type: 'string', required: true, message: '请输入导航标题'},
        }
      },
      trigger: ['change','blur'],
    }
  }
}

// /** 生成提交数据 */
// export function generateSubmitData(formdata) {
//   return clone(formdata)
// }
