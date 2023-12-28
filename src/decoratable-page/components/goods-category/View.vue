<template>
  <view class="goods-category-view" :class="classList" :style="{height: viewHeight + 'px'}">
    <view class="cate-list-container scroll-view-wrapper">
      <scroll-view scroll-x class="scroll-view">
        <view class="cate-list">
          <view v-for="cate, index in cateList" :key="index"
            class="cate"
            :class="current === index && 'is-active'"
            @click="current = index"
          ><text class="cate__label">{{ cate.name }}</text></view>
        </view>
      </scroll-view>
    </view>
    <view class="goods-list-container scroll-view-wrapper">
      <scroll-view scroll-y class="scroll-view" @scrolltolower="onGoodsListScrollToBottom">
        <view v-if="layout === 'aside' && cateList[current]" class="goods-cate-name">{{ cateList[current].name }}</view>
        <view class="goods-list">
          <view class="col" v-for="goods, index in goodsList" :key="index">
            <view class="goods" @click="onClickGoods(goods)">
              <view class="goods__img">
                <view class="img-wrapper">
                  <image v-if="goods.image" class="image" :src="goods.image" mode="aspectFit"></image>
                  <u-icon v-else class="img-placeholder" name="photo" color="#eee"></u-icon>
                </view>
              </view>
              <view class="goods__content">
                <view v-if="isShowName" class="goods__name">{{ goods.name }}</view>
                <view v-if="isShowDesc" class="goods__desc">{{ formatHtml(goods.content) }}</view>
                <view class="goods__bottom">
                  <view v-if="isShowPrice" class="goods__price">{{ formatPrice(goods.price) }}</view>
                  <svg class="goods__cart" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M940.8 284.8c-16-19.2-38.4-28.8-64-28.8H352c-19.2 0-32 12.8-32 32s12.8 32 32 32h524.8c6.4 0 12.8 3.2 16 6.4 3.2 3.2 6.4 9.6 3.2 19.2l-48 336c0 9.6-12.8 19.2-25.6 19.2H336c-12.8 0-25.6-16-25.6-28.8L256 300.8 227.2 144c-6.4-44.8-44.8-80-92.8-80H96c-19.2 0-32 16-32 32s12.8 32 32 32h38.4c12.8 0 25.6 9.6 28.8 25.6L192 310.4l51.2 371.2c6.4 48 44.8 86.4 89.6 86.4h486.4c44.8 0 83.2-32 89.6-73.6L960 355.2c3.2-25.6-3.2-51.2-19.2-70.4zM259.2 896a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM768 896a64 64 0 1 0 128 0 64 64 0 1 0-128 0z" fill="currentColor"/></svg>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { getProps } from './config'
import { getCateGoodsList } from '../../api'
import { getSafeAreaHeight, getRect } from '../utils'

export default {
  props: getProps(),
  data() {
    return {
      current: null,
      goodsList: [],
      pagination: {
        page: 1,
        total: 0,
        complete: false,
      },

      safeAreaHeight: getSafeAreaHeight(),
      viewHeight: getSafeAreaHeight()/2,
      timer: undefined,
    }
  },
  computed: {
    classList() {
      return ['is-' + this.layout]
    },
  },
  watch: {
    cateList: {
      handler(newValue) {
        if (newValue.length) {
          if (this.current === null) {
            this.current = 0
          }
          this.resetGoodsList()
          this.getGoodsList()
        } else {
          this.current === null
        }
      },
      immediate: true,
    },
    current: {
      handler() {
        this.resetGoodsList()
        this.getGoodsList()
      },
      immediate: true,
    },
    goodsList() {
      this.calcViewHeight()
    },
  },
  mounted() {
    // 滚动条
  },
  methods: {
    /** 计算组件高度 */
    calcViewHeight() {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        const { height: cateListHeight } = await getRect(this, '.cate-list')
        const { height: goodsListHeight } = await getRect(this, '.goods-list')
        if (this.layout === 'top') {
          if (cateListHeight + goodsListHeight > this.safeAreaHeight/2) {
            this.viewHeight = this.safeAreaHeight
          } else {
            this.viewHeight = this.safeAreaHeight/2
          }
        } else {
          if (cateListHeight > this.safeAreaHeight/2 || goodsListHeight > this.safeAreaHeight/2) {
            this.viewHeight = this.safeAreaHeight
          } else {
            this.viewHeight = this.safeAreaHeight/2
          }
        }
      }, 150)
    },
    resetGoodsList() {
      this.goodsList = []
      this.pagination.page = 1
      this.pagination.complete = false
    },
    getGoodsList(page) {
      if (!this.merId || this.pagination.complete) {
        return
      }
      const cate = this.cateList[this.current]
      if (!cate || !cate.children || !cate.children.length) {
        this.goodsList = []
        this.pagination.page = 1
        this.pagination.complete = true
        return
      }
      if (!cate.showAll && this.goodsList.length >= cate.showCount) {
        this.pagination.complete = true
        return
      }

      const data = {
        page: 1,
        limit: 10,
        merId: this.merId,
        cateId: [cate.id, ...cate.children],
      }
      if ((cate.showAll || cate.showCount > data.limit) && page > 1) {
        data.page = page
      }
      if (!cate.showAll) {
        const rest = cate.showCount - limit*(data.page-1)
        if (rest > 0 && rest < 10) {
          data.limit = rest
        }
      }
      getCateGoodsList(data).then(res => {
        console.log('getCateGoodsList', res)
        this.goodsList.push(...res.data.list)
        this.pagination.page = data.page

        if (cate.showAll) {
          this.pagination.complete = this.goodsList.length >= data.total
        } else {
          this.pagination.complete = this.goodsList.length >= cate.showCount
        }
      })
    },
    formatHtml(html) {
      if (!html) {
        return ''
      }
      const entityMap = {
        '&nbsp;': ' ',
        '&lt;': '<',
        '&gt;': '>',
        '&amp;': '&',
        '&yen;': '¥',
        '&copy;': '©',
      }
      return html.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/g, m => {
        return entityMap[m] || m
      })
    },
    formatPrice(price) {
      if (isNaN(price)) {
        return 0
      }
      return Number(price).toFixed(1)
    },
    onGoodsListScrollToBottom() {
      if (!this.merId || this.pagination.complete) {
        return
      }
      this.getGoodsList(this.pagination.page + 1)
    },
    onClickGoods(goods) {
      uni.navigateTo({url: '/pages/goods/goods_details/index?id=' + goods.id})
    },
  },
}
</script>

