
<template>
    
    <div class="videoss">
    <!-- 默认视频 -->
    <!-- {{ coverUrl }} -->
    <!-- <section class="default" v-if="!videosrc">
      <van-icon name="tv-o" size="150px" />
    </section> -->

    <!-- 选择视频后 -->
    <section  style="position: relative;height: 210px;">
      <video
      ref="videoPlayer"
        :src="videosrc"
        :controls="showProgressBar"
        :autoplay="isMuted"
        :muted="isMuted"
        :poster="coverUrl"
       style="height: 210px;"
      ></video>
    </section>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>

    
</template>
 
<script >
 import { getProps } from './video'
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
      textTransition: "",
      formdata: generateFormdata(getProps()),
    };
  },
  watch: {
    autoplay(newValue) {
      if (newValue) {
        this.$refs.videoPlayer.play();
      } else {
        this.$refs.videoPlayer.pause();
      }
    },
  },


  computed: {
    // autoplay() {
      
    //   console.log(this.formdata, '-------轮播数量')
    //   return this.autoplay
    // },
  },
  created(){
    console.log(111)
  }
  
  
}
</script>
 
<style lang="scss" scoped>
@import '../assets/list-item.scss';
.videoss {
  position: relative;

  /* 默认视频 */
  .default {
    width: 100%;
    height: 210px;
    background: #979797;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 播放图标 */
  .bof {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 100px;
    opacity: 0.5;
    color: #999;
  }
  video{
    width: 100%;
  }
}
</style>