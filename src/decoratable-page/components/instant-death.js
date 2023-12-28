
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
