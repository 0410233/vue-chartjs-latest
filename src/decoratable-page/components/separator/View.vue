<template>
  <view class="separator-view" :style="separatorStyle">
    <view v-if="separatorType === 'line'" class="separator-view__line" :style="borderStyle"></view>
  </view>
</template>

<script>
import { getProps } from './config'

export default {
  props: getProps(),
  computed: {
    separatorStyle() {
      return {
        height: this.separatorHeight + 'px',
        paddingLeft: (this.marginX * 12) + 'px',
        paddingRight: (this.marginX * 12) + 'px',
      }
    },
    borderStyle() {
      return {
        borderTopColor: this.lineColor,
        borderTopStyle: this.lineStyle,
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.separator-view {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;

  &__line {
    width: 100%;
    height: 0;
    border-top: 1px solid #e5e5e5;
  }
}
</style>
