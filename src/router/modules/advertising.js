import Layout from '@/layout'
// 广告模块

const Advertising = {
  path: '/advertising',
  component: Layout,
  redirect: 'noRedirect',
  name: 'advertising',
  meta: {
    title: '广告',
    icon: 'ad'
  },
  children: [
    {
      path: 'centralSection',
      component: () => import('@/views/advertising/advertisingCentral/centralSection.vue'),
      name: 'centralSection',
      meta: { title: '广告添加', noCache: true }
    },
    {
      path: 'addpicture',
      name: 'addpicture',
      component: () => import('@/views/advertising/advertisingCentral/addpicture'),
      meta: { title: 'benner图片编辑' },
      hidden: true
    },
    {
      path: 'editHotad',
      component: () => import('@/views/advertising/HotAd/editHotad.vue'),
      name: 'editHotad',
      hidden: true,
      meta: { title: '热搜广告', noCache: true }
    },
    {
      path: 'editCarousel',
      component: () => import('@/views/advertising/PcAdvertising/Carousel/edit.vue'),
      name: 'editHotad',
      hidden: true,
      meta: { title: 'pc轮播广告编辑', noCache: true }
    }
  ]
}

export default Advertising
