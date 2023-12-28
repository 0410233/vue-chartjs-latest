import { GET_APP_STATUS_HEIGHT } from "@/config/webApp.js"

export function getDefaultProps() {
  return {
    /** 商户 id */
    merId: {
      type: Number,
      default: 0,
    },
    /** 是否占位元素 */
    isPlaceholder: {
      type: Boolean,
      default: false,
    }
  }
}

export function clone(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (error) {
    return obj
  }
}

export function toNumber(val, min) {
  if (min == null || isNaN(min)) {
    min = 0
  }
  return Math.max(Number(val) || 0, min)
}

export function getRect(context, selector) {
  const query = uni.createSelectorQuery().in(context)
  return new Promise(resolve => {
    query.select(selector).boundingClientRect(resolve).exec()
  })
}

export function getStatusBarHeight() {
  const height = Number(GET_APP_STATUS_HEIGHT())
  if (height > 0) {
    return height
  }
  try {
    return uni.getSystemInfoSync().statusBarHeight
  } catch {}
  return 0
}

export function getSafeAreaBottom() {
  try {
    const sysinfo = uni.getSystemInfoSync()
    // console.log('sysinfo', sysinfo)
    // 安全区域
    const safeArea = sysinfo.safeArea
    // 可视区域高度 - 适配横竖屏场景
    const screenHeight = Math.max(sysinfo.screenHeight, sysinfo.screenWidth)
    const safeHeight = Math.max(safeArea.height, safeArea.width)
    return screenHeight - safeHeight - sysinfo.statusBarHeight
  } catch {}
  return 0
}

export function getSafeAreaHeight() {
  try {
    // 安全区域
    const safeArea = uni.getSystemInfoSync().safeArea
    return Math.max(safeArea.height, safeArea.width)
  } catch {}
  return 600
}
