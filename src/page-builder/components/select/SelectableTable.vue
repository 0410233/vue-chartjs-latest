<template>
  <el-table class="selectable-table" size="mini"
    :data="records"
    v-loading="loading"
    stripe
    :border="true"
    :header-cell-style="{background: '#f2f2f2'}"
    @selection-change="onSelectionChange"
    ref="selectable_table"
  >
    <el-table-column v-if="multiple" type="selection" width="55" align="center" :selectable="selectable"></el-table-column>
    <slot></slot>
    <el-table-column v-if="!multiple" label="选择" width="120" align="center">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="onChoose">选择</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import _ from 'lodash'

// function clone(obj) {
//   return JSON.parse(JSON.stringify(obj))
// }

export default {
  name: 'SelectableTable',
  props: {
    records: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    selection: {
      type: Array,
      default: () => [],
    },
    selectable: {
      type: Function,
      default: () => true,
    },
    identity: {
      type: [Function, String],
      default: 'id',
    },
  },
  data() {
    return {
      /** @type {null|array} */
      selected: null,
      timer: undefined,
    }
  },
  computed: {
    keyof() {
      if (typeof this.identity === 'function') {
        return this.identity
      }
      return item => item[this.identity]
    }
  },
  watch: {
    records: {
      handler() {
        // console.log('on records change')
        this.$nextTick(() => {
          this.updateTableSelection()
        })
      },
      imediate: true,
    },
    selection: {
      handler() {
        // console.log('on selection change')
        this.initSelected()
        this.updateTableSelection()
      },
      imediate: true,
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    /** 差集 */
    diff(set1, set2) {
      return _.differenceBy(set1, set2, this.keyof)
    },
    /** 并集 */
    union(set1, set2) {
      return _.unionBy(set1, set2, this.keyof)
    },
    /** 交集 */
    intersection(set1, set2) {
      return _.intersectionBy(set1, set2, this.keyof)
    },
    /** 初始化已选项 */
    initSelected() {
      // console.log('initSelected', clone({
      //   selection: this.selection,
      //   selected: this.selected,
      // }))
      if (Array.isArray(this.selection)) {
        this.selected = this.selection.slice()
      } else {
        this.selected = []
      }
    },
    /** 更新选中状态 */
    updateTableSelection() {
      if (!this.multiple) {
        return
      }
      // console.log('updateTableSelection', clone({selected: this.selected}))
      if (this.selected === null) {
        this.initSelected()
      }
      const selectedMap = this.selected.reduce((res, x) => {
        res[this.keyof(x)] = true
        return res
      }, {})
      const table = this.$refs.selectable_table
      this.records.slice().forEach(row => {
        table.toggleRowSelection(row, !!selectedMap[this.keyof(row)])
      })
    },
    /** 选中项更新 */
    onSelectionChange(selection) {
      if (!this.multiple) {
        return
      }
      // console.log('onSelectionChange')
      if (this.selected === null) {
        this.initSelected()
      }
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        // console.log('perform handle selection change', clone(selection))
        this.selected = this.union(
          // 先排除当前未选择的
          this.diff(this.selected, this.diff(this.records, selection)),
          selection
        )
        this.$emit('selection-change', _.cloneDeep(this.selected))
      }, 300)
    },
    /** 选择行 */
    onChoose(row) {
      this.$emit('choose', _.cloneDeep(row))
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
