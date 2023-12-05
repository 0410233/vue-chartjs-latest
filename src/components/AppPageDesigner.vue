<template>
  <div class="app-page">
    <div class="app-page__header"></div>
    <draggable tag="div" class="app-page__components"
      v-model="components"
      v-bind="componentDragOptions"
    >
      <div v-for="com in components" :key="com.name" class="component">
        <div class="component__icon"></div>
        <div class="component__name">{{ com.label }}</div>
      </div>
    </draggable>
    <div class="app-page__main">
      <div class="phone">
        <img src="../assets/iphone-frame.png" alt="" class="phone__frame">
        <div class="phone__screen">
          <div class="phone__layout">
            <el-scrollbar ref="scrollbar">
              <draggable tag="div"
                class="phone__blocks"
                :style="{minHeight: windowHeight + 'px'}"
                v-model="blocks"
                v-bind="blockDragOptions"
                @add="onAdd"
                @end="onBlockDragEnd"
              >
                <div v-for="block, index in blocks" :key="index"
                  class="block"
                  :class="{'is-active': current === index}"
                  @click="current = index"
                >
                  <div class="block__header">
                    <div class="block__btns">
                      <div class="block__btn block__btn--close" @click.stop="deleteBlock(index)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="block__btn-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg>
                      </div>
                      <div class="block__btn block__btn--up" @click.stop="blockUp(index)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="block__btn-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"></path></svg>
                      </div>
                      <div class="block__btn block__btn--down" @click.stop="blockDown(index)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="block__btn-icon"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"></path></svg>
                      </div>
                      <div class="block__btn block__btn--drag">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 1024 1024" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="block__btn-icon"><path d="M783.25 413.147l68.9 62.94H548.06V174.629l63.122 66.12 50.87-51.2L509.112 36.572 355.84 189.513l51.2 51.2 68.937-66.084v301.458h-298.35l62.757-62.903-50.834-50.87L36.57 515.253l152.942 152.943 50.834-50.835-62.72-69.12h298.314v301.312l-68.901-65.938-51.2 50.834L509.074 987.43l152.942-152.942-50.834-50.834-63.16 65.901V548.206h304.092l-68.9 69.12 51.2 50.834 153.015-152.869L834.487 362.35z"/></svg>
                      </div>
                    </div>
                  </div>
                  <component :is="block.name" v-bind="block.data"></component>
                </div>
              </draggable>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
    <div class="app-page__options">
      <el-tabs type="border-card" v-model="currentTab" style="height: 100%;">
        <el-tab-pane label="布局组件" name="layout">
          <component v-if="currentBlock"
            :is="currentBlock.name + 'Form'"
            v-bind="currentBlock.data"
            @change="onChange"
          ></component>
        </el-tab-pane>
        <el-tab-pane label="页面标题" name="title">
          <el-input v-model="title" size="medium" placeholder="标题文字"></el-input>
        </el-tab-pane>
        <el-tab-pane label="tabbar" name="tabbar">
          <span>页面底部 Tabbar</span>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

const components = [{
  name: 'AcText',
  label: '文字',
  data: {
    content: '示例文字',
  },
}, {
  name: 'AcImage',
  label: '图片',
  data: {
    src: '',
  },
}, {
  name: 'AcCarousel',
  label: '轮播',
  data: {
    imageList: [],
  }
}]

export default {
  name: "AppPageDesigner",
  components: {
    draggable,
    AcText: () => import('./app-page-components/AcText.vue'),
    AcImage: () => import('./app-page-components/AcImage.vue'),
    AcCarousel: () => import('./app-page-components/AcCarousel.vue'),
    AcTextForm: () => import('./app-page-components/AcTextForm.vue'),
  },
  data() {
    // const vm = this;
    return {
      drag: false,
      components: components.map((el, index) => Object.assign({order: index + 1, fixed: false}, el)),
      blocks: [],
      current: null,
      /** 组件拖放选项 */
      componentDragOptions: {
        group: {
          name: "app-page",
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
          name: "app-page",
          pull: false,
          put: true,
        },
        ghostClass: 'block--ghost',
        sort: true,
        handle: '.block__btn--drag',
      },
      /** 手机布局高度 */
      windowHeight: 600,
      /** 当前选项卡（右侧表单）: layout|title|tabbar */
      currentTab: 'layout',
      /** 页面标题 */
      title: '页面标题',
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
    this.windowHeight = Math.max(rect.height - 20, 200)
  },
  unmounted() {
    // 
  },
  methods: {
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
    deleteBlock(index) {
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
    blockUp(index) {
      if (index > 0) {
        const block = this.blocks.splice(index, 1)[0]
        this.blocks.splice(index-1, 0, block)
        if (index === this.current) {
          this.current = index - 1
        }
      }
    },
    /** 布局组件向下移动 */
    blockDown(index) {
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
  },
};
</script>
<style lang="scss" scoped>
.app-page {
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  width: 100%;
  min-height: 100%;
  padding-top: 60px;
  position: relative;

  &__header {
    width: 100%;
    height: 48px;
    background: #ffffff;

    position: absolute;
    top: 0;
    left: 0;
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
  width: 372px;
  height: 750px;
  border-radius: 60px;
  background: #ffffff;

  position: relative;

  &__frame {
    display: block;
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  &__screen {
    display: block;
    width: 328px;
    height: 710px;
    padding-top: 28px;
    border-radius: 40px;
    box-sizing: border-box;
    overflow: hidden;
    
    position: absolute;
    top: 20px;
    left: 22px;
    z-index: 10;
  }

  &__layout {
    width: 100%;
    height: 100%;
    padding: 1px;
    box-sizing: border-box;
    // overflow: auto;
        
    ::v-deep .el-scrollbar {
      width: 100%;
      height: 100%;
    }

    ::v-deep .el-scrollbar__wrap {
      overflow-x: visible;
    }
  }

  &__blocks {
    width: 100%;
    min-height: 100%;
    padding: 8px 0;
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
    // outline-offset: -4px;
    // opacity: 0.6;
  }

  &__header {
    width: 100%;
    height: 0;
    overflow: hidden;
    background: #fff;
    opacity: 0;
    transition: all 200ms;
    position: relative;
  }

  &.is-active &__header {
    height: 30px;
    // border-bottom: 1px dashed #9ca3af;
    opacity: 1;
  }

  &__btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 30px;
    padding: 4px 4px 2px;
    box-sizing: border-box;

    position: absolute;
    left: 0;
    bottom: 0;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    border: 1px solid #9ca3af;
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
      border-color: #2563eb;
    }

    &--close:hover {
      background-color: #d60000;
      border-color: #d60000;
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
