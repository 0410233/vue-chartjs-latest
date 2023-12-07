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
    <el-form :model="formdata" class="options__form" label-position="left" label-width="80px">
      <el-form-item label="显示位置">
        <div class="flex items-center w-full">
          <span class="text-gray text-sm">{{ alignDisplay[formdata.textAlign] || '' }}</span>
          <el-radio-group class="ml-auto" size="mini"
            v-model="formdata.textAlign"
            @change="handleChange($event, 'textAlign')"
          >
            <el-radio-button label="left"><IconAlignLeft/></el-radio-button>
            <el-radio-button label="center"><IconAlignCenter/></el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="标题大小">
        <div class="flex items-center w-full">
          <span class="text-gray text-sm">{{ fontSizeDisplay[formdata.titleFontSize] || '' }}</span>
          <el-radio-group class="ml-auto" size="mini"
            v-model="formdata.titleFontSize"
            @change="handleChange($event, 'titleFontSize')"
          >
            <el-radio-button :label="16"><span style="font-size: 16px;">A</span></el-radio-button>
            <el-radio-button :label="14"><span style="font-size: 14px;">A</span></el-radio-button>
            <el-radio-button :label="12"><span style="font-size: 12px;">A</span></el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="描述大小">
        <div class="flex items-center w-full">
          <span class="text-gray text-sm">{{ fontSizeDisplay[formdata.descFontSize] || '' }}</span>
          <el-radio-group class="ml-auto" size="mini"
            v-model="formdata.descFontSize"
            @change="handleChange($event, 'descFontSize')"
          >
            <el-radio-button :label="16"><span style="font-size: 16px;">A</span></el-radio-button>
            <el-radio-button :label="14"><span style="font-size: 14px;">A</span></el-radio-button>
            <el-radio-button :label="12"><span style="font-size: 12px;">A</span></el-radio-button>
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
      fontSizeDisplay: {'16':'大(16号)','14':'小(14号)','12':'小(12号)'}
    }
  },
  watch: generateWatchers(props),
  methods: {
    handleChange(value, prop) {
      this.$emit('change', {[prop]: value})
    },
  },
}
</script>

<style lang="scss">
@import '../assets/style.scss';
</style>
