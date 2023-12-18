<template>
  <div class="options cate-list-form">
    <h4 class="options__title">{{ meta.label }}</h4>
    <el-form class="options__form"
      :model="formdata"
      size="small"
      label-position="top"
    >
      <el-form-item label="商品分类：">
        <draggable tag="div" class="cate-list"
          v-model="formdata.cateList"
          @input="handleCateListChange"
          v-bind="dragOptions"
        >
          <!-- <div class="cate">
            <div class="cate__header">
              <svg class="cate__drag" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><circle cx="15" cy="12" r="1.5"/><circle cx="15" cy="24" r="1.5"/><circle cx="21" cy="12" r="1.5"/><circle cx="21" cy="24" r="1.5"/><circle cx="21" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/><path fill="none" d="M0 0h36v36H0z"/></svg>
              <span class="cate__name">（分类名称）</span>
              <el-button class="cate__change ml-auto" type="primary" plain size="mini">修改</el-button>
            </div>
            <div class="cate__field field">
              <label for="" class="field__label">商品数量</label>
              <span class="field__value">14</span>
            </div>
            <div class="cate__field field">
              <label for="" class="field__label">显示数量</label>
              <div class="flex items-center">
                <el-radio v-model="example.showAll" :label="false">
                  <input class="field__count-input el-input__inner"
                    :class="example.showAll && 'is-disabled'"
                    type="number"
                    v-model="example.showCount"
                    :disabled="example.showAll"
                  >
                  <span class="ml-2px">个</span>
                </el-radio>
                <el-radio class="ml-8px" v-model="example.showAll" :label="true">全部</el-radio>
              </div>
            </div>
            <div class="cate__field field">
              <label for="" class="field__label">菜单名称</label>
              <input class="field__menu-input el-input__inner" type="text" v-model="example.menu">
            </div>
            <CloseBtn class="cate__remove" @click="removeCate(0)"></CloseBtn>
          </div> -->

          <div v-for="cate, index in formdata.cateList" :key="cate.id" class="cate">
            <div class="cate__header">
              <svg class="cate__drag" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><circle cx="15" cy="12" r="1.5"/><circle cx="15" cy="24" r="1.5"/><circle cx="21" cy="12" r="1.5"/><circle cx="21" cy="24" r="1.5"/><circle cx="21" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/><path fill="none" d="M0 0h36v36H0z"/></svg>
              <span class="cate__name">{{ cate.name }}</span>
              <el-button class="cate__change ml-auto"
                type="primary"
                plain
                size="mini"
                @click="selectCate(index)"
              >修改</el-button>
            </div>
            <div class="cate__field field">
              <label for="" class="field__label">商品数量</label>
              <span class="field__value">{{ cate.productTotal }}</span>
            </div>
            <div class="cate__field field">
              <label for="" class="field__label">显示数量</label>
              <el-radio-group class="ml-auto" size="small"
                v-model="cate.showAll"
                @change="handleCateListChange"
              >
                <el-radio-button :label="false">指定数量</el-radio-button>
                <el-radio-button :label="true">全部商品</el-radio-button>
              </el-radio-group>
              <!-- <div class="flex items-center">
                <el-radio v-model="cate.showAll" :label="false">
                  <input class="field__count-input el-input__inner"
                    :class="cate.showAll && 'is-disabled'"
                    type="number"
                    :min="1"
                    :max="100"
                    v-model="cate.showCount"
                    :disabled="cate.showAll"
                  >
                  <span class="ml-2px">个</span>
                </el-radio>
                <el-radio class="ml-8px" v-model="cate.showAll" :label="true">全部</el-radio>
              </div> -->
            </div>
            <div class="cate__field field">
              <label for="" class="field__label">指定数量</label>
              <el-input-number class="ml-auto" size="small"
                v-model="cate.showCount"
                :min="1"
                :max="100"
                :disabled="cate.showAll"
              ></el-input-number>
            </div>
            <div class="cate__field field">
              <label for="" class="field__label">菜单名称</label>
              <input class="field__menu-input el-input__inner" type="text" v-model="cate.menu" @input="handleCateListChange">
            </div>
            <CloseBtn class="cate__remove" @click="removeCate(index)"></CloseBtn>
          </div>
        </draggable>
        <el-button class="add-cate w-full"
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="selectCate(null)"
        >选择商品分类</el-button>
      </el-form-item>
    </el-form>
    <el-form class="options__form"
      :model="formdata"
      size="small"
      label-position="left"
      label-width="80px"
    >
      <el-form-item label="布局方式">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ layoutDisplay[formdata.layout] || '' }}</span>
          <el-radio-group class="ml-auto" size="small"
            v-model="formdata.layout"
            @change="handleChange($event, 'layout')"
          >
            <el-radio-button label="aside">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M153.6 153.6h307.2v716.8H153.6zm409.6 0h307.2v307.2H563.2zm0 409.6h307.2v307.2H563.2z" fill="currentColor"/></svg>
            </el-radio-button>
            <el-radio-button label="top">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M153.6 563.2h307.2v307.2H153.6zm0-409.6h716.8v307.2H153.6zm409.6 409.6h307.2v307.2H563.2z" fill="currentColor"/></svg>
            </el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="商品名称">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.isShowName ? '显示' : '不显示' }}</span>
          <el-switch class="ml-auto"
            v-model="formdata.isShowName"
            @change="handleChange($event, 'isShowName')"
          ></el-switch>
          <!-- <el-radio-group class="ml-auto" size="small"
            v-model="formdata.isShowName"
            @change="handleChange($event, 'isShowName')"
          >
            <el-radio-button :label="true">显示</el-radio-button>
            <el-radio-button :label="false">不显示</el-radio-button>
          </el-radio-group> -->
        </div>
      </el-form-item>
      <el-form-item label="商品描述">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.isShowDesc ? '显示' : '不显示' }}</span>
          <el-switch class="ml-auto"
            v-model="formdata.isShowDesc"
            @change="handleChange($event, 'isShowDesc')"
          ></el-switch>
          <!-- <el-radio-group class="ml-auto" size="small"
            v-model="formdata.isShowDesc"
            @change="handleChange($event, 'isShowDesc')"
          >
            <el-radio-button :label="true">显示</el-radio-button>
            <el-radio-button :label="false">不显示</el-radio-button>
          </el-radio-group> -->
        </div>
      </el-form-item>
      <el-form-item label="商品价格">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.isShowPrice ? '显示' : '不显示' }}</span>
          <el-switch class="ml-auto"
            v-model="formdata.isShowPrice"
            @change="handleChange($event, 'isShowPrice')"
          ></el-switch>
          <!-- <el-radio-group class="ml-auto" size="small"
            v-model="formdata.isShowPrice"
            @change="handleChange($event, 'isShowPrice')"
          >
            <el-radio-button :label="true">显示</el-radio-button>
            <el-radio-button :label="false">不显示</el-radio-button>
          </el-radio-group> -->
        </div>
      </el-form-item>
    </el-form>
    <CateSelect :visible.sync="cateSelectorVisible" @change="onSelectCate"></CateSelect>
  </div>
