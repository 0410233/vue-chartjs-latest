<template>
  <div class="list-item">
    <svg class="list-item__icon"  viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M832 668.8l-.096 99.2-639.904.192V668.8c72.96-14.848 128-79.52 128-156.768a160.288 160.288 0 0 0-128-156.8l.128-99.232L832 255.776V355.2A160.32 160.32 0 0 0 704 512a160.32 160.32 0 0 0 128 156.8M864 416h32V255.776A64 64 0 0 0 831.904 192H192.096a64 64 0 0 0-64.128 63.776V416h32c52.96 0 96 43.04 96 96 0 52.928-43.04 96-96 96H128v160.192A64 64 0 0 0 192.064 832h639.84A64 64 0 0 0 896 768.192V608h-32c-52.928 0-96-43.072-96-96 0-52.96 43.072-96 96-96" fill="currentColor"/><path d="M608 524.8a22.4 22.4 0 1 0 0-44.8h-64.384c.064-.096.16-.096.224-.16l64-64a22.4 22.4 0 1 0-31.68-31.68l-64 64-.16.224-.16-.256-64-64a22.4 22.4 0 0 0-31.68 31.712l64 64c.064.064.16.064.224.16H416a22.4 22.4 0 1 0 0 44.8h73.6V576H416a22.4 22.4 0 1 0 0 44.8h73.6V640a22.4 22.4 0 0 0 44.8 0v-19.2H608a22.4 22.4 0 1 0 0-44.8h-73.6v-51.2H608z" fill="currentColor"/></svg>
    <div class="list-item__label">{{ meta.label }}</div>
    <div class="list-item__count">{{ count }}/{{ meta.limit }}</div>
  </div>
</template>

<script>
import { getMeta } from './coupon'

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
