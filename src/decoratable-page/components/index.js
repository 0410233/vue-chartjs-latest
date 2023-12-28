export const components = {
  CaptionView: () => import('./caption/View.vue'),
  SeparatorView: () => import('./separator/View.vue'),
  NavigationView: () => import('./navigation/View.vue'),
  NoticeView: () => import('./notice/View.vue'),
  PictureadView: () => import('./PictureadView.vue'),
  VideoView: () => import('./VideoView.vue'),
  RichtextView: () => import('./richtext/View.vue'),
  GoodsListView: () => import('./goods-list/View.vue'),
  GoodsCategoryView: () => import('./goods-category/View.vue'),
  ShopView: () => import('./shop/View.vue'),
  CouponView: () => import('./CouponView.vue'),
  // todo 团购暂时可以不上
  // GroupBuyingView: () => import('./GroupBuyingView.vue'),
  CustomerServiceView: () => import('./customer-service/View.vue'),
  SearchView: () => import('./search/View.vue'),
  GroupBookingView: () => import('./GroupBookingView.vue'),
  InstantDeathView: () => import('./InstantDeathView.vue'),
}

// const configImports = [
//   import('./caption/config'),
//   import('./navigation/config'),
//   import('./goods-list/config'),
//   import('./goods-category/config'),
//   import('./richtext/config'),
//   import('./search/config'),
//   import('./separator/config'),
//   import('./video'),
//   import('./notice/config'),
//   import('./picturead'),
//   import('./customer-service/config'),
//   import('./shop/config'),

//   import('./coupon'),
//   // todo 团购暂时可以不上
//   // import('./group-buying'),
//   import('./group-booking'),
//   import('./instant-death')
// ]

// export async function getConfigExports() {
//   const results = await Promise.all(configImports)
//   return results
// }
