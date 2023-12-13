<template>
  <div class="page-builder-wrapper" :class="isFullscreen && 'is-fullscreen'" ref="el_builder">
    <div class="page-builder">
      <div class="page-builder__header">
        <el-button size="small" type="success" icon="el-icon-view">预览</el-button>
        <el-button size="small" type="primary" icon="el-icon-document-checked">保存</el-button>
        <el-button size="small" icon="el-icon-document">草稿</el-button>
        <el-button v-if="fullscreenEnabled"
          size="small" icon="el-icon-full-screen"
          @click="toggleFullscreen"
        >{{ isFullscreen ? '退出全屏' : '全屏' }}</el-button>
      </div>
      <draggable tag="div" class="page-builder__items"
        v-model="items"
        v-bind="itemDragOptions"
      >
        <div v-for="item in items" :key="item.name" class="component">
          <component :is="upperFirst(item.name) + 'Item'"></component>
        </div>
      </draggable>
      <div class="page-builder__layout">
        <div class="phone">
          <img src="../assets/iphone-frame.png" alt="" class="phone__frame">
          <div class="phone__screen" @click="onClickScreen">
            <div class="layer layer--header" :class="currentTab === 'header' ? 'is-active' : ''">
              <div class="navbar">{{ headerData.title }}</div>
            </div>
            <div class="layer layer--body" :class="currentTab === 'view-options' ? 'is-active' : ''">
              <el-scrollbar ref="scrollbar">
                <draggable tag="div"
                  class="views"
                  :style="{minHeight: windowHeight + 'px'}"
                  v-model="views"
                  v-bind="viewDragOptions"
                  @add="onAdd"
                  @end="onBlockDragEnd"
                >
                  <div v-for="view, index in views" :key="index"
                    class="view"
                    :class="{'is-active': selected === index}"
                    @click.stop="onClickView(index)"
                  >
                    <component :is="upperFirst(view.name) + 'View'" v-bind="view.data"></component>
                  </div>
                </draggable>
              </el-scrollbar>
            </div>
            <div class="layer layer--footer" :class="currentTab === 'footer' ? 'is-active' : ''">
              <div class="tabbar">{{ '（底部导航）' }}</div>
            </div>
            <div :class="{overlay: true, 'is-active': currentTab === 'footer' || currentTab === 'header'}"></div>
          </div>
          <div class="phone__notch">
            <img src="../assets/iphone-frame.png" alt="" class="phone__frame">
          </div>
        </div>
      </div>
      <div class="page-builder__options" :class="isViewsActive && 'is-views-active'">
        <el-tabs class="option-tabs"
          tab-position="left"
          v-model="currentTab"
        >
          <el-tab-pane label="页面设置" name="page">
            <div class="options">
              <h4 class="options__title">页面设置</h4>
            </div>
          </el-tab-pane>
          <el-tab-pane label="组件管理" name="views-management">
            <div class="view-sort-scroll" ref="view_sort_scroll">
              <draggable tag="div"
                class="view-sort-list"
                v-model="views"
                v-bind="viewSortDragOptions"
              >
                <div v-for="view, index in views" :key="index"
                  class="view-sort-item"
                  :class="{'is-active': selected === index}"
                  @click.stop="onClickSortableView(index)"
                >
                  <svg class="view-sort-item__drag" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><circle cx="15" cy="12" r="1.5"/><circle cx="15" cy="24" r="1.5"/><circle cx="21" cy="12" r="1.5"/><circle cx="21" cy="24" r="1.5"/><circle cx="21" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                  <span class="view-sort-item__index">{{ index + 1 }}</span>
                  <span class="view-sort-item__label" :title="view.label">{{ view.label }}</span>
                  <!-- 复制 -->
                  <div class="view-sort-item__btn view-sort-item__btn--copy" title="复制" @click="copyView(index)">
                    <svg class="view-sort-item__btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"/><rect x="4" y="8" width="12" height="12" rx="1" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path d="M8 6V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 2" stroke="currentColor"/></svg>
                  </div>
                  <!-- 删除 -->
                  <div class="view-sort-item__btn view-sort-item__btn--delete" title="移除" @click="deleteView(index)">
                    <svg class="view-sort-item__btn-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M7 7h18v22H7zM3 7h26M13 3h6M13 12v10M19 12v10" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="currentColor" stroke-width="2px"/></svg>
                  </div>
                </div>
              </draggable>
            </div>
          </el-tab-pane>
          <el-tab-pane label="组件设置" name="view-options">
            <component v-if="selectedView"
              :is="upperFirst(selectedView.name) + 'Form'"
              v-bind="selectedView.data"
              @change="onChange"
            ></component>
            <div v-else class="options">
              <span style="color: #a1a1a1; font-size: 14px;">（在这里编辑选中的组件）</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="顶部导航" name="header">
            <div class="options">
              <h4 class="options__title">顶部导航</h4>
              <!-- <p class="options__subtitle">（副标题）</p> -->
              <el-form :model="headerData">
                <el-form-item label="标题：" prop="title">
                  <el-input v-model="headerData.title" size="medium" placeholder="请输入标题"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="底部导航" name="footer">
            <div class="options">
              <h4 class="options__title">底部导航</h4>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { components, metas } from './components'

