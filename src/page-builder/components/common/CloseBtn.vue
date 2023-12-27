<template>
  <div class="close-btn" :style="wrapperStyle" @click="onClick">
    <!-- <svg class="close-btn__icon" :style="iconStyle" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 128c-211.2 0-384 172.8-384 384s172.8 384 384 384 384-172.8 384-384-172.8-384-384-384zm160 499.2c12.8 12.8 12.8 32 0 44.8s-32 12.8-44.8 0L512 556.8 396.8 672c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8L467.2 512 352 396.8c-12.8-12.8-12.8-32 0-44.8s32-12.8 44.8 0L512 467.2 627.2 352c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L556.8 512 672 627.2z" fill="currentColor"/></svg> -->
    <svg class="close-btn__icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M557.2 512l233.4-233.4c12.5-12.5 12.5-32.8 0-45.2s-32.8-12.5-45.2 0L512 466.8 278.6 233.4c-12.5-12.5-32.8-12.5-45.2 0s-12.5 32.8 0 45.2L466.8 512 233.4 745.4c-12.5 12.5-12.5 32.8 0 45.2 6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4L512 557.2l233.4 233.4c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4c12.5-12.5 12.5-32.8 0-45.2L557.2 512z" fill="currentColor"/></svg>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: [Number, String],
      default: 20,
    },
  },
  data() {
    return {}
  },
  computed: {
    wrapperStyle() {
      const size = Math.max(Number(this.size) || 20, 4)
      return {width: size+'px', height: size+'px'}
    },
  },
  methods: {
    onClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style lang="scss" scoped>
.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  border: 1px solid #ffffff;
  border-radius: 50%;
  background: #f56c6c;
  // border-color: #f56c6c;
  color: #ffffff;
  overflow: hidden;
  transition: 100ms;
  cursor: pointer;

  &:hover {
    background: #f78989;
    border-color: #f78989;
  }

  &__icon {
    width: 100%;
    height: 100%;
    transform: scale(0.85);
    color: inherit;
    flex: none;
  }
}
</style>
