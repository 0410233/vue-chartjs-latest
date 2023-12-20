<template>
  <div class="list-item">
    <!-- <svg class="list-item__icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M320 288v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4h131.072a32 32 0 0 1 31.808 28.8l57.6 576a32 32 0 0 1-31.808 35.2H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320zm64 0h256v-22.336C640 189.248 582.272 128 512 128c-70.272 0-128 61.248-128 137.664v22.4zm-64 64H217.92l-51.2 512h690.56l-51.264-512H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0v-96z" fill="currentColor"/></svg> -->
    <svg class="list-item__icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M320 64h320v256H320zm64 640h192v256H384zM0 704h192v256H0zm768 0h192v256H768zM128 512h320v128h64V512h320v128h64V448H512v-64h-64v64H64v192h64V512z" fill="currentColor"/></svg>
    <div class="list-item__label">{{ meta.label }}</div>
    <div class="list-item__count">{{ count }}/{{ meta.limit }}</div>
  </div>
</template>

<script>
import { getMeta } from './config'

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

<style lang="scss" src="../../assets/list-item.scss" scoped></style>
