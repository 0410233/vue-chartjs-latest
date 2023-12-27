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
      <el-table-column label="活动名称" width="80">
        <template slot-scope="{ row }">
          {{ row.groupBargainingResponseVo.groupBargainingName }}
        </template>
      </el-table-column>
      <el-table-column prop="groupBargainingPeopleNum" label="成团人数"></el-table-column>
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
      <el-table-column prop="name" label="商品名称" min-width="150"> </el-table-column>
      <el-table-column prop="startTime" label="开始使用时间" min-width="120"></el-table-column>
      <el-table-column prop="endTime" label="结束使用时间" min-width="120"></el-table-column>
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
import { getGroupBargainingCommodity } from '@/api/groupBargaining';
import { checkPermi } from '@/utils/permission'; // 权限判断函数
import { mapGetters } from 'vuex';
import SelectableTable from './SelectableTable.vue';

export default {
  components: {
    SelectableTable,
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
      // this.searchData
      const { page, limit } = this.pagination;
      const data = Object.assign({ page, limit });
      this.loading = true;
      getGroupBargainingCommodity(data)
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
          id: item.id,
          groupBargainingId: item.groupBargainingId,
          image: item.image,
          name: item.name,
          intro: item.intro,
          price: item.price,
          groupPrice: item.groupPrice,
          commodityId: item.commodityId,
          stock: item.stock,
          cateId: item.cateId,
          categoryName: item.categoryName,
          productNum: item.productNum,
          groupBargainingPeopleNum: item.groupBargainingPeopleNum,
          startTime: item.startTime,
          endTime: item.endTime,
          groupBargainingResponseVo: { groupBargainingName: item.groupBargainingResponseVo.groupBargainingName },
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
