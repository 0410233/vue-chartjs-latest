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
    <SelectableTable
      class="records"
      :loading="loading"
      :records="tableData"
      :selection="selection"
      :multiple="true"
      size="mini"
      @selection-change="select"
    >
      <el-table-column prop="activityName" label="活动名称"></el-table-column>
      <!-- <el-table-column prop="id" label="ID" width="80"></el-table-column> -->
      <el-table-column label="商品图" width="80">
        <template slot-scope="scope">
          <el-image
            style="width: 40px; height: 40px"
            :src="scope.row.image"
            fit="contain"
            :preview-src-list="[scope.row.image]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" min-width="200">
        <template slot-scope="scope">
          <span class="text-ellipsis" :title="scope.row.name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="活动状态">
        <template slot-scope="scope">
          {{ scope.row.status | statusFil }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="categoryName" label="商品分类" min-width="120"></el-table-column> -->
      <el-table-column label="活动 时间" min-width="120">
        <template slot-scope="{ row }"> {{ row.startDate }} - {{ row.endDate }}</template>
      </el-table-column>
    </SelectableTable>
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
import { seckillProListApi } from '@/api/marketing';
import { checkPermi } from '@/utils/permission'; // 权限判断函数
import { mapGetters } from 'vuex';
import SelectableTable from './SelectableTable.vue';

export default {
  components: {
    SelectableTable,
  },
  filters: {
    statusFil(status) {
      const statusMap = {
        0: '未开始',
        1: '进行中',
        2: '已结束',
      };
      return statusMap[status] || '进行中';
    },
  },
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
    selection() {
      return this.goodsList();
    },
  },
  inject: ['goodsList'],
  created() {
    if (!localStorage.getItem('merProductClassify')) {
      this.$store.dispatch('product/getMerProductClassify');
    }
    this.getList();
  },
  methods: {
    checkPermi,
    getList(currentPage) {
      if (currentPage > 0) {
        this.pagination.page = currentPage;
      }
      const { page, limit } = this.pagination;
      // proStatus: 1 上架 auditStatus: 2 审核成功
      const data = Object.assign({ page, limit, auditStatus: 2, proStatus: 1 }, this.searchData);
      this.loading = true;
      seckillProListApi(data)
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
    select(val) {
      /**
       * todo 数据裁剪
       */
      const data = val.map((item) => {
        return {
          activityId: item.activityId,
          activityName: item.activityName,
          categoryName: item.categoryName,
          id: item.id,
          image: item.image,
          merName: item.merName,
          name: item.name,
          price: item.price,
          seckillPrice: item.seckillPrice,
          startDate: item.startDate,
          content: item.content,
          attrValue: item.attrValue.map((item) => {
            return {
              attrValue: item.attrValue,
            };
          }),
        };
      });
      this.$emit('change', data);
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
