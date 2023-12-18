<template>
    <div class="list-item">
        <svg class="list-item__icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M670.953 150.607a64 64 0 0 1 11.714 36.908v648.97c0 35.346-28.654 64-64 64a64 64 0 0 1-36.908-11.714L320 704H170.667c-35.347 0-64-28.654-64-64V384c0-35.346 28.653-64 64-64H320l261.759-184.771c28.877-20.384 68.81-13.499 89.194 15.378zm-52.286 36.908L340.313 384H170.667v256h169.646l278.354 196.485v-648.97zm193.294 45.858C880.555 301.967 917.333 402.399 917.333 512c0 104.41-35.24 204.596-99.455 272.54l-5.917 6.087-45.255-45.254c55.164-55.164 86.627-141.87 86.627-233.373 0-90.464-28.822-172.09-81.3-227.88l-5.327-5.493 45.255-45.254z" fill="currentColor"/></svg>
      <div class="list-item__label">{{ meta.label }}</div>
      <div class="list-item__count">{{ count }}/{{ meta.limit }}</div>
    </div>
  </template>

<script>
import { getMeta } from './notice'

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
