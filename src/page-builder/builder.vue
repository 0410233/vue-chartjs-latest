<template>
  <div
    class="page-builder-wrapper"
    :class="isFullscreen && 'is-fullscreen'"
    ref="el_builder"
    :style="'--bg-color:' + pageFormdata.backgroundColor"
  >
    <div class="page-builder">
      <!-- 顶部按钮区 -->
      <div class="page-builder__header">
        <!-- <el-button size="small" type="success" icon="el-icon-view" @click="selected = null">预览</el-button> -->
        <el-button size="small" type="primary" icon="el-icon-document-checked" @click="publish">发布</el-button>
        <el-button size="small" icon="el-icon-document" @click="save">保存草稿</el-button>
        <el-button v-if="fullscreenEnabled" size="small" icon="el-icon-full-screen" @click="toggleFullscreen">{{
          isFullscreen ? '退出全屏' : '全屏'
        }}</el-button>
      </div>

      <!-- 左侧组件列表 -->
      <div class="page-builder__items-container">
        <el-tabs class="page-builder__item-tabs" v-model="currentCate" type="card" stretch>
          <el-tab-pane label="基础组件" name="basic">
            <draggable tag="div" class="page-builder__items" :value="basicItems" v-bind="itemDragOptions">
              <div
                v-for="(item, index) in basicItems"
                :key="item.name"
                class="component"
                :class="item.count >= item.limit && 'is-disabled'"
                @click="onClickListItem(index)"
              >
                <component :is="camelCase(item.name) + 'Item'" :count="item.count"></component>
              </div>
            </draggable>
          </el-tab-pane>
          <el-tab-pane label="营销组件" name="marketing">
            <draggable tag="div" class="page-builder__items" :value="marketingItems" v-bind="itemDragOptions">
              <div
                v-for="(item, index) in marketingItems"
                :key="item.name"
                class="component"
                :class="item.count >= item.limit && 'is-disabled'"
                @click="onClickListItem(index)"
              >
                <component :is="camelCase(item.name) + 'Item'" :count="item.count"></component>
              </div>
            </draggable>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!--
        中间组件布局，共分为 3 层：
          1. 手机模型图片
          2. 模拟手机屏幕，组件布局区
          3. 模拟手机屏幕顶部和底部的遮挡物

        其中，布局区又分两层：
          1. 下层常规布局区，用于常规组件（没有浮动）从上到下布局
          2. 上层浮动布局区，用于浮动组件布局（如搜索、客服）
        上层常规布局区又分两部分：
          1. 顶部是浮动组件留下的占位组件，具体高度由组件自行决定
          2. 占位组件下面才是可拖放的常规组件布局区

        @TODO 实现 position: sticky; 效果
      -->
      <div class="page-builder__layout">
        <div class="phone">
          <!-- <div class="phone__background" :style="{backgroundColor: pageFormdata.backgroundColor}"></div> -->
          <!-- 手机模型图片 -->
          <img src="./assets/iPhoneX_model.png" alt="" class="phone__frame" />
          <!-- 模拟手机屏幕 -->
          <div class="phone__screen" @click="onClickScreen">
            <!-- 头部导航 -->
            <div class="layer layer--header" :class="currentTab === 'header' ? 'is-active' : ''">
              <div class="navbar">{{ navbarFormdata.title }}</div>
            </div>
            <!-- 常规布局区 -->
            <div class="layer layer--body" :class="currentTab === 'view-options' ? 'is-active' : ''">
              <div class="views-scroll" ref="views_scroll">
                <!-- <div class="views-scroll-content"></div> -->
                <!-- <div class="top-padding"></div> -->
                <!-- 浮层视图占位 -->
                <div class="views-shadow">
                  <template v-for="(view, index) in views">
                    <component
                      v-if="view.fixed"
                      :key="index"
                      :is="camelCase(view.name) + 'View'"
                      v-bind="view.data"
                      data-placeholder="true"
                    ></component>
                  </template>
                </div>
                <!-- 文档流视图 -->
                <draggable tag="div" class="views"
                  v-model="views"
                  v-bind="viewDragOptions"
                  @add="onAdd"
                  @end="onBlockDragEnd"
                >
                  <template v-for="(view, index) in views">
                    <div
                      v-if="!view.fixed"
                      :key="index"
                      class="view outline"
                      :class="{
                        'is-active': selected === index,
                        'is-error': view.errors && view.errors.length,
                      }"
                      @click.stop="onClickView(index)"
                    >
                      <component :is="camelCase(view.name) + 'View'" v-bind="view.data"></component>
                    </div>
                  </template>
                </draggable>
              </div>
            </div>
            <!-- 浮动布局区 -->
            <div class="layer layer--float" :class="currentTab === 'view-options' ? 'is-active' : ''">
              <!-- <div class="top-padding"></div> -->
              <template v-for="(view, index) in views">
                <component
                  v-if="view.fixed"
                  :key="index"
                  :is="camelCase(view.name) + 'View'"
                  v-bind="view.data"
                  :class="{
                    'is-active': selected === index,
                    'is-error': view.errors && view.errors.length,
                  }"
                  @click.stop="onClickView(index)"
                  data-fixed="true"
                ></component>
              </template>
            </div>
            <!-- 底部导航 -->
            <div class="layer layer--footer" :class="currentTab === 'footer' ? 'is-active' : ''">
              <TabbarView v-bind="tabbarFormdata"></TabbarView>
            </div>
            <!-- 遮罩，编辑顶部和底部导航时显示 -->
            <div :class="{ overlay: true, 'is-active': ['footer', 'header'].includes(currentTab) }"></div>
          </div>

          <!-- 遮罩，模拟手机顶部和底部 -->
          <div class="phone__cover phone__cover--top">
            <img src="./assets/iPhoneX_model.png" alt="" class="phone__frame" />
          </div>
          <div class="phone__cover phone__cover--bottom">
            <img src="./assets/iPhoneX_model.png" alt="" class="phone__frame" />
          </div>
        </div>
      </div>

      <!-- 右侧表单区 -->
      <div class="page-builder__options" :class="isViewsActive && 'is-views-active'">
        <el-tabs class="option-tabs" tab-position="left" v-model="currentTab">
          <el-tab-pane label="页面设置" name="page">
            <div class="options">
              <h4 class="options__title">页面设置</h4>
              <el-form class="options__form" :model="pageFormdata" :rules="pageRules" label-position="top">
                <el-form-item prop="path" :error="fieldError(pageErrors, 'path')" label="要装修的页面">
                  <el-select class="w-full" size="small" v-model="pageFormdata.path" :disabled="pageFormdata.id > 0">
                    <el-option
                      v-for="page in decoratablePages"
                      :key="page.path"
                      :label="page.name"
                      :value="page.path"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="name" :error="fieldError(pageErrors, 'name')" label="页面名称">
                  <el-input v-model="pageFormdata.name" size="small" placeholder="请输入页面名称"></el-input>
                </el-form-item>
                <el-form-item prop="description" label="页面描述">
                  <el-input
                    v-model="pageFormdata.description"
                    size="small"
                    type="textarea"
                    placeholder="请输入页面描述"
                  ></el-input>
                </el-form-item>
                <el-form-item label="背景颜色">
                  <div class="flex items-center w-full">
                    <span class="el-form-item__value">{{ pageFormdata.backgroundColor }}</span>
                    <el-button type="text" class="ml-auto" @click="pageFormdata.backgroundColor = '#ffffff'"
                      >重置</el-button
                    >
                    <el-color-picker
                      v-model="pageFormdata.backgroundColor"
                      class="ml-8px"
                      size="small"
                    ></el-color-picker>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="组件管理" name="views-management">
            <div class="view-sort-scroll" ref="view_sort_scroll">
              <draggable tag="div" class="view-sort-list" v-model="views" v-bind="viewSortDragOptions">
                <div
                  v-for="(view, index) in views"
                  :key="index"
                  class="view-sort-item"
                  :class="{
                    'is-active': selected === index,
                    'is-error': view.errors && view.errors.length,
                  }"
                  @click.stop="onClickSortableView(index)"
                >
                  <svg class="view-sort-item__drag" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><circle cx="15" cy="12" r="1.5" /><circle cx="15" cy="24" r="1.5" /><circle cx="21" cy="12" r="1.5" /><circle cx="21" cy="24" r="1.5" /><circle cx="21" cy="18" r="1.5" /><circle cx="15" cy="18" r="1.5" /><path fill="none" d="M0 0h36v36H0z" /></svg>
                  <span class="view-sort-item__index">{{ index + 1 }}</span>
                  <span class="view-sort-item__label" :title="view.label">{{ view.label }}</span>
                  <!-- 复制 -->
                  <div class="view-sort-item__btn view-sort-item__btn--copy" title="复制" @click="copyView(index)">
                    <svg class="view-sort-item__btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z" /><rect x="4" y="8" width="12" height="12" rx="1" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/><path d="M8 6V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 2" stroke="currentColor"/></svg>
                  </div>
                  <!-- 删除 -->
                  <div class="view-sort-item__btn view-sort-item__btn--delete" title="移除" @click="deleteView(index)">
                    <svg class="view-sort-item__btn-icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M7 7h18v22H7zM3 7h26M13 3h6M13 12v10M19 12v10" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke="currentColor" stroke-width="2px"/></svg>
                  </div>
                </div>
              </draggable>
            </div>
          </el-tab-pane>
          <el-tab-pane label="组件设置" name="view-options">
            <component
              v-if="selectedView"
              :is="camelCase(selectedView.name) + 'Form'"
              v-bind="selectedView.data"
              :errors="selectedView.errors"
              @validate="onFormValidate"
              @change="onChange"
              @fixed-change="handleFixedChange"
            ></component>
            <div v-else class="options">
              <span style="color: #a1a1a1; font-size: 14px">（在这里编辑选中的组件）</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="顶部导航" name="header">
            <NavbarForm v-bind="navbarFormdata" :errors="navbarErrors" @change="onNavbarChange"></NavbarForm>
          </el-tab-pane>
          <el-tab-pane label="底部导航" name="footer">
            <TabbarForm v-bind="tabbarFormdata" :errors="tabbarErrors" @change="onTabbarChange"></TabbarForm>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!--
      选择要装修的页面。
      装修数据必须绑定到移动端页面
    -->
    <!-- <el-dialog title="选择页面"
      :visible.sync="pathPromptVisible"
      width="480px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      destroy-on-close
      append-to-body
    >
      <el-form :model="pageFormdata"
        :rules="pageRules"
        label-position="top"
        @submit.native.prevent="noop"
        ref="path_prompt_form"
      >
        <el-form-item prop="path" label="请选择要装修的移动端页面：">
          <el-select style="width: 320px;" v-model="pageFormdata.path">
            <el-option v-for="page in decoratablePages" :key="page.path"
              :label="page.name"
              :value="page.path"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="flex justify-end">
        <el-button type="primary" @click="onConfirmPath">确定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import _ from 'lodash';
