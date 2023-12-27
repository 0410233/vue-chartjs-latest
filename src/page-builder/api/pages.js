
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
    path: 'pages/merchant/home/index',
    name: '店铺首页',
    decoratable: true,
  },
  {
    path: 'pages/merchant/detail/index',
    name: '店铺详情',
    decoratable: true,
  },
  {
    path: 'pages/merchant/category/index',
    name: '商品分类',
    decoratable: true,
  },
  {
    path: 'pages/merchant/other1',
    name: '其他1',
    decoratable: true,
  },
  {
    path: 'pages/merchant/other2',
    name: '其他2',
    decoratable: true,
  },
  // {
  //   path: 'pages/index/index',
  //   name: '首页',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/webview/index',
  //   name: '',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods_cate/index',
  //   name: '商品分类',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/discover_index/index',
  //   name: '逛逛',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/order_addcart/order_addcart',
  //   name: '购物车',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/user/index',
  //   name: '个人中心',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/web_page/index',
  //   name: '',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/user_info/index',
  //   name: '个人资料',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/user_setting/index',
  //   name: '个人信息',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/user_get_coupon/index',
  //   name: '领取优惠券',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/user_money/index',
  //   name: '我的账户',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/user_bill/index',
  //   name: '账单明细',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/user_spread_user/index',
  //   name: '我的推广',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/user_spread_code/index',
  //   name: '分销海报',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/user_spread_money/index',
  //   name: '佣金记录',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/user_transferOut/index',
  //   name: 'transferOut',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/user_phone/index',
  //   name: '修改手机号',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/user_payment/index',
  //   name: '余额充值',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/user_spread_brokerage_out/index',
  //   name: '佣金转入',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/user_pwd_edit/index',
  //   name: '修改密码',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/promoter-list/index',
  //   name: '推广人列表',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/promoter-order/index',
  //   name: '推广人订单',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/promoter_rank/index',
  //   name: '推广人排行',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/commission_rank/index',
  //   name: '佣金排行',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/login/index',
  //   name: '登录',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/wechat_login/index',
  //   name: '账户登录',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/app_login/index',
  //   name: '绑定手机号',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/app_update/app_update',
  //   name: '检查更新',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/settled/index',
  //   name: '商户入驻',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/users/user_sgin_info/index',
  //   name: '签到说明',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/merchant/application_record/index',
  //   name: '申请记录',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/merchant/user_integral/index',
  //   name: '积分详情',
  //   decoratable: false,
  // },
  {
    path: 'pages/merchant/user_coupon/index',
    name: '我的优惠券',
    decoratable: false,
  },
  // {
  //   path: 'pages/merchant/user_sgin/index',
  //   name: '签到',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/merchant/user_sgin_list/index',
  //   name: '签到记录',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/merchant/merchant_street/index',
  //   name: '店铺街',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/goods_details/index',
  //   name: '商品详情',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/Preferred/index',
  //   name: '城运优选',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/Preferred/pickup',
  //   name: '自提点列表',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/Preferred/details',
  //   name: '城运优选商品详情',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/GroupList/index',
  //   name: '团购列表',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/goods_list/index',
  //   name: '商品列表',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/coupon_goods_list/index',
  //   name: '优惠券商品列表',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/goods_search/index',
  //   name: '搜索商品',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/news_list/index',
  //   name: '资讯',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/news_details/index',
  //   name: '资讯详情',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/browsing_history/index',
  //   name: '浏览记录',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/order_list/index',
  //   name: '我的订单',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/order_logistics/index',
  //   name: '查看物流',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/order_confirm/index',
  //   name: '订单详情',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/order_confirm/pickup',
  //   name: '自提点选择',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/order_payment/index',
  //   name: '支付订单',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/refund_details/index',
  //   name: '退款订单',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/order_pay_status/index',
  //   name: '支付成功',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/order_details/index',
  //   name: '订单详情',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/user_return_list/index',
  //   name: '退货列表',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/goods_return/index',
  //   name: '申请退货',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/goods_comment_con/index',
  //   name: '商品评价',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/evaluation_list/index',
  //   name: '评价列表',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/goods_comment_list/index',
  //   name: '商品评分',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/goods_logistics/index',
  //   name: '物流信息',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/agreement_rules/index',
  //   name: '隐私协议',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/user_goods_collection/index',
  //   name: '收藏商品',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/user_merchant_collection/index',
  //   name: '收藏店铺',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/alipay_return/alipay_return',
  //   name: '',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/alipay_invoke/index',
  //   name: '',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/agreement_info/index',
  //   name: '',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/user_grade/index',
  //   name: '我的等级',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/exp_record/index',
  //   name: '经验值明细',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/goods/level_rule/index',
  //   name: '等级规则说明',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/address/user_address_list/index',
  //   name: '地址管理',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/address/user_address/index',
  //   name: '添加地址',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/activity/goods_seckill/index',
  //   name: '秒杀列表',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/activity/liveBroadcast/index',
  //   name: '直播列表',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/discover/discover_search_list/index',
  //   name: '搜索页面',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/discover/discover_recommend/index',
  //   name: '为你推荐',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/discover/discover_release/index',
  //   name: '内容发布',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/discover/discover_video/routineVideo/index',
  //   name: '社区短视频',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/discover/discover_video/appVideo/index',
  //   name: '社区短视频',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/discover/discover_user/index',
  //   name: '个人主页',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/discover/discover_follow/index',
  //   name: '我的关注',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/discover/discover_note_topic/index',
  //   name: '话题',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/discover/discover_details/index',
  //   name: '内容详情',
  //   decoratable: false,
  // },
  // {
  //   path: 'pages/auth/index',
  //   name: 'CRMEB',
  //   decoratable: false,
  // },
]
