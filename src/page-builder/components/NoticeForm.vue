<template>
  <div class="options">
    <h4 class="options__title">{{ meta.label }}</h4>
    <el-form :model="formdata" class="options__form" label-position="top"
      @submit.native.prevent="noop"
    >
      <el-form-item label="公告内容">
        <el-input type="textarea" v-model="formdata.caption" @input="handleChange($event, 'caption')"></el-input>
      </el-form-item>
      <!-- <el-form-item label="描述">
        <el-input type="textarea" v-model="formdata.description" @input="handleChange($event, 'description')"></el-input>
      </el-form-item> -->
    </el-form>
    <el-form :model="formdata" class="options__form" label-position="left" label-width="80px"
      @submit.native.prevent="noop"
    >





      <el-form-item label="文本颜色">
        <div class="flex items-center w-full">
          <span class="text-gray text-sm">{{ formdata.captionColor }}</span>
          <el-button type="text" class="ml-auto" @click="reset('captionColor')">重置</el-button>
          <el-color-picker v-model="formdata.captionColor" class="ml-8px" size="small"
            @change="handleChange($event, 'captionColor')"
          ></el-color-picker>
        </div>
      </el-form-item>

      <el-form-item label="背景颜色">
        <div class="flex items-center w-full">
          <span class="text-gray text-sm">{{ formdata.backgroundColor }}</span>
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
import { getPropDefaultValue } from './utils'
import {
  getProps,
  getFormdata,
  getWatchers,
  getMeta,
} from './notice'

export default {
  props: getProps(),
  data() {
    return {
      meta: getMeta(),
      formdata: getFormdata(),
      alignDisplay: {left: '居左显示', center: '居中显示'},
      fontSizeDisplay: {'16':'大(16号)','14':'中(14号)','12':'小(12号)'},
      fontWeightDisplay: {'400':'常规体','600':'加粗体'},
    }
  },
  watch: getWatchers(),
  methods: {
    /** 修改属性值 */
    handleChange(value, prop) {
      // console.log('handleChange', {value})
      this.$emit('change', {[prop]: value})
    },
    /** 重置属性值 */
    reset(prop) {
      const value = getPropDefaultValue(getProps(), prop)
      this.handleChange(value, prop)
    },
    noop() {},
  },
}
</script>

<style lang="scss" src="../assets/utils.scss" scoped></style>
<style lang="scss" src="../assets/view-options.scss" scoped></style>

