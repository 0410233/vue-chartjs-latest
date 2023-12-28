
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
