<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div class="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">Model Loading</p>
        <h3 class="mt-2 text-2xl font-bold text-slate-900">正在初始化网页大模型</h3>
        <p class="mt-3 text-sm leading-6 text-slate-600">{{ status }}</p>

        <div class="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            class="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 transition-all duration-300"
            :style="{ width: `${progress}%` }"
          />
        </div>

        <div class="mt-3 flex justify-between text-xs text-slate-500">
          <span>下载与初始化进度</span>
          <span>{{ progress }}%</span>
        </div>
      </div>
    </div>
  </transition>
</template>
