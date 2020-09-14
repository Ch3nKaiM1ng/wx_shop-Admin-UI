import Layout from '@/layout'

// 用户信息
const userDisplay = {
  path: '/wxuser',
  component: Layout,
  redirect: 'noRedirect',
  name: 'wxuser',
  meta: {
    title: '用户信息',
    icon: 'user'
  },
  children: [
    {
      path: 'wxuser',
      component: () => import('@/views/wxuser/uesrList.vue'),
      name: 'wxuser',
      meta: { title: '用户列表', noCache: true }
    }
  ]
}

export default userDisplay
