export default {
  props: {
    errors: Array,
  },
  data() {
    return {
      errorsmap: {},
    }
  },
  watch: {
    errors(newValue) {
      if (Array.isArray(newValue) && newValue.length) {
        this.errorsmap = newValue.reduce((res, error) => {
          if (!res[error.field]) {
            res[error.field] = error.message
          }
          return res
        }, {})
      } else {
        this.errorsmap = {}
      }
    }
  },
}
