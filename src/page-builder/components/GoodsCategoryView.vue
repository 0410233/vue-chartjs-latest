<template>
  <div class="goods-category-view" :class="classList" @click="onClickExample">
    <div v-show="cateList.length" class="cate-list-container scroll-view-wrapper">
      <div class="scroll-view" ref="cate_list_scroll">
        <div class="cate-list">
          <div v-for="cate, index in cateList" :key="index"
            class="cate"
            :class="currentCate === index && 'is-active'"
            @click="currentCate = index"
          >{{ cate.menu }}</div>
        </div>
      </div>
    </div>
    <div v-show="cateList.length" class="goods-list-container scroll-view-wrapper">
      <div class="scroll-view" ref="goods_list_scroll">
        <span v-if="layout === 'aside' && cateList[currentCate]" class="goods-cate-name">{{ cateList[currentCate].menu }}</span>
        <div class="goods-list">
          <div class="col" v-for="goods, index in goodsList" :key="index">
            <div class="goods">
              <div class="goods__img">
                <div class="img-wrapper">
                  <div class="img-placeholder"><i class="el-icon-picture"></i></div>
                </div>
              </div>
              <div class="goods__content">
                <div v-if="isShowName" class="goods__name">{{ goods.name }}</div>
                <div v-if="isShowDesc" class="goods__desc">{{ formatHtml(goods.content) }}</div>
                <div class="goods__bottom">
                  <div v-if="isShowPrice" class="goods__price">{{ formatPrice(goods.price) }}</div>
                  <svg class="goods__cart" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M940.8 284.8c-16-19.2-38.4-28.8-64-28.8H352c-19.2 0-32 12.8-32 32s12.8 32 32 32h524.8c6.4 0 12.8 3.2 16 6.4 3.2 3.2 6.4 9.6 3.2 19.2l-48 336c0 9.6-12.8 19.2-25.6 19.2H336c-12.8 0-25.6-16-25.6-28.8L256 300.8 227.2 144c-6.4-44.8-44.8-80-92.8-80H96c-19.2 0-32 16-32 32s12.8 32 32 32h38.4c12.8 0 25.6 9.6 28.8 25.6L192 310.4l51.2 371.2c6.4 48 44.8 86.4 89.6 86.4h486.4c44.8 0 83.2-32 89.6-73.6L960 355.2c3.2-25.6-3.2-51.2-19.2-70.4zM259.2 896a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM768 896a64 64 0 1 0 128 0 64 64 0 1 0-128 0z" fill="currentColor"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 示例数据 -->
    <div v-show="!cateList.length" class="cate-list-container scroll-view-wrapper">
      <div class="scroll-view" ref="cate_list_scroll_example">
        <div class="cate-list">
          <div class="cate is-active">示例分类</div>
          <div class="cate">示例分类</div>
        </div>
      </div>
    </div>
    <div v-show="!cateList.length" class="goods-list-container scroll-view-wrapper">
      <div class="scroll-view" ref="goods_list_scroll_example">
        <span v-if="layout === 'aside'" class="goods-cate-name">示例分类</span>
        <div class="goods-list">
          <div class="col" v-for="i in 8" :key="i">
            <div class="goods">
              <div class="goods__img">
                <div class="img-wrapper">
                  <div class="img-placeholder"><i class="el-icon-picture"></i></div>
                </div>
              </div>
              <div class="goods__content">
                <div v-if="isShowName" class="goods__name">这里显示商品名称，最多显示{{ layout === 'top' ? 1 : 2 }}行</div>
                <div v-if="isShowDesc" class="goods__desc">这里显示商品描述，最多显示1行</div>
                <div class="goods__bottom">
                  <div v-if="isShowPrice" class="goods__price">{{ formatPrice(99) }}</div>
                  <svg class="goods__cart" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M940.8 284.8c-16-19.2-38.4-28.8-64-28.8H352c-19.2 0-32 12.8-32 32s12.8 32 32 32h524.8c6.4 0 12.8 3.2 16 6.4 3.2 3.2 6.4 9.6 3.2 19.2l-48 336c0 9.6-12.8 19.2-25.6 19.2H336c-12.8 0-25.6-16-25.6-28.8L256 300.8 227.2 144c-6.4-44.8-44.8-80-92.8-80H96c-19.2 0-32 16-32 32s12.8 32 32 32h38.4c12.8 0 25.6 9.6 28.8 25.6L192 310.4l51.2 371.2c6.4 48 44.8 86.4 89.6 86.4h486.4c44.8 0 83.2-32 89.6-73.6L960 355.2c3.2-25.6-3.2-51.2-19.2-70.4zM259.2 896a64 64 0 1 0 128 0 64 64 0 1 0-128 0zM768 896a64 64 0 1 0 128 0 64 64 0 1 0-128 0z" fill="currentColor"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 示例数据 end -->
  </div>
