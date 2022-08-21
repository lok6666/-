import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Editable',
    meta: {
        keepAlive: true
    },
    component: () => import('@/views/editable-table.vue')
  },
  {
    path: '/policy-detail',
    name: 'EditableV2',
    component: () => import('@/views/editable-table-v2.vue')
  },
  {
    path: '/notice-detail',
    name: 'notice',
    component: () => import('@/views/excelT.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
