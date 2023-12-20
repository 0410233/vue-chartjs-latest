import { generateFormdata, generateWatchers } from '../utils'

/** 组件属性 */
export function getProps() {
  return {
    /** 宽度 = [16,96] */
    viewWidth: {
      type: Number,
      default: 36,
    },
    /** 高度 = [16,96] */
    viewHeight: {
      type: Number,
      default: 36,
    },
    /** 圆角 = [16,96] */
    borderRadius: {
      type: Number,
      default: 36,
    },
    /** 背景色 */
    backgroundColor: {
      type: String,
      default: '#ffffff',
    },

    /** 是否描边 */
    isShowBorder: {
      type: Boolean,
      default: false,
    },
    /** 描边宽度 = [1,9] */
    borderWidth: {
      type: Number,
      default: 1,
    },
    /** 描边颜色 */
    borderColor: {
      type: String,
      default: '#d9d9d9',
    },

    /** 是否显示阴影 */
    isShowShadow: {
      type: Boolean,
      default: true,
    },
    /** 阴影颜色 */
    shadowColor: {
      type: String,
      default: 'rgba(0,0,0,0.1)',
    },
    /** 阴影大小 = [1,96] */
    shadowSize: {
      type: Number,
      default: 12,
    },

    /** 是否显示图标 */
    isShowIcon: {
      type: Boolean,
      default: true,
    },
    /** 自定义图标 */
    customIcon: {
      type: String,
      default: '',
    },
    /** 图标大小 = [12,48] */
    iconSize: {
      type: Number,
      default: 20,
    },
    /** 图标颜色 */
    iconColor: {
      type: String,
      default: '#409EFF',
    },

    /** 是否显示文案 */
    isShowText: {
      type: Boolean,
      default: false,
    },
    /** 文案内容 */
    textValue: {
      type: String,
      default: '联系客服',
    },
    /** 文字颜色 */
    textColor: {
      type: String,
      default: '#409EFF',
    },
    /** 文字大小 = [12,14,16] */
    textSize: {
      type: Number,
      default: 12,
    },

    /** 图文排列方式 = {horizontal:水平排列,vertical:垂直排列} */
    layout: {
      type: String,
      default: 'vertical',
    },
    /** 图文间距 = [0,20] */
    spacing: {
      type: Number,
      default: 4,
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
    name: 'customer-service',
    label: '客服',
    cate: 'basic',
    // count: 0,
    limit: 1,
    fixed: true,
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
