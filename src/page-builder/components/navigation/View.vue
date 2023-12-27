<template>
  <div class="navigation-view"
    :class="['cols-' + groupCount, 'is-' + navStyle]"
    :style="navigationStyle"
  >
    <template v-if="!links.length">
      <div class="nav-item" v-for="i in 4" :key="i"
        @click="onClickExample"
      >
        <div class="nav-item__img is-empty">
          <div class="img-wrapper">
            <i class="img-placeholder el-icon-picture"></i>
          </div>
        </div>
        <span class="nav-item__title" :style="{color: fontColor || '#333333'}">示例导航</span>
      </div>
    </template>
    <div class="nav-item" v-for="link, index in links" :key="index"
      @click="onNavItemClick(link)"
    >
      <div class="nav-item__img" :class="!link.image && 'is-empty'">
        <div class="img-wrapper">
          <img v-if="link.image" :src="link.image" alt="">
          <i v-else class="img-placeholder el-icon-picture"></i>
        </div>
      </div>
      <span class="nav-item__title" :style="{color: fontColor || '#333333'}">{{ link.title || '（标题）' }}</span>
    </div>
  </div>
</template>

<script>
import { getProps } from './config'

export default {
  props: getProps(),
  computed: {
    navigationStyle() {
      const style = {
        background: this.backgroundColor,
        overflowX: this.layout === 'wrap' ? 'hidden' : 'auto',
        flexWrap: this.layout === 'wrap' ? 'wrap' : 'nowrap',
      }
      return style
    },
  },
  methods: {
    onNavItemClick(link) {
      this.$message.success('跳转到 ' + link.title)
    },
    onClickExample() {
      this.$message.warn('这是示例数据，请添加真实导航')
    },
  },
}
</script>

<style lang="scss" scoped>
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

        img {
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
