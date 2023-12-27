<template>
  <div class="goods-list" v-if="checkPermi(['merchant:product:page:list'])">
    <!-- <div>
        <el-form inline size="small">
          <el-form-item label="商品分类：">
            <el-cascader
              v-model="searchData.cateId"
              :options="merProductClassify"
              :props="cateProps"
              clearable
              size="small"
              :append-to-body="false"
              @change="search"
            />
          </el-form-item>
          <el-form-item label="商品名称：">
            <el-input
              v-model="searchData.keywords"
              placeholder="请输入商品名称"
              size="small"
              clearable
              @keyup.native.enter="search"
            ></el-input>
          </el-form-item>
        </el-form>
      </div> -->
    <el-table class="records" v-loading="loading" :data="tableData" size="mini">
      <el-table-column key="2" width="55">
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
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="name" label="优惠券名称" min-width="100">
        <template slot-scope="scope">
          <span class="text-ellipsis" :title="scope.row.name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="money" label="面值" min-width="100" />
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
    </el-table>
    <div class="pagination">
      <el-pagination
        layout="total, prev, pager, next"
        :page-size="pagination.limit"
        :total="pagination.total"
        :current-page="pagination.page"
        :pager-count="5"
        background
        small
        @current-change="onPageChange"
      ></el-pagination>
    </div>
    <div>
      <el-button size="small" type="primary" @click="select($event, checkBox)">确定</el-button>
    </div>
  </div>
  <span v-else>（没有权限）</span>
</template>

<script>
import { marketingListApi, couponSaveApi } from '@/api/product';
import { checkPermi } from '@/utils/permission'; // 权限判断函数
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loading: false,
      tableData: [],
      pagination: {
        page: 1,
        total: 0,
        limit: 6,
      },
      tableFrom: {
        page: 1,
        limit: 20,
        status: '',
        name: '',
        type: '',
        useType: '',
      },
      multipleSelection: [],
      checkedPage: [],

      checkedIds: [], // 订单当前页选中的数据
      isChecked: false,
      isIndex: 0,
      checkBox: [],
      isDisabled: false,
      searchData: {
        cateId: null,
        keywords: null,
        type: '1',
      },
      cateProps: {
        children: 'childList',
        label: 'name',
        value: 'id',
        multiple: false,
        emitPath: false,
      },
    };
  },
  computed: {
    ...mapGetters(['merProductClassify']),
  },
  inject: ['category'],
  created() {
    if (!localStorage.getItem('merProductClassify')) {
      this.$store.dispatch('product/getMerProductClassify');
    }
    this.getList();
  },
  methods: {
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
      const ids = this.tableData.map((v) => v.id);
      if (o) {
        this.tableData.forEach((item) => {
          const index = this.checkedIds.indexOf(item.id);
          if (index === -1) {
            this.checkedIds.push(item.id);
            this.checkBox.push(item);
          }
        });
      } else {
        this.tableData.forEach((item) => {
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
    checkPermi,
    getList(currentPage) {
      if (currentPage > 0) {
        this.pagination.page = currentPage;
      }
      // const data = {page: this.page, limit: 10}
      // if (this.searchData.cateId > 0) {
      //   data.cateId = this.searchData.cateId
      // }
      // if (this.searchData.keywords) {
      //   data.keywords = this.searchData.keywords
      // }
      const { page, limit } = this.pagination;
      const data = Object.assign({ page, limit }, this.searchData, { category: this.category() });
      this.loading = true;
      marketingListApi(data)
        .then((res) => {
          this.loading = false;
          this.tableData = res.list;
          this.pagination.total = res.total;
        })
        .catch((err) => {
          this.loading = false;
          console.warn(err);
        });
    },
    onPageChange(page) {
      this.getList(page);
    },
    search() {
      this.getList(1);
    },
    select() {
      // this.$emit('change', {
      //   name: row.name,
      //   path: '/pages/goods/goods_details/index?id=' + row.id,
      //   image: row.image,
      //   from: '商品',
      // })
      // this.$emit('change', [this.checkBox])
      this.$emit('change', this.checkBox);
    },
  },
};
</script>

<style lang="scss" scoped>
.records {
  width: 100%;
  // margin-top: 20px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.text-ellipsis {
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
