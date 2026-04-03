<script setup>
defineProps({
  message: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div :class="message.role === 'user' ? 'justify-end' : 'justify-start'" class="flex">
    <div
      :class="message.role === 'user'
        ? 'bg-slate-900 text-white'
        : 'bg-white text-slate-900 border border-slate-200'"
      class="max-w-[85%] rounded-3xl px-4 py-3 shadow-sm"
    >
      <div class="mb-2 flex items-center justify-between gap-4">
        <span class="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
          {{ message.role === 'user' ? 'You' : 'Web LLM' }}
        </span>
        <span v-if="message.tps" class="text-xs opacity-60">{{ message.tps }} tokens/s</span>
      </div>

      <img
        v-if="message.image"
        :src="message.image"
        alt="上传图片预览"
        class="mb-3 max-h-56 w-full rounded-2xl object-cover"
      >

      <div v-if="message.pending" class="mb-3 flex items-center gap-3">
        <div class="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-700">
          <span class="inline-flex h-2 w-2 animate-pulse rounded-full bg-amber-500" />
          <span>生成进行中</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.2s]" />
          <span class="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.1s]" />
          <span class="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce" />
        </div>
      </div>

      <p :class="message.pending ? 'text-slate-600' : ''" class="whitespace-pre-wrap break-words text-sm leading-7 transition-opacity">
        {{ message.text || (message.pending ? '正在生成中...' : '') }}
      </p>

      <div v-if="message.pending" class="mt-3 space-y-2">
        <div class="h-2 w-32 animate-pulse rounded-full bg-slate-200/80" />
        <div class="h-2 w-48 animate-pulse rounded-full bg-slate-200/70" />
        <div class="h-2 w-24 animate-pulse rounded-full bg-slate-200/60" />
      </div>
    </div>
  </div>
</template>
