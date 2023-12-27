<template>
  <div class="options">
    <h4 class="options__title">{{ meta.label }}</h4>
    <el-collapse v-model="activeForms" class="options__form">
      <el-collapse-item title="整体外观：" name="view">
        <el-form :model="formdata"
          :rules="rules"
          size="small"
          label-position="left"
          label-width="80px"
        >
          <el-form-item prop="viewWidth" label="宽度">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.viewWidth }}px</span>
              <el-slider class="ml-8px flex-1" size="small"
                v-model="formdata.viewWidth"
                :min="16"
                :max="96"
                @input="handleChange($event, 'viewWidth')"
              ></el-slider>
            </div>
          </el-form-item>
          <el-form-item prop="viewHeight" label="高度">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.viewHeight }}px</span>
              <el-slider class="ml-8px flex-1" size="small"
                v-model="formdata.viewHeight"
                :min="16"
                :max="96"
                @input="handleChange($event, 'viewHeight')"
              ></el-slider>
            </div>
          </el-form-item>
          <el-form-item prop="borderRadius" label="圆角">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.borderRadius }}px</span>
              <el-slider class="ml-8px flex-1" size="small"
                v-model="formdata.borderRadius"
                :min="0"
                :max="96"
                @input="handleChange($event, 'borderRadius')"
              ></el-slider>
            </div>
          </el-form-item>
          <el-form-item prop="backgroundColor" label="背景颜色">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.backgroundColor }}</span>
              <el-button type="text" class="ml-auto" @click="reset('backgroundColor')">重置</el-button>
              <el-color-picker class="ml-8px" size="small"
                show-alpha
                v-model="formdata.backgroundColor"
                @change="handleChange($event, 'backgroundColor')"
              ></el-color-picker>
            </div>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="描边设置：" name="border">
        <el-form :model="formdata"
          :rules="rules"
          size="small"
          label-position="left"
          label-width="80px"
        >
          <el-form-item label="显示描边">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.isShowBorder ? '显示' : '不显示' }}</span>
              <el-switch class="ml-auto"
                v-model="formdata.isShowBorder"
                @change="handleChange($event, 'isShowBorder')"
              ></el-switch>
            </div>
          </el-form-item>
          <el-form-item v-if="formdata.isShowBorder" prop="borderWidth" label="描边宽度">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.borderWidth }}px</span>
              <el-slider class="ml-8px flex-1" size="small"
                v-model="formdata.borderWidth"
                :min="1"
                :max="9"
                @input="handleChange($event, 'borderWidth')"
              ></el-slider>
            </div>
          </el-form-item>
          <el-form-item v-if="formdata.isShowBorder" prop="borderColor" label="描边颜色">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.borderColor }}</span>
              <el-button type="text" class="ml-auto" @click="reset('borderColor')">重置</el-button>
              <el-color-picker class="ml-auto" size="small"
                v-model="formdata.borderColor"
                @change="handleChange($event, 'borderColor')"
              ></el-color-picker>
            </div>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="阴影设置：" name="shadow">
        <el-form :model="formdata"
          :rules="rules"
          size="small"
          label-position="left"
          label-width="80px"
        >
          <el-form-item label="显示阴影">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.isShowShadow ? '显示' : '不显示' }}</span>
              <el-switch class="ml-auto"
                v-model="formdata.isShowShadow"
                @change="handleChange($event, 'isShowShadow')"
              ></el-switch>
            </div>
          </el-form-item>
          <el-form-item v-if="formdata.isShowShadow" prop="shadowSize" label="阴影大小">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.shadowSize }}px</span>
              <el-slider class="ml-8px flex-1" size="small"
                v-model="formdata.shadowSize"
                :min="1"
                :max="96"
                @input="handleChange($event, 'shadowSize')"
              ></el-slider>
            </div>
          </el-form-item>
          <el-form-item v-if="formdata.isShowShadow" prop="shadowColor" label="阴影颜色">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.shadowColor }}</span>
              <el-button type="text" class="ml-auto" @click="reset('shadowColor')">重置</el-button>
              <el-color-picker class="ml-auto" size="small"
                v-model="formdata.shadowColor"
                show-alpha
                @change="handleChange($event, 'shadowColor')"
              ></el-color-picker>
            </div>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="图标设置：" name="icon">
        <el-form :model="formdata"
          :rules="rules"
          size="small"
          label-position="left"
          label-width="80px"
        >
          <el-form-item label="显示图标">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.isShowIcon ? '显示' : '不显示' }}</span>
              <el-switch class="ml-auto"
                v-model="formdata.isShowIcon"
                @change="handleChange($event, 'isShowIcon')"
              ></el-switch>
            </div>
          </el-form-item>
          <el-form-item v-if="formdata.isShowIcon" prop="customIcon" label="自定义">
            <div class="image-upload" @click="chooseImage('customIcon')">
              <template v-if="customIcon">
                <img class="image-upload__img" :src="customIcon" alt="">
                <span class="image-upload__label">选择图标</span>
                <CloseBtn class="image-upload__remove" size="18" @click.stop="removeIcon"></CloseBtn>
              </template>
              <i v-else class="image-upload__icon el-icon-plus"></i>
            </div>
          </el-form-item>
          <el-form-item v-if="formdata.isShowIcon" prop="iconSize" label="图标大小">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.iconSize }}px</span>
              <el-slider class="ml-8px flex-1" size="small"
                v-model="formdata.iconSize"
                :min="12"
                :max="48"
                @input="handleChange($event, 'iconSize')"
              ></el-slider>
            </div>
          </el-form-item>
          <el-form-item v-if="formdata.isShowIcon" prop="iconColor" label="图标颜色">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.iconColor }}</span>
              <el-button type="text" class="ml-auto" @click="reset('iconColor')">重置</el-button>
              <el-color-picker class="ml-auto" size="small"
                v-model="formdata.iconColor"
                @change="handleChange($event, 'iconColor')"
              ></el-color-picker>
            </div>
            <p class="form-item-tips">注意：对自定义图标无效</p>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="文案设置：" name="text">
        <el-form :model="formdata"
          :rules="rules"
          size="small"
          label-position="left"
          label-width="80px"
        >
          <el-form-item label="显示文字">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.isShowText ? '显示' : '不显示' }}</span>
              <el-switch class="ml-auto"
                v-model="formdata.isShowText"
                @change="handleChange($event, 'isShowText')"
              ></el-switch>
            </div>
          </el-form-item>
          <el-form-item v-if="formdata.isShowText" prop="textValue" label="文案内容">
            <el-input v-model="formdata.textValue" size="small" class="w-full" @input="handleChange($event, 'textValue')"></el-input>
          </el-form-item>
          <el-form-item v-if="formdata.isShowText" prop="textColor" label="背景颜色">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.textColor }}</span>
              <el-button type="text" class="ml-auto" @click="reset('textColor')">重置</el-button>
              <el-color-picker v-model="formdata.textColor" class="ml-8px" size="small"
                @change="handleChange($event, 'textColor')"
              ></el-color-picker>
            </div>
          </el-form-item>
          <el-form-item v-if="formdata.isShowText" label="文字大小">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ fontSizeDisplay[formdata.textSize] || '' }}</span>
              <el-radio-group class="ml-auto" size="small"
                v-model="formdata.textSize"
                @change="handleChange($event, 'textSize')"
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
        </el-form>
      </el-collapse-item>
      <el-collapse-item v-if="formdata.isShowIcon && formdata.isShowText" title="图文排列：" name="layout">
        <el-form :model="formdata"
          :rules="rules"
          size="small"
          label-position="left"
          label-width="80px"
        >
          <el-form-item prop="layout" label="排列方式">
            <div class="flex items-center w-full">
              <el-radio-group class="ml-auto" size="small"
                v-model="formdata.layout"
                @change="handleChange($event, 'layout')"
              >
                <el-radio-button label="horizontal">水平排列</el-radio-button>
                <el-radio-button label="vertical">垂直排列</el-radio-button>
              </el-radio-group>
            </div>
          </el-form-item>
          <el-form-item prop="spacing" label="图文间距">
            <div class="flex items-center w-full">
              <span class="el-form-item__value">{{ formdata.spacing }}px</span>
              <el-slider class="ml-8px flex-1" size="small"
                v-model="formdata.spacing"
                :min="0"
                :max="20"
                @input="handleChange($event, 'spacing')"
              ></el-slider>
            </div>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
