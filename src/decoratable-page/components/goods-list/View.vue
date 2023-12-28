<template>
  <view class="goods-list-view" :class="classList">
    <view class="col" v-for="goods, index in records" :key="index">
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
            <view v-if="isShowPrice" class="goods__price">{{ goods.price }}</view>
            <svg class="goods__cart" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M940.8 284.8c-16-19.2-38.4-28.8-64-28.8H352c-19.2 0-32 12.8-32 32s12.8 32 32 32h524.8c6.4 0 12.8 3.2 16 6.4 3.2 3.2 6.4 9.6 3.2 19.2l-48 336c0 9.6-12.8 19.2-25.6 19.2H336c-12.8 0-25.6-16-25.6-28.8L256 300.8 227.2 144c-6.4-44.8-44.8-80-92.8-80H96c-19.2 0-32 16-32 32s12.8 32 32 32h38.4c12.8 0 25.6 9.6 28.8 25.6L192 310.4l51.2 371.2c6.4 48 44.8 86.4 89.6 86.4h486.4c44.8 0 83.2-32 89.6-73.6L960 355.2c3.2-25.6-3.2-51.2-19.2-70.4zM259.2 896a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM768 896a64 64 0 1 0 128 0 64 64 0 1 0-128 0z" fill="currentColor"/></svg>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getProps } from './config'
import { getGoodsList } from '../../api'

export default {
  props: getProps(),
  data() {
    return {
      records: [],
    }
  },
  watch: {
    'goodsList': {
      handler() {
        this.updateGoodsList()
      },
      immediate: true
    }
  },
  computed: {
    classList() {
      return ({col1: 'cols-1', col2: 'cols-2', list: 'cols-list'})[this.layout]
    },
  },
  methods: {
    updateGoodsList() {
      const productIds = this.goodsList.map(x => x.id)
      const data = {
        page: 1,
        limit: productIds.length,
        merId: this.merId,
        productIds,
      }
      getGoodsList(data).then(res => {
        console.log('getGoodsList', res)
        this.records = res.data.list
      })
    },
    onClickGoods(goods) {
      // this.$message.success('跳转商品详情：' + goods.name)
      uni.navigateTo({url: '/pages/goods/goods_details/index?id=' + goods.id})
    },
    formatHtml(html) {
      if (!html) {
        return ''
      }
      const el = document.createElement('div')
      el.innerHTML = html
      return el.innerText
    },
    formatPrice(price) {
      if (isNaN(price)) {
        return 0
      }
      return Number(price).toFixed(1)
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

.goods-list-view {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 6px;
  box-sizing: border-box;

  .col {
    flex: none;
    min-width: 0;
    padding: 6px;
    box-sizing: border-box;
  }

  &.cols-1 .col, &.cols-list .col {
    width: 100%;
  }

  &.cols-2 .col {
    width: 50%;
  }

  .goods {
    width: 100%;
    padding: 0;
    border: 1px solid #ebedf0;
    border-radius: 2px;
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
          font-size: 24px;
          background: #eceef2;
        }
      }
    }

    &__content {
      width: 100%;
      padding: 0 8px 10px;
      box-sizing: border-box;
    }

    &__name {
      width: 100%;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;

      font-size: 12px;
      line-height: 16px;
      color: #333333;

      margin-top: 4px;
    }

    &__desc {
      width: 100%;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
      line-height: 16px;
      color: #999999;

      margin-top: 4px;
    }

    &__bottom {
      display: flex;
      align-items: center;
      flex: none;
      width: 100%;
      height: 32px;
      // font-size: 14px;
      margin-top: 12px;
    }

    &__price {
      display: inline-flex;
      align-items: baseline;
      font-size: 20px;
      line-height: 1;
      color: #ff5151;
      letter-spacing: 0;

      &::before {
        content: "￥";
        font-size: 12px;
      }
    }

    &__cart {
      flex: none;
      width: 20px;
      height: 20px;
      color: #ff5151;
      margin-left: auto;
    }
  }

  &.cols-1 .goods__name {
    -webkit-line-clamp: 1;
  }

  &.cols-2 .goods__bottom {
    font-size: 12px;
  }

  &.cols-list .goods {
    display: flex;
    align-items: stretch;
    padding: 8px;

    &__img {
      flex: none;
      width: 38.2%;
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: auto;
      min-width: 0;
      flex: 1;
      padding: 0;
      margin-left: 8px;
    }

    &__name {
      font-size: 14px;
      line-height: 20px;
    }

    &__bottom {
      width: 100%;
      margin-top: auto;
    }
  }
}
</style>
