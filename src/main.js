import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
import { initializeWithMockData } from './utils/statsService.js'

// 路由配置
const routes = [
  { path: '/', component: () => import('./pages/tob/index.vue') },
  { path: '/about', component: () => import('./views/Home.vue') },
  { path: '/tob', component: () => import('./pages/tob/index.vue') },
  { path: '/toc', component: () => import('./pages/toc/index.vue') },
  { path: '/tools', component: () => import('./views/Tools.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 初始化统计数据
initializeWithMockData()

const app = createApp(App)
app.use(router)
app.mount('#app') 