export default {
  name: "PageBuilder",
  components: {
    draggable,
    ...components,
  },
  data() {
    return {
      /** 左侧列表项目 */
      items: metas.map((meta, i) => Object.assign({order: i + 1, fixed: false}, meta)),
      /** 视图，组件拖放到布局区后生成视图 */
      views: [],
      /** 当前选择的视图的序号 */
      selected: null,
      /** 组件拖放选项 */
      itemDragOptions: {
        group: {
          name: "page-components",
          pull: 'clone',
          put: false,
        },
        ghostClass: 'component--ghost',
        sort: false,
        clone: (item) => JSON.parse(JSON.stringify(item)),
      },
      /** 组件视图拖放选项 */
      viewDragOptions: {
        animation: 150,
        group: {
          name: "page-components",
          pull: false,
          put: true,
        },
        ghostClass: 'view--ghost',
        sort: false,
        handle: '.view__btn--drag',
      },
      /** 组件排序列表拖放选项 */
      viewSortDragOptions: {
        animation: 150,
        group: {
          name: "page-components",
          pull: false,
          put: false,
        },
        sort: true,
      },
      /** 手机布局高度 */
      windowHeight: 420,
      /** 当前选项卡（右侧表单区）: views-management|view-options|header|footer|page */
      currentTab: 'view-options',
      /** 页面顶部配置 */
      headerData: {
        /** 页面标题 */
        title: '页面标题',
      },
      /** 底部配置 */
      footer: {
        tabbarItems: [],
      },

      /** 全屏是否可用 */
      fullscreenEnabled: false,
      /** 是否全屏 */
      isFullscreen: false,
      /** 显示 viewList 列表 */
      isViewsActive: true,
    }
  },
  computed: {
    selectedView() {
      return this.views[this.selected] || null
    },
  },
  mounted() {
    // console.log(this.$refs.scrollbar)
    const rect = this.$refs.scrollbar.$el.getBoundingClientRect()
    this.windowHeight = Math.max(rect.height - 20, 420)

    // 全屏设置
    try {
      if (document && document.fullscreenEnabled) {
        this.fullscreenEnabled = true
        // document.onfullscreenchange = () => {
        //   this.isFullscreen = document.fullscreenElement !== null
        // }
        this.$refs.el_builder.onfullscreenchange = () => {
          this.isFullscreen = document.fullscreenElement !== null
        }
      }
    } catch (err) {
      console.warn(err)
    }
  },
  unmounted() {
    // 
  },
  methods: {
    /** 切换全屏 */
    toggleFullscreen() {
      try {
        // console.log('el_builder', this.$refs.el_builder)
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          this.$refs.el_builder.requestFullscreen()
        }
      } catch (error) {
        console.warn(error)
        this.isFullscreen = false
      }
    },
    /** 组件拖放到布局区 */
    onAdd(evt) {
      // console.log('onAdd', {evt})
      // const com = this.components[evt.oldIndex]
      // this.views.splice(evt.newIndex, 0, JSON.parse(JSON.stringify(com)))
      this.selected = evt.newIndex
    },
    /** 视图参数变化 */
    onChange(data) {
      if (this.selected >= 0 && this.selectedView) {
        const value = Object.assign({}, this.views[this.selected].data, data)
        console.log('onChange', {selected: this.selected, value})
        this.$set(this.views[this.selected], 'data', value)
      }
    },
    /** 删除视图 */
    removeBlock() {
      const index = this.selected
      this.views.splice(index, 1)
      if (this.views.length < 1) {
        this.selected = null
      } else {
        this.selected = Math.min(index, this.views.length - 1)
      }
    },
    /** 视图上移 */
    moveUpBlock() {
      const index = this.selected
      if (index > 0) {
        const view = this.views.splice(index, 1)[0]
        this.views.splice(index-1, 0, view)
        this.selected = index - 1
      }
    },
    /** 视图下移 */
    moveDownBlock() {
      const index = this.selected
      if (index < this.views.length - 1) {
        const view = this.views.splice(index, 1)[0]
        this.views.splice(index+1, 0, view)
        this.selected = index + 1
      }
    },
    /** 视图拖动结束 */
    onBlockDragEnd(evt) {
      this.selected = evt.newIndex
    },
    /** 点击视图 */
    onClickView(index) {
      this.selected = index
      this.$refs.view_sort_scroll.scrollTo({
        top: index*36,
        behavior: "smooth",
      })
    },
    /**
     * 点击模拟器非视图部分，清空当前及保存的视图
     */
    onClickScreen() {
      // if (this.currentTab === 'body') {
      //   this.selected = null
      // }
    },
    /** 第一个字母转大写 */
    upperFirst(str) {
      if (str.length) {
        str = str[0].toUpperCase() + str.slice(1)
      }
      return str
    },
    /** 复制组件 */
    copyView(index) {
      const view = this.views[index]
      if (view) {
        this.views.push(JSON.parse(JSON.stringify(view)))
      }
    },
    /** 删除组件 */
    deleteView(index) {
      this.views.splice(index, 1)
    },
    /** 点击排序视图 */
    onClickSortableView(index) {
      this.selected = index
    },
    /** 什么都不做 */
    noop() {},
  },
};
</script>