import draggable from 'vuedraggable';
import { getDecoratablePages, postSavePage, getPageData, getTabbarData } from './api';
import { clone, validate } from './components/utils';
import { getFormdata as getTabbarFormdata, getRules as getTabbarRules } from './components/tabbar/config';
import TabbarForm from './components/tabbar/Form.vue';
import TabbarView from './components/tabbar/View.vue';
import { getFormdata as getNavbarFormdata, getRules as getNavbarRules } from './components/navbar/config';
import NavbarForm from './components/navbar/Form.vue';
import { components, getItemExportList } from './components';
import SimpleBar from 'simplebar';
import ResizeObserver from 'resize-observer-polyfill';
import 'simplebar/dist/simplebar.css';
// import Schema from 'async-validator';

try {
  if (!window.ResizeObserver) {
    window.ResizeObserver = ResizeObserver;
  }
} catch {}

export default {
  name: 'PageBuilder',
  components: {
    draggable,
    TabbarForm,
    TabbarView,
    NavbarForm,
    ...components,
  },
  data() {
    return {
      /** 左侧列表项目 */
      items: [],
      /** 组件分类 = {basic:基础组件,marketing:营销组件} */
      currentCate: 'basic',
      /** 表单验证规则 */
      rulesMap: {},
      /** 视图，组件拖放到布局区后生成视图 */
      views: [],
      /** 当前选择的视图的序号 */
      selected: null,
      /** 组件拖放选项 */
      itemDragOptions: {
        group: {
          name: 'page-components',
          pull: 'clone',
          put: false,
        },
        filter: '.is-disabled',
        ghostClass: 'component--ghost',
        sort: false,
        clone: (item) => JSON.parse(JSON.stringify(item)),
      },
      /** 组件视图拖放选项 */
      viewDragOptions: {
        animation: 150,
        group: {
          name: 'page-components',
          pull: false,
          put: true,
        },
        ghostClass: 'view--ghost',
        sort: false,
        handle: '.view__btn--drag',
      },
      /** 组件排序列表拖放选项 */
      viewSortDragOptions: {
        animation: 150,
        // group: {
        //   name: "page-components",
        //   pull: false,
        //   put: false,
        // },
        sort: true,
      },
      /** 手机布局高度 */
      windowHeight: 420,
      /** 当前选项卡（右侧表单区）: views-management|view-options|header|footer|page */
      currentTab: 'page',

      /** 页面配置 */
      pageFormdata: {
        id: null,
        path: null,
        name: null,
        description: null,
        backgroundColor: '#ffffff',
      },
      pageRules: {
        path: [{ required: true, message: '请选择要装修的移动端页面', trigger: ['change'] }],
        name: [{ required: true, message: '请输入页面名称', trigger: ['change'] }],
      },
      pageErrors: [],

      /** 顶部导航配置 */
      navbarFormdata: getNavbarFormdata(),
      navbarRules: getNavbarRules(),
      navbarErrors: [],

      /** 底部导航配置 */
      tabbarFormdata: getTabbarFormdata(),
      tabbarRules: getTabbarRules(),
      tabbarErrors: [],

      /** 全屏是否可用 */
      fullscreenEnabled: false,
      /** 是否全屏 */
      isFullscreen: false,
      /** 显示 viewList 列表 */
      isViewsActive: true,
      // /** 选择页面路径弹窗 */
      // pathPromptVisible: false,
      /** 可装修页面 */
      decoratablePages: [],
    };
  },
  computed: {
    basicItems() {
      return this.items.filter((x) => x.cate === 'basic');
    },
    marketingItems() {
      return this.items.filter((x) => x.cate === 'marketing');
    },
    selectedView() {
      return this.views[this.selected] || null;
    },
  },
  created() {
    this.decoratablePages = getDecoratablePages();
    getItemExportList().then((itemExports) => {
      // console.log('metaList', metaList)
      // this.items = metaList.map((m, i) => {
      //   return Object.assign({order: i+1, fixed: false, count: 0}, m)
      // })
      itemExports.forEach((item, i) => {
        const meta = item.getMeta();
        if (meta.cate === 'basic' || meta.cate === 'marketing') {
          this.items.push(
            Object.assign(
              {
                order: i + 1,
                fixed: false,
                count: 0,
                errors: [],
              },
              meta,
            ),
          );
        }
        this.rulesMap[meta.name] = item.getRules();
      });
      this.rulesMap['page'] = this.pageRules;
      this.rulesMap['navbar'] = this.navbarRules;
      this.rulesMap['tabbar'] = this.tabbarRules;
    });
  },
  mounted() {
    this.initTabbar();
    // console.log('userProfileInfo', this.$store.getters.userProfileInfo)
    if (this.$route.query.id) {
      // 获取数据
      this.initWithPageDataId(this.$route.query.id);
    } else {
      // this.pathPromptVisible = true
    }
    // try {
    //   // console.log(this.$refs.scrollbar)
    //   // const rect = this.$refs.scrollbar.$el.getBoundingClientRect()
    //   const rect = this.$refs.views_scroll.getBoundingClientRect()
    //   this.windowHeight = Math.max(rect.height - 20, 420)
    // } catch (error) {
    //   console.warn(error)
    // }
    // 全屏设置
    try {
      if (document && document.fullscreenEnabled) {
        this.fullscreenEnabled = true;
        // document.onfullscreenchange = () => {
        //   this.isFullscreen = document.fullscreenElement !== null
        // }
        this.$refs.el_builder.onfullscreenchange = () => {
          this.isFullscreen = document.fullscreenElement !== null;
        };
      }
    } catch (err) {
      console.warn(err);
    }
    // 滚动条
    try {
      new SimpleBar(this.$refs.views_scroll);
    } catch (error) {
      console.warn(error);
    }
  },
  unmounted() {
    //
  },
  methods: {
    // /** 确认装修页面 */
    // onConfirmPath() {
    //   this.$refs.path_prompt_form.validate(valid => {
    //     if (valid) {
    //       this.pathPromptVisible = false
    //       // this.initWithPagePath(this.pageFormdata.path)
    //     }
    //   })
    // },
    /** 初始化 tabbar */
    initTabbar() {
      getTabbarData()
        .then((res) => {
          console.log('getTabbarData', res);
          if (res.element) {
            const tabbar = JSON.parse(res.element);
            Object.assign(this.tabbarFormdata, tabbar);
          }
        })
        .catch((err) => {
          console.warn(err);
        });
    },
    /** 根据 id 获取装修数据，并初始化 */
    initWithPageDataId(id) {
      getPageData(id)
        .then((res) => {
          console.log('getPageData', res);
          this.initBuilder(res);
        })
        .catch((err) => {
          console.warn(err);
          this.$message.error('获取装修数据失败');
          // this.pathPromptVisible = true
        });
    },
    // initWithPagePath(path) {
    //   const merId = this.$store.getters.userProfileInfo.merId
    //   getPageDataByPath(merId, path).then(res => {
    //     console.log('getPageDataByPath', res)
    //     this.initBuilder(res)
    //   }).catch(err => {
    //     console.warn(err)
    //     // this.$message.error('获取装修数据失败')
    //   })
    // },
    /** 初始化页面装修器 */
    initBuilder(data) {
      if (!data || !data.id) {
        return;
      }
      // 初始化页面数据
      this.pageFormdata.id = data.id;
      this.pageFormdata.path = data.path;
      this.pageFormdata.name = data.name;
      this.pageFormdata.description = data.pageDescribe;
      this.pageFormdata.backgroundColor = data.backGroundColor;

      // 初始化 navbar
      const navbar = data.modules.find((x) => x.name === 'navbar');
      if (navbar) {
        // this.navbarFormdata.title = navbar.title
        // this.navbarFormdata.backgroundColor = navbar.backgroundColor || '#ffffff'
        Object.assign(this.navbarFormdata, navbar.data);
      }

      // // 初始化 tabbar
      // const tabbar = data.navigation
      // if (tabbar) {
      //   Object.assign(this.tabbarFormdata, tabbar)
      // }

      // 其他组件
      const itemsMap = this.items.reduce((res, item) => {
        res[item.name] = item;
        return res;
      }, {});
      const views = data.modules
        .filter((x) => x.name !== 'navbar')
        .map((m) => {
          // 生成视图数据
          const view = Object.assign({}, itemsMap[m.name], m);
          // 统计组件使用数
          itemsMap[m.name].count += 1;
          return view;
        });
      this.views.splice(0, this.views.length, ...views);

      // // 初始化组件统计数据
      // this.items.forEach(item => {
      //   this.countItem(item)
      // })
    },
    /** 切换全屏 */
    toggleFullscreen() {
      try {
        // console.log('el_builder', this.$refs.el_builder)
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          this.$refs.el_builder.requestFullscreen();
        }
      } catch (error) {
        console.warn(error);
        this.isFullscreen = false;
      }
    },
    /** 统计组件使用 */
    countItem(item) {
      const name = item.name;
      const index = this.items.findIndex((x) => x.name === name);
      this.items[index].count = this.views.filter((x) => x.name === name).length;
    },
    /** 点击列表添加组件 */
    onClickListItem(index) {
      const item = this.currentCate === 'basic' ? this.basicItems[index] : this.marketingItems[index];
      if (item.count >= item.limit) {
        this.$message.warning('该组件已达到上限');
        return;
      }
      this.views.push(JSON.parse(JSON.stringify(item)));
      this.selected = this.views.length - 1;
      this.currentTab = 'view-options';

      this.countItem(item);
    },
    /** 组件拖放到布局区 */
    onAdd(evt) {
      // console.log('onAdd', {evt})
      // const com = this.components[evt.oldIndex]
      // this.views.splice(evt.newIndex, 0, JSON.parse(JSON.stringify(com)))
      this.selected = evt.newIndex;
      this.currentTab = 'view-options';

      const item = this.currentCate === 'basic' ? this.basicItems[evt.oldIndex] : this.marketingItems[evt.oldIndex];
      if (item) {
        this.countItem(item);
      }
    },
    /** 视图参数变化 */
    onChange(data) {
      const view = this.views[this.selected];
      if (view) {
        Object.assign(view.data, data);
      }
    },
    /** 响应 navbar 表单变化 */
    onNavbarChange(data) {
      Object.assign(this.navbarFormdata, data);
    },
    /** 响应 tabbar 表单变化 */
    onTabbarChange(data) {
      Object.assign(this.tabbarFormdata, data);
    },
    /** 删除视图 */
    removeBlock() {
      const index = this.selected;
      this.views.splice(index, 1);
      if (this.views.length < 1) {
        this.selected = null;
      } else {
        this.selected = Math.min(index, this.views.length - 1);
      }
    },
    /** 视图上移 */
    moveUpBlock() {
      const index = this.selected;
      if (index > 0) {
        const view = this.views.splice(index, 1)[0];
        this.views.splice(index - 1, 0, view);
        this.selected = index - 1;
      }
    },
    /** 视图下移 */
    moveDownBlock() {
      const index = this.selected;
      if (index < this.views.length - 1) {
        const view = this.views.splice(index, 1)[0];
        this.views.splice(index + 1, 0, view);
        this.selected = index + 1;
      }
    },
    /** 视图拖动结束 */
    onBlockDragEnd(evt) {
      this.selected = evt.newIndex;
    },
    /** 点击视图 */
    onClickView(index) {
      // console.log('onClickView', {index})
      this.selected = index;
      this.$refs.view_sort_scroll.scrollTo({
        top: index * 36,
        behavior: 'smooth',
      });
      this.currentTab = 'view-options';
    },
    /** 点击非视图部分 */
    onClickScreen() {
      // if (this.currentTab === 'body') {
      //   this.selected = null
      // }
    },
    /** 第一个字母转大写 */
    camelCase(str) {
      if (str.length) {
        str = str
          .split('-')
          .map((substr) => {
            if (substr) {
              return substr[0].toUpperCase() + substr.slice(1);
            } else {
              return '';
            }
          })
          .join('');
      }
      return str;
    },
    /** 复制视图 */
    copyView(index) {
      const view = this.views[index];
      if (view) {
        this.views.push(JSON.parse(JSON.stringify(view)));

        const item = this.items.find((x) => x.name === view.name);
        this.countItem(item);
      }
    },
    /** 删除视图 */
    deleteView(index) {
      const view = this.views.splice(index, 1)[0];
      const item = this.items.find((x) => x.name === view.name);
      this.countItem(item);
    },
    /** 点击排序视图 */
    onClickSortableView(index) {
      this.selected = index;
    },
    /** 响应浮动状态变化 */
    handleFixedChange(fixed) {
      // console.log('handleFixedChange', {view, fixed})
      // const view = this.views[this.selected]
      // view.fixed = fixed
      // this.$set(this.views, this.selected, Object.assign({}, view))
      if (this.views[this.selected]) {
        this.views[this.selected].fixed = fixed;
      }
    },
    /** 响应组件表单验证结果变化 */
    onFormValidate(errors) {
      // if (this.views[this.selected]) {
      //   this.views[this.selected].errors = errors;
      // }
      const view = this.views[this.selected]
      if (view) {
        const fields = errors.map(x => x.field)
        const viewErrors = view.errors.filter(x => fields.indexOf(x.field) < 0)
        errors = errors.filter(x => !!x.message)
        view.errors = viewErrors.concat(errors)
      }
    },
    /** 执行表单验证 */
    async validate() {
      const validations = [
        { name: 'page', label: '页面设置', data: this.pageFormdata },
        { name: 'navbar', label: '顶部导航', data: this.navbarFormdata },
        { name: 'tabbar', label: '底部导航', data: this.tabbarFormdata },
      ]
        .concat(this.views)
        .map(async (view) => {
          // let errors = []
          // try {
          //   const rules = this.rulesMap[view.name]
          //   if (rules && Object.keys(rules).length) {
          //     await new Schema(rules).validate(view.data)
          //   }
          // } catch (error) {
          //   if (error && Array.isArray(error.errors)) {
          //     errors = error.errors
          //   }
          // }
          // console.log('validate ' + view.name)
          const errors = await validate(view.data, this.rulesMap[view.name]);
          return { view, errors };
        });

      let error = null;
      const results = await Promise.all(validations);
      results.forEach((res) => {
        if (res.errors.length) {
          if (error === null) {
            error = `【${res.view.label}】${res.errors[0].message}`;
          }
          switch (res.view.name) {
            case 'page':
              this.pageErrors = res.errors;
              break;
            case 'navbar':
              this.navbarErrors = res.errors;
              break;
            case 'tabbar':
              this.tabbarErrors = res.errors;
              break;
            default:
              res.view.errors = res.errors;
              break;
          }
        }
      });

      return error;
    },
    /** 获取字段验证错误 */
    fieldError(errors, field) {
      if (Array.isArray(errors) && errors.length) {
        const error = errors.find((x) => x.field === field);
        if (error) {
          return error.message;
        }
      }
      return null;
    },
    /** 生成提交数据 */
    generateSubmitData(status) {
      // 组件
      const modules = this.views.map((view, index) => {
        const { name, label, count, limit, fixed } = view;
        return {
          name,
          label,
          count,
          limit,
          fixed,
          order: index + 1,
          data: clone(view.data),
        };
      });
      // navbar
      modules.push({
        name: 'navbar',
        label: '顶部导航',
        count: 1,
        limit: 1,
        fixed: false,
        order: modules.length + 1,
        data: clone(this.navbarFormdata),
      });
      // 页面
      const { id, path, name, description, backgroundColor } = this.pageFormdata;

      return {
        id,
        path,
        name,
        pageDescribe: description,
        backGroundColor: backgroundColor,
        status,
        navigation: clone(this.tabbarFormdata),
        modules,
      };
    },
    /** 返回上一页 */
    navback() {
      const route = this.$route;
      this.$store.dispatch('tagsView/delView', route).then(({ visitedViews }) => {
        const lastView = visitedViews.slice(-1)[0];
        if (lastView) {
          this.$router.push(lastView.fullPath);
        } else {
          this.$router.push('/maintain/page-builder');
        }
      });
    },
    /** 保存草稿 */
    async save(publish) {
      const loading = this.$loading({ lock: true });
      try {
        const status = publish ? 2 : 0;
        const data = this.generateSubmitData(status);
        await postSavePage(data);
        // console.log(res)
        loading.close();
        this.$message.success(publish ? '发布成功' : '保存草稿成功');
        this.navback();
      } catch (error) {
        console.warn(error);
        loading.close();
      }
    },
    /** 发布 */
    async publish() {
      const error = await this.validate();
      if (error) {
        this.$message.warning(error);
        return;
      }
      this.save(true);
    },
    /** 什么都不做 */
    noop() {},
  },
};
</script>

