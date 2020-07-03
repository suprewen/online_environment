import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index')
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/detail')
      },
      {
        path: '/search',
        component: () => import('@/views/search'),
        name: 'search'
      }
    ]
  },
  {
    path: '/*',
    component: () => import('@/views/error')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
