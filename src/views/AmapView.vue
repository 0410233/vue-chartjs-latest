<template>
  <div class="amap-container">
    <div class="amap-wrapper">
      <VueAmap></VueAmap>
    </div>
  </div>
</template>

<script>
import VueAmap from '@/components/VueAmap.vue';

export default {
  name: 'AmapView',
  components: {VueAmap}
}
</script>

<style scoped>
.amap-container {
  width: 100%;
  height: 600px;
  position: relative;
}

.amap-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  position: absolute;
  top: 0;
  left: 0;
}
</style>
