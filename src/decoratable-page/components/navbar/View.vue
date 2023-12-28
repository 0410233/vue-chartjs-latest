<template>
  <view v-if="isPlaceholder" class="navbar-view-placeholder"
    :style="{height: statusBarHeight + navbarHeight + 'px'}"
  ></view>
  <div v-else class="navbar-view" :style="{height: statusBarHeight + navbarHeight + 'px'}">
    <view class="navbar" :style="{
      paddingTop: statusBarHeight + 'px',
      backgroundColor,
    }">
      <view class="navbar__back" @click="onClickBack">
        <svg class="navbar__back-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M538.288 198.624l-11.312-11.312a16 16 0 0 0-22.64 0L187.312 504.336a16 16 0 0 0 0 22.64L504.336 844a16 16 0 0 0 22.64 0l11.312-11.312a16 16 0 0 0 0-22.624l-294.4-294.4 294.4-294.4a16 16 0 0 0 0-22.64z" fill="currentColor"/></svg>
      </view>
      <view class="navbar__title">{{ title }}</view>
      <view class="navbar__right-balance"></view>
    </view>
  </div>
</template>

<script>
import { getProps } from './config'
import { getStatusBarHeight } from '../utils';

export default {
  name: 'NavbarView',
  props: getProps(),
  data() {
    return {
      /** 手机顶部状态栏高度 */
      statusBarHeight: getStatusBarHeight(),
      /** 顶部导航栏高度 */
      navbarHeight: 40,
    }
  },
  methods: {
    onClickBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-view-placeholder, .navbar-view {
  flex: none;
  width: 100%;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  &__back {
    display: flex;
    align-items: center;
    flex: none;
    width: 96rpx;
    height: 100%;
    padding-left: 24rpx;
    box-sizing: border-box;

    &-icon {
      flex: none;
      width: 48rpx;
      height: 48rpx;
      color: #303133;
    }
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__right-balance {
    flex: none;
    width: 96rpx;
    padding-right: 24rpx;
    box-sizing: border-box;
  }
}
</style>
