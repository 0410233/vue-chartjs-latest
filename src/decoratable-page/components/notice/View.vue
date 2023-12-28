<!-- 跑马灯组件 marquee -->
<template>
  <view class="notice-view" :style="{backgroundColor}">
    <svg class="notice-view__icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M521.83 198.912L298.726 326.374l-98.227.026a57.6 57.6 0 0 0-57.6 57.6v256l.128 3.942A57.6 57.6 0 0 0 200.5 697.6l98.176-.026L521.83 825.088a57.6 57.6 0 0 0 86.196-49.997V248.91a57.6 57.6 0 0 0-86.196-49.997zm22.17 61.03v504.09L315.725 633.6l-108.851-.026v-243.2l108.85.026L544 259.942zm109.952 111.079a32 32 0 0 1 44.851-5.965c42.138 32.23 63.309 79.488 63.309 138.624s-21.171 106.394-63.309 138.624a32 32 0 0 1-38.886-50.842c25.549-19.532 38.195-47.77 38.195-87.808 0-40.012-12.646-68.224-38.195-87.782a32 32 0 0 1-5.965-44.851z" fill="#ff5151"/><path d="M723.917 261.709a32 32 0 0 1 44.851-5.965c74.829 57.216 112.333 140.902 112.333 247.936 0 107.008-37.504 190.72-112.333 247.936a32 32 0 1 1-38.886-50.842c58.24-44.544 87.219-109.21 87.219-197.12 0-87.884-28.98-152.55-87.22-197.094a32 32 0 0 1-5.964-44.851z" fill="#ff5151"/></svg>
    <view class="notice-view__window" ref="notice_window">
      <view class="notice-view__track" :class="animated && 'is-animated'" :style="{animationDuration}">
        <view class="notice-view__content" ref="notice_content" :style="{color: captionColor}">{{ caption }}</view>
        <view v-if="animated" class="notice-view__content-clone" :style="{color: captionColor}">{{ caption }}</view>
      </view>
    </view>
  </view>
</template>

<script >
import { getProps } from './config'
import { getRect } from '../utils'

export default {
  props: getProps(),
  data() {
    return {
      animated: false,
      animationDuration: '6s',
      timer: undefined,
    }
  },
  watch: {
    caption: {
      handler() {
        this.animated = false
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.animate()
        }, 250);
      },
      immediate: true,
    },
  },
  mounted() {
    if (!this.animated && !this.timer) {
      this.timer = setTimeout(() => {
        this.animate()
      }, 250);
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    async animate() {
      try {
        const { width: windowWidth } = await getRect(this, '.notice-view__window')
        const { width: contentWidth } = await getRect(this, '.notice-view__content')
        if (contentWidth + 7 >= windowWidth) {
          this.animationDuration = parseInt(contentWidth * 382 / 15) + 'ms'
          this.animated = true
        }
      } catch (error) {
        console.warn('【店铺装修/公告组件】获取公告内容长度时发生错误。', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.notice-view {
  display: flex;
  align-items: center;
  width: 100%;
  height: 56rpx;
  padding: 0 24rpx;
  box-sizing: border-box;
  overflow: hidden;

  &__icon {
    flex: none;
    width: 48rpx;
    height: 48rpx;
  }

  &__window {
    min-width: 0;
    flex: 1;
    height: 100%;
    font-size: 28rpx;
    overflow: hidden;
    position: relative;
    margin-left: 12rpx;
  }

  &__track {
    display: flex;
    align-items: center;
    height: 100%;
    padding-right: 7em;
    box-sizing: border-box;

    animation-name: none;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    position: absolute;
    top: 0;
    left: 0;

    &.is-animated {
      animation-name: carousel;
    }
  }

  &__content {
    white-space: nowrap;
  }

  &__content-clone {
    white-space: nowrap;
    position: absolute;
    left: 100%;
  }
}

@keyframes carousel {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
