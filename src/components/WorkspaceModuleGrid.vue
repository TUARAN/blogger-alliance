<script setup>
const modules = [
  {
    title: '服务介绍',
    description: '推文、引流、社群和 AI Access 推广。',
    tag: '品牌合作',
    icon: '🔥',
    to: '/tob/services',
    theme: {
      shadow: 'shadow-emerald-100/40',
      icon: 'bg-emerald-100',
      tag: 'bg-emerald-50 text-emerald-700',
      cta: 'text-emerald-700'
    }
  },
  {
    title: '案例',
    description: '查看已整理的合作案例、服务样例和交付展示。',
    tag: '案例沉淀',
    icon: '📌',
    to: '/cases',
    theme: {
      shadow: 'shadow-amber-100/40',
      icon: 'bg-amber-100',
      tag: 'bg-amber-50 text-amber-700',
      cta: 'text-amber-700'
    }
  },
  {
    title: '联盟学院',
    description: '学习资料、工具资源和知识沉淀。',
    tag: '知识资源',
    icon: '📚',
    to: { path: '/academy', query: { tab: 'knowledge' } },
    theme: {
      shadow: 'shadow-blue-100/40',
      icon: 'bg-blue-100',
      tag: 'bg-blue-50 text-blue-700',
      cta: 'text-blue-700'
    }
  },
  {
    title: '数据报告',
    description: '合作进度、数据报告、年度总览统一台账，凭证共享。',
    tag: '数据报告',
    icon: '🗂️',
    locked: true,
    to: '/tob/internal',
    theme: {
      shadow: 'shadow-indigo-100/40',
      icon: 'bg-indigo-100',
      tag: 'bg-indigo-50 text-indigo-700',
      cta: 'text-indigo-700'
    }
  },
  {
    title: '更新日志',
    description: '按版本与周维度回看联盟工作台、服务页、案例与数据底座演进。',
    tag: '版本里程碑',
    icon: '📝',
    to: '/workspace/changelog',
    theme: {
      shadow: 'shadow-slate-100/40',
      icon: 'bg-slate-100',
      tag: 'bg-slate-100 text-slate-700',
      cta: 'text-slate-700'
    }
  }
]

defineProps({
  compact: { type: Boolean, default: false }
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
    <component
      :is="module.external ? 'a' : 'router-link'"
      v-for="module in modules"
      :key="module.title"
      :to="module.external ? undefined : module.to"
      :href="module.external ? module.href : undefined"
      :target="module.external ? '_blank' : undefined"
      :rel="module.external ? 'noopener noreferrer' : undefined"
      class="group rounded-3xl border border-white/70 bg-white/90 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      :class="[module.theme.shadow, compact ? 'p-5' : 'p-6']"
    >
      <div class="flex items-start justify-between gap-3">
        <span
          class="inline-flex items-center justify-center rounded-2xl text-2xl"
          :class="[module.theme.icon, compact ? 'h-11 w-11' : 'h-12 w-12']"
        >
          {{ module.icon }}
        </span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
          :class="module.theme.tag"
        >
          <svg
            v-if="module.locked"
            class="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="4" y="11" width="16" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <span>{{ module.tag }}</span>
        </span>
      </div>

      <h2 class="mt-5 font-bold text-gray-900" :class="compact ? 'text-lg' : 'text-xl'">{{ module.title }}</h2>
      <p class="mt-2 text-sm leading-6 text-gray-600">{{ module.description }}</p>
      <div class="mt-6 inline-flex items-center gap-2 text-sm font-semibold" :class="module.theme.cta">
        <svg
          v-if="module.locked"
          class="h-4 w-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="4" y="11" width="16" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
        <span>{{ module.external ? '打开工具' : '进入模块' }}</span>
        <svg
          v-if="module.external"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="h-4 w-4 shrink-0 opacity-80 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M4.25 5.5a.75.75 0 01.75-.75h8a.75.75 0 01.75.75v8a.75.75 0 01-1.5 0V7.56l-6.22 6.22a.75.75 0 11-1.06-1.06l6.22-6.22H5a.75.75 0 010-1.5z"
            clip-rule="evenodd"
          />
        </svg>
        <span v-else class="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </component>
  </div>
</template>
