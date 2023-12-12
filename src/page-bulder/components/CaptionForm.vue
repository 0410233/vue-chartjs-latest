<template>
  <div class="options">
    <h4 class="options__title">标题文本</h4>
    <el-form :model="formdata" class="options__form" label-position="top"
      @submit.native.prevent="noop"
    >
      <el-form-item label="标题">
        <el-input v-model="formdata.caption" @input="handleChange($event, 'caption')"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="formdata.description" @input="handleChange($event, 'description')"></el-input>
      </el-form-item>
    </el-form>
    <el-form :model="formdata" class="options__form" label-position="left" label-width="80px"
      @submit.native.prevent="noop"
    >
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
          <span class="text-gray text-sm">{{ fontSizeDisplay[formdata.captionFontSize] || '' }}</span>
          <el-radio-group class="ml-auto" size="mini"
            v-model="formdata.captionFontSize"
            @change="handleChange($event, 'captionFontSize')"
          >
            <el-radio-button :label="16"><span style="font-size: 18px;">A</span></el-radio-button>
            <el-radio-button :label="14"><span style="font-size: 14px;">A</span></el-radio-button>
            <el-radio-button :label="12"><span style="font-size: 12px;">A</span></el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="描述大小">
        <div class="flex items-center w-full">
          <span class="text-gray text-sm">{{ fontSizeDisplay[formdata.descriptionFontSize] || '' }}</span>
          <el-radio-group class="ml-auto" size="mini"
            v-model="formdata.descriptionFontSize"
            @change="handleChange($event, 'descriptionFontSize')"
          >
            <el-radio-button :label="16"><span style="font-size: 18px;">A</span></el-radio-button>
            <el-radio-button :label="14"><span style="font-size: 14px;">A</span></el-radio-button>
            <el-radio-button :label="12"><span style="font-size: 12px;">A</span></el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="标题粗细">
        <div class="flex items-center w-full">
          <span class="text-gray text-sm">{{ fontWeightDisplay[formdata.captionFontWeight] || '' }}</span>
          <el-radio-group class="ml-auto" size="mini"
            v-model="formdata.captionFontWeight"
            @change="handleChange($event, 'captionFontWeight')"
          >
            <el-radio-button :label="400"><span class="text-xl font-normal">T</span></el-radio-button>
            <el-radio-button :label="600"><span class="text-xl font-bold">T</span></el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="描述粗细">
        <div class="flex items-center w-full">
          <span class="text-gray text-sm">{{ fontWeightDisplay[formdata.descriptionFontWeight] || '' }}</span>
          <el-radio-group class="ml-auto" size="mini"
            v-model="formdata.descriptionFontWeight"
            @change="handleChange($event, 'descriptionFontWeight')"
          >
            <el-radio-button :label="400"><span class="text-xl font-normal">T</span></el-radio-button>
            <el-radio-button :label="600"><span class="text-xl font-bold">T</span></el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="标题颜色">
        <div class="flex items-center w-full">
          <span class="text-gray text-sm">{{ formdata.captionColor }}</span>
          <el-button type="text" class="ml-auto" @click="reset('captionColor')">重置</el-button>
          <el-color-picker v-model="formdata.captionColor" class="ml-8px" size="small"
            @change="handleChange($event, 'captionColor')"
          ></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item label="描述颜色">
        <div class="flex items-center w-full">
          <span class="text-gray text-sm">{{ formdata.descriptionColor }}</span>
          <el-button type="text" class="ml-auto" @click="reset('descriptionColor')">重置</el-button>
          <el-color-picker v-model="formdata.descriptionColor" class="ml-8px" size="small"
            @change="handleChange($event, 'descriptionColor')"
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
import {
  IconAlignLeft,
  IconAlignCenter,
} from '../icons'
import { generateFormdata, generateWatchers } from './utils'
import { getProps } from './caption'

export default {
  components: {
    IconAlignLeft,
    IconAlignCenter,
  },
  props: getProps(),
  data() {
    return {
      formdata: generateFormdata(getProps()),
      alignDisplay: {left: '居左显示', center: '居中显示'},
      fontSizeDisplay: {'16':'大(16号)','14':'中(14号)','12':'小(12号)'},
      fontWeightDisplay: {'400':'常规体','600':'加粗体'},
    }
  },
  watch: generateWatchers(getProps()),
  methods: {
    /** 修改属性值 */
    handleChange(value, prop) {
      console.log('handleChange', {value})
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
