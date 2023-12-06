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
      <draggable tag="div" class="page-builder__components"
        v-model="components"
        v-bind="componentDragOptions"
      >
        <div v-for="com in components" :key="com.name" class="component">
          <div class="component__icon"></div>
          <div class="component__name">{{ com.label }}</div>
        </div>
      </draggable>
      <div class="page-builder__main">
        <div class="phone">
          <img src="../assets/iphone-frame.png" alt="" class="phone__frame">
          <div class="phone__screen" @click="onClickScreen">
            <div class="layer layer--header" :class="currentTab === 'header' ? 'is-active' : ''">
              <div class="navbar">{{ headerData.title }}</div>
            </div>
            <div class="layer layer--body" :class="currentTab === 'body' ? 'is-active' : ''">
              <el-scrollbar ref="scrollbar">
                <draggable tag="div"
                  class="blocks"
                  :style="{minHeight: windowHeight + 'px'}"
                  v-model="blocks"
                  v-bind="blockDragOptions"
                  @add="onAdd"
                  @end="onBlockDragEnd"
                >
                  <div v-for="block, index in blocks" :key="index"
                    class="block"
                    :class="{'is-active': current === index}"
                    @click.stop="clickBlock(index)"
                  >
                    <div class="block__header" @click.stop="noop">
                      <div class="block__btns">
                        <el-tooltip content="移除" placement="top">
                          <div class="block__btn block__btn--close" @click="removeBlock(index)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="block__btn-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg>
                            <!-- <i class="el-icon-delete block__btn-icon"></i> -->
                          </div>
                        </el-tooltip>
                        <el-tooltip content="上移" placement="top">
                          <div class="block__btn block__btn--up" @click="moveUpBlock(index)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="block__btn-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"></path></svg>
                            <!-- <i class="el-icon-top block__btn-icon"></i> -->
                          </div>
                        </el-tooltip>
                        <el-tooltip content="下移" placement="top">
                          <div class="block__btn block__btn--down" @click="moveDownBlock(index)">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="block__btn-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"></path></svg>
                            <!-- <i class="el-icon-bottom block__btn-icon"></i> -->
                          </div>
                        </el-tooltip>
                        <el-tooltip content="拖动排序" placement="top">
                          <div class="block__btn block__btn--drag">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 1024 1024" stroke="currentColor" class="block__btn-icon"><path d="M783.25 413.147l68.9 62.94H548.06V174.629l63.122 66.12 50.87-51.2L509.112 36.572 355.84 189.513l51.2 51.2 68.937-66.084v301.458h-298.35l62.757-62.903-50.834-50.87L36.57 515.253l152.942 152.943 50.834-50.835-62.72-69.12h298.314v301.312l-68.901-65.938-51.2 50.834L509.074 987.43l152.942-152.942-50.834-50.834-63.16 65.901V548.206h304.092l-68.9 69.12 51.2 50.834 153.015-152.869L834.487 362.35z"/></svg>
                            <!-- <i class="el-icon-rank block__btn-icon"></i> -->
                          </div>
                        </el-tooltip>
                      </div>
                    </div>
                    <component :is="block.name" v-bind="block.data"></component>
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
      <div class="page-builder__options options">
        <!-- <div class="options__tabs">
          <div class="options__tab"
            :class="{'is-active': currentTab === 'page'}"
            @click="currentTab = 'page'"
          >页面</div>
          <div class="options__tab"
            :class="{'is-active': currentTab === 'header'}"
            @click="currentTab = 'header'"
          >顶部</div>
          <div class="options__tab"
            :class="{'is-active': currentTab === 'body'}"
            @click="currentTab = 'body'"
          >内容</div>
          <div class="options__tab"
            :class="{'is-active': currentTab === 'footer'}"
            @click="currentTab = 'footer'"
          >底部</div>
        </div>
        <div v-show="currentTab === 'page'" class="options__panel">
          <h3>页面设置</h3>
        </div>
        <div v-show="currentTab === 'header'" class="options__panel">
          <h3>顶部导航</h3>
          <el-form>
            <el-form-item label="标题：">
              <el-input v-model="title" size="medium" placeholder="请输入标题"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="currentTab === 'body'" class="options__panel">
          <component v-if="currentBlock"
            :is="currentBlock.name + 'Form'"
            v-bind="currentBlock.data"
            @change="onChange"
          ></component>
        </div>
        <div v-show="currentTab === 'footer'" class="options__panel">
          <h3>底部导航</h3>
        </div> -->
        <el-tabs type="border-card" v-model="currentTab" style="height: 100%;">
          <el-tab-pane label="内容" name="body">
            <component v-if="currentBlock"
              :is="currentBlock.name + 'Form'"
              v-bind="currentBlock.data"
              @change="onChange"
            ></component>
          </el-tab-pane>
          <el-tab-pane label="顶部" name="header">
            <h3 class="options__title">顶部导航</h3>
            <p class="options__subtitle"></p>
            <el-form :model="headerData">
              <el-form-item label="标题：" prop="title">
                <el-input v-model="headerData.title" size="medium" placeholder="请输入标题"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="底部" name="footer">
            <h3>底部导航</h3>
          </el-tab-pane>
          <el-tab-pane label="页面" name="page">
            <h3>页面设置</h3>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { components } from './config'

