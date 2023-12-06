<template>
  <div class="options">
    <h3 class="options__title">标题文本</h3>
    <el-form :model="formdata" class="options__form" label-position="top">
      <el-form-item label="标题">
        <el-input v-model="formdata.title"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="formdata.desc"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="formdata" class="options__form" label-position="left">
      <el-form-item label="显示位置" class="flex items-center">
        <div class="flex items-center w-full">
          <span class="text-gray">{{ alignDisplay[formdata.textAlign] || '' }}</span>
          <el-radio-group v-model="formdata.textAlign" size="mini" class="ml-auto">
            <el-radio-button label="left"><IconAlignLeft/></el-radio-button>
            <el-radio-button label="center"><IconAlignCenter/></el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  IconAlignLeft,
  IconAlignCenter,
} from '../icons'

const props = {
  title: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
  textAlign: {
    type: String,
    default: 'left',
  },
  titleFontSize: {
    type: Number,
    default: 16,
  },
  descFontSize: {
    type: Number,
    default: 12,
  },
  titleFontWeight: {
    type: Number,
    default: 600,
  },
  descFontWeight: {
    type: Number,
    default: 400,
  },
  titleColor: {
    type: String,
    default: '#323232'
  },
  descColor: {
    type: String,
    default: '#969799'
  },
  bgColor: {
    type: String,
    default: '#ffffff',
  },
}

/** 生成表单数据 */
const generateFormdata = (props) => {
  return Object.keys(props).reduce((res, key) => {
    res[key] = props[key].default == null ? null : props[key].default
    return res
  }, {})
}

/** 生成属性变化监听器 */
const generateWatchers = (props) => {
  return Object.keys(props).reduce((res, key) => {
    res[key] = {
      handler(newValue) {
        console.log({[key]: newValue})
        if (this.formdata[key] !== newValue) {
          this.formdata[key] = newValue
        }
      },
      immediate: true,
    }
    return res
  }, {})
}

export default {
  components: {
    IconAlignLeft,
    IconAlignCenter,
  },
  props,
  data() {
    return {
      formdata: generateFormdata(props),
      alignDisplay: {left: '居左显示', center: '居中显示'},
    }
  },
  watch: generateWatchers(props),
  methods: {
    onInput(e) {
      const content = e.target.value
      this.innerValue = content
      this.$emit('change', {content})
    }
  },
}
</script>

<style lang="scss" scoped>
.options {
  width: 100%;

  &__title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  &__title + &__form {
    margin-top: 16px;
  }
}

.flex {
  display: flex!important;
}

.items-center {
  align-items: center!important;
}

.flex-1 {
  flex: 1;
}

.w-full {
  width: 100%;
}

.ml-auto {
  margin-left: auto!important;
}

.text-gray {
  color: #a1a1a1;
}

.radio-icon {
  flex: none;
  width: 16px;
  height: 16px;
}

::v-deep .el-form-item.items-center .el-form-item__label {
  flex: none;
}

::v-deep .el-form-item.items-center .el-form-item__content {
  min-width: 0;
  flex: 1;
}

::v-deep .el-radio-button.el-radio-button--mini .el-radio-button__inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 28px;
  padding: 0;
}
</style>
