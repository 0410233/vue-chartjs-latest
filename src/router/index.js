import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/amap',
    name: 'amap',
    component: () => import(/* webpackChunkName: "about" */ '../views/AmapView.vue')
  },
  {
    path: '/app-page-designer',
    name: 'app-page-designer',
    component: () => import(/* webpackChunkName: "about" */ '../views/PageBuilderView.vue')
  },
  {
    path: '/chart/line',
    name: 'line-chart',
    component: () => import(/* webpackChunkName: "chart" */ '../views/LineChartExample.vue')
  }, {
    path: '/chart/bar',
    name: 'bar-chart',
    component: () => import(/* webpackChunkName: "chart" */ '../views/BarChartExample.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
