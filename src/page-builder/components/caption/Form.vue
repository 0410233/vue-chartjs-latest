<template>
  <div class="options">
    <h4 class="options__title">{{ meta.label }}</h4>
    <el-form class="options__form"
      :model="formdata"
      :rules="rules"
      size="small"
      label-position="top"
      @submit.native.prevent="noop"
      ref="caption_form1"
    >
      <el-form-item :error="errorsmap.caption" prop="caption" label="标题">
        <el-input size="small" v-model="formdata.caption" @input="handleChange($event, 'caption')"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" size="small" v-model="formdata.description" @input="handleChange($event, 'description')"></el-input>
      </el-form-item>
    </el-form>
    <el-form class="options__form"
      :model="formdata"
      size="small"
      label-position="left"
      label-width="80px"
      @submit.native.prevent="noop"
      ref="caption_form2"
    >
      <el-form-item label="显示位置">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ alignDisplay[formdata.textAlign] || '' }}</span>
          <el-radio-group class="ml-auto" size="small"
            v-model="formdata.textAlign"
            @change="handleChange($event, 'textAlign')"
          >
            <el-radio-button label="left">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M102.4 153.6h819.2V256H102.4zm0 204.8h473.6v102.4H102.4zM102.4 563.2h819.2v102.4H102.4zM102.4 768h409.6v102.4H102.4z" fill="currentColor"/></svg>
            </el-radio-button>
            <el-radio-button label="center">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M102.4 153.6h819.2V256H102.4zm204.8 204.8h409.6v102.4H307.2zM102.4 563.2h819.2v102.4H102.4zM307.2 768h409.6v102.4H307.2z" fill="currentColor"/></svg>
            </el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="标题大小">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ fontSizeDisplay[formdata.captionFontSize] || '' }}</span>
          <el-radio-group class="ml-auto" size="small"
            v-model="formdata.captionFontSize"
            @change="handleChange($event, 'captionFontSize')"
          >
            <el-radio-button :label="12">
              <svg class="radio-button-icon" style="width: 20px; height: 20px;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M366.182 716.186l56.525-159.13h173.261l56.525 159.13h50.38L533.914 250.47h-49.766L315.802 716.186h50.38zM579.38 511.59H439.296l68.198-191.692h3.687l68.198 191.692z" fill="currentColor"/></svg>
            </el-radio-button>
            <el-radio-button :label="14">
              <svg class="radio-button-icon" style="width: 20px; height: 20px;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M324.813 767.283l65.945-185.651h202.138l65.946 185.651h58.777L520.5 223.95h-58.06L266.034 767.283h58.778zm248.73-238.694H410.111l79.565-223.642h4.3l79.565 223.642z" fill="currentColor"/></svg>
            </el-radio-button>
            <el-radio-button :label="16">
              <svg class="radio-button-icon" style="width: 20px; height: 20px;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M294.093 823.552l70.502-201.062h241.101l70.502 201.062h104.448l-244.582-672.82H434.227l-244.582 672.82h104.448zM572.62 529.357H397.67l84.428-241.971h5.223l85.299 241.97z" fill="currentColor"/></svg>
            </el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="描述大小">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ fontSizeDisplay[formdata.descriptionFontSize] || '' }}</span>
          <el-radio-group class="ml-auto" size="small"
            v-model="formdata.descriptionFontSize"
            @change="handleChange($event, 'descriptionFontSize')"
          >
            <el-radio-button :label="12">
              <svg class="radio-button-icon" style="width: 20px; height: 20px;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M366.182 716.186l56.525-159.13h173.261l56.525 159.13h50.38L533.914 250.47h-49.766L315.802 716.186h50.38zM579.38 511.59H439.296l68.198-191.692h3.687l68.198 191.692z" fill="currentColor"/></svg>
            </el-radio-button>
            <el-radio-button :label="14">
              <svg class="radio-button-icon" style="width: 20px; height: 20px;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M324.813 767.283l65.945-185.651h202.138l65.946 185.651h58.777L520.5 223.95h-58.06L266.034 767.283h58.778zm248.73-238.694H410.111l79.565-223.642h4.3l79.565 223.642z" fill="currentColor"/></svg>
            </el-radio-button>
            <el-radio-button :label="16">
              <svg class="radio-button-icon" style="width: 20px; height: 20px;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M294.093 823.552l70.502-201.062h241.101l70.502 201.062h104.448l-244.582-672.82H434.227l-244.582 672.82h104.448zM572.62 529.357H397.67l84.428-241.971h5.223l85.299 241.97z" fill="currentColor"/></svg>
            </el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="标题粗细">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ fontWeightDisplay[formdata.captionFontWeight] || '' }}</span>
          <el-radio-group class="ml-auto" size="small"
            v-model="formdata.captionFontWeight"
            @change="handleChange($event, 'captionFontWeight')"
          >
            <el-radio-button :label="400">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M896 179.2v179.2h-51.2v-128H179.2v128H128V179.2z" fill="currentColor"/><path d="M537.6 204.8v665.6h-51.2V204.8z" fill="currentColor"/><path d="M614.4 844.8V896H409.6v-51.2z" fill="currentColor"/></svg>
            </el-radio-button>
            <el-radio-button :label="600">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M921.6 153.6v204.8H819.2V256H204.8v102.4H102.4V153.6z" fill="currentColor"/><path d="M563.2 204.8v665.6H460.8V204.8z" fill="currentColor"/><path d="M640 819.2v102.4H384V819.2z" fill="currentColor"/></svg>
            </el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="描述粗细">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ fontWeightDisplay[formdata.descriptionFontWeight] || '' }}</span>
          <el-radio-group class="ml-auto" size="small"
            v-model="formdata.descriptionFontWeight"
            @change="handleChange($event, 'descriptionFontWeight')"
          >
            <el-radio-button :label="400">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M896 179.2v179.2h-51.2v-128H179.2v128H128V179.2z" fill="currentColor"/><path d="M537.6 204.8v665.6h-51.2V204.8z" fill="currentColor"/><path d="M614.4 844.8V896H409.6v-51.2z" fill="currentColor"/></svg>
            </el-radio-button>
            <el-radio-button :label="600">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M921.6 153.6v204.8H819.2V256H204.8v102.4H102.4V153.6z" fill="currentColor"/><path d="M563.2 204.8v665.6H460.8V204.8z" fill="currentColor"/><path d="M640 819.2v102.4H384V819.2z" fill="currentColor"/></svg>
            </el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="标题颜色">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.captionColor }}</span>
          <el-button type="text" class="ml-auto" @click="reset('captionColor')">重置</el-button>
          <el-color-picker v-model="formdata.captionColor" class="ml-8px" size="small"
            @change="handleChange($event, 'captionColor')"
          ></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item label="描述颜色">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.descriptionColor }}</span>
          <el-button type="text" class="ml-auto" @click="reset('descriptionColor')">重置</el-button>
          <el-color-picker v-model="formdata.descriptionColor" class="ml-8px" size="small"
            @change="handleChange($event, 'descriptionColor')"
          ></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item label="背景颜色">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.backgroundColor }}</span>
          <el-button type="text" class="ml-auto" @click="reset('backgroundColor')">重置</el-button>
          <el-color-picker v-model="formdata.backgroundColor" class="ml-8px" size="small"
            @change="handleChange($event, 'backgroundColor')"
          ></el-color-picker>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { getPropDefaultValue } from '../utils'
// import {
//   getProps,
//   getFormdata,
//   getWatchers,
//   getMeta,
//   getRules,
// } from '.'
// import useErrors from './mixins/useErrors'

// export default {
//   mixins: [useErrors],
//   props: getProps(),
//   data() {
//     return {
//       meta: getMeta(),
//       formdata: getFormdata(),
//       rules: getRules(),
//       alignDisplay: {left: '居左显示', center: '居中显示'},
//       fontSizeDisplay: {'16':'大(16号)','14':'中(14号)','12':'小(12号)'},
//       fontWeightDisplay: {'400':'常规体','600':'加粗体'},
//     }
//   },
//   watch: getWatchers(),
//   methods: {
//     /** 修改属性值 */
//     handleChange(value, prop) {
//       // console.log('handleChange', {value})
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
      alignDisplay: {left: '居左显示', center: '居中显示'},
      fontSizeDisplay: {'16':'大(16号)','14':'中(14号)','12':'小(12号)'},
      fontWeightDisplay: {'400':'常规体','600':'加粗体'},
    }
  },
})
</script>

<style lang="scss" src="../../assets/utils.scss" scoped></style>
<style lang="scss" src="../../assets/view-options.scss" scoped></style>