</template>

<script>
import SimpleBar from 'simplebar'
import { getProps } from './goods-category'
import { getProductList } from '../api'

export default {
  props: getProps(),
  data() {
    return {
      currentCate: null,
      goodsList: [],
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
          if (this.currentCate === null) {
            this.currentCate = 0
          }
          this.getProductList()
        } else {
          this.currentCate === null
        }
      },
      immediate: true,
    },
    currentCate: {
      handler() {
        this.getProductList()
      },
      immediate: true,
    },
  },
  mounted() {
    // 滚动条
    new SimpleBar(this.$refs.cate_list_scroll)
    new SimpleBar(this.$refs.goods_list_scroll)
    new SimpleBar(this.$refs.cate_list_scroll_example)
    new SimpleBar(this.$refs.goods_list_scroll_example)
  },
  methods: {
    onClickExample() {
      if (!this.cateList.length) {
        this.$message.warning('这是示例数据，请选择真实分类')
      }
    },
    getProductList() {
      const cate = this.cateList[this.currentCate]
      if (!cate || !cate.children || !cate.children.length) {
        this.goodsList = []
        return
      }
      const data = {page: 1, limit: 10}
      if (!cate.showAll && cate.showCount > 0) {
        data.limit = cate.showCount
      }
      data.cateId = [cate.id, ...cate.children.map(x => x.id)]
      getProductList(data).then(res => {
        console.log('getProductList', res)
        this.goodsList = res.list
      })
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

.scroll-view-wrapper {
  position: relative;

  .scroll-view {
    display: block;
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
  min-height: 240px;
  max-height: 480px;
  // position: relative;
  overflow: hidden;

  .cate-list-container {
    flex: none;
    width: 100%;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
  }

  &.is-top .cate-list-container {
    height: 40px;
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
      height: 40px;
      padding: 0 10px;

      font-size: 14px;
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
          width: 32px;
          height: 3px;
          border-radius: 2px;
          background: #ff5151;

          position: absolute;
          left: 50%;
          bottom: 1px;
          margin: 0 -16px;
        }
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
    font-size: 14px;
    padding: 12px 16px 6px;
  }

  .goods-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0 5px;
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
      padding: 5px;
      box-sizing: border-box;
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
        padding: 0 8px 8px;
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
  }

  &.is-top .goods-list-container {
    margin-top: 8px;
  }

  &.is-aside {
    flex-direction: row;

    .cate-list-container {
      width: 80px;
      height: auto;
      max-height: 100vw;
      background: #f2f2f2;
      box-shadow: none;
    }

    .cate-list {
      flex-direction: column;

      .cate {
        justify-content: flex-start;
        flex: none;
        width: 100%;
        padding: 0 8px 0 12px;
        font-size: 13px;
        background: #f7f8fa;

        &.is-active {
          background: #ffffff;

          &::after {
            width: 3px;
            height: 16px;
            border-radius: 0;

            left: 1px;
            bottom: 50%;
            margin: -8px 0;
          }
        }
      }
    }

    .col {
      width: 100%;
      padding: 5px;

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
          margin-left: 8px;
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
