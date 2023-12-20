<template>
  <div class="options active-list-form">
    <h4 class="options__title">{{ meta.label }}</h4>
    <el-form class="options__form" :model="formdata" size="small" label-position="left" label-width="100px">
      <el-form-item label="选择团购活动">
        <div class="flex items-center w-full justify-end" @click="addActive">
          <el-button type="primary" plain>添加</el-button>
        </div>
      </el-form-item>
    </el-form>
    <GroupBuyingActivitySelect
      :visible.sync="activeSelectorVisible"
      @change="onActiveSelected"
    ></GroupBuyingActivitySelect>
  </div>
</template>

<script>
import _ from 'lodash';
import draggable from 'vuedraggable';
import GroupBuyingActivitySelect from './select/GroupBuyingActivitySelect.vue';
import { getPropDefaultValue } from './utils';
import { getProps, getFormdata, getWatchers, getMeta } from './group-buying';
import useErrors from './mixins/useErrors'

export default {
  mixins: [useErrors],
  components: {
    draggable,
    GroupBuyingActivitySelect,
  },
  props: getProps(),
  data() {
    return {
      meta: getMeta(),
      formdata: getFormdata(),
      errors: {},
      activeSelectorVisible: false,
    };
  },
  watch: getWatchers(),
  mounted() {
    console.log(getMeta());
  },
  methods: {
    // 添加活动
    addActive() {
      this.activeSelectorVisible = true;
    },
    /** 修改属性值 */
    handleChange(value, prop) {
      console.log('handleChange', { [prop]: value });
      this.$emit('change', { [prop]: value });
    },
    /** 重置属性值 */
    reset(prop) {
      const value = getPropDefaultValue(getProps(), prop);
      this.handleChange(value, prop);
    },
    /** 处理商品列表更新 */
    handleItemsChange() {
      this.handleChange(_.cloneDeep(this.formdata.activeList), 'activeList');
    },

    /** 接收选择的活动 */
    onActiveSelected(activeList) {
      this.formdata.activeList = activeList;
      this.handleItemsChange();
    },
    /** 什么都不做 */
    noop() {},
  },
};
</script>

<style lang="scss" src="../assets/utils.scss" scoped></style>
<style lang="scss" src="../assets/view-options.scss" scoped></style>
<style lang="scss" scoped>
.active-list-form {
  .form-item-label--top {
    font-size: 14px;
    font-weight: 700;
    color: #606266;
    margin-top: 20px;
  }

  .goods-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .col {
    flex: none;
    width: 20%;
    padding: 4px;
    box-sizing: border-box;
  }

  .goods {
    width: 100%;
    padding-top: 100%;
    box-sizing: border-box;
    position: relative;

    .img-wrapper {
      width: 100%;
      height: 100%;
      border-radius: 4px;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &__remove {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      // font-size: 12px;
      padding: 0;
      opacity: 0;

      position: absolute;
      right: 0;
      top: 0;
      transform: translate(40%, -40%);
      z-index: -1;
    }

    &:hover .goods__remove {
      z-index: 1;
      opacity: 1;
    }
  }

  .add-goods {
    width: 100%;
    padding-top: 100%;
    border-radius: 4px;
    overflow: hidden;
    border: 1px dashed #e0e0e0;
    position: relative;
    cursor: pointer;

    .el-icon-plus {
      font-size: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover {
      border-color: #409eff;
    }
  }
}
</style>
