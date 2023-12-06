<template>
  <!-- <div class="text">文字组件</div> -->
  <div class="c-title" :style="{backgroundColor: bgColor || '#fff'}">
    <div v-if="title" class="c-title__title" :style="titleStyle">{{ title }}</div>
    <div v-if="desc" class="c-title__desc" :style="descStyle">{{ desc }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    desc: String,
    textAlign: String,
    titleFontSize: Number,
    descFontSize: Number,
    titleFontWeight: Number,
    descFontWeight: Number,
    titleColor: String,
    descColor: String,
    bgColor: String,
  },

  computed: {
    titleStyle() {
      return {
        fontSize: (this.titleFontSize || 16) + 'px',
        fontWeight: this.titleFontWeight || 600,
        color: this.titleColor || '#323232',
        textAlign: this.textAlign || 'left',
      }
    },
    descStyle() {
      return {
        fontSize: (this.descFontSize || 12) + 'px',
        fontWeight: this.descFontWeight || 400,
        color: this.descColor || '#969799',
        textAlign: this.textAlign || 'left',
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.c-title {
  padding: 0 12px;
  box-sizing: border-box;
  line-height: 1.4;

  &__desc {
    margin-top: 4px;
  }
}
</style>
