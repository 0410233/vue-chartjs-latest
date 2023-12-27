import { generateFormdata, generateWatchers } from '../utils'

/**
 * @typedef {object} Category
 * @property {number} id - 页面路径
 * @property {string} name - 分类名
 * @property {boolean} showAll - 是否显示全部
 * @property {number} showCount - 不显示全部时，指定显示商品数
 * @property {number[]} children - 子类 id 列表
 */

/** 组件属性 */
export function getProps() {
  return {
    /**
     * 商品分类
     * @type {Category[]}
     */
    cateList: {
      type: Array,
      default: () => [],
    },
    /** 布局方式 = {aside:左侧,top:顶部} */
    layout: {
      type: String,
      default: 'aside',
    },
    /** 是否显示名称 */
    isShowName: {
      type: Boolean,
      default: true,
    },
    /** 是否显示描述 */
    isShowDesc: {
      type: Boolean,
      default: true,
    },
    /** 是否显示价格 */
    isShowPrice: {
      type: Boolean,
      default: true,
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
    name: 'goods-category',
    label: '商品分类',
    cate: 'basic',
    // count: 0,
    limit: 100,
    data: getFormdata(),
  }
}

/** 验证规则 */
export function getRules(context) {
  return {
    cateList: {
      type: 'array',
      required: true,
      message: '请选择商品分类',
      defaultField: {
        type: 'object',
        fields: {
          name: {type: 'string', required: true, message: '分类名称不能为空'},
        }
      },
    }
  }
}

// /** 生成提交数据 */
// export function generateSubmitData(formdata) {
//   const data = clone(formdata)
//   data.cateList = data.cateList.map(cate => {
//     return {
//       id: cate.id,
//       menu: cate.menu,
//       showAll: cate.showAll,
//       showCount: cate.showCount,
//     }
//   })
//   return data
// }
