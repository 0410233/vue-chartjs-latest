<template>
  <svg :style="{width: size+'px', height: size+'px'}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M85.333 149.333h853.334v85.334H85.333v-85.334zm0 213.334h448V448h-448v-85.333zm0 213.333h768v85.333h-768V576zm0 213.333h448v85.334h-448v-85.334z"/></svg>
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
