<script setup>
defineProps({
  activeSessionId: {
    type: String,
    default: ''
  },
  sessions: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['create', 'select', 'delete'])
</script>

<template>
  <aside class="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-xl shadow-slate-200/40">
    <div>
      <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Sessions</p>
      <h2 class="mt-2 text-xl font-bold text-slate-900">本地会话</h2>
    </div>

    <button
      type="button"
      class="mt-5 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      @click="emit('create')"
    >
      新建会话
    </button>

    <div class="mt-5 space-y-3">
      <button
        v-for="session in sessions"
        :key="session.id"
        type="button"
        :class="session.id === activeSessionId
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'"
        class="flex w-full items-start justify-between gap-3 rounded-2xl border p-4 text-left transition"
        @click="emit('select', session.id)"
      >
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold">{{ session.title }}</p>
          <p class="mt-1 text-xs opacity-70">{{ session.messages.length }} 条消息</p>
        </div>
        <span
          class="shrink-0 rounded-full px-2 py-1 text-xs font-medium"
          :class="session.id === activeSessionId ? 'bg-white/15' : 'bg-slate-200/70'"
          @click.stop="emit('delete', session.id)"
        >
          删除
        </span>
      </button>
    </div>
  </aside>
</template>
