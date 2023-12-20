<template>
  <div class="options">
    <h4 class="options__title">{{ meta.label }}</h4>
    <el-form class="options__form"
      :model="formdata"
      :rules="rules"
      size="small"
      label-position="top"
    >
      <el-form-item label="背景图片：">
        <div class="image-btn image-btn--bg" @click="chooseImage('backgroundImage')">
          <template v-if="backgroundImage">
            <img class="image-btn__img" :src="backgroundImage" alt="">
            <span class="image-btn__label">添加图片</span>
          </template>
          <i v-else class="image-btn__icon el-icon-plus"></i>
        </div>
        <p class="form-item-tips">建议尺寸：750x125 像素，尺寸不匹配时，将压缩或拉伸图片以铺满画面</p>
      </el-form-item>
      <el-form-item label="店铺 LOGO：">
        <div class="image-btn image-btn--logo" @click="chooseImage('logo')">
          <template v-if="logo">
            <img class="image-btn__img" :src="logo" alt="">
            <span class="image-btn__label">添加图片</span>
          </template>
          <i v-else class="image-btn__icon el-icon-plus"></i>
        </div>
        <p class="form-item-tips">建议尺寸：128x128 像素</p>
      </el-form-item>
    </el-form>
    <el-form class="options__form"
      :model="formdata"
      size="small"
      label-position="left"
      label-width="96px"
    >
      <el-form-item label="关注按钮：">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.isShowFollow ? '显示' : '不显示' }}</span>
          <el-switch class="ml-auto"
            v-model="formdata.isShowFollow"
            @change="handleChange($event, 'isShowFollow')"
          ></el-switch>
        </div>
      </el-form-item>
      <el-form-item label="店铺评分：">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.isShowStars ? '显示' : '不显示' }}</span>
          <el-switch class="ml-auto"
            v-model="formdata.isShowStars"
            @change="handleChange($event, 'isShowStars')"
          ></el-switch>
        </div>
      </el-form-item>
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
// } from './shop'
// import useErrors from './mixins/useErrors'

// export default {
//   mixins: [useErrors],
//   props: getProps(),
//   data() {
//     return {
//       meta: getMeta(),
//       formdata: getFormdata(),
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
//     noop() {},
//   },
// }

import { generateFormOptions } from '../utils'
import * as config from './config'

export default generateFormOptions(config, {
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
  }
})
</script>

<style lang="scss" src="../../assets/utils.scss" scoped></style>
<style lang="scss" src="../../assets/view-options.scss" scoped></style>
<style lang="scss" scoped>
.image-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  box-sizing: border-box;
  background: #ffffff;
  font-size: 24px;
  position: relative;
  cursor: pointer;

  &:hover {
    border-color: #409eff;
    color: #409eff;
  }

  &--bg {
    width: 100%;
    padding-top: 16.6667%;
  }

  &--logo {
    width: 80px;
    height: 80px;
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

  &--bg &__img {
    object-fit: cover;
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
}

.form-item-tips {
  font-size: 12px;
  line-height: 1.25;
  color: #999999;
  margin: 6px 0 0;
}
</style>
