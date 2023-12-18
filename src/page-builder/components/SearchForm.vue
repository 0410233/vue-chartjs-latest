<template>
  <div class="options">
    <h4 class="options__title">{{ meta.label }}</h4>

    <el-form class="options__form"
      :model="formdata"
      size="small"
      label-position="left"
      label-width="80px"
    >
      <el-form-item label="固定顶部">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.fixed ? '固定' : '不固定' }}</span>
          <el-switch class="ml-auto"
            v-model="formdata.fixed"
            @change="onFixedChange"
          ></el-switch>
        </div>
      </el-form-item>
      <el-form-item prop="borderRadius" label="圆角大小">
        <div class="flex items-center w-full">
          <span class="el-form-item__value is-length">{{ formdata.borderRadius }}px</span>
          <el-slider class="ml-8px flex-1" size="small"
            v-model="formdata.borderRadius"
            :min="0"
            :max="48"
            @input="handleChange($event, 'borderRadius')"
          ></el-slider>
        </div>
      </el-form-item>
      <el-form-item label="文本位置">
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
      <!-- <el-form-item label="文本位置">
        <div class="flex items-center w-full">
          <el-radio-group class="ml-auto" size="small"
            v-model="formdata.textAlign"
            @change="handleChange($event, 'textAlign')"
          >
            <el-radio-button label="left">居左</el-radio-button>
            <el-radio-button label="center">居中</el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item> -->
      <el-form-item prop="barHeight" label="搜索框高">
        <div class="flex items-center w-full">
          <span class="el-form-item__value is-length">{{ formdata.barHeight }}px</span>
          <el-slider class="ml-8px flex-1" size="small"
            v-model="formdata.barHeight"
            :min="24"
            :max="48"
            @input="handleChange($event, 'barHeight')"
          ></el-slider>
        </div>
      </el-form-item>
      <el-form-item prop="outerColor" label="外框颜色">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.outerColor }}</span>
          <el-button type="text" class="ml-auto" @click="reset('outerColor')">重置</el-button>
          <el-color-picker class="ml-auto" size="small"
            v-model="formdata.outerColor"
            show-alpha
            @change="handleChange($event, 'outerColor')"
          ></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item prop="textColor" label="文本颜色">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.textColor }}</span>
          <el-button type="text" class="ml-auto" @click="reset('textColor')">重置</el-button>
          <el-color-picker class="ml-auto" size="small"
            v-model="formdata.textColor"
            @change="handleChange($event, 'textColor')"
          ></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item prop="backgroundColor" label="背景颜色">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.backgroundColor }}</span>
          <el-button type="text" class="ml-auto" @click="reset('backgroundColor')">重置</el-button>
          <el-color-picker class="ml-auto" size="small"
            v-model="formdata.backgroundColor"
            show-alpha
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
} from './search'

export default {
  props: getProps(),
  data() {
    return {
      meta: getMeta(),
      formdata: getFormdata(),
      alignDisplay: {left: '居左', center: '居中'},
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
    onFixedChange() {
      this.handleChange(this.formdata.fixed, 'fixed')
      this.$emit('fixed-change', this.formdata.fixed)
    },
    noop() {},
  },
}
</script>

<style lang="scss" src="../assets/utils.scss" scoped></style>
<style lang="scss" src="../assets/view-options.scss" scoped></style>
<style lang="scss" scoped>
.el-form-item__value.is-length {
  flex: none;
  width: 40px;
}
</style>
