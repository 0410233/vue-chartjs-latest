import { generateFormdata, generateWatchers } from '../utils'

/** 组件属性 */
export function getProps() {
  return {
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
  }
}

/** 表单数据 */
export function getFormdata() {
  const formdata = generateFormdata(getProps())
  return formdata
}

/** 监听器 */
export function getWatchers() {
  const watchers = generateWatchers(getProps())
  return watchers
}

/** 元数据 */
export function getMeta() {
  return {
    name: 'shop',
    label: '店铺信息',
    cate: 'basic',
    // count: 0,
    limit: 20,
    data: getFormdata(),
  }
}

/** 验证规则 */
export function getRules() {
  return {
    //
  }
}

// /** 生成提交数据 */
// export function generateSubmitData(formdata) {
//   return clone(formdata)
// }