<style lang="scss" src="./assets/base.scss"></style>
<style lang="scss" src="./assets/utils.scss" scoped></style>
<style lang="scss" src="./assets/view-options.scss" scoped></style>
<style lang="scss" scoped>
// 模拟器外框
// $phone-width: 372px;
$phone-width: 406px;
// $phone-height: 750px;
$phone-height: 820px;

// // 模拟器背景色
// $phone-background-width: 388px;
// $phone-background-height: 812px;
// $phone-background-top: 4px;
// $phone-background-left: 9px;
// $phone-background-round: 52px;

// 模拟器屏幕
// $phone-screen-width: 330px;
$phone-screen-width: 375px;
// $phone-screen-height: 712px;
$phone-screen-height: 800px;
$phone-screen-round: 50px;
$phone-screen-top: 9px;
$phone-screen-left: 15px;

$phone-top-cover-height: 44px;
$phone-bottom-cover-height: 34px;

// 模拟器状态栏高度
$phone-statusbar-height: 30px;
// 模拟器导航栏高度
$phone-navbar-height: 48px;
// 安全区域高度
$phone-safearea-height: 24px;
// 底部导航高度
$phone-tabbar-height: 50px;

// 内容高度
// $phone-content-height: $phone-screen-height -
//   ($phone-statusbar-height + $phone-navbar-height) -
//   ($phone-safearea-height + $phone-tabbar-height) - 4px;

