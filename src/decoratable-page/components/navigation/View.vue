<template>
  <!-- <view class="navigation-view">（图文导航）</view> -->
  <view v-if="layout === 'wrap'" class="navigation-view"
    :class="['cols-' + groupCount, 'is-' + navStyle]"
    :style="viewStyle"
  >
    <view class="nav-item" v-for="link, index in links" :key="index"
      @click="onNavItemClick(link)"
    >
      <view class="nav-item__img" :class="!link.image && 'is-empty'">
        <view class="img-wrapper">
          <image v-if="link.image" class="image" :src="link.image" mode="aspectFit"></image>
          <u-icon v-else class="img-placeholder" name="photo" color="#eee"></u-icon>
        </view>
      </view>
      <view class="nav-item__title" :style="{color: fontColor || '#333333'}">{{ link.title || '（标题）' }}</view>
    </view>
  </view>
  <scroll-view v-else scroll-x class="navigation-view-scroll">
    <view class="navigation-view"
      :class="['cols-' + groupCount, 'is-' + navStyle]"
      :style="viewStyle"
    >
      <view class="nav-item" v-for="link, index in links" :key="index"
        @click="onNavItemClick(link)"
      >
        <view class="nav-item__img" :class="!link.image && 'is-empty'">
          <view class="img-wrapper">
            <image v-if="link.image" class="image" :src="link.image" mode="aspectFit"></image>
            <u-icon v-else class="img-placeholder" name="photo" color="#eee"></u-icon>
          </view>
        </view>
        <view class="nav-item__title" :style="{color: fontColor || '#333333'}">{{ link.title || '（标题）' }}</view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import { getProps } from './config'

export default {
  props: getProps(),
  computed: {
    viewStyle() {
      const style = {
        background: this.backgroundColor,
        // overflowX: this.layout === 'wrap' ? 'hidden' : 'auto',
        flexWrap: this.layout === 'wrap' ? 'wrap' : 'nowrap',
      }
      return style
    },
  },
  methods: {
    onNavItemClick(link) {
      // this.$message.success('跳转到 ' + link.title)
      uni.navigateTo({url: link.path})
    },
  },
}
</script>

<style lang="scss" scoped>

.navigation-view-scroll {
  width: 100%;

  .navigation-view {
    width: auto;
    max-width: none;
  }
}

.navigation-view {
  display: flex;
  width: 100%;

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: none;
    padding: 12px 6px;
    border: none;
    box-sizing: border-box;
    cursor: pointer;

    &__img {
      width: 80%;
      border-radius: 2px;
      overflow: hidden;

      &.is-empty {
        background: #eeeeee;
      }

      .img-wrapper {
        width: 100%;
        padding-top: 100%;
        box-sizing: border-box;
        position: relative;

        .image {
          display: block;
          width: 100%;
          height: 100%;
          border: none;
          object-fit: contain;
          position: absolute;
          top: 0;
          left: 0;
        }

        .img-placeholder {
          font-size: 32px;
          // background-color: #eeeeee;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    &__title {
      min-width: 0;
      max-width: 100%;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }

  }

  &.is-text .nav-item__img {
    display: none;
  }

  &.is-image .nav-item__title {
    margin-top: 4px;
  }

  &.cols-1 {
    .nav-item {
      width: 100%;

      &__img-wrapper {
        width: 100%;
      }
    }
  }

  &.cols-2 {
    .nav-item {
      width: 50%;
    }
  }

  &.cols-3 {
    .nav-item {
      width: 33.3333%;
    }
  }

  &.cols-4 {
    .nav-item {
      width: 25%;
    }
  }

  &.cols-5 {
    .nav-item {
      width: 20%;
    }
  }

  &.cols-6 {
    .nav-item {
      width: 16.6666%;
    }
  }
}

</style>