<style lang="scss" scoped>
@import './assets/utils.scss';
@import './assets/view-options.scss';

// 模拟器宽度
$phone-width: 372px;
// 模拟器高度
$phone-height: 750px;
// 模拟器布局宽度
$phone-screen-width: 330px;
// 模拟器布局高度
$phone-screen-height: 712px;
// 模拟器布局区域圆角大小
$phone-screen-radius: 39px;
// 模拟器状态栏高度
$phone-statusbar-height: 30px;
// 模拟器导航栏高度
$phone-navbar-height: 48px;
// 安全区域高度
$phone-safearea-height: 34px;
// 底部导航高度
$phone-tabbar-height: 50px;

.page-builder-wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  
  &.is-fullscreen {
    // height: 100%;
    padding: 16px;
    background: #f5f5f5;
  }
}

.page-builder {
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  width: 100%;
  min-height: 100%;
  padding-top: 60px;
  box-sizing: border-box;
  position: relative;

  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 100%;
    height: 48px;
    padding: 0 16px;
    box-sizing: border-box;
    background: #ffffff;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    flex: none;
    width: 196px;
    padding: 8px 6px;
    background: #ffffff;

    overflow: auto;
  }

  &__layout {
    flex: none;
    position: relative;
    margin: 0 40px;
  }
  
  &__options {
    flex: none;
    width: 456px;
    position: relative;
  }
}

.component {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: none;
  width: 92px;
  padding: 8px 6px;
  box-sizing: border-box;

  &--ghost, &:hover {
    outline: dashed #5151f2;
    outline-offset: -2px;
    opacity: 0.95;
  }

  &__icon {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    background: #f1f1f1;
  }

  &__name {
    font-size: 14px;
    margin-top: 12px;
  }
}

