<script setup>
import { toastState } from '../utils/toast.js'
</script>

<template>
  <Teleport to="body">
    <div class="pointer-events-none fixed top-5 left-1/2 -translate-x-1/2 z-[100] flex w-full max-w-sm flex-col gap-2 px-4">
      <transition-group name="toast" tag="div" class="flex flex-col gap-2">
        <div
          v-for="t in toastState.items"
          :key="t.id"
          role="status"
          :class="[
            'pointer-events-auto rounded-xl border px-4 py-3 text-sm font-medium shadow-lg backdrop-blur-md',
            t.type === 'error'   ? 'bg-rose-50/95 border-rose-200 text-rose-800' :
            t.type === 'success' ? 'bg-emerald-50/95 border-emerald-200 text-emerald-800' :
                                   'bg-white/95 border-gray-200 text-gray-800'
          ]"
        >
          {{ t.message }}
        </div>
      </transition-group>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active {
    transition: none;
  }
}
</style>
