import { generateFormdata, generateWatchers } from './utils'

/** 组件属性 */
export function getProps() {
  return {
    swiperType: {
      type: Number,
      default: 0,
    },
     // 商品
     goodsList: {
      type: Array,
      default: () => [],
    },
    // 布局方式 = {col1:一行一个,col2:一行两个,list:列表模式}

    layout: {
      type: String,
      default: 'col2',
    },
    // 每行/每屏显示多少个 = [1,6]
    groupCount: {
      type: Number,
      default: 4,
    },
    backimg: {
      type: String,
      default: 'linear-gradient(150deg, #d24161 50%, #d24161d8 50%)',
    },
     // 样式 = {image:图文导航,text:文字导航}
     navStyle: {
      type: String,
      default: 'image',
    },
    iscoupon: {
      type: String,
      default: ''
    },
    merchant: {
      type: String,
      default: ''
    },
    product: {
      type: String,
      default: ''
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
    name: 'coupon',
    label: '优惠券',
    cate: 'marketing',
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
