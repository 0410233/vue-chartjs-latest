<template>
  <div class="active-list" v-if="checkPermi(['merchant:product:page:list'])">
    <el-table
      class="records"
      v-loading="loading"
      :highlight-selection-row="true"
      :row-key="rowKey"
      :data="tableData"
      size="mini"
      @selection-change="select"
    >
      <el-table-column type="selection" :reserve-selection="true" width="55"> </el-table-column>
      <el-table-column label="活动名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="text-ellipsis" :title="scope.row.grouponInfo.title">{{ scope.row.grouponInfo.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品数量" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.grouponInfo.productNum }}
        </template>
      </el-table-column>
      <el-table-column label="物流方式" width="120" align="center">
        <template slot-scope="scope">
          {{ logisticsMAP[scope.row.grouponInfo.logistics] }}
        </template>
      </el-table-column>
      <el-table-column label="团购时间">
        <template slot-scope="scope">
          {{ scope.row.grouponInfo.grouponStartTime }} -
          {{ scope.row.grouponInfo.grouponEndTime }}
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
  </div>
  <span v-else>（没有权限）</span>
</template>

<script>
import { queryGroupList } from '@/api/groupon';
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
      logisticsMAP: {
        1: '邮寄',
        2: '自提',
        3: '到店安装',
      },
    };
  },
  computed: {
    ...mapGetters(['merProductClassify']),
  },
  created() {
    if (!localStorage.getItem('merProductClassify')) {
      this.$store.dispatch('product/getMerProductClassify');
    }
    this.getList();
  },
  methods: {
    rowKey(row) {
      return row.id;
    },
    checkPermi,
    getList(currentPage) {
      if (currentPage > 0) {
        this.pagination.page = currentPage;
      }
      const { page, limit } = this.pagination;
      // grouponStatus 团购状态:0-待开始,1-进行中,2-已结束
      // isMerchant 是否商户(来源商户时只展示自己商户下的订单) 是否商户;
      const data = Object.assign({ page, limit, isMerchant: true, grouponStatus: 1 }, this.searchData);
      this.loading = true;
      queryGroupList(data)
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
    select(val) {
      this.$emit('change', val);
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
