<template>
  <div class="options">
    <h4 class="options__title">{{ meta.label }}</h4>
    <el-form class="options__form"
      :model="formdata"
      :rules="rules"
      size="small"
      label-position="top"
    >
      <el-form-item prop="links" :error="errorsmap.links" label="导航链接">
        <draggable tag="div" class="link-list"
          v-model="formdata.links"
          @input="handleLinksChange"
          v-bind="dragOptions"
        >
          <div v-for="item, index in formdata.links" :key="index" class="link-item">
            <div class="link-item__inner">
              <svg class="link-item__drag" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><circle cx="15" cy="12" r="1.5"/><circle cx="15" cy="24" r="1.5"/><circle cx="21" cy="12" r="1.5"/><circle cx="21" cy="24" r="1.5"/><circle cx="21" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/><path fill="none" d="M0 0h36v36H0z"/></svg>
              <div class="link-item__content">
                <div class="flex items-start">
                  <div class="link-item__label">图标：</div>
                  <div class="link-item__image"
                    @click="chooseImage(index, 'iconPath')"
                  >
                    <img v-if="item.iconPath" :src="item.iconPath">
                    <i v-else class="el-icon el-icon-plus"></i>
                    <span>未选中</span>
                  </div>
                  <div class="link-item__image"
                    @click="chooseImage(index, 'selectedIconPath')"
                  >
                    <img v-if="item.selectedIconPath" :src="item.selectedIconPath">
                    <i v-else class="el-icon el-icon-plus"></i>
                    <span>选中</span>
                  </div>
                </div>
                <div class="link-item__title">
                  <div class="link-item__label">文字：</div>
                  <el-input size="mini" class="link-item__title-input"
                    v-model="item.text"
                    @input="updateLink(index, {text: $event})"
                  ></el-input>
                </div>
                <div class="link-item__link">
                  <div class="link-item__label">链接：</div>
                  <el-select class="w-full" size="small"
                    v-model="item.pagePath"
                    @input="updateLink(index, {pagePath: $event})"
                  >
                    <el-option v-for="page in decoratablePages" :key="page.path"
                      :label="page.name"
                      :value="page.path"
                    ></el-option>
                  </el-select>
                  <!-- <el-link type="primary" class="link-item__linkto" @click="selectLink(index)">
                    {{ item.linkto || '添加链接' }}
                  </el-link> -->
                </div>
              </div>
            </div>
            <!-- <p v-if="item.error" class="link-item__error">{{ item.error }}</p> -->
            <!-- <div class="link-item__remove"><i class="el-icon-close"></i></div> -->
            <CloseBtn class="link-item__remove" size="18" @click="removeLink(index)"></CloseBtn>
            <!-- <el-button class="link-item__remove"
              type="danger"
              icon="el-icon-close"
              circle
              @click="removeLink(index)"
            ></el-button> -->
          </div>
        </draggable>
        <el-button v-if="formdata.links.length < 5"
          class="add-link w-full"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="addLink"
        >添加底部导航（{{ formdata.links.length }}/5）</el-button>
        <p class="el-form-item__tips">最多添加 5 个导航，拖动选中的导航可对其排序</p>
      </el-form-item>
      <el-form-item label="未选中颜色">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.textColor }}</span>
          <el-button type="text" class="ml-auto" @click="reset('textColor')">重置</el-button>
          <el-color-picker v-model="formdata.textColor" class="ml-8px" size="small"
            @change="handleChange($event, 'textColor')"
          ></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item label="选中颜色">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.selectedTextColor }}</span>
          <el-button type="text" class="ml-auto" @click="reset('selectedTextColor')">重置</el-button>
          <el-color-picker v-model="formdata.selectedTextColor" class="ml-8px" size="small"
            @change="handleChange($event, 'selectedTextColor')"
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
// import draggable from 'vuedraggable'
// import CloseBtn from './common/CloseBtn.vue'
// import { getPropDefaultValue } from './utils'
// import {
//   getProps,
//   getFormdata,
//   getWatchers,
//   getMeta,
//   getRules,
// } from './tabbar'
// import { getDecoratablePages } from '../api'
// import useErrors from './mixins/useErrors'

