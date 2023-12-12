<template>
  <div class="options">
    <h4 class="options__title">辅助分割</h4>
    <el-form :model="formdata" class="options__form" label-position="left" label-width="90px"
      @submit.native.prevent="noop"
    >
      <el-form-item label="分割类型">
        <div class="flex items-center w-full">
          <span class="text-gray text-sm">{{ typeDisplay[formdata.separatorType] || '' }}</span>
          <el-radio-group class="ml-auto" size="mini"
            v-model="formdata.separatorType"
            @change="handleChange($event, 'separatorType')"
          >
            <el-radio-button label="space">空白</el-radio-button>
            <el-radio-button label="line">辅助线</el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="高度">
        <el-slider size="small"
          v-model="formdata.separatorHeight"
          :min="1"
          :max="100"
          show-input
          input-size="mini"
          :show-input-controls="false"
          @input="handleChange($event, 'separatorHeight')"
        ></el-slider>
      </el-form-item>
      <template v-if="formdata.separatorType === 'line'">
        <el-form-item label="选择样式">
          <div class="flex items-center w-full">
            <span class="text-gray text-sm">{{ lineStyleDisplay[formdata.lineStyle] || '' }}</span>
            <el-radio-group class="ml-auto" size="mini"
              v-model="formdata.lineStyle"
              @change="handleChange($event, 'lineStyle')"
            >
              <el-radio-button label="solid">实线</el-radio-button>
              <el-radio-button label="dashed">虚线</el-radio-button>
              <el-radio-button label="dotted">点线</el-radio-button>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="左右边距">
          <div class="flex items-center w-full">
            <span class="text-gray text-sm">{{ marginDisplay[formdata.marginX] || '' }}</span>
            <el-radio-group class="ml-auto" size="mini"
              v-model="formdata.marginX"
              @change="handleChange($event, 'marginX')"
            >
              <el-radio-button :label="0">无边距</el-radio-button>
              <el-radio-button :label="1">留边</el-radio-button>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="辅助线颜色">
          <div class="flex items-center w-full">
            <span class="text-gray text-sm">{{ formdata.lineColor }}</span>
            <el-button type="text" class="ml-auto" @click="reset('lineColor')">重置</el-button>
            <el-color-picker v-model="formdata.lineColor" class="ml-8px" size="small"
              @change="handleChange($event, 'lineColor')"
            ></el-color-picker>
          </div>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import { generateFormdata, generateWatchers } from './utils'
import { getProps } from './separator'

export default {
  components: {},
  props: getProps(),
  data() {
    return {
      formdata: generateFormdata(getProps()),
      typeDisplay: {space: '空白分割', line: '辅助线'},
      lineStyleDisplay: {solid:'实线',dashed:'虚线',dotted:'点线'},
      marginDisplay: ['无边距','左右留边']
    }
  },
  watch: generateWatchers(getProps()),
  methods: {
    /** 修改属性值 */
    handleChange(value, prop) {
      console.log('handleChange', {[prop]: value})
      this.$emit('change', {[prop]: value})
    },
    /** 重置属性值 */
    reset(prop) {
      const meta = getProps()[prop]
      if (meta && Object.prototype.hasOwnProperty.call(meta, "default")) {
        this.handleChange(meta.default, prop)
      } else {
        this.handleChange(null, prop)
      }
    },
    noop() {},
  },
}
</script>

<style lang="scss">
@import '../assets/utils.scss';
@import '../assets/view-options.scss';
</style>
./separator