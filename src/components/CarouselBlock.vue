<template>
  <div class="carousel-block">轮播图组件</div>
</template>

<script>
export default {
  name: 'CarouselBlock',
  props: {
    imageList: Array,
  },
}
</script>

<style lang="scss" scoped>
.carousel-block {
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
