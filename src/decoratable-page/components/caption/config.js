
/** 组件属性 */
export function getProps() {
  return {
    /** 标题内容 */
    caption: {
      type: String,
      default: '标题',
    },
    /** 标题描述 */
    description: {
      type: String,
      default: '标题描述',
    },
    /** 显示位置 = {left:居左,center:居中} */
    textAlign: {
      type: String,
      default: 'left',
    },
    /** 标题大小 = {12:小,14:中,16:大} */
    captionFontSize: {
      type: Number,
      default: 14,
    },
    /** 描述大小 = {12:小,14:中,16:大} */
    descriptionFontSize: {
      type: Number,
      default: 14,
    },
    /** 标题字重 = {400:常规,600:加粗} */
    captionFontWeight: {
      type: Number,
      default: 600,
    },
    /** 描述字重 */
    descriptionFontWeight: {
      type: Number,
      default: 400,
    },
    /** 标题颜色 */
    captionColor: {
      type: String,
      default: '#323232'
    },
    /** 描述颜色 */
    descriptionColor: {
      type: String,
      default: '#969799'
    },
    /** 背景色 */
    backgroundColor: {
      type: String,
      default: '#ffffff',
    },
    errors: {
      type: [Array, Boolean],
      default: false,
    },
  }
}
