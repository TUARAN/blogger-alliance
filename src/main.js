import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import AppNav from './components/AppNav.vue'
import AuthNavActions from './components/AuthNavActions.vue'
import { useAuth } from './composables/useAuth.js'
import { CLOUDCOST_PATH, isCloudCostHost } from './utils/cloudcostHost.js'
import './style.css'

const AUTH_REQUIRED_PREFIXES = ['/account', '/tob/internal', '/annual-report-2025', '/tob/reports']

// 路由配置
const routes = [
  { path: '/', component: () => import('./pages/tob/index.vue') },
  { path: '/tob', component: () => import('./pages/tob/index.vue') },
  { path: '/cases', component: () => import('./pages/cases/index.vue') },
  { path: '/cases/tweet', component: () => import('./pages/cases/tweet.vue') },
  { path: '/cases/cpc', component: () => import('./pages/cases/cpc.vue') },
  { path: '/cases/community', component: () => import('./pages/cases/community.vue') },
  { path: '/cases/ai-access', component: () => import('./pages/cases/ai-access.vue') },
  { path: '/cases/oversea-cloud', component: () => import('./pages/cases/oversea-cloud.vue') },
  { path: '/cases/enterprise-cloud', component: () => import('./pages/cases/enterprise-cloud.vue') },
  { path: '/tob/internal', component: () => import('./pages/tob/internal.vue') },
  {
    path: '/tob/deals',
    redirect: (to) => ({ path: '/tob/internal', query: { ...to.query, tab: 'deals' } })
  },
  {
    path: '/tob/reports',
    redirect: (to) => ({ path: '/tob/internal', query: { ...to.query, tab: 'reports' } })
  },
  { path: '/tob/reports/:id', component: () => import('./pages/tob/report-detail.vue') },
  { path: '/tob/services', component: () => import('./pages/tob/services/index.vue') },
  { path: '/tob/services/tweet', component: () => import('./pages/tob/services/tweet.vue') },
  { path: '/tob/services/cpc', component: () => import('./pages/tob/services/cpc.vue') },
  { path: '/tob/services/community', component: () => import('./pages/tob/services/community.vue') },
  { path: '/tob/services/ai-access', component: () => import('./pages/tob/services/ai-access.vue') },
  { path: '/tob/services/oversea-cloud', component: () => import('./pages/tob/services/oversea-cloud.vue') },
  { path: '/tob/services/cloud-cost', component: () => import('./pages/tob/services/cloud-cost.vue') },
  { path: '/tob/services/enterprise-cloud', redirect: '/tob/services/cloud-cost' },
  { path: '/cloudcost', component: () => import('./pages/cloudcost/index.vue') },
  { path: '/matrix', redirect: '/workspace' },
  { path: '/annual-report-2025', component: () => import('./pages/annual-report/index.vue') },
  { path: '/workspace', component: () => import('./pages/workspace/index.vue') },
  { path: '/workspace/changelog', component: () => import('./pages/workspace/changelog.vue') },
  {
    path: '/workspace/internal-data-admin',
    redirect: (to) => ({ path: '/tob/internal', query: { ...to.query, tab: 'admin' } })
  },
  { path: '/workspace/web-llm', component: () => import('./pages/workspace/web-llm/index.vue') },
  { path: '/auth/login', component: () => import('./pages/auth/login.vue'), meta: { guestOnly: true } },
  { path: '/auth/register', component: () => import('./pages/auth/register.vue'), meta: { guestOnly: true } },
  { path: '/account', component: () => import('./pages/account/index.vue'), meta: { requiresAuth: true } },
  { path: '/ecosystem', component: () => import('./pages/ecosystem-position/index.vue') },
  { path: '/why-us', component: () => import('./pages/why-us/index.vue') },
  { path: '/toc', component: () => import('./pages/toc/index.vue') },
  { path: '/academy', component: () => import('./pages/academy/index.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('./pages/not-found/index.vue') }
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

function requiresAuth(path) {
  return AUTH_REQUIRED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
}

function requiresInternalRole(path) {
  return ['/tob/internal', '/annual-report-2025', '/tob/reports'].some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  )
}

router.beforeEach(async (to) => {
  if (isCloudCostHost()) {
    if (to.path === '/') {
      return CLOUDCOST_PATH
    }

    if (to.path === '/tob' || to.path.startsWith('/tob/')) {
      window.location.assign(`https://blogger-alliance.cn${to.fullPath}`)
      return false
    }
  }

  const { initAuth, isAuthenticated, isInternal, isAdmin, isSupabaseConfigured } = useAuth()
  await initAuth()

  if (!isSupabaseConfigured.value) {
    return true
  }

  if (to.meta.requiresAuth || requiresAuth(to.path)) {
    if (!isAuthenticated.value) {
      return {
        path: '/auth/login',
        query: { redirect: to.fullPath }
      }
    }
  }

  if (requiresInternalRole(to.path) && isAuthenticated.value && !isInternal.value) {
    return {
      path: '/workspace',
      query: { notice: 'internal-required' }
    }
  }

  if (to.meta.guestOnly && isAuthenticated.value) {
    return '/workspace'
  }

  return true
})

const app = createApp(App)
app.use(router)
app.component('AppNav', AppNav)
app.component('AuthNavActions', AuthNavActions)

const { initAuth } = useAuth()
initAuth().finally(() => {
  app.mount('#app')
})
