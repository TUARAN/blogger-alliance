<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const navLinks = [
  { label: '介绍', to: '/tob/services', matchPrefix: '/tob/services' },
  { label: '案例', to: '/cases', matchPrefix: '/cases' },
  { label: '联盟入口', to: '/workspace', matchPrefix: '/workspace' }
]

const matrixLink = {
  label: '矩阵联盟',
  to: '/matrix',
  matchPrefix: '/matrix'
}

defineProps({
  logoTo: { type: String, default: '/' }
})

const route = useRoute()
const mobileMenuOpen = ref(false)

watch(() => route.fullPath, () => {
  mobileMenuOpen.value = false
})

function isLinkActive(item) {
  const current = route.path || '/'
  if (!item.matchPrefix) {
    return current === item.to
  }
  return current === item.matchPrefix || current.startsWith(`${item.matchPrefix}/`)
}

const activeLinkLabels = computed(() => {
  const map = {}
  for (const item of navLinks) {
    map[item.label] = isLinkActive(item)
  }
  map[matrixLink.label] = isLinkActive(matrixLink)
  return map
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
              :aria-current="activeLinkLabels[item.label] ? 'page' : undefined"
              class="relative inline-flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-slate-900 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-slate-900 after:transition-all hover:after:w-full"
              :class="activeLinkLabels[item.label] ? 'text-slate-900 after:w-full' : ''"
            >
              <span>{{ item.label }}</span>
              <span
                v-if="item.badge"
                class="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-amber-800"
              >
                {{ item.badge }}
              </span>
            </router-link>
          </div>
          <slot name="links"></slot>
          <div class="hidden md:block">
            <AuthNavActions />
          </div>
          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 md:hidden"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobile-nav-panel"
            aria-label="打开导航菜单"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg v-if="!mobileMenuOpen" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
            <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>
      </div>

      <div
        v-if="mobileMenuOpen"
        id="mobile-nav-panel"
        class="border-t border-slate-200/70 py-2 md:hidden"
      >
        <router-link
          v-for="item in navLinks"
          :key="item.label"
          :to="item.to"
          :aria-current="activeLinkLabels[item.label] ? 'page' : undefined"
          class="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-950"
          :class="activeLinkLabels[item.label] ? 'bg-slate-100 text-slate-950' : ''"
        >
          <span>{{ item.label }}</span>
          <span
            v-if="item.badge"
            class="ml-2 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-amber-800"
          >
            {{ item.badge }}
          </span>
        </router-link>
        <div class="mt-2 border-t border-slate-200/70 pt-2 md:hidden">
          <AuthNavActions variant="mobile" />
        </div>
      </div>
    </div>
  </nav>

  <router-link
    :to="matrixLink.to"
    :aria-current="activeLinkLabels[matrixLink.label] ? 'page' : undefined"
    aria-label="矩阵联盟，建设中"
    title="矩阵联盟 · 建设中"
    class="fixed left-4 z-30 inline-flex min-h-12 items-center gap-2.5 rounded-md border border-slate-700 bg-slate-950 px-4 text-white shadow-lg transition-all hover:-translate-y-0.5 hover:border-indigo-600 hover:bg-indigo-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:left-6"
    :class="activeLinkLabels[matrixLink.label] ? 'border-amber-300 ring-2 ring-amber-300 ring-offset-2' : ''"
    style="bottom: max(1rem, env(safe-area-inset-bottom));"
  >
    <span class="text-lg leading-none" aria-hidden="true">⚒️</span>
    <span class="whitespace-nowrap text-sm font-semibold tracking-wide">
      矩阵联盟<span class="mx-1.5 text-slate-500" aria-hidden="true">·</span><span class="text-amber-300">建设中</span>
    </span>
  </router-link>
</template>
