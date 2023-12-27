<template>
  <!-- 选择商品选择 -->
  <el-dialog title="商家优惠" :visible.sync="dialogVisible" width="800px">
    <!-- dialog 的显示隐藏通过样式，不会重新创建实例 -->
    <CouponList v-if="dialogVisible" @change="onSelectGoods"></CouponList>
  </el-dialog>
</template>

<script>
import CouponList from './CouponList.vue';

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
    };
  },
  watch: {
    visible: {
      handler(newValue) {
        console.log(newValue);
        if (this.dialogVisible !== newValue) {
          this.dialogVisible = newValue;
        }
      },
      immediate: true,
    },
    dialogVisible(newValue) {
      if (this.visible !== newValue) {
        this.$emit('update:visible', newValue);
      }
    },
  },
  methods: {
    onSelectGoods(goods) {
      this.$emit('change', goods);
      console.log(123, goods);
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss"></style>
