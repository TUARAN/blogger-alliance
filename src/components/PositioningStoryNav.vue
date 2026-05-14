<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const chain = [
  { path: '/', label: '合作首页' },
  { path: '/ecosystem', label: '生态定位' },
  { path: '/why-us', label: '为什么选我们' },
  { path: '/tob/services', label: '服务与报价' }
]

function isActive(path) {
  if (path === '/') {
    return route.path === '/' || route.path === '/tob'
  }
  return route.path === path
}
</script>

<template>
  <nav
    class="mb-3 flex flex-wrap items-center gap-x-1 gap-y-1.5 rounded-xl border border-slate-200/80 bg-white/70 px-3 py-2 text-[13px] shadow-sm backdrop-blur-sm"
    aria-label="站内导航"
  >
    <template v-for="(item, index) in chain" :key="item.path">
      <span v-if="index > 0" class="px-0.5 text-slate-300 select-none" aria-hidden="true">/</span>
      <router-link
        v-if="!isActive(item.path)"
        :to="item.path"
        class="font-medium text-indigo-700 underline-offset-4 hover:text-indigo-900 hover:underline"
      >
        {{ item.label }}
      </router-link>
      <span v-else class="font-semibold text-slate-800">{{ item.label }}</span>
    </template>
  </nav>
</template>
