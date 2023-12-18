<template>
  <div class="options">
    <h4 class="options__title">优惠券</h4>
    <el-form :model="formdata" class="options__form" label-position="left" label-width="100px"
      @submit.native.prevent="noop">
      <!-- <el-form-item label="选择样式模板" class="lef">
        <p style="color: #000">{{ styleText }}</p>
      </el-form-item> -->

      <!-- <div class="swiperType">
        <div  :class="formdata.swiperType === 0 ? 'active' : ''"
            @click="picchange(0)">
        <el-tooltip class="item" effect="dark" content="一行一个" placement="bottom">
          <span class="iconfont icon-icon_yihangyige" style="font-size: 24px" 
         
          />
        </el-tooltip>
      </div>
      <div :class="formdata.swiperType === 1 ? 'active' : ''"
            @click="picchange(1)">
        <el-tooltip class="item" effect="dark" content="一行二个" placement="bottom">
          <span class="iconfont icon-yihangerge" style="font-size: 24px" 
          
          />
        </el-tooltip>
      </div>
      <div :class="formdata.swiperType === 2 ? 'active' : ''"
            @click="picchange(2)">
        <el-tooltip class="item" effect="dark" content="一行三个" placement="bottom">
          <span class="iconfont icon-yihangsange" style="font-size: 24px" 
        
          />
        </el-tooltip>
      </div>
      <div :class="formdata.swiperType === 3 ? 'active' : ''"
            @click="picchange(3)">
        <el-tooltip class="item" effect="dark" content="横向滑动" placement="bottom">
          <span class="iconfont icon-hengxianghuadong" style="font-size: 24px" 
          />
        </el-tooltip>
      </div>

      </div> -->
      <el-form-item label="排列方式">
      <div class="">
          <!-- <span class="el-form-item__value">{{ layoutDisplay[formdata.layout] || '' }}</span> -->
          <el-radio-group class="ml-auto" size="small"
            v-model="formdata.layout"
            @change="handleChange($event, 'layout')"
          >
            <el-radio-button label="col1">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M947.249 0h-870.4a76.8 76.8 0 0 0-76.8 76.8v716.8a76.8 76.8 0 0 0 76.8 76.8h870.4a76.8 76.8 0 0 0 76.8-76.8V76.8a76.8 76.8 0 0 0-76.8-76.8zm-870.4 51.2h870.4a25.6 25.6 0 0 1 25.6 25.6v716.8a25.6 25.6 0 0 1-25.6 25.6h-870.4a25.6 25.6 0 0 1-25.6-25.6V76.8a25.6 25.6 0 0 1 25.6-25.6zm921.6 921.6a25.6 25.6 0 0 1 4.608 50.79l-4.608.41h-972.8a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h972.8z" fill="currentColor"/><path d="M236.234 367.77a25.6 25.6 0 0 1 31.795-6.4l3.84 2.508 338.79 266.19 112.129-134.452a25.6 25.6 0 0 1 30.105-7.014l4.25 2.406 256 179.2-29.389 41.984-236.697-165.734-112.948 135.526a25.6 25.6 0 0 1-31.692 6.246l-3.79-2.508L259.94 419.584 45.463 681.83 5.834 649.37l230.4-281.6zM768.05 153.6a102.4 102.4 0 1 0 0 204.8 102.4 102.4 0 0 0 0-204.8zm0 51.2a51.2 51.2 0 1 1 0 102.4 51.2 51.2 0 0 1 0-102.4z" fill="currentColor"/></svg>
            </el-radio-button>
            <el-radio-button label="col2">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M384.049 0h-307.2a76.8 76.8 0 0 0-76.8 76.8v716.8a76.8 76.8 0 0 0 76.8 76.8h307.2a76.8 76.8 0 0 0 76.8-76.8V76.8a76.8 76.8 0 0 0-76.8-76.8zm-307.2 51.2h307.2a25.6 25.6 0 0 1 25.6 25.6v716.8a25.6 25.6 0 0 1-25.6 25.6h-307.2a25.6 25.6 0 0 1-25.6-25.6V76.8a25.6 25.6 0 0 1 25.6-25.6zM947.249 0h-307.2a76.8 76.8 0 0 0-76.8 76.8v716.8a76.8 76.8 0 0 0 76.8 76.8h307.2a76.8 76.8 0 0 0 76.8-76.8V76.8a76.8 76.8 0 0 0-76.8-76.8zm-307.2 51.2h307.2a25.6 25.6 0 0 1 25.6 25.6v716.8a25.6 25.6 0 0 1-25.6 25.6h-307.2a25.6 25.6 0 0 1-25.6-25.6V76.8a25.6 25.6 0 0 1 25.6-25.6zm-204.8 921.6a25.6 25.6 0 0 1 4.608 50.79l-4.608.41h-409.6a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6zm563.2 0a25.6 25.6 0 0 1 4.608 50.79l-4.608.41h-409.6a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6z" fill="currentColor"/></svg>
            </el-radio-button>
            <el-radio-button label="col3">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M384.049 0h-307.2a76.8 76.8 0 0 0-76.8 76.8v716.8a76.8 76.8 0 0 0 76.8 76.8h307.2a76.8 76.8 0 0 0 76.8-76.8V76.8a76.8 76.8 0 0 0-76.8-76.8zm-307.2 51.2h307.2a25.6 25.6 0 0 1 25.6 25.6v716.8a25.6 25.6 0 0 1-25.6 25.6h-307.2a25.6 25.6 0 0 1-25.6-25.6V76.8a25.6 25.6 0 0 1 25.6-25.6zM947.249 0h-307.2a76.8 76.8 0 0 0-76.8 76.8v716.8a76.8 76.8 0 0 0 76.8 76.8h307.2a76.8 76.8 0 0 0 76.8-76.8V76.8a76.8 76.8 0 0 0-76.8-76.8zm-307.2 51.2h307.2a25.6 25.6 0 0 1 25.6 25.6v716.8a25.6 25.6 0 0 1-25.6 25.6h-307.2a25.6 25.6 0 0 1-25.6-25.6V76.8a25.6 25.6 0 0 1 25.6-25.6zm-204.8 921.6a25.6 25.6 0 0 1 4.608 50.79l-4.608.41h-409.6a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6zm563.2 0a25.6 25.6 0 0 1 4.608 50.79l-4.608.41h-409.6a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6z" fill="currentColor"/></svg>
            </el-radio-button>
            <el-radio-button label="list">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M384 0H76.8A76.8 76.8 0 0 0 0 76.8V384a76.8 76.8 0 0 0 76.8 76.8H384a76.8 76.8 0 0 0 76.8-76.8V76.8A76.8 76.8 0 0 0 384 0zM76.8 51.2H384a25.6 25.6 0 0 1 25.6 25.6V384a25.6 25.6 0 0 1-25.6 25.6H76.8A25.6 25.6 0 0 1 51.2 384V76.8a25.6 25.6 0 0 1 25.6-25.6zm307.2 512H76.8A76.8 76.8 0 0 0 0 640v307.2a76.8 76.8 0 0 0 76.8 76.8H384a76.8 76.8 0 0 0 76.8-76.8V640a76.8 76.8 0 0 0-76.8-76.8zM76.8 614.4H384a25.6 25.6 0 0 1 25.6 25.6v307.2a25.6 25.6 0 0 1-25.6 25.6H76.8a25.6 25.6 0 0 1-25.6-25.6V640a25.6 25.6 0 0 1 25.6-25.6zM998.4 76.8a25.6 25.6 0 0 1 4.608 50.79l-4.608.41H588.8a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6zm0 563.2a25.6 25.6 0 0 1 4.608 50.79l-4.608.41H588.8a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6zm0-307.2a25.6 25.6 0 0 1 4.608 50.79l-4.608.41H588.8a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6zm0 563.2a25.6 25.6 0 0 1 4.608 50.79l-4.608.41H588.8a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6z" fill="currentColor"/></svg>
            </el-radio-button>
            <el-radio-button label="scroll">
              <svg class="radio-button-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M384 0H76.8A76.8 76.8 0 0 0 0 76.8V384a76.8 76.8 0 0 0 76.8 76.8H384a76.8 76.8 0 0 0 76.8-76.8V76.8A76.8 76.8 0 0 0 384 0zM76.8 51.2H384a25.6 25.6 0 0 1 25.6 25.6V384a25.6 25.6 0 0 1-25.6 25.6H76.8A25.6 25.6 0 0 1 51.2 384V76.8a25.6 25.6 0 0 1 25.6-25.6zm307.2 512H76.8A76.8 76.8 0 0 0 0 640v307.2a76.8 76.8 0 0 0 76.8 76.8H384a76.8 76.8 0 0 0 76.8-76.8V640a76.8 76.8 0 0 0-76.8-76.8zM76.8 614.4H384a25.6 25.6 0 0 1 25.6 25.6v307.2a25.6 25.6 0 0 1-25.6 25.6H76.8a25.6 25.6 0 0 1-25.6-25.6V640a25.6 25.6 0 0 1 25.6-25.6zM998.4 76.8a25.6 25.6 0 0 1 4.608 50.79l-4.608.41H588.8a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6zm0 563.2a25.6 25.6 0 0 1 4.608 50.79l-4.608.41H588.8a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6zm0-307.2a25.6 25.6 0 0 1 4.608 50.79l-4.608.41H588.8a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6zm0 563.2a25.6 25.6 0 0 1 4.608 50.79l-4.608.41H588.8a25.6 25.6 0 0 1-4.608-50.79l4.608-.41h409.6z" fill="currentColor"/></svg>
            </el-radio-button>
          </el-radio-group>
        </div>

       </el-form-item>
       
       <!-- <el-form-item   prop="checked"> -->
          <!-- <div class="acea-row">
            <template v-if="ruleForm.checked.length">
              <div class="pictrue" v-for="(item, index) in ruleForm.checked" :key="index">
                <img :src="item.image" />
                <i class="el-icon-error btndel" @click="handleRemove(index)" />
              </div>
            </template>
            <div class="upLoadPicBox" @click="changeGood">
              <div class="upLoad">
                <i class="el-icon-camera cameraIconfont" />
              </div>
            </div>
          </div> -->
          
        <!-- </el-form-item> -->
      <el-form-item label="添加优惠券">
        <el-radio-group size="mini" 
        v-model="tableFrom.category"
            @change="seachList"
            >
          <el-radio :label="1">商家券</el-radio>
          <el-radio :label="2">商品券</el-radio>
        </el-radio-group>
        
      </el-form-item>
      <div class="view-sort-scroll" ref="view_sort_scroll">
              <draggable tag="div"
                class="view-sort-list"
                v-model="formdata.goodsList"
                v-bind="viewSortDragOptions"
                
              >
                <div v-for="view, index in formdata.goodsList" :key="index"
                  class="view-sort-item"
                  :class="{'is-active': selected === index}"
                  @click.stop="onClickSortableView(index)"
                >
                <!-- {{ view }} -->
                  <svg class="view-sort-item__drag" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><circle cx="15" cy="12" r="1.5"/><circle cx="15" cy="24" r="1.5"/><circle cx="21" cy="12" r="1.5"/><circle cx="21" cy="24" r="1.5"/><circle cx="21" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                  <span class="view-sort-item__index">{{ view.name }}</span>
                  <span class="view-sort-item__label" :title="view.label">{{ view.money }}</span>
                  <!-- 复制 -->
                  <div class="view-sort-item__btn view-sort-item__btn--copy" title="复制" @click="copyView(index)">
                    <svg class="view-sort-item__btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"/><rect x="4" y="8" width="12" height="12" rx="1" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path d="M8 6V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 2" stroke="currentColor"/></svg>
                  </div>
                  <!-- 删除 -->
                  <div class="view-sort-item__btn view-sort-item__btn--delete" title="移除" @click="deleteView(index)">
                    <svg class="view-sort-item__btn-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M7 7h18v22H7zM3 7h26M13 3h6M13 12v10M19 12v10" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="currentColor" stroke-width="2px"/></svg>
                  </div>
                </div>
              </draggable>
            </div>
    </el-form>
    
    <div style="margin-bottom: 100px;">
      <el-button class="add-link w-full" type="primary" size="small" icon="el-icon-plus" @click="addcoupon">添加优惠券</el-button>
    </div>

    <div>
      <div class="deco-control-group">
        <div class="deco-control-group__header">
          <div class="deco-control-group__label">颜色</div>
          <div class="deco-control-group__value">红色</div>
        </div>
        <div class="deco-control-group__content">
          <div class="deco-radio-button-group deco-radio-button-group--round">
            <div class="deco-radio-button deco-radio-button--active"  :class="formdata.swiperType === 1 ? 'active' : ''"
            @click="picchange(1)">
              <el-button  style="background-color: rgb(231, 76, 44);" circle></el-button>
            </div>
            <div class="deco-radio-button"  :class="formdata.swiperType === 2 ? 'active' : ''"
            @click="picchange(2)">
              
              <el-button style="background-color: rgb(255, 233, 183);"  circle></el-button>
            </div>
            <div class="deco-radio-button"  :class="formdata.swiperType === 3 ? 'active' : ''"
            @click="picchange(3)">
              
              <el-button style="background-color: rgb(255, 255, 255);"  circle></el-button>
            </div>
            <div class="deco-radio-button"  :class="formdata.swiperType === 4 ? 'active' : ''"
            @click="picchange(4)">
              <!-- <button type="button" value="4" data-zv="8.6.1" class="zent-btn" style="background-color: rgb(56, 59, 62);">
              </button> -->
              <el-button style="background-color: rgb(56, 59, 62);"  circle></el-button>
            </div>
            <div class="deco-radio-button"  :class="formdata.swiperType === 5 ? 'active' : ''"
            @click="picchange(5)">
              <!-- <button type="button" value="5" data-zv="8.6.1"   style="background-color: rgb(224, 244, 228);" class="zent-btn">
                
              </button> -->
              <el-button style="background-color: rgb(224, 244, 228);"  circle></el-button>
            </div>
              
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="商家优惠券"  width="1000px" :before-close="handleClose">
      <el-form :model="guaranteeForm" :rules="rules"  ref="guaranteeForm" label-width="100px" class="demo-ruleForm">
       
        <el-form-item label="优惠列表" >
          <el-table
            border
            ref="multipleTable"
            :data="tableData.data"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
          <el-table-column key="2"  width="55" >
        <template slot="header" slot-scope="scope">
          <el-checkbox
            slot="reference"
            :value="isChecked && checkedPage.indexOf(tableFrom.page) > -1"
            @change="changeType"
          />
        </template>
        <template slot-scope="scope">
          <el-checkbox :value="checkedIds.indexOf(scope.row.id) > -1" @change="(v) => changeOne(v, scope.row)" />
        </template>
      </el-table-column>
            <el-table-column prop="id" label="ID" min-width="50" />
        <el-table-column prop="name" label="名称" min-width="180" />
        <!-- <el-table-column label="类别" min-width="80">
          <template slot-scope="{ row }">
            <span>{{ row.category | couponCategoryFilter }}</span>
          </template>
        </el-table-column> -->
        <!--<el-table-column label="类型" min-width="80">-->
        <!--<template slot-scope="{ row }">-->
        <!--<span>{{ row.couponType | couponTypeFilter }}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column prop="money" label="面值" min-width="100" />
        <!-- <el-table-column prop="name" label="领取方式" min-width="100">
          <template slot-scope="{ row }">
            <span>{{ row.receiveType | couponUserTypeFilter }}</span>
          </template>
        </el-table-column> -->
        <el-table-column min-width="160" label="领取日期">
          <template slot-scope="{ row }">
            <div v-if="row.receiveEndTime">{{ row.receiveStartTime }} - {{ row.receiveEndTime }}</div>
            <span v-else>不限时</span>
          </template>
        </el-table-column>
        <el-table-column min-width="260" label="使用时间">
          <template slot-scope="{ row }">
            <div v-if="row.day">{{ row.day }}天</div>
            <span v-else> {{ row.useStartTime }} - {{ row.useEndTime }} </span>
          </template>
        </el-table-column>
        <!-- <el-table-column min-width="100" label="发布数量">
          <template slot-scope="{ row }">
            <span v-if="!row.isLimited">不限量</span>
            <div v-else>
              <span class="fa">发布：{{ row.total }}</span>
              <span class="sheng">剩余：{{ row.lastTotal }}</span>
            </div>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="是否开启" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-switch
              v-if="checkPermi(['merchant:coupon:update:status'])"
              v-model="scope.row.status"
              :active-value="true"
              :inactive-value="false"
              active-text="开启"
              inactive-text="关闭"
              @click.native="onchangeIsShow(scope.row)"
            />
            <div v-else>{{ scope.row.status ? '开启' : '关闭' }}</div>
          </template>
        </el-table-column> -->
          </el-table>
          <div class="block mb20">
      <el-pagination
        :page-sizes="[10, 20, 30, 40]"
        :page-size="tableFrom.limit"
        :current-page="tableFrom.page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="pageChange"
      />
    </div>
        </el-form-item>
        <el-form-item>
          <div  class="right-align">
      <el-button size="small" type="primary"  @change="ok($event, 'goodsList')">确定</el-button>
    </div>
          <!-- <el-button
            type="primary"
            v-hasPermi="['merchant:product:guarantee:group:edit']"
            @click="submitForm('guaranteeForm')"
            :disabled="isDisabled"
            >确定</el-button
          > -->
        </el-form-item>
      </el-form>
    </el-dialog>
    <CouponSelect :visible.sync="dialogVisible" @change="onGoodsSelected"></CouponSelect>
  </div>
