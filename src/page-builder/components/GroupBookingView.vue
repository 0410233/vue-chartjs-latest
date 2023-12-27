<template>
  <div class="goods-list-view" :class="classList">
    <template v-if="!goodsList.length">
      <div class="col" v-for="i in 4" :key="i">
        <div class="goods">
          <div class="goods__img">
            <div class="img-wrapper">
              <div class="img-placeholder"><i class="el-icon-picture"></i></div>
            </div>
            <!-- <div v-if="isShowParticipantsNumber" class="groupBooking_participants">5人已团</div> -->
            <div v-if="layout == 'list'" class="groupBooking_title">
              <div class="subTitle">距开始</div>
              <div class="time-wrap" v-if="isShowCountdown">
                <div class="time">00 : 00 : 00</div>
              </div>
            </div>
          </div>
          <div class="groupBooking_title" v-if="layout == 'col1'">
            <div class="title">拼团</div>
            <div class="time-wrap" v-if="isShowCountdown">
              <div>距开始仅剩</div>
              <div class="time">
                00
                <div class="unit">时</div>
                00
                <div class="unit">分</div>
                00
              </div>
            </div>
          </div>
          <div class="groupBooking_title" v-if="layout == 'col2'">
            <div class="subTitle">距开始</div>
            <div class="time-wrap" v-if="isShowCountdown">
              <div class="time">00 : 00 : 00</div>
            </div>
          </div>

          <div class="goods__content">
            <div v-if="isShowName" class="goods__name">
              <div class="tag">2人团</div>
              这里显示商品名称，最多显示{{ layout === 'col1' ? 1 : 2 }}行，这是一个无意义后缀，很长很长很长
            </div>
            <div v-if="isShowDesc" class="goods__desc">这里显示商品描述，最多显示1行</div>
            <div class="goods__bottom">
              <div v-if="isShowGroupBookingPrice" class="goods__price">{{ formatPrice(99) }}</div>
              <div v-if="isShowPrice" class="strickout">{{ formatPrice(99) }}</div>
              <svg class="goods__cart" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M940.8 284.8c-16-19.2-38.4-28.8-64-28.8H352c-19.2 0-32 12.8-32 32s12.8 32 32 32h524.8c6.4 0 12.8 3.2 16 6.4 3.2 3.2 6.4 9.6 3.2 19.2l-48 336c0 9.6-12.8 19.2-25.6 19.2H336c-12.8 0-25.6-16-25.6-28.8L256 300.8 227.2 144c-6.4-44.8-44.8-80-92.8-80H96c-19.2 0-32 16-32 32s12.8 32 32 32h38.4c12.8 0 25.6 9.6 28.8 25.6L192 310.4l51.2 371.2c6.4 48 44.8 86.4 89.6 86.4h486.4c44.8 0 83.2-32 89.6-73.6L960 355.2c3.2-25.6-3.2-51.2-19.2-70.4zM259.2 896a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM768 896a64 64 0 1 0 128 0 64 64 0 1 0-128 0z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="col" v-for="(goods, index) in goodsList" :key="index">
      <div class="goods" @click="onClickGoods(goods)">
        <div class="goods__img">
          <div class="img-wrapper">
            <img v-if="goods.image" :src="goods.image" alt="" />
            <div v-else class="img-placeholder"><i class="el-icon-picture"></i></div>
            <!-- <div v-if="isShowParticipantsNumber" class="groupBooking_participants">5人已团</div> -->
            <div v-if="layout == 'list'" class="groupBooking_title">
              <div class="subTitle">距开始</div>
              <div class="time-wrap" v-if="isShowCountdown">
                <div class="time">{{ handleCountdown(goods.startTime, 'hh:MM:ss') }}</div>
              </div>
            </div>
          </div>
          <div class="groupBooking_title" v-if="layout == 'col1'">
            <div class="title">拼团</div>
            <div class="time-wrap" v-if="isShowCountdown">
              <div>距开始仅剩</div>
              <div class="time">{{ handleCountdown(goods.startTime, 'hh时MM分ss') }}</div>
            </div>
          </div>
          <div class="groupBooking_title" v-if="layout == 'col2'">
            <div class="subTitle">距开始</div>
            <div class="time-wrap" v-if="isShowCountdown">
              <div class="time">{{ handleCountdown(goods.startTime, 'hh:MM:ss') }}</div>
            </div>
          </div>
        </div>
        <div class="goods__content">
          <div v-if="isShowName" class="goods__name">
            <div class="tag">{{ goods.groupBargainingPeopleNum }}人团</div>
            {{ goods.groupBargainingResponseVo.groupBargainingName }}
          </div>
          <div v-if="isShowDesc" class="goods__desc">{{ formatHtml(goods.content) }}</div>
          <div class="goods__bottom">
            <div v-if="isShowGroupBookingPrice" class="goods__price">
              {{ formatPrice(goods.groupPrice) }}
            </div>
            <div v-if="isShowPrice" class="strickout">
              {{ formatPrice(goods.price) }}
            </div>
            <svg class="goods__cart" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M940.8 284.8c-16-19.2-38.4-28.8-64-28.8H352c-19.2 0-32 12.8-32 32s12.8 32 32 32h524.8c6.4 0 12.8 3.2 16 6.4 3.2 3.2 6.4 9.6 3.2 19.2l-48 336c0 9.6-12.8 19.2-25.6 19.2H336c-12.8 0-25.6-16-25.6-28.8L256 300.8 227.2 144c-6.4-44.8-44.8-80-92.8-80H96c-19.2 0-32 16-32 32s12.8 32 32 32h38.4c12.8 0 25.6 9.6 28.8 25.6L192 310.4l51.2 371.2c6.4 48 44.8 86.4 89.6 86.4h486.4c44.8 0 83.2-32 89.6-73.6L960 355.2c3.2-25.6-3.2-51.2-19.2-70.4zM259.2 896a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM768 896a64 64 0 1 0 128 0 64 64 0 1 0-128 0z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProps } from './group-booking';

