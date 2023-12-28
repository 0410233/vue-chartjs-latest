<template>
  <page-meta
    :background-color="page.backgroundColor"
  ></page-meta>
  <view v-if="page.id > 0" class="decoratable-page"
    :style="{backgroundColor: page.backgroundColor}"
  >
    <!-- 静态布局区 -->
    <NavbarView v-bind="navbar" data-placeholder></NavbarView>
    <component v-for="(view, index) in fixedViews" :key="'placeholder_' + index"
      :is="camelCase(view.name) + 'View'"
      v-bind="view.data"
      is-placeholder
    ></component>
    <component v-for="(view, index) in staticViews" :key="'static_' + index"
      :is="camelCase(view.name) + 'View'"
      v-bind="view.data"
      :merId="merId"
    ></component>

    <!-- 固定布局区 -->
    <view class="fixed-layer">
      <NavbarView v-bind="navbar" data-fixed></NavbarView>
      <component v-for="(view, index) in fixedViews" :key="'fixed_' + index"
        :is="camelCase(view.name) + 'View'"
        v-bind="view.data"
      ></component>
    </view>

    <!-- 底部导航栏 -->
    <TabbarView v-bind="tabbar" is-placeholder></TabbarView>
    <TabbarView v-bind="tabbar" :path="path"></TabbarView>
  </view>
  <slot v-else></slot>
</template>

<script>
import {
  getDecorationData
} from './api';
import { components } from './components';
import NavbarView from './components/navbar/View.vue'
import TabbarView from './components/tabbar/View.vue'

export default {
  name: 'DecoratablePage',
  components: {
    ...components,
    NavbarView,
    TabbarView,
  },
  props: {
    merId: Number,
    path: String,
  },
  data() {
    return {
      /** 页面配置 */
      page: {
        id: null,
        name: null,
        description: null,
        backgroundColor: '#ffffff',
      },
      /** 顶部导航配置 */
      navbar: {
        title: '',
        backgroundColor: '#ffffff',
      },
      /** 底部导航配置 */
      tabbar: {
        links: [],
        textColor: '#333333',
        selectedTextColor: '#333333',
        backgroundColor: '#ffffff',
        isShow: false,
      },
      /** 页面组件参数 */
      views: [],
      timer: undefined,
    }
  },
  computed: {
    staticViews() {
      return this.views.filter(x => !x.fixed)
    },
    fixedViews() {
      return this.views.filter(x => x.fixed)
    },
  },
  watch: {
    merId() {
      this.init()
    },
    path() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    /** kebab-case 转 CamelCase */
    camelCase(str) {
      return str.replace(/(?:^|\-)([a-z])/g, (m, $1) => $1.toUpperCase())
    },
    init() {
      clearTimeout(this.timer)
      this.timer = setTimeout(this.getDecorationData, 150)
    },
    /** 获取页面装修数据 */
    async getDecorationData() {
      if (isNaN(this.merId) || this.merId <= 0 || !this.path) {
        this.page.id = null
        return
      }
      try {
        const res = await getDecorationData({
          merId: this.merId, path: this.path.replace(/^\//, '')
        })
        console.log('getDecorationData', res)
        if (!res || !res.data || !res.data.id) {
          this.page.id = null
          return
        }

        // 页面数据
        this.page.id = res.data.id
        this.page.name = res.data.name
        this.page.description = res.data.pageDescribe
        this.page.backgroundColor = res.data.backGroundColor

        // 组件列表
        const modules = Array.isArray(res.data.modules) ? res.data.modules : []

        // 顶部导航单独设置
        this.views = modules.filter(x => x.name !== 'navbar')

        // 顶部导航参数
        const navbar = modules.find(x => x.name === 'navbar')
        if (navbar) {
          this.navbar.title = navbar.title
          this.navbar.backgroundColor = navbar.backgroundColor
        }

        // 底部导航参数
        const tabbar = res.data.navigation || {}
        if (tabbar) {
          this.tabbar.links = Array.isArray(tabbar.links) ? tabbar.links : []
          this.tabbar.textColor = tabbar.textColor || '#333333'
          this.tabbar.selectedTextColor = tabbar.selectedTextColor || '#333333'
          this.tabbar.backgroundColor = tabbar.backgroundColor || '#ffffff'
        }
        
        if (this.tabbar.links.length) {
          const _this = this
          uni.hideTabBar({
            success() {
              _this.tabbar.isShow = true
            },
            fail() {
              _this.tabbar.isShow = false
            }
          })
        }
      } catch (error) {
        console.warn(error)
        this.page.id = null
        uni.showTabBar()
        throw error
      }
    },
  }
}
</script>

<style scoped>
.decoratable-page {
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

.fixed-layer {
  width: 100%;
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
</style>
