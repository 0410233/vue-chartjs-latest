<template>
  <div class="options">
    <h4 class="options__title">{{ meta.label }}</h4>
    <div class="options__form">
      <Tinymce v-model="formdata.content" @input="handleChange($event, 'content')"></Tinymce>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce/index';
import { getPropDefaultValue } from './utils'
import {
  getProps,
  getFormdata,
  getWatchers,
  getMeta,
} from './richtext'

export default {
  components: {
    Tinymce,
  },
  props: getProps(),
  data() {
    return {
      meta: getMeta(),
      formdata: getFormdata(),
    }
  },
  watch: getWatchers(),
  methods: {
    /** 修改属性值 */
    handleChange(value, prop) {
      // console.log('handleChange', {value})
      this.$emit('change', {[prop]: value})
    },
    /** 重置属性值 */
    reset(prop) {
      const value = getPropDefaultValue(getProps(), prop)
      this.handleChange(value, prop)
    },
    noop() {},
  },
}
</script>

<style lang="scss" src="../assets/utils.scss" scoped></style>
<style lang="scss" src="../assets/view-options.scss" scoped></style>
<style lang="scss" scoped>
::v-deep .mce-container,
::v-deep .mce-container *,
::v-deep .mce-widget,
::v-deep .mce-widget *,
::v-deep .mce-reset {
  white-space: normal !important;
}
</style>