</template>

<script>
import _ from 'lodash'
import draggable from "vuedraggable"
import CateSelect from './select/CateSelect.vue'
import CloseBtn from './common/CloseBtn.vue'
import { getPropDefaultValue } from './utils'
import {
  getProps,
  getFormdata,
  getWatchers,
  getMeta,
} from './goods-category'

export default {
  components: {
    draggable,
    CateSelect,
    CloseBtn,
  },
  props: getProps(),
  data() {
    return {
      meta: getMeta(),
      formdata: getFormdata(),
      errors: {},
      cateSelectorVisible: false,
      dragOptions: {
        sort: true,
        animation: 150,
        handle: '.cate__drag',
      },
      layoutDisplay: {
        aside: '左侧菜单',
        top: '顶部菜单',
      },
      currentIndex: null,
    }
  },
  watch: getWatchers(),
  methods: {
    /** 修改属性值 */
    handleChange(value, prop) {
      // console.log('handleChange', {[prop]: value})
      this.$emit('change', {[prop]: value})
    },
    /** 重置属性值 */
    reset(prop) {
      const value = getPropDefaultValue(getProps(), prop)
      this.handleChange(value, prop)
    },
    /** 处理分类列表更新 */
    handleCateListChange() {
      this.handleChange(_.cloneDeep(this.formdata.cateList), 'cateList')
    },
    /** 显示分类选择弹窗 */
    selectCate(index) {
      this.currentIndex = index
      this.cateSelectorVisible = true
    },
    /** 接收选择的分类 */
    onSelectCate(cate) {
      cate = Object.assign({}, cate, {
        showAll: false,
        showCount: 10,
        menu: cate.name,
      })
      if (this.currentIndex != null) {
        this.formdata.cateList.splice(this.currentIndex, 1, cate)
      } else {
        this.formdata.cateList.push(cate)
      }
      this.handleCateListChange()
    },
    /** 移除分类 */
    removeCate(index) {
      this.formdata.cateList.splice(index, 1)
      this.handleCateListChange()
    },
    /** 什么都不做 */
    noop() {},
  },
}
</script>

<style lang="scss" src="../assets/utils.scss" scoped></style>
<style lang="scss" src="../assets/view-options.scss" scoped></style>
<style lang="scss" scoped>
.cate-list-form {

  .cate-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .cate {
    // padding: 12px;
    width: 100%;
    padding-bottom: 12px;
    font-size: 14px;
    background: #f7f7f7;
    position: relative;
    margin-bottom: 8px;

    &__header {
      display: flex;
      align-items: center;
      padding: 6px;
      padding-right: 12px;

      position: relative;

      &::after {
        content: "";
        display: block;
        height: 1px;
        position: absolute;
        left: 12px;
        right: 12px;
        bottom: 0;
        background: #d9d9d9;
      }
    }

    &__drag {
      flex: none;
      width: 28px;
      height: 100%;
      color: #999999;
      cursor: move;
    }

    &__remove {
      position: absolute;
      right: 0;
      top: 0;
      opacity: 0;
      transform: translate(45%, -45%);
      z-index: -1;
    }

    &:hover .cate__remove {
      z-index: 1;
      opacity: 1;
    }
  }

  .field {
    display: flex;
    align-items: center;
    padding: 0 12px;
    margin: 16px 0 0;

    &__label {
      flex: none;
      width: 72px;
      color: #515151;
    }

    ::v-deep .el-radio {
      display: inline-flex;
      align-items: center;
    }

    &__count-input {
      width: 60px;
      height: 30px;
      padding: 0 6px;
      // border: none;
      // box-shadow: none;

      &.is-disabled {
        background-color: #f5f7fa;
        border-color: #e4e7ed;
        color: #c0c4cc;
        cursor: not-allowed;
      }
    }

    &__menu-input {
      flex: 1;
      height: 30px;
      padding:  0 6px;
    }
  }
}
</style>
