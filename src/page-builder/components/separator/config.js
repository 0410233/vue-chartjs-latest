import { generateFormdata, generateWatchers } from '../utils'

/** 组件属性 */
export function getProps() {
  return {
    // 分割类型 = {space:空白,line:分割线}
    separatorType: {
      type: String,
      default: 'space',
    },
    // 高度 = [1,100]
    separatorHeight: {
      type: Number,
      default: 30,
    },
    // 分割线类型 = {solid:实线,dashed:虚线,dotted:点线}
    lineStyle: {
      type: String,
      default: 'solid',
    },
    // 左右留边 = {0:无边距,1:左右留边}
    marginX: {
      type: Number,
      default: 0,
    },
    // 辅助线颜色
    lineColor: {
      type: String,
      default: '#e5e5e5',
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
    name: 'separator',
    label: '辅助分割',
    cate: 'basic',
    // count: 0,
    limit: 100,
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
