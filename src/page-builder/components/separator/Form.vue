<template>
  <div class="options">
    <h4 class="options__title">{{ meta.label }}</h4>
    <el-form class="options__form"
      size="small"
      :model="formdata"
      :rules="rules"
      label-position="left"
      label-width="72px"
      @submit.native.prevent="noop"
    >
      <el-form-item prop="separatorType" label="分割类型">
        <div class="flex items-center w-full">
          <!-- <span class="el-form-item__value">{{ typeDisplay[formdata.separatorType] || '' }}</span> -->
          <el-radio-group class="ml-auto" size="small"
            v-model="formdata.separatorType"
            @change="handleChange($event, 'separatorType')"
          >
            <el-radio-button label="space">空白</el-radio-button>
            <el-radio-button label="line">横线</el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <!-- <el-form-item label="高度">
        <el-slider size="small"
          v-model="formdata.separatorHeight"
          :min="1"
          :max="100"
          show-input
          input-size="mini"
          :show-input-controls="false"
          @input="handleChange($event, 'separatorHeight')"
        ></el-slider>
      </el-form-item> -->
      <el-form-item prop="separatorHeight" label="整体高度">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.separatorHeight }}px</span>
          <el-slider class="ml-8px flex-1" size="small"
            v-model="formdata.separatorHeight"
            :min="1"
            :max="100"
            @input="handleChange($event, 'separatorHeight')"
          ></el-slider>
        </div>
      </el-form-item>
      <template v-if="formdata.separatorType === 'line'">
        <el-form-item prop="lineStyle" label="选择样式">
          <div class="flex items-center w-full">
            <!-- <span class="el-form-item__value">{{ lineStyleDisplay[formdata.lineStyle] || '' }}</span> -->
            <el-radio-group class="ml-auto" size="small"
              v-model="formdata.lineStyle"
              @change="handleChange($event, 'lineStyle')"
            >
              <el-radio-button label="solid">实线</el-radio-button>
              <el-radio-button label="dashed">虚线</el-radio-button>
              <el-radio-button label="dotted">点线</el-radio-button>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item prop="marginX" label="左右边距">
          <div class="flex items-center w-full">
            <!-- <span class="el-form-item__value">{{ marginDisplay[formdata.marginX] || '' }}</span> -->
            <el-radio-group class="ml-auto" size="small"
              v-model="formdata.marginX"
              @change="handleChange($event, 'marginX')"
            >
              <el-radio-button :label="0">无边距</el-radio-button>
              <el-radio-button :label="1">留边</el-radio-button>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item prop="lineColor" label="横线颜色">
          <div class="flex items-center w-full">
            <span class="el-form-item__value">{{ formdata.lineColor }}</span>
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
// import { getPropDefaultValue } from './utils'
// import {
//   getProps,
//   getFormdata,
//   getWatchers,
//   getMeta,
// } from './separator'
// import useErrors from './mixins/useErrors'

// export default {
//   mixins: [useErrors],
//   components: {},
//   props: getProps(),
//   data() {
//     return {
//       meta: getMeta(),
//       formdata: getFormdata(),
//       typeDisplay: {space: '空白分割', line: '辅助线'},
//       lineStyleDisplay: {solid:'实线',dashed:'虚线',dotted:'点线'},
//       marginDisplay: ['无边距','左右留边'],
//     }
//   },
//   watch: getWatchers(),
//   methods: {
//     /** 修改属性值 */
//     handleChange(value, prop) {
//       // console.log('handleChange', {[prop]: value})
//       this.$emit('change', {[prop]: value})
//     },
//     /** 重置属性值 */
//     reset(prop) {
//       const value = getPropDefaultValue(getProps(), prop)
//       this.handleChange(value, prop)
//     },
//     noop() {},
//   },
// }

import { generateFormOptions } from '../utils'
import * as config from './config'

export default generateFormOptions(config, {
  data() {
    return {
      typeDisplay: {space: '空白分割', line: '辅助线'},
      lineStyleDisplay: {solid:'实线',dashed:'虚线',dotted:'点线'},
      marginDisplay: ['无边距','左右留边'],
    }
  },
})
</script>

<style lang="scss" src="../../assets/utils.scss" scoped></style>
<style lang="scss" src="../../assets/view-options.scss" scoped></style>
