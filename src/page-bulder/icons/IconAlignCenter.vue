<template>
  <svg :style="{width: size+'px', height: size+'px'}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M85.333 149.333h853.334v85.334H85.333v-85.334zm213.334 213.334h426.666V448H298.667v-85.333zM128 576h768v85.333H128V576zm170.667 213.333h426.666v85.334H298.667v-85.334z"/></svg>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 14,
    }
  }
}
</script>
