<template>
  <div class="options navigation-form">
    <h4 class="options__title">{{ meta.label }}</h4>
    <p class="options__subtitle">最多添加 10 个导航，拖动选中的导航可对其排序</p>
    <draggable tag="div" class="link-list"
      v-model="formdata.links"
      @input="handleLinksChange"
      v-bind="dragOptions"
    >
      <div v-for="item, index in formdata.links" :key="index" class="link-item">
        <div class="link-item__content">
          <svg class="link-item__drag" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><circle cx="15" cy="12" r="1.5"/><circle cx="15" cy="24" r="1.5"/><circle cx="21" cy="12" r="1.5"/><circle cx="21" cy="24" r="1.5"/><circle cx="21" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/><path fill="none" d="M0 0h36v36H0z"/></svg>
          <div class="link-item__image" :class="item.image && 'is-chosen'" @click="chooseImage(index)">
            <img v-if="item.image" :src="item.image" class="avatar">
            <template v-else>
              <i class="el-icon el-icon-plus"></i>
              <span>添加图片</span>
            </template>
          </div>
          <div class="link-item__name">
            <div class="link-item__title">
              <div class="link-item__label">标题</div>
              <el-input v-model="item.title" size="mini" class="link-item__title-input"></el-input>
            </div>
            <div class="link-item__link">
              <div class="link-item__label">链接</div>
              <el-link type="primary" class="link-item__linkto" @click="selectLink(index)">
                {{ item.linkto || '添加链接' }}
              </el-link>
            </div>
          </div>
        </div>
        <p v-if="item.error" class="link-item__error">{{ item.error }}</p>
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
    <el-button v-if="formdata.links.length < 10"
      class="add-link w-full"
      type="primary"
      size="small"
      icon="el-icon-plus"
      @click="addLink"
    >添加图文导航</el-button>
    <el-form :model="formdata"
      class="options__form"
      size="small"
      label-position="left"
      label-width="90px"
      @submit.native.prevent="noop"
    >
      <el-form-item label="导航样式">
        <div class="flex items-center w-full">
          <el-radio-group class="ml-auto" size="small"
            v-model="formdata.navStyle"
            @change="handleChange($event, 'navStyle')"
          >
            <el-radio-button label="image">图文导航</el-radio-button>
            <el-radio-button label="text">文字导航</el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="布局方式">
        <div class="flex items-center w-full">
          <el-radio-group class="ml-auto" size="small"
            v-model="formdata.layout"
            @change="handleChange($event, 'layout')"
          >
            <el-radio-button label="wrap">换行显示</el-radio-button>
            <el-radio-button label="scroll">横向滚动</el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item :label="formdata.layout === 'wrap' ? '一行显示' : '一屏显示'">
        <div class="flex items-center w-full">
          <el-select size="small" class="ml-auto" style="width: 120px;"
            v-model="formdata.groupCount"
            @change="handleChange($event, 'groupCount')"
          >
            <el-option :value="1" label="1个"></el-option>
            <el-option :value="2" label="2个"></el-option>
            <el-option :value="3" label="3个"></el-option>
            <el-option :value="4" label="4个"></el-option>
            <el-option :value="5" label="5个"></el-option>
            <el-option :value="6" label="6个"></el-option>
          </el-select>
        </div>
        <!-- <el-select size="mini" v-model="formdata.groupCount" @change="handleChange($event, 'groupCount')">
          <el-option :value="1" label="1个"></el-option>
          <el-option :value="2" label="2个"></el-option>
          <el-option :value="3" label="3个"></el-option>
          <el-option :value="4" label="4个"></el-option>
          <el-option :value="5" label="5个"></el-option>
          <el-option :value="6" label="6个"></el-option>
        </el-select> -->
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
      <el-form-item label="文字颜色">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.fontColor }}</span>
          <el-button type="text" class="ml-auto" @click="reset('fontColor')">重置</el-button>
          <el-color-picker v-model="formdata.fontColor" class="ml-8px" size="small"
            @change="handleChange($event, 'fontColor')"
          ></el-color-picker>
        </div>
      </el-form-item>
    </el-form>
    <PathSelect :visible.sync="linkSelectorVisible" @change="onLinkSelected"></PathSelect>
  </div>
