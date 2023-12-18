<template>
  <div class="search-view" :class="fixed && 'is-fixed'" :style="viewStyle">
    <div class="search-view__bar" :style="barStyle">
      <svg class="search-view__icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M789.804 737.772L742.865 784.7l155.9 155.9 46.94-46.927zM456.923 82.894C247.61 82.894 77.34 253.176 77.34 462.476s170.271 379.57 379.583 379.57c209.287 0 379.558-170.27 379.558-379.57S666.211 82.894 456.923 82.894zm313.206 379.583c0 172.722-140.508 313.23-313.206 313.23-172.721 0-313.23-140.508-313.23-313.23s140.508-313.23 313.23-313.23c172.698 0 313.206 140.508 313.206 313.23z" fill="currentColor"/></svg>
      <span class="search-view__text" :style="{color: textColor || '#858585'}">搜索</span>
    </div>
  </div>
</template>

<script>
import { getProps } from './search';
import { toNumber } from './utils';

export default {
  props: getProps(),
  computed: {
    viewStyle() {
      return {
        height: toNumber(this.barHeight, 24) + 8*2 + 'px',
        backgroundColor: this.outerColor || '#efeff5',
      }
    },
    barStyle() {
      const style = {
        borderRadius: toNumber(this.borderRadius) + 'px',
        justifyContent: {left:'flex-start',center:'center'}[this.textAlign] || 'flex-start',
        height: toNumber(this.barHeight, 24) + 'px',
        backgroundColor: this.backgroundColor || '#ffffff',
      }
      return style
    },
  }
}
</script>

<style lang="scss" scoped>
.search-view {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  // height: 100%;
  padding: 8px 10px;
  box-sizing: border-box;

  &__bar {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 12px;
    box-sizing: border-box;
  }

  &__icon {
    flex: none;
    width: 14px;
    height: 14px;
  }

  &__text {
    font-size: 14px;
    margin-left: 6px;
  }
}
</style>
