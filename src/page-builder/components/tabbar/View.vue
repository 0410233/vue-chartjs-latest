<template>
  <div class="tabbar-view"
    :style="{backgroundColor: backgroundColor || '#fff'}"
    @click.stop="$emit('click', $event)"
  >
    <div class="tabbar-item-list">
      <div v-for="item, index in links" :key="index" class="tabbar-item"
        @click="current = index"
      >
        <svg v-if="(current === index && !item.selectedIconPath) || (current !== index && !item.iconPath)"
          class="tabbar-item__icon-placeholder"
          :style="{color: current === index ? selectedTextColor : textColor}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
        ><path d="M789.333 64a170.667 170.667 0 1 1-170.666 170.667A170.667 170.667 0 0 1 789.333 64m0-64A234.667 234.667 0 1 0 1024 234.667 234.667 234.667 0 0 0 789.333 0zM896 618.667a64 64 0 0 1 64 64V896a64 64 0 0 1-64 64H682.667a64 64 0 0 1-64-64V682.667a64 64 0 0 1 64-64H896m0-64H682.667a128 128 0 0 0-128 128V896a128 128 0 0 0 128 128H896a128 128 0 0 0 128-128V682.667a128 128 0 0 0-128-128zm-554.667 64a64 64 0 0 1 64 64V896a64 64 0 0 1-64 64H128a64 64 0 0 1-64-64V682.667a64 64 0 0 1 64-64h213.333m0-64H128a128 128 0 0 0-128 128V896a128 128 0 0 0 128 128h213.333a128 128 0 0 0 128-128V682.667a128 128 0 0 0-128-128zm0-490.667a64 64 0 0 1 64 64v213.333a64 64 0 0 1-64 64H128a64 64 0 0 1-64-64V128a64 64 0 0 1 64-64h213.333m0-64H128A128 128 0 0 0 0 128v213.333a128 128 0 0 0 128 128h213.333a128 128 0 0 0 128-128V128a128 128 0 0 0-128-128z" fill="currentColor"/></svg>
        <img v-else class="tabbar-item__icon"
          :src="current === index ? item.selectedIconPath : item.iconPath"
          alt=""
        >
        <div class="tabbar-item__label"
          :style="{color: current === index ? selectedTextColor : textColor}"
        >{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProps } from './config'

export default {
  props: getProps(),
  data() {
    return {
      current: null,
    }
  },
  computed: {
    //
  }
}
</script>

<style lang="scss" scoped>
.tabbar-view {
  width: 100%;
  height: 100%;
  border-top: 1px solid #d9d9d9;
  box-sizing: border-box;

  .tabbar-item-list {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .tabbar-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      width: auto;
      height: 100%;
      min-width: 0;
      flex: 1;
      padding: 0 4px;
      box-sizing: border-box;

      &__icon {
        display: block;
        flex: none;
        width: 20px;
        height: 20px;
        object-fit: contain;

        &-placeholder {
          flex: none;
          width: 20px;
          height: 20px;
        }
      }

      &__label {
        width: 100%;
        font-size: 10px;
        line-height: 1.25;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 4px;
      }
    }
  }
}
</style>
