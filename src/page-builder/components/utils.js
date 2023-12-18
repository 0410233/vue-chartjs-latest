import _ from 'lodash'

/** 获取默认值 */
export function getPropDefaultValue(props, propName) {
  const prop = props[propName]
  const defaultValue = prop.default
  if ((prop.type === Object || prop.type === Array)) {
    if (typeof defaultValue === 'function') {
      return defaultValue()
    } else {
      return _.cloneDeep(defaultValue)
    }
  } else {
    return defaultValue
  }
}

/** 生成表单数据 */
export function generateFormdata(props) {
  const formdata = {}
  Object.keys(props).forEach(key => {
    formdata[key] = getPropDefaultValue(props, key)
  })
  return formdata
}

/** 生成属性变化监听器 */
export function generateWatchers(props) {
  const watchers = {}
  Object.keys(props).forEach(key=> {
    watchers[key] = {
      handler(newValue) {
        if (!_.isEqual(this.formdata[key], newValue)) {
          this.formdata[key] = newValue
        }
      },
      immediate: true,
    }
  })
  return watchers
}

export function toNumber(val, min) {
  if (min == null || isNaN(min)) {
    min = 0
  }
  return Math.max(Number(val) || 0, min)
}
