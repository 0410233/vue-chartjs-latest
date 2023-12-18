<!-- 跑马灯组件 marquee -->
<template>
    
    <div class="notic-bar">
        <svg class="list-items__icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M541.082 419.43a25.6 25.6 0 0 1-25.6-25.6v-54.937a25.6 25.6 0 0 1 51.2 0v54.937a25.6 25.6 0 0 1-25.6 25.6z" fill="#d81e06"/><path d="M505.958 914.79a59.955 59.955 0 0 1-39.628-15.052L276.89 733.952a18.944 18.944 0 0 0-12.596-4.71H169.83a85.862 85.862 0 0 1-85.708-85.76V374.17a85.811 85.811 0 0 1 85.708-85.71h90.727a19.149 19.149 0 0 0 12.39-4.556l193.997-165.171a60.518 60.518 0 0 1 99.738 46.08v99.789a25.6 25.6 0 1 1-51.2 0v-99.79a9.37 9.37 0 0 0-15.36-7.116L306.125 322.867a70.144 70.144 0 0 1-45.568 16.794H169.83a34.56 34.56 0 0 0-34.508 34.509v269.312a34.56 34.56 0 0 0 34.508 34.56h94.31a70.195 70.195 0 0 1 46.08 17.356l189.44 165.786a9.318 9.318 0 0 0 15.36-7.014V481.28a25.6 25.6 0 1 1 51.2 0v372.787a59.853 59.853 0 0 1-35.48 55.091 60.57 60.57 0 0 1-24.782 5.632zm168.858-203.98a25.6 25.6 0 0 1-14.131-47.002 189.44 189.44 0 0 0 29.081-23.706 184.832 184.832 0 0 0-39.936-291.584 25.6 25.6 0 0 1 25.19-44.595 236.8 236.8 0 0 1 50.945 38.759 235.827 235.827 0 0 1 0 333.619 238.131 238.131 0 0 1-37.069 30.259 25.6 25.6 0 0 1-14.08 4.25z" fill="#d81e06"/><path d="M789.914 836.557a25.6 25.6 0 0 1-15.616-46.08 354.15 354.15 0 0 0 1.945-560.794 25.6 25.6 0 0 1 31.437-40.448 414.31 414.31 0 0 1 37.99 33.587 405.555 405.555 0 0 1-40.192 608.308 25.6 25.6 0 0 1-15.564 5.427z" fill="#d81e06"/></svg>
    <div class="notice-bar-container">
      <div class="notice-bar__wrap">
        <div
        
        >
          {{ caption }}
        </div>
      </div>
    </div>
  </div>

    
</template>
 
<script >
 import { getProps } from './notice'
 import { generateFormdata, generateWatchers } from './utils'
export default {
  props: getProps(),
  data() {
    return {
        timeout:null,
      text:
        "海外徒闻更九州，他生未卜此生休。 ",
      url: "",
      textLeft: "",
      textTransition: ""
    };
  },
 

  computed: {
    captionStyle() {
      return {
        fontSize: (this.captionFontSize || 16) + 'px',
        fontWeight: this.captionFontWeight || 600,
        color: this.captionColor || '#323232',
        textAlign: this.textAlign || 'left',
      }
    },
    descriptionStyle() {
      return {
        fontSize: (this.descriptionFontSize || 12) + 'px',
        fontWeight: this.descriptionFontWeight || 400,
        color: this.descriptionColor || '#969799',
        textAlign: this.textAlign || 'left',
      }
    },
  },
  
  
  
}
</script>
 
<style lang="scss" scoped>
@import '../assets/list-item.scss';
.notic-bar {
  display: flex;
//   background: #67c23a;
  margin: 5px;
  border-radius: 5px;
  padding: 2px 5px;
}
.notice-bar-container {
  display: flex;
  width: calc(100% - 30px);
  height: 20px;
  overflow: hidden;
  margin-left: 5px;
}
.notice-img {
  width: 20px;
  height: 20px;
}
.notice-bar__wrap {
  margin-left: 10px;
  display: flex;
  animation: move 20s linear infinite;
  line-height: 20px;
  

  .notice-bar__wrap_text {
    width: max-content;
    min-width: 100px;
  }
}
@keyframes move {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.mobile-marquee {
  display: flex;
  align-items: center;
  height: 40px;
  margin: 0 16px;
}
  
.mobile-marquee-wrapper {
  flex: 1;
  height: 40px;
  overflow: hidden;
  position: relative;
}
  
.mobile-marquee img {
  width: 14px;
  height: 12px;
  margin-right: 7px;
}
  
.mobile-marquee-text {
  color: #333;
  white-space: nowrap;
  line-height: 40px;
  position: absolute;
}
.caption-view {
  padding: 0 12px;
  box-sizing: border-box;
  line-height: 1.4;
.alert-msg{
    margin-top: 6px;
}
//   &__description {
//     margin-top: 4px;
//   }
}
.marquee {
    overflow: hidden;
    color: red;
 
    /* border: 1px solid #333; */
    .tips-ma {
        display: flex;
        align-items: center;
        // margin-right: 20px;
        margin: 8px 4px 0 0;
    }
 
    .marquee-text {
        /* width: max-content; */
        white-space: nowrap;
        animation: scroll 15s linear infinite;
        /* font-size: 24px; */
        /* padding-right: 200px; */
        margin-top: 6px;
        display: flex;
        align-items: center;
 
        &:hover {
            //鼠标悬停 停止横向滚动
           animation-play-state: paused;
        }
    }
 
    .emphasize-days {
        font-weight: bold;
    }
}
 
 
@keyframes scroll {
    from {
        transform: translateX(100%);
    }
 
    to {
        transform: translateX(-100%);
    }
}
</style>