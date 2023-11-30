<template>
  <div class="layout">
    <div class="layout__header"></div>
    <draggable tag="div" class="layout__components"
      v-model="components"
      v-bind="componentDragOptions"
    >
      <div v-for="com in components" :key="com.name" class="component">
        <div class="component__icon"></div>
        <div class="component__name">{{ com.label }}</div>
      </div>
    </draggable>
    <div class="layout__main">
      <div class="phone">
        <img src="../assets/iphone-frame.png" alt="" class="phone__frame">
        <div class="phone__screen">
          <div class="phone__layout">
            <draggable tag="div" class="phone__blocks"
              v-model="blocks"
              v-bind="blockDragOptions" 
            >
              <div v-for="block, index in blocks" :key="block.name"
                class="block"
                :class="{'is-active': current === index}"
                @click="current = index"
              >
                <!-- <div class="block__icon"></div>
                <div class="block__name">{{ block.name }}</div> -->
                <component :is="block.name" v-bind="block.data"></component>
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
    <div class="layout__options">
      <component v-if="currentBlock"
        :is="currentBlock.name + 'Form'"
        v-bind="currentBlock.data"
        @change="onChange"
      ></component>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

const components = [{
  name: 'MobileText',
  label: '文字',
  data: {
    content: '示例文字',
  },
}, {
  name: 'MobileImage',
  label: '图片',
  data: {
    src: '',
  },
}, {
  name: 'MobileCarousel',
  label: '轮播',
  data: {
    imageList: [],
  }
}]

export default {
  name: "LayoutDesigner",
  components: {
    draggable,
    MobileText: () => import('./layout-components/MobileText.vue'),
    MobileImage: () => import('./layout-components/MobileImage.vue'),
    MobileCarousel: () => import('./layout-components/MobileCarousel.vue'),
    MobileTextForm: () => import('./layout-components/MobileTextForm.vue'),
  },
  data() {
    return {
      drag: false,
      components: components.map((el, index) => Object.assign({order: index + 1, fixed: false}, el)),
      blocks: [],
      current: null,

      componentDragOptions: {
        group: {
          name: "layout",
          pull: 'clone',
          put: false,
        },
        ghostClass: 'component--ghost',
        sort: false,
        clone: (item) => JSON.parse(JSON.stringify(item)),
      },

      blockDragOptions: {
        animation: 150,
        group: {
          name: "layout",
          pull: false,
          put: true,
        },
        ghostClass: 'block--ghost',
        sort: true,
      },
    }
  },
  computed: {
    currentBlock() {
      return this.blocks[this.current] || null
    },
  },
  mounted() {
    // 
  },
  unmounted() {
    // 
  },
  methods: {
    // selectBlock(block) {
    //   this.current = block
    // },

    // onClone(evt) {
    //   console.log('onClone', evt)
    // },

    // onDrop(evt) {
    //   console.log('onDrop', evt)
    //   if (this.blocks[evt.newIndex]) {
    //     const item = this.blocks[evt.newIndex]
    //     this.blocks.splice(evt.newIndex, 1, JSON.parse(JSON.stringify(item)))
    //   }
    // },

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
.layout {
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
    background: #ffffff;
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
    padding: 4px;
    box-sizing: border-box;
    overflow: auto;
  }

  &__blocks {
    width: 100%;
    min-height: 100%;
    padding: 8px 0;
    box-sizing: border-box;

    .block {
      display: flex;
      align-items: center;
      min-height: 32px;
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
        outline: dashed #666;
        outline-offset: -2px;
      }

      &--ghost {
        outline: dashed #5151f2 !important;
        outline-offset: -2px;
        // opacity: 0.6;
      }
    }

    .component {
      width: 100%;
      padding: 8px 16px;

      &.block--ghost {
        outline: dashed #5151f2;
        outline-offset: -2px;
        opacity: 0.95;
      }
    }
  }
}

</style>
