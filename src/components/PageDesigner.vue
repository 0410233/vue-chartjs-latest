<template>
  <div class="designer">
    <div class="designer__header"></div>
    <draggable tag="div" class="designer__elements"
      v-model="elements"
      v-bind="elementsDragOptions"
    >
      <div v-for="element in elements" :key="element.key" class="element">
        <div class="element__icon"></div>
        <div class="element__name">{{ element.name }}</div>
      </div>
    </draggable>
    <div class="designer__main">
      <div class="phone">
        <img src="../assets/iphone-frame.png" alt="" class="phone__frame">
        <div class="phone__screen">
          <div class="phone__layout">
            <draggable tag="div" class="phone__blocks"
              v-model="blocks"
              v-bind="blocksDragOptions" 
            >
              <div v-for="block in blocks" :key="block.key"
                class="block"
                :class="{'is-active': selectedBlock === block}"
                @click="selectBlock(block)"
              >
                <!-- <div class="block__icon"></div>
                <div class="block__name">{{ block.name }}</div> -->
                <component :is="block.key + '-block'" v-bind="block.data"></component>
              </div>
            </draggable>
          </div>
        </div>
      </div>
    </div>
    <div class="designer__options">
      <component v-if="selectedBlock" :is="'text-form'" v-bind="selectedBlock.data" @change="onChange"></component>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

const originalElements = [{
  key: 'text',
  name: '文字',
  data: {
    content: '示例文字',
  },
}, {
  key: 'image',
  name: '图片',
  data: {
    src: '',
  },
}, {
  key: 'carousel',
  name: '轮播',
  data: {
    imageList: [],
  }
}]

export default {
  name: "PageDesigner",
  components: {
    draggable,
    'text-block': () => import('./TextBlock.vue'),
    'image-block': () => import('./ImageBlock.vue'),
    'carousel-block': () => import('./CarouselBlock.vue'),
    'text-form': () => import('./TextForm.vue')
  },
  data() {
    return {
      drag: false,
      elements: originalElements.map((el, index) => Object.assign({order: index + 1, fixed: false}, el)),
      blocks: [],
      selectedBlock: null,

      elementsDragOptions: {
        group: {
          name: "elements",
          pull: 'clone',
          put: false,
        },
        ghostClass: 'element--ghost',
        sort: false,
        clone: (item) => JSON.parse(JSON.stringify(item)),
      },

      blocksDragOptions: {
        animation: 150,
        group: {
          name: "elements",
          pull: false,
          put: true,
        },
        ghostClass: 'block--ghost',
        sort: true,
      },
    }
  },
  mounted() {
    // 
  },
  unmounted() {
    // 
  },
  methods: {
    selectBlock(block) {
      this.selectedBlock = block
    },

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
      if (this.selectedBlock) {
        Object.assign(this.selectedBlock.data, data)
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.designer {
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

  &__elements {
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

.element {
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

    .element {
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
