<template>
  <div class="caption-view" :style="{backgroundColor: backgroundColor || '#fff'}">
    <div v-if="caption" class="caption-view__caption" :style="captionStyle">{{ caption }}</div>
    <div v-if="description" class="caption-view__description" :style="descriptionStyle">{{ description }}</div>
  </div>
</template>

<script>
import { getProps } from './config'

export default {
  props: getProps(),
  computed: {
    captionStyle() {
      return {
        fontSize: (this.captionFontSize || 16) + 'px',
        fontWeight: this.captionFontWeight || 600,
        color: this.captionColor || '#323232',
        textAlign: this.textAlign || 'left',
      }
    },
    descriptionStyle() {
      return {
        fontSize: (this.descriptionFontSize || 12) + 'px',
        fontWeight: this.descriptionFontWeight || 400,
        color: this.descriptionColor || '#969799',
        textAlign: this.textAlign || 'left',
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.caption-view {
  padding: 0 12px;
  box-sizing: border-box;
  line-height: 1.4;

  &__description {
    margin-top: 4px;
  }
}
</style>
