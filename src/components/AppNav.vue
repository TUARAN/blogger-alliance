<script setup>
const navLinks = [
  { label: '服务介绍', to: '/tob/services' },
  { label: '矩阵看板', to: '/matrix' },
  { label: '联盟学院', to: { path: '/academy', query: { tab: 'knowledge' } } },
  { label: '内部数据', to: '/tob/internal' }
]

defineProps({
  logoTo: { type: String, default: '/tob' },
  workspaceActive: { type: Boolean, default: false }
})
</script>

<template>
  <nav class="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-40">
    <div class="mx-auto max-w-[1500px] px-3 sm:px-4 lg:px-5">
      <div class="flex justify-between items-center h-16 gap-4">
        <div class="flex items-center min-w-0">
          <router-link
            :to="logoTo"
            class="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors truncate"
          >
            🚀开发者博主联盟
          </router-link>
        </div>

        <div class="flex min-w-0 items-center gap-4">
          <div class="hidden items-center gap-6 text-sm font-semibold text-slate-500 md:flex">
            <router-link
              v-for="item in navLinks"
              :key="item.label"
              :to="item.to"
              class="relative whitespace-nowrap transition-colors hover:text-indigo-700 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all hover:after:w-full"
              active-class="text-indigo-700 after:w-full"
            >
              {{ item.label }}
            </router-link>
            <a
              href="https://md.tuaran666.workers.dev/"
              target="_blank"
              rel="noopener noreferrer"
              class="relative whitespace-nowrap transition-colors hover:text-indigo-700 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all hover:after:w-full"
            >
              同步工具
            </a>
          </div>
          <slot name="links"></slot>
          <WebLlmNavBot />
        </div>
      </div>
    </div>
  </nav>
</template>
