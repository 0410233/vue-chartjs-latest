
/** 生成表单数据 */
export function generateFormdata(props) {
  const formdata = {}
  Object.keys(props).forEach(key => {
    formdata[key] = props[key].default
  })
  return formdata
}

/** 生成属性变化监听器 */
export function generateWatchers(props) {
  const watchers = {}
  Object.keys(props).forEach(key=> {
    watchers[key] = {
      handler(newValue) {
        // console.log({[key]: newValue})
        if (this.formdata[key] !== newValue) {
          this.formdata[key] = newValue
        }
      },
      immediate: true,
    }
  })
  return watchers
}
