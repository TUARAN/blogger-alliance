<script setup>

const navLinks = [
  { label: '介绍', to: '/tob/services' },
  { label: '案例', to: '/cases' },
  { label: '后台', to: '/workspace' }
]

defineProps({
  logoTo: { type: String, default: '/tob' },
  workspaceActive: { type: Boolean, default: false }
})
</script>

<template>
  <nav class="bg-white/85 backdrop-blur-md border-b border-slate-200/70 sticky top-0 z-40">
    <div class="mx-auto max-w-[1500px] px-3 sm:px-4 lg:px-5">
      <div class="flex justify-between items-center h-16 gap-4">
        <div class="flex items-center min-w-0">
          <router-link
            :to="logoTo"
            class="text-base sm:text-lg font-semibold text-slate-900 hover:text-indigo-700 transition-colors truncate tracking-tight"
          >
            <span class="mr-1.5" aria-hidden="true">🚀</span>开发者博主联盟
          </router-link>
        </div>

        <div class="flex min-w-0 items-center gap-4 ml-4 md:ml-8 lg:ml-10">
          <div class="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <router-link
              v-for="item in navLinks"
              :key="item.label"
              :to="item.to"
              class="relative whitespace-nowrap transition-colors hover:text-slate-900 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-slate-900 after:transition-all hover:after:w-full"
              active-class="text-slate-900 after:w-full"
            >
              {{ item.label }}
            </router-link>
          </div>
          <slot name="links"></slot>
          <WebLlmNavBot />
        </div>
      </div>
    </div>
  </nav>
</template>
