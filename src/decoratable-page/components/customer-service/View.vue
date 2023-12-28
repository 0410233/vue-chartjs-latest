<template>
  <view v-if="isPlaceholder" class="customer-service-view-placeholder"></view>
  <view v-else class="customer-service-view" @click="onClick" :style="viewStyle">
    <template v-if="isShowIcon">
      <image v-if="customIcon" class="customer-service-view__icon" :src="customIcon" mode="aspectFit" :style="iconStyle"></image>
      <svg v-else class="customer-service-view__icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" :style="iconStyle"><path d="M896 453.888V448c0-212.096-171.968-384-384-384S128 235.904 128 448v5.888C90.816 467.136 64 502.272 64 544v128c0 52.992 43.008 96 96 96s96-43.008 96-96V544c0-41.728-26.816-76.864-64-90.112V448c0-176.768 143.232-320 320-320s320 143.232 320 320v5.888c-37.184 13.248-64 48.384-64 90.112v128c0 52.992 43.008 96 96 96s96-43.008 96-96V544c0-41.728-26.816-76.864-64-90.112zM192 672c0 17.6-14.336 32-32 32s-32-14.4-32-32V544c0-17.728 14.336-32 32-32s32 14.272 32 32v128zm704 0c0 17.6-14.336 32-32 32s-32-14.4-32-32V544c0-17.728 14.336-32 32-32s32 14.272 32 32v128zM640 957.248V928c0-17.728-14.336-32-32-32H480c-17.664 0-32 14.272-32 32v64c0 17.6 14.336 32 32 32h128c159.04 0 288-114.624 288-256h-64c0 96.64-83.648 175.744-192 189.248z" fill="currentColor"/></svg>
    </template>
    <view v-if="isShowText" :style="textStyle" class="customer-service-view__text">{{ textValue }}</view>
  </view>
</template>

<script>
import { toNumber } from '../utils'
import { getProps } from './config'
import { chatConfig } from '@/utils/consumerType.js'
import { getMerIndexInfoApi } from '@/api/merchant.js'

export default {
  props: getProps(),
  data() {
    return {
      serviceConfig: {
        serviceLink: null,
        servicePhone: null,
        serviceType: null,
      }
    }
  },
  computed: {
    viewStyle() {
      const style = {
        width: toNumber(this.viewWidth, 16) + 'px',
        height: toNumber(this.viewHeight, 16) + 'px',
        borderRadius: toNumber(this.borderRadius) + 'px',
        backgroundColor: this.backgroundColor,
      }

      if (this.isShowBorder) {
        style.borderWidth = toNumber(this.borderWidth, 1) + 'px'
        style.borderColor = this.borderColor || '#d9d9d9'
        style.borderStyle = 'solid'
      } else {
        style.border = 'none'
      }

      if (this.isShowShadow) {
        const size = toNumber(this.shadowSize, 8)
        const color = this.shadowColor || 'rgba(0,0,0,0.1)'
        style.boxShadow = `0 0 ${size}px ${color}`
      } else {
        style.boxShadow = 'none'
      }

      if (this.isShowIcon && this.isShowText) {
        if (this.layout === 'horizontal') {
          style.flexDirection = 'row'
        }
      }

      return style
    },
    /** 图表样式 */
    iconStyle() {
      const size = toNumber(this.iconSize, 12)
      return {
        width: size + 'px',
        height: size + 'px',
        color: this.iconColor || '#409EFF',
      }
    },
    /** 文案样式 */
    textStyle() {
      const style = {
        fontSize: toNumber(this.textSize, 12) + 'px',
        color: this.textColor || '#409EFF',
      }
      if (this.isShowIcon) {
        if (this.layout === 'vertical') {
          style.textAlign = 'center'
          style.marginTop = toNumber(this.spacing) + 'px'
        } else {
          style.marginLeft = toNumber(this.spacing) + 'px'
        }
      }
      return style
    },
  },
  watch: {
    merId: {
      handler() {
        this.initServiceConfig()
      },
      immediate: true,
    }
  },
  methods: {
    initServiceConfig() {
      if (!this.merId) {
        return
      }
      getMerIndexInfoApi(this.merId).then(res => {
        // console.log('getMerIndexInfoApi', res)
        this.service.serviceLink = res.data.serviceLink
        this.service.servicePhone = res.data.servicePhone
        this.service.serviceType = res.data.serviceType
      })
    },
    onClick() {
      chatConfig(this.serviceConfig)
    }
  },
}
</script>

<style lang="scss" scoped>
.customer-service-view-placeholder {
  display: none;
}

.customer-service-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 160rpx;
  height: 160rpx;
  border-radius: 8rpx;
  box-shadow: 0 0 16rpx rgba(0,0,0,0.1);
  background: #ffffff;
  pointer-events: auto;
  cursor: pointer;
  overflow: hidden;

  position: fixed;
  right: 24rpx;
  bottom: 160rpx;
  z-index: 1;

  &__icon {
    flex: none;
    display: block;
    width: 40rpx;
    height: 40rpx;
    margin: 0;
  }

  &__text {
    flex: none;
    white-space: nowrap;
  }
}
</style>