<style lang="scss" scoped>
%absolute-full {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.scroll-view-wrapper {
  position: relative;

  .scroll-view {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}

.goods-category-view {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  width: 100%;
  overflow: hidden;

  .cate-list-container {
    flex: none;
    width: 100%;
    box-shadow: 0 0 16rpx rgba(0,0,0,0.2);
  }

  &.is-top .cate-list-container {
    height: 80rpx;
  }

  .cate-list {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;

    // flex: none;
    // width: 100%;
    // box-shadow: 0 0 8px rgba(0,0,0,0.2);

    .cate {
      display: flex;
      align-items: center;
      justify-content: center;

      flex-shrink: 0;
      flex-grow: 1;
      // min-width: 0;
      // width: 22%;
      height: 80rpx;
      padding: 0 20rpx;

      font-size: 28rpx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;

      position: relative;

      &.is-active {
        color: #ff5151;
        font-weight: 600;

        &::after {
          content: "";
          display: block;
          width: 64rpx;
          height: 6rpx;
          border-radius: 4rpx;
          background: #ff5151;

          position: absolute;
          left: 50%;
          bottom: 2rpx;
          margin: 0 -32rpx;
        }
      }

      &__label {
        min-width: 0;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .goods-list-container {
    min-width: 0;
    min-height: 0;
    width: auto;
    height: auto;
    flex: 1;
    // margin-top: 8px;
    // overflow-y: auto;
  }

  .goods-cate-name {
    display: block;
    font-size: 28rpx;
    padding: 24rpx 32rpx 12rpx;
  }

  .goods-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0 10rpx;
    box-sizing: border-box;
    background: #ffffff;

    // min-width: 0;
    // min-height: 0;
    // width: auto;
    // height: auto;
    // flex: 1;
    // // overflow-y: auto;

    .col {
      flex: none;
      min-width: 0;
      width: 50%;
      padding: 10rpx;
      box-sizing: border-box;
    }

    .goods {
      width: 100%;
      padding: 0;
      border: 2rpx solid #ebedf0;
      border-radius: 4rpx;
      overflow: hidden;
      box-sizing: border-box;

      &__img {
        width: 100%;

        .img-wrapper {
          width: 100%;
          padding-top: 100%;
          overflow: hidden;
          position: relative;

          .image {
            @extend %absolute-full;
            display: block;
            object-fit: contain;
          }

          .img-placeholder {
            @extend %absolute-full;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48rpx;
            background: #eceef2;
          }
        }
      }

      &__content {
        width: 100%;
        padding: 0 16rpx 16rpx;
        box-sizing: border-box;
      }

      &__name {
        width: 100%;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;

        font-size: 24rpx;
        line-height: 32rpx;
        color: #333333;

        margin-top: 4px;
      }

      &__desc {
        width: 100%;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 24rpx;
        line-height: 32rpx;
        color: #999999;

        margin-top: 8rpx;
      }

      &__bottom {
        display: flex;
        align-items: center;
        flex: none;
        width: 100%;
        height: 64rpx;
        // font-size: 28rpx;
        margin-top: 24rpx;
      }

      &__price {
        display: inline-flex;
        align-items: baseline;
        font-size: 40rpx;
        line-height: 1;
        color: #ff5151;
        letter-spacing: 0;

        &::before {
          content: "￥";
          font-size: 24rpx;
        }
      }

      &__cart {
        flex: none;
        width: 40rpx;
        height: 40rpx;
        color: #ff5151;
        margin-left: auto;
      }
    }
  }

  &.is-top .goods-list-container {
    margin-top: 16rpx;
  }

  &.is-aside {
    flex-direction: row;

    .cate-list-container {
      width: 200rpx;
      height: auto;
      background: #f2f2f2;
      box-shadow: none;
    }

    .cate-list {
      flex-direction: column;

      .cate {
        justify-content: flex-start;
        // flex: none;
        flex-shrink: 1;
        width: 100%;
        min-width: 0;
        padding: 0 16rpx 0 24rpx;
        font-size: 26rpx;
        background: #f7f8fa;

        &.is-active {
          background: #ffffff;

          &::after {
            width: 6rpx;
            height: 32rpx;
            border-radius: 0;

            left: 2rpx;
            bottom: 50%;
            margin: -16rpx 0;
          }
        }
      }
    }

    .col {
      width: 100%;
      padding: 10rpx;

      .goods {
        display: flex;
        align-items: stretch;
        width: 100%;
        padding: 0;
        border: none;

        &__img {
          flex: none;
          width: 42%;
        }

        &__content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: auto;
          min-width: 0;
          flex: 1;
          padding: 0;
          margin-left: 16rpx;
        }

        &__bottom {
          width: 100%;
          margin-top: auto;
        }
      }
    }
  }
}
</style>
