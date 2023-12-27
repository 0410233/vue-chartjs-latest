import _ from 'lodash'
import Schema from 'async-validator';
import useErrors from './mixins/useErrors'

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

export function clone(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (error) {
    return _.cloneDeep(obj)
  }
}

/**
 * 验证表单数据
 * @returns {Promise<Array<{field: string, message: string}>>}
 */
export async function validate(formdata, rules) {
  // console.log('validate', {formdata, rules})
  if (!_.isObject(formdata) || !_.isObject(rules) || _.isEmpty(rules)) {
    return []
  }
  try {
    await new Schema(rules).validate(formdata)
  } catch (err) {
    // console.log('validate errors', {err})
    if (err && Array.isArray(err.errors)) {
      return err.errors
    }
  }
  return []
}

/** 生成表单组件配置 */
export function generateFormOptions(config, options) {
  const props = config.getProps()
  // _.keys()
  const mixin = {
    props,
    data() {
      return {
        meta: config.getMeta(),
        formdata: config.getFormdata(),
        rules: config.getRules(),
      }
    },
    watch: config.getWatchers(),
    methods: {
      /** 修改属性值 */
      handleChange(value, prop) {
        // console.log('handleChange', {value})
        this.$emit('change', {[prop]: value})

        // 校验该字段
        this.validate(prop)
      },
      /** 重置属性值 */
      reset(prop) {
        const value = getPropDefaultValue(props, prop)
        this.handleChange(value, prop)
      },
      /** 执行表单验证 */
      async validate(field) {
        // console.log('on form validate', arguments)
        // const errors = await validate(this.formdata, config.getRules())
        // this.$emit('validate', errors)
        // return errors

        const rules = {[field]: this.rules[field]}
        const formdata = {[field]: this.formdata[field]}
        const errors = await validate(formdata, rules)
        if (!errors.length) {
          errors.push({field, message: undefined})
        }
        // console.log('validate field', clone({field, rules, formdata, errors}))
        this.$emit('validate', errors)
        return errors
      },
      /** 什么都不做 */
      noop() {},
    },
  }

  options = options || {}
  if (!Array.isArray(options.mixins)) {
    options.mixins = []
  }
  options.mixins.push(useErrors, mixin)

  return options
}

/** 生成列表组件配置 */
export function generateItemOptions(config, options) {
  const mixin = {
    props: {
      count: {
        type: Number,
        default: 0,
      }
    },
    data() {
      return {
        meta: config.getMeta(),
      }
    },
  }

  options = options || {}
  if (!Array.isArray(options.mixins)) {
    options.mixins = []
  }
  options.mixins.push(mixin)

  return options
}
