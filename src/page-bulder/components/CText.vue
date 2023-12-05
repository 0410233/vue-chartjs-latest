<template>
  <!-- <div class="text">文字组件</div> -->
  <div class="text">{{ content }}</div>
</template>

<script>
export default {
  props: {
    content: String,
    fontSize: Number,
    color: String,
  },

  computed: {
    style() {
      return {
        fontSize: this.fontSize + 'px',
        color: this.color || '#333333',
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 60px;

  font-size: 18px;
  font-weight: 600;
  color: #999;
}
</style>