// import CloseBtn from './common/CloseBtn.vue'
// import { getPropDefaultValue } from './utils'
// import {
//   getProps,
//   getFormdata,
//   getWatchers,
//   getMeta,
// } from './customer-service'
// import useErrors from './mixins/useErrors'

// export default {
//   mixins: [useErrors],
//   components: {
//     CloseBtn,
//   },
//   props: getProps(),
//   data() {
//     return {
//       meta: getMeta(),
//       formdata: getFormdata(),
//       // layoutDisplay: {vertical: '垂直排列', horizontal: '水平排列'},
//       fontSizeDisplay: {'16':'大(16号)','14':'中(14号)','12':'小(12号)'},
//       activeForms: ['view'],
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
//     /** 选择图片 */
//     chooseImage(prop) {
//       this.$modalUpload(imgs => {
//         if (imgs.length) {
//           const value = imgs[0].sattDir
//           this.formdata[prop] = value
//           this.handleChange(value, prop)
//         } else {
//           this.formdata[prop] = null
//           this.handleChange(null, prop)
//         }
//       }, '1');
//     },
//     removeIcon() {
//       this.formdata.customIcon = null
//       this.handleChange(null, 'customIcon')
//     },
//     noop() {},
//   },
// }

import { generateFormOptions } from '../utils'
import * as config from './config'

