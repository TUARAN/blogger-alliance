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

      <p class="whitespace-pre-wrap break-words text-sm leading-7">
        {{ message.text || (message.pending ? '正在生成中...' : '') }}
      </p>
    </div>
  </div>
</template>
