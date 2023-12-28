
<template>
  <view class="video-view">（视频）</view>
</template>
 
<script>
import { getProps } from './video'

export default {
  props: getProps(),
}
</script>
 
<style lang="scss" scoped>
.video-view {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40rpx 24rpx;
  box-sizing: border-box;
}
</style>