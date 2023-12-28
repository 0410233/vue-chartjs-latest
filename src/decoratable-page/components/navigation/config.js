
/** 组件属性 */
export function getProps() {
  return {
    // 导航链接
    links: {
      type: Array,
      default: () => [],
    },
    // 样式 = {image:图文导航,text:文字导航}
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
