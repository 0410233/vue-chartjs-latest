<template>
  <!-- <img :src="src" alt=""> -->
  <div class="img">图片组件</div>
</template>

<script>
export default {
  name: 'ImageBlock',
  props: {
    src: String,
  },
}
</script>

<style lang="scss" scoped>
img {
  display: block;
  width: 100%;
}
.img {
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
