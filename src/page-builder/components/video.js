import { generateFormdata, generateWatchers } from './utils'

/** 组件属性 */
export function getProps() {
  return {
    links: {
        type: Array,
        default: () => [],
      },
      videosrc: {
        type: String,
        default: '',
      },
      autoplay:{
        type:Boolean,
        default: false,
      },
      isMuted:{
        type:Boolean,
        default: false,
      },
      showProgressBar:{
        type:Boolean,
        default: false,
      },
      coverUrl: {
        type: String,
        default: '',
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
    name: 'video',
    label: '视频',
    cate: 'basic',
    // count: 0,
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
