import { generateFormdata, generateWatchers } from './utils'

/** 组件属性 */
export function getProps() {
  return {
    // 商品分类
    cateList: {
      type: Array,
      default: () => [],
    },
    // 布局方式 = {aside:左侧,top:顶部}
    layout: {
      type: String,
      default: 'aside',
    },
    // 是否显示名称
    isShowName: {
      type: Boolean,
      default: true,
    },
    // 是否显示描述
    isShowDesc: {
      type: Boolean,
      default: true,
    },
    // 是否显示价格
    isShowPrice: {
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
export function getWatchers(context) {
  const watchers = generateWatchers(getProps())
  return watchers
}

/** 元数据 */
export function getMeta() {
  return {
    name: 'goods-category',
    label: '商品分类',
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
