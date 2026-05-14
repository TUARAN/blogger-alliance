<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute } from 'vue-router'

const navLinks = [
  { label: '服务介绍', to: '/tob/services' },
  { label: '案例', to: '/cases' },
  { label: '联盟学院', to: { path: '/academy', query: { tab: 'knowledge' } } }
]

const workspaceMenu = [
  { label: '工作总览', to: '/workspace', kind: 'router' },
  { label: '矩阵看板', to: '/matrix', kind: 'router' },
  { label: '内部数据', to: '/tob/internal', kind: 'router' },
  { label: '同步工具', href: 'https://md.tuaran666.workers.dev/', kind: 'external' }
]

const route = useRoute()
const workspaceOpen = ref(false)
const workspaceRef = ref(null)

const workspaceActiveRoute = computed(() =>
  ['/workspace', '/matrix', '/tob/internal'].some((p) => route.path.startsWith(p))
)

const onDocClick = (e) => {
  if (!workspaceRef.value) return
  if (!workspaceRef.value.contains(e.target)) workspaceOpen.value = false
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

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

            <div ref="workspaceRef" class="relative">
              <button
                type="button"
                class="inline-flex items-center gap-1 whitespace-nowrap transition-colors hover:text-slate-900"
                :class="workspaceActiveRoute ? 'text-slate-900' : ''"
                @click.stop="workspaceOpen = !workspaceOpen"
              >
                工作台
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="h-3 w-3 shrink-0 opacity-60 transition-transform"
                  :class="workspaceOpen ? 'rotate-180' : ''"
                  aria-hidden="true"
                >
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
              </button>
              <transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1"
              >
                <div
                  v-show="workspaceOpen"
                  class="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white shadow-lg py-1.5"
                >
                  <template v-for="item in workspaceMenu" :key="item.label">
                    <router-link
                      v-if="item.kind === 'router'"
                      :to="item.to"
                      class="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      @click="workspaceOpen = false"
                    >
                      {{ item.label }}
                    </router-link>
                    <a
                      v-else
                      :href="item.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-between px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      @click="workspaceOpen = false"
                    >
                      <span>{{ item.label }}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5 opacity-50" aria-hidden="true">
                        <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 01.75-.75h8a.75.75 0 01.75.75v8a.75.75 0 01-1.5 0V7.56l-6.22 6.22a.75.75 0 11-1.06-1.06l6.22-6.22H5a.75.75 0 010-1.5z" clip-rule="evenodd" />
                      </svg>
                    </a>
                  </template>
                </div>
              </transition>
            </div>
          </div>
          <slot name="links"></slot>
          <WebLlmNavBot />
        </div>
      </div>
    </div>
  </nav>
</template>