// 顶部工具栏
$z-index-header: 1;
// 模拟器
$z-index-phone-frame: 0;
// 模拟器屏幕
$z-index-phone-screen: 1;
// 内容
$z-index-phone-layer: 2;
// 浮出的内容
$z-index-phone-layer-active: 4;
// 内容浮出遮罩
$z-index-phone-mask: 3;
// 模拟器顶部相机
$z-index-phone-notch: 5;

.page-builder-wrapper {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  background: #f5f5f5;

  &.is-fullscreen {
    ::v-deep .el-dialog__wrapper {
      background: rgba(0, 0, 0, 0.5);
    }
  }
}

.page-builder {
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  flex: none;
  width: 100%;
  height: 880px;
  padding: 60px 0 0;
  box-sizing: border-box;
  position: relative;

  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    width: 100%;
    height: 48px;
    padding: 0 16px;
    box-sizing: border-box;
    background: #ffffff;

    position: absolute;
    top: 0;
    left: 0;
    z-index: $z-index-header;
  }

  &__items-container {
    flex: none;
    width: 204px;
    box-sizing: border-box;
    background: #ffffff;
    position: relative;

    ::v-deep .el-tabs {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      width: 100%;
      height: 100%;

      position: absolute;
      top: 0;
      left: 0;

      .el-tabs__header {
        flex: none;
        margin: 0;
      }

      .el-tabs__content {
        height: auto;
        min-height: 0;
        flex: 1;
        position: relative;

        .el-tab-pane {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 8px 6px;
    box-sizing: border-box;

    overflow: auto;
  }

  &__layout {
    display: flex;
    justify-content: center;
    flex: 1 0 auto;
    padding: 0 40px;
    height: 100%;
    overflow-y: auto;
    position: relative;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  &__options {
    flex: none;
    width: 456px;
    position: relative;

    ::v-deep .el-tabs__content {
      height: 100%;
      background: #ffffff;

      .el-tab-pane {
        height: 100%;
      }
    }
  }
}

.page-builder-wrapper.is-fullscreen .page-builder {
  height: 100%;
}

.component {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: none;
  width: 50%;
  padding: 8px 6px;
  box-sizing: border-box;

  &--ghost,
  &:hover {
    outline: dashed #5151f2;
    outline-offset: -2px;
    opacity: 0.95;
  }

  &__icon {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    background: #f1f1f1;
  }

  &__name {
    font-size: 14px;
    margin-top: 12px;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.phone {
  width: $phone-width;
  height: $phone-height;
  border-radius: 66px;
  background: transparent;

  position: relative;

  // &__background {
  //   display: block;
  //   width: $phone-background-width;
  //   height: $phone-background-height;
  //   border-radius: $phone-background-round;
  //   background: #ffffff;

  //   position: absolute;
  //   top: $phone-background-top;
  //   left: $phone-background-left;
  //   z-index: $z-index-phone-frame;
  // }

  &__frame {
    display: block;
    width: $phone-width;
    height: $phone-height;

    position: absolute;
    top: 0;
    left: 0;
    z-index: $z-index-phone-frame;
  }

  &__cover--top,
  &__cover--bottom {
    width: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    z-index: $z-index-phone-notch;
  }

  &__cover--top {
    height: $phone-top-cover-height;
    top: 0;
  }

  &__cover--bottom {
    height: $phone-bottom-cover-height;
    bottom: 0;

    img.phone__frame {
      top: auto;
      bottom: 0;
    }
  }

  &__screen {
    display: block;
    width: $phone-screen-width;
    height: $phone-screen-height;
    /* padding-top: 28px; */
    border-radius: $phone-screen-round;
    box-sizing: border-box;
    overflow: hidden;
    background: var(--bg-color);

    position: absolute;
    top: $phone-screen-top;
    left: $phone-screen-left;
    z-index: $z-index-phone-screen;
  }
}

.layer {
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  left: 0;

  &--header.is-active,
  &--footer.is-active {
    z-index: $z-index-phone-layer-active;
  }

  &--header {
    height: $phone-statusbar-height + $phone-navbar-height;
    padding-top: $phone-navbar-height;
    background: #ffffff;

    top: 0;
    z-index: $z-index-phone-layer;
  }

  &--body {
    height: 100%;
    padding-top: $phone-statusbar-height + $phone-navbar-height;
    padding-bottom: $phone-safearea-height + $phone-tabbar-height;

    top: 0;
    z-index: $z-index-phone-layer;
  }

  &--float {
    pointer-events: none;
    // background: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: auto;
    padding: 0;
    top: $phone-statusbar-height + $phone-navbar-height;
    bottom: $phone-safearea-height + $phone-tabbar-height;
    left: 0;
    right: 0;
    z-index: $z-index-phone-layer;
  }

  &--footer {
    height: $phone-safearea-height + $phone-tabbar-height;
    padding-bottom: $phone-safearea-height;
    background: #ffffff;

    bottom: 0;
    z-index: $z-index-phone-layer;
  }

  .navbar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #e1e1e1;
  }

  .tabbar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-top: 1px solid #e1e1e1;
  }

  ::v-deep .el-scrollbar {
    width: 100%;
    height: 100%;
  }

  ::v-deep .el-scrollbar__wrap {
    overflow-x: visible;
  }
}

.overlay {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;

  transition: all 200ms;

  &.is-active {
    opacity: 1;
    z-index: $z-index-phone-mask;
  }
}

.views-scroll {
  width: 100%;
  height: 100%;
}

.top-padding {
  display: block;
  width: 100%;
  height: 2px;
  // background: #ffffff;
  background: var(--bg-color);
}

.views-shadow {
  width: 100%;
  padding: 0;
  margin: 0;
}

.views {
  width: 100%;
  min-height: 480px;
  // padding: 2px 0 0;
  box-sizing: border-box;

  .component {
    width: 100%;
    padding: 8px 16px;

    &.view--ghost {
      outline: 2px dashed #5151f2;
      // outline-offset: -4px;
      opacity: 0.95;
    }
  }
}

.view {
  min-height: 20px;
  position: relative;
  z-index: 0;

  &__icon {
    flex: none;
    width: 40px;
    height: 40px;
    background: #f1f1f1;
  }

  &__name {
    font-size: 14px;
    margin-left: 12px;
  }

  &.is-active {
    min-height: 24px;
    // outline: 2px dashed #5151f2;
    // outline-offset: -3px;

    z-index: 1;
  }

  // &.is-placeholder {
  //   display: none;
  // }

  &--ghost {
    outline: 2px dashed #5151f2 !important;
    outline-offset: -2px;
    // opacity: 0.6;
  }

  &__header {
    width: 100%;
    height: 0;
    overflow: hidden;

    opacity: 0;
    transition: all 200ms;
    position: relative;
    z-index: 10;
  }

  &.is-active &__header {
    height: 36px;
    opacity: 1;
  }

  &__btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 61.8%;
    height: 32px;
    padding: 0 4px;
    border-radius: 16px;
    box-sizing: border-box;
    background: #e2e8f0;

    position: absolute;
    left: 50%;
    top: 2px;
    transform: translateX(-50%);
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    color: #111827;
    background: #ffffff;
    cursor: pointer;
    margin-left: 6px;

    &--close {
      margin-left: 0;
      margin-right: auto;
    }

    &:hover {
      color: #ffffff;
      background-color: #2563eb;
    }

    &--close:hover {
      background-color: #d60000;
    }

    &-icon {
      flex: none;
      width: 12px;
      height: 12px;
      stroke-width: 2;
    }
  }
}

::v-deep .outline {
  position: relative;

  &.is-active::after,
  &.is-error::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: transparent;

    outline: 2px dashed #5151f2;
    outline-offset: -3px;

    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
  }

  &.is-error::after {
    outline: 2px dashed #ff5151;
  }
}

.view-sort-scroll {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
}

.view-sort-item {
  display: flex;
  align-items: center;

  width: 100%;
  height: 36px;
  padding: 0 6px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-sizing: border-box;

  font-size: 13px;
  cursor: move;

  margin-bottom: 4px;

  &:hover {
    background-color: #f7f7f7;
  }

  &.is-active {
    background-color: #e6efff;
  }

  &.is-error {
    border-color: #ff5151;
  }

  &__drag {
    flex: none;
    width: 24px;
    height: 24px;
    color: #999;
  }

  &__label {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    margin-left: 4px;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 24px;
    height: 24px;
    border-radius: 2px;
    cursor: pointer;
    opacity: 0;
    transition: all 150ms;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &-icon {
      flex: none;
      width: 18px;
      height: 18px;
      color: #333;
    }
  }

  &:hover .view-sort-item__btn {
    opacity: 1;
  }
}

.option-tabs {
  width: 100%;
  height: 100%;
}
</style>
./components/navbar/navbar ./components/tabbar/tabbar
