
export function getProps() {
  return {
    // 标题内容
    caption: {
      type: String,
      default: '标题',
    },
    // 标题描述
    description: {
      type: String,
      default: '标题描述',
    },
    // // 样式类型 = {normal:传统样式,weixin:微信图文样式}
    // style: {
    //   type: String,
    //   default: 'normal',
    // },
    // 显示位置 = {left:居左,center:居中}
    textAlign: {
      type: String,
      default: 'left',
    },
    // 标题大小 = {12:小,14:中,16:大}
    captionFontSize: {
      type: Number,
      default: 16,
    },
    // 描述大小 = {12:小,14:中,16:大}
    descriptionFontSize: {
      type: Number,
      default: 12,
    },
    // 标题字重 = {400:常规,600:加粗}
    captionFontWeight: {
      type: Number,
      default: 600,
    },
    // 描述字重
    descriptionFontWeight: {
      type: Number,
      default: 400,
    },
    // 标题颜色
    captionColor: {
      type: String,
      default: '#323232'
    },
    // 描述颜色
    descriptionColor: {
      type: String,
      default: '#969799'
    },
    // 背景色
    backgroundColor: {
      type: String,
      default: '#ffffff',
    },
  }
}
