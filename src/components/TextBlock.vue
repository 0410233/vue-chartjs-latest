<template>
  <!-- <div class="text">文字组件</div> -->
  <div class="text">{{ content || '文字组件' }}</div>
</template>

<script>
export default {
  props: {
    content: String,
  },
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
