<template>
  <el-dialog title="选择商品分类" :visible.sync="dialogVisible" width="800px">
    <el-table class="records"
      v-loading="loading"
      :data="tableData"
      size="mini"
    >
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="name" label="分类名" min-width="120"></el-table-column>
      <el-table-column label="选择" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="select(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      tableData: [],
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
    },
  },
  created() {
    this.getList()
  },
  methods: {
    foldCates(cates) {
      const map = cates.reduce((res, cate) => {
        cate.children = []
        res[cate.id] = cate
        return res
      }, {})
      const rootCates = cates.reduce((res, cate) => {
        const parent = map[cate.pid]
        if (parent) {
          parent.children.push(cate)
        } else {
          res.push(cate)
        }
        return res
      }, [])
      // console.log({rootCates})
      return rootCates
    },
    getList() {
      // this.loading = true
      // getCateList().then(cates => {
      //   this.tableData = this.foldCates(cates)
      //   this.loading = false;
      // }).catch(() => {
      //   this.loading = false
      // })
    },
    select(cate) {
      this.$emit('change', _.cloneDeep(cate))
      this.dialogVisible = false
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
