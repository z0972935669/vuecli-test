import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // 輸入路徑不是定義的path
    path: '*',
    // 導向至home
    redirect: 'home'
  },
  {
    path: '/',
    name: 'User',
    // 載入元件樣式
    component: () => import('@/views/user/User'),
    redirect: 'home',
    children: [
      {
        // 首頁
        path: 'home',
        name: 'Home',
        component: () => import('@/views/user/Home')
      },
      {
        // 商品頁
        path: 'shop',
        name: 'Shop',
        component: () => import('@/views/user/Shop'),
        redirect: { name: 'All' },
        children: [
          {
            // 全部商品
            path: 'all',
            name: 'All',
            component: () => import('@/views/user/Shop')
          },
          {
            // 護具分頁
            path: 'protective',
            name: 'Protective',
            component: () => import('@/views/user/Shop')
          },
          {
            // 乳清分頁
            path: 'whey',
            name: 'Whey',
            component: () => import('@/views/user/Shop')
          },
          {
            // 最愛分頁
            path: 'like',
            name: 'Like',
            component: () => import('@/views/user/Shop')
          }
        ]
      },
      {
        // 搜尋商品
        path: 'search',
        name: 'ShopSearch',
        component: () => import('@/views/user/Shop'),
        redirect: { name: 'All' },
        children: [
          {
            // 商品id
            path: ':id',
            component: () => import('@/views/user/Shop')
          }
        ]
      },
      {
        // 商品內頁
        path: 'shop_inside',
        name: 'ShopInside',
        component: () => import('@/views/user/ShopInside'),
        children: [
          {
            path: ':itemId',
            component: () => import('@/views/user/ShopInside')
          }
        ]
      },
      {
        // 抽獎頁
        path: 'discount',
        name: 'Discount',
        component: () => import('@/views/user/Discount')
      },
      {
        path: 'discount/turn',
        name: 'Turn',
        component: () => import('@/views/user/Turn')
      },
      {
        // 訊息頁
        path: 'news',
        name: 'News',
        component: () => import('@/views/user/News')
      },
      {
        // 確認商品
        path: 'checkProduct',
        name: 'CheckProduct',
        component: () => import('@/views/user/CheckProduct')
      },
      {
        // 確認資訊
        path: 'checkInfo',
        name: 'CheckInfo',
        component: () => import('@/views/user/CheckInfo')
      },
      {
        // 確認結帳頁
        path: 'confirm/:orderId',
        name: 'Confirm',
        component: () => import('@/views/user/Confirm')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/Admin'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/admin/Products'),
        // 需要驗證，確保進入頁面需要驗正
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/admin/Orders'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('@/views/admin/Coupons'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/views/admin/Admin'),
    children: [
      {
        // 一般頁面不需驗正
        path: 'customer_order',
        name: 'CustomerOrder',
        component: () => import('@/views/admin/CustomerOrder')
      },
      {
        // 結帳確認頁
        path: 'customer_checkout/:orderId',
        name: 'CustomerCheckout',
        component: () => import('@/views/admin/CustomerCheckout')
      }
    ]
  }
]

// http://localhost:8080/home/#
// mode: 'history': 變更路由，把#消除
// URL: https://stackoverflow.com/questions/57913630/vuejs-routing-automatically-sets-a-in-url
const router = new VueRouter({
  mode: 'history',
  routes
})
// 解除路由報錯
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
