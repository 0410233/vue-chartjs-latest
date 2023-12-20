<template>
  <div class="options goods-list-form">
    <h4 class="options__title">{{ meta.label }}</h4>
    <el-form class="options__form" :model="formdata" size="small" label-position="top">
      <el-form-item label="选择商品">
        <draggable
          tag="div"
          class="goods-list"
          v-model="formdata.goodsList"
          @input="handleItemsChange"
          v-bind="dragOptions"
        >
          <div v-for="(goods, index) in formdata.goodsList" :key="goods.id" class="col">
            <div class="goods" :title="goods.name">
              <div class="img-wrapper">
                <img :src="goods.groupBargainingCommodityModels[0].image" alt="" class="goods__img" />
              </div>
              <CloseBtn class="goods__remove" size="16" @click="removeGoods(index)"></CloseBtn>
              <!-- <el-button class="goods__remove" type="danger"
                icon="el-icon-close"
                circle
                @click="removeGoods(index)"
              ></el-button> -->
            </div>
          </div>
          <div class="col col--add">
            <div class="add-goods" @click="showGoodsSelector"><i class="el-icon-plus"></i></div>
          </div>
        </draggable>
      </el-form-item>
    </el-form>
    <el-form class="options__form" :model="formdata" size="small" label-position="left" label-width="80px">
      <el-form-item label="布局方式">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ layoutDisplay[formdata.layout] || '' }}</span>
          <el-radio-group
            class="ml-auto"
            size="small"
            v-model="formdata.layout"
            @change="handleChange($event, 'layout')"
          >
            <el-radio-button label="col1">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M947.249 0h-870.4a76.8 76.8 0 0 0-76.8 76.8v716.8a76.8 76.8 0 0 0 76.8 76.8h870.4a76.8 76.8 0 0 0 76.8-76.8V76.8a76.8 76.8 0 0 0-76.8-76.8zm-870.4 51.2h870.4a25.6 25.6 0 0 1 25.6 25.6v716.8a25.6 25.6 0 0 1-25.6 25.6h-870.4a25.6 25.6 0 0 1-25.6-25.6V76.8a25.6 25.6 0 0 1 25.6-25.6zm921.6 921.6a25.6 25.6 0 0 1 4.608 50.79l-4.608.41h-972.8a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h972.8z"
                  fill="currentColor"
                />
                <path
                  d="M236.234 367.77a25.6 25.6 0 0 1 31.795-6.4l3.84 2.508 338.79 266.19 112.129-134.452a25.6 25.6 0 0 1 30.105-7.014l4.25 2.406 256 179.2-29.389 41.984-236.697-165.734-112.948 135.526a25.6 25.6 0 0 1-31.692 6.246l-3.79-2.508L259.94 419.584 45.463 681.83 5.834 649.37l230.4-281.6zM768.05 153.6a102.4 102.4 0 1 0 0 204.8 102.4 102.4 0 0 0 0-204.8zm0 51.2a51.2 51.2 0 1 1 0 102.4 51.2 51.2 0 0 1 0-102.4z"
                  fill="currentColor"
                />
              </svg>
            </el-radio-button>
            <el-radio-button label="col2">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M384.049 0h-307.2a76.8 76.8 0 0 0-76.8 76.8v716.8a76.8 76.8 0 0 0 76.8 76.8h307.2a76.8 76.8 0 0 0 76.8-76.8V76.8a76.8 76.8 0 0 0-76.8-76.8zm-307.2 51.2h307.2a25.6 25.6 0 0 1 25.6 25.6v716.8a25.6 25.6 0 0 1-25.6 25.6h-307.2a25.6 25.6 0 0 1-25.6-25.6V76.8a25.6 25.6 0 0 1 25.6-25.6zM947.249 0h-307.2a76.8 76.8 0 0 0-76.8 76.8v716.8a76.8 76.8 0 0 0 76.8 76.8h307.2a76.8 76.8 0 0 0 76.8-76.8V76.8a76.8 76.8 0 0 0-76.8-76.8zm-307.2 51.2h307.2a25.6 25.6 0 0 1 25.6 25.6v716.8a25.6 25.6 0 0 1-25.6 25.6h-307.2a25.6 25.6 0 0 1-25.6-25.6V76.8a25.6 25.6 0 0 1 25.6-25.6zm-204.8 921.6a25.6 25.6 0 0 1 4.608 50.79l-4.608.41h-409.6a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6zm563.2 0a25.6 25.6 0 0 1 4.608 50.79l-4.608.41h-409.6a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6z"
                  fill="currentColor"
                />
              </svg>
            </el-radio-button>
            <el-radio-button label="list">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M384 0H76.8A76.8 76.8 0 0 0 0 76.8V384a76.8 76.8 0 0 0 76.8 76.8H384a76.8 76.8 0 0 0 76.8-76.8V76.8A76.8 76.8 0 0 0 384 0zM76.8 51.2H384a25.6 25.6 0 0 1 25.6 25.6V384a25.6 25.6 0 0 1-25.6 25.6H76.8A25.6 25.6 0 0 1 51.2 384V76.8a25.6 25.6 0 0 1 25.6-25.6zm307.2 512H76.8A76.8 76.8 0 0 0 0 640v307.2a76.8 76.8 0 0 0 76.8 76.8H384a76.8 76.8 0 0 0 76.8-76.8V640a76.8 76.8 0 0 0-76.8-76.8zM76.8 614.4H384a25.6 25.6 0 0 1 25.6 25.6v307.2a25.6 25.6 0 0 1-25.6 25.6H76.8a25.6 25.6 0 0 1-25.6-25.6V640a25.6 25.6 0 0 1 25.6-25.6zM998.4 76.8a25.6 25.6 0 0 1 4.608 50.79l-4.608.41H588.8a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6zm0 563.2a25.6 25.6 0 0 1 4.608 50.79l-4.608.41H588.8a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6zm0-307.2a25.6 25.6 0 0 1 4.608 50.79l-4.608.41H588.8a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6zm0 563.2a25.6 25.6 0 0 1 4.608 50.79l-4.608.41H588.8a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6z"
                  fill="currentColor"
                />
              </svg>
            </el-radio-button>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="商品名称">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.isShowName ? '显示' : '不显示' }}</span>
          <el-switch
            class="ml-auto"
            v-model="formdata.isShowName"
            @change="handleChange($event, 'isShowName')"
          ></el-switch>
          <!-- <el-radio-group class="ml-auto" size="small"
            v-model="formdata.isShowName"
            @change="handleChange($event, 'isShowName')"
          >
            <el-radio-button :label="true">显示</el-radio-button>
            <el-radio-button :label="false">不显示</el-radio-button>
          </el-radio-group> -->
        </div>
      </el-form-item>
      <el-form-item label="商品描述">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.isShowDesc ? '显示' : '不显示' }}</span>
          <el-switch
            class="ml-auto"
            v-model="formdata.isShowDesc"
            @change="handleChange($event, 'isShowDesc')"
          ></el-switch>
          <!-- <el-radio-group class="ml-auto" size="small"
            v-model="formdata.isShowDesc"
            @change="handleChange($event, 'isShowDesc')"
          >
            <el-radio-button :label="true">显示</el-radio-button>
            <el-radio-button :label="false">不显示</el-radio-button>
          </el-radio-group> -->
        </div>
      </el-form-item>
      <el-form-item label="拼团价格">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.isShowGroupBookingPrice ? '显示' : '不显示' }}</span>
          <el-switch
            class="ml-auto"
            v-model="formdata.isShowGroupBookingPrice"
            @change="handleChange($event, 'isShowGroupBookingPrice')"
          ></el-switch>
        </div>
      </el-form-item>
      <el-form-item label="商品价格">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.isShowPrice ? '显示' : '不显示' }}</span>
          <el-switch
            class="ml-auto"
            v-model="formdata.isShowPrice"
            @change="handleChange($event, 'isShowPrice')"
          ></el-switch>
        </div>
      </el-form-item>
      <el-form-item label="抢购倒计时">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.isShowCountdown ? '显示' : '不显示' }}</span>
          <el-switch
            class="ml-auto"
            v-model="formdata.isShowCountdown"
            @change="handleChange($event, 'isShowCountdown')"
          ></el-switch>
        </div>
      </el-form-item>
      <!-- <el-form-item label="已团人数">
        <div class="flex items-center w-full">
          <span class="el-form-item__value">{{ formdata.isShowParticipantsNumber ? '显示' : '不显示' }}</span>
          <el-switch
            class="ml-auto"
            v-model="formdata.isShowParticipantsNumber"
            @change="handleChange($event, 'isShowParticipantsNumber')"
          ></el-switch>
        </div>
      </el-form-item> -->
      <!-- 拼团时间 -->
      <!-- startTime -->
      <!-- endTime -->
    </el-form>
    <GoodsSelect :visible.sync="goodsSelectorVisible" @change="onGoodsSelected"></GoodsSelect>
  </div>
