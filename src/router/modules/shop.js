import Layout from '@/layout'
// 广告模块

const shop = {
  path: '/shop',
  component: Layout,
  redirect: 'noRedirect',
  name: 'shop',
  meta: {
    title: '商家设置',
    icon: 'navigation'
  },
  children: [
    {
      path: 'shopList',
      component: () => import('@/views/shop/shopList.vue'),
      name: 'shopList',
      meta: { title: '商家列表', noCache: true }
    },
    {
      path: 'shopDetail',
      component: () => import('@/views/shop/shopDetail.vue'),
      name: 'shopDetail',
      meta: { title: '商家设置', noCache: true },
      hidden: true
    },
    {
      path: 'shopLogin',
      component: () => import('@/views/shop/shopLogin.vue'),
      name: 'shopLogin',
      meta: { title: '商家账号设置', noCache: true },
      hidden: true
    }
  ]
}
export default shop
