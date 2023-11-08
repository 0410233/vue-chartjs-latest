<template>
  <div class="form">
    <h3 class="form__title">文字</h3>
    <div class="form__field">
      <input class="form__input" type="text" :value="innerValue" @input="onInput" placeholder="输入内容">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: String,
  },
  data() {
    return {
      innerValue: '',
    }
  },
  watch: {
    content: {
      handler(newValue) {
        if (this.innerValue !== newValue) {
          this.innerValue = newValue || ''
        }
      },
      immediate: true,
    },
  },
  methods: {
    onInput(e) {
      const content = e.target.value
      this.innerValue = content
      this.$emit('change', {content})
    }
  },
}
</script>

<style lang="scss" scoped>
.options {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;

  &__field {
    margin-top: 20px;
  }

  &__input {
    display: block;
    width: 100%;
  }
}
</style>