.phone {
  width: $phone-width;
  height: $phone-height;
  border-radius: 60px;
  background: #ffffff;

  position: relative;

  &__frame {
    display: block;
    width: $phone-width;
    height: $phone-height;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  &__notch {
    width: 146px;
    height: 48px;
    overflow: hidden;
    
    position: absolute;
    top: 0;
    left: 114px;
    z-index: 1001;
  }

  &__notch &__frame {
    left: -114px;
  }

  &__screen {
    display: block;
    width: $phone-screen-width;
    height: $phone-screen-height;
    /* padding-top: 28px; */
    border-radius: $phone-screen-radius;
    box-sizing: border-box;
    overflow: hidden;
    background: #ffffff;

    position: absolute;
    top: 19px;
    left: 22px;
    z-index: 10;
  }
}

.layer {
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  left: 0;

  &.is-active {
    z-index: 200;
  }

  &--header {
    height: calc($phone-statusbar-height + $phone-navbar-height);
    padding-top: $phone-navbar-height;
    background: #ffffff;

    top: 0;
    z-index: 10;
  }

  &--body {
    height: 100%;
    padding-top: calc($phone-statusbar-height + $phone-navbar-height);
    padding-bottom: calc($phone-safearea-height + $phone-tabbar-height);

    top: 0;
    z-index: 20;
  }

  &--footer {
    height: calc($phone-safearea-height + $phone-tabbar-height);
    padding-bottom: $phone-safearea-height;
    background: #ffffff;

    bottom: 0;
    z-index: 10;
  }

  .navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #e1e1e1;
  }

  .tabbar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-top: 1px solid #e1e1e1;
  }

  ::v-deep .el-scrollbar {
    width: 100%;
    height: 100%;
  }

  ::v-deep .el-scrollbar__wrap {
    overflow-x: visible;
  }
}

.overlay {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  transition: all 200ms;

  &.is-active {
    opacity: 1;
    z-index: 100;
  }
}

.views {
  width: 100%;
  min-height: 100%;
  padding: 2px 0 0;
  box-sizing: border-box;

  .component {
    width: 100%;
    padding: 8px 16px;

    &.view--ghost {
      outline: 2px dashed #5151f2;
      // outline-offset: -4px;
      opacity: 0.95;
    }
  }
}

.view {
  min-height: 20px;

  &__icon {
    flex: none;
    width: 40px;
    height: 40px;
    background: #f1f1f1;
  }

  &__name {
    font-size: 14px;
    margin-left: 12px;
  }

  &.is-active {
    min-height: 24px;
    outline: 2px dashed #5151f2;
    // outline-offset: -4px;
  }

  &--ghost {
    outline: 2px dashed #5151f2 !important;
    outline-offset: -2px;
    // opacity: 0.6;
  }

  &__header {
    width: 100%;
    height: 0;
    overflow: hidden;

    opacity: 0;
    transition: all 200ms;
    position: relative;
    z-index: 10;
  }

  &.is-active &__header {
    height: 36px;
    opacity: 1;
  }

  &__btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 61.8%;
    height: 32px;
    padding: 0 4px;
    border-radius: 16px;
    box-sizing: border-box;
    background: #e2e8f0;

    position: absolute;
    left: 50%;
    top: 2px;
    transform: translateX(-50%);
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    color: #111827;
    background: #ffffff;
    cursor: pointer;
    margin-left: 6px;

    &--close {
      margin-left: 0;
      margin-right: auto;
    }

    &:hover {
      color: #ffffff;
      background-color: #2563eb;
    }

    &--close:hover {
      background-color: #d60000;
    }

    &-icon {
      flex: none;
      width: 12px;
      height: 12px;
      stroke-width: 2;
    }
  }
}

.view-sort-scroll {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
}

.view-sort-item {
  display: flex;
  align-items: center;

  width: 100%;
  height: 36px;
  padding: 0 6px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-sizing: border-box;

  font-size: 13px;
  cursor: move;

  margin-bottom: 4px;

  &:hover {
    background-color: #f7f7f7;
  }

  &.is-active {
    background-color: #e6efff;
  }

  &__drag {
    flex: none;
    width: 24px;
    height: 24px;
    color: #999;
  }

  &__label {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    margin-left: 4px;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 24px;
    height: 24px;
    border-radius: 2px;
    cursor: pointer;
    opacity: 0;
    transition: all 150ms;

    &:hover {
      background-color: rgba(0,0,0,.1);
    }

    &-icon {
      flex: none;
      width: 18px;
      height: 18px;
      color: #333;
    }
  }

  &:hover &__btn {
    opacity: 1;
  }
}

.option-tabs {
  width: 100%;
  height: 100%;
}

</style>
