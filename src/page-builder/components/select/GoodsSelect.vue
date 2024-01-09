<template>
  <el-dialog title="选择商品" :visible.sync="dialogVisible" width="800px" :destroy-on-close="true">
    <div class="goods-filter">
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
    <SelectableTable class="records"
      :loading="loading"
      :records="tableData"
      :selection="selection"
      :multiple="multiple"
      @selection-change="onSelectionChange"
      @choose="onChoose"
    >
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column label="商品图" width="80">
        <template slot-scope="scope">
          <el-image
            style="width: 40px; height: 40px"
            :src="scope.row.image"
            fit="contain"
            :preview-src-list="[scope.row.image]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名称" min-width="200">
        <template slot-scope="scope">
          <span class="text-ellipsis" :title="scope.row.name">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="merchantProductCategoryName" label="商品分类" min-width="120"></el-table-column>
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
    <div v-if="multiple" slot="footer">
      <el-button size="small" @click="onCancel">取消</el-button>
      <el-button size="small" type="primary" @click="onConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import _ from 'lodash'
// import GoodsList from './GoodsList.vue'
// import {
//   productLstApi as getGoodsList,
// } from '@/api/product';
// // import { checkPermi } from '@/utils/permission'; // 权限判断函数
// import { mapGetters } from 'vuex';
import SelectableTable from './SelectableTable.vue';

export default {
  components: {
    SelectableTable,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    selection: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      selected: [],

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
  watch: {
    visible: {
      handler(newValue) {
        if (this.dialogVisible !== newValue) {
          this.dialogVisible = newValue
        }
      },
      immediate: true,
    },
    dialogVisible(newValue) {
      if (this.visible !== newValue) {
        this.$emit('update:visible', newValue)
      }
      if (newValue) {
        this.getList(1)
      }
    },
  },
  // computed: {
  //   ...mapGetters([
  //     'merProductClassify',
  //   ]),
  // },
  created() {
    // if (!localStorage.getItem('merProductClassify')) {
    //   this.$store.dispatch('product/getMerProductClassify')
    // }
    this.getList()
  },
  methods: {
    // checkPermi,
    getList() {
      // if (pg > 0) {
      //   this.pagination.page = pg
      // }
      // const {page, limit} = this.pagination
      // const data = Object.assign({page, limit}, this.searchData)
      // this.loading = true
      // getGoodsList(data).then(res => {
      //   this.loading = false
      //   this.tableData = res.list
      //   this.pagination.total = res.total
      // }).catch(err => {
      //   this.loading = false
      //   console.warn(err)
      // })
    },
    onPageChange(page) {
      this.getList(page)
    },
    search() {
      this.getList(1)
    },
    onSelectionChange(selection) {
      this.selected = selection
    },
    onCancel() {
      this.dialogVisible = false
      this.selected = []
      this.$emit('cancel')
    },
    onConfirm() {
      this.dialogVisible = false
      this.$emit('confirm', this.selected)
    },
    onChoose(goods) {
      this.dialogVisible = false
      this.$emit('choose', goods)
      this.$emit('change', goods)
    },
  }
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