export default {
  props: getProps(),
  computed: {
    classList() {
      return { col1: 'cols-1', col2: 'cols-2', list: 'cols-list' }[this.layout];
    },
  },
  methods: {
    onClickGoods(goods) {
      this.$message.success('跳转商品详情：' + goods.name);
    },
    formatHtml(html) {
      if (!html) {
        return '';
      }
      const el = document.createElement('div');
      el.innerHTML = html;
      return el.innerText;
    },
    formatPrice(price) {
      if (isNaN(price)) {
        return 0;
      }
      return Number(price).toFixed(1);
    },
    // 距离活动开始倒计时
    handleCountdown(startTime, format) {
      const startTimestamp = new Date(startTime).getTime();
      const nowTimestamp = new Date().getTime();
      return this.timestampToCountDown(startTimestamp - nowTimestamp, format);
    },
    // 时长转换
    timestampToCountDown(time, format = 'hh:MM:ss') {
      if (!time) {
        return;
      }
      if (time < 0) {
        return '已开启';
      }
      const t = Math.floor(time / 1000);
      const days = String(Math.floor(t / 60 / 60 / 24));
      const hours = String(Math.floor((t / 60 / 60) % 24));
      const miniutes = String(Math.floor((t / 60) % 60));
      const seconds = String(Math.floor(t % 60));
      return format
        .replace('hh', days * 24 + Number(hours))
        .replace('MM', miniutes)
        .replace('ss', seconds);
    },
  },
};
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

  &.cols-1 .col,
  &.cols-list .col {
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
      position: relative;
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
        content: '￥';
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

.groupBooking {
  &_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background: linear-gradient(to right, #f86e30, #e91817);

    .subTitle {
      color: #fccdbc;
    }

    .title {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
    }

    .time-wrap {
      color: #f7a09b;
    }

    .unit {
      font-size: 12px;
      margin-left: 5px;
      margin-right: 5px;
    }

    .time {
      display: flex;
      color: #fff;
      align-items: center;
    }
  }

  &_participants {
    position: absolute;
    left: 5px;
    bottom: 5px;
    background: #000;
    color: #fff;
    font-size: 12px;
    padding: 1px 3px;
    border-radius: 3px;
  }
}

.cols-list {
  .groupBooking_participants {
    position: absolute;
    left: 5px;
    bottom: 25px;
    background: #000;
    color: #fff;
    font-size: 12px;
    padding: 1px 3px;
    border-radius: 3px;
  }

  .groupBooking_title {
    font-size: 10px;
  }
}

.tag {
  display: inline-block;
  color: #d02339;
  background: #fff2f2;
  padding: 1px 3px;
  border-radius: 10px;
}

.strickout {
  color: #c8c9cd;
  text-decoration: line-through;

  &::before {
    content: '￥';
    font-size: 12px;
  }
}

.cols-2 {
}
</style>
