<template>
  <div class="form">
    <h3 class="form__title">间距</h3>
    <div class="field">
      <label class="field__label">间距高度：</label>
      <!-- <input class="field__input" type="number" v-model="innerValue" @input="onInput" placeholder="输入高度"> -->
      <el-input-number size="small" placeholder="输入间距高度"
        v-model="innerValue"
        :min="0"
        controls-position="right"
        @change="onChange"
      ></el-input-number>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: Number,
  },
  data() {
    return {
      innerValue: 0,
    }
  },
  watch: {
    height: {
      handler(newValue) {
        if (this.innerValue !== newValue) {
          this.innerValue = Number(newValue) || 0
        }
      },
      immediate: true,
    },
  },
  methods: {
    onChange(height) {
      this.$emit('change', {height})
    }
  },
}
</script>

<style lang="scss" scoped>
.field {
  display: flex;
  align-items: center;

  &__label {
    flex: none;
    padding-right: 12px;
  }
}
</style>
