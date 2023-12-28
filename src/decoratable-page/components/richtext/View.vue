<template>
  <view class="richtext-view">
    <rich-text :nodes="content"></rich-text>
  </view>
</template>

<script>
import { getProps } from './config'

export default {
  props: getProps(),
}
</script>

<style lang="scss" scoped>
.richtext-view {
  display: block;
  width: 100%;
}
</style>
