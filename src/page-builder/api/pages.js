
function transformPages(json) {
  const pages = getPages(json)
  logPages(pages)

  function getPage(path, page) {
    return {
      path: path + page.path,
      name: (page.style && page.style.navigationBarTitleText) || '',
    }
  }

  function getSubpages(subpages) {
    const root = subpages.root + '/'
    const results = []
    subpages.pages.forEach(x => {
      results.push(getPage(root, x))
    })
    return results
  }

  function getPages(json) {
    const results = []
    json.pages.forEach(x => {
      results.push(getPage('', x))
    })
    json.subPackages.forEach(x => {
      results.push(...getSubpages(x))
    })
    return results
  }

  function logPages(pages) {
    let result = ''
    pages.forEach(x => {
      result += `
    {
      path: '${x.path}',
      name: '${x.name}',
    },`
    })
    console.log(result)
  }
}

export const pages = [
  {
    path: 'pages/index/index',
    name: '首页',
  },
  // {
  //   path: 'pages/webview/index',
  //   name: '',
  // },
  {
    path: 'pages/goods_cate/index',
    name: '商品分类',
  },
  {
    path: 'pages/discover_index/index',
    name: '逛逛',
  },
  {
    path: 'pages/order_addcart/order_addcart',
    name: '购物车',
  },
  {
    path: 'pages/user/index',
    name: '个人中心',
  },
  // {
  //   path: 'pages/users/web_page/index',
  //   name: '',
  // },
  {
    path: 'pages/users/user_info/index',
    name: '个人资料',
  },
  {
    path: 'pages/users/user_setting/index',
    name: '个人信息',
  },
  {
    path: 'pages/users/user_get_coupon/index',
    name: '领取优惠券',
  },
  {
    path: 'pages/users/user_money/index',
    name: '我的账户',
  },
  {
    path: 'pages/users/user_bill/index',
    name: '账单明细',
  },
  {
    path: 'pages/users/user_spread_user/index',
    name: '我的推广',
  },
  {
    path: 'pages/users/user_spread_code/index',
    name: '分销海报',
  },
  {
    path: 'pages/users/user_spread_money/index',
    name: '佣金记录',
  },
  // {
  //   path: 'pages/users/user_transferOut/index',
  //   name: 'transferOut',
  // },
  {
    path: 'pages/users/user_phone/index',
    name: '修改手机号',
  },
  {
    path: 'pages/users/user_payment/index',
    name: '余额充值',
  },
  {
    path: 'pages/users/user_spread_brokerage_out/index',
    name: '佣金转入',
  },
  {
    path: 'pages/users/user_pwd_edit/index',
    name: '修改密码',
  },
  {
    path: 'pages/users/promoter-list/index',
    name: '推广人列表',
  },
  {
    path: 'pages/users/promoter-order/index',
    name: '推广人订单',
  },
  {
    path: 'pages/users/promoter_rank/index',
    name: '推广人排行',
  },
  {
    path: 'pages/users/commission_rank/index',
    name: '佣金排行',
  },
  {
    path: 'pages/users/login/index',
    name: '登录',
  },
  {
    path: 'pages/users/wechat_login/index',
    name: '账户登录',
  },
  {
    path: 'pages/users/app_login/index',
    name: '绑定手机号',
  },
  {
    path: 'pages/users/app_update/app_update',
    name: '检查更新',
  },
  // {
  //   path: 'pages/users/settled/index',
  //   name: '商户入驻',
  // },
  {
    path: 'pages/users/user_sgin_info/index',
    name: '签到说明',
  },
  {
    path: 'pages/merchant/home/index',
    name: '商户首页',
  },
  {
    path: 'pages/merchant/application_record/index',
    name: '申请记录',
  },
  {
    path: 'pages/merchant/detail/index',
    name: '商户详情',
  },
  {
    path: 'pages/merchant/user_integral/index',
    name: '积分详情',
  },
  {
    path: 'pages/merchant/user_coupon/index',
    name: '我的优惠券',
  },
  {
    path: 'pages/merchant/user_sgin/index',
    name: '签到',
  },
  {
    path: 'pages/merchant/user_sgin_list/index',
    name: '签到记录',
  },
  {
    path: 'pages/merchant/merchant_street/index',
    name: '店铺街',
  },
  // {
  //   path: 'pages/goods/goods_details/index',
  //   name: '商品详情',
  // },
  {
    path: 'pages/goods/Preferred/index',
    name: '城运优选',
  },
  {
    path: 'pages/goods/Preferred/pickup',
    name: '自提点列表',
  },
  // {
  //   path: 'pages/goods/Preferred/details',
  //   name: '城运优选商品详情',
  // },
  {
    path: 'pages/goods/GroupList/index',
    name: '团购列表',
  },
  {
    path: 'pages/goods/goods_list/index',
    name: '商品列表',
  },
  {
    path: 'pages/goods/coupon_goods_list/index',
    name: '优惠券商品列表',
  },
  {
    path: 'pages/goods/goods_search/index',
    name: '搜索商品',
  },
  {
    path: 'pages/goods/news_list/index',
    name: '资讯',
  },
  // {
  //   path: 'pages/goods/news_details/index',
  //   name: '资讯详情',
  // },
  {
    path: 'pages/goods/browsing_history/index',
    name: '浏览记录',
  },
  {
    path: 'pages/goods/order_list/index',
    name: '我的订单',
  },
  // {
  //   path: 'pages/goods/order_logistics/index',
  //   name: '查看物流',
  // },
  // {
  //   path: 'pages/goods/order_confirm/index',
  //   name: '订单详情',
  // },
  // {
  //   path: 'pages/goods/order_confirm/pickup',
  //   name: '自提点选择',
  // },
  {
    path: 'pages/goods/order_payment/index',
    name: '支付订单',
  },
  {
    path: 'pages/goods/refund_details/index',
    name: '退款订单',
  },
  // {
  //   path: 'pages/goods/order_pay_status/index',
  //   name: '支付成功',
  // },
  // {
  //   path: 'pages/goods/order_details/index',
  //   name: '订单详情',
  // },
  {
    path: 'pages/goods/user_return_list/index',
    name: '退货列表',
  },
  // {
  //   path: 'pages/goods/goods_return/index',
  //   name: '申请退货',
  // },
  // {
  //   path: 'pages/goods/goods_comment_con/index',
  //   name: '商品评价',
  // },
  // {
  //   path: 'pages/goods/evaluation_list/index',
  //   name: '评价列表',
  // },
  // {
  //   path: 'pages/goods/goods_comment_list/index',
  //   name: '商品评分',
  // },
  // {
  //   path: 'pages/goods/goods_logistics/index',
  //   name: '物流信息',
  // },
  // {
  //   path: 'pages/goods/agreement_rules/index',
  //   name: '隐私协议',
  // },
  {
    path: 'pages/goods/user_goods_collection/index',
    name: '收藏商品',
  },
  {
    path: 'pages/goods/user_merchant_collection/index',
    name: '收藏店铺',
  },
  // {
  //   path: 'pages/goods/alipay_return/alipay_return',
  //   name: '',
  // },
  // {
  //   path: 'pages/goods/alipay_invoke/index',
  //   name: '',
  // },
  // {
  //   path: 'pages/goods/agreement_info/index',
  //   name: '',
  // },
  {
    path: 'pages/goods/user_grade/index',
    name: '我的等级',
  },
  {
    path: 'pages/goods/exp_record/index',
    name: '经验值明细',
  },
  {
    path: 'pages/goods/level_rule/index',
    name: '等级规则说明',
  },
  {
    path: 'pages/address/user_address_list/index',
    name: '地址管理',
  },
  {
    path: 'pages/address/user_address/index',
    name: '添加地址',
  },
  {
    path: 'pages/activity/goods_seckill/index',
    name: '秒杀列表',
  },
  {
    path: 'pages/activity/liveBroadcast/index',
    name: '直播列表',
  },
  {
    path: 'pages/discover/discover_search_list/index',
    name: '搜索页面',
  },
  {
    path: 'pages/discover/discover_recommend/index',
    name: '为你推荐',
  },
  {
    path: 'pages/discover/discover_release/index',
    name: '内容发布',
  },
  {
    path: 'pages/discover/discover_video/routineVideo/index',
    name: '社区短视频',
  },
  {
    path: 'pages/discover/discover_video/appVideo/index',
    name: '社区短视频',
  },
  {
    path: 'pages/discover/discover_user/index',
    name: '个人主页',
  },
  {
    path: 'pages/discover/discover_follow/index',
    name: '我的关注',
  },
  {
    path: 'pages/discover/discover_note_topic/index',
    name: '话题',
  },
  // {
  //   path: 'pages/discover/discover_details/index',
  //   name: '内容详情',
  // },
  // {
  //   path: 'pages/auth/index',
  //   name: 'CRMEB',
  // },
]