export default {
  name: "PageBuilder",
  components: {
    draggable,
    CTitle: () => import('./components/CTitle.vue'),
    CTitleForm: () => import('./components/CTitleForm.vue'),
    CText: () => import('./components/CText.vue'),
    CTextForm: () => import('./components/CTextForm.vue'),
    CImage: () => import('./components/CImage.vue'),
    CCarousel: () => import('./components/CCarousel.vue'),
    CGap: () => import('./components/CGap.vue'),
    CGapForm: () => import('./components/CGapForm.vue'),
  },
  data() {
    // const vm = this;
    return {
      // drag: false,
      components: components.map((x, i) => Object.assign({order: i + 1, fixed: false}, x)),
      blocks: [],
      current: null,
      /** 组件拖放选项 */
      componentDragOptions: {
        group: {
          name: "page-components",
          pull: 'clone',
          put: false,
        },
        ghostClass: 'component--ghost',
        sort: false,
        clone: (item) => JSON.parse(JSON.stringify(item)),
      },
      /** 布局拖放选项 */
      blockDragOptions: {
        animation: 150,
        group: {
          name: "page-components",
          pull: false,
          put: true,
        },
        ghostClass: 'block--ghost',
        sort: true,
        handle: '.block__btn--drag',
      },
      /** 手机布局高度 */
      windowHeight: 420,
      /** 当前选项卡（右侧表单）: page|header|body|footer */
      currentTab: 'body',

      headerData: {
        /** 页面标题 */
        title: '页面标题',
      },

      /** 全屏是否可用 */
      fullscreenEnabled: false,
      /** 是否全屏 */
      isFullscreen: false,
    }
  },
  computed: {
    currentBlock() {
      return this.blocks[this.current] || null
    },
  },
  mounted() {
    // console.log(this.$refs.scrollbar)
    const rect = this.$refs.scrollbar.$el.getBoundingClientRect()
    this.windowHeight = Math.max(rect.height - 20, 420)

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
      this.current = evt.newIndex
    },
    /** 布局组件表单变化 */
    onChange(data) {
      if (this.current >= 0) {
        const value = Object.assign({}, this.blocks[this.current].data, data)
        this.$set(this.blocks[this.current], 'data', value)
      }
    },
    /** 删除布局组件 */
    removeBlock(index) {
      this.blocks.splice(index, 1)
      if (index === this.current) {
        if (this.blocks.length < 1) {
          this.current = null
        } else {
          this.current = Math.min(index, this.blocks.length - 1)
        }
      }
    },
    /** 布局组件向上移动 */
    moveUpBlock(index) {
      if (index > 0) {
        const block = this.blocks.splice(index, 1)[0]
        this.blocks.splice(index-1, 0, block)
        if (index === this.current) {
          this.current = index - 1
        }
      }
    },
    /** 布局组件向下移动 */
    moveDownBlock(index) {
      if (index < this.blocks.length - 1) {
        const block = this.blocks.splice(index, 1)[0]
        this.blocks.splice(index+1, 0, block)
        if (index === this.current) {
          this.current = index + 1
        }
      }
    },
    /** 布局组件拖动结束 */
    onBlockDragEnd(evt) {
      this.current = evt.newIndex
    },

    clickBlock(index) {
      this.current = index
      // if (index !== this.current) {
      //   this.current = index
      // } else {
      //   this.current = null
      // }
    },

    onClickScreen() {
      if (this.currentTab === 'body') {
        this.current = null
      }
    },

    noop() {},
  },
};
</script>
<style lang="scss" scoped>

// 模拟器宽度
$phone-width: 372px;
// 模拟器高度
$phone-height: 750px;
// 模拟器布局宽度
$phone-screen-width: 328px;
// 模拟器布局高度
$phone-screen-height: 712px;
// 模拟器布局区域圆角大小
$phone-screen-radius: 40px;
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

  &__components {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    flex: none;
    width: 232px;
    padding: 16px 8px;
    background: #ffffff;

    overflow: auto;
  }

  &__main {
    flex: none;
    position: relative;
    margin: 0 40px;
  }

  &__options {
    flex: none;
    width: 400px;
    // background: #ffffff;
  }
}

.component {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: none;
  width: 108px;
  padding: 8px;
  box-sizing: border-box;

  &--ghost {
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

.blocks {
  width: 100%;
  min-height: 100%;
  // padding: 2px 0;
  box-sizing: border-box;

  .component {
    width: 100%;
    padding: 8px 16px;

    &.block--ghost {
      outline: 2px dashed #5151f2;
      // outline-offset: -4px;
      opacity: 0.95;
    }
  }
}

.block {
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
    outline: 2px dashed #666;
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
    // background: #ffffff;
    // border-bottom: 1px solid #a1a1a1;

    opacity: 0;
    transition: all 200ms;
    position: relative;
    z-index: 10;
  }

  &.is-active &__header {
    height: 36px;
    // border-bottom: 1px dashed #9ca3af;
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
    // border: 1px solid #9ca3af;
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
      // border-color: #2563eb;
    }

    &--close:hover {
      background-color: #d60000;
      // border-color: #d60000;
    }

    &-icon {
      flex: none;
      width: 12px;
      height: 12px;
      stroke-width: 2;
    }
  }
}

</style>
