<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button v-if="checkPermi(['merchant:page-builder:create'])"
          size="small"
          type="primary"
          @click="$router.push({path: '/maintain/page-builder/builder'})"
        >装修页面</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        size="mini"
        :header-cell-style="{ fontWeight: 'bold' }"
      >
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column label="装修页面" width="160">
          <template slot-scope="scope">
            <span>{{ decoratablePageMap[scope.row.path] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="160"></el-table-column>
        <el-table-column prop="pageDescribe" label="描述" min-width="160"></el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <span>{{ ['草稿','未发布','已发布'][scope.row.status] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button v-if="checkPermi(['merchant:page-builder:create'])"
              size="mini"
              type="primary"
              @click="$router.push({path: '/maintain/page-builder/builder?id=' + scope.row.id})"
            >编辑</el-button>
            <el-button v-if="checkPermi(['merchant:page-builder:delete'])"
              size="mini"
              type="danger"
              @click="deletePage(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :page-sizes="[10, 20, 40, 80]"
          :page-size="pagination.limit"
          :current-page="pagination.page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="pageChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { roterPre } from '@/settings';
import { checkPermi } from '@/utils/permission'; // 权限判断函数
import {
  getPageDataList,
  getDecoratablePages,
  postDeletePage,
} from './api'
// import { mapGetters } from 'vuex';

export default {
  name: 'CouponList',
  data() {
    return {
      loading: false,
      tableData: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
      },
      decoratablePageMap: {},
    };
  },
  computed: {
    // ...mapGetters(['userProfileInfo']),
  },
  mounted() {
    // console.log(this.userProfileInfo.merId)
    this.decoratablePageMap = getDecoratablePages().reduce((res, page) => {
      res[page.path] = page.name
      return res
    }, {})
    if (checkPermi(['merchant:page-builder:list'])) {
      this.getList();
    }
  },
  methods: {
    checkPermi,
    /** 获取装修数据列表 */
    getList() {
      this.loading = true;
      const {page, limit} = this.pagination
      getPageDataList({page, limit}).then(res => {
        this.tableData = res.list;
        this.pagination.total = res.total;
        this.loading = false;
      }).catch(err => {
        console.warn(err)
        this.loading = false;
      });
    },

    pageChange(page) {
      this.pagination.page = page;
      this.getList();
    },

    handleSizeChange(val) {
      this.pagination.limit = val;
      this.getList();
    },
    /** 删除装修数据 */
    deletePage(row) {
      const name = this.decoratablePageMap[row.path]
      this.$confirm(`确定要删除【${name}】装修数据吗？`, '删除装修数据', {type: 'warning'}).then(() => {
        postDeletePage(row.id).then(() => {
          this.$message.success('已删除')
          this.getList()
        }).catch(err => {
          this.getList()
          console.warn(err)
        })
      }).catch(() => {});
    },
  },
};
</script>

<style lang="scss">
.pickup-logo-wrapper {
  flex: none;
  width: 80px;
  height: 80px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
}

.pickup-logo {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 60px;
  font-size: 12px;
}

.el-switch .el-switch__label--left,
.el-switch .el-switch__label--right {
  text-align: center;
  box-sizing: border-box;

  left: 0;
  margin: 0;
}

.el-switch .el-switch__label--left {
  padding: 0 5px 0 19px;
}

.el-switch .el-switch__label--right {
  padding: 0 19px 0 5px;
}
</style>
