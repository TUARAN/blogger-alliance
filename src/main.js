import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// 路由配置
const routes = [
  { path: '/', component: () => import('./pages/tob/index.vue') },
  { path: '/about', component: () => import('./views/Home.vue') },
  { path: '/tob', component: () => import('./pages/tob/index.vue') },
  { path: '/cases', component: () => import('./pages/cases/index.vue') },
  { path: '/tob/internal', component: () => import('./pages/tob/internal.vue') },
  {
    path: '/tob/deals',
    redirect: (to) => ({ path: '/tob/internal', query: { ...to.query, tab: 'deals' } })
  },
  {
    path: '/tob/reports',
    redirect: (to) => ({ path: '/tob/internal', query: { ...to.query, tab: 'reports' } })
  },
  { path: '/tob/services', component: () => import('./pages/tob/services/index.vue') },
  { path: '/matrix', component: () => import('./pages/matrix/index.vue') },
  { path: '/annual-report-2025', component: () => import('./pages/annual-report/index.vue') },
  { path: '/workspace', component: () => import('./pages/workspace/index.vue') },
  {
    path: '/workspace/internal-data-admin',
    redirect: (to) => ({ path: '/tob/internal', query: { ...to.query, tab: 'admin' } })
  },
  { path: '/workspace/web-llm', component: () => import('./pages/workspace/web-llm/index.vue') },
  { path: '/ecosystem', component: () => import('./pages/ecosystem-position/index.vue') },
  { path: '/why-us', component: () => import('./pages/why-us/index.vue') },
  { path: '/toc', component: () => import('./pages/toc/index.vue') },
  { path: '/academy', component: () => import('./pages/academy/index.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      const target = document.querySelector(to.hash)

      if (target) {
        const topOffset = 88

        return {
          top: target.getBoundingClientRect().top + window.scrollY - topOffset,
          left: 0,
          behavior: 'smooth'
        }
      }

      return {
        el: to.hash,
        top: 0,
        behavior: 'smooth'
      }
    }

    return {
      top: 0,
      left: 0,
      behavior: 'auto'
    }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app') 
