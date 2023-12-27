<template>
  <div class="page-list">
    <el-form inline size="small" @submit.native.prevent="noop">
      <el-form-item label="商品名称：">
        <el-input
          v-model="searchData.keywords"
          placeholder="输入页面名称"
          size="small"
          clearable
          @keyup.native.enter="search"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="tableData" class="records" size="mini">
      <el-table-column prop="name" label="页面名称" min-width="120"></el-table-column>
      <el-table-column label="是否可装修" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.decoratable ? '可装修' : '不可装修' }}</span>
        </template>
      </el-table-column>
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
</template>

<script>
import { getPathList } from '../../api'

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
        keywords: '',
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(currentPage) {
      if (currentPage > 0) {
        this.pagination.page = currentPage
      }
      const {page, limit} = this.pagination
      const data = Object.assign({page, limit}, this.searchData)
      this.loading = true
      getPathList(data).then(res => {
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
      // const {name, path} = row
      // this.$emit('change', {
      //   name,
      //   path: '/'+path,
      //   image: null,
      //   from: '页面',
      // })
      this.$emit('change', {...row})
    },
    noop() {},
  },
}
</script>

<style lang="scss" scoped>
.records {
  width: 100%;
  // margin-top: 4px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
