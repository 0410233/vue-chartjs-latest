<template>
  <div class="designer">
    <div class="designer__header"></div>
    <draggable tag="div" v-model="elements" group:="elements" :animation="250" class="designer__elements">
      <div v-for="element in elements" :key="element.key" class="element">
        <div class="element__icon"></div>
        <div class="element__name">{{ element.name }}</div>
      </div>
    </draggable>
    <div class="designer__main">
      <div class="phone">
        <img src="../assets/iphone-frame.png" alt="" class="phone__frame">
        <div class="phone__screen">
          <div class="phone__content"></div>
        </div>
      </div>
    </div>
    <div class="designer__options"></div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

const elements = [{
  id: 'text',
  name: '文字',
}, {
  id: 'image',
  name: '图片',
}, {
  id: 'carousel',
  name: '轮播',
}]

export default {
  name: "PageDesigner",
  components: {
    draggable
  },
  data() {
    return {
      drag: false,
      elements: elements.map((el, index) => Object.assign({order: index + 1, fixed: false}, el)),

      dragOptions: {
        animation: 250,
        group: "elements"
      }
    }
  },
  mounted() {
    // 
  },
  unmounted() {
    // 
  },
  methods: {
    // 
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
    width: 280px;
    padding: 16px 8px;
    background: #ffffff;

    overflow: auto;
  }

  &__main {
    flex: none;
    position: relative;
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
  width: 50%;
  padding: 8px;

  &__icon {
    width: 96px;
    height: 96px;
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

  &__content {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
