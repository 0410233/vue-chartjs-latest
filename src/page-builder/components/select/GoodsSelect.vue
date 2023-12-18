<template>
  <el-dialog title="选择商品" :visible.sync="dialogVisible" width="800px">
    <GoodsList @change="onSelectGoods"></GoodsList>
  </el-dialog>
</template>

<script>
import GoodsList from './GoodsList.vue'

export default {
  components: {
    GoodsList,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  watch: {
    visible: {
      handler(newValue) {
        if (this.dialogVisible !== newValue) {
          this.dialogVisible = newValue
        }
      },
      immediate: true,
    },
    dialogVisible(newValue) {
      if (this.visible !== newValue) {
        this.$emit('update:visible', newValue)
      }
    },
  },
  methods: {
    onSelectGoods(goods) {
      this.$emit('change', goods)
      this.dialogVisible = false
    },
  }
}
</script>

<style lang="scss">

</style>
