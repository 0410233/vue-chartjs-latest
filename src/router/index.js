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
    path: '/page-designer',
    name: 'page-designer',
    component: () => import(/* webpackChunkName: "about" */ '../views/PageDesignerView.vue')
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import(/* webpackChunkName: "about" */ '../views/ChartView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
