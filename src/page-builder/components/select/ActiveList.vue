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
      <el-table-column prop="name" label="活动名称" min-width="200" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="text-ellipsis" :title="scope.row.name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="merchantProductCategoryName" label="物流方式" min-width="120"></el-table-column>
      <el-table-column prop="merchantProductCategoryName" label="商品数量" min-width="120"></el-table-column>
      <el-table-column label="团购时间" width="120">
        <template slot-scope="scope"> </template>
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
import { productLstApi as getGoodsList } from '@/api/product';
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
      const data = Object.assign({ page, limit }, this.searchData);
      this.loading = true;
      getGoodsList(data)
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
