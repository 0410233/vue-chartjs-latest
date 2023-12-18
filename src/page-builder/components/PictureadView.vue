<template>
     <div class="pictureads">
      
<!-- {{ SwiperOption }} -->

    <!-- {{ imageLists }} -->
    <div class="upload" v-if="!imageLists[0]">
      <i class="iconfont icon-lunbotu"></i>
    </div>

    <!-- 一行一个 -->
    <div
    v-if="imageLists[0] && swiperTypes=== 0"
      class="type0"
      :style="{
        'padding-left': formdata.pageMargin + 'px',
        'padding-right': formdata.pageMargin + 'px',
      }"
    >
      <div
        v-for="(item, index) in imageLists"
        :key="index"
        class="imgLis"
        :style="{ 'margin-bottom':imageMargins + 'px' }"
      >
        <!-- 图片 -->
        <img
          :src="item.image"
          draggable="false"
          :style="{ 'border-radius': formdata.borderRadius + 'px' }"
        />
        <!-- 图片标题 -->
        <p class="title" v-show="item.text ? true : false">{{ item.text }}</p>
      </div>
    </div>

    <!-- 轮播组件 -->
    <div
      class="swiper-container pointer-events"
      v-if="
        (imageLists[0] && swiperTypes === 1) ||
        swiperTypes === 2 ||
        swiperTypes === 3
      "
    >
      <div
        :class="
          swiperTypes === 3 && imageLists[0]
            ? 'type3 type1 swiper-wrapper type3H'
            : 'swiper-wrapper type1'
        "
      >
      <swiper :options="SwiperOption">
			<swiper-slide v-for="(item, index) in imageLists"
          :key="index">
				<img :src="item.image" width="100%" @click="onClick(i)"/>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
       
      </div>

      <!-- 分页器 -->
      <div class="swiper-pagination" style="color: #007aff"></div>
    </div>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
  </template>
  
  <script>
  import { getProps } from './picturead'
  
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
//   import Swiper from 'swiper'
// import 'swiper/css/swiper.min.css'
  import { generateFormdata, generateWatchers } from './utils'
  export default {
    props: getProps(),
    components: {
    // 注册 vue-awesome-swiper 组件
    swiper,
    swiperSlide
  },

     computed: {
    
    /* 类型切换 */
    swiperTypes() {
     
      return this.swiperType
    },
    /* 图片删除或者增加 */
    imageLists() {
     
      console.log(this.formdata.links.length, '-------轮播数量')
      return this.links
    },
    /* 分页器类型切换 */
    pagingTypes() {
      
      return this.pagingType
    },
    /* 一行个数 */
    rowindividuals() {
     
      if (this.swiperType === 1) {
        return 1
      } else {
        return this.rowindividual
      }
    },
    /* 图片间距 */
    imageMargins() {
      // this.addSwiper()
      if (this.swiperType === 1) {
        return 0
      } else {
        return this.imageMargin
      }
    },
  },
  data() {
    return {
      mySwiper: null,
      formdata: generateFormdata(getProps()),
      mySwiperOption: {
					pagination: {
						el: '.swiper-pagination', //与slot="pagination"处 class 一致
						clickable: true, //轮播按钮支持点击
					},
          // speed: this.types, 
					//自动播放
					autoplay: {
						delay: 1000,
						disableOnInteraction: false
					},
					//循环
					loop:true

        }
    }
  },
  watch: {
    pagingTypes() {},
    rowindividuals() {},
    imageMargins() {},
  },
   methods: {
    /* 创建轮播对象 */
    addSwiper() {
      this.$nextTick(() => {
        if (this.swiperTypes !== 0 && this.imageLists[0]) {
          if (this.mySwiper instanceof Array) {
            this.mySwiper.forEach((element) => {
              element.destroy()
            })
          } else if (this.mySwiper instanceof Object) {
            // 每次重新创建swiper前都要销毁之前存在的轮播   不然轮播会重复
            this.mySwiper.destroy()
          }

          let params = {
            loop: true,
            autoplay: true,
            pagination: {
              el: '.swiper-pagination',
              type: this.pagingType,
            },
          }

          if (this.swiperTypes === 1 || this.swiperTypes === 2) {
            params.slidesPerView = this.rowindividuals
            params.spaceBetween = this.imageMargins
          } else if (this.swiperTypes === 3) {
            params.slidesPerView = 1.3
            params.centeredSlides = true
          }

          // this.mySwiper = new Swiper('.swiper-container', params)
        } else {
          if (this.mySwiper instanceof Array) {
            this.mySwiper.forEach((element) => {
              element.destroy()
            })
          }
          // 每次重新创建swiper前都要销毁之前存在的轮播   不然轮播会重复
          if (this.mySwiper instanceof Object) {
            this.mySwiper.destroy()
          }
        }
      })
    },
    },
    created(){
      console.log(1111)
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .caption-view {
    padding: 0 12px;
    box-sizing: border-box;
    line-height: 1.4;
  
    &__description {
      margin-top: 4px;
    }
  }
  .pictureads {
  position: relative;

  /* 无图片 */
  .upload {
    background: #979797;
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size: 120px;
    }
  }

  /* 类型0 */
  .type0 {
    box-sizing: border-box;
    /* 图片列表 */
    .imgLis {
      width: 100%;
      position: relative;
      overflow: hidden;
      &:last-child {
        margin: 0 !important;
      }
      /* 图片 */
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .title {
        height: 36px;
        width: 100%;
        background-color: rgba(51, 51, 51, 0.8);
        text-align: center;
        line-height: 36px;
        color: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }

  /* 类型1 */
  .type1 {
    width: 100%;
    position: relative;
    .swiper-slide {
      width: 100%;
      height: 250px;
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .title {
      height: 36px;
      width: 100%;
      background-color: rgba(51, 51, 51, 0.8);
      text-align: center;
      line-height: 36px;
      color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: left;
      box-sizing: border-box;
      padding: 0 5px;
    }
  }

  .type3 {
    width: 100%;
    height: 250px;
    align-items: center;
    .swiper-slide {
      height: 210px !important;
      text-align: center;
      font-size: 18px;
      background: #fff;
      box-shadow: rgba(173, 173, 173, 0.8) 0px 7px 24px 0px;
      border-radius: 12px;
      overflow: hidden;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      transition: 300ms;
      transform: scale(0.8);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .swiper-slide-active,
    .swiper-slide-duplicate-active {
      transform: scale(1);
    }
    .swiper-pagination {
      bottom: 0 !important;
    }
    .title {
      height: 36px;
      width: 100%;
      background-color: rgba(51, 51, 51, 0.8);
      text-align: center;
      line-height: 36px;
      color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: left;
      box-sizing: border-box;
      padding: 0 5px;
    }
  }
  .type3H {
    height: 250px;
  }
  .swiper-container-horizontal > .swiper-pagination-progressbar {
    height: 2px;
  }
}
  </style>
  