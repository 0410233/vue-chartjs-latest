<template>
  <div class="goods-list" v-if="checkPermi(['merchant:product:page:list'])">
    <div>
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
    </div>
    <el-table class="records" v-loading="loading" :data="tableData" size="mini">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
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
      <el-table-column prop="merchantProductCategoryName" label="商品分类" min-width="120"></el-table-column>
      <el-table-column label="选择" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="select(scope.row)">选择</el-button>
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
import {
  productLstApi as getGoodsList,
} from '@/api/product';
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
    }
  },
  computed: {
    ...mapGetters([
      'merProductClassify',
    ]),
  },
  created() {
    if (!localStorage.getItem('merProductClassify')) {
      this.$store.dispatch('product/getMerProductClassify')
    }
    this.getList()
  },
  methods: {
    checkPermi,
    getList(currentPage) {
      if (currentPage > 0) {
        this.pagination.page = currentPage
      }
      // const data = {page: this.page, limit: 10}
      // if (this.searchData.cateId > 0) {
      //   data.cateId = this.searchData.cateId
      // }
      // if (this.searchData.keywords) {
      //   data.keywords = this.searchData.keywords
      // }
      const {page, limit} = this.pagination
      const data = Object.assign({page, limit}, this.searchData)
      this.loading = true
      getGoodsList(data).then(res => {
        this.loading = false
        this.tableData = res.list
        this.pagination.total = res.total
      }).catch(err => {
        this.loading = false
        console.warn(err)
      })
    },
    onPageChange(page) {
      this.getList(page)
    },
    search() {
      this.getList(1)
    },
    select(row) {
      // this.$emit('change', {
      //   name: row.name,
      //   path: '/pages/goods/goods_details/index?id=' + row.id,
      //   image: row.image,
      //   from: '商品',
      // })
      this.$emit('change', {...row})
    },
  },
}
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
