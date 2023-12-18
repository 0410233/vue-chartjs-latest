<template>
  <!-- 移动端页面选择 -->
  <el-dialog title="跳转到" :visible.sync="dialogVisible" width="800px">
    <el-tabs class="tabs" tab-position="left" v-model="currentTab">
      <el-tab-pane label="页面" name="page">
        <!-- <div>（移动端页面列表）</div> -->
        <PageList @change="onSeleckPage"></PageList>
      </el-tab-pane>
      <el-tab-pane label="商品" name="goods">
        <!-- <div>（商品列表）</div> -->
        <GoodsList @change="onSelectGoods"></GoodsList>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import PageList from './PageList.vue'
import GoodsList from './GoodsList.vue'

export default {
  components: {
    PageList,
    GoodsList,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      currentTab: 'page',
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
  methods: {
    // initList() {
    //   console.log('initList')
    //   const com = this.$refs[this.currentTab+'_list']
    //   console.log({com})
    //   this.$refs[this.currentTab+'_list'].getList()
    // },
    onSeleckPage(page) {
      this.$emit('change', {
        name: page.name,
        path: '/' + page.path,
        image: null,
        from: '页面',
      })
      this.dialogVisible = false
    },
    onSelectGoods(goods) {
      this.$emit('change', {
        name: goods.name,
        path: '/pages/goods/goods_details/index?id=' + goods.id,
        image: goods.image,
        from: '商品',
      })
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss">

</style>
