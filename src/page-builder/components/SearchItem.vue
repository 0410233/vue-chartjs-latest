<template>
  <div class="list-item">
    <!-- <svg class="list-item__icon" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M12.023 13V1H9.721v4.97H4.279V1H1.977v12h2.302V7.924h5.442V13h2.302" fill="currentColor"/></svg> -->
    <svg class="list-item__icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M789.804 737.772L742.865 784.7l155.9 155.9 46.94-46.927zM456.923 82.894C247.61 82.894 77.34 253.176 77.34 462.476s170.271 379.57 379.583 379.57c209.287 0 379.558-170.27 379.558-379.57S666.211 82.894 456.923 82.894zm313.206 379.583c0 172.722-140.508 313.23-313.206 313.23-172.721 0-313.23-140.508-313.23-313.23s140.508-313.23 313.23-313.23c172.698 0 313.206 140.508 313.206 313.23z" fill="currentColor"/></svg>
    <div class="list-item__label">{{ meta.label }}</div>
    <div class="list-item__count">{{ count }}/{{ meta.limit }}</div>
  </div>
</template>

<script>
import { getMeta } from './search'

export default {
  props: {
    count: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      meta: getMeta(),
    }
  }
}
</script>

<style lang="scss" src="../assets/list-item.scss" scoped></style>