</template>

<script>
import _ from 'lodash'
import draggable from "vuedraggable"
import PathSelect from './select/PathSelect.vue'
import CloseBtn from './common/CloseBtn.vue'
import { getPropDefaultValue } from './utils'
import {
  getProps,
  getFormdata,
  getWatchers,
  getMeta,
} from './navigation'

export default {
  components: {
    draggable,
    PathSelect,
    CloseBtn,
  },
  props: getProps(),
  data() {
    return {
      meta: getMeta(),
      formdata: getFormdata(),
      errors: {},
      currentLinkIndex: null,
      linkSelectorVisible: false,
      dragOptions: {
        sort: true,
        animation: 150,
        filter: '.link-item__remove',
        handle: '.link-item__drag',
      },
    }
  },
  watch: getWatchers(),
  methods: {
    /** 修改属性值 */
    handleChange(value, prop) {
      console.log('handleChange', {[prop]: value})
      this.$emit('change', {[prop]: value})
    },
    /** 重置属性值 */
    reset(prop) {
      const value = getPropDefaultValue(getProps(), prop)
      this.handleChange(value, prop)
    },
    // /** 最少四个链接 */
    // completeLinks() {
    //   if (!Array.isArray(this.formdata.links)) {
    //     this.formdata.links = []
    //   }
    //   if (this.formdata.links.length < 4) {
    //     for (let i = this.formdata.links.length; i < 4; i++) {
    //       this.addLink()
    //     }
    //   }
    // },
    handleLinksChange() {
      this.handleChange(_.cloneDeep(this.formdata.links), 'links')
    },
    /** 添加链接 */
    addLink() {
      this.formdata.links.push({
        image: null,
        title: null,
        path: null,
        linkto: null,
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
    chooseImage(index) {
      this.$modalUpload(imgs => {
        if (imgs.length) {
          this.updateLink(index, {image: imgs[0].sattDir})
        }
      }, '1');
    },
    /** 显示链接选择器 */
    selectLink(index) {
      this.currentLinkIndex = index
      this.linkSelectorVisible = true
    },
    /** 设置选择的链接 */
    onLinkSelected(link) {
      const index = this.currentLinkIndex
      const current = this.formdata.links[index]
      if (current) {
        const data = {
          path: link.path,
          linkto: link.from + '：' + link.name,
        }
        if (!current.title) {
          data.title = link.name
        }
        if (!current.image) {
          data.image = link.image
        }
        this.updateLink(index, data)
      } else {
        this.currentLinkIndex = null
      }
    },
    /** 移除链接 */
    removeLink(index) {
      this.formdata.links.splice(index, 1)
      this.handleLinksChange()
    },
    /** 什么都不做 */
    noop() {},
  },
}
</script>

<style lang="scss" src="../assets/utils.scss" scoped></style>
<style lang="scss" src="../assets/view-options.scss" scoped></style>
<style lang="scss" scoped>
.navigation-form {
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

    &__content {
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

      &:hover {
        border-color: #409EFF;
      }

      &.is-chosen {
        border-color: transparent;
      }

      .el-icon {
        font-size: 16px;
      }

      span {
        font-size: 12px;
        margin-top: 4px;
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
        z-index: 20;
      }
    }

    &__name {
      flex: 1;
      min-width: 0;
      margin-left: 12px;
    }

    &__title, &__link {
      display: flex;
      align-items: center;
      width: 100%;
    }

    &__link {
      margin-top: 6px;
    }

    &__label {
      flex: none;
      padding-right: 12px;
      font-size: 13px;
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
      // display: flex;
      // align-items: center;
      // justify-content: center;
      // width: 18px;
      // height: 18px;
      // padding: 0;
      // opacity: 0;

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
}

</style>
