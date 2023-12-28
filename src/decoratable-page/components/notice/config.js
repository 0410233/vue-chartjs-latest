
/** 组件属性 */
export function getProps() {
  return {
    /** 公告内容 */
    caption: {
      type: String,
      default: '',
    },
    captionColor: {
      type: String,
      default: '#333333',
    },
    backgroundColor: {
      type: String,
      default: '#ffffff',
    },
  }
}
