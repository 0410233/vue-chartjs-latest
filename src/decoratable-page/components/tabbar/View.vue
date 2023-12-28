<template>
  <view v-if="isPlaceholder" class="tabbar-view-placeholder"
    :style="{height: tabbarHeight + safeAreaBottom + 'px'}"
  ></view>
  <view v-else class="tabbar-view"
    :style="{height: tabbarHeight + safeAreaBottom + 'px'}"
  >
    <view class="tabbar" :style="{
      paddingBottom: safeAreaBottom + 'px',
      backgroundColor,
    }">
      <view v-for="item, index in links" :key="index" class="tabbar-item"
        @click="onClickTabbar(item)"
      >
        <image class="tabbar-item__icon"
          :src="item.pagePath === path ? item.selectedIconPath : item.iconPath"
          mode="aspectFit"
        ></image>
        <view class="tabbar-item__label"
          :style="{color: item.pagePath === path ? selectedTextColor : textColor}"
        >{{ item.text }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getProps } from './config'
import { getSafeAreaBottom } from '../utils';

export default {
  props: {
    ...getProps(),
    path: String,
  },
  data() {
    return {
      current: null,
      safeAreaBottom: getSafeAreaBottom(),
      tabbarHeight: 50,
    }
  },
  methods: {
    onClickTabbar(item) {
      uni.navigateTo({url: item.pagePath})
    },
  }
}
</script>

<style lang="scss" scoped>
.tabbar-view-placeholder {
  display: block;
  flex: none;
  width: 100%;
}

.tabbar-view {
  flex: none;
  width: 100%;

  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1001;
}

.tabbar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-top: 1rpx solid #d9d9d9;
  box-sizing: border-box;

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
</style>
