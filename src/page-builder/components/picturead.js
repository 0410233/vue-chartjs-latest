import { generateFormdata, generateWatchers } from './utils'

/** 组件属性 */
export function getProps() {
  return {
    SwiperOption:{
      type:Object,
      default: () => {},
    },

    // 导航链接
    links: {
      type: Array,
      default: () => [],
    },
    imageList: {
      type: Array,
      default: () => [],
    },
    // 样式 = {image:图文导航,text:文字导航}
    pageMargin: {
      type: Number,
      default: 0,
    },
    type: {
      type: Number,
      default: 0,
    },
    pagingType: {
      type: Number,
      default: 0,
    },
    rowindividual: {
      type: Number,
      default: 2,
    },
    swiperType: {
      type: Number,
      default: 0,
    },
    borderRadius: {
      type: Number,
      default: 0,
    },
    imageMargin: {
      type: Number,
      default: 0,
    },
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
    name: 'picturead',
    label: '图片',
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
