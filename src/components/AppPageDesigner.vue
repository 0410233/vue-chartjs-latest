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
              >
                <div v-for="block, index in blocks" :key="index"
                  class="block"
                  :class="{'is-active': current === index}"
                  @click="current = index"
                >
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
        sort: true
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
    onAdd(evt) {
      this.current = evt.newIndex
    },
    onChange(data) {
      if (this.current >= 0) {
        const value = Object.assign({}, this.blocks[this.current].data, data)
        this.$set(this.blocks[this.current], 'data', value)
      }
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

    .block {
      display: flex;
      align-items: center;
      min-height: 40px;
      padding: 8px 16px;

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
        outline-offset: -4px;
      }

      &--ghost {
        outline: 2px dashed #5151f2 !important;
        outline-offset: -4px;
        // opacity: 0.6;
      }
    }

    .component {
      width: 100%;
      padding: 8px 16px;

      &.block--ghost {
        outline: 2px dashed #5151f2;
        outline-offset: -4px;
        opacity: 0.95;
      }
    }
  }
}
</style>
