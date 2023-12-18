<template>
    <!-- 选择商品选择 -->
    <el-dialog title="商家优惠" :visible.sync="dialogVisible" width="800px">
      <CouponList @change="onSelectGoods"></CouponList>
    </el-dialog>
  </template>
  
  <script>
  import CouponList from './CouponList.vue'
  
  export default {
    components: {
        CouponList,
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
        console.log(123,goods)
        this.dialogVisible = false
      },
    }
  }
  </script>
  
  <style lang="scss">
  
  </style>
  