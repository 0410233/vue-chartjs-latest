<template>
  <div class="list-item">
    <svg class="list-item__icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M866.458 102.4H157.542C98.816 102.4 51.2 150.016 51.2 208.742v567.143c0 58.726 47.616 106.342 106.342 106.342h708.916c58.726 0 106.342-47.616 106.342-106.342V208.742c0-58.726-47.616-106.342-106.342-106.342zm-708.916 70.912h708.916c19.558 0 35.43 15.872 35.43 35.43v339.559L720.435 366.848 542.464 549.734 434.022 441.242l-311.91 320.46v-552.96c0-19.558 15.872-35.43 35.43-35.43zm546.56 638.003h-531.66l262.297-269.363 269.363 269.363zm197.786-35.43c0 19.558-15.872 35.43-35.43 35.43h-62.362L591.411 598.63l133.274-130.406L905.42 648.96l-3.533 126.925zm-638.003-389.94a70.912 70.912 0 1 1 0-141.772 70.912 70.912 0 0 1 0 141.824z" fill="currentColor"/></svg>
    <div class="list-item__label">{{ meta.label }}</div>
    <div class="list-item__count">{{ count }}/{{ meta.limit }}</div>
  </div>
</template>

<script>
import { getMeta } from './picturead'

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
