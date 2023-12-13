
export function getProps() {
  return {
    // 分割类型 = {space:空白,line:分割线}
    separatorType: {
      type: String,
      default: 'space',
    },
    // 高度 = [1,100]
    separatorHeight: {
      type: Number,
      default: 30,
    },
    // 分割线类型 = {solid:实线,dashed:虚线,dotted:点线}
    lineStyle: {
      type: String,
      default: 'solid',
    },
    // 左右留边 = {0:无边距,1:左右留边}
    marginX: {
      type: Number,
      default: 0,
    },
    // 辅助线颜色
    lineColor: {
      type: String,
      default: '#e5e5e5',
    },
  }
}
