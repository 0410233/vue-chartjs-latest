<template>
  <!-- 活动选择 -->
  <el-dialog title="团购" :visible.sync="dialogVisible" width="800px">
    <ActiveList @change="onSelectActives"></ActiveList>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ActiveList from './ActiveList.vue';

export default {
  components: {
    ActiveList,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      actives: [],
      dialogVisible: false,
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
    onSelectActives(actives) {
      this.actives = actives;
    },
    confirm() {
      this.$emit('change', this.actives);
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss">
.el-dialog__footer {
  border-top: none;
}
</style>
