<template>
  <view class="caption-view" :style="{backgroundColor: backgroundColor || '#fff'}">
    <view v-if="caption" class="caption-view__caption" :style="captionStyle">{{ caption }}</view>
    <view v-if="description" class="caption-view__description" :style="descriptionStyle">{{ description }}</view>
  </view>
</template>

<script>
import { getProps } from './config'

export default {
  props: getProps(),
  computed: {
    captionStyle() {
      return {
        fontSize: (this.captionFontSize || 16) + 'px',
        fontWeight: this.captionFontWeight || 600,
        color: this.captionColor || '#323232',
        textAlign: this.textAlign || 'left',
      }
    },
    descriptionStyle() {
      return {
        fontSize: (this.descriptionFontSize || 12) + 'px',
        fontWeight: this.descriptionFontWeight || 400,
        color: this.descriptionColor || '#969799',
        textAlign: this.textAlign || 'left',
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.caption-view {
  display: block;
  width: 100%;
  box-sizing: border-box;
  line-height: 1.4;

  &__description {
    margin-top: 8rpx;
  }
}
</style>
