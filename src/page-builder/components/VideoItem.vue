<template>
  <div class="list-item">
    <svg class="list-item__icon" viewBox="0 0 1027 1024" xmlns="http://www.w3.org/2000/svg"><path d="M876.8 150.4H147.2C64 150.4 0 217.6 0 297.6V736c0 80 64 147.2 147.2 147.2H880c80 0 147.2-64 147.2-147.2V297.6c-3.2-80-67.2-147.2-150.4-147.2zM928 761.6c0 12.8-9.6 25.6-25.6 25.6H121.6c-12.8 0-25.6-9.6-25.6-25.6V272c0-12.8 9.6-25.6 25.6-25.6h780.8c12.8 0 25.6 9.6 25.6 25.6v489.6zm-284.8-272L489.6 380.8c-22.4-16-60.8-25.6-73.6 12.8v252.8c22.4 16 54.4 25.6 73.6 9.6l153.6-108.8c19.2-16 19.2-41.6 0-57.6z" fill="currentColor"/></svg>
    <div class="list-item__label">{{ meta.label }}</div>
    <div class="list-item__count">{{ count }}/{{ meta.limit }}</div>
  </div>
</template>

<script>
import { getMeta } from './video'

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
