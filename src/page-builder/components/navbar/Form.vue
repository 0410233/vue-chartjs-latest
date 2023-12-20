<template>
  <div class="options">
    <h4 class="options__title">顶部导航</h4>
    <!-- <p class="options__subtitle">（副标题）</p> -->
    <el-form :model="formdata" :rules="rules" @submit.native.prevent="noop" label-position="top">
      <el-form-item label="页面标题：" prop="title" :error="errorsmap.title">
        <el-input
          v-model="formdata.title"
          size="medium"
          placeholder="请输入标题"
          @input="handleChange($event, 'title')"
        ></el-input>
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
// import {
//   getProps,
//   getFormdata,
//   getWatchers,
//   getMeta,
//   getRules,
// } from './navbar'
// import useErrors from './mixins/useErrors'

// export default {
//   mixins: [useErrors],
//   props: getProps(),
//   data() {
//     return {
//       meta: getMeta(),
//       formdata: getFormdata(),
//       rules: getRules(),
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
//     /** 什么都不做 */
//     noop() {},
//   },
// }

import { generateFormOptions } from '../utils'
import * as config from './config'

export default generateFormOptions(config)
</script>

<style lang="scss" src="../../assets/utils.scss" scoped></style>
<style lang="scss" src="../../assets/view-options.scss" scoped></style>
