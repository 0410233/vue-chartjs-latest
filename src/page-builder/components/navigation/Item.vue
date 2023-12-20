<template>
  <div class="list-item">
    <svg class="list-item__icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M704 256V120a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v136h136a8 8 0 0 1 8 8v48a8 8 0 0 1-8 8H768v136a8 8 0 0 1-8 8h-48a8 8 0 0 1-8-8V320H568a8 8 0 0 1-8-8v-48a8 8 0 0 1 8-8h136zm-520-72v208h208V184H184zm-40-72h288c17.673 0 32 14.327 32 32v288c0 17.673-14.327 32-32 32H144c-17.673 0-32-14.327-32-32V144c0-17.673 14.327-32 32-32zm40 520v208h208V632H184zm-40-72h288c17.673 0 32 14.327 32 32v288c0 17.673-14.327 32-32 32H144c-17.673 0-32-14.327-32-32V592c0-17.673 14.327-32 32-32zm488 72v208h208V632H632zm-40-72h288c17.673 0 32 14.327 32 32v288c0 17.673-14.327 32-32 32H592c-17.673 0-32-14.327-32-32V592c0-17.673 14.327-32 32-32z" fill="currentColor"/></svg>
    <div class="list-item__label">{{ meta.label }}</div>
    <div class="list-item__count">{{ count }}/{{ meta.limit }}</div>
  </div>
</template>

<script>
// import { getMeta } from './navigation'

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
