<template>
  <view class="goods-buying-view">（团购）</view>
  <!-- <div class="active-list-view cols-list">
    <div class="col" v-for="active in showActiveList" :key="active.id">
      <div class="active">
        <div class="initiator">
          <div class="initiator_img">
            <div class="img-wrapper">
              <div class="img-placeholder"><img :src="active.user.avatar" alt="" /></div>
            </div>
          </div>
          <div class="initiator_content">
            <div class="initiator_name">{{ active.grouponLeader.nickName }}</div>
            <div class="initiator_info">
              <svg
                t="1702864133749"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6409"
              >
                <path
                  d="M544 224h-64v288c0 8.832 3.584 16.832 9.376 22.656l192 191.968 45.248-45.248L544 498.752V224z"
                  fill="#a7a8a9"
                  p-id="6410"
                ></path>
                <path
                  d="M512 896C300.256 896 128 723.744 128 512S300.256 128 512 128s384 172.256 384 384-172.256 384-384 384m0-832C264.576 64 64 264.576 64 512s200.576 448 448 448 448-200.576 448-448S759.424 64 512 64"
                  fill="#a7a8a9"
                  p-id="6411"
                ></path>
              </svg>
              {{ getNowDiffDay(active.grouponInfo.grouponStartTime) }}
            </div>
          </div>
        </div>
        <div class="active_content">
          <div class="active_name">{{ active.grouponInfo.title }}</div>
          <div class="active_price">{{ active.lowPrice }}</div>
          <div class="active_img_list_wrap">
            <div class="img-wrapper" v-for="i in active.productImageList" :key="i">
              <img :src="i" alt="" />
            </div>
          </div>
          <div class="active_bottom_wrap">
            <div class="left">
              <svg
                t="1702866022208"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="7850"
              >
                <path
                  d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32z m-432-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16H400v-16z m392 544H232V384h96v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h224v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h96v456z"
                  p-id="7851"
                  fill="#9c9b9d"
                ></path>
              </svg>

              {{ active.grouponInfo.orderNum }}次跟团
            </div>
            <div class="right">
              <div class="share">
                <svg
                  t="1702864415545"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="8361"
                >
                  <path
                    d="M690.1 377.4c5.9 0 11.8 0.2 17.6 0.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6 5.5 3.9 9.1 10.3 9.1 17.6 0 2.4-0.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-0.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-0.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4 0.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-0.1 17.8-0.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8z m-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1z m-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1z"
                    p-id="8362"
                    fill="#24cc9e"
                  ></path>
                  <path
                    d="M866.7 792.7c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-0.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7 2.4 0 4.7-0.9 6.4-2.6 1.7-1.7 2.6-4 2.6-6.4 0-2.2-0.9-4.4-1.4-6.6-0.3-1.2-7.6-28.3-12.2-45.3-0.5-1.9-0.9-3.8-0.9-5.7 0.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9z m179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c-0.1 19.8-16.2 35.9-36 35.9z"
                    p-id="8363"
                    fill="#24cc9e"
                  ></path>
                </svg>
                分享
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
import { getProps } from './group-buying';
import { getDiff } from '@/utils/index';

export default {
  props: getProps(),
  computed: {
    /**
     * todo
     * 实际展示的活动
     * 如果有勾选活动则展示勾选活动
     * 没有则展示默认数据
     */
    showActiveList() {
      if (this.activeList.length > 0) {
        return this.activeList;
      }
      const demoData = [
        {
          id: '0001',
          grouponLeader: {
            nickName: '团长名称/昵称/后台配置',
          },
          user: {
            avatar: null,
          },
          peopleNum: '21人',
          grouponInfo: {
            title: '方大满香酥牛肉馅饼520g（ 104 5 片 ） × 4 袋',
            grouponStartTime: '2023-12-25',
            orderNum: 0,
          },
          lowPrice: '59.9',
          productImageList: [null, null, null],
        },
      ];
      return demoData;
    },
  },
  methods: {
    // 距离现在差多少天
    getNowDiffDay(start) {
      return `${getDiff(start, new Date(), 'day')}天前`;
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
      return Number(price).toFixed(2);
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

.goods-buying-view {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 40rpx 24rpx;
  box-sizing: border-box;
}

.icon {
  flex: none;
  width: 15px;
  height: 15px;
  color: #bebfc1;
  margin-right: 3px;
}

.img-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;

  img {
    display: block;
    object-fit: contain;
  }

  .img-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    background: #eceef2;
  }
}

.active-list-view {
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

  &.cols-list .col {
    width: 100%;
  }

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

  .active {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px 10px;
    border: 1px solid #ebedf0;
    border-radius: 2px;
    overflow: hidden;
    box-sizing: border-box;

    .initiator {
      position: relative;
      width: 100%;
      display: flex;

      &_name {
        font-size: 16px;
        font-weight: bold;
      }

      &_img {
        width: 50px;
        height: 50px;
      }

      &_content {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-size: 12px;
        margin-left: 10px;
      }

      &_info {
        display: flex;
        align-items: center;

        .icon + .icon {
          margin-left: 10px;
        }
      }
    }

    &_content {
      width: 100%;
      box-sizing: border-box;
      margin-top: 15px;
    }

    &_name {
      width: 100%;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 16px;
      font-weight: bold;
      line-height: 1.2;
      color: #333333;
    }

    &_price {
      display: inline-flex;
      align-items: baseline;
      font-size: 20px;
      font-weight: bold;
      line-height: 1;
      color: #ff5151;
      letter-spacing: 0;

      &::before {
        content: '￥';
        font-size: 12px;
      }
    }

    &_img_list_wrap {
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
      width: 100%;
      height: 70px;

      .img-wrapper {
        padding-top: 0;
        width: 100px;
        height: 70px;
      }
    }

    &_bottom_wrap {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      font-size: 12px;

      .left,
      .share {
        display: flex;
        align-items: center;
      }
      .share {
        padding: 3px 7px;
        border: 1px solid #9bd3c7;
        border-radius: 7px;
      }
    }
  }

  bottom &.cols-list .active {
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