// export default {
//   mixins: [useErrors],
//   components: {
//     CloseBtn,
//     draggable,
//   },
//   props: getProps(),
//   data() {
//     return {
//       meta: getMeta(),
//       formdata: getFormdata(),
//       rules: getRules(),
//       currentLinkIndex: null,
//       linkSelectorVisible: false,
//       dragOptions: {
//         sort: true,
//         animation: 150,
//         // filter: '.link-item__remove',
//         handle: '.link-item__drag',
//       },
//       /** 可装修页面 */
//       decoratablePages: [],
//     }
//   },
//   watch: getWatchers(),
//   created() {
//     this.decoratablePages = getDecoratablePages()
//   },
//   methods: {
//     /** 修改属性值 */
//     handleChange(value, prop) {
//       console.log('handleChange', {[prop]: value})
//       this.$emit('change', {[prop]: value})
//     },
//     /** 重置属性值 */
//     reset(prop) {
//       const value = getPropDefaultValue(getProps(), prop)
//       this.handleChange(value, prop)
//     },
//     handleLinksChange() {
//       this.handleChange(_.cloneDeep(this.formdata.links), 'links')
//     },
//     /** 添加链接 */
//     addLink() {
//       this.formdata.links.push({
//         iconPath: null,
//         selectedIconPath: null,
//         pagePath: null,
//         text: null,
//       })
//       this.handleLinksChange()
//     },
//     updateLink(index, data) {
//       const link = this.formdata.links[index]
//       if (link) {
//         this.$set(this.formdata.links, index, Object.assign(link, data))
//         this.handleLinksChange()
//       }
//     },
//     /** 选择图片 */
//     chooseImage(index, prop) {
//       this.$modalUpload(imgs => {
//         if (imgs.length) {
//           this.updateLink(index, {[prop]: imgs[0].sattDir})
//         }
//       }, '1');
//     },
//     // /** 显示链接选择器 */
//     // selectLink(index) {
//     //   this.currentLinkIndex = index
//     //   this.linkSelectorVisible = true
//     // },
//     // /** 设置选择的链接 */
//     // onLinkSelected(link) {
//     //   const index = this.currentLinkIndex
//     //   const current = this.formdata.links[index]
//     //   if (current) {
//     //     const data = {
//     //       path: link.path,
//     //       linkto: link.from + '：' + link.name,
//     //     }
//     //     if (!current.title) {
//     //       data.title = link.name
//     //     }
//     //     if (!current.image) {
//     //       data.image = link.image
//     //     }
//     //     this.updateLink(index, data)
//     //   } else {
//     //     this.currentLinkIndex = null
//     //   }
//     // },
//     /** 移除链接 */
//     removeLink(index) {
//       this.formdata.links.splice(index, 1)
//       this.handleLinksChange()
//     },
//     /** 什么都不做 */
//     noop() {},
//   },
// }

import draggable from 'vuedraggable'
import CloseBtn from '../common/CloseBtn.vue'
import { getDecoratablePages } from '../../api'
import { generateFormOptions } from '../utils'
import * as config from './config'

export default generateFormOptions(config, {
  components: {
    draggable,
    CloseBtn,
  },
  data() {
    return {
      currentLinkIndex: null,
      linkSelectorVisible: false,
      dragOptions: {
        sort: true,
        animation: 150,
        // filter: '.link-item__remove',
        handle: '.link-item__drag',
      },
      /** 可装修页面 */
      decoratablePages: [],
    }
  },
  created() {
    this.decoratablePages = getDecoratablePages()
  },
  methods: {
    /** 链接修改 */
    handleLinksChange() {
      this.handleChange(_.cloneDeep(this.formdata.links), 'links')
    },
    /** 添加链接 */
    addLink() {
      this.formdata.links.push({
        iconPath: null,
        selectedIconPath: null,
        pagePath: null,
        text: null,
      })
      this.handleLinksChange()
    },
    updateLink(index, data) {
      const link = this.formdata.links[index]
      if (link) {
        this.$set(this.formdata.links, index, Object.assign(link, data))
        this.handleLinksChange()
      }
    },
    /** 选择图片 */
    chooseImage(index, prop) {
      this.$modalUpload(imgs => {
        if (imgs.length) {
          this.updateLink(index, {[prop]: imgs[0].sattDir})
        }
      }, '1');
    },
    /** 移除链接 */
    removeLink(index) {
      this.formdata.links.splice(index, 1)
      this.handleLinksChange()
    },
  },
})
</script>

<style lang="scss" src="../../assets/utils.scss" scoped></style>
<style lang="scss" src="../../assets/view-options.scss" scoped></style>
<style lang="scss" scoped>
.link-list {
  margin-top: 20px;
}

.link-item {
  width: 100%;
  padding: 12px;
  padding-left: 0;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 4px;
  background: #ffffff;

  position: relative;
  margin-bottom: 12px;

  &__drag {
    flex: none;
    width: 28px;
    height: 100%;
    color: #999999;
    cursor: move;
  }

  &__inner {
    width: 100%;
    display: flex;
    align-items: center;
  }

  &__image {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 60px;
    height: 60px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    color: #409eff;
    cursor: pointer;
    position: relative;
    margin-right: 8px;

    &:hover {
      border-color: #409EFF;
    }

    &.is-chosen {
      border-color: transparent;
    }

    .el-icon {
      font-size: 16px;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 6px;
      object-fit: contain;

      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
    }

    span {
      display: block;
      width: 100%;
      padding: 4px;
      font-size: 12px;
      line-height: 1.25;
      text-align: center;
      color: #ffffff;
      background: rgba(0,0,0,0.5);

      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 3;
    }
  }

  &__content {
    display: block;
    flex: 1;
    min-width: 0;
    margin-left: 12px;
  }

  &__title, &__link {
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 6px;
  }

  &__label {
    flex: none;
    padding-right: 12px;
    font-size: 13px;
    font-weight: 600;
  }

  &__title-input, &__linkto {
    min-width: 0;
    font-size: 13px;
  }

  &__linkto .el-link--inner {
    min-width: 0;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__error {
    font-size: 12px;
    color: red;
    margin: 4px 0 0;
  }

  &__remove {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(45%, -45%);
    z-index: -1;
  }

  &:hover .link-item__remove {
    z-index: 1;
    opacity: 1;
  }

  ::v-deep .el-input__inner {
    padding: 0 8px;
  }
}

</style>