</template>

<script>
import {
  IconAlignLeft,
  IconAlignCenter,
} from '../icons'
import _ from 'lodash'
import { getProps, getFormdata, getWatchers } from './coupon'
import { checkPermi } from '@/utils/permission'; // 权限判断函数
import { mapGetters } from 'vuex';
import { marketingListApi, couponSaveApi } from '@/api/product';
import CouponSelect from './select/CouponSelect.vue'
import draggable from "vuedraggable"
export default {
  components: {
    IconAlignLeft,
    IconAlignCenter,
    draggable,
    CouponSelect
  },
  props: getProps(),
  mounted() {
    if (!this.merProductClassify.length) this.$store.dispatch('product/getMerProductClassify');
    if (checkPermi(['merchant:coupon:page:list'])) this.getList();
    
    // if (this.checked.length) {
    //   let [...arr2] = this.checked;
    //   this.checkBox = arr2;
    //   this.checkedIds = arr2.map((item) => {
    //     return item.id;
    //   });
    // }
    console.log(99999,this.formdata.goodsList)
    console.log(88,this.checkBox)
  },
  data() {
    var validateGuarantee = (rule, value, callback) => {
      if (this.guaranteeChanged.length === 0) {
        callback(new Error('请至少选择一个服务选项'));
      } else {
        callback();
      }
    };
    return {
      viewSortDragOptions: {
        animation: 150,
        group: {
          name: "page-components",
          pull: false,
          put: false,
        },
        sort: true,
      },
      selected: null,
      formdata: getFormdata(),
      dialogVisible: false,
      guaranteeChanged:[],
      guaranteeListNew: [],
      guaranteeList: [],
      multipleSelection:[],
      checkedPage: [],
      
      checkedIds: [], // 订单当前页选中的数据
      isChecked: false,
      isIndex: 0,
      checkBox: [],
      isDisabled: false,
      tableData: {
        data: [],
        total: 0,
      },
      tableFrom: {
        page: 1,
        limit: 20,
        status: '',
        name: '',
        type: '',
        useType: '',
      },
      guaranteeForm: {
        name: '',
        id: 0,
        gids: '',
      },
      rules: {
        name: [{ required: true, message: '请填写组合名称', trigger: 'blur' }],
        guaranteeList: [{ required: true, validator: validateGuarantee, trigger: 'change' }],
      },
      alignDisplay: { left: '居左显示', center: '居中显示' },
      fontSizeDisplay: { '16': '大(16号)', '14': '中(14号)', '12': '小(12号)' },
      fontWeightDisplay: { '400': '常规体', '600': '加粗体' },
    }
  },
  watch: getWatchers(),
  computed: {
    ...mapGetters(['merProductClassify']),
  },
  methods: {
   
    checkPermi,
    seachList() {
      this.tableFrom.page = 1;
      this.getList();
    },
    copyView(index) {
      const view = this.formdata.goodsList[index]
      if (view) {
        this.formdata.goodsList.push(JSON.parse(JSON.stringify(view)))
      }
    },
     picchange(val){
      console.log(999,val)
      // this.formdata.swiperType === 0
      this.$emit('change', {['swiperType']: val})
     },
     /** 接收选择的商品 */
     onGoodsSelected(goods) {
      console.log(123,goods)
      this.formdata.goodsList=goods
      // this.formdata.goodsList.push(goods)
      this.handleItemsChange()
    },
    /** 处理商品列表更新 */
    handleItemsChange() {
      this.handleChange(_.cloneDeep(this.formdata.goodsList), 'goodsList')
    },
    /** 点击排序视图 */
    onClickSortableView(index) {
      this.selected = index
    },
    /** 删除组件 */
    deleteView(index) {
      this.formdata.goodsList.splice(index, 1)
    },
    pageChange(page) {
      this.tableFrom.page = page;
      this.getList();
      
    },
    handleSizeChange(val) {
      this.tableFrom.limit = val;
      
      this.getList();
    },
    changeType(v) {
      this.isChecked = v;
      const index = this.checkedPage.indexOf(this.tableFrom.page);
      this.isIndex = index;
      this.checkedPage.push(this.tableFrom.page);
      if (index > -1) {
        this.checkedPage.splice(index, 1);
      }
      this.syncCheckedId(v);
    },
    syncCheckedId(o) {
      const ids = this.tableData.data.map((v) => v.id);
      if (o) {
        this.tableData.data.forEach((item) => {
          const index = this.checkedIds.indexOf(item.id);
          if (index === -1) {
            this.checkedIds.push(item.id);
            this.checkBox.push(item);
          }
        });
      } else {
        this.tableData.data.forEach((item) => {
          const index = this.checkedIds.indexOf(item.id);
          if (index > -1) {
            this.checkedIds.splice(index, 1);
            this.checkBox.splice(index, 1);
          }
        });
      }
    },
    changeOne(v, order) {
      if (v) {
        const index = this.checkedIds.indexOf(order.id);
        if (index === -1) {
          this.checkedIds.push(order.id);
          this.checkBox.push(order);
        }
      } else {
        const index = this.checkedIds.indexOf(order.id);
        if (index > -1) {
          this.checkedIds.splice(index, 1);
          this.checkBox.splice(index, 1);
        }
      }
    },
    ok() {
      this.dialogVisible = false;
      console.log(3333,this.checkBox)
      this.$emit('change', this.checkBox);
    },
    // 列表
    getList() {
      this.listLoading = true;
      marketingListApi(this.tableFrom)
        .then((res) => {
          this.guaranteeList = res.list;
          this.tableData.data = res.list;
          this.tableData.total = res.total;
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = false;
        });
    },
    checkPermi,
    selectable(row, index) {
      return true;
      // if (row.isShow) {
      //   return true;
      // } else {
      //   return false;
      // }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let ids = [];
          this.guaranteeChanged.map((item) => {
            ids.push(item.id);
          });
          this.$delete(this.guaranteeForm, 'guaranteeList');
          this.$delete(this.guaranteeForm, 'createTime');
          this.guaranteeForm.gids = ids.toString();
          !this.guaranteeForm.id
            ? couponSaveApi(this.guaranteeForm)
                .then((res) => {
                  this.$message.success('操作成功');
                  this.close();
                })
                .catch(() => {
                  this.loading = false;
                })
            : store
                .guaranteeUpdateApi(this.guaranteeForm)
                .then((res) => {
                  this.$message.success('操作成功');
                  this.close();
                })
                .catch(() => {
                  this.loading = false;
                });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    
    addcoupon(isCreate, editDate, info) {
   
      this.dialogVisible = true;
    },
    handleSelectionChange(val) {
      // this.guaranteeChanged = val;
      const tables = [];
      val.map((item) => {
        tables.push({ src: item.image, id: item.id });
      });
      this.multipleSelection = tables;
    },
    handleClose() {
      this.dialogVisible = false;
      // this.guaranteeForm = {
      //   name: '',
      //   id: 0,
      //   gids: '',
      // };
      this.guaranteeChanged = [];
      this.$refs.multipleTable.clearSelection();
      this.$refs['guaranteeForm'].resetFields();
    },
    //  picchange(value,style){
    //   if(value==1){
    //     this.formdata.swiperType === 1
    //     this.formdata.backimg='linear-gradient(150deg, #f39b00 50%, #f39b00d8 50%)'
    //   }else if(value==1){
    //     this.formdata.swiperType === 1
    //   }else if(value==2){
    //     this.formdata.swiperType === 2
    //   }else if(this.formdata.swiperType === 3){
    //     this.formdata.swiperType === 3
    //   }
      
    //   this.$emit('change', {['swiperType']: value,['backimg']: style})
    //  },
    /** 修改属性值 */
    handleChange(value, prop) {
      // console.log('handleChange', {value})
      this.$emit('change', { [prop]: value })
    },
    /** 重置属性值 */
    reset(prop) {
      const meta = getProps()[prop]
      if (meta && Object.prototype.hasOwnProperty.call(meta, "default")) {
        this.handleChange(meta.default, prop)
      } else {
        this.handleChange(null, prop)
      }
    },
    noop() { },
  },
}
</script>

<style lang="scss">
@import '../assets/utils.scss';
@import '../assets/view-options.scss';
.view-sort-scroll {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
}

.view-sort-item {
  display: flex;
  align-items: center;

  width: 100%;
  height: 36px;
  padding: 0 6px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-sizing: border-box;

  font-size: 13px;
  cursor: move;

  margin-bottom: 4px;

  &:hover {
    background-color: #f7f7f7;
  }

  &.is-active {
    background-color: #e6efff;
  }

  &__drag {
    flex: none;
    width: 24px;
    height: 24px;
    color: #999;
  }

  &__label {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    margin-left: 4px;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 24px;
    height: 24px;
    border-radius: 2px;
    cursor: pointer;
    opacity: 0;
    transition: all 150ms;

    &:hover {
      background-color: rgba(0,0,0,.1);
    }

    &-icon {
      flex: none;
      width: 18px;
      height: 18px;
      color: #333;
    }
  }

  &:hover .view-sort-item__btn {
    opacity: 1;
  }
}
.block{
  display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}
.right-align {
  float: right;
}
.active {
        border: 1px solid #155bd4;
        background-color: #155bd4;
        color: #155bd4;
        
        // padding: 6px;
      }
.swiperType {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  >div{
    margin-left: 4px;
    border: 1px solid gray;
    padding: 4px 14px;
  }
}
.deco-control-group{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .deco-control-group__header{
      display: flex;
      align-items: center;
      .deco-control-group__label{
        margin-right: 16px;
    font-size: 14px;
    color: #969799;
    line-height: 18px;
    white-space: nowrap;
      }
      .deco-control-group__value{
        font-size: 14px;
    font-weight: 500;
    color: #323233;
    line-height: 18px;
    margin-right: 16px;
      }
    }
    .deco-control-group__content{
      flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .deco-radio-button-group{
      display: flex;
      flex-wrap: wrap;
      .deco-radio-button{
        // border: 1px solid gray;
        position: relative;
    display: inline-block;
     width: 38px;
    height: 38px;
    padding: 8px;
    border-radius: 50%;
    line-height: 10px;
    background-color: #8080802b;
    margin-left: 4px;
    // .zent-btn{
    //   width: 24px;
    // height: 24px;
    // padding: 3px;
    // border-radius: 50%;
    // line-height: 14px;
    // }
      }
    }
    }
}
</style>