export default generateFormOptions(config, {
  data() {
    return {
      fontSizeDisplay: {'16':'大(16号)','14':'中(14号)','12':'小(12号)'},
      activeForms: ['view'],
    }
  },
  methods: {
    /** 选择图片 */
    chooseImage(prop) {
      this.$modalUpload(imgs => {
        if (imgs.length) {
          const value = imgs[0].sattDir
          this.formdata[prop] = value
          this.handleChange(value, prop)
        } else {
          this.formdata[prop] = null
          this.handleChange(null, prop)
        }
      }, '1');
    },
    /** 移除图标 */
    removeIcon() {
      this.formdata.customIcon = null
      this.handleChange(null, 'customIcon')
    },
  }
})
</script>

<style lang="scss" src="../../assets/utils.scss" scoped></style>
<style lang="scss" src="../../assets/view-options.scss" scoped></style>

<style lang="scss" scoped>
// .el-form-item__value.is-length {
//   flex: none;
//   width: 40px;
// }

.form-item-tips {
  font-size: 12px;
  line-height: 1.25;
  color: #999999;
  margin: 6px 0 0;
}

.image-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  // overflow: hidden;
  box-sizing: border-box;
  background: #ffffff;
  font-size: 24px;
  position: relative;
  cursor: pointer;

  &:hover {
    border-color: #409eff;
    color: #409eff;
  }

  &__icon {
    color: #409eff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  &__label {
    width: 100%;
    padding: 6px;
    text-align: center;
    background-color: rgba(0,0,0,0.75);
    color: #ffffff;
    font-size: 12px;
    line-height: 1.25;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 3;
  }

  &__remove {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    // font-size: 12px;
    padding: 0;
    opacity: 0;

    position: absolute;
    right: 0;
    top: 0;
    transform: translate(40%, -40%);
    z-index: -1;
  }

  &:hover .image-upload__remove {
    z-index: 3;
    opacity: 1;
  }
}
</style>
