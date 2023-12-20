<template>
  <div class="list-item">
    <svg class="list-item__icon" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M12.023 13V1H9.721v4.97H4.279V1H1.977v12h2.302V7.924h5.442V13h2.302" fill="currentColor"/></svg>
    <div class="list-item__label">{{ meta.label }}</div>
    <div class="list-item__count">{{ count }}/{{ meta.limit }}</div>
  </div>
</template>

<script>
// import { getMeta } from './caption'

// export default {
//   props: {
//     count: {
//       type: Number,
//       default: 0,
//     }
//   },
//   data() {
//     return {
//       meta: getMeta(),
//     }
//   }
// }
import { generateItemOptions } from '../utils';
import * as config from './config'

export default generateItemOptions(config)
</script>

<style lang="scss" src="../../assets/list-item.scss" scoped></style>
