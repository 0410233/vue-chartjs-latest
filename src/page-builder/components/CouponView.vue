<template>
  <!-- <div class="text">文字组件</div> -->
  <div class="goods-list-view" :class="classList" :style="navigationStyle">
   
    <template v-if="!goodsList.length">
      
      <div class="col" v-for="i in 4" :key="i">
        <div class="goods">
          <div class="coupon" :class="{'active-1':swiperTypes === 1,'active-2':swiperTypes === 2,'active-3':swiperTypes === 3,'active-4':swiperTypes === 4,'active-5':swiperTypes === 5}">
      <div class="coupon-info">
        <div>111</div>
        <div>111</div>
        <div>111</div>
      </div>
      <div class="coupon-get">
        <div class="coupon-desc">立即领取</div>
      </div>
    </div>

          
        </div>
      </div>
    </template>
    <div class="col" v-for="goods, index in goodsList" :key="index">
      <div class="goods" @click="onClickGoods(goods)">
        <div class="coupon" :class="{'active-1':swiperTypes === 1,'active-2':swiperTypes === 2,'active-3':swiperTypes === 3,'active-4':swiperTypes === 4,'active-5':swiperTypes === 5}" >
      <div class="coupon-info">
        <div>{{ goods.name }}</div>
        <div>{{ goods.money }}</div>
        <!-- <div>111</div> -->
      </div>
      <div class="coupon-get">
        <div class="coupon-desc">立即领取</div>
      </div>
    </div>
       
      </div>
    </div>
  </div>
</template>

<script>
import { getProps } from './coupon'

export default {
  props: getProps(),
  computed: {
    navigationStyle() {
      const style = {
        background: this.backgroundColor,
        overflowX: this.layout === 'scroll' ? 'auto' : 'hidden',
        flexWrap: this.layout === 'scroll' ? 'nowrap' : 'wrap',
      }
      return style
    },
    classList() {
      return ({col1: 'cols-1', col2: 'cols-2',col3: 'cols-3', list: 'cols-list'})[this.layout]
    },
    swiperTypes() {
     
     return this.swiperType
   },
  },
  methods: {
    onClickGoods(goods) {
      this.$message.success('跳转商品详情：' + goods.name)
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
.active-1{
 
  background-image: linear-gradient(150deg, #d24161 50%, #d24161d8 50%);
}
.active-2{
  background-image: linear-gradient(150deg, #f39b00 50%, #f39b00d8 50%);
}
.active-3{
  background-image: linear-gradient(150deg, #f5f5f5 50%, #f5f5f5 50%);
 
}
.active-4{
  background-image: linear-gradient(150deg, #303133 50%, #303133 50%);
}
.active-5{
  background-image: linear-gradient(150deg, #50add3 50%, #50add3d8 50%);
}
.coupon {
  width: 85%;
  display: inline-flex;
  color: white;
  position: relative;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin: 1rem;
  /** 这里不能用百分号，因为百分号是分别相对宽和高计算的，会导致弧度不同  */
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  overflow: hidden;
  // background-image: linear-gradient(150deg, #f39b00 50%, #f39b00d8 50%);
  // background-image: linear-gradient(150deg, #d24161 50%, #d24161d8 50%);
  // background-image: linear-gradient(150deg, #7eab1e 50%, #7eab1ed8 50%);
  // background-image: linear-gradient(150deg, #50add3 50%, #50add3d8 50%);
}
.coupon::before {
  left: -7px;
}
.coupon::after {
  right: -7px;
}
/* 左边框的波浪 */
.coupon::before,
.coupon::after {
  content: '';
  position: absolute;
  top: 0;
  height: 100%;
  width: 14px;
  background-image: radial-gradient(white 0, white 4px, transparent 4px);
  /** 如果只设置为半径的两倍(直径)，那么半圆之间没有类似堤岸的间隔 */
  background-size: 14px 14px;
  background-position: 0 2px;
  background-repeat: repeat-y;
  z-index: 1;
}
 
.coupon-info {
  width: 70%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1.5rem;
  position: relative;
  // min-width: 15rem;
  border-right: 2px dashed white;
}
.coupon-info::before {
  top: -0.5rem;
}
.coupon-info::after {
  bottom: -0.5rem;
}
 
.coupon-get {
  width: 30%;
  padding: 1rem;
  /** 这里使用flex是为了让文字居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // min-width: 5rem;
  position: relative;
  .coupon-desc {
    font-size: 18px;
    font-weight: bold;
  }
}

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
  &.cols-3 .col {
    
      width: 33.3333%;
    
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

        img {
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
