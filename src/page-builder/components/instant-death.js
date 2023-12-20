import { generateFormdata, generateWatchers } from './utils'

/** 组件属性 */
export function getProps() {
  return {
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
    // 是否显示拼团
    isShowGroupBookingPrice: {
      type: Boolean,
      default: true,
    },
    // 是否显示价格
    isShowPrice: {
      type: Boolean,
      default: true,
    },
    // 是否显示抢购倒计时
    isShowCountdown: {
      type: Boolean,
      default: true,
    },
    // 剩余库存
    isShowStockNum: {
      type: Boolean,
      default: true,
    },
    // 从商品里面拿秒杀活动的开始时间
    // startTime
    // endTime
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
    name: 'instant-death',
    label: '秒杀',
    cate: 'marketing',
    count: 0,
    limit: 50,
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
