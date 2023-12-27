<template>
  <el-dialog title="秒杀" :visible.sync="dialogVisible" width="800px">
    <GoodsList @change="onSelectGoods"></GoodsList>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import GoodsList from './InstantGoodsList.vue';

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
      goods: [],
    };
  },
  watch: {
    visible: {
      handler(newValue) {
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
      this.goods = goods;
    },
    confirm() {
      this.$emit('change', this.goods);
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss"></style>