</template>

<script>
import _ from 'lodash';
import draggable from 'vuedraggable';
import GoodsSelect from './select/GroupBookingGoodsSelect.vue';
import CloseBtn from './common/CloseBtn.vue';
import { getPropDefaultValue } from './utils';
import { getProps, getFormdata, getWatchers, getMeta } from './group-booking';
import useErrors from './mixins/useErrors'

export default {
  mixins: [useErrors],
  components: {
    draggable,
    GoodsSelect,
    CloseBtn,
  },
  props: getProps(),
  data() {
    return {
      meta: getMeta(),
      formdata: getFormdata(),
      errors: {},
      goodsSelectorVisible: false,
      dragOptions: {
        sort: true,
        animation: 150,
        filter: '.col--add',
      },
      layoutDisplay: {
        col1: '每行一个',
        col2: '每行两个',
        list: '列表模式',
      },
      // visibleDisplay:['不显示','显示']
    };
  },
  watch: getWatchers(),
  methods: {
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
      this.handleChange(_.cloneDeep(this.formdata.goodsList), 'goodsList');
    },
    /** 显示商品选择弹窗 */
    showGoodsSelector() {
      this.goodsSelectorVisible = true;
    },
    /** 接收选择的商品 */
    onGoodsSelected(goods) {
      this.formdata.goodsList.push(goods);
      this.handleItemsChange();
    },
    /** 移除商品 */
    removeGoods(index) {
      this.formdata.goodsList.splice(index, 1);
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
.goods-list-form {
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
    border: 1px dashed #d9d9d9;
    color: #409eff;
    cursor: pointer;
    position: relative;

    .el-icon-plus {
      font-size: 16px;
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
